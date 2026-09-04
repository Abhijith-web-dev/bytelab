# Unit–IV — Day 6: Handling Exceptions in Python

**Duration:** 90 Minutes  
**Level:** Beginner → Intermediate  
**Unit:** Unit–IV – Files and Exceptions  
**Day:** 6 (Day 42 of 65)  

---

## 1. Day 6 Overview & Topics Covered

Yesterday in Day 5, we discovered the different ways a Python program can fail—surveying syntax errors, tracebacks, and common runtime exceptions such as `ValueError`, `ZeroDivisionError`, `IndexError`, and `FileNotFoundError`. Our guiding question was: **"What went wrong?"**

Today in Day 6, we elevate our engineering mindset from mere observation to active control. Our new guiding question is: **"How can we handle the problem safely so our software never crashes unexpectedly?"**

Students will master Python’s dedicated runtime exception-handling framework: **`try`**, **`except`**, **`else`**, **`finally`**, and **`raise`**. You will learn how to catch specific exceptions, design multi-branch fault handlers, guarantee resource cleanup, enforce business domain rules by raising custom exceptions, and build industrial-strength file processing applications.

### Topics Covered:
- **What is Exception Handling?**: Graceful recovery vs. unhandled termination.
- **Why We Handle Exceptions**: Creating resilient, user-friendly software that doesn't crash on bad inputs.
- **The `try` Block**: Defining guarded zones for risky operations.
- **The `except` Block**: Intercepting and resolving runtime errors.
- **Specific Exception Handlers**: Why bare `except:` is dangerous and how to target `ValueError`, `ZeroDivisionError`, `IndexError`, and `FileNotFoundError`.
- **Multiple `except` Blocks**: Routing different problems to customized feedback branches.
- **Handling Multiple Exceptions Together**: Grouping identical responses with `except (ValueError, IndexError):`.
- **The `else` Block**: Running secondary logic exclusively when `try` completes with **zero** exceptions.
- **The `finally` Block**: Guaranteeing cleanup actions (closing files, releasing locks) regardless of success or failure.
- **The Complete Lifecycle**: Deep trace of `try-except-else-finally` on valid input, invalid input, and zero divisors.
- **The Critical Contrast**: `else` (Success) vs. `finally` (Always).
- **Raising Exceptions with `raise`**: Enforcing application rules that Python’s interpreter cannot anticipate automatically.
- **Inspecting Exception Objects**: Extracting diagnostic descriptions using `except Exception as error:`.
- **Exception Handling in Real-World Loops**: Building self-healing input prompts using `while True:` and `try-except`.
- **File-Based Exception Handling**: Safely opening, reading, parsing delimited records, and closing resources.
- **The Anti-Pattern**: Why `except: pass` (silent failure) is dangerous and how to avoid it.
- **5-Step Problem Solving Strategy**: Systematically identifying risks, exceptions, handlers, feedback, and cleanup.
- **Common Beginner Mistakes & Quick Workouts**.
- **Moodle IDE Architecture & AI Tutoring Rules**.
- **Hands-On Practice Arena**: Safe Student Mark Validator.
- **Final Challenge**: Safe File Student Analyzer.

---

## 2. Learning Objectives

By the end of this 90-minute session, students will be able to:
1. Explain clearly why exception handling is necessary in production software.
2. Construct and trace basic `try` and `except` blocks to prevent program crashes.
3. Catch and handle specific exceptions: `ValueError`, `ZeroDivisionError`, `IndexError`, and `FileNotFoundError`.
4. Implement multiple `except` blocks to provide precise, user-friendly error diagnostics.
5. Combine multiple related exceptions into a single tuple handler `except (A, B):`.
6. Explain the exact execution conditions of the `else` block (runs only when `try` succeeds).
7. Explain the exact execution conditions of the `finally` block (runs unconditionally).
8. Contrast the roles of `else` vs. `finally` with clarity and precision.
9. Manually trigger custom domain exceptions using the `raise` keyword.
10. Capture and display exception message strings using `except ValueError as error:`.
11. Build resilient, interactive input-validation loops using `while True:`, `try`, and `except`.
12. Apply exception handling to file-based data pipelines to skip malformed lines without crashing.

---

## 3. 90-Minute Detailed Session Plan

