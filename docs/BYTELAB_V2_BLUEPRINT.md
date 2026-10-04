# ByteLab Core v2: Advanced Update Blueprint

> **Next-generation architecture upgrades for the zero-backend, client-side WebAssembly lab**  
> *Scope: Gemini Nano modernization, AI-powered debugging/evaluation, new zero-cost browser features, plugin architecture, and cross-tab/cross-device sync efficiency.*  
> *All items below use only free, open, standards-track or open-source browser technology — no paid third-party APIs.*  
> *Reference date: September 2026*

---

## 0. Why This Update Is Needed

The original blueprint targeted `window.ai.createTextSession()`. **That API is deprecated.** As of Chrome 138 (stable, May 2026) and Chrome 148, the built-in AI surface has been replaced and expanded into a family of standards-track global APIs, and several new browser primitives (OPFS, WebGPU, WebNN, structured-output constraints) have matured enough to materially improve ByteLab's performance, sync reliability, and AI accuracy. This document specifies the upgrade path.

---

## 1. Gemini Nano Modernization (Critical, Breaking Change)

### 1.1 API Migration
| Old (deprecated) | New (stable/origin-trial, 2026) |
| :--- | :--- |
| `window.ai.createTextSession()` | `await LanguageModel.create({...})` |
| `session.prompt()` | `session.prompt()` / `session.promptStreaming()` (unchanged shape, new namespace) |
| `window.ai.canCreateTextSession()` | `await LanguageModel.availability()` → `"unavailable" \| "downloadable" \| "downloading" \| "available"` |

Every reference to `window.ai` in `pythonRuntime.js`, the Socratic hint engine, and the grading rubric must be rewritten against the global `LanguageModel`, `Summarizer`, `Translator`, `LanguageDetector`, `Writer`, `Rewriter`, and `Proofreader` objects. Status by API (Chrome 148):

- **Stable**: `Prompt API` (`LanguageModel`), `Summarizer`, `Translator`, `Language Detector`
- **Origin trial / dev trial**: `Writer`, `Rewriter`, `Proofreader`
- **EPP / experimental**: multimodal Prompt input (image + audio)

### 1.2 Model Download Orchestration (fixes a real UX bug class)
Gemini Nano is a ~22 GB on-device download gated by strict hardware checks (≥4 GB VRAM or 16 GB RAM/4 cores, 22 GB free disk, desktop OS only — **no mobile support** for foundation-model APIs). ByteLab currently has no single place that manages this. Add a **`aiModelManager.js` singleton** that:
1. Calls `LanguageModel.availability()` once at app boot inside a `SharedWorker` (not per-tab) so 60 lab-room browser tabs don't each trigger a duplicate 22 GB download check.
2. Surfaces `monitor: (m) => m.addEventListener('downloadprogress', ...)` progress into a persistent toast, not a blocking modal.
3. Falls back automatically to a **local WebLLM / Transformers.js quantized model (e.g. Qwen2.5-0.5B or Gemma-3-270M in WebGPU int4)** when `availability()` returns `"unavailable"` — this keeps Category A/B AI features fully free and still zero-server on Chromebooks, older laptops, and non-Chrome browsers (Firefox/Safari users, ~35–40% of a typical Indian college lab). This is the single highest-leverage reliability fix for the platform.
4. Caches one shared `LanguageModel` session across the whole tab via the SharedWorker so the Socratic tutor, the grading rubric, and the plagiarism explainer don't each spin up separate 22 GB-backed sessions.

### 1.3 Structured Output for Reliable Grading (new capability, high value)
Chrome 148's Prompt API supports a `responseConstraint` (JSON Schema) parameter. This directly fixes the current "Gemini Nano free-text hint" fragility in Feature 5/6/12:

```javascript
const schema = {
  type: "object",
  properties: {
    errorCategory: { type: "string", enum: ["IndexError","TypeError","LogicError","SyntaxError","EOFError","Other"] },
    hintLevel1Concept: { type: "string" },
    hintLevel2Clue: { type: "string" },
    hintLevel3Rule: { type: "string" },
    confidence: { type: "number" }
  },
  required: ["errorCategory","hintLevel1Concept","hintLevel2Clue","hintLevel3Rule"]
};

const session = await LanguageModel.create({
  initialPrompts: [{ role: "system", content: SOCRATIC_TUTOR_SYSTEM_PROMPT }]
});
const result = await session.prompt(studentTraceContext, { responseConstraint: schema });
const hint = JSON.parse(result); // no regex-parsing of free text anymore
```
This eliminates the brittle string-parsing currently implied by the "3-tier hint ladder," makes the AST/trace-based bug evaluator deterministic to render in the UI, and lets the same schema drive both the hint ladder and the grading rubric (Feature 12).

