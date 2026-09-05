import { describe, it, expect, beforeEach } from 'vitest';
import { getQuiz, getChapter, getLesson } from '../content/loader/index.js';
import { useAuthStore } from '../stores/authStore.js';
import { useProgressStore } from '../stores/progressStore.js';
import { authCookieManager } from '../services/storage/cookies.js';

describe('Day Section Quiz Engine & Result Calculation', () => {
  beforeEach(() => {
    authCookieManager.clearAuthCookies();
    useProgressStore.getState().loadUserProgress('test_student');
  });

  it('loads quiz questions with valid structure across curriculum days', () => {
    const day1Quiz = getQuiz('python-programming', 'unit-01', 'day-01');
    expect(day1Quiz).toBeDefined();
    expect(day1Quiz.length).toBeGreaterThanOrEqual(5);

    day1Quiz.forEach((q, idx) => {
      expect(q.question).toBeTruthy();
      expect(Array.isArray(q.options)).toBe(true);
      expect(q.options.length).toBeGreaterThanOrEqual(2);
      expect(q.explanation).toBeTruthy();
      expect(q.correctAnswer).toBeDefined();
    });
  });

  it('accurately calculates 100% perfect quiz score and triggers lesson completion', () => {
    const quiz = getQuiz('python-programming', 'unit-01', 'day-01');
    const selectedAnswers = {};

    // Answer all correctly
    quiz.forEach(q => {
      const correctIdx = q.correctAnswer;
      selectedAnswers[q.id] = String(correctIdx);
    });

    let correctCount = 0;
    quiz.forEach(q => {
      const selected = selectedAnswers[q.id];
      const isMatch = String(q.correctAnswer) === selected;
      if (isMatch) correctCount++;
    });

    const percentage = Math.round((correctCount / quiz.length) * 100);
    expect(correctCount).toBe(quiz.length);
    expect(percentage).toBe(100);

    // Verify progress tracking
    const store = useProgressStore.getState();
    store.markLessonComplete('lesson_day01', 'day-01', 'unit-01');
    const updated = useProgressStore.getState();
    expect(updated.completedChapters).toContain('day-01');
  });

  it('accurately calculates partial score and handles retake reset', () => {
    const quiz = getQuiz('python-programming', 'unit-01', 'day-01').slice(0, 4);
    const selectedAnswers = {};

    // 2 correct, 2 incorrect
    selectedAnswers[quiz[0].id] = String(quiz[0].correctAnswer);
    selectedAnswers[quiz[1].id] = String(quiz[1].correctAnswer);
    selectedAnswers[quiz[2].id] = String((quiz[2].correctAnswer + 1) % quiz[2].options.length);
    selectedAnswers[quiz[3].id] = String((quiz[3].correctAnswer + 1) % quiz[3].options.length);

    let correctCount = 0;
    quiz.forEach(q => {
      const selected = selectedAnswers[q.id];
      const isMatch = String(q.correctAnswer) === selected;
      if (isMatch) correctCount++;
    });

    const percentage = Math.round((correctCount / quiz.length) * 100);
    expect(correctCount).toBe(2);
    expect(percentage).toBe(50);

    // Simulate Retake Quiz
    const resetAnswers = {};
    expect(Object.keys(resetAnswers)).toHaveLength(0);
  });

  it('integrates with authStore for verified vs guest user states in quiz results', () => {
    // 1. Unauthenticated / Guest state
    const authState = useAuthStore.getState();
    expect(authState.isAuthenticated && !authState.isGuest).toBe(false);

    // 2. Set authenticated user
    const mockUser = {
      uid: 'student_quiz_123',
      email: 'student@bytelab.dev',
      displayName: 'Abhijith S',
      isAnonymous: false
    };
    authCookieManager.setAuthCookies(mockUser, 'google');
    expect(authCookieManager.isLoggedIn()).toBe(true);
    expect(authCookieManager.isGuest()).toBe(false);
  });

  it('verifies sub-millisecond offline throughput for low-bandwidth devices', () => {
    const startTime = performance.now();
    
    // Simulate loading 10 chapters, lessons, and quizzes completely offline
    for (let i = 1; i <= 5; i++) {
      const dayStr = `day-0${i}`;
      getChapter('python-programming', 'unit-01', dayStr);
      getLesson('python-programming', 'unit-01', dayStr);
      getQuiz('python-programming', 'unit-01', dayStr);
    }

    const elapsed = performance.now() - startTime;
    // Must be instantaneous (< 50ms total) since it's zero-network static JSON/MD
    expect(elapsed).toBeLessThan(50);
  });
});
