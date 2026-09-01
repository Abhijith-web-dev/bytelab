# CodePath LMS — Development Rules

> **Purpose:** This file is the project-level engineering rulebook for CodePath LMS.
> Keep this file in the GitHub repository root and treat it as the default source of truth for implementation decisions.
>
> **Project:** CodePath LMS  
> **Architecture:** React.js + Vite + Tailwind CSS + Firebase BaaS + browser-side code execution  
> **Backend:** No custom backend in MVP  
> **Content:** Version-controlled Markdown/JSON  
> **Primary Course:** 19AI301 / CS3301 — Python Programming  
> **Future:** Multiple programming languages, courses, and academic subjects

---

# 1. Core Instruction

CodePath LMS is a **tutorial-first programming education platform**, not a traditional CRUD LMS.

Every implementation must preserve this primary learning loop:

```text
Learn
  ↓
Understand
  ↓
See Example
  ↓
Practice
  ↓
Run Code
  ↓
Receive Feedback
  ↓
Test
  ↓
Track Progress
  ↓
Improve
  ↓
Continue
```

When making a feature decision, prefer the solution that:

1. Improves student learning.
2. Keeps the UI simple.
3. Preserves the existing architecture.
4. Is reusable across courses and languages.
5. Minimizes unnecessary dependencies.
6. Keeps user work safe.
7. Maintains strong client-side performance.
8. Does not introduce a custom backend unless explicitly approved.

---

# 2. Read Project Documentation First

Before implementing or modifying a significant feature, inspect the relevant project documentation.

Primary documents:

```text
PRD
TECHSTACK
WEBSITE WORKFLOW
RULES
```

Recommended repository documentation:

```text
docs/
├── PRD.md
├── TECHSTACK.md
├── WEBSITE_WORKFLOW.md
└── ARCHITECTURE.md
```

If documentation and implementation conflict:

1. Identify the conflict.
2. Prefer the latest explicitly approved project decision.
3. Do not silently redesign the architecture.
4. Update documentation when the architectural decision changes.

---

# 3. Technology Rules

The approved MVP stack is:

```text
React.js
Vite
Tailwind CSS
React Router
Zustand
Firebase
Cloud Firestore
Firebase Authentication
Firebase App Check
Monaco Editor
Pyodide
Web Workers
Markdown
react-markdown
remark-gfm
rehype-sanitize
Zod
Fuse.js
Lucide React
React Hook Form
Sonner
date-fns
Vitest
React Testing Library
Playwright
ESLint
Prettier
```

Do not replace an approved library without a concrete reason.

Do not introduce a second library for an already-solved problem.

---

# 4. No Custom Backend Rule

The MVP must not introduce:

```text
Express
Fastify
NestJS
Django
Flask
FastAPI
Spring Boot
Custom REST API
Custom GraphQL server
Node API server
```

Firebase is the managed backend/BaaS layer.

Use:

```text
Firebase Authentication
Cloud Firestore
Firebase App Check
Firebase Hosting
```

where appropriate.

A custom backend may only be introduced after an explicit architecture decision.

---

# 5. Frontend Architecture Rule

Use a modular React architecture.

Prefer:

```text
features/
components/
pages/
services/
stores/
hooks/
utils/
content/
runtimes/
```

Avoid putting all application logic into:

```text
App.jsx
large page components
single global store
```

Pages should compose features.

Business logic should live in feature/service modules rather than presentation components.

---

# 6. Component Rules

Components should have one clear responsibility.

Prefer:

```text
LessonHeader
LessonContent
LessonNavigation
PracticeEditor
CodeOutput
TestPanel
ProgressBar
LeaderboardTable
```

over a single:

```text
MegaPage.jsx
```

Do not create components merely to split a few lines of JSX.

Create reusable components when:

- The UI is repeated.
- The component has independent behavior.
- The component represents a domain concept.
- The component improves readability.

---

# 7. React Rules

Prefer functional components.

Use hooks appropriately.

Do not:

- Mutate state directly.
- Put expensive computation inside render.
- Create unnecessary global state.
- Use effects for derived values.
- Duplicate the same state in multiple stores.
- Add unnecessary context providers.

Prefer:

```text
props
local state
Zustand
derived selectors
```

Use `useEffect` for actual synchronization/side effects, not general computation.

---

# 8. State Ownership Rules

Every piece of state must have an owner.

```text
Component State
→ Temporary UI state

Zustand
→ Shared application/session state

localStorage
→ Small persistent browser state

IndexedDB
→ Large local cache

Firestore
→ Durable authenticated user state

Markdown/JSON
→ Course content source

Web Worker
→ Code execution state
```

Do not store the same state in multiple systems without a synchronization reason.

---

# 9. Firebase Rules

Firebase is used for durable user data.

Use Firebase for:

```text
Authentication
Student profile
Course progress
Chapter progress
Problem progress
Test attempts
Achievements
Leaderboard data
Learning events where required
```

Do not store the entire static tutorial library in Firestore during MVP.

