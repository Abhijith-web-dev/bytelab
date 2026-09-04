# Unit–V — Day 10: File I/O, Reading & Writing Tabular Data, NumPy-Pandas Integration, and Unit-V Capstone Revision

**Duration:** 90 Minutes  
**Teaching Focus:** 45 Minutes Concept Teaching + 20 Minutes Practice + 25 Minutes Review, Demo, and Unit Capstone  
**Level:** Beginner → Intermediate  
**Unit:** Unit–V – NumPy and Pandas  
**Day:** 10 (Unit Capstone)  

---

## 1. Learning Objectives

By the end of this capstone session, students will be able to:
1. **Explain** how persistent tabular data is stored in text-based delimited formats (specifically Comma-Separated Values / CSV).
2. **Read** tabular files into structured Pandas DataFrames using `pd.read_csv()`.
3. **Configure** critical `read_csv()` parameters including `sep`, `header`, `names`, `usecols`, and `index_col`.
4. **Simulate** and parse file streams in memory using `io.StringIO` for testing and reproducible scripts.
5. **Serialize** and write DataFrames to persistent storage using `df.to_csv()`.
6. **Prevent** the common "unnamed column duplication" pitfall by mastering `index=False`.
7. **Extract** high-performance, raw C-contiguous NumPy arrays from DataFrames using `df.to_numpy()`.
8. **Construct** labeled DataFrames directly from 2D NumPy ndarrays using `pd.DataFrame(data, columns=..., index=...)`.
9. **Execute** conditional vectorized column assignments combining NumPy's `np.where()` with Pandas Series boolean masks.
10. **Differentiate** the architectural roles of NumPy (raw multidimensional numerical computing) and Pandas (labeled, structured relational data analysis).
11. **Assemble** an end-to-end production data pipeline: Ingest $\to$ Validate/Impute $\to$ Vectorize $\to$ GroupBy $\to$ Sort $\to$ Export.
12. **Review** and consolidate all core concepts taught throughout Unit–V (Days 1 through 10).

---

## 2. 90-Minute Session Plan

| Time Window | Session Phase | Core Topics & Pedagogical Activities |
| :--- | :--- | :--- |
| **0–5 min** | **Day 9 Recap** | GroupBy (Split-Apply-Combine), custom transformation with `.apply()`, and sorting with `.sort_values()`. |
| **5–15 min** | **Tabular Storage & CSV Anatomy** | Understanding CSV structure, delimiter mechanics, header rows, and why CSV is the universal data lingua franca. |
| **15–25 min** | **Reading Data with `read_csv()`** | Syntax, loading local files, handling headers, parsing selective columns with `usecols`, and memory streams with `io.StringIO`. |
| **25–35 min** | **Writing Data with `to_csv()`** | Saving DataFrames to disk, formatting output, custom separators, and why `index=False` is mandatory for clean pipelines. |
| **35–45 min** | **NumPy $\leftrightarrow$ Pandas Interoperability** | Extracting matrices via `df.to_numpy()`, building DataFrames from NumPy arrays, and vectorized branching with `np.where()`. |
| **45–55 min** | **End-to-End Enterprise Pipeline** | Architecture of a professional data processing workflow: Ingestion $\to$ Feature Engineering $\to$ Aggregation $\to$ Export. |
| **55–70 min** | **Unit–V Capstone Revision** | Comprehensive synthesis of Days 1–10: 1D/2D arrays, indexing/slicing, vector arithmetic, Series, DataFrames, cleaning, GroupBy, and I/O. |
| **70–80 min** | **Hands-on Arena Practice** | Solving the *E-Commerce Orders CSV Pipeline & Performance Analyzer* problem. |
| **80–90 min** | **Capstone Quiz & Wrap-up** | 10-question final Unit assessment, architectural mastery certificate, and transition to advanced Python. |

---

## 3. Quick Recap from Day 9

