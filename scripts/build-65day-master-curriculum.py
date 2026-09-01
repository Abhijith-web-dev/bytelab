import os
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONTENT_DIR = os.path.join(ROOT_DIR, 'content', 'courses', 'python-programming')

def write_json(file_path, data):
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

def write_text(file_path, text):
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(text.strip() + '\n')

print("Generating 65-Day Master Curriculum for 19AI301 / CS3301...")

course_data = {
    "id": "python-programming",
    "code": "19AI301 / CS3301",
    "title": "Python Programming",
    "programme": "B.Tech Artificial Intelligence and Data Science / CSE",
    "ltpc": "2-0-2-3",
    "totalPeriods": 60,
    "totalDays": 65,
    "unitsCount": 6,
    "chaptersCount": 65,
    "language": "python",
    "runtimeVersion": "Python 3.11 (Pyodide WebAssembly)",
    "description": "Comprehensive 65-day interactive curriculum: from foundational data types, conditionals, loops, and data structures to files, packages, and numerical data processing with NumPy and pandas.",
    "outcomes": [
        {"code": "CO1", "statement": "Read and write simple Python programs using basic data types, expressions, and statements", "bloomLevel": "Understand"},
        {"code": "CO2", "statement": "Develop programs with conditionals, loops, and modular functions", "bloomLevel": "Create"},
        {"code": "CO3", "statement": "Use lists, tuples, and dictionaries for complex data manipulation and searching/sorting", "bloomLevel": "Apply"},
        {"code": "CO4", "statement": "Use files, exception handling, modules, packages, and classes for robust software design", "bloomLevel": "Apply"},
        {"code": "CO5", "statement": "Use NumPy arrays and pandas DataFrames for numerical computation and data analytics", "bloomLevel": "Apply"}
    ],
    "units": [
        {
            "id": "unit-01",
            "unitNumber": 1,
            "romanNumber": "Unit I",
            "title": "Data Types, Expressions, Statements",
            "description": "Python interpreter, interactive mode, values and types (int, float, boolean, string, list), variables, expressions, statements, tuple assignment, precedence, comments, modules and functions, flow of execution.",
            "periods": 12,
            "outcomes": ["CO1"],
            "chapters": [f"day-{i:02d}" for i in range(1, 13)]
        },
        {
            "id": "unit-02",
            "unitNumber": 2,
            "romanNumber": "Unit II",
            "title": "Control Flow, Functions",
            "description": "Conditionals (if, if-else, if-elif-else), Iteration (while, for, break, continue, pass), Fruitful functions, scope, composition, recursion, Strings (slices, immutability, string module), Lists as arrays.",
            "periods": 12,
            "outcomes": ["CO2"],
            "chapters": [f"day-{i:02d}" for i in range(13, 25)]
        },
        {
            "id": "unit-03",
            "unitNumber": 3,
            "romanNumber": "Unit III",
            "title": "Lists, Tuples, Dictionaries",
            "description": "Lists (operations, slices, methods, loops, mutability, aliasing, cloning), Tuples, Dictionaries, list comprehensions, linear/binary search, selection/insertion/merge sort, histograms.",
            "periods": 12,
            "outcomes": ["CO3"],
            "chapters": [f"day-{i:02d}" for i in range(25, 37)]
        },
        {
            "id": "unit-04",
            "unitNumber": 4,
            "romanNumber": "Unit IV",
            "title": "Files, Modules, Packages",
            "description": "Text files, format operator, command line arguments, errors and exceptions, modules, packages, Classes, objects, word count, copy file.",
            "periods": 12,
            "outcomes": ["CO4"],
            "chapters": [f"day-{i:02d}" for i in range(37, 49)]
        },
        {
            "id": "unit-05",
            "unitNumber": 5,
            "romanNumber": "Unit V",
            "title": "NumPy, Data Frame",
            "description": "NumPy arrays (creation, shape, slicing, math), Pandas Series, Dataframes, Missing data, Merging, Groupby, Apply, Sorting, File I/O, Matrix operations.",
            "periods": 12,
            "outcomes": ["CO5"],
            "chapters": [f"day-{i:02d}" for i in range(49, 61)]
        },
        {
            "id": "unit-06",
            "unitNumber": 6,
            "romanNumber": "Consolidation",
            "title": "Revision & Assessment",
            "description": "Master consolidation of all concepts, full-scale practical assessment across all 5 units.",
            "periods": 5,
            "outcomes": ["CO1", "CO2", "CO3", "CO4", "CO5"],
            "chapters": [f"day-{i:02d}" for i in range(61, 66)]
        }
    ]
}

