import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT_DIR, 'content', 'courses', 'python-programming');

console.log('--------------------------------------------------');
console.log('🔍 BYTELAB FULL CURRICULUM & ASSET DIAGNOSTIC AUDIT');
console.log('--------------------------------------------------\n');

let totalChecks = 0;
let passedChecks = 0;
const errors = [];

function assert(condition, message) {
  totalChecks++;
  if (condition) {
    passedChecks++;
  } else {
    errors.push(message);
  }
}

// 1. Validate course.json
const coursePath = path.join(CONTENT_DIR, 'course.json');
assert(fs.existsSync(coursePath), 'course.json must exist');
const course = JSON.parse(fs.readFileSync(coursePath, 'utf8'));

assert(course.title === 'Python Programming', 'Course title must be Python Programming');
assert(Array.isArray(course.units) && course.units.length >= 5, 'Course must have at least 5 units');

let totalChaptersFound = 0;
let totalLessonsVerified = 0;
let totalStoriesVerified = 0;
let totalSimulationsVerified = 0;
let totalExamplesCount = 0;
let totalProblemsCount = 0;
let totalQuizQuestionsCount = 0;

course.units.forEach((unit) => {
  assert(unit.id && unit.title, `Unit ${unit.id} must have title`);
  assert(Array.isArray(unit.chapters), `Unit ${unit.id} must have chapters array`);

  unit.chapters.forEach((chFolder) => {
    totalChaptersFound++;
    const chDir = path.join(CONTENT_DIR, unit.id, chFolder);
    assert(fs.existsSync(chDir), `Directory must exist for ${unit.id}/${chFolder}`);

    // chapter.json
    const chJsonPath = path.join(chDir, 'chapter.json');
    assert(fs.existsSync(chJsonPath), `chapter.json must exist for ${chFolder}`);
    if (fs.existsSync(chJsonPath)) {
      const chData = JSON.parse(fs.readFileSync(chJsonPath, 'utf8'));
      assert(chData.id && chData.title, `chapter.json in ${chFolder} must have id and title`);
    }

    // lesson.md
    const lessonPath = path.join(chDir, 'lesson.md');
    assert(fs.existsSync(lessonPath), `lesson.md must exist for ${chFolder}`);
    if (fs.existsSync(lessonPath)) {
      const content = fs.readFileSync(lessonPath, 'utf8');
      assert(content.length > 100, `lesson.md must be non-empty for ${chFolder}`);
      totalLessonsVerified++;
    }

    // story.md (Optional/Rich Story Mode)
    const storyPath = path.join(chDir, 'story.md');
    if (fs.existsSync(storyPath)) {
      const content = fs.readFileSync(storyPath, 'utf8');
      assert(content.length > 50, `story.md is non-empty for ${chFolder}`);
      totalStoriesVerified++;
    }

    // simulation.json
    const simPath = path.join(chDir, 'simulation.json');
    if (fs.existsSync(simPath)) {
      totalSimulationsVerified++;
    }

    // examples.json
    const exPath = path.join(chDir, 'examples.json');
    if (fs.existsSync(exPath)) {
      const exData = JSON.parse(fs.readFileSync(exPath, 'utf8'));
      if (Array.isArray(exData)) {
        totalExamplesCount += exData.length;
      }
    }

    // problems.json
    const probPath = path.join(chDir, 'problems.json');
    if (fs.existsSync(probPath)) {
      const probData = JSON.parse(fs.readFileSync(probPath, 'utf8'));
      if (Array.isArray(probData)) {
        totalProblemsCount += probData.length;
      }
    }

    // quiz.json
    const quizPath = path.join(chDir, 'quiz.json');
    if (fs.existsSync(quizPath)) {
      const quizData = JSON.parse(fs.readFileSync(quizPath, 'utf8'));
      if (Array.isArray(quizData)) {
        totalQuizQuestionsCount += quizData.length;
      } else if (Array.isArray(quizData.questions)) {
        totalQuizQuestionsCount += quizData.questions.length;
      }
    }
  });
});

console.log('==================================================');
console.log('📊 CURRICULUM DIAGNOSTIC SUMMARY');
console.log('==================================================');
console.log(`Total Units Audited:               ${course.units.length}`);
console.log(`Total Chapters / Days Verified:    ${totalChaptersFound}`);
console.log(`Total Interactive Lessons:         ${totalLessonsVerified}`);
console.log(`Total Story Mode Narratives:       ${totalStoriesVerified}`);
console.log(`Total Interactive Simulations:     ${totalSimulationsVerified}`);
console.log(`Total Code Examples:               ${totalExamplesCount}`);
console.log(`Total Practice Problems:           ${totalProblemsCount}`);
console.log(`Total Workout Quiz Questions:      ${totalQuizQuestionsCount}`);
console.log(`Total Assertions Passed:           ${passedChecks} / ${totalChecks}`);

if (errors.length > 0) {
  console.error('\n❌ ERRORS DETECTED:\n', errors.join('\n'));
  process.exit(1);
} else {
  console.log('\n✅ 100% PASS: ALL CURRICULUM ASSETS ARE FULLY VALIDATED!');
  process.exit(0);
}