Yesterday, we unlocked advanced analytical transformations on DataFrames:
- **`df.groupby('Column')`** $\implies$ Implemented the **Split-Apply-Combine** pattern to partition rows and aggregate summary statistics (`mean`, `sum`, `count`, `min`, `max`).
- **`df['Col'].apply(lambda x: ...)`** $\implies$ Executed custom element-wise Python logic across every value in a column.
- **`df.sort_values(by='Col', ascending=False)`** $\implies$ Reordered rows according to quantitative or alphabetical criteria.
- **`df.reset_index(drop=True)`** $\implies$ Cleared scrambled row indices and re-established clean `0, 1, 2, ...` ranking.

However, in real-world data science, datasets do not begin life hardcoded inside Python dictionaries!
> *Where does enterprise data actually live? How do we read megabytes or gigabytes of external disk files into Python, transform them, and save the refined business results back to disk for leadership dashboards and downstream systems?*

Today we master **File I/O**, seamless **NumPy-Pandas Integration**, and celebrate our **Unit–V Capstone**!

---

## 4. Understanding Tabular Files & The CSV Format

### 4.1 What is CSV?
**CSV** stands for **Comma-Separated Values**. It is a plain-text format designed to store tabular rows and columns without the proprietary binary overhead of proprietary spreadsheet software.

Each line in a CSV file corresponds to **one row of data**. Within that line, individual cell values are separated by a delimiter character, almost always a comma (`,`):

```text
OrderID,Product,Category,Price,Quantity
1001,Laptop,Electronics,55000.0,2
1002,Mouse,Electronics,650.0,5
1003,Desk,Furniture,12000.0,1
1004,Chair,Furniture,4500.0,4
```

### 4.2 Key Structural Rules of CSV Files
1. **Header Row (Line 1):** Typically defines the column names (`OrderID`, `Product`, etc.).
2. **Consistent Column Count:** Every record row should have the exact same number of delimiter-separated values as the header.
3. **Escaping & Quotes:** If a text field contains an embedded comma (e.g., `"Bangalore, Karnataka"`), it must be enclosed in double quotes so the parser does not split it into two separate columns.
4. **Plain Text:** CSV files can be inspected with any basic text editor (Notepad, VS Code, Vim) or loaded directly into relational databases and analytical engines.

---

## 5. Reading Tabular Files with `pd.read_csv()`

Pandas provides the industry-standard function `pd.read_csv()` to parse delimited text files directly into optimized, typed DataFrames.

### 5.1 Basic File Reading Syntax
```python
import pandas as pd

# Reading from a physical file path on disk
df = pd.read_csv("sales_data.csv")
print(df.head())
```

When called with just a filename, `pd.read_csv()` automatically:
- Reads the first row as column header names.
- Infers data types (`int64`, `float64`, `object`/string, `bool`) for each column.
- Assigns a default sequential 0-indexed integer row index (`0, 1, 2, ...`).

---

### 5.2 Essential `read_csv()` Parameters

In professional settings, raw CSV files are often imperfect. Pandas provides robust parameters to tailor the parsing behavior:

| Parameter | Type | Default | Purpose & Typical Use Case |
| :--- | :--- | :--- | :--- |
| **`filepath_or_buffer`** | `str` or buffer | *Required* | Path to local file, web URL (`https://...`), or an in-memory string buffer (`io.StringIO`). |
| **`sep` / `delimiter`** | `str` | `','` | Delimiter separating fields. Use `'\t'` for tab-separated (TSV), `'\|'` for pipe-delimited logs. |
| **`header`** | `int` or `None` | `0` | Zero-indexed row number containing column names. Pass `header=None` if file lacks headers. |
| **`names`** | `list` | `None` | Custom list of column names to assign when the file has no header row or needs renaming. |
| **`usecols`** | `list` | `None` | Load only a specific subset of columns (e.g., `['OrderID', 'Price']`), saving vast memory. |
| **`index_col`** | `int` or `str` | `None` | Column to use as DataFrame row index (e.g., `index_col='OrderID'`). |
| **`na_values`** | `list` | `None` | Custom strings to interpret as `NaN` (e.g., `['N/A', 'MISSING', '-999']`). |

