# Unit–V — Day 5: Advanced NumPy Arithmetic and Mathematical Functions

**Duration:** 90 Minutes  
**Teaching Focus:** 45 Minutes Concept Teaching + 20 Minutes Practice + 25 Minutes Review, Quiz and Problem Solving  
**Level:** Beginner → Beginner-Intermediate  
**Unit:** Unit–V — NumPy  
**Day:** 5 (Day 53 of 65)  

---

## 1. Learning Objectives

By the end of this session, students should be able to:

1. **Use** NumPy mathematical functions directly on 1D and 2D arrays without loops.
2. **Distinguish** between arithmetic operators (`+`, `-`, `*`, `/`) and NumPy mathematical functions.
3. **Use** `np.sqrt()` to calculate square roots across array elements.
4. **Use** `np.square()` to compute the square of each array value.
5. **Use** `np.abs()` to compute absolute values and measure variance magnitude without negative signs.
6. **Use** `np.power()` to raise array values to arbitrary exponents.
7. **Use** `np.round()`, `np.floor()`, and `np.ceil()` to handle decimal rounding with mathematical precision.
8. **Use** `np.sum()` and `np.mean()` to compute aggregate totals and central tendencies.
9. **Combine** arithmetic operators and mathematical functions into clear, multi-step numerical expressions.
10. **Apply** standard numerical formulas (Euclidean distance, temperature conversion, gradebook curves).
11. **Solve** real-world data analysis problems involving student performance, retail sales, and measurement errors.
12. **Apply** defensive parenthesization to ensure correct operator precedence in scientific pipelines.

---

## 2. 90-Minute Session Plan

| Time Window | Topic | Pedagogical Activity & Focus |
|---|---|---|
| **0–5 min** | **Day 4 Recap** | Review element-wise arithmetic (`+`, `-`, `*`, `/`) and scalar broadcasting. |
| **5–15 min** | **Advanced Arithmetic** | Combining multiple operations and order of operations. |
| **15–25 min** | **sqrt(), square(), power()** | Unary mathematical transforms on numerical arrays. |
| **25–35 min** | **abs(), round(), floor(), ceil()** | Sign removal, rounding policies, and decimal precision. |
| **35–45 min** | **sum() and mean()** | Array reduction, aggregation totals, and central tendency. |
| **45–52 min** | **Guided Example** | Student gradebook analysis: bonus scores, averages, and deviations. |
| **52–65 min** | **Hands-on Practice** | 5 small numerical programs (powers, distances, temperature, sales). |
| **65–73 min** | **Combined Operations** | Multi-step mathematical pipelines (Euclidean distance $\sqrt{x^2 + y^2}$). |
| **73–80 min** | **Problem Solving** | Error analysis and sensor variance modeling. |
| **80–85 min** | **Moodle Practice Lab** | Independent coding: *Student Performance Analyzer*. |
| **85–90 min** | **Quiz & Reflection** | 10-question knowledge check, cheat sheet recap, and concept map. |

---

## 3. Quick Recap from Day 4

Yesterday in Day 4, we learned that NumPy allows us to perform arithmetic directly on arrays without writing slow `for` loops.

### Scalar Operations (Broadcasting a single number across every element):
```python
import numpy as np

numbers = np.array([10, 20, 30])

print(numbers + 5)  # [15 25 35]
print(numbers - 5)  # [ 5 15 25]
print(numbers * 2)  # [20 40 60]
print(numbers / 2)  # [ 5. 10. 15.]
```

### Element-Wise Array-to-Array Operations (Pairing corresponding positions):
```python
a = np.array([10, 20, 30])
b = np.array([1, 2, 3])

print(a + b)  # [11 22 33]
print(a * b)  # [10 40 90]
```

### Today's Progression:
What if our real-world problems require more than basic addition or multiplication?
- What if we need square roots, powers, absolute values, or rounding?
- What if we need to calculate total revenue, cohort averages, or geometric distances?

Today, we master **NumPy Mathematical Functions** and learn how to chain them into powerful analytical pipelines.

---

## 4. Why Do We Need Mathematical Functions?

Suppose we have an array of square plots with known surface areas, and we need the side length of each plot:

```python
areas = np.array([4, 9, 16, 25])
```

In pure Python, computing the square root requires importing the `math` module and running a loop or list comprehension:
```python
import math

# Pure Python approach (slow and verbose):
sides = [math.sqrt(x) for x in areas]
```

With NumPy, we simply write:
```python
import numpy as np

areas = np.array([4, 9, 16, 25])
sides = np.sqrt(areas)
print(sides)
```

**Output:**
```text
[2. 3. 4. 5.]
```

### Key Pedagogical Insight:
> **NumPy mathematical functions are vectorized.** When you pass an entire array into `np.sqrt()`, NumPy executes compiled C-level loops underneath, computing the result for thousands or millions of elements in parallel.

---

## 5. Mathematical Functions in NumPy

A NumPy mathematical function accepts an array as input and applies the mathematical rule to every single item.

