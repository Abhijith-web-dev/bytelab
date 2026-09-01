# TECH STACK — CodePath LMS

> **Project:** CodePath LMS  
> **Primary Course:** 19AI301 / CS3301 — Python Programming  
> **Architecture:** React SPA + Firebase BaaS + Browser-side code execution  
> **Backend:** No custom backend/server  
> **Content Management:** Version-controlled Markdown/JSON/JavaScript content files  
> **Primary Goal:** W3Schools-style tutorial LMS that can expand to multiple programming languages and academic subjects.

---

## 1. Technology Philosophy

The project should remain a **frontend-first, serverless LMS**.

```text
Browser
  │
  ├── React UI
  ├── Tailwind CSS
  ├── Tutorial Content
  ├── Code Editor
  ├── Browser Sandbox
  ├── Local Storage
  └── Firebase SDK
          │
          ├── Authentication
          ├── Firestore
          └── App Check
```

There is **no Express server, Node API server, Python backend, REST API, or custom application server** in the initial architecture.

Firebase is used as the managed backend/BaaS layer only for authentication and persistent data.

---

# 2. Core Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| UI | React.js | Component-based application |
| Language | JavaScript | Primary application language |
| Build Tool | Vite | Development server and production bundling |
| Styling | Tailwind CSS | Utility-first responsive UI |
| Routing | React Router | SPA route management |
| State | Zustand | Lightweight global application state |
| Backend/BaaS | Firebase | Authentication + Firestore + App Check |
| Database | Cloud Firestore | Student progress, tests, leaderboard |
| Authentication | Firebase Authentication | Student accounts |
| Local State | localStorage | Drafts, local progress, preferences |
| Large Local Cache | IndexedDB / `idb` | Optional larger offline/cache data |
| Code Editor | Monaco Editor | IDE-like coding experience |
| Python Runtime | Pyodide | Browser-side Python execution |
| Isolation | Web Workers | Keep code execution away from UI thread |
| Content | Markdown + JSON | Tutorial and structured course content |
| Markdown Renderer | react-markdown | Render lesson content |
| Markdown Extensions | remark-gfm | Tables, task lists and GFM syntax |
| Search | Fuse.js | Client-side fuzzy search |
| Icons | Lucide React | UI icon system |
| Validation | Zod | Runtime validation for content/config data |
| Testing | Vitest | Unit/integration testing |
| E2E | Playwright | Browser end-to-end testing |
| Linting | ESLint | Code quality |
| Formatting | Prettier | Consistent formatting |
| Git Hooks | Husky + lint-staged | Pre-commit validation |
| Deployment | Firebase Hosting / static hosting | Frontend deployment |

React 19 is stable and the current React documentation lists React 19.2 as the latest major/minor release line. citeturn0search8turn0search10

Tailwind CSS currently uses a zero-runtime utility-generation model and provides Vite-oriented setup guidance. citeturn0search1turn0search9

---

# 3. Frontend

## 3.1 React.js

### Required

```bash
npm install react react-dom
```

React should be responsible for:

- Page rendering
- Component architecture
- Interactive lessons
- Coding playground
- Test UI
- Dashboard
- Leaderboard
- Authentication screens
- Progress UI
- Admin/developer tools where required

Recommended React architecture:

```text
App
├── Layout
├── Header
├── Sidebar
├── CourseLayout
├── LessonLayout
├── PracticeLayout
├── TestLayout
└── DashboardLayout
```

Do not put business logic directly into large page components.

---

# 4. Build Tool

## Vite

Use Vite as the build/development tool.

```bash
npm create vite@latest
```

Recommended configuration:

```text
React
JavaScript
Vite
```

Responsibilities:

- Local development server
- HMR
- Production build
- Asset bundling
- Environment variable handling
- Code splitting
- Worker bundling

Do not introduce Next.js or another full-stack framework because the initial product is intentionally a client-side SPA.

---

# 5. Styling

## Tailwind CSS

Use Tailwind CSS for the primary UI system.

```bash
npm install tailwindcss
```

Use Tailwind for:

- Layout
- Responsive design
- Spacing
- Typography
- Cards
- Buttons
- Navigation
- Progress bars
- Badges
- Test states
- Editor containers
- Dashboard components

Avoid creating large numbers of one-off CSS files.

Use custom CSS only for:

- Editor-specific styling
- Markdown typography
- Code output
- Complex animations
- Browser-specific behavior

---

# 6. Routing

