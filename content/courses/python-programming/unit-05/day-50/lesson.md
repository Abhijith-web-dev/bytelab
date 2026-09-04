# Unit–V — Day 2: NumPy Array Shape, Dimensions and Reshaping

**Duration:** 90 Minutes  
**Teaching Focus:** 45 Minutes Concept Teaching + 20 Minutes Basic Practice + 25 Minutes Review, Demo and Quiz  
**Level:** Beginner  
**Unit:** Unit–V — NumPy, Data Processing and Scientific Computing  
**Day:** 2 (Day 50 of 65)  

---

## 1. Learning Objectives

By the end of this session, students will be able to:

1. **Explain** what the shape of a NumPy array means in terms of dimensional axes.
2. **Understand** the core difference between 1D (vectors), 2D (matrices/tables), and 3D (tensors/volumes) arrays.
3. **Identify** rows and columns in a 2D array representation.
4. **Use** the `.shape` attribute to inspect array configurations without altering data.
5. **Interpret** tuple notations such as `(4,)`, `(2, 3)`, and `(3, 1)`.
6. **Use** the `reshape()` method to rearrange existing elements into new grid dimensions.
7. **Differentiate** between the original array and its reshaped view.
8. **Enforce** the fundamental element conservation rule: $\text{rows} \times \text{columns} = \text{total elements}$.
9. **Diagnose** and resolve `ValueError` exceptions caused by incompatible dimension requests.
10. **Write** practical data-processing programs using `.shape`, `.ndim`, `.size`, and `reshape()`.

---

## 2. 90-Minute Session Plan

| Time Window | Topic / Activity | Focus & Pedagogical Deliverables |
|---|---|---|
| **00–05 min** | **Day 1 Recap** | Quick drill on NumPy arrays, `np.array()`, vectorized operations, and indexing. |
| **05–12 min** | **What is Shape?** | Intuitive introduction using 6 student marks as a single row vs a table. |
| **12–20 min** | **Understanding Dimensions** | 1D vs 2D arrays, explaining the `(4,)` single-element tuple notation. |
| **20–28 min** | **The `.shape` Attribute** | Extracting dimensions; reading rows and columns via tuple unpacking. |
| **28–36 min** | **The `reshape()` Method** | Transforming arrangements; element conservation rule. |
| **36–45 min** | **Shape vs Reshape** | Attribute vs method; looking up geometry vs altering layout. |
| **45–50 min** | **Guided Example** | Student gradebook matrix and weekly weather readings. |
| **50–65 min** | **Hands-on Practice** | 3 progressive programs in the interactive workspace. |
| **65–72 min** | **Mini Challenge** | Calculating valid and invalid permutations for 8 and 12 elements. |
| **72–80 min** | **Debugging Pitfalls** | Diagnosing `ValueError: cannot reshape array`, comma confusion, and bracket nesting. |
| **80–85 min** | **Moodle Practice Lab** | Independent implementation of sensor readings transformation. |
| **85–90 min** | **Quiz & Reflection** | 10-question concept assessment and key takeaways. |

---

## 3. Start with a Simple Real-World Example

Imagine you have recorded marks for 6 students:

```python
import numpy as np

marks = np.array([80, 70, 90, 85, 75, 95])
```

Right now, in memory and on the screen, these values appear as a single linear sequence:

```text
80   70   90   85   75   95
```

This is **one continuous line** of data.

Now suppose your department chair asks you to display these marks organized into a classroom roster of **2 rows and 3 columns**:

```text
Row 0:   80   70   90
Row 1:   85   75   95
```

Notice what just happened:
- We did **not** add any new students.
- We did **not** erase or change any marks.
- The array's geometry changed from **1 dimension with 6 values** `(6,)` to **2 dimensions with 2 rows and 3 columns** `(2, 3)`.

This structural transformation is the core focus of today's lesson.

---

## 4. What Does Shape Mean?

The **shape** of a NumPy array describes the number of elements that exist along each axis (dimension).

For a one-dimensional array:

