import fs from 'fs';
import path from 'path';

const contentDir = path.resolve('content/courses/python-programming');
const units = fs.readdirSync(contentDir).filter(f => f.startsWith('unit-'));

let totalFixed = 0;

units.forEach(unit => {
  const unitPath = path.join(contentDir, unit);
  const days = fs.readdirSync(unitPath).filter(f => f.startsWith('day-'));

  days.forEach(day => {
    const quizFile = path.join(unitPath, day, 'quiz.json');
    if (fs.existsSync(quizFile)) {
      const raw = fs.readFileSync(quizFile, 'utf8');
      const data = JSON.parse(raw);
      let isChanged = false;
      const isArray = Array.isArray(data);
      const questions = isArray ? data : (data.questions || []);

      questions.forEach((q, idx) => {
        // Fix 1: If correctIndex is present but correctAnswer is missing, populate correctAnswer
        if (q.correctIndex !== undefined && q.correctAnswer === undefined) {
          q.correctAnswer = q.correctIndex;
          isChanged = true;
          totalFixed++;
        }

        // Fix 2: If options are strings and correctAnswer is 1-based or string number, verify and normalize
        if (q.options && Array.isArray(q.options) && typeof q.options[0] === 'string') {
          // If correctAnswer is a string number like "0", "1", "2"
          if (typeof q.correctAnswer === 'string' && /^\d+$/.test(q.correctAnswer)) {
            const num = parseInt(q.correctAnswer, 10);
            if (num >= 0 && num < q.options.length) {
              q.correctAnswer = num;
              isChanged = true;
              totalFixed++;
            }
          }
        }
      });

      if (isChanged) {
        fs.writeFileSync(quizFile, JSON.stringify(data, null, 2), 'utf8');
        console.log(`Updated ${unit}/${day}/quiz.json`);
      }
    }
  });
});

console.log(`Total quiz questions normalized: ${totalFixed}`);
