/**
 * Python Error Parser & Diagnostic Intelligence Engine
 * Formats low-level Python tracebacks and Pyodide exceptions into friendly, actionable diagnostic cards.
 */

import { findClosestSymbol } from './pythonSymbolAnalyzer.js';

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

  // 2. Extract all stack frames for multi-frame traceback (crash line + call origin)
  const stackFrames = [];
  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i];
    // Match File "<...>", line 4, in func_name
    const frameMatch = line.match(/File\s+["']([^"']+)["'],\s+line\s+(\d+)(?:,\s+in\s+(.*))?/i);
    if (frameMatch) {
      const fileName = frameMatch[1];
      // Skip internal pyodide and python runtime plumbing frames
      if (fileName.includes('pyodide') || fileName.includes('/lib/python') || fileName.includes('<frozen')) {
        continue;
      }

      const lineNum = parseInt(frameMatch[2], 10);
      const funcName = (frameMatch[3] || '<module>').trim();
      let frameSnippet = '';
      if (i + 1 < rawLines.length && !rawLines[i + 1].trim().startsWith('File ') && !rawLines[i + 1].includes('Error:')) {
        frameSnippet = rawLines[i + 1].trim();
      }
      // If frameSnippet was empty, look up in sourceCode
      if (!frameSnippet && sourceCode && lineNum) {
        const codeLines = sourceCode.split('\n');
        if (codeLines[lineNum - 1] !== undefined) {
          frameSnippet = codeLines[lineNum - 1].trim();
        }
      }

      stackFrames.push({
        file: fileName,
        line: lineNum,
        funcName,
        snippet: frameSnippet
      });
    }
  }

  // Deepest frame is the immediate crash location
  const crashFrame = stackFrames.length > 0 ? stackFrames[stackFrames.length - 1] : null;
  // First frame is the top-level trigger origin (if multiple frames exist)
  const originFrame = stackFrames.length > 1 ? stackFrames[0] : null;

  if (crashFrame) {
    lineNumber = crashFrame.line;
    if (crashFrame.snippet) codeSnippet = crashFrame.snippet;
  } else {
    // Fallback line search strategy
    for (const line of rawLines) {
      if (line.includes('pyodide') || line.includes('/lib/python')) continue;
      const lineModuleMatch = line.match(/\bline\s+(\d+)(?:,\s+in\s+.*)?/i);
      if (lineModuleMatch && !line.toLowerCase().includes('traceback')) {
        lineNumber = parseInt(lineModuleMatch[1], 10);
        break;
      }
    }
  }

  // 3. Extract caret pointer if available (like in SyntaxError)
  for (let i = 0; i < rawLines.length; i++) {
    const l = rawLines[i];
    if (l.includes('^')) {
      let isInternal = false;
      for (let j = Math.max(0, i - 4); j < i; j++) {
        if (rawLines[j].includes('pyodide') || rawLines[j].includes('/lib/python')) {
          isInternal = true;
          break;
        }
      }
      if (!isInternal) {
        pointerLine = l;
        if (i > 0 && !rawLines[i - 1].trim().toLowerCase().startsWith('file ')) {
          codeSnippet = rawLines[i - 1].trim();
        }
        break;
      }
    }
  }

  // 4. Always prefer codeSnippet from sourceCode if lineNumber is available, so it matches the editor exactly!
  if (lineNumber && sourceCode) {
    const codeLines = sourceCode.split('\n');
    if (codeLines[lineNumber - 1] !== undefined) {
      codeSnippet = codeLines[lineNumber - 1].trim();
    }
  }

  // If pointerLine was missing and we know codeSnippet, generate a helpful visual pointer
  if (!pointerLine && codeSnippet) {
    pointerLine = '^'.padStart(Math.min(codeSnippet.length, 10), ' ');
  }

  // 5. Generate human explanation, did-you-mean suggestion, and actionable fix
  const diagnostic = getDiagnosticAdvice(errorType, errorMessage, codeSnippet, sourceCode, lineNumber);

  return {
    errorType,
    errorMessage: errorMessage || cleanStderr.split('\n').pop() || 'Execution failed',
    lineNumber,
    codeSnippet,
    pointerLine,
    humanExplanation: diagnostic.explanation,
    suggestedFix: diagnostic.fix,
    didYouMean: diagnostic.didYouMean || null,
    stackFrames,
    crashFrame,
    originFrame,
    rawTraceback: cleanStderr
  };
}

