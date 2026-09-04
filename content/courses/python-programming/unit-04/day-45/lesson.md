# Unit–IV — Day 9: File Processing, Modules, Exceptions, Classes and Objects

**Duration:** 90 Minutes  
**Level:** Beginner → Intermediate  
**Unit:** IV – Files, Exceptions, Modules, Packages & OOP Introduction  
**Day:** 9 (Course Day 45)

---

## 1. Session Overview & Pedagogical Goals
Welcome to the crowning capstone session of Unit IV! Over the preceding eight days, you developed essential software engineering foundations:
1. Opening, reading, writing, and closing text files with proper file modes (`r`, `w`, `a`, `x`).
2. String formatting techniques and parsing command-line arguments via `sys.argv`.
3. Defensively trapping runtime faults with `try`, `except`, `else`, `finally`, and `raise`.
4. Decomposing complex codebases into reusable single-file **modules** and multi-file hierarchical **packages**.

Today, we bring all of these disparate threads together to solve real-world file manipulation problems. More importantly, we take our first monumental step into **Object-Oriented Programming (OOP)** by discovering **Classes** and **Objects**—the architectural foundation that allows programs to represent real-world entities directly in code.

---

## 2. Practical File Processing: The Word Count Program

A classic benchmark in data processing is computing statistics on textual files: counting total characters, words, and lines (akin to the UNIX `wc` command).

### 2.1 The Word Count Logic
To count words accurately:
1. Open the file in read mode (`'r'`).
2. Read the entire text stream or iterate line by line.
3. Split the text into individual words using `.split()`, which conveniently groups text by arbitrary whitespace (spaces, tabs, newlines) and drops empty tokens.
4. Use `len()` on the resulting list to determine the total word count.

```python
def count_file_words(filename):
    """Counts total words, lines, and characters in a file."""
    try:
        with open(filename, "r") as file:
            content = file.read()
            
            # Lines can be derived via splitlines() or counting '\n'
            lines = content.splitlines()
            words = content.split()
            chars = len(content)
            
            return {
                "lines": len(lines),
                "words": len(words),
                "characters": chars
            }
    except FileNotFoundError:
        print(f"Error: The file '{filename}' was not found.")
        return None
```

```text
Input text in 'sample.txt':
Python makes file handling simple.
Object-oriented programming brings data and logic together.

Result:
Lines: 2
Words: 11
Characters: 94
```

---

## 3. The File Copy Program

Another fundamental task is duplicating a file from a source path to a destination path.

### 3.1 Approach 1: Whole-File In-Memory Copy
For small to moderate files, reading the entire content and writing it in one pass is simple:
```python
def copy_file_direct(src_path, dest_path):
    try:
        with open(src_path, "r") as src_file:
            data = src_file.read()
            
        with open(dest_path, "w") as dest_file:
            dest_file.write(data)
            
        print(f"Successfully copied '{src_path}' to '{dest_path}'.")
    except FileNotFoundError:
        print(f"Error: Source file '{src_path}' does not exist.")
```

### 3.2 Approach 2: Streaming Line-by-Line Copy
When copying massive log files or database dumps that may exceed available RAM, streaming line-by-line is memory-optimal:
```python
def copy_file_streaming(src_path, dest_path):
    try:
        with open(src_path, "r") as src, open(dest_path, "w") as dest:
            line_count = 0
            for line in src:
                dest.write(line)
                line_count += 1
        print(f"Streamed {line_count} lines from '{src_path}' to '{dest_path}'.")
    except FileNotFoundError:
        print(f"Error: Source file '{src_path}' not found.")
```

---

## 4. Processing Structured Text: Loops, `strip()`, and `split()`

Files frequently store structured records as delimiter-separated text (such as CSV or colon-separated files).

Consider `students.txt`:
```text
Arun,85
Divya,92
Bala,45
Sneha,78
```

To parse this record stream cleanly:
1. **Strip leading/trailing whitespace and newlines:** `line.strip()`.
2. **Filter blank lines:** check `if line:` before processing.
3. **Decompose delimiters:** `name, score_str = line.split(",")`.
4. **Cast numeric types:** `score = int(score_str)`.

```python
with open("students.txt", "r") as f:
    for line in f:
        clean_line = line.strip()
        if not clean_line:
            continue  # Skip blank lines
        
        parts = clean_line.split(",")
        name = parts[0].strip()
        mark = int(parts[1].strip())
        
        status = "PASS" if mark >= 50 else "FAIL"
        print(f"Scholar: {name:<10} | Mark: {mark:>3} | Result: {status}")
```

---

## 5. Organizing File Operations into Modules & Packages

In enterprise systems, file processing logic should not be written as an ad-hoc script. Instead, we encapsulate it into dedicated utility modules.

### 5.1 Architecture of a File-Processing Module
```text
student_analytics/
│
├── __init__.py
├── parsers.py        # Reading and tokenizing file records
├── statistics.py     # Aggregating metrics (means, passes, standard deviation)
└── reports.py        # Exporting formatted summaries to disk
```

