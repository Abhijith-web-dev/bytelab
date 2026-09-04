# Unit–IV — Day 1: Files and Exceptions — Introduction to File Handling

> **Duration:** 90 Minutes  
> **Level:** Beginner  
> **Unit:** IV – Files, Modules, Packages  
> **Day:** 1 (Day 37 of Full Curriculum)  
> **Topics Covered:** Introduction to Files; Why File Handling is Needed; Types of Files (Text & Binary); File Paths (Relative & Absolute); File Modes (`r`, `w`, `a`, `x`); Opening Files (`open()`); Closing Files (`close()`); Reading and Writing Basics; File Handling Workflow; Common File Errors; Moodle IDE Idea for File Handling; Practice Programs; AI Agent Guidance; Quiz; Cheat Sheet; Final Challenge.

---

## 1. Learning Objectives

By the end of this session, students should be able to:

1. **Explain what a file is** and why persistent storage is vital in computing.
2. **Understand why programs need files** instead of relying solely on volatile memory.
3. **Differentiate between files and variables** in terms of lifetime, speed, and location.
4. **Identify common types of files** and explain the difference between text files and binary files.
5. **Understand text files**, character encodings, and common text extensions (`.txt`, `.csv`, `.json`, `.py`).
6. **Understand file extensions** and how operating systems associate formats.
7. **Understand file paths**, differentiating between relative paths (`open("student.txt")`) and absolute paths (`C:\Users\...`).
8. **Explain file modes** in Python: `"r"` (read), `"w"` (write/truncate), `"a"` (append), and `"x"` (exclusive creation).
9. **Open a file using the `open()` built-in function** with proper mode specification.
10. **Close a file using the `close()` method** to flush buffers and release OS file descriptors.
11. **Understand the core file-handling workflow**: Open ➔ Perform Operations (Read/Write/Append) ➔ Close.
12. **Write simple, robust Python programs** to create, write, and read text files.
13. **Identify and troubleshoot common beginner mistakes** (`FileNotFoundError`, forgetting `close()`, accidental truncation with `"w"`, writing integers without `str()`).
14. **Use a browser-based Moodle IDE** to practice file handling safely within an isolated workspace.

---

## 2. 90-Minute Session Plan

| Time | Topic | Activity |
|---|---|---|
| **0–8 min** | **Introduction** | Why programs need files; the volatility problem. |
| **8–18 min** | **Files vs Variables** | Volatile RAM vs persistent disk storage. |
| **18–30 min** | **Types of Files** | Text files vs binary files: structure and differences. |
| **30–42 min** | **Text Files** | Character representation, extensions, and inspection. |
| **42–55 min** | **File Paths** | Relative paths vs absolute paths; portability rules. |
| **55–68 min** | **File Modes** | Deep dive into `"r"`, `"w"`, `"a"`, and `"x"`. |
| **68–76 min** | **Opening & Closing** | Syntax and semantics of `open()` and `close()`. |
| **76–82 min** | **First File Program** | Writing and reading `welcome.txt` and `student.txt`. |
| **82–87 min** | **Moodle Practice** | Solving the *"Student File Saver"* problem. |
| **87–90 min** | **Quiz & Recap** | 10-question assessment and key concept consolidation. |

---

## 3. Real-World Motivation: What Happens When a Program Ends?

Consider this simple program:

```python
name = "Arun"
mark = 85
```

While the Python interpreter is running, the variables `name` and `mark` reside in the computer's **RAM (Random Access Memory)**. 

However, RAM is **volatile**. The moment your program terminates, the Python process exits, or the computer shuts down, **all variable data vanishes completely**.

Now imagine a college student registration system:

```text
Today:
  Arun  → 85
  Priya → 90
  Rahul → 75
```

Tomorrow, when the professor boots their computer and runs the program again, we do not want to manually re-enter hundreds of records from scratch. 

We require persistent storage:

```text
Program Execution
       ↓
Save Student Data
       ↓
File on Disk (students.txt)
       ↓
Program Ends (Computer Turned Off)
       ↓
Next Day: Program Runs Again
       ↓
Read Saved Data from File
```

