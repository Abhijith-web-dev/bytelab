# CONCEPT-LEVEL CONTENT AUTHORING RULES

## CodePath LMS — Deep Teaching, Examples, Simulations, Practice & Assessment Standard

**Purpose:** Define the exact hierarchy and authoring rules for teaching every individual programming concept inside CodePath LMS.

**Applies to:** Python first, then all future programming languages and subjects.

**Core principle:**

```text
One Concept
   ↓
Story / Context
   ↓
Why It Exists
   ↓
Simple Mental Model
   ↓
Formal Definition
   ↓
Visual Model
   ↓
Syntax
   ↓
Smallest Example
   ↓
Code Explanation
   ↓
Execution / Internal State
   ↓
Interactive Simulation
   ↓
Guided Example
   ↓
Real-World Example
   ↓
Common Mistakes
   ↓
Practice
   ↓
Challenge
   ↓
Quick Assessment
   ↓
Summary
   ↓
Connection to Next Concept
```

---

# 1. PURPOSE OF THE CONCEPT HIERARCHY

A concept page must not behave like a textbook definition.

The student should experience a concept as a **small learning journey**.

The page should answer, in order:

```text
What is the problem?
Why do I need this?
What is the idea?
How does it work?
What does the code look like?
What happens when it runs?
Can I see it?
Can I change it?
Can I write it?
Can I solve something with it?
Can I explain it?
```

The student should leave the concept with both:

```text
Conceptual understanding
+
Practical ability
```

---

# 2. CONCEPT IS THE SMALLEST COMPLETE LEARNING UNIT

A concept should be small enough to understand in one sitting.

Good:

```text
Variables
Assignment
Integer
Function Call
Function Parameter
Operator Precedence
```

Too large:

```text
Python Basics
Functions
Data Structures
```

Those should be chapter/topic groups containing smaller concepts.

---

# 3. CONTENT HIERARCHY

Use this hierarchy:

```text
Course
└── Unit
    └── Chapter
        └── Topic
            └── Concept
                ├── Story
                ├── Explanation
                ├── Visual Model
                ├── Example
                ├── Simulation
                ├── Practice
                ├── Challenge
                └── Assessment
```

Example:

```text
Python Programming
└── Unit I
    └── Variables
        └── Assignment
            ├── Story
            ├── What is Assignment?
            ├── Memory Visualization
            ├── x = 10
            ├── Assignment Simulation
            ├── Guided Practice
            ├── Challenge
            └── Quick Test
```

---

# 4. CONCEPT METADATA

Every concept should have machine-readable metadata.

Recommended:

```json
{
  "id": "python-assignment",
  "title": "Assignment",
  "courseId": "python-programming",
  "unitId": "unit-01",
  "chapterId": "variables",
  "order": 3,
  "difficulty": "beginner",
  "estimatedMinutes": 20,
  "co": ["CO1"],
  "prerequisites": ["python-values", "python-variables"],
  "skills": [
    "assignment",
    "variables",
    "value-binding"
  ],
  "modes": [
    "learn",
    "story",
    "simulation",
    "practice"
  ]
}
```

---

# 5. CONCEPT PAGE MASTER STRUCTURE

Every important concept should follow:

```text
01. Concept Header
02. Learning Objective
03. Story Hook
04. Problem / Motivation
05. Simple Explanation
06. Formal Explanation
07. Mental Model
08. Visual Model
09. Syntax
10. Rules
11. Smallest Example
12. Step-by-Step Code Explanation
13. Execution Trace
14. Internal State
15. Interactive Simulation
16. Guided Example
17. Real-World Example
18. Compare / Contrast
19. Common Mistakes
20. Debugging Example
21. Guided Practice
22. Independent Practice
23. Challenge
24. Quick Test
25. Reflection
26. Summary
27. What Comes Next
```

Not every concept needs every section visibly expanded. Small concepts can collapse some sections, but the instructional structure should remain.

---

# 6. SECTION 01 — CONCEPT HEADER

The top should immediately establish:

```text
Concept Name
One-line description
Difficulty
Estimated time
Unit / chapter
```

Example:

```text
Variables

Give names to values so your program can work with them.

Beginner · 20 min
Unit I · Data Types, Expressions, Statements
```

---

# 7. SECTION 02 — LEARNING OBJECTIVE

Use action-oriented outcomes.

Bad:

```text
Understand variables.
```

Better:

```text
By the end of this lesson, you can:

✓ Explain what a variable is.
✓ Assign a value to a variable.
✓ Change a variable's value.
✓ Use variables in expressions.
✓ Trace variable values in a program.
```

Keep objectives measurable.

---

# 8. SECTION 03 — STORY HOOK

Every major concept should begin with a relatable situation.

For college students, prefer:

```text
Student marks
Attendance
Canteen billing
College bus
Library books
Event registration
Exam timetable
Mobile recharge
Bank balance
Online shopping
Sports scores
Campus map
```

Example for variables:

> Imagine a college office maintaining a student's details. The office needs names for pieces of information: student name, roll number, mark, and CGPA. A program needs the same idea.

Then transition immediately:

```python
student_name = "Arun"
```

The story should introduce the concept, not replace the concept.

---

# 9. SECTION 04 — PROBLEM / MOTIVATION

Before defining the concept, explain the problem it solves.

Example:

```text
Without variables:

print(80)
print(80 + 10)
print(80 * 2)
```

Problem:

```text
What if 80 changes?
```

Then introduce:

```python
mark = 80
```

Now:

```text
One meaningful name
→
One reusable value reference
```

The student should understand why the feature exists.

---

# 10. SECTION 05 — SIMPLE EXPLANATION

First explain in simple language.

Example:

> A variable gives a name to a value so we can use that value later.

Then move to technical precision:

> In Python, assignment binds a name to a value or evaluated expression.

Do not begin with a highly formal definition.

The sequence is:

```text
Simple
 ↓
Precise
 ↓
Technical
```

---

# 11. SECTION 06 — FORMAL EXPLANATION

After the intuition, provide the accurate programming explanation.

Use:

```text
Definition
Rules
Properties
Restrictions
Behavior
```

Do not oversimplify technical behavior merely to make the lesson easy.

Use analogies as mental models, then return to actual Python behavior.

---

# 12. SECTION 07 — MENTAL MODEL

Every difficult concept should have a mental model.

Examples:

### Variable

```text
name → value
```

### Function

```text
input → function → result
```

### Assignment

```text
expression → value → name binding
```

### Function parameter

```text
argument → parameter
```

### Operator precedence

```text
expression
   ↓
highest-priority operation
   ↓
next operation
   ↓
final result
```

The mental model should be simpler than the formal explanation.

---

# 13. SECTION 08 — VISUAL MODEL

Use visual state where the concept involves:

```text
values
variables
indexes
memory/state
execution
flow
function calls
operations
```

Example:

```python
x = 25
```

Visual:

```text
┌───────────┐
│ x         │
│     25    │
└───────────┘
```

Do not claim this graphic is literally how Python's memory works if it is only a teaching abstraction.

Label it as:

```text
Mental Model
```

when necessary.

---

# 14. SECTION 09 — SYNTAX

Show only the syntax needed for the concept.

Example:

```python
variable = value
```

Then explain:

```text
variable
→ name

=
→ assignment operator

value
→ expression/value being assigned
```

Do not overwhelm the beginner with every variation immediately.

---

# 15. SECTION 10 — RULES

Explicitly state important rules.

Example:

```text
Variable names:
✓ can contain letters
✓ can contain numbers after the first character
✓ can contain underscore

✗ cannot begin with a number
✗ cannot contain spaces
✗ should not use reserved keywords
```

Rules should be presented in small groups.

---

# 16. SECTION 11 — SMALLEST POSSIBLE EXAMPLE

Start with the smallest working example.

For variables:

```python
x = 10
print(x)
```

For functions:

```python
def greet():
    print("Hello")

greet()
```

For precedence:

```python
2 + 3 * 4
```

The first example should minimize unrelated syntax.

---

# 17. SECTION 12 — STEP-BY-STEP CODE EXPLANATION

Do not explain an entire code block with one paragraph.

