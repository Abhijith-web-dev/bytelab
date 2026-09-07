/**
 * ByteLab Time-Travel Visual Execution Trace Helper
 * Pure utilities for diffing variable state across execution steps,
 * formatting step summaries, and managing timeline bounds.
 */

/**
 * Compares current step variables against previous step variables.
 * Marks each variable as 'new', 'changed', or 'unchanged'.
 * 
 * @param {Record<string, { value: string, type: string }>} currentLocals 
 * @param {Record<string, { value: string, type: string }>} [previousLocals={}] 
 * @returns {Array<{ name: string, type: string, value: string, status: 'new' | 'changed' | 'unchanged', previousValue?: string }>}
 */
export function diffStepVariables(currentLocals = {}, previousLocals = {}) {
  if (!currentLocals || typeof currentLocals !== 'object') {
    return [];
  }

  const prev = previousLocals || {};
  const diffs = [];

  for (const [name, data] of Object.entries(currentLocals)) {
    if (name.startsWith('__')) continue; // Ignore Python internal variables

    const value = data?.value ?? String(data);
    const type = data?.type ?? 'unknown';

    if (!(name in prev)) {
      diffs.push({
        name,
        type,
        value,
        status: 'new',
        previousValue: undefined
      });
    } else {
      const prevVal = prev[name]?.value ?? String(prev[name]);
      const prevType = prev[name]?.type ?? 'unknown';

      if (value !== prevVal || type !== prevType) {
        diffs.push({
          name,
          type,
          value,
          status: 'changed',
          previousValue: prevVal
        });
      } else {
        diffs.push({
          name,
          type,
          value,
          status: 'unchanged',
          previousValue: undefined
        });
      }
    }
  }

  // Sort: 'changed' and 'new' first for immediate visibility, then alphabetical by name
  return diffs.sort((a, b) => {
    const priority = { changed: 0, new: 1, unchanged: 2 };
    const pDiff = priority[a.status] - priority[b.status];
    if (pDiff !== 0) return pDiff;
    return a.name.localeCompare(b.name);
  });
}

/**
 * Returns a friendly one-line summary of what is happening at this step.
 * 
 * @param {object} step - The trace step object
 * @returns {string} Human-readable explanation
 */
export function getStepSummary(step) {
  if (!step) return 'No active step';

  if (step.event === 'exception' || step.exception) {
    const excType = step.exception?.type || 'Exception';
    const excMsg = step.exception?.msg || 'An error occurred';
    return `Line ${step.line}: Raised ${excType} — ${excMsg}`;
  }

  if (step.event === 'return') {
    return `Line ${step.line}: Returned from ${step.func || 'function'}`;
  }

  if (step.snippet) {
    return `Line ${step.line}: ${step.snippet}`;
  }

  return `Executing Line ${step.line}`;
}

/**
 * Safely clamps the step index within [0, totalSteps - 1].
 * 
 * @param {number} index 
 * @param {number} totalSteps 
 * @returns {number}
 */
export function clampStepIndex(index, totalSteps) {
  if (!totalSteps || totalSteps <= 0) return 0;
  return Math.max(0, Math.min(index, totalSteps - 1));
}