This fundamental requirement is why **file handling** is one of the most critical topics in software engineering.

---

## 4. What is a File?

A **file** is a named, contiguous collection of bytes stored on a secondary storage device (such as a Solid State Drive, Hard Disk, or USB flash drive).

### Common Examples
- `student.txt` (Student records)
- `marks.csv` (Spreadsheet of academic marks)
- `employees.json` (Structured enterprise data)
- `config.txt` (System configurations)
- `report.pdf` (Formatted printable document)
- `photo.jpg` (Compressed image)
- `video.mp4` (Multimedia stream)

> [!NOTE]
> **Key Concept:**  
> - **Variable:** Temporary program memory (erased on program exit).  
> - **File:** Persistent storage (remains available for days, months, or years).

---

## 5. Variable vs. File Comparison

| Dimension | Variable | File |
|---|---|---|
| **Location** | RAM (Primary Volatile Memory) | Disk / SSD (Secondary Persistent Storage) |
| **Lifespan** | Exists only while the program runs | Persists indefinitely until explicitly deleted |
| **Access Speed** | Nanoseconds (extremely fast) | Microseconds to Milliseconds (requires I/O operations) |
| **Persistence** | Lost immediately on program termination | Can be opened, read, and modified anytime |
| **Syntax Example** | `name = "Arun"` | `file = open("student.txt", "w")` |

**Memory Trick:**  
- **Variable** = Active mental memory.  
- **File** = Notes written in a permanent notebook.

---

## 6. Why Do We Need File Handling?

File handling allows a Python program to perform real-world operational tasks:

1. **Save User Information:** Store login credentials, profiles, and settings.
2. **Persist Academic Records:** Save marks, grades, attendance, and transcripts.
3. **Generate Reports:** Export analytical data as readable summary text.
4. **Maintain Application Logs:** Keep a historical audit trail of errors and user actions.
5. **Read Configurations:** Load database URLs and operational flags without modifying source code.
6. **Inter-System Data Exchange:** Share data between Python and external tools (Excel, SQL databases, web servers).

---

## 7. What is File Handling?

File handling means using programming constructs to manipulate files on disk. The standard operations include:

- **Create:** Allocate a new file on the filesystem.
- **Open:** Establish an active I/O connection stream between Python and the file.
- **Read:** Retrieve text or binary bytes into Python variables.
- **Write:** Store text or binary data from Python variables into the file.
- **Append:** Add new data to the end of an existing file without modifying old data.
- **Close:** Terminate the connection, flush temporary operating system buffers, and unlock the file.

Today's session focuses on the essential quartet: **Open**, **File Modes**, **Read / Write Basics**, and **Close**.

---

## 8. Types of Files

In operating systems and programming languages, files are classified into two broad categories:

```text
               Files
                 │
        ┌────────┴────────┐
        ↓                 ↓
   Text Files        Binary Files
  (.txt, .csv)      (.jpg, .pdf)
```

---

## 9. Text Files

A **text file** stores data as a sequence of human-readable characters encoded using character standards such as **ASCII** or **UTF-8**.

- **Structure:** Divided into lines, each ending with a newline character (`\n` on Unix/macOS, `\r\n` on Windows).
- **Inspection:** Can be directly opened, read, and edited in any basic text editor (Notepad, VS Code, TextEdit).
- **Common Extensions:** `.txt`, `.csv`, `.py`, `.json`, `.html`, `.log`.

### Example Content of `student.txt`
```text
Arun
20
85
```

---

## 10. Binary Files

A **binary file** stores raw bytes (`0`s and `1`s) representing non-character data such as compiled bytecode, compressed graphics, or audio waveforms.

- **Structure:** Optimized for machine execution or specific software decoders; not divided into clean text lines.
- **Inspection:** If opened in a regular text editor, it displays unreadable gibberish characters and symbols.
- **Common Extensions:** `.jpg`, `.png`, `.mp3`, `.mp4`, `.pdf`, `.exe`, `.pyc`.

### Text File vs. Binary File Comparison

