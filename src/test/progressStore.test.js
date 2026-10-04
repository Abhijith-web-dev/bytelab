import { describe, it, expect, beforeEach } from 'vitest';
import { useProgressStore } from '../stores/progressStore.js';

describe('Progress Store & Outcome Mastery Calculations', () => {
  beforeEach(() => {
    useProgressStore.getState().loadUserProgress('test_student');
  });

  it('marks lessons and chapters complete, updating points and completion rate', () => {
    const store = useProgressStore.getState();
    expect(store.completedChapters.length).toBe(0);
    expect(store.totalPoints).toBe(0);

    store.markLessonComplete('lesson_01', 'day-01', 'unit-01');

    const updated = useProgressStore.getState();
    expect(updated.completedChapters).toContain('day-01');
    expect(updated.completedLessons).toContain('lesson_01');
    expect(updated.totalPoints).toBe(20);
  });

  it('calculates CO outcome mastery percentages correctly', () => {
    const store = useProgressStore.getState();
    store.markLessonComplete('l1', 'day-01', 'unit-01');
    store.markLessonComplete('l2', 'day-02', 'unit-01');

    const coMastery = useProgressStore.getState().getOutcomeMastery();
    expect(coMastery.CO1.completed).toBe(2);
    expect(coMastery.CO1.percent).toBe(25); // 2/8 = 25% (6 academic days + 2 enrichment masterclasses)
    expect(coMastery.CO2.percent).toBe(0);
  });

  it('records test results and updates points and unit completion', () => {
    const store = useProgressStore.getState();
    store.recordTestResult('test_unit1', 5, 5, 'unit-01', 'day-01');

    const updated = useProgressStore.getState();
    expect(updated.testScores['test_unit1']).toBeDefined();
    expect(updated.testScores['test_unit1'].score).toBe(5);
    expect(updated.testScores['test_unit1'].percentage).toBe(100);
    expect(updated.testScores['test_unit1'].passed).toBe(true);
  });

  it('logs focus sessions, awards focus XP, and unlocks session badges', () => {
    const store = useProgressStore.getState();
    expect(store.focusMinutes).toBe(0);
    expect(store.focusSessionsCompleted).toBe(0);

    // Log 25m Pomodoro focus session (25 * 2 + 25 bonus = 75 XP)
    const result = store.logFocusSession(25, 'focus');
    expect(result.pointsEarned).toBe(75);

    const updated = useProgressStore.getState();
    expect(updated.focusMinutes).toBe(25);
    expect(updated.todayFocusMinutes).toBe(25);
    expect(updated.focusSessionsCompleted).toBe(1);
    expect(updated.totalPoints).toBe(75);
    expect(updated.unlockedBadges).toContain('session_starter');
  });

  it('records code runs and computes concentration score and clean run accuracy accurately', () => {
    const store = useProgressStore.getState();

    // Run 4 clean code executions and 1 failing run
    store.recordCodeRun(true);
    store.recordCodeRun(true);
    store.recordCodeRun(true);
    store.recordCodeRun(true);
    store.recordCodeRun(false);

    const metrics = useProgressStore.getState().getConcentrationMetrics();
    expect(metrics.totalCodeRuns).toBe(5);
    expect(metrics.cleanRunCount).toBe(4);
    expect(metrics.cleanAccuracy).toBe(80); // 4 / 5 = 80%
    expect(metrics.score).toBeGreaterThanOrEqual(10);
    expect(typeof metrics.rating).toBe('string');
  });

  it('calculates user levels and tier progression smoothly across XP thresholds', () => {
    const store = useProgressStore.getState();
    let levelInfo = store.getUserLevel();
    expect(levelInfo.level).toBe(1);
    expect(levelInfo.title).toBe('Syntax Novice');

    // Earn points to reach Level 2 (200 XP threshold)
    store.logFocusSession(25, 'focus'); // +75
    store.logFocusSession(25, 'focus'); // +75
    store.logFocusSession(25, 'focus'); // +75 => 225 pts total

    levelInfo = useProgressStore.getState().getUserLevel();
    expect(levelInfo.level).toBe(2);
    expect(levelInfo.title).toBe('Logic Apprentice');
    expect(levelInfo.currentXP).toBe(225);
  });

  it('exports local data safely and resets state on confirmation', () => {
    const store = useProgressStore.getState();
    store.logFocusSession(15, 'focus');

    const exported = store.exportLocalData();
    expect(typeof exported).toBe('string');
    const parsed = JSON.parse(exported);
    expect(parsed.focusMinutes).toBe(15);
    expect(parsed.concentrationMetrics).toBeDefined();

    // Reset without confirmation should do nothing
    expect(store.resetProgress(false)).toBe(false);

    // Reset with confirmation
    expect(store.resetProgress(true)).toBe(true);
    const resetState = useProgressStore.getState();
    expect(resetState.focusMinutes).toBe(0);
    expect(resetState.totalPoints).toBe(0);
  });
});

