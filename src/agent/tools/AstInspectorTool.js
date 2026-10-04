/**
 * AST & Structural Code Inspector Tool (100% Client-Side)
 * Inspects Python code structure, recursion, nesting depth, loops, and anti-patterns.
 */

export class AstInspectorTool {
  static inspect(code = '') {
    const lines = (code || '').split('\n');
    const result = {
      lineCount: lines.length,
      functions: [],
      loops: [],
      maxNestingDepth: 0,
      hasRecursion: false,
      hasInputCall: false,
      inputCount: 0,
      hasPrintCall: false,
      codeSmells: [],
      variables: new Set()
    };

    let currentFunc = null;

    lines.forEach((rawLine, idx) => {
      const lineNum = idx + 1;
      const trimmed = rawLine.trim();
      if (!trimmed || trimmed.startsWith('#')) return;

      // Measure indentation depth (assuming 4 spaces per level)
      const indentMatch = rawLine.match(/^(\s*)/);
      const leadingSpaces = indentMatch ? indentMatch[1].replace(/\t/g, '    ').length : 0;
      const depth = Math.floor(leadingSpaces / 4);
      if (depth > result.maxNestingDepth) {
        result.maxNestingDepth = depth;
      }

      // Detect function definition: def func_name(a, b):
      const funcMatch = trimmed.match(/^def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)\s*:/);
      if (funcMatch) {
        currentFunc = {
          name: funcMatch[1],
          params: funcMatch[2].split(',').map(p => p.trim()).filter(Boolean),
          startLine: lineNum,
          hasReturn: false,
          isRecursive: false,
          indent: leadingSpaces
        };
        result.functions.push(currentFunc);
      } else if (currentFunc && leadingSpaces <= currentFunc.indent && !trimmed.startsWith('#')) {
        currentFunc = null;
      }

      // Detect return statement
      if (currentFunc && trimmed.startsWith('return')) {
        currentFunc.hasReturn = true;
      }

      // Detect recursion (function calling itself within its body)
      if (currentFunc) {
        const callRegex = new RegExp('\\b' + currentFunc.name + '\\s*\\(', 'g');
        if (lineNum > currentFunc.startLine && callRegex.test(trimmed)) {
          currentFunc.isRecursive = true;
          result.hasRecursion = true;
        }
      }

      // Detect loops
      if (/^for\s+[a-zA-Z0-9_,\s]+\s+in\s+/.test(trimmed)) {
        result.loops.push({ type: 'for', line: lineNum, depth });
      } else if (/^while\s+/.test(trimmed)) {
        result.loops.push({ type: 'while', line: lineNum, depth });
      }

      // Detect input() calls
      if (/\binput\s*\(/.test(trimmed)) {
        result.hasInputCall = true;
        result.inputCount += (trimmed.match(/\binput\s*\(/g) || []).length;
      }

      // Detect print() calls
      if (/\bprint\s*\(/.test(trimmed)) {
        result.hasPrintCall = true;
      }

      // Detect common code smells & hazards
      if (/^except\s*:/.test(trimmed)) {
        result.codeSmells.push({
          type: 'bare_except',
          line: lineNum,
          message: 'Catching bare Exception without specifying error type hides unexpected bugs.'
        });
      }

      if (/range\s*\(\s*len\([^)]+\)\s*\+\s*1\s*\)/.test(trimmed)) {
        result.codeSmells.push({
          type: 'off_by_one_range',
          line: lineNum,
          message: 'range(len(...) + 1) frequently leads to IndexError on the final iteration.'
        });
      }

      if (/[a-zA-Z_][a-zA-Z0-9_]*\s+is\s+['"][^'"]*['"]/.test(trimmed)) {
        result.codeSmells.push({
          type: 'identity_comparison_literal',
          line: lineNum,
          message: "Using 'is' to compare strings compares memory identity. Use '==' for value equality."
        });
      }
    });

    result.functions.forEach(fn => {
      if (!fn.hasReturn && /^(get|find|calculate|compute|solve|is_|has_)/i.test(fn.name)) {
        result.codeSmells.push({
          type: 'missing_return',
          line: fn.startLine,
          message: "Function '" + fn.name + "' appears to compute a result but has no return statement."
        });
      }
    });

    return result;
  }
}
