# Unit–V — Day 9: GroupBy Operations, Apply Functions, Data Transformation, and Sorting

**Duration:** 90 Minutes  
**Teaching Focus:** 45 Minutes Concept Teaching + 20 Minutes Basic Practice + 25 Minutes Review, Quiz and Problem Solving  
**Level:** Beginner → Intermediate  
**Unit:** Unit–V – NumPy and Pandas  
**Day:** 9  

---

## 1. Learning Objectives

By the end of this session, students will be able to:
1. **Explain** the fundamental three-phase lifecycle of **GroupBy**: **Split**, **Apply**, and **Combine**.
2. **Partition** a DataFrame into categorical subsets using `df.groupby()`.
3. **Execute** aggregate statistical functions (`.mean()`, `.sum()`, `.count()`, `.min()`, `.max()`) on grouped subsets.
4. **Compute** multi-metric summaries using `.agg(['mean', 'sum', 'count'])`.
5. **Group** by multiple hierarchical categorical columns (e.g., `['Department', 'City']`).
6. **Understand** the purpose of `.apply()` for executing custom Python functions and `lambda` expressions.
7. **Apply** element-wise transformations on a Pandas Series.
8. **Execute** row-wise logic across multiple columns using `df.apply(func, axis=1)`.
9. **Perform** categorical key-value mapping with `.map()` and string cleaning with `.str` accessors.
10. **Sort** DataFrames by single and multiple columns using `.sort_values()`.
11. **Differentiate** ascending (`ascending=True`) and descending (`ascending=False`) order.
12. **Sort** rows and columns by their labels using `.sort_index()`.
13. **Reset** the integer row index after sorting using `.reset_index(drop=True)`.
14. **Construct** an end-to-end data transformation pipeline: Group $\to$ Aggregate $\to$ Transform $\to$ Rank.

---

## 2. 90-Minute Session Plan

| Time Window | Session Phase | Core Topics & Activities |
| :--- | :--- | :--- |
| **0–5 min** | **Day 8 Recap** | Missing data detection (`isna`), imputation (`fillna`), and table combining (`concat`, `merge`). |
| **5–15 min** | **GroupBy Foundations** | The Split-Apply-Combine mental model; real-world scenarios (department averages, regional sales). |
| **15–25 min** | **GroupBy Syntax & Aggregations** | Grouping single columns, multiple columns, and multi-metric aggregation using `.agg()`. |
| **25–35 min** | **Data Transformation with `apply()`** | Why custom functions are needed; using standard functions vs anonymous `lambda` expressions. |
| **35–45 min** | **Mapping & String Transforms** | Category dictionary substitution with `.map()`; vectorized string cleaning with `.str`. |
| **45–55 min** | **Sorting Data** | Sorting by values with `sort_values()`; multi-column sorting; sorting by index with `sort_index()`. |
| **55–65 min** | **Index Resetting & Cleaning** | Rebuilding continuous `0..N-1` indices with `.reset_index(drop=True)`. |
| **65–75 min** | **Guided Practical Pipeline** | Building the Department Performance Analyzer & Ranker step by step. |
| **75–85 min** | **Hands-on Practice** | Solving the Practice Arena problem and running test cases. |
| **85–90 min** | **Quiz & Review** | 10-question formative assessment and key concept consolidation. |

---

## 3. Quick Recap from Day 8

Yesterday we learned how to audit data quality and fuse disparate tables:
- **`df.isna()`** $\implies$ Detected missing (`NaN`) observations.
- **`df.fillna(value)`** $\implies$ Imputed missing entries without losing records.
- **`df.dropna()`** $\implies$ Excised incomplete rows.
- **`pd.concat([a, b])`** $\implies$ **Stacked** tables vertically (`axis=0`) or horizontally (`axis=1`).
- **`pd.merge(a, b, on="Key")`** $\implies$ **Matched** records using common entity keys.

Today we ask:
> *Now that our dataset is clean and unified, how do we extract aggregated business intelligence by category, engineer custom features, and rank our records from best to worst?*

---

## 4. Introduction to GroupBy: The Split-Apply-Combine Pattern

In data analysis, we rarely want just one single global average for an entire company. We want to know:
- What is the average salary **by department**?
- What is the total revenue **by store location**?
- What is the pass percentage **by academic section**?

This operation is called **GroupBy**, and it follows the renowned **Split-Apply-Combine** architecture:

```text
                             RAW DATAFRAME
                 ┌────────────┬─────────────┬──────────┐
                 │ Name       │ Department  │ Salary   │
                 ├────────────┼─────────────┼──────────┤
                 │ Arun       │ IT          │ 50,000   │
                 │ Priya      │ HR          │ 45,000   │
                 │ Rahul      │ IT          │ 60,000   │
                 │ Meena      │ HR          │ 48,000   │
                 │ Kiran      │ Sales       │ 52,000   │
                 │ Divya      │ Sales       │ 58,000   │
                 └────────────┴─────────────┴──────────┘
                                    │
                                    ▼
       PHASE 1: SPLIT (Partition rows into categorical buckets)
       ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
       │ HR BUCKET       │ │ IT BUCKET       │ │ SALES BUCKET    │
       │ Priya:  45,000  │ │ Arun:   50,000  │ │ Kiran:  52,000  │
       │ Meena:  48,000  │ │ Rahul:  60,000  │ │ Divya:  58,000  │
       └─────────────────┘ └─────────────────┘ └─────────────────┘
                │                   │                   │
                ▼                   ▼                   ▼
       PHASE 2: APPLY (Compute summary metric on each bucket independently)
         mean = 46,500       mean = 55,000       mean = 55,000
                │                   │                   │
                └───────────────────┼───────────────────┘
                                    │
                                    ▼
       PHASE 3: COMBINE (Assemble bucket metrics into a unified output)
                 ┌─────────────┬─────────────────┐
                 │ Department  │ Mean Salary     │
                 ├─────────────┼─────────────────┤
                 │ HR          │ 46,500.0        │
                 │ IT          │ 55,000.0        │
                 │ Sales       │ 55,000.0        │
                 └─────────────┴─────────────────┘
```

---

## 5. Basic GroupBy Syntax: `df.groupby()`

Let's create the employee dataset in Python:

```python
import pandas as pd

data = pd.DataFrame({
    "ID": [101, 102, 103, 104, 105, 106],
    "Name": ["Arun", "Priya", "Rahul", "Meena", "Kiran", "Divya"],
    "Department": ["IT", "HR", "IT", "HR", "Sales", "Sales"],
    "Salary": [50000.0, 45000.0, 60000.0, 48000.0, 52000.0, 58000.0],
    "Experience": [2, 1, 4, 3, 2, 5]
})

print(data)
```

### The Lazy Evaluation Trap
If you execute:
```python
print(data.groupby("Department"))
```
**Output:**
```text
<pandas.core.groupby.generic.DataFrameGroupBy object at 0x7f8b2c>
```
> [!WARNING]
> Calling `df.groupby('Column')` does **not** perform any mathematical computation immediately! It creates a lazy `DataFrameGroupBy` object that records *how* to partition the rows. You must chain an **aggregation function** to trigger calculation!

---

## 6. Chaining Aggregations: Computing Mean, Sum, and Count

To compute the mean salary per department:

```python
dept_avg = data.groupby("Department")["Salary"].mean()
print(dept_avg)
```

**Output:**
```text
Department
HR       46500.0
IT       55000.0
Sales    55000.0
Name: Salary, dtype: float64
```

Notice what happened:
1. `data.groupby("Department")` defines the grouping keys.
2. `["Salary"]` targets the continuous numerical column we wish to evaluate.
3. `.mean()` triggers the split-apply-combine calculation, returning a Series indexed by `Department`.

### Other Standard Aggregation Functions
```python
# Total payroll expenditure by department
data.groupby("Department")["Salary"].sum()

# Number of employees in each department
data.groupby("Department")["Salary"].count()

# Minimum and Maximum salary per department
data.groupby("Department")["Salary"].min()
data.groupby("Department")["Salary"].max()
```

---

## 7. Multi-Metric Aggregation with `.agg()`

In real-world analytics, we frequently need multiple summary statistics at the same time (e.g., headcount, average salary, and top salary).

Instead of running separate groupby calls, use **`.agg()`**:

```python
dept_summary = data.groupby("Department")["Salary"].agg(["count", "mean", "max"])
print(dept_summary)
```

**Output:**
```text
            count     mean      max
Department                         
HR              2  46500.0  48000.0
IT              2  55000.0  60000.0
Sales           2  55000.0  58000.0
```

Pandas outputs a 2D DataFrame where each row is a department and each column is a computed statistical metric.

---

## 8. Grouping by Multiple Columns

You can group by multiple categorical dimensions simultaneously by passing a list of column names:

```python
# Suppose we track Department and Branch Location
sales_data = pd.DataFrame({
    "Branch": ["North", "North", "South", "South", "North"],
    "Product": ["Pen", "Book", "Pen", "Book", "Pen"],
    "Revenue": [500, 1200, 450, 1100, 600]
})

print(sales_data.groupby(["Branch", "Product"])["Revenue"].sum())
```

**Output:**
```text
Branch  Product
North   Book       1200
        Pen        1100
South   Book       1100
        Pen         450
Name: Revenue, dtype: int64
```

---

## 9. Custom Data Transformation with `.apply()`

While Pandas offers built-in arithmetic (`df['Salary'] * 1.10`), real-world business logic often requires custom decision rules:
- *If employee experience is > 3 years, award a 15% bonus; otherwise award 10%.*
- *If exam score >= 90, grade is 'A'; if score >= 75, grade is 'B'; otherwise 'C'.*

The **`.apply()`** method allows you to execute any arbitrary Python function across a Series or DataFrame.

### Using `.apply()` on a Series with a Named Function
```python
def calculate_grade(score):
    if score >= 90:
        return "A"
    elif score >= 75:
        return "B"
    elif score >= 50:
        return "C"
    else:
        return "Fail"

scores = pd.Series([88, 94, 62, 45, 78])
grades = scores.apply(calculate_grade)
print(grades)
```

**Output:**
```text
0       B
1       A
2       C
3    Fail
4       B
dtype: object
```

---

## 10. Using `.apply()` with Anonymous `lambda` Functions

When the transformation logic is simple and concise, writing a full multi-line function is unnecessary. Use an inline **`lambda`**:

$$\lambda \, x : \text{expression}$$

```python
# Award a flat 10% bonus on all salaries
data["Bonus"] = data["Salary"].apply(lambda s: s * 0.10)
print(data[["Name", "Salary", "Bonus"]])
```

**Output:**
```text
    Name   Salary   Bonus
0   Arun  50000.0  5000.0
1  Priya  45000.0  4500.0
2  Rahul  60000.0  6000.0
3  Meena  48000.0  4800.0
4  Kiran  52000.0  5200.0
5  Divya  58000.0  5800.0
```

---

## 11. Row-Wise DataFrame Evaluation: `axis=1`

What if our custom logic needs values from **multiple different columns** in each row?

By passing **`axis=1`**, `apply()` feeds the entire row as a Pandas Series into the function:

```python
# If experience >= 3 years, bonus is 15%; otherwise 10%
def dynamic_bonus(row):
    if row["Experience"] >= 3:
        return row["Salary"] * 0.15
    else:
        return row["Salary"] * 0.10

data["SmartBonus"] = data.apply(dynamic_bonus, axis=1)
print(data[["Name", "Salary", "Experience", "SmartBonus"]])
```

**Output:**
```text
    Name   Salary  Experience  SmartBonus
0   Arun  50000.0           2      5000.0
1  Priya  45000.0           1      4500.0
2  Rahul  60000.0           4      9000.0  (15% awarded)
3  Meena  48000.0           3      7200.0  (15% awarded)
4  Kiran  52000.0           2      5200.0
5  Divya  58000.0           5      8700.0  (15% awarded)
```

```text
Understanding axis in apply():
  axis=0 (Default) ──► Apply function column-by-column (receives column Series)
  axis=1           ──► Apply function row-by-row (receives row Series)
```

---

## 12. Feature Mapping & Vectorized String Transformations

### 1. Dictionary Mapping with `.map()`
When translating categorical codes into full text labels, `.map()` is clean and fast:

```python
roles = pd.Series(["E1", "E2", "E1", "E3"])
role_names = {
    "E1": "Junior Associate",
    "E2": "Senior Developer",
    "E3": "Principal Architect"
}

print(roles.map(role_names))
```

**Output:**
```text
0       Junior Associate
1       Senior Developer
2       Junior Associate
3    Principal Architect
dtype: object
```

### 2. String Cleaning with `.str`
Pandas provides a dedicated `.str` namespace for vectorized string operations:

```python
names = pd.Series(["  arun  ", "PRIYA", "rahul dev "])

# Strip surrounding whitespace and convert to Title Case
cleaned_names = names.str.strip().str.title()
print(cleaned_names)
```

**Output:**
```text
0        Arun
1       Priya
2   Rahul Dev
dtype: object
```

---

## 13. Sorting Data: `sort_values()`

