# Unit–IV — Day 2: Reading and Writing Text Files

**Duration:** 90 Minutes  
**Level:** Beginner → Intermediate  
**Unit:** Unit–IV — Files and Exceptions  
**Day:** 2 (Day 38 of 65)  

---

## 1. Day 2 Overview & Topics Covered

Today’s session expands upon the file management foundations introduced in Day 1. Students will transition from basic file opening to deep stream manipulation, discovering how to read data at different granularities (`read()`, `readline()`, `readlines()`), write single and multi-line strings, append logs cleanly without overwriting historical data, inspect and track the internal file pointer cursor, and parse comma-separated tabular records into actionable computational metrics.

### Topics Covered:
- **Reading Text Files**: Complete file ingestion with `read()`.
- **Granular Reading Methods**: Single-line extraction with `readline()` and batch line capture with `readlines()`.
- **The File Pointer**: Tracking cursor offsets and stream movement across reads.
- **Writing Character Data**: Writing strings with `write()` and formatting multi-line files using `\n`.
- **Type Coercion in File Streams**: Why numbers must be stringified using `str()` or f-strings before writing.
- **Append Mode (`"a"`) vs Write Mode (`"w"`):** Preserving historical records vs truncating files.
- **Data Cleansing & Parsing**: Removing escape delimiters with `.strip()` and tokenizing CSV records with `.split(",")`.
- **Direct File Stream Iteration**: Memory-efficient traversal using `for line in file:`.
- **Practical File Engineering**: Line counting, keyword searching, file copying, record aggregations, and top-scorer extraction.
- **Common Pitfalls**: Overwrites, missing newlines, unhandled EOF reads, and memory leakage.
- **Moodle IDE Architecture & AI Tutoring**: Live file explorer previews, state trackers, and guided debugging.
- **Hands-On Practice Arena**: The Student Marks File Analyzer.

---

## 2. Learning Objectives

By the end of this 90-minute session, students will be able to:
1. Open any text file for reading (`"r"`), writing (`"w"`), or appending (`"a"`).
2. Differentiate when to use `read()`, `readline()`, and `readlines()`.
3. Explain how the internal file pointer advances sequentially through bytes and lines.
4. Write multiple lines of formatted data to disk using newline delimiters (`\n`).
5. Explain why numeric data must be converted to strings (`str()`) before writing to text files.
6. Use append mode (`"a"`) to log transactions without deleting prior records.
7. Strip trailing newline characters cleanly using `line.strip()`.
8. Tokenize structured CSV file lines using `.split(",")`.
9. Process files efficiently using direct loop iteration (`for line in file:`).
10. Aggregate records to compute totals, manual maximums, and pass/fail thresholds.
11. Build an interactive file-based student management system.

---

## 3. 90-Minute Detailed Session Plan

| Time | Topic | Focus Activity |
| :--- | :--- | :--- |
| **0–8 min** | Day 1 Recap | File handles, open(), close(), modes (`r`, `w`, `a`, `x`) |
| **8–20 min** | Reading Complete Files | `file.read()` and bounded character reads `file.read(n)` |
| **20–32 min** | Granular Reading Methods | `readline()`, `readlines()`, and list representation of lines |
| **32–45 min** | Writing Files | `write()`, newline handling, `str()` conversion, f-strings |
| **45–55 min** | Appending Data | Mode `"a"`, preserving records vs destructive `"w"` mode |
| **55–65 min** | File Pointer Internals | Cursor progression, reading after EOF, introduction to `seek(0)` |
| **65–76 min** | Processing File Content | Direct file iteration, `.strip()`, `.split(",")`, accumulators |
| **76–82 min** | Practical Real-World Programs | Word search, line counting, file cloner, record aggregation |
| **82–87 min** | Moodle IDE Practice | Solving the *Student Marks File Analyzer* in the lab arena |
| **87–90 min** | Quiz & Day 2 Wrap-Up | Concept reinforcement and transition to Day 3 |

---

## 4. Quick Recap from Day 1