```text
               ┌───────────────────────┐
               │      NumPy Array      │
               │    [4, 9, 16, 25]     │
               └───────────┬───────────┘
                           │
                           ▼
               ┌───────────────────────┐
               │ Mathematical Function │
               │      np.sqrt()        │
               └───────────┬───────────┘
                           │
                           ▼
               ┌───────────────────────┐
               │     Result Array      │
               │   [2.0, 3.0, 4.0, 5.0]│
               └───────────────────────┘
```

Core mathematical functions covered today:
- **`np.sqrt()`** — Square root
- **`np.square()`** — Square ($x^2$)
- **`np.power()`** — Exponentiation ($x^n$)
- **`np.abs()`** — Absolute value ($|x|$)
- **`np.round()`** — Round to nearest decimal
- **`np.floor()`** — Round downward to nearest integer
- **`np.ceil()`** — Round upward to nearest integer
- **`np.sum()`** — Total sum of elements
- **`np.mean()`** — Arithmetic mean (average)

---

## 6. `np.sqrt()` — Square Root

The square root of a number $x$ is a value $y$ such that $y \times y = x$.
- $\sqrt{4} = 2.0$
- $\sqrt{9} = 3.0$
- $\sqrt{16} = 4.0$
- $\sqrt{25} = 5.0$

```python
import numpy as np

numbers = np.array([4, 9, 16, 25])
roots = np.sqrt(numbers)

print("Original:", numbers)
print("Square Roots:", roots)
print("Data Type:", roots.dtype)
```

**Output:**
```text
Original: [ 4  9 16 25]
Square Roots: [2. 3. 4. 5.]
Data Type: float64
```

> [!NOTE]
> `np.sqrt()` returns floating-point numbers (`float64`) because roots of arbitrary numbers are generally non-integers (e.g., $\sqrt{2} \approx 1.4142$).

---

## 7. Real-World Example — Square Root for Land Geometry

An architect measures the areas of four square courtyards in square meters:

```python
import numpy as np

courtyard_areas = np.array([36, 64, 100, 144])

# Side length = sqrt(area)
perimeter = 4 * np.sqrt(courtyard_areas)

print("Courtyard Areas (sq m):", courtyard_areas)
print("Side Lengths (m):      ", np.sqrt(courtyard_areas))
print("Fence Needed (m):      ", perimeter)
```

**Output:**
```text
Courtyard Areas (sq m): [ 36  64 100 144]
Side Lengths (m):       [ 6.  8. 10. 12.]
Fence Needed (m):       [24. 32. 40. 48.]
```

---

## 8. `np.square()` — Squaring Values

`np.square()` computes the square of each element ($x^2 = x \times x$).

```python
import numpy as np

numbers = np.array([2, 3, 4, 5])
squared = np.square(numbers)

print("Numbers:", numbers)
print("Squared:", squared)
```

**Output:**
```text
Numbers: [2 3 4 5]
Squared: [ 4  9 16 25]
```

Mathematical breakdown:
- $2^2 = 4$
- $3^2 = 9$
- $4^2 = 16$
- $5^2 = 25$

---

## 9. `np.power()` — Raising Values to Any Exponent

While `np.square()` specifically calculates the 2nd power, `np.power()` raises array values to any arbitrary exponent $n$.

```python
import numpy as np

numbers = np.array([2, 3, 4])

# Cube every value (power of 3)
cubed = np.power(numbers, 3)

print("Numbers:", numbers)
print("Cubed:  ", cubed)
```

**Output:**
```text
Numbers: [2 3 4]
Cubed:   [ 8 27 64]
```

Mathematical breakdown:
- $2^3 = 2 \times 2 \times 2 = 8$
- $3^3 = 3 \times 3 \times 3 = 27$
- $4^3 = 4 \times 4 \times 4 = 64$

You can also pass an array of exponents to apply different powers to each position:
```python
bases = np.array([2, 3, 4])
exponents = np.array([1, 2, 3])

print(np.power(bases, exponents))  # [ 2  9 64]
```

---

## 10. `np.square()` vs `np.power()`

| Feature | `np.square(arr)` | `np.power(arr, n)` |
|---|---|---|
| **Exponent** | Fixed to 2 | Any integer or float $n$ |
| **Arguments** | 1 argument (`arr`) | 2 arguments (`arr, exponent`) |
| **Best Used For** | Fast, clear squaring ($x^2$) | General powers ($x^3, x^4, x^{0.5}$) |
| **Equivalence** | `np.square(arr)` | `np.power(arr, 2)` or `arr ** 2` |

> [!TIP]
> Use `np.square(x)` when specifically computing squares. It is self-documenting, concise, and avoids magic exponent constants.

---

## 11. `np.abs()` — Absolute Value

The absolute value $|x|$ removes any negative sign, measuring the magnitude or distance of a value from zero.
- $|-5| = 5$
- $|-10| = 10$
- $|7| = 7$
- $|0| = 0$

```python
import numpy as np

temperatures = np.array([-5, -10, 7, 12, 0])
magnitudes = np.abs(temperatures)

print("Original:", temperatures)
print("Absolute:", magnitudes)
```

