# Website Workflow --- CodePath LMS

**Project:** CodePath LMS\
**Primary Course:** 19AI301 / CS3301 --- Python Programming\
**Stack:** React.js + Vite + Tailwind CSS + Firebase + browser-side code
execution\
**Backend:** No custom backend\
**Content:** Version-controlled Markdown/JSON\
**UX model:** Tutorial-first, W3Schools-style learning + interactive
coding + assessments + progress + leaderboard

------------------------------------------------------------------------

## 1. Core Product Workflow

The central student loop is:

``` text
Discover
  ↓
Choose Course
  ↓
View Syllabus
  ↓
Start Learning
  ↓
Read Concept
  ↓
See Example
  ↓
Practice
  ↓
Run Code
  ↓
Solve Problems
  ↓
Take Random Test
  ↓
Complete Chapter
  ↓
Complete Unit
  ↓
Track Progress
  ↓
Improve
  ↓
Complete Course
```

The platform must always answer:

-   Where am I?
-   What should I learn next?
-   How am I progressing?

------------------------------------------------------------------------

## 2. High-Level Site Workflow

``` text
                         HOME
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
        COURSES          SEARCH      LOGIN/REGISTER
             │                           │
             ▼                           ▼
      COURSE OVERVIEW              STUDENT SESSION
             │                           │
             └─────────────┬─────────────┘
                           ▼
                    COURSE DASHBOARD
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
           LEARN         PRACTICE       TESTS
             │             │             │
             ▼             ▼             ▼
         CHAPTER       CODE EDITOR    TEST SESSION
             │             │             │
             ▼             ▼             ▼
          LESSON        SANDBOX        RESULT
             │             │             │
             └─────────────┼─────────────┘
                           ▼
                    PROGRESS ENGINE
                           │
                    ┌──────┴──────┐
                    ▼             ▼
                 LOCAL        FIREBASE
                 CACHE        FIRESTORE
                    │             │
                    └──────┬──────┘
                           ▼
                LEADERBOARD / ACHIEVEMENTS
```

------------------------------------------------------------------------

# 3. Public vs Authenticated Workflow

## Guest users

Guests can:

-   Browse the home page.
-   Browse courses.
-   View course overview.
-   View syllabus.
-   Read tutorial lessons.
-   View examples.
-   Search content.

Guests cannot persist authenticated learning activity such as:

-   Coding practice history.
-   Test submissions.
-   Cloud progress.
-   Leaderboard participation.
-   Profile/achievements.

When a guest opens a protected action:

``` text
Click Practice
    ↓
Authentication Check
    ↓
Not logged in
    ↓
Login/Register
    ↓
Return to original course/chapter/problem
```

The original destination must be preserved.

------------------------------------------------------------------------

# 4. Home Page Workflow

**Route:** `/`

``` text
Header
  ↓
Hero
  ↓
Featured Courses
  ↓
How It Works
  ↓
Interactive Coding Preview
  ↓
Progress Preview
  ↓
Leaderboard Preview
  ↓
Future Languages / Subjects
  ↓
Footer
```

Primary actions:

``` text
Start Learning
Explore Courses
Login
```

`Start Learning` should:

``` text
Check active course
  ├── Existing progress → Continue last lesson
  └── No progress → Course Catalog / first course
```

------------------------------------------------------------------------

# 5. Global Header Workflow

## Guest

``` text
Logo
Courses
Search
Login
Get Started
```

## Authenticated

``` text
Logo
Courses
Practice
Tests
Progress
Leaderboard
Search
Profile
```

## Mobile

``` text
Logo
Search
Menu
```

The menu becomes a drawer on small screens.

------------------------------------------------------------------------

# 6. Course Catalog Workflow

**Route:** `/courses`

``` text
Course Catalog
   ↓
Search / Filter
   ↓
Course Card
   ↓
Course Overview
```

Course cards show:

``` text
Course Name
Course Code
Language
Difficulty
Number of Units
Estimated Level
Student Progress
```

Initial course:

``` text
Python Programming
19AI301 / CS3301
5 Units
60 Academic Periods
Beginner → Applied
```

------------------------------------------------------------------------

# 7. Course Overview Workflow

**Route:** `/courses/:courseId`

``` text
Course Overview
├── Description
├── Prerequisite
├── Course Outcomes
├── Syllabus
├── Units
├── Learning Path
└── Progress
```

For the first course:

``` text
Unit I   Data Types, Expressions, Statements
Unit II  Control Flow, Functions
Unit III Lists, Tuples, Dictionaries
Unit IV  Files, Modules, Packages
Unit V   NumPy, Data Frame
```

