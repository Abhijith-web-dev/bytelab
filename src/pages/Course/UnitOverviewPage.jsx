import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Layers, ArrowRight, CheckCircle2, Circle, Award, BookOpen, Clock } from 'lucide-react';
import { Button } from '../../components/ui/Button.jsx';
import { Badge } from '../../components/ui/Badge.jsx';
import { Card } from '../../components/ui/Card.jsx';
import { SubNavFrosted } from '../../components/layout/SubNavFrosted.jsx';
import { getCourse, getUnit, getChapter, getNavigationHierarchy, cleanChapterTitle } from '../../content/loader/index.js';
import { useProgressStore } from '../../stores/progressStore.js';
import { useSEO } from '../../hooks/useSEO.js';

export function UnitOverviewPage() {
  const params = useParams();
  const courseId = params.courseId || 'python-programming';
  const unitId = params.unitId || 'unit-01';

  const course = getCourse(courseId);
  const unit = getUnit(courseId, unitId);
  const hierarchy = getNavigationHierarchy(courseId);
  
  useSEO({
    title: `${unit?.title || 'Unit Overview'} | ${course?.title || ''}`,
    description: unit?.description || 'Explore the chapters in this unit.'
  });

  const { completedChapters } = useProgressStore();

  const chapters = unit.chapters || [];
  const completedInUnit = chapters.filter(ch => completedChapters.includes(ch)).length;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SubNavFrosted
        title={`${unit.romanNumber}: ${unit.title}`}
        subtitle={`${unit.periods} Academic Periods`}
        breadcrumbs={[
          { label: 'Courses', path: '/courses' },
          { label: course.code, path: `/courses/${courseId}` },
          { label: unit.romanNumber, path: `/courses/${courseId}/unit/${unit.id}` }
        ]}
        ctaLabel="Start First Lecture"
        ctaLink={`/courses/${courseId}/chapter/${chapters[0] || 'day-01'}`}
      />

      <main className="max-w-[1140px] mx-auto w-full px-4 md:px-8 py-10 sm:py-14 space-y-10">
        {/* Unit Hero Card */}
        <div className="p-8 sm:p-10 rounded-[22px] bg-[#eeece7]/40 border border-[#d9d9dd] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-bold text-[#17171c] font-mono bg-white border border-[#d9d9dd] px-2.5 py-0.5 rounded-full">
              {course.code} • {unit.romanNumber}
            </span>
            <div className="flex items-center gap-2">
              <Badge variant="coral">{unit.outcomes[0]}</Badge>
              <Badge variant="stone">{unit.periods} Periods</Badge>
            </div>
          </div>

          <h1 className="text-[28px] sm:text-[38px] font-medium text-[#17171c] tracking-tight leading-tight">
            {unit.title}
          </h1>

          <p className="text-[16px] text-[#75758a] max-w-2xl leading-relaxed">
            {unit.description}
          </p>

          <div className="pt-3 flex items-center gap-4 text-[13px] text-[#75758a]">
            <span>{completedInUnit} of {chapters.length} lectures completed</span>
            <span>•</span>
            <Link to={`/tests?unit=${unit.id}`} className="text-[#17171c] hover:underline flex items-center gap-1 font-medium">
              <span>Take Section Assessment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Chapters Grid */}
        <section aria-label="Section Lectures & Days" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[22px] font-semibold text-[#17171c] tracking-tight">
              Section Lectures & Days
            </h2>
            <span className="text-[12px] font-mono text-[#575768]">
              {chapters.length} Lectures Total
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {chapters.map((chFolder, idx) => {
              const ch = getChapter(courseId, unit.id, chFolder);
              const isCompleted = completedChapters.includes(chFolder);
              const navItem = hierarchy.find(h => h.unitId === unit.id && h.chapterId === chFolder);
              const unitDayNumber = navItem?.unitDayIndex || (idx + 1);
              const courseDayNumber = navItem?.courseDayNumber || navItem?.dayNumber || (idx + 1);
              const displayTitle = ch?.shortTitle || cleanChapterTitle(ch?.title) || chFolder.replace(/^\d+-/, '').replace(/-/g, ' ');
              const estMin = ch?.estimatedMinutes || ch?.timeEstimate || 90;
              const simType = ch?.simulationType ? ch.simulationType.split(':')[0] : null;

              return (
                <div
                  key={chFolder}
                  className={`p-5 sm:p-6 flex flex-col justify-between rounded-[18px] border transition-all ${
                    isCompleted
                      ? 'bg-emerald-50/20 border-emerald-200 hover:border-emerald-300'
                      : 'bg-white border-[#d9d9dd] hover:border-[#17171c] shadow-2xs'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[12px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                          isCompleted ? 'bg-emerald-600 text-white' : 'bg-[#17171c] text-white'
                        }`}>
                          Day {unitDayNumber}
                        </span>
                        <span className="text-[11.5px] font-mono text-[#575768]">
                          • Curriculum Day {courseDayNumber}
                        </span>
                      </div>

                      {isCompleted ? (
                        <div className="flex items-center gap-1 text-emerald-700 text-[12px] font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Completed</span>
                        </div>
                      ) : (
                        <Badge variant="stone" className="text-[11px]">
                          {ch?.difficulty || 'Beginner'}
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-[17px] font-semibold text-[#17171c] leading-snug">
                      {displayTitle}
                    </h3>

                    {ch?.description && (
                      <p className="text-[13.5px] text-[#575768] leading-relaxed line-clamp-2">
                        {ch.description}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {simType && (
                        <span className="px-2 py-0.5 bg-[#eeece7]/70 text-[#17171c] font-mono text-[11px] rounded-md border border-[#d9d9dd]/60">
                          {simType}
                        </span>
                      )}
                      <span className="text-[11px] font-mono text-[#575768] px-2 py-0.5 bg-[#eeece7]/40 border border-[#d9d9dd] rounded-md">
                        {ch?.outcomes?.[0] || unit.outcomes?.[0] || 'CO1'}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#d9d9dd]/70 mt-4 flex items-center justify-between">
                    <span className="text-[12px] text-[#575768] flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-[#17171c]" />
                      <span>~{estMin} min</span>
                    </span>

                    <Link
                      to={`/courses/${courseId}/chapter/${chFolder}`}
                      aria-label={`${isCompleted ? 'Review' : 'Start'} Day ${unitDayNumber}: ${displayTitle}`}
                    >
                      <Button variant={isCompleted ? "secondary" : "primary"} size="sm">
                        <span>{isCompleted ? 'Review Day' : 'Start Day'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
