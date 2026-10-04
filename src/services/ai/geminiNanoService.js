/**
 * Chrome Built-in AI (Gemini Nano) Socratic Debugging Service
 * 
 * Leverages the browser's local, on-device Gemini Nano language model
 * via the W3C Web Incubator Prompt API (window.ai.languageModel) to generate
 * zero-latency, private, educational Socratic hints for Python errors.
 * 
 * STRICT PEDAGOGICAL POLICY:
 * This service explicitly forbids giving away code solutions. It scaffolds
 * the student's cognitive model with gentle clues, conceptual analogies,
 * and guided questions so the student fixes the bug themselves.
 */

import { extractSymbols, findClosestSymbol } from '../../utils/pythonSymbolAnalyzer.js';
import { diffStepVariables } from '../../utils/traceExecutionHelper.js';
import { computeOutputDiff } from '../../utils/outputDiff.js';
import aiModelManager from './aiModelManager.js';


export const SOCRATIC_HINT_SCHEMA = {
  type: "object",
  properties: {
    errorCategory: {
      type: "string",
      enum: ["SyntaxError", "NameError", "TypeError", "IndentationError", "IndexError", "ZeroDivisionError", "LogicError", "Other"]
    },
    diagnosis: { type: "string", description: "One clear sentence diagnosing what went wrong" },
    hintLevel1Concept: { type: "string", description: "Conceptual question guiding student reasoning" },
    hintLevel2Clue: { type: "string", description: "More specific clue mentioning relevant variable or line" },
    hintLevel3Rule: { type: "string", description: "Specific rule or syntax to check, without giving code" },
    fixIdea: { type: "string", description: "1-2 actionable sentences describing what to change" }
  },
  required: ["diagnosis", "hintLevel1Concept", "hintLevel2Clue", "hintLevel3Rule", "fixIdea"]
};

export const PRACTICE_LOGIC_SCHEMA = {
  type: "object",
  properties: {
    logicDiagnosis: { type: "string", description: "Explanation of difference between actual and expected logic" },
    hintLevel1Concept: { type: "string", description: "High-level algorithmic concept to rethink" },
    hintLevel2Clue: { type: "string", description: "Targeted clue pointing to loop, condition, or transformation" },
    hintLevel3Rule: { type: "string", description: "Edge case or boundary behavior rule to inspect" },
    fixIdea: { type: "string", description: "Actionable sentence on how to approach the fix" }
  },
  required: ["logicDiagnosis", "hintLevel1Concept", "hintLevel2Clue", "hintLevel3Rule", "fixIdea"]
};

export const TRACE_INSIGHT_SCHEMA = {
  type: "object",
  properties: {
    stepDiagnosis: { type: "string", description: "Diagnosis of the state mutation or exception in this step" },
    hint: { type: "string", description: "Socratic clue for why this step occurred" },
    fixIdea: { type: "string", description: "Actionable suggestion to address this step's behavior" }
  },
  required: ["stepDiagnosis", "hint", "fixIdea"]
};

export const SOCRATIC_SYSTEM_PROMPT = `You are an expert, empathetic Python tutor inside ByteLab's browser-based coding laboratory.
A student encountered an error in their Python program. Your goal is to analyze their ENTIRE code context, explain the root cause of their mistake, and guide them on how to update their code.

CRITICAL INSTRUCTIONS:
1. NEVER output the corrected Python code or replacement statements (NEVER use markdown triple-backtick code blocks).
2. Format your response into three clear sections:
   [Diagnosis] 1 clear sentence explaining what mistake the user made in the context of the whole program.
   [Hint] 1 targeted Socratic question or clue that guides the student to reason through the problem.
   [Fix Idea] 1-2 actionable sentences describing the idea for updating and modifying the code to resolve the error.
3. Keep the total output under 100 words so it fits cleanly in an IDE card.`;

/**
 * Checks whether Chrome Built-in AI (Gemini Nano) is available in the current browser.
 * @returns {Promise<{ available: 'readily' | 'after-download' | 'no', status: 'available' | 'downloading' | 'unavailable', model: string }>}
 */
export async function checkGeminiNanoCapability() {
  return aiModelManager.checkAvailability();
}

/**
 * Sanitizes any AI-generated text to ensure no solution code leaks through.
 * Strips code blocks and replaces full code statements with pedagogical prompts.
 */
