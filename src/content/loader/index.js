import pythonCourse from '@content/courses/python-programming/course.json';
import pythonSyllabus from '@content/courses/python-programming/syllabus.json';
import pythonLang from '@content/languages/python.json';
import jsLang from '@content/languages/javascript.json';
import tsLang from '@content/languages/typescript.json';
import cppLang from '@content/languages/cpp.json';
import cLang from '@content/languages/c.json';
import rustLang from '@content/languages/rust.json';
import sqlLang from '@content/languages/sql.json';

// Eagerly glob content for all units & chapters
const chapterMetaGlob = import.meta.glob('../../../content/courses/**/chapter.json', { eager: true });
const unitMetaGlob = import.meta.glob('../../../content/courses/**/unit.json', { eager: true });
const lessonMdGlob = import.meta.glob('../../../content/courses/**/lesson.md', { query: '?raw', import: 'default', eager: true });
const storyMdGlob = import.meta.glob('../../../content/courses/**/story.md', { query: '?raw', import: 'default', eager: true });
const examplesGlob = import.meta.glob('../../../content/courses/**/examples.json', { eager: true });
const simulationGlob = import.meta.glob('../../../content/courses/**/simulation.json', { eager: true });
const problemsGlob = import.meta.glob('../../../content/courses/**/problems.json', { eager: true });
const quizGlob = import.meta.glob('../../../content/courses/**/quiz.json', { eager: true });

const COURSES = {
  'python-programming': pythonCourse
};

const SYLLABI = {
  'python-programming': pythonSyllabus
};

const LANGUAGES = {
  'python': pythonLang,
  'javascript': jsLang,
  'typescript': tsLang,
  'cpp': cppLang,
  'c': cLang,
  'rust': rustLang,
  'sql': sqlLang
};

export function getLanguages() {
  return Object.values(LANGUAGES);
}

export function getLanguage(langId) {
  return LANGUAGES[langId] || LANGUAGES['python'];
}

export function getAllCourses() {
  return Object.values(COURSES);
}

export function getCourse(courseId) {
  return COURSES[courseId] || COURSES['python-programming'];
}

export function getSyllabus(courseId) {
  return SYLLABI[courseId] || SYLLABI['python-programming'];
}

export function getUnit(courseId, unitId) {
  const course = getCourse(courseId);
  return course.units.find(u => u.id === unitId) || course.units[0];
}