function getDiagnosticAdvice(errorType, message, snippet, sourceCode = '', lineNumber = null) {
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
    case 'NameError': {
      // Extract undefined name: name 'xyz' is not defined
      const nameMatch = message.match(/name\s+['"]([a-zA-Z0-9_]+)['"]\s+is\s+not\s+defined/);
      const undefinedName = nameMatch ? nameMatch[1] : null;
      let didYouMean = null;
      let fix = 'Check for spelling mistakes in variable/function names, or ensure the variable is defined before this line.';

      if (undefinedName && sourceCode) {
        const closest = findClosestSymbol(undefinedName, sourceCode);
        if (closest) {
          didYouMean = closest.name;
          if (closest.reason === 'case_mismatch') {
            fix = `Python is case-sensitive. Did you mean \`${closest.name}\` (defined on Line ${closest.line})?`;
          } else {
            fix = `Did you mean \`${closest.name}\` (defined on Line ${closest.line})? Check for typos.`;
          }
        }
      }

      return {
        explanation: undefinedName
          ? `Python tried to use \`${undefinedName}\`, but no variable or function with that name exists in this scope.`
          : 'Python tried to use an identifier that has not been defined or assigned yet.',
        fix,
        didYouMean
      };
    }
    case 'TypeError':
      return {
        explanation: 'An operation or function was applied to an object of an inappropriate or mismatched data type.',
        fix: 'Check the data types being combined (e.g. adding a number to a string). Use explicit type casting like `int()` or `str()`.'
      };
    case 'ZeroDivisionError': {
      let denom = null;
      if (snippet) {
        const divMatch = snippet.match(/(?:\/|\/\/|%)\s*([a-zA-Z_]\w*|\d+)/);
        if (divMatch) {
          denom = divMatch[1];
        }
      }
      if (!denom && sourceCode && lineNumber) {
        const lines = sourceCode.split('\n');
        const errLine = lines[lineNumber - 1] || '';
        const divMatch = errLine.match(/(?:\/|\/\/|%)\s*([a-zA-Z_]\w*|\d+)/);
        if (divMatch) {
          denom = divMatch[1];
        }
      }

      if (denom && denom !== '0') {
        return {
          explanation: `A division (\`/\`, \`//\`, or \`%\`) was attempted with zero as the denominator (\`${denom}\` evaluated to 0), which is mathematically undefined.`,
          fix: `Add a check (e.g. \`if ${denom} != 0:\`) before dividing to prevent division by zero, or handle the zero case.`
        };
      }

      return {
        explanation: 'A division (`/`, `//`, or `%`) was attempted with zero as the denominator, which is mathematically undefined.',
        fix: 'Add a check (e.g. `if denominator != 0:`) before dividing to prevent division by zero.'
      };
    }
    case 'IndexError': {
      // Find all list accesses on the snippet/line: e.g. prices[0], prices[1], prices[3]
      const findMatches = (str) => {
        if (!str) return [];
        return Array.from(str.matchAll(/([a-zA-Z_]\w*)\[\s*(-?\d+|[a-zA-Z_]\w*)\s*\]/g));
      };

      let lineText = snippet || '';
      if ((!lineText || findMatches(lineText).length === 0) && sourceCode && lineNumber) {
        const lines = sourceCode.split('\n');
        lineText = lines[lineNumber - 1] || '';
      }

      const allMatches = findMatches(lineText);
      let chosenMatch = null;

      // Helper to estimate static size of list in source code
      const getListSize = (name) => {
        if (!name || !sourceCode) return null;
        const listDeclRegex = new RegExp(`\\b${name}\\s*=\\s*\\[([^\\]]*)\\]`, 'm');
        const declMatch = sourceCode.match(listDeclRegex);
        if (declMatch) {
          const raw = declMatch[1].trim();
          return raw === '' ? 0 : raw.split(',').filter(item => item.trim().length > 0).length;
        }
        return null;
      };

      if (allMatches.length > 0) {
        // Find which access is out of bounds
        for (const m of allMatches) {
          const lName = m[1];
          const idxStr = m[2];
          const lSize = getListSize(lName);
          const numIdx = parseInt(idxStr, 10);

          if (lSize !== null && !isNaN(numIdx)) {
            if (numIdx >= lSize || numIdx < -lSize) {
              chosenMatch = { listName: lName, indexExpr: idxStr, listSize: lSize };
              break;
            }
          }
        }

        // If no match demonstrably exceeded statically known bounds, pick the last access on the line
        if (!chosenMatch) {
          const last = allMatches[allMatches.length - 1];
          chosenMatch = {
            listName: last[1],
            indexExpr: last[2],
            listSize: getListSize(last[1])
          };
        }
      }

      if (chosenMatch) {
        const { listName, indexExpr, listSize } = chosenMatch;
        if (listSize !== null) {
          const validRange = listSize === 0 ? 'empty' : (listSize === 1 ? 'only index 0' : `indices 0 to ${listSize - 1}`);
          return {
            explanation: `You tried to access index \`${indexExpr}\` in \`${listName}\`, but \`${listName}\` contains ${listSize} item${listSize === 1 ? '' : 's'} (valid: ${validRange}). Python list indices start at 0.`,
            fix: listSize === 0
              ? `List \`${listName}\` is empty. Add elements before accessing it.`
              : `Change \`${listName}[${indexExpr}]\` to a valid index (between 0 and ${listSize - 1}). Note that the last item is at index ${listSize - 1}.`
          };
        }

        return {
          explanation: `You tried to access \`${listName}[${indexExpr}]\`, but the index \`${indexExpr}\` is out of range for the sequence.`,
          fix: `Verify the sequence length with \`len(${listName})\` before indexing. Remember Python uses 0-based indexing (0 to \`len - 1\`).`
        };
      }

      return {
        explanation: 'You tried to access an item in a list or sequence at an index that does not exist.',
        fix: 'Remember Python uses 0-based indexing (0 to `len - 1`). Verify list length with `len(sequence)` before indexing.'
      };
    }
    case 'KeyError': {
      let missingKey = null;
      const keyMatch = message.match(/['"]?([^'"]+)['"]?/);
      if (keyMatch) {
        missingKey = keyMatch[1].trim();
      }

      let dictName = null;
      if (snippet) {
        const dictMatch = snippet.match(/([a-zA-Z_]\w*)\[/);
        if (dictMatch) dictName = dictMatch[1];
      }

      if (missingKey) {
        return {
          explanation: `You tried to access key \`${missingKey}\` in dictionary${dictName ? ` \`${dictName}\`` : ''}, but this key does not exist.`,
          fix: `Use \`${dictName || 'dict'}.get('${missingKey}', default_value)\` for safe lookup, or check \`if '${missingKey}' in ${dictName || 'dict'}:\` first.`
        };
      }

      return {
        explanation: 'You tried to access a dictionary key that does not exist in the dictionary.',
        fix: 'Check if the key is in the dictionary using `key in dict`, or use `dict.get(key, default)` for safe lookup.'
      };
    }
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