export function sanitizeSocraticHint(text) {
  if (!text || typeof text !== 'string') return '';

  // 1. Strip triple-backtick markdown blocks entirely
  let clean = text.replace(/```[a-z]*\n?[\s\S]*?```/gi, '');

  // 2. Strip telltale solution preamble sentences
  clean = clean.replace(/(?:here is the (?:fixed|corrected) code|replace line \d+ with|write this instead|you should write):?/gi, '');

  // 3. Inspect inline backticks: allow short single tokens, sanitize full expressions
  clean = clean.replace(/`([^`]+)`/g, (match, snippet) => {
    if (
      snippet.length > 25 ||
      snippet.includes('=') ||
      snippet.includes('print(') ||
      snippet.includes('def ') ||
      snippet.includes('return ')
    ) {
      return '[check your code structure]';
    }
    return match;
  });

  // 4. Clean up any leftover duplicate whitespace
  return clean.replace(/\n\s*\n/g, '\n').trim();
}

/**
 * Curated Socratic fallback hints for 15+ Python exception types.
 * Used when Gemini Nano is unavailable or while downloading.
 */
export const FALLBACK_SOCRATIC_HINTS = {
  NameError: {
    level1: "Python encountered an identifier (variable or function) that has not been defined in memory yet.",
    level2: "Check the spelling of the name and verify whether you defined it on an earlier line before using it.",
    level3: "Did you misspell the variable name, forget to assign it a value first, or forget quotes around a string?"
  },
  TypeError: {
    level1: "An operation was performed on data types that are incompatible with each other.",
    level2: "Look at the values on either side of the operator or function call. What type is each value (e.g. number vs text)?",
    level3: "Python cannot automatically combine strings and integers (like `5 + '10'`). Do you need to convert one type using `int()` or `str()`?"
  },
  SyntaxError: {
    level1: "Python could not parse the structure of your code because it breaks Python's grammatical rules.",
    level2: "Inspect the exact line and the line immediately above it. Look for missing punctuation like colons `:`, unclosed quotes, or unmatched parentheses.",
    level3: "Did you forget a colon `:` after an `if`, `for`, or `def`? Or is there an unclosed `(` or `\"` on the previous line?"
  },
  IndentationError: {
    level1: "Python uses indentation (spaces) to determine which block of code belongs together.",
    level2: "Look at the indentation of this line compared to the header line above it.",
    level3: "Statements inside `if`, `elif`, `else`, `for`, `while`, or `def` must be indented consistently (standard is 4 spaces)."
  },
  TabError: {
    level1: "Your code mixes physical Tab characters with Space characters for indentation.",
    level2: "Python strictly requires consistent indentation characters throughout the file.",
    level3: "Replace all Tab characters with 4 spaces to keep indentation uniform."
  },
  ZeroDivisionError: {
    level1: "In mathematics and computer science, division by zero is undefined.",
    level2: "Look at the denominator in your division or modulus operation. Why did it evaluate to 0?",
    level3: "Add a condition check (e.g., `if denominator != 0:`) before dividing, or trace why the variable became 0."
  },
  IndexError: {
    level1: "The program tried to access an item at an index position that does not exist in the collection.",
    level2: "Remember that Python uses 0-based indexing: a list with 3 elements only has indexes 0, 1, and 2.",
    level3: "Check `len(collection)`. Is the index you are requesting greater than or equal to the collection's total length?"
  },
  KeyError: {
    level1: "The program tried to retrieve a dictionary value using a key that does not exist in the dictionary.",
    level2: "Verify that the key is spelled correctly, matches the right data type, and is present in the dictionary.",
    level3: "Consider checking `if key in dict:` first, or use the safe dictionary retrieval method `dict.get(key, default)`."
  },
  ValueError: {
    level1: "A function received an argument with the correct data type but an inappropriate value.",
    level2: "Look at what input value was passed into the function (like trying to convert the word 'hello' into an integer).",
    level3: "Ensure the string contains only digits before calling `int()`, or verify valid function argument ranges."
  },
  AttributeError: {
    level1: "The code tried to call a method or access an attribute that does not exist on this specific object type.",
    level2: "Check what type of object you are calling the method on. Does that data type support this method?",
    level3: "For example, strings have `.lower()`, but numbers do not. Check whether your variable holds what you expect."
  },
  UnboundLocalError: {
    level1: "A variable inside a function was referenced before any local value was assigned to it.",
    level2: "Python treats any variable assigned inside a function as local unless declared otherwise.",
    level3: "Make sure you initialize the variable inside the function before reading it, or review variable scope."
  },
  RecursionError: {
    level1: "A recursive function kept calling itself until it exceeded Python's maximum call stack limit.",
    level2: "Look at the base case (stopping condition) of your recursive function.",
    level3: "Is there a base case that halts the recursion? Are the function arguments moving closer to the base case on each call?"
  },
  ImportError: {
    level1: "Python could not find or load the requested module or library.",
    level2: "Check for typos in the module name.",
    level3: "In this in-browser sandbox, standard library modules are available (math, random, sys, json, etc.)."
  },
  ModuleNotFoundError: {
    level1: "The specified module name does not exist in the Python environment.",
    level2: "Verify that the library name is spelled correctly.",
    level3: "Ensure you are importing a standard Python module (like `math` or `random`)."
  },
  AssertionError: {
    level1: "An `assert` statement evaluated to `False`, signaling that an expected condition failed.",
    level2: "Compare what actual value was produced versus what the test condition expected.",
    level3: "Review the logic calculating the result to see why it diverged from the expected condition."
  },
  RuntimeError: {
    level1: "An unexpected condition occurred during program execution that halted the interpreter.",
    level2: "Inspect the line where the program halted and check the current state of variables.",
    level3: "Trace the execution leading up to this line to identify what unexpected value caused the crash."
  }
};

/**
 * Parses structured sections ([Diagnosis], [Hint], [Fix Idea]) from raw AI output.
 */
export function parseNanoStructuredOutput(rawText, fallbackObj) {
  if (!rawText || typeof rawText !== 'string') return fallbackObj;

  const clean = sanitizeSocraticHint(rawText);
  let diagnosis = fallbackObj.diagnosis;
  let hint = fallbackObj.hint;
  let fixIdea = fallbackObj.fixIdea;

  const diagMatch = clean.match(/(?:\[Diagnosis\]|Diagnosis:)\s*([\s\S]*?)(?=(?:\[(?:Hint|Fix Idea)\]|Hint:|Fix Idea:)|$)/i);
  if (diagMatch && diagMatch[1].trim()) {
    diagnosis = diagMatch[1].trim();
  }

  const hintMatch = clean.match(/(?:\[Hint\]|Hint:)\s*([\s\S]*?)(?=(?:\[(?:Diagnosis|Fix Idea)\]|Diagnosis:|Fix Idea:)|$)/i);
  if (hintMatch && hintMatch[1].trim()) {
    hint = hintMatch[1].trim();
  }

  const fixMatch = clean.match(/(?:\[Fix Idea\]|Fix Idea:)\s*([\s\S]*?)(?=(?:\[(?:Diagnosis|Hint)\]|Diagnosis:|Hint:)|$)/i);
  if (fixMatch && fixMatch[1].trim()) {
    fixIdea = fixMatch[1].trim();
  }

  // If tags were not used, use clean text as hint
  if (!diagMatch && !hintMatch && !fixMatch && clean.length > 15) {
    hint = clean;
  }

  return { diagnosis, hint, fixIdea };
}

/**
 * Intelligent full-code AST and contextual error diagnosis engine.
 * Inspects entire code context, symbol definitions, types, and structure.
 */