```python
import numpy as np

numbers = np.array([10, 20, 30, 40])
print(numbers.shape)
```

**Output:**
```python
(4,)
```

This tuple indicates:
- There is **one axis**.
- Along that axis, there are **4 elements**.

---

## 5. Understanding the `(4,)` Tuple Notation

Beginners frequently ask: *"Why is there a trailing comma in `(4,)`?"*

In Python, parentheses are used both for mathematical grouping `(4 + 2)` and for tuples. If Python printed `(4)`, it would be ambiguous—it would look like an integer inside parentheses!

To explicitly signify a **tuple containing a single element**, Python syntax mandates a trailing comma:
- `(4)` $\rightarrow$ integer 4
- `(4,)` $\rightarrow$ tuple of length 1 containing the integer 4

Whenever you see `(n,)` in NumPy, read it immediately as:
> *"A 1-dimensional array containing $n$ elements."*

---

## 6. Shape of a 2D Array

Now consider an array constructed with nested square brackets:

```python
import numpy as np

numbers = np.array([
    [10, 20, 30],
    [40, 50, 60]
])

print(numbers.shape)
```

**Output:**
```python
(2, 3)
```

In a 2-dimensional array, the shape tuple always follows this order:
$$\text{shape} = (\text{rows}, \text{columns})$$

Here:
- The first number `2` specifies **2 rows** (axis 0).
- The second number `3` specifies **3 columns** (axis 1).

---

## 7. Visualizing `(2, 3)`

```text
              Columns (Axis 1)
            0        1        2
        ┌────────┬────────┬────────┐
Row 0   │   10   │   20   │   30   │
(Axis 0)├────────┼────────┼────────┤
Row 1   │   40   │   50   │   60   │
        └────────┴────────┴────────┘
```

When you query `.shape`:
```python
rows, cols = numbers.shape
print(f"Total Rows: {rows}, Total Columns: {cols}")
# Output: Total Rows: 2, Total Columns: 3
```

---

## 8. Easy Shape Rules for 2D Arrays

Whenever you encounter a 2D array, memorize this standard convention:

$$\mathbf{Shape} = (\text{Rows}, \text{Columns})$$

| Shape Tuple | Interpretation | Total Elements |
|---|---|---|
| `(2, 3)` | 2 rows, 3 columns | $2 \times 3 = 6$ |
| `(4, 5)` | 4 rows, 5 columns | $4 \times 5 = 20$ |
| `(10, 2)` | 10 rows, 2 columns | $10 \times 2 = 20$ |
| `(1, 6)` | 1 row, 6 columns (row vector) | $1 \times 6 = 6$ |
| `(6, 1)` | 6 rows, 1 column (column vector) | $6 \times 1 = 6$ |

---

## 9. Real-World Example — Student Marks Matrix

Suppose an engineering class records marks for 3 students across 3 core subjects:

```python
import numpy as np

# Rows: Student 1, Student 2, Student 3
# Cols: Physics, Chemistry, Math
marks = np.array([
    [80, 75, 90],
    [70, 85, 88],
    [92, 78, 95]
])

print("Marks Matrix:")
print(marks)
print("Shape:", marks.shape)
```

**Output:**
```text
Marks Matrix:
[[80 75 90]
 [70 85 88]
 [92 78 95]]
Shape: (3, 3)
```

Here, `marks.shape` gives `(3, 3)`, confirming 3 students $\times$ 3 subjects.

---

## 10. Understanding Dimensions: 1D, 2D, and 3D

A **dimension** (also called an **axis** in NumPy) describes the hierarchical level of organization of the data.

### 1D: A Line (Vector)
```python
vec = np.array([10, 20, 30, 40])
print(vec.ndim)   # 1
print(vec.shape)  # (4,)
```

### 2D: A Table (Matrix)
```python
mat = np.array([
    [10, 20],
    [30, 40]
])
print(mat.ndim)   # 2
print(mat.shape)  # (2, 2)
```

