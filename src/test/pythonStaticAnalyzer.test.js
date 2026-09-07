import { describe, it, expect } from 'vitest';
import { analyzePythonCode } from '../utils/pythonStaticAnalyzer.js';

describe('Python Pre-Run Static Analyzer', () => {
  it('detects missing colon at the end of if statement', () => {
    const code = `x = 10\nif x == 10\n    print(x)`;
    const warnings = analyzePythonCode(code);
    const colonWarning = warnings.find(w => w.message.includes("Missing ':'"));
    expect(colonWarning).toBeDefined();
    expect(colonWarning.line).toBe(2);
  });

  it('detects accidental single assignment = in if statement', () => {
    const code = `x = 10\nif x = 10:\n    print(x)`;
    const warnings = analyzePythonCode(code);
    const assignWarning = warnings.find(w => w.message.includes("Assignment '=' inside condition"));
    expect(assignWarning).toBeDefined();
    expect(assignWarning.line).toBe(2);
  });

  it('detects Python 2 print statement without parentheses', () => {
    const code = `print "hello world"`;
    const warnings = analyzePythonCode(code);
    const printWarning = warnings.find(w => w.message.includes('Python 3 requires parentheses'));
    expect(printWarning).toBeDefined();
    expect(printWarning.line).toBe(1);
  });

  it('detects possible infinite while True loop without break', () => {
    const code = `while True:\n    x = 1`;
    const warnings = analyzePythonCode(code);
    const loopWarning = warnings.find(w => w.message.includes('infinite loop'));
    expect(loopWarning).toBeDefined();
    expect(loopWarning.line).toBe(1);
  });

  it('does not warn about infinite loop if break statement exists', () => {
    const code = `while True:\n    x = 1\n    if x == 1:\n        break`;
    const warnings = analyzePythonCode(code);
    const loopWarning = warnings.find(w => w.message.includes('infinite loop'));
    expect(loopWarning).toBeUndefined();
  });

  it('identifies unused variables', () => {
    const code = `unused_var = 42\nx = 10\nprint(x)`;
    const warnings = analyzePythonCode(code);
    const unusedWarning = warnings.find(w => w.message.includes("Variable 'unused_var'"));
    expect(unusedWarning).toBeDefined();
    expect(unusedWarning.line).toBe(1);
  });

  it('returns empty array for clean, valid code', () => {
    const code = `def add(a, b):\n    return a + b\n\nresult = add(2, 3)\nprint(result)`;
    const warnings = analyzePythonCode(code);
    expect(warnings.filter(w => w.severity === 'warning')).toHaveLength(0);
  });
});