**Output:**
```text
Original: [-5 -10   7  12   0]
Absolute: [ 5 10  7 12  0]
```

---

## 12. Real-World Example — Variance and Difference from Target

A manufacturing plant produces steel rods with a target length of 30 cm. Quality control measures four rods:

```python
import numpy as np

target = 30
measured = np.array([28, 33, 27, 31])

# Raw difference can be positive or negative:
raw_diff = measured - target
# Absolute error measures physical tolerance deviation:
error_tolerance = np.abs(raw_diff)

print("Target:        ", target)
print("Measured:      ", measured)
print("Raw Diff:      ", raw_diff)
print("Absolute Error:", error_tolerance)
```

**Output:**
```text
Target:         30
Measured:       [28 33 27 31]
Raw Diff:       [-2  3 -3  1]
Absolute Error: [2 3 3 1]
```

Quality inspectors do not care if a rod is 3 cm too short or 3 cm too long—both are defects of size 3 cm! `np.abs()` provides the exact error magnitude.

---

## 13. `np.round()` — Rounding Decimal Numbers

`np.round()` rounds floating-point numbers to the nearest integer or specified decimal places.

```python
import numpy as np

readings = np.array([1.234, 2.567, 3.891])

# Round to nearest integer:
print("Nearest Integer:", np.round(readings))

# Round to 2 decimal places:
print("2 Decimal Places:", np.round(readings, 2))
```

**Output:**
```text
Nearest Integer:  [1. 3. 4.]
2 Decimal Places: [1.23 2.57 3.89]
```

---

## 14. Why `round()` is Useful

When computing financial transactions, percentages, or grade averages, floating-point arithmetic produces long decimal tails:

```python
import numpy as np

percentages = np.array([78.4567, 82.3456, 91.9876])
clean_report = np.round(percentages, 2)

print("Display Report:", clean_report)
```

**Output:**
```text
Display Report: [78.46 82.35 91.99]
```

---

## 15. `np.floor()` — Rounding Downward

`np.floor()` rounds every decimal value **downward** to the nearest integer:
- $2.2 \rightarrow 2.0$
- $3.8 \rightarrow 3.0$
- $5.9 \rightarrow 5.0$
- $-1.2 \rightarrow -2.0$ (downward on the number line!)

```python
import numpy as np

values = np.array([2.2, 3.8, 5.9, -1.2])
print("Floor:", np.floor(values))
```

**Output:**
```text
Floor: [ 2.  3.  5. -2.]
```

---

## 16. `np.ceil()` — Rounding Upward

`np.ceil()` (ceiling) rounds every decimal value **upward** to the nearest integer:
- $2.2 \rightarrow 3.0$
- $3.8 \rightarrow 4.0$
- $5.1 \rightarrow 6.0$
- $-1.8 \rightarrow -1.0$ (upward on the number line!)

```python
import numpy as np

values = np.array([2.2, 3.8, 5.1, -1.8])
print("Ceil:", np.ceil(values))
```

**Output:**
```text
Ceil: [ 3.  4.  6. -1.]
```

---

## 17. Comparison: `floor()` vs `ceil()` vs `round()`

| Value | `np.floor()` (Down) | `np.ceil()` (Up) | `np.round()` (Nearest) |
|---|---|---|---|
| **`3.2`** | `3.0` | `4.0` | `3.0` |
| **`3.6`** | `3.0` | `4.0` | `4.0` |
| **`3.5`** | `3.0` | `4.0` | `4.0` *(round to even)* |
| **`-2.3`**| `-3.0` | `-2.0` | `-2.0` |
| **`-2.7`**| `-3.0` | `-2.0` | `-3.0` |

### Visual Number Line:
```text
           floor(3.2) = 3.0        round(3.2) = 3.0
                  │                      │
       ◄───[3.0]──┴────────(3.2)─────────┴─────────[4.0]───►
                                                      ▲
                                                      │
                                                 ceil(3.2) = 4.0
```

---

## 18. `np.sum()` — Total Sum of Elements

`np.sum()` reduces all elements in an array by adding them together into a single scalar value.

```python
import numpy as np

scores = np.array([10, 20, 30, 40])
total = np.sum(scores)

print("Array:", scores)
print("Total Sum:", total)
```

**Output:**
```text
Array: [10 20 30 40]
Total Sum: 100
```

---

## 19. Real-World Example — Student Total Marks

```python
import numpy as np

# Marks in 4 subjects: Physics, Chemistry, Maths, Biology
marks = np.array([80, 75, 90, 85])
total_marks = np.sum(marks)

print("Subject Marks:", marks)
print("Grand Total:  ", total_marks)  # 80 + 75 + 90 + 85 = 330
```

**Output:**
```text
Subject Marks: [80 75 90 85]
Grand Total:   330
```

---

## 20. `np.mean()` — Arithmetic Average

`np.mean()` calculates the central tendency by dividing the sum of all elements by the number of elements:
$$\text{mean} = \frac{\sum_{i=1}^N x_i}{N}$$