export function normalizeChapterId(chapterId) {
  if (!chapterId) return chapterId;
  const aliases = {
    'u2-day-01': 'day-13',
    'unit-02-day-01': 'day-13',
    'unit-2-day-1': 'day-13',
    'u2-day-1': 'day-13',
    'day-07': 'day-13',
    'day-7': 'day-13',
    'day-13': 'day-13',

    // Unit 2 - Day 2: Alternative, Chained & Nested Conditionals
    'u2-day-02': 'day-14',
    'u2-day-2': 'day-14',
    'unit-02-day-02': 'day-14',
    'unit-2-day-2': 'day-14',
    'day-08': 'day-14',
    'day-8': 'day-14',
    'day-14': 'day-14',

    // Unit 3 - Day 1: Introduction to Lists and List Operations
    'u3-day-01': 'day-24',
    'u3-day-1': 'day-24',
    'unit-03-day-01': 'day-24',
    'unit-3-day-1': 'day-24',
    'day-24': 'day-24',

    // Unit 3 - Day 2: Lists Slicing, Methods, Loops
    'u3-day-02': 'day-25',
    'u3-day-2': 'day-25',
    'unit-03-day-02': 'day-25',
    'unit-3-day-2': 'day-25',
    'day-25': 'day-25',

    // Unit 2 - Day 3: Iteration, Loop State & while Loop
    'u2-day-03': 'day-15',
    'u2-day-3': 'day-15',
    'unit-02-day-03': 'day-15',
    'unit-2-day-3': 'day-15',
    'day-09': 'day-15',
    'day-9': 'day-15',
    'day-15': 'day-15',

    // Unit 3 - Day 3: List Mutability, Aliasing, Cloning
    'u3-day-03': 'day-26',
    'u3-day-3': 'day-26',
    'unit-03-day-03': 'day-26',
    'unit-3-day-3': 'day-26',
    'day-26': 'day-26',

    // Unit 2 - Day 4: for Loop, Loop Control & Nested Loops
    'u2-day-04': 'day-16',
    'u2-day-4': 'day-16',
    'unit-02-day-04': 'day-16',
    'unit-2-day-4': 'day-16',
    'day-10': 'day-16',
    'day-16': 'day-16',

    // Unit 3 - Day 4: Lists as Function Parameters
    'u3-day-04': 'day-27',
    'u3-day-4': 'day-27',
    'unit-03-day-04': 'day-27',
    'unit-3-day-4': 'day-27',
    'day-27': 'day-27',

    // Unit 2 - Day 5: Fruitful Functions, Return Values & Parameters
    'u2-day-05': 'day-17',
    'u2-day-5': 'day-17',
    'unit-02-day-05': 'day-17',
    'unit-2-day-5': 'day-17',
    'day-11': 'day-17',
    'day-17': 'day-17',

    // Unit 3 - Day 5: Tuples Introduction, Operations, Assignment
    'u3-day-05': 'day-28',
    'u3-day-5': 'day-28',
    'unit-03-day-05': 'day-28',
    'unit-3-day-5': 'day-28',
    'day-28': 'day-28',

    // Unit 2 - Day 6: Scope, Function Composition & Passing Values
    'u2-day-06': 'day-18',
    'u2-day-6': 'day-18',
    'unit-02-day-06': 'day-18',
    'unit-2-day-6': 'day-18',
    'day-12': 'day-18',
    'day-18': 'day-18',

    // Unit 3 - Day 6: Tuples as Return Values
    'u3-day-06': 'day-29',
    'u3-day-6': 'day-29',
    'unit-03-day-06': 'day-29',
    'unit-3-day-6': 'day-29',
    'day-29': 'day-29',

    // Unit 2 - Day 7: Recursion and Recursive Problem Solving
    'u2-day-07': 'day-19',
    'u2-day-7': 'day-19',
    'unit-02-day-07': 'day-19',
    'unit-2-day-7': 'day-19',
    'day-19': 'day-19',

    // Unit 3 - Day 7: Dictionaries Structure & Operations
    'u3-day-07': 'day-30',
    'u3-day-7': 'day-30',
    'unit-03-day-07': 'day-30',
    'unit-3-day-7': 'day-30',
    'day-30': 'day-30',

    // Unit 2 - Day 8: Strings, String Slices, Immutability & String Methods
    'u2-day-08': 'day-20',
    'u2-day-8': 'day-20',
    'unit-02-day-08': 'day-20',
    'unit-2-day-8': 'day-20',
    'day-20': 'day-20',

    // Unit 3 - Day 8: Dictionary Methods & List Comprehension
    'u3-day-08': 'day-31',
    'u3-day-8': 'day-31',
    'unit-03-day-08': 'day-31',
    'unit-3-day-8': 'day-31',
    'day-31': 'day-31',

    // Unit 2 - Day 9: String Module, Lists as Arrays & Working with Numeric Arrays
    'u2-day-09': 'day-21',
    'u2-day-9': 'day-21',
    'unit-02-day-09': 'day-21',
    'unit-2-day-9': 'day-21',
    'day-21': 'day-21',

    // Unit 3 - Day 9: Selection Sort & Insertion Sort
    'u3-day-09': 'day-32',
    'u3-day-9': 'day-32',
    'unit-03-day-09': 'day-32',
    'unit-3-day-9': 'day-32',
    'day-32': 'day-32',

    // Unit 2 - Day 10: Illustrative Programs, Integration & Unit-II Revision
    'u2-day-10': 'day-22',
    'unit-02-day-10': 'day-22',
    'unit-2-day-10': 'day-22',
    'day-22': 'day-22',

    // Unit 3 - Day 10: Merge Sort, Histogram & Integration
    'u3-day-10': 'day-33',
    'unit-03-day-10': 'day-33',
    'unit-3-day-10': 'day-33',
    'day-33': 'day-33',

    // Unit 4 - Day 1: Files and Exceptions — Introduction to File Handling
    'u4-day-01': 'day-37',
    'u4-day-1': 'day-37',
    'unit-04-day-01': 'day-37',
    'unit-4-day-1': 'day-37',
    'day-37': 'day-37',

    // Unit 4 - Day 2: Reading and Writing Text Files
    'u4-day-02': 'day-38',
    'u4-day-2': 'day-38',
    'unit-04-day-02': 'day-38',
    'unit-4-day-2': 'day-38',
    'day-38': 'day-38',

    // Unit 4 - Day 3: Format Operator, File Data Formatting & Command Line Arguments
    'u4-day-03': 'day-39',
    'u4-day-3': 'day-39',
    'unit-04-day-03': 'day-39',
    'unit-4-day-3': 'day-39',
    'day-39': 'day-39',

    // Unit 4 - Day 4: Command-Line Arguments and sys.argv
    'u4-day-04': 'day-40',
    'u4-day-4': 'day-40',
    'unit-04-day-04': 'day-40',
    'unit-4-day-4': 'day-40',
    'day-40': 'day-40',

    // Unit 4 - Day 5: Errors and Exceptions in Python
    'u4-day-05': 'day-41',
    'u4-day-5': 'day-41',
    'unit-04-day-05': 'day-41',
    'unit-4-day-5': 'day-41',
    'day-41': 'day-41',

    // Unit 4 - Day 6: Handling Exceptions in Python
    'u4-day-06': 'day-42',
    'u4-day-6': 'day-42',
    'unit-04-day-06': 'day-42',
    'unit-4-day-6': 'day-42',
    'day-42': 'day-42',

    // Unit 4 - Day 7: Modules in Python
    'u4-day-07': 'day-43',
    'u4-day-7': 'day-43',
    'unit-04-day-07': 'day-43',
    'unit-4-day-7': 'day-43',
    'day-43': 'day-43',

    // Unit 4 - Day 8: Packages in Python
    'u4-day-08': 'day-44',
    'u4-day-8': 'day-44',
    'unit-04-day-08': 'day-44',
    'unit-4-day-8': 'day-44',
    'day-44': 'day-44',

    // Unit 4 - Day 9: File Processing, Modules, Exceptions, Classes and Objects
    'u4-day-09': 'day-45',
    'u4-day-9': 'day-45',
    'unit-04-day-09': 'day-45',
    'unit-4-day-9': 'day-45',
    'day-45': 'day-45',

    // Unit 4 - Day 10: Classes and Objects — Introduction to Object-Oriented Programming
    'u4-day-10': 'day-46',
    'unit-04-day-10': 'day-46',
    'unit-4-day-10': 'day-46',
    'day-46': 'day-46',

    // Unit 5 - Day 1: Introduction to NumPy and NumPy Arrays
    'u5-day-01': 'day-49',
    'u5-day-1': 'day-49',
    'unit-05-day-01': 'day-49',
    'unit-5-day-1': 'day-49',
    'day-49': 'day-49',

    // Unit 5 - Day 2: NumPy Array Shape, Dimensions and Reshaping
    'u5-day-02': 'day-50',
    'u5-day-2': 'day-50',
    'unit-05-day-02': 'day-50',
    'unit-5-day-2': 'day-50',
    'day-50': 'day-50',

    // Unit 5 - Day 3: NumPy Array Indexing and Slicing
    'u5-day-03': 'day-51',
    'u5-day-3': 'day-51',
    'unit-05-day-03': 'day-51',
    'unit-5-day-3': 'day-51',
    'day-51': 'day-51',

    // Unit 5 - Day 4: Mathematical Operations with NumPy Arrays
    'u5-day-04': 'day-52',
    'u5-day-4': 'day-52',
    'unit-05-day-04': 'day-52',
    'unit-5-day-4': 'day-52',
    'day-52': 'day-52',

    // Unit 5 - Day 5: Advanced NumPy Arithmetic and Mathematical Functions
    'u5-day-05': 'day-53',
    'u5-day-5': 'day-53',
    'unit-05-day-05': 'day-53',
    'unit-5-day-5': 'day-53',
    'day-53': 'day-53',

    // Unit 5 - Day 6: Introduction to Pandas Series
    'u5-day-06': 'day-54',
    'u5-day-6': 'day-54',
    'unit-05-day-06': 'day-54',
    'unit-5-day-6': 'day-54',
    'day-54': 'day-54',

    // Unit 5 - Day 7: Pandas DataFrame — Rows, Columns, Selection and Modification
    'u5-day-07': 'day-55',
    'u5-day-7': 'day-55',
    'unit-05-day-07': 'day-55',
    'unit-5-day-7': 'day-55',
    'day-55': 'day-55',

    // Unit 5 - Day 8: Missing Data and Combining DataFrames
    'u5-day-08': 'day-56',
    'u5-day-8': 'day-56',
    'unit-05-day-08': 'day-56',
    'unit-5-day-8': 'day-56',
    'day-56': 'day-56',

    // Unit 5 - Day 9: GroupBy Operations, Apply Functions, Data Transformation, and Sorting
    'u5-day-09': 'day-57',
    'u5-day-9': 'day-57',
    'unit-05-day-09': 'day-57',
    'unit-5-day-9': 'day-57',
    'day-57': 'day-57',

    // Unit 5 - Day 10: File Read and Write Support in Pandas; NumPy-Pandas Integration; Capstone Revision
    'u5-day-10': 'day-58',
    'unit-05-day-10': 'day-58',
    'unit-5-day-10': 'day-58',
    'day-58': 'day-58'
  };
  return aliases[chapterId] || chapterId;
}