## React Router

```bash
npm install react-router
```

Use route-based architecture.

Example:

```text
/
├── /courses
├── /courses/:courseId
├── /courses/:courseId/unit/:unitId
├── /courses/:courseId/chapter/:chapterId
├── /courses/:courseId/chapter/:chapterId/lesson/:lessonId
├── /practice
├── /tests
├── /progress
├── /leaderboard
├── /profile
├── /login
└── /register
```

React Router supports SPA usage, so a separate application server is not required for routing. citeturn0search2turn0search14

---

# 7. State Management

## Zustand

Recommended for application-level client state.

```bash
npm install zustand
```

Create separate stores:

```text
authStore
courseStore
progressStore
practiceStore
testStore
editorStore
uiStore
syncStore
```

Example:

```text
useAuthStore()
useProgressStore()
usePracticeStore()
useTestStore()
```

Do not put everything into one global store.

---

# 8. Firebase

Firebase is the only cloud service required by the initial architecture.

```bash
npm install firebase
```

Use the modular Firebase Web SDK.

## Firebase Services

### Firebase Authentication

Use for:

- Register
- Login
- Logout
- Google sign-in
- Session persistence
- User identity

Firebase's web SDK supports email/password and federated providers through Firebase Authentication. citeturn0search7

### Cloud Firestore

Use for:

```text
users
courseProgress
chapterProgress
problemProgress
testAttempts
leaderboard
achievements
learningEvents
```

Firestore provides realtime synchronization and web offline persistence. citeturn1search7turn1search0

### Firebase App Check

Use to reduce abuse of Firebase resources from unauthorized clients.

```text
Firebase App Check
      ↓
Firebase services
```

App Check should be considered an abuse-resistance layer, not a replacement for server-side validation. citeturn1search1

---

# 9. Important "No Backend" Boundary

The project deliberately does **not** use:

```text
Express
Node.js API
Python Flask
Python FastAPI
Django
Spring Boot
Custom REST API
Custom GraphQL API
```

The browser communicates directly with:

```text
Firebase Authentication
Cloud Firestore
Firebase App Check
```

This keeps the initial system simple and inexpensive to deploy.

## Important limitation

Without a trusted custom backend or Cloud Functions, the browser is not a fully trusted environment.

Therefore:

```text
Client-side score
      ≠
Cryptographically trusted score
```

Firestore Security Rules can restrict writes and enforce basic invariants, but they should not be treated as a complete replacement for server-side assessment validation.

For the initial product:

- Use hidden test cases only where they can be safely bundled/obfuscated enough for the learning use case.
- Use randomized question pools.
- Rate-limit submissions through application logic and Firestore rules where practical.
- Use App Check.
- Detect suspicious behavior.
- Keep leaderboard rewards conservative.
- Treat the leaderboard as gamification rather than a high-stakes examination system.

If high-stakes exam integrity is introduced later, add a trusted execution/validation service.

---

# 10. Code Editor

## Monaco Editor

Recommended primary coding editor.

Install:

```bash
npm install @monaco-editor/react
```

Use it for:

- Syntax highlighting
- Line numbers
- Autocomplete
- Error markers
- Code editing
- Keyboard shortcuts
- Multiple languages
- Editor themes

Architecture:

```text
CodeEditor
   ↓
EditorAdapter
   ↓
LanguageConfig
   ↓
Python / JavaScript / C++ / etc.
```

The editor should not directly execute code.

---

# 11. Python Execution

## Pyodide

Use Pyodide for browser-side Python execution.

```bash
npm install pyodide
```

Architecture:

```text
React
  │
  ▼
ExecutionManager
  │
  ▼
Web Worker
  │
  ▼
Pyodide
  │
  ▼
Python
```

Pyodide supports executing Python in a Web Worker, which keeps long-running Python computation from blocking the main UI thread. citeturn0search0turn0search6

---

# 12. Web Worker Sandbox

Use native browser Web Workers.

No additional library is required.

```text
src/
└── runtimes/
    └── python/
        ├── python.worker.js
        ├── pythonRuntime.js
        └── pythonConfig.js
```

Worker responsibilities:

- Load Python runtime
- Receive source code
- Receive stdin
- Execute code
- Capture stdout
- Capture stderr
- Return execution result
- Handle timeout
- Terminate/recreate worker when necessary

Example:

```text
Main Thread
    │
    │ postMessage()
    ▼
Python Worker
    │
    ▼
Pyodide
    │
    │ postMessage()
    ▼
Main Thread
```

