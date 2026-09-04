# Unit–V — Day 3: NumPy Array Indexing and Slicing

**Duration:** 90 Minutes  
**Teaching Focus:** 45 Minutes Concept Teaching + 20 Minutes Practice + 25 Minutes Review, Quiz and Practical Work  
**Level:** Beginner  
**Unit:** Unit–V — NumPy  
**Day:** 3 (Day 51 of 65)  

---

## 1. Learning Objectives

By the end of this session, students should be able to:

1. **Understand** what indexing means in array data structures.
2. **Access** individual elements from a 1D and 2D NumPy array.
3. **Use** positive and negative indexes with confidence.
4. **Access** elements from 1D arrays cleanly.
5. **Understand** 2D array indexing using coordinate pairs `[row, column]`.
6. **Select** complete rows (`array[i]`) and columns (`array[:, j]`).
7. **Understand** slicing mechanics and interval notation.
8. **Use** basic slicing syntax (`start:stop` and `start:stop:step`).
9. **Select** a continuous or stepped range of numerical values.
10. **Use** row and column slices together in 2D arrays (`array[row_slice, col_slice]`).
11. **Perform** simple arithmetic operations on selected array values in-place.
12. **Apply** indexing and slicing to real-world numerical datasets (student marks, temperature telemetry, weekly sales).

---

## 2. 90-Minute Session Plan

| Time Window | Topic | Pedagogical Activity & Focus |
|---|---|---|
| **0–5 min** | **Day 2 Recap** | Shape, dimensions, and `reshape()` rule verification. |
| **5–15 min** | **Indexing Basics** | Concept of 0-based coordinate positions; accessing one value. |
| **15–25 min** | **1D Indexing** | Positive indexing vs negative indexing (`[-1]`, `[-2]`). |
| **25–35 min** | **Slicing Basics** | Selecting ranges (`start:stop`), start-included / stop-excluded rule. |
| **35–45 min** | **2D Indexing** | Rows and columns `[row, column]`; coordinate intuition. |
| **45–52 min** | **Guided Example** | Student marks matrix walkthrough. |
| **52–65 min** | **Practical Programs** | Updating elements, weekly sales, temperature extraction, in-place bonuses. |
| **65–72 min** | **2D Slicing** | Selecting sub-matrices, row and column combinations. |
| **72–78 min** | **Common Errors** | Diagnosing `IndexError`, off-by-one errors, and colon omission. |
| **78–85 min** | **Moodle Practice** | Hands-on coding problem: *Student Marks Selector*. |
| **85–90 min** | **Quiz & Revision** | 10-question knowledge check and cheat sheet recap. |

---

## 3. Quick Recap from Day 2

Yesterday in Day 2, we mastered:

```python
import numpy as np

# Creating an array:
numbers = np.array([10, 20, 30, 40, 50, 60])

# Checking shape:
print(numbers.shape)  # Output: (6,)

# Reshaping:
grid = numbers.reshape(2, 3)
```

Visualizing the transformation:

```text
[10 20 30 40 50 60]
        ↓
[[10 20 30]
 [40 50 60]]
```

Today we answer the vital question:
> **How can we get exactly the specific values, rows, or columns we want from an array without scanning the entire structure?**

That is where **indexing** and **slicing** come in.

---

## 4. What is Indexing?

**Indexing** means accessing a specific element of an array using its position (index).

Consider this 1D array:

```python
import numpy as np

numbers = np.array([10, 20, 30, 40])
```

The positions are mapped as follows:

```text
Index:    0    1    2    3
        ┌────┬────┬────┬────┐
Value:  │ 10 │ 20 │ 30 │ 40 │
        └────┴────┴────┴────┘
```

So:

```python
print(numbers[0])
```

returns:

```text
10
```

---

## 5. Remember: Indexing Starts at 0

This is the golden rule of computer programming in Python:

$$\text{First Position} = \text{Index } 0$$

