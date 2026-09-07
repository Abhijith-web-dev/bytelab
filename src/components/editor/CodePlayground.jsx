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
import { diffStepVariables, getStepSummary, clampStepIndex } from '../../utils/traceExecutionHelper.js';

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
  readOnly = false
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

  const handleEditorMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    pasteMountHandler(editor, monaco);
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
      removeContentWidget();
    }
  }, [executionState]);

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

  // Set Monaco step highlight and cyan arrow glyph for active trace step
  useEffect(() => {
    if (!editorRef.current || !monacoRef.current) return;
    const model = editorRef.current.getModel();
    if (!model) return;

    if (!isDebugging || traceSteps.length === 0) return;

    const activeStep = traceSteps[currentStepIndex];
    if (!activeStep || !activeStep.line) return;

    const stepLine = Math.max(1, Math.min(activeStep.line, model.getLineCount()));
    const lineContent = model.getLineContent(stepLine) || '';
    const endCol = Math.max(lineContent.length + 1, 2);

    editorRef.current.revealLineInCenter(stepLine);

    const isExceptionStep = activeStep.event === 'exception' || Boolean(activeStep.exception);

    const stepDecorations = [{
      range: new monacoRef.current.Range(stepLine, 1, stepLine, endCol),
      options: {
        isWholeLine: true,
        className: isExceptionStep ? 'monaco-error-line' : 'monaco-debug-step-line',
        marginClassName: isExceptionStep ? 'monaco-error-line' : 'monaco-debug-step-line',
        inlineClassName: isExceptionStep ? 'monaco-error-inline' : 'monaco-debug-step-inline',
        glyphMarginClassName: isExceptionStep ? 'monaco-error-glyph' : 'monaco-debug-step-glyph',
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
    }];

    decorationsRef.current = editorRef.current.deltaDecorations(decorationsRef.current, stepDecorations);
  }, [isDebugging, currentStepIndex, traceSteps]);

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
          domNode.style.alignItems = 'center';
          domNode.style.justifyContent = 'space-between';
          domNode.style.gap = '10px';

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

          const fixBtn = document.createElement('button');
          fixBtn.style.background = '#fee2e2';
          fixBtn.style.color = '#991b1b';
          fixBtn.style.border = '1px solid #fca5a5';
          fixBtn.style.padding = '2px 8px';
          fixBtn.style.borderRadius = '4px';
          fixBtn.style.fontSize = '11px';
          fixBtn.style.fontWeight = '600';
          fixBtn.style.cursor = 'pointer';
          fixBtn.textContent = 'View Fix';
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

          actionDiv.appendChild(fixBtn);
          actionDiv.appendChild(closeBtn);

          domNode.appendChild(contentDiv);
          domNode.appendChild(actionDiv);

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
      decorationsRef.current = editorRef.current.deltaDecorations(decorationsRef.current, newDecorations);
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
  const handleStartDebug = async () => {
    if (language !== 'python') return;
    setIsTracing(true);
    setTraceError(null);
    setIsPlaying(false);

    try {
      const traceResult = await pythonRuntime.traceExecution({
        sourceCode: code,
        stdin: '',
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
    if (editorRef.current) {
      decorationsRef.current = editorRef.current.deltaDecorations(decorationsRef.current, []);
    }
  };

  const handleResetClick = () => {
    // 1. Terminate any active debugger session and auto-playback
    handleStopDebug();

    // 2. Clear all Monaco markers and visual line decorations
    if (editorRef.current && monacoRef.current) {
      const model = editorRef.current.getModel();
      if (model) {
        monacoRef.current.editor.setModelMarkers(model, 'python-error', []);
        monacoRef.current.editor.setModelMarkers(model, 'python-static-analysis', []);
      }
      decorationsRef.current = editorRef.current.deltaDecorations(decorationsRef.current, []);
    }

    // 3. Remove inline error widget and reset dismissal
    removeContentWidget();
    setDismissedWidget(false);

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

  const handleFirstStep = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const handlePrevStep = () => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.max(0, prev - 1));
  };

  const handleTogglePlay = () => {
    if (currentStepIndex >= traceSteps.length - 1) {
      setCurrentStepIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  const handleNextStep = () => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.min(traceSteps.length - 1, prev + 1));
  };

  const handleLastStep = () => {
    setIsPlaying(false);
    setCurrentStepIndex(traceSteps.length - 1);
  };

  const handleSeekStep = (index) => {
    setIsPlaying(false);
    setCurrentStepIndex(clampStepIndex(index, traceSteps.length));
  };

  const activeStep = isDebugging && traceSteps.length > 0 ? traceSteps[currentStepIndex] : null;
  const previousStep = isDebugging && currentStepIndex > 0 ? traceSteps[currentStepIndex - 1] : null;
  const stepDiffs = activeStep ? diffStepVariables(activeStep.locals, previousStep?.locals) : [];

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
              onClick={onRun}
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
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 text-[11px] font-mono font-medium">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                TIME-TRAVEL DEBUGGER
              </span>
              <span className="text-[12px] font-mono text-cyan-200 font-semibold">
                Step {currentStepIndex + 1} <span className="text-gray-400 font-normal">/ {traceSteps.length}</span>
              </span>
            </div>

            <div className="flex items-center gap-2 text-[12px]">
              <div className="font-mono text-gray-300 truncate max-w-[280px] sm:max-w-[420px] bg-black/40 px-2.5 py-0.5 rounded border border-white/10 text-[11px]">
                {getStepSummary(activeStep)}
              </div>
              <button
                onClick={handleStopDebug}
                className="text-gray-400 hover:text-white px-2 py-0.5 rounded hover:bg-white/10 text-[11px] transition-colors cursor-pointer ml-auto"
                title="Exit Time-Travel Debugger"
              >
                Exit ✕
              </button>
            </div>
          </div>

          {/* Timeline Controls & Scrubber Slider */}
          <div className="pt-2.5 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* VCR Step Buttons */}
            <div className="flex items-center gap-1.5">
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
                  return (
                    <tr key={tc.id || idx} className={!tc.passed ? 'bg-red-50/30' : 'bg-white'}>
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
                  <div className="flex items-center gap-2">
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
                  </div>
                  <div className="text-[12px] text-gray-600 font-mono">
                    {activeStep?.snippet ? <code>{activeStep.snippet}</code> : activeStep?.event}
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
