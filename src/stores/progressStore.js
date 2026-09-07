import { create } from 'zustand';
import { progressStorage } from '../services/storage/localStorage.js';
import { syncManager } from '../services/sync/syncManager.js';
import { getCourse, getNavigationHierarchy } from '../content/loader/index.js';
import { trackLessonComplete, trackProblemSolved, trackAssessmentComplete } from '../services/firebase/analytics.js';

export const BADGE_CATALOG = [
  { id: 'first_login', title: 'Welcome Pioneer', desc: 'Started learning journey on ByteLab', icon: 'Sparkles', category: 'onboarding' },
  { id: 'session_starter', title: 'Deep Diver', desc: 'Completed your first deep focus session', icon: 'Timer', category: 'focus' },
  { id: 'pomodoro_pro', title: 'Laser Focus', desc: 'Completed 5+ deep focus sessions', icon: 'Flame', category: 'focus' },
  { id: 'zen_master', title: 'Zen Master', desc: 'Logged over 100+ minutes of deep focus', icon: 'Brain', category: 'focus' },
  { id: 'streak_keeper', title: 'Consistent Mind', desc: 'Maintained a 3+ day learning streak', icon: 'Zap', category: 'consistency' },
  { id: 'streak_flame', title: 'Unstoppable', desc: 'Reached a 7+ day continuous streak', icon: 'Flame', category: 'consistency' },
  { id: 'first_problem', title: 'Problem Solver', desc: 'Solved your first coding challenge', icon: 'Code', category: 'practice' },
  { id: 'clean_coder', title: 'Clean Coder', desc: 'Executed 10+ clean runs with zero errors', icon: 'ShieldCheck', category: 'accuracy' },
  { id: 'code_veteran', title: 'Code Veteran', desc: 'Passed 10+ programming challenges', icon: 'Trophy', category: 'practice' },
  { id: 'co_pioneer', title: 'CO1 Explorer', desc: 'Mastered Unit 1 Computational Thinking', icon: 'Award', category: 'academic' }
];

