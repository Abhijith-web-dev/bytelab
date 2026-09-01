import os
import json
import re
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

print("Generating clean W3Schools + University Notes curriculum (No CPython internals)...")

# 27 comprehensive chapter specifications
chapters = [
    # UNIT I - Chapter 1
    {
        "unitId": "unit-01",
        "folder": "01-interpreter",
        "title": "Introduction to Python, Features & Execution Modes",
        "description": "Discover Python syntax, history, key features, interactive vs script mode, and how Python executes code seamlessly.",
        "estimatedMinutes": 20,
        "difficulty": "beginner",
        "outcome": "CO1",
        "story": """# The Multilingual Chef & The Kitchen Recipe

> *"Learning Python is just like learning to write simple, clear recipes for an assistant who loves cooking and follows every step exactly as written!"*

---

### 🌟 The Big Picture
Imagine you want to bake a batch of cookies. You write down steps in English:
1. *Take 2 cups of flour.*
2. *Add 1 cup of sugar.*
3. *Mix well and bake for 15 minutes.*

In computer programming, **Python** is your friendly assistant. You write clean, simple, English-like instructions, and Python executes them right away!

---

### 🎭 Two Ways to Work with Python

#### 1. Interactive Mode (The Quick Chat)
- **Real-world analogy:** Talking to a friend over text. You send a quick question: *"What is 25 × 4?"*, and you get an immediate reply: *"100"*.
- **When to use:** Great for quick calculations, experimenting with new commands, and testing small one-line ideas.

#### 2. Script Mode (The Saved Recipe Book)
- **Real-world analogy:** Writing a full 5-course dinner menu in a notebook, saving it, and telling the kitchen to prepare the whole feast from top to bottom.
- **When to use:** Essential for building actual applications, tools, and games that you want to save and run again later.

---

### 🧩 Visual Idea: How Code Runs

```text
[ Your Python Code (script.py) ]
               │
               ▼ (Python reads line by line)
[ Step 1: Check grammar & spelling ]
               │
               ▼ (Executes each instruction)
[ Output displayed on your screen! 🎉 ]
```

---

### 💡 Key Takeaway
Python is designed to read like plain English. You don't need complicated setups to start — you just tell Python what to do step by step!
""",
        "lesson": """# Introduction to Python, Features & Execution Modes

## 1. What is Python?
**Python** is a popular, high-level, interpreted programming language created by **Guido van Rossum** and released in **1991**. It is widely used in:
- Web Development (Django, Flask, FastAPI)
- Data Science & Machine Learning (NumPy, Pandas, Scikit-learn)
- Automation & Scripting
- Desktop & Scientific Applications

---

## 2. Key Features of Python

| Feature | Description | Why It Matters |
| :--- | :--- | :--- |
| **Simple & Readable** | Clean syntax resembling natural English | Easy to learn, write, and maintain |
| **Interpreted** | Executed line-by-line without manual compile steps | Fast development and instant feedback |
| **Dynamically Typed** | No need to declare variable types explicitly | Write concise code with less boilerplate |
| **Cross-Platform** | Runs on Windows, macOS, Linux, and WebAssembly | Write once, run anywhere |
| **Extensive Libraries** | Huge standard library ("Batteries Included") | Pre-built tools for math, files, networking, and data |

---

## 3. Interactive Mode vs. Script Mode

| Mode | How to Run | Output Behavior | Ideal For |
| :--- | :--- | :--- | :--- |
| **Interactive Mode** | Run `python` in terminal | Automatically prints results of expressions | Testing single functions, quick experiments |
| **Script Mode** | Run `python script.py` | Requires explicit `print()` to output values | Permanent programs, projects, automation |

---

## 4. "Try It Yourself" — Your First Python Program

```python
# Print greeting to the screen
print("Hello, World!")
print("Welcome to ByteLab Python Programming!")

# Perform basic calculation
result = (50 + 25) * 2
print("Calculated Result:", result)
```

**Output:**
```text
Hello, World!
Welcome to ByteLab Python Programming!
Calculated Result: 150
```

---

## 5. Python Syntax Rules: Indentation & Comments
- **Indentation:** Unlike other languages that use `{}` or `BEGIN/END`, Python uses **indentation (whitespace)** to indicate a block of code.
- **Comments:** Lines starting with `#` are ignored by Python and used for documentation.

```python
# This is a single-line comment
if 5 > 2:
    print("Five is greater than two!")  # 4 spaces indentation
```

---

## 6. Common Beginner Mistakes
- ❌ Mixing tabs and spaces in code blocks (always use 4 spaces).
- ❌ Forgetting parentheses in `print()` (e.g. `print "Hello"` is invalid in Python 3).
""",
        "simulation": {
            "title": "Interactive Step-by-Step Python Execution",
            "codeLines": [
                "# Step 1: Assign greeting message",
                "message = 'Hello, Python Learner!'",
                "# Step 2: Display output to terminal",
                "print(message)",
                "# Step 3: Perform math calculation",
                "total_score = 45 + 55",
                "print('Total Score:', total_score)"
            ],
            "steps": [
                {
                    "activeLine": 2,
                    "explanation": "Python stores the text 'Hello, Python Learner!' in memory and assigns variable 'message' to reference it.",
                    "variables": {"message": {"type": "str", "value": "'Hello, Python Learner!'"}},
                    "output": None
                },
                {
                    "activeLine": 4,
                    "explanation": "The print() function outputs the value stored in 'message' to the standard output terminal.",
                    "variables": {"message": {"type": "str", "value": "'Hello, Python Learner!'"}},
                    "output": "Hello, Python Learner!"
                },
                {
                    "activeLine": 6,
                    "explanation": "Python evaluates the math expression 45 + 55 = 100, and assigns it to 'total_score'.",
                    "variables": {"message": {"type": "str", "value": "'Hello, Python Learner!'"}, "total_score": {"type": "int", "value": "100"}},
                    "output": "Hello, Python Learner!"
                },
                {
                    "activeLine": 7,
                    "explanation": "Prints the formatted string and the calculated total score.",
                    "variables": {"message": {"type": "str", "value": "'Hello, Python Learner!'"}, "total_score": {"type": "int", "value": "100"}},
                    "output": "Hello, Python Learner!\nTotal Score: 100"
                }
            ]
        },
        "examples": [
            {
                "id": "ex-01-01",
                "title": "Interactive Hello World & Math Calculation",
                "code": "print('Welcome to Python 3.11!')\n\n# Calculate rectangle area\nlength = 12\nwidth = 5\narea = length * width\nprint('Area of rectangle:', area)",
                "expectedOutput": "Welcome to Python 3.11!\nArea of rectangle: 60",
                "explanation": "Shows variable assignment and output formatting using print()."
            }
        ],
        "problems": [
            {
                "id": "py-u1-ch1-p1",
                "courseId": "python-programming",
                "unitId": "unit-01",
                "chapterId": "01-interpreter",
                "language": "python",
                "difficulty": "beginner",
                "title": "Welcome Greeting Program",
                "description": "Write a Python program that defines a function `welcome_student(name)` returning `'Welcome to Python, ' + name + '!'`. Call it with `'Alex'` and print the output.",
                "starterCode": "def welcome_student(name):\n    # Return greeting string\n    pass\n\nprint(welcome_student('Alex'))",
                "solutionCode": "def welcome_student(name):\n    return f'Welcome to Python, {name}!'\n\nprint(welcome_student('Alex'))",
                "hints": ["Use f-string formatting: f'Welcome to Python, {name}!'"],
                "testCases": [
                    {"id": "tc-1", "input": "", "expectedOutput": "Welcome to Python, Alex!", "isHidden": False}
                ],
                "skills": ["functions", "strings"],
                "coMapping": ["CO1"],
                "timeLimitMs": 3000,
                "attemptsAllowed": 10
            }
        ],
        "quiz": [
            {
                "id": "q-u1-ch1-1",
                "type": "mcq",
                "difficulty": "beginner",
                "coMapping": ["CO1"],
                "question": "Who created Python and in what year was it first released?",
                "options": [
                    {"id": "opt-1", "text": "Guido van Rossum in 1991", "isCorrect": True, "explanation": "Python was created by Guido van Rossum and released in 1991."},
                    {"id": "opt-2", "text": "Dennis Ritchie in 1972", "isCorrect": False},
                    {"id": "opt-3", "text": "James Gosling in 1995", "isCorrect": False},
                    {"id": "opt-4", "text": "Bjarne Stroustrup in 1985", "isCorrect": False}
                ],
                "explanation": "Guido van Rossum developed Python at CWI in the Netherlands, releasing it in February 1991.",
                "tags": ["history", "basics"]
            }
        ]
    },

    # UNIT I - Chapter 2
    {
        "unitId": "unit-01",
        "folder": "02-values-types",
        "title": "Variables, Values & Built-in Data Types",
        "description": "Master primitive types: int, float, bool, str, and list. Learn type casting with int(), float(), str(), and type checking.",
        "estimatedMinutes": 20,
        "difficulty": "beginner",
        "outcome": "CO1",
        "story": """# The Transparent Storage Boxes & Name Tags

> *"In Python, data is stored in neat, transparent storage boxes, and variable names are just sticky name tags you place on them!"*

---

### 🌟 The Big Picture
Think about how you organize items around your desk:
- You count **5 pencils** (Whole number / Integer).
- You check your water bottle temperature: **36.5°C** (Decimal number / Float).
- You write your friend's name: **"Emma"** (Word / String).
- You check if the lights are ON: **True** (Yes/No Switch / Boolean).

In Python, every piece of information has a specific type suited for its job!

---

### 📦 The 5 Core Data Types

| Type | Real-World Metaphor | Python Example |
| :--- | :--- | :--- |
| **`int`** | Counting whole apples in a basket | `10`, `-4`, `1000` |
| **`float`** | Measuring price with cents ($9.99) | `3.14`, `98.6`, `0.75` |
| **`str`** | A string of alphabet beads | `"Hello"`, `'Python'` |
| **`bool`** | A simple light switch on or off | `True`, `False` |
| **`list`** | A shopping checklist of items | `["Milk", "Eggs", "Bread"]` |

---

### 🔄 Type Conversion (Casting)
Imagine you have the text `"25"` printed on a sticker. You can't do math on a sticker until you convert it into real coins!
- `int("25")` turns the text `"25"` into the math number `25`.
- `str(100)` turns the number `100` into text `"100"`.

---

### 💡 Key Takeaway
Python automatically figures out data types for you, but you can always change from one type to another using casting functions!
""",
        "lesson": """# Variables, Values & Built-in Data Types

## 1. Built-in Data Types in Python
Variables can store data of different types, and different types can do different things.

Python has the following built-in data types by default:

| Category | Type Name | Description | Example |
| :--- | :--- | :--- | :--- |
| **Text Type** | `str` | Sequence of Unicode characters | `name = "Alice"` |
| **Numeric Types** | `int`, `float`, `complex` | Whole numbers, decimals, and imaginary numbers | `x = 10`, `pi = 3.14`, `z = 2+3j` |
| **Sequence Types** | `list`, `tuple`, `range` | Ordered collections of items | `[1, 2, 3]`, `(10, 20)`, `range(5)` |
| **Mapping Type** | `dict` | Key-value pairs | `{"name": "John", "age": 20}` |
| **Set Types** | `set`, `frozenset` | Unordered collections of unique items | `{1, 2, 3}` |
| **Boolean Type** | `bool` | True or False values | `is_logged_in = True` |
| **Binary Types** | `bytes`, `bytearray` | Raw binary bytes | `b"Hello"` |
| **None Type** | `NoneType` | Represents the absence of a value | `result = None` |

---

## 2. Getting the Data Type: `type()`
You can inspect the data type of any variable using the `type()` function:

```python
x = 5
y = "John"
z = 3.14

print(type(x))  # <class 'int'>
print(type(y))  # <class 'str'>
print(type(z))  # <class 'float'>
```

---

## 3. Explicit Type Conversion (Casting)
You can convert from one data type to another using casting constructor functions:

```python
# Converting to Integer: int()
x = int(1)       # x will be 1
y = int(2.8)     # y will be 2 (truncates decimal)
z = int("3")     # z will be 3

# Converting to Float: float()
a = float(1)     # a will be 1.0
b = float("4.2") # b will be 4.2

# Converting to String: str()
s1 = str(10)     # s1 will be "10"
s2 = str(3.14)   # s2 will be "3.14"

# Converting to Boolean: bool()
print(bool(1))    # True
print(bool(0))    # False
print(bool(""))   # False (empty string)
print(bool("Hi")) # True (non-empty string)
```

---

## 4. "Try It Yourself" — Temperature Conversion

```python
# Convert Celsius to Fahrenheit
celsius = 37.0
fahrenheit = (celsius * 9/5) + 32

print("Temperature in Celsius:", celsius)
print("Temperature in Fahrenheit:", fahrenheit)
print("Type of Fahrenheit:", type(fahrenheit))
```

**Output:**
```text
Temperature in Celsius: 37.0
Temperature in Fahrenheit: 98.6
Type of Fahrenheit: <class 'float'>
```

---

## 5. Common Pitfalls
- ❌ Adding a string to an integer without casting: `"Age: " + 25` raises a `TypeError`. (Fix: `"Age: " + str(25)` or use f-strings `f"Age: {25}"`).
- ❌ Trying to convert invalid text to an integer: `int("hello")` raises a `ValueError`.
""",
        "simulation": {
            "title": "Interactive Variable Typing & Casting",
            "codeLines": [
                "# Step 1: Assign integer variable",
                "age = 20",
                "# Step 2: Check type",
                "age_type = type(age).__name__",
                "# Step 3: Convert to float",
                "age_float = float(age)"
            ],
            "steps": [
                {
                    "activeLine": 2,
                    "explanation": "Creates integer variable 'age' with value 20.",
                    "variables": {"age": {"type": "int", "value": "20"}},
                    "output": None
                },
                {
                    "activeLine": 4,
                    "explanation": "type(age) returns 'int', stored in age_type.",
                    "variables": {"age": {"type": "int", "value": "20"}, "age_type": {"type": "str", "value": "'int'"}},
                    "output": None
                },
                {
                    "activeLine": 6,
                    "explanation": "Casting float(20) creates a float value 20.0.",
                    "variables": {"age": {"type": "int", "value": "20"}, "age_type": {"type": "str", "value": "'int'"}, "age_float": {"type": "float", "value": "20.0"}},
                    "output": None
                }
            ]
        },
        "examples": [
            {
                "id": "ex-01-02",
                "title": "Type Checking and Explicit Casting",
                "code": "val = '50'\nprint('Original:', val, type(val))\n\n# Convert to integer and float\nnum_int = int(val)\nnum_float = float(val)\nprint('As Int:', num_int, type(num_int))\nprint('As Float:', num_float, type(num_float))",
                "expectedOutput": "Original: 50 <class 'str'>\nAs Int: 50 <class 'int'>\nAs Float: 50.0 <class 'float'>",
                "explanation": "Demonstrates type casting from string to numeric types."
            }
        ],
        "problems": [
            {
                "id": "py-u1-ch2-p1",
                "courseId": "python-programming",
                "unitId": "unit-01",
                "chapterId": "02-values-types",
                "language": "python",
                "difficulty": "beginner",
                "title": "Temperature Unit Converter",
                "description": "Define a function `celsius_to_fahrenheit(c)` that computes $F = (c \\times 9/5) + 32$. Return the value rounded to 2 decimal places. Call with `c = 37.0` and print the output.",
                "starterCode": "def celsius_to_fahrenheit(c):\n    # Return float converted value\n    pass\n\nprint('Fahrenheit:', celsius_to_fahrenheit(37.0))",
                "solutionCode": "def celsius_to_fahrenheit(c):\n    return round((c * 9/5) + 32, 2)\n\nprint('Fahrenheit:', celsius_to_fahrenheit(37.0))",
                "hints": ["Use round((c * 9/5) + 32, 2)"],
                "testCases": [
                    {"id": "tc-1", "input": "", "expectedOutput": "Fahrenheit: 98.6", "isHidden": False}
                ],
                "skills": ["arithmetic", "float", "type-conversion"],
                "coMapping": ["CO1"],
                "timeLimitMs": 3000,
                "attemptsAllowed": 10
            }
        ],
        "quiz": [
            {
                "id": "q-u1-ch2-1",
                "type": "output_prediction",
                "difficulty": "beginner",
                "coMapping": ["CO1"],
                "question": "What is the output of `type(5 / 2)` in Python 3?",
                "options": [
                    {"id": "opt-1", "text": "<class 'float'>", "isCorrect": True, "explanation": "True division (/) always yields a float in Python 3."},
                    {"id": "opt-2", "text": "<class 'int'>", "isCorrect": False},
                    {"id": "opt-3", "text": "<class 'double'>", "isCorrect": False},
                    {"id": "opt-4", "text": "<class 'number'>", "isCorrect": False}
                ],
                "explanation": "In Python 3, `/` performs float division (5 / 2 = 2.5), whereas `//` performs floor integer division (5 // 2 = 2).",
                "tags": ["types", "operators"]
            }
        ]
    }
]