### 3D: A Stack of Tables (Cube / Tensor)
A 3D array consists of multiple 2D layers stacked on top of each other:
```python
tensor = np.array([
    [[1, 2], [3, 4]],
    [[5, 6], [7, 8]]
])
print(tensor.ndim)   # 3
print(tensor.shape)  # (2, 2, 2) -> (layers, rows, columns)
```

> **Note for Day 2:** Focus primarily on mastering **1D** and **2D** structures. 3D arrays will be explored further during image processing topics.

---

## 11. 1D vs 2D Arrays: Comparison Matrix

| Property | 1D Array (Vector) | 2D Array (Matrix / Table) |
|---|---|---|
| **Visual form** | One continuous line | Grid of rows and columns |
| **Example code** | `np.array([10, 20, 30])` | `np.array([[10, 20], [30, 40]])` |
| **Shape syntax** | `(n,)` e.g., `(3,)` | `(rows, cols)` e.g., `(2, 2)` |
| **Dimensions (`.ndim`)** | `1` | `2` |
| **Typical use case** | Single series, sensor stream | Tabular records, coordinate planes |
| **Memory model** | 1 bracket level `[a, b, c]` | 2 bracket levels `[[a, b], [c, d]]` |

---

## 12. The `.shape` Attribute

In Python, `.shape` is an **attribute** (a property stored on the object), not a method. You do **not** call it with parentheses:

```python
import numpy as np

marks = np.array([70, 80, 90, 60])

# CORRECT:
print(marks.shape)  # Output: (4,)

# INCORRECT:
# print(marks.shape())  # TypeError: 'tuple' object is not callable
```

---

## 13. Querying Shape Never Alters Data

Reading `array.shape` is purely an observational action:
```python
print(marks.shape)
```
It asks NumPy: *"What is the current geometry of this array?"* It never reorganizes, copies, or modifies the stored numbers.

---

## 14. What is `reshape()`?

While `.shape` *inspects* geometry, the `.reshape()` method **rearranges existing elements into a requested new shape**.

```python
import numpy as np

numbers = np.array([10, 20, 30, 40, 50, 60])
print("Original:", numbers)
print("Original shape:", numbers.shape)

# Rearrange 6 elements into 2 rows and 3 columns
matrix = numbers.reshape(2, 3)
print("Reshaped matrix:")
print(matrix)
print("New shape:", matrix.shape)
```

**Output:**
```text
Original: [10 20 30 40 50 60]
Original shape: (6,)
Reshaped matrix:
[[10 20 30]
 [40 50 60]]
New shape: (2, 3)
```

---

## 15. Shape Before and After Reshape

Notice the transformation:

```text
BEFORE (1D line):
[10, 20, 30, 40, 50, 60]  ---> shape = (6,)

AFTER (2D table):
[[10, 20, 30],
 [40, 50, 60]]            ---> shape = (2, 3)
```

The underlying numbers remain completely identical. Only their indexing geometry has been reconfigured.

---

## 16. The Golden Rule of Reshaping

> **CRITICAL RULE:**  
> The total number of elements in the new shape **MUST** equal the total number of elements in the original array.
>
> $$\prod \text{New Dimensions} = \text{Total Elements}$$
>
> For a 2D reshape:
> $$\text{New Rows} \times \text{New Columns} = \text{Array Size}$$

If you have **6 elements**, you can arrange them into:
- $2 \times 3 = 6$ $\checkmark$
- $3 \times 2 = 6$ $\checkmark$
- $1 \times 6 = 6$ $\checkmark$
- $6 \times 1 = 6$ $\checkmark$

You **cannot** reshape into:
- $4 \times 2 = 8$ (requires 8 elements; you only have 6) $\times$
- $2 \times 2 = 4$ (leaves 2 elements stranded) $\times$

---

## 17. Valid Reshape Permutations for 6 Elements