For `[10, 20, 30, 40]`, the indices are:
- `10 → index 0`
- `20 → index 1`
- `30 → index 2`
- `40 → index 3`

> [!IMPORTANT]
> The first element is **never** at index 1! If you ask for `numbers[1]`, you will receive `20`, which is the second item.

---

## 6. Accessing Elements from a 1D Array

```python
import numpy as np

numbers = np.array([10, 20, 30, 40, 50])

print(numbers[0])
print(numbers[2])
print(numbers[4])
```

**Output:**
```text
10
30
50
```

---

## 7. Accessing the Last Element

In Python, you do not need to calculate the length of an array to grab its final item. We use negative index `-1`:

```python
import numpy as np

numbers = np.array([10, 20, 30, 40, 50])

print(numbers[-1])
```

**Output:**
```text
50
```

---

## 8. Negative Indexing

Negative indexes count backwards from the end of the array:

```text
Index:     0    1    2    3    4
Value:    10   20   30   40   50
Negative: -5   -4   -3   -2   -1
```

- `numbers[-1]` means the **last** element (`50`).
- `numbers[-2]` means the **second-to-last** element (`40`).
- `numbers[-5]` means the **first** element (`10`).

---

## 9. Positive vs Negative Indexing

| Feature | Positive Index | Negative Index |
|---|---|---|
| **Direction** | Starts from the beginning (left to right) | Starts from the end (right to left) |
| **Starting Index** | First element = `0` | Last element = `-1` |
| **Example** | `numbers[0] → 10` | `numbers[-1] → 50` |
| **Use Case** | When you know the position from start | When you need the latest/tail records |

---

## 10. Real-World Example — Student Marks

```python
import numpy as np

marks = np.array([85, 72, 90, 65, 88])
```

Suppose:
- Index 0 → Student 1 mark
- Index 1 → Student 2 mark
- Index 2 → Student 3 mark
- Index 3 → Student 4 mark
- Index 4 → Student 5 mark

Access the third student's mark:

```python
print(marks[2])  # Output: 90
```

---

## 11. Updating an Element

NumPy arrays are mutable. You can reassign any element using indexing:

```python
import numpy as np

marks = np.array([80, 70, 90])
marks[1] = 85
print(marks)
```

**Output:**
```text
[80 85 90]
```

The value at index 1 changed cleanly from `70` to `85`.

---

## 12. Practical Example — Correcting Temperature

```python
import numpy as np

temperature = np.array([28, 30, 31, 29, 27])

# Suppose the second reading was recorded incorrectly as 30 instead of 32:
temperature[1] = 32
print(temperature)
```

**Output:**
```text
[28 32 31 29 27]
```

Indexing allows instantaneous calibration of specific data points.

---

## 13. What is Slicing?

**Slicing** means selecting a continuous or stepped range of elements from an array.

**Basic Syntax:**
```python
array[start:stop]
```

```python
import numpy as np

numbers = np.array([10, 20, 30, 40, 50])
print(numbers[1:4])
```

**Output:**
```text
[20 30 40]
```

---

## 14. The Most Important Slicing Rule

In `numbers[start:stop]`:

$$\text{start} \rightarrow \textbf{INCLUDED}$$
$$\text{stop} \rightarrow \textbf{EXCLUDED}$$

```text
numbers[1:4]
  → Index 1: Included (20)
  → Index 2: Included (30)
  → Index 3: Included (40)
  → Index 4: Excluded!
```

---

## 15. Slicing Visual Example

```text
Index:     0    1    2    3    4
          ┌────┬────┬────┬────┬────┐
Value:    │ 10 │ 20 │ 30 │ 40 │ 50 │
          └────┴────┴────┴────┴────┘
                ↑────────────↑
                 1:4

Result:   [20 30 40]
```

---

## 16. More Slicing Examples

```python
numbers = np.array([10, 20, 30, 40, 50])

# First 3 elements:
print(numbers[0:3])  # [10 20 30]

# Omit start: defaults to 0
print(numbers[:3])   # [10 20 30]

# From index 2 to the end: omit stop
print(numbers[2:])   # [30 40 50]
```

