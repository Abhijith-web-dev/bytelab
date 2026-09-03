# Unit–III — Day 5: Tuples — Introduction, Operations & Assignment

**Duration:** 90 Minutes  
**Level:** Beginner  
**Unit:** Unit–III — Data Types & Control Flow  
**Day:** 5  
**Topics:** Tuples: Introduction and Characteristics; Tuple Operations; Tuple Assignment; Accessing Tuple Elements  

---

## 1. Day 5 Learning Objectives

By the end of this session, students should be able to:
- Explain what a **tuple** is in Python.
- Create tuples using parentheses and packing notation.
- Understand the core characteristics of tuples (ordered, indexed, immutable, heterogenous).
- Understand the difference between lists and tuples.
- Access tuple elements using positive and negative indexes.
- Perform common tuple operations (concatenation, repetition, membership testing).
- Extract sub-sequences using tuple slicing.
- Perform **tuple assignment** and multiple assignment in one statement.
- Swap variables cleanly using tuple assignment (`a, b = b, a`).
- Use tuple methods (`count()` and `index()`).
- Return multiple values from functions using tuples.
- Apply tuples in practical real-world programs.

---

## 2. 90-Minute Session Plan

| Time | Topic | Activity |
| --- | --- | --- |
| 0–5 min | Day 4 recap | Lists + functions recap |
| 5–18 min | Introduction to tuples | What is a tuple? Syntax & packing |
| 18–30 min | Tuple characteristics | Mutable vs immutable |
| 30–43 min | Accessing tuple elements | Indexing and slicing |
| 43–55 min | Tuple operations | Concatenation, repetition, membership |
| 55–65 min | Tuple methods | `count()` and `index()` |
| 65–73 min | Tuple assignment | Multiple assignment and swapping |
| 73–80 min | Illustrative programs | Coordinates, records, functions |
| 80–87 min | Moodle practice | Student Information problem |
| 87–90 min | Quiz | Knowledge check |

---

## 3. Quick Recap from Day 4

In Day 4, we learned that lists can be modified in-place:
```python
marks = [70, 80, 90]
marks[0] = 75
print(marks)  # [75, 80, 90]
```

Today, we explore Python's primary **immutable** sequence type: **the Tuple**.

> **The Major Difference:**  
> - **List** $\rightarrow$ **Mutable** (Can be changed)  
> - **Tuple** $\rightarrow$ **Immutable** (Cannot be changed after creation)  

---

## 4. What is a Tuple?

A **tuple** is an ordered collection of values stored in a fixed sequence.

```python
numbers = (10, 20, 30, 40)
print(numbers)
```

A tuple can contain elements of different data types (heterogeneous):
```python
student = ("Arun", 20, 85.5, True)
```
Here, `student` contains a `str`, `int`, `float`, and `bool`.

---

## 5. Creating a Tuple

### Method 1: Using Parentheses (Standard)
```python
fruits = ("apple", "banana", "mango")
marks = (80, 75, 90)
```

### Method 2: Tuple Packing (Without Parentheses)
Python automatically recognizes comma-separated values as a tuple:
```python
numbers = 10, 20, 30
print(type(numbers))  # <class 'tuple'>
```

---

## 6. Single-Element Tuple (The Trailing Comma Rule)

This is a classic beginner pitfall!

```python
# NOT a tuple (evaluated as an integer with grouping parentheses)
number = (10)
print(type(number))  # <class 'int'>

# A valid single-element tuple (requires a trailing comma)
number = (10,)
print(type(number))  # <class 'tuple'>
```

> **Remember:**  
> `(10)` $\rightarrow$ integer  
> `(10,)` $\rightarrow$ tuple  

---

## 7. Characteristics of Tuples

1. **Ordered:** Elements maintain their insertion order:
   ```python
   t = (10, 20, 30)  # Always 10 -> 20 -> 30
   ```
2. **Indexed:** Elements are indexed starting from 0:
   ```text
   Index:   0    1    2
   Value:  10   20   30
   ```
3. **Immutable:** Once created, elements cannot be modified, added, or deleted.
4. **Allows Duplicates:** Can store duplicate values:
   ```python
   numbers = (10, 20, 10, 30)
   ```
5. **Heterogeneous:** Can hold mixed data types simultaneously:
   ```python
   data = ("Arun", 20, 85.5)
   ```
6. **Supports Slicing:** Sub-tuples can be extracted with `t[start:end]`.

---

## 8. Tuple vs List

| Feature | List | Tuple |
| --- | --- | --- |
| **Syntax** | Square brackets `[]` | Parentheses `()` |
| **Mutability** | **Mutable** (modifiable) | **Immutable** (read-only) |
| **Methods** | `append()`, `remove()`, `sort()`, etc. | Only `count()` and `index()` |
| **Performance** | Slightly larger memory footprint | Faster and more memory efficient |
| **Best Used For** | Collections that grow/shrink | Fixed, write-protected collections |

> **Memory Trick:**  
> **List** $\rightarrow$ Change  
> **Tuple** $\rightarrow$ Fixed  

---

