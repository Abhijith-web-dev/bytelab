# Unit–V — Day 6: Introduction to Pandas Series

**Duration:** 90 Minutes  
**Teaching Focus:** 45 Minutes Teaching + 20 Minutes Practice + 25 Minutes Review, Quiz and Practical Problem Solving  
**Level:** Beginner  
**Unit:** Unit–V — NumPy and Pandas  
**Day:** 6 (Day 54 of 65)  

---

## 1. Learning Objectives

By the end of this session, students should be able to:

1. **Explain** what the Pandas library is and why it is the standard for tabular data analysis.
2. **Explain** what a Pandas Series is and how it represents a one-dimensional labeled dataset.
3. **Differentiate** between a raw Python list, a NumPy array, and a Pandas Series.
4. **Create** a Series with default integer indexing and custom string labels (`index=[...]`).
5. **Understand** the core relationship: $\text{Series} = \text{Values} + \text{Index}$.
6. **Access** Series elements safely using `.loc` (label-based) and `.iloc` (position-based).
7. **Select** multiple elements using label lists and position lists (`loc[['A', 'B']]`, `iloc[[0, 2]]`).
8. **Slice** a Series using position ranges (`iloc[start:stop]`).
9. **Modify** existing Series values and dynamically append new labeled entries.
10. **Perform** vectorized arithmetic on a Series with scalars (`+`, `-`, `*`, `/`).
11. **Perform** operations between two Series and understand label alignment behavior.
12. **Calculate** basic summary statistics using `.sum()`, `.mean()`, `.min()`, and `.max()`.

---

## 2. 90-Minute Session Plan

| Time Window | Topic | Pedagogical Activity & Focus |
|---|---|---|
| **0–5 min** | **Day 5 Recap** | Review NumPy math functions (`sqrt`, `square`, `abs`, `sum`, `mean`). |
| **5–12 min** | **What is Pandas?** | The transition from raw numerical arrays to structured, labeled data. |
| **12–20 min** | **NumPy vs Pandas** | Core differences: positions vs meaningful index labels. |
| **20–30 min** | **Series Architecture** | Visualizing $\text{Series} = \text{Values} + \text{Index}$. |
| **30–40 min** | **Creating a Series** | Default numeric index vs custom string index (`pd.Series()`). |
| **40–45 min** | **Accessing Elements** | Mastering `.loc` (label) and `.iloc` (integer location). |
| **45–52 min** | **Guided Example** | Student gradebook: looking up student scores by name and index. |
| **52–65 min** | **Series Operations** | Vectorized scalar arithmetic and basic aggregations (`sum`, `mean`). |
| **65–73 min** | **Modifying Series** | Updating values in-place and adding new labeled entries. |
| **73–80 min** | **Real-World Problems** | Product pricing discounts, daily sales, and temperature sensors. |
| **80–85 min** | **Moodle Practice Lab** | Independent coding: *Student Marks Series*. |
| **85–90 min** | **Quiz & Reflection** | 10-question knowledge check, memory tricks, and cheat sheet. |

---

## 3. Start with a Real-World Question

Suppose a high school teacher records exam marks for four students:

```text
Arun    85
Priya   92
Rahul   78
Meena   88
```

In standard Python, we could store these scores in a list:
```python
marks = [85, 92, 78, 88]
```

Or in a NumPy array:
```python
import numpy as np
marks = np.array([85, 92, 78, 88])
```

**The Problem:**
Neither the list nor the raw NumPy array knows *who* earned which score!
- Is `85` Arun's score or Rahul's?
- If the array gets sorted or filtered, how do we track the owner?
- We have to maintain a separate parallel list of student names: `names = ["Arun", "Priya", "Rahul", "Meena"]`.

**The Solution:**
We need a data structure where **every single value is permanently attached to a meaningful label**.
That data structure is the **Pandas Series**.

---

## 4. What is Pandas?

**Pandas** is the industry-standard Python library for working with structured, labeled, and tabular datasets.

It is widely used across data science, finance, engineering, and artificial intelligence for:
- Reading CSV, Excel, SQL, and JSON files.
- Cleaning dirty or missing data.
- Filtering, sorting, and grouping tables.
- Time series analysis.
- Preparing datasets for machine learning models.

