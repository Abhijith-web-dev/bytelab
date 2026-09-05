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
  Check,
  Maximize,
  Minimize
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
  getNextAndPreviousLesson,
  normalizeChapterId,
  cleanChapterTitle
} from '../../content/loader/index.js';
import { useProgressStore } from '../../stores/progressStore.js';
import { useAuthStore } from '../../stores/authStore.js';
import { useUIStore } from '../../stores/uiStore.js';
import { usePracticeStore } from '../../stores/practiceStore.js';
import { pythonRuntime } from '../../runtimes/python/pythonRuntime.js';
import { useSEO } from '../../hooks/useSEO.js';

export function LessonPage() {
  const params = useParams();
  const navigate = useNavigate();
  const courseId = params.courseId || 'python-programming';
  const chapterId = normalizeChapterId(params.chapterId || 'day-01');

  const course = getCourse(courseId);

  // Find unit for this chapter
  const unit = (params.unitId && course.units.find(u => u.id === params.unitId))
    || course.units.find(u => u.chapters.includes(chapterId))
    || course.units[0];
  const unitId = unit.id;

  const chapter = getChapter(courseId, unitId, chapterId);
  
  useSEO({
    title: `${chapter?.title || 'Lesson'} | ${course?.title || ''}`,
    description: chapter?.description || 'Learn interactive coding in this lesson.'
  });

  const lessonMd = getLesson(courseId, unitId, chapterId);
  const storyMd = getStory(courseId, unitId, chapterId);
  const simulationData = getSimulation(courseId, unitId, chapterId);
  const examples = getExamples(courseId, unitId, chapterId);
  const problems = getProblems(courseId, unitId, chapterId);
  const quizQuestions = getQuiz(courseId, unitId, chapterId);

  const { markLessonComplete, completedChapters } = useProgressStore();
  const { isAuthenticated, isGuest } = useAuthStore();
  const {
    isStoryMode,
    toggleStoryMode,
    isMobileCurriculumOpen,
    toggleMobileCurriculum,
    closeMobileCurriculum,
    isFocusMode,
    toggleFocusMode
  } = useUIStore();

  const isChapterDone = completedChapters.includes(chapterId);
  const { prev, next, current, currentIndex, totalCount } = getNextAndPreviousLesson(courseId, unitId, chapterId);

  const unitChapters = unit.chapters || [];
  const unitDayIndex = current?.unitDayIndex || (unitChapters.indexOf(chapterId) !== -1 ? unitChapters.indexOf(chapterId) + 1 : 1);
  const unitTotalDays = unitChapters.length || 10;
  const courseDayNumber = current?.courseDayNumber || current?.dayNumber || chapter?.dayNumber || currentIndex;
  const cleanTitle = chapter?.shortTitle || cleanChapterTitle(chapter?.title) || chapter?.title || chapterId;

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
  const [randomizedQuiz, setRandomizedQuiz] = useState([]);

  // Practice Arena state
  const {
    updateCode: updatePracticeCode,
    code: practiceCode,
    runCode: runPracticeCode,
    resetCode: resetPracticeCode,
    loadProblem,
    executionState: practiceExecState,
    stdout: practiceStdout,
    stderr: practiceStderr,
    executionTimeMs: practiceExecTime,
    testCaseResults: practiceTestResults
  } = usePracticeStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveTab('notes');
    setSelectedAnswers({});
    setQuizSubmitted(false);
    closeMobileCurriculum();
    
    // Randomize quiz questions and select up to 5
    if (quizQuestions && quizQuestions.length > 0) {
      const shuffled = [...quizQuestions].sort(() => 0.5 - Math.random());
      setRandomizedQuiz(shuffled.slice(0, 5));
    } else {
      setRandomizedQuiz([]);
    }
    
    if (examples?.[0]?.code) {
      setActiveCode(examples[0].code);
    }
    
    // Load practice problem into IDE
    if (problems && problems.length > 0) {
      loadProblem(problems[0]);
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

  const calculateQuizScore = () => {
    if (!randomizedQuiz || randomizedQuiz.length === 0) return { correct: 0, total: 0, percentage: 0 };
    let correct = 0;
    randomizedQuiz.forEach(q => {
      const selected = selectedAnswers[q.id];
      if (selected === undefined || selected === null) return;
      const isRight = q.options.some((optItem, optIdx) => {
        const optId = typeof optItem === 'object' ? optItem.id : String(optIdx);
        const isCorrect = typeof optItem === 'object' ? Boolean(optItem.isCorrect) : (q.correctAnswer === optIdx);
        return optId === selected && isCorrect;
      });
      if (isRight) correct++;
    });
    const total = randomizedQuiz.length;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
    return { correct, total, percentage };
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
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

  const tabs = [
    { id: 'notes', label: isStoryMode ? 'Story Narrative' : 'Lesson Notes', icon: isStoryMode ? Sparkles : BookOpen },
    ...(simulationData ? [{ id: 'simulation', label: 'Visual Simulation', icon: Cpu }] : []),
    { id: 'sandbox', label: 'Python Sandbox', icon: Terminal },
    ...(quizQuestions.length > 0 ? [{ id: 'quiz', label: `Knowledge Check (${quizQuestions.length})`, icon: HelpCircle }] : []),
    ...(problems && problems.length > 0 ? [{ id: 'practice', label: `Practice (${problems.length})`, icon: Target }] : [])
  ];

  const handleTabKeyDown = (e, currentTabId) => {
    const currentIndex = tabs.findIndex(t => t.id === currentTabId);
    if (e.key === 'ArrowRight') {
      const nextIndex = (currentIndex + 1) % tabs.length;
      setActiveTab(tabs[nextIndex].id);
      document.getElementById(`tab-${tabs[nextIndex].id}`)?.focus();
    } else if (e.key === 'ArrowLeft') {
      const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      setActiveTab(tabs[prevIndex].id);
      document.getElementById(`tab-${tabs[prevIndex].id}`)?.focus();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top Context SubNav */}
      <SubNavFrosted
        title={cleanTitle}
        subtitle={`${unit.romanNumber} • Day ${unitDayIndex} of ${unitTotalDays} (Day ${courseDayNumber})`}
        breadcrumbs={[
          { label: '46-Day Curriculum', path: `/courses/${courseId}` },
          { label: unit.romanNumber, path: `/courses/${courseId}/unit/${unit.id}` },
          { label: `Day ${unitDayIndex}`, path: `/courses/${courseId}/chapter/${chapterId}` }
        ]}
        ctaLabel={isChapterDone ? "Completed ✓" : "Mark Complete"}
        onCtaClick={handleCompleteAndNext}
        rightElement={
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Mobile Syllabus Drawer Trigger */}
            <button
              onClick={toggleMobileCurriculum}
              className="md:hidden flex items-center justify-center w-8 h-8 sm:w-auto sm:h-auto sm:px-3 sm:py-1.5 rounded-full bg-white border border-[#d9d9dd] text-[12px] font-medium text-[#17171c] hover:bg-[#fafafa] active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17171c]"
              aria-label="Open Syllabus Menu"
            >
              <Menu className="w-4 h-4 sm:w-3.5 sm:h-3.5 sm:mr-1" />
              <span className="hidden sm:inline">Syllabus</span>
            </button>

            {/* Focus Mode Switcher */}
            <button
              onClick={toggleFocusMode}
              className={`flex items-center justify-center w-8 h-8 sm:w-auto sm:h-auto sm:px-3 sm:py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer shrink-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17171c] ${
                isFocusMode
                  ? 'bg-[#17171c] text-white shadow-xs'
                  : 'bg-white text-[#575768] hover:text-[#17171c] border border-[#d9d9dd] hover:bg-[#fafafa]'
              }`}
              title={isFocusMode ? "Exit Focus Mode" : "Enter Focus Mode"}
              aria-label={isFocusMode ? "Exit Focus Mode" : "Enter Focus Mode"}
            >
              {isFocusMode ? (
                <Minimize className="w-4 h-4 sm:w-3.5 sm:h-3.5 sm:mr-1.5" />
              ) : (
                <Maximize className="w-4 h-4 sm:w-3.5 sm:h-3.5 sm:mr-1.5" />
              )}
              <span className="hidden sm:inline">{isFocusMode ? 'Exit Focus' : 'Focus'}</span>
            </button>

            {/* Story Mode Quick Switcher */}
            <button
              onClick={toggleStoryMode}
              role="switch"
              aria-checked={isStoryMode}
              className={`flex items-center justify-center w-8 h-8 sm:w-auto sm:h-auto sm:px-3 sm:py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer shrink-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7759] ${
                isStoryMode
                  ? 'bg-[#ff7759] text-white shadow-xs'
                  : 'bg-white text-[#575768] hover:text-[#17171c] border border-[#d9d9dd] hover:bg-[#fafafa]'
              }`}
              title="Toggle Storytelling Mode (real-world metaphors)"
              aria-label="Toggle Story Mode"
            >
              <Sparkles className={`w-4 h-4 sm:w-3.5 sm:h-3.5 sm:mr-1.5 ${isStoryMode ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{isStoryMode ? 'Story Mode' : 'Story Mode'}</span>
            </button>
          </div>
        }
      />

      <div className="flex-1 flex flex-col md:flex-row w-full mx-auto">
        {/* Left: Desktop 46-Day Syllabus Sidebar */}
        {!isFocusMode && (
          <CourseSidebar
            courseId={courseId}
            className="hidden md:flex shrink-0 sticky top-[108px] h-[calc(100vh-108px)] transition-all"
          />
        )}

        {/* Mobile Slide-Over Curriculum Drawer */}
        {isMobileCurriculumOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex animate-in fade-in duration-150">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={closeMobileCurriculum} aria-hidden="true" />
            <div className="relative w-[300px] sm:w-[360px] max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
              <div className="p-4 border-b border-[#d9d9dd] flex items-center justify-between bg-[#eeece7]/40">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#17171c]" />
                  <span className="font-semibold text-[14px] text-[#17171c]">46-Day Syllabus</span>
                </div>
                <button
                  onClick={closeMobileCurriculum}
                  className="p-1.5 text-[#575768] hover:text-[#17171c] rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17171c]"
                  aria-label="Close Syllabus Menu"
                >
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
        <main className="flex-1 min-w-0 px-4 sm:px-8 md:px-10 lg:px-12 py-8 max-w-4xl mx-auto w-full space-y-8" role="main">
          {/* Streamlined Day Hero Header */}
          <header className="space-y-4 pb-6 border-b border-[#d9d9dd]">
            {/* Meta Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-[12px]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#17171c] text-white">
                  Day {unitDayIndex} of {unitTotalDays}
                </span>
                <span className="font-mono text-[#575768] bg-[#eeece7]/60 border border-[#d9d9dd] px-2.5 py-0.5 rounded-full">
                  Curriculum Day {courseDayNumber}
                </span>
                <Badge variant="coral">{chapter?.outcomes?.[0] || 'CO1'}</Badge>
                <span className="text-[#575768] flex items-center gap-1 font-mono font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#17171c]" />
                  <span>~20 min</span>
                </span>
              </div>

              {isChapterDone && (
                <div className="flex items-center gap-1.5 text-emerald-700 text-[12px] font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Completed</span>
                </div>
              )}
            </div>

            {/* Main Title */}
            <h1 className="text-[26px] sm:text-[34px] font-semibold text-[#17171c] tracking-tight leading-tight">
              {chapter?.title || chapterId}
            </h1>

            {/* Description */}
            {chapter?.description && (
              <p className="text-[15px] text-[#575768] leading-relaxed max-w-3xl">
                {chapter.description}
              </p>
            )}

            {/* Clean Tab Navigation Strip with Integrated Segment Controller */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-[#d9d9dd]/70">
              {/* Tablist */}
              <div
                role="tablist"
                aria-label="Lesson sections"
                className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1"
              >
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      id={`tab-${tab.id}`}
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`tabpanel-${tab.id}`}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => setActiveTab(tab.id)}
                      onKeyDown={(e) => handleTabKeyDown(e, tab.id)}
                      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17171c] ${
                        isActive
                          ? 'bg-[#17171c] text-white shadow-xs'
                          : 'bg-white text-[#575768] hover:text-[#17171c] border border-[#d9d9dd] hover:bg-[#fafafa]'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#575768]'}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Mode Switcher Segment (Standard vs Story) */}
              <div className="flex items-center gap-1 bg-[#eeece7]/50 p-1 rounded-full border border-[#d9d9dd] shrink-0 self-start sm:self-auto">
                <button
                  onClick={() => useUIStore.getState().setStoryMode(false)}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17171c] ${
                    !isStoryMode ? 'bg-[#17171c] text-white shadow-xs' : 'text-[#575768] hover:text-[#17171c]'
                  }`}
                  aria-label="Switch to Standard Academic Mode"
                >
                  Standard
                </button>
                <button
                  onClick={() => useUIStore.getState().setStoryMode(true)}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7759] ${
                    isStoryMode ? 'bg-[#ff7759] text-white shadow-xs' : 'text-[#575768] hover:text-[#17171c]'
                  }`}
                  aria-label="Switch to Storytelling & Metaphors Mode"
                >
                  <Sparkles className="w-3 h-3 fill-current" />
                  <span>Story Mode</span>
                </button>
              </div>
            </div>
          </header>

          {/* TABPANEL 1: Lecture Notes / Story Mode */}
          {activeTab === 'notes' && (
            <section
              id="tabpanel-notes"
              role="tabpanel"
              aria-labelledby="tab-notes"
              className="space-y-8 animate-in fade-in duration-150"
            >
              <article className="prose-container max-w-none">
                <React.Suspense fallback={<div className="p-12 flex items-center justify-center text-[#575768]">Loading lesson notes...</div>}>
                  <MarkdownRenderer
                    content={isStoryMode && storyMd ? storyMd : lessonMd}
                    onTryCode={handleTryCode}
                  />
                </React.Suspense>
              </article>

              {/* Post-reading Action Bar */}
              <div className="p-5 rounded-[16px] bg-[#eeece7]/40 border border-[#d9d9dd] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <h3 className="text-[14px] font-semibold text-[#17171c]">
                    Finished reading Day {unitDayIndex}?
                  </h3>
                  <p className="text-[12.5px] text-[#575768]">
                    Practice code in the sandbox or verify your understanding with the knowledge check.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setActiveTab('sandbox')}
                    className="text-[12px]"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Open Sandbox</span>
                  </Button>
                  {quizQuestions.length > 0 && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setActiveTab('quiz')}
                      className="text-[12px]"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Take Quiz</span>
                    </Button>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* TABPANEL 2: Visual Simulation */}
          {activeTab === 'simulation' && simulationData && (
            <section
              id="tabpanel-simulation"
              role="tabpanel"
              aria-labelledby="tab-simulation"
              className="space-y-6 animate-in fade-in duration-150"
            >
              <div className="space-y-1">
                <h2 className="text-[20px] font-semibold text-[#17171c] tracking-tight">
                  Visual Execution Simulation ({chapter?.simulationType || 'Simulation'})
                </h2>
                <p className="text-[13.5px] text-[#575768]">
                  Step through execution line by line to watch variable bindings and memory states update in real time.
                </p>
              </div>

              <CodeSimulationPlayer 
                simulationData={{
                  ...simulationData,
                  codeLines: simulationData.codeLines || simulationData.codeSnippet?.split('\n') || examples?.[0]?.code?.split('\n') || ["# No code provided for simulation"]
                }} 
              />
            </section>
          )}

          {/* TABPANEL 3: Live Sandbox & Diagnostics */}
          {activeTab === 'sandbox' && (
            <section
              id="tabpanel-sandbox"
              role="tabpanel"
              aria-labelledby="tab-sandbox"
              className="space-y-6 animate-in fade-in duration-150"
            >
              <div className="space-y-1">
                <h2 className="text-[20px] font-semibold text-[#17171c] tracking-tight">
                  Interactive Python 3.11 Sandbox & Diagnostic Engine
                </h2>
                <p className="text-[13.5px] text-[#575768]">
                  Write, run, and debug Python code directly in your browser. Line-by-line syntax and runtime diagnostics are provided on execution errors.
                </p>
              </div>
              <React.Suspense fallback={<div className="w-full h-[360px] flex items-center justify-center bg-white border border-[#d9d9dd] rounded-[16px] text-[#575768]">Loading interactive IDE...</div>}>
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
                  height="380px"
                />
              </React.Suspense>
            </section>
          )}

          {/* TABPANEL 4: Concept Quiz */}
          {activeTab === 'quiz' && quizQuestions.length > 0 && (
            <section
              id="tabpanel-quiz"
              role="tabpanel"
              aria-labelledby="tab-quiz"
              className="space-y-6 animate-in fade-in duration-150"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-[20px] font-semibold text-[#17171c] tracking-tight">
                    Knowledge Check & Concept Predictions
                  </h2>
                  {quizSubmitted && (
                    <button
                      onClick={handleResetQuiz}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-[#75758a] hover:text-[#17171c] bg-[#eeece7]/60 hover:bg-[#eeece7] border border-[#d9d9dd] rounded-[8px] transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retake Workout</span>
                    </button>
                  )}
                </div>
                <p className="text-[13.5px] text-[#575768]">
                  Verify your comprehension of today's core concepts before advancing to the next day.
                </p>
              </div>

              {/* Quiz Result Summary Card */}
              {quizSubmitted && (() => {
                const score = calculateQuizScore();
                const isPassed = score.percentage >= 60;
                return (
                  <div className={`p-5 sm:p-6 rounded-[18px] border transition-all duration-200 animate-in zoom-in-95 ${
                    isPassed
                      ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                      : 'bg-[#eeece7]/80 border-[#d9d9dd] text-[#17171c]'
                  }`}>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 ${
                          isPassed ? 'bg-emerald-600 text-white' : 'bg-[#17171c] text-white'
                        }`}>
                          <Award className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-[18px] font-semibold tracking-tight">
                              {score.percentage === 100
                                ? 'Perfect Score! 🎯'
                                : isPassed
                                ? 'Workout Complete! ✨'
                                : 'Workout Finished'}
                            </h3>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/80 border border-current/20">
                              +20 XP
                            </span>
                          </div>
                          <p className="text-[13px] opacity-80 mt-0.5">
                            You scored <strong className="font-semibold">{score.correct}</strong> out of <strong className="font-semibold">{score.total}</strong> ({score.percentage}%) correct.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={handleResetQuiz}
                          className="flex-1 sm:flex-none border-[#d9d9dd] bg-white text-[#17171c]"
                        >
                          <RotateCcw className="w-3.5 h-3.5 mr-1" />
                          <span>Try Again</span>
                        </Button>
                        {next && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => navigate(`/courses/${courseId}/chapter/${next.chapterId}`)}
                            className="flex-1 sm:flex-none"
                          >
                            <span>Next Day →</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}

              <div className="space-y-5">
                {randomizedQuiz.map((q, qIdx) => (
                  <div
                    key={q.id || qIdx}
                    role="group"
                    aria-labelledby={`quiz-q-${qIdx}`}
                    className="p-5 sm:p-6 rounded-[16px] bg-white border border-[#d9d9dd] space-y-4 shadow-2xs"
                  >
                    <p id={`quiz-q-${qIdx}`} className="text-[15.5px] font-semibold text-[#17171c] leading-relaxed">
                      {qIdx + 1}. {q.question}
                    </p>

                    {q.codeSnippet && (
                      <pre className="p-3.5 bg-[#17171c] text-white text-[13px] leading-relaxed rounded-[10px] border border-white/10 font-mono overflow-x-auto">
                        <code>{q.codeSnippet}</code>
                      </pre>
                    )}

                    <div role="radiogroup" aria-labelledby={`quiz-q-${qIdx}`} className="space-y-2">
                      {q.options.map((optItem, optIdx) => {
                        const optId = typeof optItem === 'object' ? optItem.id : String(optIdx);
                        const optText = typeof optItem === 'object' ? optItem.text : String(optItem);
                        const isCorrect = typeof optItem === 'object' ? optItem.isCorrect : (q.correctAnswer === optIdx);
                        
                        const isSelected = selectedAnswers[q.id] === optId;
                        let optionStyle = 'bg-white border-[#d9d9dd] text-[#212121] hover:border-[#17171c]';

                        if (quizSubmitted) {
                          if (isCorrect) {
                            optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-1 ring-emerald-500';
                          } else if (isSelected && !isCorrect) {
                            optionStyle = 'bg-red-50 border-red-300 text-red-950 font-medium';
                          } else {
                            optionStyle = 'bg-white border-[#d9d9dd] text-[#75758a] opacity-60 cursor-not-allowed';
                          }
                        } else if (isSelected) {
                          optionStyle = 'bg-[#17171c] text-white border-[#17171c] font-medium';
                        }

                        return (
                          <button
                            key={optId}
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => !quizSubmitted && handleOptionSelect(q.id, optId)}
                            disabled={quizSubmitted}
                            className={`w-full text-left px-4 py-3 rounded-[10px] border text-[13.5px] transition-all duration-150 flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17171c] ${
                              !quizSubmitted ? 'cursor-pointer' : ''
                            } ${optionStyle}`}
                          >
                            <span>{optText}</span>
                            {quizSubmitted && isCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && q.explanation && (
                      <div className="mt-3.5 p-3.5 bg-[#eeece7]/60 rounded-[10px] border border-[#d9d9dd] text-[13px] text-[#212121] leading-relaxed">
                        <span className="font-semibold text-[#17171c] mr-2">💡 Explanation:</span>
                        <span>{q.explanation}</span>
                      </div>
                    )}
                  </div>
                ))}

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3">
                  {quizSubmitted && (!isAuthenticated || isGuest) ? (
                    <div className="flex items-center gap-2 text-[13px] text-[#575768]">
                      <Sparkles className="w-4 h-4 text-[#ff7759] fill-current shrink-0" />
                      <span>Score saved locally.</span>
                      <button
                        onClick={() => window.dispatchEvent(new CustomEvent('open-auth-prompt', { detail: { reason: 'quiz' } }))}
                        className="text-[#17171c] font-semibold underline hover:text-[#ff7759] cursor-pointer"
                      >
                        Sign in to sync leaderboard rank →
                      </button>
                    </div>
                  ) : <div />}

                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleQuizSubmit}
                    disabled={quizSubmitted || Object.keys(selectedAnswers).length === 0}
                    className="px-8 self-end"
                  >
                    <span>{quizSubmitted ? 'Quiz Submitted ✓' : 'Submit Answers'}</span>
                  </Button>
                </div>
              </div>
            </section>
          )}

          {/* TABPANEL 5: Practice Arena */}
          {activeTab === 'practice' && problems && problems.length > 0 && (
            <section
              id="tabpanel-practice"
              role="tabpanel"
              aria-labelledby="tab-practice"
              className="space-y-6 animate-in fade-in duration-150"
            >
              <div className="space-y-1">
                <h2 className="text-[20px] font-semibold text-[#17171c] tracking-tight">
                  Moodle-Style Practice Assessment
                </h2>
                <p className="text-[13.5px] text-[#575768]">
                  Write code to solve the challenge. Your solution will be automatically graded against test cases.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-[16px] bg-[#eeece7]/40 border border-[#d9d9dd] space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="stone">Beginner</Badge>
                  <h3 className="text-[17px] font-semibold text-[#17171c] tracking-tight">{problems[0].title}</h3>
                </div>
                
                <div className="text-[13.5px] text-[#212121] leading-relaxed whitespace-pre-wrap">
                  {problems[0].description}
                </div>

                {(problems[0].exampleInput || problems[0].exampleOutput) && (
                  <div className="pt-2">
                    <h4 className="text-[12px] font-semibold text-[#17171c] mb-2 uppercase font-mono">Example Test Case:</h4>
                    <div className="overflow-x-auto max-w-full">
                      <table className="text-left text-[13px] border border-[#d9d9dd] bg-white rounded-[8px] overflow-hidden min-w-[300px] w-full">
                        <thead>
                          <tr className="bg-[#eeece7]/40 border-b border-[#d9d9dd]">
                            <th className="py-2 px-3.5 font-medium w-[45%] border-r border-[#d9d9dd] text-[#17171c]">Input</th>
                            <th className="py-2 px-3.5 font-medium w-[55%] text-[#17171c]">Result</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-2 px-3.5 font-mono text-[12px] align-top whitespace-pre-wrap border-r border-[#d9d9dd] text-[#575768]">
                              {problems[0].exampleInput}
                            </td>
                            <td className="py-2 px-3.5 font-mono text-[12px] align-top whitespace-pre-wrap text-[#575768]">
                              {problems[0].exampleOutput}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2 pt-2">
                <div className="text-[13px] font-medium text-[#17171c]">
                  <span>Your Python Solution:</span>
                </div>
                <React.Suspense fallback={<div className="w-full h-[360px] flex items-center justify-center bg-white border border-[#d9d9dd] rounded-[16px] text-[#575768]">Loading practice IDE...</div>}>
                  <CodePlayground
                    code={practiceCode || problems[0].starterCode}
                    onChange={updatePracticeCode}
                    onRun={runPracticeCode}
                    onReset={resetPracticeCode}
                    language="python"
                    executionState={practiceExecState}
                    stdout={practiceStdout}
                    stderr={practiceStderr}
                    executionTimeMs={practiceExecTime}
                    testCaseResults={practiceTestResults}
                    preventPaste={false}
                    height="380px"
                  />
                </React.Suspense>
              </div>
            </section>
          )}

          {/* Bottom Day Pagination Controls */}
          <nav aria-label="Day pagination" className="pt-8 border-t border-[#d9d9dd] flex items-center justify-between gap-4">
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
          </nav>
        </main>

        {/* Right: Sleek Desktop Quick-Jump & Day Overview Sidebar */}
        {!isFocusMode && (
          <aside aria-label="Lesson Outline" className="hidden xl:flex flex-col w-[260px] 2xl:w-[280px] shrink-0 border-l border-[#d9d9dd] bg-[#eeece7]/20 p-5 sticky top-[108px] h-[calc(100vh-108px)] overflow-y-auto space-y-6 select-none transition-all">
            {/* Day Overview Badge */}
            <div className="space-y-2 pb-4 border-b border-[#d9d9dd]">
              <span className="text-[11px] uppercase font-bold text-[#575768] tracking-wider block font-mono">
                Curriculum Progress
              </span>
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-bold text-[#17171c] font-mono">
                  Day {unitDayIndex} of {unitTotalDays}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#17171c] text-white font-mono">
                  {unit.outcomes[0]}
                </span>
              </div>
              <div className="text-[11px] font-mono text-[#575768]">
                Curriculum Day {courseDayNumber} • 46-Day Plan
              </div>
              <div className="text-[12px] text-[#212121] font-medium leading-snug">
                {cleanTitle}
              </div>
            </div>

            {/* Quick Section Jump */}
            <div className="space-y-2">
              <span className="text-[11px] uppercase font-bold text-[#575768] tracking-wider block font-mono">
                On This Page
              </span>
              <nav className="space-y-1 text-[12px]">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left px-3 py-2 rounded-full transition-colors flex items-center justify-between cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17171c] ${
                        isActive
                          ? 'bg-[#17171c] text-white font-medium shadow-xs'
                          : 'text-[#575768] hover:bg-[#eeece7]/60 hover:text-[#17171c]'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-[#575768]'}`} />
                        <span className="truncate">{tab.label}</span>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick Simulation Type Card */}
            {chapter?.simulationType && (
              <div className="p-3.5 bg-white rounded-[14px] border border-[#d9d9dd] space-y-1.5 shadow-2xs">
                <span className="text-[10px] uppercase font-bold text-[#575768] font-mono block">
                  Simulation Engine
                </span>
                <div className="text-[12px] font-semibold text-[#17171c]">
                  {chapter.simulationType}
                </div>
                <p className="text-[11px] text-[#575768] leading-snug">
                  Step-by-step state visualization for {cleanTitle}.
                </p>
              </div>
            )}

            {/* Fast Day Jump Controls */}
            <div className="pt-2 space-y-2 border-t border-[#d9d9dd]">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleCompleteAndNext}
                className="w-full justify-between text-[12px]"
              >
                <span>{isChapterDone ? 'Advance Next Day' : 'Complete & Advance'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </aside>
        )}
      </div>

      {/* Floating Action Button (Mobile) - For Sandbox */}
      {activeTab === 'sandbox' && (
        <div className="md:hidden fixed bottom-6 right-4 z-40">
          <button
            onClick={handleRunSandbox}
            disabled={sandboxExecState === 'RUNNING'}
            className="flex items-center justify-center w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg shadow-emerald-500/30 transition-transform active:scale-95 disabled:opacity-70 disabled:active:scale-100"
            aria-label="Run Sandbox Code"
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
        title="Interactive Python Sandbox"
        subtitle="In-browser client execution with isolated WebAssembly worker"
        badge={
          <Badge variant="stone" className="text-[11px] font-mono hidden xs:inline-flex">
            Pyodide 3.11
          </Badge>
        }
        size="xl"
      >
        <div className="space-y-4">
          <React.Suspense fallback={<div className="w-full h-[280px] flex items-center justify-center text-[#575768] bg-[#fafafa] rounded-[12px] border border-[#d9d9dd]">Loading Python IDE...</div>}>
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
              height="clamp(200px, 35vh, 400px)"
            />
          </React.Suspense>
        </div>
      </Modal>
    </div>
  );
}
