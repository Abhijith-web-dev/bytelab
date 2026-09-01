import { storage } from '../../services/storage/localStorage.js';

const ACTIVITY_LOG_KEY = 'integrity_activity_log';

export class IntegrityRiskScorer {
  /**
   * Logs a learning action and evaluates risk score
   * @param {Object} event
   * @param {string} event.type - 'CODE_RUN' | 'PROBLEM_SUBMIT' | 'TEST_SUBMIT'
   * @param {number} [event.durationSeconds]
   * @param {number} [event.characterCount]
   */
  static evaluateRisk(event) {
    const logs = storage.get(ACTIVITY_LOG_KEY, []);
    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    const tenMinutesAgo = now - 600000;

    // Record new event
    logs.unshift({ ...event, timestamp: now });
    // Keep max 100 recent entries
    if (logs.length > 100) logs.pop();
    storage.set(ACTIVITY_LOG_KEY, logs);

    let riskScore = 0;
    const recentOneMin = logs.filter(l => l.timestamp >= oneMinuteAgo);
    const recentTenMin = logs.filter(l => l.timestamp >= tenMinutesAgo);

    // Signal 1: Submission velocity (> 15 runs in 1 minute)
    if (recentOneMin.length > 15) {
      riskScore += 30;
    } else if (recentOneMin.length > 8) {
      riskScore += 15;
    }

    // Signal 2: Test timing anomaly (test completed in < 15 seconds)
    if (event.type === 'TEST_SUBMIT' && event.durationSeconds && event.durationSeconds < 15) {
      riskScore += 40;
    }

    // Signal 3: Unrealistic typing velocity (> 500 chars in 1 second submission)
    if (event.characterCount && event.durationSeconds && event.durationSeconds < 2 && event.characterCount > 400) {
      riskScore += 25;
    }

    // Signal 4: Repeated rapid identical attempts
    const sameActionSpam = recentOneMin.filter(l => l.type === event.type).length;
    if (sameActionSpam > 10) {
      riskScore += 20;
    }

    riskScore = Math.min(100, riskScore);

    let classification = 'NORMAL';
    if (riskScore >= 80) classification = 'RESTRICTED';
    else if (riskScore >= 60) classification = 'CHALLENGE';
    else if (riskScore >= 30) classification = 'MONITOR';

    return {
      riskScore,
      classification,
      isAllowed: riskScore < 80,
      message: riskScore >= 80
        ? 'This activity needs additional verification before leaderboard points can be awarded.'
        : 'Normal'
    };
  }
}
