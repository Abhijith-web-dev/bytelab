import React from 'react';
import { Link } from 'react-router-dom';
import { Award, CheckCircle2, Flame, TrendingUp, BookOpen, Code, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button.jsx';
import { Badge } from '../../components/ui/Badge.jsx';
import { Card } from '../../components/ui/Card.jsx';
import { ProgressBar } from '../../components/ui/ProgressBar.jsx';
import { SubNavFrosted } from '../../components/layout/SubNavFrosted.jsx';
import { useProgressStore } from '../../stores/progressStore.js';
import { useAuthStore } from '../../stores/authStore.js';
import { getCourse } from '../../content/loader/index.js';

export function ProgressDashboardPage() {
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

  const course = getCourse('python-programming');
  const courseCompletionPercent = getCourseCompletionPercentage();
  const coMastery = getOutcomeMastery();
  const testHistory = Object.values(testScores);
  const solvedCount = Object.values(solvedProblems).filter(p => p.passed).length;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SubNavFrosted
        title="Outcome Analytics & Mastery"
        subtitle="19AI301 / CS3301 Progress"
        ctaLabel="Take Assessment"
        ctaLink="/tests"
      />

      <main className="max-w-[1280px] mx-auto w-full px-4 md:px-8 py-10 space-y-10">
        {/* KPI Metrics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-[12px] bg-[#fafafa] border border-[#e5e5e5] space-y-2">
            <div className="flex items-center justify-between text-[#737373] text-[13px]">
              <span>Course Completion</span>
              <BookOpen className="w-4 h-4 text-black" />
            </div>
            <div className="text-[28px] font-bold text-[#000000] font-mono">
              {courseCompletionPercent}%
            </div>
            <ProgressBar value={courseCompletionPercent} size="sm" barColor="bg-black" />
          </div>

          <div className="p-5 rounded-[12px] bg-[#fafafa] border border-[#e5e5e5] space-y-2">
            <div className="flex items-center justify-between text-[#737373] text-[13px]">
              <span>Coding Problems Solved</span>
              <Code className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-[28px] font-bold text-[#000000] font-mono">
              {solvedCount}
            </div>
            <span className="text-[12px] text-[#737373]">All verified in Pyodide</span>
          </div>

          <div className="p-5 rounded-[12px] bg-[#fafafa] border border-[#e5e5e5] space-y-2">
            <div className="flex items-center justify-between text-[#737373] text-[13px]">
              <span>Verified Points</span>
              <Award className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-[28px] font-bold text-[#000000] font-mono">
              {totalPoints} pts
            </div>
            <span className="text-[12px] text-[#737373]">From lessons & tests</span>
          </div>

          <div className="p-5 rounded-[12px] bg-[#fafafa] border border-[#e5e5e5] space-y-2">
            <div className="flex items-center justify-between text-[#737373] text-[13px]">
              <span>Active Streak</span>
              <Flame className="w-4 h-4 text-amber-500 fill-current" />
            </div>
            <div className="text-[28px] font-bold text-[#000000] font-mono">
              {streakDays} Days
            </div>
            <span className="text-[12px] text-[#737373]">Daily practice active</span>
          </div>
        </div>

        {/* Course Outcomes (CO1 - CO5) Matrix */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-[20px] font-semibold text-[#000000] tracking-tight flex items-center gap-2">
              <Award className="w-5 h-5 text-black" />
              <span>Course Outcome Mastery (CO1 – CO5)</span>
            </h2>
            <p className="text-[14px] text-[#737373]">
              Outcome proficiency dynamically calculated from assessment scores and problem attempts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {course.outcomes.map((co) => {
              const mastery = coMastery[co.code] || 0;
              let statusLabel = 'In Progress';
              if (mastery >= 80) statusLabel = 'Mastered';
              else if (mastery >= 50) statusLabel = 'Proficient';

              return (
                <div
                  key={co.code}
                  className="p-6 rounded-[12px] bg-white border border-[#e5e5e5] space-y-4 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-bold text-black font-mono">{co.code}</span>
                      <Badge variant="co">{co.bloomLevel}</Badge>
                    </div>
                    <span className="text-[12px] font-semibold text-black font-mono">{mastery}%</span>
                  </div>

                  <p className="text-[13px] text-[#525252] leading-snug">
                    {co.statement}
                  </p>

                  <div className="space-y-1 pt-2 border-t border-[#f0f0f0]">
                    <ProgressBar value={mastery} size="sm" barColor={mastery >= 75 ? "bg-emerald-600" : "bg-black"} />
                    <div className="flex items-center justify-between text-[11px] text-[#737373]">
                      <span>Level: {statusLabel}</span>
                      <span>Target: 100%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Assessment History Table */}
        <section className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] font-semibold text-[#000000] tracking-tight">
              Recent Assessment Records
            </h2>
            <Link to="/tests">
              <Button variant="primary" size="sm">
                <span>Take New Assessment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          {testHistory.length === 0 ? (
            <div className="p-8 rounded-[12px] bg-[#fafafa] border border-[#e5e5e5] text-center space-y-3">
              <p className="text-[14px] text-[#737373]">No assessments completed yet.</p>
              <Link to="/tests">
                <Button variant="secondary" size="sm">
                  Start Your First Assessment
                </Button>
              </Link>
            </div>
          ) : (
            <div className="rounded-[12px] bg-white border border-[#e5e5e5] overflow-hidden shadow-xs">
              <table className="w-full text-left text-[13px]">
                <thead className="bg-[#fafafa] border-b border-[#e5e5e5] text-[#737373] text-[12px]">
                  <tr>
                    <th className="p-4 font-semibold">Date</th>
                    <th className="p-4 font-semibold">Scope</th>
                    <th className="p-4 font-semibold">Score</th>
                    <th className="p-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f0f0]">
                  {testHistory.slice(-5).reverse().map((test, idx) => (
                    <tr key={idx} className="hover:bg-[#fafafa]">
                      <td className="p-4 text-[#737373] font-mono">{new Date(test.timestamp).toLocaleDateString()}</td>
                      <td className="p-4 font-semibold text-black">{test.unitId ? test.unitId.toUpperCase() : 'Full Course'}</td>
                      <td className="p-4 font-mono font-semibold text-black">{test.score}/{test.maxScore} ({test.percentage}%)</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                          test.passed ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
                        }`}>
                          {test.passed ? 'Passed' : 'Needs Review'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