```python
import numpy as np

scores = np.array([10, 20, 30, 40])
average = np.mean(scores)

print("Average:", average)  # 100 / 4 = 25.0
```

**Output:**
```text
Average: 25.0
```

---

## 21. Real-World Example — Student Average Score

```python
import numpy as np

marks = np.array([80, 75, 90, 85])
average = np.mean(marks)

print("Student Marks:", marks)
print(f"Final Average: {average:.2f}")
```

**Output:**
```text
Student Marks: [80 75 90 85]
Final Average: 82.50
```

---

## 22. `np.sum()` vs `np.mean()`

| Function | Operation Performed | Mathematical Meaning | Example on `[70, 80, 90]` |
|---|---|---|---|
| **`np.sum(arr)`** | $70 + 80 + 90$ | Total accumulation | `240` |
| **`np.mean(arr)`** | $\frac{70 + 80 + 90}{3}$ | Central average | `80.0` |

---

## 23. Combining NumPy Operations

The true power of NumPy emerges when we chain operators (`+`, `-`, `*`, `/`) with mathematical functions (`sqrt`, `square`, `abs`, `round`, `mean`).

### Example 1: Function + Scalar Addition
```python
import numpy as np

numbers = np.array([4, 9, 16])
result = np.sqrt(numbers) + 2

print(result)
```

**Output:**
```text
[4. 5. 6.]
```

Step-by-step breakdown:
1. `np.sqrt([4, 9, 16])` $\rightarrow$ `[2., 3., 4.]`
2. `[2., 3., 4.] + 2` $\rightarrow$ `[4., 5., 6.]`

---

## 24. Combining `square()` and Addition

```python
import numpy as np

numbers = np.array([1, 2, 3])
result = np.square(numbers) + 5

print(result)
```

**Output:**
```text
[ 6  9 14]
```

Step-by-step breakdown:
- $1^2 + 5 = 1 + 5 = 6$
- $2^2 + 5 = 4 + 5 = 9$
- $3^2 + 5 = 9 + 5 = 14$

---

## 25. Combining Power and Subtraction

```python
import numpy as np

numbers = np.array([2, 3, 4])
result = np.power(numbers, 2) - 1

print(result)
```

**Output:**
```text
[ 3  8 15]
```

Step-by-step breakdown:
- $2^2 - 1 = 4 - 1 = 3$
- $3^2 - 1 = 9 - 1 = 8$
- $4^2 - 1 = 16 - 1 = 15$

---

## 26. Combining Absolute Value and Addition

```python
import numpy as np

offsets = np.array([-5, 10, -15])
result = np.abs(offsets) + 2

print(result)
```

**Output:**
```text
[ 7 12 17]
```

Step-by-step breakdown:
- $|-5| + 2 = 5 + 2 = 7$
- $|10| + 2 = 10 + 2 = 12$
- $|-15| + 2 = 15 + 2 = 17$

---

## 27. Combining Multiple Operations

Consider this composite expression:
```python
import numpy as np

numbers = np.array([2, 3, 4])
result = np.square(numbers) * 2 + 1

print(result)
```

**Output:**
```text
[ 9 19 33]
```

Calculation trace:
- Element 0: $2^2 \times 2 + 1 = 4 \times 2 + 1 = 8 + 1 = 9$
- Element 1: $3^2 \times 2 + 1 = 9 \times 2 + 1 = 18 + 1 = 19$
- Element 2: $4^2 \times 2 + 1 = 16 \times 2 + 1 = 32 + 1 = 33$

---

## 28. Why Parentheses Matter

Python evaluates expressions using standard operator precedence (BODMAS / PEMDAS):
1. Parentheses `(...)`
2. Exponentiation `**` / Function calls `np.square()`
3. Multiplication `*` and Division `/`
4. Addition `+` and Subtraction `-`

```python
# Unambiguous, defensive coding:
result = (np.square(numbers) * 2) + 1
```

> [!TIP]
> Always use parentheses when combining multiple array operations. Parentheses eliminate ambiguity for your teammates, professors, and future self.

---

## 29. Real-World Example — Celsius to Fahrenheit

The physical temperature formula is:
$$F = \left(C \times \frac{9}{5}\right) + 32$$

In NumPy:
```python
import numpy as np

celsius = np.array([0, 10, 20, 30])
fahrenheit = (celsius * 9 / 5) + 32

print("Celsius:   ", celsius)
print("Fahrenheit:", fahrenheit)
```

**Output:**
```text
Celsius:    [ 0 10 20 30]
Fahrenheit: [32. 50. 68. 86.]
```

Notice how clean this is: zero loops, zero index counters.

---

## 30. Real-World Example — Euclidean Distance Formula

The geometric distance of coordinate point $(x, y)$ from origin $(0, 0)$ is:
$$\text{distance} = \sqrt{x^2 + y^2}$$

Given multiple 2D points simultaneously:
```python
import numpy as np

x = np.array([3, 5, 6])
y = np.array([4, 12, 8])

distance = np.sqrt(np.square(x) + np.square(y))
print("Point Distances:", distance)
```

