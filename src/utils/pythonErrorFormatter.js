/**
 * Python Error Parser & Diagnostic Intelligence Engine
 * Formats low-level Python tracebacks and Pyodide exceptions into friendly, actionable diagnostic cards.
 */

export function parsePythonError(stderrText, sourceCode = '') {
  if (!stderrText || typeof stderrText !== 'string') return null;

  // Clean and normalize CRLF to LF and trim
  const cleanStderr = stderrText.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
  const rawLines = cleanStderr.split('\n').map(l => l.trimEnd()).filter(Boolean);
  
  if (rawLines.length === 0) return null;

  let errorType = 'RuntimeError';
  let errorMessage = '';
  let lineNumber = null;
  let codeSnippet = '';
  let pointerLine = '';

  const knownErrors = [
    'SyntaxError',
    'IndentationError',
    'TabError',
    'NameError',
    'TypeError',
    'ZeroDivisionError',
    'IndexError',
    'KeyError',
    'ValueError',
    'AttributeError',
    'UnboundLocalError',
    'RecursionError',
    'ImportError',
    'ModuleNotFoundError',
    'RuntimeError',
    'OverflowError',
    'MemoryError',
    'AssertionError',
    'FileNotFoundError',
    'PermissionError',
    'NotImplementedError'
  ];

  // 1. Search for actual Python exception name and message
  for (let i = rawLines.length - 1; i >= 0; i--) {
    const line = rawLines[i].trim();

    // Check for "PythonError: <ErrorType>: <Message>"
    const pyodidePrefixMatch = line.match(/PythonError:\s*(?:Traceback.*?:\s*)?([A-Za-z]+Error|[A-Za-z]+Exception):\s*(.*)/);
    if (pyodidePrefixMatch) {
      errorType = pyodidePrefixMatch[1];
      errorMessage = pyodidePrefixMatch[2] || '';
      break;
    }

    // Check for standard "<ErrorType>: <Message>"
    const standardMatch = line.match(/^([A-Za-z]+Error|[A-Za-z]+Exception):\s*(.*)/);
    if (standardMatch) {
      if (standardMatch[1] !== 'PythonError') {
        errorType = standardMatch[1];
        errorMessage = standardMatch[2] || '';
        break;
      }
    }

    // Check known error tokens in the line
    for (const known of knownErrors) {
      if (line.startsWith(`${known}:`) || line.includes(`${known}:`)) {
        errorType = known;
        const parts = line.split(`${known}:`);
        errorMessage = parts[1]?.trim() || '';
        break;
      }
    }

    if (errorType !== 'RuntimeError') break;
  }

  // 2. Extract line number with multiple pattern strategies
  for (const line of rawLines) {
    // Strategy A: File "<...>", line 3
    const fileMatch = line.match(/File\s+["'][^"']+["'],\s+line\s+(\d+)/i);
    if (fileMatch) {
      lineNumber = parseInt(fileMatch[1], 10);
      break;
    }

    // Strategy B: line 3, in <module>
    const lineModuleMatch = line.match(/\bline\s+(\d+)(?:,\s+in\s+.*)?/i);
    if (lineModuleMatch && !line.toLowerCase().includes('traceback')) {
      lineNumber = parseInt(lineModuleMatch[1], 10);
      break;
    }
  }

  // 3. Extract caret pointer if available (like in SyntaxError)
  for (let i = 0; i < rawLines.length; i++) {
    const l = rawLines[i];
    if (l.includes('^')) {
      pointerLine = l;
      if (i > 0 && !rawLines[i - 1].toLowerCase().includes('file ')) {
        codeSnippet = rawLines[i - 1].trim();
      }
      break;
    }
  }

  // 4. If codeSnippet is not present from traceback, pull from sourceCode
  if (!codeSnippet && lineNumber && sourceCode) {
    const codeLines = sourceCode.split('\n');
    if (codeLines[lineNumber - 1] !== undefined) {
      codeSnippet = codeLines[lineNumber - 1].trim();
    }
  }

  // If pointerLine was missing and we know codeSnippet, generate a helpful visual pointer
  if (!pointerLine && codeSnippet) {
    pointerLine = '^'.padStart(Math.min(codeSnippet.length, 10), ' ');
  }

  // 5. Generate human explanation and actionable fix based on error type and message
  const diagnostic = getDiagnosticAdvice(errorType, errorMessage, codeSnippet);

  return {
    errorType,
    errorMessage: errorMessage || cleanStderr.split('\n').pop() || 'Execution failed',
    lineNumber,
    codeSnippet,
    pointerLine,
    humanExplanation: diagnostic.explanation,
    suggestedFix: diagnostic.fix,
    rawTraceback: cleanStderr
  };
}

