import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Scale, FileText, Lock, Cpu, BookOpen, AlertCircle, ArrowRight } from 'lucide-react';
import { useSEO } from '../../hooks/useSEO.js';

export function TermsPage() {
  useSEO({
    title: 'Terms & Conditions of Service',
    description: 'ByteLab terms of service, client-side WebAssembly code execution policies, on-device AI privacy, and educational usage guidelines.'
  });

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#17171c]">
      {/* Header Banner */}
      <section className="w-full bg-[#fafafa] border-b border-[#d9d9dd] py-12 sm:py-16 px-4 md:px-8">
        <div className="max-w-[960px] mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17171c] text-white text-[12px] font-mono uppercase tracking-widest font-semibold shadow-2xs">
            <Scale className="w-3.5 h-3.5 text-[#ff7759]" />
            <span>LEGAL & PLATFORM GOVERNANCE</span>
          </div>

          <div className="space-y-2">
            <h1 className="display-hero text-[32px] sm:text-[44px] text-[#17171c] font-semibold tracking-tight leading-[1.1]">
              Terms and Conditions of Service
            </h1>
            <p className="text-[15px] sm:text-[16px] text-[#75758a] leading-relaxed">
              Effective Date: March 7, 2026 • Version 1.4
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Article */}
      <main className="max-w-[960px] mx-auto w-full px-4 md:px-8 py-12 space-y-12 leading-relaxed text-[15px] text-[#374151]">
        {/* Summary Callout Box */}
        <div className="p-5 rounded-[16px] bg-[#fafafa] border border-[#d9d9dd] space-y-2">
          <h3 className="text-[14px] font-semibold text-[#17171c] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Summary for Learners & Educators</span>
          </h3>
          <p className="text-[13.5px] text-[#525252] leading-relaxed">
            ByteLab is an educational laboratory designed for computer science mastery. All Python code you write executes <b>locally inside your browser via WebAssembly (Pyodide 3.11)</b>. Your code is not executed on remote servers, and Chrome Gemini Nano AI hints run 100% on your device without cloud telemetry. You retain full ownership of the code you create.
          </p>
        </div>

        {/* Section 1: Acceptance */}
        <section className="space-y-3">
          <h2 className="text-[20px] sm:text-[22px] font-bold text-[#17171c] tracking-tight">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing, visiting, or utilizing the ByteLab platform (including the web application hosted at{' '}
            <code className="text-[13px] font-mono bg-[#eeece7] px-1.5 py-0.5 rounded">bytelab-lms</code>, related subdomains, and associated course materials), you agree to be bound by these Terms and Conditions of Service ("Terms"). If you do not agree to these Terms, you must immediately discontinue your use of ByteLab.
          </p>
        </section>

        {/* Section 2: Educational Scope */}
        <section className="space-y-3">
          <h2 className="text-[20px] sm:text-[22px] font-bold text-[#17171c] tracking-tight">
            2. Educational Purpose & Academic Integrity
          </h2>
          <p>
            ByteLab is engineered as an interactive computer science digital laboratory aligned with undergraduate university curricula (including course codes <b>19AI301 and CS3301</b>).
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>ByteLab is intended to facilitate authentic conceptual understanding, algorithmic fluency, and debugging competence.</li>
            <li>Users agree to engage with practice challenges and assessments with academic integrity.</li>
            <li>ByteLab’s AI diagnostics are intentionally programmed to provide Socratic scaffolding rather than direct solution code to foster genuine learning.</li>
          </ul>
        </section>

        {/* Section 3: Client-Side Sandbox Execution */}
        <section className="space-y-3">
          <h2 className="text-[20px] sm:text-[22px] font-bold text-[#17171c] tracking-tight flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#1863dc]" />
            <span>3. Client-Side WebAssembly Code Execution & Privacy</span>
          </h2>
          <p>
            ByteLab utilizes a zero-backend execution architecture powered by <b>Pyodide 3.11</b> compiled to WebAssembly (WASM):
          </p>
          <div className="p-4 rounded-[12px] bg-blue-50/60 border border-blue-200 text-blue-950 text-[13.5px] space-y-2">
            <p>
              <b>Local Browser Execution:</b> All Python code entered into the Monaco Editor compiles and executes exclusively within your browser’s isolated Web Worker thread.
            </p>
            <p>
              <b>No Server-Side Code Logging:</b> Your custom code snippets, variable values, and memory states are not transmitted to or stored on remote execution servers.
            </p>
            <p>
              <b>Sandbox Isolation:</b> The Pyodide WASM environment cannot access your local file system, private network sockets, or personal files outside the browser's virtual in-memory file tree.
            </p>
          </div>
        </section>

        {/* Section 4: Acceptable Use */}
        <section className="space-y-3">
          <h2 className="text-[20px] sm:text-[22px] font-bold text-[#17171c] tracking-tight">
            4. Acceptable Use & Resource Limits
          </h2>
          <p>When using the ByteLab Code Playground and Practice IDE, you agree not to:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>Attempt to exploit, decompile, or tamper with the client-side WebAssembly runtime or test harness.</li>
            <li>Introduce malicious code designed to freeze, crash, or deplete the physical resources of other learners' devices.</li>
            <li>Attempt to bypass client-side automated assessment timers or manipulate Course Outcome scoring mechanisms.</li>
          </ul>
          <p className="text-[14px] text-[#75758a]">
            ByteLab enforces a strict 5-second CPU execution timeout to protect your browser against runaway infinite loops (<code className="font-mono bg-[#eeece7] px-1 rounded">while True:</code>).
          </p>
        </section>

        {/* Section 5: On-Device AI */}
        <section className="space-y-3">
          <h2 className="text-[20px] sm:text-[22px] font-bold text-[#17171c] tracking-tight flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#ff7759]" />
            <span>5. On-Device AI Diagnostics (Chrome Gemini Nano)</span>
          </h2>
          <p>
            ByteLab includes optional AI-powered Socratic debugging features utilizing Google Chrome's built-in <b>Gemini Nano</b> foundation model via <code className="font-mono text-[13px] bg-[#eeece7] px-1.5 py-0.5 rounded">window.ai</code>:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>AI inference takes place entirely on your device’s local hardware (NPU/GPU/CPU).</li>
            <li>Code analyzed by Gemini Nano is not used for model retraining, telemetric surveillance, or cloud indexing.</li>
            <li>If your browser does not support on-device AI, ByteLab automatically defaults to deterministic local rule-based heuristics.</li>
          </ul>
        </section>

        {/* Section 6: Accounts & Data */}
        <section className="space-y-3">
          <h2 className="text-[20px] sm:text-[22px] font-bold text-[#17171c] tracking-tight">
            6. User Accounts & Progress Synchronization
          </h2>
          <p>
            You may use ByteLab anonymously in Guest Mode or authenticate using Google Firebase Authentication.
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li><b>Cloud Sync:</b> When authenticated, your chapter completion records, streak counts, XP points, and test results sync with Google Firebase.</li>
            <li><b>Local Storage:</b> Unauthenticated learners have progress saved to browser <code className="font-mono bg-[#eeece7] px-1 rounded">localStorage</code> and cookies.</li>
            <li><b>Data Control:</b> You may reset your local progress, clear cookies, or sign out at any time from your Profile Settings.</li>
          </ul>
        </section>

        {/* Section 7: Intellectual Property */}
        <section className="space-y-3">
          <h2 className="text-[20px] sm:text-[22px] font-bold text-[#17171c] tracking-tight">
            7. Intellectual Property & Course Materials
          </h2>
          <p>
            All course syllabus structures, lecture markdown documents, problem sets, graphic diagrams, and interface elements are the proprietary intellectual property of ByteLab Core and its author (<b>Abhijith S</b>).
          </p>
          <p>
            You are granted a personal, non-exclusive, non-transferable license to view and interact with course materials for personal educational purposes. You may not scrape, reproduce, redistribute, or sell ByteLab courseware for commercial gain without prior written consent.
          </p>
          <p className="font-medium text-[#17171c]">
            <b>Your Code Ownership:</b> Any original Python source code authored by you within the editor remains your sole property.
          </p>
        </section>

        {/* Section 8: Disclaimer */}
        <section className="space-y-3">
          <h2 className="text-[20px] sm:text-[22px] font-bold text-[#17171c] tracking-tight">
            8. Disclaimer of Warranties & Limitation of Liability
          </h2>
          <p>
            ByteLab is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, whether express or implied. While we strive for rigorous pedagogical and diagnostic accuracy:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>We do not guarantee that all automated feedback or AI Socratic clues will be completely free of semantic errors.</li>
            <li>ByteLab is not liable for academic grades, exam performance, or data loss resulting from cleared browser cache or hardware failure.</li>
          </ul>
        </section>

        {/* Section 9: Contact */}
        <section className="space-y-3 pt-4 border-t border-[#e5e5e5]">
          <h2 className="text-[20px] sm:text-[22px] font-bold text-[#17171c] tracking-tight">
            9. Contact & Inquiries
          </h2>
          <p>
            For questions regarding these Terms, educational partnerships, or university LMS integrations, please visit the developer profile or contact:
          </p>
          <div className="p-4 rounded-[12px] bg-[#fafafa] border border-[#d9d9dd] space-y-1 text-[13.5px]">
            <div className="font-semibold text-[#17171c]">ByteLab Systems Architecture & Core Engineering</div>
            <div>Author & Lead Engineer: Abhijith S</div>
            <div>
              Portfolio:{' '}
              <a
                href="https://abhijith-dev-io.web.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ff7759] hover:underline font-medium"
              >
                abhijith-dev-io.web.app
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Navigation Strip */}
      <footer className="w-full bg-[#fafafa] py-10 px-4 md:px-8 border-t border-[#d9d9dd] mt-auto">
        <div className="max-w-[960px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[#75758a]">
          <div className="flex items-center gap-4">
            <Link to="/docs" className="hover:text-[#17171c] transition-colors">Documentation</Link>
            <span>•</span>
            <Link to="/updates" className="hover:text-[#17171c] transition-colors">Changelog</Link>
            <span>•</span>
            <Link to="/courses/python-programming" className="hover:text-[#17171c] transition-colors">Syllabus</Link>
          </div>
          <div>© {new Date().getFullYear()} ByteLab Core. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
