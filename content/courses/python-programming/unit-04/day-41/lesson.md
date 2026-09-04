# Unit–IV — Day 5: Errors and Exceptions in Python

**Duration:** 90 Minutes  
**Level:** Beginner  
**Unit:** Unit–IV – Files and Exceptions  
**Day:** 5 (Day 41 of 65)  

---

## 1. Day 5 Overview & Topics Covered

Programming is not merely the craft of telling a computer what to do when everything goes right; it is equally the discipline of understanding what happens when things go wrong. In this session, students explore why Python programs fail, how the Python interpreter identifies and reports problems, and how to read error messages like a seasoned software engineer.

Students will master the fundamental distinction between **Syntax Errors** (flawed grammar caught before the program begins) and **Runtime Exceptions** (abnormal events that occur while the code is actively executing), along with subtle **Logical Errors**. We will survey Python’s most common built-in exceptions, dissect the anatomy of an execution traceback using a **bottom-to-top reading strategy**, and build defensive conditional checks that prevent crashes before they occur.

### Topics Covered:
- **What is an Error?**: The nature of software failures, human mistakes, and system constraints.
- **Why Errors Occur in Python**: The Python interpreter as a strict, literal executor.
- **The Three Classes of Errors**:
  1. Syntax Errors (Parse / compile-time)
  2. Runtime Errors / Exceptions (Dynamic execution-time)
  3. Logical Errors (Silent bugs producing incorrect results)
- **Syntax Errors vs. Runtime Exceptions**: Deep comparison of when they are detected and how they halt execution.
- **Catalog of Common Python Exceptions**:
  - `NameError`: Undefined variables, spelling mistakes, scope issues.
  - `TypeError`: Incompatible types in operations and function calls.
  - `ValueError`: Inappropriate values for valid types (`int("abc")`).
  - `IndexError`: Accessing sequence positions beyond current boundaries.
  - `KeyError`: Querying dictionary keys that do not exist.
  - `ZeroDivisionError`: Dividing or calculating modulo by zero.
  - `FileNotFoundError`: Requesting files that do not exist on disk.
  - `AttributeError`: Invoking methods or properties an object does not possess.
  - `ModuleNotFoundError`: Importing libraries not installed or misspelled.
- **The Anatomy of a Python Traceback**:
  - Reading from the bottom up.
  - Identifying the exception type and diagnostic message.
  - Locating the file name, line number, and offending code snippet.
  - Tracing the nested function call hierarchy.
- **Defensive Error Prevention Techniques**:
  - Guarding divisions with non-zero checks (`if b != 0:`).
  - Guarding sequence indexes with boundary checks (`if 0 <= idx < len(lst):`).
  - Guarding dictionary lookups with membership (`if key in d:`) or `.get()`.
  - Guarding file access with path verification (`if os.path.exists(path):`).
  - Guarding numeric conversions with validation (`if text.isdigit():`).
- **Moodle IDE Error Interface & AI Agent Tutoring Guidance**.
- **Interactive Practice Arena**: Guarding against `IndexError` through bounds validation.
- **Comprehensive Quiz & Quick Reference Cheat Sheet**.

---

## 2. Learning Objectives

By the end of this 90-minute session, students will be able to:
1. Explain clearly what an error is and why computer programs encounter failures.
2. Differentiate between syntax errors, runtime exceptions, and logical bugs.
3. Understand why a `SyntaxError` prevents any part of a Python script from executing.
4. Identify and reproduce the most frequent Python runtime exceptions (`NameError`, `TypeError`, `ValueError`, `IndexError`, `KeyError`, `ZeroDivisionError`, `FileNotFoundError`, `AttributeError`, `ModuleNotFoundError`).
5. Read any Python error traceback efficiently using the **bottom-to-top** diagnostic strategy.
6. Distinguish between the symptom location (where Python crashed) and the root cause (where bad data originated).
7. Apply defensive programming patterns with `if/else` statements to intercept invalid data before operations execute.
8. Explain the difference between `TypeError` and `ValueError` with clear concrete examples.
9. Safely query dictionary keys and list indices using guard conditions.
10. Formulate structured, productive debugging workflows to resolve coding errors systematically.

