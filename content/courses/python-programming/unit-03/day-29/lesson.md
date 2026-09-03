# Unit–III — Day 6: Tuples as Return Values & Multiple-Value Functions

**Duration:** 90 Minutes  
**Level:** Beginner  
**Unit:** Unit–III — Data Types, Functions & Control Flow  
**Day:** 6  
**Topics:** Tuples as Return Values; Using Tuples with Functions; Multiple-Value Return; Illustrative Programs  

---

## 1. Day 6 Learning Objectives

By the end of this session, students should be able to:
- Understand how a Python function returns multiple values packaged as a tuple.
- Understand why tuples are the idiomatic mechanism for returning multiple results.
- Return two or more values from a single function call.
- Store a returned tuple in a single variable or unpack it immediately.
- Unpack returned tuples cleanly into distinct variables (`a, b = func()`).
- Pass tuples as function arguments (both as packed containers and unpacked arguments).
- Combine tuples with conditionals (`if`), loops, and mathematical aggregations.
- Design modular, multi-output analytical functions.
- Solve beginner-level real-world data processing challenges.

---

## 2. 90-Minute Session Plan

| Time | Topic | Activity |
| --- | --- | --- |
| 0–5 min | Day 5 recap | Tuple basics and unpacking review |
| 5–18 min | Function return values | Single vs multi-value return mechanics |
| 18–30 min | Returning tuples | First multiple-value function |
| 30–42 min | Tuple unpacking | Extracting returned values into variables |
| 42–52 min | Multiple-value return patterns | Real-world practical use cases |
| 52–63 min | Tuples as function arguments | Passing tuples between functions |
| 63–73 min | Illustrative programs | Employee salary, bill generation, statistics |
| 73–80 min | Problem-solving patterns | Designing multi-result pipelines |
| 80–87 min | Moodle practice | Student Result Summary problem |
| 87–90 min | Quiz | Knowledge check |

---

## 3. Quick Recap from Day 5

In Day 5, we mastered tuples:
- **Definition:** `student = ("Arun", 20, 85)`
- **Indexing:** `student[0]` $\rightarrow$ `"Arun"`
- **Unpacking:** `name, age, mark = student`
- **Multiple Assignment:** `a, b = 10, 20`
- **Clean Variable Swapping:** `a, b = b, a`

Today, we connect this power directly to **functions**.

---

## 4. Review: How `return` Works

A function sends computed data back to the calling code via the `return` statement:

```python
def add(a, b):
    return a + b

result = add(10, 20)
print(result)  # Output: 30
```

```text
Arguments (10, 20)
       ↓
   add(a, b)
       ↓
Computation (10 + 20 = 30)
       ↓
    return
       ↓
Variable: result (30)
```

> **The Central Question:**  
> *Can a Python function return more than one piece of data at once?*  
> **Yes!** By leveraging tuples.

---

## 5. Returning Multiple Values

When values are separated by commas in a `return` statement, Python automatically bundles them into a **tuple**:

```python
def get_student():
    return "Arun", 20, 85

student = get_student()
print(student)
print(type(student))
```

**Output:**
```
('Arun', 20, 85)
<class 'tuple'>
```

```text
Multiple returned values ("Arun", 20, 85)
                  ↓
       Packaged as a tuple
                  ↓
          Returned to caller
```

---

## 6. Returning Geographic Coordinates

```python
def get_coordinates():
    return 12.9716, 77.5946

location = get_coordinates()
print("Location:", location)
```
**Output:**
```
Location: (12.9716, 77.5946)
```

---

## 7. Why Return Multiple Values as a Tuple?

Imagine an exam result that requires:
1. Total marks
2. Average percentage
3. Highest score

Instead of writing three separate functions that scan the list three times:
- `get_total(marks)`
- `get_average(marks)`
- `get_highest(marks)`

You write **one unified function**:
```python
def get_result(marks):
    ...
    return total, average, highest
```
This is cleaner, faster, and keeps related data grouped together logically.

---

## 8. Returning Two Values

```python
def calculate(a, b):
    total = a + b
    difference = a - b
    return total, difference

result = calculate(20, 10)
print(result)
```
**Output:**
```
(30, 10)
```

---

## 9. Unpacking a Returned Tuple Directly

Rather than holding the tuple in a container variable, you can unpack it in the assignment line:

```python
def calculate(a, b):
    total = a + b
    difference = a - b
    return total, difference

# Direct unpacking
sum_val, diff_val = calculate(20, 10)

print("Total:     ", sum_val)
print("Difference:", diff_val)
```

**Output:**
```
Total:      30
Difference: 10
```

```text
calculate(20, 10)
        ↓
    (30, 10)
        ↓
   Unpacking
   ↙       ↘
sum_val   diff_val
  30         10
```