export function analyzeFullCodeDiagnosis({
  errorType = 'RuntimeError',
  errorMessage = '',
  lineNumber = 1,
  codeSnippet = '',
  fullCode = '',
  hintLevel = 1
}) {
  const symbols = extractSymbols(fullCode);
  const lines = (fullCode || '').split('\n');
  const targetLineContent = codeSnippet || (lines[lineNumber - 1] ? lines[lineNumber - 1].trim() : '');

  let diagnosis = '';
  let hint = '';
  let fixIdea = '';
  let symbolMatch = null;

  switch (errorType) {
    case 'NameError': {
      const nameMatch = (errorMessage || '').match(/name\s+['"]([a-zA-Z0-9_]+)['"]\s+is\s+not\s+defined/);
      const undefinedName = nameMatch ? nameMatch[1] : null;

      if (undefinedName) {
        // 1. Check if defined later in code (forward reference)
        const futureDef = symbols.find(s => s.name === undefinedName && s.line > lineNumber);
        if (futureDef) {
          diagnosis = `The variable '${undefinedName}' is defined on line ${futureDef.line}, but you referenced it earlier on line ${lineNumber} before Python executed its creation.`;
          hint = `Python executes sequentially from top to bottom. A variable cannot be read before its assignment statement is reached.`;
          fixIdea = `Move the definition of '${undefinedName}' above line ${lineNumber}, or assign it a value before referencing it.`;
          symbolMatch = futureDef;
          break;
        }

        // 2. Check for typo / case-mismatch in declared symbols
        const closest = findClosestSymbol(undefinedName, fullCode);
        if (closest) {
          symbolMatch = closest;
          if (closest.reason === 'case_mismatch') {
            diagnosis = `The variable '${undefinedName}' on line ${lineNumber} does not match the capitalization of '${closest.name}', which was declared on line ${closest.line}.`;
            hint = `Python is strictly case-sensitive ('${closest.name}' is different from '${undefinedName}').`;
            fixIdea = `Update line ${lineNumber} to use the exact casing '${closest.name}' as defined on line ${closest.line}.`;
            break;
          } else if (closest.distance <= 2) {
            diagnosis = `The identifier '${undefinedName}' on line ${lineNumber} appears to be a typo for '${closest.name}', which was declared on line ${closest.line}.`;
            hint = `Compare the spelling of '${undefinedName}' with your declared variable '${closest.name}' on line ${closest.line}.`;
            fixIdea = `Update line ${lineNumber} to replace '${undefinedName}' with '${closest.name}'.`;
            break;
          }
        }

        // 3. Built-in keywords / functions typo check
        const commonBuiltins = {
          prnt: 'print',
          pritn: 'print',
          prin: 'print',
          lenght: 'len',
          lengt: 'len',
          rang: 'range',
          rnage: 'range',
          inpt: 'input',
          iput: 'input',
          retun: 'return',
          retrun: 'return'
        };
        if (commonBuiltins[undefinedName.toLowerCase()]) {
          const correctBuiltin = commonBuiltins[undefinedName.toLowerCase()];
          diagnosis = `'${undefinedName}' on line ${lineNumber} is a typo for Python's built-in '${correctBuiltin}'.`;
          hint = `Check the spelling of Python's standard built-in '${correctBuiltin}'.`;
          fixIdea = `Update '${undefinedName}' to '${correctBuiltin}' on line ${lineNumber}.`;
          break;
        }

        // 4. Missing string quotes check (e.g. print(hello))
        if (targetLineContent && targetLineContent.includes(undefinedName)) {
          diagnosis = `Python interpreted '${undefinedName}' as a variable name because it is not enclosed in quotes.`;
          hint = `Did you intend '${undefinedName}' to be a text string rather than a variable in memory?`;
          fixIdea = `Enclose '${undefinedName}' in quotation marks (e.g. "${undefinedName}") or define '${undefinedName} = ...' beforehand.`;
          break;
        }
      }

      diagnosis = `Python encountered an identifier that has not been defined in memory yet.`;
      hint = `Check the spelling of the name and ensure it is assigned before line ${lineNumber}.`;
      fixIdea = `Define the variable on an earlier line or correct any typos in its name.`;
      break;
    }

    case 'TypeError': {
      if (fullCode.includes('input(') && (errorMessage.includes('str') || targetLineContent.includes('+'))) {
        diagnosis = `The 'input()' function always returns a string (text), which cannot be directly combined with numbers.`;
        hint = `Python cannot automatically combine strings and numbers in mathematical operations.`;
        fixIdea = `Wrap your 'input()' with 'int()' or 'float()' (e.g. 'int(input(...))') to convert the text to a number before calculation.`;
      } else if (errorMessage.includes('not callable')) {
        diagnosis = `A non-function object was called using parentheses () on line ${lineNumber}.`;
        hint = `Did you name a variable 'str', 'int', or 'list', accidentally overriding Python's built-in functions?`;
        fixIdea = `Rename any variable shadowing a built-in function, or remove the trailing '()' after the variable.`;
      } else {
        diagnosis = `An operation was performed between incompatible data types on line ${lineNumber}.`;
        hint = `Look at the values on both sides of the operator. Python requires explicit type conversion.`;
        fixIdea = `Convert the number using 'str()' for concatenation, or convert the string using 'int()' or 'float()' for arithmetic.`;
      }
      break;
    }

    case 'IndentationError': {
      // Find previous non-empty line
      let parentHeader = null;
      for (let i = lineNumber - 2; i >= 0; i--) {
        const prev = lines[i].trim();
        if (prev && !prev.startsWith('#')) {
          const match = prev.match(/^(def|if|elif|else|for|while|try|except|class|with)\b/);
          if (match) {
            parentHeader = { keyword: match[1], line: i + 1, content: prev };
            break;
          }
        }
      }

      if (parentHeader) {
        diagnosis = `Line ${lineNumber} has incorrect indentation relative to the '${parentHeader.keyword}' block started on line ${parentHeader.line}.`;
        hint = `In Python, all statements inside a block must be indented with 4 spaces relative to the header line.`;
        fixIdea = `Add 4 spaces of indentation to line ${lineNumber} to place it properly inside the '${parentHeader.keyword}' block.`;
      } else {
        diagnosis = `Line ${lineNumber} has inconsistent indentation with the rest of your program.`;
        hint = `Python uses 4 spaces per indentation level. Ensure all lines in the same block have identical spacing.`;
        fixIdea = `Adjust the indentation of line ${lineNumber} to match its enclosing block using 4 spaces.`;
      }
      break;
    }

    case 'SyntaxError': {
      const isHeader = targetLineContent.match(/^(def|if|elif|else|for|while|try|except|class|with)\b/);
      if (isHeader && !targetLineContent.endsWith(':')) {
        diagnosis = `Line ${lineNumber} is missing a required colon ':' at the end of the compound statement header.`;
        hint = `Every statement header in Python ('if', 'for', 'def', etc.) must end with a colon ':'.`;
        fixIdea = `Add a colon ':' to the very end of line ${lineNumber}.`;
      } else if (targetLineContent.match(/^if\b.*=[^=]/)) {
        diagnosis = `You used a single equals '=' (assignment) inside an 'if' condition on line ${lineNumber}.`;
        hint = `Single '=' assigns a value, whereas double '==' checks if two values are equal.`;
        fixIdea = `Change '=' to '==' on line ${lineNumber} to compare values.`;
      } else {
        diagnosis = `Python could not parse line ${lineNumber} because it violates Python grammatical syntax.`;
        hint = `Inspect line ${lineNumber} and the line above it for missing colons ':', unclosed quotes, or mismatched brackets.`;
        fixIdea = `Check for missing colons, close any unclosed parentheses, or verify valid Python syntax.`;
      }
      break;
    }

    case 'IndexError': {
      diagnosis = `The program attempted to access an element at an index that does not exist in the collection on line ${lineNumber}.`;
      hint = `Python uses 0-based indexing: a collection of length N has valid indexes from 0 to N - 1.`;
      fixIdea = `Verify collection length with 'len(...)' and update the index to stay strictly within valid bounds.`;
      break;
    }

    case 'ZeroDivisionError': {
      diagnosis = `A division or modulo operation evaluated with a denominator equal to 0 on line ${lineNumber}.`;
      hint = `In mathematics and computer science, division by zero is undefined.`;
      fixIdea = `Add a guard condition (e.g. 'if divisor != 0:') before dividing, or check why the denominator evaluated to 0.`;
      break;
    }

    case 'KeyError': {
      diagnosis = `The dictionary key requested on line ${lineNumber} does not exist in the dictionary.`;
      hint = `Does the dictionary contain this exact key, including spelling and data type?`;
      fixIdea = `Use 'dict.get(key, default)' to safely access the key without crashing, or verify the key was added.`;
      break;
    }

    case 'AttributeError': {
      diagnosis = `The object on line ${lineNumber} does not possess the method or attribute being accessed.`;
      hint = `Check the data type of the object. Does that type support this method?`;
      fixIdea = `Verify the spelling of the method, or check what data type is held by the variable on line ${lineNumber}.`;
      break;
    }

    case 'ValueError': {
      diagnosis = `A function on line ${lineNumber} received an argument of the correct type but an inappropriate value.`;
      hint = `Look at the value passed in. For example, converting non-numeric text to an integer causes a ValueError.`;
      fixIdea = `Ensure the value contains valid digits before converting, or validate the input range.`;
      break;
    }

    case 'UnboundLocalError': {
      diagnosis = `The variable on line ${lineNumber} was referenced before being assigned a local value inside the function.`;
      hint = `Python assumes any variable assigned inside a function is local unless declared 'global'.`;
      fixIdea = `Initialize the variable inside the function before reading it, or declare 'global' if updating an outer variable.`;
      break;
    }

    case 'RecursionError': {
      diagnosis = `The recursive function exceeded the maximum recursion depth without reaching a base case.`;
      hint = `Does your recursive function have a stopping condition that prevents infinite self-calls?`;
      fixIdea = `Add a base case condition that returns a value without making another recursive call.`;
      break;
    }

    default: {
      const fallback = FALLBACK_SOCRATIC_HINTS[errorType] || FALLBACK_SOCRATIC_HINTS.RuntimeError;
      diagnosis = fallback.level1;
      hint = fallback.level2;
      fixIdea = fallback.level3;
      break;
    }
  }

  const fallback = FALLBACK_SOCRATIC_HINTS[errorType] || FALLBACK_SOCRATIC_HINTS.RuntimeError;

  // Synthesize progressive hint text according to ladder level
  let hintText = '';
  if (hintLevel === 1) {
    hintText = fallback.level1;
  } else if (hintLevel === 2) {
    hintText = fallback.level2;
    if (hint && hint !== fallback.level2) {
      hintText += ` ${hint}`;
    }
  } else {
    hintText = fallback.level3;
    if (fixIdea && !hintText.includes(fixIdea)) {
      hintText += ` ${fixIdea}`;
    }
  }

  if (targetLineContent) {
    hintText += ` Look closely at line ${lineNumber}: \`${targetLineContent.trim()}\`.`;
  }

  return {
    diagnosis,
    hint: hintText,
    fixIdea,
    symbolMatch
  };
}

/**
 * Session cache for Gemini Nano to avoid recreating sessions on every hint request.
 */
// Session caching delegated to aiModelManager singleton
let cachedSession = null;

/**
 * Generates an accurate Socratic hint, diagnosis, and fix idea using either
 * on-device Gemini Nano or the enhanced full-code AST contextual engine.
 * 
 * @param {Object} options
 * @param {string} options.errorType - Python exception family (e.g. 'NameError')
 * @param {string} options.errorMessage - The message text from the interpreter
 * @param {number} options.lineNumber - The line number where the error occurred
 * @param {string} options.codeSnippet - The specific line of code that failed
 * @param {string} options.fullCode - The entire student program
 * @param {number} [options.hintLevel=1] - Socratic ladder level (1: Concept, 2: Clue, 3: Rule)
 * @param {function} [options.onToken] - Optional callback for streaming tokens
 * @returns {Promise<{ diagnosis: string, hint: string, fixIdea: string, source: 'gemini-nano' | 'local-heuristic', level: number, symbolMatch?: any }>}
 */
export async function generateSocraticHint({
  errorType = 'RuntimeError',
  errorMessage = '',
  lineNumber = 1,
  codeSnippet = '',
  fullCode = '',
  hintLevel = 1,
  onToken = null
}) {
  // 1. First generate accurate contextual baseline using full-code AST inspection
  const localAnalysis = analyzeFullCodeDiagnosis({
    errorType,
    errorMessage,
    lineNumber,
    codeSnippet,
    fullCode,
    hintLevel
  });

  const capability = await checkGeminiNanoCapability();

  // 2. If Gemini Nano is readily available on-device, enhance with LLM reasoning
  if (capability.status === 'available') {
    try {
      const session = await aiModelManager.getOrCreateSession({
        systemPrompt: SOCRATIC_SYSTEM_PROMPT,
        temperature: 0.2,
        topK: 3
      });

      if (session) {
        // Format full code with line numbers for Gemini Nano
        const numberedCode = (fullCode || codeSnippet || '')
          .split('\n')
          .map((line, idx) => `${idx + 1}: ${line}`)
          .join('\n');

        const userPrompt = `Student Program:
\`\`\`python
${numberedCode}
\`\`\`

Error Details:
- Crash Line: Line ${lineNumber}
- Offending Line: ${codeSnippet || (fullCode.split('\n')[lineNumber - 1] || '')}
- Error Type: ${errorType}
- Error Message: ${errorMessage}
- Hint Level: Level ${hintLevel} of 3

Provide structured pedagogical response following the schema.`;

        if (typeof session.promptStreaming === 'function' && onToken) {
          try {
            const stream = session.promptStreaming(userPrompt);
            for await (const chunk of stream) {
              const parsed = parseNanoStructuredOutput(chunk, localAnalysis);
              onToken(parsed.hint || sanitizeSocraticHint(chunk));
            }
          } catch (_) {}
        }

        const { raw, parsed } = await aiModelManager.promptWithConstraint(session, userPrompt, SOCRATIC_HINT_SCHEMA);

        if (parsed && (parsed.diagnosis || parsed.hintLevel1Concept || parsed.hint)) {
          let selectedHint = '';
          if (hintLevel === 1) {
            selectedHint = parsed.hintLevel1Concept || parsed.hint || localAnalysis.hint;
          } else if (hintLevel === 2) {
            selectedHint = parsed.hintLevel2Clue || parsed.hint || localAnalysis.hint;
          } else {
            selectedHint = parsed.hintLevel3Rule || parsed.hint || localAnalysis.hint;
          }

          const diag = sanitizeSocraticHint(parsed.diagnosis || localAnalysis.diagnosis);
          const cleanHint = sanitizeSocraticHint(selectedHint);
          const fix = sanitizeSocraticHint(parsed.fixIdea || localAnalysis.fixIdea);

          if (cleanHint && cleanHint.length > 10) {
            if (onToken) onToken(cleanHint);
            return {
              diagnosis: diag,
              hint: cleanHint,
              fixIdea: fix,
              source: 'gemini-nano',
              level: hintLevel,
              symbolMatch: localAnalysis.symbolMatch
            };
          }
        }

        const structured = parseNanoStructuredOutput(raw, localAnalysis);
        if (structured.hint && structured.hint.length > 10) {
          if (onToken) onToken(structured.hint);
          return {
            diagnosis: structured.diagnosis || localAnalysis.diagnosis,
            hint: structured.hint,
            fixIdea: structured.fixIdea || localAnalysis.fixIdea,
            source: 'gemini-nano',
            level: hintLevel,
            symbolMatch: localAnalysis.symbolMatch
          };
        }
      }
    } catch (err) {
      console.warn('[GeminiNano] Nano inference failed, falling back to contextual heuristic engine:', err);
      aiModelManager.destroySession();
    }
  }

  // 3. Return high-precision local full-code contextual result
  if (onToken) {
    onToken(localAnalysis.hint);
  }

  return {
    diagnosis: localAnalysis.diagnosis,
    hint: localAnalysis.hint,
    fixIdea: localAnalysis.fixIdea,
    source: 'local-heuristic',
    level: hintLevel,
    symbolMatch: localAnalysis.symbolMatch
  };
}

/**
 * Analyzes the delta between execution steps to produce deep contextual diagnostics.
 * Identifies off-by-one errors, unexpected type coercions (like assigning None from .append()),
 * infinite loops / boundary anomalies, and step-level state mutations.
 * 
 * @param {object} options
 * @param {object} options.step - Current execution trace step
 * @param {object} [options.prevStep] - Previous execution trace step
 * @param {Array<object>} [options.diffs] - Variable diffs between steps
 * @param {string} [options.fullCode=''] - Complete Python code
 * @param {number} [options.hintLevel=1] - Socratic ladder level (1-3)
 * @param {function} [options.onToken=null] - Streaming token callback
 * @returns {Promise<{ stepDiagnosis: string, diagnosis: string, hint: string, fixIdea: string, source: 'gemini-nano' | 'local-heuristic', level: number }>}
 */
export async function generateTraceStepInsight({
  step,
  prevStep = null,
  diffs = [],
  fullCode = '',
  hintLevel = 1,
  onToken = null
}) {
  if (!step) {
    return {
      stepDiagnosis: 'No step selected.',
      diagnosis: 'No step selected.',
      hint: 'Select an execution step on the timeline to inspect its state.',
      fixIdea: 'Use the timeline scrubber to navigate through execution steps.',
      source: 'local-heuristic',
      level: hintLevel
    };
  }

  // 1. Compute diffs if not provided
  const effectiveDiffs = (Array.isArray(diffs) && diffs.length > 0)
    ? diffs
    : diffStepVariables(step.locals || {}, prevStep?.locals || {});

  const isException = step.event === 'exception' || Boolean(step.exception);
  const snippet = step.snippet || '';
  const line = step.line || 1;

  let stepDiagnosis = '';
  let hint = '';
  let fixIdea = '';

  // Case A: Exception / Crash Step
  if (isException) {
    const excType = step.exception?.type || 'Exception';
    const excMsg = step.exception?.msg || 'Execution error';

    if (excType === 'ZeroDivisionError') {
      stepDiagnosis = `On Line ${line}, an arithmetic operation attempted to divide or modulo by zero.`;
      hint = `Check the values in memory at Step ${step.step || 'current'}. Which variable or expression evaluated to 0?`;
      fixIdea = `Add a condition (e.g. \`if denominator != 0:\`) before dividing, or check why the divisor became 0.`;
    } else if (excType === 'IndexError') {
      stepDiagnosis = `On Line ${line}, the program tried to access a collection index that exceeds its length.`;
      hint = `Recall that Python uses 0-based indexing (valid indexes are 0 to len - 1). Check what index value was evaluated.`;
      fixIdea = `Ensure loop ranges or index offsets stay strictly within \`range(len(collection))\`.`;
    } else if (excType === 'KeyError') {
      stepDiagnosis = `On Line ${line}, the program requested a dictionary key that does not exist.`;
      hint = `Check the active dictionary keys in memory. Did you misspell the key or expect a different key?`;
      fixIdea = `Use \`dict.get(key, default)\` or guard with \`if key in dict:\` before accessing.`;
    } else {
      stepDiagnosis = `Line ${line} raised ${excType}: ${excMsg}.`;
      hint = `Inspect the variables in memory right before this line executed to see what state caused the crash.`;
      fixIdea = `Review line ${line} and adjust the logic to handle unexpected input or values safely.`;
    }
  } else {
    // Case B: In-place method returning None (e.g. x = list.sort() or x = list.append())
    const noneAssigned = effectiveDiffs.find(d => 
      (d.status === 'changed' || d.status === 'new') && 
      (d.value === 'None' || d.type === 'NoneType')
    );

    if (noneAssigned && (snippet.includes('.append(') || snippet.includes('.sort(') || snippet.includes('.reverse(') || snippet.includes('.extend('))) {
      stepDiagnosis = `Variable '${noneAssigned.name}' became None because list methods like .append() and .sort() modify the list in-place and return None.`;
      hint = `In Python, in-place list methods do not return the updated list. What happens when you assign the result of that method?`;
      fixIdea = `Call '${snippet.trim()}' on its own line without assigning it back to '${noneAssigned.name}'.`;
    }
    // Case C: Unexpected Type Coercion / Mutation
    else if (effectiveDiffs.some(d => d.status === 'changed' && d.previousValue && d.type !== 'unknown')) {
      const changedVar = effectiveDiffs.find(d => d.status === 'changed');
      stepDiagnosis = `Variable '${changedVar.name}' mutated from ${changedVar.previousValue} to ${changedVar.value} on line ${line}.`;
      hint = `Trace how this mutation influences subsequent conditions and calculations in your program.`;
      fixIdea = `Verify whether '${changedVar.name}' should hold this new value or if it was mutated prematurely.`;
    }
    // Case D: Return statement
    else if (step.event === 'return') {
      stepDiagnosis = `The function '${step.func || '<module>'}' returned on line ${line}.`;
      hint = `Check if this return occurred earlier than intended (such as inside the first iteration of a loop).`;
      fixIdea = `Ensure the return statement is at the correct indentation level outside the loop if aggregating.`;
    }
    // Case E: New variable declared
    else if (effectiveDiffs.some(d => d.status === 'new')) {
      const newVars = effectiveDiffs.filter(d => d.status === 'new').map(d => `'${d.name}' (${d.value})`).join(', ');
      stepDiagnosis = `Initialized new variable(s): ${newVars} on line ${line}.`;
      hint = `Consider the initial value. Does this starting value correctly prepare the subsequent algorithm?`;
      fixIdea = `Ensure initial values (e.g. 0 for sums, 1 for products, empty list for collections) match the problem requirements.`;
    }
    // Case F: Normal step
    else {
      stepDiagnosis = `Executed Line ${line}: \`${snippet || 'statement'}\`.`;
      hint = `Observe how execution proceeds from this line into the next statement or branch.`;
      fixIdea = `Step forward or set a breakpoint at a key branch to inspect upcoming logic.`;
    }
  }

  // Adjust hint based on hintLevel
  if (hintLevel === 2) {
    hint = `${hint} Notice the code at line ${line}: \`${snippet || 'active line'}\`.`;
  } else if (hintLevel >= 3) {
    hint = `${hint} ${fixIdea}`;
  }

  // 2. Hybrid routing: Try Gemini Nano if available
  const capability = await checkGeminiNanoCapability();
  if (capability.status === 'available') {
    try {
      const session = await aiModelManager.getOrCreateSession({
        systemPrompt: SOCRATIC_SYSTEM_PROMPT,
        temperature: 0.2,
        topK: 3
      });

      if (session) {
        const stepPrompt = `Execution Step Context:
- Step: ${step.step || 1}
- Line: ${line} (\`${snippet}\`)
- Event: ${step.event || 'line'}
- Variables Before: ${JSON.stringify(prevStep?.locals || {})}
- Variables After: ${JSON.stringify(step.locals || {})}
- Diffs: ${JSON.stringify(effectiveDiffs)}
${isException ? `- Exception: ${step.exception?.type}: ${step.exception?.msg}` : ''}
- Hint Level: ${hintLevel} of 3

Provide structured step insight according to schema.`;

        if (typeof session.promptStreaming === 'function' && onToken) {
          try {
            const stream = session.promptStreaming(stepPrompt);
            for await (const chunk of stream) {
              const parsed = parseNanoStructuredOutput(chunk, { diagnosis: stepDiagnosis, hint, fixIdea });
              onToken(parsed.hint || sanitizeSocraticHint(chunk));
            }
          } catch (_) {}
        }

        const { raw, parsed } = await aiModelManager.promptWithConstraint(session, stepPrompt, TRACE_INSIGHT_SCHEMA);

        if (parsed && (parsed.stepDiagnosis || parsed.diagnosis || parsed.hint)) {
          const sDiag = sanitizeSocraticHint(parsed.stepDiagnosis || parsed.diagnosis || stepDiagnosis);
          const sHint = sanitizeSocraticHint(parsed.hint || hint);
          const sFix = sanitizeSocraticHint(parsed.fixIdea || fixIdea);

          if (sHint && sHint.length > 5) {
            if (onToken) onToken(sHint);
            return {
              stepDiagnosis: sDiag,
              diagnosis: sDiag,
              hint: sHint,
              fixIdea: sFix,
              source: 'gemini-nano',
              level: hintLevel
            };
          }
        }

        const structured = parseNanoStructuredOutput(raw, { diagnosis: stepDiagnosis, hint, fixIdea });
        if (structured.hint && structured.hint.length > 10) {
          if (onToken) onToken(structured.hint);
          return {
            stepDiagnosis: structured.diagnosis || stepDiagnosis,
            diagnosis: structured.diagnosis || stepDiagnosis,
            hint: structured.hint,
            fixIdea: structured.fixIdea || fixIdea,
            source: 'gemini-nano',
            level: hintLevel
          };
        }
      }
    } catch (err) {
      console.warn('[GeminiNano] Step insight inference failed, using heuristic:', err);
    }
  }

  if (onToken) onToken(hint);

  return {
    stepDiagnosis,
    diagnosis: stepDiagnosis,
    hint,
    fixIdea,
    source: 'local-heuristic',
    level: hintLevel
  };
}

/**
 * Compares student's code, failing test case, expected output, and actual output
 * to generate deep Socratic hints for logical flaws (off-by-one, early returns,
 * case mismatches, accumulator errors) without giving away the solution.
 * 
 * @param {object} options
 * @param {string} [options.problemTitle=''] - Title of the challenge
 * @param {string} [options.problemDescription=''] - Description of challenge
 * @param {string} [options.code=''] - Student's Python code
 * @param {object} [options.testCase=null] - Failing test case object
 * @param {string} [options.expectedOutput=''] - Expected output string
 * @param {string} [options.actualOutput=''] - Actual student output string
 * @param {Array<object>} [options.traceSteps=[]] - Optional execution trace steps
 * @param {number} [options.hintLevel=1] - Socratic ladder level (1-3)
 * @param {function} [options.onToken=null] - Streaming token callback
 * @returns {Promise<{ logicDiagnosis: string, diagnosis: string, hint: string, fixIdea: string, source: 'gemini-nano' | 'local-heuristic', level: number }>}
 */
export async function generatePracticeLogicHint({
  problemTitle = '',
  problemDescription = '',
  code = '',
  testCase = null,
  expectedOutput = '',
  actualOutput = '',
  traceSteps = [],
  hintLevel = 1,
  onToken = null
}) {
  const exp = String(expectedOutput ?? testCase?.expectedOutput ?? '').trim();
  const act = String(actualOutput ?? testCase?.actualOutput ?? '').trim();
  const inputStr = String(testCase?.input ?? '').trim();

  let logicDiagnosis = '';
  let hint = '';
  let fixIdea = '';

  // 1. Heuristic Logic Flaw Analysis
  const diff = computeOutputDiff(exp, act);

  // Flaw 1: Casing mismatch (e.g. 'True' vs 'true', 'hello' vs 'Hello')
  if (diff.hasCaseMismatch) {
    logicDiagnosis = `Your output text has the correct characters, but the letter casing differs from what the specification requires.`;
    hint = `Compare the capitalization of your result ('${act}') with the expected output ('${exp}').`;
    fixIdea = `Use Python's string methods like '.lower()', '.upper()', or check boolean capitalization ('True' / 'False').`;
  }
  // Flaw 2: Trailing whitespace / format mismatch
  else if (diff.hasTrailingSpaceMismatch) {
    logicDiagnosis = `Your calculated value is correct, but there is extra or missing whitespace or newlines around it.`;
    hint = `Check if there is an extra trailing space or newline in your output.`;
    fixIdea = `Use '.strip()' or verify the 'end' parameter in 'print(..., end=" ")'.`;
  }
  // Flaw 3: Empty or None output (missing return statement or print vs return)
  else if (!act || act === 'None' || act === '<No Output>') {
    if (code.includes('def ') && !code.includes('return ')) {
      logicDiagnosis = `The function completed without returning a value (it produced 'None').`;
      hint = `Did you use 'print()' inside the function instead of returning the result with 'return'?`;
      fixIdea = `Add a 'return' statement at the end of your function to return the computed result to the caller.`;
    } else {
      logicDiagnosis = `Your program produced no output for the given input.`;
      hint = `Check if your logic enters an 'if' branch that contains no output or return statement.`;
      fixIdea = `Trace execution for input '${inputStr || 'the test input'}' to ensure every path produces a result.`;
    }
  }
  // Flaw 4: Early return inside loop
  else if (code.match(/for\b[\s\S]*return\b/) && !code.match(/if\b[\s\S]*return\b/)) {
    const lines = code.split('\n');
    let insideLoop = false;
    let loopIndent = 0;
    let earlyReturnFound = false;

    for (const l of lines) {
      const matchLoop = l.match(/^(\s*)(for|while)\b/);
      if (matchLoop) {
        insideLoop = true;
        loopIndent = matchLoop[1].length;
        continue;
      }
      if (insideLoop) {
        const matchReturn = l.match(/^(\s*)return\b/);
        if (matchReturn && matchReturn[1].length > loopIndent) {
          earlyReturnFound = true;
          break;
        }
      }
    }

    if (earlyReturnFound) {
      logicDiagnosis = `A 'return' statement is placed directly inside the loop, causing the function to stop immediately on the first iteration.`;
      hint = `Look at the indentation of your 'return'. Does the loop need to process all items before returning?`;
      fixIdea = `Unindent the 'return' statement so it executes only after the loop completes all iterations.`;
    }
  }

  // Flaw 5: Numeric off-by-one error (e.g. act = 9, exp = 10)
  if (!logicDiagnosis) {
    const numExp = Number(exp);
    const numAct = Number(act);
    if (!isNaN(numExp) && !isNaN(numAct)) {
      if (Math.abs(numExp - numAct) === 1) {
        logicDiagnosis = `Your numeric result (${numAct}) is off by 1 from the expected value (${numExp}).`;
        hint = `This is a classic off-by-one condition. Check the boundaries of your 'range(start, stop)' or condition ('<' vs '<=').`;
        fixIdea = `Remember that 'range(a, b)' stops at 'b - 1'. Adjust your boundary or loop starting point by 1.`;
      } else if (numAct === 0 && numExp !== 0 && code.includes('*=')) {
        logicDiagnosis = `Your calculation resulted in 0, likely because an accumulator for multiplication was initialized to 0.`;
        hint = `What happens when you multiply any number by 0? What is the multiplicative identity?`;
        fixIdea = `Initialize multiplication accumulators to 1 instead of 0.`;
      }
    }
  }

  // Flaw 6: Inverted Boolean
  if (!logicDiagnosis) {
    if ((exp === 'True' && act === 'False') || (exp === 'False' && act === 'True')) {
      logicDiagnosis = `Your program returned the opposite boolean value from what was expected.`;
      hint = `Check the comparison operators in your condition (e.g. '<' versus '>', or '==' versus '!=').`;
      fixIdea = `Review the test condition to verify if you should invert the test or swap the returned booleans.`;
    }
  }

  // Fallback diagnostic
  if (!logicDiagnosis) {
    logicDiagnosis = `For input '${inputStr || 'the test case'}', your code produced '${act}' but the problem expected '${exp}'.`;
    hint = `Work backwards: trace what values your variables hold just before the final output is generated.`;
    fixIdea = `Step through your algorithm with sample input '${inputStr || 'provided'}' on paper or in the Time-Travel Debugger.`;
  }

  // Socratic ladder scaling
  let hintText = hint;
  if (hintLevel === 2) {
    hintText = `${hint} (Expected: "${exp}", Got: "${act}")`;
  } else if (hintLevel >= 3) {
    hintText = `${hint} ${fixIdea}`;
  }

  // 2. Hybrid routing: Try Gemini Nano on-device if available
  const capability = await checkGeminiNanoCapability();
  if (capability.status === 'available') {
    try {
      const session = await aiModelManager.getOrCreateSession({
        systemPrompt: SOCRATIC_SYSTEM_PROMPT,
        temperature: 0.2,
        topK: 3
      });

      if (session) {
        const logicPrompt = `Practice Coding Challenge:
Title: ${problemTitle || 'Challenge'}
Description: ${problemDescription ? problemDescription.slice(0, 200) : ''}

Student's Python Code:
\`\`\`python
${code.slice(0, 400)}
\`\`\`

Test Case Failure:
- Input: ${inputStr || '<None>'}
- Expected Output: ${exp}
- Actual Student Output: ${act}
- Hint Level: ${hintLevel} of 3

Provide structured logic diagnostics according to schema.`;

        if (typeof session.promptStreaming === 'function' && onToken) {
          try {
            const stream = session.promptStreaming(logicPrompt);
            for await (const chunk of stream) {
              const parsed = parseNanoStructuredOutput(chunk, { diagnosis: logicDiagnosis, hint: hintText, fixIdea });
              onToken(parsed.hint || sanitizeSocraticHint(chunk));
            }
          } catch (_) {}
        }

        const { raw, parsed } = await aiModelManager.promptWithConstraint(session, logicPrompt, PRACTICE_LOGIC_SCHEMA);

        if (parsed && (parsed.logicDiagnosis || parsed.diagnosis || parsed.hintLevel1Concept || parsed.hint)) {
          let selectedHint = '';
          if (hintLevel === 1) {
            selectedHint = parsed.hintLevel1Concept || parsed.hint || hintText;
          } else if (hintLevel === 2) {
            selectedHint = parsed.hintLevel2Clue || parsed.hint || hintText;
          } else {
            selectedHint = parsed.hintLevel3Rule || parsed.hint || hintText;
          }

          const lDiag = sanitizeSocraticHint(parsed.logicDiagnosis || parsed.diagnosis || logicDiagnosis);
          const cleanHint = sanitizeSocraticHint(selectedHint);
          const cleanFix = sanitizeSocraticHint(parsed.fixIdea || fixIdea);

          if (cleanHint && cleanHint.length > 5) {
            if (onToken) onToken(cleanHint);
            return {
              logicDiagnosis: lDiag,
              diagnosis: lDiag,
              hint: cleanHint,
              fixIdea: cleanFix,
              source: 'gemini-nano',
              level: hintLevel
            };
          }
        }

        const structured = parseNanoStructuredOutput(raw, { diagnosis: logicDiagnosis, hint: hintText, fixIdea });
        if (structured.hint && structured.hint.length > 10) {
          if (onToken) onToken(structured.hint);
          return {
            logicDiagnosis: structured.diagnosis || logicDiagnosis,
            diagnosis: structured.diagnosis || logicDiagnosis,
            hint: structured.hint,
            fixIdea: structured.fixIdea || fixIdea,
            source: 'gemini-nano',
            level: hintLevel
          };
        }
      }
    } catch (err) {
      console.warn('[GeminiNano] Logic hint inference failed, falling back to local heuristic:', err);
    }
  }

  if (onToken) onToken(hintText);

  return {
    logicDiagnosis,
    diagnosis: logicDiagnosis,
    hint: hintText,
    fixIdea,
    source: 'local-heuristic',
    level: hintLevel
  };
}

/**
 * Destroys any active Gemini Nano session to free GPU/RAM resources.
 */
export function destroyGeminiNanoSession() {
  aiModelManager.destroySession();
  cachedSession = null;
}

