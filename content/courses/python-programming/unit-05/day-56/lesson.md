# Unit–V — Day 8: Missing Data and Combining DataFrames

**Duration:** 90 Minutes  
**Teaching Focus:** 45 Minutes Concept Teaching + 20 Minutes Basic Practice + 25 Minutes Review, Quiz and Problem Solving  
**Level:** Beginner  
**Unit:** Unit–V – NumPy and Pandas  
**Day:** 8  

---

## 1. Learning Objectives

By the end of this session, students will be able to:
1. **Explain** what missing data means and why it inevitably occurs in real-world data collection.
2. **Identify** missing values in a Pandas DataFrame and understand what `NaN` (Not a Number) represents.
3. **Use** `.isna()` and `.isnull()` to generate boolean masks detecting absent observations.
4. **Count** missing values across columns using vectorized boolean summation (`.isna().sum()`).
5. **Use** `.notna()` to identify and filter available, non-null observations.
6. **Impute** missing values using `.fillna()` with fixed scalars (e.g., `0`, `"Unknown"`) or statistical aggregates (e.g., column mean).
7. **Remove** incomplete records using `.dropna()`.
8. **Evaluate** trade-offs to decide whether to impute (`fillna`) or delete (`dropna`) missing records.
9. **Combine** DataFrames vertically and horizontally using `pd.concat()`.
10. **Reset** row indexes after stacking using `ignore_index=True`.
11. **Merge** related DataFrames based on a shared key column using `pd.merge(df1, df2, on="Key")`.
12. **Join** DataFrames by aligning row indexes using `df1.join(df2)`.
13. **Apply** the golden memory triad:
    - **Concat = Stack**
    - **Merge = Match**
    - **Join = Index**
14. **Construct** an end-to-end data pipeline: Detect Missing $\to$ Clean Data $\to$ Combine Multi-Table Datasets.

---

## 2. 90-Minute Session Plan

| Time Window | Session Phase | Core Topics & Activities |
| :--- | :--- | :--- |
| **0–5 min** | **Day 7 Recap** | DataFrames as 2D tables, rows as records, columns as Series, selection with `.loc` and `.iloc`. |
| **5–12 min** | **Missing Data Foundations** | Real-world causes of missing data; why `None` becomes `NaN` in numerical series. |
| **12–22 min** | **Detecting Missing Values** | Using `.isna()`, `.isnull()`, and `.notna()`; counting nulls with `.sum()`; checking with `.any()`. |
| **22–32 min** | **Handling Missing Values** | Imputation with `.fillna(0)`, text replacement, mean imputation; row pruning with `.dropna()`. |
| **32–40 min** | **Choosing a Strategy** | Decision framework: when to keep and impute vs when to discard incomplete rows. |
| **40–45 min** | **Combining Data: The Big Picture** | Why real data lives in multiple tables; vertical stacking vs horizontal relational matching. |
| **45–53 min** | **Stacking with `concat()`** | `pd.concat([df1, df2])`, index resetting with `ignore_index=True`, `axis=0` vs `axis=1`. |
| **53–63 min** | **Relational Matching with `merge()`** | Joining tables using primary keys (`on="ID"`); how Pandas matches records by entity identity. |
| **63–70 min** | **Index Joins with `join()`** | Combining by matching index labels; comparing `concat` vs `merge` vs `join`. |
| **70–78 min** | **Guided Practical Pipeline** | Cleaning student marks and merging with student demographic profiles. |
| **78–85 min** | **Hands-on Practice** | Solving the *Student Data Cleaner and Combiner* challenge in the arena. |
| **85–90 min** | **Review & Quiz** | 10-question formative assessment and key mental model reinforcement. |

---

## 3. Quick Recap from Day 7

In Day 7, we learned that a **DataFrame** is a 2D labeled data structure with aligned rows and columns:

```python
import pandas as pd

students = pd.DataFrame({
    "Name": ["Arun", "Priya", "Rahul"],
    "Age": [20, 19, 21],
    "Mark": [80, 90, 75]
})
```

```text
       DataFrame Structure
       ┌──────────┬───────┬──────┐
       │ Name     │  Age  │ Mark │  ← Columns (Features / Series)
       ├──────────┼───────┼──────┤
    0  │ Arun     │   20  │  80  │  ← Row 0 (Record)
    1  │ Priya    │   19  │  90  │  ← Row 1 (Record)
    2  │ Rahul    │   21  │  75  │  ← Row 2 (Record)
       └──────────┴───────┴──────┘
           ↑
       Row Index
```

