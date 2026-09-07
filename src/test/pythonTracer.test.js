import { describe, it, expect } from 'vitest';
import { diffStepVariables, getStepSummary, clampStepIndex } from '../utils/traceExecutionHelper.js';

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
});
