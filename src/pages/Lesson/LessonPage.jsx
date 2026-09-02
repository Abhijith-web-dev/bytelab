import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  BookOpen,
  Cpu,
  Terminal,
  HelpCircle,
  Code,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  ArrowRight,
  Clock,
  Play,
  RotateCcw,
  Sparkles,
  Award,
  Layers,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  BookMarked,
  Lightbulb,
  Compass,
  ListTree,
  ExternalLink,
  Target,
  FileCode,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button } from '../../components/ui/Button.jsx';
import { Badge } from '../../components/ui/Badge.jsx';
import { Card } from '../../components/ui/Card.jsx';
import { CourseSidebar } from '../../components/layout/CourseSidebar.jsx';
import { SubNavFrosted } from '../../components/layout/SubNavFrosted.jsx';
import { CodeSimulationPlayer } from '../../components/simulation/CodeSimulationPlayer.jsx';
const MarkdownRenderer = React.lazy(() => import('../../components/lesson/MarkdownRenderer.jsx').then(m => ({ default: m.MarkdownRenderer })));
const CodePlayground = React.lazy(() => import('../../components/editor/CodePlayground.jsx').then(m => ({ default: m.CodePlayground })));
import { Modal } from '../../components/ui/Modal.jsx';
import {
  getCourse,
  getChapter,
  getLesson,
  getStory,
  getSimulation,
  getExamples,
  getProblems,
  getQuiz,
  getNextAndPreviousLesson
} from '../../content/loader/index.js';
import { useProgressStore } from '../../stores/progressStore.js';
import { useUIStore } from '../../stores/uiStore.js';
import { pythonRuntime } from '../../runtimes/python/pythonRuntime.js';

