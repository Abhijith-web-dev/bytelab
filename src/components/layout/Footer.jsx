import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  ArrowRight,
  Check,
  Terminal,
  Cpu,
  Sparkles,
  Layers,
  Globe,
  BookOpen,
  FileText,
  ExternalLink,
  Award,
  ShieldCheck,
  Zap
} from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer role="contentinfo" aria-label="ByteLab Platform Footer" className="w-full bg-[#17171c] text-white border-t border-[#26262e] select-none text-[13px]">
      {/* Upper Band: Newsletter & Developer Dispatch */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 pt-14 pb-10 border-b border-[#26262e]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#ff7759]/10 border border-[#ff7759]/30 text-[#ff7759] text-[11px] font-mono tracking-widest uppercase font-semibold">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>SYSTEMS & COMPUTING RESEARCH</span>
            </div>
            <h2 className="text-[24px] sm:text-[30px] font-semibold text-white tracking-tight leading-tight max-w-xl">
              Engineering moves fast. Master fundamental principles that never expire.
            </h2>
            <p className="text-[13.5px] text-[#a1a1aa] max-w-lg leading-relaxed">
              Curated lecture notes, algorithm visualizations, and zero-backend client WebAssembly insights designed for engineers and students.
            </p>
          </div>

          <div className="lg:col-span-5 w-full">
            {subscribed ? (
              <div className="p-4 rounded-[14px] bg-white/5 border border-emerald-500/30 text-emerald-400 flex items-center gap-2.5 animate-in fade-in duration-150">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-[13.5px]">You're on the list! Welcome to the ByteLab engineering community.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <div className="flex items-center rounded-full bg-white/5 border border-[#383842] p-1.5 focus-within:border-white transition-all">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your university or developer email..."
                    required
                    aria-label="Email address for engineering newsletter"
                    className="flex-1 bg-transparent px-4 py-1.5 text-[13px] text-white placeholder-[#a1a1aa] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-white hover:bg-[#e5e5e5] text-black font-medium text-[13px] flex items-center gap-1.5 transition-all cursor-pointer shrink-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11.5px] text-[#a1a1aa] px-3">
                  Zero spam. Technical engineering dispatches only. Free for learners worldwide.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Directory Links (5 Columns) */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand & Architect Bio */}
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 text-white font-semibold text-[18px] group">
              <div className="w-7 h-7 rounded-[8px] bg-white flex items-center justify-center text-black shadow-xs group-hover:bg-[#fafafa] transition-colors">
                <Code2 className="w-4 h-4" />
              </div>
              <span className="font-display font-semibold">ByteLab Core</span>
            </Link>
            <p className="text-[13px] text-[#a1a1aa] max-w-sm leading-relaxed">
              Autonomous computer science laboratory & interactive curriculum engine. Zero-backend client architecture with isolated browser WebAssembly sandboxes and cloud synchronization.
            </p>

            {/* Author Profile Card */}
            <div className="pt-1">
              <div className="p-3.5 rounded-[12px] bg-white/5 border border-white/10 max-w-sm space-y-1.5">
                <div className="text-[11px] font-mono text-[#a1a1aa] uppercase tracking-wider font-semibold">
                  Founder & Lead Architect
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white text-[14px]">Abhijith S</span>
                  <a
                    href="https://abhijith-dev-io.web.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[12px] font-medium text-[#ff7759] hover:underline"
                    aria-label="View Abhijith S Portfolio (opens in new tab)"
                  >
                    <span>Portfolio</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-[11.5px] text-[#a1a1aa] leading-snug">
                  Software engineer & system designer building low-latency WebAssembly developer tooling.
                </p>
              </div>
            </div>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[10.5px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 text-[#a1a1aa] border border-white/10">Python 3.11</span>
              <span className="text-[10.5px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 text-[#a1a1aa] border border-white/10">Pyodide WASM</span>
              <span className="text-[10.5px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 text-[#a1a1aa] border border-white/10">NumPy & Pandas</span>
              <span className="text-[10.5px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 text-[#a1a1aa] border border-white/10">TypeScript 5</span>
              <span className="text-[10.5px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 text-[#a1a1aa] border border-white/10">Tailwind v4</span>
            </div>
          </div>

          {/* Col 2: 46-Day Python Curriculum */}
          <div className="space-y-3">
            <h3 className="text-[12px] font-mono uppercase tracking-wider text-white font-semibold flex items-center gap-1.5">
              <span>Python 46-Day</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </h3>
            <ul className="space-y-2 text-[#a1a1aa]">
              <li>
                <Link to="/courses/python-programming" className="hover:text-white transition-colors flex items-center gap-1.5 font-medium text-white">
                  <span>Course Syllabus Overview</span>
                </Link>
              </li>
              <li>
                <Link to="/courses/python-programming/unit/unit-01" className="hover:text-white transition-colors">
                  Unit I: Problem Solving (Days 1–12)
                </Link>
              </li>
              <li>
                <Link to="/courses/python-programming/unit/unit-02" className="hover:text-white transition-colors">
                  Unit II: Flow & Loops (Days 13–20)
                </Link>
              </li>
              <li>
                <Link to="/courses/python-programming/unit/unit-03" className="hover:text-white transition-colors">
                  Unit III: Functions & Strings (Days 21–26)
                </Link>
              </li>
              <li>
                <Link to="/courses/python-programming/unit/unit-04" className="hover:text-white transition-colors">
                  Unit IV: Data Structures (Days 27–36)
                </Link>
              </li>
              <li>
                <Link to="/courses/python-programming/unit/unit-05" className="hover:text-white transition-colors">
                  Unit V: Files & Modules (Days 37–46)
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors text-[12px] text-[#ff7759] pt-1 block">
                  Browse All Tracks →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Developer Journal & Research */}
          <div className="space-y-3">
            <h3 className="text-[12px] font-mono uppercase tracking-wider text-white font-semibold flex items-center gap-1.5">
              <span>Developer Blog</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff7759]" />
            </h3>
            <ul className="space-y-2 text-[#a1a1aa]">
              <li>
                <Link to="/blog" className="text-white hover:underline flex items-center gap-1.5 font-medium">
                  <FileText className="w-3.5 h-3.5 text-[#ff7759]" />
                  <span>All Technical Posts</span>
                </Link>
              </li>
              <li>
                <Link to="/blog/zero-backend-wasm-python" className="hover:text-white transition-colors leading-snug block">
                  Zero-Backend Pyodide WASM
                </Link>
              </li>
              <li>
                <Link to="/blog/optimizing-web-vitals-sub-2s" className="hover:text-white transition-colors leading-snug block">
                  Sub-2s Web Vitals Architecture
                </Link>
              </li>
              <li>
                <Link to="/blog/memory-tracer-python-stack" className="hover:text-white transition-colors leading-snug block">
                  CPython Memory Model
                </Link>
              </li>
              <li>
                <Link to="/blog/curriculum-design-first-principles" className="hover:text-white transition-colors leading-snug block">
                  46-Day Systems Design
                </Link>
              </li>
              <li>
                <a href="/llms.txt" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-[12px] font-mono text-[#a1a1aa] flex items-center gap-1">
                  <span>/llms.txt</span>
                  <ExternalLink className="w-3 h-3 text-[#a1a1aa]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Interactive Lab & Practice */}
          <div className="space-y-3">
            <h3 className="text-[12px] font-mono uppercase tracking-wider text-white font-semibold">
              Interactive Lab
            </h3>
            <ul className="space-y-2 text-[#a1a1aa]">
              <li>
                <Link to="/practice" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#1863dc]" />
                  <span>Python 3.11 Sandbox</span>
                </Link>
              </li>
              <li>
                <Link to="/tests" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Unit Diagnostic Tests</span>
                </Link>
              </li>
              <li>
                <Link to="/progress" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#ff7759]" />
                  <span>CO1–CO5 Analytics</span>
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Global Leaderboard</span>
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Student Sign In
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-white transition-colors">
                  Cloud Sync Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal, Architecture & System Status Row */}
        <div className="pt-8 mt-10 border-t border-[#26262e] flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-[#a1a1aa]">
          <div>
            © {new Date().getFullYear()} ByteLab Core. Multi-language computer science & systems platform by{' '}
            <a
              href="https://abhijith-dev-io.web.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline font-medium"
            >
              Abhijith S
            </a>
            . Aligned with University Curriculum (19AI301 / CS3301).
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-5">
            <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link to="/courses/python-programming" className="hover:text-white transition-colors">Syllabus</Link>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors font-mono">
              sitemap.xml
            </a>
            <a href="/robots.txt" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors font-mono">
              robots.txt
            </a>
            <a href="/llms.txt" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors font-mono">
              llms.txt
            </a>
            <span className="text-[#52525b] hidden sm:inline">|</span>
            <span className="text-emerald-400 font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>WASM Worker Active</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