In Unit–V, we begin with Pandas' foundational building block: the **Series** (1D labeled data), before expanding to the **DataFrame** (2D labeled tables).

---

## 5. What is a Series?

A **Pandas Series** is a one-dimensional labeled data structure capable of holding any data type (integers, floats, strings, booleans).

> [!TIP]
> Think of a Pandas Series as a **single column in a spreadsheet** where each row has a specific label (the index).

```python
import pandas as pd

marks = pd.Series([85, 92, 78, 88])
print(marks)
```

**Output:**
```text
0    85
1    92
2    78
3    88
dtype: int64
```

---

## 6. Understanding the Series Output

Examining the printed output:
```text
0    85
1    92
2    78
3    88
dtype: int64
```

Notice the three distinct sections:
1. **Left Column (`0, 1, 2, 3`)**: The **Index** (labels identifying each entry).
2. **Right Column (`85, 92, 78, 88`)**: The **Values** (the actual data stored).
3. **Bottom Line (`dtype: int64`)**: The **Data Type** of the elements stored inside.

---

## 7. Series = Values + Index

The most important mental model for a beginner is:

$$\text{Pandas Series} = \text{Values} + \text{Index}$$

```text
       ┌───────────────┬───────────────┐
       │     INDEX     │     VALUE     │
       │    (Labels)   │    (Data)     │
       ├───────────────┼───────────────┤
       │       0       │      85       │
       │       1       │      92       │
       │       2       │      78       │
       │       3       │      88       │
       └───────────────┴───────────────┘
```

---

## 8. Why is the Index Useful?

When we create a Series without specifying an index, Pandas assigns default integer labels: `0, 1, 2, ...`.
However, we can provide meaningful, custom labels:

```python
import pandas as pd

marks = pd.Series(
    [85, 92, 78, 88],
    index=["Arun", "Priya", "Rahul", "Meena"]
)

print(marks)
```

**Output:**
```text
Arun     85
Priya    92
Rahul    78
Meena    88
dtype: int64
```

Now the data is completely self-describing! We do not need a separate lookup table—Arun is permanently bound to 85.

---

## 9. Importing Pandas

By universal Python community convention, Pandas is imported using the alias `pd`:

```python
import pandas as pd
```

To create a Series:
```python
s = pd.Series(data, index=optional_labels)
```

---

## 10. Creating a Basic Series (Default Index)

```python
import pandas as pd

numbers = pd.Series([10, 20, 30, 40])
print(numbers)
```

**Output:**
```text
0    10
1    20
2    30
3    40
dtype: int64
```

---

## 11. Creating a Series with a Custom Index

```python
import pandas as pd

marks = pd.Series(
    [85, 92, 78],
    index=["Arun", "Priya", "Rahul"]
)

print(marks)
```

**Output:**
```text
Arun     85
Priya    92
Rahul    78
dtype: int64
```

---

## 12. Default Index vs Custom Index

| Aspect | Default Index | Custom Index |
|---|---|---|
| **Definition** | `pd.Series([10, 20, 30])` | `pd.Series([10, 20, 30], index=['A', 'B', 'C'])` |
| **Labels** | `0, 1, 2, ...` (integers) | `'A', 'B', 'C'` (custom strings or dates) |
| **Access** | `s[0]` or `s.iloc[0]` | `s.loc['A']` or `s.iloc[0]` |
| **Readability**| Position-based only | Human-readable and domain-specific |

---

## 13. Real-World Example — Employee Salaries

```python
import pandas as pd

salaries = pd.Series(
    [25000, 30000, 28000],
    index=["Arun", "Priya", "Rahul"]
)

print(salaries)
```

**Output:**
```text
Arun     25000
Priya    30000
Rahul    28000
dtype: int64
```

---

## 14. Real-World Example — Product Prices

```python
import pandas as pd

prices = pd.Series(
    [100, 250, 500],
    index=["Pen", "Bag", "Shoes"]
)

print(prices)
```

**Output:**
```text
Pen      100
Bag      250
Shoes    500
dtype: int64
```

