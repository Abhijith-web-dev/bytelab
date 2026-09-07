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
    if (step.snippet.includes('input(')) {
      return `Line ${step.line} [stdin]: ${step.snippet}`;
    }
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

/**
 * Formats a concise inline string of active variable changes for Monaco editor ghost annotations.
 * E.g. "total = 15, count = 3"
 * 
 * @param {Array<{ name: string, value: string, status: string }>} diffs 
 * @param {number} [maxChars=45] 
 * @returns {string}
 */
export function formatInlineVariableAnnotation(diffs = [], maxChars = 45) {
  if (!diffs || !Array.isArray(diffs)) return '';

  const activeChanges = diffs.filter(d => d.status === 'changed' || d.status === 'new');
  if (activeChanges.length === 0) return '';

  const parts = [];
  let currentLen = 0;

  for (const d of activeChanges) {
    let val = d.value || '';
    if (val.length > 15) {
      val = val.slice(0, 12) + '...';
    }
    const token = `${d.name} = ${val}`;
    if (currentLen + token.length > maxChars && parts.length > 0) {
      parts.push(`+${activeChanges.length - parts.length} more`);
      break;
    }
    parts.push(token);
    currentLen += token.length + 2;
  }

  return parts.join(', ');
}

/**
 * Finds the next step index matching an active breakpoint.
 * 
 * @param {Array<object>} traceSteps 
 * @param {number} currentIndex 
 * @param {Set<number> | Array<number>} breakpoints 
 * @returns {number | null} Next matching step index or null
 */
export function findNextBreakpoint(traceSteps = [], currentIndex = 0, breakpoints = new Set()) {
  if (!Array.isArray(traceSteps) || traceSteps.length === 0) return null;
  const bpSet = breakpoints instanceof Set ? breakpoints : new Set(breakpoints || []);
  if (bpSet.size === 0) return null;

  for (let i = currentIndex + 1; i < traceSteps.length; i++) {
    const step = traceSteps[i];
    if (step && bpSet.has(step.line)) {
      return i;
    }
  }

  return null;
}

/**
 * Finds the previous step index matching an active breakpoint.
 * 
 * @param {Array<object>} traceSteps 
 * @param {number} currentIndex 
 * @param {Set<number> | Array<number>} breakpoints 
 * @returns {number | null} Previous matching step index or null
 */
export function findPrevBreakpoint(traceSteps = [], currentIndex = 0, breakpoints = new Set()) {
  if (!Array.isArray(traceSteps) || traceSteps.length === 0) return null;
  const bpSet = breakpoints instanceof Set ? breakpoints : new Set(breakpoints || []);
  if (bpSet.size === 0) return null;

  for (let i = currentIndex - 1; i >= 0; i--) {
    const step = traceSteps[i];
    if (step && bpSet.has(step.line)) {
      return i;
    }
  }

  return null;
}

/**
 * Analyzes whether the current step is part of a repeated loop or recursive construct,
 * returning iteration details and sibling iteration step indices.
 * 
 * @param {Array<object>} traceSteps 
 * @param {number} currentIndex 
 * @returns {{ isLoop: boolean, currentIteration: number, totalIterations: number, prevStepIndex: number | null, nextStepIndex: number | null }}
 */
export function getLoopIterationInfo(traceSteps = [], currentIndex = 0) {
  const defaultResult = {
    isLoop: false,
    currentIteration: 1,
    totalIterations: 1,
    prevStepIndex: null,
    nextStepIndex: null
  };

  if (!Array.isArray(traceSteps) || traceSteps.length === 0) return defaultResult;
  const targetStep = traceSteps[currentIndex];
  if (!targetStep || !targetStep.line) return defaultResult;

  const targetLine = targetStep.line;
  const matchingIndices = [];

  for (let i = 0; i < traceSteps.length; i++) {
    if (traceSteps[i].line === targetLine) {
      matchingIndices.push(i);
    }
  }

  const totalIterations = matchingIndices.length;
  if (totalIterations <= 1) {
    return defaultResult;
  }

  const currentPos = matchingIndices.indexOf(currentIndex);
  const currentIteration = currentPos >= 0 ? currentPos + 1 : 1;
  const prevStepIndex = currentPos > 0 ? matchingIndices[currentPos - 1] : null;
  const nextStepIndex = currentPos < matchingIndices.length - 1 ? matchingIndices[currentPos + 1] : null;

  return {
    isLoop: true,
    currentIteration,
    totalIterations,
    prevStepIndex,
    nextStepIndex
  };
}

/**
 * Token-compact trace compression engine for on-device Chrome Gemini Nano & Mobile AI.
 * Aggregates repetitive loops, tracks variable lifecycle mutations, and condenses
 * hundreds of trace steps into a dense, prompt-optimized summary (~150-250 tokens).
 * 
 * @param {Array<object>} traceSteps - Array of raw execution steps
 * @param {number} [activeStepIndex=-1] - Currently selected scrubber step
 * @param {object} [options={}]
 * @returns {{ summaryText: string, totalSteps: number, loopCount: number, variables: Record<string, any>, crashStep?: object | null }}
 */