### 1.4 Multimodal Debugging (new capability)
With multimodal Prompt API input (image/audio → text, EPP today, expected to stabilize), ByteLab can accept:
- A **photo of a hand-drawn flowchart** or lab-record diagram → AI checks it against the student's code logic.
- A **screenshot of a terminal error** pasted by a confused student → AI explains it in the Socratic ladder without the student retyping the traceback.

### 1.5 On-Device Proofreading & Rewriting for Lab Reports
Use the (origin-trial) `Proofreader` and `Rewriter` APIs to grammar-check the "Aim/Algorithm/Result" free-text sections of the Lab Record PDF (Feature 4) before export — entirely offline, zero cost, no change to the PDF pipeline.

---

## 2. AI Evaluation & Bug-Detection Engine Upgrade

Today's stack combines `sys.settrace` + a static AST analyzer + Gemini Nano prose hints. Proposed evolution into a formal **3-stage evaluation pipeline**, each stage cheap and fully client-side:

1. **Deterministic stage (no AI, instant)** — AST linter (`pythonStaticAnalyzer.js`) + `sys.settrace` catches syntax errors, undefined names, PEP 8, and structural issues in <50ms. This stays first because it's free, instant, and 100% accurate — never send something the linter already solved to the LLM.
2. **Trace-diff stage (no AI)** — Compare the student's captured execution trace against the instructor's reference-solution trace (already computed once at authoring time in Feature 11's pre-flight validation). Produces a structured diff object: `{firstDivergentLine, expectedVar, actualVar, iteration}`. This is what actually tells you *where* logic broke — much more reliable than asking an LLM to "find the bug" from scratch.
3. **Gemini Nano explanation stage (AI, only when needed)** — Feed the *structured diff*, not raw code, into `LanguageModel` with the `responseConstraint` schema from §1.3. Grounding the model in a precomputed diff (rather than free-form code reading) sharply reduces hallucinated hints and token/latency cost, and works identically whether Gemini Nano or the WebLLM fallback model answers.

This pipeline also directly improves **Feature 12 (Grading Rubric)**: correctness score comes from stage 2 (trace diff vs. reference), style score from stage 1 (AST), and only the qualitative feedback paragraph comes from stage 3 — so grades stay deterministic/auditable (important for NBA/NAAC accreditation) while feedback stays natural-language.

---

## 3. New Zero-Cost Browser Platform Features to Adopt

| Web Platform Feature | Status (2026) | ByteLab Use Case |
| :--- | :--- | :--- |
| **Origin Private File System (OPFS)** | Stable, all major browsers | Replace/augment IndexedDB for curriculum & Pyodide package cache — OPFS gives synchronous, high-throughput file access, ideal for caching the ~12 MB Pyodide wasm bundle + `.whl` packages so lab machines don't re-download each session. |
| **WebGPU** | Stable in Chrome/Edge, shipping in Firefox/Safari | (a) Accelerates the local WebLLM fallback model (§1.2). (b) Speeds up NumPy/pandas-heavy student exercises via `pyodide` + WebGPU-backed array libraries for the data-science track. |
| **WebNN (Web Neural Network API)** | Origin trial | Lower-power alternative inference backend to WebGPU for the fallback tutor model on laptops without a dGPU — better battery life during 3-hour lab sessions. |
| **SharedWorker** | Stable | Single Pyodide *and* single Gemini Nano session shared across all open tabs of one student, instead of one per tab — cuts memory and avoids redundant 22 GB model re-checks. |
| **BroadcastChannel + `structuredClone`** | Stable | Cross-tab state sync (e.g. Time-Travel Debugger open in one tab, Test Results in another) with zero server round trip, replacing ad hoc polling of localStorage. |
| **Background Sync API** | Stable (Chromium) | Faculty heartbeat pings (Feature 7) and Lab Radar telemetry queue locally when Wi-Fi drops and flush automatically to Firestore when connectivity returns — critical for unstable campus networks. |
| **`navigator.storage.estimate()` / Storage Buckets** | Stable / origin trial | Let ByteLab proactively warn students before IndexedDB/OPFS quota is exceeded, and isolate "durable" curriculum data from "best-effort" scratch data so the browser doesn't evict lesson content under storage pressure. |
| **View Transitions API** | Stable | Smooth, GPU-accelerated transitions between Lesson → Practice → Debug views without a UI framework dependency. |
| **Speculation Rules API** | Stable in Chromium | Prefetch/pre-render the next curriculum day while a student is finishing the current one, using the Cloudflare Pages edge cache — free perceived-latency win. |
| **File System Access API** | Stable (Chromium; polyfilled elsewhere) | Let students/faculty export/import a whole batch's problem sets as a local folder, useful for offline-first colleges. |
| **Web Locks API** | Stable | Prevent race conditions when multiple tabs of the same student try to write the same IndexedDB progress record simultaneously. |
| **SharedArrayBuffer + WASM SIMD/threads** | Stable (requires COOP/COEP headers — free to set on Cloudflare Pages) | Multi-threaded Pyodide execution for CPU-heavy student programs (recursion/sorting visualizations), meaningfully faster on multi-core lab PCs. |

---

## 4. Proposed New Features

### Feature 13: Local RAG Tutor (Retrieval-Augmented, Fully Offline)
- Embed the entire CS3301 curriculum once (build step) using a small open-source sentence-embedding model run through **Transformers.js in a Web Worker**.
- Store vectors in **OPFS** as a flat binary index (simple cosine-similarity brute force is fast enough for a few thousand curriculum chunks in-browser).
- When a student asks the Socratic tutor a question, retrieve the top-k relevant curriculum passages client-side and inject them into the `LanguageModel` prompt context — grounding Gemini Nano's answers in the actual syllabus instead of its general training data, with zero network calls and zero cost.

### Feature 14: Embedding-Based Plagiarism Detection (complements Feature 8)
- Alongside keystroke-cadence heuristics, compute a code embedding (via a tiny open-source code-embedding model in Transformers.js/WebGPU) for each submission.
- Compare cosine similarity against a class's other submissions and against known solution patterns, entirely client-side on the faculty dashboard — catches "typed-out-but-copied-from-AI" cases that pure keystroke timing misses, without sending any code to a third-party plagiarism service.

### Feature 15: ByteLab Plugin/Extension Framework
Formalize Feature 11 (Instructor Workbench) into a real **plugin architecture** so faculty and open-source contributors can extend ByteLab without forking it:
- **Manifest-based plugins** (`bytelab-plugin.json`: name, permissions, entry point) loaded as sandboxed **iframes with `postMessage`** or, for lighter plugins, native **Web Components** loaded via an import map.
- **Permission model**: a plugin declares which store slices it needs (`progressStore:read`, `practiceStore:read`) — never full DOM/state access — enforced by a thin message-broker in the host app.
- **Plugin categories**: new language kernels (see Feature 16), new visualizers (e.g. a sorting-algorithm race track), new export formats (e.g. SCORM for other LMSs), new grading rubrics.
- Ships as an open plugin registry (a static JSON file on the same Cloudflare Pages deployment — still $0 cost) that lists community plugins by GitHub URL.

### Feature 16: Additional Language Kernels via WASI
Extend beyond Python using the same zero-backend principle:
- **C/C++**: `clang` compiled to WASM via `wasi-sdk` + a WASI polyfill runtime (e.g. `browser_wasi_shim`), run in a Web Worker exactly like `python.worker.js`.
- **Rust**: `wasm-pack`-built playground kernel, or a WASI-compiled `rustc` subset for teaching syntax-level exercises.
- **TypeScript**: in-browser `typescript` compiler package + `QuickJS-wasm` sandbox for isolated execution (avoids running untrusted student JS in the main page context).
- All installed as plugins under Feature 15's framework, so the core app stays lean and colleges only load the languages they teach.

### Feature 17: WebGPU-Accelerated Data Structure & Algorithm Visualizer
Upgrade Feature 1 (Memory Heap Visualizer) to optionally render large data structures (e.g. a 10,000-node BST for a DSA elective) using WebGPU-driven canvas rendering instead of DOM/SVG nodes, keeping 60fps even for large structures — still $0 cost, just a rendering-backend swap.

---

## 5. Sync & Client-Efficiency Redesign

Current design has each browser tab independently: opening a Pyodide worker, independently polling storage, and independently checking Gemini Nano availability. Proposed redesign:

```
┌─────────────────────────────────────────────────────────┐
│                    SharedWorker (per-origin, one per device)         │
│  • One Pyodide instance (memory-shared across tabs via transferable  │
│    ArrayBuffers)                                                     │
│  • One LanguageModel session pool                                    │
│  • BroadcastChannel relay for cross-tab state                        │
│  • Background Sync queue for Firestore heartbeats                    │
└───────────────────────────┬───────────────────────────────────────┘
              │
   ┌──────────┴──────────┬─────────────────────┐
   │ Tab 1 (Lesson)    │ Tab 2 (Practice)    │ Tab 3 (Debugger)
   └───────────────────┴─────────────────────┴─────────────────────┘
```
- **Single source of truth**: `progressStore`/`practiceStore` writes go through the SharedWorker, which debounces IndexedDB/OPFS writes (fixes potential write-thrashing during rapid keystroke logging in Feature 8).
- **Conflict-free multi-tab editing**: reuse the existing Yjs/CRDT dependency (already in the stack for Feature 3 P2P rooms) *locally* — even single-student multi-tab editing benefits from CRDT merge instead of last-write-wins.
- **Graceful degradation**: if `SharedWorker` isn't supported (Safari has partial support historically), fall back to a single leader tab elected via the Web Locks API.

---

## 6. Updated Free-Resource Limits Matrix (2026 figures)

| Component | Resource | Current Free Limit | Note |
| :--- | :--- | :--- | :--- |
| Gemini Nano (Prompt/Summarizer/Translator/Language Detector) | Chrome built-in | Unlimited, on-device | Stable from Chrome 138; **desktop only**, 22 GB disk + >4 GB VRAM or 16 GB RAM/4-core CPU required |
| Writer / Rewriter / Proofreader | Chrome built-in | Unlimited, on-device | Origin/dev trial — feature-detect and hide gracefully if unavailable |
| WebLLM/Transformers.js fallback model | Open-source, self-hosted on Cloudflare Pages | Unlimited | Needed for non-Chrome browsers and low-spec/mobile devices |
| Pyodide | Open-source WASM | Unlimited | Current stable line is Pyodide 0.28 (Python 3.13); cache the ~12 MB core bundle in OPFS |
| Cloudflare Pages/Workers | Free tier | 100,000 requests/day | Also needs COOP/COEP response headers set (free) to unlock SharedArrayBuffer |
| Firebase Firestore | Free tier | 50k reads / 20k writes per day | Background Sync batches writes further during connectivity gaps |
| OPFS / IndexedDB | Browser storage | Tens of GB per origin (device-dependent) | Use `storage.estimate()` to warn before quota pressure |

---

## 7. Revised Roadmap

```
PHASE 1 — Foundation Fix (do first, unblocks everything else)
 • Migrate window.ai → LanguageModel/Summarizer/Translator/LanguageDetector
 • Add aiModelManager.js (availability check, SharedWorker, WebLLM fallback)
 • Adopt responseConstraint JSON-schema hints for the Socratic ladder & rubric

PHASE 2 — Evaluation Engine
 • Ship the 3-stage bug evaluator (AST → trace-diff → grounded AI explanation)
 • Wire trace-diff scores into the NBA/NAAC rubric for auditable grading

PHASE 3 — Sync & Performance
 • SharedWorker consolidation (single Pyodide + single AI session per device)
 • OPFS migration for curriculum/package cache
 • COOP/COEP headers + SharedArrayBuffer multi-threaded Pyodide
 • Background Sync for Lab Radar heartbeats

PHASE 4 — New Capabilities
 • Feature 13 Local RAG Tutor
 • Feature 14 Embedding-based plagiarism detection
 • Feature 15 Plugin framework + public plugin registry
 • Feature 16 C/C++/Rust/TypeScript kernels as plugins
 • Feature 17 WebGPU visualizer upgrade
```

---

## 8. Key Risks & Honest Limitations

- **Foundation-model APIs (Prompt/Summarizer/Writer/Rewriter/Proofreader) do not run on mobile Chrome/iOS/Android or on ChromeOS devices that aren't Chromebook Plus.** The WebLLM/Transformers.js fallback (§1.2) is not optional polish — it is required for feature parity on a meaningful fraction of a real student population.
- **Non-Chromium browsers** (Firefox, Safari) don't yet ship the built-in AI APIs — same fallback applies, and it should be the *default* detection path, not an afterthought.
- **22 GB disk footprint** for Gemini Nano is a real constraint on older lab machines with small SSDs; surface this clearly and let students opt into the lighter WebLLM path even on capable hardware if they prefer.
- **SharedArrayBuffer requires COOP/COEP headers**, which can break embedding ByteLab in an iframe (e.g. inside a college LMS) — test this integration path before rollout.
- Origin-trial APIs (Writer, Rewriter, Proofreader, multimodal Prompt input) can change shape before stabilizing — isolate them behind a thin adapter module so a Chrome update doesn't break the whole app.
