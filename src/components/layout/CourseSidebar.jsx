import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Clock,
  PlayCircle,
  Award,
  Layers,
  Sparkles,
  Cpu,
  Search,
  X
} from 'lucide-react';
import { getCourse, getChapter } from '../../content/loader/index.js';
import { useProgressStore } from '../../stores/progressStore.js';
import { ProgressBar } from '../ui/ProgressBar.jsx';
import { Badge } from '../ui/Badge.jsx';

export function CourseSidebar({ courseId = 'python-programming', className = '' }) {
  const params = useParams();
  const activeChapterId = params.chapterId;
  const course = getCourse(courseId);
  const { completedChapters, getCourseCompletionPercentage } = useProgressStore();

  const [searchQuery, setSearchQuery] = useState('');
  const activeItemRef = useRef(null);

  const totalChaptersCount = course.units.reduce((acc, u) => acc + (u.chapters?.length || 0), 0);
  const completionPercent = Math.round((completedChapters.length / (totalChaptersCount || 46)) * 100);

  // Auto-expand all units initially or the active unit
  const [expandedUnits, setExpandedUnits] = useState({
    'unit-01': true,
    'unit-02': false,
    'unit-03': false,
    'unit-04': false,
    'unit-05': false,
    'unit-06': false
  });

  useEffect(() => {
    if (activeChapterId) {
      const activeUnit = course.units.find(u => u.chapters?.includes(activeChapterId));
      if (activeUnit) {
        setExpandedUnits(prev => ({
          ...prev,
          [activeUnit.id]: true
        }));
      }
    }
  }, [activeChapterId, course.units]);

  // Smoothly scroll active day into view
  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [activeChapterId]);

  const toggleUnit = (unitId) => {
    setExpandedUnits(prev => ({
      ...prev,
      [unitId]: !prev[unitId]
    }));
  };

  const expandAll = () => {
    const all = {};
    course.units.forEach(u => { all[u.id] = true; });
    setExpandedUnits(all);
  };

  const collapseAll = () => {
    const none = {};
    course.units.forEach(u => { none[u.id] = false; });
    setExpandedUnits(none);
  };

  return (
    <aside className={`w-full md:w-[320px] lg:w-[340px] bg-white border-r border-[#d9d9dd] flex flex-col h-full overflow-hidden select-none ${className}`}>
      {/* Course Header & Progress Bar */}
      <div className="p-4 border-b border-[#d9d9dd] bg-[#eeece7]/40 space-y-3 shrink-0">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#17171c] font-mono">
            {course.code}
          </span>
          <span className="text-[12px] text-[#75758a] font-mono font-medium">
            {completedChapters.length} / {totalChaptersCount} Days
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <h2 className="text-[14px] font-semibold text-[#17171c] leading-snug truncate">
            {course.title}
          </h2>
          <span className="text-[11px] font-mono font-medium bg-[#17171c] text-white px-2.5 py-0.5 rounded-full shrink-0">
            46-Day
          </span>
        </div>

        {/* Course Progress */}
        <ProgressBar
          value={completionPercent}
          size="sm"
          barColor="bg-[#17171c]"
        />

        {/* Quick Day Search Box */}
        <div className="relative pt-1">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-[#93939f]" />
          <input
            type="text"
            inputMode="search"
            placeholder="Search 46 days (e.g. Day 14, loops)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-7 py-1.5 bg-white border border-[#d9d9dd] rounded-full text-[12px] focus:outline-none focus:border-[#17171c] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-3 text-[#93939f] hover:text-[#17171c]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between text-[11px] text-[#75758a] pt-0.5">
          <span>Syllabus Directory</span>
          <div className="flex items-center gap-2">
            <button onClick={expandAll} className="hover:text-[#17171c] cursor-pointer">Expand</button>
            <span>•</span>
            <button onClick={collapseAll} className="hover:text-[#17171c] cursor-pointer">Collapse</button>
          </div>
        </div>
      </div>

      {/* 6-Unit Scrollable Curriculum List */}
      <div className="p-3 space-y-2.5 flex-1 overflow-y-auto bg-white overscroll-contain">
        {course.units.map((unit, uIdx) => {
          let unitChapters = unit.chapters || [];

          if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            unitChapters = unitChapters.filter(chFolder => {
              const ch = getChapter(courseId, unit.id, chFolder);
              return (
                chFolder.toLowerCase().includes(q) ||
                (ch?.title && ch.title.toLowerCase().includes(q)) ||
                (ch?.description && ch.description.toLowerCase().includes(q))
              );
            });
          }

          if (searchQuery.trim() && unitChapters.length === 0) {
            return null;
          }

          const isExpanded = searchQuery.trim() ? true : (expandedUnits[unit.id] !== false);
          const completedInUnit = unitChapters.filter(ch => completedChapters.includes(ch)).length;

          return (
            <div key={unit.id} className="rounded-[14px] border border-[#d9d9dd] overflow-hidden bg-white">
              {/* Unit Section Accordion Header */}
              <button
                onClick={() => toggleUnit(unit.id)}
                className="w-full px-3.5 py-2.5 flex items-start justify-between text-left hover:bg-[#eeece7]/50 transition-colors cursor-pointer bg-[#eeece7]/30"
              >
                <div className="space-y-0.5 overflow-hidden pr-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-[#17171c] font-mono">
                      {unit.romanNumber.toUpperCase()}
                    </span>
                    <span className="text-[10px] px-2 py-0.2 rounded-full bg-[#17171c] text-white font-mono">
                      {unit.outcomes[0]}
                    </span>
                  </div>
                  <h3 className="text-[12px] font-semibold text-[#17171c] truncate">
                    {unit.title}
                  </h3>
                  <div className="text-[10px] text-[#75758a]">
                    {completedInUnit} / {unit.chapters?.length || 12} Days Completed
                  </div>
                </div>

                <div className="shrink-0 mt-1 text-[#75758a]">
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5" />
                  )}
                </div>
              </button>

              {/* Day-by-Day Topics List */}
              {isExpanded && (
                <div className="divide-y divide-[#d9d9dd]/60 border-t border-[#d9d9dd]">
                  {unitChapters.map((chFolder, chIdx) => {
                    const chapter = getChapter(courseId, unit.id, chFolder);
                    const isChapterActive = activeChapterId === chFolder;
                    const isChapterCompleted = completedChapters.includes(chFolder);
                    const dayNum = chapter?.dayNumber || (uIdx * 12 + chIdx + 1);

                    return (
                      <Link
                        key={chFolder}
                        ref={isChapterActive ? activeItemRef : null}
                        to={`/courses/${courseId}/chapter/${chFolder}`}
                        className={`flex items-center justify-between p-2.5 text-[12px] transition-all group ${
                          isChapterActive
                            ? 'bg-[#17171c] text-white font-medium shadow-xs'
                            : 'text-[#212121] hover:bg-[#eeece7]/40'
                        }`}
                      >
                        <div className="flex items-start gap-2 overflow-hidden">
                          <div className="mt-0.5 shrink-0">
                            {isChapterCompleted ? (
                              <CheckCircle2 className={`w-3.5 h-3.5 ${isChapterActive ? 'text-emerald-400' : 'text-emerald-600'}`} />
                            ) : isChapterActive ? (
                              <PlayCircle className="w-3.5 h-3.5 text-white animate-pulse" />
                            ) : (
                              <Circle className="w-3 h-3 text-[#d9d9dd]" />
                            )}
                          </div>

                          <div className="overflow-hidden space-y-0.5">
                            <span className="truncate block leading-snug">
                              {chapter?.title || `Day ${dayNum}: ${chFolder}`}
                            </span>
                            <div className={`flex items-center gap-2 text-[10px] ${isChapterActive ? 'text-white/70' : 'text-[#75758a]'}`}>
                              <span className="flex items-center gap-1">
                                <Clock className="w-2.5 h-2.5" />
                                <span>~20 min</span>
                              </span>
                              {chapter?.simulationType && (
                                <span className={`truncate text-[9px] px-1.5 py-0.2 rounded font-mono ${
                                  isChapterActive ? 'bg-white/20 text-white' : 'bg-[#eeece7] text-[#75758a]'
                                }`}>
                                  {chapter.simulationType.split(':')[0]}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <ChevronRight className={`w-3 h-3 shrink-0 ml-1 ${
                          isChapterActive ? 'text-white' : 'text-[#93939f] group-hover:text-[#17171c]'
                        }`} />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