---

## 17. Slicing with Step

Slicing also supports a step interval:

```python
array[start:stop:step]
```

```python
numbers = np.array([10, 20, 30, 40, 50, 60])
print(numbers[0:6:2])  # Output: [10 30 50]
```

It steps by 2, picking every second element.

---

## 18. Reverse an Array with Slicing

A negative step reverses the array:

```python
numbers = np.array([10, 20, 30, 40])
print(numbers[::-1])  # Output: [40 30 20 10]
```

---

## 19. Indexing vs Slicing

| Concept | Syntax | What it Returns | Dimensionality |
|---|---|---|---|
| **Indexing** | `numbers[2]` | A single element (`30`) | Reduces dimension (scalar) |
| **Slicing** | `numbers[1:4]` | A range of elements (`[20 30 40]`) | Preserves array dimension |

> [!TIP]
> **Easy Memory:**  
> Indexing $\rightarrow$ **ONE**  
> Slicing $\rightarrow$ **MANY**

---

## 20. Real-World Example — Weekly Sales

```python
import numpy as np

# Mon, Tue, Wed, Thu, Fri, Sat, Sun
sales = np.array([120, 150, 180, 140, 200, 220, 250])

# Friday sales (Index 4):
print("Friday:", sales[4])  # 200

# Weekday sales (Monday to Friday, indices 0 to 4):
print("Weekdays:", sales[0:5])  # [120 150 180 140 200]
```

---

## 21. Two-Dimensional Array Indexing

Consider a matrix of marks for 3 students across 3 subjects:

```python
import numpy as np

marks = np.array([
    [80, 75, 90],
    [70, 85, 88],
    [92, 78, 95]
])
```

Visual representation:

```text
             Column
             0    1    2
           ┌────┬────┬────┐
Row 0      │ 80 │ 75 │ 90 │
           ├────┼────┼────┤
Row 1      │ 70 │ 85 │ 88 │
           ├────┼────┼────┤
Row 2      │ 92 │ 78 │ 95 │
           └────┴────┴────┘
```

---

## 22. Accessing a 2D Element

**Syntax:**
```python
array[row, column]
```

```python
print(marks[0, 0])  # Row 0, Col 0 -> 80
```

---

## 23. More 2D Examples

```python
print(marks[0, 2])  # Row 0, Col 2 -> 90
print(marks[1, 1])  # Row 1, Col 1 -> 85
print(marks[2, 0])  # Row 2, Col 0 -> 92
```

---

## 24. Visualizing `marks[1, 2]`

```text
             0    1    2
           ┌────┬────┬────┐
      0    │ 80 │ 75 │ 90 │
           ├────┼────┼────┤
      1    │ 70 │ 85 │█88█│  ← Row 1, Column 2 = 88
           ├────┼────┼────┤
      2    │ 92 │ 78 │ 95 │
           └────┴────┴────┘
```

---

## 25. Selecting a Complete Row

In a 2D array, specifying a single index selects that whole row:

```python
print(marks[0])  # Output: [80 75 90]
```

This means: *"Give me the entire row 0."*

---

## 26. Selecting Another Row

```python
print(marks[2])  # Output: [92 78 95]
```

This returns all marks for the third student (row 2).

---

## 27. Selecting a Complete Column

To extract an entire column across all rows, use the colon `:` in the row position:

```python
array[:, column]
```

```python
print(marks[:, 0])  # Output: [80 70 92]
```

---

## 28. Selecting Another Column

```python
print(marks[:, 2])  # Output: [90 88 95]
```

This extracts the third column (Science marks for all students).

---

## 29. Understanding the `:` Symbol

In `marks[:, 0]`:
- The `:` in the first position means **"all rows"**.
- The `0` in the second position means **"column 0"**.
- Together, it yields: **All rows at column 0**.

---

## 30. Row vs Column Selection Summary