```python
# Practical Example: Reading a tab-separated file without a header row
df = pd.read_csv(
    "raw_logs.tsv",
    sep="\t",
    header=None,
    names=["Timestamp", "UserID", "Action", "Latency"],
    usecols=["UserID", "Action", "Latency"]
)
```

---

### 5.3 In-Memory CSV Parsing with `io.StringIO`

When writing unit tests, automated pipelines, or competitive programming solutions, files might not exist on a local physical disk. Instead, the CSV text may arrive via standard input (`sys.stdin`) or as a multi-line string variable.

Python's built-in `io.StringIO` wraps any string into an in-memory file-like stream that `pd.read_csv()` can consume instantly:

```python
import io
import pandas as pd

raw_csv = """OrderID,Product,Category,Price,Quantity
1001,Laptop,Electronics,55000.0,2
1002,Mouse,Electronics,650.0,5
1003,Desk,Furniture,12000.0,1
1004,Chair,Furniture,4500.0,4"""

# Treat string as an open file handle
buffer = io.StringIO(raw_csv)
df = pd.read_csv(buffer)

print(df)
```
```text
   OrderID Product     Category    Price  Quantity
0     1001  Laptop  Electronics  55000.0         2
1     1002   Mouse  Electronics    650.0         5
2     1003    Desk    Furniture  12000.0         1
3     1004   Chair    Furniture   4500.0         4
```

> [!TIP]
> `io.StringIO` is the secret weapon for unit testing data pipelines. It allows you to test complex parsing logic without having to create, manage, or delete temporary `.csv` files on disk.

---

## 6. Writing Tabular Files with `df.to_csv()`

After analyzing, transforming, or aggregating your dataset, you must persist the resulting DataFrame to disk so stakeholders, web applications, or databases can consume it.

### 6.1 Basic Export Syntax
```python
# Write the DataFrame to a local CSV file
df.to_csv("clean_orders.csv", index=False)
```

### 6.2 The Crucial `index=False` Rule
By default, `df.to_csv()` writes Pandas' internal row index (`0, 1, 2, ...`) as the first column of the output file. 

Consider what happens if you save **with** the default `index=True`:
```csv
,OrderID,Product,Price
0,1001,Laptop,55000.0
1,1002,Mouse,650.0
```
When someone re-reads that file with `pd.read_csv()`, Pandas sees the unnamed first column and creates a brand-new column called **`Unnamed: 0`**:
```text
   Unnamed: 0  OrderID Product    Price
0           0     1001  Laptop  55000.0
1           1     1002   Mouse    650.0
```
If you save and load the file three times in an iterative pipeline, you will end up with `Unnamed: 0`, `Unnamed: 0.1`, and `Unnamed: 0.2` polluting your tables!

> [!CAUTION]
> **Always specify `index=False`** when writing to CSV unless the DataFrame row index carries meaningful business data (such as a Date timestamp or custom primary ID).

### 6.3 Useful `to_csv()` Parameters
- **`path_or_buf=None`**: If omitted or set to `None`, `to_csv()` returns the CSV content directly as a **Python `str`** rather than writing to disk!
- **`columns=['Product', 'Price']`**: Writes only the specified subset of columns.
- **`sep=';'`**: Writes using custom delimiters (e.g., semicolon for European standard CSVs).
- **`na_rep='N/A'`**: Specifies what text representation to write for missing values.

```python
# Exporting directly to a string variable (no disk file needed)
csv_string = df.to_csv(index=False)
print(csv_string)
```

---

## 7. Bidirectional Integration: NumPy $\longleftrightarrow$ Pandas

A common misconception among beginner data analysts is that **NumPy** and **Pandas** are competing libraries and you must pick one over the other.

In reality, **Pandas is built directly on top of NumPy**. A Pandas Series is effectively a 1D NumPy array wrapped with an index and labels; a DataFrame is a collection of contiguous 1D NumPy arrays aligned under a 2D column grid.