**Output:**
```text
Point Distances: [ 5. 13. 10.]
```

Step-by-step verification:
- Point 1: $\sqrt{3^2 + 4^2} = \sqrt{9 + 16} = \sqrt{25} = 5.0$
- Point 2: $\sqrt{5^2 + 12^2} = \sqrt{25 + 144} = \sqrt{169} = 13.0$
- Point 3: $\sqrt{6^2 + 8^2} = \sqrt{36 + 64} = \sqrt{100} = 10.0$

---

## 31. Real-World Example — Student Performance Summary

```python
import numpy as np

marks = np.array([80, 75, 90, 85, 70])

total = np.sum(marks)
average = np.mean(marks)

print("Scores: ", marks)
print("Total:  ", total)
print("Average:", average)
```

**Output:**
```text
Scores:  [80 75 90 85 70]
Total:   400
Average: 80.0
```

---

## 32. Add Bonus and Calculate Average

Combining Day 4 addition with Day 5 aggregation:

```python
import numpy as np

marks = np.array([80, 75, 90, 85, 70])

# Step 1: Add 5 bonus marks to every student
updated_marks = marks + 5

# Step 2: Calculate new class average
updated_avg = np.mean(updated_marks)

print("Updated Marks:", updated_marks)
print("New Average:  ", updated_avg)
```

**Output:**
```text
Updated Marks: [85 80 95 90 75]
New Average:   85.0
```

---

## 33. Rounding an Average

When averages contain recurring decimals:

```python
import numpy as np

marks = np.array([81, 76, 88])
raw_average = np.mean(marks)  # 245 / 3 = 81.66666666666667

rounded_average = np.round(raw_average, 2)
print("Formatted Average:", rounded_average)
```

**Output:**
```text
Formatted Average: 81.67
```

---

## 34. Using `np.abs()` in Model Error Analysis

In machine learning and statistics, Mean Absolute Error (MAE) measures model accuracy:

```python
import numpy as np

actual_sales = np.array([95, 220, 285])
predicted_sales = np.array([100, 200, 300])

# Raw difference:
diff = actual_sales - predicted_sales
print("Raw Errors:     ", diff)

# Absolute error:
abs_error = np.abs(diff)
print("Absolute Errors:", abs_error)
print("Mean Abs Error: ", np.mean(abs_error))
```

**Output:**
```text
Raw Errors:      [ -5  20 -15]
Absolute Errors: [ 5 20 15]
Mean Abs Error:  13.333333333333334
```

---

## 35. Using `np.power()` in Geometric Growth

```python
import numpy as np

bacteria_colonies = np.array([2, 3, 4])

# Measure 5 generations of growth (power of 5):
growth = np.power(bacteria_colonies, 5)

print("Initial Counts:", bacteria_colonies)
print("Gen 5 Growth:  ", growth)
```

**Output:**
```text
Initial Counts: [2 3 4]
Gen 5 Growth:   [  32  243 1024]
```

---

## 36. Mathematical Function Summary

| Function | Operation | Typical Use Case | Example |
|---|---|---|---|
| **`np.sqrt(a)`** | $\sqrt{a_i}$ | Dimensions, distance, standard deviation | `np.sqrt([4, 9])` $\rightarrow$ `[2., 3.]` |
| **`np.square(a)`** | $a_i^2$ | Areas, variance, power formulas | `np.square([2, 3])` $\rightarrow$ `[4, 9]` |
| **`np.power(a, n)`**| $a_i^n$ | Cubes, exponential modeling | `np.power([2, 3], 3)` $\rightarrow$ `[8, 27]` |
| **`np.abs(a)`** | $\|a_i\|$ | Error magnitudes, distances, tolerances | `np.abs([-5, 5])` $\rightarrow$ `[5, 5]` |
| **`np.round(a, d)`**| Round to $d$ digits | Report formatting, currency display | `np.round([1.236], 2)` $\rightarrow$ `[1.24]` |
| **`np.floor(a)`** | Round down | Discrete binning, integer steps | `np.floor([3.8])` $\rightarrow$ `[3.]` |
| **`np.ceil(a)`** | Round up | Allocation batches, shipping boxes | `np.ceil([3.2])` $\rightarrow$ `[4.]` |
| **`np.sum(a)`** | $\sum a_i$ | Grand totals, sales volume | `np.sum([10, 20])` $\rightarrow$ `30` |
| **`np.mean(a)`** | $\frac{\sum a_i}{N}$ | Performance metrics, class benchmarks | `np.mean([10, 20])` $\rightarrow$ `15.0` |

---

## 37. Operator vs Function: The Fundamental Difference

Students must cleanly distinguish between operators and functions:

| Characteristic | Operator (`+`, `-`, `*`, `/`) | NumPy Function (`np.sqrt`, `np.sum`) |
|---|---|---|
| **Syntax** | Infix: `a + b`, `a * 2` | Prefix: `np.func(a)` |
| **Purpose** | Elementary arithmetic | Advanced mathematical or aggregation rules |
| **Dimensions** | Operates element-by-element | Can be element-wise (`sqrt`) or reduction (`sum`, `mean`) |

