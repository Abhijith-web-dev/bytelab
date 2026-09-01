import { getQuestionPool } from '../../content/loader/index.js';

export class RandomTestEngine {
  /**
   * Generates a balanced randomized assessment session
   * @param {Object} options
   * @param {string} options.courseId
   * @param {string} [options.unitId]
   * @param {string} [options.chapterId]
   * @param {number} [options.count=5]
   * @param {number} [options.timeLimitMinutes=10]
   */
  static generateTestSession({
    courseId = 'python-programming',
    unitId = null,
    chapterId = null,
    count = 5,
    timeLimitMinutes = 10,
    completedChapters = []
  }) {
    let rawPool = [];
    
    // If it's a global test (no specific unit/chapter), restrict to completed chapters if available
    if (!unitId && !chapterId && completedChapters.length > 0) {
      for (const ch of completedChapters) {
        rawPool.push(...getQuestionPool(courseId, null, ch));
      }
      // Fallback if the user hasn't completed any chapters with quizzes
      if (rawPool.length === 0) {
        rawPool = getQuestionPool(courseId);
      }
    } else {
      rawPool = getQuestionPool(courseId, unitId, chapterId);
    }

    if (!rawPool.length) {
      // Final fallback if the requested unit/chapter has no questions
      rawPool = getQuestionPool(courseId);
    }

    // Shuffle pool
    const shuffled = [...rawPool].sort(() => Math.random() - 0.5);

    // Filter by difficulty buckets if enough questions
    const beginners = shuffled.filter(q => q.difficulty === 'beginner');
    const intermediates = shuffled.filter(q => q.difficulty === 'intermediate');
    const advanceds = shuffled.filter(q => q.difficulty === 'advanced' || q.difficulty === 'challenge');

    const selected = [];

    // Aim for 1 beginner, 2 intermediate, remaining advanced
    if (beginners.length > 0) selected.push(beginners[0]);
    if (intermediates.length > 0) selected.push(intermediates[0]);
    if (intermediates.length > 1) selected.push(intermediates[1]);
    if (advanceds.length > 0) selected.push(advanceds[0]);

    // Fill remaining from general shuffled pool without duplicates
    for (const q of shuffled) {
      if (selected.length >= count) break;
      if (!selected.find(item => item.id === q.id)) {
        selected.push(q);
      }
    }

    // Shuffle option orders for multiple choice questions and normalize strings to objects
    const preparedQuestions = selected.map(q => {
      if (q.options) {
        // Map string options to objects so components can safely read opt.id, opt.text, opt.isCorrect
        const normalizedOptions = q.options.map((opt, idx) => {
          if (typeof opt === 'string') {
             // If string, assume the correct answer matches q.correctAnswer string
             return {
               id: String(idx),
               text: opt,
               isCorrect: q.correctAnswer && String(q.correctAnswer).trim().toLowerCase() === opt.trim().toLowerCase()
             };
          }
          return { ...opt, id: opt.id || String(idx) };
        });

        return {
          ...q,
          options: normalizedOptions.sort(() => Math.random() - 0.5)
        };
      }
      return q;
    });

    const sessionId = `test_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    return {
      sessionId,
      courseId,
      unitId,
      chapterId,
      timeLimitSeconds: timeLimitMinutes * 60,
      createdAt: Date.now(),
      questions: preparedQuestions
    };
  }

  /**
   * Evaluate answers submitted by student
   * @param {Array} questions
   * @param {Object} userAnswers - map of questionId -> selectedOptionId
   */
  static evaluate(questions, userAnswers) {
    let score = 0;
    const details = [];
    const coBreakdown = {};

    questions.forEach(q => {
      const selectedId = userAnswers[q.id];
      let isCorrect = false;
      let selectedText = '';
      let correctText = '';

      if (q.options) {
        const correctOpt = q.options.find(o => o.isCorrect);
        const selectedOpt = q.options.find(o => o.id === selectedId);

        isCorrect = Boolean(selectedOpt && selectedOpt.isCorrect);
        selectedText = selectedOpt?.text || 'No Answer';
        correctText = correctOpt?.text || '';
      } else if (q.correctAnswer) {
        isCorrect = String(selectedId).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase();
        selectedText = String(selectedId || '');
        correctText = q.correctAnswer;
      }

      if (isCorrect) score += 1;

      // Map to outcomes
      const coList = q.coMapping || ['CO1'];
      coList.forEach(co => {
        if (!coBreakdown[co]) {
          coBreakdown[co] = { total: 0, correct: 0 };
        }
        coBreakdown[co].total += 1;
        if (isCorrect) coBreakdown[co].correct += 1;
      });

      details.push({
        questionId: q.id,
        question: q.question,
        codeSnippet: q.codeSnippet,
        isCorrect,
        selectedText,
        correctText,
        explanation: q.explanation,
        coMapping: q.coMapping || []
      });
    });

    const maxScore = questions.length;
    const percentage = Math.round((score / maxScore) * 100);
    const passed = percentage >= 60;

    return {
      score,
      maxScore,
      percentage,
      passed,
      details,
      coBreakdown
    };
  }
}