| Time | Topic | Focus Activity |
| :--- | :--- | :--- |
| **0–8 min** | Day 5 Recap | Review syntax errors, runtime exceptions, and traceback reading |
| **8–20 min** | Why Exception Handling? | Mental models, unhandled crash vs. handled recovery, calculator demo |
| **20–35 min** | `try` and `except` | Basic syntax, execution flow, catching `ValueError` & `ZeroDivisionError` |
| **35–47 min** | Multiple `except` Blocks | Targeted error routing, combining exceptions `(ValueError, IndexError)` |
| **47–58 min** | The `else` Block | Defining success-only branches; clean separation of calculation & display |
| **58–68 min** | The `finally` Block | Unconditional execution, resource cleanup, closing files safely |
| **68–76 min** | The `raise` Keyword | Automatic vs. programmer-defined exceptions, range validation |
| **76–82 min** | Safe File Processing | Processing CSV rows with embedded `try-except` |
| **82–87 min** | Moodle IDE Practice | Solving the *Safe Student Mark Validator* arena challenge |
| **87–90 min** | Quiz & Day 6 Summary | 10-Question assessment, cheat sheet, and Unit-IV recap |

---

## 4. Quick Recap from Day 5

Yesterday, we learned that runtime errors are known as **Exceptions**. When an illegal operation occurs, Python halts and prints a traceback:

```python
# ValueError: invalid literal for int()
number = int("abc")

# ZeroDivisionError: division by zero
result = 10 / 0

# IndexError: list index out of range
numbers = [10, 20, 30]
print(numbers[5])

# FileNotFoundError: No such file or directory
file = open("missing.txt", "r")
```

In Day 5, we prevented errors using defensive `if` conditions (e.g., `if denominator != 0:`). While conditional checks work for simple cases, many real-world operations (like opening external files, querying network connections, or parsing arbitrary user text) cannot be easily predicted with simple `if` statements. 

Today, we learn Python's structured, formal tool for managing runtime anomalies: **Exception Handling**.

---

## 5. What is Exception Handling?

**Exception handling** is the process of intercepting runtime errors as they occur and executing alternative fallback instructions, allowing the program to either recover smoothly or terminate gracefully with a clear explanation.

```text
WITHOUT EXCEPTION HANDLING:
Program Running ──▶ Exception Occurs ──▶ Program Collapses Instantly (Crash!)

WITH EXCEPTION HANDLING:
Program Running ──▶ Exception Occurs ──▶ Intercepted by except block
                                                │
                                                ▼
                                         Display User Message
                                                │
                                                ▼
                                         Clean Up Resources
                                                │
                                                ▼
                                    Continue Safely / Exit Cleanly
```

---

## 6. Why Do We Need Exception Handling?

Consider a standard division calculator:

```python
a = int(input("Enter first number: "))
b = int(input("Enter second number: "))
print("Result:", a / b)
```

If a user enters `10` and `0`, or enters `hello` instead of a number, the script crashes violently with a raw Python traceback:
```text
ZeroDivisionError: division by zero
```

Non-technical users who see a terminal crash believe the entire computer is broken. A professional software application must instead report:
```text
Cannot divide by zero. Please enter a non-zero denominator.
```

Exception handling bridges the gap between raw machine failures and professional user experiences.

---

## 7. Basic `try` and `except`

The foundation of Python exception handling consists of the `try` and `except` blocks:

```python
try:
    # Protected Zone: Code that might raise an exception
    number = int(input("Enter a number: "))
    print("You entered:", number)
except:
    # Fallback Zone: Code that executes IF an exception occurs
    print("Invalid input! Please enter digits only.")
```

### Execution Behavior:
- **If the user enters `25`**:
  `int("25")` evaluates to `25`. The `try` block finishes successfully. The `except` block is completely ignored. Output: `You entered: 25`.
- **If the user enters `hello`**:
  `int("hello")` immediately triggers a `ValueError`. Python halts the `try` block instantly and jumps directly into the `except` block. Output: `Invalid input! Please enter digits only.`. The program does NOT crash!

---

## 8. How `try` and `except` Work Internally

