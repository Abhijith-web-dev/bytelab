/* eslint-disable no-restricted-globals */
let pyodide = null;
let isInitializing = false;

async function initPyodide() {
  if (pyodide) return pyodide;
  if (isInitializing) return;
  isInitializing = true;

  try {
    // In ES module workers, load via dynamic ESM import
    let loadPyodideFn = null;

    try {
      const pyodideModule = await import('https://cdn.jsdelivr.net/pyodide/v0.27.2/full/pyodide.mjs');
      loadPyodideFn = pyodideModule.loadPyodide;
    } catch (cdnErr) {
      console.warn('CDN Pyodide load failed, attempting local package fallback:', cdnErr);
      const localModule = await import('pyodide');
      loadPyodideFn = localModule.loadPyodide;
    }

    if (!loadPyodideFn) {
      throw new Error('Failed to resolve loadPyodide function from ESM import');
    }

    pyodide = await loadPyodideFn({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.2/full/'
    });

    // Initialize ByteLab Precision Execution Runner inside Python
    await pyodide.runPythonAsync(`
import sys
import io
import traceback
import json
import builtins

class SafeInputHandler:
    def __init__(self, stdin_buf, stdout_buf, max_fallback_mocks=10, is_trace=False):
        self.stdin_buf = stdin_buf
        self.stdout_buf = stdout_buf
        self.max_fallback_mocks = max_fallback_mocks
        self.is_trace = is_trace
        self.fallback_count = 0
        raw_val = stdin_buf.getvalue() if hasattr(stdin_buf, 'getvalue') else ""
        self.has_real_stdin = bool(raw_val and raw_val.strip())

    def __call__(self, prompt=""):
        if prompt:
            self.stdout_buf.write(str(prompt))
            self.stdout_buf.flush()

        line = self.stdin_buf.readline()
        if line:
            return line.rstrip('\r\n')

        # In standard execution (non-trace), if caller provided real stdin lines
        # and has now exhausted them, raise standard EOFError for competitive programming
        if self.has_real_stdin and not self.is_trace:
            raise EOFError("EOF when reading a line")

        # In trace mode or interactive run with empty stdin, provide smart mock value
        if self.fallback_count >= self.max_fallback_mocks:
            raise EOFError("EOF when reading a line: input limit reached")

        self.fallback_count += 1
        p_lower = str(prompt).lower()
        if any(w in p_lower for w in ["email", "mail"]):
            return "alice@example.com"
        elif any(w in p_lower for w in ["num", "age", "year", "int", "count", "score", "val", "sum", "index", "size", "limit", "id", "mark"]):
            return "85" if "mark" in p_lower else "5"
        elif any(w in p_lower for w in ["name", "user", "who", "first", "last", "person"]):
            return "Alice"
        elif any(w in p_lower for w in ["bool", "true", "false", "yes", "no"]):
            return "yes"
        else:
            return "10"

class ByteLabRunner:
    def __init__(self):
        pass

    def check_syntax(self, user_code):
        try:
            compile(user_code, "main.py", "exec")
            return json.dumps({"valid": True})
        except (SyntaxError, IndentationError, TabError) as e:
            return json.dumps({
                "valid": False,
                "error_type": type(e).__name__,
                "line": e.lineno,
                "column": e.offset,
                "message": e.msg if hasattr(e, 'msg') else str(e),
                "snippet": e.text.strip() if getattr(e, 'text', None) else ""
            })

    def run(self, user_code, stdin_text=""):
        old_stdout = sys.stdout
        old_stderr = sys.stderr
        old_stdin = sys.stdin
        old_input = builtins.input

        stdout_buf = io.StringIO()
        stderr_buf = io.StringIO()
        stdin_buf = io.StringIO(stdin_text)

        sys.stdout = stdout_buf
        sys.stderr = stderr_buf
        sys.stdin = stdin_buf

        input_handler = SafeInputHandler(stdin_buf, stdout_buf, max_fallback_mocks=10, is_trace=False)
        builtins.input = input_handler

        result = {
            "status": "passed",
            "stdout": "",
            "stderr": "",
            "error": None
        }

        try:
            # 1. Real Compilation Phase
            compiled = compile(user_code, "main.py", "exec")

            # 2. Execution Phase in fresh user namespace
            user_globals = {
                "__name__": "__main__",
                "__doc__": None,
                "__package__": None
            }
            exec(compiled, user_globals)
            result["status"] = "passed"

        except (SyntaxError, IndentationError, TabError) as e:
            result["status"] = "syntax_error"
            line_num = e.lineno
            col_num = e.offset
            snippet = e.text.strip() if getattr(e, 'text', None) else ""
            err_msg = e.msg if hasattr(e, 'msg') else str(e)

            if not snippet and line_num:
                code_lines = user_code.splitlines()
                if 1 <= line_num <= len(code_lines):
                    snippet = code_lines[line_num - 1].strip()

            caret = ""
            if col_num is not None and col_num > 0:
                caret = " " * (col_num - 1) + "^"

            formatted_stderr = (
                f'  File "main.py", line {line_num}\\n'
                f'    {snippet}\\n'
                f'    {caret}\\n'
                f'{type(e).__name__}: {err_msg}'
            )

            result["stderr"] = formatted_stderr
            result["error"] = {
                "error_type": type(e).__name__,
                "error_msg": err_msg,
                "line": line_num,
                "column": col_num,
                "snippet": snippet,
                "frames": [{
                    "file": "main.py",
                    "line": line_num,
                    "func": "<module>",
                    "snippet": snippet
                }]
            }

        except Exception as e:
            result["status"] = "runtime_error"
            exc_type, exc_val, exc_tb = sys.exc_info()
            raw_frames = traceback.extract_tb(exc_tb)

            user_frames = []
            tb_lines = ["Traceback (most recent call last):"]

            for f in raw_frames:
                # Filter out Pyodide internal frames
                if "pyodide" not in f.filename and "/lib/python" not in f.filename:
                    f_name = "main.py" if f.filename in ("<string>", "<exec>", "<stdin>") else f.filename
                    f_snippet = f.line or ""
                    if not f_snippet and f.lineno:
                        code_lines = user_code.splitlines()
                        if 1 <= f.lineno <= len(code_lines):
                            f_snippet = code_lines[f.lineno - 1].strip()

                    user_frames.append({
                        "file": f_name,
                        "line": f.lineno,
                        "func": f.name,
                        "snippet": f_snippet
                    })
                    tb_lines.append(f'  File "{f_name}", line {f.lineno}, in {f.name}')
                    if f_snippet:
                        tb_lines.append(f'    {f_snippet}')

            crash_line = user_frames[-1]["line"] if user_frames else None
            crash_snippet = user_frames[-1]["snippet"] if user_frames else ""

            if not crash_snippet and crash_line:
                code_lines = user_code.splitlines()
                if 1 <= crash_line <= len(code_lines):
                    crash_snippet = code_lines[crash_line - 1].strip()

            tb_lines.append(f'{exc_type.__name__}: {str(exc_val)}')
            formatted_stderr = "\\n".join(tb_lines)

            result["stderr"] = formatted_stderr
            result["error"] = {
                "error_type": exc_type.__name__,
                "error_msg": str(exc_val),
                "line": crash_line,
                "snippet": crash_snippet,
                "frames": user_frames
            }

        finally:
            builtins.input = old_input
            sys.stdout = old_stdout
            sys.stderr = old_stderr
            sys.stdin = old_stdin

            captured_stdout = stdout_buf.getvalue()
            result["stdout"] = captured_stdout

            # If no exception occurred but stderr was written to, record it
            captured_stderr = stderr_buf.getvalue()
            if captured_stderr and not result["stderr"]:
                result["stderr"] = captured_stderr

        return json.dumps(result)

    def trace(self, user_code, stdin_text="", max_steps=300):
        old_stdout = sys.stdout
        old_stderr = sys.stderr
        old_stdin = sys.stdin
        old_input = builtins.input

        stdout_buf = io.StringIO()
        stderr_buf = io.StringIO()
        stdin_buf = io.StringIO(stdin_text)

        sys.stdout = stdout_buf
        sys.stderr = stderr_buf
        sys.stdin = stdin_buf

        input_handler = SafeInputHandler(stdin_buf, stdout_buf, max_fallback_mocks=10, is_trace=True)
        builtins.input = input_handler

        steps = []
        result = {
            "status": "passed",
            "steps": [],
            "total_steps": 0,
            "stdout": "",
            "stderr": "",
            "error": None
        }

        # 1. Real Compilation Check
        try:
            compiled = compile(user_code, "main.py", "exec")
        except (SyntaxError, IndentationError, TabError) as e:
            result["status"] = "syntax_error"
            line_num = e.lineno
            col_num = e.offset
            snippet = e.text.strip() if getattr(e, 'text', None) else ""
            err_msg = e.msg if hasattr(e, 'msg') else str(e)

            if not snippet and line_num:
                code_lines = user_code.splitlines()
                if 1 <= line_num <= len(code_lines):
                    snippet = code_lines[line_num - 1].strip()

            caret = ""
            if col_num is not None and col_num > 0:
                caret = " " * (col_num - 1) + "^"

            result["stderr"] = (
                f'  File "main.py", line {line_num}\\n'
                f'    {snippet}\\n'
                f'    {caret}\\n'
                f'{type(e).__name__}: {err_msg}'
            )
            result["error"] = {
                "error_type": type(e).__name__,
                "error_msg": err_msg,
                "line": line_num,
                "column": col_num,
                "snippet": snippet,
                "frames": [{
                    "file": "main.py",
                    "line": line_num,
                    "func": "<module>",
                    "snippet": snippet
                }]
            }
            sys.stdout = old_stdout
            sys.stderr = old_stderr
            sys.stdin = old_stdin
            return json.dumps(result)

        # 2. Execution Tracing
        code_lines = user_code.splitlines()

        def trace_dispatch(frame, event, arg):
            if frame.f_code.co_filename != "main.py":
                return trace_dispatch

            if event in ("line", "exception", "return"):
                if len(steps) >= max_steps:
                    return None

                lineno = frame.f_lineno
                line_snippet = ""
                if 1 <= lineno <= len(code_lines):
                    line_snippet = code_lines[lineno - 1].strip()

                curr_locals = {}
                for k, v in frame.f_locals.items():
                    if k.startswith("__"):
                        continue
                    try:
                        v_repr = repr(v)
                        if len(v_repr) > 120:
                            v_repr = v_repr[:117] + "..."
                        curr_locals[k] = {
                            "value": v_repr,
                            "type": type(v).__name__
                        }
                    except Exception:
                        curr_locals[k] = {
                            "value": "<unprintable>",
                            "type": type(v).__name__
                        }

                step_data = {
                    "step": len(steps) + 1,
                    "line": lineno,
                    "snippet": line_snippet,
                    "event": event,
                    "func": frame.f_code.co_name,
                    "locals": curr_locals,
                    "stdout": stdout_buf.getvalue()
                }

                if event == "exception":
                    exc_type, exc_val, exc_tb = arg
                    step_data["exception"] = {
                        "type": exc_type.__name__ if hasattr(exc_type, '__name__') else str(exc_type),
                        "msg": str(exc_val)
                    }

                steps.append(step_data)

            return trace_dispatch

        user_globals = {
            "__name__": "__main__",
            "__doc__": None,
            "__package__": None
        }

        try:
            sys.settrace(trace_dispatch)
            exec(compiled, user_globals)
            result["status"] = "passed"
        except Exception as e:
            result["status"] = "runtime_error"
            exc_type, exc_val, exc_tb = sys.exc_info()
            raw_frames = traceback.extract_tb(exc_tb)

            user_frames = []
            tb_lines = ["Traceback (most recent call last):"]

            for f in raw_frames:
                if "pyodide" not in f.filename and "/lib/python" not in f.filename:
                    f_name = "main.py" if f.filename in ("<string>", "<exec>", "<stdin>") else f.filename
                    f_snippet = f.line or ""
                    if not f_snippet and f.lineno:
                        if 1 <= f.lineno <= len(code_lines):
                            f_snippet = code_lines[f.lineno - 1].strip()

                    user_frames.append({
                        "file": f_name,
                        "line": f.lineno,
                        "func": f.name,
                        "snippet": f_snippet
                    })
                    tb_lines.append(f'  File "{f_name}", line {f.lineno}, in {f.name}')
                    if f_snippet:
                        tb_lines.append(f'    {f_snippet}')

            crash_line = user_frames[-1]["line"] if user_frames else None
            crash_snippet = user_frames[-1]["snippet"] if user_frames else ""

            if not crash_snippet and crash_line:
                if 1 <= crash_line <= len(code_lines):
                    crash_snippet = code_lines[crash_line - 1].strip()

            tb_lines.append(f'{exc_type.__name__}: {str(exc_val)}')
            result["stderr"] = "\\n".join(tb_lines)
            result["error"] = {
                "error_type": exc_type.__name__,
                "error_msg": str(exc_val),
                "line": crash_line,
                "snippet": crash_snippet,
                "frames": user_frames
            }
        finally:
            sys.settrace(None)
            builtins.input = old_input
            sys.stdout = old_stdout
            sys.stderr = old_stderr
            sys.stdin = old_stdin

            result["stdout"] = stdout_buf.getvalue()
            result["steps"] = steps
            result["total_steps"] = len(steps)

        return json.dumps(result)

_bytelab_runner = ByteLabRunner()
`);

    self.postMessage({ type: 'ready', version: '0.27.2' });
  } catch (err) {
    console.error('Pyodide initialization error:', err);
    self.postMessage({ type: 'init_error', error: err.message });
  } finally {
    isInitializing = false;
  }
}