| Feature | Text File | Binary File |
|---|---|---|
| **Data Format** | Encoded characters (ASCII / UTF-8) | Raw bytes (`0x00` – `0xFF`) |
| **Human Readable?** | Yes, readable in any text editor | No, requires specialized software decoder |
| **Line Delimiters** | Separated by `\n` or `\r\n` | Continuous binary byte stream |
| **Typical Extensions** | `.txt`, `.csv`, `.log`, `.py` | `.jpg`, `.mp3`, `.pdf`, `.bin` |

*In this session, we work exclusively with text files.*

---

## 11. Real-World Text File Example: Attendance System

Imagine a university attendance tracker:

File: `attendance.txt`
```text
Arun - Present
Priya - Present
Rahul - Absent
Meena - Present
```

A Python script can:
1. Open `attendance.txt`.
2. Read the lines one by one.
3. Compute total students present vs. absent.
4. Output a summary report.

---

## 12. File Extensions

A **file extension** is the suffix separated by a dot (`.`) at the end of a filename that hints at the encoding format:

```text
student.txt
  │      │
  │      └── Extension (.txt = plain text)
  └───────── Base name
```

| Extension | Meaning | Format |
|---|---|---|
| `.txt` | Plain text | Character text |
| `.csv` | Comma-Separated Values | Tabular character data |
| `.py` | Python source code | Plain text script |
| `.json` | JavaScript Object Notation | Structured text dictionary |
| `.log` | Event log file | Chronological text entries |

---

## 13. File Paths: Relative vs. Absolute

A **file path** specifies the directory location of a file within the operating system's filesystem hierarchy.

```text
               Filesystem Paths
                      │
          ┌───────────┴───────────┐
          ↓                       ↓
    Relative Path           Absolute Path
  ("student.txt")       ("C:\Users\...\file.txt")
```

### 1. Relative Path
Describes the location of a file **relative to the current working directory** of the running Python script:

```python
file = open("student.txt", "r")
```
Python searches for `student.txt` in the folder where the script was launched.  
*Recommendation:* Always use relative paths for portable, beginner-friendly code and web LMS sandboxes!

### 2. Absolute Path
Specifies the complete, unambiguous location starting from the root of the filesystem:

- **Windows:** `C:\Users\Student\Documents\student.txt`
- **Linux / macOS:** `/home/student/documents/student.txt`

---

## 14. The `open()` Function

Python provides the built-in function `open()` to initiate file communication.

### Syntax
```python
file_object = open(filename, mode)
```

- **`filename`** *(str)*: A string representing the name or path of the target file (e.g., `"student.txt"`).
- **`mode`** *(str)*: A string specifying the purpose of opening the file (e.g., `"r"`, `"w"`, `"a"`, `"x"`).

### Example
```python
file = open("student.txt", "r")
```

Here:
- `"student.txt"` is the target file.
- `"r"` specifies read-only mode.
- `file` is the resulting **file object** (stream handle).

---

## 15. The Standard File Handling Workflow

Always adhere to the three-phase lifecycle:

```text
┌───────────────────────────────┐
│           1. OPEN             │  Establish stream handle: open("data.txt", "r")
└───────────────┬───────────────┘
                │
                ↓
┌───────────────────────────────┐
│     2. PERFORM OPERATIONS     │  Read, write, or append data
└───────────────┬───────────────┘
                │
                ↓
┌───────────────────────────────┐
│          3. CLOSE             │  Release resources & flush: file.close()
└───────────────────────────────┘
```

---

## 16. Deep Dive into File Modes: `"r"`, `"w"`, `"a"`, `"x"`

| Mode | Operation | If File Exists | If File Does Not Exist |
|:---:|---|---|---|
| **`"r"`** | **Read** | Opens file positioned at the beginning. | **Raises `FileNotFoundError`** |
| **`"w"`** | **Write** | **Truncates (erases)** all previous contents! | **Creates** a brand new file. |
| **`"a"`** | **Append** | Preserves existing data; writes to the end. | **Creates** a brand new file. |
| **`"x"`** | **Exclusive Create** | **Raises `FileExistsError`** to prevent overwriting. | **Creates** a brand new file. |

