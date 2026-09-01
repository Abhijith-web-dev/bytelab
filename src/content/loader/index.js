import pythonCourse from '@content/courses/python-programming/course.json';
import pythonSyllabus from '@content/courses/python-programming/syllabus.json';
import pythonLang from '@content/languages/python.json';
import jsLang from '@content/languages/javascript.json';

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
  'javascript': jsLang
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

function findGlobMatch(globObj, unitId, chapterId, fileName) {
  const target = `${unitId}/${chapterId}/${fileName}`;
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
  return Array.isArray(res) ? res : [];
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
  const pool = [];
  for (const key in quizGlob) {
    if (key.includes(courseId)) {
      if (unitId && !key.includes(`/${unitId}/`)) continue;
      if (chapterId && !key.includes(`/${chapterId}/`)) continue;
      const questions = quizGlob[key]?.default || quizGlob[key] || [];
      pool.push(...questions);
    }
  }
  return pool;
}

export function getNavigationHierarchy(courseId = 'python-programming') {
  const course = getCourse(courseId);
  const flatList = [];
  
  course.units.forEach(unit => {
    unit.chapters.forEach(chFolder => {
      const ch = getChapter(courseId, unit.id, chFolder);
      flatList.push({
        courseId,
        unitId: unit.id,
        unitNumber: unit.unitNumber,
        romanNumber: unit.romanNumber,
        unitTitle: unit.title,
        chapterId: chFolder,
        chapterTitle: ch?.title || chFolder,
        order: ch?.order || 0
      });
    });
  });

  return flatList;
}

export function getNextAndPreviousLesson(courseId, unitId, chapterId) {
  const flat = getNavigationHierarchy(courseId);
  const currentIndex = flat.findIndex(item => item.unitId === unitId && item.chapterId === chapterId);
  
  const prev = currentIndex > 0 ? flat[currentIndex - 1] : null;
  const next = currentIndex < flat.length - 1 ? flat[currentIndex + 1] : null;

  return { prev, next, current: flat[currentIndex] || null, totalCount: flat.length, currentIndex: currentIndex + 1 };
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