```python
import numpy as np

numbers = np.array([1, 2, 3, 4, 5, 6])

# 2 rows, 3 columns
r1 = numbers.reshape(2, 3)

# 3 rows, 2 columns
r2 = numbers.reshape(3, 2)

# 1 row, 6 columns
r3 = numbers.reshape(1, 6)

# 6 rows, 1 column
r4 = numbers.reshape(6, 1)
```

All four configurations are valid because $2 \times 3 = 3 \times 2 = 1 \times 6 = 6 \times 1 = 6$.

---

## 18. What Happens When Reshape Fails?

Let's see what happens if we attempt an invalid geometry:

```python
import numpy as np

numbers = np.array([1, 2, 3, 4, 5, 6])
numbers.reshape(4, 2)
```

NumPy immediately raises a `ValueError`:
```text
ValueError: cannot reshape array of size 6 into shape (4,2)
```

Why? Because $4 \times 2 = 8$, but the array only contains 6 values. NumPy will **never** invent default values or drop elements silently!

---

## 19. `.shape` vs `reshape()`: Side-by-Side Comparison

| Dimension | `.shape` | `reshape()` |
|---|---|---|
| **What is it?** | An object attribute (property) | A callable method (function on the object) |
| **Syntax** | `arr.shape` (no parentheses) | `arr.reshape(rows, cols)` (with arguments) |
| **Purpose** | Reads the current arrangement | Returns a new arrangement of the data |
| **Alters layout?** | Never | Returns a reshaped array |
| **Return type** | Tuple of ints e.g. `(2, 3)` | A new `ndarray` object |
| **Mental Anchor** | *"Look at how it is"* | *"Change how it looks"* |

---

## 20. Shape vs Size

Beginners sometimes confuse `.shape` and `.size`:

```python
numbers = np.array([
    [10, 20, 30],
    [40, 50, 60]
])

print("numbers.shape:", numbers.shape)  # (2, 3)
print("numbers.size:", numbers.size)    # 6
```

- **`shape`**: Describes the layout along each axis $\rightarrow$ 2 rows by 3 columns.
- **`size`**: Total count of all elements $\rightarrow$ $2 \times 3 = 6$.

---

## 21. The Three Pillars of Array Metadata

Every NumPy array exposes three core structural properties:

```python
numbers = np.array([[1, 2, 3], [4, 5, 6]])

print(numbers.ndim)   # 2
print(numbers.shape)  # (2, 3)
print(numbers.size)   # 6
```

```text
ndim   ──> "How many dimensions are there?"         ──> 2
shape  ──> "What is the length along each dimension?" ──> (2, 3)
size   ──> "How many total items exist in the array?" ──> 6
```

---

## 22. Guided Example — Student Marks Transformation

```python
import numpy as np

# 1D array of 6 exam marks
marks = np.array([80, 70, 90, 85, 75, 95])

print("Original:", marks)
print("Shape:", marks.shape)
print("Size:", marks.size)
print("Dimensions:", marks.ndim)

# Reshape into a 2x3 table (2 students, 3 subjects)
marks_table = marks.reshape(2, 3)

print("\nReshaped Table:")
print(marks_table)
print("New Shape:", marks_table.shape)
print("New Dimensions:", marks_table.ndim)
```

**Output:**
```text
Original: [80 70 90 85 75 95]
Shape: (6,)
Size: 6
Dimensions: 1

Reshaped Table:
[[80 70 90]
 [85 75 95]]
New Shape: (2, 3)
New Dimensions: 2
```

---

## 23. Real-World Case 1: Weekly Temperature Readings

A weather monitoring station records 6 temperature readings:
- Day 1: Morning, Afternoon, Evening
- Day 2: Morning, Afternoon, Evening

```python
import numpy as np

temps = np.array([28, 30, 31, 29, 27, 30])

# Reshape into 2 days x 3 time slots
temps_matrix = temps.reshape(2, 3)

print("Weather Matrix (2 Days x 3 Readings):")
print(temps_matrix)
print("Day 1 Afternoon Temp:", temps_matrix[0, 1])
```

---

## 24. Real-World Case 2: Store Inventory & Prices

