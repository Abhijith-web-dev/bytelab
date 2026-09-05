import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, ArrowRight, CheckCircle2, ShieldCheck, Award, Flame, BookOpen, 
  Terminal, Sparkles, Layers, Cpu, Code2, Globe, Database, Compass, Check
} from 'lucide-react';
import { Button } from '../../components/ui/Button.jsx';
import { Badge } from '../../components/ui/Badge.jsx';
import { useAuthStore } from '../../stores/authStore.js';
import { useProgressStore } from '../../stores/progressStore.js';
import { getCourse, getLanguages } from '../../content/loader/index.js';
import { pythonRuntime } from '../../runtimes/python/pythonRuntime.js';
import { useSEO } from '../../hooks/useSEO.js';

const CodePlayground = React.lazy(() => import('../../components/editor/CodePlayground.jsx').then(m => ({ default: m.CodePlayground })));

export function HomePage() {
  useSEO({
    title: 'ByteLab Core | Autonomous Computer Science & Multi-Language Lab',
    description: 'Master computer science and systems programming from first principles. In-browser WebAssembly execution, structured academic notes, and memory modeling across Python, C/C++, TypeScript, and Rust.'
  });

  const { isAuthenticated, user } = useAuthStore();
  const { completedChapters, totalPoints, streakDays } = useProgressStore();
  const course = getCourse('python-programming');

  // Multi-Language Interactive Console State
  const [activeLangTab, setActiveLangTab] = useState('python');

  // Python interactive code
  const [sandboxCode, setSandboxCode] = useState(
`# Welcome to ByteLab — Multi-Language Systems Lab
# 19AI301 / CS3301 Python Programming Engine

def quick_analyze(numbers):
    total = sum(numbers)
    avg = total / len(numbers) if numbers else 0
    squares = [x ** 2 for x in numbers]
    return {
        "count": len(numbers),
        "sum": total,
        "average": round(avg, 2),
        "squares": squares[:5]
    }

data = [12, 45, 67, 89, 23, 56, 78, 90]
results = quick_analyze(data)

print("✦ ByteLab Python 3.11 Runtime Verified")
for key, val in results.items():
    print(f"  • {key.capitalize()}: {val}")
`
  );
  const [sandboxState, setSandboxState] = useState('IDLE');
  const [sandboxStdout, setSandboxStdout] = useState('');
  const [sandboxStderr, setSandboxStderr] = useState('');
  const [sandboxTime, setSandboxTime] = useState(0);

  // Multi-language code snippets
  const languageSnippets = {
    python: {
      title: 'Python 3.11 (Pyodide WASM)',
      tagline: 'Active interactive runtime in WebAssembly worker',
      isLive: true
    },
    cpp: {
      title: 'C++20 Systems & Data Structures',
      tagline: 'Zero-overhead abstractions & memory control',
      isLive: false,
      code: `// ByteLab C++20 Systems Architecture
#include <iostream>
#include <vector>
#include <algorithm>
#include <memory>

template <typename T>
class ByteVector {
    std::vector<T> data_;
public:
    void push(T val) { data_.push_back(std::move(val)); }
    size_t size() const noexcept { return data_.size(); }
    void display() const {
        for (const auto& item : data_) {
            std::cout << item << " ";
        }
        std::cout << "\\n";
    }
};

int main() {
    auto vec = std::make_unique<ByteVector<int>>();
    vec->push(10);
    vec->push(20);
    vec->push(30);
    std::cout << "ByteLab C++20 Vector Size: " << vec->size() << "\\n";
    return 0;
}`,
      output: `✦ ByteLab C++20 Clang/WASM Target
ByteLab C++20 Vector Size: 3
Memory footprint: 48 bytes (Stack frame isolated)`
    },
    typescript: {
      title: 'TypeScript 5.x Web Runtime',
      tagline: 'Type-safe systems, async concurrency & APIs',
      isLive: false,
      code: `// ByteLab TypeScript 5.x Systems Model
interface NodeMetrics {
  readonly id: string;
  latencyMs: number;
  status: 'active' | 'degraded' | 'offline';
}

class TelemetryCollector<T extends NodeMetrics> {
  private nodes: Map<string, T> = new Map();

  register(node: T): void {
    this.nodes.set(node.id, node);
  }

  averageLatency(): number {
    const latencies = Array.from(this.nodes.values()).map(n => n.latencyMs);
    return latencies.reduce((a, b) => a + b, 0) / latencies.length;
  }
}

const cluster = new TelemetryCollector();
cluster.register({ id: 'edge-01', latencyMs: 14.2, status: 'active' });
cluster.register({ id: 'edge-02', latencyMs: 18.5, status: 'active' });
console.log("Cluster Mean Latency:", cluster.averageLatency(), "ms");`,
      output: `✦ ByteLab TypeScript 5.4 V8 Runtime
Cluster Mean Latency: 16.35 ms
Type safety: Strict mode (0 diagnostics)`
    },
    rust: {
      title: 'Rust 1.75+ Concurrency & Memory Safety',
      tagline: 'Guaranteed memory safety with zero garbage collection',
      isLive: false,
      code: `// ByteLab Rust Systems Architecture
use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let vals = vec![
            String::from("packet_01"),
            String::from("packet_02"),
            String::from("packet_03"),
        ];
        for val in vals {
            tx.send(val).unwrap();
            thread::sleep(Duration::from_millis(50));
        }
    });

    for received in rx {
        println!("Received in worker: {}", received);
    }
}`,
      output: `✦ ByteLab Rust 1.75 WASM Runtime
Received in worker: packet_01
Received in worker: packet_02
Received in worker: packet_03
Borrow checker verified: 0 data races`
    }
  };

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
    <div className="flex flex-col w-full bg-white text-[#212121]">
      {/* SECTION 1: Monumental Display Hero (DESIGN.md) */}
      <section className="w-full bg-white pt-16 sm:pt-24 pb-16 sm:pb-20 border-b border-[#e5e5e5] px-4 md:px-8">
        <div className="max-w-[920px] mx-auto text-center space-y-6">
          {/* Status Chip / Category Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fafafa] border border-[#e5e5e5] text-[12px] text-[#525252]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="mono-label tracking-widest text-[#212121]">MULTI-LANGUAGE ENGINEERING LAB</span>
          </div>

          {/* Monumental Display Headline */}
          <h1 className="text-[38px] sm:text-[56px] lg:text-[68px] font-semibold tracking-[-0.035em] leading-[1.05] text-[#000000]">
            Master computer science & systems from first principles.
          </h1>

          {/* Subtitle / Lead Paragraph */}
          <p className="text-[17px] sm:text-[20px] text-[#737373] max-w-2xl mx-auto leading-relaxed">
            An autonomous tutorial and execution platform. Read structured university lectures, inspect visual memory models, and run verified code in isolated browser sandboxes.
          </p>

          {/* Pill CTAs (DESIGN.md button-primary & button-secondary) */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3.5">
            <Link to="/courses/python-programming">
              <Button variant="primary" size="lg">
                <span>Start Python Track (19AI301)</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/courses">
              <Button variant="secondary" size="lg">
                <span>Explore All Curricula</span>
              </Button>
            </Link>
          </div>

          {/* Guarantee / Metrics Strip */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-[13px] text-[#737373]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>5 Academic Units • 30+ Chapters</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#000000]" />
              <span>Client-Side Pyodide WASM</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-600" />
              <span>CO1–CO5 Outcome Analytics</span>
            </div>
          </div>
        </div>

        {/* DESIGN.md Trust-Logo Strip / Supported Technologies */}
        <div className="max-w-[1100px] mx-auto pt-16 sm:pt-20 border-t border-[#f0f0f0] mt-16 sm:mt-20">
          <div className="text-center text-[11px] font-mono tracking-[0.2em] text-[#93939f] uppercase mb-6">
            Supported & Architecture-Ready Languages
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-[14px] font-mono font-medium text-[#737373]">
            <span className="flex items-center gap-1.5 text-black font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              PYTHON 3.11
            </span>
            <span className="hover:text-black transition-colors">C++20</span>
            <span className="hover:text-black transition-colors">C17 SYSTEMS</span>
            <span className="hover:text-black transition-colors">TYPESCRIPT 5</span>
            <span className="hover:text-black transition-colors">RUST 1.75</span>
            <span className="hover:text-black transition-colors">SQL RELATIONAL</span>
            <span className="hover:text-black transition-colors">WASM CORE</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: Multi-Language Interactive Console (DESIGN.md agent-console-card) */}
      <section className="w-full bg-[#17171c] text-white py-16 sm:py-20 px-4 md:px-8 border-b border-black select-none">
        <div className="max-w-[1100px] mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#ff7759] font-semibold">
                EXECUTION RUNTIME
              </span>
              <h2 className="text-[26px] sm:text-[34px] font-semibold text-white tracking-tight mt-1">
                Type, compile, and experiment in isolated sandboxes.
              </h2>
            </div>
            <div className="text-[13px] text-[#93939f] max-w-xs">
              Zero backend queues. Pyodide WebAssembly executes directly on your hardware with 100% privacy.
            </div>
          </div>

          {/* Language Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <button
              onClick={() => setActiveLangTab('python')}
              className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all cursor-pointer flex items-center gap-2 ${
                activeLangTab === 'python'
                  ? 'bg-white text-black font-semibold shadow-xs'
                  : 'bg-white/10 text-[#a3a3a3] hover:text-white hover:bg-white/15'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Python 3.11 (Active WASM)</span>
            </button>
            <button
              onClick={() => setActiveLangTab('cpp')}
              className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all cursor-pointer flex items-center gap-2 ${
                activeLangTab === 'cpp'
                  ? 'bg-white text-black font-semibold shadow-xs'
                  : 'bg-white/10 text-[#a3a3a3] hover:text-white hover:bg-white/15'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span>C++20 Systems</span>
            </button>
            <button
              onClick={() => setActiveLangTab('typescript')}
              className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all cursor-pointer flex items-center gap-2 ${
                activeLangTab === 'typescript'
                  ? 'bg-white text-black font-semibold shadow-xs'
                  : 'bg-white/10 text-[#a3a3a3] hover:text-white hover:bg-white/15'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>TypeScript Web</span>
            </button>
            <button
              onClick={() => setActiveLangTab('rust')}
              className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all cursor-pointer flex items-center gap-2 ${
                activeLangTab === 'rust'
                  ? 'bg-white text-black font-semibold shadow-xs'
                  : 'bg-white/10 text-[#a3a3a3] hover:text-white hover:bg-white/15'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span>Rust Concurrency</span>
            </button>
          </div>

          {/* Console Mockup Container */}
          <div className="rounded-[16px] overflow-hidden border border-[#383842] shadow-2xl bg-[#09090b]">
            {activeLangTab === 'python' ? (
              <div className="h-[460px] bg-white text-black">
                <React.Suspense fallback={<div className="w-full h-full flex items-center justify-center bg-[#fafafa] text-[#737373]">Loading Pyodide Sandbox...</div>}>
                  <CodePlayground
                    code={sandboxCode}
                    onChange={setSandboxCode}
                    onRun={handleRunSandbox}
                    onReset={() => setSandboxCode(`print("Hello from ByteLab Multi-Language Lab!")`)}
                    language="python"
                    executionState={sandboxState}
                    stdout={sandboxStdout}
                    stderr={sandboxStderr}
                    executionTimeMs={sandboxTime}
                    preventPaste={false}
                  />
                </React.Suspense>
              </div>
            ) : (
              <div className="p-6 font-mono text-[13px] flex flex-col md:flex-row gap-6 h-[460px] overflow-hidden">
                {/* Static Preview Code Column */}
                <div className="flex-1 flex flex-col justify-between overflow-hidden">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[12px] text-[#93939f]">
                    <span>{languageSnippets[activeLangTab].title}</span>
                    <span className="px-2 py-0.5 rounded bg-white/10 text-white text-[10px]">Track Preview</span>
                  </div>
                  <pre className="flex-1 overflow-y-auto py-3 text-[#d4d4d4] leading-relaxed select-text">
                    <code>{languageSnippets[activeLangTab].code}</code>
                  </pre>
                  <div className="pt-2 text-[11px] text-[#75758a]">
                    {languageSnippets[activeLangTab].tagline}
                  </div>
                </div>

                {/* Compilation Output Column */}
                <div className="w-full md:w-[320px] bg-[#17171c] p-4 rounded-[8px] border border-white/10 flex flex-col justify-between shrink-0">
                  <div className="space-y-3">
                    <div className="text-[11px] uppercase tracking-wider text-[#a3a3a3] border-b border-white/10 pb-2">
                      Simulated Environment Output
                    </div>
                    <pre className="text-emerald-400 text-[12px] whitespace-pre-wrap leading-relaxed">
                      {languageSnippets[activeLangTab].output}
                    </pre>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <Link to="/courses">
                      <Button variant="pill-on-dark" size="sm" className="w-full">
                        <span>View Language Roadmap</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 3: Capability Grid (DESIGN.md capability-card) */}
      <section className="w-full bg-white py-16 sm:py-20 px-4 md:px-8 border-b border-[#e5e5e5]">
        <div className="max-w-[1200px] mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="mono-label text-[#737373]">THE PEDAGOGICAL ENGINE</span>
            <h2 className="text-[28px] sm:text-[38px] font-semibold text-[#000000] tracking-tight leading-tight">
              Designed for cognitive retention and systems understanding.
            </h2>
            <p className="text-[15px] text-[#737373] leading-relaxed">
              We eliminated the fluff of generic tutorial sites. Every concept is coupled with structural notes, visual stack models, and immediate compiler feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="p-6 rounded-[16px] bg-[#fafafa] border border-[#e5e5e5] hover:border-black transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-[10px] bg-black text-white flex items-center justify-center shadow-xs">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-[18px] font-semibold text-[#000000] tracking-tight">
                  Academic Rigor
                </h3>
                <p className="text-[13px] text-[#737373] leading-relaxed">
                  Strict university-level syllabi structured into 46 structured learning days. Every topic includes concrete memory complexity tables.
                </p>
              </div>
              <Link to="/courses/python-programming" className="text-[13px] font-medium text-black hover:underline flex items-center gap-1">
                <span>View syllabus</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-[16px] bg-[#fafafa] border border-[#e5e5e5] hover:border-black transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-[10px] bg-black text-white flex items-center justify-center shadow-xs">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-[18px] font-semibold text-[#000000] tracking-tight">
                  Zero-Backend WASM
                </h3>
                <p className="text-[13px] text-[#737373] leading-relaxed">
                  Pyodide runs in a Web Worker inside your browser. No server downtime, zero queue latency, and complete security for educational institutions.
                </p>
              </div>
              <Link to="/practice" className="text-[13px] font-medium text-black hover:underline flex items-center gap-1">
                <span>Open playground</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-[16px] bg-[#fafafa] border border-[#e5e5e5] hover:border-black transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-[10px] bg-black text-white flex items-center justify-center shadow-xs">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-[18px] font-semibold text-[#000000] tracking-tight">
                  Visual Memory Tracer
                </h3>
                <p className="text-[13px] text-[#737373] leading-relaxed">
                  Observe variables mutate on the stack and heap in real time. Deconstruct recursion, pointer aliasing, and loop states step by step.
                </p>
              </div>
              <Link to="/courses/python-programming/chapter/day-19" className="text-[13px] font-medium text-black hover:underline flex items-center gap-1">
                <span>Inspect recursion</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-[16px] bg-[#fafafa] border border-[#e5e5e5] hover:border-black transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-[10px] bg-black text-white flex items-center justify-center shadow-xs">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-[18px] font-semibold text-[#000000] tracking-tight">
                  Outcome Analytics
                </h3>
                <p className="text-[13px] text-[#737373] leading-relaxed">
                  Real-time mapping to Course Outcomes (CO1–CO5) and Bloom's Taxonomy levels so students and professors track genuine mastery.
                </p>
              </div>
              <Link to="/progress" className="text-[13px] font-medium text-black hover:underline flex items-center gap-1">
                <span>Track outcomes</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Dark Feature Band (DESIGN.md dark-feature-band in Deep Enterprise Green) */}
      <section className="w-full bg-[#003c33] text-white py-20 px-4 md:px-8 border-b border-[#002620] select-none">
        <div className="max-w-[1100px] mx-auto space-y-12">
          <div className="max-w-2xl space-y-4">
            <span className="text-[11px] font-mono tracking-widest uppercase text-emerald-300 font-semibold">
              THE ACTIVE LEARNING ADVANTAGE
            </span>
            <h2 className="text-[30px] sm:text-[42px] font-semibold text-white tracking-tight leading-tight">
              Watching tutorials builds passive illusion. Writing and breaking code builds intuition.
            </h2>
            <p className="text-[16px] text-emerald-100/80 leading-relaxed">
              Research consistently shows that syntax familiarity decays within 48 hours unless applied. ByteLab forces you to think, trace execution, and solve problems with rigorous test suites.
            </p>
          </div>

          {/* Comparison Matrix Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Traditional Platform */}
            <div className="p-7 rounded-[16px] bg-black/20 border border-white/10 space-y-4">
              <div className="text-[12px] font-mono uppercase text-[#ffad9b] font-semibold">
                Generic Video Course
              </div>
              <h3 className="text-[20px] font-semibold text-white">Passive Video Stream</h3>
              <ul className="space-y-3 text-[14px] text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Hours spent watching someone else type without typing yourself.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Copy-pasted code solutions that bypass the cognitive struggle.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>No visibility into stack frames, heap allocation, or pointer references.</span>
                </li>
              </ul>
            </div>

            {/* ByteLab Platform */}
            <div className="p-7 rounded-[16px] bg-white/10 border border-emerald-400/30 space-y-4">
              <div className="text-[12px] font-mono uppercase text-emerald-300 font-semibold">
                ByteLab Engineering Platform
              </div>
              <h3 className="text-[20px] font-semibold text-white">Active Laboratory Sandboxes</h3>
              <ul className="space-y-3 text-[14px] text-white/90">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Immediate code execution after every conceptual principle.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Interactive memory models demonstrating variable lifetimes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Automated test suites with hidden edge test cases to verify true mastery.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Active Syllabus Units & Multi-Language Tracks */}
      <section className="w-full bg-white py-16 sm:py-20 px-4 md:px-8 border-b border-[#e5e5e5]">
        <div className="max-w-[1200px] mx-auto space-y-12">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="mono-label text-[#737373]">
                19AI301 / CS3301 CURRICULUM
              </span>
              <h2 className="text-[26px] sm:text-[34px] font-semibold text-[#000000] tracking-tight mt-1">
                Five Units. 46 Days. Total Mastery.
              </h2>
            </div>
            <Link to="/courses/python-programming">
              <Button variant="secondary" size="sm">
                <span>View Full Syllabus</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          {/* 5 Units Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {course.units.map((unit) => (
              <Link
                key={unit.id}
                to={`/courses/python-programming/unit/${unit.id}`}
                className="p-6 rounded-[14px] bg-white border border-[#e5e5e5] hover:border-black transition-all group flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-bold text-[#000000] font-mono bg-[#fafafa] border border-[#e5e5e5] px-2 py-0.5 rounded">
                      {unit.romanNumber}
                    </span>
                    <Badge variant="co">{unit.outcomes[0]}</Badge>
                  </div>
                  <h3 className="text-[18px] font-semibold text-[#000000] group-hover:underline leading-snug">
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
            <div className="p-6 rounded-[14px] bg-[#fafafa] border border-[#e5e5e5] flex flex-col justify-between">
              <div className="space-y-3">
                <Badge variant="co">Outcome Matrix</Badge>
                <h3 className="text-[18px] font-semibold text-[#000000]">
                  Course Outcomes (CO1–CO5)
                </h3>
                <ul className="text-[12px] text-[#525252] space-y-1.5 pt-1">
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

          {/* Multi-Language Tracks Roadmap */}
          <div className="pt-10 border-t border-[#f0f0f0] space-y-6">
            <div className="space-y-1">
              <span className="mono-label text-[#ff7759]">EXPANDING HORIZONS</span>
              <h3 className="text-[22px] font-semibold text-[#000000]">
                Upcoming Multi-Language Curricula Tracks
              </h3>
              <p className="text-[14px] text-[#737373]">
                ByteLab's modular course engine allows students to apply algorithmic thinking across different language paradigms.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-[12px] bg-[#fafafa] border border-[#e5e5e5] space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#737373]">
                  <span>CS3401</span>
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold">Planned</span>
                </div>
                <h4 className="font-semibold text-[15px] text-black">Data Structures in C++</h4>
                <p className="text-[12px] text-[#737373]">Pointers, memory management, trees, graphs, and Big-O efficiency.</p>
              </div>

              <div className="p-5 rounded-[12px] bg-[#fafafa] border border-[#e5e5e5] space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#737373]">
                  <span>CS2201</span>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold">Planned</span>
                </div>
                <h4 className="font-semibold text-[15px] text-black">TypeScript & Web Runtime</h4>
                <p className="text-[12px] text-[#737373]">Event loops, asynchronous I/O, type systems, and client-server architectures.</p>
              </div>

              <div className="p-5 rounded-[12px] bg-[#fafafa] border border-[#e5e5e5] space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#737373]">
                  <span>CS4201</span>
                  <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-semibold">Planned</span>
                </div>
                <h4 className="font-semibold text-[15px] text-black">Systems in Rust</h4>
                <p className="text-[12px] text-[#737373]">Ownership, lifetimes, concurrency without data races, and low-level I/O.</p>
              </div>

              <div className="p-5 rounded-[12px] bg-[#fafafa] border border-[#e5e5e5] space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#737373]">
                  <span>CS3501</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">Planned</span>
                </div>
                <h4 className="font-semibold text-[15px] text-black">DBMS & Relational SQL</h4>
                <p className="text-[12px] text-[#737373]">Relational algebra, schema normalization, ACID transactions, and indexing.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: 4-Step Learning Loop */}
      <section className="w-full bg-[#fafafa] py-16 px-4 md:px-8 border-b border-[#e5e5e5]">
        <div className="max-w-[1000px] mx-auto text-center space-y-12">
          <div className="space-y-2 max-w-lg mx-auto">
            <span className="mono-label text-[#737373]">THE PEDAGOGICAL CYCLE</span>
            <h2 className="text-[26px] sm:text-[32px] font-semibold text-[#000000] tracking-tight">
              The ByteLab Learning Cycle
            </h2>
            <p className="text-[15px] text-[#737373]">
              Proven methodology combining foundational university theory with instant compiler execution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            <div className="p-5 rounded-[12px] bg-white border border-[#e5e5e5]">
              <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center font-bold text-[13px] mb-3">
                1
              </div>
              <h3 className="text-[15px] font-semibold text-[#000000] mb-1">Deep Notes</h3>
              <p className="text-[13px] text-[#737373] leading-relaxed">
                Structured university lecture notes with formal syntax references and CPython internals.
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
              <h3 className="text-[15px] font-semibold text-[#000000] mb-1">Interactive Sandbox</h3>
              <p className="text-[13px] text-[#737373] leading-relaxed">
                In-browser WebAssembly editor with real-time compiler feedback and strict test assertions.
              </p>
            </div>

            <div className="p-5 rounded-[12px] bg-white border border-[#e5e5e5]">
              <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center font-bold text-[13px] mb-3">
                4
              </div>
              <h3 className="text-[15px] font-semibold text-[#000000] mb-1">Outcome Mastery</h3>
              <p className="text-[13px] text-[#737373] leading-relaxed">
                Timed diagnostic assessments mapped directly to Bloom's taxonomy and university benchmarks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: Warm Soft Stone Bottom CTA Band (DESIGN.md soft-stone surface) */}
      <section className="w-full bg-soft-stone py-16 px-4 md:px-8">
        <div className="max-w-[800px] mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#d9d9dd] text-[12px] text-[#212121]">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span className="font-medium">Free, open, and client-side</span>
          </div>

          <h2 className="text-[32px] sm:text-[44px] font-semibold text-[#000000] tracking-tight leading-tight">
            Ready to master computer science?
          </h2>

          <p className="text-[16px] sm:text-[18px] text-[#525252] max-w-xl mx-auto leading-relaxed">
            Join students and developers who are building true computational thinking with ByteLab's hands-on sandboxes.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link to="/courses/python-programming">
              <Button variant="primary" size="lg">
                <span>Start Learning Now</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/practice">
              <Button variant="secondary" size="lg">
                <span>Try the Playground</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