export function compressTraceForAI(traceSteps = [], activeStepIndex = -1, options = {}) {
  if (!Array.isArray(traceSteps) || traceSteps.length === 0) {
    return {
      summaryText: 'No execution steps recorded.',
      totalSteps: 0,
      loopCount: 0,
      variables: {},
      crashStep: null
    };
  }

  const totalSteps = traceSteps.length;
  const boundedActiveIndex = activeStepIndex >= 0 ? Math.min(activeStepIndex, totalSteps - 1) : totalSteps - 1;
  const relevantSteps = traceSteps.slice(0, boundedActiveIndex + 1);

  // 1. Variable Evolution Tracking (initial value -> key mutations -> final value)
  const varMap = {};
  for (let i = 0; i < relevantSteps.length; i++) {
    const step = relevantSteps[i];
    const locals = step.locals || {};
    for (const [key, data] of Object.entries(locals)) {
      if (key.startsWith('__')) continue;
      const valStr = data?.value ?? String(data);
      if (!varMap[key]) {
        varMap[key] = {
          initial: valStr,
          type: data?.type || 'unknown',
          mutations: [valStr],
          current: valStr
        };
      } else {
        const lastVal = varMap[key].current;
        if (lastVal !== valStr) {
          if (varMap[key].mutations.length < 6) {
            varMap[key].mutations.push(valStr);
          }
          varMap[key].current = valStr;
        }
      }
    }
  }

  // 2. Loop & Run Sequence Aggregation
  // Compress repeating line patterns: [line 4, 5, 4, 5, 4, 5] -> "Lines 4-5 looped 3x"
  const aggregatedEvents = [];
  let i = 0;
  let detectedLoops = 0;

  while (i < relevantSteps.length) {
    const step = relevantSteps[i];

    // Check for 1-line loop (e.g. while or list comprehension on same line)
    let singleLineRun = 1;
    while (i + singleLineRun < relevantSteps.length && relevantSteps[i + singleLineRun].line === step.line) {
      singleLineRun++;
    }

    if (singleLineRun >= 3) {
      detectedLoops++;
      aggregatedEvents.push(`Line ${step.line} executed ${singleLineRun} times consecutively (latest: \`${step.snippet || ''}\`)`);
      i += singleLineRun;
      continue;
    }

    // Check for 2 to 4 line loop patterns
    let foundPattern = false;
    for (let patternLen = 2; patternLen <= 4; patternLen++) {
      if (i + patternLen * 2 <= relevantSteps.length) {
        const pattern = relevantSteps.slice(i, i + patternLen).map(s => s.line);
        let repeatCount = 1;

        while (i + (repeatCount + 1) * patternLen <= relevantSteps.length) {
          const nextSlice = relevantSteps.slice(i + repeatCount * patternLen, i + (repeatCount + 1) * patternLen).map(s => s.line);
          const matches = pattern.every((pLine, idx) => pLine === nextSlice[idx]);
          if (matches) {
            repeatCount++;
          } else {
            break;
          }
        }

        if (repeatCount >= 2) {
          detectedLoops++;
          const minLine = Math.min(...pattern);
          const maxLine = Math.max(...pattern);
          aggregatedEvents.push(`Lines ${minLine}-${maxLine} loop repeated ${repeatCount} iterations`);
          i += repeatCount * patternLen;
          foundPattern = true;
          break;
        }
      }
    }

    if (!foundPattern) {
      if (step.event === 'exception' || step.exception) {
        aggregatedEvents.push(`CRASH on Line ${step.line}: Raised ${step.exception?.type || 'Exception'}: ${step.exception?.msg || ''}`);
      } else if (step.event === 'return') {
        aggregatedEvents.push(`Return on Line ${step.line} from ${step.func || 'function'}`);
      } else if (aggregatedEvents.length < 12) {
        aggregatedEvents.push(`Line ${step.line}: \`${step.snippet || ''}\``);
      }
      i++;
    }
  }

  // 3. Detect Crash / Exception in trace
  const crashStep = traceSteps.find(s => s.event === 'exception' || Boolean(s.exception));

  // 4. Synthesize Compact Tokenized Output
  const summaryLines = [
    `Execution Trace (${totalSteps} total steps, inspected at step ${boundedActiveIndex + 1}):`,
    ''
  ];

  summaryLines.push('Variables Lifecycle:');
  const varEntries = Object.entries(varMap);
  if (varEntries.length === 0) {
    summaryLines.push('- (No local variables defined)');
  } else {
    for (const [name, meta] of varEntries) {
      if (meta.mutations.length > 1) {
        const chain = meta.mutations.slice(0, 4).join(' -> ') + (meta.mutations.length > 4 ? ` ... -> ${meta.current}` : '');
        summaryLines.push(`- ${name} (${meta.type}): ${chain}`);
      } else {
        summaryLines.push(`- ${name} (${meta.type}): ${meta.current}`);
      }
    }
  }

  summaryLines.push('');
  summaryLines.push('Execution Flow Highlights:');
  const trimmedEvents = aggregatedEvents.slice(-10); // Keep most recent 10 events to remain hyper token-compact
  for (const evt of trimmedEvents) {
    summaryLines.push(`- ${evt}`);
  }

  if (crashStep) {
    summaryLines.push('');
    summaryLines.push(`Exception Point (Step ${crashStep.step}, Line ${crashStep.line}): ${crashStep.exception?.type}: ${crashStep.exception?.msg}`);
  }

  const latestStdout = relevantSteps[relevantSteps.length - 1]?.stdout?.trim();
  if (latestStdout) {
    summaryLines.push('');
    summaryLines.push(`Accumulated Stdout: "${latestStdout.length > 80 ? latestStdout.slice(0, 77) + '...' : latestStdout}"`);
  }

  return {
    summaryText: summaryLines.join('\n'),
    totalSteps,
    loopCount: detectedLoops,
    variables: varMap,
    crashStep: crashStep || null
  };
}