The supplied syllabus defines five units, 12 periods per unit, and 60
total periods.

------------------------------------------------------------------------

# 8. Course Start Workflow

``` text
Start Learning
      ↓
Authentication Check
      ↓
Guest
  → Open first lesson

Authenticated
      ↓
Load progress
      ↓
Existing progress?
  ├── Yes → Continue last meaningful lesson
  └── No  → Start first lesson
```

------------------------------------------------------------------------

# 9. Unit Workflow

**Route:** `/courses/:courseId/unit/:unitId`

Each unit contains:

``` text
Unit Overview
  ↓
Learning Objectives
  ↓
Chapter List
  ↓
Practice Summary
  ↓
Unit Progress
  ↓
Unit Assessment
```

Sidebar states:

``` text
✓ Completed
◐ In Progress
○ Not Started
🔒 Locked
```

Students may revisit completed material.

------------------------------------------------------------------------

# 10. Chapter Workflow

**Route:** `/courses/:courseId/chapter/:chapterId`

``` text
Chapter
  ↓
Learning Objective
  ↓
Prerequisites
  ↓
Lessons
  ↓
Examples
  ↓
Practice
  ↓
Quick Quiz
  ↓
Random Test
  ↓
Summary
  ↓
Next Chapter
```

Example:

``` text
Functions
Progress: 65%

✓ Function Definition
✓ Parameters
◐ Return Values
○ Scope
○ Recursion

Practice: 8/10
Test Best Score: 82%
```

------------------------------------------------------------------------

# 11. Lesson Workflow

**Route:** `/courses/:courseId/chapter/:chapterId/lesson/:lessonId`

Every lesson follows a predictable tutorial structure:

``` text
Breadcrumb
   ↓
Topic Title
   ↓
Learning Objective
   ↓
Concept Explanation
   ↓
Syntax
   ↓
Simple Example
   ↓
Output
   ↓
Example Explanation
   ↓
Common Mistakes
   ↓
Guided Practice
   ↓
Quick Check
   ↓
Summary
   ↓
Previous / Next
```

Content is rendered from:

``` text
Markdown + JSON metadata
```

------------------------------------------------------------------------

# 12. Lesson Content Loading Workflow

``` text
Open Lesson
    ↓
Content Loader
    ↓
Load lesson.md
    ↓
Load metadata/examples/problems
    ↓
Validate schema
    ↓
Render lesson
```

Supported blocks:

``` text
heading
paragraph
note
warning
tip
definition
syntax
code
output
interactive_code
diagram
table
example
challenge
quiz
summary
common_mistakes
next_topic
```

------------------------------------------------------------------------

# 13. Lesson Completion Workflow

``` text
Lesson Opened
      ↓
Student reads/interacts
      ↓
Required completion condition met
      ↓
Update Zustand
      ↓
Update localStorage
      ↓
Queue Firebase sync
      ↓
Mark lesson complete
```

Completion thresholds must be configurable.

The system should not unnecessarily block students from reading future
tutorial content.

------------------------------------------------------------------------

# 14. Previous / Next Workflow

``` text
Next
 ↓
Save completion state
 ↓
Find next lesson in content graph
 ↓
Open next lesson
```

``` text
Previous
 ↓
Find previous lesson
 ↓
Open previous lesson
```

Navigation should be generated from content ordering rather than
hard-coded page links.

------------------------------------------------------------------------

# 15. Continue Learning Workflow

Store:

``` text
courseId
unitId
chapterId
lessonId
updatedAt
```

Workflow:

``` text
Login
 ↓
Load profile
 ↓
Load progress
 ↓
Find last active lesson
 ↓
Dashboard
 ↓
Continue Learning
 ↓
Restore lesson
```

------------------------------------------------------------------------

# 16. Practice Access Workflow

Practice requires authentication.

``` text
Practice
   ↓
Auth Check
 ┌─┴─────────────┐
No               Yes
│                 │
▼                 ▼
Login          Practice
│                 │
└───────→ Return to requested problem
```

------------------------------------------------------------------------

# 17. Practice Dashboard Workflow

**Route:** `/practice`

Sections:

``` text
Continue Practice
Recommended Problems
Recent Problems
Completed Problems
By Course
By Unit
By Difficulty
Random Practice
```

Example:

``` text
Practice
Python Programming

Recommended:
→ Recursion
→ Functions
→ Lists

73 / 120 problems completed

[Random Practice]
```

------------------------------------------------------------------------

