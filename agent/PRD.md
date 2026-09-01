# LMS PRD — CodePath LMS
## Multi-Language, Tutorial-First Programming Learning Platform

**Document Type:** Product Requirements Document  
**Version:** 1.0  
**Status:** Initial Architecture & Product Specification  
**Primary Launch Course:** 19AI301 / CS3301 — Python Programming  
**Future Scope:** Multiple programming languages, subjects, courses, assessments, and learning tracks

---

## 1. Product Overview

### 1.1 Product Vision

Build a tutorial-first Learning Management System (LMS) inspired by the simplicity and discoverability of platforms such as W3Schools, but designed specifically for structured academic learning.

The platform should take a student from **absolute beginner → concept understanding → guided coding → practice → chapter assessment → unit mastery → course completion**.

The first course is **19AI301 / CS3301 — Python Programming**. The supplied syllabus describes a 60-period course divided into five 12-period units:

1. Data Types, Expressions, Statements
2. Control Flow, Functions
3. Lists, Tuples, Dictionaries
4. Files, Modules, Packages
5. NumPy, Data Frame

The syllabus also defines five course outcomes (CO1–CO5), progressing from writing simple Python programs through conditionals/loops, data structures, files/modules/packages, and NumPy/data-frame data processing.

The platform must therefore model learning at multiple levels:

```text
Course
 └── Unit
      └── Chapter
           └── Topic
                ├── Lesson
                ├── Example
                ├── Practice
                ├── Random Test
                └── Completion
```

The source syllabus explicitly states that the course has no prerequisite and aims to provide hands-on Python programming experience, including programming constructs and packages such as NumPy and pandas. [Source: supplied syllabus]

### 1.2 Product Goals

- Provide a structured tutorial experience from basics to advanced concepts.
- Cover all five units of the supplied Python syllabus.
- Make every topic independently learnable.
- Allow users to read course material without an account.
- Require login for coding practice, tests, progress persistence, and leaderboard participation.
- Provide browser-based code execution in a restricted sandbox.
- Prevent direct code pasting into practice editors.
- Store practice answers locally in the browser.
- Store authenticated progress, scores, section completion, and chapter completion in Firebase.
- Mirror important progress locally for resilience/offline-friendly UX.
- Provide randomized chapter tests using predefined test cases.
- Provide a leaderboard with anti-abuse controls.
- Make the content architecture language-agnostic so Python is only the first supported language.
- Allow administrators/developers to add courses and content through manually maintained content files and deployment, without requiring a complex CMS initially.
- Keep the architecture ready for future languages such as C, C++, Java, JavaScript, SQL, and others.

### 1.3 Non-Goals for Version 1

- No live teacher classroom functionality.
- No video-hosting platform.
- No paid subscriptions.
- No marketplace for courses.
- No user-generated public courses.
- No unrestricted arbitrary code execution on a server.
- No guarantee that client-side anti-cheat mechanisms can make a leaderboard mathematically cheat-proof.
- No full visual CMS in the initial release.
- No requirement for real-time multiplayer coding.

---

# 2. Source Curriculum Mapping

## 2.1 Course Metadata

| Field | Value |
|---|---|
| Course Code | 19AI301 / CS3301 |
| Course Name | Python Programming |
| Programme | B.Tech Artificial Intelligence and Data Science |
| L-T-P-C | 2-0-2-3 |
| Prerequisite | Nil |
| Total Periods | 60 |
| Units | 5 |
| Periods per Unit | 12 |

The syllabus identifies the course outcomes as:

- **CO1:** Read and write simple Python programs — Understand
- **CO2:** Develop Python programs with conditionals and loops — Create
- **CO3:** Use Python data structures such as lists, tuples, dictionaries — Apply
- **CO4:** Use files, modules and packages — Apply
- **CO5:** Use NumPy and data frame for data processing — Apply

These should become first-class learning analytics dimensions in the LMS.

## 2.2 Unit Structure

### Unit I — Data Types, Expressions, Statements

Topics from the syllabus:

- Python interpreter and interactive mode
- Values and types
- int
- float
- boolean
- string
- list
- variables
- expressions
- statements
- tuple assignment
- operator precedence
- comments
- modules and functions
- function definition and use
- flow of execution
- parameters and arguments

Illustrative programs:

- Exchange values of two variables
- Circulate values of n variables
- Distance between two points

**Learning target:** CO1

### Unit II — Control Flow, Functions

Topics:

- Boolean values and operators
- if
- if-else
- if-elif-else
- iteration/state
- while
- for
- break
- continue
- pass
- fruitful functions
- return values
- parameters
- local and global scope
- function composition
- recursion
- strings
- string slices
- immutability
- string functions and methods
- string module
- lists as arrays

Illustrative programs:

- Square root
- GCD
- Exponentiation
- Sum of an array
- GCD of two numbers
- Square root using Newton's method

**Learning target:** CO2

### Unit III — Lists, Tuples, Dictionaries

Topics:

- List operations
- List slices
- List methods
- List loops
- Mutability
- Aliasing
- Cloning lists
- List parameters
- Tuple assignment
- Tuples as return values
- Dictionary operations
- Dictionary methods
- List comprehension

Illustrative programs:

- Selection sort
- Insertion sort
- Merge sort
- Histogram
- Maximum of a list
- Linear search
- Binary search
- Selection sort
- Insertion sort

**Learning target:** CO3

### Unit IV — Files, Modules, Packages

Topics:

- Text files
- Reading files
- Writing files
- Format operator
- Command-line arguments
- Errors
- Exceptions
- Exception handling
- Modules
- Packages
- Classes
- Objects

Illustrative programs:

- Word count
- Copy file
- Command-line word-count program

**Learning target:** CO4

### Unit V — NumPy, Data Frame

Topics:

