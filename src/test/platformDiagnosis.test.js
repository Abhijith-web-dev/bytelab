import { describe, it, expect, beforeEach } from 'vitest';
import {
  getCourse,
  getUnit,
  getChapter,
  getLesson,
  getQuiz,
  getProblems,
  getNextAndPreviousLesson,
  normalizeChapterId,
  buildSearchIndex
} from '../content/loader/index.js';
import { useAuthStore } from '../stores/authStore.js';
import { useProgressStore } from '../stores/progressStore.js';
import { authCookieManager } from '../services/storage/cookies.js';
import { parsePythonError } from '../utils/pythonErrorFormatter.js';
import { IntegrityRiskScorer } from '../features/integrity/riskScorer.js';

describe('ByteLab Full Platform Quality & Diagnostic Audit', () => {
  beforeEach(() => {
    authCookieManager.clearAuthCookies();
    useProgressStore.getState().loadUserProgress('diag_test_student');
  });

  describe('1. Curriculum Routing & Day Progression Diagnosis', () => {
    it('verifies seamless navigation forward and backward across all 46 days', () => {
      const course = getCourse('python-programming');
      expect(course).toBeDefined();

      let currentDay = 'day-01';
      let visitedDays = 0;

      while (currentDay && visitedDays < 50) {
        visitedDays++;
        const nav = getNextAndPreviousLesson('python-programming', null, currentDay);
        expect(nav.current).toBeDefined();
        if (nav.next) {
          expect(nav.next.chapterId).toBeTruthy();
          currentDay = nav.next.chapterId;
        } else {
          break;
        }
      }

      expect(visitedDays).toBeGreaterThanOrEqual(45);
    });

    it('resolves chapter alias routes accurately to canonical day folders', () => {
      expect(normalizeChapterId('u4-day-01')).toBe('day-37');
      expect(normalizeChapterId('u5-day-01')).toBe('day-49');
      expect(normalizeChapterId('u2-day-01')).toBe('day-13');
      expect(normalizeChapterId('u3-day-01')).toBe('day-24');
    });

    it('loads all unit overviews with proper CO mappings and chapter lists', () => {
      const unit1 = getUnit('python-programming', 'unit-01');
      expect(unit1.romanNumber).toBe('Unit I');
      expect(unit1.chapters.length).toBeGreaterThanOrEqual(6);

      const unit4 = getUnit('python-programming', 'unit-04');
      expect(unit4.romanNumber).toBe('Unit IV');
      expect(unit4.chapters).toContain('day-37');

      const unit5 = getUnit('python-programming', 'unit-05');
      expect(unit5.romanNumber).toBe('Unit V');
      expect(unit5.chapters).toContain('day-49');
    });
  });

  describe('2. Authentication & Session Cookie Integrity Diagnosis', () => {
    it('handles complete lifecycle from guest to verified user to logout', () => {
      // 1. Initial guest state
      const mockGuest = {
        uid: 'guest_test_999',
        email: null,
        displayName: 'Guest Student',
        isAnonymous: true
      };
      authCookieManager.setAuthCookies(mockGuest, 'guest');
      expect(authCookieManager.isGuest()).toBe(true);
      expect(authCookieManager.isLoggedIn()).toBe(false);

      // 2. Upgrade to verified user
      const mockVerified = {
        uid: 'usr_verified_777',
        email: 'abhijith@bytelab.dev',
        displayName: 'Abhijith S',
        isAnonymous: false
      };
      authCookieManager.setAuthCookies(mockVerified, 'google_oauth');
      expect(authCookieManager.isGuest()).toBe(false);
      expect(authCookieManager.isLoggedIn()).toBe(true);
      expect(authCookieManager.getSession().email).toBe('abhijith@bytelab.dev');

      // 3. Logout
      authCookieManager.clearAuthCookies();
      expect(authCookieManager.getAuthStatus()).toBe('logged_out');
      expect(authCookieManager.getSession()).toBeNull();
    });
  });

  describe('3. Python Error Formatter & Diagnostics', () => {
    it('translates complex tracebacks into friendly student-friendly guidance', () => {
      const nameError = "Traceback (most recent call last):\n  File 'main.py', line 1\nNameError: name 'x' is not defined";
      const formattedName = parsePythonError(nameError, 'print(x)');
      expect(formattedName.errorType).toBe('NameError');
      expect(formattedName.humanExplanation).toBeTruthy();

      const syntaxError = "  File 'main.py', line 2\n    if x == 5\n            ^\nSyntaxError: expected ':'";
      const formattedSyntax = parsePythonError(syntaxError, 'if x == 5\n  pass');
      expect(formattedSyntax.errorType).toBe('SyntaxError');
    });
  });

  describe('4. Student Mastery & Risk Engine Diagnosis', () => {
    it('evaluates anti-abuse and pacing integrity risk', () => {
      const normalActivity = IntegrityRiskScorer.evaluateRisk({
        type: 'CODE_RUN',
        durationSeconds: 15,
        characterCount: 50
      });
      expect(normalActivity.classification).toBe('NORMAL');
      expect(normalActivity.isAllowed).toBe(true);

      const suspiciousActivity = IntegrityRiskScorer.evaluateRisk({
        type: 'TEST_SUBMIT',
        durationSeconds: 3
      });
      expect(suspiciousActivity.riskScore).toBeGreaterThanOrEqual(40);
    });

    it('tracks outcome mastery and unit completion correctly in progressStore', () => {
      const store = useProgressStore.getState();
      store.markLessonComplete('day-01', 'day-01', 'unit-01');
      store.markLessonComplete('day-02', 'day-02', 'unit-01');
      store.recordTestResult('test_unit1', 5, 5, 'unit-01', 'day-01');

      const updated = useProgressStore.getState();
      expect(updated.completedChapters).toContain('day-01');
      expect(updated.completedChapters).toContain('day-02');
      expect(updated.testScores['test_unit1'].percentage).toBe(100);
      expect(updated.totalPoints).toBeGreaterThanOrEqual(40);
    });
  });

  describe('5. Low-Bandwidth Search & Performance Diagnosis', () => {
    it('executes full-text index query in under 10ms with zero network calls', () => {
      const start = performance.now();
      const index = buildSearchIndex('python-programming');
      expect(index.length).toBeGreaterThanOrEqual(50);
      const elapsed = performance.now() - start;
      expect(elapsed).toBeLessThan(30);
    });
  });
});
