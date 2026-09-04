import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code2, ShieldCheck, ArrowRight, Check, Terminal, Cpu, Sparkles, Layers, Globe } from 'lucide-react';

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
    <footer className="w-full bg-[#17171c] text-white border-t border-[#26262e] select-none text-[13px]">
      {/* Upper Band: Newsletter / Systems Subscription (DESIGN.md footer-newsletter) */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 pt-16 pb-12 border-b border-[#26262e]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#ff7759]/10 border border-[#ff7759]/30 text-[#ff7759] text-[11px] font-mono tracking-widest uppercase font-semibold">
              <span>SYSTEMS & COMPUTING</span>
            </div>
            <h2 className="text-[26px] sm:text-[32px] font-semibold text-white tracking-tight leading-tight max-w-xl">
              Engineering moves fast. Master fundamental principles that never expire.
            </h2>
            <p className="text-[14px] text-[#93939f] max-w-lg leading-relaxed">
              Curated lecture notes, algorithm visualizations, and low-level runtime insights delivered right to your inbox.
            </p>
          </div>

          <div className="lg:col-span-5 w-full">
            {subscribed ? (
              <div className="p-4 rounded-[12px] bg-white/5 border border-emerald-500/30 text-emerald-400 flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-[14px]">You're on the list! Welcome to the ByteLab engineering community.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <div className="flex items-center rounded-full bg-white/5 border border-[#383842] p-1.5 focus-within:border-white transition-all">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your university or engineering email..."
                    required
                    className="flex-1 bg-transparent px-4 py-1.5 text-[13px] text-white placeholder-[#75758a] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-white hover:bg-[#e5e5e5] text-black font-medium text-[13px] flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-[#75758a] px-3">
                  Zero spam. Unsubscribe anytime. Accessible to students, faculty, and engineers worldwide.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Directory Links */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand & Identity */}
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 text-white font-semibold text-[17px]">
              <div className="w-7 h-7 rounded-[8px] bg-white flex items-center justify-center text-black shadow-xs">
                <Code2 className="w-4 h-4" />
              </div>
              <span className="font-display">ByteLab Core</span>
            </div>
            <p className="text-[13px] text-[#93939f] max-w-sm leading-relaxed">
              Autonomous computer science & multi-language engineering laboratory. Zero-backend client architecture with isolated browser WebAssembly sandboxes.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#a3a3a3] border border-white/10">Python 3.11</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#a3a3a3] border border-white/10">C++20</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#a3a3a3] border border-white/10">TypeScript 5</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#a3a3a3] border border-white/10">Rust</span>
            </div>
          </div>

          {/* Col 2: Active Tracks */}
          <div className="space-y-3">
            <h3 className="text-[12px] font-mono uppercase tracking-wider text-white font-semibold">
              Curricula Tracks
            </h3>
            <ul className="space-y-2 text-[#93939f]">
              <li>
                <Link to="/courses/python-programming" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Python (19AI301)</span>
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">
                  C++ Data Structures
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">
                  C Systems Programming
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">
                  TypeScript Web Runtime
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">
                  SQL & Databases
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Interactive Lab */}
          <div className="space-y-3">
            <h3 className="text-[12px] font-mono uppercase tracking-wider text-white font-semibold">
              Interactive Lab
            </h3>
            <ul className="space-y-2 text-[#93939f]">
              <li>
                <Link to="/practice" className="hover:text-white transition-colors">Coding Playground</Link>
              </li>
              <li>
                <Link to="/tests" className="hover:text-white transition-colors">Diagnostic Tests</Link>
              </li>
              <li>
                <Link to="/progress" className="hover:text-white transition-colors">CO1–CO5 Analytics</Link>
              </li>
              <li>
                <Link to="/leaderboard" className="hover:text-white transition-colors">Class Rankings</Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-white transition-colors">Student Profile</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Architecture */}
          <div className="space-y-3">
            <h3 className="text-[12px] font-mono uppercase tracking-wider text-white font-semibold">
              Architecture
            </h3>
            <ul className="space-y-2 text-[#93939f]">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Pyodide WebAssembly</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                <span>Isolated Web Worker</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-purple-400" />
                <span>Monaco Engine</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>Cloudflare Edge SPA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal / Trust Row */}
        <div className="pt-10 mt-10 border-t border-[#26262e] flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#75758a]">
          <div>
            © {new Date().getFullYear()} ByteLab Core. Multi-language computer science and systems platform. Free & open education.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/courses/python-programming" className="hover:text-white transition-colors">Syllabus</Link>
            <Link to="/courses" className="hover:text-white transition-colors">Roadmap</Link>
            <Link to="/progress" className="hover:text-white transition-colors">Outcomes</Link>
            <span className="text-[#383842]">|</span>
            <span className="text-emerald-400 font-medium flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

