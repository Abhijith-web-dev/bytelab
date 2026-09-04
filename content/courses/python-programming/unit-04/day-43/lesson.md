# Unit–IV — Day 7: Modules in Python

**Duration:** 90 Minutes  
**Level:** Beginner → Intermediate  
**Unit:** Unit–IV – Files, Exceptions and Modules  
**Day:** 7 (Day 43 of 65)  

---

## 1. Day 7 Overview & Topics Covered

As software grows beyond short classroom exercises into real-world applications, writing all your code inside a single file quickly becomes unmanageable. Imagine an enterprise college management portal containing student registration, fee processing, grade calculations, attendance tracking, and PDF reports—cramming thousands of lines of code into a single file creates a tangled nightmare where modifying one calculation can accidentally break the login system.

Today in Day 7, we introduce **Modular Programming** in Python. Students will learn how to decompose large programs into small, focused, and reusable files called **Modules**. We will explore how to author user-defined modules, inspect various import styles (`import`, `from ... import`, and `as` aliases), tour Python’s rich built-in **Standard Library** (`math`, `random`, `string`, `os`, `sys`), and organize multi-file projects following the professional principle of **Separation of Concerns**.

### Topics Covered:
- **Introduction to Modules**: Why monolithic scripts fail and how modular decomposition solves software complexity.
- **What is a Module?**: The nature of `.py` files as containers for functions, variables, and constants.
- **Module vs. Function**: Understanding the hierarchy of organization (Module ➔ Functions ➔ Statements).
- **Creating Your First Module**: Writing `calculator.py` and `number_tools.py`.
- **The `import` Statement**: How Python locates, executes, and binds modules into the calling program's namespace.
- **Accessing Module Members**: Dot notation (`module_name.function_name()`) and accessing module-level variables.
- **Import Syntax Variants**:
  - Full module import: `import math_tools`
  - Specific member import: `from math_tools import square, cube`
  - Deep comparison: `import module` vs. `from module import name`
  - Module aliases: `import math as m`
  - The hazard of wildcard imports: Why `from module import *` is discouraged.
- **Python's Built-in Standard Library**:
  - `math`: `sqrt()`, `ceil()`, `floor()`, `factorial()`, `pow()`, and `math.pi`.
  - `random`: `randint()`, `choice()`, and random sequence sampling.
  - `string`: `ascii_letters`, `digits`, and punctuation constants.
  - `os`: Interacting with the operating system, `os.getcwd()`, and `os.path.exists()`.
  - `sys`: Python runtime inspection and `sys.argv`.
- **Built-in vs. User-Defined Modules**: Characteristics and comparison.
- **Multi-Module Project Architecture**: Separating responsibilities between `main.py`, `student_tools.py`, `file_tools.py`, and `report_tools.py`.
- **Module Naming Rules & Pitfalls**: Avoiding name collisions with standard libraries (why you must never name your file `random.py` or `math.py`).
- **Diagnosing Common Module Errors**: `ModuleNotFoundError`, `AttributeError`, `NameError`, and the `.py` import typo.
- **Moodle IDE Multi-File Lab Architecture & AI Tutoring Rules**.
- **Hands-On Practice Arena**: Build and Use a Number Tools Module.
- **Comprehensive Quiz, Cheat Sheet, and Final Challenge**.

---

## 2. Learning Objectives

By the end of this 90-minute session, students will be able to:
1. Explain clearly what a Python module is and why modularization is essential in software engineering.
2. Differentiate between a function (a reusable block of instructions) and a module (a reusable file).
3. Create a user-defined module containing functions and module-level constants.
4. Import an external module into a driver script using `import <module>`.
5. Access functions, variables, and constants using module dot notation (`module.member`).
6. Import specific functions into the local namespace using `from <module> import <function>`.
7. Create concise, readable module aliases using the `as` keyword (`import math as m`).
8. Identify and utilize key functions from core standard library modules: `math`, `random`, `string`, `os`, and `sys`.
9. Structure a multi-file project adhering to the principle of separation of concerns.
10. Diagnose and fix common module errors such as `ModuleNotFoundError` and `AttributeError`.
11. Explain why local scripts should never shadow standard library names like `math.py` or `random.py`.
12. Build an integrated multi-file application combining user-defined business logic and file handling.

---

## 3. 90-Minute Detailed Session Plan