| Goal | Syntax | Example | Result |
|---|---|---|---|
| **One Element** | `array[row, col]` | `marks[1, 2]` | `88` |
| **Complete Row** | `array[row]` | `marks[1]` | `[70 85 88]` |
| **Complete Column** | `array[:, col]` | `marks[:, 1]` | `[75 85 78]` |

---

## 31. 2D Slicing: Sub-Matrices

We can select multiple rows and columns simultaneously.

To select rows 0 and 1 across all columns:

```python
print(marks[0:2, :])
```

**Output:**
```text
[[80 75 90]
 [70 85 88]]
```

---

## 32. Selecting Rows and Columns Together

```python
print(marks[0:2, 1:3])
```

**Output:**
```text
[[75 90]
 [85 88]]
```

**Why?**
- Rows selected: `0, 1` (stop 2 excluded)
- Columns selected: `1, 2` (stop 3 excluded)

---

## 33. Visualizing 2D Slicing

```text
Original Matrix:
           0    1    2
        ┌────┬────┬────┐
   0    │ 80 │ 75 │ 90 │
        ├────┼────┼────┤
   1    │ 70 │ 85 │ 88 │
        ├────┼────┼────┤
   2    │ 92 │ 78 │ 95 │
        └────┴────┴────┘

For marks[0:2, 1:3]:
        ┌────┬────┐
        │ 75 │ 90 │
        ├────┼────┤
        │ 85 │ 88 │
        └────┴────┘
```

---

## 34. Real-World Example — Student Table

Imagine this grade sheet:

```text
             Maths   English   Science
Arun          80       75        90
Priya         70       85        88
Rahul         92       78        95
```

```python
import numpy as np

marks = np.array([
    [80, 75, 90],
    [70, 85, 88],
    [92, 78, 95]
])

# Arun's marks (Row 0):
print("Arun:", marks[0])

# Maths marks (Column 0):
print("Maths:", marks[:, 0])

# Rahul's Science mark (Row 2, Column 2):
print("Rahul Science:", marks[2, 2])
```

---

## 35. Practical Program — Select Student Marks

```python
import numpy as np

marks = np.array([
    [80, 75, 90],
    [70, 85, 88],
    [92, 78, 95]
])

print("First student:", marks[0])
print("Second student:", marks[1])
print("Maths marks:", marks[:, 0])
```

**Output:**
```text
First student: [80 75 90]
Second student: [70 85 88]
Maths marks: [80 70 92]
```

---

## 36. Practical Program — Add Bonus to Selected Data

```python
import numpy as np

marks = np.array([80, 70, 90, 85, 75])

# Add 5 bonus marks ONLY to the first three students:
marks[0:3] = marks[0:3] + 5
print(marks)
```

**Output:**
```text
[85 75 95 85 75]
```

This combines **slicing**, **vector arithmetic**, and **in-place updating**.

---

## 37. Practical Program — Update One Element

```python
import numpy as np

scores = np.array([50, 60, 70, 80])
scores[2] = 100
print(scores)  # Output: [ 50  60 100  80]
```

---

## 38. Practical Program — Select Weekdays

```python
import numpy as np

sales = np.array([100, 120, 130, 110, 150, 170, 200])
weekdays = sales[0:5]
print("Weekday Sales:", weekdays)
```

**Output:**
```text
Weekday Sales: [100 120 130 110 150]
```

---

## 39. Practical Program — First Three Temperatures

```python
import numpy as np

temperature = np.array([28, 30, 31, 29, 27, 32])
first_three = temperature[:3]
print("First three:", first_three)  # Output: [28 30 31]
```

---

## 40. Practical Program — Last Three Values

```python
last_three = temperature[-3:]
print("Last three:", last_three)  # Output: [29 27 32]
```

---

## 41. Practical Program — Highest Row Data

```python
marks = np.array([
    [80, 75, 90],
    [70, 85, 88],
    [92, 78, 95]
])

third_student = marks[2]
print("Third Student:", third_student)  # Output: [92 78 95]
```

