# Unit–V — Day 4: Mathematical Operations with NumPy Arrays

**Duration:** 90 Minutes  
**Teaching Focus:** 45 Minutes Concept Teaching + 20 Minutes Practice + 25 Minutes Review, Quiz and Practical Work  
**Level:** Beginner  
**Unit:** Unit–V — NumPy  
**Day:** 4 (Day 52 of 65)  

---

## 1. Learning Objectives

By the end of this session, students should be able to:

1. **Explain** what an element-wise (vectorized) operation means.
2. **Perform** vectorized addition on NumPy arrays (`+`).
3. **Perform** vectorized subtraction on NumPy arrays (`-`).
4. **Perform** vectorized multiplication on NumPy arrays (`*`).
5. **Perform** vectorized division on NumPy arrays (`/`).
6. **Apply** a single scalar number across every element in an array.
7. **Perform** arithmetic between two NumPy arrays of matching shapes.
8. **Understand** why arrays require compatible shapes for direct element-wise operations.
9. **Use** indexing and slicing together with arithmetic to modify targeted sub-arrays.
10. **Solve** practical real-world numerical problems (employee payroll, retail discounts, sales revenue, temperature conversion).

---

## 2. 90-Minute Session Plan

| Time Window | Topic | Pedagogical Activity & Focus |
|---|---|---|
| **0–5 min** | **Day 3 Recap** | Quick drill on 1D/2D indexing and slicing (`marks[:, 1]`). |
| **5–12 min** | **NumPy Arithmetic** | Why NumPy arithmetic is faster and cleaner than Python list loops. |
| **12–22 min** | **Addition & Subtraction** | Scalar broadcasting (`+ 5`, `- 20`) and employee allowances. |
| **22–32 min** | **Multiplication & Division** | Scaling (`* 2`, `/ 2`), float division behavior, shopping discounts. |
| **32–42 min** | **Element-wise Operations** | Array + Array, Array × Array; matching corresponding positions. |
| **42–45 min** | **Shape Awareness** | Shape compatibility requirement (`(5,)` with `(5,)`) vs mismatch. |
| **45–52 min** | **Guided Example** | Student marks gradebook and temperature adjustment. |
| **52–65 min** | **Hands-On Practice** | 4 progressive arithmetic exercises in the code editor. |
| **65–73 min** | **Indexing + Arithmetic** | Targeted updates (`marks[0] = marks[0] + 5`, `marks[:, 2] += 10`). |
| **73–80 min** | **Real-World Examples** | Weekly revenue calculation and Celsius-to-Fahrenheit conversion. |
| **80–85 min** | **Moodle Practice Lab** | Independent implementation: *Daily Sales Calculator*. |
| **85–90 min** | **Quiz & Reflection** | 10-question knowledge check, cheat sheet recap, and concept map. |

---

## 3. Quick Recap from Day 3

Yesterday in Day 3, we learned how to isolate and extract specific data values from NumPy arrays:

```python
import numpy as np

numbers = np.array([10, 20, 30, 40, 50])

# Access individual values:
print(numbers[0])   # 10
print(numbers[-1])  # 50

# Slicing ranges:
print(numbers[1:4]) # [20 30 40]

# 2D coordinates:
# marks[row, column]
```

Today, we take those selected values and perform **fast, vectorized mathematical operations** on them.

---

## 4. Start with a Simple Question

Suppose we have marks for four students:

```python
marks = np.array([60, 70, 80, 90])
```

The instructor wants to award every student **5 bonus marks**.

Without NumPy (or using standard Python lists), we would have to write an explicit `for` loop or list comprehension:

```python
# Standard Python list approach:
bonus_marks = []
for m in [60, 70, 80, 90]:
    bonus_marks.append(m + 5)
```

With NumPy, we write:

```python
marks + 5
```

**Result:**
```text
[65 75 85 95]
```

A single concise mathematical expression updates every element in the array simultaneously. This is the central superpower of NumPy.

---

## 5. What is an Element-wise Operation?

**Element-wise** means:
> The operation is performed independently and separately on each corresponding element of the array.

```text
[ 10   20   30 ]
   +    +    +
[  1    2    3 ]
   ↓    ↓    ↓
[ 11   22   33 ]

10 + 1 = 11
20 + 2 = 22
30 + 3 = 33
```

---

## 6. NumPy Arithmetic with a Single Number (Scalar)

