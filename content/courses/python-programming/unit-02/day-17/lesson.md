# Unit–II — Day 5: Fruitful Functions, Return Values & Parameters

**Duration:** 90 Minutes  
**Level:** Beginner → Intermediate  
**Unit:** Unit–II — Functions & Control Flow  
**Day:** 5  
**Topics:** Fruitful Functions; `return` Values; Parameters and Arguments; Difference between Fruitful and Non-Fruitful Functions  

---

## 1. Day 5 Learning Objectives

By the end of this session, students should be able to:
- Explain what a **fruitful function** is and how it differs from a **non-fruitful function**.
- Use the **`return` statement** to send computed results back to the calling code.
- Understand the critical architectural distinction between **`print()`** (displaying output) and **`return`** (yielding values).
- Distinguish between **parameters** (variables in the function definition) and **arguments** (actual values passed during a call).
- Store returned values in variables and integrate them into expressions and conditional tests.
- Understand how a `return` statement immediately terminates function execution.
- Create fruitful functions returning diverse data types: integers, floats, strings, booleans, and tuples.
- Compose multi-function architectures where one fruitful function passes its output directly to another.
- Combine functions with lists, loops, and conditional statements to solve practical software engineering problems.

---

## 2. 90-Minute Session Plan

| Time | Topic | Activity |
| --- | --- | --- |
| 0–5 min | Day 4 recap | Review `for` loops, `range()`, and `break`/`continue`/`pass` |
| 5–18 min | Function recap | Function definition (`def`), invocation, and parameters |
| 18–32 min | `return` statement | How values are computed and passed back to callers |
| 32–45 min | Fruitful functions | Returning numbers, strings, and booleans |
| 45–55 min | Non-fruitful functions | Functions that perform side-effects without useful returns |
| 55–65 min | Parameters vs Arguments | Anatomy of function signatures and data flow |
| 65–75 min | Fruitful vs Non-Fruitful | Architectural comparisons and when to use each |
| 75–80 min | Illustrative programs | Shopping bills, student grade pipelines, temperature conversion |
| 80–87 min | Moodle practice | Student Result Function coding challenge |
| 87–90 min | Quiz | 10-question mastery assessment |

---

## 3. Quick Recap

In earlier sessions, we learned how to define and execute functions:

```python
def greet():
    print("Hello, ByteLab!")

greet()
```

This represents a function that **performs an action** (printing to the console).

Today, we take an essential step in computer programming: moving from functions that simply print output to **functions that calculate data and return the result back to our program**.

---

## 4. What is a Fruitful Function?

A **fruitful function** is a function that calculates and **returns a value** to its caller.

```python
def add(a, b):
    return a + b

result = add(10, 20)
print(result)
# Output: 30
```

```text
Caller invokes add(10, 20)
            │
            ▼
    Function calculates 10 + 20
            │
            ▼
    return sends 30 back to caller
            │
            ▼
    Variable `result` receives 30
```

---

## 5. Why is it Called "Fruitful"?

Think of an apple tree:
```text
Tree (Function) ──► Absorbs sunlight & water ──► Produces Fruit (Return Value)
```
Similarly, a fruitful function receives inputs (parameters), computes a result, and **produces a useful value** that your program can store, reuse, or pass into other functions.

---

## 6. A Simple Fruitful Function

```python
def square(number):
    return number * number

ans = square(5)
print("Square of 5 is:", ans)
# Output: Square of 5 is: 25
```

The function computes $5 \times 5 = 25$ and yields `25` back to the variable `ans`.

---

## 7. What is the `return` Statement?

The `return` keyword terminates function execution and specifies the value to be delivered back to the caller.

```python
def multiply(a, b):
    return a * b

result = multiply(4, 5)
```

```text
Input Arguments (4, 5)
         │
         ▼
Parameters (a=4, b=5)
         │
         ▼
Expression (4 * 5 = 20)
         │
         ▼
return sends 20
         │
         ▼
result receives 20
```

---

