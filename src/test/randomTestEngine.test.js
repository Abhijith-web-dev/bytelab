import { describe, it, expect } from 'vitest';
import { RandomTestEngine } from '../features/assessment/randomTestEngine.js';

describe('Random Test Engine & Assessment Evaluation', () => {
  it('generates a balanced test session with specified count', () => {
    const session = RandomTestEngine.generateTestSession({
      courseId: 'python-programming',
      count: 5,
      timeLimitMinutes: 10
    });

    expect(session).toBeDefined();
    expect(session.sessionId).toMatch(/^test_/);
    expect(session.questions.length).toBe(5);
    expect(session.timeLimitSeconds).toBe(600);

    // Verify each generated question has normalized options with exactly one correct option
    session.questions.forEach(q => {
      expect(q.options).toBeDefined();
      expect(Array.isArray(q.options)).toBe(true);
      expect(q.options.length).toBeGreaterThanOrEqual(2);
      const correctCount = q.options.filter(o => o.isCorrect).length;
      expect(correctCount).toBe(1);
    });
  });

  it('correctly evaluates multiple-choice answers and maps to Course Outcomes (CO1-CO5)', () => {
    const mockQuestions = [
      {
        id: 'q1',
        question: 'What does type(42) return in Python?',
        coMapping: ['CO1'],
        options: [
          { id: 'opt1', text: "<class 'int'>", isCorrect: true },
          { id: 'opt2', text: "<class 'float'>", isCorrect: false }
        ]
      },
      {
        id: 'q2',
        question: 'What is recursion?',
        coMapping: ['CO2'],
        options: [
          { id: 'opt3', text: 'A function calling itself', isCorrect: true },
          { id: 'opt4', text: 'An infinite loop only', isCorrect: false }
        ]
      }
    ];

    const userAnswers = {
      q1: 'opt1', // Correct
      q2: 'opt4'  // Incorrect
    };

    const evaluation = RandomTestEngine.evaluate(mockQuestions, userAnswers);

    expect(evaluation.score).toBe(1);
    expect(evaluation.maxScore).toBe(2);
    expect(evaluation.percentage).toBe(50);
    expect(evaluation.passed).toBe(false); // 50% < 60%

    // Outcome Breakdown
    expect(evaluation.coBreakdown['CO1'].correct).toBe(1);
    expect(evaluation.coBreakdown['CO1'].total).toBe(1);
    expect(evaluation.coBreakdown['CO2'].correct).toBe(0);
    expect(evaluation.coBreakdown['CO2'].total).toBe(1);
  });

  it('correctly handles string options with numeric index correctAnswer', () => {
    const rawQuestion = {
      id: 'q_str_test',
      question: 'Which is an immutable sequence in Python?',
      options: ['list', 'tuple', 'set', 'dict'],
      correctAnswer: 1, // 'tuple'
      coMapping: ['CO3']
    };

    const session = RandomTestEngine.generateTestSession({
      courseId: 'python-programming',
      count: 1
    });

    const evaluated = RandomTestEngine.evaluate([
      {
        id: 'q_str_test',
        question: 'Which is an immutable sequence in Python?',
        options: [
          { id: '0', text: 'list', isCorrect: false },
          { id: '1', text: 'tuple', isCorrect: true },
          { id: '2', text: 'set', isCorrect: false },
          { id: '3', text: 'dict', isCorrect: false }
        ],
        coMapping: ['CO3']
      }
    ], { q_str_test: '1' });

    expect(evaluated.score).toBe(1);
    expect(evaluated.percentage).toBe(100);
    expect(evaluated.passed).toBe(true);
    expect(evaluated.details[0].isCorrect).toBe(true);
    expect(evaluated.details[0].correctText).toBe('tuple');
  });
});