| Time | Topic | Focus Activity |
| :--- | :--- | :--- |
| **0–8 min** | Day 6 Recap | Review `try`, `except`, `else`, `finally`, `raise` |
| **8–18 min** | Why Modules? | The monolithic college app problem, modular gearboxes |
| **18–32 min** | Creating Modules | Writing `calculator.py`, creating `main.py`, testing `import` |
| **32–45 min** | Member Access & Variables | Dot notation, module-level constants (`settings.py`) |
| **45–58 min** | Built-in Modules | Exploring `math`, `random`, `string`, `os`, `sys` with interactive examples |
| **58–68 min** | Import Styles & Aliases | `import` vs. `from ... import`, `as` aliases, wildcard hazards |
| **68–77 min** | Multi-File Architecture | Designing clean project layouts (`student_tools.py` + `file_tools.py`) |
| **77–82 min** | Debugging Module Errors | `ModuleNotFoundError`, name shadowing, import typos |
| **82–87 min** | Moodle IDE Practice | Solving the *Build and Use a Number Tools Module* arena challenge |
| **87–90 min** | Quiz & Day 7 Summary | 10-Question assessment, cheat sheet, and Unit-IV progression |

---

## 4. Real-World Motivation: The Monolithic Nightmare

Imagine developing a comprehensive academic portal for a university. The system requires:
- **Student Admissions**: Form validation, ID generation.
- **Course Registration**: Prerequisite checks, seat quotas.
- **Marks & Grading**: GPA calculations, pass/fail status.
- **Fee Management**: Invoice generation, receipt calculation.
- **Report Generation**: Formatting tabular cards, saving transcripts.

```text
THE MONOLITHIC DISASTER (Everything in one file):
portal.py (4,500 lines of code)
├── 80 different functions jumbled together
├── Global variables overwriting each other
└── Modifying the grade curve accidentally crashes the fee calculator!
```

Now consider the professional, modular approach:
```text
THE MODULAR ARCHITECTURE (Separation of Concerns):
portal_project/
├── main.py            (Application coordinator and entry point)
├── student_tools.py   (Student registration and profile logic)
├── grading_tools.py   (Marks, totals, averages, GPA calculations)
├── fee_tools.py       (Billing, receipts, payments)
└── report_tools.py    (Transcript formatting and export)
```
Each file has a single, crystal-clear responsibility. If grading rules change next semester, a developer only modifies `grading_tools.py`. The rest of the system remains completely untouched and stable.

---

## 5. What is a Module?

A **module** is simply a Python file containing Python definitions, functions, variables, and runnable statements with a **`.py`** extension that can be imported and reused by other Python programs.

```text
calculator.py  (Module)
├── add(a, b)
├── subtract(a, b)
├── multiply(a, b)
└── PI = 3.14159
```

When another program needs addition or multiplication, it doesn't re-type the code. It simply **imports** `calculator.py`!

---

## 6. Module vs. Function: The Architectural Hierarchy

Beginners frequently confuse functions with modules. Keep this clear hierarchy in mind:

```text
┌────────────────────────────────────────────────────────────┐
│ PROJECT                                                    │
│   └── MODULE (A .py file on disk)                         │
│         └── FUNCTIONS (Named blocks of logic)              │
│               └── STATEMENTS (Individual instructions)     │
└────────────────────────────────────────────────────────────┘
```

- A **Function** is a named block of code that performs one specific task (e.g., `calculate_average()`).
- A **Module** is a `.py` file that bundles multiple related functions, constants, and variables together (e.g., `student_tools.py`).

---

## 7. Creating Your First User-Defined Module

Creating a module in Python requires zero boilerplate—you simply save functions in a `.py` file!

### Step 1: Create `calculator.py`
```python
# calculator.py
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        return None
    return a / b
```

### Step 2: Create `main.py`
In the same directory, create your driver program:
```python
# main.py
import calculator

x = 20
y = 5

print("Add     :", calculator.add(x, y))
print("Subtract:", calculator.subtract(x, y))
print("Multiply:", calculator.multiply(x, y))
print("Divide  :", calculator.divide(x, y))
```

### Output:
```text
Add     : 25
Subtract: 15
Multiply: 100
Divide  : 4.0
```

---

## 8. How `import` Works Internally

When Python executes `import calculator`:
1. **Search**: Python looks for a file named `calculator.py` in the current working directory, followed by the system paths listed in `sys.path`.
2. **Compile**: Python compiles `calculator.py` into bytecode (`.pyc`).
3. **Execute**: Python runs the module code from top to bottom, defining the functions and variables.
4. **Namespace Binding**: Python creates a module namespace named `calculator` and binds it to the current program so you can access its contents using `calculator.<member>`.