---

## 15. Accessing Series Elements by Label

Given a Series with custom labels:
```python
marks = pd.Series(
    [85, 92, 78, 88],
    index=["Arun", "Priya", "Rahul", "Meena"]
)
```

We can retrieve any student's mark directly using their name:
```python
print(marks["Arun"])   # 85
print(marks["Priya"])  # 92
```

---

## 16. Accessing Using Default Numeric Index

When using default numeric indexes:
```python
numbers = pd.Series([10, 20, 30, 40])
print(numbers[0])  # 10
print(numbers[2])  # 30
```

> [!WARNING]
> While `series[key]` works for simple cases, it can cause confusion when an index contains numbers that don't match 0-based positions (e.g. index `[10, 20, 30]`). For this reason, professional Pandas developers use **`.loc`** and **`.iloc`**.

---

## 17. The Safer Position-Based Method: `.iloc`

`iloc` stands for **Integer Location**. It strictly accesses values based on their 0-based integer physical position `[0, 1, 2, ...]`, completely ignoring custom labels.

```python
import pandas as pd

marks = pd.Series(
    [85, 92, 78],
    index=["Arun", "Priya", "Rahul"]
)

print(marks.iloc[0])  # First position  -> 85 (Arun)
print(marks.iloc[1])  # Second position -> 92 (Priya)
print(marks.iloc[2])  # Third position  -> 78 (Rahul)
```

---

## 18. Label-Based Access with `.loc`

`loc` stands for **Label Location**. It strictly accesses values based on their user-defined index names.

```python
import pandas as pd

marks = pd.Series(
    [85, 92, 78],
    index=["Arun", "Priya", "Rahul"]
)

print(marks.loc["Priya"])  # Label "Priya" -> 92
print(marks.loc["Arun"])   # Label "Arun"  -> 85
```

---

## 19. `.loc` vs `.iloc` Side-by-Side

| Feature | `.loc` | `.iloc` |
|---|---|---|
| **Full Form** | Label Location | Integer Location |
| **Lookup Mode** | By **Name / Label** | By **Position Index** |
| **Input Type** | String, date, or index label | Integer `0, 1, 2, ...` |
| **Example** | `marks.loc["Priya"]` $\rightarrow$ `92` | `marks.iloc[1]` $\rightarrow$ `92` |
| **Negative Indices** | No (unless label is literally negative) | Yes (`marks.iloc[-1]` for last) |

```text
┌───────────────────────────────────────────────┐
│                 ACCESS MODES                  │
├───────────────────────┬───────────────────────┤
│         .loc          │         .iloc         │
│     (Label-based)     │    (Position-based)   │
├───────────────────────┼───────────────────────┤
│ marks.loc["Priya"]    │ marks.iloc[1]         │
│ └─ Looks for "Priya"  │ └─ Looks at slot 1    │
│    in index column    │    in memory          │
└───────────────────────┴───────────────────────┘
```

---

## 20. Accessing Multiple Values with `.loc`

Pass a list of labels to extract multiple entries at once:
```python
selected = marks.loc[["Arun", "Rahul"]]
print(selected)
```

**Output:**
```text
Arun     85
Rahul    78
dtype: int64
```

---

## 21. Position-Based Multiple Selection with `.iloc`

Pass a list of integer positions:
```python
selected = marks.iloc[[0, 2]]
print(selected)
```

**Output:**
```text
Arun     85
Rahul    78
dtype: int64
```

---

## 22. Series Slicing

A Series can be sliced similarly to Python lists using `.iloc[start:stop]`:

```python
numbers = pd.Series([10, 20, 30, 40, 50])
print(numbers.iloc[1:4])
```

**Output:**
```text
1    20
2    30
3    40
dtype: int64
```

*(Position 1 included, position 4 excluded).*

---

## 23. Accessing the First Value

```python
# Guaranteed first element regardless of index type:
first_val = numbers.iloc[0]
print(first_val)  # 10
```

---

## 24. Accessing the Last Value

Using negative index with `.iloc`:
```python
last_val = numbers.iloc[-1]
print(last_val)  # 50
```

---

## 25. Modifying a Series Element by Position

