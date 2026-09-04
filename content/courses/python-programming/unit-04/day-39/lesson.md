# Unit–IV — Day 3: Format Operator, File Data Formatting & Command Line Arguments

**Duration:** 90 Minutes  
**Level:** Beginner → Intermediate  
**Unit:** Unit–IV — Files and Exceptions  
**Day:** 3 (Day 39 of 65)  

---

## 1. Day 3 Overview & Topics Covered

Today’s session connects string manipulation, file input/output, and terminal interaction. Students will master the classic Python **format operator `%`**, learn how to convert unpolished text records into aligned reports, and discover how to write professional command-line utilities using **`sys.argv`** so their Python programs can be launched directly with inputs from the operating system shell.

### Topics Covered:
- **The Format Operator `%`**: Syntax, interpolation mechanisms, and memory rules.
- **Fundamental Specifiers**: `%s` for strings, `%d` for integers, and `%f` for floating-point values.
- **Precision Formatting**: Controlling floating-point decimals with `%.2f` and column widths with `%-10s`.
- **Formatting File Data**: Writing aligned tables and structured headers to files.
- **File Ingestion & Cleansing Pipeline**: Traversal, `.strip()`, `.split(",")`, and typed format reconstruction.
- **Practical File Processors**: Average calculation, threshold filtering, report generators, and file-to-file pipes.
- **Command-Line Arguments**: What they are, why automation demands them, and how they differ from `input()`.
- **The `sys` Module & `sys.argv`**: Index anatomy (`sys.argv[0]`, `sys.argv[1]`), string conversions, and index validation.
- **Production CLI Scripting**: Passing file paths directly as CLI parameters.
- **Common Beginner Mistakes**: Specifier mismatches, string concatenation bugs with `sys.argv`, and unhandled `IndexError`.
- **Moodle IDE Experience & AI Agent Tutoring Protocol**.
- **Hands-On Practice Arena**: The Student File Report Generator.

---

## 2. Learning Objectives

By the end of this 90-minute session, students will be able to:
1. Explain the role and behavior of the format operator `%` in Python.
2. Use `%s`, `%d`, and `%f` accurately to interpolate variables into strings.
3. Control floating-point precision using `%.2f` and column width using `%-10s`.
4. Read raw CSV-style records from a file and render them into structured, readable reports.
5. Create new output files populated with formatted summary data.
6. Explain the operational difference between interactive `input()` and startup command-line arguments.
7. Import `sys` and retrieve arguments through `sys.argv`.
8. Explain why `sys.argv` values are strings and convert them to numeric types when required.
9. Guard against missing argument crashes by checking `len(sys.argv)`.
10. Combine file handling, string formatting, and CLI arguments into unified scripts.

---

## 3. 90-Minute Detailed Session Plan

| Time | Topic | Focus Activity |
| :--- | :--- | :--- |
| **0–7 min** | Day 2 Recap | `read()`, `readline()`, `readlines()`, append mode `"a"` |
| **7–20 min** | Format Operator Basics | Syntax `"..." % val`, `%s`, `%d`, `%f` |
| **20–32 min** | Numeric & Decimal Precision | Rounding floats with `%.2f`, table widths with `%-10s` |
| **32–47 min** | Formatting File Data | Tabular reports, writing formatted records to text files |
| **47–62 min** | Practical File Programs | Calculating averages, filtering passed students to a new file |
| **62–72 min** | Command Line Arguments | What is a CLI parameter, importing `sys`, `sys.argv` anatomy |
| **72–80 min** | `input()` vs `sys.argv` | Interactive vs batch automation comparison |
| **80–87 min** | Moodle IDE Practice | Solving the *Student File Report Generator* challenge |
| **87–90 min** | Quiz & Day 3 Summary | Assessment questions and wrap-up |

---

## 4. Quick Recap from Day 2

Yesterday, we mastered the core methods for reading and writing text files:

```python
# Read complete content
file = open("data.txt", "r")
data = file.read()
file.close()

# Write fresh content (overwrites)
file = open("data.txt", "w")
file.write("Hello Python\n")
file.close()

# Append content (preserves historical data)
file = open("data.txt", "a")
file.write("New Data\n")
file.close()
```

Today, we address two critical questions:
1. **How do we make output data look clean, aligned, and professional?**
2. **How can our scripts receive file names and parameters at startup without prompting the user?**

---

## 5. Why Do We Need Formatting?