Suppose 12 item prices are retrieved from a database:

```python
import numpy as np

prices = np.array([
    100, 120, 150,
     90, 110, 130,
     80,  95, 125,
    140, 160, 170
])

# Arrange into 4 product categories with 3 tiers each
catalog = prices.reshape(4, 3)
print("Catalog Shape:", catalog.shape)  # (4, 3)
```

---

## 25. Why Reshaping is Essential in Machine Learning & Data Science

In modern computing, data is often ingested as a flat 1D stream:
1. **Computer Vision**: An image with 784 pixels arrives as a flat 1D array of length 784. Before feeding it to a convolutional neural network, it is reshaped into a $28 \times 28$ 2D grayscale grid: `image.reshape(28, 28)`.
2. **Tabular Data**: Sensor readings sent continuously over serial ports are converted into matrix batches for analysis: `stream.reshape(batches, features)`.
3. **Database Tables**: Flat database query dumps are pivoted into structured feature matrices.

---

## 26. Reshaping Never Mutates the Data Values

```python
import numpy as np

arr = np.array([1, 2, 3, 4])
reshaped = arr.reshape(2, 2)

print(reshaped)
```

The numbers `1, 2, 3, 4` are not changed, rounded, or deleted. Only the indexing navigation changes.

---

## 27. Basic `reshape()` Syntax Patterns

You can pass dimensions as separate arguments or as a tuple:

```python
# Style A: Separate arguments (recommended for beginners)
new_arr = arr.reshape(2, 3)

# Style B: A single tuple argument (also valid)
new_arr = arr.reshape((2, 3))
```

Both styles produce the exact same outcome.

---

## 28. Reshaping 1D to 2D (Expanding Structure)

```python
import numpy as np

raw_data = np.array([1, 2, 3, 4, 5, 6])
matrix = raw_data.reshape(2, 3)

print("1D -> 2D:")
print(matrix)
```

---

## 29. Reshaping 2D to 1D (Flattening Structure)

You can also flatten a 2D matrix back into a 1D vector using `reshape()`:

```python
import numpy as np

matrix = np.array([
    [1, 2, 3],
    [4, 5, 6]
])

flattened = matrix.reshape(6)
print("2D -> 1D:")
print(flattened)  # [1 2 3 4 5 6]
```

---

## 30. Reshaping to a Column Vector `(4, 1)`

When working with linear algebra, you will often need a **column vector** (many rows, exactly 1 column):

```python
import numpy as np

numbers = np.array([10, 20, 30, 40])
col = numbers.reshape(4, 1)

print("Column Vector:")
print(col)
print("Shape:", col.shape)
```

**Output:**
```text
Column Vector:
[[10]
 [20]
 [30]
 [40]]
Shape: (4, 1)
```

---

## 31. Reshaping to a Row Vector `(1, 4)`

A **row vector** has exactly 1 row and multiple columns:

```python
import numpy as np

numbers = np.array([10, 20, 30, 40])
row = numbers.reshape(1, 4)

print("Row Vector:")
print(row)
print("Shape:", row.shape)
```

**Output:**
```text
Row Vector:
[[10 20 30 40]]
Shape: (1, 4)
```

---

## 32. Comparing `(4,)`, `(4, 1)`, and `(1, 4)`

This is one of the most enlightening distinctions for Python learners:

| Array Representation | Shape | Dimension (`ndim`) | Visual Form |
|---|---|---|---|
| `[10, 20, 30, 40]` | `(4,)` | 1D | A flat sequence of 4 items |
| `[[10], [20], [30], [40]]` | `(4, 1)` | 2D | 4 vertical rows, 1 item per row |
| `[[10, 20, 30, 40]]` | `(1, 4)` | 2D | 1 horizontal row containing 4 items |

All three contain the exact same numbers, but their tensor dimensions differ completely!

---

## 33–35. Guided Workouts

### Workout 1
**Question:** Given `nums = np.array([1, 2, 3, 4, 5, 6])`, what is `nums.shape`?  
**Answer:** `(6,)` (1D array with 6 items).