# 18. Coding Problem Workflow

``` text
Open Problem
     ↓
Load Problem Definition
     ↓
Load Starter Code
     ↓
Load Local Draft
     ↓
Initialize Monaco
     ↓
Student Types
     ↓
Debounced Local Save
     ↓
Run
     ↓
Sandbox
     ↓
Execution Result
```

------------------------------------------------------------------------

# 19. Editor Workflow

Editor features:

``` text
Syntax Highlighting
Line Numbers
Indentation
Autocomplete
Reset
Run
Clear Output
Keyboard Shortcuts
```

Architecture:

``` text
Problem
  ↓
Editor
  ↓
Execution Manager
```

The editor must not directly execute code.

------------------------------------------------------------------------

# 20. Paste Prevention Workflow

Paste blocking applies only to challenge/test editors.

``` text
paste event
    ↓
Intercept
    ↓
preventDefault()
    ↓
Show message
```

Message:

> Pasting code is disabled for practice challenges. Type your solution
> to continue.

Do not globally disable:

``` text
Copying tutorial text
Browser clipboard
Normal website interactions
```

Paste prevention is a learning-integrity control, not a guarantee of
cheat prevention.

------------------------------------------------------------------------

# 21. Code Execution Workflow

``` text
Run
 ↓
Validate source
 ↓
Execution Manager
 ↓
Web Worker
 ↓
Language Runtime
 ↓
Execute
 ↓
Capture stdout/stderr
 ↓
Timeout check
 ↓
Return result
 ↓
Render result
```

Execution states:

``` text
IDLE
LOADING
RUNNING
PASSED
FAILED
SYNTAX_ERROR
RUNTIME_ERROR
TIMEOUT
SANDBOX_ERROR
```

------------------------------------------------------------------------

# 22. Python Sandbox Workflow

Initial language:

``` text
Monaco
  ↓
Execution Manager
  ↓
Python Web Worker
  ↓
Pyodide
  ↓
Python
```

Timeout:

``` text
Program running
   ↓
Timeout
   ↓
Terminate Worker
   ↓
Return TIMEOUT
   ↓
Create fresh Worker when needed
```

The main React thread must not directly execute untrusted student code.

------------------------------------------------------------------------

# 23. Multi-Language Runtime Workflow

The LMS must not be Python-specific.

``` text
Problem
  ↓
language: python
  ↓
Runtime Registry
  ↓
Python Runtime
```

Future:

``` text
language: javascript → JavaScript Runtime
language: java       → Java Runtime
language: cpp        → C++ Runtime
language: c          → C Runtime
language: sql        → SQL Runtime
```

The Practice UI remains unchanged.

------------------------------------------------------------------------

# 24. Practice Test-Case Workflow

``` text
Run
 ↓
Visible Test Cases
 ↓
Execute
 ↓
Display:
  Passed / Failed
  Actual Output
  Expected Output
```

Assessment submission can additionally use protected/hidden test data
where technically appropriate.

Example:

``` text
Test 1 ✓
Test 2 ✓
Test 3 ✗
Test 4 ✓
```

------------------------------------------------------------------------

# 25. Practice Feedback Workflow

### Passed

``` text
PASSED
All required tests passed.

Attempts: 2
Best Result: Passed

[Next Problem]
```

### Wrong Output

``` text
WRONG ANSWER

Your Output:
18

Expected:
20

Hint:
Check the loop boundary.
```

### Runtime Error

``` text
RUNTIME ERROR

Explain the error
Show relevant location
Provide learning-oriented guidance
```

### Timeout

``` text
TIMEOUT

Your program exceeded the execution limit.

Check for:
- Infinite loops
- Excessive recursion
- Unnecessary computation
```

------------------------------------------------------------------------

# 26. Local Draft Workflow

Every coding problem automatically stores a local draft.

``` text
Student Types
    ↓
Editor Change
    ↓
Debounce 500–1000ms
    ↓
localStorage
```

Key:

``` text
lms:draft:{problemId}
```

Data:

``` text
problemId
code
updatedAt
```

Reopening:

``` text
Open Problem
 ↓
Find Draft
 ↓
Restore Draft
```

------------------------------------------------------------------------

# 27. Problem Completion Workflow

``` text
Run
 ↓
Tests
 ↓
Passed?
 ├── No → Continue practice
 └── Yes
      ↓
Mark problem passed
      ↓
Update local progress
      ↓
Sync Firebase
      ↓
Update chapter progress
```

Repeated submissions must not generate unlimited leaderboard points.

