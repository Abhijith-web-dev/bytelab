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

    // Aim for balanced distribution: 1 beginner, 2 intermediate, remaining advanced
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

    // Normalize questions so all options are consistent objects { id, text, isCorrect }
    const preparedQuestions = selected.map((q, qIndex) => {
      const qId = q.id || `gen_q_${qIndex}_${Date.now()}`;
      let normalizedOptions = [];

      if (Array.isArray(q.options) && q.options.length > 0) {
        const isObjectArray = typeof q.options[0] === 'object' && q.options[0] !== null;

        if (isObjectArray) {
          normalizedOptions = q.options.map((opt, idx) => ({
            id: opt.id || String(idx),
            text: opt.text || String(opt),
            isCorrect: Boolean(opt.isCorrect)
          }));

          // Fallback: If no option was flagged isCorrect, check question-level correctAnswer/correctIndex
          const hasCorrect = normalizedOptions.some(o => o.isCorrect);
          if (!hasCorrect) {
            const targetIdx = typeof q.correctAnswer === 'number' ? q.correctAnswer : (typeof q.correctIndex === 'number' ? q.correctIndex : -1);
            if (targetIdx >= 0 && targetIdx < normalizedOptions.length) {
              normalizedOptions[targetIdx].isCorrect = true;
            } else if (typeof q.correctAnswer === 'string') {
              const match = normalizedOptions.find(o => o.text.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase());
              if (match) match.isCorrect = true;
              else normalizedOptions[0].isCorrect = true;
            }
          }
        } else {
          // String options array (e.g. ["opt1", "opt2", "opt3", "opt4"])
          const correctIdx = typeof q.correctAnswer === 'number' ? q.correctAnswer : (typeof q.correctIndex === 'number' ? q.correctIndex : -1);

          normalizedOptions = q.options.map((opt, idx) => {
            let isCorrect = false;
            if (correctIdx >= 0) {
              isCorrect = idx === correctIdx;
            } else if (typeof q.correctAnswer === 'string') {
              const str = String(q.correctAnswer).trim().toLowerCase();
              isCorrect = str === String(opt).trim().toLowerCase() || str === String(idx);
            }
            return {
              id: String(idx),
              text: String(opt),
              isCorrect
            };
          });

          // Ensure at least one option is correct
          if (!normalizedOptions.some(o => o.isCorrect) && normalizedOptions.length > 0) {
            normalizedOptions[0].isCorrect = true;
          }
        }

        // Shuffle options order for enhanced randomization
        return {
          ...q,
          id: qId,
          options: [...normalizedOptions].sort(() => Math.random() - 0.5)
        };
      }

      return {
        ...q,
        id: qId
      };
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
  static evaluate(questions, userAnswers = {}) {
    let score = 0;
    const details = [];
    const coBreakdown = {};

    questions.forEach(q => {
      const selectedId = userAnswers[q.id];
      let isCorrect = false;
      let selectedText = '';
      let correctText = '';

      if (Array.isArray(q.options) && q.options.length > 0) {
        const correctOpt = q.options.find(o => o.isCorrect) || q.options[0];
        const selectedOpt = q.options.find(o => o.id === selectedId);

        isCorrect = Boolean(selectedOpt && selectedOpt.isCorrect);
        selectedText = selectedOpt?.text || 'No Answer';
        correctText = correctOpt?.text || '';
      } else if (q.correctAnswer !== undefined) {
        isCorrect = String(selectedId).trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase();
        selectedText = String(selectedId || 'No Answer');
        correctText = String(q.correctAnswer);
      }

      if (isCorrect) score += 1;

      // Map to course learning outcomes
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
        explanation: q.explanation || 'Review the lesson notes and examples for detailed step-by-step logic.',
        coMapping: q.coMapping || []
      });
    });

    const maxScore = questions.length || 1;
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
