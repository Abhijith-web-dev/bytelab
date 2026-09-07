import { LanguageRuntime } from '../core/LanguageRuntime.js';

export class PythonRuntime extends LanguageRuntime {
  constructor() {
    super('python', 'Python 3.11', '0.27.2');
    this.worker = null;
    this.pendingExecutions = new Map();
    this.executionCounter = 0;
    this.isWorkerReady = false;
    this.initPromise = null;
  }

  async init() {
    if (this.isWorkerReady && this.worker) return;
    if (this.initPromise) return this.initPromise;

    this.initPromise = new Promise((resolve, reject) => {
      try {
        this.worker = new Worker(new URL('./python.worker.js', import.meta.url), { type: 'module' });

        this.worker.onmessage = (event) => {
          const { type, id, status, stdout, stderr, executionTimeMs, error } = event.data;

          if (type === 'ready') {
            this.isWorkerReady = true;
            this.isReady = true;
            resolve();
          } else if (type === 'init_error') {
            reject(new Error(error || 'Failed to initialize Python Pyodide runtime'));
          } else if (type === 'result' && id) {
            const pending = this.pendingExecutions.get(id);
            if (pending) {
              clearTimeout(pending.timer);
              this.pendingExecutions.delete(id);
              pending.resolve({
                status,
                stdout: stdout || '',
                stderr: stderr || '',
                error: error || null,
                executionTimeMs: executionTimeMs || 0
              });
            }
          } else if (type === 'trace_result' && id) {
            const pending = this.pendingExecutions.get(id);
            if (pending) {
              clearTimeout(pending.timer);
              this.pendingExecutions.delete(id);
              pending.resolve(event.data);
            }
          } else if (type === 'syntax_check_result' && id) {
            const pending = this.pendingExecutions.get(id);
            if (pending) {
              clearTimeout(pending.timer);
              this.pendingExecutions.delete(id);
              pending.resolve(event.data);
            }
          }
        };

        this.worker.onerror = (err) => {
          console.error('Python Worker unhandled error:', err);
          // Terminate and reject all pending
          for (const [id, pending] of this.pendingExecutions.entries()) {
            clearTimeout(pending.timer);
            pending.reject(new Error('Python runtime worker crashed'));
          }
          this.pendingExecutions.clear();
          this.recreateWorker();
        };

        this.worker.postMessage({ type: 'init' });
      } catch (err) {
        this.initPromise = null;
        reject(err);
      }
    });

    return this.initPromise;
  }

  recreateWorker() {
    if (this.worker) {
      try {
        this.worker.terminate();
      } catch (e) {
        // ignore
      }
      this.worker = null;
    }
    this.isWorkerReady = false;
    this.isReady = false;
    this.initPromise = null;
  }

  async execute({ sourceCode, stdin = '', timeoutMs = 5000 }) {
    await this.init();

    return new Promise((resolve, reject) => {
      const execId = `exec_${++this.executionCounter}_${Date.now()}`;

      const timer = setTimeout(() => {
        // Timeout exceeded - terminate hung worker
        this.pendingExecutions.delete(execId);
        this.recreateWorker();

        resolve({
          status: 'timeout',
          stdout: '',
          stderr: `Execution Timed Out: Program exceeded the ${timeoutMs / 1000}s limit. Check for infinite loops.`,
          executionTimeMs: timeoutMs
        });
      }, timeoutMs);

      this.pendingExecutions.set(execId, { resolve, reject, timer });

      this.worker.postMessage({
        id: execId,
        type: 'execute',
        code: sourceCode,
        stdin,
        timeoutMs
      });
    });
  }

  async checkSyntax(sourceCode) {
    await this.init();
    return new Promise((resolve) => {
      const checkId = `syntax_${++this.executionCounter}_${Date.now()}`;
      const timeout = setTimeout(() => {
        this.pendingExecutions.delete(checkId);
        resolve({ valid: true });
      }, 1500);

      this.pendingExecutions.set(checkId, {
        resolve: (data) => {
          clearTimeout(timeout);
          resolve(data);
        },
        reject: () => resolve({ valid: true }),
        timer: timeout
      });

      this.worker.postMessage({
        id: checkId,
        type: 'check_syntax',
        code: sourceCode
      });
    });
  }

  async traceExecution({ sourceCode, stdin = '', maxSteps = 300, timeoutMs = 8000 }) {
    await this.init();

    return new Promise((resolve, reject) => {
      const execId = `trace_${++this.executionCounter}_${Date.now()}`;

      const timer = setTimeout(() => {
        this.pendingExecutions.delete(execId);
        this.recreateWorker();

        resolve({
          status: 'timeout',
          steps: [],
          totalSteps: 0,
          stdout: '',
          stderr: `Trace Execution Timed Out: Program exceeded the ${timeoutMs / 1000}s limit. Check for infinite loops.`,
          executionTimeMs: timeoutMs,
          error: null
        });
      }, timeoutMs);

      this.pendingExecutions.set(execId, { resolve, reject, timer });

      this.worker.postMessage({
        id: execId,
        type: 'trace',
        code: sourceCode,
        stdin,
        maxSteps,
        timeoutMs
      });
    });
  }

  terminate() {
    this.recreateWorker();
  }
}

export const pythonRuntime = new PythonRuntime();