---

## 42. Practical Program — Select One Subject

```python
# Column 1 is English:
english = marks[:, 1]
print("English:", english)  # Output: [75 85 78]
```

---

## 43. Practical Program — Calculate Selected Column Average

```python
english = marks[:, 1]
average = english.mean()
print("English Average:", average)  # Output: 79.33333333333333
```

---

## 44. Practical Program — Select Part of a Table

```python
selected = marks[0:2, 0:2]
print(selected)
```

**Output:**
```text
[[80 75]
 [70 85]]
```

---

## 45. Indexing and Slicing Together

For `numbers = np.array([10, 20, 30, 40, 50])`:

- `numbers[2]   → 30` (Single value)
- `numbers[1:4] → [20 30 40]` (Range)
- `numbers[-1]  → 50` (Last value)
- `numbers[-2:] → [40 50]` (Last two values)

---

## 46. Important Difference: Index vs Slice

```python
val = numbers[2]       # Returns scalar 30
sub_arr = numbers[2:3] # Returns 1D array [30]
```

- `[index]` $\rightarrow$ Extracts the individual item.
- `[start:stop]` $\rightarrow$ Returns a sub-array spanning the range.

---

## 47. Common Beginner Mistakes

1. **Starting from index 1:**  
   *Incorrect:* Expecting `arr[1]` to be the first item.  
   *Correct:* First item is always `arr[0]`.

2. **Including the stop index:**  
   *Incorrect:* Assuming `arr[1:4]` contains index 4.  
   *Correct:* Stop index 4 is excluded; it extracts 1, 2, 3.

3. **Mixing rows and columns:**  
   *Incorrect:* Thinking `arr[col, row]`.  
   *Correct:* Always `arr[row, col]`.

4. **Forgetting `:` when selecting columns:**  
   *Incorrect:* Writing `marks[1]` expecting column 1. (This extracts row 1!)  
   *Correct:* Use `marks[:, 1]`.

---

## 48. Common Beginner Mistake — Invalid Index

```python
numbers = np.array([10, 20, 30])
print(numbers[3])  # Raises IndexError: index 3 is out of bounds for axis 0 with size 3
```

Valid indices are only `0, 1, 2`.

---

## 49. Common Beginner Mistake — Wrong 2D Index

```python
marks = np.array([
    [80, 75],
    [70, 85]
])
print(marks[2, 0])  # Raises IndexError: index 2 is out of bounds for axis 0 with size 2
```

Valid row indices are `0` and `1`.

---

## 50. Simple Rule for Index Errors

Before accessing an index, query `.shape`:
- Shape `(3,)` $\rightarrow$ Valid indices: `0, 1, 2` (or `-1, -2, -3`).
- Shape `(2, 3)` $\rightarrow$ Valid row indices: `0, 1`; valid column indices: `0, 1, 2`.

---

## 51. 45-Minute Teaching Flow — Recommended Classroom Explanation

- **First 10 Minutes:** Introduce array positions, 0-based indexing with `[10, 20, 30, 40]`.
- **Next 10 Minutes:** Negative indexing (`-1`, `-2`) followed by basic slicing `start:stop`.
- **Next 10 Minutes:** Transition to 2D coordinates `[row, col]` using student marks.
- **Next 10 Minutes:** Row selection `[row]`, column selection with `[:, col]`, and 2D sub-matrix slicing.
- **Final 5 Minutes:** Synthesize the concept map: Indexing = One, Slicing = Range.

---

## 52. 20-Minute Practice Section

### Practice 1 — Basic Indexing
Given `numbers = np.array([10, 20, 30, 40, 50])`:
- Display `30` using positive indexing: `numbers[2]`
- Display `50` using negative indexing: `numbers[-1]`

### Practice 2 — Basic Slicing
Given `numbers = np.array([10, 20, 30, 40, 50])`:
- Display `[20 30 40]` using slicing: `numbers[1:4]`