------------------------------------------------------------------------

# 28. Quick Quiz Workflow

``` text
Lesson
 ↓
Quick Check
 ↓
Question
 ↓
Answer
 ↓
Immediate Feedback
```

Quick quizzes primarily reinforce learning and need not affect
leaderboard score.

------------------------------------------------------------------------

# 29. Random Test Workflow

``` text
Chapter
 ↓
Random Test
 ↓
Authentication Check
 ↓
Create Test Session
 ↓
Load Question Pool
 ↓
Filter Chapter
 ↓
Apply Difficulty Distribution
 ↓
Avoid Recent Repeats
 ↓
Shuffle
 ↓
Start Test
```

Example:

``` text
10 Questions

3 Beginner
4 Intermediate
3 Advanced
```

Exact distribution is configurable.

------------------------------------------------------------------------

# 30. Test Session Workflow

``` text
Start Test
 ↓
Create Session ID
 ↓
Save recovery metadata locally
 ↓
Question 1
 ↓
Question 2
 ↓
...
 ↓
Final Question
 ↓
Review
 ↓
Submit
```

Local session recovery protects against:

``` text
Refresh
Temporary network loss
Accidental navigation
Browser interruption
```

------------------------------------------------------------------------

# 31. Test Submission Workflow

``` text
Submit
 ↓
Validate session
 ↓
Validate answers
 ↓
Evaluate
 ↓
Calculate score
 ↓
Pass / Fail
 ↓
Update progress
 ↓
Save test attempt
 ↓
Sync Firebase
 ↓
Leaderboard eligibility check
```

The client must not freely assign authoritative score/rank fields.

------------------------------------------------------------------------

# 32. Test Result Workflow

``` text
Score
 ↓
Pass / Fail
 ↓
Topic Breakdown
 ↓
Incorrect Questions
 ↓
Recommended Revision
 ↓
Retry / Continue
```

Example:

``` text
Score: 8/10
Passed

Strong:
✓ Conditions
✓ Loops

Needs Practice:
✗ Recursion
✗ Scope

Recommended:
Review Recursion
```

------------------------------------------------------------------------

# 33. Chapter Completion Workflow

Default completion model:

``` text
Required Lessons Complete
        +
Practice Threshold
        +
Chapter Test Passed
        ↓
Chapter Complete
```

Then:

``` text
Chapter Complete
 ↓
Update Unit Progress
 ↓
Update Course Progress
 ↓
Check Achievements
 ↓
Firebase Sync
```

------------------------------------------------------------------------

# 34. Unit Completion Workflow

``` text
All Required Chapters Complete
        ↓
Unit Test
        ↓
Passed?
 ├── No → Revision / Retry
 └── Yes
      ↓
Unit Complete
      ↓
Achievement Check
      ↓
Course Progress Update
```

------------------------------------------------------------------------

# 35. Course Completion Workflow

``` text
Unit I Complete
      ↓
Unit II Complete
      ↓
Unit III Complete
      ↓
Unit IV Complete
      ↓
Unit V Complete
      ↓
Course Assessment
      ↓
Pass
      ↓
Course Completed
      ↓
Achievement
      ↓
Completion Statistics
```

------------------------------------------------------------------------

# 36. Progress Engine Workflow

Progress hierarchy:

``` text
Lesson
  ↓
Chapter
  ↓
Unit
  ↓
Course
```

Example:

``` text
Lesson     100%
Chapter     75%
Unit        40%
Course      28%
```

Progress should be calculated from completion records instead of
trusting arbitrary client-written percentages.

------------------------------------------------------------------------

# 37. Local Progress Workflow

Every learning event:

``` text
Learning Event
 ↓
Zustand
 ↓
localStorage
 ↓
Immediate UI update
 ↓
Sync Queue
```

The student should see progress immediately even when Firebase is
temporarily unavailable.

------------------------------------------------------------------------

# 38. Firebase Sync Workflow

``` text
Local Change
 ↓
Sync Queue
 ↓
Internet?
 ├── No → Keep Pending
 └── Yes
      ↓
Firestore
      ↓
Success
      ↓
Mark Synced
```

If Firebase fails:

``` text
Preserve local state
Retry later
Do not lose student work
```

------------------------------------------------------------------------

# 39. Local + Firebase Conflict Workflow

``` text
Load Local State
Load Firebase State
       ↓
Compare timestamps/version
       ↓
Determine newest valid state
       ↓
Merge where possible
       ↓
Persist resolved state
```

Do not blindly overwrite newer cloud data with stale local data.