### Workout 2
**Question:** Can `nums` be reshaped to `(3, 2)`? What will it look like?  
**Answer:** Yes, because $3 \times 2 = 6$.
```text
[[1 2]
 [3 4]
 [5 6]]
```

### Workout 3
**Question:** Can `nums` be reshaped to `(2, 4)`?  
**Answer:** No! $2 \times 4 = 8$, which exceeds the available 6 elements. NumPy will throw a `ValueError`.

---

## 36–42. Practical Programs

### Program 1: Checking Shape and Unpacking Dimensions
```python
import numpy as np

numbers = np.array([10, 20, 30, 40, 50, 60])
grid = numbers.reshape(2, 3)

# Unpack the shape tuple
total_rows, total_cols = grid.shape

print("Grid:\n", grid)
print(f"Rows: {total_rows}")
print(f"Columns: {total_cols}")
```

### Program 2: 3x3 Gradebook Matrix with Coordinate Lookup
```python
import numpy as np

marks = np.array([
    80, 75, 90,
    70, 85, 88,
    92, 78, 95
])

table = marks.reshape(3, 3)
print("Student Gradebook (3x3):")
print(table)

# Access Student 2 (row index 1), Subject 3 (col index 2)
student2_sub3 = table[1, 2]
print("Student 2, Subject 3 Mark:", student2_sub3)  # 88
```

---

## 43–44. Understanding `reshape()` Return Values & Views

When you call `arr.reshape()`, it does **not** change `arr` in place:

```python
import numpy as np

arr = np.array([1, 2, 3, 4])
arr.reshape(2, 2)  # Returns a new reshaped array!

print(arr.shape)   # Still (4,)!
```

To use the reshaped array, you **must store the returned value** into a variable:
```python
grid = arr.reshape(2, 2)
print(grid.shape)  # (2, 2)
```

---

## 45–46. Shape Practice Reference Table

| Original Size | Valid Reshapes | Invalid Reshapes |
|---|---|---|
| **4 elements** | `(2, 2)`, `(1, 4)`, `(4, 1)` | `(2, 3)`, `(3, 2)`, `(1, 5)` |
| **6 elements** | `(2, 3)`, `(3, 2)`, `(1, 6)`, `(6, 1)` | `(2, 4)`, `(3, 3)`, `(5, 2)` |
| **8 elements** | `(2, 4)`, `(4, 2)`, `(1, 8)`, `(8, 1)` | `(3, 3)`, `(2, 3)`, `(4, 3)` |
| **12 elements** | `(3, 4)`, `(4, 3)`, `(2, 6)`, `(6, 2)`, `(1, 12)`, `(12, 1)` | `(5, 2)`, `(3, 5)`, `(4, 4)` |

---

## 47–48. Real-World Pedagogical Analogies

### Analogy 1: Classroom Desks
Imagine a teacher with **6 students**.
- They can sit in a single file line of 6 desks `(6,)`.
- They can sit in 2 rows of 3 desks `(2, 3)`.
- They can sit in 3 rows of 2 desks `(3, 2)`.
- But they **cannot** occupy a classroom setup of 5 rows $\times$ 2 desks without leaving empty spots or needing 4 phantom students!

### Analogy 2: The Chocolate Box
Imagine a confectionery chef packaging **12 chocolates**.
- You can buy a flat tray of $3 \times 4$ chocolates.
- You can buy a long box of $2 \times 6$ chocolates.
- You can buy a vertical gift box of $4 \times 3$ chocolates.
- But you cannot buy a box with $5 \times 3 = 15$ slots for 12 chocolates.

---

## 49–50. Common Beginner Mistakes & How to Avoid Them

### Mistake 1: Calling `.shape()` as a Method
```python
# WRONG:
arr.shape()  # TypeError: 'tuple' object is not callable

# CORRECT:
arr.shape    # Returns (rows, cols)
```