A single individual number is called a **scalar** (e.g., `5`, `2.5`, `100`).

When an arithmetic operator connects a NumPy array with a scalar:

```python
import numpy as np

numbers = np.array([10, 20, 30])
print(numbers + 5)
```

**Output:**
```text
[15 25 35]
```

The scalar `5` is automatically **broadcast** to every position in the array.

---

## 7. Addition (`array + number`)

```python
import numpy as np

numbers = np.array([10, 20, 30, 40])
print(numbers + 5)
```

**Output:**
```text
[15 25 35 45]
```

---

## 8. Addition — Real-World Example: Salary Allowance

```python
import numpy as np

salary = np.array([20000, 25000, 30000])

# Every employee receives an allowance of 1000:
new_salary = salary + 1000
print(new_salary)
```

**Output:**
```text
[21000 26000 31000]
```

---

## 9. Subtraction (`array - number`)

```python
numbers = np.array([100, 200, 300])
print(numbers - 20)
```

**Output:**
```text
[ 80 180 280]
```

---

## 10. Real-World Example — Store Discount

```python
prices = np.array([1000, 1500, 2000])

# Give a flat 100 festival discount on all items:
discounted = prices - 100
print(discounted)
```

**Output:**
```text
[ 900 1400 1900]
```

---

## 11. Multiplication (`array * number`)

```python
numbers = np.array([10, 20, 30])
print(numbers * 2)
```

**Output:**
```text
[20 40 60]
```

> [!WARNING]
> **List vs Array Multiplication:**  
> For a Python list, `[10, 20] * 2` yields `[10, 20, 10, 20]` (sequence replication).  
> For a NumPy array, `np.array([10, 20]) * 2` yields `[20 40]` (numeric arithmetic).

---

## 12. Real-World Example — Price Doubling

```python
prices = np.array([100, 200, 50])
new_prices = prices * 2
print(new_prices)
```

**Output:**
```text
[200 400 100]
```

---

## 13. Division (`array / number`)

```python
numbers = np.array([10, 20, 30])
print(numbers / 2)
```

**Output:**
```text
[ 5. 10. 15.]
```

Standard division (`/`) in Python produces **floating-point** numbers, denoted by trailing decimal points (`5.`, `10.`, `15.`).

---

## 14. Real-World Example — Split a Bill

```python
bills = np.array([100, 200, 300])

# Each bill split equally between 2 colleagues:
share = bills / 2
print(share)
```

**Output:**
```text
[ 50. 100. 150.]
```

---

## 15. The Four Basic Scalar Arithmetic Operations

Given `numbers = np.array([10, 20, 30])`:

- **Addition:** `numbers + 5` $\rightarrow$ `[15 25 35]`
- **Subtraction:** `numbers - 5` $\rightarrow$ `[ 5 15 25]`
- **Multiplication:** `numbers * 5` $\rightarrow$ `[ 50 100 150]`
- **Division:** `numbers / 5` $\rightarrow$ `[2. 4. 6.]`

---

## 16. Array + Array Arithmetic

NumPy performs arithmetic directly between two arrays:

```python
import numpy as np

a = np.array([10, 20, 30])
b = np.array([1, 2, 3])

print(a + b)
```

**Output:**
```text
[11 22 33]
```

---

## 17. How Array + Array Works

```text
a = [ 10   20   30 ]
b = [  1    2    3 ]
      ↓    ↓    ↓
     (+)  (+)  (+)
      ↓    ↓    ↓
    [ 11   22   33 ]

10 + 1 = 11
20 + 2 = 22
30 + 3 = 33
```

---

## 18. Array Subtraction (`a - b`)

```python
a = np.array([10, 20, 30])
b = np.array([1, 2, 3])
print(a - b)
```

**Output:**
```text
[ 9 18 27]
```

---

## 19. Array Multiplication (`a * b`)

```python
a = np.array([10, 20, 30])
b = np.array([1, 2, 3])
print(a * b)
```

**Output:**
```text
[10 40 90]
```

Calculations: $10 \times 1 = 10$, $20 \times 2 = 40$, $30 \times 3 = 90$.

---

## 20. Array Division (`a / b`)

```python
a = np.array([10, 20, 30])
b = np.array([2, 4, 5])
print(a / b)
```

**Output:**
```text
[5. 5. 6.]
```

Calculations: $10 / 2 = 5.0$, $20 / 4 = 5.0$, $30 / 5 = 6.0$.

