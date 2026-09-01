import { describe, it, expect } from 'vitest';
import { IntegrityRiskScorer } from '../features/integrity/riskScorer.js';

describe('Anti-Abuse Integrity Risk Scorer', () => {
  it('classifies normal paced activity as NORMAL with low risk score', () => {
    const result = IntegrityRiskScorer.evaluateRisk({
      type: 'CODE_RUN',
      durationSeconds: 15,
      characterCount: 50
    });

    expect(result.classification).toBe('NORMAL');
    expect(result.isAllowed).toBe(true);
  });

  it('detects timing anomaly if a full test is completed unrealistically fast (<15s)', () => {
    const result = IntegrityRiskScorer.evaluateRisk({
      type: 'TEST_SUBMIT',
      durationSeconds: 5
    });

    expect(result.riskScore).toBeGreaterThanOrEqual(40);
  });
});
