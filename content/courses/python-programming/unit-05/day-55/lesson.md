# Unit–V — Day 7: Pandas DataFrame — Rows, Columns, Selection and Modification

**Duration:** 90 Minutes  
**Teaching Focus:** 45 Minutes Concept Teaching + 20 Minutes Practice + 25 Minutes Review, Quiz and Problem Solving  
**Level:** Beginner  
**Unit:** Unit–V — NumPy and Pandas  
**Day:** 7 (Day 55 of 65)  

---

## 1. Learning Objectives

By the end of this session, students should be able to:

1. **Explain** what a Pandas DataFrame is and how it represents a 2D labeled tabular dataset.
2. **Differentiate** between a 1D Pandas Series and a 2D Pandas DataFrame.
3. **Create** DataFrames from dictionaries of lists and lists of dictionaries.
4. **Understand** the roles of row indexes, named columns, and individual cells.
5. **Extract** a single column as a Series (`df["Name"]`) and multiple columns as a DataFrame (`df[["Name", "Mark"]]`).
6. **Access** complete rows using position-based `.iloc` and label-based `.loc`.
7. **Access** individual data cells with coordinate pairs: `.loc[row_label, col_label]` and `.iloc[row_pos, col_pos]`.
8. **Select** sub-tables across specific row slices and column selections.
9. **Modify** existing values in-place (single cells and entire columns).
10. **Add** new columns manually and compute calculated columns via vectorized column arithmetic.
11. **Inspect** DataFrame structural properties (`.shape`, `.columns`, `.index`, `.dtypes`).
12. **Build** practical multi-column business tables (student gradebooks, product inventories, employee rosters).

---

## 2. 90-Minute Session Plan

| Time Window | Topic | Pedagogical Activity & Focus |
|---|---|---|
| **0–5 min** | **Day 6 Recap** | Review Pandas Series ($\text{Index} + \text{Value}$), `.loc`, and `.iloc`. |
| **5–12 min** | **DataFrame Introduction** | Transition from 1 column (Series) to full tabular spreadsheets. |
| **12–20 min** | **Series vs DataFrame** | Structural comparison, dimensions, and visual tables. |
| **20–30 min** | **Creating DataFrames** | Construction from dictionaries of lists and lists of dicts. |
| **30–40 min** | **Rows and Columns** | Records (rows), features (columns), and default vs custom indexes. |
| **40–45 min** | **Indexing & Selection** | `.loc` vs `.iloc` on 2D grids; single bracket vs double bracket. |
| **45–52 min** | **Guided Example** | Student gradebook: looking up student rows and subject marks. |
| **52–65 min** | **Accessing Data** | Slicing rows, selecting multiple columns, and cell targeting. |
| **65–73 min** | **Modifying Data** | In-place cell updates, column arithmetic, and adding new columns. |
| **73–80 min** | **Real-World Programs** | Product inventory totals, discounts, and employee salary hikes. |
| **80–85 min** | **Moodle Practice Lab** | Independent coding: *Student DataFrame Manager*. |
| **85–90 min** | **Quiz & Reflection** | 10-question knowledge check, cheat sheet recap, and concept map. |

---

## 3. Quick Recap from Day 6

Yesterday in Day 6, we learned about the **Pandas Series**:
```python
import pandas as pd

marks = pd.Series([80, 90, 75], index=["Arun", "Priya", "Rahul"])
print(marks)
```

**Output:**
```text
Arun     80
Priya    90
Rahul    75
dtype: int64
```

A Series represents a **single column** of labeled data:
$$\text{Series} = \text{Index} + \text{Values}$$

Today, we expand this concept into two dimensions:
$$\text{One Column} \longrightarrow \text{Series}$$
$$\text{Multiple Columns (A Table)} \longrightarrow \text{DataFrame}$$

---

## 4. What is a DataFrame?

A **Pandas DataFrame** is a two-dimensional, size-mutable, tabular data structure with labeled axes (rows and columns).

In simple terms:
> **A DataFrame is a table with rows, columns, and an index.**

```text
       Name      Age    Mark
0      Arun      20     85
1      Priya     19     92
2      Rahul     21     78
```