---

## 21. Scalar vs Array

- A **Scalar** is an isolated single number: `5`
- An **Array** contains an ordered sequence of numbers: `np.array([10, 20, 30])`

When performing `array + scalar`, the single number is distributed across every item in the array.

---

## 22. Array + Scalar Diagram

```text
Array:   [ 10   20   30   40 ]
Scalar:             5
Operation:
  10 + 5 = 15
  20 + 5 = 25
  30 + 5 = 35
  40 + 5 = 45
Result:  [ 15   25   35   45 ]
```

---

## 23. Element-wise Operations with Student Marks

```python
marks = np.array([60, 70, 80, 90])
updated = marks + 5
print(updated)  # [65 75 85 95]
```

---

## 24. Mark Calculations Table

| Operation | Code | Output |
|---|---|---|
| **Bonus** | `marks + 5` | `[65 75 85 95]` |
| **Penalty** | `marks - 2` | `[58 68 78 88]` |
| **Double** | `marks * 2` | `[120 140 160 180]` |
| **Half** | `marks / 2` | `[30. 35. 40. 45.]` |

---

## 25. Array-to-Array Student Example (Variable Bonus)

When each student receives an individualized bonus:

```python
marks = np.array([60, 70, 80, 90])
bonus = np.array([5, 2, 3, 1])

final_marks = marks + bonus
print(final_marks)
```

**Output:**
```text
[65 72 83 91]
```

---

## 26. Real-World Example — Monthly Sales

```python
january = np.array([100, 200, 150])
february = np.array([120, 180, 170])

total_sales = january + february
print(total_sales)
```

**Output:**
```text
[220 380 320]
```

---

## 27. Real-World Example — Temperature Sensor Calibration

```python
temperature = np.array([28, 30, 31, 29])

# A sensor consistently reads 2 degrees too cold:
corrected = temperature + 2
print(corrected)
```

**Output:**
```text
[30 32 33 31]
```

---

## 28. Using Indexing with Arithmetic

You can combine element targeting with arithmetic to update a single specific item:

```python
marks = np.array([60, 70, 80, 90])
marks[2] = marks[2] + 5
print(marks)
```

**Output:**
```text
[60 70 85 90]
```

Only index 2 changed from 80 to 85.

---

## 29. Using Slicing with Arithmetic

Update a sub-range of items in-place:

```python
marks = np.array([60, 70, 80, 90])
marks[1:3] = marks[1:3] + 5
print(marks)
```

**Output:**
```text
[60 75 85 90]
```

Only indices 1 and 2 received the 5-point addition.

---

## 30. 2D Array Arithmetic

Arithmetic extends seamlessly to 2D matrices:

```python
import numpy as np

marks = np.array([
    [60, 70, 80],
    [75, 85, 90]
])

print(marks + 5)
```

**Output:**
```text
[[65 75 85]
 [80 90 95]]
```

---

## 31. 2D Array + 2D Array

```python
a = np.array([
    [10, 20],
    [30, 40]
])

b = np.array([
    [1, 2],
    [3, 4]
])

print(a + b)
```

**Output:**
```text
[[11 22]
 [33 44]]
```

---

## 32. Visualizing 2D Element-Wise Addition

```text
       A                    B                   Result
┌────┬────┐          ┌────┬────┐          ┌────┬────┐
│ 10 │ 20 │    +     │  1 │  2 │    =     │ 11 │ 22 │
├────┼────┤          ├────┼────┤          ├────┼────┤
│ 30 │ 40 │          │  3 │  4 │          │ 33 │ 44 │
└────┴────┘          └────┴────┘          └────┴────┘
```

---

## 33. The Basic Shape Rule

For direct element-by-element arithmetic between two arrays:

$$\text{Shape of Array A} == \text{Shape of Array B}$$

- If `a.shape == (3,)` and `b.shape == (3,)` $\rightarrow$ Valid!
- If `a.shape == (3,)` and `b.shape == (4,)` $\rightarrow$ Raises `ValueError`!

---

## 34. Example of Compatible Arrays

```python
a = np.array([10, 20, 30])
b = np.array([1, 2, 3])
print(a + b)  # Shapes match (3,), operates cleanly: [11 22 33]
```

---

## 35. Example of Incompatible Arrays

