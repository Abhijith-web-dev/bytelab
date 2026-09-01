import { describe, it, expect } from 'vitest';
import {
  getCourse,
  getUnit,
  getChapter,
  getLesson,
  getStory,
  getSimulation,
  getExamples,
  getProblems,
  getQuiz,
  getAllProblems,
  getQuestionPool,
  buildSearchIndex
} from '../content/loader/index.js';

describe('Content Loader & 19AI301/CS3301 65-Day Plan Validation', () => {
  it('loads Python Programming course metadata correctly', () => {
    const course = getCourse('python-programming');
    expect(course).toBeDefined();
    expect(course.code).toBe('19AI301 / CS3301');
    expect(course.title).toBe('Python Programming');
    expect(course.totalPeriods).toBe(60);
    expect(course.totalDays).toBe(65);
    expect(course.units).toHaveLength(6);
  });

  it('contains all 5 units corresponding to CO1 through CO5 plus Consolidation', () => {
    const course = getCourse('python-programming');
    const unitIds = course.units.map(u => u.id);
    expect(unitIds).toEqual(['unit-01', 'unit-02', 'unit-03', 'unit-04', 'unit-05', 'unit-06']);

    // Check Unit I
    const unit1 = getUnit('python-programming', 'unit-01');
    expect(unit1.romanNumber).toBe('Unit I');
    expect(unit1.outcomes).toContain('CO1');

    // Check Unit V
    const unit5 = getUnit('python-programming', 'unit-05');
    expect(unit5.romanNumber).toBe('Unit V');
    expect(unit5.outcomes).toContain('CO5');
  });

  it('loads all 65 days across all 6 units with full 12-section lessons, story mode, and simulations', () => {
    const course = getCourse('python-programming');
    let totalDays = 0;

    course.units.forEach(unit => {
      unit.chapters.forEach(chFolder => {
        const ch = getChapter('python-programming', unit.id, chFolder);
        expect(ch).toBeDefined();
        expect(ch?.title).toBeTruthy();
        expect(ch?.simulationType).toBeTruthy();

        const lesson = getLesson('python-programming', unit.id, chFolder);
        expect(lesson).toBeTruthy();
        expect(lesson).toContain('## 02. Learning Objective');
        expect(lesson).toContain('## 26. Summary');

        const story = getStory('python-programming', unit.id, chFolder);
        expect(story).toBeTruthy();
        expect(story.length).toBeGreaterThan(100);

        const sim = getSimulation('python-programming', unit.id, chFolder);
        expect(sim).toBeDefined();
        expect(sim?.steps?.length).toBeGreaterThan(0);

        totalDays++;
      });
    });

    expect(totalDays).toBe(65);
  });

  it('loads problems and test cases properly for all 65 days', () => {
    const problems = getAllProblems('python-programming');
    expect(problems.length).toBe(65);

    const firstProblem = problems[0];
    expect(firstProblem.id).toBeTruthy();
    expect(firstProblem.starterCode).toBeTruthy();
    expect(firstProblem.testCases.length).toBeGreaterThan(0);
    expect(firstProblem.testCases[0].expectedOutput).toBeDefined();
  });

  it('builds full-text search index correctly with Fuse.js items', () => {
    const searchIndex = buildSearchIndex('python-programming');
    expect(searchIndex.length).toBeGreaterThan(65);

    const hasRecursion = searchIndex.some(item =>
      item.title.toLowerCase().includes('recursion') ||
      item.description.toLowerCase().includes('recursion')
    );
    expect(hasRecursion).toBe(true);

    const hasNumpy = searchIndex.some(item =>
      item.title.toLowerCase().includes('numpy') ||
      item.description.toLowerCase().includes('numpy')
    );
    expect(hasNumpy).toBe(true);
  });
});
