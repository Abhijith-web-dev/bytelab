import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, CheckCircle2, ShieldCheck, Award, Flame, BookOpen, Terminal, Sparkles, Layers, Cpu } from 'lucide-react';
import { Button } from '../../components/ui/Button.jsx';
import { Badge } from '../../components/ui/Badge.jsx';
import { useAuthStore } from '../../stores/authStore.js';
import { useProgressStore } from '../../stores/progressStore.js';
import { getCourse } from '../../content/loader/index.js';
import { pythonRuntime } from '../../runtimes/python/pythonRuntime.js';
import { useSEO } from '../../hooks/useSEO.js';

const CodePlayground = React.lazy(() => import('../../components/editor/CodePlayground.jsx').then(m => ({ default: m.CodePlayground })));

export function HomePage() {
  useSEO({
    title: 'CodePath LMS | Tutorial-First Programming Platform',
    description: 'Master Python Programming and engineering concepts with hands-on coding, sandboxed execution, and guided tutorials.'
  });

  const { isAuthenticated, user } = useAuthStore();
  const { completedChapters, totalPoints, streakDays } = useProgressStore();
  const course = getCourse('python-programming');

  // Interactive Live Sandbox state on landing page
  const [sandboxCode, setSandboxCode] = useState(
`# Welcome to ByteLab — 19AI301 Python Programming
# Compute Fibonacci sequence and NumPy array operations

def fibonacci(n):
    a, b = 0, 1
    seq = []
    for _ in range(n):
        seq.append(a)
        a, b = b, a + b
    return seq

print("Fibonacci Sequence (10 terms):", fibonacci(10))
print("ByteLab LMS: Ready for Units I - V!")
`
  );
  const [sandboxState, setSandboxState] = useState('IDLE');
  const [sandboxStdout, setSandboxStdout] = useState('');
  const [sandboxStderr, setSandboxStderr] = useState('');
  const [sandboxTime, setSandboxTime] = useState(0);

  const handleRunSandbox = async () => {
    setSandboxState('RUNNING');
    setSandboxStdout('');
    setSandboxStderr('');

    const res = await pythonRuntime.execute({
      sourceCode: sandboxCode,
      timeoutMs: 5000
    });

    setSandboxState(res.status === 'passed' ? 'PASSED' : 'RUNTIME_ERROR');
    setSandboxStdout(res.stdout);
    setSandboxStderr(res.stderr);
    setSandboxTime(res.executionTimeMs);
  };

  return (
    <div className="flex flex-col w-full bg-white text-[#000000]">
      {/* SECTION 1: Paper-White Clean Hero (DESIGN.md) */}
      <section className="w-full bg-white pt-20 pb-20 border-b border-[#e5e5e5] px-4 md:px-8">
        <div className="max-w-[800px] mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fafafa] border border-[#e5e5e5] text-[13px] text-[#525252]">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>19AI301 / CS3301 • Python Programming</span>
          </div>

          <h1 className="text-[36px] sm:text-[48px] lg:text-[54px] font-semibold tracking-[-0.03em] leading-[1.1] text-[#000000]">
            The easiest way to master Python from first principles.
          </h1>

          <p className="text-[17px] sm:text-[19px] text-[#737373] max-w-xl mx-auto leading-relaxed">
            Read structured academic lectures, inspect step-by-step memory simulations, write code in in-browser sandboxes, and verify outcomes with randomized assessments.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link to="/courses/python-programming">
              <Button variant="primary" size="lg">
                Start Course (60 Periods)
              </Button>
            </Link>
            <Link to="/courses">
              <Button variant="secondary" size="lg">
                Explore Curriculum
              </Button>
            </Link>
          </div>

          {/* Guarantee / Features Strip */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-[13px] text-[#737373]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>5 Academic Units • 27 Chapters</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#000000]" />
              <span>Pyodide WebAssembly Sandbox</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-600" />
              <span>CO1–CO5 Outcome Analytics</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Terminal Mockup Card / Inverted Dark Surface (DESIGN.md) */}
      <section className="w-full bg-[#171717] text-white py-16 px-4 md:px-8 border-b border-black">
        <div className="max-w-[1000px] mx-auto space-y-8">
          <div className="text-center max-w-lg mx-auto space-y-2">
            <h2 className="text-[28px] sm:text-[34px] font-semibold text-white tracking-tight">
              Type, run, and experiment right in your browser.
            </h2>
            <p className="text-[15px] text-[#a3a3a3]">
              Isolated WebAssembly Python 3.11 environment. Zero server latency, complete local privacy.
            </p>
          </div>

          {/* Terminal Mockup Card with macOS Traffic Lights */}
          <div className="rounded-[16px] overflow-hidden border border-[#e5e5e5] shadow-lg h-[450px] bg-white">
            <React.Suspense fallback={<div className="w-full h-full flex items-center justify-center bg-[#fafafa] text-[#737373]">Loading interactive IDE...</div>}>
              <CodePlayground
                code={sandboxCode}
                onChange={setSandboxCode}
                onRun={handleRunSandbox}
                onReset={() => setSandboxCode(`print("Hello from ByteLab!")`)}
                language="python"
                executionState={sandboxState}
                stdout={sandboxStdout}
                stderr={sandboxStderr}
                executionTimeMs={sandboxTime}
                preventPaste={false}
              />
            </React.Suspense>
          </div>
        </div>
      </section>

      {/* SECTION 3: 5 Academic Units Directory */}
      <section className="w-full bg-white py-16 px-4 md:px-8 border-b border-[#e5e5e5]">
        <div className="max-w-[1140px] mx-auto space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[12px] font-semibold uppercase tracking-wider text-[#737373]">
                University Syllabus
              </span>
              <h2 className="text-[26px] sm:text-[32px] font-semibold text-[#000000] tracking-tight mt-1">
                Five Units. 60 Periods. Total Mastery.
              </h2>
            </div>
            <Link to="/courses/python-programming">
              <Button variant="secondary" size="sm">
                <span>View Full Syllabus</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {course.units.map((unit) => (
              <Link
                key={unit.id}
                to={`/courses/python-programming/unit/${unit.id}`}
                className="p-6 rounded-[12px] bg-white border border-[#e5e5e5] hover:border-black transition-all group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-bold text-[#000000] font-mono">
                      {unit.romanNumber}
                    </span>
                    <Badge variant="co">{unit.outcomes[0]}</Badge>
                  </div>
                  <h3 className="text-[17px] font-semibold text-[#000000] group-hover:underline leading-snug">
                    {unit.title}
                  </h3>
                  <p className="text-[13px] text-[#737373] leading-relaxed line-clamp-3">
                    {unit.description}
                  </p>
                </div>

                <div className="pt-5 border-t border-[#f0f0f0] mt-5 flex items-center justify-between text-[12px] text-[#737373]">
                  <span>{unit.chapters.length} Chapters • 12 Periods</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#a3a3a3] group-hover:text-black group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}

            {/* Course Outcomes Matrix Tile */}
            <div className="p-6 rounded-[12px] bg-[#fafafa] border border-[#e5e5e5] flex flex-col justify-between">
              <div className="space-y-2">
                <Badge variant="co">Outcome Matrix</Badge>
                <h3 className="text-[17px] font-semibold text-[#000000]">
                  Course Outcomes (CO1–CO5)
                </h3>
                <ul className="text-[12px] text-[#525252] space-y-1 pt-1">
                  <li><b>CO1:</b> Read & write simple programs (Understand)</li>
                  <li><b>CO2:</b> Conditionals & loops (Create)</li>
                  <li><b>CO3:</b> Lists, tuples, dictionaries (Apply)</li>
                  <li><b>CO4:</b> Files, modules, packages (Apply)</li>
                  <li><b>CO5:</b> NumPy & Data Frame (Apply)</li>
                </ul>
              </div>
              <Link to="/progress" className="pt-4">
                <Button variant="secondary" size="sm" className="w-full">
                  Track Outcome Mastery
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: 4-Step Learning Loop (Udemy + LMS Method) */}
      <section className="w-full bg-[#fafafa] py-16 px-4 md:px-8 border-b border-[#e5e5e5]">
        <div className="max-w-[1000px] mx-auto text-center space-y-12">
          <div className="space-y-2 max-w-lg mx-auto">
            <h2 className="text-[26px] sm:text-[32px] font-semibold text-[#000000] tracking-tight">
              The CodePath Learning Loop
            </h2>
            <p className="text-[15px] text-[#737373]">
              Proven pedagogy combining deep theoretical lectures with interactive execution simulations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            <div className="p-5 rounded-[12px] bg-white border border-[#e5e5e5]">
              <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center font-bold text-[13px] mb-3">
                1
              </div>
              <h3 className="text-[15px] font-semibold text-[#000000] mb-1">Deep Lectures</h3>
              <p className="text-[13px] text-[#737373] leading-relaxed">
                20-minute structured university notes with CPython architecture and reference tables.
              </p>
            </div>

            <div className="p-5 rounded-[12px] bg-white border border-[#e5e5e5]">
              <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center font-bold text-[13px] mb-3">
                2
              </div>
              <h3 className="text-[15px] font-semibold text-[#000000] mb-1">Visual Simulation</h3>
              <p className="text-[13px] text-[#737373] leading-relaxed">
                Step-by-step execution tracer inspecting local stack frames and variable memory.
              </p>
            </div>

            <div className="p-5 rounded-[12px] bg-white border border-[#e5e5e5]">
              <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center font-bold text-[13px] mb-3">
                3
              </div>
              <h3 className="text-[15px] font-semibold text-[#000000] mb-1">Active Sandbox</h3>
              <p className="text-[13px] text-[#737373] leading-relaxed">
                Type your solution in Monaco IDE with anti-paste typing enforcement.
              </p>
            </div>

            <div className="p-5 rounded-[12px] bg-white border border-[#e5e5e5]">
              <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center font-bold text-[13px] mb-3">
                4
              </div>
              <h3 className="text-[15px] font-semibold text-[#000000] mb-1">Assessment</h3>
              <p className="text-[13px] text-[#737373] leading-relaxed">
                Timed randomized question banks measuring outcome mastery and class ranking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Footer CTA */}
      <section className="w-full bg-white py-16 px-4 md:px-8">
        <div className="max-w-[700px] mx-auto text-center space-y-5">
          <h2 className="text-[28px] sm:text-[34px] font-semibold text-[#000000] tracking-tight">
            Start learning Python today.
          </h2>
          <p className="text-[15px] text-[#737373]">
            100% free and open. Run in your browser with zero installations required.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <Link to="/courses/python-programming">
              <Button variant="primary" size="lg">
                Begin Unit I: Interpreter & Types
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