Series are mutable objects. You can modify any value in-place:

```python
import pandas as pd

marks = pd.Series([80, 70, 90])
marks.iloc[1] = 85  # Update slot 1 from 70 to 85

print(marks)
```

**Output:**
```text
0    80
1    85
2    90
dtype: int64
```

---

## 26. Modifying by Label

```python
marks = pd.Series(
    [80, 70, 90],
    index=["Maths", "English", "Science"]
)

marks.loc["English"] = 85

print(marks)
```

**Output:**
```text
Maths      80
English    85
Science    90
dtype: int64
```

---

## 27. Adding a New Labeled Entry

You can expand a Series by assigning to a new label that does not exist yet:

```python
marks.loc["Computer"] = 95
print(marks)
```

**Output:**
```text
Maths       80
English     85
Science     90
Computer    95
dtype: int64
```

---

## 28. Series Arithmetic: Scalar Operations

Just like NumPy arrays, Pandas Series support vectorized scalar operations without loops:

```python
import pandas as pd

marks = pd.Series([60, 70, 80, 90])
print(marks + 5)
```

**Output:**
```text
0    65
1    75
2    85
3    95
dtype: int64
```

---

## 29. Series Multiplication

```python
marks = pd.Series([60, 70, 80])
print(marks * 2)
```

**Output:**
```text
0    120
1    140
2    160
dtype: int64
```

---

## 30. Series Subtraction

```python
marks = pd.Series([80, 70, 90])
print(marks - 5)
```

**Output:**
```text
0    75
1    65
2    85
dtype: int64
```

---

## 31. Series Division

Division converts integer Series to floating-point (`float64`):
```python
marks = pd.Series([80, 70, 90])
print(marks / 2)
```

**Output:**
```text
0    40.0
1    35.0
2    45.0
dtype: float64
```

---

## 32. Series + Series (Element-Wise Alignment)

When adding two Series with identical indexes, values add position by position:

```python
import pandas as pd

first = pd.Series([10, 20, 30])
second = pd.Series([1, 2, 3])

print(first + second)
```

**Output:**
```text
0    11
1    22
2    33
dtype: int64
```

---

## 33. Why Indexes Matter in Series Operations

When custom labels match:
```python
a = pd.Series([10, 20, 30], index=["A", "B", "C"])
b = pd.Series([1, 2, 3], index=["A", "B", "C"])

print(a + b)
```

**Output:**
```text
A    11
B    22
C    33
dtype: int64
```

---

## 34. Label Alignment and Missing Values (`NaN`)

If two Series have differing labels, Pandas automatically aligns by label name and introduces `NaN` (*Not a Number*) for missing counterparts:

```python
a = pd.Series([10, 20, 30], index=["A", "B", "C"])
b = pd.Series([1, 2, 3], index=["A", "C", "D"])

print(a + b)
```

**Output:**
```text
A    11.0
B     NaN
C    32.0
D     NaN
dtype: float64
```

- Label `A`: $10 + 1 = 11.0$
- Label `B`: Exists only in `a` $\rightarrow \text{NaN}$
- Label `C`: $30 + 2 = 32.0$
- Label `D`: Exists only in `b` $\rightarrow \text{NaN}$

---

## 35. NumPy Array vs Pandas Series

```python
# NumPy: raw numbers
import numpy as np
marks_np = np.array([80, 90, 70])

# Pandas: numbers with identity
import pandas as pd
marks_pd = pd.Series([80, 90, 70], index=["Arun", "Priya", "Rahul"])
```

---

## 36. NumPy vs Pandas — Comparison Table

| Feature | NumPy Array | Pandas Series |
|---|---|---|
| **Primary Goal** | High-performance numerical computing | Labeled data analysis & transformation |
| **Labels / Index** | Integer indices only (`0, 1, 2`) | Custom semantic labels (`"Arun"`, `"Monday"`) |
| **Access Methods** | `arr[0]`, `arr[0:2]` | `.loc['label']`, `.iloc[0]` |
| **Label Alignment**| Fails if shapes mismatch | Automatically matches by label (`NaN` on missing) |
| **Built-in Stats** | `np.mean(arr)`, `np.sum(arr)` | `s.mean()`, `s.sum()`, `s.max()`, `s.min()` |