Yesterday, we established the fundamental lifecycle required for all external file operations in Python:

```text
┌─────────────────┐
│     1. OPEN     │  file = open("students.txt", "r")
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 2. READ / WRITE │  data = file.read()
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    3. CLOSE     │  file.close()
└─────────────────┘
```

### The Primary Access Modes:
- **`"r"` (Read):** Opens a file for reading. The file must already exist; otherwise, Python raises a `FileNotFoundError`.
- **`"w"` (Write):** Opens a file for writing. If the file exists, it is truncated to 0 bytes (erased). If it does not exist, a new empty file is created.
- **`"a"` (Append):** Opens a file for writing at the end of the file. Existing content is preserved.
- **`"x"` (Exclusive Creation):** Creates a new file exclusively for writing. Fails with `FileExistsError` if the file already exists.

Today, we delve into how to read varying amounts of content and process structured text on disk.

---

## 5. What is a Text File?

A **text file** is a sequence of human-readable characters encoded in standard formats such as UTF-8 or ASCII. Every line within a text file ends with an invisible line-break delimiter (`\n` on Linux/macOS, `\r\n` on Windows).

### Example: `students.txt`
```text
Arun
Priya
Rahul
Meena
```

When stored on a hard drive or SSD, the file consists of raw characters:
```text
'A', 'r', 'u', 'n', '\n', 'P', 'r', 'i', 'y', 'a', '\n', ...
```

---

## 6. Why Read Data from a File?

In earlier units, all data was provided via `input()` or hardcoded inside list variables. However, in real-world software:
- A school cannot re-type 2,000 student names each time their attendance software starts.
- An e-commerce platform cannot re-enter product inventory upon every server reboot.

```text
students.txt (Persistent Storage)
        │
        ▼ open("students.txt", "r")
  Python Program (RAM)
        │
        ▼ read() / readline()
     Process (Filter, Count, Aggregate)
        │
        ▼ print() / output
     Display to User / Save Report
```

---

## 7. Reading a Complete File with `read()`

The `.read()` method consumes the available file content from the current file position all the way to the end of the file, returning the result as a single string.

Suppose `message.txt` contains:
```text
Welcome to Python
File handling is easy
```

```python
file = open("message.txt", "r")
data = file.read()
print(data)
file.close()
```

### Console Output:
```text
Welcome to Python
File handling is easy
```

---

## 8. Bounded Reading: `read(n)`

You can optionally pass an integer argument `n` to `read(n)` to specify the maximum number of characters to read from the current position.

```python
file = open("message.txt", "r")
chunk = file.read(5)
print("First 5 characters:", chunk)

remaining = file.read()
print("Remaining text:")
print(remaining)
file.close()
```

### Console Output:
```text
First 5 characters: Welco
Remaining text:
me to Python
File handling is easy
```

> [!NOTE]
> When `read(n)` is called, Python advances the file cursor by `n` characters. Subsequent read calls resume immediately where the previous call stopped.

---

## 9. Reading One Line with `readline()`

When files are large or structured line-by-line, reading the entire file into a single string is often unnecessary. The `.readline()` method reads text up to and including the next newline (`\n`) character.

```python
file = open("students.txt", "r")

line1 = file.readline()
line2 = file.readline()

print("Line 1:", line1)
print("Line 2:", line2)

file.close()
```

### Console Output:
```text
Line 1: Arun

Line 2: Priya

```

*(Notice the empty lines between the outputs: `line1` contains `'Arun\n'`, and `print()` adds another newline by default!)*

---

## 10. Understanding the File Pointer (Cursor)

When Python opens a file, the operating system maintains a cursor offset known as the **File Pointer**.

Imagine reading a physical book with your finger marking your place:

```text
Step 0: File Opened at Byte 0
▼
A r u n \n P r i y a \n R a h u l \n

Step 1: After line1 = file.readline()
           ▼
A r u n \n P r i y a \n R a h u l \n

Step 2: After line2 = file.readline()
                       ▼
A r u n \n P r i y a \n R a h u l \n
```

