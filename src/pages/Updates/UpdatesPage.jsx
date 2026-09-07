import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Search,
  Bug,
  Cpu,
  Layers,
  Terminal,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Zap,
  Filter,
  Code2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Flame,
  Award,
  GitCommit,
  Lock
} from 'lucide-react';
import { useSEO } from '../../hooks/useSEO.js';
import { Badge } from '../../components/ui/Badge.jsx';

// Verified against ByteLab GitHub commit log
const RELEASES = [
  {
    version: 'v1.4.0',
    date: 'September 07, 2026',
    primaryCommit: 'e42a980',
    commits: ['e42a980', '0d858e1', '68a6d09', 'a8510c7'],
    tagline: 'Visual Execution Debugger, Chrome Gemini Nano Socratic AI & Security Hardening',
    category: 'AI & Debugging',
    isLatest: true,
    badges: ['Latest GitHub Push', 'Chrome Built-in AI', 'Zero-Latency', 'Security Hardened'],
    summary:
      'A massive update introducing the visual Time-Traveler Debug Mode with 60fps Monaco scrubber, gutter breakpoints, and inline ghost variable pills. Integrated Chrome browser-native Gemini Nano window.ai for on-device Socratic code diagnostics, completed Bitwise Operators masterclass with clean 5 and 3 binary truth tables, and hardened Firebase API key security.',
    features: [
      {
        title: 'Time-Travel Visual Execution Trace & Monaco Breakpoints',
        desc: 'Click Monaco gutter to toggle red glowing breakpoints. Step forward, backward, or scrub smoothly across time with zero-latency 60fps transitions and haptic feedback.',
        icon: Bug,
        tag: 'Debugger'
      },
      {
        title: 'Inline Ghost Variable Pills & Loop Navigation',
        desc: 'Live inline cyan pills display variable mutations directly on the active code line (e.g. `// total = 15, count = 3`). Jump between loop iterations (`⏮ Iter` / `Iter ⏭`) and jump directly to crash exceptions (`[🚨 Crash]`).',
        icon: Terminal,
        tag: 'Editor UX'
      },
      {
        title: 'On-Device Gemini Nano Socratic AI Engine',
        desc: 'Harnesses Chrome browser-native `window.ai` language models. Evaluates code AST and error context to deliver a 3-tier progressive clue ladder (Diagnosis, Conceptual Clue, Updation Idea) while strictly banning raw code spoilers.',
        icon: Sparkles,
        tag: 'AI Diagnostics'
      },
      {
        title: 'Bitwise Operators Masterclass (Day 04)',
        desc: 'Comprehensive Bitwise lessons with practical 5 (0101) and 3 (0011) binary examples, truth tables, two\'s complement, bit shifts, and real-world masking applications.',
        icon: BookOpen,
        tag: 'Curriculum'
      },
      {
        title: 'Firebase Config Security Hardening',
        desc: 'Refactored Firebase initialization to source API keys and environment variables strictly from `.env` files, preventing sensitive client credential leaks.',
        icon: Lock,
        tag: 'Security'
      },
      {
        title: 'Practice Challenge Logic Diagnostic Layer',
        desc: 'New output diff inspector detects subtle casing mismatches, trailing whitespace, missing return statements, and off-by-one errors. Launch `[🐞 Debug Test Case]` directly into the tracer.',
        icon: Cpu,
        tag: 'Practice IDE'
      }
    ],
    docLink: '/docs#time-travel-debugger'
  },
  {
    version: 'v1.3.0',
    date: 'September 05, 2026',
    primaryCommit: 'c7e2529',
    commits: ['c7e2529', 'bc89f7e'],
    tagline: '46-Day Full Curriculum, Global Leaderboard, Cookie Auth & UI/UX Overhaul',
    category: 'Curriculum',
    isLatest: false,
    badges: ['46-Day Syllabus Active', 'Global Leaderboard', 'Cookie Auth'],
    summary:
      'Completed the full 46-day computer science curriculum across all 5 units. Shipped real-time global leaderboard with Firebase sync, persistent cookie-based auth session management, outcome-based quiz result celebration, and an Apple-inspired frosted design system overhaul.',
    features: [
      {
        title: 'Complete 46-Day Python Master Plan Active',
        desc: 'Comprehensive 5-unit university syllabus (19AI301/CS3301) with interactive theory, code walkthroughs, sandboxes, and chapter assessment quizzes.',
        icon: BookOpen,
        tag: 'Curriculum'
      },
      {
        title: 'Global Leaderboard & Streak Points System',
        desc: 'Compare learning streaks, XP points, and verified test scores with real-time Firebase synchronization and anonymous guest migration.',
        icon: Award,
        tag: 'Engagement'
      },
      {
        title: 'Persistent Cookie Authentication Manager',
        desc: 'Secure cookie session manager (`authCookieManager`) for preserving login states and guest progress across browser restarts.',
        icon: ShieldCheck,
        tag: 'Auth'
      },
      {
        title: 'UI/UX Overhaul & Responsive Focus Mode',
        desc: 'Apple-inspired frosted sub-navbars, mobile navigation drawer, dark/light theme polish, and fullscreen distraction-free lesson focus mode.',
        icon: Layers,
        tag: 'Design'
      }
    ],
    docLink: '/docs#curriculum-structure'
  },
  {
    version: 'v1.2.5',
    date: 'September 04, 2026',
    primaryCommit: 'dee43f9',
    commits: ['dee43f9'],
    tagline: 'Unit 5 Scientific Computing (NumPy & Pandas) + DESIGN.md Architecture',
    category: 'Curriculum',
    isLatest: false,
    badges: ['NumPy & Pandas', 'DESIGN.md', 'Data Analysis'],
    summary:
      'Shipped Unit 5 (Days 2–10) covering scientific computing with NumPy ndarrays, multidimensional slicing, vectorization, and pandas DataFrames & Series. Established the formal ByteLab DESIGN.md design system architecture and dynamic content loader aliases.',
    features: [
      {
        title: 'Unit 5: Scientific Computing with NumPy & Pandas',
        desc: 'Lectures and practice problems covering n-dimensional array manipulation, mathematical broadcasting, pandas Series, and DataFrame queries.',
        icon: Cpu,
        tag: 'Data Science'
      },
      {
        title: 'Formal DESIGN.md Architecture',
        desc: 'Established uniform design tokens, typography rules, color scales, and spacing standards across the entire platform.',
        icon: Code2,
        tag: 'Design System'
      },
      {
        title: 'Dynamic Content Loader Aliasing',
        desc: 'Enhanced content loader engine with robust fallback aliasing for seamless chapter and problem lookups.',
        icon: Zap,
        tag: 'Loader'
      }
    ],
    docLink: '/docs#curriculum-structure'
  },
  {
    version: 'v1.2.0',
    date: 'September 03, 2026',
    primaryCommit: '943b1ea',
    commits: ['943b1ea'],
    tagline: 'Unit 2 Control Flow, Unit 3 Functions & Moodle CodeRunner Practice Arenas',
    category: 'Curriculum',
    isLatest: false,
    badges: ['Practice Arenas', 'Control Flow', 'SEO Sitemap'],
    summary:
      'Expanded curriculum with Unit 2 (Flow of Control & Iteration) and Unit 3 (Functions & Strings). Introduced hands-on practice arenas with automated test cases and the automated sitemap generator script.',
    features: [
      {
        title: 'Unit 2: Control Flow & Iterative Loops',
        desc: 'Conditional branching, while loops, for loops, nested loops, break, continue, and sentinel loop patterns.',
        icon: BookOpen,
        tag: 'Curriculum'
      },
      {
        title: 'Unit 3: Functions & String Algorithms',
        desc: 'Function definitions, scope, recursion, parameter passing, and string manipulation techniques.',
        icon: BookOpen,
        tag: 'Curriculum'
      },
      {
        title: 'Automated Practice Arena Test Runner',
        desc: 'Integrated Moodle CodeRunner-style automated unit test runner with test inputs, expected outputs, and diff assertions.',
        icon: Terminal,
        tag: 'IDE'
      },
      {
        title: 'Dynamic Sitemap & Robots Generator',
        desc: 'Build-time sitemap generator script indexing all courses, units, and blog entries for search engines.',
        icon: Zap,
        tag: 'SEO'
      }
    ],
    docLink: '/docs#practice-challenges'
  },
  {
    version: 'v1.1.0',
    date: 'September 02, 2026',
    primaryCommit: '316ff3d',
    commits: ['316ff3d', 'f5b7607'],
    tagline: 'Unit 1 Problem Solving, Mobile UX Optimization & Achievement Badges',
    category: 'UI & Performance',
    isLatest: false,
    badges: ['Mobile First', 'Badges', 'Unit 1 Core'],
    summary:
      'Completed Unit 1 foundation days (flowcharts, pseudo-code, operators, and expressions). Added mobile touch gestures, beginner achievement badges, and canvas confetti for lesson completion.',
    features: [
      {
        title: 'Unit 1: Algorithmic Problem Solving & Operators',
        desc: 'Computational thinking foundations: algorithm design, flowchart logic, Python arithmetic, logical and comparison operators.',
        icon: BookOpen,
        tag: 'Curriculum'
      },
      {
        title: 'Mobile UX & Responsive Navigation',
        desc: 'Optimized touch navigation, mobile header layouts, and touch-friendly button targets for smartphone learning.',
        icon: Layers,
        tag: 'Mobile UX'
      },
      {
        title: 'Student Achievement Badges & Confetti FX',
        desc: 'Visual reward engine celebrating completed chapters with milestone badges and celebration confetti.',
        icon: Award,
        tag: 'Gamification'
      }
    ],
    docLink: '/docs#getting-started'
  },
  {
    version: 'v1.0.0',
    date: 'September 01, 2026',
    primaryCommit: '3aaff6a',
    commits: ['3aaff6a', '08bbc7e', 'e3d83f2', '4392355'],
    tagline: 'ByteLab Core Launch: Pyodide 3.11 WASM Runtime & Monaco Editor',
    category: 'Core Engine',
    isLatest: false,
    badges: ['Initial Commit', 'Pyodide 3.11', 'Open Source', 'Apache 2.0'],
    summary:
      'Initial public release of ByteLab. Client-side Pyodide 3.11 WebAssembly runtime running in dedicated Web Worker, VS Code Monaco Editor integration, Cloudflare Pages deployment, and Apache 2.0 open-source licensing.',
    features: [
      {
        title: 'Zero-Backend Pyodide 3.11 WASM Architecture',
        desc: 'Runs full CPython 3.11 inside the user’s browser via WebAssembly with zero server roundtrips, total privacy, and sub-second execution.',
        icon: Cpu,
        tag: 'Architecture'
      },
      {
        title: 'VS Code Monaco Code Editor Integration',
        desc: 'Monaco Editor with Python syntax tokenization, automatic indentation, bracket matching, and Ctrl+Enter execution shortcut.',
        icon: Code2,
        tag: 'Editor'
      },
      {
        title: 'Cloudflare Pages & GitHub Pages CI/CD',
        desc: 'Production deployment configuration with edge caching and static asset routing.',
        icon: Zap,
        tag: 'DevOps'
      },
      {
        title: 'Apache 2.0 Open-Source License',
        desc: 'Free, transparent, and open-source educational software foundation.',
        icon: ShieldCheck,
        tag: 'Open Source'
      }
    ],
    docLink: '/docs#interactive-sandbox'
  }
];

