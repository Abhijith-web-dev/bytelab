# Unit–II — Day 4: for Loop, Loop Control & Nested Loops

**Duration:** 90 Minutes  
**Level:** Beginner → Intermediate  
**Unit:** Unit–II — Control Flow  
**Day:** 4  
**Topics:** `for` Loop; `break`, `continue`, `pass` Statements; Nested Loops; Loop-Based Problem Solving  

---

## 1. Day 4 Learning Objectives

By the end of this session, students should be able to:
- Understand the primary purpose of a `for` loop in Python.
- Traverse sequences including **lists, tuples, strings, and dictionaries**.
- Understand how Python handles iteration internally across iterables.
- Use the **`range()`** function with single, dual, and three arguments (`start`, `stop`, `step`).
- Control loops cleanly using:
  - **`break`:** Stop the loop immediately.
  - **`continue`:** Skip the current cycle.
  - **`pass`:** Act as a syntactical placeholder that does nothing.
- Differentiate between the precise behaviors of `break`, `continue`, and `pass`.
- Construct and trace **nested loops** (`for` within `for`).
- Understand how outer and inner loop cycles coordinate (inner loop finishes fully per outer iteration).
- Generate patterns, grids, and traverse multi-dimensional data (matrices).
- Systematically architect solutions combining `for`, `if`, collections, and functions.

---

## 2. 90-Minute Session Plan

| Time | Topic | Activity |
| --- | --- | --- |
| 0–5 min | Day 3 recap | Review `while` loops, states, and condition updates |
| 5–18 min | `for` loop | Basic syntax and "for each item" mental model |
| 18–30 min | Traversing collections | `for` with lists, strings, tuples, and dictionaries |
| 30–40 min | `range()` | Generating numeric sequences (`start`, `stop`, `step`) |
| 40–52 min | `break`, `continue`, `pass` | Triad of loop control statements |
| 52–65 min | Nested loops | Outer loop coordination with inner loop cycles |
| 65–75 min | Illustrative programs | Patterns, matrices, classroom seating grids |
| 75–80 min | Problem solving | Trace, debug, and avoid off-by-one errors |
| 80–87 min | Moodle practice | Even and Odd Numbers coding problem |
| 87–90 min | Quiz | 10-question mastery assessment |

---

## 3. Quick Recap from Day 3

In Day 3, we examined the `while` loop:

```python
count = 1
while count <= 5:
    print(count)
    count += 1
```

A `while` loop requires manual state management:
```text
Initialization ──► Condition Check ──► Work Body ──► State Update (+= 1)
```

Today, we introduce Python's most natural, elegant repetition construct: the **`for` loop**.

---

## 4. What is a `for` Loop?

A `for` loop is designed to iterate through an **iterable collection**, executing a block of code once for each element.

> **Mental Model:** Think of `for` as meaning: **"For each item in this collection, do the following."**

```python
numbers = [10, 20, 30]

for number in numbers:
    print(number)
```
**Output:**
```
10
20
30
```

Python automatically fetches each element one by one from start to finish.

---

## 5. Basic `for` Loop Syntax

```python
for variable in sequence:
    statement_block
```

### Example
```python
fruits = ["Apple", "Banana", "Mango"]

for fruit in fruits:
    print(fruit)
```
**Output:**
```
Apple
Banana
Mango
```

### Anatomical Breakdown
| Component | Role |
| :--- | :--- |
| **`for`** | Initiates the iteration construct |
| **`fruit`** | The target loop variable bound to the current item on each cycle |
| **`in`** | Membership keyword connecting the variable to the iterable |
| **`fruits`** | The sequence or iterable collection being traversed |
| **`:`** | Demarcates the header and opens the indented loop body |

---

## 6. How a `for` Loop Works Internally

```text
fruits = ["Apple", "Banana", "Mango"]
                      │
                      ▼
               Take "Apple"
                      │
              print("Apple")
                      │
                      ▼
               Take "Banana"
                      │
              print("Banana")
                      │
                      ▼
               Take "Mango"
                      │
              print("Mango")
                      │
                      ▼
               No more items
                      │
                      ▼
             Terminate cleanly!
```