Suppose an automated script outputs student examination marks directly to a file:
```text
Arun,85,82.6666666667
```
While a computer can parse this, it is difficult for humans to read. For formal transcripts, invoices, bills, and executive summaries, we require clean layout:

```text
Name    : Arun
Mark    : 85
Average : 82.67
```

Formatting allows software engineers to transform unpolished data into clear visual structures.

---

## 6. What is the Format Operator `%`?

Python provides the percent operator `%` for string interpolation (often called printf-style formatting).

### Fundamental Syntax:
```text
"format template" % (value_or_values)
```

```python
name = "Arun"
message = "Hello %s" % name
print(message)
```

### Console Output:
```text
Hello Arun
```

Here, `%s` acts as a placeholder that instructs Python: *"Insert a string value right here."*

---

## 7. Common Format Specifiers

| Specifier | Data Type | Description | Example | Output |
| :--- | :--- | :--- | :--- | :--- |
| `%s` | String | Formats any text value | `"Name: %s" % "Arun"` | `Name: Arun` |
| `%d` | Integer | Formats whole numbers | `"Mark: %d" % 85` | `Mark: 85` |
| `%f` | Float | Formats floating-point numbers | `"Price: %f" % 82.5` | `Price: 82.500000` |
| `%.2f` | Float (Rounded) | Formats float to 2 decimals | `"Average: %.2f" % 82.5678` | `Average: 82.57` |

### Easy Memory Tip:
```text
%s  ───► String (Text)
%d  ───► Decimal integer (Whole numbers)
%f  ───► Float (Real numbers with decimal points)
```

---

## 8. Formatting Numbers & Decimal Precision

By default, `%f` displays 6 decimal places:
```python
average = 82.5
print("Average: %f" % average)
# Output: Average: 82.500000
```

To restrict the number of decimal digits, insert a decimal point followed by the desired precision:
```python
price = 125.6789

print("%.1f" % price)  # 125.7
print("%.2f" % price)  # 125.68
print("%.3f" % price)  # 125.679
```

> [!NOTE]
> Python automatically rounds the last digit up or down when using precision specifiers like `%.2f`.

---

## 9. Supplying Multiple Values with a Tuple

When formatting multiple items, wrap the values in parentheses `(...)` as a tuple. The items must strictly match the order and type of the format specifiers:

```python
name = "Arun"
age = 20
average = 82.5678

report = "Name: %s, Age: %d, Average: %.2f" % (name, age, average)
print(report)
```

### Positional Correspondence:
```text
Template: "Name: %s, Age: %d, Average: %.2f"
                 │        │              │
Values:        ("Arun",   20,          82.5678)
```
**Output:** `Name: Arun, Age: 20, Average: 82.57`

---

## 10. Table-Like Layout & Column Widths

You can specify a minimum field width before the specifier type. Adding a minus sign (`-`) aligns the content to the left:

```python
file = open("results.txt", "w")

file.write("%-10s %-8s %-8s\n" % ("Student", "Mark", "Average"))
file.write("-" * 28 + "\n")
file.write("%-10s %-8d %-8.2f\n" % ("Arun", 85, 82.67))
file.write("%-10s %-8d %-8.2f\n" % ("Priya", 92, 91.50))
file.write("%-10s %-8d %-8.2f\n" % ("Rahul", 75, 74.25))

file.close()
```

### Generated File Content:
```text
Student    Mark     Average 
----------------------------
Arun       85       82.67   
Priya      92       91.50   
Rahul      75       74.25   
```

- `%-10s` reserves 10 spaces for the string and left-aligns it.
- `%-8d` reserves 8 spaces for the integer.
- `%-8.2f` reserves 8 spaces and rounds the float to 2 decimal places.

---

## 11. The Complete File Processing Workflow

Processing structured text files follows a standardized 8-step engineering pattern:

```text
┌──────────────┐
│  Text File   │ students.txt: "Arun,85\n"
└──────┬───────┘
       │
       ▼ open(..., "r")
┌──────────────┐
│  Read Line   │ "Arun,85\n"
└──────┬───────┘
       │
       ▼ .strip()
┌──────────────┐
│ Clean String │ "Arun,85"
└──────┬───────┘
       │
       ▼ .split(",")
┌──────────────┐
│ Token List   │ ["Arun", "85"]
└──────┬───────┘
       │
       ▼ Extract & Convert
┌──────────────┐
│ Typed Data   │ name = "Arun", mark = 85 (int)
└──────┬───────┘
       │
       ▼ Calculate & Filter
┌──────────────┐
│ Aggregation  │ total += mark, count += 1, check pass
└──────┬───────┘
       │
       ▼ Format with %
┌──────────────┐
│ Output Row   │ "Student: %-10s | Mark: %3d" % (name, mark)
└──────┬───────┘
       │
       ▼ .close()
┌──────────────┐
│ Final Report │ Printed to console or written to summary file
└──────────────┘
```

