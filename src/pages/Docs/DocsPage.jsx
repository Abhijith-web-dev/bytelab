import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BookOpen,
  Terminal,
  Bug,
  Sparkles,
  Award,
  Search,
  CheckCircle2,
  ArrowRight,
  Code2,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  HelpCircle,
  Copy,
  Check,
  ChevronRight,
  ExternalLink,
  Flame,
  FileCheck
} from 'lucide-react';
import { useSEO } from '../../hooks/useSEO.js';

const DOC_SECTIONS = [
  { id: 'getting-started', title: '1. Getting Started', icon: BookOpen },
  { id: 'interactive-sandbox', title: '2. Code Playground & Sandbox', icon: Terminal },
  { id: 'time-travel-debugger', title: '3. Time-Travel Debugger', icon: Bug },
  { id: 'gemini-nano-ai', title: '4. Gemini Nano Socratic AI', icon: Sparkles },
  { id: 'practice-challenges', title: '5. Practice Mode & Tests', icon: FileCheck },
  { id: 'outcome-mastery', title: '6. Course Outcomes (CO1–CO5)', icon: Award },
  { id: 'keyboard-shortcuts', title: '7. Keyboard Shortcuts', icon: Zap }
];

export function DocsPage() {
  useSEO({
    title: 'User Documentation & How-To Guide',
    description: 'Comprehensive guide to ByteLab: Master the interactive Python 3.11 sandbox, Time-Travel Debugger, on-device Gemini Nano AI hints, and Bloom’s taxonomy course outcomes.'
  });

  const location = useLocation();
  const [activeSection, setActiveSection] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedSnippet, setCopiedSnippet] = useState(null);

  // Scroll to hash if provided in URL
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && DOC_SECTIONS.some(s => s.id === hash)) {
      setActiveSection(hash);
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.hash]);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const scrollToSection = (id) => {
    setActiveSection(id);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top Hero Banner */}
      <section className="w-full bg-[#fafafa] border-b border-[#d9d9dd] py-12 sm:py-16 px-4 md:px-8">
        <div className="max-w-[1200px] mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff7759]/10 border border-[#ff7759]/30 text-[#ff7759] text-[12px] font-mono uppercase tracking-widest font-semibold">
            <BookOpen className="w-3.5 h-3.5 fill-current" />
            <span>BYTELAB PLATFORM DOCUMENTATION</span>
          </div>

          <div className="max-w-3xl space-y-2">
            <h1 className="display-hero text-[32px] sm:text-[44px] lg:text-[52px] text-[#17171c] font-semibold tracking-tight leading-[1.1]">
              How to Use ByteLab
            </h1>
            <p className="text-[16px] sm:text-[17px] text-[#75758a] leading-relaxed">
              The complete user guide to writing, executing, and stepping through Python 3.11 programs, using Chrome Built-in AI Socratic diagnostics, and tracking university syllabus outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Main Documentation Container */}
      <div className="max-w-[1200px] mx-auto w-full px-4 md:px-8 py-10 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Sticky Sidebar Navigation */}
          <aside className="lg:col-span-4 sticky top-[80px] space-y-4 bg-[#fafafa] p-4 rounded-[18px] border border-[#d9d9dd] shadow-2xs">
            <div className="px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-[#93939f] font-semibold flex items-center justify-between">
              <span>Table of Contents</span>
              <span className="text-[10px] text-[#ff7759] font-bold">DOCS v1.4</span>
            </div>

            <nav className="space-y-1">
              {DOC_SECTIONS.map((sec) => {
                const IconComp = sec.icon;
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-[10px] text-[13px] font-medium transition-all text-left cursor-pointer ${
                      isActive
                        ? 'bg-[#17171c] text-white font-semibold shadow-xs'
                        : 'text-[#525252] hover:bg-[#eeece7]/60 hover:text-[#17171c]'
                    }`}
                  >
                    <IconComp className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#ff7759]' : 'text-[#75758a]'}`} />
                    <span className="truncate">{sec.title}</span>
                  </button>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-[#e5e5e5] px-2 space-y-2">
              <Link
                to="/updates"
                className="text-[12px] text-[#75758a] hover:text-[#17171c] flex items-center justify-between font-medium group"
              >
                <span>View Release Changelog</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#93939f] group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/courses/python-programming"
                className="text-[12px] text-[#75758a] hover:text-[#17171c] flex items-center justify-between font-medium group"
              >
                <span>Explore 46-Day Syllabus</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#93939f] group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/terms"
                className="text-[12px] text-[#75758a] hover:text-[#17171c] flex items-center justify-between font-medium group"
              >
                <span>Terms & Fair Use Policy</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#93939f] group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </aside>

          {/* Right Detailed Documentation Articles */}
          <main className="lg:col-span-8 space-y-16 text-[#17171c]">
            {/* Section 1: Getting Started */}
            <article id="getting-started" className="space-y-4 scroll-mt-24 border-b border-[#e5e5e5] pb-12">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-[10px] bg-[#eeece7] text-[#17171c]">
                  <BookOpen className="w-5 h-5 text-[#ff7759]" />
                </span>
                <h2 className="text-[24px] sm:text-[28px] font-bold tracking-tight">
                  1. Getting Started with ByteLab
                </h2>
              </div>

              <p className="text-[15px] text-[#525252] leading-relaxed">
                ByteLab is an autonomous computer science learning laboratory designed to bridge theoretical classroom lectures with rigorous, hands-on programming mastery. It is fully aligned with university computer science curricula (such as <b>19AI301 / CS3301</b>).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-[14px] bg-[#fafafa] border border-[#e5e5e5] space-y-1.5">
                  <h4 className="font-semibold text-[14px] text-[#17171c]">Guest Mode vs. Account Sign-In</h4>
                  <p className="text-[13px] text-[#75758a] leading-relaxed">
                    You can start immediately as a guest without creating an account. When you choose to sign in with Google, your completed days, quiz scores, and XP points seamlessly sync to the cloud.
                  </p>
                </div>
                <div className="p-4 rounded-[14px] bg-[#fafafa] border border-[#e5e5e5] space-y-1.5">
                  <h4 className="font-semibold text-[14px] text-[#17171c]">The Daily Learning Loop</h4>
                  <p className="text-[13px] text-[#75758a] leading-relaxed">
                    Each day follows a structured pedagogical flow: <b>1) Core Concept Theory</b> &rarr; <b>2) Code Example Walkthrough</b> &rarr; <b>3) Live Sandbox Experimentation</b> &rarr; <b>4) Chapter Assessment Quiz</b>.
                  </p>
                </div>
              </div>
            </article>

            {/* Section 2: Code Playground & Sandbox */}
            <article id="interactive-sandbox" className="space-y-4 scroll-mt-24 border-b border-[#e5e5e5] pb-12">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-[10px] bg-[#eeece7] text-[#17171c]">
                  <Terminal className="w-5 h-5 text-[#1863dc]" />
                </span>
                <h2 className="text-[24px] sm:text-[28px] font-bold tracking-tight">
                  2. Interactive Code Playground & Sandbox
                </h2>
              </div>

              <p className="text-[15px] text-[#525252] leading-relaxed">
                ByteLab embeds a high-performance Monaco code editor (the engine powering Visual Studio Code) combined with client-side <b>Pyodide 3.11 WebAssembly</b>. All code execution occurs safely inside your browser's dedicated Web Worker thread.
              </p>

              <div className="rounded-[14px] bg-[#17171c] text-white p-4 font-mono text-[13px] space-y-2">
                <div className="flex items-center justify-between text-[#93939f] border-b border-[#2e2e38] pb-2 text-[11px]">
                  <span>TRY IN SANDBOX</span>
                  <button
                    onClick={() => handleCopy('def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("ByteLab"))', 'demo-snippet')}
                    className="hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    {copiedSnippet === 'demo-snippet' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSnippet === 'demo-snippet' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="text-[#a7f3d0] leading-relaxed whitespace-pre-wrap">
{`def greet(name):
    return f"Hello, {name}!"

print(greet("ByteLab"))`}
                </pre>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="font-semibold text-[15px]">Core Playground Features:</h4>
                <ul className="space-y-2 text-[14px] text-[#525252]">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><b>Zero-Lag Execution:</b> Running your code compiles locally with Pyodide 3.11. There are no server queues or network latency.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><b>Instant Re-Run (Bypass Debounce):</b> Clicking <b>Run Code</b> or pressing <b>Ctrl+Enter</b> instantly reads from Monaco's live buffer, immediately clearing previous error markers and inline widgets.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><b>Standard Input & Output:</b> Supports Python's built-in <code className="px-1.5 py-0.5 rounded bg-[#eeece7] text-stone-800 text-[12px] font-mono">input()</code> prompts via browser dialogue, streaming stdout and stderr in real time.</span>
                  </li>
                </ul>
              </div>
            </article>

            {/* Section 3: Time-Travel Debugger */}
            <article id="time-travel-debugger" className="space-y-4 scroll-mt-24 border-b border-[#e5e5e5] pb-12">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-[10px] bg-[#eeece7] text-[#17171c]">
                  <Bug className="w-5 h-5 text-[#ff7759]" />
                </span>
                <h2 className="text-[24px] sm:text-[28px] font-bold tracking-tight">
                  3. Advanced Time-Travel Debugger
                </h2>
              </div>

              <p className="text-[15px] text-[#525252] leading-relaxed">
                When you run your program with the <b>Time-Traveler Debug Mode</b> enabled, ByteLab instruments execution step-by-step. You can visually navigate backward and forward in execution history, observing variable mutations as they unfold.
              </p>

              <div className="space-y-4 pt-1">
                <div className="p-4 rounded-[14px] bg-[#fafafa] border border-[#e5e5e5] space-y-2">
                  <h4 className="font-semibold text-[14px] text-[#17171c] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-2xs" />
                    <span>Monaco Gutter Breakpoints</span>
                  </h4>
                  <p className="text-[13px] text-[#75758a] leading-relaxed">
                    Click anywhere on the left margin (gutter) of Monaco editor to drop or remove a glowing red breakpoint. When scrubbing or stepping, the debugger halts at these lines with haptic feedback.
                  </p>
                </div>

                <div className="p-4 rounded-[14px] bg-[#fafafa] border border-[#e5e5e5] space-y-2">
                  <h4 className="font-semibold text-[14px] text-[#17171c] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-2xs" />
                    <span>Inline Ghost Variable Pills</span>
                  </h4>
                  <p className="text-[13px] text-[#75758a] leading-relaxed">
                    At each execution step, an inline cyan pill appears directly at the end of the line (e.g. <code className="font-mono text-cyan-800 bg-cyan-50 px-1 rounded">// total = 15, count = 3</code>), letting you see live memory changes right next to your code.
                  </p>
                </div>

                <div className="p-4 rounded-[14px] bg-[#fafafa] border border-[#e5e5e5] space-y-2">
                  <h4 className="font-semibold text-[14px] text-[#17171c] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-2xs" />
                    <span>Scrubber Controls & Iteration Navigation</span>
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[12px] font-mono pt-1">
                    <div className="p-2 rounded bg-white border border-[#e5e5e5]"><b>[⏮ BP] / [⏭ BP]</b><br /><span className="text-[#75758a] font-sans">Jump to prior/next breakpoint</span></div>
                    <div className="p-2 rounded bg-white border border-[#e5e5e5]"><b>[⏮ Iter] / [Iter ⏭]</b><br /><span className="text-[#75758a] font-sans">Skip across loop iterations</span></div>
                    <div className="p-2 rounded bg-white border border-[#e5e5e5]"><b>[▶ Play / ⏸ Pause]</b><br /><span className="text-[#75758a] font-sans">Continuous step replay</span></div>
                    <div className="p-2 rounded bg-white border border-[#e5e5e5]"><b>[🚨 Crash]</b><br /><span className="text-[#75758a] font-sans">Jump instantly to exception</span></div>
                  </div>
                </div>
              </div>
            </article>

            {/* Section 4: Gemini Nano Socratic AI */}
            <article id="gemini-nano-ai" className="space-y-4 scroll-mt-24 border-b border-[#e5e5e5] pb-12">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-[10px] bg-[#eeece7] text-[#17171c]">
                  <Sparkles className="w-5 h-5 text-[#ff7759]" />
                </span>
                <h2 className="text-[24px] sm:text-[28px] font-bold tracking-tight">
                  4. Chrome Gemini Nano On-Device AI
                </h2>
              </div>

              <p className="text-[15px] text-[#525252] leading-relaxed">
                ByteLab features browser-native AI integration with Chrome's built-in <b>Gemini Nano</b> model via <code className="font-mono text-[13px] bg-[#eeece7] px-1.5 py-0.5 rounded">window.ai</code>. Your code never leaves your computer, ensuring complete offline privacy and immediate latency-free inference.
              </p>

              <div className="p-4 rounded-[14px] bg-orange-50 border border-orange-200 space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-orange-700" />
                  <h4 className="font-semibold text-[14px] text-orange-950">Pedagogical Guardrail: Zero Raw Code Spoilers</h4>
                </div>
                <p className="text-[13px] text-orange-900 leading-relaxed">
                  Unlike generic chatbots that output full copy-paste solutions, ByteLab’s Socratic engine acts as a patient computer science professor. It analyzes your syntax and memory state, providing structured cognitive clues that teach you <i>why</i> the bug occurred.
                </p>

                <div className="space-y-2 pt-1">
                  <div className="p-2.5 rounded bg-white border border-orange-200 text-[12.5px] space-y-1">
                    <b className="text-orange-900">1. Diagnosis:</b> Explains the conceptual mismatch (e.g. <i>"On line 4, `numbers.append(10)` was assigned back to `numbers`, resulting in `None`"</i>).
                  </div>
                  <div className="p-2.5 rounded bg-white border border-orange-200 text-[12.5px] space-y-1">
                    <b className="text-cyan-800">2. Socratic Clue:</b> Asks a targeted question to stimulate discovery (e.g. <i>"Do in-place list methods in Python return the mutated list, or do they return None?"</i>).
                  </div>
                  <div className="p-2.5 rounded bg-white border border-orange-200 text-[12.5px] space-y-1">
                    <b className="text-blue-900">3. Updation Idea:</b> Offers a concrete architectural recommendation (e.g. <i>"Call `numbers.append(10)` on its own line without reassigning it"</i>).
                  </div>
                </div>
              </div>
            </article>

            {/* Section 5: Practice Challenges & Tests */}
            <article id="practice-challenges" className="space-y-4 scroll-mt-24 border-b border-[#e5e5e5] pb-12">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-[10px] bg-[#eeece7] text-[#17171c]">
                  <FileCheck className="w-5 h-5 text-purple-600" />
                </span>
                <h2 className="text-[24px] sm:text-[28px] font-bold tracking-tight">
                  5. Practice Mode & Automated Test Cases
                </h2>
              </div>

              <p className="text-[15px] text-[#525252] leading-relaxed">
                ByteLab's Practice section contains challenge problem sets with automated unit verification modeled after university Moodle CodeRunner systems.
              </p>

              <div className="space-y-3 pt-1">
                <div className="p-4 rounded-[14px] bg-[#fafafa] border border-[#e5e5e5] space-y-2">
                  <h4 className="font-semibold text-[14px] text-[#17171c]">Output Diff Highlighting</h4>
                  <p className="text-[13px] text-[#75758a] leading-relaxed">
                    When a test case fails, the test table analyzes differences between your actual output and the expected output:
                  </p>
                  <ul className="list-disc list-inside text-[12.5px] text-[#525252] space-y-1 pl-1">
                    <li><b>Case Mismatch:</b> Flags differences like <code className="font-mono bg-white px-1">true</code> vs <code className="font-mono bg-white px-1">True</code>.</li>
                    <li><b>Trailing Whitespace:</b> Highlights invisible spaces or newline differences that fail strict string equality.</li>
                    <li><b>Missing Returns:</b> Flags functions producing <code className="font-mono bg-white px-1">&lt;No Output&gt;</code> or <code className="font-mono bg-white px-1">None</code>.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-[14px] bg-[#fafafa] border border-[#e5e5e5] space-y-2">
                  <h4 className="font-semibold text-[14px] text-[#17171c]">One-Click Debug Test Case</h4>
                  <p className="text-[13px] text-[#75758a] leading-relaxed">
                    Click <b>[🐞 Debug Test Case]</b> on any failing test case. ByteLab will automatically inject the test's input arguments and setup harness directly into the Time-Travel Debugger so you can trace your logic step-by-step.
                  </p>
                </div>
              </div>
            </article>

            {/* Section 6: Outcome Mastery */}
            <article id="outcome-mastery" className="space-y-4 scroll-mt-24 border-b border-[#e5e5e5] pb-12">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-[10px] bg-[#eeece7] text-[#17171c]">
                  <Award className="w-5 h-5 text-amber-600" />
                </span>
                <h2 className="text-[24px] sm:text-[28px] font-bold tracking-tight">
                  6. Course Outcome (CO1–CO5) Mastery
                </h2>
              </div>

              <p className="text-[15px] text-[#525252] leading-relaxed">
                ByteLab tracks your performance across Bloom’s Taxonomy and official academic accreditation Course Outcomes:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-[13px]">
                <div className="p-3 rounded-[12px] bg-[#fafafa] border border-[#e5e5e5]">
                  <b className="text-[#17171c]">CO1: Algorithmic Problem Solving</b>
                  <p className="text-[#75758a] text-[12px] mt-0.5">Flowcharts, pseudo-code, variable state manipulation (Unit 1).</p>
                </div>
                <div className="p-3 rounded-[12px] bg-[#fafafa] border border-[#e5e5e5]">
                  <b className="text-[#17171c]">CO2: Control Flow & Iteration</b>
                  <p className="text-[#75758a] text-[12px] mt-0.5">Conditional logic, while/for loops, break/continue (Unit 2).</p>
                </div>
                <div className="p-3 rounded-[12px] bg-[#fafafa] border border-[#e5e5e5]">
                  <b className="text-[#17171c]">CO3: Functions & Modular Design</b>
                  <p className="text-[#75758a] text-[12px] mt-0.5">Scope, parameters, recursion, string immutability (Unit 3).</p>
                </div>
                <div className="p-3 rounded-[12px] bg-[#fafafa] border border-[#e5e5e5]">
                  <b className="text-[#17171c]">CO4: Compound Data Structures</b>
                  <p className="text-[#75758a] text-[12px] mt-0.5">Lists, tuples, dictionaries, sets, memory references (Unit 4).</p>
                </div>
                <div className="p-3 rounded-[12px] bg-[#fafafa] border border-[#e5e5e5] sm:col-span-2">
                  <b className="text-[#17171c]">CO5: File I/O & Scientific Computing</b>
                  <p className="text-[#75758a] text-[12px] mt-0.5">File streams, exception handling, NumPy arrays, pandas DataFrames (Unit 5).</p>
                </div>
              </div>
            </article>

            {/* Section 7: Keyboard Shortcuts */}
            <article id="keyboard-shortcuts" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-[10px] bg-[#eeece7] text-[#17171c]">
                  <Zap className="w-5 h-5 text-amber-500" />
                </span>
                <h2 className="text-[24px] sm:text-[28px] font-bold tracking-tight">
                  7. Keyboard Shortcuts Reference
                </h2>
              </div>

              <div className="overflow-x-auto rounded-[14px] border border-[#e5e5e5] bg-white shadow-2xs">
                <table className="w-full text-left text-[13px] border-collapse">
                  <thead>
                    <tr className="bg-[#f3f4f6] text-[#525252] border-b border-[#e5e5e5]">
                      <th className="py-2.5 px-4 font-semibold w-[35%] border-r border-[#e5e5e5]">Action</th>
                      <th className="py-2.5 px-4 font-semibold w-[30%] border-r border-[#e5e5e5]">Shortcut</th>
                      <th className="py-2.5 px-4 font-semibold w-[35%]">Context</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e5e5e5] font-mono text-[12px]">
                    <tr>
                      <td className="py-3 px-4 font-sans font-medium text-[#17171c] border-r border-[#e5e5e5]">Run Python Code Instantly</td>
                      <td className="py-3 px-4 border-r border-[#e5e5e5]"><kbd className="bg-[#eeece7] px-2 py-0.5 rounded border border-[#d9d9dd] text-[#17171c]">Ctrl+Enter</kbd> / <kbd className="bg-[#eeece7] px-2 py-0.5 rounded border border-[#d9d9dd] text-[#17171c]">Cmd+Enter</kbd></td>
                      <td className="py-3 px-4 font-sans text-[#75758a]">Monaco Code Editor</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-medium text-[#17171c] border-r border-[#e5e5e5]">Open Global Search Palette</td>
                      <td className="py-3 px-4 border-r border-[#e5e5e5]"><kbd className="bg-[#eeece7] px-2 py-0.5 rounded border border-[#d9d9dd] text-[#17171c]">Ctrl+K</kbd> / <kbd className="bg-[#eeece7] px-2 py-0.5 rounded border border-[#d9d9dd] text-[#17171c]">Cmd+K</kbd></td>
                      <td className="py-3 px-4 font-sans text-[#75758a]">Anywhere on ByteLab</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-medium text-[#17171c] border-r border-[#e5e5e5]">Close Modals & Drawers</td>
                      <td className="py-3 px-4 border-r border-[#e5e5e5]"><kbd className="bg-[#eeece7] px-2 py-0.5 rounded border border-[#d9d9dd] text-[#17171c]">Escape</kbd></td>
                      <td className="py-3 px-4 font-sans text-[#75758a]">Dialogs & Search</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-medium text-[#17171c] border-r border-[#e5e5e5]">Toggle Line Breakpoint</td>
                      <td className="py-3 px-4 border-r border-[#e5e5e5]"><span className="font-sans">Click Gutter Margin</span></td>
                      <td className="py-3 px-4 font-sans text-[#75758a]">Monaco Line Numbers</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-medium text-[#17171c] border-r border-[#e5e5e5]">Format Python Code</td>
                      <td className="py-3 px-4 border-r border-[#e5e5e5]"><kbd className="bg-[#eeece7] px-2 py-0.5 rounded border border-[#d9d9dd] text-[#17171c]">Shift+Alt+F</kbd></td>
                      <td className="py-3 px-4 font-sans text-[#75758a]">Monaco Code Editor</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>
          </main>
        </div>
      </div>

      {/* Footer Callout */}
      <section className="w-full bg-[#fafafa] py-12 px-4 md:px-8 border-t border-[#d9d9dd] mt-auto">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-[16px] font-semibold text-[#17171c]">Ready to start practicing?</h4>
            <p className="text-[13px] text-[#75758a]">Jump into the Python 3.11 interactive sandbox or browse the 46-day syllabus.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/practice"
              className="px-5 py-2 rounded-full bg-[#17171c] hover:bg-black text-white text-[13px] font-medium transition-all shadow-xs cursor-pointer"
            >
              Open Sandbox IDE
            </Link>
            <Link
              to="/courses/python-programming"
              className="px-5 py-2 rounded-full bg-white hover:bg-[#eeece7]/60 text-[#17171c] border border-[#d9d9dd] text-[13px] font-medium transition-all cursor-pointer"
            >
              View Syllabus
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