---

## 37. Real-World Example — Student Marks Analysis

```python
import pandas as pd

marks = pd.Series(
    [85, 92, 78],
    index=["Arun", "Priya", "Rahul"]
)
```

---

## 38. Series Total: `.sum()`

```python
marks = pd.Series([80, 75, 90, 85])
print("Total Marks:", marks.sum())  # 330
```

---

## 39. Series Average: `.mean()`

```python
print("Average Score:", marks.mean())  # 82.5
```

---

## 40. Series Maximum and Minimum: `.max()` and `.min()`

```python
print("Highest Mark:", marks.max())  # 90
print("Lowest Mark: ", marks.min())  # 75
```

---

## 41. Real-World Example — Weekly Sales

```python
import pandas as pd

sales = pd.Series(
    [1000, 1500, 1200, 1800],
    index=["Monday", "Tuesday", "Wednesday", "Thursday"]
)

print("Total Sales:  ", sales.sum())    # 5500
print("Average Sales:", sales.mean())   # 1375.0
print("Peak Day:     ", sales.max())    # 1800
print("Slowest Day:  ", sales.min())    # 1000
```

---

## 42. Real-World Example — Daily Temperature Sensor

```python
import pandas as pd

temperature = pd.Series(
    [28, 30, 31, 29],
    index=["Morning", "Noon", "Afternoon", "Evening"]
)

print("Afternoon Temp:", temperature.loc["Afternoon"])  # 31
```

---

## 43. Temperature Adjustment (Sensor Calibration)

```python
# Sensor calibrated: add 2 degrees to every reading
corrected = temperature + 2
print(corrected)
```

**Output:**
```text
Morning        30
Noon           32
Afternoon      33
Evening        31
dtype: int64
```

---

## 44. Real-World Example — Product Pricing Discount

```python
import pandas as pd

prices = pd.Series(
    [100, 250, 500],
    index=["Pen", "Bag", "Shoes"]
)

# Apply flat ₹20 festive voucher:
discounted = prices - 20
print(discounted)
```

**Output:**
```text
Pen       80
Bag      230
Shoes    480
dtype: int64
```

---

## 45. Real-World Example — Employee Salary Increment

```python
import pandas as pd

salary = pd.Series(
    [20000, 25000, 30000],
    index=["Arun", "Priya", "Rahul"]
)

new_salary = salary + 2000
print(new_salary)
```

**Output:**
```text
Arun     22000
Priya    27000
Rahul    32000
dtype: int64
```

---

## 46. Series Operations with Formulas (Percentage Markup)

```python
import pandas as pd

price = pd.Series([100, 200, 300])

# 10% inflation adjustment (multiply by 1.10)
new_price = price * 1.10
print(new_price)
```

**Output:**
```text
0    110.0
1    220.0
2    330.0
dtype: float64
```

---

## 47. Combining Multiple Series Operations

```python
price = pd.Series([100, 200, 300])

# 10% markup followed by ₹5 loyalty coupon:
final_price = (price * 1.10) - 5
print(final_price)
```

**Output:**
```text
0    105.0
1    215.0
2    325.0
dtype: float64
```

---

## 48. Student Marks — Bonus and Curve Calculation

```python
import pandas as pd

marks = pd.Series(
    [70, 80, 90, 60],
    index=["Arun", "Priya", "Rahul", "Meena"]
)

# Add 5 bonus marks:
updated_marks = marks + 5

print("Updated Marks:")
print(updated_marks)
print("Average Score:", updated_marks.mean())
```

**Output:**
```text
Updated Marks:
Arun     75
Priya    85
Rahul    95
Meena    65
dtype: int64
Average Score: 80.0
```

---

## 49. The Core Pandas Workflow

```text
Create Series  ──►  Access with .loc/.iloc  ──►  Modify In-Place  ──►  Vectorized Math  ──►  Summary Stats
```

---

## 50–53. Practical Demonstration Programs