---

## 12. Practical File Processing Programs

### Program 1: Reading Numbers and Computing Average
```python
file = open("marks.txt", "r")
marks = []

for line in file:
    clean = line.strip()
    if clean:
        marks.append(int(clean))

file.close()

total = sum(marks)
average = total / len(marks)

print("Total   : %d" % total)
print("Average : %.2f" % average)
```

---

### Program 2: Pipeline from One File to Another
Read raw records from `students.txt` and generate a filtered list of only passing students in `passed.txt`:

```python
source = open("students.txt", "r")
dest = open("passed.txt", "w")

dest.write("%-10s %-5s\n" % ("Name", "Mark"))
dest.write("-" * 16 + "\n")

for line in source:
    line = line.strip()
    if not line:
        continue
    data = line.split(",")
    name = data[0]
    mark = int(data[1])
    
    if mark >= 40:
        dest.write("%-10s %-5d\n" % (name, mark))

source.close()
dest.close()

print("Filtered file 'passed.txt' generated successfully.")
```

---

## 13. Introduction to Command-Line Arguments

Up until now, our programs received user input interactively via `input()`:
```python
name = input("Enter your name: ")
```
While interactive input is suitable for desktop tools, it fails in production automation. If an operating system runs a backup script at 2:00 AM, nobody is sitting at the keyboard to type inputs.

With **Command-Line Arguments**, values are supplied to the program *at the very moment of invocation*:

```bash
python greet.py Arun
```

```text
INTERACTIVE INPUT (input()):
Program Starts ──► Program Pauses & Prompts ──► User Types Data ──► Resumes

COMMAND-LINE ARGUMENT (sys.argv):
User Runs: "python script.py data" ──► Program Starts With Data Loaded ──► Finishes
```

---

## 14. The `sys` Module & `sys.argv`

Python makes command-line arguments accessible through the `argv` list in the `sys` module.

```python
import sys

print(sys.argv)
```

If we execute:
```bash
python program.py Arun 85
```

The `sys.argv` list contains:
```python
['program.py', 'Arun', '85']
```

### The Index Anatomy of `sys.argv`:
- **`sys.argv[0]`**: Always contains the script's name (`"program.py"`).
- **`sys.argv[1]`**: The first argument supplied after the script name (`"Arun"`).
- **`sys.argv[2]`**: The second argument supplied (`"85"`).

```text
Command:  python  program.py   Arun    85
Index:               [0]        [1]    [2]
```

---

## 15. Critical Rule: Command-Line Arguments Are Strings

All items in `sys.argv` are captured as strings (`str`), even if they look like numbers.

```python
import sys

# Suppose invoked as: python add.py 10 20
a = sys.argv[1]
b = sys.argv[2]

# BUG: String concatenation occurs!
print(a + b)  # Outputs: '1020'

# CORRECTION: Explicit integer conversion
num1 = int(sys.argv[1])
num2 = int(sys.argv[2])
print("%d + %d = %d" % (num1, num2, num1 + num2))  # Outputs: '10 + 20 = 30'
```

---

## 16. Guarding Against Missing Arguments

If a script accesses `sys.argv[1]` when no argument was passed, Python crashes with an `IndexError: list index out of range`. Always inspect `len(sys.argv)`:

```python
import sys

if len(sys.argv) < 2:
    print("Usage: python script.py <target_file>")
else:
    filename = sys.argv[1]
    print("Opening file: %s" % filename)
    file = open(filename, "r")
    print(file.read())
    file.close()
```

---

## 17. Practical Command-Line File Analyzer

```python
import sys

if len(sys.argv) < 2:
    print("Error: Please provide a filename to analyze.")
    sys.exit(1)

target_filename = sys.argv[1]
file = open(target_filename, "r")

total_students = 0
passed_students = 0

for line in file:
    line = line.strip()
    if not line:
        continue
    parts = line.split(",")
    mark = int(parts[1])
    total_students += 1
    if mark >= 40:
        passed_students += 1

file.close()

print("Students : %d" % total_students)
print("Passed   : %d" % passed_students)
```

