import { pythonRuntime } from '../../runtimes/python/pythonRuntime.js';

/**
 * Background Simulation Tool (100% Client-Side)
 * Allows ByteAgent to silently verify hypotheses and test code mutations in Pyodide
 * before proposing Socratic guidance to the student.
 */
export class SimulationTool {
  /**
   * Executes a code snippet with optional stdin in background sandbox.
   */
  static async simulateRun(code, stdin = '', timeoutMs = 4000) {
    if (!pythonRuntime) {
      return { status: 'error', stdout: '', stderr: 'Python runtime not available' };
    }
    try {
      return await pythonRuntime.execute({
        sourceCode: code,
        stdin,
        timeoutMs
      });
    } catch (err) {
      return {
        status: 'error',
        stdout: '',
        stderr: err.message || 'Simulation execution error'
      };
    }
  }

  /**
   * Runs code against a list of test cases in background.
   */
  static async simulateTestCases(code, testCases = [], timeoutMs = 3000) {
    if (!Array.isArray(testCases) || testCases.length === 0) {
      const res = await this.simulateRun(code, '', timeoutMs);
      return {
        allPassed: res.status === 'passed' && !res.stderr,
        passedCount: res.status === 'passed' ? 1 : 0,
        totalCount: 1,
        results: [res]
      };
    }

    const results = [];
    let passedCount = 0;

    for (const tc of testCases) {
      const runInput = tc.input || '';
      const runCode = tc.setupCode ? tc.setupCode + '\n' + code : code;
      const res = await this.simulateRun(runCode, runInput, timeoutMs);

      const actualTrim = (res.stdout || '').trim();
      const expectedTrim = (tc.expectedOutput || '').trim();
      const isPass = res.status === 'passed' && actualTrim === expectedTrim;

      if (isPass) passedCount += 1;
      results.push({
        testCase: tc,
        passed: isPass,
        actual: res.stdout,
        expected: tc.expectedOutput,
        stderr: res.stderr
      });
    }

    return {
      allPassed: passedCount === testCases.length,
      passedCount,
      totalCount: testCases.length,
      results
    };
  }
}