---

# 13. Runtime Abstraction

Do not make the coding system Python-specific.

Create:

```text
LanguageRuntime
```

Conceptually:

```js
{
  id: "python",
  version: "...",
  execute(),
  validate(),
  formatOutput()
}
```

Future:

```text
pythonRuntime
javascriptRuntime
javaRuntime
cppRuntime
cRuntime
sqlRuntime
```

The practice UI communicates with the runtime through one common interface.

---

# 14. Future Language Support

## Phase 1

```text
Python
```

## Phase 2

```text
JavaScript
```

## Phase 3

```text
C
C++
Java
SQL
```

Do not add every runtime to the first bundle.

Use lazy loading:

```text
User opens Python problem
        ↓
Load Python runtime

User opens JavaScript problem
        ↓
Load JavaScript runtime
```

This reduces initial bundle size.

---

# 15. Tutorial Content

## Markdown

Store lessons as Markdown files.

Example:

```text
content/
└── courses/
    └── python-programming/
        └── unit-01/
            └── variables/
                ├── lesson.md
                ├── examples.json
                └── problems.json
```

Advantages:

- Git version control
- Easy manual editing
- Easy review
- Easy content updates
- No database required for tutorial content
- Easy migration to a CMS later

---

# 16. Markdown Rendering

## react-markdown

```bash
npm install react-markdown
```

Use for:

- Lesson text
- Explanations
- Notes
- Tables
- Examples
- Documentation
- Hints

`react-markdown` renders Markdown into React elements and supports remark/rehype plugin pipelines. It is preferable to manually injecting arbitrary HTML into the application. citeturn1search6

---

# 17. GitHub-Flavored Markdown

## remark-gfm

```bash
npm install remark-gfm
```

Supports useful content features such as:

- Tables
- Task lists
- Strikethrough
- GFM syntax

Usage:

```text
Markdown
   ↓
remark-gfm
   ↓
react-markdown
   ↓
React components
```

For untrusted HTML/content, use sanitization rather than allowing arbitrary HTML.

Recommended optional dependency:

```bash
npm install rehype-sanitize
```

---

# 18. Structured Content

Markdown alone is not sufficient for interactive learning.

Use:

```text
Markdown → Human-readable lesson
JSON     → Machine-readable metadata
```

Example:

```text
lesson.md
examples.json
problems.json
quiz.json
chapter.json
```

This keeps the content engine flexible.

---

# 19. Content Validation

## Zod

```bash
npm install zod
```

Use Zod to validate:

- Course metadata
- Unit metadata
- Chapter metadata
- Lesson metadata
- Practice problems
- Test definitions
- Question schemas
- Language definitions
- Progress objects

Example:

```js
const ProblemSchema = z.object({
  id: z.string(),
  language: z.string(),
  difficulty: z.enum([
    "beginner",
    "intermediate",
    "advanced",
    "challenge"
  ]),
  title: z.string(),
  starterCode: z.string()
});
```

Zod is TypeScript-first but also works with JavaScript and modern browsers, making it suitable for validating structured LMS content at runtime. citeturn0search4turn0search3

---

# 20. Search

## Fuse.js

```bash
npm install fuse.js
```

Use for client-side search across:

- Courses
- Units
- Chapters
- Lessons
- Topics
- Definitions
- Examples
- Problems

Example index:

```text
[
  {
    id,
    title,
    description,
    course,
    unit,
    chapter,
    tags
  }
]
```

Fuse.js provides fuzzy matching and relevance ranking, making it useful for tutorial search where students may misspell terms. citeturn1search2turn1search12

---

# 21. Icons

## Lucide React

```bash
npm install lucide-react
```

Use for:

- Navigation
- Search
- Checkmarks
- Lock/unlock
- Progress
- Test status
- User/profile
- Settings
- Code controls
- Leaderboard

Keep one icon library throughout the application.

---

# 22. Local Storage

Use native:

```js
localStorage
```

For small durable client state:

```text
lms:last-route
lms:preferences
lms:progress:{userId}
lms:draft:{problemId}
lms:test-session:{sessionId}
```

Use a small storage wrapper instead of directly calling localStorage throughout the application.

Recommended:

```text
src/services/storage/
├── localStorage.js
├── progressStorage.js
├── draftStorage.js
└── testStorage.js
```

---

# 23. IndexedDB

Use IndexedDB only when localStorage becomes insufficient.