### Memory Trick
- **`r`** ➔ **R**ead existing data
- **`w`** ➔ **W**rite and overwrite
- **`a`** ➔ **A**dd to the end
- **`x`** ➔ e**X**clusive creation

> [!CAUTION]
> **Why `"w"` Requires Extreme Care:**  
> If `student.txt` already holds 1,000 student records, calling `open("student.txt", "w")` will **immediately erase all 1,000 records**, leaving the file completely empty before you even call `write()`! If your intention is to add new entries, always use `"a"`!

---

## 17. Reading Files with `file.read()`

When opened in `"r"` mode, the `read()` method returns the entire contents of the file as a single Python string:

```python
file = open("student.txt", "r")
data = file.read()
print(data)
file.close()
```

---

## 18. Writing Files with `file.write()`

When opened in `"w"` or `"a"` mode, the `write(string)` method appends the given string to the file stream:

```python
file = open("message.txt", "w")
file.write("Hello Python!\n")
file.write("Welcome to ByteLab.\n")
file.close()
```

> [!IMPORTANT]
> Unlike `print()`, `file.write()` **does NOT automatically insert a newline**. You must explicitly add `\n` whenever you want a line break!

---

## 19. Why You MUST Close Files with `file.close()`

Failing to close files can cause subtle and severe bugs:

1. **Flushing the Write Buffer:** Operating systems do not write small chunks of data to physical disk immediately. They store them in memory buffers. Calling `file.close()` forces the buffer to flush and commit to disk.
2. **Releasing Operating System Resources:** Operating systems restrict the number of open file descriptors an application may hold. Leaking open handles can cause system crashes.
3. **Unlocking Files:** In operating systems like Windows, an open file is locked against modification or deletion by other programs.

---

## 20. Code Walkthrough: Complete Read, Write, and Append

### Step 1: Create and Write
```python
# Open for writing (creates file or overwrites)
file = open("students.txt", "w")
file.write("Arun\n")
file.write("Priya\n")
file.write("Rahul\n")
file.close()
print("Three students written successfully.")
```

### Step 2: Append a Record
```python
# Open for appending (adds to end)
file = open("students.txt", "a")
file.write("Meena\n")
file.close()
print("Meena appended successfully.")
```

### Step 3: Read and Display
```python
# Open for reading
file = open("students.txt", "r")
content = file.read()
print("\nCurrent Student Roster:")
print(content)
file.close()
```

**Console Output:**
```text
Three students written successfully.
Meena appended successfully.

Current Student Roster:
Arun
Priya
Rahul
Meena
```

---

## 21. Real-World Interactive Example: Saving Student Records

```python
# Collect data from user input
name = input("Enter student name: ")
age = input("Enter age: ")
mark = input("Enter mark: ")

# Open file in write mode
file = open("student.txt", "w")

# Write formatted lines
file.write("Name: " + name + "\n")
file.write("Age: " + age + "\n")
file.write("Mark: " + mark + "\n")

# Always close
file.close()

print("Student details saved successfully")
```

### Important Rule: `write()` Requires Strings
If you convert numbers to integers:
```python
mark = 85
# file.write(mark)  <-- TypeError: write() argument must be str, not int
file.write(str(mark) + "\n")  # Correct!
```

---

## 22. Common Beginner Mistakes & How to Fix Them

### Mistake 1: Forgetting to Call `close()`
```python
# BAD: File remains uncommitted in OS buffer
file = open("data.txt", "w")
file.write("Important record")
# Missing file.close()

# GOOD:
file.close()
```

### Mistake 2: Reading a Non-Existent File with `"r"`
```python
# BAD: If missing.txt doesn't exist, causes FileNotFoundError
file = open("missing.txt", "r")
```
*Fix:* Ensure the file has been created first or verify the exact filename.

### Mistake 3: Accidentally Using `"w"` Instead of `"a"`
```python
# BAD: Overwrites previous log entries!
file = open("activity.log", "w")
file.write("User logged in\n")
file.close()

# GOOD:
file = open("activity.log", "a")
file.write("User logged in\n")
file.close()
```

