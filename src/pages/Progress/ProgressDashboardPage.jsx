import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Award,
  CheckCircle2,
  Flame,
  TrendingUp,
  BookOpen,
  Code,
  Clock,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Button } from '../../components/ui/Button.jsx';
import { Badge } from '../../components/ui/Badge.jsx';
import { Card } from '../../components/ui/Card.jsx';
import { ProgressBar } from '../../components/ui/ProgressBar.jsx';
import { SubNavFrosted } from '../../components/layout/SubNavFrosted.jsx';
import { useProgressStore } from '../../stores/progressStore.js';
import { useAuthStore } from '../../stores/authStore.js';
import { getCourse, getChapter, getNavigationHierarchy, cleanChapterTitle } from '../../content/loader/index.js';
import { trackUnitNavigation, trackEvent } from '../../services/firebase/analytics.js';
import { useSEO } from '../../hooks/useSEO.js';

// Map Outcome codes to their respective unit ID
const CO_TO_UNIT_MAP = {
  CO1: 'unit-01',
  CO2: 'unit-02',
  CO3: 'unit-03',
  CO4: 'unit-04',
  CO5: 'unit-05'
};

export function ProgressDashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const {
    completedChapters,
    solvedProblems,
    getOutcomeMastery,
    totalPoints,
    streakDays,
    testScores = {},
    getCourseCompletionPercentage
  } = useProgressStore();

  const courseId = 'python-programming';
  const course = getCourse(courseId);
  const hierarchy = getNavigationHierarchy(courseId);
  const courseCompletionPercent = getCourseCompletionPercentage();
  const coMastery = getOutcomeMastery();
  const testHistory = Object.values(testScores);
  const solvedCount = Object.values(solvedProblems).filter(p => p.passed).length;

  useSEO({
    title: 'Outcome Analytics & Learning Progress | ByteLab',
    description: 'Track your university syllabus course outcome mastery, unit completion, and hands-on coding milestones.'
  });

  // Find first uncompleted day in the entire course
  const nextGlobalItem = hierarchy.find(h => !completedChapters.includes(h.chapterId)) || hierarchy[0];

  const handleUnitClick = (unitId, source = 'progress_unit_card') => {
    trackUnitNavigation({ courseId, unitId, fromSource: source });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SubNavFrosted
        title="Outcome Analytics & Mastery"
        subtitle={`${course.code} • ${completedChapters.length} of ${hierarchy.length} Days Completed`}
        breadcrumbs={[
          { label: 'Courses', path: '/courses' },
          { label: course.code, path: `/courses/${courseId}` },
          { label: 'Progress & Analytics', path: '/progress' }
        ]}
        ctaLabel={completedChapters.length > 0 ? "Continue Lesson" : "Start 46-Day Plan"}
        ctaLink={`/courses/${courseId}/chapter/${nextGlobalItem?.chapterId || 'day-01'}`}
      />

      <main className="max-w-[1280px] mx-auto w-full px-4 md:px-8 py-10 sm:py-14 space-y-12">
        {/* KPI Metrics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 sm:p-6 rounded-[18px] bg-[#eeece7]/40 border border-[#d9d9dd] space-y-2">
            <div className="flex items-center justify-between text-[#75758a] text-[13px]">
              <span className="font-medium">Curriculum Progress</span>
              <BookOpen className="w-4 h-4 text-[#17171c]" />
            </div>
            <div className="text-[28px] sm:text-[32px] font-bold text-[#17171c] font-mono">
              {courseCompletionPercent}%
            </div>
            <ProgressBar value={courseCompletionPercent} size="sm" barColor="bg-[#17171c]" />
            <div className="text-[11px] text-[#75758a] font-mono pt-1">
              {completedChapters.length} of {hierarchy.length} Days Finished
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-[18px] bg-[#eeece7]/40 border border-[#d9d9dd] space-y-2">
            <div className="flex items-center justify-between text-[#75758a] text-[13px]">
              <span className="font-medium">Problems Solved</span>
              <Code className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-[28px] sm:text-[32px] font-bold text-[#17171c] font-mono">
              {solvedCount}
            </div>
            <ProgressBar value={Math.min(100, Math.round((solvedCount / 46) * 100))} size="sm" barColor="bg-emerald-600" />
            <span className="text-[11px] text-[#75758a] block pt-1">Verified with Pyodide WASM</span>
          </div>

          <div className="p-5 sm:p-6 rounded-[18px] bg-[#eeece7]/40 border border-[#d9d9dd] space-y-2">
            <div className="flex items-center justify-between text-[#75758a] text-[13px]">
              <span className="font-medium">Verified Points</span>
              <Award className="w-4 h-4 text-[#ff7759]" />
            </div>
            <div className="text-[28px] sm:text-[32px] font-bold text-[#17171c] font-mono">
              {totalPoints} <span className="text-[16px] font-normal text-[#75758a]">XP</span>
            </div>
            <ProgressBar value={Math.min(100, Math.round((totalPoints / 1000) * 100))} size="sm" barColor="bg-[#ff7759]" />
            <span className="text-[11px] text-[#75758a] block pt-1">From quizzes & practical code</span>
          </div>

          <div className="p-5 sm:p-6 rounded-[18px] bg-[#eeece7]/40 border border-[#d9d9dd] space-y-2">
            <div className="flex items-center justify-between text-[#75758a] text-[13px]">
              <span className="font-medium">Active Streak</span>
              <Flame className="w-4 h-4 text-amber-500 fill-current" />
            </div>
            <div className="text-[28px] sm:text-[32px] font-bold text-[#17171c] font-mono">
              {streakDays} <span className="text-[16px] font-normal text-[#75758a]">Days</span>
            </div>
            <ProgressBar value={Math.min(100, (streakDays / 30) * 100)} size="sm" barColor="bg-amber-500" />
            <span className="text-[11px] text-[#75758a] block pt-1">Daily practice consistency</span>
          </div>
        </div>

        {/* Unit-by-Unit Progress & Quick Navigation Directory */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="space-y-1">
              <h2 className="text-[24px] font-medium text-[#17171c] tracking-tight flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#17171c]" />
                <span>Unit Breakdown & Syllabus Navigation</span>
              </h2>
              <p className="text-[14px] text-[#75758a]">
                Directly jump into any unit overview, resume your next lecture, or launch chapter assessments.
              </p>
            </div>
            <Link to={`/courses/${courseId}`}>
              <Button variant="secondary" size="sm">
                <span>View Full Course Syllabus</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {course.units.map((unit) => {
              const unitChapters = unit.chapters || [];
              const completedInUnit = unitChapters.filter(ch => completedChapters.includes(ch)).length;
              const unitPercent = unitChapters.length > 0 ? Math.round((completedInUnit / unitChapters.length) * 100) : 0;
              const nextUnfinished = unitChapters.find(ch => !completedChapters.includes(ch)) || unitChapters[0];
              const isUnitComplete = completedInUnit === unitChapters.length && unitChapters.length > 0;

              return (
                <div
                  key={unit.id}
                  className={`p-6 sm:p-7 rounded-[20px] border transition-all ${
                    isUnitComplete
                      ? 'bg-emerald-50/20 border-emerald-200'
                      : 'bg-white border-[#d9d9dd] hover:border-[#17171c]/60'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    {/* Unit Info & Overview */}
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="text-[12px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#17171c] text-white">
                          {unit.romanNumber}
                        </span>
                        <Badge variant="coral">{unit.outcomes[0]}</Badge>
                        <span className="text-[12px] text-[#75758a] font-mono">
                          • {unit.periods} Periods • {unitChapters.length} Days
                        </span>
                        {isUnitComplete && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Unit Completed
                          </span>
                        )}
                      </div>

                      <div>
                        <h3 className="text-[18px] sm:text-[20px] font-medium text-[#17171c] leading-snug">
                          {unit.title}
                        </h3>
                        <p className="text-[13px] text-[#75758a] mt-1 leading-relaxed line-clamp-2 max-w-3xl">
                          {unit.description}
                        </p>
                      </div>

                      {/* Unit Days Mini-Pill Timeline */}
                      <div className="pt-2 space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] font-mono text-[#75758a]">
                          <span>Lectures Progress ({completedInUnit}/{unitChapters.length})</span>
                          <span className="font-bold text-[#17171c]">{unitPercent}%</span>
                        </div>
                        <ProgressBar
                          value={unitPercent}
                          size="sm"
                          barColor={isUnitComplete ? "bg-emerald-600" : "bg-[#17171c]"}
                        />
                        <div className="flex flex-wrap items-center gap-1.5 pt-2">
                          {unitChapters.map((chFolder, chIdx) => {
                            const isChDone = completedChapters.includes(chFolder);
                            const navItem = hierarchy.find(h => h.unitId === unit.id && h.chapterId === chFolder);
                            const unitDay = navItem?.unitDayIndex || (chIdx + 1);

                            return (
                              <Link
                                key={chFolder}
                                to={`/courses/${courseId}/chapter/${chFolder}`}
                                onClick={() => handleUnitClick(unit.id, `mini_day_pill_${chFolder}`)}
                                title={`Day ${unitDay}: ${navItem?.shortTitle || chFolder}`}
                                className={`px-2.5 py-1 text-[11px] font-mono rounded-md border transition-all flex items-center gap-1 select-none ${
                                  isChDone
                                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100 font-semibold'
                                    : 'bg-[#eeece7]/40 border-[#d9d9dd] text-[#17171c] hover:border-[#17171c]'
                                }`}
                              >
                                {isChDone ? (
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                ) : (
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#93939f]" />
                                )}
                                <span>Day {unitDay}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Unit Actions Panel */}
                    <div className="flex flex-row lg:flex-col items-center lg:items-end justify-end gap-2.5 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#d9d9dd]">
                      <Link
                        to={`/courses/${courseId}/unit/${unit.id}`}
                        onClick={() => handleUnitClick(unit.id, 'explore_unit_btn')}
                        className="w-full sm:w-auto"
                      >
                        <Button variant="secondary" size="sm" className="w-full justify-center">
                          <span>Explore Unit</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>

                      <Link
                        to={`/courses/${courseId}/chapter/${nextUnfinished}`}
                        onClick={() => handleUnitClick(unit.id, 'resume_lecture_btn')}
                        className="w-full sm:w-auto"
                      >
                        <Button variant="primary" size="sm" className="w-full justify-center">
                          <span>{completedInUnit > 0 ? (isUnitComplete ? "Review Unit" : "Resume Lecture") : "Start Unit"}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>

                      <Link
                        to={`/tests?unit=${unit.id}`}
                        onClick={() => trackEvent('launch_unit_assessment', { unitId: unit.id })}
                        className="w-full sm:w-auto"
                      >
                        <Button variant="ghost" size="sm" className="w-full justify-center text-[12px] text-[#75758a] hover:text-[#17171c]">
                          <span>Unit Assessment</span>
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Course Outcomes (CO1 - CO5) Matrix */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-[22px] font-medium text-[#17171c] tracking-tight flex items-center gap-2">
              <Award className="w-5 h-5 text-[#17171c]" />
              <span>Course Outcome Mastery (CO1 – CO5)</span>
            </h2>
            <p className="text-[14px] text-[#75758a]">
              Outcome proficiency dynamically calculated from interactive quiz submissions and coding problem completions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {course.outcomes.map((co) => {
              const mastery = coMastery[co.code]?.percent || 0;
              const targetUnitId = CO_TO_UNIT_MAP[co.code] || 'unit-01';
              let statusLabel = 'In Progress';
              if (mastery >= 80) statusLabel = 'Mastered';
              else if (mastery >= 50) statusLabel = 'Proficient';

              return (
                <div
                  key={co.code}
                  className="p-6 rounded-[18px] bg-white border border-[#d9d9dd] space-y-4 hover:border-[#17171c] transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-bold text-[#17171c] font-mono">{co.code}</span>
                        <Badge variant="coral">{co.bloomLevel}</Badge>
                      </div>
                      <span className="text-[13px] font-semibold text-[#17171c] font-mono">{mastery}%</span>
                    </div>

                    <p className="text-[13px] text-[#212121] leading-snug">
                      {co.statement}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-[#d9d9dd]/60">
                    <ProgressBar
                      value={mastery}
                      size="sm"
                      barColor={mastery >= 75 ? "bg-emerald-600" : "bg-[#17171c]"}
                    />
                    <div className="flex items-center justify-between text-[11px] text-[#75758a]">
                      <span>Level: <strong className="text-[#17171c] font-medium">{statusLabel}</strong></span>
                      <Link
                        to={`/courses/${courseId}/unit/${targetUnitId}`}
                        onClick={() => handleUnitClick(targetUnitId, `co_card_${co.code}`)}
                        className="text-[#17171c] hover:underline font-semibold flex items-center gap-1"
                      >
                        <span>Jump to Unit</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Assessment History Table */}
        <section className="space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <h2 className="text-[22px] font-medium text-[#17171c] tracking-tight">
                Recent Assessment Records
              </h2>
              <p className="text-[13px] text-[#75758a]">
                Verified score history logged across timed chapter and unit evaluations.
              </p>
            </div>
            <Link to="/tests">
              <Button variant="primary" size="sm">
                <span>Take New Assessment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          {testHistory.length === 0 ? (
            <div className="p-10 rounded-[18px] bg-[#eeece7]/30 border border-[#d9d9dd] text-center space-y-3">
              <p className="text-[14px] text-[#75758a]">No timed assessments completed yet.</p>
              <Link to="/tests">
                <Button variant="secondary" size="sm">
                  Start Your First Assessment
                </Button>
              </Link>
            </div>
          ) : (
            <div className="rounded-[18px] bg-white border border-[#d9d9dd] overflow-hidden shadow-xs">
              <table className="w-full text-left text-[13px]">
                <thead className="bg-[#eeece7]/50 border-b border-[#d9d9dd] text-[#75758a] text-[12px] font-medium">
                  <tr>
                    <th className="p-4 font-semibold">Date</th>
                    <th className="p-4 font-semibold">Scope</th>
                    <th className="p-4 font-semibold">Score</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d9d9dd]/60">
                  {testHistory.slice(-5).reverse().map((test, idx) => {
                    const unitTarget = test.unitId ? `/courses/${courseId}/unit/${test.unitId}` : `/courses/${courseId}`;
                    return (
                      <tr key={idx} className="hover:bg-[#eeece7]/20 transition-colors">
                        <td className="p-4 text-[#75758a] font-mono text-[12px]">
                          {new Date(test.timestamp).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <Link
                            to={unitTarget}
                            onClick={() => test.unitId && handleUnitClick(test.unitId, 'assessment_table')}
                            className="font-medium text-[#17171c] hover:underline font-mono"
                          >
                            {test.unitId ? test.unitId.toUpperCase() : 'Full Course'}
                          </Link>
                        </td>
                        <td className="p-4 font-mono font-semibold text-[#17171c]">
                          {test.score}/{test.maxScore} ({test.percentage}%)
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            test.passed ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {test.passed ? <CheckCircle2 className="w-3 h-3" /> : null}
                            {test.passed ? 'Passed' : 'Needs Review'}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <Link
                            to={test.unitId ? `/tests?unit=${test.unitId}` : '/tests'}
                            className="text-[12px] text-[#17171c] font-semibold hover:underline"
                          >
                            Retake →
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