## 8. `print()` vs `return`: The Crucial Distinction

This is one of the most vital concepts for every programming student to master.

### Example A: Using `print()` (Non-Fruitful)
```python
def add(a, b):
    print(a + b)

result = add(10, 20)
print("result is:", result)
```
**Output:**
```
30
result is: None
```
> **Explanation:** The function displayed `30` on the screen, but it **did not return anything**. Therefore, `result` holds Python's default empty value: `None`!

### Example B: Using `return` (Fruitful)
```python
def add(a, b):
    return a + b

result = add(10, 20)
print("result is:", result)
```
**Output:**
```
result is: 30
```
> **Explanation:** The function returned `30`, which is captured and stored inside the variable `result` for later use.

---

## 9. Comparison: `print()` vs `return`

| Feature | `print()` | `return` |
| --- | --- | --- |
| **Primary Purpose** | Displays human-readable text on screen | Delivers data back to calling code |
| **Effect on Function** | Function continues to the next line | **Immediately terminates** the function |
| **Storage in Variables** | Cannot be stored (evaluates to `None`) | Value is stored in a variable |
| **Mathematical Use** | Cannot be used in arithmetic or expressions | Fully usable in formulas, conditions, and pipelines |
| **Mental Model** | *"Show it to the user"* | *"Hand it back to the program"* |

---

## 10. Returned Values Can Be Stored and Reused

Because returned values are real Python data objects, you can perform further computations on them:

```python
def multiply(a, b):
    return a * b

base_cost = multiply(10, 3)  # 30
final_bill = base_cost + 5    # 35

print("Final Bill: ₹", final_bill)
```

---

## 11. Returned Values in Compound Expressions

A fruitful function call can replace any literal value inside an expression:

```python
def add(a, b):
    return a + b

# add(10, 20) returns 30; then 30 * 2 evaluates to 60
total = add(10, 20) * 2
print("Total:", total)
# Output: 60
```

---

## 12. Returned Values in Conditional Statements

Fruitful functions returning booleans can be queried directly by `if` statements:

```python
def is_even(number):
    return number % 2 == 0

if is_even(10):
    print("10 is an Even number")
else:
    print("10 is an Odd number")
```

---

## 13. Fruitful Function Returning a Boolean Flag

```python
def is_pass(mark):
    return mark >= 40

student_mark = 75
if is_pass(student_mark):
    print("Status: Passed")
else:
    print("Status: Failed")
```

---

## 14. Fruitful Function Returning a String

```python
def get_grade(mark):
    if mark >= 90:
        return "A+"
    elif mark >= 75:
        return "A"
    elif mark >= 60:
        return "B"
    elif mark >= 40:
        return "Pass"
    else:
        return "Fail"

grade = get_grade(82)
print("Assigned Grade:", grade)
# Assigned Grade: A
```

---

## 15. Fruitful Function Returning a Float

```python
def calculate_average(a, b, c):
    return (a + b + c) / 3

avg = calculate_average(80, 70, 90)
print(f"Average: {avg:.2f}")
# Output: Average: 80.00
```

---

## 16. Parameters vs Arguments

```python
# Function Definition
def calculate_area(length, width):  # length and width are PARAMETERS
    return length * width

# Function Call
area = calculate_area(10, 5)        # 10 and 5 are ARGUMENTS
```

| Term | Definition | Location |
| :--- | :--- | :--- |
| **Parameter** | Variable placeholder defined in the function signature | In `def` statement header |
| **Argument** | Real value or expression passed to the function upon call | Inside parentheses when calling |

---

## 17. Single vs Multiple Parameters

### Single Parameter
```python
def double(x):
    return x * 2

print(double(10))  # 20
```

### Multiple Parameters
```python
def calculate_total(price, quantity):
    return price * quantity

total = calculate_total(500, 3)
print("Total: ₹", total)  # 1500
```

---

## 18. Parameter-Argument Data Flow Diagram