Static content belongs in the repository.

---

# 10. Firestore Security Rule

Never trust the browser.

The client must not be able to freely assign authoritative values such as:

```text
rank
verifiedScore
totalScore
courseCompleted
unitCompleted
```

Treat:

```text
Client Data
```

as untrusted input.

Use:

```text
Firebase Security Rules
Firebase App Check
Restricted writes
Validation
Cloud Functions later if stronger server-side validation is required
```

The frontend must never contain Firebase Admin credentials or service-account keys.

---

# 11. Authentication Rules

Public content should remain accessible without login.

Authentication is required for:

```text
Coding practice
Practice history
Test submission
Cloud progress synchronization
Leaderboard participation
Profile
Achievements
```

When authentication interrupts a flow:

```text
Save intended destination
 ↓
Login/Register
 ↓
Return to original destination
```

Never unnecessarily force students to log in merely to read educational content.

---

# 12. Content Architecture Rule

Content must remain separate from UI code.

Use:

```text
content/
└── courses/
    └── python-programming/
        ├── course.json
        ├── syllabus.json
        ├── unit-01/
        ├── unit-02/
        ├── unit-03/
        ├── unit-04/
        └── unit-05/
```

Typical chapter:

```text
chapter.json
lesson.md
examples.json
problems.json
quiz.json
```

Do not hard-code course lessons directly into React components.

---

# 13. Content Must Be Language-Agnostic

Do not write architecture such as:

```js
if (course === "python") {
  ...
}
```

Prefer:

```js
course.language
language.runtime
problem.language
```

The first implementation is Python, but the platform must support future:

```text
JavaScript
C
C++
Java
SQL
```

and additional academic subjects.

---

# 14. Course Structure Rule

The academic course hierarchy is:

```text
Course
 ↓
Unit
 ↓
Chapter
 ↓
Topic/Lesson
 ↓
Example
 ↓
Practice
 ↓
Assessment
```

Do not flatten the hierarchy.

Do not mix:

```text
course data
lesson data
user progress
```

into one document structure.

---

# 15. Python Course Rule

The initial course must preserve the five academic units:

```text
Unit I
Data Types, Expressions, Statements

Unit II
Control Flow, Functions

Unit III
Lists, Tuples, Dictionaries

Unit IV
Files, Modules, Packages

Unit V
NumPy, Data Frame
```

The tutorial may split individual syllabus topics into more granular chapters.

Do not change the academic unit structure without an explicit curriculum decision.

---

# 16. Course Outcome Mapping

Support:

```text
CO1
CO2
CO3
CO4
CO5
```

Relevant content can map to course outcomes.

Example:

```text
Simple Python Programs
→ CO1

Conditions / Loops / Functions
→ CO2

Lists / Tuples / Dictionaries
→ CO3

Files / Modules / Packages
→ CO4

NumPy / DataFrame
→ CO5
```

Do not hard-code these mappings into UI components.

Store them as content metadata.

---

# 17. Tutorial Quality Rules

Every chapter should teach before testing.

Preferred structure:

```text
Learning Objective
 ↓
Concept
 ↓
Syntax
 ↓
Example
 ↓
Output
 ↓
Explanation
 ↓
Common Mistakes
 ↓
Guided Practice
 ↓
Independent Practice
 ↓
Quick Quiz
 ↓
Summary
 ↓
Assessment
```

Use:

```text
See
 ↓
Modify
 ↓
Create
```

as the default coding-learning progression.

---

# 18. Content Writing Rules

Tutorial explanations should be:

- Beginner-friendly.
- Technically accurate.
- Concise.
- Progressive.
- Example-driven.
- Consistent in terminology.

Avoid:

- Huge walls of text.
- Unexplained advanced terminology.
- Jumping directly to complex code.
- Examples without explanation.
- Tests before teaching the underlying concept.

Every code example should have a clear purpose.

---

# 19. Code Example Rules

Every tutorial code block should, where appropriate, provide:

```text
Code
Output
Explanation
```

For difficult concepts:

```text
Code
 ↓
Line-by-line explanation
 ↓
Expected behavior
```

Do not use examples that depend on unavailable files, packages, or environments unless the lesson explicitly prepares the student for them.

---

# 20. Coding Playground Rules

The coding playground must be separated from lesson rendering.

Architecture:

```text
Practice UI
 ↓
Editor
 ↓
Execution Manager
 ↓
Language Runtime
```

The editor must not contain runtime implementation details.

---

# 21. Monaco Editor Rules

Use Monaco for the coding experience.

The editor should support:

```text
Syntax highlighting
Line numbers
Indentation
Reset
Run
Output
Error state
```

Do not implement a custom code editor unless Monaco cannot satisfy a specific requirement.

---

# 22. Paste Prevention Rules

Paste prevention applies only to:

```text
Practice code editor
Test code editor
```

Do not globally disable clipboard functionality.

Expected behavior:

```text
paste event
 ↓
prevent insertion
 ↓
show non-blocking explanation
```