function findGlobMatch(globObj, unitId, chapterId, fileName) {
  const normChapter = normalizeChapterId(chapterId);
  const target = `${unitId}/${normChapter}/${fileName}`;
  const key = Object.keys(globObj).find(k => k.replace(/\\/g, '/').includes(target));
  const mod = key ? globObj[key] : null;
  return mod?.default !== undefined ? mod.default : mod;
}

export function getChapter(courseId, unitId, chapterId) {
  return findGlobMatch(chapterMetaGlob, unitId, chapterId, 'chapter.json') || null;
}

export function getLesson(courseId, unitId, chapterId) {
  const content = findGlobMatch(lessonMdGlob, unitId, chapterId, 'lesson.md');
  return typeof content === 'string' ? content : '# Lesson Content Not Found';
}

export function getStory(courseId, unitId, chapterId) {
  const content = findGlobMatch(storyMdGlob, unitId, chapterId, 'story.md');
  return typeof content === 'string' ? content : null;
}

export function getSimulation(courseId, unitId, chapterId) {
  const res = findGlobMatch(simulationGlob, unitId, chapterId, 'simulation.json');
  return res || null;
}

export function getExamples(courseId, unitId, chapterId) {
  const res = findGlobMatch(examplesGlob, unitId, chapterId, 'examples.json');
  return Array.isArray(res) ? res : [];
}