------------------------------------------------------------------------

# 40. Dashboard Workflow

**Route:** `/dashboard`

``` text
Welcome
 ↓
Continue Learning
 ↓
Current Course Progress
 ↓
Recent Activity
 ↓
Practice Statistics
 ↓
Test Performance
 ↓
Achievements
 ↓
Leaderboard Rank
```

Example:

``` text
Python Programming
████████████░░░ 78%

Continue:
Unit IV → Files

Practice:
73 completed

Average Test:
84%

Rank:
#12
```

------------------------------------------------------------------------

# 41. Progress Page Workflow

**Route:** `/progress`

``` text
Overall Progress
 ↓
Course Progress
 ↓
Unit Progress
 ↓
Chapter Progress
 ↓
Skill Progress
 ↓
Test Performance
 ↓
Practice Statistics
```

Purpose: show students where they are strong and where they need
revision.

------------------------------------------------------------------------

# 42. Leaderboard Workflow

**Route:** `/leaderboard`

Tabs:

``` text
Overall
Course
Unit
Weekly
Monthly
```

``` text
Open Leaderboard
 ↓
Load eligible entries
 ↓
Rank
 ↓
Display top users
 ↓
Display current user's rank
```

Leaderboard is a gamification feature, not a high-stakes examination
system.

------------------------------------------------------------------------

# 43. Leaderboard Integrity Workflow

``` text
Score Event
 ↓
Eligibility Check
 ↓
Rate Check
 ↓
Risk Check
 ↓
Eligible?
 ├── No → Save learning result, no leaderboard points
 └── Yes → Update leaderboard
```

Prevent:

``` text
Repeated easy submissions
Refresh duplication
Rapid test submissions
Fake progress writes
Direct score manipulation
```

------------------------------------------------------------------------

# 44. Bot / Abuse Detection Workflow

Use risk scoring instead of a binary bot decision.

``` text
Learning Event
 ↓
Integrity Signals
 ↓
Risk Engine
 ↓
Risk Score
```

Signals:

``` text
Submission velocity
Test timing anomalies
Repeated event patterns
App Check status
Abnormal request behavior
Account activity
```

Suggested levels:

``` text
0–29   Normal
30–59  Monitor
60–79  Challenge / Cooldown
80–100 Temporary leaderboard restriction
```

Never delete learning progress merely because a risk signal fired.

------------------------------------------------------------------------

# 45. Authentication Workflow

## Register

``` text
Register
 ↓
Firebase Auth
 ↓
Create Profile
 ↓
Initialize Progress
 ↓
Dashboard
```

## Login

``` text
Login
 ↓
Firebase Auth
 ↓
Load Profile
 ↓
Load Progress
 ↓
Merge Local State
 ↓
Dashboard / Original Destination
```

## Logout

``` text
Logout
 ↓
Firebase signOut
 ↓
Clear auth state
 ↓
Preserve appropriate local drafts
 ↓
Home
```

------------------------------------------------------------------------

# 46. Protected Route Workflow

``` text
Protected Route
 ↓
Auth Loading?
 ├── Yes → Loading UI
 └── No
      ↓
Authenticated?
 ├── No → Login
 └── Yes → Render Page
```

Protected features:

``` text
Practice
Test Submission
Cloud Progress
Leaderboard Participation
Profile
Achievements
```

------------------------------------------------------------------------

# 47. Search Workflow

**Shortcut:** `Ctrl + K`

``` text
Open Search
 ↓
Type Query
 ↓
Fuse.js
 ↓
Search:
  Courses
  Units
  Chapters
  Topics
  Lessons
  Examples
  Problems
 ↓
Select Result
 ↓
Navigate
```

Example:

``` text
recursion

Unit II
→ Functions
→ Recursion
→ GCD using Recursion
→ Newton's Method
```

------------------------------------------------------------------------

# 48. Profile Workflow

**Route:** `/profile`

``` text
Profile
├── Account
├── Learning Statistics
├── Achievements
├── Course History
├── Leaderboard
└── Settings
```

Editable:

``` text
Display Name
Profile Image
Theme
Learning Preferences
```

Do not expose Firebase credentials or internal security information.

------------------------------------------------------------------------

# 49. Achievement Workflow

``` text
Learning Event
 ↓
Achievement Engine
 ↓
Check Conditions
 ↓
Unlocked?
 ├── No → Continue
 └── Yes
      ↓
Save Achievement
      ↓
Show Toast / Animation
      ↓
Update Profile
```

Examples:

``` text
First Program
First Chapter
Unit Master
7-Day Learner
Python Foundations
Data Structures
```

------------------------------------------------------------------------

# 50. Offline Workflow

``` text
Offline
 ↓
Cached Lesson
 ↓
Continue Learning
 ↓
Local Progress
 ↓
Local Draft
 ↓
Practice if runtime is available
 ↓
Pending Sync
```

When online:

``` text
Network Restored
 ↓
Sync Queue
 ↓
Firebase
 ↓
Mark Synced
```

Offline assessment results affecting leaderboard points can be marked
pending verification.

------------------------------------------------------------------------

# 51. Network Error Workflow

``` text
Firebase Request
 ↓
Failure
 ↓
Preserve Local State
 ↓
Show Non-blocking Status
 ↓
Retry
```

Example:

> You're offline. Your progress is saved on this device and will sync
> when you're back online.

Do not interrupt the learning experience for every temporary network
failure.

------------------------------------------------------------------------

# 52. Runtime Error Workflow

``` text
Execution
 ↓
Error
 ↓
Classify
```

Categories:

``` text
Syntax Error
Runtime Error
Timeout
Sandbox Error
Wrong Output
```

Show an educational explanation and a useful next action.

------------------------------------------------------------------------

# 53. Mobile Workflow

Desktop:

``` text
Course Sidebar
     +
Lesson Content
     +
Coding Editor
```

Mobile:

``` text
Header
 ↓
Course Menu Drawer
 ↓
Lesson
 ↓
Editor
 ↓
Output
 ↓
Tests
 ↓
Next
```

Primary actions remain accessible:

``` text
Run
Submit
Previous
Next
```

------------------------------------------------------------------------

# 54. Lock / Prerequisite Workflow

``` text
Open Chapter
 ↓
Check Prerequisites
 ↓
Incomplete?
 ├── No → Open
 └── Yes
      ↓
Show prerequisite message
      ↓
Link to required lesson
```

Example:

> Complete Variables before starting Expressions.

The platform should prefer recommendations over unnecessarily strict
locking.

------------------------------------------------------------------------

# 55. Recommendation Workflow

After failed assessment:

``` text
Test Result
 ↓
Find weak topics
 ↓
Find related lessons
 ↓
Show recommendation
```

Example:

``` text
You struggled with Recursion.

Recommended:
→ Review Recursion
→ Practice GCD
→ Try Recursion Challenge
```

After chapter completion:

``` text
Chapter Complete
 ↓
Find next chapter
 ↓
Recommend next
```

------------------------------------------------------------------------

# 56. Course Outcome Workflow

Relevant lessons/problems/tests may map to:

``` text
CO1
CO2
CO3
CO4
CO5
```

Initial mapping:

``` text
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

Later analytics can calculate outcome mastery.

------------------------------------------------------------------------

# 57. Initial Python Course Workflow

``` text
19AI301 / CS3301
Python Programming
        │
        ├── Unit I
        │   Data Types, Expressions, Statements
        │
        ├── Unit II
        │   Control Flow, Functions
        │
        ├── Unit III
        │   Lists, Tuples, Dictionaries
        │
        ├── Unit IV
        │   Files, Modules, Packages
        │
        └── Unit V
            NumPy, Data Frame
```

------------------------------------------------------------------------

# 58. Unit I Workflow

``` text
Interpreter
 ↓
Values & Types
 ↓
Variables
 ↓
Expressions
 ↓
Statements
 ↓
Tuple Assignment
 ↓
Operator Precedence
 ↓
Comments
 ↓
Modules
 ↓
Functions
 ↓
Illustrative Programs
 ↓
Unit Test
```

Illustrative practice:

``` text
Swap Variables
Circulate n Variables
Distance Between Two Points
```

------------------------------------------------------------------------

# 59. Unit II Workflow

``` text
Boolean Values
 ↓
Boolean Operators
 ↓
if
 ↓
if-else
 ↓
if-elif-else
 ↓
while
 ↓
for
 ↓
break / continue / pass
 ↓
Return Values
 ↓
Parameters / Scope
 ↓
Function Composition
 ↓
Recursion
 ↓
Strings
 ↓
String Slicing
 ↓
String Methods
 ↓
Lists as Arrays
 ↓
Applied Programs
 ↓
Unit Test
```

Programs include:

``` text
GCD
Square Root
Newton's Method
Exponentiation
Array Sum
```

------------------------------------------------------------------------

# 60. Unit III Workflow

``` text
List Operations
 ↓
List Slicing
 ↓
List Methods
 ↓