We mastered:
$$\text{DataFrame} \longrightarrow \text{Rows + Columns} \longrightarrow \text{Selection (.loc / .iloc)} \longrightarrow \text{Modification}$$

Today we address two critical questions in every real-world data pipeline:
1. **What happens when data is missing?** (Sensors fail, survey answers are skipped, records are incomplete).
2. **What happens when data is split across multiple tables?** (Customer info in Table A, transaction receipts in Table B).

---

## 4. What is Missing Data?

Missing data means that **no observed value exists** for a specific row and column intersection:

```text
Name      Age     Mark
Arun      20      85
Priya     19      [MISSING]
Rahul     21      78
```

Priya was enrolled and took the course, but her mark is unavailable in the database.

### Why Missing Data Occurs in the Real World
- **Human Omission:** A user skips an optional questionnaire field (e.g., phone number, salary).
- **Hardware / Network Glitches:** An IoT temperature sensor lost power or dropped Wi-Fi packets for 10 minutes.
- **System Migration:** Two legacy databases merged, but Database B never tracked student birthplaces.
- **Confidentiality / Privacy:** A respondent chose "Prefer not to disclose" on a medical survey.

> [!IMPORTANT]
> Missing data is not an anomaly—it is a standard reality of modern software engineering. High-performance software must detect, interpret, and resolve missing values deterministically.

---

## 5. What Does Missing Data Look Like in Pandas?

In numerical columns, Pandas represents missing values as **`NaN`**:
- **`NaN`** stands for **Not a Number**.
- It is defined by the IEEE 754 floating-point standard as a special floating-point value.

```python
import pandas as pd

students = pd.DataFrame({
    "Name": ["Arun", "Priya", "Rahul"],
    "Mark": [85, None, 78]
})

print(students)
```

**Output:**
```text
    Name  Mark
0   Arun  85.0
1  Priya   NaN
2  Rahul  78.0
```

Notice two critical transformations:
1. `None` in the list `[85, None, 78]` automatically became **`NaN`**.
2. The entire `Mark` column was promoted from integer to **`float64`** (`85.0`, `78.0`) because standard NumPy/Pandas numerical `NaN` is a floating-point object.

---

## 6. Why Does `None` Become `NaN`?

In standard Python, absent objects are represented by `None` (of type `NoneType`).  
However, standard Python lists with `None` cannot execute fast vectorized C-level math operations.

To enable lightning-fast NumPy operations across millions of rows, Pandas converts `None` in numerical columns to `float64` **`NaN`** (Not a Number).

```text
   Python List              Pandas DataFrame
   [85, None, 78]   ───►    0    85.0
                            1     NaN  (float64 missing marker)
                            2    78.0
```

---

## 7. Visualizing Missing Data

```text
                     Student Exam Roster

              Name         Mark
             ┌──────────┬──────────┐
          0  │ Arun     │   85.0   │
             ├──────────┼──────────┤
          1  │ Priya    │   NaN    │  ◄── MISSING HOLE (No observation)
             ├──────────┼──────────┤
          2  │ Rahul    │   78.0   │
             └──────────┴──────────┘

Key Takeaway: The word 'NaN' is just a placeholder. The underlying reality
is that an observation is absent at coordinate (Row 1, Column 'Mark').
```

---

## 8. Detecting Missing Values: `isna()` and `isnull()`

You cannot check for missing values using `mark == None` or `mark == np.nan` because in IEEE floating-point arithmetic, **`NaN != NaN`** always evaluates to `False`!

Instead, Pandas provides dedicated vectorized detection functions:
- **`df.isna()`**
- **`df.isnull()`** (an identical alias)

```python
import pandas as pd

students = pd.DataFrame({
    "Name": ["Arun", "Priya", "Rahul"],
    "Mark": [85, None, 78]
})

print(students.isna())
```

**Output:**
```text
    Name   Mark
0  False  False
1  False   True
2  False  False
```

---

## 9. Understanding the Boolean Mask

The output of `.isna()` is a **Boolean Mask Table**:
- **`True`** $\implies$ **Missing Value** (Empty / NaN / None)
- **`False`** $\implies$ **Present Value** (Data exists)

At coordinate `(Row 1, 'Mark')`, the cell evaluates to `True`. Priya's mark is missing!

---

## 10. Checking a Single Column

In practical engineering, you frequently inspect a single critical column rather than the entire table:

```python
# Check only the Mark series
print(students["Mark"].isna())
```

**Output:**
```text
0    False
1     True
2    False
Name: Mark, dtype: bool
```

---

## 11. Counting Missing Values with `.isna().sum()`

To find out how many values are missing in every column, chain **`.sum()`** onto **`.isna()`**:

```python
print(students.isna().sum())
```

**Output:**
```text
Name    0
Mark    1
dtype: int64
```

### Why Does `.sum()` Work on Boolean Values?
In Python and NumPy, booleans inherit from integers:
- **`True`** has a numerical value of **`1`**
- **`False`** has a numerical value of **`0`**

When Pandas sums a boolean column:
$$\text{False} + \text{True} + \text{False} = 0 + 1 + 0 = 1$$

Therefore, `students["Mark"].isna().sum()` gives the exact count of missing marks!

---

## 12. Checking if Any Value is Missing with `.any()`

If you want a quick boolean check to determine if a column contains *at least one* missing value:

```python
print(students.isna().any())
```

**Output:**
```text
Name    False
Mark     True
dtype: bool
```
- `Name: False` $\implies$ Zero missing values; column is completely intact.
- `Mark: True` $\implies$ Contains at least one missing observation.

---

## 13. Detecting Available Values: `notna()`

The inverse of `isna()` is **`notna()`**:
- **`True`** $\implies$ Value is **present** and valid.
- **`False`** $\implies$ Value is **missing**.

```python
print(students["Mark"].notna())
```

**Output:**
```text
0     True
1    False
2     True
Name: Mark, dtype: bool
```

This is ideal for filtering valid records:
```python
# Filter and view only students who actually took the exam
valid_students = students[students["Mark"].notna()]
```

---

## 14. `isna()` vs `notna()` Comparison

| Function | When Does it Return `True`? | When Does it Return `False`? | Primary Use Case |
| :--- | :--- | :--- | :--- |
| **`df.isna()`** | Cell is **Missing** (`NaN`, `None`) | Cell has valid data | Auditing data quality; counting missing rows |
| **`df.notna()`** | Cell has **Valid Data** | Cell is missing (`NaN`, `None`) | Filtering datasets to keep only verified rows |

---

## 15. The Core Question: Why and How to Handle Missing Data?

When an algorithm encounters `NaN`, calculations can fail or produce skewed results.
When analyzing:
```text
Student    Mark
Arun       85.0
Priya       NaN
Rahul      78.0
```

What should Priya's mark be?
- **Option 1:** Replace `NaN` with `0` (Priya was absent, so score is 0).
- **Option 2:** Replace `NaN` with the class average (Priya was excused, award class average).
- **Option 3:** Discard Priya's row entirely (analyze only students who submitted work).

Your choice depends strictly on **business logic**.

---

## 16. Replacing Missing Values: `fillna()`

The `fillna()` method substitutes `NaN` values with a replacement value of your choice:

```python
# Replace all NaN marks with 0
students["Mark"] = students["Mark"].fillna(0)
print(students)
```

**Output:**
```text
    Name  Mark
0   Arun  85.0
1  Priya   0.0
2  Rahul  78.0
```

Priya's row remains in the table, and her missing score is safely replaced with `0.0`.

---

## 17. Filling Missing Text Values

`fillna()` works on strings and categorical columns just as easily:

```python
students = pd.DataFrame({
    "Name": ["Arun", "Priya", "Rahul"],
    "City": ["Chennai", None, "Bangalore"]
})

students["City"] = students["City"].fillna("Unknown")
print(students)
```

**Output:**
```text
    Name       City
0   Arun    Chennai
1  Priya    Unknown
2  Rahul  Bangalore
```

---

## 18. Filling with Statistical Measures: Mean Imputation

For continuous numerical metrics (e.g., temperature, blood pressure, exam scores), replacing missing values with the **column mean** preserves the dataset distribution:

```python
students = pd.DataFrame({
    "Name": ["Arun", "Priya", "Rahul"],
    "Mark": [85.0, None, 75.0]
})

# Calculate mean of available marks: (85 + 75) / 2 = 80.0
avg_mark = students["Mark"].mean()

# Fill missing mark with the calculated mean
students["Mark"] = students["Mark"].fillna(avg_mark)
print(students)
```

**Output:**
```text
    Name  Mark
0   Arun  85.0
1  Priya  80.0
2  Rahul  75.0
```

> [!TIP]
> Never assume `fillna(0)` or `fillna(mean)` is automatically correct. If an item price is missing, `0` implies it is free! If a patient's heart rate is missing, `0` implies they are deceased! Choose replacements based on domain context.

---

## 19. Removing Incomplete Records: `dropna()`

If an incomplete record is unusable and cannot be accurately imputed, discard it using **`dropna()`**:

```python
students = pd.DataFrame({
    "Name": ["Arun", "Priya", "Rahul"],
    "Mark": [85.0, None, 78.0]
})

cleaned = students.dropna()
print(cleaned)
```