Message:

> Pasting code is disabled for practice challenges. Type your solution to continue.

Paste prevention is not considered a complete anti-cheat system.

Never claim that it makes cheating impossible.

---

# 23. Code Execution Rules

Never execute untrusted student code directly on the React main thread.

Initial Python architecture:

```text
React
 ↓
Execution Manager
 ↓
Web Worker
 ↓
Pyodide
 ↓
Python
```

The execution system must support:

```text
Timeout
stdout
stderr
syntax errors
runtime errors
worker termination
worker recreation
```

---

# 24. Web Worker Rules

Workers must not have unnecessary access to:

```text
Firebase credentials
DOM
application secrets
privileged application state
```

On timeout:

```text
Terminate Worker
 ↓
Return TIMEOUT
 ↓
Recreate worker when required
```

Do not allow an infinite-running worker to remain alive indefinitely.

---

# 25. Runtime Abstraction Rule

Create a common runtime interface.

Conceptually:

```js
{
  id,
  version,
  execute,
  validate,
  formatOutput
}
```

The practice engine should depend on this interface rather than directly importing Pyodide everywhere.

Future:

```text
PythonRuntime
JavaScriptRuntime
JavaRuntime
CppRuntime
CRuntime
SQLRuntime
```

---

# 26. No Runtime Loading on Initial Page

Do not load Pyodide when the user opens:

```text
Home
Course Catalog
Course Overview
Lesson
Dashboard
```

Load it only when the student needs Python execution.

Preferred:

```text
Open Practice
 ↓
Lazy-load runtime
 ↓
Initialize Worker
 ↓
Run
```

---

# 27. Practice Problem Rules

Every problem should have stable metadata.

Minimum:

```text
id
language
courseId
unitId
chapterId
title
description
starterCode
difficulty
testCases
skills
```

Prefer tags such as:

```text
concept
syntax
debugging
algorithm
application
edge-case
```

---

# 28. Problem Versioning Rule

Do not silently modify an already-used assessment problem.

Use:

```text
problemId
problemVersion
```

For substantial changes:

```text
same conceptual problem
→ new version
```

Historical attempts must remain interpretable.

---

# 29. Random Test Rules

Random tests must be generated from a controlled question pool.

Workflow:

```text
Load Question Bank
 ↓
Filter by course/chapter
 ↓
Filter eligible questions
 ↓
Apply difficulty distribution
 ↓
Avoid recent repeats where possible
 ↓
Shuffle
 ↓
Create Test Session
```

Never use uncontrolled random question generation that can produce invalid or unsolvable assessments.

---

# 30. Test Design Rules

Questions should cover different cognitive tasks:

```text
Concept
Syntax
Output Prediction
Debugging
Coding
Application
Edge Cases
Algorithms
```

Do not make every assessment a multiple-choice test.

---

# 31. Assessment vs Practice Rule

Keep these separate.

```text
Practice
→ Learning and experimentation

Assessment
→ Measuring understanding
```

Practice should provide more guidance.

Assessment should provide less guidance.

---

# 32. Feedback Rules

Never return only:

```text
Wrong Answer
```

Prefer:

```text
Result
Actual Output
Expected Output
Relevant Error
Learning Hint
Next Action
```

Example:

```text
Your Output: 18
Expected: 20

Hint:
Check how the loop handles the final element.
```

Feedback should teach, not merely judge.

---

# 33. Progress Rules

Progress hierarchy:

```text
Lesson
 ↓
Chapter
 ↓
Unit
 ↓
Course
```

Progress should be derived from completion records.

Do not trust:

```text
clientProvidedPercentage
clientProvidedRank
clientProvidedCompletion
```

as authoritative values.

---

# 34. Local Persistence Rules

Use localStorage for:

```text
Code drafts
Small progress cache
Last route
Preferences
Pending sync metadata
Test recovery metadata
```

Do not store:

```text
Passwords
Firebase private credentials
Service-account keys
Sensitive personal information
Authoritative leaderboard scores
Large datasets
```

Use IndexedDB for larger offline datasets when needed.

---

# 35. Local Draft Rule

Code drafts should save automatically.

Recommended:

```text
Editor Change
 ↓
500–1000ms debounce
 ↓
localStorage
```

A refresh must not normally destroy a student's typed code.

---

# 36. Firebase Sync Rule

Use:

```text
Local First
 ↓
Immediate UI Update
 ↓
Sync Queue
 ↓
Firebase
```

If offline:

```text
Keep local state
Queue synchronization
Sync when online
```

Never block normal learning merely because Firebase is temporarily unavailable.

---

# 37. Conflict Resolution Rule

When local and cloud state differ:

```text
Compare timestamps/version
 ↓
Determine newest valid state
 ↓
Merge where possible
 ↓
Persist resolved state
```

Never blindly overwrite cloud data with stale local state.

---

# 38. Firestore Data Ownership

Recommended:

```text
users/{uid}
users/{uid}/courseProgress/{courseId}
users/{uid}/chapterProgress/{chapterId}
users/{uid}/problemProgress/{problemId}
users/{uid}/testAttempts/{attemptId}
leaderboards/{courseId}/entries/{uid}
```

Keep documents focused.

Avoid unnecessarily large Firestore documents.

---

# 39. Leaderboard Rules

Leaderboard should reward genuine learning activity.

Preferred scoring:

```text
Verified Test Score
+
Chapter Completion
+
Unit Completion
+
Limited Consistency Bonus
```

Do not reward unlimited repeated submissions.

Prevent:

```text
easy-problem farming
refresh farming
rapid duplicate submissions
fake score writes
```

---

# 40. Leaderboard Trust Rule

A browser is not a trusted environment.

Therefore:

```text
Client Score
≠
Trusted Score
```

For MVP:

```text
Security Rules
+
App Check
+
Restricted writes
+
Randomization
+
Rate limiting
+
Risk detection
```

For future high-stakes assessment:

```text
Trusted server-side validation
```

may be introduced.

---

# 41. Bot Detection Rules

Do not claim to detect bots with certainty.

Use a risk model.

Signals may include:

```text
Submission velocity
Test completion timing
Repeated interaction patterns
App Check status
Abnormal request behavior
Account activity
```

Example:

```text
0–29
Normal

30–59
Monitor

60–79
Cooldown / Verification

80–100
Temporary leaderboard restriction
```

Risk thresholds must be configurable.

Do not delete student learning progress because of a risk event.

---

# 42. Privacy Rules

Collect only data required for:

```text
Learning
Progress
Assessment
Platform integrity
```

Do not collect unnecessarily:

```text
Clipboard contents
Full browsing history
Raw keystrokes outside the coding editor
Precise location
Invasive device fingerprinting
```

Do not use surveillance as a substitute for good assessment design.

---

# 43. Search Rules

Use Fuse.js for client-side search.

Search:

```text
Courses
Units
Chapters
Lessons
Topics
Definitions
Examples
Problems
```

Search should navigate directly to the relevant resource.

Use:

```text
Ctrl + K
```

as the preferred global search shortcut.

---

# 44. Routing Rules

Use React Router.

Keep routes predictable:

```text
/courses
/courses/:courseId
/courses/:courseId/unit/:unitId
/courses/:courseId/chapter/:chapterId
/courses/:courseId/chapter/:chapterId/lesson/:lessonId
/practice
/practice/:problemId
/tests
/progress
/leaderboard
/profile
/login
/register
```

Do not use inconsistent URL patterns.

---

# 45. Route State Rule

Important navigation state should survive:

```text
Login redirect
Refresh
Back navigation
```

Where appropriate, preserve:

```text
courseId
unitId
chapterId
lessonId
problemId
return URL
```

---

# 46. UI Rules

The product should feel:

```text
Fast
Minimal
Modern
Educational
Developer-focused
Beginner-friendly
```

Avoid:

```text
Excessive animations
Huge dashboards
Unnecessary modals
Visual clutter
Traditional institutional LMS styling
```

The content is the primary visual focus.

---

# 47. Tailwind Rules

Use Tailwind for the majority of styling.

Prefer:

```text
utility classes
shared design tokens
reusable UI components
```

Avoid:

```text
large inline style objects
random one-off CSS
multiple styling systems
```

Use custom CSS only where Tailwind is inappropriate, such as:

```text
Monaco-specific styling
Markdown typography
complex editor/output behavior
```

---

# 48. Design Consistency Rule

Use consistent:

```text
Spacing
Typography
Border radius
Buttons
Inputs
Cards
Badges
Progress indicators
Error states
Success states
```

Do not invent a new visual style for every page.

---

# 49. Accessibility Rules

Every feature should support:

```text
Keyboard navigation
Focus visibility
Semantic HTML
Accessible labels
Screen-reader compatibility
Adequate contrast
Reduced motion
```

Never communicate important information through color alone.

Example:

Bad:

```text
red = wrong
green = correct
```

Better:

```text
✗ Wrong Answer
✓ Passed
```

---

# 50. Responsive Rules

Desktop:

```text
Course Sidebar
+
Lesson
+
Editor where appropriate
```

Mobile:

```text
Header
 ↓
Navigation Drawer
 ↓
Content
 ↓
Editor
 ↓
Output
```

The primary actions must remain accessible:

```text
Run
Submit
Previous
Next
```

---

# 51. Loading State Rules

Every asynchronous page/feature must define:

```text
Loading
Ready
Empty
Error
Offline
```

Never display a blank screen while waiting for Firebase, content, or runtime initialization.

---

# 52. Error Handling Rules

Errors must be:

```text
Specific
Actionable
Non-destructive
User-friendly
```

Bad:

```text
Something went wrong.
```

Better:

```text
Your progress could not be synced.
Your local progress is safe. We'll retry automatically.
```

Preserve user work whenever possible.

---

# 53. Notifications Rules