```text
             TRY BLOCK
                 │
      Execute guarded statement
                 │
       Did an exception occur?
               /   \
             NO     YES
             │       │
             │       ▼
             │  EXCEPT BLOCK
             │  Execute handler logic
             │       │
             └───────┼───────┐
                             ▼
              Continue subsequent code
```

1. **Python enters the `try` block** and begins executing statements sequentially.
2. **If all statements succeed**: Python skips the `except` block entirely and continues running subsequent code.
3. **If any statement raises an exception**:
   - Execution inside the `try` block stops **immediately** at that exact line.
   - Any remaining lines inside `try` are skipped.
   - Control jumps directly to the matching `except` block.

---

## 9. Why You Must Use Specific Exceptions

In Section 7, we wrote a bare `except:`:
```python
try:
    number = int(input())
except:
    print("Something failed")
```

> [!WARNING]
> **Avoid Bare `except:` in Production Code!**  
> A bare `except:` catches **everything**, including:
> - `KeyboardInterrupt` (when the user presses `Ctrl+C` to cancel).
> - `SystemExit` (when the system requests the process to close).
> - Typos in your own variable names (`NameError`).
>
> Always specify the exact exception you anticipate:
> ```python
> except ValueError:
>     print("Please enter a valid integer")
> ```

---

## 10. Handling Common Exceptions

### 1. Handling `ValueError`
Occurs when converting incompatible text to numeric values:
```python
try:
    age = int(input("Enter age: "))
    print("Age:", age)
except ValueError:
    print("Age must be a whole number!")
```

### 2. Handling `ZeroDivisionError`
Occurs when dividing or taking modulo by zero:
```python
try:
    a = int(input("Enter numerator: "))
    b = int(input("Enter denominator: "))
    result = a / b
    print("Result:", result)
except ZeroDivisionError:
    print("Cannot divide by zero!")
```

### 3. Handling `IndexError`
Occurs when indexing beyond sequence bounds:
```python
numbers = [10, 20, 30]
try:
    index = int(input("Enter index: "))
    print("Element:", numbers[index])
except IndexError:
    print("Invalid index! Valid range is 0 to 2.")
```

### 4. Handling `FileNotFoundError`
Occurs when opening a non-existent file in read mode:
```python
try:
    file = open("students.txt", "r")
    data = file.read()
    file.close()
    print(data)
except FileNotFoundError:
    print("File 'students.txt' was not found on disk.")
```

---

## 11. Multiple `except` Blocks

A single `try` block can be followed by multiple distinct `except` blocks, each tailored to a specific failure mode:

```python
try:
    a = int(input("Enter first number: "))
    b = int(input("Enter second number: "))
    result = a / b
    print("Result:", result)
except ValueError:
    print("Error: Please enter integer numbers only.")
except ZeroDivisionError:
    print("Error: Denominator cannot be zero.")
```

### Flow Routing:
- If user enters `abc` and `10` ➔ Handled by `except ValueError`.
- If user enters `10` and `0` ➔ Handled by `except ZeroDivisionError`.
- If user enters `10` and `2` ➔ Zero exceptions raised; prints `Result: 5.0`.

### Grouping Multiple Exceptions Together:
When two or more exceptions should trigger the exact same response, combine them into a tuple:
```python
try:
    idx = int(input("Enter index: "))
    print(numbers[idx])
except (ValueError, IndexError):
    print("Invalid input or index out of range!")
```

---

## 12. The `else` Block

Python provides an optional **`else`** block that executes **only if the `try` block completes without raising any exceptions**:

```python
try:
    number = int(input("Enter a positive number: "))
except ValueError:
    print("Invalid number entered!")
else:
    # Runs ONLY when no exception occurred in try!
    print("Square =", number * number)
```

### Why Use `else`?
Placing the success logic inside `else` keeps the `try` block minimal, focused solely on the lines of code that could actually trigger the exception. This prevents accidentally catching errors caused by downstream code!

---

## 13. The `finally` Block

The **`finally`** block runs **regardless of whether an exception occurred, and regardless of whether an exception was handled**:

```python
try:
    number = int(input("Enter number: "))
    print("Number:", number)
except ValueError:
    print("Invalid input!")
finally:
    # Guaranteed execution!
    print("Validation check completed.")
```