- Creating NumPy arrays
- Array shape
- Reshaping
- Indexing
- Slicing
- Mathematics with NumPy arrays
- Basic arithmetic operations
- Pandas Series
- DataFrame
- Selection and indexing
- Missing data
- Merging
- Joining
- Concatenating
- GroupBy
- Apply functions
- Sorting
- File read/write

Illustrative programs:

- Matrix multiplication
- Matrix inverse
- Verification using loops/library functions
- Read and process CSV data

**Learning target:** CO5

The supplied concept map also connects Python Programming with Data Types, Expressions, Statements, Control Flow, Functions, Modules, Classes/Objects, NumPy, and DataFrame concepts. This should be reflected in the platform's course map and prerequisite relationships.

---

# 3. Product Experience

## 3.1 Core Learning Loop

Every chapter should follow the same learning pattern:

```text
Learn
  ↓
Understand
  ↓
See Example
  ↓
Try It Yourself
  ↓
Practice Questions
  ↓
Random Test
  ↓
Chapter Completion
  ↓
Unit Progress
  ↓
Course Progress
```

The UI should make this loop obvious without overwhelming beginners.

## 3.2 Beginner-to-Advanced Progression

Each chapter should contain three levels:

### Level 1 — Foundation

- Simple explanation
- Terminology
- Syntax
- Small examples
- Visual explanations
- Common mistakes

### Level 2 — Practice

- Guided examples
- Fill/modify code
- Small coding problems
- Expected output
- Test cases
- Error explanations

### Level 3 — Application

- Multi-concept problems
- Realistic programming tasks
- Edge cases
- Optimization hints
- Randomized assessment
- Challenge problems

A student should not be required to understand advanced topics before completing the foundations.

---

# 4. Information Architecture / Site Map

```text
/
├── Home
├── Courses
│   ├── Course Catalog
│   └── Course Detail
│       ├── Overview
│       ├── Syllabus
│       ├── Learning Path
│       └── Progress
│
├── Learn
│   └── Course
│       ├── Unit I
│       │   ├── Chapter
│       │   │   ├── Lesson
│       │   │   ├── Examples
│       │   │   ├── Practice
│       │   │   └── Test
│       │   └── ...
│       ├── Unit II
│       ├── Unit III
│       ├── Unit IV
│       └── Unit V
│
├── Practice
│   ├── Practice Dashboard
│   ├── Coding Problems
│   ├── Random Practice
│   └── Test History
│
├── Tests
│   ├── Chapter Tests
│   ├── Unit Tests
│   └── Random Test
│
├── Progress
│   ├── Course Progress
│   ├── Unit Progress
│   ├── Chapter Progress
│   ├── Skills
│   └── Test History
│
├── Leaderboard
│   ├── Overall
│   ├── Course
│   ├── Unit
│   └── Weekly/Monthly
│
├── Profile
│   ├── Account
│   ├── Achievements
│   └── Learning Statistics
│
├── Login / Register
├── Search
├── About
├── Help
└── Admin/Developer Documentation
```

---

# 5. Page Requirements

## 5.1 Home Page

Purpose: Introduce the platform and direct students to learning.

Sections:

- Hero section
- "Start Learning" CTA
- Featured courses
- Beginner-friendly explanation
- How the platform works
- Course categories
- Coding practice preview
- Progress/achievement preview
- Leaderboard preview
- Future language/course support
- Footer

Primary CTA:

> Start Learning

Secondary CTA:

> Explore Courses

Login should not be mandatory merely to browse.

---

## 5.2 Course Catalog

Display:

- Course title
- Course code
- Subject
- Description
- Difficulty
- Number of units
- Number of chapters
- Estimated learning time
- Language
- Progress if logged in

Example:

```text
Python Programming
19AI301 / CS3301

5 Units
60 Academic Periods
Beginner → Intermediate → Applied

[Start Learning]
```

---

## 5.3 Course Overview

Show:

- Course description
- Prerequisites
- Course outcomes
- Unit list
- Learning objectives
- Syllabus mapping
- Course progress
- Recommended learning sequence

The first course should clearly state that the syllabus prerequisite is "Nil".

---

# 6. Tutorial Lesson Architecture

Each lesson page should use a predictable two-column/three-region layout.

```text
┌───────────────────────────────────────────────┐
│ Header / Course / Search / Profile             │
├───────────────┬───────────────────────────────┤
│ Course Nav    │ Lesson Content                 │
│               │                               │
│ Unit I        │ Concept                       │
│ Chapter       │ Example                       │
│ Chapter       │ Explanation                   │
│ ✓ Completed   │ Practice                      │
│               │                               │
│               │ [Run Code]                    │
│               │                               │
│               │ [Previous] [Next]              │
└───────────────┴───────────────────────────────┘
```

### Lesson Content Blocks

Supported blocks:

- `heading`
- `paragraph`
- `note`
- `warning`
- `tip`
- `definition`
- `syntax`
- `code`
- `output`
- `interactive_code`
- `diagram`
- `table`
- `example`
- `challenge`
- `quiz`
- `summary`
- `common_mistakes`
- `next_topic`

This allows the content engine to remain independent of any specific subject.

---

# 7. Coding Playground

## 7.1 Requirement

Authenticated users can practice code directly inside the browser.

Unauthenticated users can see examples and lesson content but should receive a login prompt when attempting persistent practice/testing.

## 7.2 Editor Requirements

Use a professional browser code editor such as Monaco Editor or CodeMirror.

Features:

- Syntax highlighting
- Line numbers
- Auto indentation
- Error display
- Reset code
- Run
- Clear output
- Test input
- Test output
- Execution status
- Keyboard shortcuts
- Theme support
- Paste prevention
- Copy behavior configurable by content type

## 7.3 Paste Restriction

The practice environment should prevent code being pasted into the coding challenge editor.

Rules:

- Intercept `paste` events in the editor.
- Prevent insertion of clipboard text.
- Show a non-blocking message:

> Pasting code is disabled for practice challenges. Type your solution to continue.

- Allow normal keyboard typing.
- Allow editor-internal operations required for undo/redo.
- Do not attempt to disable clipboard functionality for the entire website.
- Do not prevent copying normal tutorial explanations.
- The restriction applies only to challenge/test code editors.

### Important Security Constraint

Paste prevention is a **learning-integrity control**, not a cryptographic anti-cheat mechanism. A browser cannot guarantee that a determined user will type every character manually.

The platform should therefore combine:

- paste prevention
- focus/interaction tracking
- abnormal submission-rate detection
- test-attempt limits
- server-side score validation where applicable
- suspicious-activity flags

---

# 8. Code Execution Sandbox

## 8.1 Architecture Principle

Code must never execute with unrestricted access to the extension/application host.

The execution engine should be isolated from the application UI and Firebase credentials.

Recommended initial architecture for Python:

```text
React UI
   │
   ▼
Code Editor
   │
   ▼
Execution Manager
   │
   ▼
Web Worker
   │
   ▼
Python Runtime / Pyodide
   │
   ├── stdout
   ├── stderr
   ├── timeout
   └── result
```

For languages that cannot reasonably execute safely in-browser, use a future isolated execution service. The platform's content schema should not depend on the execution implementation.

## 8.2 Sandbox Rules

Every execution must have:

- Maximum execution time
- Memory-conscious execution
- No access to browser DOM
- No access to Firebase credentials
- No unrestricted network access
- Controlled stdin
- Controlled stdout/stderr
- Execution status
- Reset capability
- Worker termination on timeout

Example execution states:

```text
IDLE
RUNNING
PASSED
FAILED
TIMEOUT
RUNTIME_ERROR
SYNTAX_ERROR
SANDBOX_ERROR
```

## 8.3 Language Runtime Abstraction

Never hard-code Python assumptions into the challenge UI.

Define:

```ts
interface LanguageRuntime {
  id: string;
  version: string;
  execute(input: ExecutionRequest): Promise<ExecutionResult>;
  validate(source: string): ValidationResult;
}
```

Future runtimes:

```text
python
javascript
java
cpp
c
sql
```

---

# 9. Practice Problem Model

Each coding problem should contain:

```ts
{
  id: "py-u2-ch04-p01",
  language: "python",
  unitId: "unit-2",
  chapterId: "functions",
  difficulty: "easy",
  title: "Compute GCD",
  description: "...",
  starterCode: "...",
  allowedInput: "...",
  visibleExamples: [...],
  hiddenTests: [...],
  expectedOutputRules: "...",
  timeLimitMs: 2000,
  attemptsAllowed: 10,
  tags: ["functions", "recursion", "gcd"],
  skills: ["function-definition", "return-value"],
  coMapping: ["CO2"]
}
```

---

# 10. Test System

## 10.1 Test Types

### A. Topic Quiz

Simple conceptual questions.

Examples:

- Multiple choice
- True/false
- Output prediction
- Match syntax
- Identify errors

### B. Coding Practice

Student writes a program and runs test cases.

### C. Chapter Test

Randomly generated from the chapter's question pool.

### D. Unit Test

Combines multiple chapters in a unit.

### E. Course Assessment

Combines all five units.

---

# 11. Random Test Engine

## 11.1 Purpose

The random test module should prevent students from simply memorizing a fixed answer sequence.

Each chapter should have a question bank.

Example:

```text
Chapter: Conditional Statements

Question Bank:
  Q01
  Q02
  Q03
  Q04
  Q05
  Q06
  Q07
  Q08
  Q09
  Q10

Random Test:
  Select 5 questions
  1 easy
  2 medium
  2 application
```

## 11.2 Selection Algorithm

```text
1. Load eligible question pool.
2. Filter by chapter/topic.
3. Filter by difficulty distribution.
4. Exclude recently attempted questions where possible.
5. Randomize questions.
6. Randomize option order for MCQs.
7. Create test session.
8. Store test session locally.
9. Evaluate answers.
10. Calculate score.
11. Save completion/progress.
```

## 11.3 Test Quality

Questions should be tagged:

```text
concept
syntax
output
debugging
coding
application
edge-case
algorithm
```

This makes it possible to build balanced assessments.

---

# 12. Progress Tracking

## 12.1 Progress Levels

Track progress at:

```text
Course
 ├── Unit
 │    ├── Chapter
 │    │    ├── Topic
 │    │    │    └── Lesson
 │    │    └── Chapter Test
 │    └── Unit Test
 └── Course Completion
```

## 12.2 Completion Rules

A lesson can be marked completed when:

- Required content has been opened/read, and/or
- Required interactive activity is completed.

A chapter becomes complete when:

- Required lessons are complete.
- Required practice threshold is reached.
- Chapter test is passed.

A unit becomes complete when:

- All required chapters are complete.
- Unit assessment is passed.

Course completion:

- All five units complete.
- Required course-level assessment passed.

Thresholds should be configurable in the content metadata rather than hard-coded.

---

# 13. Local Storage Strategy

## 13.1 Purpose

LocalStorage should provide fast client-side persistence and recovery.

Store:

- Draft code
- Practice answers
- Current lesson
- Last visited position
- Local progress mirror
- Test session recovery metadata
- UI preferences
- Recently attempted challenges

Example:

```text
lms:progress:{userId}
lms:draft:{problemId}
lms:test:{testSessionId}
lms:last-route
lms:preferences
```

Do not store:

- Firebase passwords
- Authentication tokens manually
- Sensitive personal information
- Trusted leaderboard scores as the only source of truth

## 13.2 Draft Persistence

When the student types code:

```text
Editor Change
    ↓
Debounce 500–1000ms
    ↓
Save draft locally
```

On reload:

```text
Load challenge
    ↓
Find local draft
    ↓
Restore draft
    ↓
Student continues
```

## 13.3 Answer Storage

For every practice challenge:

```ts
{
  problemId,
  code,
  attempts,
  lastOutput,
  passed,
  updatedAt
}
```

This is stored locally first.

---

# 14. Firebase Architecture

Firebase should be the authenticated persistence layer for durable student progress.

Recommended services:

- Firebase Authentication
- Cloud Firestore
- Firebase App Check
- Cloud Functions where secure server-side validation is necessary
- Firebase Hosting if desired

## 14.1 Authentication

Support:

- Email/password
- Google sign-in
- Future institutional authentication

Anonymous browsing is allowed.

Login is required for:

- Code practice
- Test submission
- Progress synchronization
- Leaderboard
- Achievements

## 14.2 Firestore Data Model

```text
users/{userId}
  profile
  createdAt
  lastActiveAt

users/{userId}/courseProgress/{courseId}
  completionPercent
  completedUnits
  completedChapters
  totalScore
  lastAccessedAt

users/{userId}/problemProgress/{problemId}
  attempts
  passed
  bestScore
  completedAt

users/{userId}/testAttempts/{attemptId}
  testId
  courseId
  unitId
  chapterId
  score
  maxScore
  passed
  submittedAt
  duration

leaderboards/{courseId}/entries/{userId}
  displayName
  score
  completedUnits
  completedChapters
  rankScore
  updatedAt

courses/{courseId}
  metadata

courses/{courseId}/units/{unitId}
  metadata

courses/{courseId}/chapters/{chapterId}
  metadata
```

---

# 15. Local + Firebase Synchronization

## 15.1 Source-of-Truth Model

Use a hybrid strategy:

```text
Local Storage
    ↓
Fast UI / Draft Recovery
    ↓
Sync Queue
    ↓
Firebase
    ↓
Durable Progress
```

For authenticated progress:

**Firebase is the authoritative server-side record.**

LocalStorage is the immediate client cache.

## 15.2 Sync Rules

When an authenticated user completes a lesson:

```text
1. Update local progress immediately.
2. Add sync operation to local queue.
3. Send update to Firebase.
4. Firebase confirms write.
5. Mark operation synchronized.
6. Resolve conflicts using server timestamps/version.
```

If offline:

```text
Complete Lesson
      ↓
Local update
      ↓
Sync queue
      ↓
Internet returns
      ↓
Firebase sync
```

---

# 16. Security Rules

Students must not be able to directly modify authoritative score fields.

Avoid client-write access such as:

```text
totalScore: 999999
rank: 1
completedCourse: true
```

Instead:

```text
Student
  ↓
Submit Test
  ↓
Validated Submission
  ↓
Trusted Score Update
```

Where possible, use Firebase security rules and Cloud Functions for score-bearing operations.

The client may propose an event, but the server should determine the final authoritative score.

---

# 17. Leaderboard System

## 17.1 Purpose

Encourage healthy learning competition without making speed the only measure of success.

## 17.2 Leaderboard Types

- Global leaderboard
- Course leaderboard
- Unit leaderboard
- Weekly leaderboard
- Monthly leaderboard
- Personal rank

## 17.3 Ranking Score

Recommended model:

```text
Leaderboard Score =
  Verified Test Score
  + Chapter Completion Bonus
  + Unit Completion Bonus
  + Consistency Bonus
```

Do not award large points merely for repeated submissions.

Example:

```text
Chapter Test:
  Score: 90/100
  Rank Points: 90

Repeated failed attempt:
  Rank Points: 0

Improvement:
  Small improvement bonus
```

## 17.4 Anti-Farming Rules

Prevent:

- Repeatedly submitting the same easy challenge for points.
- Refreshing/reloading to duplicate rewards.
- Manipulating LocalStorage.
- Writing directly to Firestore score fields.
- Creating multiple fake accounts to inflate activity.
- Automated high-frequency submissions.

---

# 18. Bot Detection & Learning Integrity

## 18.1 Objective

Detect suspicious automated activity without treating normal students as bots.

The system should use a **risk-scoring model**, not a single binary "human/bot" flag.

## 18.2 Signals

Potential signals:

- Extremely high submission frequency
- Unrealistically fast test completion
- Repeated identical event sequences
- Large numbers of requests within a short interval
- Headless/browser automation indicators where available
- App Check failures
- Suspicious account creation patterns
- Repeated leaderboard manipulation attempts
- Impossible interaction timing

Do not rely on invasive fingerprinting as the primary method.

## 18.3 Risk Score

```text
riskScore =
  submissionVelocity
+ testTimingAnomaly
+ duplicatePattern
+ AppCheckRisk
+ accountRisk
```

Classification:

```text
0–29   Normal
30–59  Monitor
60–79  Challenge / Rate Limit
80–100 Temporary Restriction
```

Thresholds must be configurable.

## 18.4 Actions

Depending on risk:

```text
Normal
 → normal experience

Monitor
 → silently log event

Challenge
 → require additional verification / cooldown

High Risk
 → temporarily restrict leaderboard submissions
```

Never delete student learning progress simply because a bot signal was triggered.

---

# 19. Anti-Cheat Architecture

The platform cannot completely prevent cheating in a client-executed coding environment.

Therefore separate:

### Learning Controls

- Paste prevention
- Attempt limits
- Hints
- Progressive difficulty
- Practice history

### Assessment Controls

- Hidden tests
- Randomized questions
- Randomized test data
- Server-side score validation
- Time limits
- Rate limits

### Platform Security

- Firebase Auth
- Firestore security rules
- Firebase App Check
- Cloud Functions
- Audit logs

---

# 20. Content Management — Manual Developer Workflow

Version 1 should not require a database-backed CMS.

Course content should be stored as version-controlled source files.

Recommended:

```text
content/
├── courses/
│   └── python-programming/
│       ├── course.json
│       ├── unit-01/
│       │   ├── unit.json
│       │   ├── 01-interpreter/
│       │   │   ├── lesson.md
│       │   │   ├── examples.json
│       │   │   └── problems.json
│       │   └── ...
│       ├── unit-02/
│       ├── unit-03/
│       ├── unit-04/
│       └── unit-05/
│
└── languages/
    ├── python.json
    ├── javascript.json
    └── ...
```

## 20.1 Content Update Workflow

```text
Developer edits Markdown/JSON
        ↓
Validate content schema
        ↓
Run tests
        ↓
Build application
        ↓
Deploy
        ↓
New course content available
```

This satisfies the requirement that administrators/developers can add data manually through code/content updates.

## 20.2 Future CMS

Later, build:

```text
Admin Dashboard
  ├── Courses
  ├── Units
  ├── Chapters
  ├── Lessons
  ├── Questions
  ├── Tests
  ├── Users
  └── Analytics
```

The initial content schema should already support this future migration.

---

# 21. Content Schema

Example course:

```json
{
  "id": "python-programming",
  "code": "19AI301-CS3301",
  "title": "Python Programming",
  "language": "python",
  "level": "beginner-to-applied",
  "units": 5,
  "periods": 60,
  "prerequisite": null,
  "outcomes": ["CO1", "CO2", "CO3", "CO4", "CO5"]
}
```

Example chapter:

```json
{
  "id": "python-variables",
  "title": "Variables",
  "unitId": "unit-01",
  "order": 2,
  "difficulty": "beginner",
  "outcomes": ["CO1"],
  "prerequisites": ["python-values-types"],
  "lessons": [
    "introduction",
    "examples",
    "practice",
    "challenge"
  ]
}
```

---

# 22. Learning Graph

The system should maintain prerequisite relationships.

Example:

```text
Values & Types
      ↓
Variables
      ↓
Expressions
      ↓
Statements
      ↓
Conditions
      ↓
Loops
      ↓
Functions
      ↓
Data Structures
      ↓
Files & Modules
      ↓
NumPy
      ↓
Pandas DataFrame
```

Each chapter can declare:

```json
{
  "prerequisites": [
    "variables",
    "expressions"
  ]
}
```

This enables future adaptive learning.

---

# 23. Search

Global search should search:

- Courses
- Units
- Chapters
- Topics
- Definitions
- Code examples
- Problems

Example:

```text
Search: "recursion"

Results:
Unit II
  Functions
  Recursion
  GCD using recursion
  Newton's method
```

Search should support keyboard shortcut:

```text
Ctrl + K
```

---

# 24. Navigation

Use three levels of navigation.

### Global Navigation

```text
Home
Courses
Practice
Leaderboard
Progress
```

### Course Navigation

```text
Python Programming
 ├── Unit I
 ├── Unit II
 ├── Unit III
 ├── Unit IV
 └── Unit V
```

### Lesson Navigation

```text
Previous Topic
Next Topic
Chapter Contents
Progress
```

The student should never become lost inside a chapter.

---

# 25. Student Dashboard

After login:

```text
Welcome back

Continue Learning
[Unit II → Functions]

Course Progress
██████████░░░░ 64%

Current Streak
5 days

Completed
42 chapters

Practice
73 problems

Average Test Score
84%

Leaderboard
#12
```

Sections:

- Continue learning
- Overall progress
- Current course
- Recent activity
- Test performance
- Practice statistics
- Achievements
- Leaderboard rank

---

# 26. Chapter Dashboard

Each chapter should display:

```text
Chapter: Functions

Progress: 65%

Lessons
✓ Introduction
✓ Function Definition
✓ Parameters
○ Return Values
○ Scope
○ Recursion

Practice
8 / 10 completed

Test
Best Score: 82%

[Continue Learning]
```

---

# 27. Assessment UX

Test screen:

```text
┌─────────────────────────────────────┐
│ Chapter Test              03:45     │
├─────────────────────────────────────┤
│ Question 3 of 10                    │
│                                     │
│ Write a program to ...              │
│                                     │
│ [Code Editor]                       │
│                                     │
│ [Run Test]                          │
│                                     │
│ ✓ Passed visible test               │
│                                     │
│ [Submit Answer]                     │
└─────────────────────────────────────┘
```

After submission:

```text
Score: 8/10
Passed

✓ Conditions
✓ Loops
✓ Functions
✗ Recursion

Recommended:
Review → Recursion
```

---

# 28. Feedback System

Never only show:

> Wrong Answer

Instead show:

```text
Your output:
18

Expected:
20

Hint:
Check how the loop handles the final element.
```

Error categories:

- Syntax Error
- Runtime Error
- Wrong Output
- Timeout
- Input Error
- Hidden Test Failed

For learning mode, hints may be progressive:

```text
Hint 1 — Conceptual
Hint 2 — Logic
Hint 3 — Structural
```

Hints should optionally reduce assessment score.

---

# 29. Difficulty System

Every lesson/problem has:

```text
Beginner
Intermediate
Advanced
Challenge
```

Difficulty should be metadata-driven.

Example:

```json
{
  "difficulty": "intermediate",
  "estimatedMinutes": 15,
  "skills": [
    "loops",
    "functions",
    "arrays"
  ]
}
```

---

# 30. Achievement System

Examples:

### First Program

Run your first successful program.

### First Chapter

Complete your first chapter.

### Unit Master

Complete an entire unit.

### Debugger

Solve 10 debugging problems.

### Consistent Learner

Learn on 7 different days.

### Python Foundations

Complete Unit I.

### Data Structures

Complete Unit III.

Achievements should be course/language independent.

---

# 31. Responsive Design

The platform must support:

- Desktop
- Laptop
- Tablet
- Mobile

Coding is optimized for desktop/tablet.