Use Sonner or the project's approved notification system for short feedback.

Good uses:

```text
Progress saved
Achievement unlocked
Draft restored
Offline
Sync completed
Practice passed
```

Do not show repetitive notifications for every keystroke or routine operation.

---

# 54. Forms Rules

Use React Hook Form for substantial forms.

Validate structured data with Zod.

Examples:

```text
Login
Register
Profile
Content metadata
Problem creation
Test configuration
```

Do not duplicate validation rules unnecessarily.

---

# 55. Dependency Rules

Before installing a new package:

1. Check whether the current stack already solves the problem.
2. Check whether native browser APIs are sufficient.
3. Check bundle-size impact.
4. Check maintenance status.
5. Check security implications.
6. Check whether the package is necessary for MVP.

Do not add dependencies for trivial utilities.

---

# 56. No Duplicate Libraries Rule

Do not introduce multiple libraries for the same responsibility.

Examples:

```text
Do not add another router.
Do not add another state manager.
Do not add another icon library.
Do not add another Markdown renderer.
Do not add another notification system.
Do not add another date library.
```

One clear tool per responsibility.

---

# 57. Performance Rules

Always consider:

```text
Bundle size
Lazy loading
Render frequency
Memory usage
Worker lifecycle
Firestore reads/writes
Runtime loading
```

Use:

```text
Route-level lazy loading
Dynamic imports
Runtime lazy loading
Content chunking
Memoization only when justified
```

Do not optimize prematurely.

Measure before introducing complex optimization.

---

# 58. React Performance Rules

Avoid:

```text
unnecessary global state updates
large context updates
expensive computation on every render
unstable list keys
unnecessary effects
```

For lists, always use stable IDs.

Bad:

```jsx
key={index}
```

when the list can reorder.

Prefer:

```jsx
key={item.id}
```

---

# 59. Firestore Performance Rules

Avoid excessive reads.

Prefer:

```text
Focused queries
Pagination
Aggregated progress
Cached state
```

Do not subscribe to realtime listeners everywhere.

Use realtime listeners only when the UX actually benefits from realtime updates.

---

# 60. Content Loading Rules

Do not bundle all course content into the initial application load.

Prefer:

```text
Course Registry
 ↓
Selected Course
 ↓
Selected Unit
 ↓
Selected Chapter
 ↓
Required Lesson
```

Load only what the student needs.

---

# 61. Analytics Rules

Track learning events only when they serve a clear product purpose.

Useful events:

```text
lesson_started
lesson_completed
practice_started
code_executed
problem_passed
problem_failed
test_started
test_submitted
chapter_completed
unit_completed
course_completed
```

Do not collect unnecessary behavioral data.

---

# 62. Code Quality Rules

Use clear names.

Prefer:

```text
calculateProgress()
getNextLesson()
saveDraft()
syncProgress()
evaluateTest()
```

Avoid:

```text
doThing()
handleStuff()
processData2()
temp()
```

Functions should have one clear purpose.

---

# 63. File Naming Rules

Use consistent naming.

Recommended:

```text
camelCase.js
PascalCase.jsx
camelCase.js
```

Examples:

```text
ProgressBar.jsx
PracticeEditor.jsx
progressStore.js
firebaseService.js
contentLoader.js
```

Keep naming consistent throughout the repository.

---

# 64. Import Rules

Keep imports organized:

```text
External packages
 ↓
Internal aliases
 ↓
Local components
 ↓
Utilities
```

Avoid deeply nested relative imports where path aliases are appropriate.

Do not create circular dependencies.

---

# 65. Environment Variable Rules

Use Vite environment variables:

```text
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

Never commit:

```text
service account keys
private secrets
admin credentials
```

Remember that Vite `VITE_*` variables are exposed to the browser.

Never treat them as secret storage.

---

# 66. Git Rules

Use meaningful commits.

Preferred:

```text
feat: add chapter progress tracking
fix: restore practice draft after refresh
refactor: separate runtime adapter
docs: update content schema
test: add random test selection coverage
```

Avoid:

```text
update
changes
final
final2
new
test123
```

---

# 67. Pull Request Rules

Every significant PR should explain:

```text
What changed?
Why?
Which files/modules changed?
Any architectural impact?
How was it tested?
```

Before PR:

```text
npm run lint
npm run test
npm run build
npm run e2e
```

where those scripts exist.

---

# 68. Testing Rules

Every important business rule should have automated tests.

Prioritize:

```text
Progress calculation
Completion logic
Random question selection
Scoring
Content validation
Draft persistence
Sync logic
Runtime adapter
Authentication guards
Leaderboard eligibility
```

Do not test implementation details when behavior can be tested instead.

---

# 69. End-to-End Critical Path

The following must always work:

```text
Guest
 ↓
Course
 ↓
Lesson
 ↓
Login
 ↓
Practice
 ↓
Type Code
 ↓
Run
 ↓
Pass
 ↓
Chapter Progress
 ↓
Random Test
 ↓
Score
 ↓