Recommended library:

```bash
npm install idb
```

Use it for:

- Large lesson caches
- Runtime caches
- Large practice datasets
- Offline content
- Question banks
- Execution metadata

Do not put large course datasets into localStorage.

---

# 24. Progress Persistence

Use a hybrid strategy:

```text
                    Progress
                       │
             ┌─────────┴─────────┐
             │                   │
        Local Cache          Firebase
             │                   │
        Fast UI             Durable State
        Offline             Cross-device
        Recovery            Persistence
```

Local progress should update immediately.

Firebase synchronization should happen after the local update.

---

# 25. Firestore Offline Persistence

Use Firestore's built-in web persistence where appropriate.

Concept:

```text
React
  ↓
Firestore SDK
  ↓
Local Firestore Cache
  ↓
Firebase
```

Firestore supports offline reads/writes and synchronizes local changes when connectivity returns. citeturn1search0turn1search7

Do not duplicate every Firestore document into localStorage.

Use:

```text
localStorage → small app state/drafts
Firestore cache → Firebase-managed offline data
IndexedDB → larger custom offline data
```

---

# 26. Authentication

Use:

```text
firebase/auth
```

Supported initial providers:

```text
Email + Password
Google
```

Authentication state:

```text
AuthProvider
     ↓
useAuthStore()
     ↓
ProtectedRoute
```

Public pages:

```text
Home
Courses
Course Overview
Lessons
```

Protected features:

```text
Practice
Test Submission
Progress Sync
Leaderboard
Profile
Achievements
```

---

# 27. Firestore Collections

Recommended structure:

```text
users/{uid}

users/{uid}/courseProgress/{courseId}

users/{uid}/chapterProgress/{chapterId}

users/{uid}/problemProgress/{problemId}

users/{uid}/testAttempts/{attemptId}

leaderboards/{courseId}/entries/{uid}

achievements/{achievementId}

learningEvents/{eventId}
```

Avoid storing the entire course content in Firestore during MVP.

Static course content should remain in the application/content repository.

---

# 28. Leaderboard Technology

Leaderboard data:

```text
Cloud Firestore
```

Display:

```text
Overall
Course
Unit
Weekly
Monthly
```

Important:

```text
Leaderboard score
        ↓
Firestore
        ↓
Security Rules
```

The client should not be allowed to freely write:

```text
rank
totalScore
verifiedScore
```

Use restricted document fields and validation rules.

However, without a trusted server component, leaderboard integrity is limited. The MVP should treat the leaderboard as a gamification feature, not a secure competitive examination system.

---

# 29. Bot / Abuse Detection

No dedicated external bot-detection backend is required for MVP.

Use browser-side signals:

```text
Submission velocity
Test completion timing
Repeated attempts
Duplicate interaction patterns
Focus/visibility anomalies
Suspicious navigation
App Check status
Firestore permission failures
```

Store only aggregated/risk events where possible.

Example:

```js
{
  event: "suspicious_submission_rate",
  riskLevel: "medium",
  timestamp: Date.now()
}
```

Do not collect raw keystrokes outside the coding editor.

Do not collect clipboard contents.

Do not use invasive fingerprinting as the core anti-cheat mechanism.

---

# 30. Rate Limiting Without Custom Backend

Because there is no custom backend, rate limiting must be lightweight.

Possible controls:

```text
Client-side cooldown
Firestore write constraints
Security Rules
App Check
Submission timestamps
Attempt limits
```

Example:

```text
Maximum:
10 test submissions / hour
```

The exact values should be configurable.

For serious anti-abuse requirements later:

```text
Cloud Functions / Cloud Run / trusted execution service
```

can be introduced as an optional Phase 2 backend.

---

# 31. Forms

Recommended:

## React Hook Form

```bash
npm install react-hook-form
```

Use for:

- Login
- Registration
- Profile
- Admin forms
- Search filters
- Content metadata forms

Optional resolver:

```bash
npm install @hookform/resolvers
```

Connect with Zod when form validation becomes complex.

---

# 32. Notifications / Toasts

Recommended:

```bash
npm install sonner
```

Use for:

- Saved progress
- Login success
- Test completion
- Copy/paste warning
- Offline notification
- Firebase sync state
- Runtime loading
- Error states

Avoid excessive toast notifications during learning.

---

# 33. Animation

Use native Tailwind transitions first.

Optional:

```bash
npm install motion
```

Use animation only for:

- Page transitions
- Progress changes
- Achievement unlock
- Test result reveal
- Sidebar transitions

The tutorial content should remain fast and distraction-free.

---

# 34. Date and Time

Recommended:

```bash
npm install date-fns
```

Use for:

- Test timestamps
- Last activity
- Streaks
- Weekly leaderboard
- Monthly leaderboard
- Relative time display

Store timestamps consistently as Firebase Timestamp or UTC-compatible values.

---

# 35. Testing

## Vitest

```bash
npm install -D vitest
```

Use for:

- Progress calculations
- Random test selection
- Score calculations
- Content validation
- LocalStorage services
- Firestore service mocks
- Runtime adapters
- Utility functions

Vitest is Vite-native and reuses Vite configuration, making it a natural testing choice for this stack. citeturn1search3turn1search5

---

# 36. React Component Testing

Recommended:

```bash
npm install -D @testing-library/react @testing-library/jest-dom
```

Test:

```text
LessonPage
PracticeEditor
TestQuestion
ProgressBar
Leaderboard
LoginForm
ProtectedRoute
```

Focus on behavior rather than implementation details.

---

# 37. End-to-End Testing

## Playwright

```bash
npm install -D playwright
```

Critical E2E flows:

```text
Anonymous
 → Browse course
 → Open lesson

User
 → Register
 → Login
 → Start course
 → Practice
 → Run code
 → Complete chapter
 → Take test
 → View progress
 → View leaderboard
```

---

# 38. Linting

## ESLint

```bash
npm install -D eslint
```

Rules should catch:

- Unused variables
- React mistakes
- Hook mistakes
- Unsafe patterns
- Import issues

Recommended plugins:

```text
eslint-plugin-react-hooks
eslint-plugin-react-refresh
```

---

# 39. Formatting

## Prettier

```bash
npm install -D prettier
```

Use:

```text
Prettier → Formatting
ESLint → Code correctness
```

Do not use ESLint as a replacement for Prettier.

---

# 40. Git Hooks

Optional but recommended:

```bash
npm install -D husky lint-staged
```

Before commit:

```text
lint
format check
unit tests
content validation
```

Recommended flow:

```text
git commit
    ↓
lint-staged
    ↓
ESLint
    ↓
Prettier
    ↓
Fast tests
    ↓
commit
```

---

# 41. Firebase Local Development

Use the Firebase Local Emulator Suite during development.

Emulators should be used for:

```text
Authentication
Firestore
Security Rules
```

This prevents unnecessary writes to the production Firebase project during development.

Recommended Firebase CLI:

```bash
npm install -g firebase-tools
```

---

# 42. Environment Variables

Use Vite environment variables.

Example:

```text
.env.local
```

```text
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Important:

Firebase web configuration values are not equivalent to private server secrets.

Security must come from:

```text
Firebase Authentication
Firestore Security Rules
App Check
```

Never put:

```text
service account private keys
Firebase Admin credentials
private API keys
```

into the React application.

---

# 43. Content Folder

Recommended:

```text
content/
├── courses/
│   └── python-programming/
│       ├── course.json
│       ├── syllabus.json
│       ├── unit-01/
│       │   ├── unit.json
│       │   ├── interpreter/
│       │   ├── values-types/
│       │   ├── variables/
│       │   ├── expressions/
│       │   └── functions/
│       ├── unit-02/
│       ├── unit-03/
│       ├── unit-04/
│       └── unit-05/
│
├── languages/
│   └── python.json
│
└── question-banks/
    └── python-programming/
