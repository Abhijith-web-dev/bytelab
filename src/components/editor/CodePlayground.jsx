import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Terminal,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Copy,
  Check,
  X,
  Trash2,
  Cpu,
  Sparkles,
  HelpCircle,
  Bug,
  CornerDownRight,
  Lightbulb,
  ArrowRight,
  SkipBack,
  SkipForward
} from 'lucide-react';
import { Button } from '../ui/Button.jsx';
import { Badge } from '../ui/Badge.jsx';
import { usePastePrevention } from '../../hooks/usePastePrevention.js';
import { parsePythonError } from '../../utils/pythonErrorFormatter.js';
import { extractSymbols } from '../../utils/pythonSymbolAnalyzer.js';
import { computeOutputDiff } from '../../utils/outputDiff.js';
import { analyzePythonCode } from '../../utils/pythonStaticAnalyzer.js';
import { pythonRuntime } from '../../runtimes/python/pythonRuntime.js';
import {
  diffStepVariables,
  getStepSummary,
  clampStepIndex,
  formatInlineVariableAnnotation,
  findNextBreakpoint,
  findPrevBreakpoint,
  getLoopIterationInfo,
  compressTraceForAI
} from '../../utils/traceExecutionHelper.js';
import {
  generateSocraticHint,
  checkGeminiNanoCapability,
  generateTraceStepInsight,
  generatePracticeLogicHint
} from '../../services/ai/geminiNanoService.js';

