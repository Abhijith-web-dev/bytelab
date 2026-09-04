# Unit–IV — Day 4: Command-Line Arguments and sys.argv

**Duration:** 90 Minutes  
**Level:** Beginner → Intermediate  
**Unit:** Unit–IV – Files and Exceptions  
**Day:** 4 (Day 40 of 65)  

---

## 1. Day 4 Overview & Topics Covered

Today’s session explores how Python scripts interface with operating system environments. Students will move beyond hardcoded values and interactive pauses, learning how to pass parameters directly to Python scripts from the operating system terminal using **`sys.argv`**. This capability transforms static programs into versatile, reusable command-line utilities.

### Topics Covered:
- **Command-Line Arguments**: Meaning, anatomy, and invocation mechanisms.
- **Why Scripts Need Arguments**: Automated batch jobs, pipelines, and terminal tooling.
- **The `sys` Module**: Exposing system-level parameters via `sys.argv`.
- **Positional Indexing**: The meaning of `sys.argv[0]`, `sys.argv[1]`, `sys.argv[2]`, and beyond.
- **String Typing & Arithmetic Traps**: Why arguments are always strings and how to convert them safely using `int()` and `float()`.
- **Defensive CLI Programming**: Guarding against `IndexError` by checking `len(sys.argv)`.
- **Helpful Usage Messages**: Guiding users when mandatory flags are missing.
- **Command-Line Arithmetic & Applications**: Building multi-operation calculators.
- **Command-Line File Processors**: Passing file names dynamically (`python analyzer.py data.txt`).
- **Dynamic Argument Slicing**: Ingesting variable-length parameter lists with `sys.argv[1:]`.
- **Integrating Arguments with Functions & Lists**: Passing arguments into helper logic.
- **Common Beginner Mistakes**: Import errors, index 0 confusion, string addition pitfalls, and unquoted shell symbols.
- **Moodle IDE Architecture & AI Tutoring Guidance**.
- **Hands-On Practice Arena**: The Command-Line Number Analyzer.

---

## 2. Learning Objectives

By the end of this 90-minute session, students will be able to:
1. Explain what a command-line argument is and how the operating system shell passes it to Python.
2. Import the `sys` module and inspect the `sys.argv` list.
3. Identify that `sys.argv[0]` contains the script name, while `sys.argv[1]` contains the first user parameter.
4. Access and process multiple command-line arguments using 0-based list indexing.
5. Explain why all values in `sys.argv` are stored as strings.
6. Convert argument strings into integers (`int()`) or floats (`float()`) for numeric computing.
7. Validate argument counts using `len(sys.argv)` to prevent `IndexError` crashes.
8. Craft professional, user-friendly CLI `Usage:` instructions.
9. Slice `sys.argv[1:]` to process variable-length lists of arguments.
10. Pass file paths into Python scripts dynamically to build reusable file-processing tools.

---

## 3. 90-Minute Detailed Session Plan

| Time | Topic | Focus Activity |
| :--- | :--- | :--- |
| **0–8 min** | Day 3 Recap | Format operator `%`, `%s`, `%d`, `%.2f`, tabular reports |
| **8–20 min** | What are CLI Arguments? | Intuition, shell invocation, and the pizza ordering analogy |
| **20–35 min** | `sys.argv` Internals | Index 0 vs Index 1, terminal anatomy, and list representation |
| **35–45 min** | Argument Types & Coercion | Why arguments are strings, concatenation traps, and `int()` conversion |
| **45–55 min** | Argument Validation | `len(sys.argv)`, preventing crashes, and designing usage messages |
| **55–68 min** | Real-World CLI Tools | Building a command-line calculator and string case converter |
| **68–78 min** | CLI + File Handling | Passing dynamic filenames to file processors (`report.py data.txt`) |
| **78–82 min** | Debugging Common Pitfalls | Index errors, unquoted `*` wildcards, and type mismatches |
| **82–87 min** | Moodle IDE Practice | Solving the *Command-Line Number Analyzer* challenge |
| **87–90 min** | Quiz & Day 4 Summary | Concept check and unit progression preview |

---

## 4. Quick Recap from Day 3

