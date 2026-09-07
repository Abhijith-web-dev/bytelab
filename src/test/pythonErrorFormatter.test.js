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
    expect(result.humanExplanation).toContain('total_sum');
    expect(result.suggestedFix).toContain('spelling mistakes');
  });

  it('detects typos and suggests Did You Mean variable from symbol table', () => {
    const stderr = `Traceback (most recent call last):
  File "<exec>", line 4, in <module>
NameError: name 'student_nam' is not defined`;

    const code = `student_name = "Arun"\nstudent_age = 20\nstudent_mark = 87.5\nprint(student_nam)`;
    const result = parsePythonError(stderr, code);

    expect(result).not.toBeNull();
    expect(result.errorType).toBe('NameError');
    expect(result.lineNumber).toBe(4);
    expect(result.didYouMean).toBe('student_name');
    expect(result.suggestedFix).toContain('Did you mean `student_name` (defined on Line 1)?');
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

  it('correctly extracts crash line and call origin line for nested runtime exceptions', () => {
    const stderr = `Traceback (most recent call last):
  File "main.py", line 8, in <module>
    calculate_grade(scores)
  File "main.py", line 4, in calculate_grade
    return total / count
ZeroDivisionError: division by zero`;

    const code = `def calculate_grade(scores):\n    total = sum(scores)\n    count = len(scores)\n    return total / count\n\nscores = []\ncalculate_grade(scores)`;
    const result = parsePythonError(stderr, code);

    expect(result).not.toBeNull();
    expect(result.errorType).toBe('ZeroDivisionError');
    expect(result.lineNumber).toBe(4);
    expect(result.crashFrame).toMatchObject({ line: 4, funcName: 'calculate_grade' });
    expect(result.originFrame).toMatchObject({ line: 8, funcName: '<module>' });
  });

  it('provides detailed IndexError intelligence with list bounds and valid indices', () => {
    const stderr = `Traceback (most recent call last):
  File "main.py", line 2, in <module>
    total = prices[0] + prices[1] + prices[3]
IndexError: list index out of range`;

    const code = `prices = [50, 20, 500]\ntotal = prices[0] + prices[1] + prices[3]`;
    const result = parsePythonError(stderr, code);

    expect(result).not.toBeNull();
    expect(result.errorType).toBe('IndexError');
    expect(result.lineNumber).toBe(2);
    expect(result.humanExplanation).toContain('index `3` in `prices`');
    expect(result.humanExplanation).toContain('3 items (valid: indices 0 to 2)');
    expect(result.suggestedFix).toContain('Change `prices[3]` to a valid index (between 0 and 2)');
  });

  it('provides detailed ZeroDivisionError intelligence when dividing by a variable', () => {
    const stderr = `Traceback (most recent call last):
  File "main.py", line 3, in <module>
    avg = total / count
ZeroDivisionError: division by zero`;

    const code = `total = 100\ncount = 0\navg = total / count`;
    const result = parsePythonError(stderr, code);

    expect(result).not.toBeNull();
    expect(result.errorType).toBe('ZeroDivisionError');
    expect(result.lineNumber).toBe(3);
    expect(result.humanExplanation).toContain('`count` evaluated to 0');
    expect(result.suggestedFix).toContain('if count != 0:');
  });

  it('provides detailed KeyError intelligence with missing key and safe .get suggestion', () => {
    const stderr = `Traceback (most recent call last):
  File "main.py", line 2, in <module>
    print(student['grade'])
KeyError: 'grade'`;

    const code = `student = {'name': 'John'}\nprint(student['grade'])`;
    const result = parsePythonError(stderr, code);

    expect(result).not.toBeNull();
    expect(result.errorType).toBe('KeyError');
    expect(result.lineNumber).toBe(2);
    expect(result.humanExplanation).toContain('key `grade`');
    expect(result.suggestedFix).toContain("student.get('grade', default_value)");
  });

  it('returns null for empty or invalid stderr', () => {
    expect(parsePythonError('')).toBeNull();
    expect(parsePythonError(null)).toBeNull();
  });
});