Firebase Sync
 ↓
Leaderboard
```

Any architectural change that breaks this flow must be treated as a regression.

---

# 70. Testing the Sandbox

Test:

```text
Valid code
Syntax error
Runtime error
Infinite loop
Timeout
Large output
Empty output
Invalid input
Worker crash
Worker recreation
Multiple executions
```

The sandbox must never freeze the main React interface.

---

# 71. Testing Paste Prevention

Test:

```text
Ctrl + V
Context menu paste
Browser paste event
Programmatic clipboard attempts where applicable
Normal typing
Undo/redo
Copy tutorial text
```

The restriction must remain scoped to the challenge editor.

---

# 72. Offline Testing

Test:

```text
Open lesson offline
Type code offline
Reload offline
Complete lesson offline
Disconnect during Firebase sync
Reconnect
Verify synchronization
```

No user work should disappear.

---

# 73. Security Testing

Before production:

```text
Firestore Security Rules
Authentication rules
App Check
Unauthorized Firestore writes
Leaderboard manipulation
Progress manipulation
Content sanitization
Worker isolation
Timeout behavior
```

Never assume the client is trustworthy.

---

# 74. Markdown Security Rules

Markdown content must not become an arbitrary HTML injection vector.

Use:

```text
react-markdown
remark-gfm
rehype-sanitize where HTML is accepted
```

Do not blindly render untrusted HTML.

---

# 75. User Data Rules

Store only necessary data.

Student data should be scoped to the authenticated user's UID.

Prefer:

```text
users/{uid}/...
```

over a global document where user-specific information is exposed.

Never expose another student's private progress.

---

# 76. Leaderboard Privacy Rules

Leaderboard should expose only intended public information, for example:

```text
displayName
score
rank
course
```

Do not expose:

```text
email
UID
private test answers
private activity logs
```

unless explicitly required and authorized.

---

# 77. Admin Rules

The client-side UI is not a security boundary.

Do not rely only on:

```js
if (user.role === "admin")
```

for authorization.

Actual privileged access must be enforced by Firebase Security Rules or another trusted authorization mechanism.

---

# 78. Content IDs

IDs must be:

```text
Stable
Unique
Predictable
URL-safe
```

Example:

```text
python-unit-02-functions
python-unit-02-recursion
py-u2-gcd-01
```

Do not use array indexes as permanent content IDs.

---

# 79. Ordering Rules

Use explicit ordering metadata.

Example:

```json
{
  "id": "recursion",
  "order": 12
}
```

Do not rely on filesystem order or object property order.

---

# 80. Prerequisite Rules

Prerequisites must reference stable IDs.

Example:

```json
{
  "prerequisites": [
    "variables",
    "expressions"
  ]
}
```

Build validation must detect broken references.

---

# 81. Content Build Validation

Before deployment:

```text
Load all content
 ↓
Validate schemas
 ↓
Check duplicate IDs
 ↓
Check broken references
 ↓
Check prerequisites
 ↓
Check course hierarchy
 ↓
Check problem/test definitions
 ↓
Build
```

Invalid content should fail CI.

---

# 82. Documentation Rules

When changing architecture, update the relevant Markdown documentation.

At minimum:

```text
PRD
TECHSTACK
WEBSITE_WORKFLOW
RULES
```

Do not allow implementation and documentation to drift indefinitely.

---

# 83. Change Management Rule

Before a major architectural change:

```text
Identify current architecture
 ↓
Identify problem
 ↓
Evaluate alternatives
 ↓
Choose solution
 ↓
Update documentation
 ↓
Implement
 ↓
Test
```

Do not replace core infrastructure simply because another library is popular.

---

# 84. Feature Implementation Workflow

Every feature should follow:

```text
Understand Requirement
        ↓
Check Existing Architecture
        ↓
Identify Affected Modules
        ↓
Design Data Flow
        ↓
Implement Smallest Correct Change
        ↓
Write/Update Tests
        ↓
Run Validation
        ↓
Check Responsive UI
        ↓
Check Accessibility
        ↓
