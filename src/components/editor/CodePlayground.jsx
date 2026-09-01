import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Terminal,
  ChevronRight,
  ChevronDown,
  Copy,
  Check,
  Trash2,
  Cpu,
  Sparkles,
  HelpCircle,
  Bug,
  CornerDownRight,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { Button } from '../ui/Button.jsx';
import { Badge } from '../ui/Badge.jsx';
import { usePastePrevention } from '../../hooks/usePastePrevention.js';
import { parsePythonError } from '../../utils/pythonErrorFormatter.js';

export function CodePlayground({
  code,
  onChange,
  onRun,
  onReset,
  language = 'python',
  executionState = 'IDLE',
  stdout = '',
  stderr = '',
  executionTimeMs = 0,
  testCaseResults = [],
  preventPaste = true,
  height = '400px',
  readOnly = false
}) {
  const [activeTab, setActiveTab] = useState('output'); // 'output' | 'tests' | 'diagnostics'
  const [showRawTraceback, setShowRawTraceback] = useState(false);
  const [copied, setCopied] = useState(false);
  const { handleEditorDidMount: pasteMountHandler } = usePastePrevention(preventPaste);

  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  const parsedError = stderr ? parsePythonError(stderr, code) : null;

  const handleEditorMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    pasteMountHandler(editor, monaco);
  };

  // Set Monaco error markers whenever an error with line number occurs
  useEffect(() => {
    if (editorRef.current && monacoRef.current) {
      const model = editorRef.current.getModel();
      if (!model) return;

      if (parsedError && parsedError.lineNumber) {
        const line = Math.max(1, Math.min(parsedError.lineNumber, model.getLineCount()));
        const lineContent = model.getLineContent(line) || '';
        const endCol = Math.max(lineContent.length + 1, 2);

        monacoRef.current.editor.setModelMarkers(model, 'python-error', [
          {
            startLineNumber: line,
            startColumn: 1,
            endLineNumber: line,
            endColumn: endCol,
            message: `${parsedError.errorType}: ${parsedError.errorMessage}`,
            severity: monacoRef.current.MarkerSeverity.Error
          }
        ]);
      } else {
        monacoRef.current.editor.setModelMarkers(model, 'python-error', []);
      }
    }
  }, [stderr, parsedError]);

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

  const getStatusBadge = () => {
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
    <div className="rounded-[12px] bg-white border border-[#e5e5e5] overflow-hidden flex flex-col shadow-xs">
      {/* Editor Top Bar with macOS Traffic Lights */}
      <div className="px-4 py-2.5 bg-[#fafafa] border-b border-[#e5e5e5] flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* macOS Traffic Lights */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>

          <span className="text-[13px] font-mono text-[#525252]">main.py</span>

          {preventPaste && (
            <Badge variant="default" className="text-[10px] bg-white hidden sm:inline-flex">
              Active Typing Mode
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          {onReset && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onReset}
              disabled={executionState === 'RUNNING'}
              title="Reset Code Template"
              className="py-1 px-3"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
          )}

          {onRun && (
            <Button
              variant="primary"
              size="sm"
              onClick={onRun}
              disabled={executionState === 'RUNNING'}
              className="py-1 px-4"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{executionState === 'RUNNING' ? 'Running...' : 'Run Code'}</span>
            </Button>
          )}
        </div>
      </div>

      {/* Monaco Code Editor Container */}
      <div className="relative border-b border-[#e5e5e5]">
        <Editor
          height={height}
          language={language}
          value={code}
          onChange={onChange}
          onMount={handleEditorMount}
          theme="vs-light"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, Consolas, monospace",
            lineHeight: 22,
            readOnly,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            insertSpaces: true,
            padding: { top: 12, bottom: 12 },
            glyphMargin: true
          }}
        />
      </div>

      {/* Output Console Navigation & Metrics Header */}
      <div className="px-4 py-2 bg-[#fafafa] border-b border-[#e5e5e5] flex flex-wrap items-center justify-between gap-2 text-[12px]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('output')}
            className={`font-medium px-3 py-1 rounded-full transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'output'
                ? 'bg-black text-white'
                : 'text-[#737373] hover:text-black'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Terminal Output</span>
            {parsedError && (
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            )}
          </button>

          {parsedError && (
            <button
              onClick={() => setActiveTab('diagnostics')}
              className={`font-medium px-3 py-1 rounded-full transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'diagnostics'
                  ? 'bg-red-600 text-white'
                  : 'text-red-600 bg-red-50 hover:bg-red-100 border border-red-200'
              }`}
            >
              <Bug className="w-3.5 h-3.5" />
              <span>Diagnostic Helper</span>
            </button>
          )}

          {testCaseResults.length > 0 && (
            <button
              onClick={() => setActiveTab('tests')}
              className={`font-medium px-3 py-1 rounded-full transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'tests'
                  ? 'bg-black text-white'
                  : 'text-[#737373] hover:text-black'
              }`}
            >
              <span>Test Cases</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#e5e5e5] text-black font-semibold">
                {testCaseResults.filter(t => t.passed).length}/{testCaseResults.length}
              </span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {(stdout || stderr) && (
            <button
              onClick={handleCopyOutput}
              className="flex items-center gap-1 text-[11px] text-[#737373] hover:text-black transition-colors cursor-pointer"
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
                        title="Click to jump to line in editor"
                      >
                        <CornerDownRight className="w-3 h-3 text-red-600" />
                        <span>Line {parsedError.lineNumber}</span>
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
              <div className="flex items-center justify-between">
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

                {parsedError.lineNumber && (
                  <button
                    onClick={() => handleJumpToErrorLine(parsedError.lineNumber)}
                    className="text-[12px] font-medium bg-[#fafafa] hover:bg-[#f0f0f0] border border-[#e5e5e5] px-2.5 py-1 rounded-full flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Jump to Line {parsedError.lineNumber}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>

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

        {/* TAB 3: Test Cases */}
        {activeTab === 'tests' && (
          <div className="space-y-2 font-sans">
            {testCaseResults.map((tc, idx) => (
              <div
                key={tc.id || idx}
                className={`p-3 rounded-[8px] border ${
                  tc.passed
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                    : 'bg-red-50/70 border-red-200 text-red-950'
                }`}
              >
                <div className="flex items-center justify-between text-[13px] font-medium mb-1.5">
                  <div className="flex items-center gap-2">
                    {tc.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                    )}
                    <span>Test Case #{idx + 1} {tc.isHidden && '(Hidden Test)'}</span>
                  </div>
                  <span className="text-[11px] font-semibold">{tc.passed ? 'PASSED' : 'FAILED'}</span>
                </div>

                <div className="text-[12px] space-y-1 bg-white p-2.5 rounded-[6px] border border-black/5 font-mono">
                  {tc.input && (
                    <div>
                      <span className="text-[#737373] font-sans">Input: </span>
                      <span className="text-[#000000]">{tc.input}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-[#737373] font-sans">Expected: </span>
                    <span className="text-emerald-700 font-semibold">{tc.expectedOutput}</span>
                  </div>
                  <div>
                    <span className="text-[#737373] font-sans">Actual: </span>
                    <span className={`font-semibold ${tc.passed ? 'text-emerald-700' : 'text-red-600'}`}>
                      {tc.actualOutput || '<Empty Output>'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