**Output:**
```text
    Name  Mark
0   Arun  85.0
2  Rahul  78.0
```

Priya's row (Row 1) has been completely removed. Notice that the remaining rows preserve their original indices (`0` and `2`).

---

## 20. `fillna()` vs `dropna()` Comparison

| Dimension | `fillna()` | `dropna()` |
| :--- | :--- | :--- |
| **Action** | Replaces missing entries | Deletes rows (or columns) |
| **Row Count** | **Preserved** (no data lost) | **Reduced** (rows dropped) |
| **When to Use** | When a reasonable default exists (e.g., Discount=0, City='Unknown') | When rows without key data are useless or dangerous to analyze |
| **Mental Model** | **KEEP & REPAIR** | **DISCARD & PURGE** |

```text
                 Decision Framework for Missing Data
                                 │
                   Is the missing cell critical?
                   ├── NO  ──► fillna(default_value)
                   └── YES ──► Can it be imputed reliably?
                               ├── YES ──► fillna(mean / median)
                               └── NO  ──► dropna()
```

---

## 21. Practical Guided Examples

### Example A: Student Examination Audit
```python
import pandas as pd

students = pd.DataFrame({
    "Name": ["Arun", "Priya", "Rahul", "Meena"],
    "Mark": [80.0, None, 90.0, 70.0]
})

print("Missing count:", students["Mark"].isna().sum())
# Impute with average of available scores (80 + 90 + 70)/3 = 80.0
students["Mark"] = students["Mark"].fillna(students["Mark"].mean())
print(students)
```

### Example B: Retail Inventory Discount Audit
```python
import pandas as pd

products = pd.DataFrame({
    "Product": ["Pen", "Bag", "Book"],
    "Discount": [10.0, None, 5.0]
})

# Missing discount implies 0% discount
products["Discount"] = products["Discount"].fillna(0)
print(products)
```

---

## 22. Part 2: Combining DataFrames — The Big Picture

Real-world applications rarely store everything in a single giant spreadsheet. Data is distributed across multiple sources:
- **Case 1: Multiple Time Periods** (January sales in File 1, February sales in File 2). We want to **stack rows** on top of each other.
- **Case 2: Multiple Features of the Same Entity** (Student Names in Table 1, Student Grades in Table 2). We want to **match records by ID**.

Pandas provides three primary methods for combining data:
1. **`pd.concat()`**
2. **`pd.merge()`**
3. **`df.join()`**

---

## 23. Stacking DataFrames: `pd.concat()`

`pd.concat()` binds DataFrames together along an axis:

```python
import pandas as pd

january = pd.DataFrame({
    "Name": ["Arun", "Priya"],
    "Mark": [80, 90]
})

february = pd.DataFrame({
    "Name": ["Rahul", "Meena"],
    "Mark": [75, 85]
})

# Stack vertically (default: axis=0)
combined = pd.concat([january, february])
print(combined)
```

**Output:**
```text
    Name  Mark
0   Arun    80
1  Priya    90
0  Rahul    75
1  Meena    85
```

Notice that the original row index labels (`0, 1` and `0, 1`) were preserved!

### Creating a Clean Sequential Index: `ignore_index=True`
To generate a continuous `0, 1, 2, 3` index across the combined dataset:

```python
combined = pd.concat([january, february], ignore_index=True)
print(combined)
```

**Output:**
```text
    Name  Mark
0   Arun    80
1  Priya    90
2  Rahul    75
3  Meena    85
```

---

## 24. Concatenating Columns Side-by-Side: `axis=1`

By default, `concat()` operates on `axis=0` (rows / vertical stacking).  
If you supply `axis=1`, it places tables **side-by-side**:

```python
df_names = pd.DataFrame({"Name": ["Arun", "Priya"]})
df_marks = pd.DataFrame({"Mark": [80, 90]})

side_by_side = pd.concat([df_names, df_marks], axis=1)
print(side_by_side)
```

**Output:**
```text
    Name  Mark
0   Arun    80
1  Priya    90
```

```text
Understanding axis in concat():
  axis=0 (Default) ──► Vertical Stacking (Add more rows)
  axis=1           ──► Horizontal Combination (Add more columns side-by-side)
```

---

## 25. Mental Model: CONCAT = STACK