write_json(os.path.join(CONTENT_DIR, 'course.json'), course_data)

days_spec = [
    # ---------------- UNIT 1 (Days 1–12) ----------------
    (1, "unit-01", "Python Interpreter & Interactive Mode", "Type B: Flowchart / Decision Simulation", "CO1",
     "Introduction to the Python interpreter, running code in interactive mode vs script mode.",
     "The Kitchen Recipe and the Master Chef Translator"),
    (2, "unit-01", "Values and Types (int, float, boolean)", "Type A: Value / State Simulation", "CO1",
     "Understanding primitive data types: integers, floats, and booleans.",
     "The Color-Coded Storage Boxes"),
    (3, "unit-01", "String and List Types", "Type E: Data Structure Visualizer", "CO1",
     "Basic introduction to string and list types as sequences of values.",
     "The Alphabet Necklace and the Shopping Checklist"),
    (4, "unit-01", "Variables and Comments", "Type A: Value / State Simulation", "CO1",
     "Declaring variables, naming rules, and adding inline/block comments.",
     "The Postal Mailbox & Sticky Name Tags"),
    (5, "unit-01", "Expressions and Statements", "Type A: Value / State Simulation", "CO1",
     "Differentiating expressions (evaluate to a value) and statements (execute an action).",
     "The Calculator Formula vs The Action Command"),
    (6, "unit-01", "Precedence of Operators", "Type B: Flowchart / Decision Simulation", "CO1",
     "Understanding how mathematical operators are evaluated using BEDMAS/PEMDAS precedence.",
     "The Math Traffic Rules and Priority Pass"),
    (7, "unit-01", "Tuple Assignment & Value Swapping", "Type A: Value / State Simulation", "CO1",
     "Swapping two values elegantly without a temporary variable, and circulating n variables.",
     "The Simultaneous Juggling Trick"),
    (8, "unit-01", "Modules and Built-in Functions", "Type D: Code Execution Tracer", "CO1",
     "Importing standard modules (e.g. math) and using built-in functions.",
     "The Magical Reusable Toolkit"),
    (9, "unit-01", "Function Definition and Use", "Type D: Code Execution Tracer", "CO1",
     "Defining custom functions using 'def' and calling them.",
     "The Custom Recipe Book"),
    (10, "unit-01", "Flow of Execution", "Type D: Code Execution Tracer", "CO1",
     "Tracing how the Python interpreter jumps execution into a function and returns.",
     "The Stack of Cafeteria Trays"),
    (11, "unit-01", "Parameters and Arguments", "Type D: Code Execution Tracer", "CO1",
     "Passing arguments to function parameters.",
     "The Coffee Vending Machine Selector"),
    (12, "unit-01", "Unit I Illustrative Programs", "Type D: Code Execution Tracer", "CO1",
     "Practical programs: Exchange the values of two variables, circulate the values of n variables, distance between two points.",
     "The Coordinate Map and The Circle Dance"),

    # ---------------- UNIT 2 (Days 13–24) ----------------
    (13, "unit-02", "Boolean Values and Operators", "Type B: Flowchart / Decision Simulation", "CO2",
     "Evaluating Boolean logic and comparison operators.",
     "The Security Checkpoint & Dual Key Lock"),
    (14, "unit-02", "Conditional Execution (if)", "Type B: Flowchart / Decision Simulation", "CO2",
     "Running code blocks conditionally based on Boolean truth.",
     "The Single Railway Track Switch"),
    (15, "unit-02", "Alternative (if-else) & Chained (if-elif-else)", "Type B: Flowchart / Decision Simulation", "CO2",
     "Handling multiple mutually exclusive branching paths.",
     "The Fork in the Road and The Decision Ladder"),
    (16, "unit-02", "Iteration State & The while Loop", "Type C: Loop Timeline Simulation", "CO2",
     "Repeating code continuously while a condition remains True.",
     "The Factory Assembly Line Conveyor"),
    (17, "unit-02", "The for Loop & range()", "Type C: Loop Timeline Simulation", "CO2",
     "Iterating over sequences systematically.",
     "The Roll Call Attendance Sheet"),
    (18, "unit-02", "Loop Control: break, continue, pass", "Type C: Loop Timeline Simulation", "CO2",
     "Controlling execution flow from inside a loop.",
     "The Emergency Stop Switch & Fast-Forward Button"),
    (19, "unit-02", "Fruitful Functions & Return Values", "Type D: Code Execution Tracer", "CO2",
     "Returning computed results from functions to the caller.",
     "The Automated Calculation Factory"),
    (20, "unit-02", "Scope (Local/Global) & Function Composition", "Type D: Code Execution Tracer", "CO2",
     "Understanding variable visibility and chaining functions.",
     "The Neighborhood Whispering Rules"),
    (21, "unit-02", "Recursion", "Type D: Code Execution Tracer", "CO2",
     "Functions that call themselves to solve smaller problem instances.",
     "The Russian Nesting Dolls"),
    (22, "unit-02", "Strings: Immutability & Slices", "Type E: Data Structure Visualizer", "CO2",
     "Extracting substrings using slicing and understanding that strings cannot be changed in place.",
     "The Word Scissors"),
    (23, "unit-02", "String Methods, Module & Lists as Arrays", "Type E: Data Structure Visualizer", "CO2",
     "Using string transformation methods, string module utilities, and simulating arrays with lists.",
     "The Text Formatter & Data Shelves"),
    (24, "unit-02", "Unit II Illustrative Programs", "Type F: Algorithm Animation", "CO2",
     "Practical programs: Square root (Newton's method), GCD, exponentiation, sum an array of numbers.",
     "The Mathematical Detective & Number Sorter"),

    # ---------------- UNIT 3 (Days 25–36) ----------------
    (25, "unit-03", "Lists: Operations and Slices", "Type E: Data Structure Visualizer", "CO3",
     "Combining lists and extracting sublists.",
     "The Expandable Train Carriages"),
    (26, "unit-03", "List Methods and List Loop", "Type E: Data Structure Visualizer", "CO3",
     "Mutating lists (append, remove, pop) and iterating through elements.",
     "The Dynamic Toolbox"),
    (27, "unit-03", "Mutability, Aliasing, and Cloning", "Type E: Data Structure Visualizer", "CO3",
     "Understanding reference variables, side effects of aliasing, and how to clone lists safely.",
     "Two Keys to the Same Locker vs The Photocopy"),
    (28, "unit-03", "List Parameters & Advanced Comprehensions", "Type E: Data Structure Visualizer", "CO3",
     "Passing lists to functions and transforming lists efficiently using list comprehension.",
     "The One-Line Fruit Sorter Factory"),
    (29, "unit-03", "Tuples: Assignment & Return Values", "Type E: Data Structure Visualizer", "CO3",
     "Using immutable tuples for packing/unpacking and returning multiple values.",
     "The Sealed Glass Display Case"),
    (30, "unit-03", "Dictionaries: Operations & Methods", "Type E: Data Structure Visualizer", "CO3",
     "Storing key-value pairs and using dictionary methods.",
     "The Magic Postal Lockers with Custom Nameplates"),
    (31, "unit-03", "Finding Maximum of a List", "Type F: Algorithm Animation", "CO3",
     "Iterating through a sequence to find the maximum element.",
     "The King of the Hill"),
    (32, "unit-03", "Linear Search", "Type F: Algorithm Animation", "CO3",
     "Sequential searching algorithm.",
     "Finding a Book on a Messy Shelf"),
    (33, "unit-03", "Binary Search", "Type F: Algorithm Animation", "CO3",
     "Divide-and-conquer search on sorted data.",
     "Finding a Word in a Dictionary"),
    (34, "unit-03", "Selection Sort", "Type F: Algorithm Animation", "CO3",
     "Sorting by repeatedly finding the minimum.",
     "Organizing Playing Cards by Rank"),
    (35, "unit-03", "Insertion Sort", "Type F: Algorithm Animation", "CO3",
     "Sorting by building a sorted array one item at a time.",
     "The Card Dealer's Technique"),
    (36, "unit-03", "Merge Sort & Histograms", "Type F: Algorithm Animation", "CO3",
     "Divide-and-conquer sorting and frequency counting using dictionaries.",
     "The Assembly Line Sorter & Frequency Counter"),

    # ---------------- UNIT 4 (Days 37–48) ----------------
    (37, "unit-04", "Text Files: Reading and Writing", "Type G: File / Data Pipeline Simulation", "CO4",
     "Opening, reading, writing, and closing text files.",
     "The Long-Term Diary and Filing Cabinet"),
    (38, "unit-04", "The Format Operator", "Type G: File / Data Pipeline Simulation", "CO4",
     "Formatting output using format operators and string interpolation.",
     "The Professional Certificate Formatter"),
    (39, "unit-04", "Command Line Arguments", "Type G: File / Data Pipeline Simulation", "CO4",
     "Passing arguments to a Python script via sys.argv.",
     "The Mail Delivery Address Label"),
    (40, "unit-04", "Errors and Exceptions", "Type G: File / Data Pipeline Simulation", "CO4",
     "Differentiating syntax errors from runtime exceptions.",
     "The Grammar Mistake vs The Pothole"),
    (41, "unit-04", "Handling Exceptions (try-except)", "Type G: File / Data Pipeline Simulation", "CO4",
     "Gracefully catching and handling runtime exceptions to prevent program crashes.",
     "The Trapeze Safety Net"),
    (42, "unit-04", "Modules and Packages", "Type G: File / Data Pipeline Simulation", "CO4",
     "Organizing Python code into modules and directory-based packages.",
     "The Labeled Department Store Shelves"),
    (43, "unit-04", "Classes and Objects Intro", "Type G: File / Data Pipeline Simulation", "CO4",
     "Introduction to object-oriented programming: blueprints (classes) and instances (objects).",
     "The Architectural Blueprint and Finished Houses"),
    (44, "unit-04", "Object Attributes and Methods", "Type G: File / Data Pipeline Simulation", "CO4",
     "Adding state and behavior to custom objects.",
     "The Robot Factory"),
    (45, "unit-04", "Unit IV Practical: Word Count (CLI)", "Type G: File / Data Pipeline Simulation", "CO4",
     "Building a program that takes command line arguments and counts words in a file.",
     "The Automated Document Scanner"),
    (46, "unit-04", "Unit IV Practical: Copy File", "Type G: File / Data Pipeline Simulation", "CO4",
     "Script to safely open a source file, read contents, and write to a destination file.",
     "The Photocopy Machine"),
    (47, "unit-04", "Consolidation: File Parsing & Objects", "Type G: File / Data Pipeline Simulation", "CO4",
     "Combining file reading and object initialization.",
     "The Data Importer"),
    (48, "unit-04", "Consolidation: Exception-Safe Pipelines", "Type G: File / Data Pipeline Simulation", "CO4",
     "Robust coding practices integrating packages, exceptions, and file I/O.",
     "The Industrial Safety Protocols"),

    # ---------------- UNIT 5 (Days 49–60) ----------------
    (49, "unit-05", "NumPy: Creating a NumPy Array", "Type H: Matrix / Table Visualization", "CO5",
     "Initializing homogeneous arrays for high-performance math.",
     "The Supercharged Number Conveyor"),
    (50, "unit-05", "The Shape and Reshaping of NumPy Array", "Type H: Matrix / Table Visualization", "CO5",
     "Manipulating dimensions of multi-dimensional arrays.",
     "Rearranging Chocolate Pieces in a Box"),
    (51, "unit-05", "Indexing and Slicing of NumPy Array", "Type H: Matrix / Table Visualization", "CO5",
     "Accessing elements, rows, and sub-matrices.",
     "The Coordinate Target Selector"),
    (52, "unit-05", "Maths & Basic Arithmetic with NumPy Arrays", "Type H: Matrix / Table Visualization", "CO5",
     "Vectorized element-wise addition, subtraction, multiplication, and division.",
     "Applying Operations to Whole Rows"),
    (53, "unit-05", "Matrix Operations (Multiply, Inverse) & Verification", "Type H: Matrix / Table Visualization", "CO5",
     "Using loops and library functions for matrix multiplication and finding the inverse.",
     "The Linear Algebra Engine"),
    (54, "unit-05", "Pandas Series & DataFrames", "Type H: Matrix / Table Visualization", "CO5",
     "Introduction to 1D Series and 2D labeled DataFrames.",
     "The Intelligent Multi-Column Spreadsheet"),
    (55, "unit-05", "Selection and Indexing in Pandas", "Type H: Matrix / Table Visualization", "CO5",
     "Filtering DataFrame rows and selecting specific columns.",
     "The Targeted Database Query Filter"),
    (56, "unit-05", "Handling Missing Data", "Type H: Matrix / Table Visualization", "CO5",
     "Detecting, dropping, and imputing missing (NaN) values.",
     "The Data Cleaning & Tidy Sorter"),
    (57, "unit-05", "Merging, Joining, Concatenating", "Type H: Matrix / Table Visualization", "CO5",
     "Combining multiple tabular datasets into one.",
     "The Department Store Sales Aggregator"),
    (58, "unit-05", "Groupby and Apply Functions", "Type H: Matrix / Table Visualization", "CO5",
     "Aggregating data by categories and applying custom transformations.",
     "The Analytical Report Generator"),
    (59, "unit-05", "Sorting in DataFrames", "Type H: Matrix / Table Visualization", "CO5",
     "Ordering rows by column values ascending or descending.",
     "The Leaderboard Sorter"),
    (60, "unit-05", "File Read and Write Support (CSV Processing)", "Type H: Matrix / Table Visualization", "CO5",
     "Reading and processing data from a CSV file.",
     "The Automated Data Scientist Pipeline"),

    # ---------------- CONSOLIDATION (Days 61–65) ----------------
    (61, "unit-06", "Consolidation: Control Flow & Logic", "Type B: Flowchart / Decision Simulation", "CO1, CO2",
     "Mastery of loops, conditionals, and logical operators.",
     "The Logic Puzzle Room"),
    (62, "unit-06", "Consolidation: Advanced Data Structures", "Type E: Data Structure Visualizer", "CO3",
     "Mastery of lists, dictionaries, tuples, and comprehensions.",
     "The Data Structure Gauntlet"),
    (63, "unit-06", "Consolidation: Search & Sort Algorithms", "Type F: Algorithm Animation", "CO3",
     "Reviewing binary search, linear search, and sorting implementations.",
     "The Algorithm Olympics"),
    (64, "unit-06", "Consolidation: Files, Modules, and Error Handling", "Type G: File / Data Pipeline Simulation", "CO4",
     "Building robust I/O pipelines.",
     "The File Processing Factory"),
    (65, "unit-06", "Capstone: NumPy & Pandas End-to-End", "Type H: Matrix / Table Visualization", "CO5",
     "Complete CSV data analytics pipeline integrating all course concepts.",
     "The Final Graduation Data Project"),
]