## 9. Why Use Tuples?

When data represents a fixed logical unit that should never be altered accidentally:
- **GPS Coordinates:** `location = (12.9716, 77.5946)`
- **RGB Colors:** `red = (255, 0, 0)`
- **Calendar Dates:** `date = (3, 9, 2026)`
- **Database Records:** `row = (101, "Admin", "active")`

---

## 10. Accessing Tuple Elements via Indexing

Indexing uses square brackets `[]` with 0-based indexing:

```python
fruits = ("apple", "banana", "mango")

print(fruits[0])  # apple
print(fruits[1])  # banana
print(fruits[2])  # mango
```

---

## 11. Negative Indexing

Negative indices count backwards from the right end:

```text
numbers = (  10,   20,   30,   40  )
Indices:     -4    -3    -2    -1
```

```python
print(numbers[-1])  # 40 (last item)
print(numbers[-2])  # 30 (second from last)
```

---

## 12. Tuple Slicing

Extracts a portion of a tuple, returning a new sub-tuple:

```python
numbers = (10, 20, 30, 40, 50)

# First three elements
print(numbers[:3])   # (10, 20, 30)

# Middle section
print(numbers[1:4])  # (20, 30, 40)

# Last two elements
print(numbers[-2:])  # (40, 50)
```

---

## 13. Tuple Immutability in Action

Attempting to modify a tuple in-place raises a `TypeError`:

```python
numbers = (10, 20, 30)

# Attempt to change index 0
numbers[0] = 100
# TypeError: 'tuple' object does not support item assignment
```

```text
Tuple created in memory
        ↓
   (10, 20, 30)
        ↓
Immutable lock applied (no reassignment allowed)
```

---

## 14. No `append()`, `remove()`, or `pop()`

Because tuples are immutable, methods that modify data in-place are intentionally omitted:

```python
numbers = (10, 20, 30)

# These will all raise AttributeError:
# numbers.append(40)
# numbers.remove(20)
# numbers.pop()
```

---

## 15. Tuple Concatenation (`+`)

Combining tuples allocates a **new tuple**:

```python
a = (10, 20)
b = (30, 40)

result = a + b
print(result)  # (10, 20, 30, 40)
```

*Note: Neither `a` nor `b` is modified. A new tuple is produced.*

---

## 16. Tuple Repetition (`*`)

The `*` operator repeats elements into a new tuple:

```python
numbers = (1, 2)
result = numbers * 3
print(result)  # (1, 2, 1, 2, 1, 2)
```

> **Memory Rule:**  
> `+` $\rightarrow$ Combine  
> `*` $\rightarrow$ Repeat  

---

## 17. Membership Operators (`in`, `not in`)

```python
fruits = ("apple", "banana", "mango")

print("banana" in fruits)      # True
print("grape" in fruits)       # False
print("grape" not in fruits)   # True
```

---

## 18. Comparing Tuples

Tuples are compared element by element (lexicographically):

```python
a = (10, 20)
b = (10, 20)
c = (10, 30)

print(a == b)  # True
print(a < c)   # True (because 20 < 30)
```

---

## 19. Built-in Tuple Methods

Tuples provide two non-mutating search methods:
1. `count()`
2. `index()`

---

## 20. `count()`

Returns the frequency of a given value:

```python
numbers = (10, 20, 10, 30, 10)
print(numbers.count(10))  # 3
print(numbers.count(50))  # 0
```

---

## 21. `index()`

Returns the index position of the **first occurrence**:

```python
fruits = ("apple", "banana", "mango", "banana")
print(fruits.index("banana"))  # 1
```

*(Raises `ValueError` if the value is not found).*

---

## 22. Tuple Operations Cheat Sheet

| Operation | Syntax | Result / Purpose |
| --- | --- | --- |
| **Access** | `t[0]` | Element at index 0 |
| **Negative Index** | `t[-1]` | Last element |
| **Slice** | `t[1:4]` | Sub-tuple from index 1 to 3 |
| **Concatenation** | `t1 + t2` | Combines into new tuple |
| **Repetition** | `t * 3` | Repeats tuple 3 times |
| **Membership** | `'x' in t` | `True` if element exists |
| **Count** | `t.count(x)` | Number of occurrences of `x` |
| **Index** | `t.index(x)` | First index position of `x` |
| **Length** | `len(t)` | Total count of elements |

---

## 23. Tuple Assignment

Assigning multiple variables simultaneously on one line:

```python
a, b = 10, 20

print("a:", a)
print("b:", b)
```
**Output:**
```
a: 10
b: 20
```

---

## 24. Multiple Assignment

```python
name, age, mark = "Arun", 20, 85

print(name)  # Arun
print(age)   # 20
print(mark)  # 85
```

---

## 25. Tuple Packing and Unpacking

### Packing
Gathering multiple loose values into a single tuple:
```python
student = "Arun", 20, 85
print(student)  # ('Arun', 20, 85)
```

### Unpacking
Distributing elements from a tuple into individual variables:
```python
student = ("Arun", 20, 85)
name, age, mark = student

print("Name:", name)
print("Age: ", age)
print("Mark:", mark)
```

