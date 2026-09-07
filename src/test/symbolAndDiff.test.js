import { describe, it, expect } from 'vitest';
import { computeOutputDiff } from '../utils/outputDiff.js';
import { extractSymbols, findClosestSymbol } from '../utils/pythonSymbolAnalyzer.js';

describe('Output Diff & String Mismatch Utility', () => {
  it('detects exact matches', () => {
    const res = computeOutputDiff('25', '25');
    expect(res.isMatch).toBe(true);
    expect(res.hasCaseMismatch).toBe(false);
    expect(res.hasTrailingSpaceMismatch).toBe(false);
  });

  it('detects case mismatch (e.g. hello vs Hello)', () => {
    const res = computeOutputDiff('Hello World', 'hello world');
    expect(res.isMatch).toBe(false);
    expect(res.hasCaseMismatch).toBe(true);
  });

  it('detects trailing whitespace mismatches', () => {
    const res = computeOutputDiff('Result: 50', 'Result: 50  ');
    expect(res.isMatch).toBe(false);
    expect(res.hasTrailingSpaceMismatch).toBe(true);
  });
});

describe('Python Symbol Analyzer & Variable Tracker', () => {
  it('extracts variable assignments, functions, and imports with line numbers', () => {
    const code = `import math\nstudent_name = "Arun"\nstudent_age = 20\ndef calculate_grade(m):\n    return m + 5`;
    const symbols = extractSymbols(code);

    expect(symbols.length).toBe(4);
    expect(symbols.find(s => s.name === 'student_name')).toMatchObject({ line: 2, type: 'variable' });
    expect(symbols.find(s => s.name === 'calculate_grade')).toMatchObject({ line: 4, type: 'function' });
    expect(symbols.find(s => s.name === 'math')).toMatchObject({ line: 1, type: 'import' });
  });

  it('finds closest matching symbol for typo detection', () => {
    const code = `total_score = 100\ncurrent_user = "Abhi"`;
    const match = findClosestSymbol('total_scor', code);
    expect(match).not.toBeNull();
    expect(match.name).toBe('total_score');
  });
});