```text
               ┌─────────────────────────────────────────────────────────┐
               │                    PANDAS DATAFRAME                     │
               │  - Human-friendly column names & labeled index          │
               │  - Relational queries: merge, groupby, pivot, join      │
               │  - Heterogeneous dtypes: text, dates, floats, ints       │
               └────────────────────────────┬────────────────────────────┘
                                            │ (Built on top of)
                                            ▼
               ┌─────────────────────────────────────────────────────────┐
               │                      NUMPY NDARRAY                      │
               │  - Homogeneous raw numerical memory buffers (C-speed)   │
               │  - Multidimensional tensor operations & linear algebra  │
               │  - Broadcasting, BLAS/LAPACK hardware acceleration      │
               └─────────────────────────────────────────────────────────┘
```

---

### 7.1 Extracting NumPy Arrays from DataFrames: `to_numpy()`

When you need to feed tabular numbers into machine learning models (such as scikit-learn, PyTorch, or TensorFlow) or run intensive matrix algebra, you extract the raw NumPy matrix using `.to_numpy()`:

```python
import pandas as pd

df = pd.DataFrame({
    "Price": [55000.0, 650.0, 12000.0],
    "Quantity": [2, 5, 1],
    "Discount": [0.10, 0.05, 0.15]
})

# Extract pure 2D float64 NumPy array
matrix = df.to_numpy()

print(type(matrix))   # <class 'numpy.ndarray'>
print(matrix.shape)   # (3, 3)
print(matrix.dtype)   # float64
print(matrix)
```
```text
[[5.500e+04 2.000e+00 1.000e-01]
 [6.500e+02 5.000e+00 5.000e-02]
 [1.200e+04 1.000e+00 1.500e-01]]
```

> [!NOTE]
> Older codebases often used `df.values`. In modern Pandas (version 1.0+), **`df.to_numpy()`** is the official, recommended method because it explicitly specifies data type conversion and avoids unexpected memory-copy behaviors.

---

### 7.2 Creating DataFrames from NumPy Arrays

The bridge runs both ways. You can generate numerical simulations, random samples, or linear algebra results in NumPy, and immediately wrap them into a rich Pandas DataFrame:

```python
import numpy as np
import pandas as pd

# Generate a 4x3 matrix of sensor readings
sensor_matrix = np.array([
    [24.5, 65.2, 1013.2],
    [25.1, 63.8, 1012.8],
    [23.9, 68.0, 1014.1],
    [24.8, 64.5, 1013.0]
])

# Wrap into a labeled DataFrame
sensor_df = pd.DataFrame(
    data=sensor_matrix,
    columns=["Temperature_C", "Humidity_Pct", "Pressure_hPa"],
    index=["Reading_1", "Reading_2", "Reading_3", "Reading_4"]
)

print(sensor_df)
```
```text
           Temperature_C  Humidity_Pct  Pressure_hPa
Reading_1           24.5          65.2        1013.2
Reading_2           25.1          63.8        1012.8
Reading_3           23.9          68.0        1014.1
Reading_4           24.8          64.5        1013.0
```

---

### 7.3 Conditional Vectorization with `np.where()`

One of the most powerful cross-library synergies is combining **Pandas boolean indexing** with **NumPy's `np.where()`**.

Suppose you want to classify orders: if revenue is $\ge 30,000$, label it `'Express'`; otherwise label it `'Standard'`.

#### The Slow Way (Python Loop or `apply`):
```python
# Slow: invokes a Python function call for every single row
df['Priority'] = df['TotalRevenue'].apply(lambda x: 'Express' if x >= 30000 else 'Standard')
```

#### The High-Performance Vectorized Way (`np.where`):
NumPy's `np.where(condition, value_if_true, value_if_false)` executes at hardware C-speed without any Python function call overhead:

```python
import numpy as np

# Vectorized ternary conditional
df['Priority'] = np.where(df['TotalRevenue'] >= 30000.0, 'Express', 'Standard')
```