```python
a = np.array([10, 20, 30])
b = np.array([1, 2])
# print(a + b)
# Raises ValueError: operands could not be broadcast together with shapes (3,) (2,)
```

---

## 36. Division by Zero Handling

```python
numbers = np.array([10, 20, 30])
print(numbers / 0)
```

NumPy issues a `RuntimeWarning: divide by zero encountered in divide` and stores floating-point infinity `[inf inf inf]`, rather than crashing immediately like regular Python `10 / 0`. Always validate denominators before dividing.

---

## 37. Practical Program — Shopping Prices

```python
import numpy as np

prices = np.array([100, 200, 300])
discounted_prices = prices - 20

print("Original:", prices)
print("Discounted:", discounted_prices)
```

**Output:**
```text
Original: [100 200 300]
Discounted: [ 80 180 280]
```

---

## 38. Practical Program — Employee Salary Adjustment

```python
import numpy as np

salary = np.array([20000, 25000, 30000])
updated_salary = salary + 2000

print("Old Salary:", salary)
print("New Salary:", updated_salary)
```

**Output:**
```text
Old Salary: [20000 25000 30000]
New Salary: [22000 27000 32000]
```

---

## 39. Practical Program — Product Sales Revenue

```python
import numpy as np

price = np.array([100, 200, 50])
quantity = np.array([2, 3, 4])

total = price * quantity
print("Total:", total)
```

**Output:**
```text
Total: [200 600 200]
```

---

## 40. Practical Program — Temperature Unit Conversion

Convert Celsius to Fahrenheit using the formula:

$$F = \left(C \times \frac{9}{5}\right) + 32$$

```python
import numpy as np

celsius = np.array([0, 10, 20, 30])
fahrenheit = (celsius * 9 / 5) + 32
print(fahrenheit)
```

**Output:**
```text
[32. 50. 68. 86.]
```

---

## 41. Understanding the Formula Step-by-Step

For Celsius reading `10`:
$$\left(10 \times \frac{9}{5}\right) + 32 = 18 + 32 = 50$$

NumPy computes this algebraic equation across the entire array in a single vectorized step.

---

## 42. Practical Program — Sales Percentage Increase

Increase all sales figures by 10%:

```python
sales = np.array([100, 200, 300])
new_sales = sales * 1.10
print(new_sales)
```

**Output:**
```text
[110. 220. 330.]
```

---

## 43. Integer vs Float Results

- Integer arithmetic (`+ 5`, `- 5`, `* 2`) on integer arrays produces integer arrays.
- Division (`/ 5`) or floating-point multipliers (`* 1.10`) cast results to `float64`.

---

## 44. Combining Row Indexing and Arithmetic

```python
marks = np.array([
    [70, 80, 90],
    [60, 75, 85]
])

# Add 5 bonus marks only to Student 1 (Row 0):
marks[0] = marks[0] + 5
print(marks)
```

**Output:**
```text
[[75 85 95]
 [60 75 85]]
```

---

## 45. Combining Column Selection and Arithmetic

```python
# Add 5 bonus marks to English (Column 1) across all students:
marks[:, 1] = marks[:, 1] + 5
print(marks)
```

---

## 46. Arithmetic with Slices

```python
numbers = np.array([10, 20, 30, 40, 50])
result = numbers[1:4] * 2
print(result)  # Output: [40 60 80]
```

---

## 47. Common Beginner Mistakes

1. **List multiplication vs Array multiplication:**
   - `[10, 20] * 2` repeats elements: `[10, 20, 10, 20]`.
   - `np.array([10, 20]) * 2` multiplies numbers: `[20 40]`.

2. **Expecting matrix multiplication with `*`:**
   - `a * b` is element-wise product, NOT dot product or matrix multiplication.

3. **Mismatched shapes:**
   - Attempting `[1, 2, 3] + [4, 5]` triggers a `ValueError`.

4. **Missing parentheses in formulas:**
   - Writing `celsius * 9 / 5 + 32` is valid due to precedence, but `celsius * 9 / (5 + 32)` is mathematically incorrect.

5. **Row vs Column index confusion:**
   - `marks[1] += 5` modifies row 1. `marks[:, 1] += 5` modifies column 1.

---

## 48. Quick Student Workouts

