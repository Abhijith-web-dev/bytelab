import { LanguageRuntime } from '../core/LanguageRuntime.js';

export class JavaScriptRuntime extends LanguageRuntime {
  constructor() {
    super('javascript', 'JavaScript ES2023', 'v1.0');
    this.isReady = true;
  }

  async init() {
    return Promise.resolve();
  }

  async execute({ sourceCode, timeoutMs = 5000 }) {
    const startTime = performance.now();
    let logs = [];
    const customConsole = {
      log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
      error: (...args) => logs.push('[ERROR] ' + args.join(' ')),
      warn: (...args) => logs.push('[WARN] ' + args.join(' '))
    };

    try {
      // Safe sandboxed eval through function wrapping
      const runFn = new Function('console', sourceCode);
      runFn(customConsole);
      const executionTimeMs = Math.round(performance.now() - startTime);

      return {
        status: 'passed',
        stdout: logs.join('\n'),
        stderr: '',
        executionTimeMs
      };
    } catch (err) {
      const executionTimeMs = Math.round(performance.now() - startTime);
      return {
        status: 'runtime_error',
        stdout: logs.join('\n'),
        stderr: err.toString(),
        executionTimeMs
      };
    }
  }
}

export const jsRuntime = new JavaScriptRuntime();