> [!IMPORTANT]
> Every read operation moves the file pointer forward. If you call `.readline()` again, Python continues from the current pointer location. Once the pointer reaches End-Of-File (EOF), subsequent reads return an empty string (`""`).

---

## 11. Reading All Lines with `readlines()`

The `.readlines()` method reads all remaining lines from the current cursor position and stores each line as a distinct string element within a Python `list`.

```python
file = open("students.txt", "r")
lines = file.readlines()
file.close()

print(lines)
```

### Console Output:
```python
['Arun\n', 'Priya\n', 'Rahul\n', 'Meena\n']
```

### Why Does `\n` Appear?
Each line in a text file terminates with a line break character. When Python represents strings inside a list container, it shows the raw escape character `\n` to indicate that a line break was stored at that position.

---

## 12. Master Comparison: `read()` vs `readline()` vs `readlines()`

| Method | Return Type | Data Retrieved | Recommended Use Case |
| :--- | :--- | :--- | :--- |
| `file.read()` | `str` | Entire remaining file as a single string | Small files, full-text search, whole document inspection |
| `file.readline()` | `str` | Exactly one line (including `\n`) | Processing headers, interactive line-by-line input |
| `file.readlines()` | `list[str]` | All remaining lines as a list of strings | Indexing lines by line number (`lines[0]`), batch processing |
| `for line in file:` | Generator iterator | One line at a time in memory | Large files, streaming data, production pipelines |

### Visual Memory Trick:
```text
read()      ───► ALL (One giant string)
readline()  ───► ONE (A single line)
readlines() ───► LIST (A list of individual lines)
```

---

## 13. Writing Text with `write()`

The `.write()` method takes a string argument and writes it into the file. Unlike `print()`, the `.write()` method **never** adds an automatic newline!

```python
file = open("message.txt", "w")
file.write("Hello Python")
file.close()
```

### Writing Multiple Lines:
To ensure each record appears on its own line, you must explicitly include `\n`:

```python
file = open("students.txt", "w")
file.write("Arun\n")
file.write("Priya\n")
file.write("Rahul\n")
file.close()
```

Alternatively, write a single multi-line string:
```python
file = open("students.txt", "w")
file.write("Arun\nPriya\nRahul\n")
file.close()
```

---

## 14. Writing Variables & Type Conversion

The `.write()` method requires a string argument. Passing integers, floats, or lists directly will cause a `TypeError`:

```python
mark = 85
file = open("student.txt", "w")

# INVALID:
# file.write(mark)  <-- Raises TypeError: write() argument must be str, not int

# VALID (String Concatenation):
file.write("Mark: " + str(mark) + "\n")

# PREFERRED (f-string interpolation):
name = "Arun"
file.write(f"Name: {name}\n")
file.write(f"Mark: {mark}\n")

file.close()
```

---

## 15. The Danger of Overwriting: Mode `"w"` vs Mode `"a"`

Understanding when to use `"w"` versus `"a"` is critical for data safety:

### The Behavior of `"w"` (Destructive Write):
```python
# Suppose students.txt contains: Arun, Priya, Rahul

file = open("students.txt", "w")
file.write("Meena\n")
file.close()

# The file now contains ONLY:
# Meena
```
> [!WARNING]
> Opening an existing file in `"w"` mode truncates the file immediately. All prior records are permanently lost!

### The Behavior of `"a"` (Non-Destructive Append):
```python
# Suppose students.txt contains: Arun, Priya, Rahul

file = open("students.txt", "a")
file.write("Meena\n")
file.close()

# The file now contains:
# Arun
# Priya
# Rahul
# Meena
```

### Summary Comparison:
```text
           Existing File
                 │
      ┌──────────┴──────────┐
      ▼                     ▼
  Mode "w"              Mode "a"
      │                     │
 Erase old contents    Preserve old contents
 Write fresh from 0    Append new data at EOF
```

---

## 16. Processing File Content: `strip()` and `split()`