1. `np.array([10, 20, 30]) + 5` $\rightarrow$ `[15 25 35]`
2. `np.array([10, 20, 30]) * 2` $\rightarrow$ `[20 40 60]`
3. `np.array([20, 40, 60]) / 2` $\rightarrow$ `[10. 20. 30.]`
4. `np.array([10, 20, 30]) + np.array([1, 2, 3])` $\rightarrow$ `[11 22 33]`
5. `np.array([10, 20, 30]) * np.array([2, 3, 4])` $\rightarrow$ `[20 60 120]`
6. `marks + 5` $\rightarrow$ 5 added to every mark.

---

## 49–52. 20-Minute Practice Section

### Practice 1 — Basic Scalar Arithmetic
```python
numbers = np.array([10, 20, 30, 40])
print(numbers + 5)   # [15 25 35 45]
print(numbers - 5)   # [ 5 15 25 35]
print(numbers * 2)   # [20 40 60 80]
print(numbers / 2)   # [ 5. 10. 15. 20.]
```

### Practice 2 — Student Bonus
```python
marks = np.array([65, 70, 80, 90, 75])
print(marks + 5)     # [70 75 85 95 80]
```

### Practice 3 — Array-to-Array Multiplication
```python
price = np.array([100, 200, 300])
quantity = np.array([2, 3, 4])
print(price * quantity)  # [200 600 1200]
```

### Practice 4 — Temperature Conversion
```python
celsius = np.array([0, 10, 20, 30])
print((celsius * 9 / 5) + 32)  # [32. 50. 68. 86.]
```

---

## 53. Main Moodle Practice: Daily Sales Calculator

- **Title:** Calculate Product Sales with NumPy  
- **Difficulty:** Beginner  
- **Marks:** 10 Marks  
- **Time:** 15–20 Minutes  

### Problem Statement

A shop records the price and quantity sold for five products.
Using NumPy arrays:
1. Calculate the total sales amount for each product:
   $$\text{total} = \text{prices} \times \text{quantities}$$
2. Calculate a 10% discount on every product's total sales amount:
   $$\text{discount} = \text{total} \times 0.10$$
3. Calculate the final payable amount after discount:
   $$\text{final\_amount} = \text{total} - \text{discount}$$

---

## 54–56. Given Data, Formulas & Output

### Given Arrays:
```python
prices = np.array([100, 200, 150, 80, 300])
quantities = np.array([2, 3, 4, 5, 2])
```

### Required Output:
```text
Prices:
[100 200 150  80 300]

Quantities:
[2 3 4 5 2]

Total Sales:
[200 600 600 400 600]

Discount:
[20. 60. 60. 40. 60.]

Final Amount:
[180. 540. 540. 360. 540.]
```

---

## 57–59. Test Cases

### Test Case 1 (Standard Store Inventory)
Input:
```text
100 200 150 80 300 2 3 4 5 2
```
Expected Output:
```text
Prices:
[100 200 150  80 300]
Quantities:
[2 3 4 5 2]
Total Sales:
[200 600 600 400 600]
Discount:
[20. 60. 60. 40. 60.]
Final Amount:
[180. 540. 540. 360. 540.]
```

### Test Case 2 (Retail Outlet)
Input:
```text
50 100 200 2 5 3
```
Expected Output:
```text
Prices:
[ 50 100 200]
Quantities:
[2 5 3]
Total Sales:
[100 500 600]
Discount:
[10. 50. 60.]
Final Amount:
[ 90. 450. 540.]
```

### Test Case 3 (Wholesale Bulk)
Input:
```text
1000 500 250 1 2 4
```
Expected Output:
```text
Prices:
[1000  500  250]
Quantities:
[1 2 4]
Total Sales:
[1000 1000 1000]
Discount:
[100. 100. 100.]
Final Amount:
[900. 900. 900.]
```

---

## 60. Requirements

- Use `import numpy as np`
- Use vectorized array multiplication, scalar multiplication, and array subtraction
- **No loops** allowed for the calculations!

---

## 61. Beginner Hints

- **Hint 1:** Create `prices = np.array(...)` and `quantities = np.array(...)`.
- **Hint 2:** Compute total sales using `prices * quantities`.
- **Hint 3:** 10 percent is scalar `0.10`: `total * 0.10`.
- **Hint 4:** Subtract directly: `total - discount`.

---

## 62. Moodle AI Agent Instruction