for day_num, unit_id, title, sim_type, co_map, desc, story_title in days_spec:
    ch_folder = f"day-{day_num:02d}"
    dir_path = os.path.join(CONTENT_DIR, unit_id, ch_folder)
    
    chapter_json = {
        "id": ch_folder,
        "unitId": unit_id,
        "dayNumber": day_num,
        "order": day_num,
        "title": f"Day {day_num}: {title}",
        "shortTitle": title,
        "description": desc,
        "simulationType": sim_type,
        "estimatedMinutes": 20,
        "difficulty": "beginner" if day_num <= 24 else ("intermediate" if day_num <= 48 else "advanced"),
        "outcomes": [co_map.split(",")[0].strip()],
        "prerequisites": [f"day-{day_num-1:02d}"] if day_num > 1 else [],
        "lessonsCount": 1,
        "problemsCount": 1,
        "quizCount": 1
    }

    # Generate lesson.md adhering strictly to the 27-section rule where feasible
    lesson_md = f"""# Day {day_num}: {title}

## 01. Concept Header
**{title}**
{desc}
Difficulty: {chapter_json['difficulty'].capitalize()} | Estimated Time: 20 min | Unit: {unit_id.replace('unit-', 'Unit ')}

## 02. Learning Objective
By the end of this lesson, you can:
✓ Understand the core concepts of {title.lower()}
✓ Apply syntax correctly to solve problems
✓ Trace internal state and identify common mistakes

## 03. Story Hook
**{story_title}**
Imagine you need to automate a repetitive task or manage complex data efficiently. {story_title} represents how this programming concept solves real-world challenges elegantly.

## 04. Problem / Motivation
Without this concept, writing clean, robust, and scalable code would be incredibly difficult. We need a way to streamline logic and operations in Python effectively.

## 05. Simple Explanation
In simple terms, {title.lower()} allows us to instruct the computer to handle data, make decisions, or process information predictably.

## 06. Formal Explanation
In Python, {title.lower()} follows strict rules of execution, syntax constraints, and memory allocation governed by the Python interpreter.

## 07. Mental Model
Think of it as:
`Input -> {title} Process -> Output/State Change`

## 08. Visual Model
```text
[ {title} Visualization ]
State A --------> State B
```

## 09. Syntax
```python
# General syntax for {title}
# Feature implementation
```

## 10. Rules
✓ Rule 1: Adhere to strict indentation if it involves blocks.
✓ Rule 2: Observe type constraints.
✗ Warning: Do not violate Python's execution order or scope bounds.

## 11. Smallest Example
```python
# Smallest working example
print("Learning {title}")
```

## 12. Step-by-Step Code Explanation
1. **Initialize:** The environment prepares variables.
2. **Execute:** The statement runs.
3. **Yield:** A result is generated or state is modified.

## 13. Execution Trace
| Line | Instruction | State |
|---|---|---|
| 1 | `Initialize` | `State 0` |
| 2 | `Process` | `State 1` |

## 14. Internal State
**BEFORE:** State is untouched.
**AFTER:** State has been mutated or new objects created.

## 15. Interactive Simulation
(Explore the visual simulation tool to observe {title} in action.)

## 16. Guided Example
```python
def guided_example():
    # Demonstrating {title}
    pass
```

## 17. Real-World Example
Using this in a college registration system, banking app, or data analytics pipeline makes the implementation scalable.

## 18. Compare / Contrast
Compare this to doing things manually or using an older, more verbose approach. This concept is cleaner and faster.

## 19. Common Mistakes
- Syntax errors (missing colons, brackets)
- Name errors (typos in variables)
- Type errors (mismatched operations)

## 20. Debugging Example
```python
# Broken code
# print(wrong_variable)
# Fix: Ensure variable exists before use.
```

## 21. Guided Practice
Try writing a small snippet that uses {title} on your own. Use the code playground.

## 22. Independent Practice
Complete the practice tasks provided in the interactive sandbox.

## 23. Challenge
Can you combine this concept with what you learned in previous days to build a more complex function?

## 24. Quick Test
Test your knowledge with the multiple choice quiz below.

## 25. Reflection
Consider how {title} changes the way you approach problem-solving in Python.

## 26. Summary
You have mastered {title}. You now know its syntax, rules, and how to debug it.

## 27. What Comes Next
In the next day, we will build upon this foundation with more advanced operations.
"""

    story_md = f"""# The Story of {title}

**{story_title}**

When learning about {title.lower()}, it helps to imagine real-world scenarios. Just as a college administration manages thousands of records, Python manages data and execution flows seamlessly.

This mode allows you to learn the intuition behind the concept without getting bogged down by raw syntax immediately.
"""

    simulation_json = {
        "id": f"sim-day-{day_num}",
        "type": sim_type.split(":")[0].strip(),
        "title": f"Simulation: {title}",
        "steps": [
            {"step": 1, "description": "Initial state before execution.", "state": {}},
            {"step": 2, "description": "Processing logic...", "state": {}},
            {"step": 3, "description": "Final output.", "state": {}}
        ]
    }

    examples_json = [
        {
            "id": f"ex-day-{day_num}-1",
            "title": f"Basic Usage of {title}",
            "code": f"# Example for {title}\nprint('Day {day_num} executed successfully.')",
            "explanation": "This demonstrates the minimum syntax needed."
        }
    ]

    problems_json = [
        {
            "id": f"prob-day-{day_num}",
            "title": f"Practice: {title}",
            "description": f"Write a Python script that demonstrates {title.lower()}.",
            "starterCode": "# Write your code here\n",
            "solutionCode": f"# Expected logic for {title}\nprint('Success')",
            "testCases": [
                {
                    "input": "",
                    "expectedOutput": "Success",
                    "isHidden": False
                }
            ]
        }
    ]

    quiz_json = [
        {
            "id": f"quiz-day-{day_num}-1",
            "question": f"Which of the following best describes {title}?",
            "options": [
                "It manages data or execution flow.",
                "It is a hardware component.",
                "It only works on Windows.",
                "It is deprecated."
            ],
            "correctAnswer": 0,
            "explanation": "Python uses this concept to manage data or execution flow logically."
        }
    ]

    write_json(os.path.join(dir_path, 'chapter.json'), chapter_json)
    write_text(os.path.join(dir_path, 'lesson.md'), lesson_md)
    write_text(os.path.join(dir_path, 'story.md'), story_md)
    write_json(os.path.join(dir_path, 'simulation.json'), simulation_json)
    write_json(os.path.join(dir_path, 'examples.json'), examples_json)
    write_json(os.path.join(dir_path, 'problems.json'), problems_json)
    write_json(os.path.join(dir_path, 'quiz.json'), quiz_json)

print(f"Generated successfully: {CONTENT_DIR}")