#### `parsers.py`:
```python
def load_student_records(filepath):
    """Loads student records safely from a CSV file."""
    records = []
    try:
        with open(filepath, "r") as f:
            for line in f:
                line = line.strip()
                if line:
                    parts = line.split(",")
                    records.append((parts[0].strip(), int(parts[1].strip())))
        return records
    except FileNotFoundError:
        print(f"Cannot locate record file: {filepath}")
        return []
    except ValueError as err:
        print(f"Corrupt record encountered: {err}")
        return []
```

#### `statistics.py`:
```python
def calculate_class_stats(records):
    """Computes total, average, and pass count."""
    if not records:
        return {"total": 0, "average": 0.0, "passed": 0}
        
    marks = [mark for _, mark in records]
    passed = [m for m in marks if m >= 50]
    
    return {
        "total": len(marks),
        "average": sum(marks) / len(marks),
        "passed": len(passed)
    }
```

---

## 6. The Limitation of Plain Variables & Dictionaries: Why OOP?

While tuples and dictionaries can store records, they present serious maintenance hazards as applications grow:

1. **Scattered Logic:** The data (`name`, `marks`) lives in a dictionary, while the functions that operate on it (`is_pass(student)`, `format_name(student)`) live in separate modules.
2. **Missing Invariants & Validation:** A dictionary allows any caller to insert invalid data:
   ```python
   student = {"name": "Arun", "mark": -999} # Dictionary cannot stop this!
   ```
3. **Key Name Fragility:** Misspelling a key name (`student["mrk"]`) raises runtime `KeyError` exceptions without compile-time or IDE auto-completion warnings.

To solve this, modern programming uses **Object-Oriented Programming (OOP)**.

---

## 7. Introduction to Classes and Objects

### 7.1 What is a Class?
A **Class** is a user-defined blueprint or template for creating objects. It describes:
- **Attributes:** What pieces of data an instance holds (state).
- **Methods:** What actions or operations an instance can perform (behavior).

### 7.2 What is an Object?
An **Object** is a concrete instance created from a class blueprint. 
- The class is the cookie cutter; the object is the freshly baked cookie.
- The class is the architectural blueprint of a house; the object is the actual house built with bricks and mortar.

```text
+------------------------------------+
|           Class: Student           |  <--- BLUEPRINT (Defined once in code)
+------------------------------------+
| Attributes: name, mark             |
| Methods   : is_pass(), display()   |
+------------------------------------+
                  |
    +-------------+-------------+
    | Instantiation             | Instantiation
    v                           v
+-----------------------+   +-----------------------+
|  s1: Student Instance |   |  s2: Student Instance |
+-----------------------+   +-----------------------+
| name = "Arun"         |   | name = "Divya"        |
| mark = 85             |   | mark = 92             |
+-----------------------+   +-----------------------+
```

---

## 8. Anatomy of a Python Class: `class`, `__init__`, and `self`

### 8.1 The `class` Keyword
Classes are defined with the `class` keyword followed by `CamelCase` naming convention:
```python
class Student:
    pass
```

### 8.2 The Constructor: `__init__()`
When an object is created, Python automatically invokes its initialization method: `__init__()`. This is known as the **constructor**.

```python
class Student:
    def __init__(self, name, mark):
        self.name = name
        self.mark = mark
```

### 8.3 Understanding the `self` Parameter
- `self` refers to the **specific instance** of the class currently being created or operated upon.
- When you execute `s1 = Student("Arun", 85)`, Python secretly passes the newly allocated instance as the first argument:
  `Student.__init__(s1, "Arun", 85)`.
- Inside the method, assigning `self.name = name` attaches the variable `name` directly to that specific instance's namespace.

---

## 9. Defining Instance Methods

A **Method** is a function defined inside a class that operates on the instance's attributes. Its first parameter must always be `self`.

```python
class Student:
    def __init__(self, name, mark):
        self.name = name
        self.mark = mark

    def is_pass(self):
        """Returns True if mark is at or above passing threshold."""
        return self.mark >= 50

    def display(self):
        """Displays the formatted profile of the student."""
        verdict = "Pass" if self.is_pass() else "Fail"
        print(f"Student: {self.name} | Mark: {self.mark} | Result: {verdict}")
```

### Invoking Methods:
```python
s1 = Student("Arun", 85)
s2 = Student("Bala", 42)

s1.display()  # Output: Student: Arun | Mark: 85 | Result: Pass
s2.display()  # Output: Student: Bala | Mark: 42 | Result: Fail
```

---

## 10. Combining Files, Exceptions, and Objects

Now we connect all foundational topics into a cohesive, professional pipeline:
1. Open a data file with `try...except FileNotFoundError`.
2. Stream lines, clean whitespace with `.strip()`, and tokenize with `.split(",")`.
3. Instantiate a `Student` object for each record.
4. Store all student objects in a list.
5. Iterate through the objects, calling `.display()` and computing summary metrics.