Organizing rows into ascending or descending order is essential for rankings, leaderboards, and time-series analysis.

### Sorting by a Single Column
```python
# Default: ascending=True (lowest to highest)
print(data.sort_values(by="Salary"))

# Descending: ascending=False (highest to lowest)
print(data.sort_values(by="Salary", ascending=False))
```

**Descending Output:**
```text
    ID   Name Department   Salary  Experience
2  103  Rahul         IT  60000.0           4
5  106  Divya      Sales  58000.0           5
4  105  Kiran      Sales  52000.0           2
0  101   Arun         IT  50000.0           2
3  104  Meena         HR  48000.0           3
1  102  Priya         HR  45000.0           1
```

Notice that the original index numbers (`2, 5, 4, 0, 3, 1`) travelled with the rows!

---

## 14. Resetting the Index: `.reset_index(drop=True)`

When rows are sorted, their index labels reflect their previous positions. To produce a clean, sequential `0, 1, 2, ...` rank index:

```python
ranked_data = data.sort_values(by="Salary", ascending=False).reset_index(drop=True)
print(ranked_data)
```

**Output:**
```text
    ID   Name Department   Salary  Experience
0  103  Rahul         IT  60000.0           4  (Rank 0)
1  106  Divya      Sales  58000.0           5  (Rank 1)
2  105  Kiran      Sales  52000.0           2  (Rank 2)
3  101   Arun         IT  50000.0           2  (Rank 3)
4  104  Meena         HR  48000.0           3  (Rank 4)
5  102  Priya         HR  45000.0           1  (Rank 5)
```

> [!TIP]
> Always include `drop=True` inside `reset_index()`, otherwise Pandas will insert the old scrambled index as an unwanted extra column named `'index'`.

---

## 15. Multi-Column Sorting

You can sort by multiple columns with different directional orders:
- Sort primary by `Department` (Alphabetical: A $\to$ Z)
- Sort secondary by `Salary` (Descending: Highest $\to$ Lowest)

```python
multi_sorted = data.sort_values(
    by=["Department", "Salary"],
    ascending=[True, False]
)
print(multi_sorted[["Department", "Name", "Salary"]])
```

**Output:**
```text
  Department   Name   Salary
3         HR  Meena  48000.0
1         HR  Priya  45000.0
2         IT  Rahul  60000.0
0         IT   Arun  50000.0
5      Sales  Divya  58000.0
4      Sales  Kiran  52000.0
```

---

## 16. Sorting by Index: `sort_index()`

If your DataFrame index has semantic meaning (like dates or student IDs) and becomes scrambled after merges or filters, restore chronological or sequential order using **`sort_index()`**:

```python
# Restore original order by sorting the row index labels
restored = multi_sorted.sort_index(ascending=True)
print(restored)
```

---

## 17. The Complete End-to-End Analytics Workflow

```text
              RAW MULTI-ATTRIBUTE ENTERPRISE DATA
                               │
               ┌───────────────┴───────────────┐
               ▼                               ▼
       GROUP & AGGREGATE               TRANSFORM FEATURES
       df.groupby('Dept')               df['Salary'].apply()
         ['Salary'].mean()               lambda s: s * 0.10
               │                               │
               └───────────────┬───────────────┘
                               │
                               ▼
                        SYNTHESIS COLUMN
                     TotalPay = Salary + Bonus
                               │
                               ▼
                       SORT & RANK LEADER
                     df.sort_values(by='TotalPay',
                                   ascending=False)
                               │
                               ▼
                      EXECUTIVE DASHBOARD
```

---

## 18. Common Beginner Mistakes

### Mistake 1: Printing GroupBy Without an Aggregation
```python
# ❌ WRONG: Prints object reference, no math executed!
print(df.groupby("Department"))

# ✅ CORRECT: Chain an aggregate function
print(df.groupby("Department")["Salary"].mean())
```

### Mistake 2: Forgetting `axis=1` in Multi-Column `.apply()`
```python
# ❌ WRONG: Default axis=0 passes each column; row['Salary'] throws KeyError!
df.apply(lambda row: row["Salary"] + row["Bonus"])

# ✅ CORRECT: Pass axis=1 so the lambda receives the horizontal row
df.apply(lambda row: row["Salary"] + row["Bonus"], axis=1)
```