---

## 10. Returning Three or More Values

```python
def get_marks():
    return 80, 75, 90

m1, m2, m3 = get_marks()

print("Subject 1:", m1)
print("Subject 2:", m2)
print("Subject 3:", m3)
```
**Output:**
```
Subject 1: 80
Subject 2: 75
Subject 3: 90
```

---

## 11. The Multiple-Value Return Pattern

```python
# Definition
def compute_analytics(dataset):
    # computations ...
    return metric1, metric2, metric3

# Invocation & Unpack
m1, m2, m3 = compute_analytics(data)
```

---

## 12. Illustrative Example — Student Results

```python
def calculate_result(marks):
    total = sum(marks)
    average = total / len(marks)
    highest = max(marks)
    return total, average, highest

marks = [80, 75, 90]
total, average, highest = calculate_result(marks)

print("Total:  ", total)
print("Average:", average)
print("Highest:", highest)
```

**Output:**
```
Total:   245
Average: 81.66666666666667
Highest: 90
```

---

## 13. Formatting Average Output

Format floats cleanly using `round(val, 2)` or `f"{val:.2f}"`:

```python
print("Average:", round(average, 2))      # 81.67
print(f"Average: {average:.2f}")          # 81.67
```

---

## 14. Returning Heterogeneous Data Types

Tuples can seamlessly bundle strings, numbers, and Booleans:

```python
def get_student_profile():
    return "Arun", 20, 85.5, True

name, age, gpa, is_enrolled = get_student_profile()
print(f"{name}, Age {age}, GPA {gpa}, Enrolled: {is_enrolled}")
```
**Output:**
```
Arun, Age 20, GPA 85.5, Enrolled: True
```

---

## 15. Passing Tuples as Function Arguments

Tuples can also be passed into functions:

```python
def display_point(point):
    print(f"Coordinates: X={point[0]}, Y={point[1]}")

coordinates = (10, 20)
display_point(coordinates)
```
**Output:**
```
Coordinates: X=10, Y=20
```

---

## 16. Unpacking Arguments Before Calling

```python
student = ("Arun", 20, 85)
name, age, mark = student

def display(name, age, mark):
    print(name, age, mark)

display(name, age, mark)
```

---

## 17. Passing a Packed Tuple Directly

```python
def display_student(student):
    name, age, mark = student
    print("Name:", name)
    print("Age: ", age)
    print("Mark:", mark)

student_data = ("Arun", 20, 85)
display_student(student_data)
```

---

## 18. Pipeline: Output of Function A as Input to Function B

```python
def get_student():
    return "Arun", 20, 85

def display_student(student):
    print("Name:", student[0])
    print("Age: ", student[1])
    print("Mark:", student[2])

data = get_student()
display_student(data)
```

Or piped in a single line:
```python
display_student(get_student())
```

---

## 19. Returning Mathematical Calculation Results

```python
def calculate_numbers(a, b):
    addition = a + b
    multiplication = a * b
    division = a / b
    return addition, multiplication, division

add, multiply, divide = calculate_numbers(20, 5)

print("Addition:      ", add)
print("Multiplication:", multiply)
print("Division:      ", divide)
```
**Output:**
```
Addition:       25
Multiplication: 100
Division:       4.0
```

---

## 20. Real-World Example — Employee Salary Calculator

```python
def calculate_salary(basic):
    allowance = basic * 0.10
    total = basic + allowance
    return basic, allowance, total

basic, allowance, total = calculate_salary(20000)

print("Basic:    ", basic)
print("Allowance:", allowance)
print("Total:    ", total)
```
**Output:**
```
Basic:     20000
Allowance: 2000.0
Total:     22000.0
```

---

## 21. Real-World Example — Shopping Bill with Discount

```python
def calculate_bill(price, quantity, discount_pct):
    subtotal = price * quantity
    discount_amount = subtotal * (discount_pct / 100)
    final_amount = subtotal - discount_amount
    return subtotal, discount_amount, final_amount

sub, disc, final = calculate_bill(500, 3, 10)

print("Subtotal:    ", sub)
print("Discount:    ", disc)
print("Final Amount:", final)
```
**Output:**
```
Subtotal:     1500
Discount:     150.0
Final Amount: 1350.0
```

---

## 22. Real-World Example — Temperature Conversion

```python
def convert_temperature(celsius):
    fahrenheit = (celsius * 9 / 5) + 32
    kelvin = celsius + 273.15
    return fahrenheit, kelvin

f, k = convert_temperature(25)

print("Fahrenheit:", f)
print("Kelvin:    ", k)
```
**Output:**
```
Fahrenheit: 77.0
Kelvin:     298.15
```

---

## 23. Real-World Example — Dataset Statistics