### Program 1: Student Gradebook
```python
import pandas as pd

marks = pd.Series(
    [80, 75, 90, 85],
    index=["Arun", "Priya", "Rahul", "Meena"]
)

print("Original Marks:\n", marks, sep="")
print("\nPriya's Score:", marks.loc["Priya"])

# Update Priya's re-evaluated mark:
marks.loc["Priya"] = 82
print("\nUpdated Marks:\n", marks, sep="")
print("Total:  ", marks.sum())
print("Average:", marks.mean())
```

### Program 2: Weekly Sales Update
```python
import pandas as pd

sales = pd.Series(
    [1000, 1500, 1200, 1800],
    index=["Monday", "Tuesday", "Wednesday", "Thursday"]
)

sales.loc["Tuesday"] = 1600
print("Updated Total:", sales.sum())
print("Updated Mean: ", sales.mean())
```

---

## 56. The Golden Rule for Beginners

> [!IMPORTANT]
> **Use `.loc` when you are thinking about NAMES / LABELS.**  
> **Use `.iloc` when you are thinking about POSITIONS / SLOTS.**

---

## 59–62. Common Beginner Mistakes

### Mistake 1: Forgetting the Import
```python
# INCORRECT:
s = pd.Series([1, 2, 3])  # NameError: name 'pd' is not defined

# CORRECT:
import pandas as pd
s = pd.Series([1, 2, 3])
```

### Mistake 2: Confusing `.loc` and `.iloc`
```python
marks = pd.Series([80, 90, 70], index=["Arun", "Priya", "Rahul"])

# INCORRECT:
print(marks.loc[1])       # KeyError: 1 is NOT in the index ['Arun', 'Priya', 'Rahul']

# CORRECT:
print(marks.loc["Priya"])  # 90
print(marks.iloc[1])       # 90
```

### Mistake 3: Assuming Series Arithmetic Overwrites Variables
Evaluating `marks + 5` computes a new Series—it does NOT permanently modify `marks`!
```python
marks + 5          # Returns new Series, marks is unchanged!
updated = marks + 5 # Stored into updated variable
```

---

## 63. Quick Student Workouts

1. What default indices are created for `pd.Series([10, 20, 30])`?  
   **Answer:** `0, 1, 2`
2. What does `marks.iloc[0]` mean?  
   **Answer:** Get the value stored at physical position 0.
3. What does `marks.loc["Arun"]` mean?  
   **Answer:** Get the value corresponding to label "Arun".
4. What does `marks + 5` do?  
   **Answer:** Adds 5 to every value in the Series.
5. What does `marks.sum()` compute?  
   **Answer:** The grand total sum of all values.
6. What does `marks.mean()` compute?  
   **Answer:** The arithmetic average.

---

## 64–68. 20-Minute Guided Practice Section

### Practice 1: Create a Series
```python
import pandas as pd
numbers = pd.Series([10, 20, 30, 40, 50])
print("First Value (iloc[0]): ", numbers.iloc[0])   # 10
print("Last Value (iloc[-1]):  ", numbers.iloc[-1])  # 50
```

### Practice 2: Custom Index Lookup
```python
import pandas as pd
marks = pd.Series([80, 90, 70], index=["Arun", "Priya", "Rahul"])
print("Priya's Mark:", marks.loc["Priya"])  # 90
```

### Practice 3: In-Place Modification
```python
marks.loc["Rahul"] = 75
print("Updated Rahul:\n", marks, sep="")
```

### Practice 4: Vectorized Arithmetic & Summary
```python
scores = pd.Series([60, 70, 80, 90])
print("Plus 5: ", scores + 5)
print("Total:  ", scores.sum())   # 300
print("Average:", scores.mean())  # 75.0
print("Max:    ", scores.max())   # 90
print("Min:    ", scores.min())   # 60
```

---

## 69–75. Main Moodle Practice: Student Marks Series

### Problem Statement:
A teacher records marks for four students:
- Arun: `80`
- Priya: `90`
- Rahul: `75`
- Meena: `85`