### Practice 3 — 2D Selection
Given 3x3 `marks`:
- First student: `marks[0]`
- Science marks: `marks[:, 2]`
- Priya's English mark: `marks[1, 1]`

---

## 55. Main Moodle Practice: Student Marks Selector

- **Title:** Select Student Marks Using NumPy Indexing and Slicing  
- **Difficulty:** Beginner  
- **Marks:** 10 Marks  
- **Time:** 15–20 Minutes  

### Problem Statement

A teacher stores the marks of 4 students in 3 subjects using a 2D NumPy array:

```python
marks = np.array([
    [80, 75, 90],
    [70, 85, 88],
    [92, 78, 95],
    [65, 72, 80]
])
```

Columns represent:
- Column 0 $\rightarrow$ Maths
- Column 1 $\rightarrow$ English
- Column 2 $\rightarrow$ Science

Write a Python program that displays:
1. The marks of the first student.
2. The marks of the last student.
3. All Maths marks.
4. All Science marks.
5. The English mark of the second student.
6. The marks of the first two students.
7. The Science marks of the first two students.

---

## 56. Expected Output

```text
First Student: [80 75 90]
Last Student: [65 72 80]
Maths Marks: [80 70 92 65]
Science Marks: [90 88 95 80]
Second Student English Mark: 85
First Two Students:
[[80 75 90]
 [70 85 88]]
Science Marks of First Two Students: [90 88]
```

---

## 57. Test Cases

### Test Case 1
Input:
```text
80 75 90 70 85 88 92 78 95 65 72 80
```
Expected Output:
```text
First Student: [80 75 90]
Last Student: [65 72 80]
Maths Marks: [80 70 92 65]
Science Marks: [90 88 95 80]
Second Student English Mark: 85
First Two Students:
[[80 75 90]
 [70 85 88]]
Science Marks of First Two Students: [90 88]
```

### Test Case 2
Input:
```text
60 70 80 75 85 95 90 88 92 65 78 85
```
Expected Output:
```text
First Student: [60 70 80]
Last Student: [65 78 85]
Maths Marks: [60 75 90 65]
Science Marks: [80 95 92 85]
Second Student English Mark: 85
First Two Students:
[[60 70 80]
 [75 85 95]]
Science Marks of First Two Students: [80 95]
```

---

## 59. Requirements

- Must use `import numpy as np`
- Must use indexing, negative indexing, row selection, column selection, and slicing
- Do not create separate individual scalar variables for each mark; query the array directly!

---

## 60. Beginner Hints

- **Hint 1 (First student):** `marks[0]`
- **Hint 2 (Last student):** `marks[-1]`
- **Hint 3 (Maths marks):** `marks[:, 0]`
- **Hint 4 (Science marks):** `marks[:, 2]`
- **Hint 5 (Second student English):** Row 1, Column 1 $\rightarrow$ `marks[1, 1]`
- **Hint 6 (First two students):** `marks[0:2, :]`
- **Hint 7 (Science of first two):** `marks[0:2, 2]`

---

## 61. Moodle AI Agent Instruction

```text
You are a beginner-friendly NumPy learning assistant helping a student solve the "Student Marks Selector" exercise.

Do NOT immediately provide the complete solution.

Teaching strategy:
1. Ask the student to identify what the rows and columns represent.
2. Guide them to marks[row, column].
3. Help them select row 0 and last row via -1.
4. Guide them to use ":" when selecting all rows for a column.
5. Explain marks[1] (row 1) vs marks[:, 1] (column 1).
6. Give only one hint at a time.
```

---

## 62. Moodle IDE Concept for Day 3

Interactive visual workspace layout:
- **Left:** Python Editor (`marks[1, 2]`)
- **Right:** Array Grid View highlighting Row 1 and Column 2 in amber.
- **Selection Panel:** `Expression: marks[1, 2] → Selected: Row 1, Column 2 → 88`.

---