```

---

# 44. Recommended Project Structure

```text
src/
├── app/
│   ├── App.jsx
│   ├── router.jsx
│   └── providers/
│
├── assets/
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── course/
│   ├── lesson/
│   ├── editor/
│   ├── test/
│   ├── progress/
│   └── leaderboard/
│
├── pages/
│   ├── Home/
│   ├── Courses/
│   ├── Course/
│   ├── Lesson/
│   ├── Practice/
│   ├── Tests/
│   ├── Progress/
│   ├── Leaderboard/
│   ├── Profile/
│   └── Auth/
│
├── features/
│   ├── auth/
│   ├── courses/
│   ├── learning/
│   ├── practice/
│   ├── assessment/
│   ├── progress/
│   ├── leaderboard/
│   ├── achievements/
│   ├── search/
│   └── integrity/
│
├── content/
│   ├── loader/
│   ├── schemas/
│   └── registry/
│
├── runtimes/
│   ├── core/
│   ├── python/
│   │   ├── pythonRuntime.js
│   │   ├── python.worker.js
│   │   └── pythonConfig.js
│   └── registry.js
│
├── services/
│   ├── firebase/
│   │   ├── config.js
│   │   ├── auth.js
│   │   ├── firestore.js
│   │   └── appCheck.js
│   ├── storage/
│   │   ├── localStorage.js
│   │   └── indexedDb.js
│   ├── sync/
│   └── analytics/
│
├── stores/
│   ├── authStore.js
│   ├── courseStore.js
│   ├── progressStore.js
│   ├── practiceStore.js
│   ├── testStore.js
│   └── uiStore.js
│
├── hooks/
│
├── utils/
│
├── styles/
│
└── main.jsx
```

---

# 45. Content Architecture

The application should distinguish:

```text
Static Content
      │
      ├── Markdown
      ├── JSON
      └── Code Examples

Application State
      │
      ├── Zustand
      └── localStorage

Persistent User State
      │
      └── Firestore

Code Execution
      │
      └── Web Worker + Runtime
```

Never mix all four into one system.

---

# 46. Package Groups

## Production Dependencies

Recommended initial package set:

```bash
npm install \
react \
react-dom \
react-router \
firebase \
zustand \
tailwindcss \
@monaco-editor/react \
pyodide \
react-markdown \
remark-gfm \
rehype-sanitize \
fuse.js \
lucide-react \
zod \
react-hook-form \
@hookform/resolvers \
sonner \
date-fns \
idb
```

If the chosen Tailwind setup requires additional Vite/PostCSS integration packages, install the current official Tailwind/Vite integration packages for the selected Tailwind release.

## Development Dependencies

```bash
npm install -D \
vite \
eslint \
prettier \
vitest \
@testing-library/react \
@testing-library/jest-dom \
playwright \
husky \
lint-staged
```

Do not blindly copy package versions from this document. Lock versions through the project's package manager and update them deliberately.

---

# 47. What Each Library Does

| Library | Role | Required |
|---|---|---:|
| React | UI | Yes |
| React DOM | Browser rendering | Yes |
| Vite | Build tool | Yes |
| Tailwind | Styling | Yes |
| React Router | Routing | Yes |
| Firebase | Auth + DB | Yes |
| Zustand | Global client state | Yes |
| Monaco | Code editor | Yes |
| Pyodide | Python execution | Yes for Python MVP |
| Web Worker | Execution isolation | Yes |
| react-markdown | Lessons | Yes |
| remark-gfm | Markdown extensions | Recommended |
| rehype-sanitize | HTML sanitization | Recommended |
| Zod | Content validation | Recommended |
| Fuse.js | Search | Recommended |
| Lucide | Icons | Recommended |
| React Hook Form | Forms | Recommended |
| Sonner | Toasts | Recommended |
| date-fns | Dates | Recommended |
| idb | IndexedDB wrapper | Optional |
| Vitest | Unit tests | Yes for production project |
| Playwright | E2E tests | Recommended |
| ESLint | Linting | Yes |
| Prettier | Formatting | Yes |
| Husky | Git hooks | Optional |

---

# 48. Libraries We Should NOT Add Initially

Avoid unnecessary dependency growth.

Do not initially add:

```text
Redux Toolkit
TanStack Query
Axios
Express
Socket.io
Next.js
NestJS
GraphQL
Prisma
Mongoose
Supabase
MongoDB
PostgreSQL
Redis
Docker
```

Reasons:

- Firebase already provides the cloud data layer.
- Fetch/native Firebase SDK is sufficient.
- Zustand is sufficient for client state.
- React Router is sufficient for routing.
- No custom server is required.
- Firestore provides realtime synchronization.
- Pyodide provides browser-side Python execution.

Additional libraries should be added only when there is a concrete requirement.

---

# 49. State Ownership Rules

Use this rule:

```text
React State
→ Temporary component state

Zustand
→ Application/session state

localStorage
→ Small persistent browser state

IndexedDB
→ Large browser cache

Firestore
→ Authenticated durable user state

Content files
→ Course/lesson source of truth

Runtime Worker
→ Code execution state
```

This prevents architectural confusion.

---

# 50. Data Flow

## Lesson

```text
Markdown/JSON
     ↓
Content Loader
     ↓
Schema Validation
     ↓
Lesson Renderer
     ↓
