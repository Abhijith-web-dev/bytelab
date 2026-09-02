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

    // Pre-initialize python standard I/O redirection harness
    await pyodide.runPythonAsync(`
import sys
import io

class OutputCapture:
    def __init__(self):
        self.stdout_buffer = io.StringIO()
        self.stderr_buffer = io.StringIO()
        self.stdin_buffer = io.StringIO()
    
    def start(self, stdin_text=""):
        self.old_stdout = sys.stdout
        self.old_stderr = sys.stderr
        self.old_stdin = sys.stdin
        
        self.stdout_buffer = io.StringIO()
        self.stderr_buffer = io.StringIO()
        self.stdin_buffer = io.StringIO(stdin_text)
        
        sys.stdout = self.stdout_buffer
        sys.stderr = self.stderr_buffer
        sys.stdin = self.stdin_buffer
    
    def stop(self):
        sys.stdout = self.old_stdout
        sys.stderr = self.old_stderr
        sys.stdin = self.old_stdin
    
    def get_stdout(self):
        return self.stdout_buffer.getvalue()
    
    def get_stderr(self):
        return self.stderr_buffer.getvalue()

_capture = OutputCapture()
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
  const { type, id, code, stdin = '', timeoutMs = 5000 } = event.data;

  if (type === 'init') {
    await initPyodide();
    return;
  }

  if (type === 'execute') {
    const startTime = performance.now();

    if (!pyodide) {
      await initPyodide();
    }

    try {
      // Check if code requires numpy or pandas
      if (code.includes('import numpy') || code.includes('import np') || code.includes('from numpy')) {
        await pyodide.loadPackage('numpy');
      }
      if (code.includes('import pandas') || code.includes('import pd') || code.includes('from pandas')) {
        await pyodide.loadPackage('pandas');
      }

      // Reset buffers and start capturing with stdin
      const escapedStdin = stdin.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
      await pyodide.runPythonAsync(`_capture.start("${escapedStdin}")`);

      // Execute student code
      await pyodide.runPythonAsync(code);

      // Stop capturing
      await pyodide.runPythonAsync(`_capture.stop()`);

      const stdout = pyodide.runPython('_capture.get_stdout()');
      const stderr = pyodide.runPython('_capture.get_stderr()');
      const executionTimeMs = Math.round(performance.now() - startTime);

      self.postMessage({
        id,
        type: 'result',
        status: stderr ? 'runtime_error' : 'passed',
        stdout: stdout ? stdout.trimEnd() : '',
        stderr: stderr ? stderr.trimEnd() : '',
        executionTimeMs
      });
    } catch (err) {
      try {
        await pyodide.runPythonAsync(`_capture.stop()`);
      } catch (e) {
        // ignore
      }

      const executionTimeMs = Math.round(performance.now() - startTime);
      const isSyntaxError = err.message.includes('SyntaxError') || err.message.includes('IndentationError');

      self.postMessage({
        id,
        type: 'result',
        status: isSyntaxError ? 'syntax_error' : 'runtime_error',
        stdout: '',
        stderr: err.message,
        executionTimeMs
      });
    }
  }
};
