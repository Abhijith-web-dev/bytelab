# Unit–III — Day 8: Dictionary Methods, Traversal & List Comprehension

**Duration:** 90 Minutes  
**Level:** Beginner → Intermediate  
**Unit:** Unit–III — Data Types, Control Flow & Data Processing  
**Day:** 8  
**Topics:** Dictionary Methods; Traversing Dictionaries; Practical Dictionary-Based Programs; Advanced List Processing using List Comprehension  

---

## 1. Day 8 Learning Objectives

By the end of this session, students should be able to:
- Confidently use common dictionary methods (`get()`, `keys()`, `values()`, `items()`, `update()`, `pop()`, `clear()`).
- Traverse dictionary keys, values, and key-value pairs using `for` loops.
- Apply conditional logic (`if`) during dictionary traversals to search, filter, and tally data.
- Design real-world data pipelines combining dictionaries, lists, loops, and functions.
- Explain the syntax and advantages of **List Comprehension**.
- Convert verbose multi-line accumulator loops into concise one-line list comprehensions.
- Use conditional filters (`if`) and ternary branches (`if...else`) inside list comprehensions.
- Recognize when list comprehension improves readability versus when a traditional loop is preferable.

---

## 2. 90-Minute Session Plan

| Time | Topic | Activity |
| --- | --- | --- |
| 0–5 min | Day 7 recap | Dictionary keys, values, add/update/delete recap |
| 5–20 min | Dictionary methods | `get()`, `keys()`, `values()`, `items()`, `update()`, `pop()` |
| 20–35 min | Traversing dictionaries | `for` loops with keys, values, and pairs |
| 35–48 min | Practical dictionary programs | Inventory, grade books, and statistics |
| 48–60 min | Dictionary + conditions | Searching, tallying, and filtering |
| 60–72 min | Introduction to List Comprehension | Syntax: `[expr for item in iterable]` |
| 72–80 min | Conditional List Comprehension | Filtering data with `if` |
| 80–87 min | Moodle practice | Student Marks Analyzer problem |
| 87–90 min | Quiz | Knowledge check |

---

## 3. Quick Recap from Day 7

In Day 7, we learned dictionary fundamentals:
```python
student = {
    "name": "Arun",
    "age": 20,
    "mark": 85
}

student["name"]              # Access
student["mark"] = 90         # Update
student["course"] = "Python" # Add
del student["age"]           # Delete
```

Today, we advance to **mass data processing**:
1. *How do we iterate through hundreds of records cleanly?*
2. *How do we transform and filter data into new lists with minimal boilerplate code?* $\rightarrow$ **List Comprehension**.

---

## 4. Built-in Dictionary Methods

| Method | Syntax | Action |
| --- | --- | --- |
| **`get()`** | `d.get(key, default)` | Safely retrieves value without `KeyError` |
| **`keys()`** | `d.keys()` | Returns iterable view of all keys |
| **`values()`** | `d.values()` | Returns iterable view of all values |
| **`items()`** | `d.items()` | Returns iterable view of `(key, value)` pairs |
| **`pop()`** | `d.pop(key)` | Removes key and returns its value |
| **`update()`** | `d.update({k: v})` | Batch adds or updates entries |
| **`clear()`** | `d.clear()` | Empties the dictionary |

---

## 5. The `get()` Method

```python
student = {"name": "Arun", "mark": 85}

print(student.get("name"))       # Arun
print(student.get("age"))        # None
print(student.get("age", 0))     # 0 (Fallback default)
```

---

## 6. The `keys()` Method

```python
student = {"name": "Arun", "age": 20, "mark": 85}

for key in student.keys():
    print(key)
```
**Output:**
```
name
age
mark
```

---

## 7. The `values()` Method

Use `.values()` when you only care about data values, not their key names:

```python
student = {"name": "Arun", "age": 20, "mark": 85}

for val in student.values():
    print(val)
```
**Output:**
```
Arun
20
85
```

---

## 8. The `items()` Method

`.items()` returns pairs unpacked cleanly into two loop variables:

```python
student = {"name": "Arun", "age": 20, "mark": 85}

for key, value in student.items():
    print(f"{key} : {value}")
```
**Output:**
```
name : Arun
age : 20
mark : 85
```

---

## 9. The `pop()` Method

```python
student = {"name": "Arun", "age": 20, "mark": 85}

removed_age = student.pop("age")

print("Removed:", removed_age)
print("Dictionary:", student)
```
**Output:**
```
Removed: 20
Dictionary: {'name': 'Arun', 'mark': 85}
```

---

## 10. The `update()` Method

`update()` merges another dictionary or iterable of key-value pairs:

```python
student = {"name": "Arun", "age": 20}

# Adds 'mark' and updates 'age'
student.update({"age": 21, "mark": 85, "course": "Python"})

print(student)
# {'name': 'Arun', 'age': 21, 'mark': 85, 'course': 'Python'}
```

---

## 11. The `clear()` Method

```python
student = {"name": "Arun", "age": 20}
student.clear()
print(student)  # {}
```

---

## 12. Traversing Dictionary Keys

Iterating directly over a dictionary yields its keys:

```python
student = {"name": "Arun", "age": 20, "mark": 85}

for key in student:
    print(key, "->", student[key])
```

---

## 13. Summary of the 3 Traversal Styles

```text
for k in d:             ──►  Iterates Keys
for v in d.values():    ──►  Iterates Values
for k, v in d.items():  ──►  Iterates (Key, Value) Pairs
```

---

## 14. Traversing with Conditions

Combine dictionary iterations with `if` statements to filter records:

```python
students = {
    "Arun": 85,
    "Priya": 35,
    "Rahul": 70,
    "Meena": 30
}

for name, mark in students.items():
    if mark >= 40:
        print(name, "Passed")
```
**Output:**
```
Arun Passed
Rahul Passed
```

---

## 15. Practical Program — Counting Matches

```python
students = {
    "Arun": 85,
    "Priya": 35,
    "Rahul": 70,
    "Meena": 30
}

passed_count = 0
for mark in students.values():
    if mark >= 40:
        passed_count += 1

print("Total Passed:", passed_count)  # 2
```

---

## 16. Practical Program — Finding the Maximum Record

```python
students = {
    "Arun": 85,
    "Priya": 35,
    "Rahul": 70,
    "Meena": 90
}

top_student = ""
highest_mark = -1

for name, mark in students.items():
    if mark > highest_mark:
        highest_mark = mark
        top_student = name

print(f"Top Student: {top_student} with {highest_mark} marks")
```
**Output:**
```
Top Student: Meena with 90 marks
```

---

## 17. Practical Program — Inventory Stock Check

```python
products = {
    "Laptop": 5,
    "Mouse": 0,
    "Keyboard": 8,
    "Monitor": 0
}

print("--- Out of Stock ---")
for product, stock in products.items():
    if stock == 0:
        print(f"Alert: {product} is out of stock!")
```
**Output:**
```
--- Out of Stock ---
Alert: Mouse is out of stock!
Alert: Monitor is out of stock!
```

---

## 18. Dictionaries Containing Lists

```python
students = {
    "Arun": [80, 75, 90],
    "Priya": [70, 85, 60],
    "Rahul": [90, 95, 88]
}

for name, marks in students.items():
    total = sum(marks)
    print(f"{name}: Total = {total}, Average = {total / len(marks):.1f}")
```
**Output:**
```
Arun: Total = 245, Average = 81.7
Priya: Total = 215, Average = 71.7
Rahul: Total = 273, Average = 91.0
```

---

## 19. Introduction to List Comprehension

Suppose we want a list of square numbers from `[1, 2, 3, 4, 5]`.

### Traditional Multi-Line Loop:
```python
numbers = [1, 2, 3, 4, 5]
squares = []
for n in numbers:
    squares.append(n * n)
print(squares)  # [1, 4, 9, 16, 25]
```

### Pythonic List Comprehension:
```python
squares = [n * n for n in numbers]
print(squares)  # [1, 4, 9, 16, 25]
```

---

## 20. List Comprehension Syntax Breakdown

```text
[ expression   for item   in collection ]
       ↓           ↓             ↓
  What gets     Variable      Sequence being
  added         name          iterated
```

```python
# Double every number
doubled = [x * 2 for x in [1, 2, 3, 4]]
print(doubled)  # [2, 4, 6, 8]

# Transform strings
names = ["arun", "priya", "rahul"]
upper_names = [name.upper() for name in names]
print(upper_names)  # ['ARUN', 'PRIYA', 'RAHUL']
```

---

## 21. List Comprehension with Conditional Filtering

Append an `if` clause at the end to filter elements:

```text
[ expression for item in collection if condition ]
```

```python
numbers = [1, 2, 3, 4, 5, 6]

# Keep only even numbers
evens = [n for n in numbers if n % 2 == 0]
print(evens)  # [2, 4, 6]
```

### Comparison:
```python
# Traditional
evens = []
for n in numbers:
    if n % 2 == 0:
        evens.append(n)

# List Comprehension
evens = [n for n in numbers if n % 2 == 0]
```

---

## 22. Transformation vs Filtering

| Type | Syntax | Result on `[5, 12, 8, 20]` |
| --- | --- | --- |
| **Transformation** | `[x * 2 for x in data]` | `[10, 24, 16, 40]` (All elements transformed) |
| **Filtering** | `[x for x in data if x > 10]` | `[12, 20]` (Only matches retained) |
| **Both Combined** | `[x * 2 for x in data if x > 10]` | `[24, 40]` (Filter first, transform matches) |

