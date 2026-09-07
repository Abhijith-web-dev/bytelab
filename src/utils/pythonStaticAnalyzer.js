/**
 * Python Pre-Run Static Code Analyzer
 * Scans code in real time to produce non-blocking warnings and tips (yellow squigglies)
 * before the student runs their program.
 */

export function analyzePythonCode(sourceCode = '') {
  if (!sourceCode || typeof sourceCode !== 'string') return [];

  const warnings = [];
  const lines = sourceCode.split('\n');

  // Strip comments from a line for grammatical checking
  const stripComment = (line) => {
    let inSingle = false;
    let inDouble = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === "'" && !inDouble && (i === 0 || line[i - 1] !== '\\')) inSingle = !inSingle;
      if (ch === '"' && !inSingle && (i === 0 || line[i - 1] !== '\\')) inDouble = !inDouble;
      if (ch === '#' && !inSingle && !inDouble) {
        return line.slice(0, i).trimEnd();
      }
    }
    return line.trimEnd();
  };

  const blockStarters = [
    { pattern: /^\s*(if|elif)\s+/, name: 'conditional' },
    { pattern: /^\s*(else)\s*$/, name: 'else clause' },
    { pattern: /^\s*(def)\s+[a-zA-Z_]\w*\s*\(.*\)\s*$/, name: 'function definition' },
    { pattern: /^\s*(class)\s+[a-zA-Z_]\w*(?:\(.*\))?\s*$/, name: 'class definition' },
    { pattern: /^\s*(for)\s+[a-zA-Z_]\w*(?:\s*,\s*[a-zA-Z_]\w*)*\s+in\s+/, name: 'for loop' },
    { pattern: /^\s*(while)\s+/, name: 'while loop' },
    { pattern: /^\s*(try)\s*$/, name: 'try block' },
    { pattern: /^\s*(except)(?:\s+.*)?$/, name: 'except block' },
    { pattern: /^\s*(finally)\s*$/, name: 'finally block' },
    { pattern: /^\s*(with)\s+/, name: 'with statement' }
  ];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const codePart = stripComment(rawLine);
    const trimmed = codePart.trim();
    if (!trimmed) continue;

    const lineNum = i + 1;

    // 1. Python 2 print statement check: print "hello" vs print("hello")
    if (/^\s*print\s+["'a-zA-Z0-9_\-\[\{]/.test(codePart) && !/^\s*print\s*\(/.test(codePart)) {
      warnings.push({
        line: lineNum,
        column: rawLine.indexOf('print') + 1,
        endColumn: rawLine.length + 1,
        message: 'Python 3 requires parentheses for print: use print(...)',
        severity: 'warning'
      });
      continue;
    }

    // 2. Assignment inside if / elif condition: if x = 5:
    const assignInIfMatch = codePart.match(/^\s*(?:if|elif)\s+.*?(?<![=!<>])=([^=].*)/);
    if (assignInIfMatch && !codePart.includes(':=') && !codePart.includes('==') && !codePart.includes('!=')) {
      // Check if it looks like an accidental single equals
      if (/^\s*(?:if|elif)\s+[a-zA-Z_]\w*\s*=\s*[^=]/.test(codePart)) {
        warnings.push({
          line: lineNum,
          column: codePart.indexOf('=') + 1,
          endColumn: codePart.indexOf('=') + 2,
          message: "Assignment '=' inside condition. Did you mean '==' for comparison?",
          severity: 'warning'
        });
      }
    }

    // 3. Missing trailing colon on compound statements
    for (const starter of blockStarters) {
      if (starter.pattern.test(trimmed)) {
        if (!trimmed.endsWith(':')) {
          warnings.push({
            line: lineNum,
            column: trimmed.length,
            endColumn: trimmed.length + 2,
            message: `Missing ':' at the end of ${starter.name}`,
            severity: 'warning'
          });
        }
        break;
      }
    }
  }

  // 4. Infinite loop without break: while True:
  const hasWhileTrue = /(?:while\s+True\s*:|while\s+1\s*:)/.test(sourceCode);
  if (hasWhileTrue && !/\bbreak\b/.test(sourceCode)) {
    // Find line number of while True
    for (let i = 0; i < lines.length; i++) {
      if (/^\s*while\s+(?:True|1)\s*:/.test(lines[i])) {
        warnings.push({
          line: i + 1,
          column: 1,
          endColumn: lines[i].length + 1,
          message: "Possible infinite loop: 'while True' without a 'break' statement.",
          severity: 'warning'
        });
        break;
      }
    }
  }

  // 5. Unused variables check
  const declaredVars = [];
  for (let i = 0; i < lines.length; i++) {
    const clean = stripComment(lines[i]).trim();
    // match: x = ..., total = ... (not inside def or class or equality ==)
    const varMatch = clean.match(/^([a-zA-Z_]\w*)\s*=\s*[^=]/);
    if (varMatch) {
      const varName = varMatch[1];
      if (!varName.startsWith('_') && !['self', 'cls'].includes(varName)) {
        declaredVars.push({ name: varName, line: i + 1 });
      }
    }
  }

  // Check if each declared variable appears at least twice in the entire code (once for assignment, once for usage)
  for (const item of declaredVars) {
    const varRegex = new RegExp(`\\b${item.name}\\b`, 'g');
    const occurrences = (sourceCode.match(varRegex) || []).length;
    if (occurrences <= 1) {
      warnings.push({
        line: item.line,
        column: 1,
        endColumn: item.name.length + 1,
        message: `Variable '${item.name}' is assigned on line ${item.line} but never used.`,
        severity: 'info'
      });
    }
  }

  return warnings;
}
