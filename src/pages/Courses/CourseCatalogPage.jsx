import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Code, Search, Clock, ArrowRight, Layers, Sparkles, 
  CheckCircle2, Terminal, Cpu, Database, Compass, Globe, ShieldCheck 
} from 'lucide-react';
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
    title: 'Multi-Language Engineering Curricula | ByteLab Core',
    description: 'Explore university-standard curricula for Python, C/C++, TypeScript, Rust, and SQL. Deconstructed into discrete lecture periods with in-browser execution sandboxes.'
  });

  const courses = getAllCourses();
  const languages = getLanguages();
  const { completedChapters, getCourseCompletionPercentage } = useProgressStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  const pythonProgressPercent = getCourseCompletionPercentage();

  // All Curricula Tracks (Active + Architecture Roadmap)
  const allTracks = [
    {
      id: 'python-programming',
      code: '19AI301 / CS3301',
      title: 'Python Programming & Problem Solving',
      language: 'python',
      languageLabel: 'Python 3.11',
      periods: 60,
      unitsCount: 5,
      chaptersCount: 27,
      ltpc: '3-0-0-3',
      difficulty: 'Beginner → Intermediate',
      status: 'active',
      statusLabel: 'Active & Interactive',
      description: 'Comprehensive computer science foundation. Algorithmic thinking, control flow, functions, recursion, compound data types, and NumPy array computing.',
      highlights: ['Pyodide WebAssembly Sandbox', 'Memory Stack Simulations', 'CO1–CO5 Outcome Matrix', 'Practice Arenas'],
      link: '/courses/python-programming'
    },
    {
      id: 'cpp-data-structures',
      code: 'CS3401',
      title: 'Data Structures & Algorithms in C++',
      language: 'cpp',
      languageLabel: 'C++20',
      periods: 60,
      unitsCount: 5,
      chaptersCount: 30,
      ltpc: '3-0-2-4',
      difficulty: 'Intermediate',
      status: 'roadmap',
      statusLabel: 'Curriculum Planned',
      description: 'Pointer mechanics, dynamic memory allocation, linked lists, balanced search trees, graph algorithms, and asymptotic complexity analysis.',
      highlights: ['Clang/WASM Target', 'Memory Leak Prevention', 'STL Container Deep-Dive', 'Algorithm Benchmarking'],
      link: '#'
    },
    {
      id: 'c-systems',
      code: 'CS2301',
      title: 'Systems Programming & Architecture in C',
      language: 'c',
      languageLabel: 'C17 Systems',
      periods: 45,
      unitsCount: 4,
      chaptersCount: 24,
      ltpc: '3-0-0-3',
      difficulty: 'Intermediate',
      status: 'roadmap',
      statusLabel: 'Curriculum Planned',
      description: 'Direct memory addressing, POSIX system calls, process life cycles, virtual memory layouts, and binary byte manipulation.',
      highlights: ['GDB Step Tracing', 'Bitwise & Bitmasking Models', 'Stack vs Heap Dissection', 'System Call Interfaces'],
      link: '#'
    },
    {
      id: 'typescript-web',
      code: 'CS2201',
      title: 'TypeScript & Modern Web Systems',
      language: 'typescript',
      languageLabel: 'TypeScript 5',
      periods: 45,
      unitsCount: 4,
      chaptersCount: 22,
      ltpc: '2-0-2-3',
      difficulty: 'Applied',
      status: 'roadmap',
      statusLabel: 'Curriculum Planned',
      description: 'Type theory, generic programming, asynchronous event loops, promises, browser DOM APIs, and scalable full-stack architecture.',
      highlights: ['V8 Engine Sandbox', 'Generics & Conditional Types', 'Async Concurrency Patterns', 'Modern SPA Systems'],
      link: '#'
    },
    {
      id: 'rust-concurrency',
      code: 'CS4201',
      title: 'Systems & Concurrency in Rust',
      language: 'rust',
      languageLabel: 'Rust 1.75+',
      periods: 60,
      unitsCount: 5,
      chaptersCount: 28,
      ltpc: '3-0-2-4',
      difficulty: 'Advanced',
      status: 'roadmap',
      statusLabel: 'Curriculum Planned',
      description: 'The borrow checker, lifetimes, ownership semantics, concurrency without data races, and low-level systems programming.',
      highlights: ['Zero-Cost Abstractions', 'Fearless Concurrency', 'WASM Native Toolchain', 'Memory Safety Proofs'],
      link: '#'
    },
    {
      id: 'sql-dbms',
      code: 'CS3501',
      title: 'DBMS & Relational Database Engineering',
      language: 'sql',
      languageLabel: 'SQL / SQLite',
      periods: 45,
      unitsCount: 4,
      chaptersCount: 20,
      ltpc: '3-0-0-3',
      difficulty: 'Applied',
      status: 'roadmap',
      statusLabel: 'Curriculum Planned',
      description: 'Relational algebra, B-Tree indexes, query execution plans, normalization (1NF–BCNF), ACID transactions, and database design.',
      highlights: ['In-Browser SQLite WASM', 'Interactive Schema Visualizer', 'Query Plan Inspection', 'Transaction Isolation'],
      link: '#'
    }
  ];

  const languageFilters = [
    { id: 'all', label: 'All Curricula' },
    { id: 'python', label: 'Python (Active)' },
    { id: 'cpp', label: 'C++ Systems' },
    { id: 'c', label: 'C Architecture' },
    { id: 'typescript', label: 'TypeScript Web' },
    { id: 'rust', label: 'Rust Concurrency' },
    { id: 'sql', label: 'SQL DBMS' }
  ];

  const filteredTracks = allTracks.filter(track => {
    const matchesSearch = 
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.languageLabel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLang = selectedLanguage === 'all' || track.language === selectedLanguage;
    return matchesSearch && matchesLang;
  });

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SubNavFrosted
        title="Engineering Curricula"
        subtitle="Multi-Language Directory"
        ctaLabel="Continue Python Track"
        ctaLink="/courses/python-programming"
      />

      <main className="max-w-[1440px] mx-auto w-full px-4 md:px-8 py-10 sm:py-16 space-y-12">
        {/* Header Title & Description */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="mono-label text-[#ff7759]">ACADEMIC CURRICULA DIRECTORY</span>
          </div>
          <h1 className="text-[36px] sm:text-[52px] font-medium text-[#17171c] tracking-tight leading-[1.06]">
            Academic Computer Science & Systems Curricula
          </h1>
          <p className="text-[17px] text-[#75758a] leading-relaxed">
            Every curriculum is structured around university syllabus requirements, deconstructed into discrete lecture periods, memory stack models, and zero-latency execution sandboxes.
          </p>
        </div>

        {/* Filter Chips & Search Bar (DESIGN.md blog-filter-chip) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#d9d9dd]">
          {/* Scrollable Language Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {languageFilters.map((filter) => {
              const isSelected = selectedLanguage === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setSelectedLanguage(filter.id)}
                  className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#17171c] text-white shadow-xs'
                      : 'bg-transparent hover:bg-[#fafafa] border border-[#d9d9dd] text-[#212121] hover:border-[#17171c]'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-[280px]">
            <Search className="w-4 h-4 text-[#93939f] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tracks, topics & codes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full text-[13px] bg-white border border-[#d9d9dd] text-[#17171c] placeholder-[#93939f] focus:outline-none focus:border-[#17171c] transition-colors"
            />
          </div>
        </div>

        {/* Tracks Grid (DESIGN.md product-card / capability-card) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTracks.map((track) => {
            const isActiveTrack = track.status === 'active';

            return (
              <div
                key={track.id}
                className={`p-7 rounded-[22px] border transition-all flex flex-col justify-between ${
                  isActiveTrack
                    ? 'bg-white border-[#17171c] ring-1 ring-[#17171c]/10 shadow-xs hover:border-[#000000]'
                    : 'bg-[#eeece7]/40 border-[#d9d9dd] hover:border-[#93939f]'
                }`}
              >
                <div className="space-y-4">
                  {/* Status & Code Row */}
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-mono font-bold text-[#17171c] bg-white border border-[#d9d9dd] px-2.5 py-0.5 rounded-full">
                      {track.code}
                    </span>
                    {isActiveTrack ? (
                      <Badge variant="coral">Active • Interactive</Badge>
                    ) : (
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#75758a] bg-white border border-[#d9d9dd] px-2.5 py-0.5 rounded-full">
                        {track.statusLabel}
                      </span>
                    )}
                  </div>

                  {/* Title & Language */}
                  <div>
                    <span className="text-[11px] font-mono text-[#ff7759] uppercase tracking-wider font-semibold block mb-1">
                      {track.languageLabel}
                    </span>
                    <h3 className="text-[21px] font-medium text-[#17171c] tracking-tight leading-snug">
                      {track.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-[14px] text-[#75758a] leading-relaxed line-clamp-3">
                    {track.description}
                  </p>

                  {/* Metadata Specs */}
                  <div className="flex flex-wrap gap-4 text-[12px] text-[#75758a] pt-3 border-t border-[#d9d9dd]">
                    <div className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#17171c]" />
                      <span>{track.unitsCount} Units</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#17171c]" />
                      <span>{track.periods} Periods</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5 text-[#17171c]" />
                      <span>L-T-P-C: {track.ltpc}</span>
                    </div>
                  </div>

                  {/* Feature Highlights */}
                  <ul className="space-y-1.5 pt-1 text-[12px] text-[#212121]">
                    {track.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#003c33] shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Progress bar if active */}
                  {isActiveTrack && (
                    <div className="pt-2">
                      <ProgressBar
                        value={pythonProgressPercent}
                        showLabel={true}
                        label={`Your Progress: ${completedChapters.length} of ${track.chaptersCount} Topics`}
                        barColor="bg-[#17171c]"
                        size="sm"
                      />
                    </div>
                  )}
                </div>

                {/* Card Bottom Actions */}
                <div className="pt-6 mt-6 border-t border-[#d9d9dd] flex items-center justify-between">
                  {isActiveTrack ? (
                    <>
                      <Link to={track.link}>
                        <Button variant="primary" size="md">
                          <span>{completedChapters.length > 0 ? 'Continue Syllabus' : 'Start Course'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                      <Link to="/progress" className="text-[13px] text-[#17171c] hover:underline font-medium">
                        Outcomes (CO1–CO5)
                      </Link>
                    </>
                  ) : (
                    <div className="w-full flex items-center justify-between text-[12px] text-[#75758a]">
                      <span className="font-mono">Prerequisite: None</span>
                      <span className="px-3 py-1 rounded-full bg-white border border-[#d9d9dd] text-[#75758a]">
                        In Development
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Multi-Language Architecture Feature Band (DESIGN.md dark-feature-band) */}
        <section className="rounded-[22px] bg-[#003c33] text-white p-8 sm:p-12 space-y-6 select-none">
          <div className="max-w-2xl space-y-3">
            <span className="mono-label text-[#ff7759]">ARCHITECTURE DESIGN</span>
            <h2 className="text-[26px] sm:text-[36px] font-medium text-white tracking-tight leading-tight">
              One Unified Interface, Modular Execution Runtimes.
            </h2>
            <p className="text-[15px] text-white/70 leading-relaxed">
              ByteLab separates content representations from execution runtimes. Whether compiling C++ via WASM Clang, executing Python via Pyodide, or running V8 JavaScript, the student experience remains consistent, blazing fast, and 100% private.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/15 text-[13px]">
            <div className="space-y-1.5">
              <span className="font-medium text-white block text-[15px]">Worker Isolation</span>
              <p className="text-white/60 leading-relaxed">All language code execution happens off the main UI thread with automatic timeout termination.</p>
            </div>
            <div className="space-y-1.5">
              <span className="font-medium text-white block text-[15px]">Offline Capability</span>
              <p className="text-white/60 leading-relaxed">Static assets and WebAssembly runtimes cache locally in your browser for low-connectivity classrooms.</p>
            </div>
            <div className="space-y-1.5">
              <span className="font-medium text-white block text-[15px]">Bloom's Taxonomy Assessment</span>
              <p className="text-white/60 leading-relaxed">Every problem maps to Remember, Understand, Apply, Analyze, and Create cognitive levels.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