Reading text from disk is only the first step. To make data usable in business logic, we must clean and tokenize strings.

### Removing Delimiters with `.strip()`
When reading lines, each string retains its trailing `\n`. Calling `.strip()` strips away leading and trailing whitespace and line breaks:

```python
raw_line = "Arun\n"
clean_line = raw_line.strip()
print(clean_line)  # 'Arun' (no extra whitespace or line breaks)
```

### Tokenizing Structured Lines with `.split(",")`
Suppose records are formatted as Comma-Separated Values (CSV):
```text
Arun,85
Priya,92
Rahul,35
Meena,78
```

```python
file = open("students.txt", "r")

for line in file:
    clean_line = line.strip()
    tokens = clean_line.split(",")
    name = tokens[0]
    mark = int(tokens[1])
    print(f"Student: {name:<10} | Score: {mark:>3}")

file.close()
```

### Console Output:
```text
Student: Arun       | Score:  85
Student: Priya      | Score:  92
Student: Rahul      | Score:  35
Student: Meena      | Score:  78
```

---

## 17. Practical File Engineering Programs

### Program 1: Counting Lines in a File
```python
file = open("students.txt", "r")
lines = file.readlines()
file.close()

print("Total students registered:", len(lines))
```

---

### Program 2: Searching for a Record
```python
target = input("Enter student name to locate: ").strip()

file = open("students.txt", "r")
found = False

for line in file:
    name = line.strip().split(",")[0]
    if name.lower() == target.lower():
        found = True
        break

file.close()

if found:
    print(f"Record found for: {target}")
else:
    print(f"No record found for: {target}")
```

---

### Program 3: Word Frequency Counter
```python
file = open("notes.txt", "r")
text = file.read()
file.close()

keyword = "Python"
count = text.count(keyword)
print(f"The keyword '{keyword}' appears {count} times.")
```

---

### Program 4: Safe File Cloner (Backup Generator)
```python
source = open("students.txt", "r")
content = source.read()
source.close()

backup = open("students_backup.txt", "w")
backup.write(content)
backup.close()

print("File successfully backed up to students_backup.txt")
```

---

### Program 5: Manual Maximum Finder & Pass Rate Calculator
```python
file = open("students.txt", "r")

highest_mark = -1
top_student = ""
passed_count = 0
total_students = 0

for line in file:
    line = line.strip()
    if not line:
        continue
    parts = line.split(",")
    name = parts[0]
    mark = int(parts[1])
    
    total_students += 1
    if mark >= 40:
        passed_count += 1
    if mark > highest_mark:
        highest_mark = mark
        top_student = name

file.close()

print(f"Total Students : {total_students}")
print(f"Passed Students: {passed_count}")
print(f"Highest Mark   : {highest_mark}")
print(f"Top Student    : {top_student}")
```

---

## 18. File Cursor Control: Introduction to `seek()`

When a program completes reading a file, the cursor sits at the very end. Calling `.read()` again returns an empty string. To reread the file without closing and reopening it, use `.seek(offset)`:

```python
file = open("students.txt", "r")

# First read: consumes entire file
print("--- FIRST PASS ---")
print(file.read())

# Second read without seeking: returns nothing!
print("--- SECOND PASS (Unseeked) ---")
print(file.read())  # prints ''

# Reset pointer back to the beginning (byte 0)
file.seek(0)

# Third read: reads the entire file again!
print("--- THIRD PASS (Seeked to 0) ---")
print(file.read())

file.close()
```

---

## 19. Common Beginner Mistakes & How to Fix Them

### Mistake 1: Accidental File Obliteration
```python
# MISTAKE:
file = open("records.txt", "w")  # Overwrites existing records!
file.write("New Entry\n")

# CORRECTION:
file = open("records.txt", "a")  # Appends new entry at the bottom!
file.write("New Entry\n")
```

### Mistake 2: Missing `\n` in Consecutive Writes
```python
# MISTAKE:
file.write("Arun")
file.write("Priya")
# Output in file: ArunPriya

# CORRECTION:
file.write("Arun\n")
file.write("Priya\n")
# Output in file:
# Arun
# Priya
```

