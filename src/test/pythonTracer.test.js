import { describe, it, expect } from 'vitest';
import {
  diffStepVariables,
  getStepSummary,
  clampStepIndex,
  formatInlineVariableAnnotation,
  findNextBreakpoint,
  findPrevBreakpoint,
  getLoopIterationInfo,
  compressTraceForAI
} from '../utils/traceExecutionHelper.js';

describe('Time-Travel Visual Execution Trace Helper', () => {
  describe('diffStepVariables', () => {
    it('returns empty array when locals are empty or undefined', () => {
      expect(diffStepVariables(null)).toEqual([]);
      expect(diffStepVariables({})).toEqual([]);
    });

    it('identifies new variables on first step', () => {
      const step1Locals = {
        prices: { value: '[50, 20, 500]', type: 'list' }
      };

      const diff = diffStepVariables(step1Locals, {});
      expect(diff).toHaveLength(1);
      expect(diff[0]).toEqual({
        name: 'prices',
        type: 'list',
        value: '[50, 20, 500]',
        status: 'new',
        previousValue: undefined
      });
    });

    it('detects mutated variables and preserves previous value', () => {
      const prevLocals = {
        prices: { value: '[50, 20, 500]', type: 'list' },
        total: { value: '70', type: 'int' }
      };

      const currLocals = {
        prices: { value: '[50, 20, 500]', type: 'list' },
        total: { value: '570', type: 'int' }
      };

      const diff = diffStepVariables(currLocals, prevLocals);
      expect(diff).toHaveLength(2);

      const totalDiff = diff.find(d => d.name === 'total');
      expect(totalDiff).toEqual({
        name: 'total',
        type: 'int',
        value: '570',
        status: 'changed',
        previousValue: '70'
      });

      const pricesDiff = diff.find(d => d.name === 'prices');
      expect(pricesDiff.status).toBe('unchanged');
    });

    it('prioritizes changed and new variables above unchanged variables', () => {
      const prev = {
        a: { value: '1', type: 'int' },
        b: { value: '2', type: 'int' }
      };
      const curr = {
        a: { value: '10', type: 'int' }, // changed
        b: { value: '2', type: 'int' },  // unchanged
        c: { value: '3', type: 'int' }   // new
      };

      const diff = diffStepVariables(curr, prev);
      expect(diff[0].status).toBe('changed');
      expect(diff[0].name).toBe('a');
      expect(diff[1].status).toBe('new');
      expect(diff[1].name).toBe('c');
      expect(diff[2].status).toBe('unchanged');
      expect(diff[2].name).toBe('b');
    });

    it('ignores internal dunder names', () => {
      const locals = {
        __name__: { value: "'__main__'", type: 'str' },
        __doc__: { value: 'None', type: 'NoneType' },
        score: { value: '100', type: 'int' }
      };

      const diff = diffStepVariables(locals, {});
      expect(diff).toHaveLength(1);
      expect(diff[0].name).toBe('score');
    });
  });

  describe('getStepSummary', () => {
    it('returns line snippet when executing normal line', () => {
      const step = {
        line: 4,
        snippet: 'total = prices[0] + prices[1]',
        event: 'line'
      };
      expect(getStepSummary(step)).toBe('Line 4: total = prices[0] + prices[1]');
    });

    it('highlights stdin input lines in step summary', () => {
      const step = {
        line: 1,
        snippet: 'name = input("Enter name: ")',
        event: 'line'
      };
      expect(getStepSummary(step)).toBe('Line 1 [stdin]: name = input("Enter name: ")');
    });

    it('returns exception details on error step', () => {
      const step = {
        line: 6,
        event: 'exception',
        exception: {
          type: 'IndexError',
          msg: 'list index out of range'
        }
      };
      expect(getStepSummary(step)).toBe('Line 6: Raised IndexError — list index out of range');
    });

    it('returns return description on function return event', () => {
      const step = {
        line: 12,
        event: 'return',
        func: 'calculate_discount'
      };
      expect(getStepSummary(step)).toBe('Line 12: Returned from calculate_discount');
    });
  });

  describe('clampStepIndex', () => {
    it('clamps step index within bounds', () => {
      expect(clampStepIndex(-5, 10)).toBe(0);
      expect(clampStepIndex(15, 10)).toBe(9);
      expect(clampStepIndex(4, 10)).toBe(4);
      expect(clampStepIndex(0, 0)).toBe(0);
    });
  });

  describe('formatInlineVariableAnnotation', () => {
    it('returns empty string if diffs is empty or contains only unchanged variables', () => {
      expect(formatInlineVariableAnnotation([])).toBe('');
      expect(formatInlineVariableAnnotation([{ name: 'x', value: '1', status: 'unchanged' }])).toBe('');
    });

    it('formats changed and new variables nicely', () => {
      const diffs = [
        { name: 'total', value: '15', status: 'changed' },
        { name: 'count', value: '3', status: 'new' }
      ];
      expect(formatInlineVariableAnnotation(diffs)).toBe('total = 15, count = 3');
    });

    it('truncates long values and caps to maxChars with overflow indicator', () => {
      const diffs = [
        { name: 'longVar', value: '12345678901234567890', status: 'changed' },
        { name: 'b', value: '2', status: 'new' },
        { name: 'c', value: '3', status: 'new' }
      ];
      const res = formatInlineVariableAnnotation(diffs, 25);
      expect(res).toContain('longVar = 123456789012...');
      expect(res).toContain('+2 more');
    });
  });

  describe('findNextBreakpoint & findPrevBreakpoint', () => {
    const traceSteps = [
      { line: 1, step: 1 },
      { line: 2, step: 2 },
      { line: 5, step: 3 },
      { line: 6, step: 4 },
      { line: 5, step: 5 },
      { line: 7, step: 6 }
    ];

    it('finds next matching breakpoint index', () => {
      const bpSet = new Set([5, 7]);
      expect(findNextBreakpoint(traceSteps, 0, bpSet)).toBe(2);
      expect(findNextBreakpoint(traceSteps, 2, bpSet)).toBe(4);
      expect(findNextBreakpoint(traceSteps, 4, bpSet)).toBe(5);
      expect(findNextBreakpoint(traceSteps, 5, bpSet)).toBeNull();
    });

    it('finds previous matching breakpoint index', () => {
      const bpSet = new Set([2, 5]);
      expect(findPrevBreakpoint(traceSteps, 5, bpSet)).toBe(4);
      expect(findPrevBreakpoint(traceSteps, 4, bpSet)).toBe(2);
      expect(findPrevBreakpoint(traceSteps, 2, bpSet)).toBe(1);
      expect(findPrevBreakpoint(traceSteps, 1, bpSet)).toBeNull();
    });

    it('returns null on invalid inputs or empty sets', () => {
      expect(findNextBreakpoint([], 0, new Set([1]))).toBeNull();
      expect(findPrevBreakpoint([], 0, new Set([1]))).toBeNull();
      expect(findNextBreakpoint(traceSteps, 0, new Set())).toBeNull();
      expect(findPrevBreakpoint(traceSteps, 0, new Set())).toBeNull();
    });
  });

  describe('getLoopIterationInfo', () => {
    const loopTrace = [
      { line: 1, step: 1 },
      { line: 4, step: 2 },
      { line: 5, step: 3 },
      { line: 4, step: 4 },
      { line: 5, step: 5 },
      { line: 4, step: 6 },
      { line: 7, step: 7 }
    ];

    it('returns isLoop false for non-repeated line', () => {
      const info = getLoopIterationInfo(loopTrace, 0);
      expect(info.isLoop).toBe(false);
      expect(info.currentIteration).toBe(1);
      expect(info.totalIterations).toBe(1);
    });

    it('accurately identifies loop iteration count and sibling steps', () => {
      // Line 4 appears at steps 1 (index 1), 3 (index 3), 5 (index 5)
      const firstIter = getLoopIterationInfo(loopTrace, 1);
      expect(firstIter.isLoop).toBe(true);
      expect(firstIter.currentIteration).toBe(1);
      expect(firstIter.totalIterations).toBe(3);
      expect(firstIter.prevStepIndex).toBeNull();
      expect(firstIter.nextStepIndex).toBe(3);

      const secondIter = getLoopIterationInfo(loopTrace, 3);
      expect(secondIter.currentIteration).toBe(2);
      expect(secondIter.prevStepIndex).toBe(1);
      expect(secondIter.nextStepIndex).toBe(5);

      const thirdIter = getLoopIterationInfo(loopTrace, 5);
      expect(thirdIter.currentIteration).toBe(3);
      expect(thirdIter.prevStepIndex).toBe(3);
      expect(thirdIter.nextStepIndex).toBeNull();
    });
  });

  describe('compressTraceForAI', () => {
    it('handles empty trace gracefully', () => {
      const res = compressTraceForAI([]);
      expect(res.summaryText).toBe('No execution steps recorded.');
      expect(res.totalSteps).toBe(0);
    });

    it('compresses repetitive loop traces and tracks variable evolution', () => {
      const steps = [
        { line: 1, step: 1, snippet: 'x = 0', locals: { x: { value: '0', type: 'int' } } },
        { line: 2, step: 2, snippet: 'for i in range(3):', locals: { x: { value: '0', type: 'int' }, i: { value: '0', type: 'int' } } },
        { line: 3, step: 3, snippet: 'x += 1', locals: { x: { value: '1', type: 'int' }, i: { value: '0', type: 'int' } } },
        { line: 2, step: 4, snippet: 'for i in range(3):', locals: { x: { value: '1', type: 'int' }, i: { value: '1', type: 'int' } } },
        { line: 3, step: 5, snippet: 'x += 1', locals: { x: { value: '2', type: 'int' }, i: { value: '1', type: 'int' } } },
        { line: 2, step: 6, snippet: 'for i in range(3):', locals: { x: { value: '2', type: 'int' }, i: { value: '2', type: 'int' } } },
        { line: 3, step: 7, snippet: 'x += 1', locals: { x: { value: '3', type: 'int' }, i: { value: '2', type: 'int' } } }
      ];

      const compressed = compressTraceForAI(steps, 6);
      expect(compressed.totalSteps).toBe(7);
      expect(compressed.variables.x).toBeDefined();
      expect(compressed.variables.x.initial).toBe('0');
      expect(compressed.variables.x.current).toBe('3');
      expect(compressed.summaryText).toContain('Variables Lifecycle:');
      expect(compressed.summaryText).toContain('Execution Flow Highlights:');
    });

    it('identifies crash / exception point in trace', () => {
      const steps = [
        { line: 1, step: 1, snippet: 'nums = []', locals: { nums: { value: '[]', type: 'list' } } },
        {
          line: 2,
          step: 2,
          snippet: 'print(nums[0])',
          event: 'exception',
          exception: { type: 'IndexError', msg: 'list index out of range' }
        }
      ];

      const compressed = compressTraceForAI(steps);
      expect(compressed.crashStep).toBeDefined();
      expect(compressed.crashStep.exception.type).toBe('IndexError');
      expect(compressed.summaryText).toContain('Exception Point (Step 2, Line 2): IndexError: list index out of range');
    });
  });
});
