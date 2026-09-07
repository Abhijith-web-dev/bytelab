import { describe, it, expect } from 'vitest';
import { BADGE_CATALOG, LEVEL_TIERS, useProgressStore } from '../stores/progressStore.js';
import { FocusTimer } from '../components/practice/FocusTimer.jsx';
import { ProfilePage } from '../pages/Profile/ProfilePage.jsx';
import { LeaderboardPage } from '../pages/Leaderboard/LeaderboardPage.jsx';

describe('Deep Focus, Concentration System & Profile Command Center Audit', () => {
  it('exports valid BADGE_CATALOG with required metadata', () => {
    expect(BADGE_CATALOG).toBeInstanceOf(Array);
    expect(BADGE_CATALOG.length).toBeGreaterThanOrEqual(10);

    BADGE_CATALOG.forEach(b => {
      expect(b.id).toBeDefined();
      expect(b.title).toBeDefined();
      expect(b.desc).toBeDefined();
      expect(b.icon).toBeDefined();
    });
  });

  it('exports comprehensive 10-tier LEVEL_TIERS ascending by minXP', () => {
    expect(LEVEL_TIERS.length).toBe(10);
    for (let i = 0; i < LEVEL_TIERS.length; i++) {
      expect(LEVEL_TIERS[i].level).toBe(i + 1);
      expect(LEVEL_TIERS[i].title).toBeDefined();
      if (i > 0) {
        expect(LEVEL_TIERS[i].minXP).toBeGreaterThan(LEVEL_TIERS[i - 1].minXP);
      }
    }
  });

  it('verifies FocusTimer component is a valid React functional component', () => {
    expect(FocusTimer).toBeDefined();
    expect(typeof FocusTimer).toBe('function');
  });

  it('verifies ProfilePage and LeaderboardPage components export correctly', () => {
    expect(ProfilePage).toBeDefined();
    expect(typeof ProfilePage).toBe('function');

    expect(LeaderboardPage).toBeDefined();
    expect(typeof LeaderboardPage).toBe('function');
  });

  it('verifies custom daily focus target updates and persists correctly in store', () => {
    const store = useProgressStore.getState();
    store.setDailyFocusTarget(45);
    expect(useProgressStore.getState().dailyFocusTargetMinutes).toBe(45);

    const metrics = useProgressStore.getState().getConcentrationMetrics();
    expect(metrics.dailyFocusTargetMinutes).toBe(45);
  });
});