```text
      DataFrame A                 DataFrame B
   ┌───────────────┐           ┌───────────────┐
   │ Arun     80   │           │ Rahul    75   │
   │ Priya    90   │           │ Meena    85   │
   └───────────────┘           └───────────────┘
           │                           │
           └─────────────┬─────────────┘
                         │
                 pd.concat(axis=0)
                         │
                         ▼
                 ┌───────────────┐
                 │ Arun     80   │  (From A)
                 │ Priya    90   │  (From A)
                 │ Rahul    75   │  (From B)
                 │ Meena    85   │  (From B)
                 └───────────────┘
                   CONCAT = STACK
```

---

## 26. Relational Combining: `pd.merge()`

What happens when two tables contain different attributes about the **same individuals**?

```text
Table 1: Student Roster             Table 2: Final Scores
StudentID    Name                   StudentID    Mark
101          Arun                   101          85
102          Priya                  102          92
103          Rahul                  103          78
```

You do **not** want to stack them vertically (which would create duplicate ID columns and empty rows).  
You want to **link** each student's name to their corresponding exam score using **`StudentID`** as the common anchor key!

This is where **`pd.merge()`** shines.

---

## 27. The Mechanics of `pd.merge()`

```python
import pandas as pd

students = pd.DataFrame({
    "StudentID": [101, 102, 103],
    "Name": ["Arun", "Priya", "Rahul"]
})

marks = pd.DataFrame({
    "StudentID": [101, 102, 103],
    "Mark": [85, 92, 78]
})

result = pd.merge(students, marks, on="StudentID")
print(result)
```

**Output:**
```text
   StudentID   Name  Mark
0        101   Arun    85
1        102  Priya    92
2        103  Rahul    78
```

`pd.merge()` inspected `StudentID`. Wherever `StudentID` in table A equaled `StudentID` in table B, it stitched the columns into a unified record!

---

## 28. Mental Model: MERGE = MATCH

```text
  Student Roster (A)                       Exam Scores (B)
┌───────────┬─────────┐                 ┌───────────┬────────┐
│ StudentID │ Name    │                 │ StudentID │ Mark   │
├───────────┼─────────┤                 ├───────────┼────────┤
│ 101       │ Arun    │                 │ 101       │ 85     │
│ 102       │ Priya   │                 │ 102       │ 92     │
│ 103       │ Rahul   │                 │ 103       │ 78     │
└───────────┴─────────┘                 └───────────┴────────┘
      │                                       │
      └───────────────────┬───────────────────┘
                          │ Match on StudentID
                          ▼
             ┌───────────┬─────────┬────────┐
             │ StudentID │ Name    │ Mark   │
             ├───────────┼─────────┼────────┤
             │ 101       │ Arun    │ 85     │
             │ 102       │ Priya   │ 92     │
             │ 103       │ Rahul   │ 78     │
             └───────────┴─────────┴────────┘
                      MERGE = MATCH
```

---

## 29. `concat()` vs `merge()` Comparison

| Property | `pd.concat()` | `pd.merge()` |
| :--- | :--- | :--- |
| **Mental Model** | **STACK** | **MATCH** |
| **Alignment Basis** | By index or simple position | By matching values in a shared key column |
| **Typical Use** | Appending new rows (e.g., Jan + Feb data) | Enriching entity records (e.g., Customer + Orders) |
| **Key Parameter** | `axis=0` or `axis=1` | `on="KeyColumn"` |
| **Duplicate Keys** | Does not check for relations | Matches and joins records with identical keys |

---

## 30. Index-Based Combining: `df.join()`

`join()` is a convenience method that combines two DataFrames **by matching their index labels**:

```python
import pandas as pd

students = pd.DataFrame(
    {"Name": ["Arun", "Priya", "Rahul"]},
    index=[101, 102, 103]
)

marks = pd.DataFrame(
    {"Mark": [85, 92, 78]},
    index=[101, 102, 103]
)

result = students.join(marks)
print(result)
```

**Output:**
```text
      Name  Mark
101   Arun    85
102  Priya    92
103  Rahul    78
```

---

## 31. The Golden Trinity Mnemonic

Remember this memory rule for every DataFrame combination task:

$$\begin{aligned}
\mathbf{CONCAT} &\longrightarrow \mathbf{STACK} \quad (\text{Stack rows vertically or columns side-by-side}) \\
\mathbf{MERGE}  &\longrightarrow \mathbf{MATCH} \quad (\text{Relational join using a shared key column}) \\
\mathbf{JOIN}   &\longrightarrow \mathbf{INDEX} \quad (\text{Combine horizontally based on row index labels})
\end{aligned}$$