Yesterday, we learned how to format raw strings and numbers into polished reports using the format operator `%`:

```python
name = "Arun"
mark = 85
average = 82.5678

# Format specifier interpolation
report = "Student: %-10s | Mark: %3d | Average: %.2f" % (name, mark, average)
print(report)
# Output: Student: Arun       | Mark:  85 | Average: 82.57
```

We also noticed that programs often process external files. But hardcoding filenames like `filename = "students.txt"` inside the code forces us to edit source code every time we want to inspect a different file. Today, we discover how to pass parameters from outside the code!

---

## 5. What is a Command-Line Argument?

A **command-line argument** is an input value supplied to a computer program at the exact moment the program is launched from the operating system terminal or command prompt.

```bash
python greet.py Arun
```

Here:
- `python` is the interpreter executable.
- `greet.py` is the script to run.
- `Arun` is a **command-line argument** passed directly into the program before it begins execution.

### Real-World Analogy: Ordering a Pizza

```text
INTERACTIVE APPROACH (input()):
You call the restaurant.
Restaurant: "What would you like?" (Program pauses)
You: "Margherita pizza" (User types)
Restaurant: "What size?" (Program pauses again)
You: "Large" (User types)

COMMAND-LINE APPROACH (sys.argv):
You place the entire order in a single dispatch:
order.py Margherita Large
The kitchen receives both items immediately and starts cooking.
```

```text
input()   ───► Asks questions AFTER the program starts (Interactive)
sys.argv  ───► Receives instructions WHEN the program starts (Automated)
```

---

## 6. Why Do We Need Command-Line Arguments?

1. **Automation & Scheduled Tasks**: Scripts running inside cron jobs, cloud functions, or CI/CD pipelines cannot stop to ask for keyboard input.
2. **Reusability**: A single analyzer script can process fifty different files without changing a single line of code:
   ```bash
   python analyzer.py january_sales.csv
   python analyzer.py february_sales.csv
   python analyzer.py march_sales.csv
   ```
3. **Pipeline Chaining**: Output from one command-line tool can be piped directly into another.
4. **Configuration & Flags**: Passing options such as `--verbose`, `--port 8080`, or `--output result.txt`.

---

## 7. The `sys` Module & `sys.argv`

Python provides access to command-line arguments through the standard `sys` module.

```python
import sys

print(sys.argv)
```

If we launch this script from the terminal:
```bash
python student.py Arun 20 Chennai
```

Python initializes `sys.argv` as a list of strings:
```python
['student.py', 'Arun', '20', 'Chennai']
```

### Visualizing `sys.argv`
```text
Command: python student.py     Arun       20       Chennai
                     │          │         │           │
Index:             sys.argv[0] sys.argv[1] sys.argv[2] sys.argv[3]
Type:                str        str       str         str
Value:          "student.py"   "Arun"    "20"      "Chennai"
```

### Key Rules:
- **`sys.argv[0]`**: The name of the Python script being executed (`"student.py"`).
- **`sys.argv[1]`**: The first user-supplied parameter (`"Arun"`).
- **`sys.argv[2]`**: The second user-supplied parameter (`"20"`).
- **`len(sys.argv)`**: The total number of arguments, *including* the script name itself (here, `len(sys.argv) == 4`).

---

## 8. Arguments Are ALWAYS Strings

This is the single most common pitfall for beginner programmers:

```python
import sys

# Suppose run as: python add.py 10 20
a = sys.argv[1]  # "10" (String)
b = sys.argv[2]  # "20" (String)

print(a + b)  # Outputs: '1020' (String concatenation!)
```

Because `sys.argv` collects raw text from the shell, numbers arrive as strings. To perform arithmetic, you must explicitly convert them using `int()` or `float()`:

```python
import sys

# Correct numerical conversion:
a = int(sys.argv[1])  # 10 (Integer)
b = int(sys.argv[2])  # 20 (Integer)

print("%d + %d = %d" % (a, b, a + b))  # Outputs: 10 + 20 = 30
```