export const LEVEL_TIERS = [
  { level: 1, title: 'Syntax Novice', minXP: 0, maxXP: 199 },
  { level: 2, title: 'Logic Apprentice', minXP: 200, maxXP: 499 },
  { level: 3, title: 'Loop Explorer', minXP: 500, maxXP: 899 },
  { level: 4, title: 'Function Smith', minXP: 900, maxXP: 1399 },
  { level: 5, title: 'NumPy Ninja', minXP: 1400, maxXP: 1999 },
  { level: 6, title: 'Algorithm Artisan', minXP: 2000, maxXP: 2799 },
  { level: 7, title: 'Python Prodigy', minXP: 2800, maxXP: 3699 },
  { level: 8, title: 'Memory Architect', minXP: 3700, maxXP: 4999 },
  { level: 9, title: 'Code Sage', minXP: 5000, maxXP: 6999 },
  { level: 10, title: 'ByteLab Grandmaster', minXP: 7000, maxXP: 999999 }
];

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
  focusMinutes: 0,
  todayFocusMinutes: 0,
  dailyFocusTargetMinutes: 25,
  focusSessionsCompleted: 0,
  cleanRunCount: 0,
  totalCodeRuns: 0,
  unlockedBadges: ['first_login'],
  lastFocusDate: new Date().toISOString().split('T')[0],

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
        (guestData.testScores && Object.keys(guestData.testScores).length > 0) ||
        (guestData.focusMinutes && guestData.focusMinutes > 0);

      if (hasGuestProgress) {
        data = {
          ...data,
          completedLessons: Array.from(new Set([...(data.completedLessons || []), ...(guestData.completedLessons || [])])),
          completedChapters: Array.from(new Set([...(data.completedChapters || []), ...(guestData.completedChapters || [])])),
          completedUnits: Array.from(new Set([...(data.completedUnits || []), ...(guestData.completedUnits || [])])),
          solvedProblems: { ...(guestData.solvedProblems || {}), ...(data.solvedProblems || {}) },
          testScores: { ...(guestData.testScores || {}), ...(data.testScores || {}) },
          totalPoints: (data.totalPoints || 0) + (guestData.totalPoints || 0),
          focusMinutes: (data.focusMinutes || 0) + (guestData.focusMinutes || 0),
          todayFocusMinutes: (data.todayFocusMinutes || 0) + (guestData.todayFocusMinutes || 0),
          focusSessionsCompleted: (data.focusSessionsCompleted || 0) + (guestData.focusSessionsCompleted || 0),
          cleanRunCount: (data.cleanRunCount || 0) + (guestData.cleanRunCount || 0),
          totalCodeRuns: (data.totalCodeRuns || 0) + (guestData.totalCodeRuns || 0),
          unlockedBadges: Array.from(new Set([...(data.unlockedBadges || ['first_login']), ...(guestData.unlockedBadges || [])]))
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
          totalPoints: 0,
          focusMinutes: 0,
          todayFocusMinutes: 0,
          dailyFocusTargetMinutes: 25,
          focusSessionsCompleted: 0,
          cleanRunCount: 0,
          totalCodeRuns: 0,
          unlockedBadges: ['first_login'],
          lastFocusDate: today
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

    // Reset today focus if date rolled over
    const todayFocus = (data.lastFocusDate === today) ? (data.todayFocusMinutes || 0) : 0;

    set({
      userId,
      completedLessons: data.completedLessons || [],
      completedChapters: data.completedChapters || [],
      completedUnits: data.completedUnits || [],
      solvedProblems: data.solvedProblems || {},
      testScores: data.testScores || {},
      streakDays: streak,
      lastActiveDate: today,
      totalPoints: data.totalPoints || 0,
      focusMinutes: data.focusMinutes || 0,
      todayFocusMinutes: todayFocus,
      dailyFocusTargetMinutes: data.dailyFocusTargetMinutes || 25,
      focusSessionsCompleted: data.focusSessionsCompleted || 0,
      cleanRunCount: data.cleanRunCount || 0,
      totalCodeRuns: data.totalCodeRuns || 0,
      unlockedBadges: Array.isArray(data.unlockedBadges) && data.unlockedBadges.length > 0 ? data.unlockedBadges : ['first_login'],
      lastFocusDate: today
    });

    // Check automatic streak badges
    if (streak >= 3) {
      get().unlockBadge('streak_keeper');
    }
    if (streak >= 7) {
      get().unlockBadge('streak_flame');
    }

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

    // Check badges
    const newBadges = [...(state.unlockedBadges || ['first_login'])];
    if (!newBadges.includes('first_problem')) {
      newBadges.push('first_problem');
    }
    const passedCount = Object.values(updatedSolved).filter(p => p.passed).length;
    if (passedCount >= 10 && !newBadges.includes('code_veteran')) {
      newBadges.push('code_veteran');
    }

    set({
      solvedProblems: updatedSolved,
      totalPoints: updatedPoints,
      unlockedBadges: newBadges
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
      totalPoints: state.totalPoints,
      focusMinutes: state.focusMinutes,
      todayFocusMinutes: state.todayFocusMinutes,
      dailyFocusTargetMinutes: state.dailyFocusTargetMinutes,
      focusSessionsCompleted: state.focusSessionsCompleted,
      cleanRunCount: state.cleanRunCount,
      totalCodeRuns: state.totalCodeRuns,
      unlockedBadges: state.unlockedBadges,
      lastFocusDate: state.lastFocusDate
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

      syncManager.enqueue({
        type: 'UPDATE_LEADERBOARD',
        userId: state.userId,
        data: {
          score: state.totalPoints,
          completedUnits: state.completedUnits.length,
          completedChapters: state.completedChapters.length,
          courseId: state.courseId,
          focusMinutes: state.focusMinutes,
          cleanRunCount: state.cleanRunCount
        }
      });
    }
  },

  logFocusSession: (sessionMinutes, mode = 'focus') => {
    if (!sessionMinutes || sessionMinutes <= 0) return { pointsEarned: 0 };
    const state = get();
    const today = new Date().toISOString().split('T')[0];

    // Award +2 XP per focus minute + 25 bonus XP for completing deep session
    const pointsEarned = Math.round(sessionMinutes * 2) + (sessionMinutes >= 15 ? 25 : 5);
    const updatedTotalPoints = state.totalPoints + pointsEarned;
    const updatedFocusMinutes = state.focusMinutes + sessionMinutes;
    const updatedTodayFocus = (state.lastFocusDate === today ? state.todayFocusMinutes : 0) + sessionMinutes;
    const updatedSessions = state.focusSessionsCompleted + 1;

    // Check Badge unlocks
    const newBadges = [...(state.unlockedBadges || ['first_login'])];
    if (!newBadges.includes('session_starter')) {
      newBadges.push('session_starter');
    }
    if (updatedSessions >= 5 && !newBadges.includes('pomodoro_pro')) {
      newBadges.push('pomodoro_pro');
    }
    if (updatedFocusMinutes >= 100 && !newBadges.includes('zen_master')) {
      newBadges.push('zen_master');
    }

    set({
      focusMinutes: updatedFocusMinutes,
      todayFocusMinutes: updatedTodayFocus,
      focusSessionsCompleted: updatedSessions,
      totalPoints: updatedTotalPoints,
      unlockedBadges: newBadges,
      lastFocusDate: today
    });

    get()._persistAndSync();

    return {
      pointsEarned,
      totalFocusMinutes: updatedFocusMinutes,
      todayFocusMinutes: updatedTodayFocus,
      newBadges
    };
  },

  recordCodeRun: (isCleanPass = false) => {
    const state = get();
    const updatedTotalRuns = state.totalCodeRuns + 1;
    const updatedCleanRuns = state.cleanRunCount + (isCleanPass ? 1 : 0);

    const newBadges = [...(state.unlockedBadges || ['first_login'])];
    if (updatedCleanRuns >= 10 && !newBadges.includes('clean_coder')) {
      newBadges.push('clean_coder');
    }

    set({
      totalCodeRuns: updatedTotalRuns,
      cleanRunCount: updatedCleanRuns,
      unlockedBadges: newBadges
    });

    get()._persistAndSync();
  },

  setDailyFocusTarget: (targetMinutes) => {
    if (!targetMinutes || targetMinutes < 5) return;
    set({ dailyFocusTargetMinutes: targetMinutes });
    get()._persistAndSync();
  },

  unlockBadge: (badgeId) => {
    const state = get();
    if (state.unlockedBadges?.includes(badgeId)) return;
    const newBadges = [...(state.unlockedBadges || ['first_login']), badgeId];
    set({ unlockedBadges: newBadges });
    get()._persistAndSync();
  },

  getConcentrationMetrics: () => {
    const state = get();
    const today = new Date().toISOString().split('T')[0];
    const todayMins = state.lastFocusDate === today ? state.todayFocusMinutes : 0;
    const targetMins = Math.max(5, state.dailyFocusTargetMinutes || 25);
    const totalRuns = Math.max(0, state.totalCodeRuns || 0);
    const cleanRuns = Math.max(0, state.cleanRunCount || 0);

    const cleanAccuracy = totalRuns > 0 ? Math.min(100, Math.round((cleanRuns / totalRuns) * 100)) : 100;
    const targetProgress = Math.min(100, Math.round((todayMins / targetMins) * 100));
    const depthProgress = Math.min(100, Math.round((state.focusSessionsCompleted / 5) * 100));

    // Blended concentration score (0 - 100)
    let score = 50;
    if (totalRuns > 0 || todayMins > 0 || state.focusSessionsCompleted > 0) {
      const accuracyWeight = (cleanAccuracy / 100) * 40;
      const targetWeight = (targetProgress / 100) * 35;
      const depthWeight = (depthProgress / 100) * 25;
      score = Math.min(100, Math.max(10, Math.round(accuracyWeight + targetWeight + depthWeight)));
    }

    let rating = 'Warming Up 🌱';
    if (score >= 85) rating = 'Laser Focused ⚡';
    else if (score >= 65) rating = 'Steady Flow 🌊';
    else if (score >= 40) rating = 'Building Momentum 🚀';

    return {
      score,
      rating,
      todayFocusMinutes: todayMins,
      dailyFocusTargetMinutes: targetMins,
      targetProgress,
      cleanAccuracy,
      focusMinutes: state.focusMinutes || 0,
      focusSessionsCompleted: state.focusSessionsCompleted || 0,
      totalCodeRuns: totalRuns,
      cleanRunCount: cleanRuns
    };
  },

  getUserLevel: () => {
    const state = get();
    const pts = state.totalPoints || 0;
    let currentTier = LEVEL_TIERS[0];
    let nextTier = LEVEL_TIERS[1] || null;

    for (let i = LEVEL_TIERS.length - 1; i >= 0; i--) {
      if (pts >= LEVEL_TIERS[i].minXP) {
        currentTier = LEVEL_TIERS[i];
        nextTier = LEVEL_TIERS[i + 1] || null;
        break;
      }
    }

    const min = currentTier.minXP;
    const max = nextTier ? nextTier.minXP : currentTier.maxXP;
    const progressPercent = nextTier ? Math.min(100, Math.round(((pts - min) / Math.max(1, max - min)) * 100)) : 100;
    const xpRemaining = nextTier ? Math.max(0, nextTier.minXP - pts) : 0;

    return {
      level: currentTier.level,
      title: currentTier.title,
      currentXP: pts,
      nextLevelXP: nextTier ? nextTier.minXP : null,
      progressPercent,
      xpRemaining
    };
  },

  exportLocalData: () => {
    const state = get();
    const exportObject = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      userId: state.userId,
      courseId: state.courseId,
      totalPoints: state.totalPoints,
      streakDays: state.streakDays,
      focusMinutes: state.focusMinutes,
      focusSessionsCompleted: state.focusSessionsCompleted,
      completedLessonsCount: state.completedLessons.length,
      completedChaptersCount: state.completedChapters.length,
      completedUnitsCount: state.completedUnits.length,
      completedLessons: state.completedLessons,
      completedChapters: state.completedChapters,
      completedUnits: state.completedUnits,
      solvedProblems: state.solvedProblems,
      testScores: state.testScores,
      unlockedBadges: state.unlockedBadges,
      concentrationMetrics: state.getConcentrationMetrics()
    };
    return JSON.stringify(exportObject, null, 2);
  },

  resetProgress: (confirm = false) => {
    if (!confirm) return false;
    const state = get();
    const today = new Date().toISOString().split('T')[0];
    const emptyState = {
      completedLessons: [],
      completedChapters: [],
      completedUnits: [],
      solvedProblems: {},
      testScores: {},
      streakDays: 1,
      lastActiveDate: today,
      totalPoints: 0,
      focusMinutes: 0,
      todayFocusMinutes: 0,
      dailyFocusTargetMinutes: 25,
      focusSessionsCompleted: 0,
      cleanRunCount: 0,
      totalCodeRuns: 0,
      unlockedBadges: ['first_login'],
      lastFocusDate: today
    };

    set(emptyState);
    progressStorage.saveLocalProgress(state.userId, emptyState);
    return true;
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