Example:

```python
x = 10
y = 20
z = x + y

print(z)
```

Explain:

### Step 1

```python
x = 10
```

```text
1. Python evaluates 10.
2. The name x is assigned to that value.
3. x can now be used later.
```

### Step 2

```python
y = 20
```

```text
Evaluate 20
↓
Bind y to 20
```

### Step 3

```python
z = x + y
```

```text
Read x → 10
Read y → 20
10 + 20 → 30
Bind z → 30
```

### Step 4

```python
print(z)
```

```text
Read z
↓
30
↓
Display 30
```

---

# 18. EXECUTION TRACE

For code where execution order matters, provide a trace.

Example:

| Line | Instruction | State |
|---|---|---|
| 1 | `x = 10` | `x → 10` |
| 2 | `y = 20` | `x → 10, y → 20` |
| 3 | `z = x + y` | `z → 30` |
| 4 | `print(z)` | Output → `30` |

Provide an interactive version where appropriate:

```text
[Previous]
[Step]
[Run]
[Reset]
```

Highlight the currently executing line.

---

# 19. INTERNAL STATE

Whenever a concept changes program state, show that change.

Example:

```python
a = 10
b = 20
a, b = b, a
```

Show:

```text
BEFORE

a → 10
b → 20

RIGHT SIDE

b → 20
a → 10

RESULT

(20, 10)

AFTER

a → 20
b → 10
```

This is particularly valuable for:

```text
assignment
tuple assignment
functions
parameters
loops
lists
dictionaries
recursion
```

---

# 20. SIMULATION REQUIREMENTS

A simulation should have a specific teaching purpose.

Every simulation definition should specify:

```text
Simulation goal
Initial state
Student controls
Visible variables
Actions
Transitions
Result
Explanation
Reset
```

Recommended controls:

```text
[Play]
[Pause]
[Step]
[Reset]
```

Not every simulation needs all controls.

---

# 21. SIMULATION TYPES

Use different simulation patterns instead of one animation style.

## A. State Simulator

For:

```text
variables
data types
lists
dictionaries
```

## B. Flow Simulator

For:

```text
interpreter
function calls
execution
```

## C. Step Evaluator

For:

```text
expressions
precedence
operators
```

## D. Mapping Simulator

For:

```text
parameters
arguments
assignment
```

## E. Interactive Geometry

For:

```text
distance between points
```

## F. Debugger Simulation

For:

```text
execution errors
variable tracing
```

---

# 22. SIMULATION MUST BE INTERACTIVE

Whenever appropriate, allow the student to change the inputs.

Example:

For:

```python
x = 10
y = 20
```

allow:

```text
x = 50
y = 100
```

and show the simulation changing.

The goal is:

```text
Observe
 ↓
Manipulate
 ↓
Predict
 ↓
Run
```

---

# 23. SIMULATION SHOULD NOT HIDE THE CODE

The simulation must connect directly to source code.

Preferred layout:

```text
┌──────────────────┬──────────────────────┐
│ Python Code      │ Visual State         │
│                  │                      │
│ x = 10           │ x → 10               │
│ y = 20           │ y → 20               │
│ z = x + y        │ z → 30               │
├──────────────────┴──────────────────────┤
│ [Step] [Run] [Reset]                     │
└──────────────────────────────────────────┘
```

---

# 24. GUIDED EXAMPLE

After explaining the concept, solve a slightly larger example with the student.

Use:

```text
You do this
 ↓
Student predicts
 ↓
Reveal
 ↓
Explain
```

Example:

```text
x = 5
y = 10
x = x + y
```

Ask:

```text
What is x after line 3?

A. 5
B. 10
C. 15
D. 50
```

Then animate the solution.

---

# 25. REAL-WORLD EXAMPLE

Move from toy example to a realistic problem.

Example: College attendance.

```python
total_classes = 40
attended = 34
attendance = attended / total_classes * 100

print(attendance)
```

Explain each variable.

Then show:

```text
total_classes
attended
attendance
```

This allows the student to connect code to real data.

---

# 26. REAL-WORLD EXAMPLE RULE

The real-world example must:

```text
be believable
use realistic values
connect naturally to the concept
not add unnecessary complexity
```

Do not create a complicated application just to demonstrate a beginner concept.

---

# 27. COMPARE / CONTRAST

When two concepts can be confused, explicitly compare them.

Examples:

```text
= vs ==
print() vs return
parameter vs argument
list vs tuple
string vs list
int vs float
interactive mode vs script mode
```

Example:

| Feature | `=` | `==` |
|---|---|---|
| Purpose | Assignment | Comparison |
| Result | Updates binding | Produces boolean result |
| Example | `x = 10` | `x == 10` |

Only include comparisons relevant to the current lesson.

---

# 28. COMMON MISTAKES

Every major concept should have common errors.

Structure:

```text
Mistake
 ↓
Why it happens
 ↓
Incorrect code
 ↓
Correct code
 ↓
Rule to remember
```

Example:

```python
name = Python
```

Problem:

```text
Python is interpreted as a name, not text.
```

Correct:

```python
name = "Python"
```

---

# 29. DEBUGGING EXAMPLE

For programming concepts, include at least one debugging task when appropriate.

Example:

```python
x = 10
print(y)
```

Ask:

```text
What is wrong?
At which line?
What value/name is missing?
```

Then reveal:

```text
NameError
```

Explain it in simple terms.

---

# 30. ERROR EXPLANATION FORMAT

Use:

```text
Error
 ↓
What Python expected
 ↓
What it found
 ↓
Why this happened
 ↓
How to fix it
 ↓
How to avoid it
```

Avoid dumping the error message without explanation.

---

# 31. GUIDED PRACTICE

The first practice should provide structure.

Example:

```python
name = "_____"
print(name)
```

Or:

```python
x = 10
y = 20

# complete this line
_____ = x + y
```

The student is practicing the concept without facing a blank editor immediately.

---

# 32. INDEPENDENT PRACTICE

Remove most scaffolding.

Example:

> Create a program that stores a student's name, department, and CGPA and displays them.

Provide:

```text
Input
Expected behavior
Example output
Hints
```

Do not give the full answer immediately.

---

# 33. CHALLENGE

The challenge should combine the current concept with concepts already learned.

Example:

```text
Variables
+
Expressions
+
print()
```

Avoid introducing five new concepts at once.

The challenge should measure application.

---

# 34. HINT SYSTEM

Use progressive hints:

```text
Hint 1 — Think about the concept
Hint 2 — Think about the required variables
Hint 3 — Think about the expression
Hint 4 — Partial solution
```

Do not immediately reveal the answer.

Optional assessment rule:

```text
Practice mode
→ unlimited hints

Assessment mode
→ limited hints / score reduction
```

---

# 35. QUICK TEST

End the concept with a small test.

Recommended:

```text
3–5 questions
```

Mix:

```text
Concept
Output
Trace
Debugging
Small coding task
```

Example:

```text
What is the value of x?

x = 10
x = x + 5
```

Answer:

```text
15
```

---

# 36. QUESTION PROGRESSION

Questions should progress:

```text
Recall
 ↓
Understand
 ↓
Predict
 ↓
Apply
 ↓
Debug
 ↓
Create
```

Do not ask complex coding questions immediately after introducing a concept.

---

# 37. REFLECTION

For important concepts, ask one short reflection question.

Examples:

```text
Why do we need variables?

What would happen if all values were hard-coded?

Why is a function useful here?

Why did Python evaluate this operator first?
```

Reflection helps reveal conceptual gaps.

---

# 38. SUMMARY

Use a compact summary:

```text
Today you learned:

✓ ...
✓ ...
✓ ...

You can now:

✓ ...
```

Do not repeat the entire lesson.

---

# 39. NEXT-CONCEPT CONNECTION

End with a bridge.

Example:

```text
You now know how to store values in variables.

Next:
We will use those values inside expressions.
```

The student should understand why the next concept follows.

---

# 40. CONCEPT DEPENDENCY FLOW

Concepts should form a learning graph.

For Unit I:

```text
Python Interpreter
      ↓
Values & Types
      ↓
Variables
      ↓
Expressions
      ↓
Statements
      ↓
Operators
      ↓
Precedence
      ↓
Tuple Assignment
      ↓
Functions
      ↓
Function Definition
      ↓
Parameters & Arguments
      ↓
Flow of Execution
```

Do not teach concepts in an arbitrary order.

---

# 41. MULTIPLE DEPTH LEVELS

Every important concept should have:

## Level 1 — Simple

```text
What is it?
```

## Level 2 — Practical

```text
How do I use it?
```

## Level 3 — Deep

```text
What happens during execution?
Why does it behave this way?
```

## Level 4 — Application

```text
Where can I use it?
```

A beginner can stay at Level 1–2 initially and explore Level 3–4 when ready.

---

# 42. DEEP EXPLANATION RULE

Deep explanation must explain behavior, not just add more text.

Good deep explanation:

```python
x = x + 1
```

Explain:

```text
1. Read the current value of x.
2. Evaluate x + 1.
3. Produce a new result.
4. Bind x to the resulting value.
```

Bad deep explanation:

> This line is very important because variables are useful in programming.

Depth must add understanding.

---

# 43. BASIC VS DEEP VIEW

Use expandable sections:

```text
▸ Basic Explanation
▸ Deep Dive
```

Basic:

> A function is a reusable block of code.

Deep Dive:

> A function definition creates a function object and associates it with a name; calling the function transfers control to its body with the provided arguments bound to parameters.

This allows beginners to learn without hiding technical depth.

---

# 44. CONCEPT DIFFICULTY

Each concept should have:

```text
Beginner
Intermediate
Advanced
Challenge
```

Difficulty affects:

```text
examples
practice
simulation
questions
challenge
```

Do not make beginner concepts difficult merely to make the course appear advanced.

---

# 45. CONCEPT DEPENDENCY

Every concept should contain:

```text
Prerequisites
Related Concepts
Next Concepts
```

Example:

```text
Assignment

Prerequisites:
Values
Variables

Related:
Expressions

Next:
Tuple Assignment
```

---

# 46. UNIT I CONCEPT FLOW

For the first unit, use the syllabus-driven progression:

```text
Interpreter
 ↓
Values / Types
 ↓
Strings / Lists
 ↓
Variables
 ↓
Expressions
 ↓
Statements
 ↓
Operators
 ↓
Precedence
 ↓
Tuple Assignment
 ↓
Modules / Functions
 ↓
Function Definition
 ↓
Parameters / Arguments
 ↓
Flow of Execution
 ↓
Practical Programs
```

---

# 47. UNIT I SIMULATION MAP

```text
Interpreter
→ Code Execution Pipeline

Interactive Mode
→ Command-by-command execution

int / float / bool
→ Type Detective

String
→ Character / Index Explorer

List Introduction
→ Indexed Value Explorer

Variables
→ Name → Value Visualizer

Assignment
→ State Change Simulator

Expression
→ Expression Evaluator

Operators
→ Operator Playground

Precedence
→ Step-by-Step Evaluator

Tuple Assignment
→ Swap / Multi-Assignment Visualizer

Modules
→ Module Loading Visualizer

Functions
→ Function Call Flow

Parameters
→ Argument → Parameter Mapping

Flow of Execution
→ Step Debugger

Distance Between Points
→ Interactive Coordinate Plane
```

---

# 48. REAL-WORLD EXAMPLE MAP

| Concept | Real-world example |
|---|---|
| Interpreter | Giving instructions to a machine |
| Data types | Student profile |
| Integer | Number of students |
| Float | CGPA |
| Boolean | Attendance present/absent |
| String | Student name |
| List | Marks |
| Variable | Student record fields |
| Assignment | Updating attendance |
| Expression | Canteen bill |
| Operators | Shopping calculation |
| Precedence | Multi-item bill |
| Tuple assignment | Swapping seats |
| Function | Reusable college service |
| Parameter | Student-specific input |
| Module | Department/tool collection |
| Execution flow | Laboratory instructions |
| Distance | Two buildings on campus |

---

# 49. STORY MODE DESIGN

Story Mode should follow:

```text
Scene
 ↓
Problem
 ↓
Student decision
 ↓
Programming concept
 ↓
Action
 ↓
Result
 ↓
Reflection
```

Example:

```text
Scene:
You are building an attendance tracker.

Problem:
You need to remember how many classes a student attended.

Decision:
Give the number a meaningful name.

Action:

attended = 34

Result:
The program can now use attended later.

Concept:
Variable + assignment.
```

---

# 50. STORY MODE MUST NOT BECOME A GAME

Story Mode should remain educational.

Do:

```text
short scenes
meaningful choices
visual changes
real-world context
```

Avoid:

```text
unrelated fictional drama
long character dialogue
points for clicking
animation with no teaching purpose
```

The story exists to improve understanding.

---

# 51. PREDICTION LOOP

A strong concept interaction is:

```text
Student sees code
       ↓
Student predicts
       ↓
Student commits answer
       ↓
Simulation runs
       ↓
Prediction vs actual
       ↓
Explanation
```

Use this frequently for:

```text
variables
expressions
assignment
precedence
functions
parameters
execution flow
```

---

# 52. CODE-STATE SYNCHRONIZATION

For interactive code:

```text
Current line
+
Current variables
+
Current output
+
Explanation
```

must remain synchronized.

Example:

```text
Code:

x = 10          ← highlighted

State:

x → 10

Explanation:

Python evaluates 10 and assigns that value to x.
```

When the next line runs:

```text
Code:

y = 20          ← highlighted

State:

x → 10
y → 20
```

---

# 53. CONTENT REUSE

The same concept should work across:

```text
Learn Mode
Story Mode
Practice
Review
Assessment Feedback
```

Do not duplicate the entire concept in multiple systems.

Use the concept as the source content and create different presentations around it.

---

# 54. CONTENT VS PRESENTATION

Separate:

```text
Concept Data
```

from:

```text
UI Presentation
```

Concept data should contain:

```text
Explanation
Examples
Rules
Simulation definition
Questions
Problems
```

The React application decides how to display it.

---

# 55. AUTHORING FILE STRUCTURE

Recommended:

```text
content/
└── courses/
    └── python-programming/
        └── unit-01/
            └── variables/
                ├── concept.json
                ├── concept.md
                ├── examples.json
                ├── simulations.json
                ├── problems.json
                └── quiz.json
```

For larger projects, one folder per concept is preferable.

---

# 56. CONCEPT MARKDOWN TEMPLATE

Use:

```md
# Concept: Variables

## Metadata

## Learning Objective

## Story Mode

## Why Do We Need This?

## Simple Explanation

## Formal Explanation

## Mental Model

## Visual Model

## Syntax

## Rules

## Smallest Example

## Code Explanation

## Execution Trace

## Internal State

## Interactive Simulation

## Guided Example

## Real-World Example

## Compare / Contrast

## Common Mistakes

## Debugging

## Guided Practice

## Independent Practice

## Challenge

## Quick Test

## Reflection

## Summary

## What Comes Next
```

---

# 57. SIMULATION DATA TEMPLATE

Example:

```json
{
  "id": "variable-assignment-simulation",
  "conceptId": "python-assignment",
  "type": "state-simulator",
  "title": "See Assignment Happen",
  "goal": "Show how a value becomes associated with a variable name.",
  "initialState": {},
  "controls": [
    "step",
    "run",
    "reset"
  ],
  "steps": [
    {
      "code": "x = 10",
      "explanation": "Python evaluates 10 and binds the name x to that value.",
      "state": {
        "x": 10
      }
    }
  ]
}
```

---

# 58. PROBLEM DATA TEMPLATE

```json
{
  "id": "py-u1-variable-01",
  "conceptId": "python-variables",
  "language": "python",
  "difficulty": "beginner",
  "title": "Student Profile",
  "description": "Store and display a student's name, age and CGPA.",
  "starterCode": "",
  "skills": [
    "variables",
    "assignment",
    "print"
  ]
}
```

---

# 59. QUICK TEST DATA TEMPLATE

