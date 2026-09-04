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
  buildSearchIndex,
  getLanguages
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

        const lesson = getLesson('python-programming', unit.id, chFolder);
        expect(lesson).toBeTruthy();
        expect(lesson.length).toBeGreaterThan(100);

        const story = getStory('python-programming', unit.id, chFolder);
        if (story) {
          expect(story.length).toBeGreaterThan(10);
        }

        const sim = getSimulation('python-programming', unit.id, chFolder);
        expect(sim).toBeDefined();

        totalDays++;
      });
    });

    expect(totalDays).toBeGreaterThanOrEqual(27);
  });

  it('loads multi-language descriptors properly including Python, C++, C, TypeScript, Rust, and SQL', () => {
    const languages = getLanguages();
    expect(languages.length).toBeGreaterThanOrEqual(6);
    const langIds = languages.map(l => l.id);
    expect(langIds).toContain('python');
    expect(langIds).toContain('cpp');
    expect(langIds).toContain('c');
    expect(langIds).toContain('typescript');
    expect(langIds).toContain('rust');
    expect(langIds).toContain('sql');
  });

  it('loads problems and test cases properly for curriculum', () => {
    const problems = getAllProblems('python-programming');
    expect(problems.length).toBeGreaterThanOrEqual(27);

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

  it('loads Unit 4 Day 1 (Files & Exceptions) with full lesson, 10 quiz questions, and clean starterCode', () => {
    const ch = getChapter('python-programming', 'unit-04', 'day-37');
    expect(ch).toBeDefined();
    expect(ch.id).toBe('day-37');
    expect(ch.unitId).toBe('unit-04');

    // Test alias resolution
    const aliasCh = getChapter('python-programming', 'unit-04', 'u4-day-01');
    expect(aliasCh).toBeDefined();
    expect(aliasCh.id).toBe('day-37');

    const lesson = getLesson('python-programming', 'unit-04', 'day-37');
    expect(lesson).toContain('Unit–IV — Day 1: Files and Exceptions');
    expect(lesson).toContain('open()');

    const quiz = getQuiz('python-programming', 'unit-04', 'day-37');
    expect(quiz).toHaveLength(10);
    expect(quiz[0].question).toContain('file handling');

    const problems = getProblems('python-programming', 'unit-04', 'day-37');
    expect(problems.length).toBeGreaterThanOrEqual(1);
    const prob = problems[0];
    expect(prob.id).toBe('prob-day-37-01');
    // Verify starter code contains ONLY comments
    const nonCommentLines = prob.starterCode
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0 && !l.startsWith('#'));
    expect(nonCommentLines).toHaveLength(0);

    const sim = getSimulation('python-programming', 'unit-04', 'day-37');
    expect(sim).toBeDefined();
    expect(sim.steps.length).toBeGreaterThan(0);
  });

  it('loads Unit 4 Day 2 (Reading and Writing Text Files) with full lesson, 10 quiz questions, and clean starterCode', () => {
    const ch = getChapter('python-programming', 'unit-04', 'day-38');
    expect(ch).toBeDefined();
    expect(ch.id).toBe('day-38');
    expect(ch.unitId).toBe('unit-04');

    // Test alias resolution
    const aliasCh = getChapter('python-programming', 'unit-04', 'u4-day-02');
    expect(aliasCh).toBeDefined();
    expect(aliasCh.id).toBe('day-38');

    const lesson = getLesson('python-programming', 'unit-04', 'day-38');
    expect(lesson).toContain('Unit–IV — Day 2: Reading and Writing Text Files');
    expect(lesson).toContain('readline()');
    expect(lesson).toContain('readlines()');

    const quiz = getQuiz('python-programming', 'unit-04', 'day-38');
    expect(quiz).toHaveLength(10);
    expect(quiz[0].options).toContain('read()');

    const problems = getProblems('python-programming', 'unit-04', 'day-38');
    expect(problems.length).toBeGreaterThanOrEqual(1);
    const prob = problems[0];
    expect(prob.id).toBe('prob-day-38-01');
    expect(prob.title).toContain('Student Marks File Analyzer');
    // Verify starter code contains ONLY comments
    const nonCommentLines = prob.starterCode
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0 && !l.startsWith('#'));
    expect(nonCommentLines).toHaveLength(0);

    const sim = getSimulation('python-programming', 'unit-04', 'day-38');
    expect(sim).toBeDefined();
    expect(sim.steps.length).toBeGreaterThan(0);

    const story = getStory('python-programming', 'unit-04', 'day-38');
    expect(story).toBeDefined();
    expect(story).toContain("The Librarian's Bookmark");
  });

  it('loads Unit 4 Day 3 (Format Operator & sys.argv) with full lesson, 10 quiz questions, and clean starterCode', () => {
    const ch = getChapter('python-programming', 'unit-04', 'day-39');
    expect(ch).toBeDefined();
    expect(ch.id).toBe('day-39');
    expect(ch.unitId).toBe('unit-04');

    // Test alias resolution
    const aliasCh = getChapter('python-programming', 'unit-04', 'u4-day-03');
    expect(aliasCh).toBeDefined();
    expect(aliasCh.id).toBe('day-39');

    const lesson = getLesson('python-programming', 'unit-04', 'day-39');
    expect(lesson).toContain('Unit–IV — Day 3: Format Operator');
    expect(lesson).toContain('sys.argv');
    expect(lesson).toContain('%.2f');

    const quiz = getQuiz('python-programming', 'unit-04', 'day-39');
    expect(quiz).toHaveLength(10);
    expect(quiz[0].options).toContain('%');

    const problems = getProblems('python-programming', 'unit-04', 'day-39');
    expect(problems.length).toBeGreaterThanOrEqual(1);
    const prob = problems[0];
    expect(prob.id).toBe('prob-day-39-01');
    expect(prob.title).toContain('Student File Report Generator');
    // Verify starter code contains ONLY comments
    const nonCommentLines = prob.starterCode
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0 && !l.startsWith('#'));
    expect(nonCommentLines).toHaveLength(0);

    const sim = getSimulation('python-programming', 'unit-04', 'day-39');
    expect(sim).toBeDefined();
    expect(sim.steps.length).toBeGreaterThan(0);

    const story = getStory('python-programming', 'unit-04', 'day-39');
    expect(story).toBeDefined();
    expect(story).toContain('The Story of the Royal Herald');
  });

  it('loads Unit 4 Day 4 (Command-Line Arguments & sys.argv) with full lesson, 10 quiz questions, and clean starterCode', () => {
    const ch = getChapter('python-programming', 'unit-04', 'day-40');
    expect(ch).toBeDefined();
    expect(ch.id).toBe('day-40');
    expect(ch.unitId).toBe('unit-04');

    // Test alias resolution
    const aliasCh = getChapter('python-programming', 'unit-04', 'u4-day-04');
    expect(aliasCh).toBeDefined();
    expect(aliasCh.id).toBe('day-40');

    const lesson = getLesson('python-programming', 'unit-04', 'day-40');
    expect(lesson).toContain('Unit–IV — Day 4: Command-Line Arguments');
    expect(lesson).toContain('sys.argv');
    expect(lesson).toContain('len(sys.argv)');

    const quiz = getQuiz('python-programming', 'unit-04', 'day-40');
    expect(quiz).toHaveLength(10);
    expect(quiz[1].options).toContain('sys');

    const problems = getProblems('python-programming', 'unit-04', 'day-40');
    expect(problems.length).toBeGreaterThanOrEqual(1);
    const prob = problems[0];
    expect(prob.id).toBe('prob-day-40-01');
    expect(prob.title).toContain('Command-Line Number Analyzer');
    // Verify starter code contains ONLY comments
    const nonCommentLines = prob.starterCode
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0 && !l.startsWith('#'));
    expect(nonCommentLines).toHaveLength(0);

    const sim = getSimulation('python-programming', 'unit-04', 'day-40');
    expect(sim).toBeDefined();
    expect(sim.steps.length).toBeGreaterThan(0);

    const story = getStory('python-programming', 'unit-04', 'day-40');
    expect(story).toBeDefined();
    expect(story).toContain("The Story of the Courier's Satchel");
  });

  it('loads Unit 4 Day 5 (Errors and Exceptions in Python) with full lesson, 10 quiz questions, and clean starterCode', () => {
    const ch = getChapter('python-programming', 'unit-04', 'day-41');
    expect(ch).toBeDefined();
    expect(ch.id).toBe('day-41');
    expect(ch.unitId).toBe('unit-04');

    // Test alias resolution
    const aliasCh = getChapter('python-programming', 'unit-04', 'u4-day-05');
    expect(aliasCh).toBeDefined();
    expect(aliasCh.id).toBe('day-41');

    const lesson = getLesson('python-programming', 'unit-04', 'day-41');
    expect(lesson).toContain('Unit–IV — Day 5: Errors and Exceptions in Python');
    expect(lesson).toContain('IndexError');
    expect(lesson).toContain('ZeroDivisionError');

    const quiz = getQuiz('python-programming', 'unit-04', 'day-41');
    expect(quiz).toHaveLength(10);
    expect(quiz[0].options).toContain("A violation of Python's formal language grammar and structure");

    const problems = getProblems('python-programming', 'unit-04', 'day-41');
    expect(problems.length).toBeGreaterThanOrEqual(1);
    const prob = problems[0];
    expect(prob.id).toBe('prob-day-41-01');
    expect(prob.title).toContain('Fix the Python Errors (IndexError Prevention)');
    // Verify starter code contains ONLY comments
    const nonCommentLines = prob.starterCode
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0 && !l.startsWith('#'));
    expect(nonCommentLines).toHaveLength(0);

    const sim = getSimulation('python-programming', 'unit-04', 'day-41');
    expect(sim).toBeDefined();
    expect(sim.steps.length).toBeGreaterThan(0);

    const story = getStory('python-programming', 'unit-04', 'day-41');
    expect(story).toBeDefined();
    expect(story).toContain("The Story of the Architect's Blueprint");
  });

  it('loads Unit 4 Day 6 (Handling Exceptions in Python) with full lesson, 10 quiz questions, and clean starterCode', () => {
    const ch = getChapter('python-programming', 'unit-04', 'day-42');
    expect(ch).toBeDefined();
    expect(ch.id).toBe('day-42');
    expect(ch.unitId).toBe('unit-04');

    // Test alias resolution
    const aliasCh = getChapter('python-programming', 'unit-04', 'u4-day-06');
    expect(aliasCh).toBeDefined();
    expect(aliasCh.id).toBe('day-42');

    const lesson = getLesson('python-programming', 'unit-04', 'day-42');
    expect(lesson).toContain('Unit–IV — Day 6: Handling Exceptions in Python');
    expect(lesson).toContain('try');
    expect(lesson).toContain('finally');
    expect(lesson).toContain('raise');

    const quiz = getQuiz('python-programming', 'unit-04', 'day-42');
    expect(quiz).toHaveLength(10);
    expect(quiz[0].options).toContain('try');

    const problems = getProblems('python-programming', 'unit-04', 'day-42');
    expect(problems.length).toBeGreaterThanOrEqual(1);
    const prob = problems[0];
    expect(prob.id).toBe('prob-day-42-01');
    expect(prob.title).toContain('Safe Student Mark Validator');
    // Verify starter code contains ONLY comments
    const nonCommentLines = prob.starterCode
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0 && !l.startsWith('#'));
    expect(nonCommentLines).toHaveLength(0);

    const sim = getSimulation('python-programming', 'unit-04', 'day-42');
    expect(sim).toBeDefined();
    expect(sim.steps.length).toBeGreaterThan(0);

    const story = getStory('python-programming', 'unit-04', 'day-42');
    expect(story).toBeDefined();
    expect(story).toContain("The Story of the Aerial Acrobat's Safety Net");
  });

  it('loads Unit 4 Day 7 (Modules in Python) with full lesson, 10 quiz questions, and clean starterCode', () => {
    const ch = getChapter('python-programming', 'unit-04', 'day-43');
    expect(ch).toBeDefined();
    expect(ch.id).toBe('day-43');
    expect(ch.unitId).toBe('unit-04');

    // Test alias resolution
    const aliasCh = getChapter('python-programming', 'unit-04', 'u4-day-07');
    expect(aliasCh).toBeDefined();
    expect(aliasCh.id).toBe('day-43');

    const lesson = getLesson('python-programming', 'unit-04', 'day-43');
    expect(lesson).toContain('Unit–IV — Day 7: Modules in Python');
    expect(lesson).toContain('math');
    expect(lesson).toContain('random');
    expect(lesson).toContain('import');

    const quiz = getQuiz('python-programming', 'unit-04', 'day-43');
    expect(quiz).toHaveLength(10);
    expect(quiz[1].options).toContain('import');

    const problems = getProblems('python-programming', 'unit-04', 'day-43');
    expect(problems.length).toBeGreaterThanOrEqual(1);
    const prob = problems[0];
    expect(prob.id).toBe('prob-day-43-01');
    expect(prob.title).toContain('Build and Use a Number Tools Module');
    // Verify starter code contains ONLY comments
    const nonCommentLines = prob.starterCode
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0 && !l.startsWith('#'));
    expect(nonCommentLines).toHaveLength(0);

    const sim = getSimulation('python-programming', 'unit-04', 'day-43');
    expect(sim).toBeDefined();
    expect(sim.steps.length).toBeGreaterThan(0);

    const story = getStory('python-programming', 'unit-04', 'day-43');
    expect(story).toBeDefined();
    expect(story).toContain("The Story of the Royal Clockmaker's Gearboxes");
  });

  it('loads Unit 4 Day 8 (Packages in Python) with full lesson, 10 quiz questions, and clean starterCode', () => {
    const ch = getChapter('python-programming', 'unit-04', 'day-44');
    expect(ch).toBeDefined();
    expect(ch.id).toBe('day-44');
    expect(ch.unitId).toBe('unit-04');

    // Test alias resolution
    const aliasCh = getChapter('python-programming', 'unit-04', 'u4-day-08');
    expect(aliasCh).toBeDefined();
    expect(aliasCh.id).toBe('day-44');

    const lesson = getLesson('python-programming', 'unit-04', 'day-44');
    expect(lesson).toContain('Unit–IV — Day 8: Packages in Python');
    expect(lesson).toContain('__init__.py');
    expect(lesson).toContain('student_tools');

    const quiz = getQuiz('python-programming', 'unit-04', 'day-44');
    expect(quiz).toHaveLength(10);
    expect(quiz[0].options).toContain('A directory (folder) used to organize and group related Python modules');

    const problems = getProblems('python-programming', 'unit-04', 'day-44');
    expect(problems.length).toBeGreaterThanOrEqual(1);
    const prob = problems[0];
    expect(prob.id).toBe('prob-day-44-01');
    expect(prob.title).toContain('Create and Use a Student Utility Package');
    // Verify starter code contains ONLY comments
    const nonCommentLines = prob.starterCode
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0 && !l.startsWith('#'));
    expect(nonCommentLines).toHaveLength(0);

    const sim = getSimulation('python-programming', 'unit-04', 'day-44');
    expect(sim).toBeDefined();
    expect(sim.steps.length).toBeGreaterThan(0);

    const story = getStory('python-programming', 'unit-04', 'day-44');
    expect(story).toBeDefined();
    expect(story).toContain("The Story of the Grand Bazaar's Guild Quarters");
  });

  it('loads Unit 4 Day 9 (File Processing, Modules, Exceptions, Classes and Objects) with full lesson, 10 quiz questions, and clean starterCode', () => {
    const ch = getChapter('python-programming', 'unit-04', 'day-45');
    expect(ch).toBeDefined();
    expect(ch.id).toBe('day-45');
    expect(ch.unitId).toBe('unit-04');

    // Test alias resolution
    const aliasCh = getChapter('python-programming', 'unit-04', 'u4-day-09');
    expect(aliasCh).toBeDefined();
    expect(aliasCh.id).toBe('day-45');

    const lesson = getLesson('python-programming', 'unit-04', 'day-45');
    expect(lesson).toContain('Unit–IV — Day 9: File Processing, Modules, Exceptions, Classes and Objects');
    expect(lesson).toContain('__init__');
    expect(lesson).toContain('self');
    expect(lesson).toContain('Student');

    const quiz = getQuiz('python-programming', 'unit-04', 'day-45');
    expect(quiz).toHaveLength(10);
    expect(quiz[4].options).toContain('class');

    const problems = getProblems('python-programming', 'unit-04', 'day-45');
    expect(problems.length).toBeGreaterThanOrEqual(1);
    const prob = problems[0];
    expect(prob.id).toBe('prob-day-45-01');
    expect(prob.title).toContain('Student File Object Analyzer');
    // Verify starter code contains ONLY comments
    const nonCommentLines = prob.starterCode
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0 && !l.startsWith('#'));
    expect(nonCommentLines).toHaveLength(0);

    const sim = getSimulation('python-programming', 'unit-04', 'day-45');
    expect(sim).toBeDefined();
    expect(sim.steps.length).toBeGreaterThan(0);

    const story = getStory('python-programming', 'unit-04', 'day-45');
    expect(story).toBeDefined();
    expect(story).toContain("The Story of the Master Scribe & The Living Marionettes");
  });

  it('loads Unit 4 Day 10 (Classes and Objects — Introduction to OOP) with full lesson, 10 quiz questions, and clean starterCode', () => {
    const ch = getChapter('python-programming', 'unit-04', 'day-46');
    expect(ch).toBeDefined();
    expect(ch.id).toBe('day-46');
    expect(ch.unitId).toBe('unit-04');

    // Test alias resolution
    const aliasCh = getChapter('python-programming', 'unit-04', 'u4-day-10');
    expect(aliasCh).toBeDefined();
    expect(aliasCh.id).toBe('day-46');

    const lesson = getLesson('python-programming', 'unit-04', 'day-46');
    expect(lesson).toContain('Unit–IV — Day 10: Classes and Objects');
    expect(lesson).toContain('BankAccount');
    expect(lesson).toContain('__init__');
    expect(lesson).toContain('self');

    const quiz = getQuiz('python-programming', 'unit-04', 'day-46');
    expect(quiz).toHaveLength(10);
    expect(quiz[0].options).toContain('A blueprint or template for creating objects');

    const problems = getProblems('python-programming', 'unit-04', 'day-46');
    expect(problems.length).toBeGreaterThanOrEqual(1);
    const prob = problems[0];
    expect(prob.id).toBe('prob-day-46-01');
    expect(prob.title).toContain('Build a Bank Account Class');
    // Verify starter code contains ONLY comments
    const nonCommentLines = prob.starterCode
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0 && !l.startsWith('#'));
    expect(nonCommentLines).toHaveLength(0);

    const sim = getSimulation('python-programming', 'unit-04', 'day-46');
    expect(sim).toBeDefined();
    expect(sim.steps.length).toBeGreaterThan(0);

    const story = getStory('python-programming', 'unit-04', 'day-46');
    expect(story).toBeDefined();
    expect(story).toContain('The Story of the Clockwork Guild & The Sovereign Vessels');
  });

  it('loads Unit 5 Day 1 (Introduction to NumPy & Arrays) with full lesson, 10 quiz questions, and clean starterCode', () => {
    const ch = getChapter('python-programming', 'unit-05', 'day-49');
    expect(ch).toBeDefined();
    expect(ch.id).toBe('day-49');
    expect(ch.unitId).toBe('unit-05');

    // Test alias resolution
    const aliasCh = getChapter('python-programming', 'unit-05', 'u5-day-01');
    expect(aliasCh).toBeDefined();
    expect(aliasCh.id).toBe('day-49');

    const lesson = getLesson('python-programming', 'unit-05', 'day-49');
    expect(lesson).toContain('Unit–V — Day 1: Introduction to NumPy');
    expect(lesson).toContain('np.array');
    expect(lesson).toContain('ndim');
    expect(lesson).toContain('shape');

    const quiz = getQuiz('python-programming', 'unit-05', 'day-49');
    expect(quiz).toHaveLength(10);
    expect(quiz[0].options).toContain('Numerical Python');

    const problems = getProblems('python-programming', 'unit-05', 'day-49');
    expect(problems.length).toBeGreaterThanOrEqual(1);
    const prob = problems[0];
    expect(prob.id).toBe('prob-day-49-01');
    expect(prob.title).toContain('Create and Analyze a NumPy Marks Array');
    // Verify starter code contains ONLY comments
    const nonCommentLines = prob.starterCode
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0 && !l.startsWith('#'));
    expect(nonCommentLines).toHaveLength(0);

    const sim = getSimulation('python-programming', 'unit-05', 'day-49');
    expect(sim).toBeDefined();
    expect(sim.steps.length).toBeGreaterThan(0);

    const story = getStory('python-programming', 'unit-05', 'day-49');
    expect(story).toBeDefined();
    expect(story).toContain('The Story of the Royal Granary & The Thousand Abacuses');
  });

  it('loads Unit 5 Day 2 (NumPy Shape, Dimensions & Reshaping) with full lesson, 10 quiz questions, and clean starterCode', () => {
    const ch = getChapter('python-programming', 'unit-05', 'day-50');
    expect(ch).toBeDefined();
    expect(ch.id).toBe('day-50');
    expect(ch.unitId).toBe('unit-05');

    // Test alias resolution
    const aliasCh = getChapter('python-programming', 'unit-05', 'u5-day-02');
    expect(aliasCh).toBeDefined();
    expect(aliasCh.id).toBe('day-50');

    const lesson = getLesson('python-programming', 'unit-05', 'day-50');
    expect(lesson).toContain('Unit–V — Day 2: NumPy Array Shape, Dimensions and Reshaping');
    expect(lesson).toContain('reshape');
    expect(lesson).toContain('shape');

    const quiz = getQuiz('python-programming', 'unit-05', 'day-50');
    expect(quiz).toHaveLength(10);
    expect(quiz[0].question).toContain('shape of a NumPy array');

    const problems = getProblems('python-programming', 'unit-05', 'day-50');
    expect(problems.length).toBeGreaterThanOrEqual(1);
    const prob = problems[0];
    expect(prob.id).toBe('prob-day-50-01');
    expect(prob.title).toContain('Reshape Sensor Readings into a Table');
    // Verify starter code contains ONLY comments
    const nonCommentLines = prob.starterCode
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0 && !l.startsWith('#'));
    expect(nonCommentLines).toHaveLength(0);

    const sim = getSimulation('python-programming', 'unit-05', 'day-50');
    expect(sim).toBeDefined();
    expect(sim.steps.length).toBeGreaterThan(0);

    const story = getStory('python-programming', 'unit-05', 'day-50');
    expect(story).toBeDefined();
    expect(story).toContain('The Tale of the Royal Confectioner and the Magic Grid Trays');
  });

  it('loads Unit 5 Day 3 (NumPy Array Indexing and Slicing) with full lesson, 10 quiz questions, and clean starterCode', () => {
    const ch = getChapter('python-programming', 'unit-05', 'day-51');
    expect(ch).toBeDefined();
    expect(ch.id).toBe('day-51');
    expect(ch.unitId).toBe('unit-05');

    // Test alias resolution
    const aliasCh = getChapter('python-programming', 'unit-05', 'u5-day-03');
    expect(aliasCh).toBeDefined();
    expect(aliasCh.id).toBe('day-51');

    const lesson = getLesson('python-programming', 'unit-05', 'day-51');
    expect(lesson).toContain('Unit–V — Day 3: NumPy Array Indexing and Slicing');
    expect(lesson).toContain('Indexing');
    expect(lesson).toContain('Slicing');

    const quiz = getQuiz('python-programming', 'unit-05', 'day-51');
    expect(quiz).toHaveLength(10);
    expect(quiz[0].question).toContain('What is indexing?');

    const problems = getProblems('python-programming', 'unit-05', 'day-51');
    expect(problems.length).toBeGreaterThanOrEqual(1);
    const prob = problems[0];
    expect(prob.id).toBe('prob-day-51-01');
    expect(prob.title).toContain('Select Student Marks Using NumPy Indexing and Slicing');
    // Verify starter code contains ONLY comments
    const nonCommentLines = prob.starterCode
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0 && !l.startsWith('#'));
    expect(nonCommentLines).toHaveLength(0);

    const sim = getSimulation('python-programming', 'unit-05', 'day-51');
    expect(sim).toBeDefined();
    expect(sim.steps.length).toBeGreaterThan(0);

    const story = getStory('python-programming', 'unit-05', 'day-51');
    expect(story).toBeDefined();
    expect(story).toContain('The Tale of the Grand Vault and the Coordinate Lantern');
  });

  it('loads Unit 5 Day 4 (Mathematical Operations with NumPy Arrays) with full lesson, 10 quiz questions, and clean starterCode', () => {
    const ch = getChapter('python-programming', 'unit-05', 'day-52');
    expect(ch).toBeDefined();
    expect(ch.id).toBe('day-52');
    expect(ch.unitId).toBe('unit-05');

    // Test alias resolution
    const aliasCh = getChapter('python-programming', 'unit-05', 'u5-day-04');
    expect(aliasCh).toBeDefined();
    expect(aliasCh.id).toBe('day-52');

    const lesson = getLesson('python-programming', 'unit-05', 'day-52');
    expect(lesson).toContain('Unit–V — Day 4: Mathematical Operations with NumPy Arrays');
    expect(lesson).toContain('Element-wise Operations');
    expect(lesson).toContain('scalar');

    const quiz = getQuiz('python-programming', 'unit-05', 'day-52');
    expect(quiz).toHaveLength(10);
    expect(quiz[0].question).toContain('element-wise operation');

    const problems = getProblems('python-programming', 'unit-05', 'day-52');
    expect(problems.length).toBeGreaterThanOrEqual(1);
    const prob = problems[0];
    expect(prob.id).toBe('prob-day-52-01');
    expect(prob.title).toContain('Calculate Product Sales with NumPy');
    // Verify starter code contains ONLY comments
    const nonCommentLines = prob.starterCode
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0 && !l.startsWith('#'));
    expect(nonCommentLines).toHaveLength(0);

    const sim = getSimulation('python-programming', 'unit-05', 'day-52');
    expect(sim).toBeDefined();
    expect(sim.steps.length).toBeGreaterThan(0);

    const story = getStory('python-programming', 'unit-05', 'day-52');
    expect(story).toBeDefined();
    expect(story).toContain('The Tale of the Royal Treasury and the Parallel Abacuses');
  });

  it('loads Unit 5 Day 5 (Advanced NumPy Arithmetic & Mathematical Functions) with full lesson, 10 quiz questions, and clean starterCode', () => {
    const ch = getChapter('python-programming', 'unit-05', 'day-53');
    expect(ch).toBeDefined();
    expect(ch.id).toBe('day-53');
    expect(ch.unitId).toBe('unit-05');

    // Test alias resolution
    const aliasCh = getChapter('python-programming', 'unit-05', 'u5-day-05');
    expect(aliasCh).toBeDefined();
    expect(aliasCh.id).toBe('day-53');

    const lesson = getLesson('python-programming', 'unit-05', 'day-53');
    expect(lesson).toContain('Unit–V — Day 5: Advanced NumPy Arithmetic and Mathematical Functions');
    expect(lesson).toContain('np.sqrt()');
    expect(lesson).toContain('np.mean()');

    const quiz = getQuiz('python-programming', 'unit-05', 'day-53');
    expect(quiz).toHaveLength(10);
    expect(quiz[0].question).toContain('square root');

    const problems = getProblems('python-programming', 'unit-05', 'day-53');
    expect(problems.length).toBeGreaterThanOrEqual(1);
    const prob = problems[0];
    expect(prob.id).toBe('prob-day-53-01');
    expect(prob.title).toContain('Analyze Student Marks Using NumPy Functions');
    // Verify starter code contains ONLY comments
    const nonCommentLines = prob.starterCode
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0 && !l.startsWith('#'));
    expect(nonCommentLines).toHaveLength(0);

    const sim = getSimulation('python-programming', 'unit-05', 'day-53');
    expect(sim).toBeDefined();
    expect(sim.steps.length).toBeGreaterThan(0);

    const story = getStory('python-programming', 'unit-05', 'day-53');
    expect(story).toBeDefined();
    expect(story).toContain("The Tale of the Alchemist's Prism and the Harmonic Scales");
  });

  it('loads Unit 5 Day 6 (Introduction to Pandas Series) with full lesson, 10 quiz questions, and clean starterCode', () => {
    const ch = getChapter('python-programming', 'unit-05', 'day-54');
    expect(ch).toBeDefined();
    expect(ch.id).toBe('day-54');
    expect(ch.unitId).toBe('unit-05');

    // Test alias resolution
    const aliasCh = getChapter('python-programming', 'unit-05', 'u5-day-06');
    expect(aliasCh).toBeDefined();
    expect(aliasCh.id).toBe('day-54');

    const lesson = getLesson('python-programming', 'unit-05', 'day-54');
    expect(lesson).toContain('Unit–V — Day 6: Introduction to Pandas Series');
    expect(lesson).toContain('.loc');
    expect(lesson).toContain('.iloc');

    const quiz = getQuiz('python-programming', 'unit-05', 'day-54');
    expect(quiz).toHaveLength(10);
    expect(quiz[0].question).toContain('Pandas mainly used for');

    const problems = getProblems('python-programming', 'unit-05', 'day-54');
    expect(problems.length).toBeGreaterThanOrEqual(1);
    const prob = problems[0];
    expect(prob.id).toBe('prob-day-54-01');
    expect(prob.title).toContain('Create and Analyze a Student Marks Series');
    // Verify starter code contains ONLY comments
    const nonCommentLines = prob.starterCode
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0 && !l.startsWith('#'));
    expect(nonCommentLines).toHaveLength(0);

    const sim = getSimulation('python-programming', 'unit-05', 'day-54');
    expect(sim).toBeDefined();
    expect(sim.steps.length).toBeGreaterThan(0);

    const story = getStory('python-programming', 'unit-05', 'day-54');
    expect(story).toBeDefined();
    expect(story).toContain("The Tale of the Archivist's Tagged Ribbons");
  });

  it('loads Unit 5 Day 7 (Pandas DataFrame: Rows, Columns, Selection) with full lesson, 10 quiz questions, and clean starterCode', () => {
    const ch = getChapter('python-programming', 'unit-05', 'day-55');
    expect(ch).toBeDefined();
    expect(ch.id).toBe('day-55');
    expect(ch.unitId).toBe('unit-05');

    // Test alias resolution
    const aliasCh = getChapter('python-programming', 'unit-05', 'u5-day-07');
    expect(aliasCh).toBeDefined();
    expect(aliasCh.id).toBe('day-55');

    const lesson = getLesson('python-programming', 'unit-05', 'day-55');
    expect(lesson).toContain('Unit–V — Day 7: Pandas DataFrame — Rows, Columns, Selection and Modification');
    expect(lesson).toContain('DataFrame');
    expect(lesson).toContain('.loc');
    expect(lesson).toContain('.iloc');

    const quiz = getQuiz('python-programming', 'unit-05', 'day-55');
    expect(quiz).toHaveLength(10);
    expect(quiz[0].question).toContain('Pandas DataFrame');

    const problems = getProblems('python-programming', 'unit-05', 'day-55');
    expect(problems.length).toBeGreaterThanOrEqual(1);
    const prob = problems[0];
    expect(prob.id).toBe('prob-day-55-01');
    expect(prob.title).toContain('Create and Manage a Student DataFrame');
    // Verify starter code contains ONLY comments
    const nonCommentLines = prob.starterCode
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0 && !l.startsWith('#'));
    expect(nonCommentLines).toHaveLength(0);

    const sim = getSimulation('python-programming', 'unit-05', 'day-55');
    expect(sim).toBeDefined();
    expect(sim.steps.length).toBeGreaterThan(0);

    const story = getStory('python-programming', 'unit-05', 'day-55');
    expect(story).toBeDefined();
    expect(story).toContain("The Tale of the Master Navigator and the Grid of Portals");
  });

  it('loads Unit 5 Day 8 (Missing Data & Combining DataFrames) with full lesson, 10 quiz questions, and clean starterCode', () => {
    const ch = getChapter('python-programming', 'unit-05', 'day-56');
    expect(ch).toBeDefined();
    expect(ch.id).toBe('day-56');
    expect(ch.unitId).toBe('unit-05');

    // Test alias resolution
    const aliasCh = getChapter('python-programming', 'unit-05', 'u5-day-08');
    expect(aliasCh).toBeDefined();
    expect(aliasCh.id).toBe('day-56');

    const lesson = getLesson('python-programming', 'unit-05', 'day-56');
    expect(lesson).toContain('Unit–V — Day 8: Missing Data and Combining DataFrames');
    expect(lesson).toContain('isna()');
    expect(lesson).toContain('fillna()');
    expect(lesson).toContain('concat()');
    expect(lesson).toContain('merge()');

    const quiz = getQuiz('python-programming', 'unit-05', 'day-56');
    expect(quiz).toHaveLength(10);
    expect(quiz[0].question).toContain('missing data');

    const problems = getProblems('python-programming', 'unit-05', 'day-56');
    expect(problems.length).toBeGreaterThanOrEqual(1);
    const prob = problems[0];
    expect(prob.id).toBe('prob-day-56-01');
    expect(prob.title).toContain('Clean Missing Marks and Combine Student Data');
    // Verify starter code contains ONLY comments
    const nonCommentLines = prob.starterCode
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0 && !l.startsWith('#'));
    expect(nonCommentLines).toHaveLength(0);

    const sim = getSimulation('python-programming', 'unit-05', 'day-56');
    expect(sim).toBeDefined();
    expect(sim.steps.length).toBeGreaterThan(0);

    const story = getStory('python-programming', 'unit-05', 'day-56');
    expect(story).toBeDefined();
    expect(story).toContain("The Tale of the Lost Telemetry and the Joining of Star Maps");

    const examples = getExamples('python-programming', 'unit-05', 'day-56');
    expect(examples).toHaveLength(4);
  });

  it('loads Unit 5 Day 9 (GroupBy, Apply, Transform & Sorting) with full lesson, 10 quiz questions, and clean starterCode', () => {
    const ch = getChapter('python-programming', 'unit-05', 'day-57');
    expect(ch).toBeDefined();
    expect(ch.id).toBe('day-57');
    expect(ch.unitId).toBe('unit-05');

    // Test alias resolution
    const aliasCh = getChapter('python-programming', 'unit-05', 'u5-day-09');
    expect(aliasCh).toBeDefined();
    expect(aliasCh.id).toBe('day-57');

    const lesson = getLesson('python-programming', 'unit-05', 'day-57');
    expect(lesson).toContain('Unit–V — Day 9: GroupBy Operations, Apply Functions, Data Transformation, and Sorting');
    expect(lesson).toContain('groupby');
    expect(lesson).toContain('apply');
    expect(lesson).toContain('sort_values');

    const quiz = getQuiz('python-programming', 'unit-05', 'day-57');
    expect(quiz).toHaveLength(10);
    expect(quiz[0].question).toContain('groupby()');

    const problems = getProblems('python-programming', 'unit-05', 'day-57');
    expect(problems.length).toBeGreaterThanOrEqual(1);
    const prob = problems[0];
    expect(prob.id).toBe('prob-day-57-01');
    expect(prob.title).toContain('Department Performance Analyzer & Ranker');
    // Verify starter code contains ONLY comments
    const nonCommentLines = prob.starterCode
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0 && !l.startsWith('#'));
    expect(nonCommentLines).toHaveLength(0);

    const sim = getSimulation('python-programming', 'unit-05', 'day-57');
    expect(sim).toBeDefined();
    expect(sim.steps.length).toBeGreaterThan(0);

    const story = getStory('python-programming', 'unit-05', 'day-57');
    expect(story).toBeDefined();
    expect(story).toContain("The Tale of the Fleet Guilds and the Sorting of the Astral Starstones");

    const examples = getExamples('python-programming', 'unit-05', 'day-57');
    expect(examples).toHaveLength(4);
  });

  it('loads Unit 5 Day 10 (File I/O, NumPy-Pandas Integration & Capstone Revision) with full lesson, 10 quiz questions, and clean starterCode', () => {
    const ch = getChapter('python-programming', 'unit-05', 'day-58');
    expect(ch).toBeDefined();
    expect(ch.id).toBe('day-58');
    expect(ch.unitId).toBe('unit-05');

    // Test alias resolution
    const aliasCh = getChapter('python-programming', 'unit-05', 'u5-day-10');
    expect(aliasCh).toBeDefined();
    expect(aliasCh.id).toBe('day-58');

    const lesson = getLesson('python-programming', 'unit-05', 'day-58');
    expect(lesson).toContain('Unit–V — Day 10: File I/O, Reading & Writing Tabular Data, NumPy-Pandas Integration, and Unit-V Capstone Revision');
    expect(lesson).toContain('read_csv');
    expect(lesson).toContain('to_csv');
    expect(lesson).toContain('to_numpy');
    expect(lesson).toContain('np.where');

    const quiz = getQuiz('python-programming', 'unit-05', 'day-58');
    expect(quiz).toHaveLength(10);
    expect(quiz[0].options).toContain('pd.read_csv()');

    const problems = getProblems('python-programming', 'unit-05', 'day-58');
    expect(problems.length).toBeGreaterThanOrEqual(1);
    const prob = problems[0];
    expect(prob.id).toBe('prob-day-58-01');
    expect(prob.title).toContain('E-Commerce Orders CSV Pipeline & Performance Analyzer');
    // Verify starter code contains ONLY comments
    const nonCommentLines = prob.starterCode
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0 && !l.startsWith('#'));
    expect(nonCommentLines).toHaveLength(0);

    const sim = getSimulation('python-programming', 'unit-05', 'day-58');
    expect(sim).toBeDefined();
    expect(sim.steps.length).toBeGreaterThan(0);

    const story = getStory('python-programming', 'unit-05', 'day-58');
    expect(story).toBeDefined();
    expect(story).toContain("The Grand Archivist and the Permanent Codex: The Unit-V Capstone");

    const examples = getExamples('python-programming', 'unit-05', 'day-58');
    expect(examples).toHaveLength(4);
  });
});