On mobile:

```text
Lesson
 ↓
Editor
 ↓
Output
 ↓
Test
```

The sidebar becomes a drawer.

---

# 32. Accessibility

Requirements:

- Semantic HTML
- Keyboard navigation
- Focus indicators
- Screen-reader labels
- Adequate contrast
- Resizable text
- Reduced-motion support
- Accessible code editor controls
- Error messages not conveyed only by color

---

# 33. Recommended Technical Architecture

## Frontend

Recommended:

```text
React
TypeScript
Vite
React Router
Tailwind CSS
Monaco Editor / CodeMirror
```

## State

Use a lightweight client state system such as:

```text
Zustand
```

Separate:

```text
UI state
Learning state
Editor state
Auth state
Sync state
```

## Backend / Persistence

```text
Firebase Authentication
Cloud Firestore
Firebase App Check
Cloud Functions
```

## Local Persistence

```text
localStorage
```

For larger offline datasets or extensive drafts, migrate to:

```text
IndexedDB
```

## Execution

Python:

```text
Pyodide + Web Worker
```

Future languages use a runtime adapter.

---

# 34. Application Architecture

```text
                    ┌──────────────────────┐
                    │      React App       │
                    └──────────┬───────────┘
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
          ▼                    ▼                    ▼
   Content Engine        Learning Engine       Auth/Profile
          │                    │                    │
          ▼                    ▼                    ▼
   Markdown/JSON        Progress Manager       Firebase Auth
          │                    │                    │
          │                    ▼                    ▼
          │              Local Storage          Firestore
          │                    │                    │
          └────────────────────┼────────────────────┘
                               │
                               ▼
                       Coding Playground
                               │
                               ▼
                       Execution Manager
                               │
                               ▼
                         Web Worker
                               │
                               ▼
                       Language Runtime
```

---

# 35. Feature Modules

Recommended source structure:

```text
src/
├── app/
├── components/
├── pages/
├── features/
│   ├── auth/
│   ├── courses/
│   ├── lessons/
│   ├── practice/
│   ├── tests/
│   ├── progress/
│   ├── leaderboard/
│   ├── achievements/
│   ├── search/
│   ├── bot-detection/
│   └── admin/
├── content/
├── runtimes/
│   ├── python/
│   ├── javascript/
│   └── shared/
├── services/
│   ├── firebase/
│   ├── local-storage/
│   └── sync/
├── hooks/
├── store/
├── types/
└── utils/
```

---

# 36. Runtime Adapter Architecture

```ts
type LanguageId =
  | "python"
  | "javascript"
  | "java"
  | "cpp"
  | "c"
  | "sql";

interface ExecutionRequest {
  language: LanguageId;
  sourceCode: string;
  stdin?: string;
  timeoutMs: number;
}

interface ExecutionResult {
  status:
    | "passed"
    | "failed"
    | "timeout"
    | "syntax_error"
    | "runtime_error";
  stdout: string;
  stderr?: string;
  executionTimeMs: number;
}
```

The UI should communicate with the runtime only through this interface.

---

# 37. Course/Language Extensibility

The application should not contain logic such as:

```ts
if (course === "python") { ... }
```

Instead:

```ts
course.language
language.runtime
content.schema
assessment.rules
```

Example:

```text
Python Programming
  → Python Runtime
  → Python Syntax Highlighting
  → Python Problems

Java Programming
  → Java Runtime
  → Java Syntax Highlighting
  → Java Problems
```

This allows new courses without rewriting the LMS.

---

# 38. Analytics

Track learning analytics without collecting unnecessary personal data.

Useful metrics:

- Lesson completion
- Chapter completion
- Test scores
- Practice attempts
- Pass rate
- Average attempts
- Time spent
- Most failed topics
- Most revisited topics
- Unit completion
- Course completion
- Language usage

For instructors/admins:

```text
Unit II
Pass Rate: 71%
Average Score: 76%
Most Difficult Topic: Recursion
Most Attempted Problem: GCD
```

---

# 39. Admin/Developer Requirements

Initial admin functionality can be code-driven.

Developer must be able to:

- Add course
- Add language
- Add unit
- Add chapter
- Add lesson
- Add examples
- Add coding problem
- Add test cases
- Add quizzes
- Set prerequisites
- Set difficulty
- Map content to course outcomes
- Publish/unpublish content
- Version content

Content validation should fail the build if:

- IDs are duplicated
- Required fields are missing
- Broken references exist
- Invalid prerequisites exist
- Test cases are malformed
- Course/unit hierarchy is invalid

---

# 40. Course Outcome Mapping

Every relevant lesson and assessment should optionally map to:

```text
CO1
CO2
CO3
CO4
CO5
```

Example:

```text
Functions
  → CO2

Lists
  → CO3

Files
  → CO4

NumPy
  → CO5
```

This enables academic reporting later.

---

# 41. Testing Strategy

## Unit Tests

Test:

- Progress calculations
- Score calculations
- Random question selection
- Content parsing
- Test validation
- Sync conflict resolution
- LocalStorage persistence
- Paste prevention
- Runtime adapter behavior

## Integration Tests

Test:

```text
Login
 → Start Course
 → Open Lesson
 → Practice
 → Run Code
 → Complete Chapter
 → Take Test
 → Save Score
 → Update Leaderboard
```

## End-to-End Tests

Critical flows:

1. Anonymous browsing.
2. User registration.
3. User login.
4. Course enrollment/start.
5. Lesson completion.
6. Coding practice.
7. Paste blocking.
8. Test submission.
9. Firebase synchronization.
10. Leaderboard update.
11. Offline progress recovery.
12. Re-login from another device.

---

# 42. Performance Requirements

Targets:

- Initial page should load quickly on normal broadband.
- Lesson navigation should feel instant after content is loaded.
- Local draft save should not block typing.
- Code execution must provide visible running state.
- Web Worker must terminate timed-out programs.
- Large course content should be loaded progressively.
- Do not load every course's content into the initial bundle.