```json
{
  "id": "quiz-python-assignment-01",
  "conceptId": "python-assignment",
  "type": "output",
  "question": "What is the value of x?",
  "code": "x = 10\\nx = x + 5",
  "options": [
    "10",
    "15",
    "20",
    "50"
  ],
  "answer": "15",
  "explanation": "Python reads the current value of x, adds 5, and assigns the result back to x."
}
```

---

# 60. AI CONTENT GENERATION RULE

Whenever an AI creates a new concept, it must:

```text
1. Identify the exact syllabus concept.
2. Identify prerequisites.
3. Explain why the concept is needed.
4. Create a simple real-world story.
5. Give a simple explanation.
6. Give a technically accurate explanation.
7. Create a mental model.
8. Create a visual model.
9. Give syntax.
10. Explain the rules.
11. Give the smallest example.
12. Give at least one additional example.
13. Explain code line by line.
14. Create an execution trace where useful.
15. Create an interactive simulation where useful.
16. Give a realistic college-oriented example.
17. Show common mistakes.
18. Give one debugging example.
19. Give guided practice.
20. Give independent practice.
21. Give a challenge.
22. Give a 3–5 question quick test.
23. Add a reflection.
24. Summarize.
25. Explain what comes next.
```

Do not generate filler sections merely to satisfy a checklist.

If a section is not meaningful for a concept, mark it:

```text
Not required for this concept
```

rather than inventing artificial content.

---

# 61. AI CONTENT ACCURACY RULE

The AI must distinguish:

```text
Official syllabus content
Teaching enhancement
Analogy
Technical explanation
Optional advanced content
```

Do not silently change syllabus requirements.

For Unit I, the supplied academic syllabus is the source for what belongs in the unit, while the supplied teaching plan is the source for the intended 12-class progression.

---

# 62. ONE NEW IDEA AT A TIME

When introducing:

```text
variables
```

do not simultaneously introduce:

```text
loops
exceptions
classes
recursion
```

Use previously learned concepts where possible.

The progression should feel cumulative:

```text
Earlier knowledge
      +
One new idea
      =
New understanding
```

---

# 63. REUSE PREVIOUS KNOWLEDGE

Every new concept should reuse old concepts.

Example:

```text
Values
 ↓
Variables
 ↓
Expressions
 ↓
Functions
```

This prevents each lesson from feeling like an isolated topic.

---

# 64. COMPLEXITY GROWTH

The concept examples should grow approximately as:

```text
Example 1
Tiny

Example 2
Slightly bigger

Example 3
Real-world

Practice
Student writes

Challenge
Student combines
```

Do not jump from a one-line example directly to a large application.

---

# 65. EDGE CASES

Teach edge cases after the normal case.

Example:

```text
Normal:
age = 20

Edge:
age = 0
```

Do not overload the beginner lesson with obscure edge cases.

---

# 66. ACCESSIBILITY

Every simulation must have:

```text
Text explanation
Keyboard operation
Visible state
Reset
```

Animation must not be the only way to understand the concept.

---

# 67. STUDENT PROGRESSION

A concept's ideal progression is:

```text
SEE
 ↓
UNDERSTAND
 ↓
PREDICT
 ↓
INTERACT
 ↓
MODIFY
 ↓
WRITE
 ↓
DEBUG
 ↓
APPLY
 ↓
EXPLAIN
```

This is the core educational model for CodePath.

---

# 68. FINAL AUTHORING CONTRACT

Every concept in CodePath LMS should feel like a small interactive classroom.

The ideal experience is:

```text
"What problem am I solving?"
        ↓
"Ah, this concept helps solve it."
        ↓
"I can see how it works."
        ↓
"I can see the code."
        ↓
"I can see Python execute it."
        ↓
"I can change it."
        ↓
"I can write it myself."
        ↓
"I can debug it."
        ↓
"I can use it in a realistic problem."
        ↓
"I can explain it."
```

The goal is not:

```text
Read → Memorize → Test
```

The goal is:

```text
Understand
→ Visualize
→ Interact
→ Write
→ Execute
→ Debug
→ Apply
→ Explain
```

This concept-level standard should be applied consistently across Unit I and later extended to every other unit, course, and programming language.