---

## 3. 90-Minute Detailed Session Plan

| Time | Topic | Focus Activity |
| :--- | :--- | :--- |
| **0–8 min** | Day 4 Recap | Review `sys.argv`, argument strings, command-line calculators |
| **8–20 min** | What is an Error? | Intuition, three classes of errors, and the bridge blueprint analogy |
| **20–35 min** | Syntax vs. Runtime | Code parsing vs execution, immediate halt vs runtime crash |
| **35–52 min** | The Common Exceptions Catalog | Exploring `NameError`, `TypeError`, `ValueError`, `IndexError`, `KeyError`, `ZeroDivisionError`, etc. |
| **52–65 min** | Dissecting the Traceback | How to read tracebacks bottom-to-top, locating call chains |
| **65–75 min** | Defensive Error Prevention | Writing pre-flight conditional guards instead of blindly trusting input |
| **75–82 min** | Debugging Best Practices | Print debugging, variable inspection, type checking |
| **82–87 min** | Moodle IDE Practice | Solving the *IndexError Prevention* arena challenge |
| **87–90 min** | Quiz & Day 5 Summary | Key concept check, cheat sheet, and preview of `try-except` (Day 42) |

---

## 4. Quick Recap from Day 4

Yesterday, we learned how command-line arguments allow users to pass dynamic parameters into scripts at launch time:

```python
import sys

# Launching via: python script.py 10 20
if len(sys.argv) < 3:
    print("Usage: python script.py <num1> <num2>")
else:
    total = int(sys.argv[1]) + int(sys.argv[2])
    print("Sum: %d" % total)
```

Notice the safeguard we wrote: `if len(sys.argv) < 3:`. If we had omitted that check and run `python script.py` alone, the program would have crashed with an `IndexError`. That crash is an **Exception**. Today, we take a deep dive into the entire world of Python errors and exceptions!

---

## 5. What is an Error?

An **error** (often colloquially called a "bug") is an unexpected flaw or condition that prevents a computer program from compiling, running, or producing the intended output.

### Why Do Errors Occur?
Computers are extremely fast, but completely devoid of common sense. They execute instructions literally. When a human asks a barista:
> *"Give me a cup of coffee with two spoons of sugar."*

If the shop runs out of sugar, the human barista will politely say, *"We are out of sugar, would you like honey instead?"*  
A computer following a blind script without error checks, however, will freeze, drop the cup onto the floor, and crash the entire coffee shop!

Errors occur because:
1. **Human Typographical Mistakes**: Missing parentheses, misspelled keywords, incorrect indentation.
2. **Invalid Assumptions About Data**: Expecting a user to type `"25"` when they type `"twenty five"`.
3. **External Environment Failures**: Opening a file that was deleted, or accessing a network server that went offline.
4. **Mathematical Impossibilities**: Dividing a quantity by zero or calculating the square root of a negative real number.

---

## 6. The Three Classes of Errors

Every error in Python belongs to one of three primary categories:

```text
               ┌───────────────────────────────┐
               │    Python Programming Errors   │
               └───────────────┬───────────────┘
                               │
         ┌─────────────────────┼─────────────────────┐
         ▼                     ▼                     ▼
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│  Syntax Errors  │   │ Runtime Errors  │   │ Logical Errors  │
│  (Parse Time)   │   │  (Exceptions)   │   │ (Silent Flaws)  │
└─────────────────┘   └─────────────────┘   └─────────────────┘
```

