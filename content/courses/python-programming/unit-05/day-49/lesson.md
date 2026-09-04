# Unit–V — Day 1: Introduction to NumPy and NumPy Arrays

**Duration:** 90 Minutes  
**Level:** Beginner  
**Unit:** V – NumPy, Data Processing and Scientific Computing  
**Day:** 1 (Course Day 49)

---

## 1. Learning Objectives

By the end of this session, students should be able to:
1. Explain what NumPy is and why it forms the backbone of Python's scientific and data stack.
2. Differentiate between a general-purpose Python list and a high-performance NumPy array.
3. Import NumPy correctly using the standard alias: `import numpy as np`.
4. Create one-dimensional (1D), two-dimensional (2D), and multi-dimensional arrays using `np.array()`.
5. Access and update individual array elements using single and multi-axis coordinate indexing.
6. Understand and inspect the core array attributes:
   - `ndim`: Number of dimensions (axes).
   - `shape`: Size along each dimension tuple, such as `(5,)` or `(2, 3)`.
   - `size`: Total element count across the entire array.
   - `dtype`: The data type of the stored elements.
7. Perform vectorized element-wise arithmetic (`+`, `-`, `*`, `/`) without explicit loops.
8. Apply NumPy arrays to simple real-world numerical problems (student grades, sensor calibration, geometric calculations).

---

## 2. 90-Minute Session Plan

| Time | Topic | Activity |
| :--- | :--- | :--- |
| **0–8 min** | Motivation | The 10,000-student problem: Why Python lists struggle with mass math |
| **8–18 min** | NumPy vs Lists | Element-wise arithmetic vs. sequence repetition (`* 2`) |
| **18–30 min** | Features & Ecosystem | Real-world applications: Data Science, Machine Learning, Computer Vision |
| **30–42 min** | Creating Arrays | `import numpy as np`, `np.array()`, memory structure |
| **42–53 min** | 1D Arrays | Indexing (`[0]`, `[-1]`), slicing, and scalar arithmetic (`+ 5`) |
| **53–65 min** | 2D Arrays | Tables of rows and columns, coordinate indexing `[row, col]` |
| **65–73 min** | Dimensions & Stacking | 3D array concepts (layers, rows, columns; image channels) |
| **73–80 min** | Metadata Inspection | Exploring `ndim`, `shape`, `size`, and `dtype` |
| **80–86 min** | Practical Case Study | Student marks table & sensor calibration programs |
| **86–88 min** | Moodle Practice | Coding Challenge: Student Marks Array |
| **88–90 min** | Quiz & Concept Map | Quick revision & mental model check |

---

## 3. Motivating Question: The 10,000-Student Challenge

Suppose an engineering college needs to calculate grades for 10,000 students. Would you create 10,000 separate variables? Obviously not:

```python
marks = [78, 85, 90, 67, 88]
```

Python lists are great general-purpose collections. But what happens when you must:
- Add 5 bonus marks to every student?
- Convert 100,000 sensor temperatures from Celsius to Fahrenheit?
- Multiply two matrices of 1,000,000 values?

With Python lists, you must write loops or list comprehensions that process numbers one item at a time. This becomes slow and awkward for large datasets.

**This is why NumPy exists.**

---

## 4. What is NumPy?

**NumPy** stands for **Numerical Python**. It is the fundamental Python library for scientific and array-based computing.

NumPy provides:
- The **ndarray** (N-dimensional array): a fast, flexible, memory-efficient container for numerical data.
- **Vectorized operations:** Mathematical calculations that execute across entire collections in C-level speed without Python loops.
- Core building block for libraries like **pandas**, **scikit-learn**, **Matplotlib**, and **TensorFlow**.

> **NumPy in One Simple Sentence:**  
> NumPy gives Python a powerful, ultra-fast way to store and compute numerical data using structured arrays.

---

## 5. Python List vs. NumPy Array: The Big Difference

Consider two identical-looking collections:

```python
import numpy as np

py_list = [10, 20, 30]
np_array = np.array([10, 20, 30])
```

Now try multiplying both by 2:

### Python List:
```python
print(py_list * 2)
# Output: [10, 20, 30, 10, 20, 30]  <-- REPEATS THE LIST!
```
For a Python list, `* 2` performs **sequence repetition**. It does not perform multiplication.

### NumPy Array:
```python
print(np_array * 2)
# Output: [20 40 60]  <-- MULTIPLIES EVERY NUMBER!
```
NumPy performs **element-wise arithmetic**. Every single element inside the array is multiplied by 2 in parallel.

```text
Python List * 2:
[10, 20, 30] ──> [10, 20, 30, 10, 20, 30]  (Sequence Duplication)

NumPy Array * 2:
[10, 20, 30] ──> [10×2, 20×2, 30×2] ──> [20, 40, 60]  (Element-Wise Math)
```

---

## 6. Real-World Applications of NumPy

NumPy is used everywhere numerical data exists:

```text
   Real World Phenomenon              NumPy Representation
┌─────────────────────────────┐    ┌─────────────────────────────┐
│ High-Resolution Image       │ ─> │ 3D Array: Height × Width × 3│
│ Weather Station Readings    │ ─> │ 1D Array of Temperatures    │
│ Stock Market Tickers        │ ─> │ 2D Array: Days × Stock Prices│
│ Audio Signal Recording      │ ─> │ 1D Array of Sound Amplitudes│
└─────────────────────────────┘    └─────────────────────────────┘
```

In data science, the universal pipeline is:
$$\text{Raw Data} \longrightarrow \textbf{NumPy Arrays} \longrightarrow \text{Analysis / ML / Graphs} \longrightarrow \text{Results}$$

---

## 7. Importing NumPy: The Standard Convention

Always import NumPy with the standard community alias `np`:

```python
import numpy as np
```

Now use `np.<function>` rather than writing `numpy.<function>` every time:
```python
numbers = np.array([10, 20, 30, 40])
print(numbers)  # Output: [10 20 30 40]
```
*(Notice: NumPy prints arrays with spaces between numbers and no commas!)*

---

## 8. One-Dimensional (1D) Arrays

A **1D array** represents a single row (vector) of values:

```text
Index:     0     1     2     3
        ┌─────┬─────┬─────┬─────┐
Values: │ 10  │ 20  │ 30  │ 40  │
        └─────┴─────┴─────┴─────┘
```

```python
import numpy as np

numbers = np.array([10, 20, 30, 40])

# Accessing elements
print("First element :", numbers[0])   # 10
print("Third element :", numbers[2])   # 30
print("Last element  :", numbers[-1])  # 40 (Negative indexing)

# Updating elements (NumPy arrays are mutable)
numbers[1] = 99
print("Updated array :", numbers)       # [10 99 30 40]

# Slicing (stop index is excluded)
print("Slice [1:3]   :", numbers[1:3]) # [99 30]
```

---

## 9. Vectorized Element-Wise Arithmetic

With NumPy, arithmetic operators apply to every element automatically:

```python
import numpy as np

scores = np.array([70, 80, 65, 90, 75])

print("Add 5      :", scores + 5)    # [75 85 70 95 80]
print("Subtract 10:", scores - 10)   # [60 70 55 80 65]
print("Multiply 2 :", scores * 2)    # [140 160 130 180 150]
print("Divide 10  :", scores / 10)   # [7.  8.  6.5 9.  7.5]
```

### Array-with-Array Arithmetic:
If two arrays have the same shape, operations match up position-by-position:
```python
lengths = np.array([2, 4, 6])
widths  = np.array([5, 3, 2])

areas = lengths * widths
print("Areas:", areas)  # [10 12 12] -> (2*5, 4*3, 6*2)
```

---

## 10. Two-Dimensional (2D) Arrays: Matrices & Tables

A **2D array** consists of rows and columns, making it ideal for spreadsheets, matrices, and multi-subject student records.

```python
import numpy as np

matrix = np.array([
    [10, 20, 30],
    [40, 50, 60]
])

print(matrix)
```

Output:
```text
[[10 20 30]
 [40 50 60]]
```

### Visualizing 2D Indexing: `array[row, column]`
```text
             Column 0   Column 1   Column 2
Row 0       ┌──────────┬──────────┬──────────┐
            │    10    │    20    │    30    │
            ├──────────┼──────────┼──────────┤
Row 1       │    40    │    50    │    60    │
            └──────────┴──────────┴──────────┘
```

To access an element:
```python
# Row 0, Column 1
print(matrix[0, 1])  # 20

# Row 1, Column 2
print(matrix[1, 2])  # 60

# Modifying a cell
matrix[1, 1] = 500
print(matrix[1, 1])  # 500
```

---

## 11. Multi-Dimensional (3D) Arrays

A **3D array** can be conceptualized as a stack of 2D tables (sheets or layers):

```python
import numpy as np

data = np.array([
    [[1, 2], [3, 4]],   # Layer 0
    [[5, 6], [7, 8]]    # Layer 1
])

print("3D Array shape:", data.shape)  # (2, 2, 2)
```

```text
Layer 0:           Layer 1:
┌──────┬──────┐    ┌──────┬──────┐
│  1   │  2   │    │  5   │  6   │
├──────┼──────┤    ├──────┼──────┤
│  3   │  4   │    │  7   │  8   │
└──────┴──────┘    └──────┴──────┘
```

Real-world application: Color images are 3D arrays: `(Height, Width, 3 Channels: Red, Green, Blue)`.

---

## 12. The Four Pillars of Array Inspection

Every NumPy array comes with four essential attributes:

| Attribute | Meaning | Example for `matrix` |
| :--- | :--- | :--- |
| **`ndim`** | Number of axes / dimensions | `matrix.ndim` $\rightarrow$ `2` |
| **`shape`** | Tuple showing size along each dimension | `matrix.shape` $\rightarrow$ `(2, 3)` (2 rows, 3 cols) |
| **`size`** | Total number of elements across all axes | `matrix.size` $\rightarrow$ `6` ($2 \times 3 = 6$) |
| **`dtype`** | Data type of the stored elements | `matrix.dtype` $\rightarrow$ `int32` or `int64` |