```text
                  np.where(condition, if_true, if_false)
                                     │
           Condition: [110k >= 30k, 3.2k >= 30k, 42k >= 30k, 18k >= 30k]
           Mask:      [   True    ,   False   ,   True    ,   False    ]
                                     │
           Output:    ['Express'  , 'Standard', 'Express' , 'Standard' ]
```

---

## 8. The End-to-End Enterprise Data Pipeline

Modern data engineering is organized into disciplined, multi-stage pipelines. Let's trace how the concepts learned across Unit–V compose the complete lifecycle of enterprise data processing:

```text
  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
  │   1. INGEST  │ ───► │   2. CLEAN   │ ───► │ 3. VECTORIZE │ ───► │ 4. AGGREGATE │ ───► │  5. EXPORT   │
  │              │      │              │      │              │      │   & RANK     │      │              │
  │ pd.read_csv  │      │ isna/fillna  │      │ Element-wise │      │ groupby/agg  │      │  df.to_csv   │
  │ io.StringIO  │      │ dropna       │      │ np.where     │      │ sort_values  │      │ index=False  │
  └──────────────┘      └──────────────┘      └──────────────┘      └──────────────┘      └──────────────┘
```

### Complete Code Walkthrough:
```python
import io
import pandas as pd
import numpy as np

# 1. INGEST: Parse incoming CSV stream
raw_data = """OrderID,Product,Category,Price,Quantity
1001,Laptop,Electronics,55000.0,2
1002,Mouse,Electronics,650.0,5
1003,Desk,Furniture,12000.0,1
1004,Chair,Furniture,4500.0,4
1005,Monitor,Electronics,14000.0,3
1006,Lamp,Furniture,1500.0,2"""

df = pd.read_csv(io.StringIO(raw_data))

# 2. VECTORIZE: Compute revenue & conditional fulfillment tiers
df["TotalRevenue"] = df["Price"] * df["Quantity"]
df["Priority"] = np.where(df["TotalRevenue"] >= 30000.0, "Express", "Standard")

# 3. AGGREGATE: Group by Category and compute departmental revenue
category_summary = df.groupby("Category")["TotalRevenue"].sum()
print("Category Revenue:")
print(category_summary)

# 4. RANK: Sort orders by TotalRevenue descending and reset integer index
ranked_df = df.sort_values(by="TotalRevenue", ascending=False).reset_index(drop=True)
print("\nRanked Orders:")
print(ranked_df[["OrderID", "Product", "Category", "TotalRevenue", "Priority"]])

# 5. EXPORT: Generate production-ready CSV string
clean_output = ranked_df.to_csv(index=False)
```

---

## 9. Comprehensive Unit–V Capstone Revision

Across the past 10 days, you progressed from foundational numerical array manipulation to building complete enterprise analytical data engines. Let's review the architectural hierarchy:

### 9.1 The Data Structure Evolution: List $\to$ Array $\to$ Series $\to$ DataFrame

| Feature | Python List | NumPy ndarray | Pandas Series | Pandas DataFrame |
| :--- | :--- | :--- | :--- | :--- |
| **Dimensions** | 1D (nested for 2D) | $N$-Dimensional ($1D, 2D, 3D, \dots$) | 1-Dimensional | 2-Dimensional (Table) |
| **Data Types** | Heterogeneous (slow) | Strict Homogeneous (C-speed) | Homogeneous per Series | Heterogeneous across columns |
| **Indexing** | Implicit `0..N-1` | Integer indexing & slicing | Explicit named index labels | 2D: Named rows $\times$ Named columns |
| **Missing Data** | `None` | `np.nan` (float only) | `np.nan`, `pd.NA` | `np.nan`, `pd.NA` with auto-imputation |
| **Relational Ops** | None | None (matrix math only) | GroupBy, Map | GroupBy, Merge, Concat, Pivot |
| **Primary Use** | General scripting | Numerical & scientific computing | 1D labeled feature vector | Relational tables & analytics |

---