**Terminal Run:**
```bash
python analyzer.py students.txt
```

---

## 18. Common Beginner Mistakes & How to Fix Them

### Mistake 1: Format Specifier Type Mismatch
```python
# MISTAKE:
name = "Arun"
print("%d" % name)  # TypeError: %d format: a real number is required, not str

# CORRECTION:
print("%s" % name)
```

### Mistake 2: Missing Parentheses for Multiple Values
```python
# MISTAKE:
print("Name: %s, Mark: %d" % "Arun", 85)  # TypeError!

# CORRECTION: Wrap values in a tuple:
print("Name: %s, Mark: %d" % ("Arun", 85))
```

### Mistake 3: Forgetting `sys.argv[0]` is the Script Name
```python
# MISTAKE:
# Running: python app.py report.txt
target = sys.argv[0]  # This is 'app.py', NOT 'report.txt'!

# CORRECTION:
target = sys.argv[1]  # 'report.txt'
```

### Mistake 4: Unconverted Command-Line Arithmetic
```python
# MISTAKE:
# Running: python multiply.py 5
result = sys.argv[1] * 3  # Produces '555' (string repetition)

# CORRECTION:
result = int(sys.argv[1]) * 3  # Produces 15
```

---

## 19. Quick Student Workouts

1. **What is output by `print("Score: %d" % 95)`?**  
   *Answer:* `Score: 95`

2. **What does `%.2f` do when applied to `12.3456`?**  
   *Answer:* Formats it to two decimal places: `12.35`

3. **In the command `python script.py data.txt 50`, what is the value of `sys.argv[2]`?**  
   *Answer:* The string `'50'`

4. **Why does `sys.argv[1] + sys.argv[2]` concatenate instead of add?**  
   *Answer:* Because command-line arguments are always read as strings.

5. **Which specifier should you use to left-align a string in a column of 12 spaces?**  
   *Answer:* `%-12s`

---

## 20. Day 3 Moodle Coding Practice: Student File Report Generator

### Problem Statement
A file named `students.txt` contains student records in `Name,Mark` format:
```text
Arun,85
Priya,92
Rahul,35
Meena,78
```

Write a Python program that reads the file and generates a structured summary report.

### Program Requirements:
1. Open `students.txt` in read mode (`"r"`).
2. Process the file line by line using a loop.
3. Clean line endings with `.strip()` and separate fields with `.split(",")`.
4. Convert the mark to an integer (`int()`).
5. Accumulate the total number of students (`count`) and sum of marks (`total`).
6. Calculate the class average mark (`total / count`).
7. Find the highest mark and the name of the top-scoring student manually (do not use `max()`).
8. Count the number of students who passed (Pass rule: `mark >= 40`).
9. Close the file stream.
10. Display the report using the format operator `%` in this exact format:

```text
===== STUDENT REPORT =====
Students : 4
Total    : 290
Average  : 72.50
Highest  : 92
Top      : Priya
Passed   : 3
```

---

## 21. Moodle AI Agent Instruction Guide

When mentoring students through this problem:
1. **Never dump complete code solutions.** Guide them through the pipeline: Open → Clean → Tokenize → Convert → Aggregate → Format → Close.
2. Verify that they initialize all accumulator variables (`count = 0`, `total = 0`, `passed = 0`, `highest = -1`, `top_student = ""`) before the loop.
3. Ensure they convert the mark to an integer before doing mathematical operations.
4. If their average displays many trailing decimals (`72.5`), remind them that `%.2f` enforces two decimal places (`72.50`).
5. Confirm that the highest mark logic updates both the highest score and top student's name in tandem:
   ```python
   if mark > highest:
       highest = mark
       top_student = name
   ```
6. Ask them to trace edge cases: What if every student scored below 40? What if all students passed?

---

## 22. Moodle IDE Architecture for Day 3