Write a Python program using Pandas to:
1. Import Pandas as `pd`.
2. Create a Series with student names as the index.
3. Display the complete Series.
4. Display Priya's mark using `.loc`.
5. Display the first student's mark using `.iloc`.
6. Add 5 bonus marks to every student.
7. Display the updated marks.
8. Display the total of the updated marks.
9. Display the average of the updated marks.
10. Change Rahul's original mark to 78.
11. Display the marks after Rahul's update.

### Expected Output:
```text
Student Marks:
Arun     80
Priya    90
Rahul    75
Meena    85

Priya's Mark: 90

First Student Mark: 80

Updated Marks:
Arun     85
Priya    95
Rahul    80
Meena    90

Total: 350
Average: 87.5

Marks After Rahul Update:
Arun     80
Priya    90
Rahul    78
Meena    85
```

---

## 71–73. Test Cases

### Test Case 1 (Standard Class Data)
Input:
```text
80 90 75 85
```
Expected Output:
```text
Student Marks:
Arun     80
Priya    90
Rahul    75
Meena    85

Priya's Mark: 90

First Student Mark: 80

Updated Marks:
Arun     85
Priya    95
Rahul    80
Meena    90

Total: 350
Average: 87.5

Marks After Rahul Update:
Arun     80
Priya    90
Rahul    78
Meena    85
```

### Test Case 2 (Uniform Intervals)
Input:
```text
60 70 80 90
```
Expected Output:
```text
Student Marks:
Arun     60
Priya    70
Rahul    80
Meena    90

Priya's Mark: 70

First Student Mark: 60

Updated Marks:
Arun     65
Priya    75
Rahul    85
Meena    95

Total: 320
Average: 80.0

Marks After Rahul Update:
Arun     60
Priya    70
Rahul    78
Meena    90
```

### Test Case 3 (Base Remedial Cohort)
Input:
```text
40 50 60 70
```
Expected Output:
```text
Student Marks:
Arun     40
Priya    50
Rahul    60
Meena    70

Priya's Mark: 50

First Student Mark: 40

Updated Marks:
Arun     45
Priya    55
Rahul    65
Meena    75

Total: 240
Average: 60.0

Marks After Rahul Update:
Arun     40
Priya    50
Rahul    78
Meena    70
```

---

## 74. Requirements

- Use `import pandas as pd`
- Use `pd.Series(values, index=names)`
- Access Priya via `marks.loc["Priya"]`
- Access the first student via `marks.iloc[0]`
- Use `marks + 5` for bonus calculations
- Use `.sum()` and `.mean()` for summary statistics
- Update Rahul's mark via `marks.loc["Rahul"] = 78`
- Print Series without extra dataframe formatting using `.to_string()` where required to match whitespace.

---

## 75. Beginner Hints

- **Hint 1:** Create names and scores: `index = ["Arun", "Priya", "Rahul", "Meena"]`.
- **Hint 2:** Create Series: `marks = pd.Series([80, 90, 75, 85], index=index)`.
- **Hint 3:** For label access: `marks.loc["Priya"]`.
- **Hint 4:** For position access: `marks.iloc[0]`.
- **Hint 5:** Calculate bonus: `updated = marks + 5`.
- **Hint 6:** Calculate total: `updated.sum()`.
- **Hint 7:** Calculate average: `updated.mean()`.
- **Hint 8:** Mutate Rahul: `marks.loc["Rahul"] = 78`.

---

## 76. Moodle AI Agent Instruction

```text
You are a beginner-friendly Python and Pandas learning assistant helping a student solve the "Student Marks Series" exercise.

Do NOT immediately provide the complete solution.

Teaching strategy:
1. First ask the student to identify the four student names and marks.
2. Guide them to import pandas as pd.
3. Help them construct: pd.Series([80, 90, 75, 85], index=['Arun', 'Priya', 'Rahul', 'Meena']).
4. Remind them:
   - loc uses labels: marks.loc['Priya']
   - iloc uses integer positions: marks.iloc[0]
5. For the bonus scores: updated = marks + 5.
6. For statistics: updated.sum() and updated.mean().
7. For in-place modification: marks.loc['Rahul'] = 78.
8. If KeyError occurs, check string spelling in index labels.
9. Give one hint at a time.
```

---

## 77–86. Moodle IDE Concept for Day 6