```text
You are a beginner-friendly NumPy learning assistant helping a student solve the "Daily Sales Calculator" exercise.

Do NOT immediately provide the complete solution.

Teaching strategy:
1. Ask the student what "price * quantity" means for five products.
2. Guide them toward: prices * quantities without a loop.
3. Help them calculate discount: total * 0.10.
4. Help them calculate: total - discount.
5. Remind them that identical shapes allow position-by-position arithmetic.
6. Give one hint at a time.
```

---

## 63–70. Moodle IDE Concept for Day 4

Interactive workspace layout:
- **Left:** Python Code Editor.
- **Right:** Visual Array Math Grid (`prices` $\times$ `quantities` $\rightarrow$ `total`).
- **Operation Visualizer:** `100 * 2 = 200`, `200 * 3 = 600`, etc.
- **Shape Check Badge:** `prices.shape (5,) == quantities.shape (5,)` $\rightarrow$ Ready!

---

## 72. Practical Classroom Activity: Which Operation?

| Situation | Operation |
|---|---|
| Add ₹5 to every price | `prices + 5` |
| Reduce every price by ₹10 | `prices - 10` |
| Double every quantity | `quantity * 2` |
| Split every amount into 2 parts | `amount / 2` |
| Price $\times$ quantity | `price * quantity` |
| January + February sales | `january + february` |

---

## 74. Day 4 Cheat Sheet

```python
import numpy as np

# Scalar Arithmetic (Applies to all elements)
arr + 5     # Add scalar
arr - 5     # Subtract scalar
arr * 2     # Multiply by scalar
arr / 2     # Divide by scalar

# Array-to-Array Arithmetic (Position by position)
a + b       # Element-wise addition
a - b       # Element-wise subtraction
a * b       # Element-wise multiplication
a / b       # Element-wise division
```

---

## 75–77. Memory Tricks

- **Trick 1:** *Element-wise:* Match index to index: `a[i] op b[i]`.
- **Trick 2:** *Scalar:* One number touches every element equally.
- **Trick 3:** *Array vs Array:* Shapes must align.

---

## 78–80. Integrated Workflow: Day 3 (Selection) + Day 4 (Math)

```python
marks = np.array([
    [80, 75, 90],
    [70, 85, 88],
    [92, 78, 95]
])

# Step 1: Select Science column (Col 2) using Day 3 skills:
science = marks[:, 2]  # [90 88 95]

# Step 2: Apply +5 bonus using Day 4 skills:
updated_science = science + 5  # [95 93 100]
```

---

## 81–85. Final Challenge — Student Marks Bonus Calculator

Given marks for 4 students across 3 subjects:

```python
marks = np.array([
    [70, 80, 90],
    [65, 75, 85],
    [90, 85, 95],
    [60, 70, 80]
])
```

Columns: `0 → Maths`, `1 → English`, `2 → Science`.

### Tasks:
1. Add 5 bonus marks to every single score.
2. Select the Science column and add another 10 marks only to Science.
3. Display both results.

### Expected Output:
```text
Updated Marks:
[[75 85 95]
 [70 80 90]
 [95 90 100]
 [65 75 85]]

Final Science:
[105 100 110  95]
```

---

## 93. Unit-V Progression

```text
Day 1: NumPy Introduction & Array Creation
       ↓
Day 2: Array Shapes, Dimensions & Reshaping
       ↓
Day 3: Indexing, Slicing & Coordinate Selection
       ↓
Day 4: Mathematical Operations & Element-Wise Arithmetic
       ↓
Day 5: Aggregations, Statistics & Reductions (mean, sum, min, max)
```

---

## 94. Day 4 Concept Map

```text
                     NUMPY ARRAY
                          │
               ┌──────────┴──────────┐
               ↓                     ↓
            Scalar                Array
               │                     │
          [10,20,30]             [1,2,3]
               │                     │
               └──────────┬──────────┘
                          ↓
                    Arithmetic
                          │
             ┌────────────┼────────────┐
             ↓            ↓            ↓
          Addition    Subtraction  Multiplication
             │            │            │
             └────────────┼────────────┘
                          ↓
                       Division
                          ↓
                  Element-wise Result
```

---

## 95. Final Key Message for Students

> **NumPy arrays make numerical calculations simple and lightning-fast because arithmetic operations can be applied directly to every element without loops.**
>
> Always remember:
> 1. `array + number` $\rightarrow$ Broadcasts to every element.
> 2. `array1 * array2` $\rightarrow$ Multiplies corresponding elements at matching positions.
> 3. Keep array shapes identical for direct element-wise interactions.