### Type Conversion Summary:
| Value in Shell | Type in `sys.argv` | Conversion Required | Resulting Type |
| :--- | :--- | :--- | :--- |
| `Arun` | `str` | None | `str` |
| `25` | `str` | `int(sys.argv[i])` | `int` |
| `99.5` | `str` | `float(sys.argv[i])` | `float` |

---

## 9. Defensive Programming: Checking `len(sys.argv)`

If your program attempts to access `sys.argv[1]` when no argument was passed, Python crashes immediately:
```text
IndexError: list index out of range
```

To prevent crashes, always inspect `len(sys.argv)` before indexing:

```python
import sys

# Script requires 1 user argument: [script_name, user_arg] -> total len >= 2
if len(sys.argv) < 2:
    print("Usage: python greet.py <name>")
else:
    name = sys.argv[1]
    print("Hello, %s!" % name)
```

```bash
$ python greet.py
Usage: python greet.py <name>

$ python greet.py Priya
Hello, Priya!
```

---

## 10. Building a Multi-Argument Tool: CLI Calculator

Let's build a complete command-line calculator accepting two numbers and an operator:
```bash
python calculator.py 15 + 25
```

```python
import sys

# We expect 4 items: [script, num1, operator, num2]
if len(sys.argv) < 4:
    print("Usage: python calculator.py <num1> <op> <num2>")
    print("Operators supported: +  -  *  /")
    sys.exit(1)

num1 = float(sys.argv[1])
operator = sys.argv[2]
num2 = float(sys.argv[3])

if operator == "+":
    result = num1 + num2
elif operator == "-":
    result = num1 - num2
elif operator == "*":
    result = num1 * num2
elif operator == "/":
    if num2 != 0:
        result = num1 / num2
    else:
        result = "Error: Division by zero"
else:
    result = "Error: Unknown operator '%s'" % operator

print("Result: %s" % result)
```

> [!TIP]
> In bash or zsh shells, the asterisk `*` can be expanded by the shell as a wildcard filename matcher. To prevent the shell from intercepting it, wrap it in quotes: `python calculator.py 5 "*" 4`.

---

## 11. Command-Line Arguments with Files

The true power of command-line arguments emerges when building file processors. Instead of hardcoding the filename inside Python, pass it from the shell:

```python
import sys

if len(sys.argv) < 2:
    print("Usage: python count_lines.py <filename>")
    sys.exit(1)

filename = sys.argv[1]

file = open(filename, "r")
lines = file.readlines()
file.close()

print("File '%s' contains %d lines." % (filename, len(lines)))
```

**Terminal Run:**
```bash
python count_lines.py students.txt
# File 'students.txt' contains 4 lines.

python count_lines.py server.log
# File 'server.log' contains 1420 lines.
```

---

## 12. Processing Dynamic Lists of Arguments: `sys.argv[1:]`

What if a program accepts an arbitrary number of inputs? Slicing `sys.argv[1:]` extracts all arguments after the script name:

```python
import sys

if len(sys.argv) < 2:
    print("Usage: python sum_all.py <num1> <num2> ...")
else:
    numbers = []
    for arg in sys.argv[1:]:
        numbers.append(int(arg))
    
    total = sum(numbers)
    average = total / len(numbers)
    
    print("Numbers : %s" % numbers)
    print("Sum     : %d" % total)
    print("Average : %.2f" % average)
```

**Terminal Run:**
```bash
python sum_all.py 10 20 30 40
# Numbers : [10, 20, 30, 40]
# Sum     : 100
# Average : 25.00
```

---

## 13. Common Beginner Mistakes & How to Fix Them

### Mistake 1: Forgetting to Import `sys`
```python
# MISTAKE:
print(sys.argv[1])  # NameError: name 'sys' is not defined

# CORRECTION:
import sys
print(sys.argv[1])
```

### Mistake 2: Assuming Index 0 is User Data
```python
# MISTAKE:
# Running: python app.py Arun
user_name = sys.argv[0]  # Holds 'app.py'!

# CORRECTION:
user_name = sys.argv[1]  # Holds 'Arun'
```

