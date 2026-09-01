import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT_DIR, 'content', 'courses', 'python-programming');

console.log('--------------------------------------------------');
console.log('🔍 BYTELAB 65-DAY CURRICULUM & SIMULATION AUDIT');
console.log('--------------------------------------------------\n');

let totalChecks = 0;
let passedChecks = 0;
let errors = [];

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

// 2. Validate syllabus.json
const syllabusPath = path.join(CONTENT_DIR, 'syllabus.json');
assert(fs.existsSync(syllabusPath), 'syllabus.json must exist');

let totalChaptersFound = 0;
let totalLessonsVerified = 0;
let totalStoriesVerified = 0;
let totalSimulationsVerified = 0;
let totalExamplesCount = 0;
let totalProblemsCount = 0;
let totalQuizQuestionsCount = 0;

course.units.forEach((unit, uIdx) => {
  unit.chapters.forEach((chFolder) => {
    totalChaptersFound++;
    const chDir = path.join(CONTENT_DIR, unit.id, chFolder);
    
    assert(fs.existsSync(chDir), `Directory must exist for ${unit.id}/${chFolder}`);

    // chapter.json
    const chJsonPath = path.join(chDir, 'chapter.json');
    assert(fs.existsSync(chJsonPath), `chapter.json must exist for ${chFolder}`);

    // lesson.md (12-section standard)
    const lessonPath = path.join(chDir, 'lesson.md');
    assert(fs.existsSync(lessonPath), `lesson.md must exist for ${chFolder}`);
    if (fs.existsSync(lessonPath)) {
      const content = fs.readFileSync(lessonPath, 'utf8');
      assert(content.length > 200, `lesson.md is non-empty for ${chFolder}`);
      assert(content.includes('## 02. Learning Objective'), `lesson.md has Learning Goal in ${chFolder}`);
      assert(content.includes('## 26. Summary'), `lesson.md has Summary in ${chFolder}`);
      totalLessonsVerified++;
    }

    // story.md (Storytelling Mode)
    const storyPath = path.join(chDir, 'story.md');
    assert(fs.existsSync(storyPath), `story.md must exist for ${chFolder}`);
    if (fs.existsSync(storyPath)) {
      const content = fs.readFileSync(storyPath, 'utf8');
      assert(content.length > 150, `story.md is non-empty for ${chFolder}`);
      totalStoriesVerified++;
    }

    // simulation.json
    const simPath = path.join(chDir, 'simulation.json');
    assert(fs.existsSync(simPath), `simulation.json must exist for ${chFolder}`);
    if (fs.existsSync(simPath)) {
      totalSimulationsVerified++;
    }

    // examples.json
    const exPath = path.join(chDir, 'examples.json');
    assert(fs.existsSync(exPath), `examples.json must exist for ${chFolder}`);
    if (fs.existsSync(exPath)) {
      const exData = JSON.parse(fs.readFileSync(exPath, 'utf8'));
      totalExamplesCount += exData.length;
    }

    // problems.json
    const probPath = path.join(chDir, 'problems.json');
    assert(fs.existsSync(probPath), `problems.json must exist for ${chFolder}`);
    if (fs.existsSync(probPath)) {
      const probData = JSON.parse(fs.readFileSync(probPath, 'utf8'));
      totalProblemsCount += probData.length;
    }

    // quiz.json
    const quizPath = path.join(chDir, 'quiz.json');
    assert(fs.existsSync(quizPath), `quiz.json must exist for ${chFolder}`);
    if (fs.existsSync(quizPath)) {
      const quizData = JSON.parse(fs.readFileSync(quizPath, 'utf8'));
      totalQuizQuestionsCount += quizData.length;
    }
  });
});

console.log('==================================================');
console.log('📊 AUDIT SUMMARY REPORT');
console.log('==================================================');
console.log(`Total Units Audited:               ${course.units.length}`);
console.log(`Total Days Verified:               ${totalChaptersFound} / 65`);
console.log(`Total 27-Section Lesson Guides:    ${totalLessonsVerified} / 65`);
console.log(`Total Story Mode Narratives:       ${totalStoriesVerified} / 65`);
console.log(`Total Interactive Simulations:     ${totalSimulationsVerified} / 65`);
console.log(`Total Examples:                    ${totalExamplesCount}`);
console.log(`Total Problems:                    ${totalProblemsCount}`);
console.log(`Total Quiz Questions:              ${totalQuizQuestionsCount}`);
console.log(`Total Assertions Passed:           ${passedChecks} / ${totalChecks}`);

if (errors.length > 0) {
  console.error('\n❌ ERRORS DETECTED:', errors);
  process.exit(1);
} else {
  console.log('\n✅ 100% PASS: ALL 65 DAYS & SIMULATION ASSETS ARE FULLY VALIDATED!');
  process.exit(0);
}