const CATEGORIES = ['All', 'AI & Debugging', 'Curriculum', 'UI & Performance', 'Core Engine'];

export function UpdatesPage() {
  useSEO({
    title: 'Platform Updates & Git Changelog',
    description: 'Track the real development timeline, releases, and GitHub commits of the ByteLab Python LMS platform.'
  });

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReleases = useMemo(() => {
    return RELEASES.filter(rel => {
      const matchesCategory = selectedCategory === 'All' || rel.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query ||
        rel.version.toLowerCase().includes(query) ||
        rel.date.toLowerCase().includes(query) ||
        rel.primaryCommit.toLowerCase().includes(query) ||
        rel.tagline.toLowerCase().includes(query) ||
        rel.summary.toLowerCase().includes(query) ||
        rel.features.some(f => f.title.toLowerCase().includes(query) || f.desc.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Editorial Header Section */}
      <section className="w-full bg-[#fafafa] border-b border-[#d9d9dd] py-14 sm:py-20 px-4 md:px-8">
        <div className="max-w-[1200px] mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff7759]/10 border border-[#ff7759]/30 text-[#ff7759] text-[12px] font-mono uppercase tracking-widest font-semibold">
            <GitCommit className="w-3.5 h-3.5 fill-current" />
            <span>GIT-VERIFIED PLATFORM CHANGELOG</span>
          </div>

          <div className="max-w-3xl space-y-3">
            <h1 className="display-hero text-[34px] sm:text-[46px] lg:text-[56px] text-[#17171c] font-semibold tracking-tight leading-[1.08]">
              Platform Updates & Changelog
            </h1>
            <p className="text-[16px] sm:text-[18px] text-[#75758a] leading-relaxed">
              Real timeline of feature milestones, curriculum releases, and architecture commits pushed to the official ByteLab repository.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Category Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                    selectedCategory === cat
                      ? 'bg-[#17171c] text-white shadow-xs'
                      : 'bg-white hover:bg-[#eeece7]/60 text-[#525252] border border-[#d9d9dd]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Keyword Search Input */}
            <div className="relative w-full sm:w-[300px]">
              <Search className="w-4 h-4 text-[#93939f] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search releases, commits, dates..."
                className="w-full pl-9.5 pr-4 py-2 bg-white rounded-full border border-[#d9d9dd] text-[13px] text-[#17171c] placeholder-[#93939f] focus:outline-none focus:border-[#17171c] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-[12px]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Changelog Stream */}
      <section className="max-w-[1200px] mx-auto w-full px-4 md:px-8 py-12 lg:py-16">
        {filteredReleases.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <p className="text-[18px] font-semibold text-[#17171c]">No matching updates found</p>
            <p className="text-[14px] text-[#75758a]">Try clearing your search query or switching categories.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="px-4 py-2 rounded-full bg-[#17171c] text-white text-[13px] font-medium cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="relative border-l border-[#e5e5e5] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-16">
            {filteredReleases.map((rel) => (
              <article key={rel.version} className="relative group">
                {/* Timeline Dot Indicator */}
                <div className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center shadow-xs ${
                  rel.isLatest ? 'bg-[#ff7759] ring-4 ring-[#ff7759]/20' : 'bg-[#75758a]'
                }`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>

                {/* Release Card */}
                <div className="rounded-[20px] bg-white border border-[#d9d9dd] p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow space-y-6">
                  {/* Top Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#e5e5e5]">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-mono font-bold text-[20px] sm:text-[24px] text-[#17171c] tracking-tight">
                        {rel.version}
                      </span>
                      {rel.isLatest && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#ff7759] text-white text-[11px] font-mono font-semibold uppercase tracking-wider shadow-2xs">
                          Latest Release
                        </span>
                      )}
                      <span className="text-[12px] font-mono text-[#75758a] bg-[#fafafa] border border-[#d9d9dd] px-2.5 py-0.5 rounded-full">
                        {rel.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                      {/* Commit Badge */}
                      <a
                        href={`https://github.com/Abhijith-web-dev/bytelab/commit/${rel.primaryCommit}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-[11px] text-[#75758a] hover:text-[#17171c] bg-[#fafafa] hover:bg-[#eeece7] px-2.5 py-0.5 rounded-full border border-[#d9d9dd] transition-colors"
                        title="View verified commit on GitHub"
                      >
                        <GitCommit className="w-3 h-3 text-[#ff7759]" />
                        <span>commit: {rel.primaryCommit}</span>
                        <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                      </a>

                      <div className="flex items-center gap-1.5 text-[12px] font-mono text-[#75758a]">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{rel.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Title & Summary */}
                  <div className="space-y-2">
                    <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#17171c] tracking-tight leading-snug">
                      {rel.tagline}
                    </h2>
                    <p className="text-[14.5px] text-[#525252] leading-relaxed">
                      {rel.summary}
                    </p>
                  </div>

                  {/* Feature Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {rel.features.map((feat, idx) => {
                      const IconComponent = feat.icon;
                      return (
                        <div
                          key={idx}
                          className="p-4 rounded-[14px] bg-[#fafafa] border border-[#e5e5e5] space-y-2 hover:border-[#17171c]/30 transition-colors"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-[8px] bg-white border border-[#d9d9dd] text-[#17171c] flex items-center justify-center shrink-0 shadow-2xs">
                                <IconComponent className="w-3.5 h-3.5 text-[#ff7759]" />
                              </div>
                              <h3 className="text-[13.5px] font-semibold text-[#17171c] leading-snug">
                                {feat.title}
                              </h3>
                            </div>
                            <span className="text-[10px] font-mono uppercase text-[#75758a] bg-white px-2 py-0.5 rounded border border-[#e5e5e5] shrink-0">
                              {feat.tag}
                            </span>
                          </div>
                          <p className="text-[12.5px] text-[#75758a] leading-relaxed">
                            {feat.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Footer Action Links */}
                  <div className="pt-2 flex items-center justify-between flex-wrap gap-4 border-t border-[#e5e5e5]/60">
                    <div className="flex items-center gap-2 flex-wrap">
                      {rel.badges.map((b, bIdx) => (
                        <span key={bIdx} className="text-[11px] font-medium text-[#75758a] bg-[#eeece7]/50 px-2.5 py-0.5 rounded-full">
                          ✓ {b}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      {rel.commits && rel.commits.length > 1 && (
                        <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-[#93939f]">
                          <span>Commits:</span>
                          {rel.commits.map((c) => (
                            <a
                              key={c}
                              href={`https://github.com/Abhijith-web-dev/bytelab/commit/${c}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline hover:text-[#17171c]"
                            >
                              {c}
                            </a>
                          ))}
                        </div>
                      )}

                      <Link
                        to={rel.docLink}
                        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#17171c] hover:text-[#ff7759] transition-colors group"
                      >
                        <span>Read Documentation Guide</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Helpful Documentation Callout */}
      <section className="w-full bg-[#17171c] text-white py-14 px-4 md:px-8 border-t border-[#2e2e38] mt-auto">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-[#ff7759] font-semibold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>USER MANUAL & GUIDES</span>
            </div>
            <h3 className="text-[22px] sm:text-[26px] font-semibold tracking-tight text-white">
              Want to learn how to master ByteLab's tools?
            </h3>
            <p className="text-[14px] text-[#a1a1aa] max-w-xl">
              Read our comprehensive user documentation covering the interactive debugger, Pyodide WASM runtime, test runners, and Socratic hints.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/docs"
              className="px-5 py-2.5 rounded-full bg-white hover:bg-[#e5e5e5] text-black font-semibold text-[13px] flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <span>Explore Documentation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/courses/python-programming"
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-[13px] border border-white/20 transition-all cursor-pointer active:scale-95"
            >
              <span>View Syllabus</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