---

## 9. Accessing Module Variables & Constants

Modules do not just hold functions; they can also hold configuration constants, default values, and data tables:

```python
# settings.py
COLLEGE_NAME = "Apex Institute of Technology"
ACADEMIC_YEAR = "2026-2027"
PASS_MARK = 40
MAX_CREDITS = 24
```

```python
# main.py
import settings

print("Institution :", settings.COLLEGE_NAME)
print("Year        :", settings.ACADEMIC_YEAR)
print("Pass Mark   :", settings.PASS_MARK)
```

---

## 10. Different Import Styles

Python provides multiple syntax forms to import modules depending on readability and conciseness needs:

### Style 1: Full Module Import (`import module`)
```python
import math_tools

result = math_tools.square(5)
```
- **Pros**: The origin of `square()` is completely obvious (`math_tools.square()`).
- **Cons**: Slightly longer to type if the module name is long.
- **Verdict**: Strongly recommended for beginners and production code.

---

### Style 2: Specific Member Import (`from module import name`)
```python
from math_tools import square, cube

print(square(4))
print(cube(3))
```
- **Pros**: Direct access without typing the module prefix.
- **Cons**: Can lead to naming clashes if another function has the same name in `main.py`.

---

### Style 3: Module Alias (`import module as alias`)
```python
import math_tools as mt

print(mt.square(6))
```
- **Pros**: Shorter code while still keeping the namespace explicit.
- **Common Conventions**: `import math as m`, `import numpy as np`, `import pandas as pd`.

---

### Style 4: Wildcard Import (`from module import *`) — ANTI-PATTERN!
```python
# DANGEROUS: DO NOT USE IN PRODUCTION!
from math_tools import *
```
> [!CAUTION]
> **Why Wildcard Imports Are Harmful:**
> 1. They flood your local namespace with every name defined in the module.
> 2. You cannot tell where a function originated when reading the code later.
> 3. If two modules define a function with the same name, the second silently overwrites the first!

---

## 11. Built-in Modules (The Python Standard Library)

Python is famously described as a **"batteries-included"** language because it ships with a rich collection of battle-tested standard library modules ready for immediate use.

---

### 1. The `math` Module
Provides mathematical functions for numerical programming:

```python
import math

print("Square root of 36 :", math.sqrt(36))        # 6.0
print("Ceiling of 4.2    :", math.ceil(4.2))        # 5
print("Floor of 4.8      :", math.floor(4.8))       # 4
print("Factorial of 5    :", math.factorial(5))     # 120
print("2 raised to 5     :", math.pow(2, 5))        # 32.0
print("Absolute of -7.5  :", math.fabs(-7.5))       # 7.5
print("Value of Pi       :", math.pi)               # 3.141592653589793
```

**Real-World Example — Circle Geometry:**
```python
import math

radius = 7.0
area = math.pi * math.pow(radius, 2)
circumference = 2 * math.pi * radius

print("Area         : %.2f" % area)
print("Circumference: %.2f" % circumference)
```

---

### 2. The `random` Module
Provides tools for generating pseudo-random numbers, simulating dice, shuffling, and choosing items:

```python
import random

# Generate a random integer between 1 and 6 (inclusive)
dice_roll = random.randint(1, 6)
print("Dice Roll:", dice_roll)

# Random selection from a list
houses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"]
assigned = random.choice(houses)
print("Assigned House:", assigned)

# Random floating-point number between 0.0 and 1.0
chance = random.random()
print("Probability:", round(chance, 4))
```

---

### 3. The `string` Module
Supplies pre-built string constants useful for validation and character processing:

```python
import string

print("Lowercase letters :", string.ascii_lowercase)
print("Uppercase letters :", string.ascii_uppercase)
print("All letters       :", string.ascii_letters)
print("Digits            :", string.digits)
print("Punctuation marks :", string.punctuation)
```

**Practical Application — Character Counter:**
```python
import string

text = "Python_3.12! Built-in #1."
digit_count = 0
letter_count = 0

for char in text:
    if char in string.digits:
        digit_count += 1
    elif char in string.ascii_letters:
        letter_count += 1

print(f"Letters: {letter_count}, Digits: {digit_count}")
```

---

### 4. The `os` Module
Provides access to operating system and filesystem utilities:

```python
import os

# Inspect current working directory
current_dir = os.getcwd()
print("Working Directory:", current_dir)

# Check if a file or directory exists
if os.path.exists("students.txt"):
    print("File students.txt is present.")
else:
    print("File students.txt does not exist.")
```