And for missing data:
$$\begin{aligned}
\mathbf{isna()}   &\longrightarrow \mathbf{FIND}    \quad (\text{Detect absent observations}) \\
\mathbf{fillna()} &\longrightarrow \mathbf{REPLACE} \quad (\text{Impute with safe default / aggregate}) \\
\mathbf{dropna()} &\longrightarrow \mathbf{REMOVE}  \quad (\text{Purge incomplete records})
\end{aligned}$$

---

## 32. Integrated Real-World Workflow: Detect $\to$ Clean $\to$ Combine

In production engineering, data cleaning and merging happen sequentially:

```python
import pandas as pd

# Source 1: Student Directory
students = pd.DataFrame({
    "ID": [1, 2, 3],
    "Name": ["Arun", "Priya", "Rahul"]
})

# Source 2: Raw Sensor / Exam Scores (with missing value)
marks = pd.DataFrame({
    "ID": [1, 2, 3],
    "Mark": [80.0, None, 75.0]
})

# Step 1: Detect missing data
print("Missing marks count:", marks["Mark"].isna().sum())

# Step 2: Clean data by imputing 0 for absent students
marks["Mark"] = marks["Mark"].fillna(0)

# Step 3: Combine with student directory on primary key 'ID'
report = pd.merge(students, marks, on="ID")

print("\nFinal Integrated Report:")
print(report)
```

**Output:**
```text
Missing marks count: 1

Final Integrated Report:
   ID   Name  Mark
0   1   Arun  80.0
1   2  Priya   0.0
2   3  Rahul  75.0
```

---

## 33. Common Beginner Mistakes

### Mistake 1: Comparing with `None` or `np.nan` using `==`
```python
# ❌ WRONG: np.nan == np.nan evaluates to False!
if df["Mark"][1] == None:
    print("Missing")

# ✅ CORRECT: Use Pandas vectorized detection
if df["Mark"].isna().iloc[1]:
    print("Missing")
```

### Mistake 2: Thinking `fillna()` Modifies in Place Without Assignment
```python
# ❌ WRONG: fillna() returns a copy by default; df remains unchanged!
df["Mark"].fillna(0)
print(df)  # NaN is still there!

# ✅ CORRECT: Assign back to the column or use inplace=True
df["Mark"] = df["Mark"].fillna(0)
```

### Mistake 3: Using `concat()` When You Meant to `merge()`
```python
# ❌ WRONG: Stacking two tables with different columns creates disjoint rows
combined = pd.concat([students, marks])

# ✅ CORRECT: Use merge to align records on the shared identifier
combined = pd.merge(students, marks, on="ID")
```

### Mistake 4: Typo in the Common Key Name
```python
# ❌ WRONG: 'Id' != 'ID' -> Raises KeyError!
pd.merge(students, marks, on="Id")

# ✅ CORRECT: Column names must match letter-for-letter
pd.merge(students, marks, on="ID")
```

### Mistake 5: Confusing `axis=0` and `axis=1` in `concat()`
```python
# Stacking rows (vertical): axis=0 (Default)
pd.concat([jan, feb], axis=0)

# Side-by-side columns (horizontal): axis=1
pd.concat([names, marks], axis=1)
```

---

## 34. Quick Student Workouts

1. **Workout 1:** What does `df.isna()` return?  
   *Answer:* A boolean DataFrame of the same shape, where `True` indicates missing values.
2. **Workout 2:** What does `df.notna()` indicate?  
   *Answer:* Indicates present, valid observations (`True` when data exists).
3. **Workout 3:** What does `df.fillna(0)` do?  
   *Answer:* Substitutes all `NaN` occurrences with `0`.
4. **Workout 4:** What does `df.dropna()` do?  
   *Answer:* Discards rows containing one or more `NaN` values.
5. **Workout 5:** What is the primary role of `pd.concat([df1, df2])`?  
   *Answer:* Stacks DataFrames vertically (`axis=0`) or horizontally (`axis=1`).
6. **Workout 6:** What does `pd.merge(df1, df2, on="ID")` do?  
   *Answer:* Relational match: pairs records that share matching `ID` values.
7. **Workout 7:** What does `df1.join(df2)` use to combine tables?  
   *Answer:* Row indices.

---

## 35. 20-Minute Guided Practice Section

### Practice 1: Detect and Count Missing Marks
```python
import pandas as pd

students = pd.DataFrame({
    "Name": ["Arun", "Priya", "Rahul", "Meena"],
    "Mark": [80.0, None, 90.0, None]
})

print(students.isna())
print("Missing count:")
print(students.isna().sum())
```

### Practice 2: Impute Missing Marks with 0
```python
students["Mark"] = students["Mark"].fillna(0)
print(students)
```