```text
                  calculate_total(500, 3)
                            │
              ┌─────────────┴─────────────┐
              ▼                           ▼
        price = 500                 quantity = 3
              └─────────────┬─────────────┘
                            ▼
                    price * quantity
                            ▼
                      500 * 3 = 1500
                            ▼
                       return 1500
                            ▼
                     total = 1500
```

---

## 19. Non-Fruitful Functions (Void Functions)

A **non-fruitful function** performs an action (such as writing to a file, rendering a UI banner, or printing to stdout) without returning a usable value to the caller.

```python
def display_header():
    print("====================================")
    print("   ByteLab Learning Management System")
    print("====================================")

display_header()
```

---

## 20. Another Non-Fruitful Function: Interactive Menu

```python
def display_menu():
    print("1. Add Record")
    print("2. View Reports")
    print("3. Exit System")

display_menu()
```

---

## 21. Summary: Fruitful vs Non-Fruitful

| Attribute | Fruitful Function | Non-Fruitful Function |
| :--- | :--- | :--- |
| **Core Goal** | Compute and produce data | Perform an action or side-effect |
| **`return` Statement** | Explicitly returns data (`return x`) | Omitted or bare `return` |
| **Return Value** | Int, float, str, bool, list, tuple | Always returns `None` |
| **Assignability** | `val = func()` stores real data | `val = func()` stores `None` |
| **Example** | `math.sqrt(16)`, `sum([1,2,3])` | `print()`, `display_menu()` |

---

## 22. Functions Without `return` Return `None`

```python
def say_hello():
    print("Hello!")

result = say_hello()
print("Returned value:", result)
print("Type:", type(result))
```
**Output:**
```
Hello!
Returned value: None
Type: <class 'NoneType'>
```

---

## 23. The `return` Statement Halts Execution Immediately

Any statements placed after an executed `return` statement are **unreachable**:

```python
def demonstration():
    print("Statement 1 (Runs)")
    return 100
    print("Statement 2 (NEVER Runs!)")

val = demonstration()
print("Value:", val)
```
**Output:**
```
Statement 1 (Runs)
Value: 100
```

---

## 24. Fruitful Functions with Collections (Lists)

```python
def get_sum(numbers):
    return sum(numbers)

scores = [10, 20, 30, 40]
print("Total Score:", get_sum(scores))
# Output: Total Score: 100
```

---

## 25. Fruitful Functions with Loops

```python
def compute_sum(numbers):
    total = 0
    for num in numbers:
        total += num
    return total

print("Sum:", compute_sum([10, 20, 30]))
# Output: Sum: 60
```

---

## 26. Fruitful Functions with Conditional Returns

```python
def evaluate_score(mark):
    if mark >= 40:
        return "Pass"
    else:
        return "Fail"

print(evaluate_score(65))  # Pass
print(evaluate_score(25))  # Fail
```

---

## 27. Function Composition: Pipelines of Fruitful Functions

Functions can pass their outputs directly as inputs to other functions:

```python
def square(n):
    return n * n

def sum_of_squares(a, b):
    return square(a) + square(b)

result = sum_of_squares(3, 4)
# square(3) = 9; square(4) = 16; 9 + 16 = 25
print("Result:", result)
# Output: 25
```

---

## 28. Real-World Architecture: E-Commerce Invoice Pipeline

```python
def calculate_subtotal(price, quantity):
    return price * quantity

def calculate_discount(amount):
    if amount >= 1000:
        return amount * 0.10  # 10% discount
    return 0.0

def calculate_tax(taxable_amount):
    return taxable_amount * 0.05  # 5% GST

# Execution pipeline
subtotal = calculate_subtotal(500, 3)     # 1500.0
discount = calculate_discount(subtotal)   # 150.0
discounted = subtotal - discount          # 1350.0
tax = calculate_tax(discounted)           # 67.5
final_bill = discounted + tax             # 1417.5

print(f"Subtotal: ₹{subtotal:.2f}")
print(f"Discount: ₹{discount:.2f}")
print(f"Tax (5%): ₹{tax:.2f}")
print(f"Final Total: ₹{final_bill:.2f}")
```