```text
┌─────────────────────────────────────────────────────────────┐
│                 BYTELAB FILE PROCESSING LAB                 │
├──────────────────────┬──────────────────────────────────────┤
│ FILE EXPLORER        │ MONACO CODE EDITOR                   │
│                      │                                      │
│ 📄 main.py           │ 1  file = open("students.txt", "r")  │
│ 📄 students.txt      │ 2  count = 0; total = 0              │
│                      │ 3  for line in file:                 │
│                      │ 4      name, m = line.strip().split(',')
├──────────────────────┴──────────────────────────────────────┤
│ FILE VIEWER: students.txt                                   │
│ Arun,85                                                     │
│ Priya,92                                                    │
│ Rahul,35                                                    │
│ Meena,78                                                    │
├─────────────────────────────────────────────────────────────┤
│ TERMINAL OUTPUT (FORMATTED REPORT)                          │
│ ===== STUDENT REPORT =====                                  │
│ Students : 4                                                │
│ Total    : 290                                              │
│ Average  : 72.50                                            │
│ Highest  : 92                                               │
│ Top      : Priya                                            │
│ Passed   : 3                                                │
└─────────────────────────────────────────────────────────────┘
```

---

## 23. Day 3 Assessment Quiz Solutions

1. **Which symbol is used for the Python format operator?**  
   *Answer:* `%` (Option B)
2. **Which format specifier is commonly used for strings?**  
   *Answer:* `%s` (Option C)
3. **Which format specifier is commonly used for integers?**  
   *Answer:* `%d` (Option B)
4. **What does `%.2f` mean?**  
   *Answer:* Floating-point value with 2 digits after the decimal point (Option C)
5. **What is the output of `average = 82.5678; print('%.2f' % average)`?**  
   *Answer:* `82.57` (Option C)
6. **Which module is commonly used to access command-line arguments?**  
   *Answer:* `sys` (Option C)
7. **Which object stores command-line arguments?**  
   *Answer:* `sys.argv` (Option B)
8. **In `python test.py Arun`, what is `sys.argv[1]`?**  
   *Answer:* `Arun` (Option C)
9. **What type are command-line arguments stored as initially?**  
   *Answer:* String (Option C)
10. **If `python add.py 10 20` is used, how can 10 and 20 be used for arithmetic?**  
    *Answer:* Convert them using `int()` (Option B)

---

## 24. Day 3 Cheat Sheet

```python
# --- THE FORMAT OPERATOR % ---
"Hello %s" % "Arun"                        # String placeholder
"Marks: %d" % 95                           # Integer placeholder
"Average: %.2f" % 82.567                   # Float rounded to 2 decimals
"%-10s %5d" % ("Item", 42)                 # Width formatting (left/right aligned)
"Row: %s, %d, %.2f" % (name, mark, avg)    # Multiple values tuple

# --- FILE PROCESSING PIPELINE ---
file = open("data.txt", "r")
for line in file:
    clean = line.strip()                   # Strip \n
    if not clean: continue                 # Skip blanks
    parts = clean.split(",")               # Tokenize CSV
    name, score = parts[0], int(parts[1])  # Type conversion
file.close()

# --- COMMAND LINE ARGUMENTS (sys.argv) ---
import sys

script_name = sys.argv[0]                  # The script filename
first_param = sys.argv[1]                  # First parameter as a string
numeric_param = int(sys.argv[2])           # Explicit integer conversion

if len(sys.argv) < 2:
    print("Usage: python app.py <file>")
    sys.exit(1)
```

---

## 25. Final Challenge: File Report Command-Line Tool

Build a production-grade utility named `report.py`:

```bash
python report.py students.txt
```

### Program Blueprint:
```python
import sys

if len(sys.argv) < 2:
    print("Please provide a file name: python report.py <filename>")
    sys.exit(1)

filename = sys.argv[1]
file = open(filename, "r")

count = 0
total = 0
passed = 0
highest = -1
lowest = 999999

for line in file:
    line = line.strip()
    if not line:
        continue
    name, mark_str = line.split(",")
    mark = int(mark_str)
    
    count += 1
    total += mark
    if mark >= 40:
        passed += 1
    if mark > highest:
        highest = mark
    if mark < lowest:
        lowest = mark

file.close()

average = total / count if count > 0 else 0

print("=" * 32)
print("%20s" % "STUDENT REPORT")
print("=" * 32)
print("Students : %d" % count)
print("Total    : %d" % total)
print("Average  : %.2f" % average)
print("Highest  : %d" % highest)
print("Lowest   : %d" % lowest)
print("Passed   : %d" % passed)
print("=" * 32)
```

---

## 26. Day 3 Key Takeaway

> **Formatting transforms raw, chaotic data into clear, decision-ready reports. Combining the `%` format operator with line-by-line file parsing turns text files into structured information. Using `sys.argv` liberates your scripts from manual prompts, paving the way for true automated data engineering.**