---

### 5. The `sys` Module
Exposes Python runtime and interpreter configurations:

```python
import sys

# Script name and command-line arguments passed from the terminal
print("Script name :", sys.argv[0])
print("Arguments   :", sys.argv[1:])

# Python version information
print("Python Executable:", sys.executable)
```

---

## 12. Built-in vs. User-Defined Modules: Direct Comparison

| Dimension | Built-in (Standard Library) | User-Defined Module |
| :--- | :--- | :--- |
| **Origin** | Installed automatically with Python | Written and saved by you |
| **Availability** | Available on any standard Python setup | Available only within your project directory |
| **Examples** | `math`, `random`, `string`, `os`, `sys` | `calculator.py`, `number_tools.py`, `student_tools.py` |
| **Primary Role** | General-purpose utilities (math, OS, I/O) | Application-specific business logic |

---

## 13. Practical User-Defined Modules in Real Projects

### Example: The Student Performance Module
```python
# student_tools.py
def calculate_total(marks):
    return sum(marks)

def calculate_average(marks):
    if len(marks) == 0:
        return 0.0
    return sum(marks) / len(marks)

def evaluate_result(marks, passing_grade=40):
    for m in marks:
        if m < passing_grade:
            return "Fail"
    return "Pass"
```

```python
# main.py
import student_tools

student_name = "Arun"
scores = [78, 85, 92, 64, 88]

total = student_tools.calculate_total(scores)
average = student_tools.calculate_average(scores)
status = student_tools.evaluate_result(scores)

print(f"Student : {student_name}")
print(f"Total   : {total}")
print(f"Average : {average:.2f}")
print(f"Result  : {status}")
```

---

## 14. Module Naming Rules & Pitfalls

> [!CAUTION]
> **Never Name Your Files After Standard Library Modules!**  
> If you create a file named `random.py` or `math.py` in your project folder, Python will import **your local file** instead of the official standard library!
> 
> When your script later calls `math.sqrt(25)`, Python will raise:
> ```text
> AttributeError: module 'math' has no attribute 'sqrt'
> ```
> Always name your files descriptively: `math_tools.py`, `random_picker.py`, `custom_string_utils.py`.

---

## 15. Diagnosing Common Module Errors

### 1. `ModuleNotFoundError: No module named '...'`
- **Cause**: Python cannot find a `.py` file matching the imported name.
- **Checklist**:
  1. Is the file saved in the current folder?
  2. Is the spelling exactly correct (e.g., `calculator` vs `calculators`)?
  3. Did you accidentally write `import calculator.py`? (Never include `.py` in import!).

### 2. `AttributeError: module '...' has no attribute '...'`
- **Cause**: The module was imported successfully, but the function name does not exist inside it.
- **Checklist**:
  1. Check function spelling in both files.
  2. Check if you saved the module file after adding the new function!

### 3. `NameError: name 'add' is not defined`
- **Cause**: You imported using `import calculator`, but called `add(10, 20)` instead of `calculator.add(10, 20)`.

---

## 16. Quick Student Workouts

1. **How do you import a file named `finance_tools.py`?**  
   ➔ `import finance_tools`
2. **If `geometry.py` contains `def area():`, how do you call it after `import geometry`?**  
   ➔ `geometry.area()`
3. **Which standard module provides `random.randint()`?**  
   ➔ `random`
4. **How do you import only `sqrt` from `math`?**  
   ➔ `from math import sqrt`
5. **What is wrong with `import tools.py`?**  
   ➔ You must not include the `.py` extension in an import statement (`import tools`).

---

## 17. Moodle IDE Multi-File Lab Architecture

In the Moodle IDE, a multi-file workspace enables students to create and test user-defined modules side-by-side:

```text
┌──────────────────────────────────────────────────────────────┐
│                    PYTHON MODULE LAB                        │
├──────────────────────┬───────────────────────────────────────┤
│ FILE EXPLORER        │ CODE EDITOR                           │
│                      │                                       │
│ 📁 project           │ [main.py]  [number_tools.py]          │
│   📄 main.py         │                                       │
│   📄 number_tools.py │ import number_tools                   │
│                      │                                       │
│                      │ n = int(input())                      │
│                      │ print("Square =",                     │
│                      │       number_tools.square(n))         │
├──────────────────────┴───────────────────────────────────────┤
│ CONSOLE                                                      │
│ 6                                                            │
│ Square = 36                                                  │
│ Cube = 216                                                   │
│ Even = True                                                  │
└──────────────────────────────────────────────────────────────┘
```

