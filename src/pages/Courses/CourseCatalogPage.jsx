import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code, Search, Clock, ArrowRight, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/Button.jsx';
import { Badge } from '../../components/ui/Badge.jsx';
import { Card } from '../../components/ui/Card.jsx';
import { ProgressBar } from '../../components/ui/ProgressBar.jsx';
import { SubNavFrosted } from '../../components/layout/SubNavFrosted.jsx';
import { getAllCourses, getLanguages } from '../../content/loader/index.js';
import { useProgressStore } from '../../stores/progressStore.js';
import { useSEO } from '../../hooks/useSEO.js';

export function CourseCatalogPage() {
  useSEO({
    title: 'Course Catalog',
    description: 'Browse available courses and start learning Python programming.'
  });

  const courses = getAllCourses();
  const languages = getLanguages();
  const { completedChapters, getCourseCompletionPercentage } = useProgressStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLang = selectedLanguage === 'all' || c.language === selectedLanguage;
    return matchesSearch && matchesLang;
  });

  const pythonProgressPercent = getCourseCompletionPercentage();

  const upcomingCourses = [
    {
      id: 'js-web',
      code: 'CS2201',
      title: 'JavaScript & Web Runtime',
      language: 'javascript',
      periods: 45,
      units: 4,
      difficulty: 'Beginner',
      status: 'Coming Soon'
    },
    {
      id: 'cpp-ds',
      code: 'CS3401',
      title: 'Data Structures in C++',
      language: 'cpp',
      periods: 60,
      units: 5,
      difficulty: 'Intermediate',
      status: 'Coming Soon'
    },
    {
      id: 'sql-dbms',
      code: 'CS3501',
      title: 'DBMS & Relational SQL',
      language: 'sql',
      periods: 45,
      units: 4,
      difficulty: 'Applied',
      status: 'Coming Soon'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SubNavFrosted
        title="Course Catalog"
        subtitle="Curricula Directory"
        ctaLabel="Continue Python"
        ctaLink="/courses/python-programming"
      />

      <main className="max-w-[1280px] mx-auto w-full px-4 md:px-8 py-10 space-y-12">
        {/* Search & Filter Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#e5e5e5]">
          <div>
            <h1 className="text-[26px] font-semibold text-[#000000] tracking-tight">
              Academic Computer Science Curricula
            </h1>
            <p className="text-[14px] text-[#737373]">
              Modular, outcome-oriented university degree courses.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-[#737373] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-full text-[13px] bg-[#fafafa] border border-[#e5e5e5] text-[#000000] placeholder-[#a3a3a3] focus:outline-none focus:border-black"
              />
            </div>
          </div>
        </div>

        {/* Active Featured Courses */}
        <div className="space-y-6">
          <h2 className="text-[18px] font-semibold text-[#000000] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-black" />
            <span>Active Curriculum</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                className="p-7 border border-[#e5e5e5] bg-white flex flex-col justify-between shadow-xs"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-bold text-black font-mono tracking-wider bg-[#fafafa] border border-[#e5e5e5] px-2.5 py-0.5 rounded-full">
                      {course.code}
                    </span>
                    <Badge variant="co">Active Syllabus</Badge>
                  </div>

                  <h3 className="text-[22px] font-semibold text-[#000000] tracking-tight leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-[14px] text-[#737373] leading-relaxed">
                    {course.description}
                  </p>

                  <div className="flex flex-wrap gap-4 text-[13px] text-[#525252] pt-1">
                    <div className="flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-black" />
                      <span>{course.unitsCount} Units</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-black" />
                      <span>{course.totalPeriods} Academic Periods</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Code className="w-4 h-4 text-black" />
                      <span>L-T-P-C: {course.ltpc}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="pt-3 border-t border-[#f0f0f0]">
                    <ProgressBar
                      value={pythonProgressPercent}
                      showLabel={true}
                      label={`Overall Progress (${completedChapters.length}/27 Topics)`}
                      barColor="bg-black"
                      size="sm"
                    />
                  </div>
                </div>

                <div className="pt-6 flex items-center justify-between">
                  <Link to={`/courses/${course.id}`}>
                    <Button variant="primary" size="md">
                      <span>{completedChapters.length > 0 ? 'Continue Course' : 'Start Course'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                  <Link to="/progress" className="text-[13px] text-black hover:underline font-medium">
                    View Outcome Matrix
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Future Extensible Roadmap */}
        <div className="space-y-4 pt-4">
          <div className="space-y-1">
            <h2 className="text-[18px] font-semibold text-[#000000]">
              Upcoming Language Curricula
            </h2>
            <p className="text-[13px] text-[#737373]">
              The LMS architecture supports multi-language execution runtimes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingCourses.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-[12px] bg-[#fafafa] border border-[#e5e5e5] flex flex-col justify-between opacity-80"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#737373] font-semibold">{item.code}</span>
                    <Badge variant="default" className="text-[10px]">{item.status}</Badge>
                  </div>
                  <h3 className="text-[16px] font-semibold text-[#000000]">{item.title}</h3>
                  <div className="text-[12px] text-[#737373]">
                    {item.units} Units • {item.periods} Periods • Level: {item.difficulty}
                  </div>
                </div>
                <div className="pt-4">
                  <Button variant="ghost" size="sm" disabled className="w-full text-[12px] text-[#a3a3a3]">
                    Planned Course
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