# Generate remaining 25 chapters
unit_plans = [
    {
        "unitId": "unit-01",
        "outcome": "CO1",
        "chapters": [
            ("03-variables-expressions", "Variables, Identifiers & Expressions", "Naming rules, snake_case conventions, variable assignment, multiple assignment, and swapping.", "The Labeled Storage Drawers"),
            ("04-statements-operators", "Operators & Precedence (PEMDAS)", "Arithmetic (+, -, *, /, //, %), comparison (==, !=, <, >), logical (and, or, not), and operator precedence.", "The Math Traffic Rules & Priority Pass"),
            ("05-functions-intro", "Functions, Parameters & Return Values", "Creating reusable code with def, positional vs keyword arguments, default parameters, and fruitful functions.", "The Magical Coffee Vending Machine"),
            ("06-illustrative-programs", "Illustrative Programs: Swapping, Distance & Conversion", "Real-world calculation programs: swapping two numbers without temporary variables, Euclidean distance formula, and temperature conversion.", "The Currency Exchange & Distance Map")
        ]
    },
    {
        "unitId": "unit-02",
        "outcome": "CO2",
        "chapters": [
            ("01-booleans-conditionals", "Conditionals & Decision Making (if-elif-else)", "Boolean truth values, relational comparisons, logical operators, short-circuit evaluation, and nested branching.", "The Railway Track Switch & Traffic Lights"),
            ("02-iteration-loops", "Loops & Iteration (while and for loops)", "Definite iteration with for loops, indefinite iteration with while loops, break, continue, and else in loops.", "The Carousel Ride and the Smart Counting Robot"),
            ("03-fruitful-functions-scope", "Fruitful Functions, Scope (LEGB) & Composition", "Return values vs void functions, function composition, Local, Enclosing, Global, and Built-in variable scopes.", "The Neighborhood Whispering Rules (Variable Scope)"),
            ("04-recursion", "Recursion & Call Stack Basics", "Solving problems by breaking them into smaller self-similar sub-problems. Base cases, recursive steps, and factorial computation.", "The Russian Matryoshka Nesting Dolls"),
            ("05-strings-methods", "String Slicing, Immutability & Built-in Methods", "String indexing, negative indices, slicing [start:stop:step], immutability, and methods (lower, upper, split, join, replace, find).", "The Unbreakable Alphabet Necklace"),
            ("06-illustrative-gcd-newton", "Illustrative Algorithms: Euclid GCD & Newton Square Root", "Classical numerical algorithms: finding Greatest Common Divisor (GCD) using Euclid's method and square root approximation using Newton-Raphson.", "The Square Root Detective & Tile Master")
        ]
    },
    {
        "unitId": "unit-03",
        "outcome": "CO3",
        "chapters": [
            ("01-lists-mutability", "Lists: Creation, Slicing, Mutability & Methods", "Ordered dynamic sequences, index access, append(), extend(), insert(), pop(), remove(), sort(), aliasing vs cloning.", "The Expandable Train Carriages"),
            ("02-tuples", "Tuples: Immutability, Packing & Unpacking", "Fixed sequences, parentheses syntax, multiple assignment, tuple packing/unpacking, and returning multiple values.", "The Sealed Glass Trophy Case"),
            ("03-dictionaries", "Dictionaries: Key-Value Pairs & Operations", "Fast lookup hash maps, dictionary keys, values, items, get(), update(), and dictionary iteration.", "The Magic Postal Lockers with Custom Nameplates"),
            ("04-list-comprehensions", "List & Dictionary Comprehensions", "Concise, one-line syntax for creating lists and dictionaries with filtering and transformations: [expr for item in iterable if cond].", "The One-Line Fruit Sorter Factory"),
            ("05-illustrative-search-sort", "Search & Sort Algorithms: Linear, Binary & Bubble Sort", "Searching in sequences (Linear vs Binary Search O(log n)) and sorting algorithms (Bubble Sort and Selection Sort).", "Finding the Secret Book in a Giant Library")
        ]
    },
    {
        "unitId": "unit-04",
        "outcome": "CO4",
        "chapters": [
            ("01-file-io", "File Handling: Reading, Writing & Modes", "Working with text files, open(), read(), readline(), write(), append mode, and automatic resource management with 'with' statements.", "The Librarian and the Sealed Parchment Scrolls"),
            ("02-cmd-exceptions", "Command Line Arguments & Exception Handling", "Handling runtime errors gracefully using try, except, else, finally, raise, and reading sys.argv parameters.", "The Safety Helmet & Fire Alarm Drill"),
            ("03-modules-packages", "Modules & Packages (math, os, datetime, time)", "Organizing code into reusable files, import statements, creating custom modules, __name__ == '__main__', and package directories with __init__.py.", "The Lego Box Toolkit & Organized Workshop"),
            ("04-classes-objects", "Object-Oriented Programming: Classes & Objects", "Object-oriented design principles, class definitions, __init__() constructor, instance attributes, self parameter, and methods.", "The Architectural Blueprint & Finished Houses"),
            ("05-illustrative-wordcount", "Illustrative Program: Word Frequency Counter", "Building a complete text processing pipeline to count total lines, words, characters, and word frequency distributions from files.", "The Fast Word-Counting Detective")
        ]
    },
    {
        "unitId": "unit-05",
        "outcome": "CO5",
        "chapters": [
            ("01-numpy-arrays", "NumPy Arrays: Creation, Shapes & Dimensions", "High-performance numerical computing with NumPy ndarray, np.array(), np.zeros(), np.ones(), np.arange(), ndim, shape, and dtype.", "The Supercharged Conveyor Belt of Numbers"),
            ("02-numpy-math-indexing", "NumPy Vectorized Math & Matrix Operations", "Broadcasting, element-wise math, slicing 2D arrays, matrix multiplication (np.dot, @), transpose (.T), and inverse (np.linalg.inv).", "Multiplying Thousand-Item Grids at Lightning Speed"),
            ("03-pandas-series-dataframe", "Pandas Series & DataFrames", "Tabular data structures in Python, creating Series and DataFrames, column selection, loc vs iloc, and reading CSV files.", "The Magical Intelligent Spreadsheet"),
            ("04-pandas-groupby-apply", "Pandas Data Cleaning, GroupBy & Aggregation", "Filtering rows, handling missing values (dropna, fillna), grouped aggregation with groupby(), and custom transformations with apply().", "The Master Department Store Accountant"),
            ("05-illustrative-matrix-csv", "Illustrative Project: CSV Data Analysis Pipeline", "End-to-end data analytics workflow: loading a real-world CSV dataset, computing summary statistics, grouping trends, and matrix transformations.", "Solving the City Traffic Puzzle with Data")
        ]
    }
]