Interactive workspace layout:
- **Left:** Python Code Editor.
- **Right:** Pandas Series Inspector:
  - Visual 2-Column Grid: `[Arun: 80]`, `[Priya: 90]`, `[Rahul: 75]`, `[Meena: 85]`.
  - `.loc` Indicator: Highlights row by matching label string.
  - `.iloc` Indicator: Highlights row by matching physical slot index `[0..3]`.
  - Aggregations Banner: Total (`350`), Mean (`87.5`).

---

## 89. Day 6 Quiz — Questions and Answers

1. What is Pandas mainly used for?  
   **Answer:** B. Data processing and analysis
2. What is a Pandas Series?  
   **Answer:** B. A one-dimensional labeled data structure
3. Which function creates a Series?  
   **Answer:** B. `pd.Series()`
4. What does the index of a Series represent?  
   **Answer:** A. Labels/positions used to identify entries
5. What does `.loc` primarily use?  
   **Answer:** B. Labels
6. What does `.iloc` primarily use?  
   **Answer:** B. Integer positions
7. What is the result of `marks = pd.Series([10, 20, 30]); marks + 5`?  
   **Answer:** B. `[15, 25, 35]`
8. Which method calculates the total of a Series?  
   **Answer:** B. `sum()`
9. Which method calculates the average?  
   **Answer:** B. `mean()`
10. What is the difference between NumPy and a Pandas Series?  
    **Answer:** A. NumPy is focused on numerical arrays, while a Series provides one-dimensional labeled data

---

## 90. Day 6 Cheat Sheet

```python
import pandas as pd

# Creating Series
s = pd.Series([10, 20, 30])                         # Default index (0, 1, 2)
marks = pd.Series([80, 90, 75], index=["A", "B", "C"]) # Custom index

# Accessing
marks.loc["B"]      # By label -> 90
marks.iloc[1]       # By position -> 90
marks.iloc[-1]      # Last element -> 75

# Modifying
marks.loc["B"] = 95 # Modify in-place
marks.loc["D"] = 88 # Add new labeled element

# Vectorized Arithmetic
marks + 5           # Add 5 to every element
marks * 2           # Double every element

# Summary Statistics
marks.sum()         # Grand total
marks.mean()        # Arithmetic mean
marks.max()         # Highest value
marks.min()         # Lowest value
```

---

## 91–92. Memory Tricks

- **`LOC`** $\rightarrow$ **Label Location** (`marks.loc['Arun']`).
- **`ILOC`** $\rightarrow$ **Integer Location** (`marks.iloc[0]`).
- **`Series`** $\rightarrow$ **Index + Values** (a spreadsheet column with names).

---

## 95–97. Final Challenge — Sales Analysis Series

### Problem Statement:
A shop records sales for five days:
- Monday: `1000`
- Tuesday: `1500`
- Wednesday: `1200`
- Thursday: `1800`
- Friday: `1600`

Write a program to:
1. Create a Series using days as the index.
2. Display Tuesday's sales using `.loc`.
3. Display the first day's sales using `.iloc`.
4. Increase every day's sales by 10% (`sales * 1.10`).
5. Calculate total and average updated sales.
6. Change Thursday's original sales to 1900 in-place.
7. Display the final Series.

### Expected Output:
```text
Sales:
Monday       1000
Tuesday      1500
Wednesday    1200
Thursday     1800
Friday       1600

Tuesday Sales: 1500
First Day Sales: 1000

Updated Sales:
Monday       1100.0
Tuesday      1650.0
Wednesday    1320.0
Thursday     1980.0
Friday       1760.0

Total: 7810.0
Average: 1562.0

Final Sales:
Monday       1000
Tuesday      1500
Wednesday    1200
Thursday     1900
Friday       1600
```

---

## 101. Final Key Message for Students

> **A Pandas Series is not just an array—it is a labeled column of information.**
>
> 1. Remember: $\text{Series} = \text{Index} + \text{Values}$.
> 2. Use `.loc` when you have a **label name**; use `.iloc` when you have a **numerical slot position**.
> 3. Enjoy the speed of vectorized arithmetic without writing manual `for` loops.