List Loops
 ↓
Mutability
 ↓
Aliasing
 ↓
Cloning
 ↓
List Parameters
 ↓
Tuples
 ↓
Dictionary Operations
 ↓
Dictionary Methods
 ↓
List Comprehension
 ↓
Search
 ↓
Sorting
 ↓
Histogram
 ↓
Unit Test
```

Programs include:

``` text
Maximum of List
Linear Search
Binary Search
Selection Sort
Insertion Sort
Merge Sort
Histogram
```

------------------------------------------------------------------------

# 61. Unit IV Workflow

``` text
Text Files
 ↓
Reading Files
 ↓
Writing Files
 ↓
Formatting
 ↓
Command-Line Arguments
 ↓
Errors
 ↓
Exceptions
 ↓
Exception Handling
 ↓
Modules
 ↓
Packages
 ↓
Classes
 ↓
Objects
 ↓
Word Count
 ↓
Copy File
 ↓
Unit Test
```

------------------------------------------------------------------------

# 62. Unit V Workflow

``` text
NumPy Arrays
 ↓
Shape
 ↓
Reshape
 ↓
Indexing
 ↓
Slicing
 ↓
Array Mathematics
 ↓
Array Arithmetic
 ↓
Pandas Series
 ↓
DataFrame
 ↓
Selection
 ↓
Indexing
 ↓
Missing Data
 ↓
Merging
 ↓
Joining
 ↓
Concatenating
 ↓
GroupBy
 ↓
Apply
 ↓
Sorting
 ↓
File Read/Write
 ↓
Matrix Problems
 ↓
CSV Processing
 ↓
Unit Test
```

------------------------------------------------------------------------

# 63. Student State Machine

``` text
NOT_STARTED
     ↓
STARTED
     ↓
LEARNING
     ↓
PRACTICING
     ↓
ASSESSMENT_READY
     ↓
TESTING
     ↓
PASSED
     ↓
COMPLETED
```

Failure path:

``` text
TESTING
 ↓
FAILED
 ↓
REVISION
 ↓
PRACTICING
 ↓
TESTING
```

------------------------------------------------------------------------

# 64. Page State Model

Every page should support:

``` text
LOADING
READY
EMPTY
ERROR
OFFLINE
```

No page should become a blank screen because content/network data is
unavailable.

------------------------------------------------------------------------

# 65. Application Boot Workflow

``` text
Browser
 ↓
Vite Bundle
 ↓
React Mount
 ↓
Initialize Firebase
 ↓
Resolve Auth State
 ↓
Load Local Preferences
 ↓
Load Course Registry
 ↓
Initialize Router
 ↓
Resolve URL
 ↓
Load Required Content
 ↓
Render Page
```

Do not load Pyodide or all course/question content during initial boot.

------------------------------------------------------------------------

# 66. Lazy Loading Workflow

``` text
Home
 ↓
No Python Runtime

Practice
 ↓
Load Python Runtime

Python Problem
 ↓
Initialize Python Worker
```

Similarly:

``` text
JavaScript Problem
 ↓
Load JavaScript Runtime
```

This keeps initial page load smaller.

------------------------------------------------------------------------

# 67. Application Data Ownership

``` text
React Component State
 → Temporary UI state

Zustand
 → Session/application state

localStorage
 → Drafts + small local persistence

IndexedDB
 → Large local cache

Firestore
 → Durable authenticated user state

Markdown/JSON
 → Static course source

Web Worker
 → Code execution state
```

------------------------------------------------------------------------

# 68. Data Flow

## Lesson

``` text
Markdown / JSON
 ↓
Content Loader
 ↓
Zod Validation
 ↓
Lesson Renderer
 ↓
React
```

## Practice

``` text
Problem JSON
 ↓
Practice Engine
 ↓
Monaco
 ↓
Execution Manager
 ↓
Worker
 ↓
Runtime
 ↓
Result
 ↓
Progress
 ↓
Local Storage
 ↓
Firebase
```

## Test

``` text
Question Bank
 ↓
Random Test Generator
 ↓
Test Session
 ↓
Answers
 ↓
Evaluation
 ↓
Score
 ↓
Progress
 ↓
Firebase
```

------------------------------------------------------------------------

# 69. Adding a New Chapter Workflow

``` text
Create Folder
 ↓
chapter.json
 ↓
lesson.md
 ↓
examples.json
 ↓
problems.json
 ↓
quiz.json
 ↓
Register Chapter
 ↓
Validate
 ↓
Build
 ↓
