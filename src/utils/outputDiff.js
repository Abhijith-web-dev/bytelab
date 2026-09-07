/**
 * String Diff & Mismatch Highlighter Utility
 * Computes difference between expected and actual output to visually highlight mismatches,
 * casing differences, and trailing whitespace.
 */

export function computeOutputDiff(expected = '', actual = '') {
  const expStr = String(expected ?? '');
  const actStr = String(actual ?? '');

  if (expStr === actStr) {
    return { isMatch: true, hasTrailingSpaceMismatch: false, hasCaseMismatch: false, diffTokens: [] };
  }

  const hasCaseMismatch = expStr.toLowerCase() === actStr.toLowerCase() && expStr !== actStr;
  const hasTrailingSpaceMismatch = expStr.trim() === actStr.trim() && expStr !== actStr;

  // Simple token-based comparison
  const expTokens = expStr.split(/(\s+)/);
  const actTokens = actStr.split(/(\s+)/);

  return {
    isMatch: false,
    hasTrailingSpaceMismatch,
    hasCaseMismatch,
    expectedLength: expStr.length,
    actualLength: actStr.length,
    expPreview: expStr,
    actPreview: actStr
  };
}