Update Documentation
```

---

# 85. Do Not Over-Engineer MVP

Do not build:

```text
Microservices
Custom API
Complex event bus
GraphQL
Distributed cache
Custom CMS
AI tutor
Real-time classroom
Complex recommendation engine
```

unless the requirement actually demands it.

Prefer simple architecture that can evolve.

---

# 86. Do Not Under-Engineer Security

Even without a custom backend:

```text
Firebase Security Rules
App Check
Authentication
Input validation
Sandbox isolation
Rate limiting
Risk detection
```

must be implemented properly.

"No backend" does not mean "no security."

---

# 87. Do Not Trust Client-Side State

Never assume these are trustworthy:

```text
localStorage
Zustand
URL parameters
React state
client score
client completion percentage
client rank
```

Validate important values before writing authoritative Firebase records.

---

# 88. User Experience Rule

Never punish the student for technical failures.

If:

```text
Firebase fails
runtime fails
network disconnects
page refreshes
```

preserve:

```text
draft
learning state
pending progress
test recovery state
```

when technically possible.

---

# 89. Learning Integrity Rule

Anti-cheat features should not damage normal learning.

Prefer:

```text
Randomization
Feedback
Attempt limits
Rate limiting
Paste prevention
Risk scoring
```

over:

```text
aggressive surveillance
unexplained blocking
data collection
```

Students should understand why a legitimate restriction exists.

---

# 90. Error Message Rule

Errors should never shame the learner.

Avoid:

```text
You failed.
You cheated.
Bad code.
Invalid student.
```

Prefer:

```text
Your solution did not pass this test.
Review the loop condition and try again.
```

For suspicious activity:

```text
This activity needs additional verification before leaderboard points can be awarded.
```

---

# 91. Accessibility Rule for Code Learning

Important code/test information must not rely exclusively on:

```text
color
animation
position
icons
```

Provide text equivalents:

```text
✓ Passed
✗ Failed
⚠ Warning
🔒 Locked
```

---

# 92. Mobile Coding Rule

The coding interface must remain usable on smaller screens.

Prioritize:

```text
Editor
Run
Output
Tests
Submit
```

Avoid requiring horizontal page scrolling for normal actions.

---

# 93. Browser Compatibility Rule

Support modern:

```text
Chrome
Edge
Firefox
Safari
```

Because browser-side execution is central to the platform, test the actual runtime independently from the general UI.

---

# 94. Deployment Rules

Production deployment should occur only after:

```text
Lint
 ↓
Tests
 ↓
Content Validation
 ↓
Build
 ↓
E2E
 ↓
