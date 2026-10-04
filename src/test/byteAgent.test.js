import { describe, it, expect, beforeEach } from 'vitest';
import { byteAgent, ByteAgent } from '../agent/core/ByteAgent.js';
import { AstInspectorTool } from '../agent/tools/AstInspectorTool.js';
import { FuzzGeneratorTool } from '../agent/tools/FuzzGeneratorTool.js';
import { misconceptionStore } from '../agent/memory/MisconceptionStore.js';

describe('ByteAgent Autonomous Browser-Native Ecosystem', () => {
  beforeEach(() => {
    misconceptionStore.clear();
  });

  describe('1. AstInspectorTool (Structural Code Inspection)', () => {
    it('detects functions, parameters, and return presence', () => {
      const code = [
        'def calculate_grade(mark, curve):',
        '    total = mark + curve',
        '    return total'
      ].join('\n');

      const ast = AstInspectorTool.inspect(code);
      expect(ast.functions.length).toBe(1);
      expect(ast.functions[0].name).toBe('calculate_grade');
      expect(ast.functions[0].params).toEqual(['mark', 'curve']);
      expect(ast.functions[0].hasReturn).toBe(true);
      expect(ast.functions[0].isRecursive).toBe(false);
    });

    it('detects recursion when a function calls itself', () => {
      const code = [
        'def factorial(n):',
        '    if n <= 1:',
        '        return 1',
        '    return n * factorial(n - 1)'
      ].join('\n');

      const ast = AstInspectorTool.inspect(code);
      expect(ast.functions.length).toBe(1);
      expect(ast.functions[0].isRecursive).toBe(true);
      expect(ast.hasRecursion).toBe(true);
    });

    it('detects nested loops and calculates cognitive nesting depth', () => {
      const code = [
        'for i in range(5):',
        '    for j in range(5):',
        '        print(i, j)'
      ].join('\n');

      const ast = AstInspectorTool.inspect(code);
      expect(ast.loops.length).toBe(2);
      expect(ast.maxNestingDepth).toBeGreaterThanOrEqual(2);
    });

    it('identifies code smells like off-by-one and missing returns', () => {
      const code = [
        'def compute_sum(items):',
        '    total = 0',
        '    for i in range(len(items) + 1):',
        '        total += 1'
      ].join('\n');

      const ast = AstInspectorTool.inspect(code);
      expect(ast.codeSmells.some(s => s.type === 'off_by_one_range')).toBe(true);
      expect(ast.codeSmells.some(s => s.type === 'missing_return')).toBe(true);
    });
  });

  describe('2. FuzzGeneratorTool (Predictive Edge-Case Generation)', () => {
    it('generates zero divisor boundary challenges when division is present', () => {
      const code = 'avg = total / count';
      const challenges = FuzzGeneratorTool.generateEdgeCases(code, 'Calculate Average');
      expect(challenges.length).toBeGreaterThan(0);
      expect(challenges.some(c => c.id === 'fuzz_zero_divisor')).toBe(true);
      expect(challenges[0].suggestedInput).toBe('0');
    });

    it('generates empty collection challenges when list operations are detected', () => {
      const code = 'first_elem = items[0]';
      const challenges = FuzzGeneratorTool.generateEdgeCases(code, 'List Manipulation');
      expect(challenges.some(c => c.id === 'fuzz_empty_collection')).toBe(true);
      expect(challenges[0].correctId).toBe('B'); // IndexError
    });
  });

  describe('3. MisconceptionStore (Student Cognitive Memory in IndexedDB/Storage)', () => {
    it('records errors and tracks conceptual weaknesses', () => {
      misconceptionStore.recordError('IndexError', { message: 'list index out of range' });
      misconceptionStore.recordError('IndexError', { message: 'list index out of range' });

      const profile = misconceptionStore.getProfile();
      expect(profile.totalErrors).toBe(2);
      expect(profile.errorFrequencies['IndexError']).toBe(2);
      expect(profile.conceptWeaknesses['list_index_bounds']).toBe(2);
      expect(misconceptionStore.getTopWeakness()).toBe('list_index_bounds');
    });

    it('tracks prediction challenge streaks and accuracy', () => {
      misconceptionStore.recordPredictionResult('pred_1', true, 'Boundary Math');
      misconceptionStore.recordPredictionResult('pred_2', true, 'Boundary Math');
      misconceptionStore.recordPredictionResult('pred_3', false, 'Boundary Math');

      const stats = misconceptionStore.getPredictions();
      expect(stats.totalAttempted).toBe(3);
      expect(stats.totalCorrect).toBe(2);
      expect(stats.streak).toBe(0);
      expect(stats.highestStreak).toBe(2);
    });
  });

  describe('4. ByteAgent Cognitive Orchestrator & Socratic Guardrails', () => {
    it('observes context and produces targeted Socratic clues without leaking code', async () => {
      const agent = new ByteAgent();
      agent.observe({
        code: 'mark = int(input())\nif mark >= 90: grade = "A"\nprint(grade)',
        stderr: 'NameError: name \'grade\' is not defined',
        runtimeError: { error_type: 'NameError', error_msg: "name 'grade' is not defined", line: 3 }
      });

      const nudge = await agent.diagnose(1);
      expect(nudge).not.toBeNull();
      expect(nudge.category).toBe('NameError');
      // Socratic guardrail: Must not dump Python statements with triple backticks
      expect(nudge.socraticClue).not.toContain('```');
      expect(nudge.actionIdea).not.toContain('```');
    });

    it('handles test case logic failures with diff intelligence', async () => {
      const agent = new ByteAgent();
      agent.observe({
        code: 'mark = int(input())\nif mark >= 90: grade = "A"\nelse: grade = "F"\nprint("Grade:", grade)',
        testCaseResults: [
          {
            input: '82',
            expectedOutput: 'Grade: B',
            actualOutput: 'Enter mark: Grade: B',
            passed: false
          }
        ]
      });

      const nudge = await agent.diagnose(1);
      expect(nudge).not.toBeNull();
      expect(nudge.type).toBe('logic_failure');
      expect(nudge.socraticClue).toContain('prompt or prefix text');
    });

    it('generates prediction challenges and grades answers locally', () => {
      const agent = new ByteAgent();
      const challenge = agent.generatePrediction('def find_avg(nums): return sum(nums) / len(nums)', 'Average Calculation');
      expect(challenge).not.toBeNull();
      expect(challenge.options.length).toBe(3);

      const result = agent.submitPredictionAnswer(challenge.correctId);
      expect(result.isCorrect).toBe(true);
      expect(result.streak).toBe(1);
    });
  });
});
