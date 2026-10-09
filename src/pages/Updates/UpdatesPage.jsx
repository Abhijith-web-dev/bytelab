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
  Lock,
  Wifi,
  Database,
  Gauge,
  Check
} from 'lucide-react';
import { useSEO } from '../../hooks/useSEO.js';
import { Badge } from '../../components/ui/Badge.jsx';

// Verified against ByteLab GitHub commit log & production deployments
const RELEASES = [
  {
    version: 'v1.5.0',
    date: 'October 09, 2026',
    primaryCommit: 'c86e18c',
    commits: ['c86e18c', '15bdc6f', '4054a8e', 'e42a980'],
    tagline: 'Live Firestore Cloud Sync, 100kbps Low-Bandwidth Acceleration & Real-Time Cohort Analytics',
    category: 'Core Engine',
    isLatest: true,
    badges: ['Latest Production Push', 'Firebase Cloud Live', '100kbps 2G Optimized', 'Real-Time Sync'],
    summary:
      'A major infrastructural release deploying official Firestore rules & composite indexes directly to Firebase cloud (bytelab-f1acf). Integrated real-time leaderboard data streams with dynamic class percentile ratings and next-rival target milestones. Added an ultra-low bandwidth engine with critical path inline skeleton loaders and a high-performance Service Worker cache for instantaneous loading on 100kbps 2G/3G networks.',
    features: [
      {
        title: 'Cloud Firestore Rules & Composite Index Deployment',
        desc: 'Deployed verified security rules and multi-field indexes (score, focusMinutes, streak, solved) to Firebase Cloud (bytelab-f1acf) for rapid sub-50ms database queries.',
        icon: Database,
        tag: 'Cloud Backend'
      },
      {
        title: '100kbps 2G/3G Ultra-Low Bandwidth Engine',
        desc: 'Instant critical CSS skeleton renders immediately in <50ms without waiting for JavaScript. Service Worker (sw.js) enables stale-while-revalidate caching and complete offline continuity.',
        icon: Wifi,
        tag: 'Performance'
      },
      {
        title: 'Real-Time Leaderboard & Cohort Percentile Engine',
        desc: 'Live onSnapshot streams with 3-tier blending (live Firestore + local storage cache + academic benchmarks), dynamic "Top 5% Cohort Elite" standing tags, and live sync status indicators.',
        icon: Award,
        tag: 'Leaderboard'
      },
      {
        title: 'Dynamic Next-Rank Rival Milestone Calculator',
        desc: 'Calculates the exact XP, focus minutes, or problem count gap needed to overtake the immediate preceding rank, turning study sessions into actionable gamified sprints.',
        icon: Flame,
        tag: 'Gamification'
      },
      {
        title: 'Zero-Test-Case Practice IDE Execution',
        desc: 'Monaco Practice Playground seamlessly supports running standalone algorithms, interactive scripts, and open-ended student logic with full stdout/stderr capture.',
        icon: Terminal,
        tag: 'IDE & Runtime'
      },
      {
        title: 'Precision Regex Safe Python Input Handler',
        desc: 'Hardened Pyodide worker SafeInputHandler with robust newline carriage-return stripping (\\r\\n) and standard EOF error propagation for competitive programming.',
        icon: ShieldCheck,
        tag: 'Security & Safety'
      }
    ],
    docLink: '/docs#real-time-sync'
  },
  {
    version: 'v1.4.0',
    date: 'September 07, 2026',
    primaryCommit: 'e42a980',
    commits: ['e42a980', '0d858e1', '68a6d09', 'a8510c7'],
    tagline: 'Visual Execution Debugger, Chrome Gemini Nano Socratic AI & Security Hardening',
    category: 'AI & Debugging',
    isLatest: false,
    badges: ['Chrome Built-in AI', 'Zero-Latency', 'Security Hardened'],
    summary:
      'A massive update introducing the visual Time-Traveler Debug Mode with 60fps Monaco scrubber, gutter breakpoints, and inline ghost variable pills. Integrated Chrome browser-native Gemini Nano for on-device Socratic code diagnostics, completed Bitwise Operators masterclass with clean 5 and 3 binary truth tables, and hardened Firebase API key security.',
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
        desc: 'Harnesses Chrome browser-native `LanguageModel` APIs. Evaluates code AST and error context to deliver a 3-tier progressive clue ladder (Diagnosis, Conceptual Clue, Updation Idea) while strictly banning raw code spoilers.',
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

const CATEGORIES = ['All', 'Core Engine', 'AI & Debugging', 'Curriculum', 'UI & Performance'];

export function UpdatesPage() {
  useSEO({
    title: 'Platform Updates & Git Changelog | ByteLab',
    description: 'Track the verified development timeline, releases, Firestore cloud deployments, and low-bandwidth optimizations of ByteLab.'
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
      <section className="w-full bg-[#fafafa] border-b border-[#d9d9dd] py-12 sm:py-18 px-4 md:px-8">
        <div className="max-w-[1200px] mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff7759]/10 border border-[#ff7759]/30 text-[#ff7759] text-[12px] font-mono uppercase tracking-widest font-semibold">
            <GitCommit className="w-3.5 h-3.5 fill-current" />
            <span>GIT-VERIFIED PLATFORM CHANGELOG</span>
          </div>

          <div className="max-w-[840px] space-y-3">
            <h1 className="text-[32px] sm:text-[44px] font-bold text-[#17171c] tracking-tight leading-[1.15]">
              Engineering Updates, Cloud Releases & Network Optimizations
            </h1>
            <p className="text-[16px] sm:text-[18px] text-[#75758a] leading-relaxed">
              Every milestone, architectural upgrade, and algorithm enhancement deployed to ByteLab. Powered by client-side WebAssembly, Firebase Firestore real-time synchronization, and an ultra-low-bandwidth 100kbps engine.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-[16px] bg-white border border-[#d9d9dd] space-y-1 shadow-2xs">
              <span className="text-[11px] text-[#75758a] font-mono uppercase">Current Version</span>
              <p className="text-[20px] font-bold text-[#17171c] font-mono">{RELEASES[0].version}</p>
            </div>
            <div className="p-4 rounded-[16px] bg-white border border-[#d9d9dd] space-y-1 shadow-2xs">
              <span className="text-[11px] text-[#75758a] font-mono uppercase">Total Releases</span>
              <p className="text-[20px] font-bold text-[#17171c] font-mono">{RELEASES.length} Milestones</p>
            </div>
            <div className="p-4 rounded-[16px] bg-white border border-[#d9d9dd] space-y-1 shadow-2xs">
              <span className="text-[11px] text-[#75758a] font-mono uppercase">Network Target</span>
              <p className="text-[20px] font-bold text-emerald-700 font-mono">100kbps 2G/3G</p>
            </div>
            <div className="p-4 rounded-[16px] bg-white border border-[#d9d9dd] space-y-1 shadow-2xs">
              <span className="text-[11px] text-[#75758a] font-mono uppercase">Backend Architecture</span>
              <p className="text-[20px] font-bold text-[#003c33] font-mono">Zero-Server WASM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-[1200px] mx-auto w-full px-4 md:px-8 py-10 space-y-8">
        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#d9d9dd]">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-[#17171c] text-white shadow-xs'
                    : 'bg-[#fafafa] border border-[#d9d9dd] text-[#75758a] hover:text-[#17171c] hover:border-[#17171c]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#75758a]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search features, commits, versions..."
              className="w-full pl-9 pr-4 py-1.5 text-[13px] bg-[#fafafa] border border-[#d9d9dd] rounded-full focus:outline-none focus:border-[#17171c] text-[#17171c] placeholder:text-[#75758a]"
            />
          </div>
        </div>

        {/* Timeline List of Releases */}
        <div className="space-y-12">
          {filteredReleases.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <p className="text-[16px] text-[#75758a]">No changelog releases match your search query.</p>
              <button
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="text-[13px] text-[#ff7759] font-medium hover:underline cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            filteredReleases.map((release, releaseIdx) => {
              const isFirst = releaseIdx === 0;

              return (
                <article
                  key={release.version}
                  className={`rounded-[24px] border transition-all ${
                    release.isLatest
                      ? 'bg-gradient-to-b from-[#fafafa] to-white border-amber-300 shadow-sm p-6 sm:p-10 space-y-8'
                      : 'bg-white border-[#d9d9dd] p-6 sm:p-8 space-y-6 hover:border-[#17171c]'
                  }`}
                >
                  {/* Top Metadata Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#d9d9dd]/70">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[24px] sm:text-[28px] font-bold font-mono text-[#17171c] tracking-tight">
                          {release.version}
                        </span>
                        {release.isLatest && (
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-[11px] font-bold uppercase tracking-wider">
                            ✨ Latest Production Release
                          </span>
                        )}
                        <span className="text-[12px] text-[#75758a] font-mono">
                          • {release.date}
                        </span>
                      </div>
                      <h2 className="text-[18px] sm:text-[20px] font-semibold text-[#17171c] leading-snug">
                        {release.tagline}
                      </h2>
                    </div>

                    {/* Commit Badges */}
                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={`https://github.com/Abhijith-web-dev/bytelab/commit/${release.primaryCommit}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#fafafa] border border-[#d9d9dd] text-[12px] font-mono text-[#17171c] hover:bg-[#eeece7] transition-colors"
                      >
                        <GitCommit className="w-3.5 h-3.5 text-[#75758a]" />
                        <span>{release.primaryCommit}</span>
                        <ExternalLink className="w-3 h-3 text-[#75758a]" />
                      </a>
                    </div>
                  </div>

                  {/* Badges Bar */}
                  <div className="flex flex-wrap items-center gap-2">
                    {release.badges.map((b) => (
                      <span
                        key={b}
                        className="px-2.5 py-0.5 rounded-full bg-[#fafafa] border border-[#d9d9dd] text-[11px] font-medium text-[#75758a]"
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  {/* Summary Text */}
                  <p className="text-[14px] sm:text-[15px] text-[#555566] leading-relaxed">
                    {release.summary}
                  </p>

                  {/* Feature Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                    {release.features.map((feat) => {
                      const IconComponent = feat.icon || CheckCircle2;
                      return (
                        <div
                          key={feat.title}
                          className="p-5 rounded-[18px] bg-[#fafafa]/80 border border-[#d9d9dd] space-y-2 hover:border-[#17171c] hover:bg-white transition-all shadow-2xs"
                        >
                          <div className="flex items-center justify-between">
                            <div className="w-8 h-8 rounded-lg bg-[#17171c] text-white flex items-center justify-center">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#75758a] font-semibold bg-white px-2 py-0.5 rounded-full border border-[#d9d9dd]">
                              {feat.tag}
                            </span>
                          </div>
                          <h3 className="text-[14px] font-semibold text-[#17171c]">
                            {feat.title}
                          </h3>
                          <p className="text-[12px] text-[#75758a] leading-relaxed">
                            {feat.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Release Documentation Link */}
                  {release.docLink && (
                    <div className="pt-2 flex justify-end">
                      <Link
                        to={release.docLink}
                        className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#ff7759] hover:underline"
                      >
                        <span>Explore {release.version} Documentation</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}
                </article>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