### Mistake 3: Writing Integers Directly
```python
# MISTAKE:
total = 100
file.write(total)  # Raises TypeError!

# CORRECTION:
file.write(str(total) + "\n")
# or:
file.write(f"{total}\n")
```

### Mistake 4: Printing `readlines()` Directly
```python
# MISTAKE:
print(file.readlines())
# Displays: ['Arun\n', 'Priya\n']

# CORRECTION:
for line in file:
    print(line.strip())
# Displays:
# Arun
# Priya
```

---

## 20. Quick Student Workouts

1. **Which method reads the entire remaining content of a file as a single string?**  
   *Answer:* `file.read()`

2. **Which method returns a single line including its terminating newline character?**  
   *Answer:* `file.readline()`

3. **Which method returns all lines packaged inside a Python list?**  
   *Answer:* `file.readlines()`

4. **What mode should be used to log transactions without deleting prior history?**  
   *Answer:* Append mode (`"a"`).

5. **What is printed by `print("Python\n".strip())`?**  
   *Answer:* `Python` (with no extra newline).

---

## 21. Day 2 Moodle Coding Practice: Student Marks File Analyzer

### Problem Statement
A text file named `students.txt` contains student records in the following format:
```text
Arun,85
Priya,92
Rahul,35
Meena,78
```

Write a Python program that:
1. Opens `students.txt` in read mode (`"r"`).
2. Reads the file line by line using a loop.
3. Cleans whitespace and newlines using `.strip()` and tokenizes fields with `.split(",")`.
4. Counts the total number of students.
5. Calculates the highest mark without using the built-in `max()` function.
6. Identifies the name of the student who attained the highest mark.
7. Counts the number of students who passed (Pass condition: `mark >= 40`).
8. Closes the file cleanly.
9. Displays the output in this exact four-line format:

```text
Number of Students: 4
Highest Mark: 92
Top Student: Priya
Passed Students: 3
```

---

## 22. Moodle AI Agent Instruction Guide

When tutoring students on this problem, adhere to these pedagogy guidelines:
1. **Never hand out complete code snippets.** Ask the student to describe the format of `students.txt` first.
2. Guide them to recognize that each line contains `name,mark`.
3. Prompt them to choose the correct read mode (`"r"`).
4. Emphasize why direct file iteration (`for line in file:`) is superior to loading everything into memory.
5. Ask them why `.strip()` is required before `.split(",")`.
6. Clarify index positions: `tokens[0]` is the student name, `tokens[1]` is the mark string.
7. Ask what will happen if they compare strings: `'9'` vs `'100'`. Guide them to convert the mark to an integer (`int(tokens[1])`).
8. Prompt them to declare accumulator variables (`highest_mark = -1`, `top_student = ""`, `total = 0`, `passed = 0`) before the loop.
9. Verify that `.close()` is called outside the loop.

---

## 23. Moodle IDE Architecture for Day 2

```text
┌────────────────────────────────────────────────────────────┐
│                  BYTELAB FILE HANDLING LAB                 │
├─────────────────────┬──────────────────────────────────────┤
│ FILE EXPLORER       │ MONACO CODE EDITOR                   │
│                     │                                      │
│ 📄 main.py          │ 1  file = open("students.txt", "r")  │
│ 📄 students.txt     │ 2  highest = -1                      │
│                     │ 3  top_name = ""                     │
│                     │ 4  for line in file:                 │
│                     │ 5      parts = line.strip().split(",")│
├─────────────────────┴──────────────────────────────────────┤
│ FILE VIEWER: students.txt                                  │
│ Arun,85                                                    │
│ Priya,92                                                   │
│ Rahul,35                                                   │
│ Meena,78                                                   │
├────────────────────────────────────────────────────────────┤
│ TERMINAL / TEST RUNNER                                     │
│ [▶ Run Code]  [⟳ Reset File]  [Submit Assessment]          │
│ Output:                                                    │
│ Number of Students: 4                                      │
│ Highest Mark: 92                                           │
│ Top Student: Priya                                         │
│ Passed Students: 3                                         │
└────────────────────────────────────────────────────────────┘
```