---

## 29. Real-World Architecture: Student Academic Evaluation

```python
def calculate_total(marks):
    return sum(marks)

def calculate_average(marks):
    return sum(marks) / len(marks)

def determine_result(average):
    return "Pass" if average >= 40 else "Fail"

grades = [70, 80, 60]
tot = calculate_total(grades)
avg = calculate_average(grades)
res = determine_result(avg)

print(f"Total: {tot} | Average: {avg:.2f} | Result: {res}")
```

---

## 30. Real-World Example: Temperature Converter

```python
def celsius_to_fahrenheit(celsius):
    return (celsius * 9 / 5) + 32

temp_c = 30
temp_f = celsius_to_fahrenheit(temp_c)
print(f"{temp_c}°C = {temp_f:.1f}°F")
# 30°C = 86.0°F
```

---

## 31. Common Beginner Mistakes

### Mistake 1: Confusing `print` and `return`
```python
# BUGGY:
def add(a, b):
    print(a + b)

# Calling code expects a value:
total = add(5, 5) * 2  # TypeError: unsupported operand type for *: 'NoneType' and 'int'
```

### Mistake 2: Forgetting to capture returned values
```python
def square(x):
    return x * x

square(5)  # Computed 25, but it vanished because nobody saved it!
# Correct:
ans = square(5)
```

### Mistake 3: Unreachable code after `return`
```python
def calculate(a, b):
    return a + b
    print("Done!")  # Dead code: never runs!
```

### Mistake 4: Returning internal variables incorrectly
```python
def total(a, b):
    s = a + b
    return a  # BUG: intended to return s!
```

---

## 32. Quick Student Workout

### Workout 1
```python
def add(a, b):
    return a + b

print(add(5, 3))
```
*Answer:* `8`

### Workout 2
```python
def greet():
    print("Hello")

result = greet()
print(result)
```
*Answer:*  
`Hello`  
`None`

### Workout 3
```python
def is_even(n):
    return n % 2 == 0

print(is_even(8))
```
*Answer:* `True`

### Workout 4
```python
def calculate(a, b):
    return a + b, a * b

x, y = calculate(4, 5)
print(x)
print(y)
```
*Answer:*  
`9`  
`20`

---

## 33. Unit-II Day 5 Cheat Sheet

| Concept | Explanation | Code Snippet |
| --- | --- | --- |
| **Fruitful Function** | Function that returns a value | `def f(x): return x * 2` |
| **`return`** | Halts function and delivers value | `return total` |
| **`None`** | Default return of void functions | `res = print("hi") -> res is None` |
| **Parameter** | Variable name in function signature | `def add(a, b):` |
| **Argument** | Value passed during invocation | `add(10, 20)` |
| **Composition** | Passing function output to another | `f(g(x))` |

---

## 34. Day 5 Capstone Challenge

Predict the exact output before executing:

```python
def calculate_total(marks):
    return sum(marks)

def calculate_average(marks):
    return calculate_total(marks) / len(marks)

def check_result(average):
    if average >= 40:
        return "Pass"
    else:
        return "Fail"

marks = [70, 80, 60]

total = calculate_total(marks)
average = calculate_average(marks)
result = check_result(average)

print("Total:", total)
print("Average:", round(average, 2))
print("Result:", result)
```

### Trace
1. `marks = [70, 80, 60]`
2. `calculate_total` returns $70 + 80 + 60 = 210$.
3. `calculate_average` invokes `calculate_total(marks)` ($210$), divides by $3$, and returns $70.0$.
4. `check_result(70.0)` evaluates $70.0 \ge 40 \rightarrow \text{True}$ and returns `"Pass"`.

**Output:**
```
Total: 210
Average: 70.0
Result: Pass
```

> **Takeaway:** Fruitful functions are the building blocks of clean, modular, and maintainable software. They allow components to compute results independently and communicate seamlessly through inputs and return values!
