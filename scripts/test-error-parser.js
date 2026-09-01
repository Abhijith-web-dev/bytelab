import { parsePythonError } from '../src/utils/pythonErrorFormatter.js';

const tests = [
  {
    name: 'Standard ZeroDivisionError CRLF',
    stderr: 'PythonError: Traceback (most recent call last):\r\n  File "<exec>", line 2, in <module>\r\nZeroDivisionError: division by zero\r\n',
    code: 'x = 10\ny = x / 0'
  },
  {
    name: 'SyntaxError with caret and unknown file',
    stderr: 'PythonError: Traceback (most recent call last):\r\n  File "<unknown>", line 1\r\n    x = 10 +\r\n           ^\r\nSyntaxError: invalid syntax\r\n',
    code: 'x = 10 +'
  },
  {
    name: 'NameError without file prefix',
    stderr: 'Traceback (most recent call last):\n  line 3, in <module>\nNameError: name \'undefined_var\' is not defined',
    code: 'a = 1\nb = 2\nprint(undefined_var)'
  },
  {
    name: 'IndentationError',
    stderr: '  File "<exec>", line 2\r\n    print("indented")\r\nIndentationError: unexpected indent\r\n',
    code: 'x = 5\n    print("indented")'
  },
  {
    name: 'TypeError with Pyodide prefix on same line',
    stderr: 'PythonError: TypeError: can only concatenate str (not "int") to str\n  File "<exec>", line 1, in <module>',
    code: 'print("Age: " + 25)'
  },
  {
    name: 'Pure error string without traceback',
    stderr: 'ZeroDivisionError: division by zero',
    code: '1 / 0'
  }
];

tests.forEach((t, i) => {
  console.log(`=== TEST ${i+1}: ${t.name} ===`);
  const result = parsePythonError(t.stderr, t.code);
  console.log('Result:', JSON.stringify(result, null, 2));
});
