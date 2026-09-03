# Unit–III — Day 1: Introduction to Lists and List Operations

**Duration:** 90 Minutes  
**Level:** Beginner  
**Unit:** Unit–III — Lists, Tuples, Dictionaries & Data Processing  
**Day:** 1  
**Topics Covered:** Introduction to Lists; What is a List?; Creating Lists; List characteristics; Accessing List Elements; Positive and Negative Indexing; List Slicing; Adding Elements; Removing Elements; Updating Elements; List Length; Membership Operators; Traversing Lists; Common Beginner Mistakes; Practical Programs; Moodle Coding Practice; Moodle AI Agent Instruction; Quiz; Cheat Sheet; Final Challenge  

---

## 1. Learning Objectives

By the end of this session, students should be able to:
- Define what a Python list is and explain why sequence containers are essential in software design.
- Create lists containing homogeneous or heterogeneous data types, including empty initializations (`[]`).
- Understand list memory layout and zero-based indexing.
- Access individual elements using positive ($0$ to $n-1$) and negative ($-1$ to $-n$) offsets.
- Extract sub-sequences using Python's slicing notation: `list[start:stop:step]`.
- Add elements dynamically using `append()`, `insert()`, and `extend()`.
- Delete elements using value-based removal (`remove()`), index-based removal (`pop()`), and keyword slicing (`del`).
- Demonstrate **list mutability** by modifying individual elements and slice ranges in place.
- Determine sequence lengths (`len()`) and evaluate membership using `in` and `not in`.
- Traverse lists using standard `for-in` loops, index counters (`range(len())`), and `enumerate()`.
- Differentiate between lists and strings (mutability, element types, and modification methods).

---

## 2. 90-Minute Session Plan

| Time | Topic | Activity |
| --- | --- | --- |
| 0–10 min | Introduction | Why do we need lists? The multi-value container problem |
| 10–25 min | Creating Lists | Syntax `[]`, data types, empty lists, and characteristics |
| 25–38 min | Accessing Elements | Zero-based positive indexing, negative indexing, and `IndexError` |
| 38–48 min | List Slicing | Extracting portions, bounds, step intervals, and reversing `[::-1]` |
| 48–65 min | Adding Elements | Contrasting `append()`, `insert()`, and `extend()` |
| 65–75 min | Removing Elements | Comparing `remove()`, `pop()`, and `del` |
| 75–82 min | Updating & Traversal | In-place item assignment, iteration with `for`, and `enumerate()` |
| 82–87 min | Student Workout | Step-by-step interactive exercises and output checks |
| 87–90 min | Quiz + Cheat Sheet | Mastery assessment and quick reference |

---

## 3. Why Do We Need Lists?

Imagine storing the marks of five students:

```python
# Without a list (unscalable approach):
mark1 = 78
mark2 = 85
mark3 = 92
mark4 = 67
mark5 = 88
```

This becomes impossible to maintain when scaling to 100 or 10,000 students. You cannot iterate over variable names dynamically.

Instead, Python allows grouping related data into a single **list**:

```python
marks = [78, 85, 92, 67, 88]
```

### Conceptual Container Model
```text
marks
  ↓
┌────┬────┬────┬────┬────┐
│ 78 │ 85 │ 92 │ 67 │ 88 │
└────┴────┴────┴────┴────┘
   0    1    2    3    4
```
A single variable `marks` now references the entire sequence of numbers, enabling loops, searches, aggregations, and sorting algorithms.

---

## 4. What is a List?

A **list** in Python is an ordered, mutable, and heterogeneous collection of values enclosed in square brackets (`[]`).

```python
numbers = [10, 20, 30, 40, 50]
```
Here:
- `numbers` is the list variable.
- `10, 20, 30, 40, 50` are the **elements** (or items) of the list.

---

## 5. Creating Lists

Lists are constructed using square brackets `[]` with elements separated by commas:

```python
# Integer list
numbers = [10, 20, 30]

# String list
names = ["Arun", "Kumar", "Meena"]

# Heterogeneous (mixed) list
student_record = ["Arun", 21, 88.5, True]
```

### Creating an Empty List
An empty list acts as an expandable container:
```python
items = []
items.append(10)
items.append(20)
print(items)  # [10, 20]
```

---

## 6. Core Characteristics of Python Lists

| Property | Meaning |
| :--- | :--- |
| **Ordered** | Elements maintain a fixed positional sequence based on insertion. |
| **Mutable** | Elements can be modified, replaced, added, or deleted in place without creating a new list. |
| **Indexed** | Every element has a unique integer position accessible in $O(1)$ time. |
| **Sliceable** | Contiguous subsets can be extracted using `[start:stop:step]`. |
| **Dynamic** | Lists automatically allocate and free memory as their size expands or shrinks. |
| **Allows Duplicates** | The same value can appear multiple times at different indices. |

---

## 7. List Indexing: Positive & Negative

Python uses **zero-based indexing** from left to right, and **negative indexing** from right to left:

```text
Value:        10    20    30    40    50
Positive:      0     1     2     3     4   (Left to Right)
Negative:     -5    -4    -3    -2    -1   (Right to Left)
```

```python
numbers = [10, 20, 30, 40, 50]

print(numbers[0])   # First element: 10
print(numbers[2])   # Third element: 30
print(numbers[-1])  # Last element: 50
print(numbers[-2])  # Second to last: 40
```

---

## 8. Preventing `IndexError`

Accessing an index beyond the bounds of a list raises an `IndexError`:

```python
numbers = [10, 20, 30]
# Valid positive indices: 0, 1, 2
print(numbers[3])  # IndexError: list index out of range
```
> **Golden Rule:** For a list of size $n$, valid positive indices span $0$ to $n-1$, and negative indices span $-n$ to $-1$.

---

## 9. List Slicing

Slicing extracts a new sublist from an existing list:

$$\text{Syntax: } \text{list}[\text{start} : \text{stop} : \text{step}]$$

```python
numbers = [10, 20, 30, 40, 50]

print(numbers[1:4])  # [20, 30, 40] (Index 4 is excluded)
print(numbers[:3])   # [10, 20, 30] (Start defaults to 0)
print(numbers[2:])   # [30, 40, 50] (Stop defaults to end)
print(numbers[:])    # [10, 20, 30, 40, 50] (Shallow copy)
```

### Slicing with Step & Reversing
```python
# Every second element
print(numbers[0:5:2])  # [10, 30, 50]

# Complete reversal using negative step
print(numbers[::-1])   # [50, 40, 30, 20, 10]
```

---

## 10. Updating List Elements (Mutability)

Unlike immutable strings or tuples, Python lists can be modified directly in memory:

```python
numbers = [10, 20, 30]
numbers[1] = 200
print(numbers)  # [10, 200, 30]
```

### Updating Slices
```python
numbers = [10, 20, 30, 40]
numbers[1:3] = [200, 300]
print(numbers)  # [10, 200, 300, 40]
```

---

## 11. Adding Elements: `append()`, `insert()`, `extend()`

### 1. `append(value)`
Adds a single object to the end of the list:
```python
numbers = [10, 20, 30]
numbers.append(40)
print(numbers)  # [10, 20, 30, 40]
```

### 2. `insert(index, value)`
Inserts an element at a specified index, shifting existing items to the right:
```python
numbers = [10, 20, 30]
numbers.insert(1, 15)
print(numbers)  # [10, 15, 20, 30]
```

### 3. `extend(iterable)`
Unpacks and adds all items from another collection:
```python
numbers = [10, 20]
numbers.extend([30, 40, 50])
print(numbers)  # [10, 20, 30, 40, 50]
```

### Crucial Distinction: `append()` vs `extend()`
```python
a = [10, 20]
a.append([30, 40])
print(a)  # [10, 20, [30, 40]] -> Nested sublist!

b = [10, 20]
b.extend([30, 40])
print(b)  # [10, 20, 30, 40]   -> Flat sequence!
```

---

## 12. Removing Elements: `remove()`, `pop()`, `del`

| Operation | Mechanism | Returns Value? | Example |
| :--- | :--- | :--- | :--- |
| **`remove(val)`** | Removes first occurrence of matching *value* | No | `lst.remove(20)` |
| **`pop([idx])`** | Removes and returns item at *index* (default: last) | Yes | `val = lst.pop()` |
| **`del lst[idx]`** | Deletes item or slice from memory by *index* | No | `del lst[1]` |

```python
numbers = [10, 20, 30, 20, 40]

# Remove by value:
numbers.remove(20)
print(numbers)  # [10, 30, 20, 40] (Only first 20 removed)

# Pop last element:
popped = numbers.pop()
print(popped)   # 40
print(numbers)  # [10, 30, 20]

# Pop by index:
val = numbers.pop(1)
print(val)      # 30
print(numbers)  # [10, 20]

# Delete with del:
del numbers[0]
print(numbers)  # [20]
```

---

## 13. Membership Testing and Length

### Checking Membership (`in`, `not in`)
```python
numbers = [10, 20, 30]

print(20 in numbers)       # True
print(50 in numbers)       # False
print(50 not in numbers)   # True
```

### Finding Length (`len()`)
```python
print(len(numbers))  # 3
```

---

## 14. Traversing Lists

### Approach 1: Direct Value Traversal (Recommended)
```python
languages = ["Python", "JavaScript", "Rust"]
for lang in languages:
    print(lang)
```

### Approach 2: Index-Based Traversal
```python
for i in range(len(languages)):
    print(f"Index {i}: {languages[i]}")
```

### Approach 3: Dual Traversal (`enumerate`)
```python
for index, lang in enumerate(languages):
    print(f"{index} -> {lang}")
```

---

## 15. Aliasing vs Cloning (Important!)

Assigning one list variable to another does **not** make a copy. Both variables point to the exact same list in memory:

```python
a = [10, 20, 30]
b = a  # Aliasing (shares memory)
b[0] = 999
print(a)  # [999, 20, 30] -> 'a' was modified!
```

To create an independent copy:
```python
a = [10, 20, 30]
b = a.copy()  # or b = a[:]
b[0] = 999
print(a)  # [10, 20, 30] -> 'a' remains unchanged!
print(b)  # [999, 20, 30]
```

---

## 16. Practical Application Programs

### Program 1: Building a Dynamic Student Roster
```python
students = []
count = int(input("Enter number of students: "))

for _ in range(count):
    name = input("Enter name: ")
    students.append(name)

print("Enrolled Students:", students)
```

### Program 2: Safe Element Removal
```python
students = ["Arun", "Meena", "Kumar"]
target = input("Enter student to remove: ")

if target in students:
    students.remove(target)
    print(f"Removed {target}")
else:
    print(f"{target} not found in roster.")
```

### Program 3: Extremum Search via Traversal
```python
marks = [78, 95, 62, 88, 71]

highest = marks[0]
for m in marks:
    if m > highest:
        highest = m

print("Highest Mark:", highest)  # 95
```

---

## 17. Strings vs Lists Comparison

| Feature | String (`str`) | List (`list`) |
| :--- | :--- | :--- |
| **Syntax** | `"Python"` or `'Python'` | `[10, 20, 30]` |
| **Element Types** | Characters only | Any Python object |
| **Mutability** | **Immutable** | **Mutable** |
| **In-Place Assignment** | `s[0] = 'X'` $\rightarrow$ **TypeError** | `lst[0] = 'X'` $\rightarrow$ **Valid** |
| **`append()` / `pop()`** | Not supported | Supported |
| **Indexing & Slicing** | Yes | Yes |

---

## 18. Common Beginner Mistakes

1. **`IndexError`**: Attempting `lst[len(lst)]` (remember valid indices stop at `len - 1`).
2. **Tuples instead of Lists**: Writing `coords = (10, 20)` (parentheses create immutable tuples, not lists).
3. **`remove()` with an Index**: `lst.remove(1)` searches for the **value** 1, not index 1. Use `lst.pop(1)` or `del lst[1]`.
4. **Modifying During Iteration**: Removing items from a list while looping over it skips elements. Iterate over a copy (`lst.copy()`) instead.
5. **Treating Aliases as Copies**: Assuming `b = a` creates an isolated duplicate.

---

## 19. Quick Student Workout

### Workout 1
Create `[10, 20, 30, 40, 50]` and print the first and last elements.  
*Answer:* `nums[0]` is 10, `nums[-1]` is 50.

### Workout 2
Update 20 to 200 in `[10, 20, 30]`.  
*Answer:* `nums[1] = 200` $\rightarrow$ `[10, 200, 30]`.

### Workout 3
Extract `[20, 30, 40]` from `[10, 20, 30, 40, 50]`.  
*Answer:* `nums[1:4]`.

### Workout 4
Reverse `[1, 2, 3, 4, 5]`.  
*Answer:* `nums[::-1]` $\rightarrow$ `[5, 4, 3, 2, 1]`.

---

## 20. Unit-III Day 1 Cheat Sheet

| Task | Code Syntax | Result |
| :--- | :--- | :--- |
| **Create List** | `lst = [10, 20, 30]` | Creates list |
| **Empty List** | `lst = []` | Initializes empty container |
| **Access Index** | `lst[0]`, `lst[-1]` | First item, last item |
| **Slice** | `lst[1:3]` | Sublist from index 1 to 2 |
| **Reverse** | `lst[::-1]` | Reversed sublist |
| **Update Item** | `lst[0] = 99` | In-place mutation |
| **Append** | `lst.append(40)` | Adds to end |
| **Insert** | `lst.insert(1, 15)` | Adds at index 1 |
| **Extend** | `lst.extend([50, 60])` | Appends multiple items |
| **Remove Value** | `lst.remove(20)` | Removes first matching value |
| **Pop Index** | `lst.pop(1)` | Removes and returns item |
| **Delete** | `del lst[0]` | Deletes item |
| **Length** | `len(lst)` | Returns element count |
| **Search** | `val in lst` | Returns True/False |

---

## 21. Day 1 Capstone Challenge: Student List Manager

```python
size = int(input("Enter number of students: "))
students = []

for _ in range(size):
    students.append(input("Enter student name: "))

print("Students =", students)
print("First student =", students[0])
print("Last student =", students[-1])

new_student = input("Enter new student: ")
students.append(new_student)
print("After adding:")
print(students)

remove_target = input("Enter student to remove: ")
if remove_target in students:
    students.remove(remove_target)
    print("After removing:")
    print(students)
else:
    print("Student not found")
    print("Final list:")
    print(students)
```

> **Takeaway:** Lists are versatile, mutable sequence structures. Learning to store, index, slice, append, and remove elements gives you complete command over collection data processing in Python!