Each horizontal entry is a **Row** (a student's complete record).  
Each vertical entry is a **Column** (a specific property like Age or Mark).

---

## 5. Real-World Spreadsheet Analogy

Think of an Excel worksheet or Google Sheets table:

```text
               Column: Name    Column: Age    Column: Mark
Row Index 0        Arun             20             85
Row Index 1        Priya            19             92
Row Index 2        Rahul            21             78
```

- **Series** $\rightarrow$ One isolated column (e.g., just the Marks column).
- **DataFrame** $\rightarrow$ The complete table with all columns bound together.

---

## 6. Series vs DataFrame

| Characteristic | Pandas Series | Pandas DataFrame |
|---|---|---|
| **Dimensions** | 1D (One-dimensional) | 2D (Two-dimensional) |
| **Columns** | Exactly 1 column of values | Multiple named columns |
| **Structure** | $\text{Index} + \text{Values}$ | $\text{Index} + \text{Columns} + \text{Cells}$ |
| **Constructor**| `pd.Series()` | `pd.DataFrame()` |
| **Analogy** | Single column list | Full spreadsheet table |
| **Shape** | `(N,)` | `(rows, columns)` |

```text
    PANDAS SERIES                  PANDAS DATAFRAME
┌─────────┬─────────┐       ┌─────────┬────────┬──────┬──────┐
│  Index  │  Value  │       │  Index  │ Name   │ Age  │ Mark │
├─────────┼─────────┤       ├─────────┼────────┼──────┼──────┤
│ Arun    │   80    │       │    0    │ Arun   │ 20   │  80  │
│ Priya   │   90    │       │    1    │ Priya  │ 19   │  90  │
│ Rahul   │   75    │       │    2    │ Rahul  │ 21   │  75  │
└─────────┴─────────┘       └─────────┴────────┴──────┴──────┘
```

---

## 7. Importing Pandas

```python
import pandas as pd

# Create DataFrame
df = pd.DataFrame(data)
```

---

## 8. Creating Your First DataFrame (Dictionary of Lists)

The most popular way to create a DataFrame is passing a Python dictionary where **keys are column names** and **values are lists of column entries**:

```python
import pandas as pd

data = {
    "Name": ["Arun", "Priya", "Rahul"],
    "Age": [20, 19, 21],
    "Mark": [85, 92, 78]
}

students = pd.DataFrame(data)
print(students)
```

**Output:**
```text
    Name  Age  Mark
0   Arun   20    85
1  Priya   19    92
2  Rahul   21    78
```

---

## 9. Understanding DataFrame Components

```text
                Column Headers
             ┌───────┬─────┬──────┐
             │ Name  │ Age │ Mark │
   Index ──► ├───────┼─────┼──────┤
     0       │ Arun  │ 20  │  85  │ ◄── Row 0 (Record)
     1       │ Priya │ 19  │  92  │ ◄── Row 1 (Record)
     2       │ Rahul │ 21  │  78  │ ◄── Row 2 (Record)
             └───────┴─────┴──────┘
```

- **Index (`0, 1, 2`)**: Row identifiers.
- **Columns (`Name, Age, Mark`)**: Feature names.
- **Values (`Arun, 20, 85, ...`)**: The 2D matrix of cell data.

---

## 10. What is a Row?

A **Row** represents one complete observation or record.  
Row `0` contains `Arun`, `20`, and `85`. All three values belong to the same person.

$$\text{One Row} = \text{One Entity / Transaction / Record}$$

---

## 11. What is a Column?

A **Column** represents a single attribute or variable across all observations.  
The `Mark` column contains `[85, 92, 78]`. Every value represents the same kind of data.

$$\text{One Column} = \text{One Attribute / Feature}$$

---

## 12. Understanding the Default Index

When no index is provided, Pandas assigns a 0-based range index: `0, 1, 2, ...`.

```python
students = pd.DataFrame({
    "Name": ["Arun", "Priya", "Rahul"],
    "Age": [20, 19, 21]
})
print(students.index)  # RangeIndex(start=0, stop=3, step=1)
```

---

## 13. Custom DataFrame Index

You can supply your own row labels using `index=[...]`:

```python
students = pd.DataFrame(
    {
        "Age": [20, 19, 21],
        "Mark": [85, 92, 78]
    },
    index=["S1", "S2", "S3"]
)
print(students)
```

**Output:**
```text
    Age  Mark
S1   20    85
S2   19    92
S3   21    78
```

---

## 14. Creating a DataFrame from a List of Dictionaries

Another common pattern, especially when reading from APIs, databases, or JSON files:

```python
import pandas as pd

students = pd.DataFrame([
    {"Name": "Arun", "Age": 20, "Mark": 85},
    {"Name": "Priya", "Age": 19, "Mark": 92},
    {"Name": "Rahul", "Age": 21, "Mark": 78}
])

print(students)
```

**Output:**
```text
    Name  Age  Mark
0   Arun   20    85
1  Priya   19    92
2  Rahul   21    78
```

Each dictionary represents **one complete row**.

---

## 15. Accessing a Column: `df["ColumnName"]`

To extract a single column, use square brackets with the column name:

```python
names = students["Name"]
print(names)
print(type(names))
```

**Output:**
```text
0     Arun
1    Priya
2    Rahul
Name: Name, dtype: object
<class 'pandas.core.series.Series'>
```

> [!NOTE]
> **Selecting a single column from a DataFrame returns a Pandas Series!** The column's values become the Series values, and the DataFrame's row index becomes the Series index.

---

## 16. Dot Notation vs Bracket Notation

You may see dot syntax in code:
```python
print(students.Name)  # Works for simple names
```

However, **always teach bracket notation (`students["Name"]`)** because:
1. It works with column names containing spaces: `df["Student Name"]` (dot syntax throws `SyntaxError`).
2. It works when column names match DataFrame methods: `df["count"]` or `df["mean"]`.
3. It supports dynamic variable lookup: `col = "Mark"; df[col]`.

---

## 17. Selecting Multiple Columns: Double Brackets `[[...]]`

To extract multiple columns, pass a **Python list** of column names inside the indexing brackets:

```python
subset = students[["Name", "Mark"]]
print(subset)
print(type(subset))
```

**Output:**
```text
    Name  Mark
0   Arun    85
1  Priya    92
2  Rahul    78
<class 'pandas.core.frame.DataFrame'>
```

> [!IMPORTANT]
> - `df["Name"]` (Single bracket) $\rightarrow$ Returns a **Series** (1D).
> - `df[["Name", "Mark"]]` (Double brackets) $\rightarrow$ Returns a **DataFrame** (2D).

---

## 18. Accessing Rows by Position with `.iloc`

`.iloc` selects rows using 0-based integer position:

```python
first_student = students.iloc[0]
print(first_student)
```

**Output:**
```text
Name    Arun
Age       20
Mark      85
Name: 0, dtype: object
```

Selecting the last row:
```python
last_student = students.iloc[-1]
print(last_student)  # Rahul's record
```

---

## 19. Accessing Rows by Label with `.loc`

`.loc` selects rows using row labels from the index:

```python
# With default integer index:
row_one = students.loc[1]
print(row_one)  # Priya's record
```

With custom index:
```python
custom_df = pd.DataFrame(
    {"Age": [20, 19], "Mark": [85, 92]},
    index=["Arun", "Priya"]
)
print(custom_df.loc["Priya"])  # Selects Priya by label name
```

---

## 20. `.loc` vs `.iloc` for DataFrames

| Operator | Syntax Pattern | Example |
|---|---|---|
| **`.loc`** | `df.loc[row_label, col_label]` | `students.loc[1, "Mark"]` $\rightarrow$ `92` |
| **`.iloc`**| `df.iloc[row_pos, col_pos]` | `students.iloc[1, 2]` $\rightarrow$ `92` |

---

## 21. Accessing a Single Cell

To retrieve a specific value at a coordinate intersection:

```python
# 1. By Label: row 1, column "Mark"
priya_mark = students.loc[1, "Mark"]
print("Priya's Mark (.loc):", priya_mark)  # 92

# 2. By Position: row index 1, column index 2
priya_mark_pos = students.iloc[1, 2]
print("Priya's Mark (.iloc):", priya_mark_pos)  # 92
```

---

## 22. Selecting Multiple Rows (Slicing)

Using position slicing with `.iloc[start:stop]`:
```python
# Select first two rows (positions 0 and 1, stop 2 excluded):
print(students.iloc[0:2])
```

**Output:**
```text
    Name  Age  Mark
0   Arun   20    85
1  Priya   19    92
```

---

## 23. Selecting Rows and Columns Simultaneously

```python
# Select rows 0 and 1, columns Name and Mark:
selection = students.loc[0:1, ["Name", "Mark"]]
print(selection)
```

**Output:**
```text
    Name  Mark
0   Arun    85
1  Priya    92
```

With `.iloc`:
```python
# Rows 0:2 (0 and 1), Columns [0, 2] (Name and Mark):
selection_pos = students.iloc[0:2, [0, 2]]
print(selection_pos)
```

---

## 24. Adding a New Column

Assigning to a new column name adds it to the right of the table:

```python
students["Result"] = ["Pass", "Pass", "Pass"]
print(students)
```

**Output:**
```text
    Name  Age  Mark Result
0   Arun   20    85   Pass
1  Priya   19    92   Pass
2  Rahul   21    78   Pass
```

---

## 25. Creating a Calculated Column from Existing Data

You can compute new columns using vectorized arithmetic on existing columns:

```python
students["UpdatedMark"] = students["Mark"] + 5
print(students)
```

**Output:**
```text
    Name  Age  Mark Result  UpdatedMark
0   Arun   20    85   Pass           90
1  Priya   19    92   Pass           97
2  Rahul   21    78   Pass           83
```

---

## 26. Modifying One Cell in Place

Use `.loc[row, col] = new_value`:

```python
# Correct Rahul's mark from 78 to 82:
students.loc[2, "Mark"] = 82
print(students)
```

---

## 27. Modifying an Entire Column

```python
# Increment all student ages by 1 year:
students["Age"] = students["Age"] + 1
print(students)
```

---

## 28. Real-World Example — Product Billing Table

```python
import pandas as pd

products = pd.DataFrame({
    "Product": ["Pen", "Bag", "Shoes"],
    "Price": [20, 500, 1500],
    "Quantity": [5, 2, 1]
})

# Calculate gross total:
products["Total"] = products["Price"] * products["Quantity"]

# 10% discount:
products["Discount"] = products["Total"] * 0.10

# Final payable:
products["Final"] = products["Total"] - products["Discount"]

print(products)
```

**Output:**
```text
  Product  Price  Quantity  Total  Discount   Final
0     Pen     20         5    100      10.0    90.0
1     Bag    500         2   1000     100.0   900.0
2   Shoes   1500         1   1500     150.0  1350.0
```

---

## 29. Real-World Example — Employee Payroll

```python
import pandas as pd

employees = pd.DataFrame({
    "Name": ["Arun", "Priya", "Rahul"],
    "Department": ["IT", "HR", "Sales"],
    "Salary": [30000, 28000, 32000]
})

# ₹2000 festive bonus for all employees:
employees["Salary"] = employees["Salary"] + 2000
print(employees[["Name", "Salary"]])
```

---

## 30. Inspecting DataFrame Properties

```python
# Dimensions: (rows, columns)
print("Shape:", students.shape)  # e.g. (3, 5)

# Column names:
print("Columns:", list(students.columns))

# Row indices:
print("Index:", list(students.index))

# Data types per column:
print("Dtypes:\n", students.dtypes)
```

---

## 31. Summary Statistics on DataFrames

```python
total_marks = students["Mark"].sum()
average_mark = students["Mark"].mean()

print("Total Marks: ", total_marks)
print(f"Average Mark: {average_mark:.2f}")
```

---

## 32. Common Beginner Mistakes

### Mistake 1: Forgetting Quotes on Column Names
```python
# INCORRECT:
students[Name]  # NameError: name 'Name' is not defined

# CORRECT:
students["Name"]
```

### Mistake 2: Single vs Double Brackets for Multiple Columns
```python
# INCORRECT:
students["Name", "Mark"]  # KeyError!

# CORRECT:
students[["Name", "Mark"]]  # Pass a list of column names
```

### Mistake 3: Confusing Row and Column Indexing
- `df["Age"]` $\rightarrow$ Accesses column `"Age"`.
- `df.iloc[1]` $\rightarrow$ Accesses row at position `1`.

### Mistake 4: Mismatched Length in New Column Assignment
```python
# If DataFrame has 4 rows:
students["Result"] = ["Pass", "Pass"]  # ValueError: Length of values does not match length of index!
```

---

## 33. Quick Student Workouts

1. How do you create a DataFrame?  
   **Answer:** `pd.DataFrame(data)`
2. What does `df["Name"]` return?  
   **Answer:** A Pandas Series containing the "Name" column.
3. What does `df.iloc[0]` select?  
   **Answer:** The first row by physical integer position.
4. What does `df.loc[1, "Mark"]` select?  
   **Answer:** The cell at row label 1 and column "Mark".
5. What does `df[["Name", "Mark"]]` return?  
   **Answer:** A DataFrame containing only the "Name" and "Mark" columns.
6. How do you add 5 bonus marks to all rows?  
   **Answer:** `df["Mark"] = df["Mark"] + 5`
7. What does `df.shape` return?  
   **Answer:** A tuple `(rows, columns)`.

---

## 34. 20-Minute Guided Practice Drills

### Practice 1: Create and Display
```python
import pandas as pd

students = pd.DataFrame({
    "Name": ["Arun", "Priya", "Rahul"],
    "Age": [20, 19, 21],
    "Mark": [80, 90, 75]
})
print(students)
```

### Practice 2: Column & Row Selection
```python
print(students[["Name", "Mark"]])
print("First Student:\n", students.iloc[0])
print("Priya's Mark: ", students.loc[1, "Mark"])
```

### Practice 3: Adding Calculated Columns
```python
students["UpdatedMark"] = students["Mark"] + 5
students["Result"] = ["Pass", "Pass", "Pass"]
print(students)
```

---

## 35–41. Main Moodle Practice: Student DataFrame Manager

### Problem Statement:
Create a Pandas DataFrame containing student information:
- Arun: Age 20, Mark 80
- Priya: Age 19, Mark 92
- Rahul: Age 21, Mark 75
- Meena: Age 20, Mark 88

Your program must:
1. Create the DataFrame with columns: `Name`, `Age`, `Mark`.
2. Display `"Student Data:"` followed by the DataFrame.
3. Display `"Name and Mark:"` followed by columns `["Name", "Mark"]`.
4. Display `"First Student:"` followed by the first row using `.iloc[0]`.
5. Display `"Priya's Mark:"` followed by Priya's mark using `.loc[1, "Mark"]`.
6. Add 5 bonus marks to every student, stored in a new column `UpdatedMark`.
7. Display `"After Bonus:"` followed by the DataFrame.
8. Update Rahul's original mark to 78, and recalculate `UpdatedMark`.
9. Add a `Result` column: if `UpdatedMark >= 40` then `"Pass"`, else `"Fail"`.
10. Display `"Final DataFrame:"` followed by the modified DataFrame.

### Expected Output:
```text
Student Data:
    Name  Age  Mark
0   Arun   20    80
1  Priya   19    92
2  Rahul   21    75
3  Meena   20    88

Name and Mark:
    Name  Mark
0   Arun    80
1  Priya    92
2  Rahul    75
3  Meena    88

First Student:
Name    Arun
Age       20
Mark      80

Priya's Mark:
92

After Bonus:
    Name  Age  Mark  UpdatedMark
0   Arun   20    80           85
1  Priya   19    92           97
2  Rahul   21    75           80
3  Meena   20    88           93

Final DataFrame:
    Name  Age  Mark  UpdatedMark Result
0   Arun   20    80           85   Pass
1  Priya   19    92           97   Pass
2  Rahul   21    78           83   Pass
3  Meena   20    88           93   Pass
```

---

## 37–39. Test Cases

### Test Case 1 (Standard Class Data)
Input:
```text
Arun,20,80
Priya,19,92
Rahul,21,75
Meena,20,88
```
Expected Final Results:
All four students Pass (85, 97, 83, 93).

### Test Case 2 (Mixed Pass & Fail)
Input:
```text
Arun,20,35
Priya,19,60
Rahul,21,45
Meena,20,30
```
Expected Updated Marks: 40, 65, 50, 35  
Results: Arun (Pass), Priya (Pass), Rahul (Pass), Meena (Fail).

### Test Case 3 (Boundary Checks)
Input:
```text
Arun,20,0
Priya,19,40
Rahul,21,39
Meena,20,100
```
Expected Updated Marks: 5, 45, 44, 105  
Results: Arun (Fail), Priya (Pass), Rahul (Pass), Meena (Pass).

---

## 40. Requirements

- Use `import pandas as pd`
- Use `pd.DataFrame()`
- Access columns using `df["Col"]` and `df[["Col1", "Col2"]]`
- Access row with `.iloc[0]`
- Access cell with `.loc[1, "Mark"]`
- Add bonus: `df["UpdatedMark"] = df["Mark"] + 5`
- Recalculate or evaluate Result on `UpdatedMark`

---

## 42. Moodle AI Agent Instruction

```text
You are a beginner-friendly Pandas learning assistant helping a student solve the "Student DataFrame Manager" exercise.

Do NOT immediately provide the complete solution.

Teaching strategy:
1. Guide them to create the DataFrame using pd.DataFrame({...}).
2. Show them how to select two columns using double brackets: df[["Name", "Mark"]].
3. Show that df.iloc[0] extracts the first row.
4. Show that df.loc[1, "Mark"] accesses Priya's cell.
5. Guide them to add 5 bonus marks: df["UpdatedMark"] = df["Mark"] + 5.
6. Guide them to update Rahul: df.loc[2, "Mark"] = 78.
7. Remind them to assign Result based on UpdatedMark >= 40.
8. Give one hint at a time.
```

---

## 43–48. Moodle IDE Concept for Day 7

Interactive workspace layout:
- **Left:** Python Code Editor.
- **Right:** Interactive 2D DataFrame Grid Inspector:
  - Header Row: Column names with data types (`object`, `int64`).
  - Index Bar: Vertical coordinates `0, 1, 2, 3`.
  - Cell Inspector: Hovering over cell `[1, "Mark"]` highlights row 1, column "Mark", value `92`.
  - Shape Badge: Dynamically updates from `(4, 3)` to `(4, 5)` as columns are added.

---

## 49. Day 7 Quiz — Questions and Answers

1. What is a Pandas DataFrame?  
   **Answer:** B. A two-dimensional labeled data structure
2. Which function creates a DataFrame?  
   **Answer:** C. `pd.DataFrame()`
3. What does one row usually represent in a DataFrame?  
   **Answer:** B. One record
4. What does one column usually represent?  
   **Answer:** A. One type of information
5. What does `students["Name"]` return?  
   **Answer:** B. A column as a Series
6. What does `students.iloc[0]` select?  
   **Answer:** B. First row by position
7. What does `.loc` primarily use?  
   **Answer:** B. Labels
8. What does `.iloc` primarily use?  
   **Answer:** B. Integer positions
9. How do you select two columns?  
   **Answer:** B. `students[["Name", "Mark"]]`
10. What does `students.loc[1, "Mark"]` select?  
    **Answer:** C. The cell at row label 1 and column Mark

---

## 50. Day 7 Cheat Sheet

```python
import pandas as pd

# 1. Create DataFrame
df = pd.DataFrame({
    "Name": ["Arun", "Priya"],
    "Mark": [80, 92]
})

# 2. Column Selection
s = df["Name"]              # Series (1D)
sub = df[["Name", "Mark"]]   # DataFrame (2D)

# 3. Row Selection
r0 = df.iloc[0]             # First row by position
r_label = df.loc[0]         # Row by index label

# 4. Cell Selection
cell = df.loc[1, "Mark"]    # Label intersection
cell_p = df.iloc[1, 1]      # Position intersection

# 5. Modification
df.loc[1, "Mark"] = 95      # Update one cell
df["Bonus"] = df["Mark"] + 5 # Add calculated column

# 6. Inspection
print(df.shape)             # (rows, cols)
print(df.columns)           # Index(['Name', 'Mark', 'Bonus'])
```

---

## 51–53. Memory Tricks

- **`Series`** $\rightarrow$ **Single Column** (1D).
- **`DataFrame`** $\rightarrow$ **Full Table** (2D Rows + Columns).
- **`Single Bracket`** `["Name"]` $\rightarrow$ Series.
- **`Double Bracket`** `[["Name", "Mark"]]` $\rightarrow$ DataFrame.
- **`.loc[row, col]`** $\rightarrow$ Coordinates by **Labels**.
- **`.iloc[row, col]`** $\rightarrow$ Coordinates by **Integer Positions**.

---

## 55. Final Key Message for Students

> **A Pandas DataFrame is the universal language of tabular data.**
>
> 1. Think in tables: **Rows** are individual records, **Columns** are distinct properties, and **Cells** are specific values.
> 2. Use `.loc[row, col]` for named coordinate lookups.
> 3. Use column arithmetic (`df["Price"] * df["Quantity"]`) to calculate new features across thousands of rows in a single line.