### Practice 3: Drop Incomplete Records
```python
students = pd.DataFrame({
    "Name": ["Arun", "Priya", "Rahul"],
    "Mark": [80.0, None, 90.0]
})
clean_students = students.dropna()
print(clean_students)
```

### Practice 4: Stack Two Monthly Tables with `concat()`
```python
q1 = pd.DataFrame({"Name": ["Arun", "Priya"], "Mark": [80, 90]})
q2 = pd.DataFrame({"Name": ["Rahul", "Meena"], "Mark": [75, 85]})
annual = pd.concat([q1, q2], ignore_index=True)
print(annual)
```

### Practice 5: Merge Demographics with Scores on `ID`
```python
info = pd.DataFrame({"ID": [1, 2, 3], "Name": ["Arun", "Priya", "Rahul"]})
scores = pd.DataFrame({"ID": [1, 2, 3], "Mark": [80, 90, 75]})
merged = pd.merge(info, scores, on="ID")
print(merged)
```

---

## 36. Main Moodle Practice Problem

### Title: Clean Missing Marks and Combine Student Data
- **Difficulty:** Beginner $\to$ Intermediate
- **Marks:** 15
- **Recommended Time:** 20 Minutes

#### Problem Statement
You are given two DataFrames:
```python
students = pd.DataFrame({
    "ID": [101, 102, 103, 104],
    "Name": ["Arun", "Priya", "Rahul", "Meena"]
})

marks = pd.DataFrame({
    "ID": [101, 102, 103, 104],
    "Mark": [85.0, None, 78.0, 92.0]
})
```

Your program must:
1. Print the header `Missing values` and display the series of missing counts from `marks.isna().sum()`.
2. Replace the missing mark with `0` using `.fillna(0)`.
3. Merge `students` and `marks` using the key `ID` via `pd.merge()`.
4. Print `Final DataFrame` and the merged DataFrame.
5. Print `Summary` followed by:
   - `Total Students: <count>`
   - `Total Marks: <sum>`

#### Expected Output
```text
Missing values
ID      0
Mark    1
dtype: int64
Final DataFrame
    ID   Name  Mark
0  101   Arun  85.0
1  102  Priya   0.0
2  103  Rahul  78.0
3  104  Meena  92.0
Summary
Total Students: 4
Total Marks: 255.0
```

---

## 37. Moodle AI Agent Instruction

When tutoring a student in the Practice Arena, adhere strictly to these principles:
1. **Never dump the solution code upfront.**
2. Prompt the student: *"Look at both DataFrames. Which column exists in both tables that can connect them?"*
3. Prompt them to check for nulls: *"What function tests whether a value is missing? Try `.isna()`."*
4. Explain aggregation: *"How does `.sum()` turn True/False booleans into a count of missing entries?"*
5. Guide imputation: *"Should we discard Priya or award 0? Use `.fillna(0)` and assign the result back to `marks['Mark']`."*
6. Guide merging: *"Now link the tables: `pd.merge(students, marks, on='ID')`."*
7. Reinforce key concepts:
   - *isna()* detects missing data.
   - *fillna()* repairs missing data.
   - *merge()* links tables on a shared key.
   - *concat()* stacks tables.

---

## 38. Moodle IDE Visualizer Specifications

### 1. Missing Data Inspector Lab
```text
┌──────────────────────────────────────────────────────────────┐
│                  PANDAS DATA CLEANING LAB                   │
├───────────────────────┬──────────────────────────────────────┤
│ CODE EDITOR           │ DATAFRAME VIEW                      │
│                       │                                      │
│ import pandas as pd   │       Name       Mark                │
│                       │   ┌─────────┬─────────┐              │
│ students = pd.Data... │ 0 │ Arun    │ 85.0    │              │
│                       │ 1 │ Priya   │  NaN    │ ◄── MISSING  │
│ print(students.isna())│ 2 │ Rahul   │ 78.0    │              │
│                       │   └─────────┴─────────┘              │
├───────────────────────┴──────────────────────────────────────┤
│ MISSING DATA INSPECTOR                                       │
│                                                              │
│ Name ──► 0 missing                                           │
│ Mark ──► 1 missing                                           │
│                                                              │
│ [ Fill Missing (fillna) ]    [ Remove Missing Rows (dropna) ]│
└──────────────────────────────────────────────────────────────┘
```

