import { z } from 'zod';

export const OutcomeSchema = z.enum(['CO1', 'CO2', 'CO3', 'CO4', 'CO5']);

export const DifficultySchema = z.enum(['beginner', 'intermediate', 'advanced', 'challenge']);

export const ExampleSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  code: z.string(),
  expectedOutput: z.string(),
  explanation: z.string(),
  lineByLine: z.array(z.object({
    line: z.string(),
    explanation: z.string()
  })).optional()
});

export const TestCaseSchema = z.object({
  id: z.string(),
  input: z.string().default(''),
  expectedOutput: z.string(),
  isHidden: z.boolean().default(false),
  description: z.string().optional()
});

export const ProblemSchema = z.object({
  id: z.string(),
  courseId: z.string(),
  unitId: z.string(),
  chapterId: z.string(),
  language: z.string().default('python'),
  difficulty: DifficultySchema,
  title: z.string(),
  description: z.string(),
  starterCode: z.string(),
  solutionCode: z.string().optional(),
  hints: z.array(z.string()).default([]),
  testCases: z.array(TestCaseSchema),
  skills: z.array(z.string()).default([]),
  coMapping: z.array(OutcomeSchema).default([]),
  timeLimitMs: z.number().default(5000),
  attemptsAllowed: z.number().default(10)
});

export const QuizOptionSchema = z.object({
  id: z.string(),
  text: z.string(),
  isCorrect: z.boolean(),
  explanation: z.string().optional()
});

export const QuizQuestionSchema = z.object({
  id: z.string(),
  type: z.enum(['mcq', 'output_prediction', 'debugging', 'code_fill']),
  difficulty: DifficultySchema,
  coMapping: z.array(OutcomeSchema).default([]),
  question: z.string(),
  codeSnippet: z.string().optional(),
  options: z.array(QuizOptionSchema).optional(),
  correctAnswer: z.string().optional(),
  explanation: z.string(),
  tags: z.array(z.string()).default([])
});

export const ChapterSchema = z.object({
  id: z.string(),
  unitId: z.string(),
  order: z.number(),
  title: z.string(),
  description: z.string(),
  estimatedMinutes: z.number().default(30),
  difficulty: DifficultySchema,
  outcomes: z.array(OutcomeSchema),
  prerequisites: z.array(z.string()).default([]),
  lessonsCount: z.number().default(1),
  problemsCount: z.number().default(1),
  quizCount: z.number().default(3)
});

export const UnitSchema = z.object({
  id: z.string(),
  unitNumber: z.number(),
  romanNumber: z.string(),
  title: z.string(),
  description: z.string(),
  periods: z.number().default(12),
  outcomes: z.array(OutcomeSchema),
  chapters: z.array(z.string())
});

export const CourseSchema = z.object({
  id: z.string(),
  code: z.string(),
  title: z.string(),
  language: z.string().default('python'),
  programme: z.string(),
  ltpc: z.string(),
  prerequisite: z.string().nullable().default(null),
  totalPeriods: z.number().default(60),
  unitsCount: z.number().default(5),
  difficulty: z.string().default('Beginner to Applied'),
  description: z.string(),
  outcomes: z.array(z.object({
    code: OutcomeSchema,
    statement: z.string(),
    bloomLevel: z.string()
  })),
  units: z.array(UnitSchema)
});

export const UserProgressSchema = z.object({
  userId: z.string(),
  courseId: z.string(),
  completedLessons: z.array(z.string()).default([]),
  completedChapters: z.array(z.string()).default([]),
  completedUnits: z.array(z.string()).default([]),
  solvedProblems: z.record(z.string(), z.object({
    passed: z.boolean(),
    attempts: z.number(),
    bestCode: z.string().optional(),
    updatedAt: z.number()
  })).default({}),
  testScores: z.record(z.string(), z.object({
    score: z.number(),
    maxScore: z.number(),
    percentage: z.number(),
    passed: z.boolean(),
    attemptedAt: z.number()
  })).default({}),
  streakDays: z.number().default(1),
  lastActiveDate: z.string(),
  totalPoints: z.number().default(0)
});