export function LessonPage() {
  const params = useParams();
  const navigate = useNavigate();
  const courseId = params.courseId || 'python-programming';
  const chapterId = params.chapterId || 'day-01';

  const course = getCourse(courseId);

  // Find unit for this chapter
  const unit = course.units.find(u => u.chapters.includes(chapterId)) || course.units[0];
  const unitId = unit.id;

  const chapter = getChapter(courseId, unitId, chapterId);
  const lessonMd = getLesson(courseId, unitId, chapterId);
  const storyMd = getStory(courseId, unitId, chapterId);
  const simulationData = getSimulation(courseId, unitId, chapterId);
  const examples = getExamples(courseId, unitId, chapterId);
  const problems = getProblems(courseId, unitId, chapterId);
  const quizQuestions = getQuiz(courseId, unitId, chapterId);

  const { markLessonComplete, completedChapters } = useProgressStore();
  const {
    isStoryMode,
    toggleStoryMode,
    isMobileCurriculumOpen,
    toggleMobileCurriculum,
    closeMobileCurriculum
  } = useUIStore();

  const isChapterDone = completedChapters.includes(chapterId);
  const { prev, next, currentIndex, totalCount } = getNextAndPreviousLesson(courseId, unitId, chapterId);

  // Active Workspace Tab (Udemy/LMS style)
  const [activeTab, setActiveTab] = useState('notes'); // 'notes' | 'simulation' | 'sandbox' | 'quiz'

  // Interactive Live Runner Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCode, setActiveCode] = useState('');
  const [execState, setExecState] = useState('IDLE');
  const [stdout, setStdout] = useState('');
  const [stderr, setStderr] = useState('');
  const [execTime, setExecTime] = useState(0);

  // Embedded sandbox state for the 'sandbox' tab
  const [sandboxCode, setSandboxCode] = useState(
    examples?.[0]?.code || '# Write your Python code here\nprint("Hello from ByteLab Sandbox!")\n'
  );
  const [sandboxExecState, setSandboxExecState] = useState('IDLE');
  const [sandboxStdout, setSandboxStdout] = useState('');
  const [sandboxStderr, setSandboxStderr] = useState('');
  const [sandboxExecTime, setSandboxExecTime] = useState(0);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setActiveTab('notes');
    closeMobileCurriculum();
    if (examples?.[0]?.code) {
      setSandboxCode(examples[0].code);
    }
  }, [chapterId]);

  const handleTryCode = React.useCallback((codeText) => {
    setActiveCode(codeText);
    setExecState('IDLE');
    setStdout('');
    setStderr('');
    setModalOpen(true);
  }, []);

  const handleRunModalCode = async () => {
    setExecState('RUNNING');
    setStdout('');
    setStderr('');

    const res = await pythonRuntime.execute({
      sourceCode: activeCode,
      timeoutMs: 5000
    });

    setExecState(res.status === 'passed' ? 'PASSED' : (res.status === 'syntax_error' ? 'SYNTAX_ERROR' : 'RUNTIME_ERROR'));
    setStdout(res.stdout);
    setStderr(res.stderr);
    setExecTime(res.executionTimeMs);
  };

  const handleRunSandbox = async () => {
    setSandboxExecState('RUNNING');
    setSandboxStdout('');
    setSandboxStderr('');

    const res = await pythonRuntime.execute({
      sourceCode: sandboxCode,
      timeoutMs: 5000
    });

    setSandboxExecState(res.status === 'passed' ? 'PASSED' : (res.status === 'syntax_error' ? 'SYNTAX_ERROR' : 'RUNTIME_ERROR'));
    setSandboxStdout(res.stdout);
    setSandboxStderr(res.stderr);
    setSandboxExecTime(res.executionTimeMs);
  };

  const handleCompleteAndNext = () => {
    markLessonComplete(chapterId, chapterId, unitId);

    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.8 }
      });
    } catch (e) {}

    if (next) {
      navigate(`/courses/${courseId}/chapter/${next.chapterId}`);
    }
  };

  const handleOptionSelect = (qId, optId) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: optId
    }));
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    markLessonComplete(chapterId, chapterId, unitId);
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top Context SubNav */}
      <SubNavFrosted
        title={chapter?.title || chapterId}
        subtitle={`${unit.romanNumber} • Day ${currentIndex} of ${totalCount}`}
        breadcrumbs={[
          { label: '65-Day Curriculum', path: `/courses/${courseId}` },
          { label: unit.romanNumber, path: `/courses/${courseId}/unit/${unit.id}` }
        ]}
        ctaLabel={isChapterDone ? "Done ✓" : "Complete"}
        onCtaClick={handleCompleteAndNext}
        rightElement={
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Difficulty Badge */}
            <div className="hidden sm:flex mr-1">
              <Badge variant="success" className="text-[11px] px-2 py-0.5">Beginner</Badge>
            </div>

            {/* Mobile Syllabus Drawer Trigger */}
            <button
              onClick={toggleMobileCurriculum}
              className="md:hidden flex items-center justify-center w-8 h-8 sm:w-auto sm:h-auto sm:px-3 sm:py-1.5 rounded-full bg-[#fafafa] border border-[#e5e5e5] text-[12px] font-medium text-black"
              aria-label="Open Syllabus"
            >
              <Menu className="w-4 h-4 sm:w-3.5 sm:h-3.5 sm:mr-1" />
              <span className="hidden sm:inline">Syllabus</span>
            </button>

            {/* Story Mode Quick Switcher */}
            <button
              onClick={toggleStoryMode}
              className={`flex items-center justify-center w-8 h-8 sm:w-auto sm:h-auto sm:px-3 sm:py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer shrink-0 ${
                isStoryMode
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-[#fafafa] text-[#525252] hover:text-black border border-[#e5e5e5]'
              }`}
              title="Toggle Story Mode"
            >
              <Sparkles className="w-4 h-4 sm:w-3.5 sm:h-3.5 sm:mr-1.5 fill-current" />
              <span className="hidden sm:inline">{isStoryMode ? 'Story Mode Active' : 'Story Mode'}</span>
            </button>
          </div>
        }
      />

      <div className="flex-1 flex flex-col md:flex-row w-full mx-auto">
        {/* Left: Desktop 65-Day Syllabus Sidebar */}
        <CourseSidebar
          courseId={courseId}
          className="hidden md:flex shrink-0 sticky top-[108px] h-[calc(100vh-108px)]"
        />

        {/* Mobile Slide-Over Curriculum Drawer */}
        {isMobileCurriculumOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex animate-in fade-in duration-150">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={closeMobileCurriculum} />
            <div className="relative w-[300px] sm:w-[360px] max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
              <div className="p-4 border-b border-[#e5e5e5] flex items-center justify-between bg-[#fafafa]">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-black" />
                  <span className="font-semibold text-[14px]">65-Day Syllabus</span>
                </div>
                <button onClick={closeMobileCurriculum} className="p-1 text-[#737373] hover:text-black rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <CourseSidebar courseId={courseId} className="w-full border-r-0" />
              </div>
            </div>
          </div>
        )}

        {/* Center: Main Lecture Player Workspace */}
        <main className="flex-1 min-w-0 p-4 md:p-8 lg:p-10 max-w-4xl mx-auto space-y-8">
          {/* Lecture Hero Banner */}
          <div className="space-y-3 pb-6 border-b border-[#e5e5e5]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar whitespace-nowrap pb-1 sm:pb-0 w-full sm:w-auto">
                <Badge variant="co">{chapter?.outcomes?.[0] || 'CO1'}</Badge>
                <Badge variant={chapter?.difficulty || 'beginner'}>
                  {chapter?.difficulty || 'Beginner'}
                </Badge>
                <span className="text-[13px] text-[#737373] flex items-center gap-1 font-mono shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                  <span>~20 min</span>
                </span>
                {chapter?.simulationType && (
                  <span className="text-[11px] font-mono bg-[#fafafa] border border-[#e5e5e5] text-black px-2 py-0.5 rounded-full shrink-0">
                    {chapter.simulationType}
                  </span>
                )}
              </div>

              {isChapterDone && (
                <div className="flex items-center gap-1.5 text-emerald-600 text-[13px] font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shrink-0 self-start sm:self-auto">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Completed</span>
                </div>
              )}
            </div>

            <h1 className="text-[24px] sm:text-[32px] font-semibold text-[#000000] tracking-tight leading-tight">
              {chapter?.title || chapterId}
            </h1>

            <p className="text-[14px] sm:text-[15px] text-[#737373] leading-relaxed">
              {chapter?.description}
            </p>

            {/* Story Mode vs Academic Mode Toggle Banner */}
            <div className="p-3.5 rounded-[10px] bg-[#fafafa] border border-[#e5e5e5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isStoryMode ? 'bg-amber-500 text-white' : 'bg-black text-white'}`}>
                  {isStoryMode ? <Sparkles className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                </div>
                <div>
                  <span className="text-[13px] font-semibold text-black block">
                    {isStoryMode ? 'Storytelling & Intuitive Analogy Mode' : 'Standard 12-Section Lecture Guide'}
                  </span>
                  <span className="text-[12px] text-[#737373]">
                    {isStoryMode ? 'Explained with everyday real-world metaphors for intuitive understanding.' : 'Structured with syntax definitions, step-by-step code execution, and practice.'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-[#e5e5e5] shrink-0 self-start sm:self-auto">
                <button
                  onClick={() => useUIStore.getState().setStoryMode(false)}
                  className={`px-3 py-1 rounded-full text-[12px] font-medium transition-all cursor-pointer ${
                    !isStoryMode ? 'bg-black text-white shadow-xs' : 'text-[#737373] hover:text-black'
                  }`}
                >
                  Standard
                </button>
                <button
                  onClick={() => useUIStore.getState().setStoryMode(true)}
                  className={`px-3 py-1 rounded-full text-[12px] font-medium transition-all cursor-pointer flex items-center gap-1 ${
                    isStoryMode ? 'bg-amber-500 text-white shadow-xs' : 'text-[#737373] hover:text-black'
                  }`}
                >
                  <Sparkles className="w-3 h-3 fill-current" />
                  <span>Story Mode</span>
                </button>
              </div>
            </div>

            {/* Learning Workspace Tab Navigation */}
            <div className="flex items-center gap-2 pt-4 overflow-x-auto no-scrollbar border-t border-[#f0f0f0]">
              <button
                onClick={() => setActiveTab('notes')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'notes'
                    ? 'bg-[#000000] text-white shadow-xs'
                    : 'bg-[#fafafa] text-[#525252] hover:text-[#000000] border border-[#e5e5e5]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{isStoryMode ? 'Story Narrative' : '12-Section Lesson'}</span>
              </button>

              {simulationData && (
                <button
                  onClick={() => setActiveTab('simulation')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'simulation'
                      ? 'bg-[#000000] text-white shadow-xs'
                      : 'bg-[#fafafa] text-[#525252] hover:text-[#000000] border border-[#e5e5e5]'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Interactive Simulation</span>
                </button>
              )}

              <button
                onClick={() => setActiveTab('sandbox')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'sandbox'
                    ? 'bg-[#000000] text-white shadow-xs'
                    : 'bg-[#fafafa] text-[#525252] hover:text-[#000000] border border-[#e5e5e5]'
                }`}
              >
                <Terminal className="w-3.5 h-3.5 text-blue-500" />
                <span>Live Sandbox & Diagnostics</span>
              </button>

              {quizQuestions.length > 0 && (
                <button
                  onClick={() => setActiveTab('quiz')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'quiz'
                      ? 'bg-[#000000] text-white shadow-xs'
                      : 'bg-[#fafafa] text-[#525252] hover:text-[#000000] border border-[#e5e5e5]'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                  <span>Quick Check ({quizQuestions.length})</span>
                </button>
              )}
            </div>
          </div>

          {/* TAB 1: Lecture Notes / Story Mode */}
          {activeTab === 'notes' && (
            <div className="space-y-8 animate-in fade-in duration-150">
              <article>
                <React.Suspense fallback={<div className="p-12 flex items-center justify-center text-[#737373]">Loading content...</div>}>
                  <MarkdownRenderer
                    content={isStoryMode && storyMd ? storyMd : lessonMd}
                    onTryCode={handleTryCode}
                  />
                </React.Suspense>
              </article>

              {/* Interactive Examples Section (W3Schools-style) */}
              {examples.length > 0 && (
                <section className="space-y-6 pt-6 border-t border-[#e5e5e5]">
                  <div className="flex items-center justify-between">
                    <h2 className="text-[18px] sm:text-[20px] font-semibold text-[#000000] tracking-tight flex items-center gap-2">
                      <Terminal className="w-5 h-5 text-[#000000]" />
                      <span>Try It Yourself (Interactive Demos)</span>
                    </h2>
                    <span className="text-[12px] text-[#737373]">
                      Executable Sandbox Blocks
                    </span>
                  </div>

                  <div className="space-y-6">
                    {examples.map((ex) => (
                      <div key={ex.id} className="rounded-[12px] bg-white border border-[#e5e5e5] overflow-hidden shadow-xs">
                        <div className="px-5 py-3 bg-[#fafafa] border-b border-[#e5e5e5] flex items-center justify-between">
                          <h3 className="text-[14px] font-semibold text-[#000000]">{ex.title}</h3>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleTryCode(ex.code)}
                            className="py-1 px-3 text-[12px]"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>Run in Sandbox</span>
                          </Button>
                        </div>

                        <div className="p-5 space-y-4">
                          {ex.description && (
                            <p className="text-[14px] text-[#737373]">{ex.description}</p>
                          )}

                          <div className="rounded-[8px] bg-[#171717] text-white p-4 font-mono text-[13px] overflow-x-auto">
                            <pre><code>{ex.code}</code></pre>
                          </div>

                          <div className="p-3.5 rounded-[8px] bg-[#fafafa] border border-[#e5e5e5] text-[13px] font-mono">
                            <span className="text-[#737373] text-[11px] block font-sans mb-1 font-semibold uppercase">Expected Output:</span>
                            <pre className="text-emerald-700 whitespace-pre-wrap"><code>{ex.expectedOutput}</code></pre>
                          </div>

                          <p className="text-[13px] text-[#525252] leading-relaxed bg-[#fafafa] p-3 rounded-[8px] border border-[#e5e5e5]">
                            💡 <b>Deep Explanation:</b> {ex.explanation}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}

          {/* TAB 2: Visual Simulation */}
          {activeTab === 'simulation' && simulationData && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="space-y-1">
                <h2 className="text-[20px] font-semibold text-[#000000] tracking-tight">
                  Visual Execution Simulation ({chapter?.simulationType || 'Simulation'})
                </h2>
                <p className="text-[14px] text-[#737373]">
                  Step through execution line by line to watch variable bindings and states update in real time.
                </p>
              </div>

              <CodeSimulationPlayer 
                simulationData={{
                  ...simulationData,
                  codeLines: simulationData.codeLines || simulationData.codeSnippet?.split('\n') || examples?.[0]?.code?.split('\n') || ["# No code provided for simulation"]
                }} 
              />
            </div>
          )}

          {/* TAB 3: Live Sandbox & Diagnostics */}
          {activeTab === 'sandbox' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="space-y-1">
                <h2 className="text-[20px] font-semibold text-[#000000] tracking-tight">
                  Interactive Python 3.11 Sandbox & Diagnostic Engine
                </h2>
                <p className="text-[14px] text-[#737373]">
                  Write, run, and debug Python code. In case of errors, the diagnostic engine highlights the exact line and provides fix recommendations.
                </p>
              </div>
              <React.Suspense fallback={<div className="w-full h-[360px] flex items-center justify-center bg-white border border-[#e5e5e5] rounded-[16px] text-[#737373]">Loading interactive IDE...</div>}>
                <CodePlayground
                  code={sandboxCode}
                  onChange={(c) => setSandboxCode(c)}
                  onRun={handleRunSandbox}
                  onReset={() => setSandboxCode(examples?.[0]?.code || 'print("Hello from ByteLab!")\n')}
                  language="python"
                  executionState={sandboxExecState}
                  stdout={sandboxStdout}
                  stderr={sandboxStderr}
                  executionTimeMs={sandboxExecTime}
                  preventPaste={false}
                  height="360px"
                />
              </React.Suspense>
            </div>
          )}

          {/* TAB 4: Concept Quiz */}
          {activeTab === 'quiz' && quizQuestions.length > 0 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="space-y-2">
                <h2 className="text-[22px] font-bold text-slate-900 tracking-tight">
                  Knowledge Check & Predictions
                </h2>
                <p className="text-[15px] text-slate-600 font-medium">
                  Verify your comprehension of the day's concepts before moving forward.
                </p>
              </div>

              <div className="space-y-6">
                {quizQuestions.map((q, qIdx) => (
                  <div key={q.id || qIdx} className="p-6 rounded-[16px] bg-white border border-slate-200 shadow-sm space-y-5">
                    <p className="text-[16px] font-semibold text-slate-900 leading-relaxed">
                      {qIdx + 1}. {q.question}
                    </p>

                    {q.codeSnippet && (
                      <pre className="p-4 bg-[#0f111a] text-slate-50 text-[14px] leading-loose rounded-[10px] border border-slate-800 font-mono overflow-x-auto shadow-inner">
                        <code>{q.codeSnippet}</code>
                      </pre>
                    )}

                    <div className="space-y-3">
                      {q.options.map((optItem, optIdx) => {
                        // Handle both string options and object options safely
                        const optId = typeof optItem === 'object' ? optItem.id : String(optIdx);
                        const optText = typeof optItem === 'object' ? optItem.text : String(optItem);
                        const isCorrect = typeof optItem === 'object' ? optItem.isCorrect : (q.correctAnswer === optIdx);
                        
                        const isSelected = selectedAnswers[q.id] === optId;
                        let optionStyle = 'bg-white border-slate-200 text-slate-700 hover:border-slate-400 hover:bg-slate-50 shadow-sm';

                        if (quizSubmitted) {
                          if (isCorrect) {
                            optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold shadow-sm ring-1 ring-emerald-500';
                          } else if (isSelected && !isCorrect) {
                            optionStyle = 'bg-red-50 border-red-300 text-red-900 font-semibold opacity-90';
                          } else {
                            optionStyle = 'bg-white border-slate-200 text-slate-400 opacity-60 cursor-not-allowed';
                          }
                        } else if (isSelected) {
                          optionStyle = 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900 ring-offset-1 font-semibold';
                        }

                        return (
                          <button
                            key={optId}
                            onClick={() => !quizSubmitted && handleOptionSelect(q.id, optId)}
                            disabled={quizSubmitted}
                            className={`w-full text-left px-4 py-3.5 rounded-[10px] border text-[14px] transition-all duration-200 ease-in-out flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-slate-400 ${
                              !quizSubmitted ? 'cursor-pointer' : ''
                            } ${optionStyle}`}
                          >
                            <span>{optText}</span>
                            {quizSubmitted && isCorrect && (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && q.explanation && (
                      <div className="mt-4 p-4 bg-blue-50/80 rounded-[10px] border border-blue-200 text-[14px] text-blue-900 leading-relaxed shadow-sm">
                        <span className="font-bold mr-2">💡 Explanation:</span>
                        <span className="font-medium">{q.explanation}</span>
                      </div>
                    )}
                  </div>
                ))}

                <div className="flex justify-end pt-4">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleQuizSubmit}
                    disabled={quizSubmitted || Object.keys(selectedAnswers).length === 0}
                    className="shadow-md px-8 rounded-full font-semibold"
                  >
                    <span>{quizSubmitted ? 'Quiz Submitted ✓' : 'Submit Answers'}</span>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Day Pagination Controls */}
          <div className="pt-8 border-t border-[#e5e5e5] flex items-center justify-between gap-4">
            {prev ? (
              <Link to={`/courses/${courseId}/chapter/${prev.chapterId}`}>
                <Button variant="secondary" size="md" className="gap-2">
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous: {prev.chapterTitle.split(':')[0]}</span>
                  <span className="sm:hidden">Prev</span>
                </Button>
              </Link>
            ) : <div />}

            <Button
              variant="primary"
              size="md"
              onClick={handleCompleteAndNext}
              className="gap-2"
            >
              <span>{next ? `Next: Day ${currentIndex + 1}` : 'Complete Course'}</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </main>

        {/* Right: Sleek Desktop Quick-Jump & Day Overview Sidebar */}
        <aside className="hidden xl:flex flex-col w-[260px] 2xl:w-[280px] shrink-0 border-l border-[#e5e5e5] bg-[#fafafa]/50 p-5 sticky top-[108px] h-[calc(100vh-108px)] overflow-y-auto space-y-6 select-none">
          {/* Day Overview Badge */}
          <div className="space-y-2 pb-4 border-b border-[#e5e5e5]">
            <span className="text-[11px] uppercase font-bold text-[#737373] tracking-wider block font-mono">
              Day Navigation
            </span>
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-bold text-black font-mono">
                Day {currentIndex} of {totalCount}
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-black text-white font-mono">
                {unit.outcomes[0]}
              </span>
            </div>
            <div className="text-[12px] text-[#525252] leading-snug">
              {chapter?.title}
            </div>
          </div>

          {/* Quick Section Jump */}
          <div className="space-y-2">
            <span className="text-[11px] uppercase font-bold text-[#737373] tracking-wider block font-mono">
              On This Page
            </span>
            <nav className="space-y-1 text-[12px]">
              <button
                onClick={() => setActiveTab('notes')}
                className={`w-full text-left px-2.5 py-1.5 rounded-[6px] transition-colors flex items-center justify-between cursor-pointer ${
                  activeTab === 'notes'
                    ? 'bg-black text-white font-medium shadow-2xs'
                    : 'text-[#525252] hover:bg-[#e5e5e5]/60 hover:text-black'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <BookOpen className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">12-Section Guide</span>
                </div>
              </button>

              {simulationData && (
                <button
                  onClick={() => setActiveTab('simulation')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-[6px] transition-colors flex items-center justify-between cursor-pointer ${
                    activeTab === 'simulation'
                      ? 'bg-black text-white font-medium shadow-2xs'
                      : 'text-[#525252] hover:bg-[#e5e5e5]/60 hover:text-black'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Cpu className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="truncate">Visual Simulation</span>
                  </div>
                </button>
              )}

              <button
                onClick={() => setActiveTab('sandbox')}
                className={`w-full text-left px-2.5 py-1.5 rounded-[6px] transition-colors flex items-center justify-between cursor-pointer ${
                  activeTab === 'sandbox'
                    ? 'bg-black text-white font-medium shadow-2xs'
                    : 'text-[#525252] hover:bg-[#e5e5e5]/60 hover:text-black'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <Terminal className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span className="truncate">Live Sandbox & Errors</span>
                </div>
              </button>

              {quizQuestions.length > 0 && (
                <button
                  onClick={() => setActiveTab('quiz')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-[6px] transition-colors flex items-center justify-between cursor-pointer ${
                    activeTab === 'quiz'
                      ? 'bg-black text-white font-medium shadow-2xs'
                      : 'text-[#525252] hover:bg-[#e5e5e5]/60 hover:text-black'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="truncate">Knowledge Check</span>
                  </div>
                </button>
              )}
            </nav>
          </div>

          {/* Quick Simulation Type Card */}
          {chapter?.simulationType && (
            <div className="p-3.5 bg-white rounded-[10px] border border-[#e5e5e5] space-y-1.5 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-[#a3a3a3] font-mono block">
                Simulation Engine
              </span>
              <div className="text-[12px] font-semibold text-black">
                {chapter.simulationType}
              </div>
              <p className="text-[11px] text-[#737373] leading-snug">
                Step-by-step state visualization for {chapter.shortTitle || chapter.title}.
              </p>
            </div>
          )}

          {/* Fast Day Jump Controls */}
          <div className="pt-2 space-y-2 border-t border-[#e5e5e5]">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCompleteAndNext}
              className="w-full justify-between text-[12px]"
            >
              <span>{isChapterDone ? 'Review Next Day' : 'Mark & Advance'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </aside>
      </div>

      {/* Floating Action Button (Mobile) - For Sandbox */}
      {activeTab === 'sandbox' && (
        <div className="md:hidden fixed bottom-6 right-4 z-40">
          <button
            onClick={handleRunSandbox}
            disabled={sandboxExecState === 'RUNNING'}
            className="flex items-center justify-center w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg shadow-emerald-500/30 transition-transform active:scale-95 disabled:opacity-70 disabled:active:scale-100"
          >
            {sandboxExecState === 'RUNNING' ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Play className="w-6 h-6 fill-current ml-1" />
            )}
          </button>
        </div>
      )}

      {/* Live Runner Modal Dialog for Try It Code snippets */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Interactive Python Sandbox (Pyodide 3.11)"
        size="lg"
      >
        <div className="space-y-4">
          <React.Suspense fallback={<div className="w-full h-full flex items-center justify-center text-slate-500">Loading IDE...</div>}>
            <CodePlayground
              code={activeCode}
              onChange={(c) => setActiveCode(c)}
              onRun={handleRunModalCode}
              onReset={() => setActiveCode(examples?.[0]?.code || '')}
              language="python"
              executionState={execState}
              stdout={stdout}
              stderr={stderr}
              executionTimeMs={execTime}
              preventPaste={false}
              height="320px"
            />
          </React.Suspense>
        </div>
      </Modal>
    </div>
  );
}