> **Rule:** The number of variables on the left **must match** the number of elements in the tuple, or Python raises `ValueError: too many values to unpack`.

---

## 26. Swapping Variables without a Temporary Variable

In most programming languages, swapping requires a third variable (`temp`). In Python, tuple assignment swaps them in one clean step:

```python
a = 10
b = 20

# Swap in a single statement
a, b = b, a

print("a:", a)
print("b:", b)
```
**Output:**
```
a: 20
b: 10
```

### Execution Flow:
1. Python packs `(b, a)` on the right into a temporary tuple `(20, 10)`.
2. Python unpacks into `a` and `b`.
3. `a` receives 20, and `b` receives 10.

---

## 27. Real-World Example — Student Record

```python
student = ("Arun", 20, 85)
name, age, mark = student

print("Name:", name)
print("Age: ", age)
print("Mark:", mark)
```

---

## 28. Real-World Example — Geographic Coordinates

```python
location = (12.9716, 77.5946)
latitude, longitude = location

print("Latitude: ", latitude)
print("Longitude:", longitude)
```

---

## 29. Real-World Example — Product Information

```python
product = ("Laptop", 55000, "Electronics")
name, price, category = product

print("Product: ", name)
print("Price:   ", price)
print("Category:", category)
```

---

## 30. Functions Returning Multiple Values

When a function returns multiple values separated by commas, Python packs them into a **tuple**:

```python
def get_student():
    return "Arun", 20, 85

# Unpack directly upon receiving
name, age, mark = get_student()

print(name)  # Arun
print(age)   # 20
print(mark)  # 85
```

---

## 31. Passing Tuples to Functions

```python
def display_student(student):
    print("Record:", student)

data = ("Arun", 20, 85)
display_student(data)
```
**Output:**
```
Record: ('Arun', 20, 85)
```

---

## 32. Decision Matrix: List vs Tuple

```text
Will this collection of data need to be added to, removed from, or reordered?
               │
      ┌────────┴────────┐
      ▼                 ▼
    [YES]              [NO]
      │                 │
Use a List         Use a Tuple
(e.g., cart)       (e.g., date, coordinates)
```

---

## 33. Common Beginner Mistakes

### Mistake 1 — Forgetting trailing comma for a 1-item tuple
```python
# WRONG
item = (42)    # int, not tuple!

# CORRECT
item = (42,)   # tuple
```

### Mistake 2 — Attempting in-place mutation
```python
# WRONG
t = (1, 2, 3)
t[0] = 99      # TypeError: 'tuple' object does not support item assignment
```

### Mistake 3 — Expecting `append()` or `pop()`
```python
# WRONG
t = (1, 2, 3)
t.append(4)    # AttributeError: 'tuple' object has no attribute 'append'
```

### Mistake 4 — Unpacking variable count mismatch
```python
# WRONG
data = (10, 20, 30)
a, b = data    # ValueError: too many values to unpack (expected 2)

# CORRECT
a, b, c = data
```

---

## 34. Quick Student Workout

### Workout 1
```python
numbers = (10, 20, 30)
print(numbers[1])
```
*Answer:* `20`

### Workout 2
```python
numbers = (10, 20, 30, 40)
print(numbers[-1])
```
*Answer:* `40`

### Workout 3
```python
numbers = (10, 20)
print(numbers * 2)
```
*Answer:* `(10, 20, 10, 20)`

### Workout 4
```python
a, b = 10, 20
print(a, b)
```
*Answer:* `10 20`

### Workout 5
```python
a = 10
b = 20
a, b = b, a
print(a, b)
```
*Answer:* `20 10`

---

## 35. Unit–III Day 5 Cheat Sheet

| Concept | Python Code | Key Behavior |
| --- | --- | --- |
| **Tuple Definition** | `t = (1, 2, 3)` | Ordered, immutable collection |
| **Single Item** | `t = (5,)` | Requires trailing comma |
| **Packing** | `t = 1, 2, 3` | Bundles values into tuple |
| **Unpacking** | `a, b, c = t` | Assigns items to individual variables |
| **Swapping** | `a, b = b, a` | Inverts variable values cleanly |
| **Indexing** | `t[0]`, `t[-1]` | 0-based and reverse indexing |
| **Slicing** | `t[1:3]` | Creates new sub-tuple |
| **Search** | `t.count(x)`, `t.index(x)` | Frequency count & first position |

---

## 36. Day 5 Final Challenge

Predict the output:

```python
def get_student():
    return ("Arun", 20, 75)

student = get_student()
name, age, mark = student

if mark >= 50:
    result = "Pass"
else:
    result = "Fail"

print("Name:", name)
print("Age: ", age)
print("Mark:", mark)
print("Result:", result)
```

**Expected Output:**
```
Name: Arun
Age: 20
Mark: 75
Result: Pass
```

> **Day 5 Key Takeaway:** Tuples protect fixed sequences from accidental changes. Tuple assignment and unpacking make data extraction and variable swapping clean, elegant, and Pythonic.
