import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, ShieldCheck, Terminal, Cpu } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-white border-t border-[#e5e5e5] text-[#737373] py-10 select-none text-[13px]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[#000000] font-semibold text-[15px]">
            <div className="w-6 h-6 rounded-[6px] bg-[#000000] flex items-center justify-center text-white">
              <Code2 className="w-3.5 h-3.5" />
            </div>
            <span>ByteLab LMS</span>
            <span className="text-[12px] font-normal text-[#737373] ml-2">
              19AI301 / CS3301 Python Programming
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[#525252]">
            <Link to="/courses/python-programming" className="hover:text-[#000000] transition-colors">Curriculum</Link>
            <Link to="/courses" className="hover:text-[#000000] transition-colors">Courses</Link>
            <Link to="/practice" className="hover:text-[#000000] transition-colors">Playground</Link>
            <Link to="/tests" className="hover:text-[#000000] transition-colors">Assessments</Link>
            <Link to="/progress" className="hover:text-[#000000] transition-colors">Outcome Analytics</Link>
            <Link to="/leaderboard" className="hover:text-[#000000] transition-colors">Leaderboard</Link>
          </div>
        </div>

        <div className="pt-4 border-t border-[#e5e5e5] flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-[#a3a3a3]">
          <div>
            © {new Date().getFullYear()} ByteLab LMS. Autonomous client-side Python execution engine with Pyodide WebAssembly.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[#525252]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zero-Backend Client Sandbox</span>
            </span>
            <span>•</span>
            <span>Free & Open Learning Resources</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