export function getProblems(courseId, unitId, chapterId) {
  const res = findGlobMatch(problemsGlob, unitId, chapterId, 'problems.json');
  return Array.isArray(res) ? res : [];
}

export function getQuiz(courseId, unitId, chapterId) {
  const res = findGlobMatch(quizGlob, unitId, chapterId, 'quiz.json');
  if (Array.isArray(res)) return res;
  if (res && Array.isArray(res.questions)) return res.questions;
  return [];
}

export function getAllProblems(courseId = 'python-programming') {
  const allProblems = [];
  for (const key in problemsGlob) {
    if (key.includes(courseId)) {
      const items = problemsGlob[key]?.default || problemsGlob[key] || [];
      allProblems.push(...items);
    }
  }
  return allProblems;
}

export function getProblemById(problemId, courseId = 'python-programming') {
  const all = getAllProblems(courseId);
  return all.find(p => p.id === problemId) || null;
}

export function getQuestionPool(courseId, unitId = null, chapterId = null) {
  const normChapter = normalizeChapterId(chapterId);
  const pool = [];
  for (const key in quizGlob) {
    if (key.includes(courseId)) {
      if (unitId && !key.includes(`/${unitId}/`)) continue;
      if (normChapter && !key.includes(`/${normChapter}/`)) continue;
      const rawData = quizGlob[key]?.default || quizGlob[key];
      if (Array.isArray(rawData)) {
        pool.push(...rawData);
      } else if (rawData && Array.isArray(rawData.questions)) {
        pool.push(...rawData.questions);
      }
    }
  }
  return pool;
}