Use:

- Lazy routes
- Dynamic imports
- Content chunking
- Runtime lazy loading
- Cached static assets

---

# 43. Offline Behavior

Minimum offline support:

```text
Previously loaded lesson
       ↓
Available offline

Draft code
       ↓
Available offline

Practice
       ↓
Available if runtime is cached

Progress
       ↓
Stored locally

Internet returns
       ↓
Sync Firebase
```

Offline test results should be marked as:

```text
Pending Verification
```

if they affect authoritative leaderboard scoring.

---

# 44. Error Handling

Examples:

### Firebase unavailable

> You're offline. Your learning progress is saved on this device and will sync when you're back online.

### Code timeout

> Your program took too long to finish. Check for an infinite loop or inefficient logic.

### Runtime unavailable

> The Python runtime is still loading. Please try again.

### Authentication required

> Sign in to save your practice and progress.

### Suspicious activity

Do not accuse the student.

Use:

> This activity needs additional verification before leaderboard points can be awarded.

---

# 45. Privacy Principles

Collect only what the platform needs.

Avoid unnecessary:

- Full device fingerprinting
- Clipboard contents
- Keystroke content outside the editor
- Personal browsing history
- Location data

Behavioral signals should be used only for platform integrity and should be explainable at a high level.

---

# 46. Security Model

```text
Public Content
   ↓
Read-only

Authenticated Student
   ↓
Practice
   ↓
Local drafts

Authenticated Student
   ↓
Submit assessment
   ↓
Validated event
   ↓
Firebase

Admin
   ↓
Controlled deployment/content workflow
```

Firebase credentials must never be embedded as privileged secrets in client code.

---

# 47. MVP Scope

## Phase 1 — Foundation

- React application
- Course catalog
- Python course
- Five-unit syllabus structure
- Lesson renderer
- Search
- Responsive navigation
- Authentication
- Basic Firebase integration

## Phase 2 — Learning

- Chapter progress
- Course progress
- Code editor
- Python sandbox
- Practice problems
- Local draft storage
- Chapter tests
- Random questions

## Phase 3 — Competition

- Leaderboard
- Achievements
- Test history
- Anti-abuse rules
- Bot/risk scoring
- Firebase App Check
- Server-side score validation

## Phase 4 — Scale

- Multiple programming languages
- Additional academic subjects
- Adaptive learning
- Admin CMS
- Instructor analytics
- Certificates
- PWA/offline mode

---

# 48. MVP Acceptance Criteria

The MVP is successful when a student can:

1. Open the website without logging in.
2. Browse the Python Programming course.
3. See all five units.
4. Open any available chapter.
5. Read beginner-friendly tutorial content.
6. View examples.
7. Log in.
8. Open a coding practice problem.
9. Type code.
10. Be prevented from pasting code into the challenge editor.
11. Run code in an isolated sandbox.
12. See stdout/stderr/test results.
13. Have the draft stored locally.
14. Complete a chapter.
15. Take a randomized test.
16. Receive a score.
17. Have progress synchronized to Firebase.
18. Reload the page and retain progress.
19. See their leaderboard position.
20. Continue learning from the last visited location.

---

# 49. Example Student Journey

```text
Student opens platform
        ↓
Python Programming
        ↓
Unit I
        ↓
Values and Types
        ↓
Read explanation
        ↓
See examples
        ↓
Run example
        ↓
Practice
        ↓
Write own code
        ↓
Pass test cases
        ↓
Chapter test
        ↓
Score 8/10
        ↓
Chapter completed
        ↓
Next chapter unlocked/recommended
        ↓
Complete Unit I
        ↓
Unit test
        ↓
Move to Unit II
```

---

# 50. Example Unit I Content Map

```text
UNIT I — DATA TYPES, EXPRESSIONS, STATEMENTS

01. Python Interpreter & Interactive Mode
02. Values and Types
    ├── int
    ├── float
    ├── boolean
    ├── string
    └── list

03. Variables
04. Expressions
05. Statements
06. Tuple Assignment
07. Operator Precedence
08. Comments
09. Modules
10. Functions
    ├── Definition
    ├── Parameters
    ├── Arguments
    └── Flow of Execution

11. Illustrative Programs
    ├── Swap Variables
    ├── Circulate n Variables
    └── Distance Between Two Points

12. Unit Practice / Assessment
```

The exact chapter granularity can be adjusted during content authoring while preserving the five-unit syllabus boundary.

---

# 51. Example Unit II Content Map

```text
UNIT II — CONTROL FLOW, FUNCTIONS

01. Boolean Values
02. Boolean Operators
03. if
04. if-else
05. if-elif-else
06. while
07. for
08. break / continue / pass
09. return Values
10. Parameters and Scope
11. Function Composition
12. Recursion
13. Strings
14. String Slicing
15. String Methods
16. String Module
17. Lists as Arrays
18. GCD
19. Newton's Method
20. Unit Assessment
```

The platform may split the syllabus topics into more tutorial chapters than the academic unit count. Academic units remain fixed at five.

---

# 52. Content Authoring Standard

Every chapter should contain:

```text
1. Learning Objective
2. Prerequisites
3. Concept Explanation
4. Syntax
5. Simple Example
6. Output
7. Explanation of Example
8. Common Mistakes
9. Guided Practice
10. Independent Practice
11. Quick Quiz
12. Chapter Summary
13. Random Test
14. Next Chapter
```

Optional:

```text
Visual Diagram
Real-world Example
Debugging Challenge
Interview Question
Challenge Problem
```

---

# 53. Educational Design Principles

The platform should follow:

### Explain Before Testing

Students should understand a concept before being evaluated.

### Small Cognitive Steps

Avoid presenting an entire programming topic in one large block.

