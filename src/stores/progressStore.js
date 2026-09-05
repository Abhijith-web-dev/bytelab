import { create } from 'zustand';
import { progressStorage } from '../services/storage/localStorage.js';
import { syncManager } from '../services/sync/syncManager.js';
import { getCourse, getNavigationHierarchy } from '../content/loader/index.js';
import { trackLessonComplete, trackProblemSolved, trackAssessmentComplete } from '../services/firebase/analytics.js';

export const useProgressStore = create((set, get) => ({
  userId: 'guest',
  courseId: 'python-programming',
  completedLessons: [],
  completedChapters: [],
  completedUnits: [],
  solvedProblems: {},
  testScores: {},
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  totalPoints: 0,

  loadUserProgress: (userId) => {
    let data = progressStorage.getLocalProgress(userId);
    const today = new Date().toISOString().split('T')[0];
    let streak = data.streakDays || 1;

    // Merge guest progress if logging into a real account
    if (userId && userId !== 'guest') {
      const guestData = progressStorage.getLocalProgress('guest');
      const hasGuestProgress =
        (guestData.completedChapters && guestData.completedChapters.length > 0) ||
        (guestData.completedLessons && guestData.completedLessons.length > 0) ||
        (guestData.solvedProblems && Object.keys(guestData.solvedProblems).length > 0) ||
        (guestData.testScores && Object.keys(guestData.testScores).length > 0);

      if (hasGuestProgress) {
        data = {
          ...data,
          completedLessons: Array.from(new Set([...(data.completedLessons || []), ...(guestData.completedLessons || [])])),
          completedChapters: Array.from(new Set([...(data.completedChapters || []), ...(guestData.completedChapters || [])])),
          completedUnits: Array.from(new Set([...(data.completedUnits || []), ...(guestData.completedUnits || [])])),
          solvedProblems: { ...(guestData.solvedProblems || {}), ...(data.solvedProblems || {}) },
          testScores: { ...(guestData.testScores || {}), ...(data.testScores || {}) },
          totalPoints: (data.totalPoints || 0) + (guestData.totalPoints || 0)
        };
        // Clear guest storage after promotion
        progressStorage.saveLocalProgress('guest', {
          completedLessons: [],
          completedChapters: [],
          completedUnits: [],
          solvedProblems: {},
          testScores: {},
          streakDays: 1,
          lastActiveDate: today,
          totalPoints: 0
        });
        progressStorage.saveLocalProgress(userId, data);
      }
    }

    // Check streak date
    if (data.lastActiveDate && data.lastActiveDate !== today) {
      const lastDate = new Date(data.lastActiveDate);
      const diffDays = Math.round((new Date(today) - lastDate) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        streak += 1;
      } else if (diffDays > 1) {
        streak = 1;
      }
    }

    set({
      userId,
      completedLessons: data.completedLessons || [],
      completedChapters: data.completedChapters || [],
      completedUnits: data.completedUnits || [],
      solvedProblems: data.solvedProblems || {},
      testScores: data.testScores || {},
      streakDays: streak,
      lastActiveDate: today,
      totalPoints: data.totalPoints || 0
    });

    if (userId && userId !== 'guest') {
      get()._persistAndSync();
    }
  },

  markLessonComplete: (lessonId, chapterId, unitId) => {
    const state = get();
    if (state.completedLessons.includes(lessonId)) return;

    const newLessons = [...state.completedLessons, lessonId];
    const newChapters = state.completedChapters.includes(chapterId)
      ? state.completedChapters
      : [...state.completedChapters, chapterId];

    // Check if all chapters in unit are complete
    const course = getCourse(state.courseId);
    const unit = course.units.find(u => u.id === unitId);
    let newUnits = [...state.completedUnits];
    if (unit && unit.chapters.every(ch => newChapters.includes(ch))) {
      if (!newUnits.includes(unitId)) {
        newUnits.push(unitId);
      }
    }

    const updatedPoints = state.totalPoints + 20;

    const updatedState = {
      completedLessons: newLessons,
      completedChapters: newChapters,
      completedUnits: newUnits,
      totalPoints: updatedPoints
    };

    set(updatedState);
    get()._persistAndSync();

    trackLessonComplete({
      courseId: state.courseId,
      unitId,
      chapterId,
      pointsEarned: 20
    });
  },

  recordProblemSolved: (problemId, code, attempts = 1) => {
    const state = get();
    const existing = state.solvedProblems[problemId] || { attempts: 0, passed: false };
    const isFirstTimePass = !existing.passed;

    const updatedSolved = {
      ...state.solvedProblems,
      [problemId]: {
        passed: true,
        attempts: existing.attempts + attempts,
        bestCode: code,
        updatedAt: Date.now()
      }
    };

    const updatedPoints = state.totalPoints + (isFirstTimePass ? 50 : 5);

    set({
      solvedProblems: updatedSolved,
      totalPoints: updatedPoints
    });

    get()._persistAndSync();

    trackProblemSolved({
      problemId,
      courseId: state.courseId,
      points: isFirstTimePass ? 50 : 5
    });
  },

  recordTestResult: (testId, score, maxScore, unitId = null, chapterId = null) => {
    const state = get();
    const percentage = Math.round((score / maxScore) * 100);
    const passed = percentage >= 60;

    const updatedScores = {
      ...state.testScores,
      [testId]: {
        score,
        maxScore,
        percentage,
        passed,
        attemptedAt: Date.now()
      }
    };

    const bonusPoints = passed ? score * 10 : score * 2;
    const updatedPoints = state.totalPoints + bonusPoints;

    let newChapters = [...state.completedChapters];
    if (chapterId && passed && !newChapters.includes(chapterId)) {
      newChapters.push(chapterId);
    }

    let newUnits = [...state.completedUnits];
    if (unitId && passed && !newUnits.includes(unitId)) {
      newUnits.push(unitId);
    }

    set({
      testScores: updatedScores,
      completedChapters: newChapters,
      completedUnits: newUnits,
      totalPoints: updatedPoints
    });

    get()._persistAndSync();

    trackAssessmentComplete({
      unitId,
      score,
      maxScore,
      percentage,
      passed
    });

    // Enqueue test attempt record
    syncManager.enqueue({
      type: 'RECORD_TEST',
      userId: state.userId,
      data: {
        testId,
        score,
        maxScore,
        percentage,
        passed,
        unitId,
        chapterId,
        courseId: state.courseId
      }
    });

    // Update leaderboard entry if authenticated
    if (state.userId && !state.userId.startsWith('guest')) {
      syncManager.enqueue({
        type: 'UPDATE_LEADERBOARD',
        userId: state.userId,
        data: {
          score: updatedPoints,
          completedUnits: newUnits.length,
          completedChapters: newChapters.length,
          courseId: state.courseId
        }
      });
    }
  },

  _persistAndSync: () => {
    const state = get();
    const dataToSave = {
      courseId: state.courseId,
      completedLessons: state.completedLessons,
      completedChapters: state.completedChapters,
      completedUnits: state.completedUnits,
      solvedProblems: state.solvedProblems,
      testScores: state.testScores,
      streakDays: state.streakDays,
      lastActiveDate: state.lastActiveDate,
      totalPoints: state.totalPoints
    };

    // Save locally
    progressStorage.saveLocalProgress(state.userId, dataToSave);

    // Enqueue remote sync
    if (state.userId && state.userId !== 'guest') {
      syncManager.enqueue({
        type: 'SAVE_PROGRESS',
        userId: state.userId,
        data: dataToSave
      });
    }
  },

  // Calculate Course Outcome Mastery (CO1 - CO5)
  getOutcomeMastery: () => {
    const state = get();
    const coStats = {
      CO1: { total: 0, completed: 0, percent: 0, bloom: 'Understand' },
      CO2: { total: 0, completed: 0, percent: 0, bloom: 'Create' },
      CO3: { total: 0, completed: 0, percent: 0, bloom: 'Apply' },
      CO4: { total: 0, completed: 0, percent: 0, bloom: 'Apply' },
      CO5: { total: 0, completed: 0, percent: 0, bloom: 'Apply' }
    };

    const allHierarchy = getNavigationHierarchy(state.courseId);
    allHierarchy.forEach(item => {
      let co = 'CO1';
      if (item.unitId === 'unit-01') co = 'CO1';
      else if (item.unitId === 'unit-02') co = 'CO2';
      else if (item.unitId === 'unit-03') co = 'CO3';
      else if (item.unitId === 'unit-04') co = 'CO4';
      else if (item.unitId === 'unit-05') co = 'CO5';
      else if (item.unitId === 'unit-06') co = 'CO5';

      if (coStats[co]) {
        coStats[co].total += 1;
        if (state.completedChapters.includes(item.chapterId)) {
          coStats[co].completed += 1;
        }
      }
    });

    Object.keys(coStats).forEach(key => {
      const total = coStats[key].total || 1;
      coStats[key].percent = Math.min(100, Math.round((coStats[key].completed / total) * 100));
    });

    return coStats;
  },

  getCourseCompletionPercentage: () => {
    const state = get();
    const hierarchy = getNavigationHierarchy(state.courseId);
    const totalChapters = hierarchy.length || 46;
    return Math.min(100, Math.round((state.completedChapters.length / totalChapters) * 100));
  }
}));