### 2. DataFrame Combiner Lab
```text
┌──────────────────────────────────────────────────────────────┐
│                 DATAFRAME COMBINER LAB                      │
├──────────────────────┬───────────────────────────────────────┤
│ TABLE A (Roster)     │ TABLE B (Scores)                     │
│ ID   Name            │ ID   Mark                             │
│ 101  Arun            │ 101  85.0                             │
│ 102  Priya           │ 102  0.0                              │
│ 103  Rahul           │ 103  78.0                             │
├──────────────────────┴───────────────────────────────────────┤
│ OPERATION: [ pd.merge ]    KEY: [ on="ID" ]                  │
│                                                              │
│ 101: Arun  ◄── MATCH ID ──►  101: 85.0                       │
│ 102: Priya ◄── MATCH ID ──►  102: 0.0                        │
│ 103: Rahul ◄── MATCH ID ──►  103: 78.0                       │
├──────────────────────────────────────────────────────────────┤
│ RESULTING DATAFRAME (Shape: 3 rows × 3 columns)              │
│    ID   Name  Mark                                           │
│ 0  101  Arun  85.0                                           │
│ 1  102  Priya  0.0                                           │
│ 2  103  Rahul 78.0                                           │
└──────────────────────────────────────────────────────────────┘
```

---

## 39. Final Challenge: Three-Table Academic Integration

### Problem Statement
You are given three disparate university DataFrames:
1. **Students:** `ID`, `Name`
2. **Marks:** `ID`, `Mark` (contains a missing score for Priya)
3. **Department:** `ID`, `Department` (`IT`, `HR`, `IT`, `Sales`)

Write a script to:
1. Detect and display the missing marks count.
2. Impute the missing mark with `0`.
3. Merge `students` and `marks` on `ID`.
4. Merge the resulting table with `department` on `ID`.
5. Display the integrated 4-column DataFrame, total students, and total marks.
6. Display a slice containing only columns `["Name", "Department", "Mark"]`.

### Complete Challenge Solution
```python
import pandas as pd

students = pd.DataFrame({
    "ID": [101, 102, 103, 104],
    "Name": ["Arun", "Priya", "Rahul", "Meena"]
})

marks = pd.DataFrame({
    "ID": [101, 102, 103, 104],
    "Mark": [85.0, None, 78.0, 92.0]
})

department = pd.DataFrame({
    "ID": [101, 102, 103, 104],
    "Department": ["IT", "HR", "IT", "Sales"]
})

# 1. Audit missing values
print("Missing Marks:", marks["Mark"].isna().sum())

# 2. Impute missing values
marks["Mark"] = marks["Mark"].fillna(0)

# 3. First merge: Students + Marks
step1 = pd.merge(students, marks, on="ID")

# 4. Second merge: + Department
final_df = pd.merge(step1, department, on="ID")

print("\nFinal DataFrame:")
print(final_df)

print(f"\nTotal Students: {len(final_df)}")
print(f"Total Marks: {final_df['Mark'].sum()}")

print("\nSelected data:")
print(final_df[["Name", "Department", "Mark"]])
```

**Expected Output:**
```text
Missing Marks: 1

Final DataFrame:
    ID   Name  Mark Department
0  101   Arun  85.0         IT
1  102  Priya   0.0         HR
2  103  Rahul  78.0         IT
3  104  Meena  92.0      Sales

Total Students: 4
Total Marks: 255.0

Selected data:
    Name Department  Mark
0   Arun         IT  85.0
1  Priya         HR   0.0
2  Rahul         IT  78.0
3  Meena      Sales  92.0
```

---

## 40. Concept Map & Final Key Takeaways

```text
                         PANDAS DATA PREPARATION
                                   │
               ┌───────────────────┴───────────────────┐
               ▼                                       ▼
         MISSING DATA                         COMBINING DATAFRAMES
               │                                       │
       ┌───────┼───────┐                       ┌───────┼───────┐
       ▼       ▼       ▼                       ▼       ▼       ▼
     isna   fillna   dropna                  concat  merge   join
       │       │       │                       │       │       │
     FIND   REPLACE  REMOVE                  STACK   MATCH   INDEX
       │       │       │                       │       │       │
       └───────┴───────┘                       └───────┴───────┘
               │                                       │
               └───────────────────┬───────────────────┘
                                   ▼
                       CLEAN, UNIFIED DATASET
```

### The Six Essential Commands to Remember
1. **`df.isna()`** $\implies$ Find missing (`NaN`) values.
2. **`df.notna()`** $\implies$ Filter for valid, present observations.
3. **`df.fillna(value)`** $\implies$ Replace `NaN` with default or average.
4. **`df.dropna()`** $\implies$ Discard rows containing `NaN`.
5. **`pd.concat([a, b], ignore_index=True)`** $\implies$ Stack DataFrames vertically.
6. **`pd.merge(a, b, on="Key")`** $\implies$ Match records across tables using a common key.