### Use Case: Cleanup Operations
The primary purpose of `finally` is releasing external resources:
- Closing open file handles.
- Disconnecting network sockets or database sessions.
- Removing temporary files.

```python
file = None
try:
    file = open("data.txt", "r")
    content = file.read()
    print(content)
except FileNotFoundError:
    print("Error: data.txt could not be found.")
finally:
    # Ensure file is closed if it was opened
    if file is not None:
        file.close()
    print("File cleanup completed.")
```

---

## 14. The Complete `try-except-else-finally` Lifecycle

```python
try:
    number = int(input("Enter number: "))
    result = 100 / number
except ValueError:
    print("Please enter a valid number")
except ZeroDivisionError:
    print("Cannot divide by zero")
else:
    print("Result =", result)
finally:
    print("Calculation completed")
```

### Trace Comparison:

| Input Scenario | Execution Trace | Output |
| :--- | :--- | :--- |
| **Valid Input (`10`)** | `try` ➔ `else` ➔ `finally` | `Result = 10.0`<br>`Calculation completed` |
| **Invalid Text (`abc`)** | `try` (fails on `int`) ➔ `except ValueError` ➔ `finally` | `Please enter a valid number`<br>`Calculation completed` |
| **Zero Divisor (`0`)** | `try` (fails on `/`) ➔ `except ZeroDivisionError` ➔ `finally` | `Cannot divide by zero`<br>`Calculation completed` |

---

## 15. The Critical Contrast: `else` vs. `finally`

| Dimension | `else` Block | `finally` Block |
| :--- | :--- | :--- |
| **Trigger Condition** | Runs ONLY when `try` raises **NO** exception | Runs **ALWAYS** (exception or no exception) |
| **Primary Role** | Normal successful processing logic | Cleanup operations (close file, reset state) |
| **Runs on Error?** | **Never** | **Always** |
| **Easy Memory Trick** | **`else` = SUCCESS** | **`finally` = ALWAYS** |

---

## 16. Raising Exceptions Manually with `raise`

Python automatically detects language-level errors like zero division or missing files. However, Python **cannot** know your specific application business rules.

For example, if an application asks for a student's age, and the user enters `-5`, `-5` is a mathematically valid integer! Python will not raise an automatic error.

To enforce application rules, developers intentionally trigger exceptions using the **`raise`** keyword:

```python
age = int(input("Enter age: "))

if age < 0:
    raise ValueError("Age cannot be negative!")

print("Registered age:", age)
```

If the user enters `-5`:
```text
ValueError: Age cannot be negative!
```

---

## 17. Inspecting Exception Messages with `as error`

When an exception is raised (either automatically or manually), you can bind the exception object to a variable using the `as` keyword:

```python
try:
    mark = int(input("Enter mark: "))
    if mark < 0 or mark > 100:
        raise ValueError("Mark must be between 0 and 100")
except ValueError as error:
    print("Validation Error:", error)
else:
    print("Mark accepted:", mark)
```

When input is `150`:
```text
Validation Error: Mark must be between 0 and 100
```
Here, `error` contains the descriptive text string passed to `ValueError(...)`.

---

## 18. Real-World Applications: Resilient Input Loops

In real applications, we don't just crash or quit when a user mistypes; we prompt them again until they provide valid input:

```python
while True:
    try:
        mark = int(input("Enter student mark (0-100): "))
        if mark < 0 or mark > 100:
            raise ValueError("Mark must be between 0 and 100")
    except ValueError as error:
        print("Invalid entry:", error)
        print("Please try again...\n")
    else:
        print("Accepted valid mark:", mark)
        break
```

This pattern combines `while True:`, `try`, `except`, `raise`, `else`, and `break` into an uncrashable input validator!

---

## 19. File-Based Exception Handling

File processing pipelines often encounter corrupted or missing records. Exception handling allows a data parser to skip corrupted rows while continuing to process valid data:

```python
# Processing CSV records from a file
valid_records = 0
invalid_records = 0

try:
    with open("students.txt", "r") as file:
        for line in file:
            parts = line.strip().split(",")
            if len(parts) < 2:
                continue
            name = parts[0]
            try:
                mark = int(parts[1])
                print(f"Valid Student: {name} - {mark}")
                valid_records += 1
            except ValueError:
                print(f"Invalid Mark for: {name}")
                invalid_records += 1
except FileNotFoundError:
    print("Error: students.txt could not be found.")
finally:
    print("\nFile processing completed.")
    print(f"Valid Students: {valid_records} | Invalid Records: {invalid_records}")
```