React
```

## Practice

```text
Problem JSON
     ↓
Practice Engine
     ↓
Monaco Editor
     ↓
Execution Manager
     ↓
Web Worker
     ↓
Pyodide
     ↓
Execution Result
     ↓
Progress Store
     ↓
localStorage
     ↓
Firestore
```

## Test

```text
Question Bank
     ↓
Random Test Generator
     ↓
Test Session
     ↓
Student Answers
     ↓
Evaluation
     ↓
Score
     ↓
Progress
     ↓
Firestore
```

---

# 51. Content Versioning

Every course should have a version.

Example:

```json
{
  "courseId": "python-programming",
  "version": "1.0.0"
}
```

Every chapter:

```json
{
  "id": "functions",
  "version": "1.1.0"
}
```

When content changes:

```text
Minor text correction
→ patch version

New lesson
→ minor version

Major structural change
→ major version
```

This helps preserve historical test/progress information.

---

# 52. Code Problem Versioning

A problem should never silently change after students have attempted it.

Use:

```text
problemId
problemVersion
```

Example:

```text
py-u2-functions-gcd
version: 1
```

If the problem changes substantially:

```text
py-u2-functions-gcd
version: 2
```

This avoids confusing historical test results.

---

# 53. Performance Strategy

Use:

```text
React lazy()
Dynamic imports
Route-level code splitting
Runtime lazy loading
Content chunking
Firebase lazy initialization where practical
```

Important:

Do not load Pyodide on the homepage.

Instead:

```text
Homepage
   ↓
No Python runtime

Practice page
   ↓
Load Pyodide

Python problem
   ↓
Initialize worker
```

This can significantly reduce initial application load.

---

# 54. Security Checklist

Before production:

```text
[ ] Firestore Security Rules deployed
[ ] Authentication rules tested
[ ] App Check configured
[ ] No service account credentials in frontend
[ ] No secrets in Git
[ ] Content sanitized
[ ] Markdown HTML controlled
[ ] Code runtime isolated
[ ] Worker timeout implemented
[ ] Infinite-loop handling implemented
[ ] Firestore writes restricted
[ ] Leaderboard writes restricted
[ ] Rate limits implemented
[ ] Suspicious activity logging implemented
[ ] Firebase Emulator tests completed
```

---

# 55. Firebase Security Model

Recommended conceptual model:

```text
Public
  ↓
Read public course metadata

Authenticated User
  ↓
Read/write own progress
  ↓
Read own attempts
  ↓
Submit allowed learning events

Leaderboard
  ↓
Read public leaderboard
  ↓
Restricted score mutation

Admin
  ↓
Separate controlled privileges
```

Do not rely on:

```text
if (user.role === "admin")
```

in the React client as the actual security mechanism.

Authorization must be enforced by Firebase Security Rules.

---

# 56. Deployment

Recommended:

```text
GitHub
   ↓
Build
   ↓
Vite
   ↓
dist/
   ↓
Firebase Hosting
```

Alternative static hosts can also be used.

Recommended first-party ecosystem:

```text
Firebase Hosting
Firebase Authentication
Cloud Firestore
Firebase App Check
```

No custom server is required.

---

# 57. CI/CD

Recommended future pipeline:

```text
Git Push
   ↓
Install
   ↓
Lint
   ↓
Content Validation
   ↓
Unit Tests
   ↓
Build
   ↓
E2E Tests
   ↓