---

## 38. From Simple to Combined Operations

```text
Simple:
np.sqrt(numbers)
└─ Single function call

Combined:
np.sqrt(numbers) + 5
└─ Function call + Scalar addition

Advanced Pipeline:
np.sqrt(np.square(x) + np.square(y))
└─ Square x, Square y, Add arrays element-wise, Take square root
```

---

## 39. Practical Program 1 — Convert and Round

```python
import numpy as np

celsius = np.array([10, 20, 25, 30])
fahrenheit = (celsius * 9 / 5) + 32
rounded_fahrenheit = np.round(fahrenheit, 2)

print("Celsius:            ", celsius)
print("Rounded Fahrenheit: ", rounded_fahrenheit)
```

**Output:**
```text
Celsius:             [10 20 25 30]
Rounded Fahrenheit:  [50. 68. 77. 86.]
```

---

## 40. Practical Program 2 — Distance Between Points

```python
import numpy as np

# Coordinates of 3 landmarks: (3, 4), (5, 12), (6, 8)
x = np.array([3, 5, 6])
y = np.array([4, 12, 8])

distances = np.sqrt(np.square(x) + np.square(y))
print("Distances from Origin:", distances)
```

**Output:**
```text
Distances from Origin: [ 5. 13. 10.]
```

---

## 41. Practical Program 3 — Sales Performance Analysis

```python
import numpy as np

sales = np.array([100, 200, 150, 300, 250])

total_sales = np.sum(sales)
average_sales = np.mean(sales)

print("Daily Sales:  ", sales)
print("Total Sales:  ", total_sales)
print("Average Sales:", average_sales)
```

**Output:**
```text
Daily Sales:   [100 200 150 300 250]
Total Sales:   1000
Average Sales: 200.0
```

---

## 42. Practical Program 4 — Error Analysis

```python
import numpy as np

expected = np.array([50, 60, 70])
actual = np.array([48, 64, 68])

error = np.abs(actual - expected)

print("Error Magnitudes:", error)
print("Total Error:     ", np.sum(error))
print("Average Error:   ", np.mean(error))
```

**Output:**
```text
Error Magnitudes: [2 4 2]
Total Error:      8
Average Error:    2.6666666666666665
```

---

## 43. The 6-Step Problem-Solving Method

When faced with any numerical computing problem in NumPy, follow this structured mental framework:

```text
Step 1: Identify the Raw Data
        │
        ▼
Step 2: Create the NumPy Array(s)
        │
        ▼
Step 3: State the Mathematical Formula
        │
        ▼
Step 4: Select Matching NumPy Functions / Operators
        │
        ▼
Step 5: Combine Operations Using Explicit Parentheses
        │
        ▼
Step 6: Display & Inspect the Results
```

---

## 44. Walkthrough of the Method: Euclidean Distance

- **Step 1 (Data):** Coordinates $(x_i, y_i)$.
- **Step 2 (Arrays):** `x = np.array([3, 5, 6])`, `y = np.array([4, 12, 8])`.
- **Step 3 (Formula):** $d = \sqrt{x^2 + y^2}$.
- **Step 4 (NumPy Selection):** `np.square()` for squaring, `+` for element-wise addition, `np.sqrt()` for the outer root.
- **Step 5 (Combine):** `distance = np.sqrt(np.square(x) + np.square(y))`.
- **Step 6 (Display):** `print(distance)`.

---

## 45. Common Beginner Mistakes (Part 1)

### Mistake 1: Forgetting the `np.` Prefix
```python
# INCORRECT:
root = sqrt(numbers)  # NameError: name 'sqrt' is not defined

# CORRECT:
import numpy as np
root = np.sqrt(numbers)
```

### Mistake 2: Using `^` for Exponentiation
In Python, `^` is the bitwise XOR operator, **NOT** power!
```python
# INCORRECT (Bitwise XOR):
squared = numbers ^ 2  # Computes bitwise XOR!

# CORRECT:
squared = np.power(numbers, 2)
# OR:
squared = np.square(numbers)
```

### Mistake 3: Confusing `np.square()` with `np.sqrt()`
- `np.square(16)` $\rightarrow 256$ (Multiplies by itself: $16 \times 16$)
- `np.sqrt(16)` $\rightarrow 4.0$ (Finds root)

### Mistake 4: Omitting Defensive Parentheses
In complex formulas, lack of parentheses can produce subtle precedence errors:
```python
# CONFUSING:
res = np.square(x) * 2 + y / 2

# CLEAR & DEFENSIVE:
res = (np.square(x) * 2) + (y / 2)
```

---

## 46. Common Beginner Mistakes (Part 2)

### Mistake 5: Confusing Total and Average
- `np.sum(marks)` $\rightarrow$ Calculates **Grand Total** (scalar accumulation).
- `np.mean(marks)` $\rightarrow$ Calculates **Class Average** (total divided by count).

