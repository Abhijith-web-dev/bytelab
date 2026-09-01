import { create } from 'zustand';
import { getRuntime } from '../runtimes/registry.js';
import { draftStorage } from '../services/storage/localStorage.js';
import { useProgressStore } from './progressStore.js';

export const usePracticeStore = create((set, get) => ({
  problem: null,
  code: '',
  language: 'python',
  executionState: 'IDLE', // IDLE | RUNNING | PASSED | FAILED | SYNTAX_ERROR | RUNTIME_ERROR | TIMEOUT
  stdout: '',
  stderr: '',
  executionTimeMs: 0,
  testCaseResults: [],
  attempts: 0,

  loadProblem: (problem) => {
    if (!problem) return;
    const draft = draftStorage.getDraft(problem.id);
    set({
      problem,
      language: problem.language || 'python',
      code: draft !== null ? draft : problem.starterCode,
      executionState: 'IDLE',
      stdout: '',
      stderr: '',
      executionTimeMs: 0,
      testCaseResults: [],
      attempts: 0
    });
  },

  updateCode: (newCode) => {
    const state = get();
    set({ code: newCode });
    if (state.problem?.id) {
      draftStorage.saveDraft(state.problem.id, newCode);
    }
  },

  resetCode: () => {
    const state = get();
    if (!state.problem) return;
    draftStorage.clearDraft(state.problem.id);
    set({
      code: state.problem.starterCode,
      executionState: 'IDLE',
      stdout: '',
      stderr: '',
      testCaseResults: []
    });
  },

  runCode: async () => {
    const state = get();
    if (!state.problem || state.executionState === 'RUNNING') return;

    set({
      executionState: 'RUNNING',
      stdout: '',
      stderr: '',
      attempts: state.attempts + 1
    });

    const runtime = getRuntime(state.language);
    const testCases = state.problem.testCases || [];
    const results = [];
    let allPassed = true;
    let mainStdout = '';
    let mainStderr = '';
    let totalTime = 0;

    // Execute against each test case
    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];
      const execResult = await runtime.execute({
        sourceCode: state.code,
        stdin: tc.input || '',
        timeoutMs: state.problem.timeLimitMs || 5000
      });

      totalTime += execResult.executionTimeMs;

      if (i === 0) {
        mainStdout = execResult.stdout;
        mainStderr = execResult.stderr;
      }

      if (execResult.status === 'timeout') {
        set({
          executionState: 'TIMEOUT',
          stderr: execResult.stderr,
          executionTimeMs: totalTime
        });
        return;
      }

      if (execResult.status === 'syntax_error') {
        set({
          executionState: 'SYNTAX_ERROR',
          stderr: execResult.stderr,
          executionTimeMs: totalTime
        });
        return;
      }

      if (execResult.status === 'runtime_error') {
        set({
          executionState: 'RUNTIME_ERROR',
          stderr: execResult.stderr,
          executionTimeMs: totalTime
        });
        return;
      }

      const expected = tc.expectedOutput.trim();
      const actual = execResult.stdout.trim();
      const passed = actual === expected;

      if (!passed) {
        allPassed = false;
      }

      results.push({
        id: tc.id,
        description: tc.description,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput: actual,
        isHidden: tc.isHidden,
        passed
      });
    }

    const finalStatus = allPassed ? 'PASSED' : 'FAILED';

    set({
      executionState: finalStatus,
      stdout: mainStdout,
      stderr: mainStderr,
      testCaseResults: results,
      executionTimeMs: totalTime
    });

    if (allPassed) {
      useProgressStore.getState().recordProblemSolved(state.problem.id, state.code, state.attempts + 1);
    }
  }
}));