### Mistake 3: Assuming `sort_values()` Mutates in Place
```python
# ❌ WRONG: sort_values returns a sorted copy; df remains unchanged!
df.sort_values(by="Salary", ascending=False)
print(df)  # Still in original scrambled order!

# ✅ CORRECT: Assign the sorted result to a variable
df = df.sort_values(by="Salary", ascending=False)
```

### Mistake 4: Forgetting `drop=True` in `reset_index()`
```python
# ❌ WRONG: Adds an unwanted 'index' column to the DataFrame
df = df.sort_values(by="Salary").reset_index()

# ✅ CORRECT: Drop the legacy index
df = df.sort_values(by="Salary").reset_index(drop=True)
```

---

## 19. Quick 5-Minute Student Workouts

1. **Workout 1:** What does `groupby('Category')['Price'].sum()` calculate?  
   *Answer:* Total sum of prices for each distinct category.
2. **Workout 2:** What is the Split-Apply-Combine lifecycle?  
   *Answer:* Partition into groups, evaluate a metric on each group, combine results into a summary.
3. **Workout 3:** How do you sort a DataFrame in descending order?  
   *Answer:* Using `df.sort_values(by='Column', ascending=False)`.
4. **Workout 4:** What does `df['Mark'].apply(lambda x: x + 5)` do?  
   *Answer:* Adds 5 points to every mark in the series.
5. **Workout 5:** What happens if you run `df.sort_index(ascending=False)`?  
   *Answer:* Rows are sorted by their row index labels from highest to lowest.

---

## 20. 20-Minute Hands-on Practice Drills

### Drill 1: GroupBy Average and Headcount
```python
import pandas as pd

students = pd.DataFrame({
    "Dept": ["CS", "ECE", "CS", "MECH", "ECE"],
    "Mark": [85, 90, 78, 88, 92]
})

print(students.groupby("Dept")["Mark"].agg(["count", "mean"]))
```

### Drill 2: Apply Custom Pass/Fail Status
```python
students["Status"] = students["Mark"].apply(lambda m: "Distinction" if m >= 90 else "Pass")
print(students)
```

### Drill 3: Rank Students by Marks
```python
ranked = students.sort_values(by="Mark", ascending=False).reset_index(drop=True)
print(ranked)
```

### Drill 4: Mapping Department Codes
```python
dept_fullnames = {"CS": "Computer Science", "ECE": "Electronics", "MECH": "Mechanical"}
students["DeptName"] = students["Dept"].map(dept_fullnames)
print(students)
```

---

## 21. Main Moodle Practice Problem

### Title: Department Performance Analyzer & Ranker
- **Difficulty:** Beginner → Intermediate
- **Marks:** 15
- **Recommended Time:** 20 Minutes

#### Problem Statement
Given organizational employee records:
```python
data = pd.DataFrame({
    "ID": [101, 102, 103, 104, 105, 106],
    "Name": ["Arun", "Priya", "Rahul", "Meena", "Kiran", "Divya"],
    "Department": ["IT", "HR", "IT", "HR", "Sales", "Sales"],
    "Salary": [50000.0, 45000.0, 60000.0, 48000.0, 52000.0, 58000.0],
    "Experience": [2, 1, 4, 3, 2, 5]
})
```

Your program must:
1. Print the header `Department Average Salary` followed by `data.groupby('Department')['Salary'].mean()`.
2. Compute a 10% annual bonus using `.apply(lambda s: s * 0.10)` on `Salary` and save to column `Bonus`.
3. Compute `TotalPay` equal to `Salary + Bonus`.
4. Sort employees by `TotalPay` in descending order (`ascending=False`) and reset the index (`reset_index(drop=True)`).
5. Print `Ranked Employees` followed by columns `["Name", "Department", "TotalPay"]`.
6. Print `Summary` followed by:
   - `Top Earner: <Name> (<TotalPay>)`
   - `Total Payroll: <sum>`

#### Expected Output
```text
Department Average Salary
Department
HR       46500.0
IT       55000.0
Sales    55000.0
Name: Salary, dtype: float64
Ranked Employees
    Name Department  TotalPay
0  Rahul         IT   66000.0
1  Divya      Sales   63800.0
2  Kiran      Sales   57200.0
3   Arun         IT   55000.0
4  Meena         HR   52800.0
5  Priya         HR   49500.0
Summary
Top Earner: Rahul (66000.0)
Total Payroll: 344300.0
```

---

## 22. Moodle AI Agent Pedagogical Instruction

