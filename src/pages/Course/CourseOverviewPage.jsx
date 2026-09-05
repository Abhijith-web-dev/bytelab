import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { BookOpen, Layers, Clock, Award, CheckCircle2, ChevronRight, BookMarked, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button.jsx';
import { Badge } from '../../components/ui/Badge.jsx';
import { Card } from '../../components/ui/Card.jsx';
import { ProgressBar } from '../../components/ui/ProgressBar.jsx';
import { SubNavFrosted } from '../../components/layout/SubNavFrosted.jsx';
import { getCourse, getSyllabus, getNavigationHierarchy, getChapter, cleanChapterTitle } from '../../content/loader/index.js';
import { useProgressStore } from '../../stores/progressStore.js';
import { useSEO } from '../../hooks/useSEO.js';

export function CourseOverviewPage() {
  const params = useParams();
  const courseId = params.courseId || 'python-programming';
  const course = getCourse(courseId);
  
  useSEO({
    title: course?.title || 'Course Overview',
    description: course?.description || 'Explore the syllabus and units for this course.'
  });

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
        ctaLabel={completedChapters.length > 0 ? "Continue Course" : "Start 46-Day Plan"}
        ctaLink={`/courses/${courseId}/chapter/${nextItem?.chapterId || 'day-01'}`}
      />

      <main className="max-w-[1280px] mx-auto w-full px-4 md:px-8 py-10 sm:py-14 space-y-12">
        {/* Course Header Banner */}
        <div className="p-8 sm:p-10 rounded-[22px] bg-[#eeece7]/40 border border-[#d9d9dd] space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-mono font-bold text-[#17171c] bg-white border border-[#d9d9dd] px-2.5 py-0.5 rounded-full">
                {course.code}
              </span>
              <span className="text-[13px] text-[#75758a]">
                • {course.programme}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="coral">L-T-P-C: {course.ltpc}</Badge>
              <Badge variant="stone">60 Periods</Badge>
            </div>
          </div>

          <div className="space-y-3 max-w-3xl">
            <h1 className="text-[32px] sm:text-[44px] font-medium text-[#17171c] tracking-tight leading-tight">
              {course.title}
            </h1>
            <p className="text-[16px] text-[#75758a] leading-relaxed">
              {syllabus.preamble}
            </p>
          </div>

          {/* Academic Metadata Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#d9d9dd] text-[13px]">
            <div>
              <span className="text-[#93939f] text-[11px] block uppercase font-semibold">Prerequisite</span>
              <span className="font-semibold text-[#17171c]">{syllabus.prerequisite} (None)</span>
            </div>
            <div>
              <span className="text-[#93939f] text-[11px] block uppercase font-semibold">Curriculum</span>
              <span className="font-semibold text-[#17171c]">5 Units • 60 Periods Total</span>
            </div>
            <div>
              <span className="text-[#93939f] text-[11px] block uppercase font-semibold">Evaluation Mode</span>
              <span className="font-semibold text-[#17171c]">Theory + Hands-on Lab</span>
            </div>
            <div>
              <span className="text-[#93939f] text-[11px] block uppercase font-semibold">Runtime</span>
              <span className="font-semibold text-[#17171c]">Python 3.11 (Pyodide)</span>
            </div>
          </div>

          {/* Progress Tracker */}
          <div className="pt-4 border-t border-[#d9d9dd] space-y-2">
            <ProgressBar
              value={completionPercent}
              showLabel={true}
              label={`Course Progress: ${completedChapters.length} of ${hierarchy.length} Days Completed`}
              barColor="bg-[#17171c]"
            />
          </div>
        </div>

        {/* Course Outcomes (CO1 - CO5) Section */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-[24px] font-medium text-[#17171c] tracking-tight flex items-center gap-2">
              <Award className="w-5 h-5 text-[#ff7759]" />
              <span>Course Outcomes (CO1 – CO5)</span>
            </h2>
            <p className="text-[14px] text-[#75758a]">
              University syllabus outcome matrix mapped to Bloom's taxonomy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {course.outcomes.map((co) => (
              <div
                key={co.code}
                className="p-5 rounded-[16px] bg-white border border-[#d9d9dd] space-y-2 hover:border-[#17171c] transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-bold text-[#17171c] font-mono">{co.code}</span>
                  <span className="text-[11px] font-medium bg-[#17171c] text-white px-2.5 py-0.5 rounded-full">
                    {co.bloomLevel}
                  </span>
                </div>
                <p className="text-[13px] text-[#212121] leading-snug">
                  {co.statement}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5 Units Directory */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-[24px] font-medium text-[#17171c] tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#17171c]" />
              <span>Course Sections & Lectures</span>
            </h2>
            <p className="text-[14px] text-[#75758a]">
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
                  className="rounded-[18px] bg-white border border-[#d9d9dd] overflow-hidden"
                >
                  <div className="p-6 bg-[#eeece7]/40 border-b border-[#d9d9dd] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] font-bold text-[#17171c] font-mono">
                          {unit.romanNumber}
                        </span>
                        <span className="text-[12px] text-[#75758a]">
                          • {unit.periods} Periods
                        </span>
                        <Badge variant="coral">{unit.outcomes[0]}</Badge>
                      </div>
                      <h3 className="text-[19px] font-medium text-[#17171c]">
                        {unit.title}
                      </h3>
                      <p className="text-[13px] text-[#75758a] max-w-2xl leading-relaxed">
                        {unit.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[12px] text-[#75758a] font-mono">
                        {completedCount}/{unitChapters.length} Done
                      </span>
                      <Link to={`/courses/${courseId}/unit/${unit.id}`} aria-label={`Explore Unit ${unit.romanNumber}: ${unit.title}`}>
                        <Button variant="secondary" size="sm">
                          <span>Explore Unit</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 bg-white">
                    {unitChapters.map((chFolder, idx) => {
                      const ch = getChapter(courseId, unit.id, chFolder);
                      const isComplete = completedChapters.includes(chFolder);
                      const navItem = hierarchy.find(h => h.unitId === unit.id && h.chapterId === chFolder);
                      const unitDayNumber = navItem?.unitDayIndex || (idx + 1);
                      const courseDayNumber = navItem?.courseDayNumber || navItem?.dayNumber || (idx + 1);
                      const displayTitle = ch?.shortTitle || cleanChapterTitle(ch?.title) || chFolder.replace(/^\d+-/, '').replace(/-/g, ' ');
                      const estMin = ch?.estimatedMinutes || ch?.timeEstimate || 90;
                      const simType = ch?.simulationType ? ch.simulationType.split(':')[0] : null;

                      return (
                        <Link
                          key={chFolder}
                          to={`/courses/${courseId}/chapter/${chFolder}`}
                          aria-label={`${isComplete ? 'Review' : 'Start'} Day ${unitDayNumber}: ${displayTitle}`}
                          className={`p-4 rounded-[14px] border transition-all flex flex-col justify-between group relative select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17171c] ${
                            isComplete
                              ? 'bg-emerald-50/20 border-emerald-200 hover:border-emerald-400 hover:shadow-xs'
                              : 'bg-white border-[#d9d9dd] hover:border-[#17171c] hover:shadow-xs'
                          }`}
                        >
                          <div className="space-y-2">
                            {/* Header row: Day numbering badge & metadata */}
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-1.5">
                                <span className={`inline-flex items-center justify-center font-mono font-bold text-[11px] px-2.5 py-0.5 rounded-full ${
                                  isComplete ? 'bg-emerald-600 text-white' : 'bg-[#17171c] text-white'
                                }`}>
                                  {isComplete && <CheckCircle2 className="w-3 h-3 mr-1" />}
                                  Day {unitDayNumber}
                                </span>
                                <span className="text-[11px] font-mono text-[#575768]">
                                  (Day {courseDayNumber})
                                </span>
                              </div>

                              <div className="flex items-center gap-1 text-[11px] text-[#575768] font-mono">
                                <Clock className="w-3 h-3 text-[#17171c]" />
                                <span>{estMin}m</span>
                              </div>
                            </div>

                            {/* Topic Title */}
                            <h4 className="text-[13.5px] font-semibold text-[#17171c] group-hover:underline leading-snug line-clamp-2">
                              {displayTitle}
                            </h4>

                            {/* Description preview */}
                            {ch?.description && (
                              <p className="text-[12px] text-[#575768] line-clamp-2 leading-relaxed">
                                {ch.description}
                              </p>
                            )}
                          </div>

                          {/* Bottom Row: Feature Badges & Action */}
                          <div className="pt-2.5 mt-2.5 border-t border-[#d9d9dd]/60 flex items-center justify-between text-[11px]">
                            <div className="flex items-center gap-1.5 overflow-hidden">
                              {simType && (
                                <span className="truncate px-2 py-0.5 bg-[#eeece7]/70 text-[#17171c] font-mono text-[10px] rounded-md border border-[#d9d9dd]/60">
                                  {simType}
                                </span>
                              )}
                              <span className="text-[#575768] font-mono text-[10px] uppercase bg-[#eeece7]/40 px-1.5 py-0.5 rounded border border-[#d9d9dd]">
                                {ch?.outcomes?.[0] || unit.outcomes?.[0] || 'CO1'}
                              </span>
                            </div>

                            <div className="flex items-center text-[#17171c] font-medium text-[11px] group-hover:translate-x-0.5 transition-transform shrink-0">
                              <span>{isComplete ? 'Review Day' : 'Start Day'}</span>
                              <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                            </div>
                          </div>
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
        <section className="space-y-4 pt-4 border-t border-[#d9d9dd]">
          <h2 className="text-[20px] font-medium text-[#17171c] tracking-tight flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-[#17171c]" />
            <span>Prescribed Textbooks & Academic References</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-[16px] bg-[#eeece7]/30 border border-[#d9d9dd] space-y-2.5">
              <h3 className="text-[15px] font-semibold text-[#17171c]">Prescribed Textbooks</h3>
              <ul className="text-[13px] text-[#212121] space-y-2">
                {syllabus.textbooks.map(tb => (
                  <li key={tb.id} className="leading-snug">
                    <b>{tb.author}</b>, <i>"{tb.title}"</i>, {tb.edition}, {tb.publisher}, {tb.year}.
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-[16px] bg-[#eeece7]/30 border border-[#d9d9dd] space-y-2.5">
              <h3 className="text-[15px] font-semibold text-[#17171c]">Reference Books</h3>
              <ul className="text-[13px] text-[#212121] space-y-2">
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