If `students.txt` contains:
```text
Arun,85
Priya,92
Rahul,abc
Meena,78
```
The program safely prints:
```text
Valid Student: Arun - 85
Valid Student: Priya - 92
Invalid Mark for: Rahul
Valid Student: Meena - 78

File processing completed.
Valid Students: 3 | Invalid Records: 1
```

---

## 20. Exception Handling Does NOT Mean "Ignore Errors"

A common beginner anti-pattern is silencing errors completely:

```python
# DANGEROUS ANTI-PATTERN: DO NOT DO THIS!
try:
    perform_complex_calculation()
except:
    pass  # Silently swallows all errors!
```

Swallowing exceptions creates "ghost bugs" where data becomes quietly corrupt, and debugging becomes nearly impossible. 

**Good Exception Handling Rules:**
1. Only catch exceptions you know how to handle or report.
2. Provide informative error messages.
3. Keep the system in a clean, predictable state.

---

## 21. 5-Step Exception Problem-Solving Framework

Whenever you write a program that interacts with user input, files, or calculations, apply this 5-step framework:

```text
Step 1: WHAT CAN FAIL?
        └─ Converting input: int(input())

Step 2: WHAT EXCEPTION CAN OCCUR?
        └─ Non-numeric string ➔ ValueError

Step 3: CAN I CATCH IT SPECIFICALLY?
        └─ Use: except ValueError:

Step 4: WHAT FEEDBACK SHOULD THE USER RECEIVE?
        └─ "Please enter digits only."

Step 5: IS CLEANUP REQUIRED?
        └─ Close file handles / reset state in finally:
```

---

## 22. Common Beginner Mistakes

### Mistake 1: Placing Risky Code Outside the `try` Block
```python
# WRONG:
number = int(input())  # If user types "abc", crashes BEFORE try!
try:
    print(number)
except ValueError:
    print("Invalid")

# CORRECT:
try:
    number = int(input())
    print(number)
except ValueError:
    print("Invalid")
```

### Mistake 2: Catching the Wrong Exception Type
```python
# WRONG:
try:
    val = int("hello")
except ZeroDivisionError:  # Wrong type! int("hello") raises ValueError!
    print("Error")
```

### Mistake 3: Believing `else` Runs After an Exception
Remember: The `else` block runs **only** when the `try` block experienced **zero** exceptions.

### Mistake 4: Believing `finally` Runs Only on Errors
The `finally` block runs **always**—whether an error occurred, whether it was caught, or whether the code succeeded completely.

---

## 23. Moodle IDE Architecture & AI Tutoring Rules

### Visual Execution Layout in Moodle IDE:
```text
┌────────────────────────────────────────────────────────────┐
│              PYTHON EXCEPTION LAB                         │
├──────────────────────┬─────────────────────────────────────┤
│ PYTHON EDITOR        │ EXECUTION FLOW                      │
│                      │                                     │
│ try:                 │ TRY                                 │
│     mark = ...       │  ↓                                  │
│                      │ Exception?                          │
│ except ValueError:   │  ↙              ↘                   │
│     ...              │ YES             NO                  │
│                      │ ↓                ↓                  │
│ else:                │ EXCEPT           ELSE               │
│     ...              │                  ↓                  │
│                      │              Success                │
│ finally:             │                  ↓                  │
│     ...              │              FINALLY                │
└──────────────────────┴─────────────────────────────────────┘
```

### AI Agent Tutoring Rules for Exception Handling:
1. **Never Give the Code Directly**: Guide the student by asking diagnostic questions.
2. **Trace the Two Failure Cases**: Ask the student, *"What happens when the input is 'abc'? What happens when the input is '150'?"*
3. **Encourage Specific Handlers**: If the student writes a bare `except:`, guide them to specify `except ValueError:`.
4. **Clarify Block Roles**: Remind students that `else` is for victory (success), and `finally` is for cleanup (always).

---

## 24. Hands-On Practice Arena: Safe Student Mark Validator