Deploy
```

Production deployment should fail if:

- Content schema is invalid.
- Tests fail.
- Build fails.
- Duplicate IDs exist.
- Broken content references exist.

---

# 58. Browser Compatibility

Target modern browsers:

```text
Chrome
Edge
Firefox
Safari
```

Because Pyodide/WebAssembly is central to the Python playground, test the actual execution environment separately from normal UI compatibility.

Pyodide's current documentation recommends modern browsers with WebAssembly support. citeturn0search6

---

# 59. Accessibility Stack

Do not add a heavy accessibility library initially.

Use:

```text
Semantic HTML
ARIA where required
Keyboard navigation
Focus management
Accessible labels
Tailwind responsive utilities
Monaco accessibility features
```

Test with:

```text
Keyboard-only navigation
Screen reader
Browser zoom
Reduced motion
High contrast
```

---

# 60. Recommended Development Order

## Stage 1 — Foundation

```text
Vite
React
Tailwind
React Router
ESLint
Prettier
```

## Stage 2 — Course Engine

```text
Content loader
Markdown renderer
Course/unit/chapter navigation
Search
```

## Stage 3 — Firebase

```text
Authentication
Firestore
Security Rules
App Check
```

## Stage 4 — Learning Engine

```text
Progress
Completion
Local storage
Synchronization
```

## Stage 5 — Coding Engine

```text
Monaco
Web Worker
Pyodide
Execution manager
Test cases
```

## Stage 6 — Assessment

```text
Question bank
Randomization
Chapter tests
Unit tests
Score system
```

## Stage 7 — Gamification

```text
Leaderboard
Achievements
Streaks
Statistics
```

## Stage 8 — Integrity

```text
Rate limiting
Risk scoring
App Check
Abuse monitoring
```

## Stage 9 — Expansion

```text
Additional languages
Additional subjects
Admin CMS
Adaptive learning
```

---

# 61. Final Recommended Stack

The production MVP should use:

```text
┌─────────────────────────────────────────────┐
│                 CODEPATH LMS                │
├─────────────────────────────────────────────┤
│ Frontend                                    │
│ React.js + Vite + Tailwind CSS              │
│                                             │
│ Routing                                     │
│ React Router                                │
│                                             │
│ State                                       │
│ Zustand                                     │
│                                             │
│ Backend / BaaS                              │
│ Firebase Authentication                     │
│ Cloud Firestore                             │
│ Firebase App Check                          │
│                                             │
│ Content                                     │
│ Markdown + JSON                             │
│ react-markdown + remark-gfm                 │
│ Zod                                         │
│                                             │
│ Search                                      │
│ Fuse.js                                     │
│                                             │
│ Code Editor                                 │
│ Monaco Editor                               │
│                                             │
│ Python Runtime                              │
│ Pyodide + Web Worker                        │
│                                             │
│ Browser Persistence                         │
│ localStorage + Firestore offline cache     │
│ IndexedDB/idb (optional)                    │
│                                             │
│ UI                                          │
│ Lucide React + Sonner                       │
│                                             │
│ Testing                                     │
│ Vitest + React Testing Library + Playwright │
│                                             │
│ Quality                                     │
│ ESLint + Prettier + Husky                   │
│                                             │
│ Deployment                                  │
│ Firebase Hosting                            │
└─────────────────────────────────────────────┘
```

---

# 62. Architecture Rule to Preserve

The most important rule for the project is:

```text
          CONTENT
             │
             ▼
      Learning Engine
             │
       ┌─────┴─────┐
       ▼           ▼
    Practice    Assessment
       │           │
       ▼           ▼
    Runtime      Scoring
       │           │
       └─────┬─────┘
             ▼
        Progress Engine
             │
       ┌─────┴─────┐
       ▼           ▼
    Browser      Firebase
     Cache       Firestore
```

And never:

```text
Python-specific code
        ↓
hard-coded into
        ↓
LMS UI
```

Instead:

```text
LMS
 ↓
Language Adapter
 ↓
Runtime
```

This is what allows the same platform to eventually support:

```text
Python
JavaScript
C
C++
Java
SQL
```

and later subjects such as:

```text
Data Structures
DBMS
Operating Systems
Computer Networks
Web Development
AI / ML
```

without rebuilding the platform architecture.

---

# 63. Decision Summary

| Decision | Choice |
|---|---|
| Frontend | React.js |
| Language | JavaScript |
| Build | Vite |
| CSS | Tailwind CSS |
| Routing | React Router |
| Global State | Zustand |
| Cloud | Firebase |
| Auth | Firebase Auth |
| Database | Firestore |
| Abuse Protection | Firebase App Check + client-side risk signals |
| Custom Backend | None |
| Tutorial Format | Markdown |
| Metadata | JSON |
| Content Validation | Zod |
| Search | Fuse.js |
| Code Editor | Monaco |
| Python Runtime | Pyodide |
| Isolation | Web Worker |
| Local Drafts | localStorage |
| Large Offline Cache | IndexedDB/idb |
| Icons | Lucide React |
| Toasts | Sonner |
| Forms | React Hook Form |
| Date Utilities | date-fns |
| Unit Testing | Vitest |
| UI Testing | React Testing Library |
| E2E | Playwright |
| Lint | ESLint |
| Formatting | Prettier |
| Git Hooks | Husky/lint-staged |
| Deployment | Firebase Hosting |
| Future Languages | Runtime adapter architecture |
| Future CMS | Content schema designed for migration |