Unlike counter-driven `while` loops, you **do not need to manually increment an index** or guard against infinite loops when iterating over finite sequences!

---

## 7. `for` Loop with a List

Traversing list elements sequentially is known as **list traversal**:

```python
students = ["Arun", "Priya", "Rahul"]

for student in students:
    print("Enrolled Student:", student)
```
**Output:**
```
Enrolled Student: Arun
Enrolled Student: Priya
Enrolled Student: Rahul
```

---

## 8. `for` Loop with a Tuple

Because tuples are ordered sequences, they are iterated identically to lists:

```python
marks = (80, 75, 90)

for mark in marks:
    print("Exam Mark:", mark)
```
**Output:**
```
Exam Mark: 80
Exam Mark: 75
Exam Mark: 90
```

---

## 9. `for` Loop with a String

Strings are ordered sequences of Unicode characters:

```python
word = "Python"

for letter in word:
    print(letter)
```
**Output:**
```
P
y
t
h
o
n
```

---

## 10. `for` Loop with a Dictionary

Iterating directly over a dictionary traverses its **keys**:

```python
student = {
    "name": "Arun",
    "age": 20,
    "mark": 85
}

for key in student:
    print(key)
```
**Output:**
```
name
age
mark
```

To access both key and value simultaneously, use `.items()`:
```python
for key, value in student.items():
    print(f"{key}: {value}")
```
**Output:**
```
name: Arun
age: 20
mark: 85
```

---

## 11. `for` Loop with `range()`

When you need to execute code a specific number of times or generate a sequence of numbers, use the built-in **`range()`** function:

```python
for i in range(5):
    print(i)
```
**Output:**
```
0
1
2
3
4
```
> **Notice:** `range(5)` starts at `0` and stops **before** `5`. It produces exactly 5 items: `0, 1, 2, 3, 4`.

---

## 12. Understanding the `range()` Function

`range()` supports three distinct call signatures:

### 1. `range(stop)`
Begins at `0`, increments by `1`, stops at `stop - 1`.
```python
range(5)  # 0, 1, 2, 3, 4
```

### 2. `range(start, stop)`
Begins at `start`, increments by `1`, stops at `stop - 1`.
```python
range(2, 6)  # 2, 3, 4, 5
```

### 3. `range(start, stop, step)`
Begins at `start`, increments by `step`, stops before reaching or passing `stop`.
```python
range(1, 10, 2)  # 1, 3, 5, 7, 9
```

---

## 13. Practical `range()` Examples

### Printing 1 to 5
```python
for number in range(1, 6):
    print(number)
```

### Generating Even Numbers
```python
for number in range(2, 11, 2):
    print(number)
# 2, 4, 6, 8, 10
```

### Counting Backwards (Negative Step)
```python
for number in range(5, 0, -1):
    print(number)
# 5, 4, 3, 2, 1
```

---

## 14. Combining `for` Loops with `if`

Filter items dynamically as you traverse:

```python
numbers = [10, 15, 20, 25, 30]

for number in numbers:
    if number % 2 == 0:
        print(f"{number} is Even")
```
**Output:**
```
10 is Even
20 is Even
30 is Even
```

---

## 15. The `break` Statement in `for` Loops

The `break` statement **terminates the entire loop immediately**:

```python
for number in range(1, 10):
    if number == 5:
        break
    print(number)
```
**Output:**
```
1
2
3
4
```

---

## 16. Practical Application: Linear Search with `break`

Once a target item is located, there is no need to examine the remaining elements:

```python
products = ["Mouse", "Keyboard", "Laptop", "Monitor"]

for product in products:
    if product == "Laptop":
        print("Product Found in Inventory!")
        break
```
**Output:**
```
Product Found in Inventory!
```

---

## 17. The `continue` Statement in `for` Loops

The `continue` statement **cancels the rest of the current iteration** and skips to the next item:

```python
for number in range(1, 6):
    if number == 3:
        continue
    print(number)
```
**Output:**
```
1
2
4
5
```

---

## 18. Practical Application: Filtering Invalid Data with `continue`

Suppose `-1` denotes missing or invalid sensor readings:

```python
marks = [80, -1, 75, 90, -1]

for mark in marks:
    if mark == -1:
        continue  # Ignore invalid sentinel data
    print("Valid Mark:", mark)
```
**Output:**
```
Valid Mark: 80
Valid Mark: 75
Valid Mark: 90
```

---

## 19. The `pass` Statement

In Python, **`pass` is a null statement**. It does absolutely nothing when executed.

```python
for number in range(1, 5):
    if number == 3:
        pass  # Placeholder: do nothing
    else:
        print(number)
```
**Output:**
```
1
2
4
```

---

## 20. Why Do We Need `pass`?

Python uses whitespace indentation to define syntax blocks. If you write an empty block, Python raises an `IndentationError`:

```python
# SYNTAX ERROR:
def calculate_salary():
    # Empty body raises IndentationError!

# CORRECT:
def calculate_salary():
    pass  # Valid syntactical stub for future implementation
```

Use `pass` whenever syntactical rules require a statement, but your program logic requires no action.

---

## 21. Comparative Triad: `break` vs `continue` vs `pass`

| Statement | Action Performed | What Happens Next? |
| --- | --- | --- |
| **`break`** | **STOPS** the loop completely | Execution exits to code after the loop |
| **`continue`** | **SKIPS** the current cycle | Loop advances immediately to the next item |
| **`pass`** | **DOES NOTHING** (placeholder) | Execution proceeds to the next line in order |

---

## 22. Comprehensive Example Demonstrating All Three

```python
for number in range(1, 6):
    if number == 2:
        continue  # Skip 2
    if number == 3:
        pass      # Do nothing; keep executing
    if number == 4:
        break     # Halt on 4

    print(number)
```
**Output:**
```
1
3
```

### Execution Flow
- `1` $\rightarrow$ No conditions match $\rightarrow$ prints `1`
- `2` $\rightarrow$ Hits `continue` $\rightarrow$ skips `print(2)`
- `3` $\rightarrow$ Hits `pass` $\rightarrow$ continues down $\rightarrow$ prints `3`
- `4` $\rightarrow$ Hits `break` $\rightarrow$ terminates loop!
- `5` $\rightarrow$ Never evaluated.

---

## 23. What are Nested Loops?

A **nested loop** is a loop placed inside the body of another loop.

```python
for i in range(3):
    for j in range(2):
        print(f"i={i}, j={j}")
```
**Output:**
```
i=0, j=0
i=0, j=1
i=1, j=0
i=1, j=1
i=2, j=0
i=2, j=1
```

---

## 24. Understanding Nested Loop Mechanics

> **The Fundamental Law of Nested Loops:** For **every single iteration** of the outer loop, the inner loop executes its **entire cycle** from beginning to end!

```text
Outer i = 0 ──► Inner runs: j=0, j=1
Outer i = 1 ──► Inner runs: j=0, j=1
Outer i = 2 ──► Inner runs: j=0, j=1
Total cycles = 3 outer * 2 inner = 6 total executions!
```

---

## 25. Multiplication Table Matrix

```python
for i in range(1, 4):
    for j in range(1, 4):
        print(f"{i * j:2}", end=" ")
    print()  # Newline after each row
```
**Output:**
```
 1  2  3 
 2  4  6 
 3  6  9 
```

---

## 26. Pattern Printing: Square of Stars

```python
for i in range(3):
    for j in range(3):
        print("*", end=" ")
    print()
```
**Output:**
```
* * * 
* * * 
* * * 
```

---

## 27. Pattern Printing: Triangle of Stars

When the inner loop range depends on the outer loop variable `i`:

```python
for i in range(1, 5):
    for j in range(i):
        print("*", end=" ")
    print()
```
**Output:**
```
* 
* * 
* * * 
* * * * 
```

---

## 28. Matrix and 2D List Processing

Nested lists (tables or matrices) are naturally traversed with nested loops:

```python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

for row in matrix:
    for cell in row:
        print(cell, end=" ")
    print()
```
**Output:**
```
1 2 3 
4 5 6 
7 8 9 
```

---

## 29. Real-World Example: Classroom Seating Grid

