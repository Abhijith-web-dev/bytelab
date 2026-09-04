import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Code, CheckCircle2, AlertTriangle, Lightbulb, RotateCcw, ChevronRight, BookOpen, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button } from '../../components/ui/Button.jsx';
import { Badge } from '../../components/ui/Badge.jsx';
import { Card } from '../../components/ui/Card.jsx';
import { CodePlayground } from '../../components/editor/CodePlayground.jsx';
import { SubNavFrosted } from '../../components/layout/SubNavFrosted.jsx';
import { getAllProblems, getProblemById } from '../../content/loader/index.js';
import { usePracticeStore } from '../../stores/practiceStore.js';
import { useProgressStore } from '../../stores/progressStore.js';
import { useAuthStore } from '../../stores/authStore.js';

export function PracticePage() {
  const params = useParams();
  const requestedProblemId = params.problemId;
  const allProblems = getAllProblems('python-programming');

  const { isAuthenticated } = useAuthStore();
  const { solvedProblems } = useProgressStore();
  const {
    problem,
    code,
    language,
    executionState,
    stdout,
    stderr,
    executionTimeMs,
    testCaseResults,
    loadProblem,
    updateCode,
    resetCode,
    runCode
  } = usePracticeStore();

  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showHintIndex, setShowHintIndex] = useState(-1);

  // Select active problem
  useEffect(() => {
    let target = null;
    if (requestedProblemId) {
      target = getProblemById(requestedProblemId);
    }
    if (!target && allProblems.length > 0) {
      target = allProblems[0];
    }
    if (target) {
      loadProblem(target);
      setShowHintIndex(-1);
    }
  }, [requestedProblemId]);

  // Celebrate with confetti when all tests pass
  useEffect(() => {
    if (executionState === 'PASSED') {
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.7 }
        });
      } catch (e) {
        // ignore
      }
    }
  }, [executionState]);

  const filteredProblems = allProblems.filter(p => {
    if (selectedDifficulty === 'all') return true;
    return p.difficulty === selectedDifficulty;
  });

  const isCurrentSolved = Boolean(problem?.id && solvedProblems[problem.id]?.passed);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SubNavFrosted
        title="Coding Playground"
        subtitle={problem ? `${problem.title} • ${problem.difficulty}` : 'Active Coding Challenges'}
        ctaLabel="Take Assessment"
        ctaLink="/tests"
      />

      <div className="flex-1 max-w-[1440px] w-full mx-auto p-4 md:px-8 md:py-8 flex flex-col lg:flex-row gap-6">
        {/* Multi-Language Playground Switcher Strip */}
        <div className="w-full lg:hidden flex items-center justify-between pb-2 border-b border-[#d9d9dd] text-[12px]">
          <div className="flex items-center gap-1.5 font-medium text-[#17171c]">
            <span className="w-2 h-2 rounded-full bg-[#003c33]" />
            <span>Python 3.11 Runtime</span>
          </div>
          <span className="text-[#75758a] text-[11px] font-mono">WASM WORKER</span>
        </div>

        {/* Left: Problem Details & Directory */}
        <div className="w-full lg:w-[420px] shrink-0 space-y-6">
          {/* Active Problem Card */}
          {problem && (
            <div className="p-6 rounded-[18px] bg-white border border-[#d9d9dd] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="stone">{problem.difficulty}</Badge>
                  {problem.coMapping?.[0] && <Badge variant="coral">{problem.coMapping[0]}</Badge>}
                  <span className="text-[11px] font-mono text-[#75758a] bg-[#eeece7]/50 border border-[#d9d9dd] px-2 py-0.5 rounded-full">
                    Python 3.11
                  </span>
                </div>
                {isCurrentSolved && (
                  <div className="flex items-center gap-1 text-emerald-600 text-[12px] font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Solved ✓</span>
                  </div>
                )}
              </div>

              <h1 className="text-[22px] font-medium text-[#17171c] tracking-tight">
                {problem.title}
              </h1>

              <div className="text-[14px] text-[#212121] whitespace-pre-wrap leading-relaxed">
                {problem.description}
              </div>

              {/* Skills Tags */}
              {problem.skills?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {problem.skills.map(s => (
                    <span key={s} className="text-[11px] bg-[#eeece7]/40 border border-[#d9d9dd] px-2.5 py-0.5 rounded-full text-[#75758a]">
                      #{s}
                    </span>
                  ))}
                </div>
              )}

              {/* Progressive Hints Drawer */}
              {problem.hints?.length > 0 && (
                <div className="pt-4 border-t border-[#d9d9dd] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-medium text-[#17171c] flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-[#ff7759]" />
                      <span>Hints ({showHintIndex + 1}/{problem.hints.length})</span>
                    </span>
                    {showHintIndex < problem.hints.length - 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowHintIndex(prev => prev + 1)}
                        className="text-[12px] text-[#17171c]"
                      >
                        Reveal Next Hint
                      </Button>
                    )}
                  </div>

                  {showHintIndex >= 0 && (
                    <div className="space-y-1.5 animate-in fade-in duration-150">
                      {problem.hints.slice(0, showHintIndex + 1).map((h, idx) => (
                        <div key={idx} className="p-3 bg-[#eeece7]/60 text-[#212121] rounded-[10px] text-[13px] border border-[#d9d9dd]">
                          <b className="text-[#17171c]">Hint {idx + 1}:</b> {h}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Problem Directory & Selector */}
          <div className="rounded-[18px] bg-white border border-[#d9d9dd] p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#d9d9dd]">
              <h3 className="text-[14px] font-medium text-[#17171c] flex items-center gap-2">
                <Code className="w-4 h-4 text-[#17171c]" />
                <span>All Practice Challenges</span>
              </h3>
              <span className="text-[12px] text-[#75758a] font-mono">
                {Object.values(solvedProblems).filter(p => p.passed).length}/{allProblems.length} Solved
              </span>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-1 bg-[#eeece7]/50 p-1 rounded-full text-[12px] border border-[#d9d9dd]">
              {['all', 'beginner', 'intermediate', 'advanced'].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`flex-1 py-1 rounded-full capitalize transition-all cursor-pointer ${
                    selectedDifficulty === diff
                      ? 'bg-[#17171c] text-white font-medium shadow-xs'
                      : 'text-[#75758a] hover:text-[#17171c]'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>

            {/* Problem List */}
            <div className="max-h-[300px] overflow-y-auto space-y-1 pr-1">
              {filteredProblems.map((p) => {
                const isSelected = problem?.id === p.id;
                const isPassed = Boolean(solvedProblems[p.id]?.passed);

                return (
                  <Link
                    key={p.id}
                    to={`/practice/${p.id}`}
                    className={`p-2.5 rounded-[10px] flex items-center justify-between text-[13px] transition-all group ${
                      isSelected
                        ? 'bg-[#17171c] text-white font-medium shadow-xs'
                        : 'hover:bg-[#eeece7]/40 text-[#212121]'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {isPassed ? (
                        <CheckCircle2 className={`w-4 h-4 shrink-0 ${isSelected ? 'text-emerald-400' : 'text-emerald-600'}`} />
                      ) : (
                        <div className={`w-2 h-2 rounded-full shrink-0 ${isSelected ? 'bg-white' : 'bg-[#d9d9dd]'}`} />
                      )}
                      <span className="truncate">{p.title}</span>
                    </div>
                    <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-full shrink-0 ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-[#eeece7]/60 border border-[#d9d9dd] text-[#75758a]'
                    }`}>
                      {p.difficulty}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Monaco Editor Playground */}
        <div className="flex-1 min-w-0 space-y-4">
          <CodePlayground
            code={code}
            onChange={(val) => updateCode(val)}
            onRun={runCode}
            onReset={resetCode}
            language={language}
            executionState={executionState}
            stdout={stdout}
            stderr={stderr}
            executionTimeMs={executionTimeMs}
            testCaseResults={testCaseResults}
            preventPaste={true}
            height="480px"
          />

          {!isAuthenticated && (
            <div className="p-4 rounded-[16px] bg-[#eeece7]/40 border border-[#d9d9dd] text-[#212121] flex flex-col sm:flex-row items-center justify-between gap-3 text-[14px]">
              <span className="text-[#75758a]">Sign in to automatically sync your solved problems to the leaderboard.</span>
              <Link to="/login">
                <Button variant="primary" size="sm" className="shrink-0">
                  Sign In
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