Deploy
```

No database migration is required for static tutorial content.

------------------------------------------------------------------------

# 70. Adding a New Course Workflow

``` text
Create Course Folder
 ↓
course.json
 ↓
syllabus.json
 ↓
Units
 ↓
Chapters
 ↓
Lessons
 ↓
Problems
 ↓
Tests
 ↓
Register Course
 ↓
Validate
 ↓
Deploy
```

Future examples:

``` text
Python Programming
JavaScript Programming
Data Structures
DBMS
Operating Systems
```

------------------------------------------------------------------------

# 71. Adding a New Language Workflow

``` text
Language Definition
 ↓
Runtime Adapter
 ↓
Execution Implementation
 ↓
Editor Configuration
 ↓
Runtime Registry
 ↓
Problems
 ↓
Tests
 ↓
Validation
 ↓
Deploy
```

The Practice UI should not require language-specific rewrites.

------------------------------------------------------------------------

# 72. Content Validation Workflow

Before deployment:

``` text
Load Content
 ↓
Validate Schemas
 ↓
Check Duplicate IDs
 ↓
Check Broken References
 ↓
Check Prerequisites
 ↓
Check Problem Definitions
 ↓
Check Test Definitions
 ↓
Build
```

Build/CI must fail on invalid content.

------------------------------------------------------------------------

# 73. Developer/Admin Workflow

### MVP

``` text
Developer
 ↓
Edit Markdown / JSON
 ↓
Local Preview
 ↓
Schema Validation
 ↓
Tests
 ↓
Git Commit
 ↓
Build
 ↓
Deploy
```

### Future CMS

``` text
Admin Dashboard
 ↓
Course
 ↓
Unit
 ↓
Chapter
 ↓
Lesson
 ↓
Problem
 ↓
Test
 ↓
Publish
```

------------------------------------------------------------------------

# 74. Deployment Workflow

``` text
Developer
 ↓
Git Push
 ↓
CI
 ├── ESLint
 ├── Prettier
 ├── Content Validation
 ├── Unit Tests
 ├── Build
 └── E2E Tests
 ↓
Production Build
 ↓
Firebase Hosting
 ↓
Live LMS
```

------------------------------------------------------------------------

# 75. Error Recovery Principle

Every failed operation follows:

``` text
Action
 ↓
Failure
 ↓
Classify
 ↓
Auto Recover if Possible
 ↓
Preserve User Work
 ↓
Explain
 ↓
Provide Next Action
```

Never lose:

``` text
Typed Code
Completed Lessons
Pending Progress
Test Drafts
```

because of network or UI errors.

------------------------------------------------------------------------

# 76. Complete Student Journey

``` text
HOME
 ↓
COURSE CATALOG
 ↓
COURSE OVERVIEW
 ↓
UNIT
 ↓
CHAPTER
 ↓
LESSON
 ↓
CONCEPT
 ↓
EXAMPLE
 ↓
PRACTICE
 ↓
CODE EDITOR
 ↓
SANDBOX
 ↓
TEST CASES
 ↓
RANDOM TEST
 ↓
RESULT
 ↓
CHAPTER COMPLETE
 ↓
UNIT TEST
 ↓
UNIT COMPLETE
 ↓
NEXT UNIT
 ↓
UNIT I → V
 ↓
COURSE ASSESSMENT
 ↓
COURSE COMPLETE
 ↓
ACHIEVEMENT
 ↓
PROGRESS
 ↓
LEADERBOARD
```

------------------------------------------------------------------------

# 77. Final Website Navigation Map

``` text
/
├── courses
│   └── :courseId
│       ├── overview
│       ├── unit/:unitId
│       ├── chapter/:chapterId
│       └── chapter/:chapterId/lesson/:lessonId
│
├── practice
│   └── :problemId
│
├── tests
│   ├── chapter/:chapterId
│   ├── unit/:unitId
│   └── course/:courseId
│
├── dashboard
├── progress
├── leaderboard
├── profile
├── search
├── login
└── register
```

------------------------------------------------------------------------

# 78. Final Architecture Principle

The website should feel like:

``` text
Documentation
      +
Interactive IDE
      +
Practice Platform
      +
Assessment System
      +
Progress Tracker
      +
Gamification
```

while technically remaining:

``` text
React SPA
   +
Static Markdown/JSON Content
   +
Firebase BaaS
   +
Browser Code Runtime
   +
Local Persistence
```

The student should never need to understand the underlying architecture.

The experience should simply feel like:

``` text
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

That loop is the central workflow of CodePath LMS.
