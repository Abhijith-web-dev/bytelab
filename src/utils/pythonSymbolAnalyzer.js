/**
 * Python Symbol Analyzer & Variable Tracker
 * Extracts declared identifiers (variables, functions, classes) from source code,
 * tracks their line definitions, and finds the closest matching symbol for NameErrors.
 */

// Simple Levenshtein distance implementation for typo detection
export function levenshteinDistance(a, b) {
  if (!a || !b) return (a || '').length + (b || '').length;
  const matrix = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // deletion
        matrix[i][j - 1] + 1,      // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[a.length][b.length];
}

/**
 * Parses Python source code to extract declared identifiers (variables, functions, imports)
 * @param {string} sourceCode 
 * @returns {Array<{name: string, line: number, type: string}>}
 */
export function extractSymbols(sourceCode = '') {
  if (!sourceCode || typeof sourceCode !== 'string') return [];

  const lines = sourceCode.split('\n');
  const symbols = [];
  const seen = new Set();

  lines.forEach((rawLine, idx) => {
    const lineNum = idx + 1;
    // Strip comments
    const line = rawLine.split('#')[0].trim();
    if (!line) return;

    // 1. Variable Assignment: var_name = ... or a, b = 1, 2
    const assignMatch = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*(?:\s*,\s*[a-zA-Z_][a-zA-Z0-9_]*)*)\s*(?::\s*[^=]+)?\s*=(?!=)/);
    if (assignMatch) {
      const vars = assignMatch[1].split(',').map(v => v.trim());
      vars.forEach(v => {
        if (v && !seen.has(v)) {
          seen.add(v);
          symbols.push({ name: v, line: lineNum, type: 'variable' });
        }
      });
    }

    // 2. Function Definitions: def func_name(...)
    const defMatch = line.match(/^def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/);
    if (defMatch) {
      const name = defMatch[1];
      if (!seen.has(name)) {
        seen.add(name);
        symbols.push({ name, line: lineNum, type: 'function' });
      }
    }

    // 3. Class Definitions: class ClassName(...)
    const classMatch = line.match(/^class\s+([a-zA-Z_][a-zA-Z0-9_]*)/);
    if (classMatch) {
      const name = classMatch[1];
      if (!seen.has(name)) {
        seen.add(name);
        symbols.push({ name, line: lineNum, type: 'class' });
      }
    }

    // 4. Imports: import math / from math import sqrt, pi
    const importMatch = line.match(/^(?:from\s+[a-zA-Z0-9_.]+\s+)?import\s+([a-zA-Z0-9_,\s*]+)/);
    if (importMatch) {
      const imports = importMatch[1].split(',').map(i => i.trim().split(/\s+as\s+/).pop());
      imports.forEach(imp => {
        if (imp && imp !== '*' && !seen.has(imp)) {
          seen.add(imp);
          symbols.push({ name: imp, line: lineNum, type: 'import' });
        }
      });
    }
  });

  return symbols;
}

/**
 * Finds the closest declared symbol for an unknown identifier
 * @param {string} unknownName 
 * @param {string} sourceCode 
 * @param {number} maxDistance Maximum allowed Levenshtein distance
 * @returns {{name: string, line: number, type: string, distance: number, reason?: string}|null}
 */
export function findClosestSymbol(unknownName, sourceCode, maxDistance = 3) {
  if (!unknownName || !sourceCode) return null;
  const symbols = extractSymbols(sourceCode);
  if (symbols.length === 0) return null;

  let closest = null;
  let minDistance = Infinity;

  const targetLower = unknownName.toLowerCase();

  for (const sym of symbols) {
    if (sym.name === unknownName) continue; // Same exact name

    // Check case-insensitive exact match
    if (sym.name.toLowerCase() === targetLower) {
      return { ...sym, distance: 0, reason: 'case_mismatch' };
    }

    const dist = levenshteinDistance(unknownName, sym.name);
    if (dist < minDistance && dist <= maxDistance) {
      minDistance = dist;
      closest = { ...sym, distance: dist };
    }
  }

  return closest;
}
