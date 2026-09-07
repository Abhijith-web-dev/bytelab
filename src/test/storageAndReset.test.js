import { describe, it, expect, beforeEach } from 'vitest';
import { draftStorage } from '../services/storage/localStorage.js';
import { usePracticeStore } from '../stores/practiceStore.js';
import { getAllProblems } from '../content/loader/index.js';

describe('draftStorage Service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves and retrieves code drafts correctly', () => {
    draftStorage.saveDraft('test-problem-1', 'print("Hello Test")');
    expect(draftStorage.hasDraft('test-problem-1')).toBe(true);
    expect(draftStorage.getDraft('test-problem-1')).toBe('print("Hello Test")');
  });

  it('safely handles empty string code without evaluating to null', () => {
    draftStorage.saveDraft('test-problem-empty', '');
    expect(draftStorage.hasDraft('test-problem-empty')).toBe(true);
    expect(draftStorage.getDraft('test-problem-empty')).toBe('');
  });

  it('returns null for non-existent problem drafts', () => {
    expect(draftStorage.hasDraft('non-existent')).toBe(false);
    expect(draftStorage.getDraft('non-existent')).toBeNull();
  });

  it('clears draft when clearDraft is invoked', () => {
    draftStorage.saveDraft('test-problem-clear', 'x = 42');
    expect(draftStorage.getDraft('test-problem-clear')).toBe('x = 42');
    draftStorage.clearDraft('test-problem-clear');
    expect(draftStorage.hasDraft('test-problem-clear')).toBe(false);
    expect(draftStorage.getDraft('test-problem-clear')).toBeNull();
  });

  it('handles corrupted localStorage payload gracefully', () => {
    localStorage.setItem('bytelab_draft:corrupt-key', 'INVALID_JSON{{{');
    expect(draftStorage.getDraft('corrupt-key')).toBeNull();
  });
});

describe('usePracticeStore Reset & State Clearance', () => {
  const mockProblem = {
    id: 'mock-test-challenge',
    title: 'Mock Challenge',
    language: 'python',
    starterCode: '# Write solution here\ndef solve():\n    pass\n',
    testCases: []
  };

  beforeEach(() => {
    localStorage.clear();
    usePracticeStore.getState().loadProblem(mockProblem);
  });

  it('initializes store with starterCode and clears previous states', () => {
    const state = usePracticeStore.getState();
    expect(state.code).toBe(mockProblem.starterCode);
    expect(state.executionState).toBe('IDLE');
    expect(state.runtimeError).toBeNull();
    expect(state.executionTimeMs).toBe(0);
    expect(state.stdout).toBe('');
    expect(state.stderr).toBe('');
  });

  it('saves draft on updateCode', () => {
    usePracticeStore.getState().updateCode('def solve():\n    return 100\n');
    expect(usePracticeStore.getState().code).toBe('def solve():\n    return 100\n');
    expect(draftStorage.getDraft(mockProblem.id)).toBe('def solve():\n    return 100\n');
  });

  it('completely resets error, execution state, and draft on resetCode()', () => {
    const store = usePracticeStore.getState();
    store.updateCode('def solve():\n    raise ValueError("Error test")\n');
    
    // Simulate error state
    usePracticeStore.setState({
      executionState: 'RUNTIME_ERROR',
      runtimeError: { message: 'ValueError: Error test', line: 2 },
      stdout: '',
      stderr: 'Traceback (most recent call last):\n  File "main.py", line 2, in solve\nValueError: Error test',
      executionTimeMs: 154,
      testCaseResults: [{ passed: false, error: 'ValueError' }]
    });

    // Check that dirty state is in place
    let dirtyState = usePracticeStore.getState();
    expect(dirtyState.executionState).toBe('RUNTIME_ERROR');
    expect(dirtyState.runtimeError).not.toBeNull();
    expect(dirtyState.executionTimeMs).toBe(154);

    // Trigger reset
    usePracticeStore.getState().resetCode();

    // Verify completely sanitized state
    const cleanState = usePracticeStore.getState();
    expect(cleanState.code).toBe(mockProblem.starterCode);
    expect(cleanState.executionState).toBe('IDLE');
    expect(cleanState.runtimeError).toBeNull();
    expect(cleanState.executionTimeMs).toBe(0);
    expect(cleanState.stdout).toBe('');
    expect(cleanState.stderr).toBe('');
    expect(cleanState.testCaseResults).toEqual([]);
    expect(draftStorage.getDraft(mockProblem.id)).toBeNull();
  });
});

describe('Curriculum Problem Unique IDs', () => {
  it('guarantees every problem has a strictly unique identifier', () => {
    const problems = getAllProblems('python-programming');
    expect(problems.length).toBeGreaterThan(0);

    const ids = problems.map(p => p.id);
    const uniqueIds = new Set(ids);

    // Duplicate check
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
    expect(duplicates).toEqual([]);
    expect(uniqueIds.size).toBe(ids.length);
  });
});