export function CodePlayground({
  code,
  onChange,
  onRun,
  onReset,
  language = 'python',
  executionState = 'IDLE',
  stdout = '',
  stderr = '',
  runtimeError = null,
  executionTimeMs = 0,
  testCaseResults = [],
  preventPaste = true,
  height = '400px',
  readOnly = false,
  problemTitle = '',
  problemDescription = ''
}) {
  const [activeTab, setActiveTab] = useState('output'); // 'output' | 'tests' | 'diagnostics' | 'variables'
  const [showRawTraceback, setShowRawTraceback] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dismissedWidget, setDismissedWidget] = useState(false);
  const { handleEditorDidMount: pasteMountHandler } = usePastePrevention(preventPaste);

  // Time-Travel Visual Execution Debugger State
  const [isDebugging, setIsDebugging] = useState(false);
  const [isTracing, setIsTracing] = useState(false);
  const [traceSteps, setTraceSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1); // 0.5x, 1x, 2x
  const [traceError, setTraceError] = useState(null);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Program Input (stdin) State
  const [showStdinDrawer, setShowStdinDrawer] = useState(false);
  const [customStdin, setCustomStdin] = useState('');

  // Gutter Breakpoints State
  const [breakpoints, setBreakpoints] = useState(() => new Set());

  // Step AI Insight State
  const [stepInsight, setStepInsight] = useState(null);
  const [stepInsightLoading, setStepInsightLoading] = useState(false);
  const [showStepInsight, setShowStepInsight] = useState(false);
  const [stepInsightLevel, setStepInsightLevel] = useState(1);

  // Test Case AI Logic Hints State
  const [testLogicHints, setTestLogicHints] = useState({});

  // Chrome Built-in AI (Gemini Nano) Socratic Hint State
  const [nanoCapability, setNanoCapability] = useState({ available: 'no', status: 'unavailable', model: 'none' });
  const [activeAiHint, setActiveAiHint] = useState(null);
  const [aiHintLoading, setAiHintLoading] = useState(false);
  const [aiHintLevel, setAiHintLevel] = useState(1);

  useEffect(() => {
    checkGeminiNanoCapability().then(setNanoCapability);
  }, []);

  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const decorationsRef = useRef([]);
  const contentWidgetRef = useRef(null);

  // Derive parsedError: prefer stderr parsing, but if runtimeError object is passed, use it as rich source
  let parsedError = stderr ? parsePythonError(stderr, code) : null;
  if (!parsedError && runtimeError && runtimeError.line) {
    parsedError = {
      errorType: runtimeError.error_type || 'RuntimeError',
      errorMessage: runtimeError.error_msg || 'Execution exception occurred',
      lineNumber: runtimeError.line,
      codeSnippet: runtimeError.snippet || '',
      pointerLine: runtimeError.column ? ' '.repeat(Math.max(0, runtimeError.column - 1)) + '^' : '',
      humanExplanation: `${runtimeError.error_type || 'RuntimeError'}: ${runtimeError.error_msg || ''}`,
      suggestedFix: 'Review the line of code and check variables.',
      didYouMean: null,
      stackFrames: runtimeError.frames || [],
      crashFrame: runtimeError.frames?.[runtimeError.frames.length - 1] || null,
      originFrame: runtimeError.frames?.length > 1 ? runtimeError.frames[0] : null,
      rawTraceback: stderr || ''
    };
  } else if (parsedError && runtimeError && runtimeError.line) {
    parsedError.lineNumber = runtimeError.line;
    if (runtimeError.snippet) parsedError.codeSnippet = runtimeError.snippet;
    if (runtimeError.frames && runtimeError.frames.length > 0) {
      parsedError.stackFrames = runtimeError.frames;
    }
  }

  const activeStep = isDebugging && traceSteps.length > 0 ? traceSteps[currentStepIndex] : null;
  const previousStep = isDebugging && currentStepIndex > 0 ? traceSteps[currentStepIndex - 1] : null;
  const stepDiffs = activeStep ? diffStepVariables(activeStep.locals, previousStep?.locals) : [];
  const loopInfo = getLoopIterationInfo(traceSteps, currentStepIndex);
  const crashStepIndex = traceSteps.findIndex(s => s.event === 'exception' || Boolean(s.exception));

  const handleExecuteCode = () => {
    if (executionState === 'RUNNING' || !onRun) return;

    // 1. Capture the immediate, modified code directly from Monaco model buffer
    const latestCode = editorRef.current ? editorRef.current.getValue() : code;

    // 2. Synchronize to parent component immediately
    if (onChange && latestCode !== code) {
      onChange(latestCode);
    }

    // 3. Clear Monaco error markers and visual line decorations immediately
    if (editorRef.current && monacoRef.current) {
      const model = editorRef.current.getModel();
      if (model) {
        monacoRef.current.editor.setModelMarkers(model, 'python-error', []);
      }
      decorationsRef.current = editorRef.current.deltaDecorations(decorationsRef.current, []);
    }

    // 4. Clean up inline error widget and AI state
    removeContentWidget();
    setDismissedWidget(true);
    setActiveAiHint(null);
    setAiHintLoading(false);
    setIsDebugging(false);
    setIsPlaying(false);

    // 5. Run the modified code with customStdin
    onRun(latestCode, customStdin);
  };

  const handleEditorMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    pasteMountHandler(editor, monaco);

    // Register Ctrl+Enter / Cmd+Enter shortcut to execute modified code instantly
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      handleExecuteCode();
    });

    // Interactive Gutter Breakpoint Toggle
    editor.onMouseDown((e) => {
      if (e.target.type === monaco.editor.MouseTargetType.GUTTER_GLYPH_MARGIN) {
        const line = e.target.position?.lineNumber;
        if (line) {
          setBreakpoints((prev) => {
            const next = new Set(prev);
            if (next.has(line)) {
              next.delete(line);
            } else {
              next.add(line);
            }
            return next;
          });
        }
      }
    });
  };

  const removeContentWidget = () => {
    if (contentWidgetRef.current && editorRef.current) {
      try {
        editorRef.current.removeContentWidget(contentWidgetRef.current);
      } catch (e) {
        // ignore
      }
      contentWidgetRef.current = null;
    }
  };

  // Reset widget dismissal and exit debug when running anew
  useEffect(() => {
    if (executionState === 'RUNNING') {
      setIsDebugging(false);
      setIsPlaying(false);
      setDismissedWidget(false);
      setActiveAiHint(null);
      setAiHintLoading(false);
      setAiHintLevel(1);
      removeContentWidget();
    }
  }, [executionState]);

  const handleRequestAiHint = async (level = 1) => {
    if (!parsedError) return;
    setAiHintLoading(true);
    setAiHintLevel(level);
    try {
      const latestCode = editorRef.current ? editorRef.current.getValue() : code;
      const res = await generateSocraticHint({
        errorType: parsedError.errorType,
        errorMessage: parsedError.errorMessage,
        lineNumber: parsedError.lineNumber || 1,
        codeSnippet: parsedError.codeSnippet || '',
        fullCode: latestCode,
        hintLevel: level
      });
      setActiveAiHint(res);
      return res;
    } catch (err) {
      console.warn('[AI Hint] Failed to fetch AI hint:', err);
      return null;
    } finally {
      setAiHintLoading(false);
    }
  };

  // Auto-play timer for stepping forward automatically
  useEffect(() => {
    if (!isDebugging || !isPlaying || traceSteps.length === 0) return;

    const intervalMs = Math.max(200, Math.round(750 / playbackSpeed));
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev >= traceSteps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isDebugging, isPlaying, playbackSpeed, traceSteps.length]);

  // Unified Monaco Decorations Effect (Breakpoints + Debug Step + Ghost Variables + Error Lines)
  useEffect(() => {
    if (!editorRef.current || !monacoRef.current) return;
    const model = editorRef.current.getModel();
    if (!model) return;

    const decorations = [];

    if (isDebugging && traceSteps.length > 0) {
      if (activeStep && activeStep.line) {
        const stepLine = Math.max(1, Math.min(activeStep.line, model.getLineCount()));
        const lineContent = model.getLineContent(stepLine) || '';
        const endCol = Math.max(lineContent.length + 1, 2);

        editorRef.current.revealLineInCenter(stepLine);

        const isExceptionStep = activeStep.event === 'exception' || Boolean(activeStep.exception);
        const hasBreakpointOnThisLine = breakpoints.has(stepLine);

        decorations.push({
          range: new monacoRef.current.Range(stepLine, 1, stepLine, endCol),
          options: {
            isWholeLine: true,
            className: isExceptionStep ? 'monaco-error-line' : 'monaco-debug-step-line',
            marginClassName: isExceptionStep ? 'monaco-error-line' : 'monaco-debug-step-line',
            inlineClassName: isExceptionStep ? 'monaco-error-inline' : 'monaco-debug-step-inline',
            glyphMarginClassName: isExceptionStep
              ? 'monaco-error-glyph'
              : hasBreakpointOnThisLine
              ? 'monaco-breakpoint-step-glyph'
              : 'monaco-debug-step-glyph',
            overviewRuler: {
              color: isExceptionStep ? '#ef4444' : '#06b6d4',
              position: monacoRef.current?.editor?.OverviewRulerLane?.Right ?? 4
            },
            hoverMessage: {
              value: isExceptionStep
                ? `**Line ${stepLine} (Exception)**: ${activeStep.exception?.type || 'Error'}: ${activeStep.exception?.msg || ''}`
                : `**Step ${activeStep.step} of ${traceSteps.length} (Line ${stepLine})**\n\n\`${activeStep.snippet || lineContent}\``
            }
          }
        });

        // Inline Ghost Variable Annotation (sleek cyan pill)
        const ghostText = formatInlineVariableAnnotation(stepDiffs, 48);
        if (ghostText) {
          decorations.push({
            range: new monacoRef.current.Range(stepLine, endCol, stepLine, endCol),
            options: {
              after: {
                content: ` // ${ghostText}`,
                inlineClassName: 'monaco-inline-var-annotation'
              }
            }
          });
        }
      }
    } else if (parsedError && parsedError.lineNumber) {
      const crashLine = Math.max(1, Math.min(parsedError.lineNumber, model.getLineCount()));
      const crashLineContent = model.getLineContent(crashLine) || '';
      const endCol = Math.max(crashLineContent.length + 1, 2);

      editorRef.current.revealLineInCenter(crashLine);

      decorations.push({
        range: new monacoRef.current.Range(crashLine, 1, crashLine, endCol),
        options: {
          isWholeLine: true,
          className: 'monaco-error-line',
          marginClassName: 'monaco-error-line',
          inlineClassName: 'monaco-error-inline',
          glyphMarginClassName: 'monaco-error-glyph',
          overviewRuler: {
            color: '#ef4444',
            position: monacoRef.current?.editor?.OverviewRulerLane?.Right ?? 4
          },
          hoverMessage: { value: `**${parsedError.errorType}**: ${parsedError.errorMessage}\n\n*${parsedError.humanExplanation}*` }
        }
      });

      if (parsedError.originFrame && parsedError.originFrame.line !== crashLine) {
        const originLine = Math.max(1, Math.min(parsedError.originFrame.line, model.getLineCount()));
        const originLineContent = model.getLineContent(originLine) || '';
        decorations.push({
          range: new monacoRef.current.Range(originLine, 1, originLine, Math.max(originLineContent.length + 1, 2)),
          options: {
            isWholeLine: true,
            className: 'monaco-origin-line',
            marginClassName: 'monaco-origin-line',
            inlineClassName: 'monaco-origin-inline',
            glyphMarginClassName: 'monaco-origin-glyph',
            overviewRuler: {
              color: '#f59e0b',
              position: monacoRef.current?.editor?.OverviewRulerLane?.Right ?? 4
            },
            hoverMessage: { value: `**Call Origin**: Triggered here from \`${parsedError.originFrame.funcName}\`` }
          }
        });
      }
    }

    // Render breakpoints on all other lines
    const activeStepLine = isDebugging && activeStep?.line;
    for (const bpLine of breakpoints) {
      if (bpLine <= model.getLineCount() && bpLine !== activeStepLine) {
        decorations.push({
          range: new monacoRef.current.Range(bpLine, 1, bpLine, 1),
          options: {
            glyphMarginClassName: 'monaco-breakpoint-glyph',
            glyphMarginHoverMessage: { value: `**Breakpoint** at line ${bpLine} (click gutter to toggle)` }
          }
        });
      }
    }

    decorationsRef.current = editorRef.current.deltaDecorations(decorationsRef.current, decorations);
  }, [isDebugging, currentStepIndex, traceSteps, breakpoints, parsedError, stepDiffs, activeStep]);

  // Set Monaco error markers & visual line highlight decorations whenever an error occurs
  useEffect(() => {
    if (isDebugging) return; // Debug step decorations take priority during visual debugging
    if (editorRef.current && monacoRef.current) {
      const model = editorRef.current.getModel();
      if (!model) return;

      const markers = [];
      const newDecorations = [];

      removeContentWidget();

      if (parsedError && parsedError.lineNumber) {
        const crashLine = Math.max(1, Math.min(parsedError.lineNumber, model.getLineCount()));
        const crashLineContent = model.getLineContent(crashLine) || '';
        const endCol = Math.max(crashLineContent.length + 1, 2);

        // Auto-center editor view onto the error line immediately
        editorRef.current.revealLineInCenter(crashLine);

        // Monaco Squiggly Marker
        markers.push({
          startLineNumber: crashLine,
          startColumn: 1,
          endLineNumber: crashLine,
          endColumn: endCol,
          message: `${parsedError.errorType}: ${parsedError.errorMessage}`,
          severity: monacoRef.current.MarkerSeverity.Error
        });

        // Crash Line Full Highlight (Red) - using reliable global CSS classes
        newDecorations.push({
          range: new monacoRef.current.Range(crashLine, 1, crashLine, endCol),
          options: {
            isWholeLine: true,
            className: 'monaco-error-line',
            marginClassName: 'monaco-error-line',
            inlineClassName: 'monaco-error-inline',
            glyphMarginClassName: 'monaco-error-glyph',
            overviewRuler: {
              color: '#ef4444',
              position: monacoRef.current?.editor?.OverviewRulerLane?.Right ?? 4
            },
            hoverMessage: { value: `**${parsedError.errorType}**: ${parsedError.errorMessage}\n\n*${parsedError.humanExplanation}*` }
          }
        });

        // Call Origin Line Highlight (Yellow/Amber) if different from crash line
        if (parsedError.originFrame && parsedError.originFrame.line !== crashLine) {
          const originLine = Math.max(1, Math.min(parsedError.originFrame.line, model.getLineCount()));
          const originLineContent = model.getLineContent(originLine) || '';
          newDecorations.push({
            range: new monacoRef.current.Range(originLine, 1, originLine, Math.max(originLineContent.length + 1, 2)),
            options: {
              isWholeLine: true,
              className: 'monaco-origin-line',
              marginClassName: 'monaco-origin-line',
              inlineClassName: 'monaco-origin-inline',
              glyphMarginClassName: 'monaco-origin-glyph',
              overviewRuler: {
                color: '#f59e0b',
                position: monacoRef.current?.editor?.OverviewRulerLane?.Right ?? 4
              },
              hoverMessage: { value: `**Call Origin**: Triggered here from \`${parsedError.originFrame.funcName}\`` }
            }
          });
        }

        // Inline Error Content Widget
        if (!dismissedWidget) {
          const domNode = document.createElement('div');
          domNode.className = 'monaco-inline-error-widget';
          domNode.style.display = 'flex';
          domNode.style.flexDirection = 'column';
          domNode.style.gap = '6px';

          const headerRow = document.createElement('div');
          headerRow.style.display = 'flex';
          headerRow.style.alignItems = 'center';
          headerRow.style.justifyContent = 'space-between';
          headerRow.style.gap = '10px';
          headerRow.style.width = '100%';

          const contentDiv = document.createElement('div');
          contentDiv.style.display = 'flex';
          contentDiv.style.alignItems = 'center';
          contentDiv.style.gap = '8px';
          contentDiv.style.flexWrap = 'wrap';

          const badge = document.createElement('span');
          badge.style.background = '#ef4444';
          badge.style.color = '#ffffff';
          badge.style.fontWeight = 'bold';
          badge.style.fontSize = '11px';
          badge.style.padding = '2px 6px';
          badge.style.borderRadius = '4px';
          badge.style.fontFamily = 'monospace';
          badge.textContent = parsedError.errorType;

          const msg = document.createElement('span');
          msg.style.color = '#7f1d1d';
          msg.style.fontWeight = '500';
          msg.style.fontSize = '12px';
          msg.textContent = parsedError.errorMessage || 'Runtime error';

          contentDiv.appendChild(badge);
          contentDiv.appendChild(msg);

          if (parsedError.didYouMean) {
            const didYouMeanSpan = document.createElement('span');
            didYouMeanSpan.style.background = '#fef3c7';
            didYouMeanSpan.style.color = '#92400e';
            didYouMeanSpan.style.padding = '1px 6px';
            didYouMeanSpan.style.borderRadius = '4px';
            didYouMeanSpan.style.fontSize = '11px';
            didYouMeanSpan.innerHTML = `Did you mean: <b>${parsedError.didYouMean}</b>?`;
            contentDiv.appendChild(didYouMeanSpan);
          }

          const actionDiv = document.createElement('div');
          actionDiv.style.display = 'flex';
          actionDiv.style.alignItems = 'center';
          actionDiv.style.gap = '6px';

          // On-device Gemini Nano / Socratic Fix Hint Button
          const hintBtn = document.createElement('button');
          hintBtn.className = 'monaco-ai-hint-btn';
          hintBtn.title = 'Get on-device Socratic AI guidance (no code spoilers)';
          hintBtn.innerHTML = '<span>✨</span><span>Fix Hint</span>';

          let hintDrawer = null;
          let currentHintLvl = 1;

          hintBtn.onclick = async (e) => {
            e.stopPropagation();
            if (hintDrawer && hintDrawer.style.display !== 'none') {
              hintDrawer.style.display = 'none';
              hintBtn.innerHTML = '<span>✨</span><span>Fix Hint</span>';
              try { editorRef.current?.layoutContentWidget(widget); } catch (_) {}
              return;
            }

            if (!hintDrawer) {
              hintDrawer = document.createElement('div');
              hintDrawer.className = 'monaco-inline-ai-hint-drawer';
              domNode.appendChild(hintDrawer);
            }

            hintDrawer.style.display = 'block';
            hintBtn.innerHTML = '<span>✨</span><span>Hide Hint</span>';
            hintDrawer.innerHTML = `
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:5px;">
                <span style="font-size:11px;font-weight:700;color:#c2410c;display:flex;align-items:center;gap:4px;">
                  ✨ AI Socratic Hint (${nanoCapability.status === 'available' ? 'Gemini Nano On-Device' : 'ByteLab Mentor'}) • Clue ${currentHintLvl}/3
                </span>
                <span style="font-size:10px;color:#9a3412;font-style:italic;">Thinking...</span>
              </div>
              <div style="font-size:12px;color:#78716c;font-style:italic;">
                Analyzing error pattern...
              </div>
            `;
            try { editorRef.current?.layoutContentWidget(widget); } catch (_) {}

            const latestCode = editorRef.current ? editorRef.current.getValue() : code;
            const res = await generateSocraticHint({
              errorType: parsedError.errorType,
              errorMessage: parsedError.errorMessage,
              lineNumber: crashLine,
              codeSnippet: crashLineContent,
              fullCode: latestCode,
              hintLevel: currentHintLvl
            });

            setActiveAiHint(res);
            setAiHintLevel(currentHintLvl);

            if (hintDrawer && hintDrawer.style.display !== 'none') {
              hintDrawer.innerHTML = `
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
                  <span style="font-size:11px;font-weight:700;color:#c2410c;display:flex;align-items:center;gap:4px;">
                    ✨ AI Socratic Diagnosis (${res.source === 'gemini-nano' ? 'Gemini Nano On-Device' : 'ByteLab Mentor'}) • Clue ${res.level}/3
                  </span>
                  <span style="font-size:10px;color:#15803d;font-weight:600;background:#dcfce7;padding:1px 6px;border-radius:4px;">
                    No Code Spoilers
                  </span>
                </div>
                ${res.diagnosis ? `
                  <div style="font-size:11.5px;color:#9a3412;background:#ffedd5;padding:5px 8px;border-radius:5px;margin-bottom:6px;line-height:1.4;">
                    <b>Diagnosis:</b> ${res.diagnosis}
                  </div>
                ` : ''}
                <div style="font-size:12px;color:#292524;line-height:1.45;margin-bottom:6px;">
                  <b>💡 Clue ${res.level}/3:</b> ${res.hint}
                </div>
                ${res.fixIdea ? `
                  <div style="font-size:11.5px;color:#1e3a8a;background:#eff6ff;border-left:3px solid #3b82f6;padding:5px 8px;border-radius:0 5px 5px 0;margin-bottom:8px;line-height:1.4;">
                    <b>🛠️ Update Idea:</b> ${res.fixIdea}
                  </div>
                ` : ''}
                <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;padding-top:6px;border-top:1px solid #fed7aa;flex-wrap:wrap;">
                  <div style="display:flex;align-items:center;gap:6px;">
                    <button id="btn-next-clue" style="background:#ffedd5;color:#9a3412;border:1px solid #fdba74;font-size:10px;font-weight:600;padding:2px 8px;border-radius:4px;cursor:pointer;">
                      ${res.level < 3 ? '🔄 Next Clue' : '🔄 Restart Clues'}
                    </button>
                    <button id="btn-drawer-run" style="background:#15803d;color:#ffffff;border:none;font-size:10px;font-weight:600;padding:2px 8px;border-radius:4px;cursor:pointer;display:inline-flex;align-items:center;gap:3px;">
                      <span>▶</span><span>Run Fix</span>
                    </button>
                  </div>
                  <button id="btn-open-diag" style="background:transparent;color:#ea580c;border:none;font-size:10px;font-weight:600;cursor:pointer;text-decoration:underline;">
                    Open Diagnostics Tab →
                  </button>
                </div>
              `;

              const nextBtn = hintDrawer.querySelector('#btn-next-clue');
              if (nextBtn) {
                nextBtn.onclick = (ev) => {
                  ev.stopPropagation();
                  currentHintLvl = currentHintLvl >= 3 ? 1 : currentHintLvl + 1;
                  hintBtn.click();
                  hintBtn.click();
                };
              }

              const drawerRun = hintDrawer.querySelector('#btn-drawer-run');
              if (drawerRun) {
                drawerRun.onclick = (ev) => {
                  ev.stopPropagation();
                  handleExecuteCode();
                };
              }

              const diagBtn = hintDrawer.querySelector('#btn-open-diag');
              if (diagBtn) {
                diagBtn.onclick = (ev) => {
                  ev.stopPropagation();
                  setActiveTab('diagnostics');
                };
              }

              try { editorRef.current?.layoutContentWidget(widget); } catch (_) {}
            }
          };

          const runFixBtn = document.createElement('button');
          runFixBtn.style.background = '#15803d';
          runFixBtn.style.color = '#ffffff';
          runFixBtn.style.border = '1px solid #166534';
          runFixBtn.style.padding = '2px 8px';
          runFixBtn.style.borderRadius = '4px';
          runFixBtn.style.fontSize = '11px';
          runFixBtn.style.fontWeight = '600';
          runFixBtn.style.cursor = 'pointer';
          runFixBtn.style.display = 'inline-flex';
          runFixBtn.style.alignItems = 'center';
          runFixBtn.style.gap = '3px';
          runFixBtn.title = 'Run modified code immediately (Ctrl+Enter)';
          runFixBtn.innerHTML = '<span>▶</span><span>Run Fix</span>';
          runFixBtn.onclick = (e) => {
            e.stopPropagation();
            handleExecuteCode();
          };

          const fixBtn = document.createElement('button');
          fixBtn.style.background = '#fee2e2';
          fixBtn.style.color = '#991b1b';
          fixBtn.style.border = '1px solid #fca5a5';
          fixBtn.style.padding = '2px 8px';
          fixBtn.style.borderRadius = '4px';
          fixBtn.style.fontSize = '11px';
          fixBtn.style.fontWeight = '600';
          fixBtn.style.cursor = 'pointer';
          fixBtn.textContent = 'View Trace';
          fixBtn.onclick = (e) => {
            e.stopPropagation();
            setActiveTab('diagnostics');
          };

          const closeBtn = document.createElement('button');
          closeBtn.style.background = 'transparent';
          closeBtn.style.color = '#991b1b';
          closeBtn.style.border = 'none';
          closeBtn.style.fontSize = '15px';
          closeBtn.style.fontWeight = 'bold';
          closeBtn.style.cursor = 'pointer';
          closeBtn.style.padding = '0 4px';
          closeBtn.style.lineHeight = '1';
          closeBtn.innerHTML = '&times;';
          closeBtn.onclick = (e) => {
            e.stopPropagation();
            removeContentWidget();
            setDismissedWidget(true);
          };

          actionDiv.appendChild(hintBtn);
          actionDiv.appendChild(runFixBtn);
          actionDiv.appendChild(fixBtn);
          actionDiv.appendChild(closeBtn);

          headerRow.appendChild(contentDiv);
          headerRow.appendChild(actionDiv);
          domNode.appendChild(headerRow);

          const widget = {
            getId: () => 'python.inline.error.widget',
            getDomNode: () => domNode,
            getPosition: () => ({
              position: {
                lineNumber: crashLine,
                column: 1
              },
              preference: [
                monacoRef.current.editor.ContentWidgetPositionPreference.BELOW
              ]
            })
          };

          try {
            editorRef.current.addContentWidget(widget);
            contentWidgetRef.current = widget;
          } catch (e) {
            // Widget might already exist
          }
        }
      }

      monacoRef.current.editor.setModelMarkers(model, 'python-error', markers);
    }

    return () => {
      removeContentWidget();
    };
  }, [stderr, runtimeError, dismissedWidget, isDebugging]);

  // Live Pre-Run Static Code Analysis + Instant Real Python Compile Check
  useEffect(() => {
    if (!editorRef.current || !monacoRef.current) return;
    const model = editorRef.current.getModel();
    if (!model) return;

    if (parsedError && parsedError.lineNumber) {
      // Clear static warnings when runtime error is active so student focuses on crash
      monacoRef.current.editor.setModelMarkers(model, 'python-static-analysis', []);
      return;
    }

    const timer = setTimeout(async () => {
      // 1. Fast heuristic static analysis
      const warnings = analyzePythonCode(code);
      const staticMarkers = warnings.map(w => ({
        startLineNumber: w.line,
        startColumn: w.column || 1,
        endLineNumber: w.line,
        endColumn: w.endColumn || (model.getLineContent(w.line)?.length + 1) || 2,
        message: w.message,
        severity: w.severity === 'info' 
          ? monacoRef.current.MarkerSeverity.Info 
          : monacoRef.current.MarkerSeverity.Warning
      }));

      // 2. Real Python compilation syntax check
      if (language === 'python' && pythonRuntime && pythonRuntime.isWorkerReady) {
        try {
          const syntaxCheck = await pythonRuntime.checkSyntax(code);
          if (syntaxCheck && !syntaxCheck.valid && syntaxCheck.line) {
            const sLine = Math.max(1, Math.min(syntaxCheck.line, model.getLineCount()));
            const sLineContent = model.getLineContent(sLine) || '';
            staticMarkers.unshift({
              startLineNumber: sLine,
              startColumn: syntaxCheck.column || 1,
              endLineNumber: sLine,
              endColumn: Math.max(sLineContent.length + 1, (syntaxCheck.column || 1) + 1),
              message: `Syntax Error: ${syntaxCheck.message}`,
              severity: monacoRef.current.MarkerSeverity.Error
            });
          }
        } catch (e) {
          // ignore
        }
      }

      monacoRef.current.editor.setModelMarkers(model, 'python-static-analysis', staticMarkers);
    }, 250);

    return () => clearTimeout(timer);
  }, [code, parsedError, language]);

  // Auto-switch tabs based on results
  useEffect(() => {
    if (executionState === 'RUNNING') return;
    
    if (parsedError) {
      setActiveTab('diagnostics');
    } else if (testCaseResults && testCaseResults.length > 0) {
      setActiveTab('tests');
    } else {
      setActiveTab('output');
    }
  }, [executionState, parsedError, testCaseResults]);

  // Jump editor cursor directly to the error line
  const handleJumpToErrorLine = (lineNum) => {
    if (editorRef.current && lineNum) {
      editorRef.current.revealLineInCenter(lineNum);
      editorRef.current.setPosition({ lineNumber: lineNum, column: 1 });
      editorRef.current.focus();
    }
  };

  const handleCopyOutput = () => {
    const textToCopy = stderr ? stderr : stdout;
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Time-Travel Debugger Actions
  const handleStartDebug = async (overrideCode = null, overrideStdin = null) => {
    if (language !== 'python') return;
    setIsTracing(true);
    setTraceError(null);
    setIsPlaying(false);
    setShowStepInsight(false);
    setStepInsight(null);

    try {
      const codeToRun = (typeof overrideCode === 'string') ? overrideCode : (editorRef.current ? editorRef.current.getValue() : code);
      const effectiveStdin = (typeof overrideStdin === 'string') ? overrideStdin : customStdin;
      const traceResult = await pythonRuntime.traceExecution({
        sourceCode: codeToRun,
        stdin: effectiveStdin || '',
        maxSteps: 300
      });

      if (traceResult.steps && traceResult.steps.length > 0) {
        setTraceSteps(traceResult.steps);
        setCurrentStepIndex(0);
        setIsDebugging(true);
        setActiveTab('variables');
        if (traceResult.error) {
          setTraceError(traceResult.error);
        }
      } else if (traceResult.status === 'syntax_error') {
        setIsDebugging(false);
        setTraceError(traceResult.error);
        setActiveTab('diagnostics');
      } else {
        setIsDebugging(false);
        if (traceResult.stderr) {
          setTraceError({ error_type: 'ExecutionError', error_msg: traceResult.stderr });
        }
      }
    } catch (err) {
      console.error('Debug trace error:', err);
      setIsDebugging(false);
      setTraceError({ error_type: 'DebugError', error_msg: err.message });
    } finally {
      setIsTracing(false);
    }
  };

  const handleStopDebug = () => {
    setIsDebugging(false);
    setIsPlaying(false);
    setTraceSteps([]);
    setCurrentStepIndex(0);
    setShowStepInsight(false);
    setStepInsight(null);
    if (editorRef.current) {
      decorationsRef.current = editorRef.current.deltaDecorations(decorationsRef.current, []);
    }
  };

  const handleResetClick = () => {
    // 1. Terminate any active debugger session and auto-playback
    handleStopDebug();
    setBreakpoints(new Set());
    setStepInsight(null);
    setShowStepInsight(false);
    setTestLogicHints({});
    setCustomStdin('');
    setShowStdinDrawer(false);

    // 2. Clear all Monaco markers and visual line decorations
    if (editorRef.current && monacoRef.current) {
      const model = editorRef.current.getModel();
      if (model) {
        monacoRef.current.editor.setModelMarkers(model, 'python-error', []);
        monacoRef.current.editor.setModelMarkers(model, 'python-static-analysis', []);
      }
      decorationsRef.current = editorRef.current.deltaDecorations(decorationsRef.current, []);
    }

    // 3. Remove inline error widget and reset dismissal & AI hints
    removeContentWidget();
    setDismissedWidget(false);
    setActiveAiHint(null);
    setAiHintLevel(1);

    // 4. Reset active tab back to terminal output
    setActiveTab('output');

    // 5. Brief visual confirmation
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 1500);

    // 6. Invoke parent onReset to restore starter template & clear localStorage draft
    if (onReset) {
      onReset();
    }
  };

  // 60fps responsive scrubber navigation with Haptic feedback on breakpoints
  const navigateToStep = (newIndex) => {
    const targetIndex = clampStepIndex(newIndex, traceSteps.length);
    const targetStep = traceSteps[targetIndex];

    // Haptic feedback when landing on or crossing a breakpoint
    if (targetStep && breakpoints.has(targetStep.line)) {
      if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
        try {
          navigator.vibrate(15);
        } catch (_) {}
      }
    }

    React.startTransition(() => {
      setCurrentStepIndex(targetIndex);
    });
  };

  const handleFirstStep = () => {
    setIsPlaying(false);
    navigateToStep(0);
  };

  const handlePrevStep = () => {
    setIsPlaying(false);
    navigateToStep(currentStepIndex - 1);
  };

  const handleTogglePlay = () => {
    if (currentStepIndex >= traceSteps.length - 1) {
      navigateToStep(0);
      setIsPlaying(true);
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  const handleNextStep = () => {
    setIsPlaying(false);
    navigateToStep(currentStepIndex + 1);
  };

  const handleLastStep = () => {
    setIsPlaying(false);
    navigateToStep(traceSteps.length - 1);
  };

  const handleSeekStep = (index) => {
    setIsPlaying(false);
    navigateToStep(index);
  };

  const handlePrevBreakpoint = () => {
    setIsPlaying(false);
    const prevBp = findPrevBreakpoint(traceSteps, currentStepIndex, breakpoints);
    if (prevBp !== null) {
      navigateToStep(prevBp);
    }
  };

  const handleNextBreakpoint = () => {
    setIsPlaying(false);
    const nextBp = findNextBreakpoint(traceSteps, currentStepIndex, breakpoints);
    if (nextBp !== null) {
      navigateToStep(nextBp);
    }
  };

  const handlePrevIteration = () => {
    setIsPlaying(false);
    if (loopInfo.prevStepIndex !== null) {
      navigateToStep(loopInfo.prevStepIndex);
    }
  };

  const handleNextIteration = () => {
    setIsPlaying(false);
    if (loopInfo.nextStepIndex !== null) {
      navigateToStep(loopInfo.nextStepIndex);
    }
  };

  const handleJumpToCrash = () => {
    setIsPlaying(false);
    if (crashStepIndex !== -1) {
      navigateToStep(crashStepIndex);
    }
  };

  const handleRequestStepInsight = async (lvl = 1) => {
    if (!activeStep) return;
    setStepInsightLoading(true);
    setShowStepInsight(true);
    setStepInsightLevel(lvl);
    try {
      const res = await generateTraceStepInsight({
        step: activeStep,
        prevStep: previousStep,
        diffs: stepDiffs,
        fullCode: code,
        hintLevel: lvl
      });
      setStepInsight(res);
    } catch (err) {
      console.warn('Step insight failed:', err);
    } finally {
      setStepInsightLoading(false);
    }
  };

  const handleDebugTestCase = async (tc) => {
    if (!tc) return;
    const currentCode = editorRef.current ? editorRef.current.getValue() : code;
    const codeToRun = tc.setupCode ? `${tc.setupCode}\n${currentCode}` : currentCode;
    await handleStartDebug(codeToRun, tc.input || '');
  };

  const handleRequestTestLogicHint = async (tc, lvl = 1) => {
    const tcKey = tc.id ?? tc.description ?? `tc_${Math.random()}`;
    setTestLogicHints(prev => ({
      ...prev,
      [tcKey]: { loading: true, data: prev[tcKey]?.data || null }
    }));

    try {
      const currentCode = editorRef.current ? editorRef.current.getValue() : code;
      const res = await generatePracticeLogicHint({
        problemTitle,
        problemDescription,
        code: currentCode,
        testCase: tc,
        expectedOutput: tc.expectedOutput,
        actualOutput: tc.actualOutput,
        hintLevel: lvl
      });
      setTestLogicHints(prev => ({
        ...prev,
        [tcKey]: { loading: false, data: res, level: lvl }
      }));
    } catch (err) {
      console.warn('Test logic hint failed:', err);
      setTestLogicHints(prev => ({
        ...prev,
        [tcKey]: { loading: false, error: err.message }
      }));
    }
  };

  const getStatusBadge = () => {
    if (isDebugging) {
      return (
        <div className="flex items-center gap-1.5 text-cyan-700 text-[12px] font-medium">
          <Bug className="w-3.5 h-3.5 text-cyan-600" />
          <span>Debugger Step {currentStepIndex + 1}/{traceSteps.length}</span>
        </div>
      );
    }
    switch (executionState) {
      case 'RUNNING':
        return (
          <div className="flex items-center gap-1.5 text-blue-600 text-[12px] font-medium animate-pulse">
            <Clock className="w-3.5 h-3.5" />
            <span>Running in WebAssembly...</span>
          </div>
        );
      case 'PASSED':
        return (
          <div className="flex items-center gap-1.5 text-emerald-600 text-[12px] font-medium">
            <CheckCircle2 className="w-4 h-4" />
            <span>Executed Successfully ({executionTimeMs}ms)</span>
          </div>
        );
      case 'FAILED':
        return (
          <div className="flex items-center gap-1.5 text-red-600 text-[12px] font-medium">
            <XCircle className="w-4 h-4" />
            <span>Test Assertion Failed ({executionTimeMs}ms)</span>
          </div>
        );
      case 'SYNTAX_ERROR':
        return (
          <div className="flex items-center gap-1.5 text-amber-600 text-[12px] font-medium">
            <AlertTriangle className="w-4 h-4" />
            <span>Syntax Error Detected</span>
          </div>
        );
      case 'RUNTIME_ERROR':
        return (
          <div className="flex items-center gap-1.5 text-red-600 text-[12px] font-medium">
            <Bug className="w-4 h-4" />
            <span>Runtime Exception</span>
          </div>
        );
      case 'TIMEOUT':
        return (
          <div className="flex items-center gap-1.5 text-amber-600 text-[12px] font-medium">
            <Clock className="w-4 h-4" />
            <span>Execution Timed Out</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1.5 text-[#737373] text-[12px]">
            <Cpu className="w-3.5 h-3.5" />
            <span>Pyodide 3.11 Sandbox</span>
          </div>
        );
    }
  };

  return (
    <div className="rounded-[14px] sm:rounded-[18px] bg-white border border-[#d9d9dd] overflow-hidden flex flex-col shadow-xs">
      {/* Editor Top Bar with macOS Traffic Lights & Actions */}
      <div className="px-3.5 sm:px-4 py-2.5 bg-[#eeece7]/40 border-b border-[#d9d9dd] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          {/* macOS Traffic Lights */}
          <div className="hidden xs:flex items-center gap-1.5 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>

          <span className="text-[12px] sm:text-[13px] font-mono font-medium text-[#17171c] truncate">main.py</span>

          {preventPaste && (
            <Badge variant="stone" className="text-[10px] hidden sm:inline-flex px-2 py-0.2 shrink-0">
              Typing Active
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {onReset && (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleResetClick}
              disabled={executionState === 'RUNNING'}
              title="Reset to starter code template & clear cache"
              className="py-1 px-2.5 sm:px-3 text-[12px] min-h-[30px] active:scale-95 transition-all"
            >
              <RotateCcw className={`w-3.5 h-3.5 transition-transform duration-300 ${resetSuccess ? 'text-emerald-600 rotate-[-180deg]' : ''}`} />
              <span className="hidden sm:inline">{resetSuccess ? 'Reset!' : 'Reset'}</span>
            </Button>
          )}

          {language === 'python' && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowStdinDrawer(prev => !prev)}
              disabled={executionState === 'RUNNING'}
              title="Configure standard input (stdin) for input() calls"
              className={`py-1 px-2.5 sm:px-3 text-[12px] min-h-[30px] border transition-all active:scale-95 ${
                showStdinDrawer
                  ? 'bg-[#17171c] text-white border-[#17171c]'
                  : customStdin.trim()
                  ? 'border-indigo-400 bg-indigo-50/70 text-indigo-700'
                  : 'hover:border-gray-400'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Input</span>
              {customStdin.trim() && (
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
              )}
            </Button>
          )}

          {language === 'python' && (
            <Button
              variant={isDebugging ? 'primary' : 'secondary'}
              size="sm"
              onClick={isDebugging ? handleStopDebug : handleStartDebug}
              disabled={executionState === 'RUNNING' || isTracing}
              className={`py-1 px-2.5 sm:px-3 text-[12px] min-h-[30px] border transition-all active:scale-95 ${
                isDebugging
                  ? 'bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-700 shadow-xs'
                  : 'hover:border-cyan-500 hover:text-cyan-700'
              }`}
              title="Step-by-step visual execution debugger"
            >
              {isTracing ? (
                <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin mr-1" />
              ) : (
                <Bug className={`w-3.5 h-3.5 ${isDebugging ? 'text-white' : 'text-cyan-600'}`} />
              )}
              <span>{isTracing ? 'Tracing...' : isDebugging ? 'Exit Debug' : 'Debug'}</span>
            </Button>
          )}

          {onRun && (
            <Button
              variant="primary"
              size="sm"
              onClick={handleExecuteCode}
              disabled={executionState === 'RUNNING'}
              className="py-1 px-3.5 sm:px-4 text-[12px] min-h-[30px] active:scale-95"
            >
              {executionState === 'RUNNING' ? (
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-1" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current" />
              )}
              <span>{executionState === 'RUNNING' ? 'Running...' : 'Run Code'}</span>
            </Button>
          )}
        </div>
      </div>

      {/* Custom Stdin Drawer */}
      {showStdinDrawer && (
        <div className="px-3.5 sm:px-4 py-2.5 bg-[#fbfbfa] border-b border-[#d9d9dd] animate-in slide-in-from-top-1 duration-150">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2 text-[12px] font-medium text-[#17171c]">
              <Terminal className="w-3.5 h-3.5 text-indigo-600" />
              <span>Program Input (stdin)</span>
              <span className="text-[11px] text-[#737373] font-normal">
                (Feeds Python <code className="text-indigo-600 bg-indigo-50 px-1 py-0.5 rounded text-[10.5px]">input()</code> calls line-by-line)
              </span>
            </div>
            <div className="flex items-center gap-2">
              {customStdin && (
                <button
                  type="button"
                  onClick={() => setCustomStdin('')}
                  className="text-[11px] text-gray-500 hover:text-red-600 cursor-pointer transition-colors"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowStdinDrawer(false)}
                className="text-gray-400 hover:text-gray-700 text-[13px] leading-none cursor-pointer"
                title="Close Input Drawer"
              >
                ✕
              </button>
            </div>
          </div>
          <textarea
            value={customStdin}
            onChange={(e) => setCustomStdin(e.target.value)}
            placeholder="Enter input lines here (e.g. Alice&#10;25)..."
            rows={2}
            className="w-full text-[12px] font-mono p-2 rounded-lg border border-[#d9d9dd] bg-white text-[#17171c] focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 resize-y"
          />
        </div>
      )}

      {/* Monaco Code Editor Container */}
      <div className="relative border-b border-[#d9d9dd] bg-white">
        <Editor
          height={height}
          language={language}
          value={code}
          onChange={onChange}
          onMount={handleEditorMount}
          theme="vs-light"
          options={{
            minimap: { enabled: false },
            fontSize: 13.5,
            fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, Consolas, monospace",
            lineHeight: 21,
            readOnly,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            insertSpaces: true,
            wordWrap: 'on',
            padding: { top: 10, bottom: 10 },
            scrollbar: {
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8
            },
            glyphMargin: true,
            lineNumbersMinChars: 3
          }}
        />
      </div>

      {/* Time-Travel Debugger Scrubber Bar */}
      {isDebugging && traceSteps.length > 0 && (
        <div className="bg-[#0b121c] text-white border-b border-[#1f2937] p-3 sm:px-4 select-none animate-in fade-in duration-200">
          {/* Debugger Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-[#1f2937]/70 text-[12px]">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 text-[11px] font-mono font-medium">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                TIME-TRAVEL DEBUGGER
              </span>

              <span className="text-[12px] font-mono text-cyan-200 font-semibold">
                Step {currentStepIndex + 1} <span className="text-gray-400 font-normal">/ {traceSteps.length}</span>
              </span>

              {/* Loop Iteration Pill */}
              {loopInfo.isLoop && (
                <span className="px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800 text-[11px] font-mono font-semibold flex items-center gap-1">
                  <span>🔁 Iteration {loopInfo.currentIteration}/{loopInfo.totalIterations}</span>
                </span>
              )}

              {/* Breakpoints Pill */}
              {breakpoints.size > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-red-950/80 text-red-300 border border-red-800/80 text-[11px] font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span>{breakpoints.size} BP{breakpoints.size > 1 ? 's' : ''}</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-[12px] flex-wrap ml-auto">
              <div className="font-mono text-gray-300 truncate max-w-[240px] sm:max-w-[360px] bg-black/40 px-2.5 py-0.5 rounded border border-white/10 text-[11px]">
                {getStepSummary(activeStep)}
              </div>

              {/* Jump to Crash Button */}
              {crashStepIndex !== -1 && (
                <button
                  onClick={handleJumpToCrash}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-all active:scale-95 ${
                    currentStepIndex === crashStepIndex
                      ? 'bg-red-700 text-white border border-red-500'
                      : 'bg-red-600/30 hover:bg-red-600 text-red-200 hover:text-white border border-red-500/40'
                  }`}
                  title={`Jump to exception crash at Step ${crashStepIndex + 1}`}
                >
                  <span>🚨 Crash</span>
                  <span className="font-mono text-[10px] bg-black/30 px-1 rounded">L{traceSteps[crashStepIndex]?.line}</span>
                </button>
              )}

              {/* AI Step Insight Button */}
              <button
                onClick={() => {
                  if (!showStepInsight && !stepInsight) {
                    handleRequestStepInsight(1);
                  } else {
                    setShowStepInsight(!showStepInsight);
                  }
                }}
                className={`px-2.5 py-0.5 rounded text-[11px] font-medium flex items-center gap-1 transition-all cursor-pointer border ${
                  showStepInsight
                    ? 'bg-orange-600 text-white border-orange-500'
                    : 'bg-orange-950/50 text-orange-300 hover:bg-orange-900/60 border-orange-800'
                }`}
                title="Get Socratic reasoning for this execution step"
              >
                <span>✨</span>
                <span>{showStepInsight ? 'Hide Insight' : 'Step Insight'}</span>
              </button>

              <button
                onClick={handleStopDebug}
                className="text-gray-400 hover:text-white px-2 py-0.5 rounded hover:bg-white/10 text-[11px] transition-colors cursor-pointer"
                title="Exit Time-Travel Debugger"
              >
                Exit ✕
              </button>
            </div>
          </div>

          {/* Timeline Controls & Scrubber Slider */}
          <div className="pt-2.5 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* VCR Step Buttons & Breakpoint / Loop Navigation */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={handleFirstStep}
                disabled={currentStepIndex === 0}
                className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none text-gray-200 hover:text-white transition-colors cursor-pointer"
                title="Jump to Start (Step 1)"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={handlePrevStep}
                disabled={currentStepIndex === 0}
                className="px-2 py-1 rounded bg-white/5 hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none text-gray-200 hover:text-white transition-colors flex items-center gap-1 text-[12px] cursor-pointer"
                title="Step Backward (Previous Line)"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden xs:inline">Prev</span>
              </button>

              <button
                onClick={handleTogglePlay}
                className={`px-3 py-1 rounded font-medium transition-all flex items-center gap-1.5 text-[12px] cursor-pointer active:scale-95 ${
                  isPlaying
                    ? 'bg-amber-500 hover:bg-amber-600 text-black'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-black'
                }`}
                title={isPlaying ? 'Pause auto-play' : 'Play / Auto-advance through lines'}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Play</span>
                  </>
                )}
              </button>

              <button
                onClick={handleNextStep}
                disabled={currentStepIndex >= traceSteps.length - 1}
                className="px-2 py-1 rounded bg-white/5 hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none text-gray-200 hover:text-white transition-colors flex items-center gap-1 text-[12px] cursor-pointer"
                title="Step Forward (Next Line)"
              >
                <span className="hidden xs:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleLastStep}
                disabled={currentStepIndex >= traceSteps.length - 1}
                className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none text-gray-200 hover:text-white transition-colors cursor-pointer"
                title="Jump to End"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              {/* Breakpoint Navigation Jumps */}
              {breakpoints.size > 0 && (
                <div className="flex items-center gap-1 pl-1 ml-1 border-l border-white/10">
                  <button
                    onClick={handlePrevBreakpoint}
                    disabled={findPrevBreakpoint(traceSteps, currentStepIndex, breakpoints) === null}
                    className="px-1.5 py-0.5 rounded bg-red-950/60 hover:bg-red-900 text-red-300 disabled:opacity-25 disabled:pointer-events-none text-[11px] font-mono flex items-center gap-0.5 cursor-pointer border border-red-800/60"
                    title="Jump to Previous Breakpoint"
                  >
                    <span>⏮ BP</span>
                  </button>
                  <button
                    onClick={handleNextBreakpoint}
                    disabled={findNextBreakpoint(traceSteps, currentStepIndex, breakpoints) === null}
                    className="px-1.5 py-0.5 rounded bg-red-950/60 hover:bg-red-900 text-red-300 disabled:opacity-25 disabled:pointer-events-none text-[11px] font-mono flex items-center gap-0.5 cursor-pointer border border-red-800/60"
                    title="Jump to Next Breakpoint"
                  >
                    <span>⏭ BP</span>
                  </button>
                </div>
              )}

              {/* Loop Iteration Navigation Jumps */}
              {loopInfo.isLoop && (
                <div className="flex items-center gap-1 pl-1 ml-1 border-l border-white/10">
                  <button
                    onClick={handlePrevIteration}
                    disabled={loopInfo.prevStepIndex === null}
                    className="px-1.5 py-0.5 rounded bg-purple-950/60 hover:bg-purple-900 text-purple-300 disabled:opacity-25 disabled:pointer-events-none text-[11px] font-mono flex items-center gap-0.5 cursor-pointer border border-purple-800/60"
                    title="Jump to Previous Loop Iteration"
                  >
                    <span>⏮ Iter</span>
                  </button>
                  <button
                    onClick={handleNextIteration}
                    disabled={loopInfo.nextStepIndex === null}
                    className="px-1.5 py-0.5 rounded bg-purple-950/60 hover:bg-purple-900 text-purple-300 disabled:opacity-25 disabled:pointer-events-none text-[11px] font-mono flex items-center gap-0.5 cursor-pointer border border-purple-800/60"
                    title="Jump to Next Loop Iteration"
                  >
                    <span>⏭ Iter</span>
                  </button>
                </div>
              )}
            </div>

            {/* Scrubber Timeline Slider */}
            <div className="flex-1 w-full flex items-center gap-2.5 px-2">
              <input
                type="range"
                min="0"
                max={traceSteps.length - 1}
                value={currentStepIndex}
                onChange={(e) => handleSeekStep(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
              />
            </div>

            {/* Playback Speed Controls */}
            <div className="flex items-center gap-1 text-[11px] font-mono shrink-0">
              <span className="text-gray-400 mr-1 hidden sm:inline">Speed:</span>
              {[0.5, 1, 2].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setPlaybackSpeed(spd)}
                  className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                    playbackSpeed === spd
                      ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>

          {/* Socratic Step Insight Collapsible Card */}
          {showStepInsight && (
            <div className="mt-3 p-3.5 rounded-[10px] bg-[#131b26] border border-orange-500/40 text-[12px] space-y-2 animate-in fade-in duration-150">
              <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-orange-400 font-semibold flex items-center gap-1">
                    <span>✨</span>
                    <span>AI Step Insight</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-orange-950 text-orange-300 border border-orange-800">
                    Step {currentStepIndex + 1} (Line {activeStep?.line})
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {[1, 2, 3].map(lvl => (
                    <button
                      key={lvl}
                      onClick={() => handleRequestStepInsight(lvl)}
                      disabled={stepInsightLoading}
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold cursor-pointer transition-colors ${
                        stepInsightLevel === lvl && stepInsight
                          ? 'bg-orange-600 text-white'
                          : 'bg-white/10 hover:bg-white/20 text-gray-300'
                      }`}
                    >
                      Clue {lvl}
                    </button>
                  ))}
                  <button
                    onClick={() => setShowStepInsight(false)}
                    className="text-gray-400 hover:text-white px-1 cursor-pointer text-[12px] ml-2"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {stepInsightLoading ? (
                <div className="py-2 flex items-center gap-2 text-gray-400 italic">
                  <Sparkles className="w-3.5 h-3.5 text-orange-400 animate-spin" />
                  <span>Analyzing state delta for Step {currentStepIndex + 1}...</span>
                </div>
              ) : stepInsight ? (
                <div className="space-y-2 pt-1">
                  <div className="text-orange-200">
                    <b className="text-orange-400">Diagnosis:</b> {stepInsight.stepDiagnosis || stepInsight.diagnosis}
                  </div>
                  <div className="text-gray-200">
                    <b className="text-cyan-400">💡 Socratic Clue:</b> {stepInsight.hint}
                  </div>
                  {stepInsight.fixIdea && (
                    <div className="text-emerald-200 bg-emerald-950/40 border border-emerald-800/60 p-2 rounded">
                      <b className="text-emerald-400">🛠️ Action Idea:</b> {stepInsight.fixIdea}
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-1 text-gray-400 italic">
                  Click "Step Insight" to generate Socratic analysis for this step.
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Output Console Navigation & Metrics Header */}
      <div className="px-3 sm:px-4 py-2 bg-[#eeece7]/30 border-b border-[#d9d9dd] flex flex-wrap items-center justify-between gap-2 text-[12px]">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 touch-scroll max-w-full">
          <button
            onClick={() => setActiveTab('output')}
            className={`font-medium px-3 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1.5 text-[12px] shrink-0 active:scale-95 ${
              activeTab === 'output'
                ? 'bg-[#17171c] text-white shadow-xs'
                : 'text-[#75758a] hover:text-[#17171c] hover:bg-black/5'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Terminal</span>
            {parsedError && (
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            )}
          </button>

          {parsedError && (
            <button
              onClick={() => setActiveTab('diagnostics')}
              className={`font-medium px-3 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1.5 text-[12px] shrink-0 active:scale-95 ${
                activeTab === 'diagnostics'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-red-700 bg-red-50 hover:bg-red-100 border border-red-200'
              }`}
            >
              <Bug className="w-3.5 h-3.5" />
              <span>Diagnostics</span>
            </button>
          )}

          {testCaseResults.length > 0 && (
            <button
              onClick={() => setActiveTab('tests')}
              className={`font-medium px-3 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1.5 text-[12px] shrink-0 active:scale-95 ${
                activeTab === 'tests'
                  ? 'bg-[#17171c] text-white shadow-xs'
                  : 'text-[#75758a] hover:text-[#17171c] hover:bg-black/5'
              }`}
            >
              <span>Tests</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#d9d9dd] text-[#17171c] font-semibold">
                {testCaseResults.filter(t => t.passed).length}/{testCaseResults.length}
              </span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('variables')}
            className={`font-medium px-3 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1.5 text-[12px] shrink-0 active:scale-95 ${
              activeTab === 'variables'
                ? isDebugging ? 'bg-cyan-600 text-white shadow-xs' : 'bg-[#17171c] text-white shadow-xs'
                : isDebugging ? 'text-cyan-800 bg-cyan-50 hover:bg-cyan-100 border border-cyan-200' : 'text-[#75758a] hover:text-[#17171c] hover:bg-black/5'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>{isDebugging ? `Live Memory (${stepDiffs.length})` : `Variables (${extractSymbols(code).length})`}</span>
            {isDebugging && stepDiffs.some(d => d.status === 'changed' || d.status === 'new') && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 ml-auto sm:ml-0">
          {(stdout || stderr) && (
            <button
              onClick={handleCopyOutput}
              className="flex items-center gap-1 text-[11px] text-[#75758a] hover:text-[#17171c] transition-colors cursor-pointer bg-white px-2 py-0.5 rounded border border-[#d9d9dd]"
              title="Copy Terminal Output"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          )}

          <div>{getStatusBadge()}</div>
        </div>
      </div>

      {/* Output Content Area */}
      <div className="p-4 bg-[#fafafa] min-h-[150px] max-h-[300px] overflow-y-auto font-mono text-[13px]">
        {/* TAB 1: Terminal Output & Traceback */}
        {activeTab === 'output' && (
          <div className="space-y-3 font-sans">
            {/* Debugger Active Banner in Terminal */}
            {isDebugging && (
              <div className="p-3 bg-cyan-950 text-cyan-200 rounded-[8px] border border-cyan-800 text-[12px] flex items-center justify-between gap-2 shadow-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <Bug className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="truncate">
                    Time-Travel Debugger at <b>Step {currentStepIndex + 1} of {traceSteps.length}</b>.
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab('variables')}
                  className="px-2.5 py-1 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded text-[11px] cursor-pointer transition-colors shrink-0"
                >
                  Inspect Memory
                </button>
              </div>
            )}
            {/* Friendly Error Banner with Exact Line and Pointer */}
            {parsedError && (
              <div className="p-4 rounded-[10px] bg-red-50 border border-red-200 text-red-950 space-y-3 shadow-xs animate-in fade-in duration-150">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white font-mono text-[12px] font-bold">
                      {parsedError.errorType}
                    </span>
                    {parsedError.lineNumber && (
                      <button
                        onClick={() => handleJumpToErrorLine(parsedError.lineNumber)}
                        className="text-[12px] font-mono text-red-800 font-semibold bg-white hover:bg-red-100 border border-red-200 px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
                        title="Click to jump to crash line in editor"
                      >
                        <CornerDownRight className="w-3 h-3 text-red-600" />
                        <span>Line {parsedError.lineNumber}</span>
                      </button>
                    )}
                    {parsedError.originFrame && parsedError.originFrame.line !== parsedError.lineNumber && (
                      <button
                        onClick={() => handleJumpToErrorLine(parsedError.originFrame.line)}
                        className="text-[12px] font-mono text-amber-800 font-semibold bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
                        title="Click to jump to call origin in editor"
                      >
                        <ArrowRight className="w-3 h-3 text-amber-600" />
                        <span>Origin: Line {parsedError.originFrame.line}</span>
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => setActiveTab('diagnostics')}
                    className="text-[12px] text-red-700 font-semibold hover:underline flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-full border border-red-200"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                    <span>How to fix this?</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-[14px] font-semibold font-mono text-red-900 leading-snug">
                  {parsedError.errorMessage}
                </div>

                {parsedError.codeSnippet && (
                  <div className="p-3 bg-white rounded-[6px] border border-red-200 font-mono text-[12px] space-y-0.5">
                    <div className="text-[#737373] text-[10px] uppercase font-semibold">Error on Line {parsedError.lineNumber || '?'}:</div>
                    <div className="text-red-950 font-bold whitespace-pre-wrap">{parsedError.codeSnippet}</div>
                    {parsedError.pointerLine && (
                      <div className="text-red-600 font-bold leading-none">{parsedError.pointerLine}</div>
                    )}
                  </div>
                )}

                {parsedError.didYouMean && (
                  <div className="px-3 py-2 bg-amber-50 border border-amber-200 rounded-[6px] text-[12px] text-amber-900 flex items-center gap-2">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Did you mean <code className="font-mono font-bold bg-amber-100 px-1.5 py-0.5 rounded text-amber-950">{parsedError.didYouMean}</code>?</span>
                  </div>
                )}
              </div>
            )}

            {/* Custom Stdin Indicator if present */}
            {customStdin && (
              <div className="p-2 px-3 bg-indigo-50/60 rounded-[8px] border border-indigo-100 font-mono text-[11.5px] text-indigo-900 flex items-center gap-2">
                <span className="font-semibold font-sans text-indigo-700 flex items-center gap-1">
                  <Terminal className="w-3 h-3" />
                  <span>Provided Stdin:</span>
                </span>
                <span className="text-indigo-800 font-mono bg-white px-2 py-0.5 rounded border border-indigo-200 truncate">
                  {customStdin.replace(/\n/g, '\\n')}
                </span>
              </div>
            )}

            {/* Standard Output (stdout) */}
            {stdout && (
              <div className="p-3 bg-white rounded-[8px] border border-[#e5e5e5] font-mono text-[13px] text-[#000000] whitespace-pre-wrap leading-relaxed shadow-xs">
                {stdout}
              </div>
            )}

            {/* Fallback Idle State */}
            {!stdout && !stderr && (
              <div className="text-[#a3a3a3] italic py-5 text-center font-sans text-[13px]">
                Click "Run Code" to compile and execute in the WebAssembly sandbox.
              </div>
            )}

            {/* Low-Level Raw Traceback Accordion */}
            {stderr && (
              <div className="pt-2">
                <button
                  onClick={() => setShowRawTraceback(!showRawTraceback)}
                  className="text-[11px] text-[#737373] hover:text-black flex items-center gap-1 font-mono cursor-pointer"
                >
                  {showRawTraceback ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  <span>{showRawTraceback ? 'Hide Raw Traceback (stderr)' : 'Show Full Low-Level Traceback'}</span>
                </button>

                {showRawTraceback && (
                  <pre className="mt-2 p-3 bg-[#171717] text-red-400 text-[12px] rounded-[8px] font-mono overflow-x-auto leading-relaxed">
                    <code>{stderr}</code>
                  </pre>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Diagnostic Guidance & Automated Fix Suggestions */}
        {activeTab === 'diagnostics' && parsedError && (
          <div className="space-y-4 font-sans animate-in fade-in duration-150">
            <div className="p-4 rounded-[10px] bg-white border border-[#e5e5e5] space-y-3.5 shadow-xs">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-[13px]">
                    !
                  </div>
                  <div>
                    <h4 className="text-[15px] font-semibold text-black">
                      What caused this {parsedError.errorType}?
                    </h4>
                    <span className="text-[12px] text-[#737373]">
                      {parsedError.lineNumber ? `Occurred on Line ${parsedError.lineNumber}` : 'Runtime execution exception'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  {parsedError.lineNumber && (
                    <button
                      onClick={() => handleJumpToErrorLine(parsedError.lineNumber)}
                      className="text-[12px] font-medium bg-red-50 hover:bg-red-100 text-red-800 border border-red-200 px-2.5 py-1 rounded-full flex items-center gap-1 cursor-pointer transition-colors"
                      title="Jump to where exception crashed"
                    >
                      <CornerDownRight className="w-3 h-3 text-red-600" />
                      <span>Crash on Line {parsedError.lineNumber}</span>
                    </button>
                  )}

                  {parsedError.originFrame && parsedError.originFrame.line !== parsedError.lineNumber && (
                    <button
                      onClick={() => handleJumpToErrorLine(parsedError.originFrame.line)}
                      className="text-[12px] font-medium bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full flex items-center gap-1 cursor-pointer transition-colors"
                      title="Jump to where function was originally called"
                    >
                      <ArrowRight className="w-3 h-3 text-amber-600" />
                      <span>Call Origin: Line {parsedError.originFrame.line}</span>
                    </button>
                  )}
                </div>
              </div>

              {parsedError.didYouMean && (
                <div className="p-3 bg-amber-50/80 rounded-[8px] border border-amber-200 text-[13px] text-amber-950 flex items-center gap-2 font-medium">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    Likely typo detected: did you mean to use <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono font-bold">{parsedError.didYouMean}</code>?
                  </div>
                </div>
              )}

              {/* Interactive Call Stack & Execution Origin Trace */}
              {parsedError.stackFrames && parsedError.stackFrames.length > 0 && (
                <div className="rounded-[8px] border border-[#e5e7eb] bg-[#fafafa] overflow-hidden">
                  <div className="px-3.5 py-2 bg-[#f3f4f6] border-b border-[#e5e7eb] flex items-center justify-between">
                    <span className="text-[11px] font-semibold tracking-wider text-[#374151] uppercase flex items-center gap-1.5">
                      <Terminal className="w-3 h-3 text-[#4b5563]" />
                      Call Stack &amp; Execution Origin ({parsedError.stackFrames.length} frame{parsedError.stackFrames.length > 1 ? 's' : ''})
                    </span>
                    <span className="text-[10px] text-[#6b7280]">Click any frame to jump to code</span>
                  </div>
                  <div className="divide-y divide-[#e5e7eb]">
                    {parsedError.stackFrames.map((frame, idx) => {
                      const isCrash = idx === parsedError.stackFrames.length - 1;
                      const isOrigin = idx === 0 && parsedError.stackFrames.length > 1;

                      return (
                        <div
                          key={idx}
                          onClick={() => handleJumpToErrorLine(frame.line)}
                          className={`p-2.5 px-3.5 flex items-center justify-between gap-3 text-[12px] cursor-pointer transition-colors ${
                            isCrash
                              ? 'bg-red-50/60 hover:bg-red-50'
                              : isOrigin
                              ? 'bg-amber-50/60 hover:bg-amber-50'
                              : 'hover:bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="w-5 h-5 rounded-full bg-black/5 text-[#525252] text-[10px] font-mono flex items-center justify-center font-semibold shrink-0">
                              {idx + 1}
                            </span>
                            <span className="font-mono text-[#1f2937] font-medium truncate">
                              in {frame.funcName || '<module>'}
                            </span>
                            {frame.snippet && (
                              <code className="hidden sm:inline-block font-mono text-[11px] text-[#4b5563] bg-black/5 px-1.5 py-0.5 rounded truncate max-w-[220px]">
                                {frame.snippet}
                              </code>
                            )}
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {isCrash && (
                              <span className="text-[10px] font-semibold bg-red-100 text-red-700 px-2 py-0.5 rounded-full border border-red-200">
                                Crash Site
                              </span>
                            )}
                            {isOrigin && (
                              <span className="text-[10px] font-semibold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200">
                                Call Origin
                              </span>
                            )}
                            <span className="font-mono font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-0.5">
                              Line {frame.line}
                              <ChevronRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="p-3 bg-[#fafafa] rounded-[8px] border border-[#e5e5e5] text-[13px] text-[#525252] leading-relaxed">
                {parsedError.humanExplanation}
              </div>

              {/* AI Socratic Fix Hint (Gemini Nano) Card */}
              <div className="p-4 rounded-[10px] bg-gradient-to-r from-orange-50/70 via-amber-50/50 to-orange-50/70 border border-orange-200/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-[13px]">
                      💡
                    </div>
                    <div>
                      <h5 className="text-[14px] font-semibold text-[#1c1917] flex items-center gap-1.5">
                        <span>AI Socratic Fix Hint</span>
                        {nanoCapability.status === 'available' ? (
                          <span className="text-[10px] font-medium bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Gemini Nano (On-Device)
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full">
                            ByteLab Socratic Mentor
                          </span>
                        )}
                      </h5>
                      <p className="text-[11px] text-[#78716c]">
                        Guided hints to help you understand and solve the problem without giving away code.
                      </p>
                    </div>
                  </div>

                  {/* Progressive Hint Ladder Level Selector */}
                  <div className="flex items-center gap-1 bg-white/90 p-0.5 rounded-lg border border-orange-200 text-[11px]">
                    {[
                      { lvl: 1, label: '1. Concept' },
                      { lvl: 2, label: '2. Clue' },
                      { lvl: 3, label: '3. Rule' }
                    ].map(item => (
                      <button
                        key={item.lvl}
                        onClick={() => handleRequestAiHint(item.lvl)}
                        disabled={aiHintLoading}
                        className={`px-2.5 py-1 rounded-md font-medium cursor-pointer transition-all ${
                          aiHintLevel === item.lvl && activeAiHint
                            ? 'bg-orange-600 text-white shadow-xs'
                            : 'text-[#78716c] hover:text-[#1c1917] hover:bg-orange-100/50'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hint Content Area */}
                <div className="p-3 bg-white/95 rounded-[8px] border border-orange-200/70 text-[13px] text-[#292524] leading-relaxed">
                  {aiHintLoading ? (
                    <div className="flex items-center gap-2 text-[#78716c] italic text-[12px] py-1.5">
                      <Sparkles className="w-4 h-4 animate-spin text-orange-500" />
                      <span>{nanoCapability.status === 'available' ? 'Gemini Nano is analyzing your bug locally...' : 'Generating Socratic hint...'}</span>
                    </div>
                  ) : activeAiHint ? (
                    <div className="space-y-3">
                      {activeAiHint.diagnosis && (
                        <div className="p-3 bg-orange-100/70 rounded-[8px] border border-orange-200 text-[12.5px] text-orange-950 font-medium leading-relaxed">
                          <span className="font-bold text-orange-900 block mb-0.5 flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 text-orange-700" />
                            Mistake Diagnosis:
                          </span>
                          {activeAiHint.diagnosis}
                        </div>
                      )}

                      <div className="p-3 bg-white/90 rounded-[8px] border border-orange-100 text-[12.5px] text-[#292524] leading-relaxed">
                        <span className="font-bold text-stone-800 block mb-0.5 flex items-center gap-1.5">
                          <span>💡</span>
                          Socratic Clue ({activeAiHint.level}/3):
                        </span>
                        {activeAiHint.hint}
                      </div>

                      {activeAiHint.fixIdea && (
                        <div className="p-3 bg-blue-50/70 rounded-[8px] border-l-4 border-blue-500 text-[12.5px] text-blue-950 leading-relaxed">
                          <span className="font-bold text-blue-900 block mb-0.5 flex items-center gap-1.5">
                            <span>🛠️</span>
                            Actionable Updation Idea:
                          </span>
                          {activeAiHint.fixIdea}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t border-orange-200/60 text-[11px] text-[#78716c] flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handleExecuteCode}
                            disabled={executionState === 'RUNNING'}
                            className="text-[11.5px] font-semibold bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1 rounded-md cursor-pointer transition-colors shadow-xs flex items-center gap-1.5 active:scale-95"
                            title="Run modified code immediately (Ctrl+Enter)"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>Run Fix</span>
                          </button>
                          <span>• {activeAiHint.source === 'gemini-nano' ? 'Chrome Gemini Nano On-Device' : 'ByteLab Pedagogical Engine'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {activeAiHint.level < 3 ? (
                            <button
                              onClick={() => handleRequestAiHint(activeAiHint.level + 1)}
                              className="text-orange-700 font-semibold hover:text-orange-900 cursor-pointer underline"
                            >
                              Need another clue? →
                            </button>
                          ) : (
                            <button
                              onClick={() => handleRequestAiHint(1)}
                              className="text-orange-700 font-semibold hover:text-orange-900 cursor-pointer underline"
                            >
                              Restart Clues ↺
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between flex-wrap gap-2 py-1">
                      <span className="text-[#78716c] text-[12px]">
                        Need help understanding what caused this error without spoiling the solution?
                      </span>
                      <button
                        onClick={() => handleRequestAiHint(1)}
                        className="text-[12px] font-semibold bg-orange-600 hover:bg-orange-700 text-white px-3 py-1.5 rounded-md cursor-pointer transition-colors shadow-xs flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Get Socratic Fix Hint</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-3.5 bg-emerald-50 text-emerald-950 rounded-[8px] border border-emerald-200 text-[13px] space-y-1">
                <div className="font-semibold text-emerald-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 fill-current" />
                  <span>Recommended Fix:</span>
                </div>
                <div className="leading-relaxed">
                  {parsedError.suggestedFix}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Test Cases (Moodle CodeRunner Style with Output Diff Highlighter) */}
        {activeTab === 'tests' && testCaseResults && testCaseResults.length > 0 && (
          <div className="font-sans overflow-x-auto rounded-[8px] border border-[#e5e5e5] bg-white shadow-xs">
            <table className="w-full text-left text-[13px] border-collapse">
              <thead>
                <tr className="bg-[#f3f4f6] text-[#525252] border-b border-[#e5e5e5]">
                  <th className="py-2.5 px-4 font-semibold w-[12%] border-r border-[#e5e5e5]">Test</th>
                  <th className="py-2.5 px-4 font-semibold w-[22%] border-r border-[#e5e5e5]">Input</th>
                  <th className="py-2.5 px-4 font-semibold w-[28%] border-r border-[#e5e5e5]">Expected</th>
                  <th className="py-2.5 px-4 font-semibold w-[28%] border-r border-[#e5e5e5]">Got</th>
                  <th className="py-2.5 px-4 font-semibold text-center w-[10%]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e5e5]">
                {testCaseResults.map((tc, idx) => {
                  const diff = computeOutputDiff(tc.expectedOutput, tc.actualOutput);
                  const tcKey = tc.id ?? tc.description ?? `tc_${idx}`;
                  const hintState = testLogicHints[tcKey];

                  return (
                    <React.Fragment key={tc.id || idx}>
                      <tr className={!tc.passed ? 'bg-red-50/30' : 'bg-white'}>
                        <td className="py-3 px-4 font-medium text-[#111827] align-top border-r border-[#e5e5e5]">
                          Test {idx + 1}
                        </td>
                        <td className="py-3 px-4 font-mono text-[12px] align-top border-r border-[#e5e5e5] whitespace-pre-wrap text-[#374151]">
                          {tc.isHidden ? <span className="text-[#9ca3af] italic">Hidden Test</span> : (tc.input || '—')}
                        </td>
                        <td className="py-3 px-4 font-mono text-[12px] align-top border-r border-[#e5e5e5] whitespace-pre-wrap text-[#374151]">
                          {tc.isHidden ? <span className="text-[#9ca3af] italic">Hidden</span> : tc.expectedOutput}
                        </td>
                        <td className="py-3 px-4 font-mono text-[12px] align-top border-r border-[#e5e5e5] whitespace-pre-wrap">
                          <span className={tc.passed ? 'text-[#374151]' : 'text-red-700 font-semibold'}>
                            {tc.isHidden && tc.passed ? (
                              <span className="text-[#9ca3af] italic font-normal">Hidden</span>
                            ) : (
                              tc.actualOutput || '<No Output>'
                            )}
                          </span>

                          {!tc.passed && !tc.isHidden && diff.hasCaseMismatch && (
                            <div className="mt-1 text-[11px] font-sans font-normal text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block">
                              ⚠️ Case mismatch detected (e.g. upper vs lower case)
                            </div>
                          )}
                          {!tc.passed && !tc.isHidden && diff.hasTrailingSpaceMismatch && (
                            <div className="mt-1 text-[11px] font-sans font-normal text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block">
                              ⚠️ Trailing whitespace mismatch
                            </div>
                          )}
                          {!tc.passed && !tc.isHidden && diff.hasExtraPrefix && (
                            <div className="mt-1 text-[11px] font-sans font-normal text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block">
                              ⚠️ Output contains extra prefix text before expected answer (e.g. input prompt)
                            </div>
                          )}

                          {!tc.passed && (
                            <div className="mt-2.5 flex items-center gap-2 flex-wrap font-sans">
                              <button
                                onClick={() => handleDebugTestCase(tc)}
                                disabled={isTracing}
                                className="px-2.5 py-1 rounded bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border border-cyan-300 font-semibold text-[11px] flex items-center gap-1.5 cursor-pointer transition-colors active:scale-95 shadow-2xs"
                                title="Trace execution step-by-step for this failing test case"
                              >
                                <Bug className="w-3 h-3 text-cyan-600" />
                                <span>Debug Test Case</span>
                              </button>

                              <button
                                onClick={() => handleRequestTestLogicHint(tc, hintState?.level || 1)}
                                disabled={hintState?.loading}
                                className="px-2.5 py-1 rounded bg-orange-50 hover:bg-orange-100 text-orange-800 border border-orange-300 font-semibold text-[11px] flex items-center gap-1.5 cursor-pointer transition-colors active:scale-95 shadow-2xs"
                                title="Get on-device Socratic AI logic hint without code spoilers"
                              >
                                <Sparkles className="w-3 h-3 text-orange-600" />
                                <span>{hintState?.loading ? 'Thinking...' : 'AI Logic Hint'}</span>
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4 align-middle text-center">
                          <div className="flex justify-center">
                            {tc.passed ? (
                              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-600" title="Pass">
                                <Check className="w-4 h-4 stroke-[3]" />
                              </div>
                            ) : (
                              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-600" title="Fail">
                                <X className="w-4 h-4 stroke-[3]" />
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>

                      {/* Collapsible Socratic Logic Hint Card */}
                      {hintState?.data && (
                        <tr className="bg-orange-50/50">
                          <td colSpan={5} className="p-3.5 px-4 border-b border-[#e5e5e5]">
                            <div className="rounded-[8px] bg-white border border-orange-200 p-3 space-y-2 text-[12px] shadow-2xs">
                              <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-orange-100">
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-orange-900 flex items-center gap-1">
                                    <span>✨</span>
                                    <span>Socratic Logic Clue for Test {idx + 1}</span>
                                  </span>
                                  <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-orange-100 text-orange-800">
                                    {hintState.data.source === 'gemini-nano' ? 'Gemini Nano On-Device' : 'ByteLab Mentor'}
                                  </span>
                                </div>

                                <div className="flex items-center gap-1">
                                  {[1, 2, 3].map(lvl => (
                                    <button
                                      key={lvl}
                                      onClick={() => handleRequestTestLogicHint(tc, lvl)}
                                      disabled={hintState.loading}
                                      className={`px-2 py-0.5 rounded text-[10px] font-semibold cursor-pointer transition-colors ${
                                        (hintState.level || 1) === lvl
                                          ? 'bg-orange-600 text-white'
                                          : 'bg-orange-100/60 hover:bg-orange-100 text-orange-800'
                                      }`}
                                    >
                                      Clue {lvl}
                                    </button>
                                  ))}
                                  <button
                                    onClick={() => setTestLogicHints(prev => ({ ...prev, [tcKey]: null }))}
                                    className="text-stone-400 hover:text-stone-700 px-1 cursor-pointer text-[12px] ml-1"
                                  >
                                    ✕
                                  </button>
                                </div>
                              </div>

                              <div className="space-y-1.5 text-[#292524]">
                                {hintState.data.logicDiagnosis && (
                                  <div className="text-orange-950 font-medium">
                                    <b className="text-orange-800">Diagnosis:</b> {hintState.data.logicDiagnosis}
                                  </div>
                                )}
                                <div className="text-stone-800">
                                  <b className="text-cyan-700">💡 Clue:</b> {hintState.data.hint}
                                </div>
                                {hintState.data.fixIdea && (
                                  <div className="p-2 rounded bg-blue-50/70 border-l-3 border-blue-500 text-blue-950">
                                    <b className="text-blue-900">🛠️ Updation Idea:</b> {hintState.data.fixIdea}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
            {testCaseResults.every(tc => tc.passed) && (
              <div className="bg-[#a7f3d0] px-4 py-3 border-t border-[#34d399] flex items-center gap-2">
                <span className="text-emerald-900 font-semibold text-[13px]">Passed all tests!</span>
                <Check className="w-4 h-4 stroke-[3] text-emerald-700" />
              </div>
            )}
            {!testCaseResults.every(tc => tc.passed) && (
              <div className="bg-red-100 px-4 py-3 border-t border-red-200 flex items-center gap-2">
                <span className="text-red-900 font-semibold text-[13px]">Some tests failed. Keep trying!</span>
                <X className="w-4 h-4 stroke-[3] text-red-700" />
              </div>
            )}
          </div>
        )}

        {/* TAB 4: Variable Inspector (Symbol Table or Live Memory) */}
        {activeTab === 'variables' && (
          <div className="font-sans space-y-3">
            {isDebugging ? (
              <div className="space-y-3">
                {/* Step Context Banner */}
                <div className="p-3 bg-white rounded-[10px] border border-[#d9d9dd] shadow-xs flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 text-[11px] font-mono font-bold border border-cyan-300">
                      Step {currentStepIndex + 1} of {traceSteps.length}
                    </span>
                    {activeStep?.line && (
                      <button
                        onClick={() => handleJumpToErrorLine(activeStep.line)}
                        className="text-[12px] font-mono text-cyan-900 font-semibold bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
                        title="Focus active line in editor"
                      >
                        <CornerDownRight className="w-3 h-3 text-cyan-600" />
                        <span>Line {activeStep.line}</span>
                      </button>
                    )}
                    {loopInfo.isLoop && (
                      <span className="text-[11px] font-mono bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full font-semibold">
                        Iteration {loopInfo.currentIteration}/{loopInfo.totalIterations}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleRequestStepInsight(stepInsightLevel || 1)}
                      disabled={stepInsightLoading}
                      className="px-2 py-1 rounded bg-orange-50 hover:bg-orange-100 text-orange-800 border border-orange-200 text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                      title="Analyze this execution step with AI"
                    >
                      <Sparkles className="w-3 h-3 text-orange-600" />
                      <span>{stepInsightLoading ? 'Analyzing...' : 'AI Step Insight'}</span>
                    </button>
                    <div className="text-[12px] text-gray-600 font-mono">
                      {activeStep?.snippet ? <code>{activeStep.snippet}</code> : activeStep?.event}
                    </div>
                  </div>
                </div>

                {/* Exception Callout if active step raised an exception */}
                {activeStep?.exception && (
                  <div className="p-3 rounded-[8px] bg-red-50 border border-red-200 text-red-900 text-[12px] space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-red-700">
                      <Bug className="w-4 h-4" />
                      <span>Exception Raised at this step: {activeStep.exception.type}</span>
                    </div>
                    <div className="font-mono text-red-950 font-semibold">{activeStep.exception.msg}</div>
                  </div>
                )}

                {/* Variables Table */}
                {stepDiffs.length === 0 ? (
                  <div className="text-center py-6 text-[#737373] text-[13px] bg-white rounded-[8px] border border-[#e5e5e5]">
                    No local variables in memory yet at Step {currentStepIndex + 1}. Step forward to see variables defined!
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-[8px] border border-[#e5e5e5] bg-white shadow-xs">
                    <table className="w-full text-left text-[13px] border-collapse">
                      <thead>
                        <tr className="bg-[#f3f4f6] text-[#525252] border-b border-[#e5e5e5]">
                          <th className="py-2.5 px-4 font-semibold w-[28%] border-r border-[#e5e5e5]">Variable</th>
                          <th className="py-2.5 px-4 font-semibold w-[18%] border-r border-[#e5e5e5]">Type</th>
                          <th className="py-2.5 px-4 font-semibold w-[40%] border-r border-[#e5e5e5]">Value in Memory</th>
                          <th className="py-2.5 px-4 font-semibold text-center w-[14%]">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#e5e5e5]">
                        {stepDiffs.map((diff, idx) => (
                          <tr
                            key={idx}
                            className={`transition-colors ${
                              diff.status === 'changed'
                                ? 'bg-cyan-50/50 hover:bg-cyan-50 var-mutation-flash'
                                : diff.status === 'new'
                                ? 'bg-emerald-50/40 hover:bg-emerald-50'
                                : 'hover:bg-[#fafafa]'
                            }`}
                          >
                            <td className="py-2.5 px-4 font-mono font-semibold text-[#111827] border-r border-[#e5e5e5]">
                              <code>{diff.name}</code>
                            </td>
                            <td className="py-2.5 px-4 border-r border-[#e5e5e5]">
                              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-blue-50 text-blue-700 border border-blue-200">
                                {diff.type}
                              </span>
                            </td>
                            <td className="py-2.5 px-4 font-mono text-[12px] text-[#111827] border-r border-[#e5e5e5] break-all">
                              <span className="bg-black/5 px-1.5 py-0.5 rounded font-bold text-gray-900">
                                {diff.value}
                              </span>
                              {diff.status === 'changed' && diff.previousValue !== undefined && (
                                <span className="ml-2 text-[11px] text-gray-400 font-normal line-through">
                                  was: {diff.previousValue}
                                </span>
                              )}
                            </td>
                            <td className="py-2.5 px-4 text-center">
                              {diff.status === 'new' && (
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-100 text-emerald-800 border border-emerald-300">
                                  + NEW
                                </span>
                              )}
                              {diff.status === 'changed' && (
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-cyan-100 text-cyan-800 border border-cyan-300">
                                  ✎ UPDATED
                                </span>
                              )}
                              {diff.status === 'unchanged' && (
                                <span className="text-[11px] text-gray-400 font-mono">
                                  unchanged
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Cumulative Output at this step */}
                {activeStep?.stdout && (
                  <div className="p-3 bg-white rounded-[8px] border border-[#e5e5e5] font-mono text-[12px] shadow-xs">
                    <div className="text-[10px] text-gray-500 uppercase font-semibold mb-1 flex items-center gap-1.5">
                      <Terminal className="w-3 h-3 text-gray-500" />
                      <span>Console Output (at Step {currentStepIndex + 1}):</span>
                    </div>
                    <pre className="whitespace-pre-wrap text-black bg-[#fafafa] p-2 rounded border border-[#eaeaea]">{activeStep.stdout}</pre>
                  </div>
                )}
              </div>
            ) : (
              /* Static Symbol Table (non-debug mode) */
              extractSymbols(code).length === 0 ? (
                <div className="text-center py-6 text-[#737373] text-[13px] bg-white rounded-[8px] border border-[#e5e5e5]">
                  No variables or functions declared in your Python code yet.
                </div>
              ) : (
                <div className="overflow-x-auto rounded-[8px] border border-[#e5e5e5] bg-white shadow-xs">
                  <table className="w-full text-left text-[13px] border-collapse">
                    <thead>
                      <tr className="bg-[#f3f4f6] text-[#525252] border-b border-[#e5e5e5]">
                        <th className="py-2.5 px-4 font-semibold w-[35%] border-r border-[#e5e5e5]">Identifier</th>
                        <th className="py-2.5 px-4 font-semibold w-[25%] border-r border-[#e5e5e5]">Category</th>
                        <th className="py-2.5 px-4 font-semibold w-[20%] border-r border-[#e5e5e5]">Line</th>
                        <th className="py-2.5 px-4 font-semibold text-center w-[20%]">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e5e5e5]">
                      {extractSymbols(code).map((sym, idx) => (
                        <tr key={idx} className="hover:bg-[#fafafa]">
                          <td className="py-2.5 px-4 font-mono font-semibold text-[#111827] border-r border-[#e5e5e5]">
                            <code>{sym.name}</code>
                          </td>
                          <td className="py-2.5 px-4 border-r border-[#e5e5e5]">
                            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-blue-50 text-blue-700 border border-blue-200">
                              {sym.type}
                            </span>
                          </td>
                          <td className="py-2.5 px-4 font-mono text-[12px] text-[#525252] border-r border-[#e5e5e5]">
                            Line {sym.line}
                          </td>
                          <td className="py-2.5 px-4 text-center">
                            <button
                              onClick={() => handleJumpToErrorLine(sym.line)}
                              className="text-[11px] font-medium text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                            >
                              Jump to Line
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
