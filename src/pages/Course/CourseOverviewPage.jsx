import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { BookOpen, Layers, Clock, Award, CheckCircle2, ChevronRight, BookMarked, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button.jsx';
import { Badge } from '../../components/ui/Badge.jsx';
import { Card } from '../../components/ui/Card.jsx';
import { ProgressBar } from '../../components/ui/ProgressBar.jsx';
import { SubNavFrosted } from '../../components/layout/SubNavFrosted.jsx';
import { getCourse, getSyllabus, getNavigationHierarchy } from '../../content/loader/index.js';
import { useProgressStore } from '../../stores/progressStore.js';

export function CourseOverviewPage() {
  const params = useParams();
  const courseId = params.courseId || 'python-programming';
  const course = getCourse(courseId);
  const syllabus = getSyllabus(courseId);
  const { completedChapters, getCourseCompletionPercentage } = useProgressStore();

  const completionPercent = getCourseCompletionPercentage();
  const hierarchy = getNavigationHierarchy(courseId);

  // Find first uncompleted chapter
  const nextItem = hierarchy.find(h => !completedChapters.includes(h.chapterId)) || hierarchy[0];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SubNavFrosted
        title={course.title}
        subtitle={course.code}
        breadcrumbs={[
          { label: 'Courses', path: '/courses' },
          { label: course.code, path: `/courses/${courseId}` }
        ]}
        ctaLabel={completedChapters.length > 0 ? "Continue Course" : "Start 65-Day Plan"}
        ctaLink={`/courses/${courseId}/chapter/${nextItem?.chapterId || 'day-01'}`}
      />

      <main className="max-w-[1280px] mx-auto w-full px-4 md:px-8 py-10 space-y-12">
        {/* Course Header Banner */}
        <div className="p-8 rounded-[12px] bg-[#fafafa] border border-[#e5e5e5] space-y-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-mono font-bold text-black bg-white border border-[#e5e5e5] px-2.5 py-0.5 rounded-full">
                {course.code}
              </span>
              <span className="text-[13px] text-[#737373]">
                • {course.programme}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="co">L-T-P-C: {course.ltpc}</Badge>
              <Badge variant="default">60 Periods</Badge>
            </div>
          </div>

          <div className="space-y-3 max-w-3xl">
            <h1 className="text-[32px] sm:text-[40px] font-semibold text-[#000000] tracking-tight leading-tight">
              {course.title}
            </h1>
            <p className="text-[16px] text-[#737373] leading-relaxed">
              {syllabus.preamble}
            </p>
          </div>

          {/* Academic Metadata Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#e5e5e5] text-[13px]">
            <div>
              <span className="text-[#a3a3a3] text-[11px] block uppercase font-semibold">Prerequisite</span>
              <span className="font-semibold text-[#000000]">{syllabus.prerequisite} (None)</span>
            </div>
            <div>
              <span className="text-[#a3a3a3] text-[11px] block uppercase font-semibold">Curriculum</span>
              <span className="font-semibold text-[#000000]">5 Units • 60 Periods Total</span>
            </div>
            <div>
              <span className="text-[#a3a3a3] text-[11px] block uppercase font-semibold">Evaluation Mode</span>
              <span className="font-semibold text-[#000000]">Theory + Hands-on Lab</span>
            </div>
            <div>
              <span className="text-[#a3a3a3] text-[11px] block uppercase font-semibold">Runtime</span>
              <span className="font-semibold text-[#000000]">Python 3.11 (Pyodide)</span>
            </div>
          </div>

          {/* Progress Tracker */}
          <div className="pt-4 border-t border-[#e5e5e5] space-y-2">
            <ProgressBar
              value={completionPercent}
              showLabel={true}
              label={`Course Progress: ${completedChapters.length} of ${hierarchy.length} Days Completed`}
              barColor="bg-black"
            />
          </div>
        </div>

        {/* Course Outcomes (CO1 - CO5) Section */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-[22px] font-semibold text-[#000000] tracking-tight flex items-center gap-2">
              <Award className="w-5 h-5 text-[#000000]" />
              <span>Course Outcomes (CO1 – CO5)</span>
            </h2>
            <p className="text-[14px] text-[#737373]">
              University syllabus outcome matrix mapped to Bloom's taxonomy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {course.outcomes.map((co) => (
              <div
                key={co.code}
                className="p-5 rounded-[12px] bg-[#fafafa] border border-[#e5e5e5] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-bold text-black font-mono">{co.code}</span>
                  <span className="text-[11px] font-semibold bg-black text-white px-2 py-0.5 rounded-full">
                    {co.bloomLevel}
                  </span>
                </div>
                <p className="text-[13px] text-[#000000] leading-snug">
                  {co.statement}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5 Units Directory */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-[22px] font-semibold text-[#000000] tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#000000]" />
              <span>Course Sections & Lectures</span>
            </h2>
            <p className="text-[14px] text-[#737373]">
              Select any unit to inspect chapters, lecture notes, visual simulations, and practice challenges.
            </p>
          </div>

          <div className="space-y-4">
            {course.units.map((unit) => {
              const unitChapters = unit.chapters || [];
              const completedCount = unitChapters.filter(ch => completedChapters.includes(ch)).length;

              return (
                <div
                  key={unit.id}
                  className="rounded-[12px] bg-white border border-[#e5e5e5] overflow-hidden shadow-xs"
                >
                  <div className="p-5 bg-[#fafafa] border-b border-[#e5e5e5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] font-bold text-black font-mono">
                          {unit.romanNumber}
                        </span>
                        <span className="text-[12px] text-[#737373]">
                          • {unit.periods} Periods
                        </span>
                        <Badge variant="co">{unit.outcomes[0]}</Badge>
                      </div>
                      <h3 className="text-[18px] font-semibold text-[#000000]">
                        {unit.title}
                      </h3>
                      <p className="text-[13px] text-[#737373] max-w-2xl">
                        {unit.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[12px] text-[#737373] font-mono">
                        {completedCount}/{unitChapters.length} Done
                      </span>
                      <Link to={`/courses/${courseId}/unit/${unit.id}`}>
                        <Button variant="secondary" size="sm">
                          <span>Explore Unit</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 bg-white">
                    {unitChapters.map((chFolder, idx) => {
                      const isComplete = completedChapters.includes(chFolder);
                      return (
                        <Link
                          key={chFolder}
                          to={`/courses/${courseId}/chapter/${chFolder}`}
                          className={`p-3 rounded-[8px] border transition-all flex items-center justify-between group ${
                            isComplete
                              ? 'bg-emerald-50/40 border-emerald-200 hover:border-emerald-400'
                              : 'bg-[#fafafa] border-[#e5e5e5] hover:border-black'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 overflow-hidden">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] shrink-0 ${
                              isComplete ? 'bg-emerald-600 text-white' : 'bg-[#e5e5e5] text-[#525252]'
                            }`}>
                              {isComplete ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                            </div>
                            <span className="text-[13px] font-medium text-[#000000] group-hover:underline truncate">
                              {chFolder.replace(/^\d+-/, '').replace(/-/g, ' ')}
                            </span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-[#a3a3a3] group-hover:text-black shrink-0 ml-1" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Textbooks & References */}
        <section className="space-y-4 pt-4 border-t border-[#e5e5e5]">
          <h2 className="text-[20px] font-semibold text-[#000000] tracking-tight flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-[#000000]" />
            <span>Prescribed Textbooks & Academic References</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-[12px] bg-[#fafafa] border border-[#e5e5e5] space-y-2.5">
              <h3 className="text-[15px] font-semibold text-[#000000]">Prescribed Textbooks</h3>
              <ul className="text-[13px] text-[#525252] space-y-2">
                {syllabus.textbooks.map(tb => (
                  <li key={tb.id} className="leading-snug">
                    <b>{tb.author}</b>, <i>"{tb.title}"</i>, {tb.edition}, {tb.publisher}, {tb.year}.
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-[12px] bg-[#fafafa] border border-[#e5e5e5] space-y-2.5">
              <h3 className="text-[15px] font-semibold text-[#000000]">Reference Books</h3>
              <ul className="text-[13px] text-[#525252] space-y-2">
                {syllabus.references.map(ref => (
                  <li key={ref.id} className="leading-snug">
                    <b>{ref.author}</b>, <i>"{ref.title}"</i>, {ref.publisher}, {ref.year}.
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
