import { describe, it, expect } from 'vitest';
import { parsePythonError } from '../utils/pythonErrorFormatter.js';

describe('Python Error Diagnostic & Parsing Engine', () => {
  it('correctly parses NameError with line number and actionable fix', () => {
    const stderr = `Traceback (most recent call last):
  File "<exec>", line 3, in <module>
NameError: name 'total_sum' is not defined`;

    const code = `a = 10\nb = 20\nprint(total_sum)`;
    const result = parsePythonError(stderr, code);

    expect(result).not.toBeNull();
    expect(result.errorType).toBe('NameError');
    expect(result.lineNumber).toBe(3);
    expect(result.codeSnippet).toBe('print(total_sum)');
    expect(result.humanExplanation).toContain('identifier that has not been defined');
    expect(result.suggestedFix).toContain('spelling mistakes');
  });

  it('correctly parses SyntaxError with caret line', () => {
    const stderr = `  File "<exec>", line 2
    if x == 10
              ^
SyntaxError: expected ':'`;

    const code = `x = 10\nif x == 10\n    print("yes")`;
    const result = parsePythonError(stderr, code);

    expect(result).not.toBeNull();
    expect(result.errorType).toBe('SyntaxError');
    expect(result.lineNumber).toBe(2);
    expect(result.pointerLine).toContain('^');
    expect(result.suggestedFix).toContain('missing colons');
  });

  it('correctly parses ZeroDivisionError', () => {
    const stderr = `Traceback (most recent call last):
  File "<exec>", line 1, in <module>
ZeroDivisionError: division by zero`;

    const result = parsePythonError(stderr, 'print(10 / 0)');

    expect(result).not.toBeNull();
    expect(result.errorType).toBe('ZeroDivisionError');
    expect(result.lineNumber).toBe(1);
    expect(result.humanExplanation).toContain('zero as the denominator');
    expect(result.suggestedFix).toContain('division by zero');
  });

  it('correctly parses Pyodide wrapped TypeError with CRLF', () => {
    const stderr = `PythonError: TypeError: can only concatenate str (not "int") to str\r\n  File "<exec>", line 1, in <module>\r\n`;
    const code = `print("Age: " + 25)`;
    const result = parsePythonError(stderr, code);

    expect(result).not.toBeNull();
    expect(result.errorType).toBe('TypeError');
    expect(result.lineNumber).toBe(1);
    expect(result.codeSnippet).toBe('print("Age: " + 25)');
    expect(result.humanExplanation).toContain('inappropriate or mismatched data type');
  });

  it('correctly parses IndentationError', () => {
    const stderr = `  File "<exec>", line 2\n    print("indented")\nIndentationError: unexpected indent`;
    const code = `x = 5\n    print("indented")`;
    const result = parsePythonError(stderr, code);

    expect(result).not.toBeNull();
    expect(result.errorType).toBe('IndentationError');
    expect(result.lineNumber).toBe(2);
    expect(result.suggestedFix).toContain('indented');
  });

  it('returns null for empty or invalid stderr', () => {
    expect(parsePythonError('')).toBeNull();
    expect(parsePythonError(null)).toBeNull();
  });
});