### Mistake 6: Rounding Intermediate Steps Too Early
Rounding at every intermediate calculation introduces compounding truncation errors:
```python
# POOR (Compounding roundoff errors):
step1 = np.round(a / b, 1)
step2 = np.round(step1 * 5.2, 1)

# BEST PRACTICE:
# Maintain full double-precision floating-point during calculations,
# and round only the final output for presentation!
final_result = np.round((a / b) * 5.2, 2)
```

---

## 47. Quick Student Workouts

Test your immediate recall with these 6 rapid-fire mental checks:

1. `np.sqrt(np.array([4, 9, 16]))`  
   **Answer:** `[2. 3. 4.]`
2. `np.square(np.array([2, 3, 4]))`  
   **Answer:** `[ 4  9 16]`
3. `np.abs(np.array([-10, 5, -2]))`  
   **Answer:** `[10  5  2]`
4. `np.power(np.array([2, 3]), 3)`  
   **Answer:** `[ 8 27]`
5. `np.sum(np.array([10, 20, 30]))`  
   **Answer:** `60`
6. `np.mean(np.array([10, 20, 30]))`  
   **Answer:** `20.0`

---

## 48–52. 20-Minute Guided Practice Drills

### Practice 1: Mathematical Functions
```python
import numpy as np

numbers = np.array([4, 9, 16, 25])
neg_numbers = np.array([-4, -9, -16, -25])

print("Square:    ", np.square(numbers))
print("Square Root:", np.sqrt(numbers))
print("Abs Value: ", np.abs(neg_numbers))
```

### Practice 2: Power Calculation
```python
import numpy as np

numbers = np.array([2, 3, 4, 5])
cubes = np.power(numbers, 3)

print("Cubes:", cubes)  # [  8  27  64 125]
```

### Practice 3: Sales Analysis
```python
import numpy as np

sales = np.array([100, 200, 300, 150, 250])
print("Total Sales:  ", np.sum(sales))    # 1000
print("Average Sales:", np.mean(sales))   # 200.0
```

### Practice 4: Temperature Conversion
```python
import numpy as np

celsius = np.array([0, 10, 20, 30])
fahrenheit = (celsius * 9 / 5) + 32
print("Fahrenheit:", fahrenheit)  # [32. 50. 68. 86.]
```

### Practice 5: 3D Distance Triples
```python
import numpy as np

x = np.array([3, 5, 8])
y = np.array([4, 12, 15])

hypotenuse = np.sqrt(np.square(x) + np.square(y))
print("Hypotenuse:", hypotenuse)  # [ 5. 13. 17.]
```

---

## 53–59. Main Practice Problem: Student Performance Analyzer

### Problem Statement
A school teacher records examination marks for five students:
```python
marks = np.array([72, 85, 91, 68, 79])
```

Write a complete, vectorized Python program to:
1. Store the marks in a NumPy array.
2. Add **5 bonus marks** to every student's score.
3. Calculate the **total** of the updated marks.
4. Calculate the **average** of the updated marks.
5. Calculate each student's **difference from the average** (`updated - average`).
6. Calculate the **absolute difference** using `np.abs()`.
7. Round the average to two decimal places.
8. Display all results in the exact prescribed format.

### Given Arrays:
```python
marks = np.array([72, 85, 91, 68, 79])
```

### Expected Output:
```text
Original Marks:
[72 85 91 68 79]
Updated Marks:
[77 90 96 73 84]
Total:
420
Average:
84.00
Difference from Average:
[ -7.   6.  12. -11.   0.]
Absolute Difference:
[ 7.  6. 12. 11.  0.]
```

---

## 55–57. Test Cases

### Test Case 1 (Standard Class Cohort)
Input:
```text
72 85 91 68 79
```
Expected Output:
```text
Original Marks:
[72 85 91 68 79]
Updated Marks:
[77 90 96 73 84]
Total:
420
Average:
84.00
Difference from Average:
[ -7.   6.  12. -11.   0.]
Absolute Difference:
[ 7.  6. 12. 11.  0.]
```

### Test Case 2 (Uniform Steps)
Input:
```text
50 60 70 80 90
```
Expected Output:
```text
Original Marks:
[50 60 70 80 90]
Updated Marks:
[55 65 75 85 95]
Total:
375
Average:
75.00
Difference from Average:
[-20. -10.   0.  10.  20.]
Absolute Difference:
[20. 10.  0. 10. 20.]
```

### Test Case 3 (Remedial Group)
Input:
```text
40 45 50 55 60
```
Expected Output:
```text
Original Marks:
[40 45 50 55 60]
Updated Marks:
[45 50 55 60 65]
Total:
275
Average:
55.00
Difference from Average:
[-10.  -5.   0.   5.  10.]
Absolute Difference:
[10.  5.  0.  5. 10.]
```

---

## 58. Requirements

- Use `import numpy as np`
- Use `np.array()` to load scores
- Use vectorized scalar addition `+ 5`
- Use `np.sum()`, `np.mean()`, and `np.abs()`
- **No loops** (`for` or `while`) allowed for calculations!

---

## 59. Beginner Hints