function getDiagnosticAdvice(errorType, message, snippet) {
  switch (errorType) {
    case 'SyntaxError':
      return {
        explanation: 'Python encountered code that violates its grammatical rules and could not parse it.',
        fix: 'Check for missing colons (`:`), unmatched brackets/parentheses `()`, or unclosed quotes `""`.'
      };
    case 'IndentationError':
      return {
        explanation: 'Python relies strictly on consistent indentation (spaces) to define blocks of code.',
        fix: 'Ensure all lines inside functions, `if` statements, or `for` loops are indented with exactly 4 spaces. Avoid mixing tabs and spaces.'
      };
    case 'TabError':
      return {
        explanation: 'Python detected an inconsistent mixture of tabs and spaces for indentation.',
        fix: 'Replace all tab characters with 4 spaces.'
      };
    case 'NameError':
      return {
        explanation: `Python tried to use an identifier that has not been defined or assigned yet.`,
        fix: 'Check for spelling mistakes in variable/function names, or ensure the variable is defined before this line.'
      };
    case 'TypeError':
      return {
        explanation: 'An operation or function was applied to an object of an inappropriate or mismatched data type.',
        fix: 'Check the data types being combined (e.g. adding a number to a string). Use explicit type casting like `int()` or `str()`.'
      };
    case 'ZeroDivisionError':
      return {
        explanation: 'A division (`/`, `//`, or `%`) was attempted with zero as the denominator, which is mathematically undefined.',
        fix: 'Add a check (e.g. `if denominator != 0:`) before dividing to prevent division by zero.'
      };
    case 'IndexError':
      return {
        explanation: 'You tried to access an item in a list or sequence at an index that does not exist.',
        fix: 'Remember Python uses 0-based indexing (0 to `len - 1`). Verify list length with `len(sequence)` before indexing.'
      };
    case 'KeyError':
      return {
        explanation: 'You tried to access a dictionary key that does not exist in the dictionary.',
        fix: 'Check if the key is in the dictionary using `key in dict`, or use `dict.get(key, default)` for safe lookup.'
      };
    case 'ValueError':
      return {
        explanation: 'A function received an argument that has the right type but an invalid value (e.g. `int("abc")`).',
        fix: 'Verify the input data format before passing it to conversion functions.'
      };
    case 'AttributeError':
      return {
        explanation: 'You attempted to call a method or access an attribute that does not exist on this object.',
        fix: 'Verify the object type and available methods using `dir(object)` or check for typos.'
      };
    case 'UnboundLocalError':
      return {
        explanation: 'A local variable was referenced before being assigned a value inside a function.',
        fix: 'Assign a value to the variable before referencing it, or declare `global` / `nonlocal` if modifying outer scope.'
      };
    case 'RecursionError':
      return {
        explanation: 'The maximum recursion depth was exceeded because a recursive function called itself indefinitely.',
        fix: 'Ensure your recursive function has a valid base case that stops execution.'
      };
    case 'FileNotFoundError':
      return {
        explanation: 'Python attempted to open a file that does not exist in the specified path.',
        fix: 'Verify the filename and directory path before calling `open()`.'
      };
    case 'ModuleNotFoundError':
    case 'ImportError':
      return {
        explanation: 'Python could not find or load the requested module.',
        fix: 'Check for typos in the module name or ensure the module is installed in the environment.'
      };
    default:
      return {
        explanation: 'An unexpected runtime error occurred during program execution.',
        fix: 'Review the line indicated in the traceback to verify all variables, expressions, and logic.'
      };
  }
}