### 1. Syntax Errors (Parse / Compile-Time)
A **Syntax Error** occurs when the code violates the formal grammatical rules of the Python language. 
- Python reads your entire script and converts it into bytecode **before** executing a single statement.
- If the interpreter detects an unclosed quote, a missing colon, or mismatched brackets, it immediately stops and reports a `SyntaxError`.
- **Key Trait:** Not a single line of code will execute—even valid lines written before the error!

```python
# Missing colon at the end of the if statement
if age >= 18
    print("Adult")
# Result: SyntaxError: expected ':'
```

### 2. Runtime Errors (Exceptions)
A **Runtime Error** occurs while the program is actively executing. The syntax of the program is 100% grammatically correct, so the interpreter gladly begins running the code line-by-line. However, upon reaching an instruction that violates a runtime rule or attempts an impossible action, execution abruptly halts.

In Python, runtime errors are formally known as **Exceptions**.

```python
print("Step 1: Welcome to the bank")  # Executes successfully!
balance = 1000
rate = 0
interest = balance / rate               # Crashes HERE!
print("Step 2: Interest computed")    # NEVER REACHED!
```

### 3. Logical Errors (Semantic Bugs)
A **Logical Error** is an error where the code has perfect syntax and runs to completion without raising any exceptions—yet produces completely incorrect results!
- These are often the hardest errors to detect because Python reports no warnings or crashes.
- The responsibility lies entirely on developer testing.

```python
# Goal: Compute the average of two numbers
a = 10
b = 20
average = a + b / 2  # Bug: Operator precedence! b / 2 runs first (10 + 10 = 20)
print("Average:", average)  # Prints 20.0 instead of 15.0!
```

---

## 7. Syntax Errors vs. Runtime Exceptions

Understanding the differences between these two categories is critical for diagnostics:

| Feature | Syntax Error | Runtime Exception |
| :--- | :--- | :--- |
| **When it is discovered** | Before execution starts (parsing / compile time) | While code is actively executing (runtime) |
| **Code execution status** | 0% of the program runs | Code executes line-by-line until the fault line |
| **Common causes** | Missing colons, unmatched quotes, bad indentation | Zero division, invalid conversion, missing keys |
| **Can it be prevented with conditionals?** | No! Grammatical errors cannot be bypassed with `if` | Yes! Pre-flight checks and `if` guards can prevent them |
| **Python Exception Class** | `SyntaxError`, `IndentationError` | `ZeroDivisionError`, `ValueError`, `IndexError`, etc. |

---

## 8. Deep Dive into Common Python Exceptions

Python provides a hierarchy of built-in exceptions. Below are the nine exceptions you will encounter most frequently as a software engineer:

---

### 1. `NameError`
**When it occurs:** When Python encounters an identifier (variable, function name) that has never been defined or is outside the current scope.

```python
# Common Cause: Typo in variable name
first_name = "Arun"
print(firts_name)
```
```text
Traceback (most recent call last):
  File "test.py", line 2, in <module>
    print(firts_name)
NameError: name 'firts_name' is not defined. Did you mean: 'first_name'?
```
**Fix:** Verify variable spelling, ensure the variable was assigned before the line where it is accessed, and check function scope.

---

### 2. `TypeError`
**When it occurs:** When an operation or function is applied to an object of an inappropriate or incompatible data type.

```python
# Common Cause 1: Concatenating string and integer
score = 95
message = "Your score is: " + score

# Common Cause 2: Calling a non-callable object
number = 10
number()
```
```text
TypeError: can only concatenate str (not "int") to str
TypeError: 'int' object is not callable
```
**Fix:** Explicitly convert types using `str(score)` or use formatted string interpolation `f"Your score is: {score}"`.

---

### 3. `ValueError`
**When it occurs:** When an operation or function receives an argument that has the **correct type**, but an **inappropriate value**.

```python
# int() expects a string or float (valid type), but "hello" is not numeric content!
age = int("hello")
```
```text
ValueError: invalid literal for int() with base 10: 'hello'
```