export function getNavigationHierarchy(courseId = 'python-programming') {
  const course = getCourse(courseId);
  const flatList = [];
  let cumulativeDay = 1;
  
  course.units.forEach(unit => {
    const unitChapters = unit.chapters || [];
    unitChapters.forEach((chFolder, chIdx) => {
      const ch = getChapter(courseId, unit.id, chFolder);
      const calculatedDay = ch?.dayNumber || cumulativeDay;
      cumulativeDay++;

      flatList.push({
        courseId,
        unitId: unit.id,
        unitNumber: unit.unitNumber,
        romanNumber: unit.romanNumber,
        unitTitle: unit.title,
        chapterId: chFolder,
        chapterTitle: ch?.title || chFolder,
        shortTitle: ch?.shortTitle || cleanChapterTitle(ch?.title) || chFolder,
        dayNumber: calculatedDay,
        courseDayNumber: calculatedDay,
        unitDayNumber: ch?.unitDayNumber || (chIdx + 1),
        unitDayIndex: ch?.unitDayNumber || (chIdx + 1),
        unitTotalDays: unitChapters.length,
        order: ch?.order || calculatedDay,
        estimatedMinutes: ch?.estimatedMinutes || ch?.timeEstimate || 90,
        difficulty: ch?.difficulty || 'Beginner',
        simulationType: ch?.simulationType || null,
        outcomes: ch?.outcomes || unit.outcomes || []
      });
    });
  });

  return flatList;
}

export function cleanChapterTitle(title) {
  if (!title) return '';
  return title
    .replace(/^Unit[–\-\s]+[IVX\d]+[\s–\-]+Day\s*\d+:\s*/i, '')
    .replace(/^Unit[–\-\s]+[IVX\d]+:\s*/i, '')
    .replace(/^Day\s*\d+:\s*/i, '')
    .replace(/^Lecture\s*\d+:\s*/i, '')
    .trim();
}

export function getNextAndPreviousLesson(courseId, unitId, chapterId) {
  const normChapter = normalizeChapterId(chapterId);
  const flat = getNavigationHierarchy(courseId);
  const currentIndex = flat.findIndex(item => item.unitId === unitId && item.chapterId === normChapter);
  
  const prev = currentIndex > 0 ? flat[currentIndex - 1] : null;
  const next = currentIndex < flat.length - 1 ? flat[currentIndex + 1] : null;

  return {
    prev,
    next,
    current: flat[currentIndex] || null,
    totalCount: flat.length,
    currentIndex: currentIndex + 1
  };
}

export function buildSearchIndex(courseId = 'python-programming') {
  const course = getCourse(courseId);
  const items = [];

  course.units.forEach(unit => {
    items.push({
      id: `${courseId}-${unit.id}`,
      type: 'Unit',
      title: `${unit.romanNumber}: ${unit.title}`,
      description: unit.description,
      url: `/courses/${courseId}/unit/${unit.id}`,
      tags: ['unit', unit.romanNumber, ...unit.outcomes]
    });

    unit.chapters.forEach(chFolder => {
      const ch = getChapter(courseId, unit.id, chFolder);
      if (ch) {
        items.push({
          id: `${courseId}-${unit.id}-${chFolder}`,
          type: 'Chapter',
          title: ch.title,
          description: ch.description,
          url: `/courses/${courseId}/chapter/${chFolder}`,
          tags: ['chapter', ch.difficulty, ...(ch.outcomes || [])]
        });
      }

      const problems = getProblems(courseId, unit.id, chFolder);
      problems.forEach(p => {
        items.push({
          id: p.id,
          type: 'Practice Problem',
          title: `Practice: ${p.title}`,
          description: p.description,
          url: `/practice/${p.id}`,
          tags: ['problem', p.difficulty, ...(p.skills || []), ...(p.coMapping || [])]
        });
      });
    });
  });

  return items;
}