### Mistake 3: Unconverted Number Addition
```python
# MISTAKE:
# Running: python calc.py 5 10
result = sys.argv[1] + sys.argv[2]  # Produces '510'

# CORRECTION:
result = int(sys.argv[1]) + int(sys.argv[2])  # Produces 15
```

### Mistake 4: Accessing Arguments Without Bounds Checking
```python
# MISTAKE:
filename = sys.argv[1]  # Crashes with IndexError if run without arguments

# CORRECTION:
if len(sys.argv) < 2:
    print("Usage error: please provide argument")
    sys.exit(1)
filename = sys.argv[1]
```

---

## 14. Quick Student Workouts

1. **What is stored in `sys.argv[0]` when executing `python tool.py data.txt`?**  
   *Answer:* `'tool.py'`

2. **If a script is run as `python test.py 5 10 15`, what is `len(sys.argv)`?**  
   *Answer:* `4` (the script name + 3 numbers)

3. **What is the data type of `sys.argv[2]` before any conversion?**  
   *Answer:* `str` (String)

4. **What expression extracts only the user arguments from `sys.argv`?**  
   *Answer:* `sys.argv[1:]`

5. **How do you convert the second user argument to a floating-point number?**  
   *Answer:* `float(sys.argv[2])`

---

## 15. Day 4 Moodle Coding Practice: Command-Line Number Analyzer

### Problem Statement
Create a Python program named `analyzer.py` that accepts multiple numbers through command-line arguments using `sys.argv`.

Example invocation:
```bash
python analyzer.py 10 20 15 5 30
```

### Requirements:
1. Import `sys` to access `sys.argv`.
2. Check if arguments were supplied. If `len(sys.argv) < 2`, display:
   ```text
   Usage: python analyzer.py <number1> <number2> ...
   ```
3. Extract all numbers from `sys.argv[1:]`.
4. Convert them to integers and store them in a list named `numbers`.
5. Compute the total `Sum` and class `Average` (`%.2f`).
6. Manually traverse the list to find the `Largest` and `Smallest` numbers (do not use `max()` or `min()`).
7. Count how many numbers are `Even` (`num % 2 == 0`).
8. Print the report using the `%` format operator:

```text
===== NUMBER ANALYZER =====
Numbers : [10, 20, 15, 5, 30]
Sum     : 80
Average : 16.00
Largest : 30
Smallest: 5
Even    : 3
```

---

## 16. Moodle AI Agent Instruction Guide

When tutoring students on this problem:
1. **Never reveal full solutions immediately.** Encourage them to trace `sys.argv` step-by-step.
2. Ask: *"What is stored in `sys.argv[0]`? Where do the actual numbers begin?"*
3. Remind them: *"Can you add strings together mathematically? What conversion function is needed?"*
4. Guide them to declare accumulator variables:
   ```python
   largest = numbers[0]
   smallest = numbers[0]
   even_count = 0
   ```
5. Ensure they handle the no-argument edge case with `if len(sys.argv) < 2:`.
6. Confirm that the average is formatted with `%.2f` to enforce two decimal places.

---

## 17. Moodle IDE Architecture for Day 4