### Mistake 4: Writing Non-String Data Types
```python
# BAD:
age = 20
file.write(age)  # TypeError!

# GOOD:
file.write(str(age) + "\n")
```

### Mistake 5: Case Sensitivity in Filenames
Opening `"Student.txt"` on Linux/macOS when the actual file is `"student.txt"` raises `FileNotFoundError`. Always match casing accurately.

---

## 23. Moodle & Browser IDE Architecture for File Handling

In the **ByteLab LMS**, file handling is powered by an in-memory **WebAssembly Virtual Filesystem (Pyodide FS)**:

```text
┌────────────────────────────────────────────────────────┐
│                   BYTELAB FILE LAB                     │
├─────────────────────┬──────────────────────────────────┤
│ Virtual Filesystem  │ Python Editor (Monaco)           │
│                     │                                  │
│ 📁 workspace        │ 1  name = input()                │
│   📄 main.py        │ 2  file = open("student.txt","w")│
│   📄 student.txt    │ 3  file.write(f"Name: {name}\\n") │
│                     │ 4  file.close()                  │
├─────────────────────┴──────────────────────────────────┤
│ Terminal Console Output                                │
│                                                        │
│ Student details saved successfully                     │
└────────────────────────────────────────────────────────┘
```

1. **Virtual Filesystem:** Files created via `open("student.txt", "w")` exist in browser worker memory.
2. **Isolation:** Completely sandboxed; cannot touch your local hard drive or server files.
3. **Immediate Verification:** After calling `file.close()`, reading `open("student.txt", "r")` instantly verifies the file's contents!

---

## 24. Quick Student Workouts

1. **Workout 1:** What does `open("grades.txt", "r")` do?  
   *Answer:* Opens `grades.txt` for reading only. Raises `FileNotFoundError` if the file doesn't exist.
2. **Workout 2:** What does `open("backup.txt", "w")` do if `backup.txt` already exists?  
   *Answer:* Truncates (deletes) all existing data in `backup.txt` and starts with an empty file.
3. **Workout 3:** Which file mode allows you to append logs to the end of an existing file?  
   *Answer:* `"a"` (Append mode).
4. **Workout 4:** What exception is raised when opening a non-existent file in `"r"` mode?  
   *Answer:* `FileNotFoundError`.
5. **Workout 5:** What exception is raised when opening an existing file in `"x"` mode?  
   *Answer:* `FileExistsError`.
6. **Workout 6:** Why must `file.close()` be invoked after file operations?  
   *Answer:* To flush write buffers to disk, release OS file descriptor locks, and free memory resources.

---

## 25. Day 1 Cheat Sheet

```python
# 1. Open for Writing (Overwrites/Creates)
file = open("data.txt", "w")
file.write("Hello World\n")
file.close()

# 2. Open for Reading (File must exist)
file = open("data.txt", "r")
content = file.read()
print(content)
file.close()

# 3. Open for Appending (Adds to end/Creates)
file = open("data.txt", "a")
file.write("New Line Added\n")
file.close()

# 4. Mode Summary Table
# "r" -> Read only (File must exist)
# "w" -> Write only (Erases existing content)
# "a" -> Append only (Adds to end)
# "x" -> Exclusive create (Fails if file already exists)
```

---

## 26. Final Challenge: File-Based Student Notebook

Build an interactive menu-driven console application:

```text
==============================
      STUDENT NOTEBOOK
==============================
1. Add Student (Overwrite File)
2. View Student File
3. Append Another Student
4. Exit
```

- **Option 1:** Read name, age, mark. Open `students.txt` in `"w"` mode, write the record, and close.
- **Option 2:** Open `students.txt` in `"r"` mode, read all records, display them, and close.
- **Option 3:** Read a new student name. Open `students.txt` in `"a"` mode, append the name with `\n`, and close.
- **Option 4:** Terminate the loop using `break`.

This combines **menus**, **`if/elif/else`**, **loops**, and **file modes** into a unified real-world software tool!