self.onmessage = async (event) => {
  const { type, id, code, stdin = '', timeoutMs = 5000, maxSteps = 300 } = event.data;

  if (type === 'init') {
    await initPyodide();
    return;
  }

  if (type === 'check_syntax') {
    if (!pyodide) {
      await initPyodide();
    }
    try {
      const escapedCode = JSON.stringify(code);
      const syntaxResultJson = await pyodide.runPythonAsync(`_bytelab_runner.check_syntax(${escapedCode})`);
      const syntaxResult = JSON.parse(syntaxResultJson);
      self.postMessage({ id, type: 'syntax_check_result', ...syntaxResult });
    } catch (e) {
      self.postMessage({ id, type: 'syntax_check_result', valid: true });
    }
    return;
  }

  if (type === 'execute') {
    const startTime = performance.now();

    if (!pyodide) {
      await initPyodide();
    }

    try {
      // Auto-load common scientific packages if imported
      if (code.includes('import numpy') || code.includes('import np') || code.includes('from numpy')) {
        await pyodide.loadPackage('numpy');
      }
      if (code.includes('import pandas') || code.includes('import pd') || code.includes('from pandas')) {
        await pyodide.loadPackage('pandas');
      }

      // Execute via the dedicated ByteLab Precision Runner
      const escapedCode = JSON.stringify(code);
      const escapedStdin = JSON.stringify(stdin);
      const executionResultJson = await pyodide.runPythonAsync(`_bytelab_runner.run(${escapedCode}, ${escapedStdin})`);
      const payload = JSON.parse(executionResultJson);
      const executionTimeMs = Math.round(performance.now() - startTime);

      self.postMessage({
        id,
        type: 'result',
        status: payload.status,
        stdout: payload.stdout || '',
        stderr: payload.stderr || '',
        error: payload.error || null,
        executionTimeMs
      });
    } catch (err) {
      const executionTimeMs = Math.round(performance.now() - startTime);
      const isSyntaxError = err.message.includes('SyntaxError') || err.message.includes('IndentationError');

      self.postMessage({
        id,
        type: 'result',
        status: isSyntaxError ? 'syntax_error' : 'runtime_error',
        stdout: '',
        stderr: err.message || 'Execution failed',
        error: null,
        executionTimeMs
      });
    }
    return;
  }

  if (type === 'trace') {
    const startTime = performance.now();

    if (!pyodide) {
      await initPyodide();
    }

    try {
      if (code.includes('import numpy') || code.includes('import np') || code.includes('from numpy')) {
        await pyodide.loadPackage('numpy');
      }
      if (code.includes('import pandas') || code.includes('import pd') || code.includes('from pandas')) {
        await pyodide.loadPackage('pandas');
      }

      const escapedCode = JSON.stringify(code);
      const escapedStdin = JSON.stringify(stdin);
      const traceLimit = typeof maxSteps === 'number' ? maxSteps : 300;
      const traceResultJson = await pyodide.runPythonAsync(`_bytelab_runner.trace(${escapedCode}, ${escapedStdin}, ${traceLimit})`);
      const payload = JSON.parse(traceResultJson);
      const executionTimeMs = Math.round(performance.now() - startTime);

      self.postMessage({
        id,
        type: 'trace_result',
        status: payload.status,
        steps: payload.steps || [],
        totalSteps: payload.total_steps || 0,
        stdout: payload.stdout || '',
        stderr: payload.stderr || '',
        error: payload.error || null,
        executionTimeMs
      });
    } catch (err) {
      const executionTimeMs = Math.round(performance.now() - startTime);
      const isSyntaxError = err.message.includes('SyntaxError') || err.message.includes('IndentationError');

      self.postMessage({
        id,
        type: 'trace_result',
        status: isSyntaxError ? 'syntax_error' : 'runtime_error',
        steps: [],
        totalSteps: 0,
        stdout: '',
        stderr: err.message || 'Trace failed',
        error: null,
        executionTimeMs
      });
    }
    return;
  }
};