### Mistake 2: Expecting `reshape()` to Mutate In-Place
```python
# WRONG:
arr.reshape(2, 3)
print(arr.shape)  # Still (6,)!

# CORRECT:
arr = arr.reshape(2, 3)
```

### Mistake 3: Incompatible Element Count
```python
# WRONG:
arr = np.array([1, 2, 3, 4, 5, 6])
arr.reshape(4, 2)  # ValueError! (4 * 2 = 8 != 6)

# CORRECT:
arr.reshape(3, 2)  # 3 * 2 = 6
```

### Mistake 4: Confusing `(2, 3)` with `(3, 2)`
- `(2, 3)` means **2 rows and 3 columns**.
- `(3, 2)` means **3 rows and 2 columns**.
Both contain 6 elements, but their orientations and coordinate lookups are inverted!

---

## 51. Quick Student Workouts

1. **What is the shape of `np.array([10, 20, 30])`?**  
   $\rightarrow$ `(3,)`
2. **What is the shape of `np.array([[1, 2], [3, 4]])`?**  
   $\rightarrow$ `(2, 2)`
3. **What does a shape of `(3, 4)` mean?**  
   $\rightarrow$ 3 rows and 4 columns.
4. **How many total elements are required for `reshape(2, 5)`?**  
   $\rightarrow$ $2 \times 5 = 10$.
5. **Can an array with 12 elements be reshaped into `(3, 4)`?**  
   $\rightarrow$ Yes ($3 \times 4 = 12$).
6. **Can an array with 12 elements be reshaped into `(5, 2)`?**  
   $\rightarrow$ No ($5 \times 2 = 10 \neq 12$).
7. **What is the difference between `arr.shape` and `arr.reshape(2, 3)`?**  
   $\rightarrow$ `shape` queries the current geometry; `reshape(2, 3)` returns a new array with the requested geometry.

---

## 52. 20-Minute Hands-On Practice

### Exercise 1: Basic Inspection
Create `numbers = np.array([10, 20, 30, 40, 50, 60])`. Print:
- Array: `[10 20 30 40 50 60]`
- Shape: `(6,)`
- Size: `6`
- Dimensions: `1`

### Exercise 2: Reshape to Matrix
Take `numbers` and reshape it into a 2-row, 3-column matrix. Print:
- Matrix
- Shape: `(2, 3)`

### Exercise 3: Gradebook Grid
Create a 1D array of 9 marks `[80, 75, 90, 70, 85, 88, 92, 78, 95]`. Reshape into a $3 \times 3$ grid and print the mark at row index 2, column index 1 (which is `78`).

---

## 53–59. Day 2 Main Moodle Practice

### Problem Statement: Arrange Sensor Readings into a Table
A scientific telemetry sensor has recorded 12 ambient temperature readings:
```text
28  30  31  29  27  26  30  32  33  31  29  28
```

Write a Python script that:
1. Reads the 12 temperature readings from standard input (or loads them into a 1D array).
2. Displays the original 1D array.
3. Displays its original shape.
4. Reshapes the array into **3 rows and 4 columns**.
5. Displays the reshaped 2D array.
6. Displays the new shape.
7. Displays the total number of dimensions using `.ndim`.

### Expected Output Format:
```text
Original:
[28 30 31 29 27 26 30 32 33 31 29 28]
Original Shape: (12,)
Reshaped:
[[28 30 31 29]
 [27 26 30 32]
 [33 31 29 28]]
New Shape: (3, 4)
Dimensions: 2
```

---

## 60. Moodle AI Agent Instruction

```text
You are a beginner-friendly NumPy learning assistant helping a student solve the "Reshape Sensor Readings" exercise.

Do NOT immediately provide the complete solution.

The student needs to:
1. Create a 1D NumPy array containing 12 temperature readings.
2. Display the original shape using .shape.
3. Reshape the array into 3 rows and 4 columns using .reshape(3, 4).
4. Display the reshaped 2D array.
5. Display the new shape and dimensions (.ndim).

Teaching strategy:
1. Ask the student to count how many values are present (12).
2. Help them verify: 3 rows * 4 columns = 12 elements.
3. Guide them to use .reshape(3, 4) and store the return value.
4. Explain why shape is an attribute (no parentheses) while reshape() is a method.
5. If the student gets a ValueError, ask them to check rows * columns vs array size.
6. Give one hint at a time; encourage testing different valid shapes like (4, 3) and (2, 6).
```