```python
import numpy as np

a = np.array([10, 20, 30, 40])
print(a.ndim)   # 1
print(a.shape)  # (4,) -> Notice the trailing comma for 1-tuples!
print(a.size)   # 4
print(a.dtype)  # int64 or int32
```

---

## 13. Practical Case Study: Gradebook Analytics

Suppose we store the marks of 3 students across 3 subjects in a 2D array:

```python
import numpy as np

# 3 students (rows), 3 subjects (columns)
marks = np.array([
    [80, 75, 90],  # Student 0
    [85, 88, 92],  # Student 1
    [70, 65, 78]   # Student 2
])

print("Marks Matrix:\n", marks)
print("Dimensions  :", marks.ndim)   # 2
print("Shape       :", marks.shape)  # (3, 3)
print("Total Scores:", marks.size)   # 9

# Access Student 1's third subject (index [1, 2])
print("Student 1, Subject 2:", marks[1, 2])  # 92

# Award 3 grace marks to every student in every subject
curved_marks = marks + 3
print("\nCurved Marks:\n", curved_marks)
```

---

## 14. Common Beginner Mistakes & Traps

### Mistake 1: Forgetting `import numpy as np`
```python
# INCORRECT
arr = np.array([1, 2, 3])  # NameError: name 'np' is not defined
```
**Fix:** Always include `import numpy as np` at the top of your script.

---

### Mistake 2: Confusing 1D Shape `(N,)` with 2D Shape `(1, N)`
```python
v = np.array([1, 2, 3])
print(v.shape)  # (3,) -> 1D vector with 3 elements, NOT (1, 3)!
```
A 1D array has only 1 axis. A `(1, 3)` shape belongs to a 2D matrix with 1 row and 3 columns.

---

### Mistake 3: Out-of-Bounds 2D Indexing
```python
matrix = np.array([[1, 2], [3, 4]])
print(matrix[2, 0])  # IndexError: index 2 is out of bounds for axis 0 with size 2
```
Remember: Row and column indices start at 0. A matrix with 2 rows has row indices `0` and `1`.

---

### Mistake 4: Expecting List Repetition
```python
# Remember:
[1, 2, 3] * 2          # [1, 2, 3, 1, 2, 3] (List repeats)
np.array([1, 2, 3]) * 2 # [2 4 6]           (NumPy multiplies)
```

---

## 15. Python List vs. NumPy Array: Summary Table

| Feature | Python List | NumPy Array (`ndarray`) |
| :--- | :--- | :--- |
| **Purpose** | General-purpose heterogenous data | High-performance numerical computing |
| **Memory Layout** | Pointers to scattered Python objects | Contiguous block of raw C memory |
| **Arithmetic (`* 2`)** | Duplicates the sequence | Multiplies each number element-wise |
| **Dimensions** | Nested lists (`[[1,2],[3,4]]`) | Native multi-axis tensors (1D, 2D, 3D...) |
| **`shape` attribute** | ❌ No | ✅ Yes (`(rows, cols)`) |
| **`ndim` attribute** | ❌ No | ✅ Yes |
| **`size` attribute** | ❌ Use `len()` | ✅ Yes (`array.size`) |
| **`dtype` attribute** | ❌ Elements can be mixed | ✅ Homogenous element type |

---

## 16. Moodle Coding Arena Problem: Student Marks Array

### Problem Statement
Write a Python program using NumPy to store the marks of five subjects.

The program should:
1. Read five subject marks (one integer per line) from user input.
2. Store them in a 1D NumPy array named `marks`.
3. Display the array: `Marks: [70 80 65 90 75]`.
4. Display the first mark using index `0`: `First mark: 70`.
5. Display the last mark using negative index `-1`: `Last mark: 75`.
6. Add 5 bonus marks to every subject using element-wise addition (`marks + 5`).
7. Display the updated marks array: `Updated marks: [75 85 70 95 80]`.
8. Display the array's metadata:
   - `Shape: (5,)`
   - `Size: 5`
   - `Dimensions: 1`

### Sample Input:
```text
70
80
65
90
75
```

### Expected Output:
```text
Marks: [70 80 65 90 75]
First mark: 70
Last mark: 75
Updated marks: [75 85 70 95 80]
Shape: (5,)
Size: 5
Dimensions: 1
```

---

## 17. Quick Revision Cheat Sheet

```python
import numpy as np

# 1. Create arrays
vec = np.array([10, 20, 30])              # 1D array
mat = np.array([[1, 2, 3], [4, 5, 6]])   # 2D array

# 2. Inspect metadata
print(vec.ndim)   # 1
print(vec.shape)  # (3,)
print(vec.size)   # 3
print(vec.dtype)  # int64

print(mat.shape)  # (2, 3) -> 2 rows, 3 columns

# 3. Indexing
print(vec[0])     # First element
print(vec[-1])    # Last element
print(mat[0, 1])  # Row 0, Column 1

# 4. Element-wise math
print(vec + 5)    # Adds 5 to all elements
print(vec * 2)    # Multiplies all elements by 2
print(vec / 10)   # Divides all elements by 10
```