### AI Agent Tutoring Rules for Modules:
1. Help the student understand which code belongs in the helper module (`number_tools.py`) vs. the driver program (`main.py`).
2. Guide them toward writing the helper functions first, testing them conceptually.
3. If they encounter `ModuleNotFoundError`, guide them to verify file naming and directory placement.
4. Encourage explicit dot notation (`number_tools.square()`) to instill strong namespace hygiene.

---

## 18. Hands-On Practice Arena: Build and Use a Number Tools Module

### Problem Statement:
In this challenge, your project workspace provides a user-defined module named `number_tools.py` that implements three functions:
- `square(number)`: Returns `number * number`.
- `cube(number)`: Returns `number * number * number`.
- `is_even(number)`: Returns `number % 2 == 0`.

Your task is to write `main.py` to:
1. Import `number_tools`.
2. Read an integer from user input: `number = int(input())`.
3. Call `number_tools.square(number)`, `number_tools.cube(number)`, and `number_tools.is_even(number)`.
4. Display the results in the exact format:
   ```text
   Square = <square>
   Cube = <cube>
   Even = <is_even>
   ```

### Reference Implementation:
```python
import number_tools

number = int(input())

print("Square =", number_tools.square(number))
print("Cube =", number_tools.cube(number))
print("Even =", number_tools.is_even(number))
```

---

## 19. 10-Question Comprehensive Quiz Review

| # | Question Summary | Correct Answer | Key Rationale |
| :--- | :--- | :--- | :--- |
| **Q1** | What is a Python module? | A `.py` file containing reusable code | Packages code for reuse across programs |
| **Q2** | Keyword used to load a module? | `import` | Binds module contents into memory |
| **Q3** | How to call `add()` after `import calculator`? | `calculator.add()` | Uses dot notation to qualify namespace |
| **Q4** | Module providing `sqrt()`? | `math` | Standard library mathematics module |
| **Q5** | Module providing `randint()`? | `random` | Standard library pseudo-random generator |
| **Q6** | Module providing `sys.argv`? | `sys` | Exposes Python interpreter runtime & CLI |
| **Q7** | Statement importing only `square` from `math_tools`? | `from math_tools import square` | Selective import directly into local scope |
| **Q8** | What type of module is `calculator.py` written by you? | User-defined module | Custom module authored for project |
| **Q9** | What does `import math as m` do? | Assigns alias `m` to `math` | Shorthand namespace identifier |
| **Q10** | Exception raised when module file is missing? | `ModuleNotFoundError` | Python cannot locate target file in search paths |

---

## 20. Day 7 Quick Reference Cheat Sheet

```python
# -------------------------------------------------------------------
# PYTHON MODULES QUICK REFERENCE
# -------------------------------------------------------------------

# 1. Importing Entire Module
import math
print(math.sqrt(49))

# 2. Importing Specific Names
from math import pi, ceil
print(ceil(3.2))

# 3. Aliasing
import random as rnd
print(rnd.randint(1, 10))

# 4. Standard Library Tour
import string
print(string.ascii_letters)

import os
print(os.path.exists("data.txt"))

import sys
print(sys.argv)

# 5. User-Defined Module Pattern
# File: my_tools.py
def greet(name):
    return "Hello, " + name

# File: main.py
import my_tools
print(my_tools.greet("Ananya"))
```

---

## 21. Final Challenge: Modular Student Application

Create a modular project structure:
```text
student_app/
├── main.py
├── student_tools.py
└── file_tools.py
```

1. **`student_tools.py`**:
   - `calculate_total(marks)`: Returns sum of marks.
   - `calculate_average(marks)`: Returns average of marks.
   - `check_result(marks)`: Returns `"Pass"` if all marks `>= 40`, else `"Fail"`.
2. **`file_tools.py`**:
   - `save_report(filename, text)`: Writes report string to file.
3. **`main.py`**:
   - Imports both modules, takes student name and 3 subject marks, computes statistics, prints a formatted report card, and saves the transcript to `report.txt`.

---

## 22. What Comes Next?

Today you unlocked the power of **Modules**—moving from single-file scripts to professional multi-file architectures.

In **Unit–IV — Day 8 (Day 44)**, we will scale up from individual modules to **Packages**—learning how to organize multiple related modules into hierarchical directory packages using `__init__.py` and namespace structuring!