```text
┌─────────────────────────────────────────────────────────────┐
│                 BYTELAB COMMAND-LINE LAB                    │
├──────────────────────┬──────────────────────────────────────┤
│ FILE EXPLORER        │ MONACO CODE EDITOR                   │
│                      │                                      │
│ 📄 analyzer.py       │ 1  import sys                        │
│ 📄 students.txt      │ 2  if len(sys.argv) < 2:             │
│                      │ 3      print("Usage: ...")           │
│                      │ 4  else:                             │
│                      │ 5      numbers = [int(x) ...]        │
├──────────────────────┴──────────────────────────────────────┤
│ PROGRAM ARGUMENTS SIMULATOR                                 │
│ [ 10 20 15 5 30                                           ] │
│ [▶ Run with Arguments]  [Reset Args]                        │
├─────────────────────────────────────────────────────────────┤
│ ARGUMENT INSPECTOR (sys.argv)                               │
│ [0] -> 'analyzer.py' (str)                                  │
│ [1] -> '10' -> int: 10                                      │
│ [2] -> '20' -> int: 20                                      │
│ [3] -> '15' -> int: 15                                      │
│ [4] -> '5'  -> int: 5                                       │
│ [5] -> '30' -> int: 30                                      │
├─────────────────────────────────────────────────────────────┤
│ CONSOLE OUTPUT                                              │
│ ===== NUMBER ANALYZER =====                                 │
│ Numbers : [10, 20, 15, 5, 30]                               │
│ Sum     : 80                                                │
│ Average : 16.00                                             │
│ Largest : 30                                                │
│ Smallest: 5                                                 │
│ Even    : 3                                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 18. Day 4 Assessment Quiz Solutions

1. **What is a command-line argument?**  
   *Answer:* A value provided when a program starts (Option B)
2. **Which module provides access to command-line arguments?**  
   *Answer:* `sys` (Option C)
3. **Which object contains the command-line arguments?**  
   *Answer:* `sys.argv` (Option B)
4. **In `python test.py Arun`, what is stored in `sys.argv[0]`?**  
   *Answer:* `test.py` (Option C)
5. **In `python test.py Arun`, what is `sys.argv[1]`?**  
   *Answer:* `Arun` (Option B)
6. **What type are command-line arguments initially?**  
   *Answer:* String (Option C)
7. **What is output by `a = sys.argv[1]; b = sys.argv[2]; print(a + b)` with `python add.py 10 20`?**  
   *Answer:* `1020` (Option B)
8. **How can `"10"` be converted to an integer?**  
   *Answer:* `int("10")` (Option B)
9. **What does `sys.argv[1:]` represent?**  
   *Answer:* All user arguments after the program name (Option B)
10. **Why should a command-line program check `len(sys.argv)`?**  
    *Answer:* To make sure required arguments were supplied and avoid crashes (Option B)

---

## 19. Day 4 Cheat Sheet

```python
# --- ESSENTIAL IMPORTS ---
import sys

# --- INDEXING CONVENTIONS ---
script_name  = sys.argv[0]              # Name of the script
first_arg    = sys.argv[1]              # First user parameter
second_arg   = sys.argv[2]              # Second user parameter
all_user_args = sys.argv[1:]            # All arguments except script name

# --- VALIDATION PATTERN ---
if len(sys.argv) < 2:
    print("Usage: python app.py <arg1> [arg2]")
    sys.exit(1)

# --- TYPE CONVERSIONS ---
whole_num = int(sys.argv[1])            # String to integer
dec_num   = float(sys.argv[2])          # String to float

# --- DYNAMIC ARRAYS ---
nums = [int(x) for x in sys.argv[1:]]   # List comprehension conversion
total = sum(nums)                       # Sum calculation
avg = total / len(nums) if nums else 0  # Average calculation

# --- FORMATTED OUTPUT ---
print("Total: %d | Average: %.2f" % (total, avg))
```

---

## 20. Final Challenge: Dynamic File Report CLI Tool

Create `report.py` accepting the filename as a CLI argument:
```bash
python report.py students.txt
```

```python
import sys

if len(sys.argv) < 2:
    print("Usage: python report.py <filename>")
    sys.exit(1)

filename = sys.argv[1]
file = open(filename, "r")

count = 0
total = 0
passed = 0
highest = -1
lowest = 999999

for line in file:
    clean = line.strip()
    if not clean: continue
    name, mark_str = clean.split(",")
    mark = int(mark_str)
    
    count += 1
    total += mark
    if mark >= 40: passed += 1
    if mark > highest: highest = mark
    if mark < lowest: lowest = mark

file.close()

avg = total / count if count > 0 else 0

print("=" * 32)
print("%20s" % "STUDENT REPORT")
print("=" * 32)
print("Students : %d" % count)
print("Total    : %d" % total)
print("Average  : %.2f" % avg)
print("Highest  : %d" % highest)
print("Lowest   : %d" % lowest)
print("Passed   : %d" % passed)
print("=" * 32)
```

---

## 21. Day 4 Key Takeaway

> **Command-line arguments turn a static script into a dynamic, reusable software utility. With `sys.argv`, your programs can be launched directly from terminals, scheduled in automated pipelines, and linked with other tools across the operating system without manual intervention.**