```python
for row in range(1, 4):
    for seat in range(1, 5):
        print(f"[Row {row}, Seat {seat}]", end=" ")
    print()
```
**Output:**
```
[Row 1, Seat 1] [Row 1, Seat 2] [Row 1, Seat 3] [Row 1, Seat 4] 
[Row 2, Seat 1] [Row 2, Seat 2] [Row 2, Seat 3] [Row 2, Seat 4] 
[Row 3, Seat 1] [Row 3, Seat 2] [Row 3, Seat 3] [Row 3, Seat 4] 
```

---

## 30. Step-by-Step Loop Problem-Solving Strategy

1. **What must repeat?** Identify the core repetitive unit of work.
2. **What collection are we traversing?** Known collection $\rightarrow$ `for`; condition-based $\rightarrow$ `while`.
3. **Are filters required?** Combine with `if` inside the loop body.
4. **Is early exit required?** Use `break` when target found or sentinel hit.
5. **Should unwanted data be skipped?** Use `continue` for clean filtering.
6. **Is the data multi-dimensional?** Use nested loops (outer = rows, inner = columns).

---

## 31. `for` vs `while` Cheat Sheet

| Feature | `for` Loop | `while` Loop |
| --- | --- | --- |
| **Best Used For** | Definite iteration over sequences | Indefinite condition-based repetition |
| **Index / Variable** | Automatically bound per item | Manually initialized and updated |
| **Infinite Loop Risk** | Extremely low on finite sequences | High if update step is omitted |
| **Primary Examples** | `for x in list:`, `for i in range(n):` | `while valid == False:`, `while count > 0:` |

---

## 32. Common Beginner Mistakes

### Mistake 1: Expecting `range(1, 5)` to include 5
`range(1, 5)` stops at `4`. To include `5`, write `range(1, 6)`.

### Mistake 2: Thinking `pass` skips an iteration
`pass` does nothing! Code following `pass` in the same iteration still executes. To skip, use `continue`.

### Mistake 3: Misaligned nested loop indentation
```python
# BUG: Inner loop at same indentation as outer!
for i in range(3):
for j in range(3):  # IndentationError!
```

---

## 33. Quick Student Workout

### Workout 1
```python
for i in range(3):
    print(i)
```
*Answer:* `0`, `1`, `2`

### Workout 2
```python
for i in range(1, 5):
    if i == 3:
        continue
    print(i)
```
*Answer:* `1`, `2`, `4`

### Workout 3
```python
for i in range(1, 6):
    if i == 4:
        break
    print(i)
```
*Answer:* `1`, `2`, `3`

### Workout 4
```python
for i in range(2):
    for j in range(2):
        print(i, j)
```
*Answer:* `0 0`, `0 1`, `1 0`, `1 1`

---

## 34. Unit-II Day 4 Cheat Sheet

| Keyword | Function | Example |
| --- | --- | --- |
| **`for`** | Iterate over sequence | `for x in [1, 2, 3]:` |
| **`range(n)`** | Numbers `0` to `n - 1` | `range(5)` $\rightarrow$ `0, 1, 2, 3, 4` |
| **`break`** | Terminate loop immediately | `if found: break` |
| **`continue`** | Skip to next iteration | `if val < 0: continue` |
| **`pass`** | Null statement placeholder | `if ready: pass` |
| **Nested Loop** | Loop inside a loop | Outer advances after inner finishes |

---

## 35. Day 4 Capstone Challenge

Predict the output before running:

```python
numbers = [10, 15, 20, 25]

for number in numbers:
    if number == 20:
        continue
    if number == 25:
        break
    print(number)
```

### Trace
- `10` $\rightarrow$ passes checks $\rightarrow$ prints `10`
- `15` $\rightarrow$ passes checks $\rightarrow$ prints `15`
- `20` $\rightarrow$ hits `continue` $\rightarrow$ skips `print(20)`
- `25` $\rightarrow$ hits `break` $\rightarrow$ loop terminates immediately!

**Final Output:**
```
10
15
```

> **Takeaway:** The `for` loop, combined with `break`, `continue`, `pass`, and nested iteration, provides complete mastery over complex data processing in Python!
