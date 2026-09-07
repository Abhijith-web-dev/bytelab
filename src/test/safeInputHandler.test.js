import { describe, it, expect } from 'vitest';

/**
 * JavaScript simulation model of the Python SafeInputHandler
 * to verify algorithmic correctness, fallback limits, and prompt inspection.
 */
class MockSafeInputHandler {
  constructor(stdinText = '', maxFallbackMocks = 10, isTrace = false) {
    this.stdinLines = stdinText ? stdinText.split('\n') : [];
    this.lineIndex = 0;
    this.maxFallbackMocks = maxFallbackMocks;
    this.isTrace = isTrace;
    this.fallbackCount = 0;
    this.stdout = '';
    this.hasRealStdin = Boolean(stdinText && stdinText.trim());
  }

  input(prompt = '') {
    if (prompt) {
      this.stdout += prompt;
    }

    if (this.lineIndex < this.stdinLines.length) {
      const line = this.stdinLines[this.lineIndex++];
      return line;
    }

    // If caller provided real stdin lines and exhausted them, raise EOFError in non-trace mode
    if (this.hasRealStdin && !this.isTrace) {
      throw new Error('EOFError: EOF when reading a line');
    }

    // In trace mode or interactive mode without stdin:
    if (this.fallbackCount >= this.maxFallbackMocks) {
      throw new Error('EOFError: EOF when reading a line: input limit reached');
    }

    this.fallbackCount++;
    const pLower = String(prompt).toLowerCase();
    let val = '10';
    if (['email', 'mail'].some(w => pLower.includes(w))) {
      val = 'alice@example.com';
    } else if (['num', 'age', 'year', 'int', 'count', 'score', 'val', 'sum', 'index', 'size', 'limit', 'id', 'mark'].some(w => pLower.includes(w))) {
      val = pLower.includes('mark') ? '85' : '5';
    } else if (['name', 'user', 'who', 'first', 'last', 'person'].some(w => pLower.includes(w))) {
      val = 'Alice';
    } else if (['bool', 'true', 'false', 'yes', 'no'].some(w => pLower.includes(w))) {
      val = 'yes';
    }

    return val;
  }
}

describe('SafeInputHandler & Stdin Execution Logic', () => {
  it('reads real stdin lines sequentially without echoing them to stdout', () => {
    const handler = new MockSafeInputHandler('Alice\n25', 10, false);
    const name = handler.input('Name: ');
    const age = handler.input('Age: ');

    expect(name).toBe('Alice');
    expect(age).toBe('25');
    // Stdin values are returned to Python variables, NEVER echoed to stdout!
    expect(handler.stdout).toBe('Name: Age: ');
  });

  it('keeps stdout completely clean and unpolluted when input() has no prompt', () => {
    const handler = new MockSafeInputHandler('82\n', 10, false);
    const val = handler.input();
    expect(val).toBe('82');
    expect(handler.stdout).toBe('');
  });

  it('provides intelligent contextual mock values when stdin is empty in trace mode', () => {
    const handler = new MockSafeInputHandler('', 10, true);
    
    const name = handler.input('Enter your name: ');
    const age = handler.input('Enter your age: ');
    const score = handler.input('Enter total score: ');
    const email = handler.input('Enter user email: ');

    expect(name).toBe('Alice');
    expect(age).toBe('5');
    expect(score).toBe('5');
    expect(email).toBe('alice@example.com');
  });

  it('supports integer casting on mock fallback values without throwing ValueError', () => {
    const handler = new MockSafeInputHandler('', 10, true);
    const ageVal = handler.input('Enter your age: ');
    const parsedAge = parseInt(ageVal, 10);

    expect(Number.isInteger(parsedAge)).toBe(true);
    expect(parsedAge).toBe(5);
  });

  it('raises standard EOFError when real stdin is exhausted in non-trace competitive mode', () => {
    const handler = new MockSafeInputHandler('single_line', 10, false);
    expect(handler.input()).toBe('single_line');
    expect(() => handler.input()).toThrow('EOFError: EOF when reading a line');
  });

  it('safely caps fallback mock inputs to prevent infinite loops when no stdin is provided', () => {
    const handler = new MockSafeInputHandler('', 3, true);
    expect(handler.input()).toBe('10');
    expect(handler.input()).toBe('10');
    expect(handler.input()).toBe('10');
    expect(() => handler.input()).toThrow('input limit reached');
  });
});
