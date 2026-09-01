import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Clock, CheckCircle2, XCircle, Award, AlertCircle, ArrowLeft, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button } from '../../components/ui/Button.jsx';
import { Badge } from '../../components/ui/Badge.jsx';
import { Card } from '../../components/ui/Card.jsx';
import { ProgressBar } from '../../components/ui/ProgressBar.jsx';
import { SubNavFrosted } from '../../components/layout/SubNavFrosted.jsx';
import { useTestStore } from '../../stores/testStore.js';
import { useAuthStore } from '../../stores/authStore.js';

export function TestSessionPage() {
  const [searchParams] = useSearchParams();
  const unitParam = searchParams.get('unit');
  const chapterParam = searchParams.get('chapter');

  const { isAuthenticated } = useAuthStore();
  const {
    activeSession,
    currentQuestionIndex,
    userAnswers,
    timeRemainingSeconds,
    isSubmitted,
    evaluationResult,
    startTest,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    goToQuestion,
    decrementTimer,
    submitTest,
    resetTest
  } = useTestStore();

  // Initialize test if not already active
  useEffect(() => {
    if (!activeSession) {
      startTest({
        courseId: 'python-programming',
        unitId: unitParam || null,
        chapterId: chapterParam || null,
        count: 5,
        timeLimitMinutes: 10
      });
    }
  }, [unitParam, chapterParam]);

  // Timer interval
  useEffect(() => {
    if (!activeSession || isSubmitted) return;

    const interval = setInterval(() => {
      decrementTimer();
    }, 1000);

    return () => clearInterval(interval);
  }, [activeSession, isSubmitted, decrementTimer]);

  // Confetti on passing score
  useEffect(() => {
    if (isSubmitted && evaluationResult?.passed) {
      try {
        confetti({
          particleCount: 100,
          spread: 90,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore
      }
    }
  }, [isSubmitted, evaluationResult]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleRestart = () => {
    resetTest();
    startTest({
      courseId: 'python-programming',
      unitId: unitParam || null,
      chapterId: chapterParam || null,
      count: 5,
      timeLimitMinutes: 10
    });
  };

  if (!activeSession) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-[#737373]">Initializing assessment session...</div>
      </div>
    );
  }

  const currentQ = activeSession.questions[currentQuestionIndex];
  const totalQ = activeSession.questions.length;
  const answeredCount = Object.keys(userAnswers).length;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SubNavFrosted
        title={activeSession.unitId ? `Assessment: ${activeSession.unitId.toUpperCase()}` : 'Randomized Course Assessment'}
        subtitle={isSubmitted ? 'Evaluation Report' : `Question ${currentQuestionIndex + 1} of ${totalQ}`}
        rightElement={
          !isSubmitted && (
            <div className={`flex items-center gap-2 px-3.5 py-1 rounded-full text-[13px] font-mono font-semibold ${
              timeRemainingSeconds < 120
                ? 'bg-red-50 text-red-600 border border-red-200 animate-pulse'
                : 'bg-[#fafafa] text-[#000000] border border-[#e5e5e5]'
            }`}>
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTime(timeRemainingSeconds)}</span>
            </div>
          )
        }
      />

      <main className="max-w-3xl mx-auto w-full p-4 md:p-8 flex-1 flex flex-col justify-between space-y-8">
        {!isSubmitted ? (
          /* ACTIVE TEST IN PROGRESS */
          <div className="space-y-6">
            {/* Progress Bar & Question Navigator */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[13px] text-[#737373]">
                <span>Progress: {answeredCount}/{totalQ} answered</span>
                <span className="font-semibold text-black">{Math.round((answeredCount/totalQ)*100)}%</span>
              </div>
              <ProgressBar value={answeredCount} max={totalQ} size="sm" barColor="bg-black" />

              {/* Question Number Pills */}
              <div className="flex gap-2 pt-1 overflow-x-auto">
                {activeSession.questions.map((q, idx) => {
                  const isAnswered = Boolean(userAnswers[q.id]);
                  const isCurrent = idx === currentQuestionIndex;

                  return (
                    <button
                      key={q.id}
                      onClick={() => goToQuestion(idx)}
                      className={`w-8 h-8 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-black text-white shadow-xs'
                          : isAnswered
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                          : 'bg-[#fafafa] text-[#737373] hover:bg-[#e5e5e5] border border-[#e5e5e5]'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question Card */}
            {currentQ && (
              <div className="p-6 sm:p-8 rounded-[16px] bg-white border border-slate-200 space-y-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-bold text-slate-500 font-mono tracking-wider">
                    QUESTION #{currentQuestionIndex + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    <Badge variant={currentQ.difficulty}>{currentQ.difficulty}</Badge>
                    {currentQ.coMapping?.[0] && <Badge variant="co">{currentQ.coMapping[0]}</Badge>}
                  </div>
                </div>

                <h2 className="text-[18px] sm:text-[22px] font-bold text-slate-900 leading-snug">
                  {currentQ.question}
                </h2>

                {currentQ.codeSnippet && (
                  <pre className="p-5 bg-[#0f111a] text-slate-50 rounded-[10px] font-mono text-[14px] overflow-x-auto leading-loose border border-slate-800 shadow-inner">
                    <code>{currentQ.codeSnippet}</code>
                  </pre>
                )}

                {/* Multiple Choice Options */}
                {currentQ.options && (
                  <div className="space-y-3 pt-3">
                    {currentQ.options.map((opt) => {
                      const isSelected = userAnswers[currentQ.id] === opt.id;

                      return (
                        <button
                          key={opt.id}
                          onClick={() => selectAnswer(currentQ.id, opt.id)}
                          className={`w-full px-5 py-4 rounded-[12px] border text-left text-[15px] transition-all duration-200 ease-in-out cursor-pointer flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-slate-400 ${
                            isSelected
                              ? 'bg-slate-900 text-white font-semibold border-slate-900 shadow-md ring-2 ring-slate-900 ring-offset-1'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400 hover:bg-slate-50 font-medium shadow-sm'
                          }`}
                        >
                          <span>{opt.text}</span>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-3 transition-colors ${
                            isSelected ? 'border-white bg-white text-slate-900' : 'border-slate-300'
                          }`}>
                            {isSelected && <div className="w-2 h-2 rounded-full bg-slate-900" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Bottom Nav Actions */}
            <div className="flex items-center justify-between pt-6">
              <Button
                variant="secondary"
                size="md"
                onClick={prevQuestion}
                disabled={currentQuestionIndex === 0}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>

              <div className="flex items-center gap-3">
                {currentQuestionIndex < totalQ - 1 ? (
                  <Button variant="primary" size="md" onClick={nextQuestion}>
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button variant="primary" size="md" onClick={submitTest} className="bg-emerald-600 hover:bg-emerald-700">
                    <span>Submit Assessment</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* POST-SUBMISSION RESULTS EVALUATION */
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Score Banner Card */}
            <div className={`p-8 rounded-[12px] border text-center space-y-3 ${
              evaluationResult.passed
                ? 'bg-emerald-50/50 border-emerald-200'
                : 'bg-amber-50/50 border-amber-200'
            }`}>
              <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center text-white bg-black shadow-xs">
                <Award className="w-6 h-6" />
              </div>

              <h1 className="text-[28px] font-semibold text-[#000000] tracking-tight">
                {evaluationResult.passed ? 'Assessment Passed! 🎉' : 'Assessment Completed'}
              </h1>

              <div className="text-[44px] font-bold text-[#000000] font-mono">
                {evaluationResult.score} <span className="text-[20px] text-[#737373]">/ {evaluationResult.maxScore}</span>
              </div>

              <p className="text-[15px] text-[#737373] max-w-md mx-auto">
                You achieved a score of <b>{evaluationResult.percentage}%</b>. Your outcome mastery ratings have been updated.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <Button variant="primary" size="md" onClick={handleRestart}>
                  <RotateCcw className="w-4 h-4" />
                  <span>Take Another Test</span>
                </Button>
                <Link to="/progress">
                  <Button variant="secondary" size="md">
                    <span>View Outcome Mastery</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Course Outcomes Breakdown */}
            <div className="p-6 rounded-[12px] bg-[#fafafa] border border-[#e5e5e5] space-y-3">
              <h3 className="text-[15px] font-semibold text-[#000000]">
                Course Outcome Performance Breakdown
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {Object.entries(evaluationResult.coBreakdown || {}).map(([co, stat]) => (
                  <div key={co} className="p-3 bg-white rounded-[8px] border border-[#e5e5e5] text-center">
                    <span className="text-[11px] font-mono font-bold text-black block">{co}</span>
                    <span className="text-[16px] font-semibold text-[#000000]">{stat.correct}/{stat.total}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Answer Review */}
            <div className="space-y-4">
              <h3 className="text-[18px] font-semibold text-[#000000]">
                Detailed Question Review
              </h3>

              <div className="space-y-3">
                {evaluationResult.details.map((d, idx) => (
                  <div
                    key={d.questionId || idx}
                    className={`p-5 rounded-[12px] border ${
                      d.isCorrect
                        ? 'bg-emerald-50/40 border-emerald-200'
                        : 'bg-red-50/40 border-red-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="text-[12px] font-bold text-[#000000] font-mono">
                        QUESTION #{idx + 1}
                      </span>
                      <div className="flex items-center gap-1.5 font-semibold text-[12px]">
                        {d.isCorrect ? (
                          <span className="text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> Correct
                          </span>
                        ) : (
                          <span className="text-red-700 flex items-center gap-1">
                            <XCircle className="w-4 h-4" /> Incorrect
                          </span>
                        )}
                      </div>
                    </div>

                    <h4 className="text-[15px] font-semibold text-[#000000] mb-2">
                      {d.question}
                    </h4>

                    {d.codeSnippet && (
                      <pre className="p-3 bg-[#171717] text-white text-[12px] rounded-[6px] font-mono mb-2 overflow-x-auto">
                        <code>{d.codeSnippet}</code>
                      </pre>
                    )}

                    <div className="text-[13px] space-y-1 bg-white p-3 rounded-[8px] border border-black/5">
                      <div>
                        <span className="text-[#737373]">Your Answer: </span>
                        <span className={`font-semibold ${d.isCorrect ? 'text-emerald-700' : 'text-red-600'}`}>
                          {d.selectedText}
                        </span>
                      </div>
                      {!d.isCorrect && (
                        <div>
                          <span className="text-[#737373]">Correct Answer: </span>
                          <span className="font-semibold text-emerald-700">{d.correctText}</span>
                        </div>
                      )}
                    </div>

                    {d.explanation && (
                      <p className="text-[12px] text-[#525252] mt-2 leading-relaxed bg-black/5 p-2 rounded-[6px]">
                        💡 <b>Explanation:</b> {d.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