- **Hint 1:** Add 5 directly to the array: `updated = marks + 5`.
- **Hint 2:** Use `np.sum(updated)` to compute the class total.
- **Hint 3:** Use `np.mean(updated)` to compute the average.
- **Hint 4:** Subtract the scalar average from the updated array: `diff = updated - average`.
- **Hint 5:** Wrap the differences in `np.abs(diff)` to eliminate negative values.
- **Hint 6:** Format the printed average using `f"{average:.2f}"`.

---

## 60. Moodle AI Agent Instruction

```text
You are a beginner-friendly NumPy learning assistant helping a student solve the "Student Performance Analyzer" exercise.

Do NOT immediately provide the complete solution.

The student is learning:
- NumPy arrays
- element-wise arithmetic
- np.sum()
- np.mean()
- np.abs()
- np.round()
- combining NumPy operations

Teaching strategy:
1. Ask the student to identify the original marks array.
2. Guide them to add 5 to every mark: updated = marks + 5.
3. Ask how NumPy calculates the total: np.sum(updated).
4. Ask how to calculate the average: np.mean(updated).
5. Explain that `updated - average` calculates each student's deviation from the class benchmark.
6. Ask why some deviations are negative and guide them to np.abs().
7. Check the printed formatting: f"{average:.2f}".
8. Give one hint at a time.
```

---

## 61–68. Moodle IDE Concept for Day 5

Interactive workspace layout:
- **Left:** Python Code Editor.
- **Right:** Visual Array & Function Inspector:
  - Original Marks: `[72] [85] [91] [68] [79]`
  - Bonus Adder: `+ 5` $\rightarrow$ `[77] [90] [96] [73] [84]`
  - Total Sum Pill: `420`
  - Average Benchmark Pill: `84.0`
  - Difference Vector: `[-7, 6, 12, -11, 0]` $\xrightarrow{\text{np.abs()}}$ `[7, 6, 12, 11, 0]`

---

## 69. Practical Classroom Activity: Identify the Function

| Task | Correct NumPy Function |
|---|---|
| Find square root of all values | `np.sqrt()` |
| Square every value ($x^2$) | `np.square()` |
| Cube every value ($x^3$) | `np.power(arr, 3)` |
| Remove negative sign | `np.abs()` |
| Total of all values | `np.sum()` |
| Average of all values | `np.mean()` |
| Round to 2 decimal places | `np.round(arr, 2)` |
| Round downward to integer | `np.floor()` |
| Round upward to integer | `np.ceil()` |

---

## 72. Day 5 Cheat Sheet

```python
import numpy as np

# Mathematical Transforms
np.sqrt(a)          # Square root
np.square(a)        # Square (a * a)
np.power(a, n)      # Exponentiation (a ** n)
np.abs(a)           # Absolute value (|a|)

# Rounding & Truncation
np.round(a, decimals=2)  # Round to nearest
np.floor(a)              # Round down
np.ceil(a)               # Round up

# Aggregations & Reductions
np.sum(a)           # Total sum
np.mean(a)          # Arithmetic mean
```

---

## 73–74. Memory Tricks

- **`sqrt`** $\rightarrow$ *Root:* Reduces magnitude to base root.
- **`square`** $\rightarrow$ *Self-product:* Multiplies each number by itself.
- **`abs`** $\rightarrow$ *Absolute distance:* Strips negative signs.
- **`floor`** $\rightarrow$ *Ground:* Pulls down toward floor.
- **`ceil`** $\rightarrow$ *Ceiling:* Pushes up toward ceiling.
- **`sum`** $\rightarrow$ *Single total:* Accumulates whole array into one number.
- **`mean`** $\rightarrow$ *Average:* Sum divided by size.

---

## 77–80. Final Challenge — Student Statistics Analyzer

### Problem Statement:
A teacher records marks for 6 students:
```python
marks = np.array([65, 72, 88, 91, 76, 84])
```

Write a program that:
1. Displays the original marks.
2. Adds 5 bonus marks to every student.
3. Calculates the total of the updated marks.
4. Calculates the average of the updated marks.
5. Calculates the difference of every student's mark from the average.
6. Calculates the absolute difference using `np.abs()`.
7. Squares the updated marks using `np.square()`.
8. Displays all results.

### Expected Output:
```text
Original Marks:
[65 72 88 91 76 84]

Updated Marks:
[70 77 93 96 81 89]

Total:
506

Average:
84.33

Difference:
[-14.33333333  -7.33333333   8.66666667  11.66666667  -3.33333333   4.66666667]

Absolute Difference:
[14.33333333  7.33333333  8.66666667 11.66666667  3.33333333  4.66666667]

Squared Marks:
[4900 5929 8649 9216 6561 7921]
```

---

## 81. Final Key Message for Students

> **NumPy is much more than an array storage structure—it is a comprehensive scientific calculation engine.**
>
> When tackling data challenges:
> 1. Understand the mathematical formula first.
> 2. Select the matching vectorized NumPy functions (`sqrt`, `square`, `power`, `abs`, `round`, `sum`, `mean`).
> 3. Combine them with standard arithmetic operators using explicit parentheses.
> 4. Avoid writing manual loops!
