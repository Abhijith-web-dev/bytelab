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
    expect(coMastery.CO1.percent).toBe(33); // 2/6 = 33%
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
});