> [!IMPORTANT]
> **Difference Between `TypeError` and `ValueError`**:
> - `int([1, 2, 3])` raises `TypeError`: A list is the **wrong type** for `int()`.
> - `int("apple")` raises `ValueError`: A string is an **acceptable type**, but `"apple"` has the **wrong value**.

---

### 4. `IndexError`
**When it occurs:** When attempting to access an index of a sequence (list, tuple, string) that is outside the range of valid indices.

```python
fruits = ["apple", "banana", "cherry"]  # Indices: 0, 1, 2 (length = 3)
print(fruits[3])                        # Index 3 does not exist!
```
```text
IndexError: list index out of range
```
**Fix:** Remember that Python sequences are 0-indexed. The highest valid positive index is always `len(sequence) - 1`. Always guard list access:
```python
index = 3
if 0 <= index < len(fruits):
    print(fruits[index])
else:
    print("Invalid index!")
```

---

### 5. `KeyError`
**When it occurs:** When attempting to access a dictionary value using a key that does not exist in the dictionary.

```python
student = {"name": "Kavi", "reg_no": 101}
print(student["gpa"])  # "gpa" is not a key in student
```
```text
KeyError: 'gpa'
```
**Fix:** Check membership with `if key in dictionary:` or use the safe dictionary method `dict.get(key, default)`:
```python
# Safe retrieval: returns None or a specified default if missing
gpa = student.get("gpa", "N/A")
print("GPA:", gpa)  # Prints: GPA: N/A
```

---

### 6. `ZeroDivisionError`
**When it occurs:** When the second operand of a division (`/`), floor division (`//`), or modulo (`%`) operation evaluates to zero.

```python
numerator = 100
denominator = 0
result = numerator / denominator
```
```text
ZeroDivisionError: division by zero
```
**Fix:** Always verify the divisor before calculating:
```python
if denominator != 0:
    result = numerator / denominator
else:
    result = 0
    print("Cannot divide by zero!")
```

---

### 7. `FileNotFoundError`
**When it occurs:** When attempting to open a file for reading (`'r'`) or appending/updating, but the specified file path does not exist on the filesystem.

```python
f = open("missing_dataset.txt", "r")
```
```text
FileNotFoundError: [Errno 2] No such file or directory: 'missing_dataset.txt'
```
**Fix:** Ensure the file exists in the expected directory, check the working directory with `os.getcwd()`, or verify with `os.path.exists()`:
```python
import os

filename = "missing_dataset.txt"
if os.path.exists(filename):
    with open(filename, "r") as f:
        content = f.read()
else:
    print("File does not exist. Creating default...")
```

---

### 8. `AttributeError`
**When it occurs:** When attempting to access an attribute or call a method that an object does not possess.

```python
text = "welcome to python"
text.append("!")  # Strings are immutable and do NOT have an .append() method!
```
```text
AttributeError: 'str' object has no attribute 'append'
```
**Fix:** Check the object's data type using `type(obj)` and check available methods using `dir(obj)`.

---

### 9. `ModuleNotFoundError`
**When it occurs:** When an `import` statement requests a module or library that cannot be found or is misspelled.

```python
import mathmatics  # Typo in module name
```
```text
ModuleNotFoundError: No module named 'mathmatics'
```
**Fix:** Ensure the module name is spelled correctly (`import math`) or install third-party packages using `pip install <package>`.

---

## 9. The Anatomy of a Python Traceback

When Python crashes due to an unhandled exception, it prints a diagnostic report called a **Traceback**. Beginners often panic when confronted with a 10-line traceback. However, tracebacks are specifically formatted to make debugging fast and predictable.

### Sample Traceback:
```text
Traceback (most recent call last):
  File "main.py", line 18, in <module>
    process_order("INV-401")
  File "main.py", line 12, in process_order
    total = calculate_discount(order_id, 0)
  File "main.py", line 4, in calculate_discount
    rate = 100 / count
ZeroDivisionError: division by zero
```

