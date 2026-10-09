import fs from 'fs';
import path from 'path';

const contentDir = path.resolve('content/courses/python-programming');
const units = fs.readdirSync(contentDir).filter(f => f.startsWith('unit-'));

let totalQuizzes = 0;
let totalQuestions = 0;
let issues = [];
let allQuestionsList = [];

units.forEach(unit => {
  const unitPath = path.join(contentDir, unit);
  const days = fs.readdirSync(unitPath).filter(f => f.startsWith('day-'));

  days.forEach(day => {
    const quizFile = path.join(unitPath, day, 'quiz.json');
    if (fs.existsSync(quizFile)) {
      totalQuizzes++;
      try {
        const raw = fs.readFileSync(quizFile, 'utf8');
        const data = JSON.parse(raw);
        const questions = Array.isArray(data) ? data : (data.questions || []);

        questions.forEach((q, idx) => {
          totalQuestions++;
          const qRef = `${unit}/${day} #Q${idx + 1} (${q.id || 'no-id'})`;

          allQuestionsList.push({
            unit,
            day,
            index: idx,
            id: q.id,
            question: q.question,
            codeSnippet: q.codeSnippet,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
            coMapping: q.coMapping
          });

          if (!q.question) {
            issues.push({ ref: qRef, issue: 'Missing question text' });
          }

          if (q.options) {
            if (!Array.isArray(q.options) || q.options.length < 2) {
              issues.push({ ref: qRef, issue: 'Options array has fewer than 2 items' });
            } else {
              const isObj = typeof q.options[0] === 'object';
              if (isObj) {
                const correctOpts = q.options.filter(o => o.isCorrect === true);
                if (correctOpts.length === 0) {
                  issues.push({ ref: qRef, issue: 'ZERO options have isCorrect=true' });
                } else if (correctOpts.length > 1) {
                  issues.push({ ref: qRef, issue: `MULTIPLE options (${correctOpts.length}) have isCorrect=true` });
                }
              } else {
                if (!q.correctAnswer) {
                  issues.push({ ref: qRef, issue: 'String options but missing correctAnswer property' });
                } else {
                  const match = q.options.some(opt => String(opt).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase());
                  if (!match) {
                    issues.push({ ref: qRef, issue: `correctAnswer ("${q.correctAnswer}") not found in options: ${JSON.stringify(q.options)}` });
                  }
                }
              }
            }
          } else if (!q.correctAnswer) {
            issues.push({ ref: qRef, issue: 'No options and no correctAnswer provided' });
          }

          if (!q.explanation) {
            issues.push({ ref: qRef, issue: 'Missing explanation' });
          }
        });
      } catch (err) {
        issues.push({ ref: `${unit}/${day}`, issue: `JSON parse error: ${err.message}` });
      }
    }
  });
});

console.log('=== ByteLab Quiz Deep Audit Report ===');
console.log('Total Quizzes Scanned:', totalQuizzes);
console.log('Total Questions Scanned:', totalQuestions);
console.log('Issues Found:', issues.length);

if (issues.length > 0) {
  console.log('\n--- List of Issues ---');
  issues.forEach(iss => console.log(`[${iss.ref}] ${iss.issue}`));
} else {
  console.log('\nAll quiz structure rules and options format passed with 0 structural errors!');
}