Deploy
```

Do not deploy known broken content.

---

# 95. Environment Separation

Maintain separate Firebase environments where practical:

```text
Development
Staging
Production
```

Never use production data for routine local development.

Use Firebase Emulator Suite during development.

---

# 96. Branching Rules

Recommended:

```text
main
develop
feature/*
fix/*
refactor/*
docs/*
```

Keep production branch stable.

---

# 97. AI Coding Assistant Rules

If an AI coding assistant is used in this repository:

### Before editing

It must:

1. Inspect relevant existing files.
2. Understand current patterns.
3. Reuse existing components/utilities.
4. Check project documentation.
5. Avoid unnecessary dependencies.

### During editing

It must:

- Make minimal targeted changes.
- Preserve existing behavior.
- Follow naming conventions.
- Follow the established architecture.
- Avoid unrelated refactoring.
- Avoid changing configuration without reason.

### After editing

It must:

```text
Check syntax
Run lint
Run relevant tests
Run build where appropriate
Review changed files
Report any remaining issues
```

Do not claim a feature is complete if validation has not been performed.

---

# 98. AI Must Not Invent Project APIs

Before using:

```text
service
hook
utility
store
component
Firebase collection
runtime
```

search the repository first.

Do not invent APIs such as:

```text
useLearningAPI()
progressService.complete()
firebase.admin()
```

unless they actually exist or are being intentionally introduced.

---

# 99. AI Must Not Rewrite Large Files Unnecessarily

Prefer:

```text
small patch
targeted refactor
incremental change
```

Avoid replacing an entire file when only a small change is needed.

This reduces:

```text
regressions
merge conflicts
unintended behavior changes
```

---

# 100. AI Must Preserve Existing User Work

When modifying:

```text
editor
progress
test session
content
Firestore sync
```

ensure existing drafts and progress remain compatible.

Never silently change storage keys or schemas without a migration strategy.

---

# 101. Migration Rules

When changing stored data:

```text
Old Schema
 ↓
Detect Version
 ↓
Migrate
 ↓
Save New Schema
```

Example:

```text
progressVersion: 1
        ↓
migration
        ↓
progressVersion: 2
```

Do not assume all users have the newest localStorage state.

---

# 102. Backward Compatibility

Content URLs, problem IDs, and important progress identifiers should remain stable.

When renaming:

```text
course
unit
chapter
lesson
problem
```

provide migration/redirect logic where required.

---

# 103. Performance Budget Mindset

Every new feature should answer:

```text
Does this increase initial bundle size?
Does it add network requests?
Does it add Firestore reads?
Does it block rendering?
Does it load a runtime?
Does it increase memory usage?
```

Prefer lazy loading for expensive features.

---

# 104. Firebase Cost Awareness

Firestore reads/writes can create operational cost.

Avoid:

```text
write on every keystroke
realtime listener for every component
unbounded queries
duplicate progress writes
```

Code drafts belong in localStorage, not Firestore on every keystroke.

---

# 105. Code Execution Cost Rule

For browser execution:

```text
Load runtime once per session where practical
Reuse worker when safe
Terminate on timeout
Avoid unnecessary runtime reloads
```

Do not initialize Pyodide repeatedly for every keystroke.

---

# 106. Test Attempt Rules

Track:

```text
attempt count
best result
latest result
completion
timestamp
```

Do not award unlimited leaderboard points for attempts.

Practice can allow more attempts than assessment.

---

# 107. Completion Rules

Default model:

```text
Required Lessons Complete
+
Required Practice
+
Assessment Passed
=
Chapter Complete
```

```text
Required Chapters Complete
+
Unit Assessment Passed
=
Unit Complete
```

```text
All Units Complete
+
Course Assessment Passed
=
Course Complete
```

Thresholds must remain configurable.

---

# 108. Achievement Rules

Achievements should be triggered by learning events.

Example:

```text
problem_passed
 ↓
Achievement Engine
 ↓
Check conditions
 ↓
Unlock if eligible
```

Do not make achievements dependent on fragile UI state.

---

# 109. Analytics Rules

Analytics should support decisions.

Good:

```text
Most failed chapter
Average test score
Practice pass rate
Course completion
CO mastery
```

Avoid collecting metrics simply because they are technically easy to collect.

---

# 110. Future Expansion Rule

The architecture must allow:

```text
New Course
New Unit
New Chapter
New Language
New Runtime
New Assessment Type
New Achievement
```

without rewriting the entire application.

The extension mechanism should primarily be:

```text
Content
+
Metadata
+
Runtime Adapter
+
Feature Module
```

---

# 111. Definition of Done

A feature is not complete until:

```text
[ ] Requirement implemented
[ ] Existing architecture preserved
[ ] Responsive UI checked
[ ] Accessibility checked
[ ] Loading state added
[ ] Error state added
[ ] Empty state added where relevant
[ ] Offline behavior considered
[ ] Security considered
[ ] Tests added/updated
[ ] Lint passes
[ ] Build passes
[ ] Documentation updated
```

---

# 112. Final Engineering Principles

Always prefer:

```text
Simple over clever
Reusable over duplicated
Typed/validated data over assumptions
Local-first UX over fragile network dependence
Secure defaults over client trust
Progressive learning over information overload
Reusable runtimes over language-specific UI
Content-driven architecture over hard-coded lessons
Measured optimization over premature optimization
```

---

# 113. Non-Negotiable Rules

These rules must not be violated without explicit approval:

```text
1. Do not add a custom backend to MVP.
2. Do not execute student code directly on the React main thread.
3. Do not trust client-side leaderboard scores.
4. Do not store secrets in frontend code.
5. Do not hard-code Python-specific logic into generic LMS components.
6. Do not store code drafts in Firestore on every keystroke.
7. Do not globally disable clipboard functionality.
8. Do not expose private student data through leaderboard queries.
9. Do not silently break existing progress/local storage.
10. Do not deploy invalid course content.
11. Do not add dependencies without justification.
12. Do not rewrite unrelated code during feature work.
13. Do not remove security checks to make a feature easier.
14. Do not sacrifice accessibility for visual design.
15. Do not sacrifice student work because of network/runtime failures.
16. Do not treat bot detection as perfect.
17. Do not treat paste blocking as complete anti-cheat protection.
18. Do not make tutorial content dependent on a specific UI component.
19. Do not put authoritative business logic only in React state.
20. Keep the LMS architecture language- and course-agnostic.
```

---

# 114. Final Architecture Reference

```text
                         CODEPATH LMS
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
       CONTENT             LEARNING            PRACTICE
          │                   │                   │
   Markdown / JSON        Progress             Monaco
          │                   │                   │
          │              Local Cache              ▼
          │                   │              Execution Manager
          │                   │                   │
          │                   │                Worker
          │                   │                   │
          │                   │                Runtime
          │                   │
          └───────────────────┼───────────────────┘
                              │
                       ASSESSMENT ENGINE
                              │
                     ┌────────┴────────┐
                     │                 │
                  Results          Integrity
                     │                 │
                     ▼                 ▼
                 Progress        Risk Detection
                     │
             ┌───────┴────────┐
             │                │
          Browser          Firebase
           Cache           Firestore
                              │
                    ┌─────────┴─────────┐
                    │                   │
               Leaderboard          Analytics
```

The product must remain:

```text
React SPA
+
Tailwind
+
Firebase BaaS
+
Static Content
+
Browser Runtime
+
Local Persistence
```

The student experience must remain:

```text
LEARN
 ↓
PRACTICE
 ↓
TEST
 ↓
IMPROVE
 ↓
PROGRESS
 ↓
CONTINUE
```

---

# 115. Rule Priority

When rules conflict, use this priority:

```text
1. Security
2. User data preservation
3. Functional correctness
4. Project architecture
5. Learning experience
6. Accessibility
7. Performance
8. Maintainability
9. Visual polish
10. Convenience
```

Never sacrifice security or user data integrity merely to simplify implementation.

---

# 116. Repository Rule

This file should live at the repository root:

```text
/
├── RULES.md
├── README.md
├── package.json
├── vite.config.js
├── firebase.json
├── firestore.rules
├── src/
├── content/
└── tests/
```

All contributors and AI coding tools should treat `RULES.md` as the default project-level engineering contract.