### The Golden Rule: Read Bottom-to-Top!

```text
STEP 1: LOOK AT THE VERY BOTTOM LINE
└── ZeroDivisionError: division by zero
    ↳ This tells you WHAT went wrong (the exception type & description).

STEP 2: LOOK AT THE LINE IMMEDIATELY ABOVE IT
└── File "main.py", line 4, in calculate_discount
    rate = 100 / count
    ↳ This tells you WHERE it crashed (file, line number, exact instruction).

STEP 3: TRACE UPWARDS THROUGH THE CALL STACK
└── line 12 in process_order called calculate_discount
└── line 18 in <module> called process_order
    ↳ This tells you HOW the program arrived at this dangerous situation.
```

### Root Cause vs. Symptom Location:
In the example above, line 4 crashed on `100 / count`. But line 4 did nothing wrong—it correctly performed division! The **root cause** was on line 12, where `process_order` passed `0` as the `count` argument! Always inspect caller arguments when investigating an exception.

---

## 10. Practical Debugging Strategies

When your program crashes or misbehaves, follow these disciplined diagnostic habits:

1. **Don't Guess—Inspect**:
   - Insert strategic `print()` calls right before the failing line to print variable values and types:
   ```python
   print(f"DEBUG: value={x}, type={type(x)}")
   ```
2. **Isolate the Problem**:
   - Comment out unrelated code or extract the failing calculation into a small 3-line scratch snippet to test it in isolation.
3. **Verify Boundary Values**:
   - Print `len(collection)` when debugging `IndexError`.
   - Print `dictionary.keys()` when debugging `KeyError`.
4. **Use Python's Built-in Inspection**:
   - `type(x)`: Displays whether `x` is a string, integer, list, or dictionary.
   - `len(x)`: Displays the count of items in a sequence.
   - `repr(x)`: Shows invisible characters like trailing newlines (`'\n'`) or extra whitespace.

---

## 11. Defensive Error Prevention Techniques

Rather than letting exceptions crash your software, you can write defensive code that tests preconditions before executing risky operations:

### 1. Guarding Division
```python
def safe_divide(a, b):
    if b == 0:
        print("Warning: Division by zero avoided.")
        return 0
    return a / b
```

### 2. Guarding Sequence Indexing
```python
def safe_get_item(items, index):
    if 0 <= index < len(items):
        return items[index]
    print(f"Warning: Index {index} is out of bounds.")
    return None
```

### 3. Guarding Dictionary Key Access
```python
def get_user_role(users_dict, username):
    # Method A: Membership check
    if username in users_dict:
        return users_dict[username]
    # Method B: .get() fallback
    return users_dict.get(username, "Guest")
```

### 4. Guarding String-to-Number Parsing
```python
def safe_parse_int(user_input):
    clean_text = user_input.strip()
    if clean_text.isdigit():
        return int(clean_text)
    print(f"Warning: '{user_input}' cannot be converted to an integer.")
    return 0
```

---

## 12. Moodle IDE Error Interface & AI Tutoring Architecture

In automated grading platforms such as Moodle IDE:
1. **Compilation Phase**: Python code is parsed. If a `SyntaxError` exists, the grader terminates with `Compilation Error (CE)`. No test cases are evaluated.
2. **Execution Phase**: The program runs against hidden and public test cases. If an uncaught exception is thrown, the grader logs a `Runtime Error (RE)` and displays the traceback.
3. **AI Agent Tutoring Guidance**:
   - When helping a student, the AI tutor should **never** simply provide the corrected code.
   - Instead, the AI guides the student to locate the bottom line of the traceback, identify the exception type, and inspect the variables involved.
   - For example: *"Notice that your traceback says `IndexError: list index out of range` on line 5. What is the length of your list? What index did your code attempt to access?"*

---

## 13. Hands-On Practice Arena: Fix the Python Errors

### Problem: IndexError Prevention
The starter code receives a target list index and a number to add, but it is vulnerable to crashing:

```python
# Vulnerable starter idea:
numbers = [10, 20, 30]
# Trying to access numbers[3] immediately crashes!
```

### Requirements:
1. Initialize `numbers = [10, 20, 30]`.
2. Read `index` as an integer using `int(input())`.
3. Read `number` as an integer using `int(input())`.
4. Validate that `0 <= index < len(numbers)`.
5. If valid, print `Result: <sum>` where `<sum>` is `numbers[index] + number`.
6. If invalid, print `Invalid index` without crashing.

### Reference Implementation:
```python
numbers = [10, 20, 30]

index = int(input())
number = int(input())

if 0 <= index < len(numbers):
    print("Result:", numbers[index] + number)
else:
    print("Invalid index")
```

---

## 14. 10-Question Comprehensive Quiz Review

| # | Question Summary | Correct Answer | Key Takeaway |
| :--- | :--- | :--- | :--- |
| **Q1** | What is a syntax error? | Violation of formal language grammar | Prevents parsing before any execution starts |
| **Q2** | What error does `print("Hello"` raise? | `SyntaxError` | Unclosed parenthesis prevents bytecode generation |
| **Q3** | Exception raised on division by zero? | `ZeroDivisionError` | Triggered by `/`, `//`, or `%` with zero divisor |
| **Q4** | Exception from `int("hello")`? | `ValueError` | String is right type, but contents are non-numeric |
| **Q5** | Exception from out-of-range index? | `IndexError` | Attempting to access an index `>= len(seq)` |
| **Q6** | Exception from missing dictionary key? | `KeyError` | Direct subscript `dict[key]` on missing key |
| **Q7** | Exception from undefined variable? | `NameError` | Identifier not found in local or global scope |
| **Q8** | Difference between `TypeError` and `ValueError`? | `TypeError` = wrong type; `ValueError` = invalid value | `int([])` is `TypeError`; `int("x")` is `ValueError` |
| **Q9** | Exception from opening missing file in `'r'` mode? | `FileNotFoundError` | File does not exist on disk in read mode |
| **Q10** | Where to look first in a traceback? | The bottom line | Shows the specific exception type and summary |

---

## 15. Quick Reference Cheat Sheet

```python
# -------------------------------------------------------------------
# PYTHON ERRORS & EXCEPTIONS QUICK REFERENCE
# -------------------------------------------------------------------

# 1. SyntaxError
# Occurs at parse time before any code executes.
# Cause: Missing colon, unmatched quote, mismatched parentheses.

# 2. NameError
# Identifier does not exist.
# Fix: Check spelling, ensure assignment happens before access.

# 3. TypeError
# Incompatible types for an operation.
# Example: "Score: " + 10 -> Fix: "Score: " + str(10)

# 4. ValueError
# Valid type, but inappropriate value.
# Example: int("abc") -> Fix: Check with s.isdigit() first

# 5. IndexError
# Sequence index outside valid range.
# Fix: Guard with 0 <= index < len(sequence)

# 6. KeyError
# Dictionary key not found.
# Fix: Guard with if key in my_dict: or use my_dict.get(key, default)

# 7. ZeroDivisionError
# Denominator is zero in division or modulo.
# Fix: Guard with if denominator != 0:

# 8. FileNotFoundError
# Target file does not exist on disk.
# Fix: Guard with if os.path.exists(filepath):

# 9. AttributeError
# Object does not have requested method/attribute.
# Fix: Check object type with type() and capabilities with dir()
```

---

## 16. What Comes Next?

Today, you mastered identifying errors, diagnosing tracebacks, and preventing exceptions defensively using `if/else` checks.

In **Unit–IV — Day 6 (Day 42)**, we will unlock Python’s dedicated runtime exception-handling mechanism: the **`try-except`** block! You will learn how to intercept unexpected exceptions gracefully, execute fallback logic, and build resilient, crash-proof programs.
