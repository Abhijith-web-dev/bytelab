/**
 * String Diff & Mismatch Highlighter Utility
 * Computes difference between expected and actual output to visually highlight mismatches,
 * casing differences, and trailing whitespace.
 */

export function computeOutputDiff(expected = '', actual = '') {
  const expStr = String(expected ?? '');
  const actStr = String(actual ?? '');

  if (expStr === actStr) {
    return {
      isMatch: true,
      hasTrailingSpaceMismatch: false,
      hasCaseMismatch: false,
      hasExtraPrefix: false,
      hasPromptPollution: false,
      diffTokens: []
    };
  }

  const expTrim = expStr.trim();
  const actTrim = actStr.trim();

  const hasCaseMismatch = expStr.toLowerCase() === actStr.toLowerCase() && expStr !== actStr;
  const hasTrailingSpaceMismatch = expTrim === actTrim && expStr !== actStr;

  // Detect if actual output ends with expected output, but has extra characters/prompts prepended
  // e.g. "Enter mark: Grade: B" or "82\nGrade: B" when expected is "Grade: B"
  const endsWithExpected = Boolean(
    expTrim &&
    actTrim.length > expTrim.length &&
    (actTrim.endsWith(expTrim) || actTrim.toLowerCase().endsWith(expTrim.toLowerCase()))
  );

  const hasExtraPrefix = endsWithExpected && !hasTrailingSpaceMismatch;
  const prefixText = hasExtraPrefix ? actTrim.slice(0, actTrim.length - expTrim.length).trim() : '';
  const hasPromptPollution = Boolean(
    hasExtraPrefix &&
    /^(input|enter|please|\d+|grade\s*:?)/i.test(prefixText)
  );

  // Simple token-based comparison
  const expTokens = expStr.split(/(\s+)/);
  const actTokens = actStr.split(/(\s+)/);

  return {
    isMatch: false,
    hasTrailingSpaceMismatch,
    hasCaseMismatch,
    hasExtraPrefix,
    hasPromptPollution,
    prefixText,
    expectedLength: expStr.length,
    actualLength: actStr.length,
    expPreview: expStr,
    actPreview: actStr
  };
}