### Example → Modify → Create

```text
See code
  ↓
Modify code
  ↓
Write code
```

### Immediate Feedback

Students should know why an answer failed.

### Repetition With Variation

Random tests should reinforce concepts without producing identical questions.

### Mastery Over Completion

Completion should represent demonstrated understanding rather than simply opening pages.

---

# 54. Future Expansion

The platform should support:

## Languages

```text
Python
JavaScript
Java
C
C++
SQL
```

## Academic Subjects

```text
Programming
Data Structures
DBMS
Operating Systems
Computer Networks
Web Development
AI / ML
Mathematics
```

## Advanced Features

- Adaptive learning paths
- AI tutor
- AI-generated hints
- Instructor dashboards
- Classroom groups
- Assignments
- Deadlines
- Certificates
- Institution management
- Question-bank analytics
- Code similarity analysis
- Skill graphs
- Personalized revision
- Spaced repetition
- Mock examinations

AI features should be added later and must not become a hard dependency for the core LMS.

---

# 55. Recommended URL Structure

```text
/
 /courses
 /courses/python-programming
 /courses/python-programming/unit-1
 /courses/python-programming/unit-1/values-and-types
 /courses/python-programming/unit-1/values-and-types/practice
 /courses/python-programming/unit-1/values-and-types/test
 /practice
 /tests
 /progress
 /leaderboard
 /profile
 /login
```

Use stable slugs so URLs remain shareable and content can be reorganized internally without breaking navigation.

---

# 56. Design Direction

The UI should feel like a modern educational developer platform rather than a traditional institutional LMS.

Principles:

- Minimal
- Fast
- Content-first
- Code-centric
- Beginner-friendly
- Strong typography
- Clear hierarchy
- Low visual clutter
- Persistent course navigation
- Excellent code editor
- Clear progress indicators

Avoid:

- Overly complex dashboards
- Excessive animations
- Large hero sections inside lessons
- Dense institutional tables
- Hidden navigation
- Unnecessary popups

---

# 57. Core Domain Entities

```text
User
Course
Language
Unit
Chapter
Topic
Lesson
Example
PracticeProblem
Test
TestQuestion
TestAttempt
Progress
Achievement
LeaderboardEntry
LearningEvent
RiskEvent
```

Relationships:

```text
Course → Units
Unit → Chapters
Chapter → Topics
Topic → Lessons
Lesson → Examples
Chapter → PracticeProblems
Chapter → Tests
Test → Questions
User → Progress
User → TestAttempts
User → Achievements
User → LeaderboardEntry
```

---

# 58. Event Model

Use structured events:

```ts
type LearningEvent =
  | "lesson_started"
  | "lesson_completed"
  | "practice_started"
  | "code_executed"
  | "problem_passed"
  | "problem_failed"
  | "test_started"
  | "test_submitted"
  | "chapter_completed"
  | "unit_completed";
```

Events should be used for analytics and progress computation.

Do not trust arbitrary client-provided scores.

---

# 59. Definition of Done

A feature is complete only when:

- UI implemented
- Responsive behavior implemented
- Accessibility checked
- Data model defined
- Local persistence tested
- Firebase persistence tested where applicable
- Security rules tested
- Error states implemented
- Loading states implemented
- Empty states implemented
- Analytics events defined
- Automated tests added
- Documentation updated

---

# 60. Final Product Architecture

The final platform should conceptually operate as:

```text
                         CODEPATH LMS
                              │
              ┌───────────────┼────────────────┐
              │               │                │
          LEARNING         PRACTICE         ASSESSMENT
              │               │                │
        Courses/Units     Code Editor       Random Tests
        Chapters          Sandbox           Unit Tests
        Lessons           Test Cases        Scores
        Examples          Drafts             Outcomes
              │               │                │
              └───────────────┼────────────────┘
                              │
                        PROGRESS ENGINE
                              │
                 ┌────────────┴────────────┐
                 │                         │
             Local Cache               Firebase
                 │                         │
             Drafts/UI              Authoritative
             Recovery                Progress
                                        │
                               ┌────────┴────────┐
                               │                 │
                          Leaderboard       Analytics
                               │
                         Integrity Layer
                               │
                    ┌──────────┴──────────┐
                    │                     │
              Bot/Risk Model        App Check/
              Rate Limiting          Security Rules
```

---

# 61. Product Success Metrics

Primary:

- Course completion rate
- Chapter completion rate
- Practice pass rate
- Test pass rate
- Average score
- Weekly active learners
- Returning learners
- Learning streak
- Percentage progressing from Unit I → Unit V

Quality:

- Code execution success rate
- Sandbox failure rate
- Firebase sync failure rate
- Test-generation validity
- False-positive bot detection rate

Educational:

- Improvement between first and best attempt
- Topic-level mastery
- Reduction in repeated errors
- Unit-to-unit retention

---

# 62. Final Recommendation

Build the first release around the **Python Programming 19AI301/CS3301 syllabus**, but do not architect the application as a "Python website."

Architect it as a **general-purpose programming education engine** where Python is the first course and first runtime.

The most important architectural boundaries are:

```text
CONTENT ≠ COURSE-SPECIFIC UI

LANGUAGE ≠ EXECUTION ENGINE

PRACTICE ≠ ASSESSMENT

LOCAL CACHE ≠ AUTHORITATIVE PROGRESS

CLIENT SCORE ≠ TRUSTED LEADERBOARD SCORE

BOT DETECTION ≠ PERFECT CHEAT PREVENTION
```

If these boundaries are maintained from the beginning, additional courses and programming languages can be introduced by adding content, schemas, runtimes, and assessment definitions rather than rewriting the LMS.

The supplied syllabus should remain the authoritative academic source for the initial Python course's five-unit structure, learning outcomes, topic coverage, illustrative programs, and 60-period course scope.