---

## 24. Day 2 Assessment Quiz Solutions

1. **Which method reads the complete remaining file content?**  
   *Answer:* `read()` (Option A)
2. **Which method reads one line from a file?**  
   *Answer:* `readline()` (Option B)
3. **What does `readlines()` return?**  
   *Answer:* A list of lines (Option C)
4. **Which method writes text into a file?**  
   *Answer:* `write()` (Option A)
5. **Which mode should be used to add new content without replacing existing content?**  
   *Answer:* `a` (Option C)
6. **What happens when a file is opened using `"w"` and the file already exists?**  
   *Answer:* Existing content is overwritten / replaced (Option A)
7. **What does `\n` represent?**  
   *Answer:* New line (Option B)
8. **If `data.txt` contains `Python`, `Java`, `C`, what does `file.readline()` output on the first call?**  
   *Answer:* `Python` (Option A)
9. **What does `strip()` commonly help remove from a line read from a text file?**  
   *Answer:* Surrounding whitespace and the terminating newline `\n` (Option B)
10. **Why might we use `for line in file:`?**  
    *Answer:* To process the file line-by-line efficiently (Option A)

---

## 25. Day 2 Cheat Sheet

```python
# --- OPENING & CLOSING ---
f = open("data.txt", "r")       # Open for reading
f = open("data.txt", "w")       # Open for writing (truncates!)
f = open("data.txt", "a")       # Open for appending
f.close()                       # Flushes buffer and releases OS descriptor

# --- READING PATTERNS ---
text = f.read()                 # Read everything as one string
chunk = f.read(10)              # Read up to 10 characters
one_line = f.readline()         # Read one single line
all_lines = f.readlines()       # Read all lines into a list of strings

# --- WRITING PATTERNS ---
f.write("Line 1\n")             # Must include \n manually
f.write(f"Count: {total}\n")    # Must convert numbers to str or use f-strings

# --- PROCESSING PATTERNS ---
for line in f:                  # Stream line-by-line (low memory)
    clean = line.strip()        # Strip trailing \n
    parts = clean.split(",")    # Split CSV fields
    name = parts[0]
    score = int(parts[1])       # Convert numeric token to int

# --- CURSOR CONTROL ---
f.seek(0)                       # Rewind file pointer back to byte 0
```

---

## 26. Final Challenge: File-Based Student Record System

Synthesize today's concepts by creating a complete command-line management system:

```text
================================
      STUDENT FILE SYSTEM
================================
1. Add Student
2. View All Students
3. Search Student by Name
4. Count Total Records
5. Exit
```

### Suggested Modular Structure:
```python
def add_student():
    name = input("Enter name: ").strip()
    mark = input("Enter mark: ").strip()
    file = open("students.txt", "a")
    file.write(f"{name},{mark}\n")
    file.close()
    print("Student added successfully.")

def view_students():
    file = open("students.txt", "r")
    for line in file:
        name, mark = line.strip().split(",")
        print(f"Name: {name:<10} | Mark: {mark}")
    file.close()

def search_student():
    target = input("Enter student name: ").strip().lower()
    file = open("students.txt", "r")
    found = False
    for line in file:
        name, mark = line.strip().split(",")
        if name.lower() == target:
            print(f"Found: {name} with Mark: {mark}")
            found = True
            break
    file.close()
    if not found:
        print("Student not found.")

def count_students():
    file = open("students.txt", "r")
    count = sum(1 for line in file if line.strip())
    file.close()
    print(f"Total Students: {count}")
```

---

## 27. Day 2 Key Takeaway

> **Reading a file pulls persistent data from secondary storage into RAM. Writing writes data into persistent storage, and appending safely attaches new entries without destroying history. Clean with `.strip()`, divide with `.split()`, stream with `for line in file:`, and always remember to `.close()` your streams.**