---

## 23. List Comprehension with Ternary `if...else`

When you need an alternative value instead of filtering items out, put `if...else` **before** the `for` keyword:

```python
numbers = [1, 2, 3, 4, 5]

labels = ["Even" if n % 2 == 0 else "Odd" for n in numbers]
print(labels)
# ['Odd', 'Even', 'Odd', 'Even', 'Odd']
```

> **Syntax Rule:**  
> - **Filter (drop items):** `if` at the **very end**  
> - **Branch (transform every item):** `expr_true if cond else expr_false` at the **beginning**  

---

## 24. Combining Dictionaries with List Comprehension

Extract filtered lists directly from dictionaries using `.items()`:

```python
students = {
    "Arun": 85,
    "Priya": 35,
    "Rahul": 70,
    "Meena": 30
}

# Extract names of students who passed (mark >= 40)
passed = [name for name, mark in students.items() if mark >= 40]
print(passed)  # ['Arun', 'Rahul']
```

```text
students.items()
      ↓
(name, mark)
      ↓
check: mark >= 40
      ↓
add name to list
```

---

## 25. Extracting Filtered Inventory

```python
products = {
    "Laptop": 50000,
    "Mouse": 500,
    "Keyboard": 1500,
    "Monitor": 12000
}

expensive = [name for name, price in products.items() if price > 5000]
print(expensive)  # ['Laptop', 'Monitor']
```

---

## 26. When to Use List Comprehensions vs Loops

| Use List Comprehensions When | Use Traditional `for` Loops When |
| --- | --- |
| Creating a new list from an iterable | Performing I/O operations (printing, saving to disk) |
| Logic is simple (1-2 conditions) | Complex logic with nested branches and exception handling |
| Code remains easily readable on one line | Code spans multiple statements or needs debugging breakpoints |

> **Zen of Python:** *Readability counts. Simple is better than complex.*

---

## 27. Common Beginner Mistakes

### Mistake 1 — Missing the output expression
```python
# WRONG: [for x in nums]
# CORRECT: [x for x in nums]
```

### Mistake 2 — Forgetting `.items()` when filtering dictionaries
```python
# WRONG: [name for name, mark in students if mark >= 40]
# Fails because iterating a dict yields keys, not pairs!

# CORRECT: [name for name, mark in students.items() if mark >= 40]
```

### Mistake 3 — Writing unreadable nested comprehensions
Avoid chaining multiple loops and expressions into one unreadable line. Use normal loops when comprehensions become obscure.

---

## 28. Quick Student Workout

### Workout 1
```python
numbers = [1, 2, 3, 4]
print([n * 2 for n in numbers])
```
*Answer:* `[2, 4, 6, 8]`

### Workout 2
```python
numbers = [1, 2, 3, 4, 5, 6]
print([n for n in numbers if n % 2 == 0])
```
*Answer:* `[2, 4, 6]`

### Workout 3
```python
students = {"Arun": 80, "Priya": 35, "Rahul": 70}
print([name for name, mark in students.items() if mark >= 40])
```
*Answer:* `['Arun', 'Rahul']`

---

## 29. Unit–III Day 8 Cheat Sheet

| Concept | Python Syntax | Result |
| --- | --- | --- |
| **Safely Get Value** | `d.get("key", 0)` | Default 0 if missing |
| **Key-Value Traversal** | `for k, v in d.items():` | Unpacks both components |
| **Basic Comprehension** | `[x * 2 for x in lst]` | Multiplies all elements |
| **Filtered Comprehension** | `[x for x in lst if x > 0]` | Selects matching elements |
| **Dict Comprehension** | `[k for k, v in d.items() if v >= 40]` | Extracts keys matching value condition |
| **Ternary Comprehension** | `["A" if x >= 50 else "B" for x in lst]` | Conditional mapping |

---

## 30. Day 8 Final Challenge

Predict the output:

```python
students = {
    "Arun": 85,
    "Priya": 35,
    "Rahul": 70,
    "Meena": 90
}

passed = [name for name, mark in students.items() if mark >= 40]
bonus_marks = [mark + 5 for name, mark in students.items() if mark >= 40]

print("Passed:     ", passed)
print("Bonus Marks:", bonus_marks)
```

**Expected Output:**
```
Passed:      ['Arun', 'Rahul', 'Meena']
Bonus Marks: [90, 75, 95]
```

> **Day 8 Key Takeaway:** Dictionaries allow expressive data modeling, and list comprehensions offer clean, declarative data transformation. Combining both is a hallmark of idiomatic, professional Python programming.