When tutoring a student in the Practice Arena, follow these steps:
1. **Never supply the entire script upfront.**
2. Guide the student on grouping: *"How do you group by Department and calculate the mean of Salary? Use `data.groupby('Department')['Salary'].mean()`."*
3. Guide feature creation: *"To calculate a 10% bonus, apply a lambda function: `data['Salary'].apply(lambda s: s * 0.10)`."*
4. Guide sorting: *"To rank employees from highest to lowest, what parameter controls the direction? Set `ascending=False` in `sort_values(by='TotalPay', ascending=False)`."*
5. Remind them about index resetting: *"Notice how the row indices become scrambled after sorting? Chain `.reset_index(drop=True)` to rebuild a clean 0..N-1 index."*
6. Check output formatting: Verify that the console headers match letter-for-letter: `Department Average Salary`, `Ranked Employees`, and `Summary`.

---

## 23. Moodle IDE Visualizer Specifications

### 1. Split-Apply-Combine Visualizer Lab
```text
┌──────────────────────────────────────────────────────────────┐
│             SPLIT-APPLY-COMBINE INTERACTIVE LAB              │
├───────────────────────┬──────────────────────────────────────┤
│ CATEGORICAL PARTITION │ GROUPED BUCKETS                      │
│ Group Key: Department │                                      │
│                       │ [ HR ]    ──► Priya (45k), Meena (48k)│
│ Operation: .mean()    │ [ IT ]    ──► Arun (50k), Rahul (60k) │
│                       │ [ Sales ] ──► Kiran (52k), Divya (58k)│
├───────────────────────┴──────────────────────────────────────┤
│ RECOMBINED OUTPUT                                            │
│   HR    ──► 46,500.0                                         │
│   IT    ──► 55,000.0                                         │
│   Sales ──► 55,000.0                                         │
└──────────────────────────────────────────────────────────────┘
```

### 2. Apply Function & Sorting Animator
```text
┌──────────────────────────────────────────────────────────────┐
│               FEATURE TRANSFORMATION & RANKING               │
├──────────────────────┬───────────────────────────────────────┤
│ APPLY ENGINE         │ SORTING ENGINE                        │
│ Function: s * 0.10   │ Column: TotalPay                      │
│                      │ Direction: Descending [▼]             │
│ Salary ──► Bonus     │                                       │
│ 50,000 ──► 5,000     │ 1. Rahul (IT)   ──► 66,000.0  ▲ TOP   │
│ 60,000 ──► 6,000     │ 2. Divya (Sales)──► 63,800.0          │
│ 58,000 ──► 5,800     │ 3. Kiran (Sales)──► 57,200.0          │
└──────────────────────┴───────────────────────────────────────┘
```

---

## 24. Comprehensive Cheat Sheet

| Task | Pandas Code | Description |
| :--- | :--- | :--- |
| **Group and Average** | `df.groupby('Cat')['Val'].mean()` | Calculates the arithmetic mean for each group. |
| **Multi-Aggregation** | `df.groupby('Cat')['Val'].agg(['mean', 'count'])` | Calculates multiple statistics in one pass. |
| **Element Transformation** | `s.apply(lambda x: x * 1.10)` | Evaluates a custom scalar function per cell. |
| **Row-Wise Evaluation** | `df.apply(func, axis=1)` | Evaluates function horizontally across row Series. |
| **Category Mapping** | `s.map({'A': 1, 'B': 2})` | Replaces values based on dictionary keys. |
| **Sort Values Ascending** | `df.sort_values(by='Col')` | Orders rows lowest to highest. |
| **Sort Values Descending**| `df.sort_values(by='Col', ascending=False)` | Orders rows highest to lowest. |
| **Reset Index** | `df.reset_index(drop=True)` | Restores sequential integer index 0..N-1. |
| **Sort by Index** | `df.sort_index()` | Orders rows by index labels. |

---

## 25. Final Key Takeaway

$$\begin{aligned}
\mathbf{groupby()}    &\longrightarrow \mathbf{SUMMARIZE} \quad (\text{Split into groups, apply aggregate, combine results}) \\
\mathbf{apply()}      &\longrightarrow \mathbf{TRANSFORM} \quad (\text{Execute custom row or cell business logic}) \\
\mathbf{sort\_values()}&\longrightarrow \mathbf{RANK}      \quad (\text{Organize records by numerical or alphabetical priority})
\end{aligned}$$

With these three tools mastered, you possess the core computational vocabulary to transform raw tabular spreadsheets into executive analytical reports!