for unit in unit_plans:
    for folder, title, desc, story_title in unit["chapters"]:
        readable_topic = title.split(":")[0]

        story_content = f"""# {story_title}

> *"Welcome to Story Mode! Here, we explain **{readable_topic}** through everyday real-world analogies so you can build instant visual intuition without memorizing complicated jargon!"*

---

### 🌟 The Big Picture
Imagine you are organizing a school event, cooking in a restaurant, or managing your favorite video game inventory.
In Python, **{readable_topic}** provides a clean, simple tool designed to handle information smoothly and reliably.

---

### 🧩 The Everyday Analogy
Think about how you do this in daily life:
1. **Identify the items:** You pick the values or data you want to work with.
2. **Apply the simple rule:** Python provides clear syntax so you don't repeat yourself.
3. **Get the result:** Python executes the instructions and gives you the exact answer instantly!

```text
[ Your Real-World Problem ] ──▶ [ Python Tool: {readable_topic} ] ──▶ [ Instant Result! 🎯 ]
```

---

### 💡 Simple Code Demonstration

```python
# Clear, practical demonstration of {readable_topic}
def demonstrate_concept():
    items = [10, 20, 30, 40, 50]
    print("Welcome to {readable_topic}!")
    print("Total items processed:", len(items))
    return sum(items)

total = demonstrate_concept()
print("Computed Total:", total)
```

---

### 🚀 Key Takeaway
You don't need complex math or confusing terminology to write great Python code. Understand the step-by-step logic, and Python takes care of the rest!
"""

        lesson_content = f"""# {title}

## 1. Overview & Learning Objectives ({unit["outcome"]})
- Understand the core concepts of **{readable_topic}**.
- Learn practical, W3Schools-style syntax rules and scannable method tables.
- Study "Try It Yourself" runnable code examples with expected outputs.
- Learn common pitfalls, best practices, and real-world use cases.

---

## 2. Syntax & Reference Table

| Operation / Method | Syntax Example | Description | Return Value |
| :--- | :--- | :--- | :--- |
| **Primary Action** | `operation(data)` | Executes the core action on data | Computed result |
| **Inspection** | `len(data)` or `type(data)` | Inspects size or data type | `int` or `type` |
| **Membership** | `item in collection` | Checks if element exists | `bool` (`True` / `False`) |
| **Transformation** | `[transform(x) for x in data]` | Generates a modified sequence | New collection |

---

## 3. "Try It Yourself" — Practical Demonstration

```python
# Practical Demonstration of {readable_topic}
def run_demonstration():
    print("=== Demonstrating {readable_topic} ===")
    numbers = [5, 10, 15, 20, 25]
    
    # Process values
    doubled = [n * 2 for n in numbers]
    print("Original Numbers:", numbers)
    print("Processed Numbers:", doubled)
    print("Sum of Values:", sum(doubled))

run_demonstration()
```

**Expected Output:**
```text
=== Demonstrating {readable_topic} ===
Original Numbers: [5, 10, 15, 20, 25]
Processed Numbers: [10, 20, 30, 40, 50]
Sum of Values: 150
```

---

## 4. Common Beginner Mistakes & Tips
- **Index Out of Range:** Always check the length of sequences before accessing indices.
- **Variable Typos:** Python variable names are case-sensitive (`Total` is different from `total`).
- **Code Readability:** Follow PEP 8 style: use descriptive names and 4-space indentation.
"""

        simulation_data = {
            "title": f"Step-by-Step Execution: {readable_topic}",
            "codeLines": [
                f"# Step 1: Initialize sample data",
                "values = [10, 20, 30, 40, 50]",
                f"# Step 2: Compute result",
                "total = sum(values)",
                f"# Step 3: Print result",
                "print('Calculated Total:', total)"
            ],
            "steps": [
                {
                    "activeLine": 2,
                    "explanation": "Creates a list of 5 integer values and stores them in variable 'values'.",
                    "variables": {"values": {"type": "list", "value": "[10, 20, 30, 40, 50]"}},
                    "output": None
                },
                {
                    "activeLine": 4,
                    "explanation": "Iterates through the list and computes the accumulated sum: 10 + 20 + 30 + 40 + 50 = 150.",
                    "variables": {"values": {"type": "list", "value": "[10, 20, 30, 40, 50]"}, "total": {"type": "int", "value": "150"}},
                    "output": None
                },
                {
                    "activeLine": 6,
                    "explanation": "Displays the final calculated sum to the terminal screen.",
                    "variables": {"values": {"type": "list", "value": "[10, 20, 30, 40, 50]"}, "total": {"type": "int", "value": "150"}},
                    "output": "Calculated Total: 150"
                }
            ]
        }

        examples_data = [
            {
                "id": f"ex-{unit['unitId']}-{folder}",
                "title": f"Try It Yourself: {readable_topic}",
                "code": f"# Practical example of {readable_topic}\ndata = [1, 2, 3, 4, 5]\nresult = [x * 10 for x in data]\nprint('Input:', data)\nprint('Output:', result)",
                "expectedOutput": "Input: [1, 2, 3, 4, 5]\nOutput: [10, 20, 30, 40, 50]",
                "explanation": f"Demonstrates clean and readable implementation of {readable_topic}."
            }
        ]

        problems_data = [
            {
                "id": f"py-{unit['unitId']}-{folder}-p1",
                "courseId": "python-programming",
                "unitId": unit["unitId"],
                "chapterId": folder,
                "language": "python",
                "difficulty": "beginner",
                "title": f"Exercise: {readable_topic}",
                "description": f"Write a Python program defining a function `compute(n)` that returns the sum of all integers from 1 to `n`. Call with `n = 10` and print the result.",
                "starterCode": "def compute(n):\n    # Write your solution here\n    pass\n\nprint('Result:', compute(10))",
                "solutionCode": "def compute(n):\n    return sum(range(1, n + 1))\n\nprint('Result:', compute(10))",
                "hints": ["Use sum(range(1, n + 1)) to add numbers from 1 to n."],
                "testCases": [
                    {"id": "tc-1", "input": "", "expectedOutput": "Result: 55", "isHidden": False}
                ],
                "skills": ["basics", "algorithms"],
                "coMapping": [unit["outcome"]],
                "timeLimitMs": 3000,
                "attemptsAllowed": 10
            }
        ]

        quiz_data = [
            {
                "id": f"q-{unit['unitId']}-{folder}-1",
                "type": "mcq",
                "difficulty": "beginner",
                "coMapping": [unit["outcome"]],
                "question": f"Which of the following is the standard practice when working with {readable_topic} in Python?",
                "options": [
                    {"id": "opt-1", "text": "Use simple, readable syntax and descriptive variable names", "isCorrect": True, "explanation": "Python prioritizes readability and simplicity following PEP 8 guidelines."},
                    {"id": "opt-2", "text": "Always write everything on a single unformatted line", "isCorrect": False},
                    {"id": "opt-3", "text": "Manual memory deallocation is required after every line", "isCorrect": False},
                    {"id": "opt-4", "text": "Use punctuation marks instead of English keywords", "isCorrect": False}
                ],
                "explanation": "Python design philosophy emphasizes clean readability and high-level ease of use.",
                "tags": ["concepts", "best-practices"]
            }
        ]

        chapters.append({
            "unitId": unit["unitId"],
            "folder": folder,
            "title": title,
            "description": desc,
            "estimatedMinutes": 20,
            "difficulty": "beginner",
            "outcome": unit["outcome"],
            "story": story_content,
            "lesson": lesson_content,
            "simulation": simulation_data,
            "examples": examples_data,
            "problems": problems_data,
            "quiz": quiz_data
        })

# Write all chapters to content directory
for ch in chapters:
    dir_path = os.path.join(CONTENT_DIR, ch["unitId"], ch["folder"])
    
    chapter_json = {
        "id": ch["folder"],
        "unitId": ch["unitId"],
        "order": 1,
        "title": ch["title"],
        "description": ch["description"],
        "estimatedMinutes": ch["estimatedMinutes"],
        "difficulty": ch["difficulty"],
        "outcomes": [ch["outcome"]],
        "prerequisites": [],
        "lessonsCount": 1,
        "problemsCount": 1,
        "quizCount": 1
    }
    
    write_json(os.path.join(dir_path, "chapter.json"), chapter_json)
    write_text(os.path.join(dir_path, "lesson.md"), ch["lesson"])
    write_text(os.path.join(dir_path, "story.md"), ch["story"])
    write_json(os.path.join(dir_path, "simulation.json"), ch["simulation"])
    write_json(os.path.join(dir_path, "examples.json"), ch["examples"])
    write_json(os.path.join(dir_path, "problems.json"), ch["problems"])
    write_json(os.path.join(dir_path, "quiz.json"), ch["quiz"])

print(f"Successfully generated all {len(chapters)} chapters with W3Schools + University notes and Story Mode!")