### Problem Statement:
Write a Python program that asks the user to enter a student's mark. The valid mark range is `0` to `100` (inclusive).

Your program must:
1. Read input using `input()`.
2. In a `try` block, convert the input to an integer. If non-numeric, catch or raise `ValueError("Please enter a number")`.
3. Check the valid range. If `< 0` or `> 100`, raise `ValueError("Mark must be between 0 and 100")`.
4. In `except ValueError as error:`, print: `Invalid mark: <error>`.
5. In `else:`, print: `Valid mark: <mark>`.
6. In `finally:`, print: `Mark validation completed`.

### Reference Implementation:
```python
raw_input = input()

try:
    try:
        mark = int(raw_input)
    except ValueError:
        raise ValueError("Please enter a number")

    if mark < 0 or mark > 100:
        raise ValueError("Mark must be between 0 and 100")
except ValueError as error:
    print("Invalid mark:", error)
else:
    print("Valid mark:", mark)
finally:
    print("Mark validation completed")
```

---

## 25. 10-Question Comprehensive Quiz Review

| # | Question Summary | Correct Answer | Key Rationale |
| :--- | :--- | :--- | :--- |
| **Q1** | Block containing code that may fail? | `try` | Wraps risky statements in protected execution |
| **Q2** | Block that catches and handles an exception? | `except` | Executes alternative recovery logic |
| **Q3** | Block executing only when NO exception occurs? | `else` | Dedicated success-case code |
| **Q4** | Block running unconditionally? | `finally` | Always executes; used for cleanup |
| **Q5** | Exception raised by `int("abc")`? | `ValueError` | Valid string type, but invalid numeric content |
| **Q6** | Exception raised by `10 / 0`? | `ZeroDivisionError` | Division by zero is mathematically impossible |
| **Q7** | What does `raise` do? | Manually triggers an exception | Enforces custom application/domain validation rules |
| **Q8** | What does `try: int("abc")` with `else` and `finally` print? | Prints `Invalid` and `Done` | `except` catches error, `else` skipped, `finally` always runs |
| **Q9** | Exception when opening missing file in read mode? | `FileNotFoundError` | Target file path does not exist on disk |
| **Q10** | Why handle specific exceptions? | Identifies expected problems cleanly | Prevents silencing unintended bugs or interrupts |

---

## 26. Day 6 Quick Reference Cheat Sheet

```python
# -------------------------------------------------------------------
# PYTHON EXCEPTION HANDLING CHEAT SHEET
# -------------------------------------------------------------------

# 1. Complete Architecture
try:
    # Risky code
    value = int(input())
    result = 100 / value
except ValueError:
    # Handles invalid conversion
    print("Not a valid number")
except ZeroDivisionError:
    # Handles division by zero
    print("Cannot divide by zero")
else:
    # Runs ONLY on complete success
    print("Calculation successful:", result)
finally:
    # Runs ALWAYS regardless of errors
    print("Execution complete")

# 2. Manual Exceptions
if score < 0 or score > 100:
    raise ValueError("Score must be between 0 and 100")

# 3. Capturing Error Messages
except ValueError as error:
    print("Error message:", error)

# 4. Safe Resource Cleanup
file = None
try:
    file = open("data.txt", "r")
    data = file.read()
finally:
    if file is not None:
        file.close()
```

---

## 27. Final Challenge: Safe File Student Analyzer

Create a script that reads `students.txt` containing records formatted as `Name,Mark`:
```text
Arun,85
Priya,92
Rahul,abc
Meena,78
```

The script must:
1. Open the file safely.
2. Parse each line and separate name and mark.
3. Catch `ValueError` for corrupt marks like `abc`.
4. Display valid records as `Valid Student: <name> - <mark>`.
5. Display invalid records as `Invalid Mark for: <name>`.
6. Tally valid students and invalid records.
7. In `finally:`, display `File processing completed`.

---

## 28. What Comes Next?

Congratulations on mastering Python’s exception handling lifecycle! You now write code that anticipates failure, protects users, and recovers gracefully.

In **Unit–IV — Day 7 (Day 43)**, we will build upon this foundation by exploring **Modules and Packages**—learning how to organize large, crash-proof programs into modular files and reusable directory packages.