```python
class Student:
    def __init__(self, name, mark):
        self.name = name
        self.mark = mark

    def is_pass(self):
        return self.mark >= 50


def process_student_file(filename):
    students = []
    
    try:
        with open(filename, "r") as file:
            for line in file:
                cleaned = line.strip()
                if cleaned:
                    parts = cleaned.split(",")
                    name = parts[0].strip()
                    mark = int(parts[1].strip())
                    
                    # Instantiate object and append to list
                    student_obj = Student(name, mark)
                    students.append(student_obj)
                    
    except FileNotFoundError:
        print("Student file not found")
        return

    # Generate Report
    print("===== STUDENT REPORT =====\n")
    passed_count = 0
    for s in students:
        status = "Pass" if s.is_pass() else "Fail"
        print(f"Name: {s.name} | Mark: {s.mark} | Result: {status}")
        if s.is_pass():
            passed_count += 1
            
    print(f"\nTotal Students: {len(students)}")
    print(f"Passed Students: {passed_count}")
```

---

## 11. Class vs. Dictionary: A Comprehensive Comparison

| Dimension | Dictionary (`dict`) | Class Instance (`object`) |
| :--- | :--- | :--- |
| **Concept** | Generic mapping of key-value pairs | Blueprint for a distinct domain entity |
| **Syntax Access** | `obj["key"]` | `obj.attribute` |
| **Logic Binding** | External functions process dict | Methods are encapsulated directly inside the object |
| **Typing & Validation** | Keys can be misspelled without lint warning | Fixed attributes defined in `__init__`, IDE auto-completes |
| **Encapsulation** | Low (data exposed openly) | High (data and behavior bundled together) |
| **Memory Optimization** | Hash table overhead per dict | Optimized struct representation |

---

## 12. Common Beginner Mistakes & Debugging Guidance

### Mistake 1: Forgetting `self` in Method Definitions
```python
# INCORRECT
class Student:
    def is_pass():  # Missing self!
        return mark >= 50

# Calling s.is_pass() will raise:
# TypeError: Student.is_pass() takes 0 positional arguments but 1 was given
```
**Fix:** Always include `self` as the first parameter of every instance method: `def is_pass(self):`.

---

### Mistake 2: Forgetting `self.` when Referencing Attributes
```python
# INCORRECT
class Student:
    def __init__(self, name, mark):
        self.name = name
        self.mark = mark

    def is_pass(self):
        return mark >= 50  # NameError: name 'mark' is not defined!
```
**Fix:** Inside any method, access attributes using `self.<attr>`: `self.mark >= 50`.

---

### Mistake 3: Omitting Parentheses When Instantiating
```python
# INCORRECT
s = Student  # Assigns the CLASS itself, does NOT create an object!
print(type(s))  # <class 'type'> instead of <class 'Student'>

# CORRECT
s = Student("Arun", 85)
```

---

### Mistake 4: Not Handling Missing Files During Processing
When writing file-based applications, failing to wrap `open()` in a `try...except FileNotFoundError` block will cause the entire script to crash with an unhandled traceback if the file path is incorrect.

---

## 13. Moodle Coding Arena Problem: Student File Object Analyzer

### Problem Statement
Write a complete Python program that:
1. Defines a `Student` class with:
   - An `__init__(self, name, mark)` method initializing `self.name` (string) and `self.mark` (integer).
   - An `is_pass(self)` method returning `True` if `self.mark >= 50`, otherwise `False`.
2. Opens the file `"students.txt"` in read mode.
   - If `"students.txt"` does NOT exist, handle the `FileNotFoundError` and print:
     ```text
     Student file not found
     ```
     (without printing any report header or summary).
3. If the file exists:
   - Read each line, strip whitespace, and split by `","` to extract name and mark.
   - Instantiate a `Student` object for each record and store them in a list.
   - Print the report header:
     ```text
     ===== STUDENT REPORT =====
     ```
     followed by a blank line.
   - For each student in the list, print:
     ```text
     Name: <name> | Mark: <mark> | Result: <Pass/Fail>
     ```
   - Print a blank line, followed by:
     ```text
     Total Students: <count>
     Passed Students: <passed_count>
     ```

---

## 14. Quick Revision Cheat Sheet

```python
# 1. Class definition & constructor
class Student:
    def __init__(self, name, mark):
        self.name = name          # Attribute
        self.mark = int(mark)      # Attribute

    def is_pass(self):            # Method
        return self.mark >= 50

# 2. Instantiation
s = Student("Pooja", 88)
print(s.name, s.is_pass())        # Access attributes & call methods

# 3. File streaming into objects
students = []
try:
    with open("students.txt", "r") as file:
        for line in file:
            parts = line.strip().split(",")
            if len(parts) == 2:
                students.append(Student(parts[0], parts[1]))
except FileNotFoundError:
    print("File missing!")

# 4. Word counting
with open("notes.txt", "r") as f:
    text = f.read()
    word_count = len(text.split())
```