### 9.2 The Unit–V 10-Day Concept Map

```text
   Unit-V: NumPy & Pandas Data Mastery
   ├── Day 1: Introduction to NumPy (ndarrays, speed, memory, vectorization)
   ├── Day 2: Array Dimensions & Shape (shape, ndim, reshape, -1 dimension)
   ├── Day 3: Array Indexing & Slicing (1D/2D coordinates, step, subarrays)
   ├── Day 4: Mathematical Operations (Element-wise math, scalar broadcasting)
   ├── Day 5: Advanced Math Functions (np.sum, np.mean, np.sqrt, np.where)
   ├── Day 6: Pandas Series (1D labeled arrays, custom index, label alignment)
   ├── Day 7: Pandas DataFrame (2D tables, .loc vs .iloc, adding/modifying columns)
   ├── Day 8: Missing Data & Combining (isna, fillna, dropna, concat, merge)
   ├── Day 9: GroupBy, Apply & Sorting (Split-Apply-Combine, lambda, sort_values)
   └── Day 10: File I/O & Capstone Integration (read_csv, to_csv, to_numpy, pipelines)
```

---

## 10. Common Beginner Mistakes & Traps

### Pitfall 1: Forgetting `index=False` when saving to CSV
```python
# ❌ INCORRECT: Introduces unnamed index columns upon subsequent reads
df.to_csv("results.csv")

# ✅ CORRECT: Clean tabular export
df.to_csv("results.csv", index=False)
```

### Pitfall 2: Unescaped Windows file paths
On Windows operating systems, backslashes (`\`) inside standard Python string literals are interpreted as escape sequences (like `\n` or `\t`).
```python
# ❌ INCORRECT: Causes SyntaxError or FileNotFound
df = pd.read_csv("C:\new_folder\test.csv")

# ✅ CORRECT: Use raw string (r"...") or forward slashes
df = pd.read_csv(r"C:\new_folder\test.csv")
df = pd.read_csv("C:/new_folder/test.csv")
```

### Pitfall 3: Modifying a NumPy array extracted from a DataFrame without a copy
When you extract a NumPy array with `.to_numpy()`, it often shares the underlying memory buffer with the DataFrame. Modifying the array in-place may inadvertently alter your DataFrame!
```python
# If you plan to modify the array without affecting the DataFrame, use .copy()
matrix = df[['Price', 'Quantity']].to_numpy().copy()
```

### Pitfall 4: Misunderstanding `header=0` vs `header=None`
- `header=0` means: *"Row 0 of the file is my header row containing column names."*
- `header=None` means: *"This file has NO header row; row 0 is pure data, so assign integer column names 0, 1, 2, ... automatically."*

---

## 11. Guided Step-by-Step Practice Walkthrough

Let's review the required logic for the Day 10 Practice Arena challenge:

### Goal: Build the E-Commerce Orders CSV Pipeline & Performance Analyzer
1. **Read input safely:** Support both command-line stdin and interactive testing. Clean whitespace and UTF-8 BOM characters.
2. **Compute total order value:** Vectorized multiplication `df['Price'] * df['Quantity']`.
3. **Classify orders:** Apply `np.where(df['TotalRevenue'] >= 30000.0, 'Express', 'Standard')`.
4. **Aggregate category revenue:** Group by `'Category'` and calculate `.sum()`.
5. **Sort and rank:** Order by `'TotalRevenue'` descending with `.reset_index(drop=True)`.
6. **Print exact report blocks:** Follow formatting specifications for `'Category Revenue'`, `'Ranked Orders'`, and `'Summary'`.

---

## 12. Summary & Unit–V Capstone Checklist

Congratulations! You have completed the entire **Unit–V: NumPy and Pandas** curriculum.

You now possess the foundational engineering skills required to:
- Load messy real-world files into memory cleanly.
- Manipulate numerical matrices with C-speed vectorization.
- Query, filter, group, and reshape relational tables like a seasoned data scientist.
- Produce production-grade analytical outputs for machine learning and business intelligence.