## 69. Practical Classroom Activities — Guess the Result

### 1D Rapid Fire
For `numbers = np.array([10, 20, 30, 40, 50])`:
- `numbers[0]` $\rightarrow$ `10`
- `numbers[-1]` $\rightarrow$ `50`
- `numbers[1:4]` $\rightarrow$ `[20 30 40]`
- `numbers[:2]` $\rightarrow$ `[10 20]`
- `numbers[-2:]` $\rightarrow$ `[40 50]`

### 2D Rapid Fire
For 3x3 `marks`:
- `marks[0]` $\rightarrow$ `[80 75 90]`
- `marks[:, 1]` $\rightarrow$ `[75 85 78]`
- `marks[2, 2]` $\rightarrow$ `95`
- `marks[:2, :]` $\rightarrow$ First two rows
- `marks[0:2, 1:3]` $\rightarrow$ `[[75 90], [85 88]]`

---

## 72. Day 3 Cheat Sheet

```python
# 1D Indexing
arr[0]      # First element
arr[2]      # Third element
arr[-1]     # Last element

# 1D Slicing
arr[1:4]    # Elements at index 1, 2, 3
arr[:3]     # First three elements
arr[2:]     # From index 2 to end
arr[-2:]    # Last two elements

# 2D Indexing & Slicing
mat[row, col]        # Single value
mat[row]             # Complete row
mat[:, col]          # Complete column
mat[0:2, 1:3]        # 2D sub-matrix
```

---

## 73–77. Memory Tricks

- **Trick 1:** Position = Index (Starts at 0).
- **Trick 2:** `[start : stop]` $\rightarrow$ Start is included, Stop is excluded.
- **Trick 3:** 2D Coordinate $\rightarrow$ `[row, column]`.
- **Trick 4:** The Colon `:` means **ALL**.
- **Trick 5:** `mat[1]` is a **Row**, `mat[:, 1]` is a **Column**.

---

## 79. Day 3 Concept Map

```text
                       NUMPY ARRAY
                            │
                ┌───────────┴───────────┐
                ↓                       ↓
             Indexing                 Slicing
                │                       │
          ┌─────┴─────┐           ┌─────┴─────┐
          ↓           ↓           ↓           ↓
         1D           2D       1D Slice     2D Slice
          │           │           │           │
       a[2]       a[1,2]       a[1:4]    a[0:2,1:3]
          │           │           │           │
          └───────────┴───────────┴───────────┘
                          ↓
                  Select Needed Data
                          ↓
                  Process / Calculate
```

---

## 80. Final Challenge — Student Performance Selector

A school stores marks for 5 students and 4 subjects:

```python
marks = np.array([
    [80, 75, 90, 85],
    [70, 85, 88, 72],
    [92, 78, 95, 90],
    [65, 72, 80, 68],
    [88, 90, 84, 92]
])
```

Columns: `0 → Maths`, `1 → English`, `2 → Science`, `3 → Computer`.

### Expected Output

```text
First Student:
[80 75 90 85]

Last Student:
[88 90 84 92]

Maths:
[80 70 92 65 88]

Computer:
[85 72 90 68 92]

Third Student Science Mark:
95

First Three Students:
[[80 75 90 85]
 [70 85 88 72]
 [92 78 95 90]]

English Marks of First Three:
[75 85 78]

Science and Computer of First Three:
[[90 85]
 [88 72]
 [95 90]]
```

---

## 83. Final Key Message for Students

> **Indexing helps you select one specific value, while slicing helps you select a range of values. In a 2D NumPy array, the first index represents the row and the second represents the column.**
>
> Always identify before coding:
> 1. Do I need **one element**? $\rightarrow$ `arr[r, c]`
> 2. Do I need **one whole row**? $\rightarrow$ `arr[r]`
> 3. Do I need **one whole column**? $\rightarrow$ `arr[:, c]`
> 4. Do I need a **sub-matrix**? $\rightarrow$ `arr[r_slice, c_slice]`