---

## 61–66. Interactive Visualizer Specification

The ByteLab learning interface integrates a live **Shape & Reshape Laboratory**:

```text
┌────────────────────────────────────────────────────────────┐
│                    NUMPY SHAPE LAB                         │
├───────────────────────┬────────────────────────────────────┤
│ 1D ORIGINAL ARRAY     │ RESHAPED 2D MATRIX                 │
│                       │                                    │
│ [28 30 31 29 27 26    │ ┌────┬────┬────┬────┐              │
│  30 32 33 31 29 28]   │ │ 28 │ 30 │ 31 │ 29 │  Row 0       │
│                       │ ├────┼────┼────┼────┤              │
│ shape = (12,)         │ │ 27 │ 26 │ 30 │ 32 │  Row 1       │
│ ndim  = 1             │ ├────┼────┼────┼────┤              │
│ size  = 12            │ │ 33 │ 31 │ 29 │ 28 │  Row 2       │
│                       │ └────┴────┴────┴────┘              │
│                       │ shape = (3, 4)                     │
│                       │ ndim  = 2                          │
└───────────────────────┴────────────────────────────────────┘
```

---

## 70–73. Day 2 Cheat Sheet & Memory Tricks

```python
# Check Geometry
arr.shape          # e.g., (12,) or (3, 4)
arr.ndim           # e.g., 1 or 2
arr.size           # e.g., 12

# Create 1D Array (Line)
vec = np.array([10, 20, 30])          # shape = (3,)

# Create 2D Array (Table)
mat = np.array([[1, 2], [3, 4]])      # shape = (2, 2)

# Reshape (Same Elements, New Geometry)
new_mat = arr.reshape(rows, cols)     # rule: rows * cols == size
```

### Memory Hooks:
- **1D** = Line $\rightarrow$ `(n,)`
- **2D** = Table $\rightarrow$ `(rows, columns)`
- **`.shape`** = Look $\rightarrow$ *"Tell me how it is arranged."*
- **`reshape()`** = Transform $\rightarrow$ *"Arrange the same data this way."*

---

## 74–76. Final Challenge: Student Marks Table Analysis

### Challenge Problem:
A university instructor records exam marks for 12 students:
```python
marks = np.array([
    78, 85, 90, 72,
    88, 91, 67, 75,
    82, 95, 70, 84
])
```

Write a program that:
1. Prints the original marks array and its shape `(12,)`.
2. Reshapes the array into **3 rows and 4 columns**.
3. Prints the reshaped marks table and new shape `(3, 4)`.
4. Prints `.ndim` and `.size`.
5. Accesses and prints the element at **row 1, column 2** (which is `67`, using zero-indexed notation).

### Expected Output:
```text
Original Marks:
[78 85 90 72 88 91 67 75 82 95 70 84]
Original Shape: (12,)
Marks Table:
[[78 85 90 72]
 [88 91 67 75]
 [82 95 70 84]]
New Shape: (3, 4)
Dimensions: 2
Total Elements: 12
Row 1, Column 2: 67
```

---

## 77–80. Unit-V Progression & Summary

### Learning Path:
$$\text{Create Array} \longrightarrow \text{Inspect Attributes} \longrightarrow \text{Understand Dimensions} \longrightarrow \text{Reshape into Matrices}$$

### The Three Core Takeaways:
1. **`.shape`** is an attribute returning a tuple describing element counts per axis.
2. **`.ndim`** indicates the number of dimensions (1 for line, 2 for table, 3 for cube).
3. **`reshape()`** rearranges the same elements into a new shape, provided $\text{rows} \times \text{cols} = \text{total elements}$.