```python
def get_statistics(numbers):
    total = sum(numbers)
    highest = max(numbers)
    lowest = min(numbers)
    count = len(numbers)
    return total, highest, lowest, count

numbers = [10, 20, 30, 40, 50]
total, highest, lowest, count = get_statistics(numbers)

print("Total:  ", total)
print("Highest:", highest)
print("Lowest: ", lowest)
print("Count:  ", count)
```
**Output:**
```
Total:   150
Highest: 50
Lowest:  10
Count:   5
```

---

## 24. Combining Conditionals with Tuple Returns

```python
def get_student_result(marks):
    total = sum(marks)
    average = total / len(marks)
    result = "Pass" if average >= 40 else "Fail"
    return total, average, result

marks = [60, 55, 70]
total, average, result = get_student_result(marks)

print("Total:  ", total)
print("Average:", round(average, 2))
print("Result: ", result)
```
**Output:**
```
Total:   185
Average: 61.67
Result:  Pass
```

---

## 25. Single-Value Return vs Multiple-Value Return

| Feature | Single Return | Multiple-Value Return |
| --- | --- | --- |
| **Syntax** | `return total` | `return total, avg, max_val` |
| **Output Type** | Primitive (`int`, `str`, etc.) | Packed `tuple` |
| **Assignment** | `x = func()` | `a, b, c = func()` or `t = func()` |
| **Use Case** | Single calculation | Grouped, related metrics |

---

## 26. Critical Rule: Unpacking Arity Must Match

```python
def get_data():
    return 10, 20, 30

# CORRECT
a, b, c = get_data()

# WRONG: ValueError (too many values to unpack)
a, b = get_data()

# WRONG: ValueError (not enough values to unpack)
a, b, c, d = get_data()
```

> **Rule:** Number of variables on the left **must strictly equal** the number of items returned in the tuple.

---

## 27. Catching the Entire Tuple in One Variable

Unpacking is optional; you can capture the entire tuple in a single variable:

```python
def get_data():
    return 10, 20, 30

result = get_data()
print(result)     # (10, 20, 30)
print(result[0])  # 10
```

---

## 28. Common Beginner Mistakes

### Mistake 1 — Thinking `return a, b` runs two returns
In Python, `return a, b` is a **single** statement returning one packed tuple object `(a, b)`.

### Mistake 2 — Unpacking variable mismatch
```python
def metrics():
    return 1, 2, 3

x, y = metrics()  # ValueError: too many values to unpack (expected 2)
```

### Mistake 3 — Forgetting function call parentheses
```python
def get_data():
    return 10, 20

# WRONG: stores function reference, does not execute!
data = get_data

# CORRECT
data = get_data()
```

---

## 29. Quick Student Workout

### Workout 1
```python
def get_data():
    return 10, 20

result = get_data()
print(result)
```
*Answer:* `(10, 20)`

### Workout 2
```python
def get_data():
    return 10, 20

a, b = get_data()
print(a)
print(b)
```
*Answer:*
```
10
20
```

### Workout 3
```python
def calculate(a, b):
    return a + b, a * b

x, y = calculate(5, 4)
print(x, y)
```
*Answer:* `9 20`

### Workout 4
```python
def get_result():
    return 100, 50, "Pass"

total, average, status = get_result()
print(status)
```
*Answer:* `Pass`

---

## 30. Unit–III Day 6 Cheat Sheet

| Concept | Python Code | Behavior |
| --- | --- | --- |
| **Return Tuple** | `return a, b, c` | Returns items packaged as tuple `(a, b, c)` |
| **Store Whole** | `res = func()` | `res` is a tuple containing all items |
| **Unpack Direct** | `x, y, z = func()` | Unpacks elements directly into variables |
| **Tuple Parameter** | `def f(data_tuple):` | Function accepts a packed tuple container |
| **Format Float** | `f"{avg:.2f}"` | Formats float to two decimal places |
| **Immutability** | `res[0] = 99` | **Error!** Tuples returned cannot be mutated |

---

## 31. Day 6 Final Challenge

Predict the output before running:

```python
def analyze_marks(marks):
    total = sum(marks)
    average = total / len(marks)
    highest = max(marks)
    result = "Pass" if average >= 50 else "Fail"
    return total, average, highest, result

scores = [60, 80, 70]
tot, avg, high, status = analyze_marks(scores)

print("Total:  ", tot)
print(f"Average: {avg:.1f}")
print("Highest:", high)
print("Result: ", status)
```

**Expected Output:**
```
Total:   210
Average: 70.0
Highest: 80
Result:  Pass
```

> **Day 6 Key Takeaway:** Functions are not limited to returning single values. Tuples provide an elegant, lightweight vehicle to package related results and unpack them cleanly, establishing a strong foundation for analytical programs.
