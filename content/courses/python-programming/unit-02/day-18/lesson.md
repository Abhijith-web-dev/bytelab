# Unit–II — Day 6: Scope, Function Composition & Passing Values

**Duration:** 90 Minutes  
**Level:** Beginner → Intermediate  
**Unit:** Unit–II — Functions & Control Flow  
**Day:** 6  
**Topics:** Local and Global Scope; Function Composition; Passing Values Between Functions; Illustrative Function-Based Programs  

---

## 1. Day 6 Learning Objectives

By the end of this session, students should be able to:
- Define what **variable scope** means in Python.
- Confidently distinguish between **local scope** and **global scope**.
- Trace the lifecycle and visibility of local variables inside function boundaries.
- Understand how Python resolves variable references across global and local scopes.
- Explain **variable shadowing** when local and global variables share identical identifiers.
- Understand how the **`global` keyword** works, why it is dangerous, and when to avoid it.
- Understand and apply **function composition** ($f(g(x))$).
- Connect separate functions into coherent, modular data pipelines.
- Pass values cleanly between functions using parameters, arguments, and return values.
- Architect modular programs decomposed into small, single-responsibility functions.

---

## 2. 90-Minute Session Plan

| Time | Topic | Activity |
| --- | --- | --- |
| 0–5 min | Day 5 recap | Fruitful functions, parameters, and `return` statements |
| 5–20 min | Scope introduction | Where do variables live? Visibility boundaries |
| 20–35 min | Local Scope | Function-internal variables and encapsulation |
| 35–45 min | Global Scope | Module-level variables and read access |
| 45–55 min | Local vs Global | Comparison matrix and variable shadowing |
| 55–68 min | Function Composition | Output-to-input pipelines ($f(g(x))$) |
| 68–77 min | Value Passing | Orchestrating multi-function software workflows |
| 77–80 min | Tracing & Debugging | Walking through call stacks and variable lifecycles |
| 80–87 min | Moodle practice | Student Result Processing Pipeline challenge |
| 87–90 min | Quiz | 10-question mastery assessment |

---

## 3. Quick Recap from Day 5

In Day 5, we discovered fruitful functions:

```python
def add(a, b):
    return a + b

result = add(10, 20)
print(result)
```

The core data flow was:
```text
Arguments (10, 20) ──► Parameters (a, b) ──► Computation ──► return 30 ──► Captured in result
```

Now, we take the next major architectural step in software design:
Instead of writing one monolithic function:
```text
[Mega Function That Does Everything]
```
We decompose programs into a clean pipeline of focused, cooperating functions:
```text
Function A ──► Result A ──► Function B ──► Result B ──► Function C
```

To coordinate multiple functions effectively, we must first master **Scope**.

---

## 4. What is Scope?

**Scope** refers to the region of a program where a particular variable is recognized, accessible, and valid.

> **Simple Mental Model:** **Scope answers: *"Where in my code am I allowed to use this variable?"***

In Python, the two primary scopes for beginners are:
1. **Local Scope:** Inside a specific function.
2. **Global Scope:** Outside all functions, across the entire module.

---

## 5. Local Scope

Any variable declared inside the body of a function exists within that function's **local scope**:

```python
def greet():
    name = "Arun"  # Local variable
    print(name)

greet()
# Output: Arun
```

Here, `name` belongs strictly to `greet()`. It is created when `greet()` runs and discarded when `greet()` finishes.

---

## 6. Accessing Local Variables Outside Their Scope

Attempting to read a local variable from outside its enclosing function causes a `NameError`:

```python
def calculate():
    total = 100  # Local to calculate()

calculate()
print(total)  # NameError: name 'total' is not defined
```

```text
Program Memory
│
├── Global Scope (total DOES NOT EXIST HERE)
│
└── calculate() Scope
       │
       └── total = 100 (Lives ONLY during function execution)
```

---

## 7. Real-World Analogy: The Cashier's Scratchpad

Imagine a cashier calculating a customer's bill:
```python
def calculate_bill():
    price = 500
    quantity = 2
    subtotal = price * quantity
    print(subtotal)
```
The variables `price`, `quantity`, and `subtotal` are temporary scratchpad calculations. The outside world does not need to know or modify the cashier's scratchpad variables. Local scope protects internal variables from accidental outside tampering.

---

## 8. Parameters Have Local Scope

Every parameter defined in a function signature is inherently a local variable:

```python
def multiply(x, y):
    result = x * y
    return result

print(multiply(4, 5))
```
Inside `multiply()`, the identifiers `x`, `y`, and `result` are all strictly local. They vanish the moment the function returns.

---

## 9. Variable Shadowing (Local vs Global Names)

What happens when a local variable shares the same name as a global variable?

```python
x = 100  # Global variable

def test():
    x = 50   # Local variable (shadows global x)
    print("Inside function:", x)

test()
print("Outside function:", x)
```
**Output:**
```
Inside function: 50
Outside function: 100
```

Python creates two completely separate boxes in memory:
- **Global Box:** `x = 100`
- **Local Function Box:** `x = 50`

The local assignment does **not** overwrite or affect the global variable.

---

## 10. Global Scope

Variables defined at the top level of a Python file (outside of any function or class) belong to the **global scope**:

```python
app_name = "ByteLab LMS"  # Global variable

def display_welcome():
    print("Welcome to", app_name)

display_welcome()
# Output: Welcome to ByteLab LMS
```

Functions can freely read global variables as long as they do not rebind them locally.

---

## 11. Reading Global Configuration Variables

Global variables are commonly used for constants and configuration:

```python
TAX_RATE = 0.18  # 18% GST

def compute_total(price):
    return price + (price * TAX_RATE)

print("Final Cost: ₹", compute_total(1000))
# Output: Final Cost: ₹ 1180.0
```

---

## 12. Local vs Global Scope Comparison

| Attribute | Local Scope | Global Scope |
| :--- | :--- | :--- |
| **Where Defined** | Inside a function body or signature | Outside all functions at module level |
| **Accessibility** | Only within that specific function | Accessible anywhere in the module |
| **Lifetime** | Created on call, destroyed on return | Exists for the entire program execution |
| **Safety** | High (isolated and protected) | Lower (risk of unintended side-effects) |
| **Best Practice** | Preferred for calculation & temporary state | Use primarily for constants/config |

---

## 13. Modifying Global Variables: The Error Trap

If you attempt to modify a global variable inside a function without declaring it, Python raises an `UnboundLocalError`:

```python
counter = 0

def increment():
    counter += 1  # UnboundLocalError: local variable 'counter' referenced before assignment

increment()
```

> **Why this happens:** When Python sees `counter += 1` (`counter = counter + 1`), it assumes `counter` is a **local variable** being assigned. But reading it on the right side fails because no local initialization took place!

---

## 14. The `global` Keyword

To explicitly tell Python that an assignment targets the global variable instead of creating a local one, use the **`global`** keyword:

```python
counter = 0

def increment():
    global counter
    counter += 1

increment()
print("Counter:", counter)
# Output: Counter: 1
```

---

## 15. Architectural Warning: Avoid Overusing `global`

While `global` is a valid language feature, relying on it in production software leads to **spaghetti code**:
- Any function can mutate state unexpectedly.
- Debugging becomes difficult because variable values change unpredictably across the codebase.

### The Problematic Way (Global State Mutation)
```python
balance = 1000

def deposit(amount):
    global balance
    balance += amount
```

### The Clean, Modular Way (Parameter & Return)
```python
def deposit(current_balance, amount):
    return current_balance + amount

balance = 1000
balance = deposit(balance, 500)
print("Balance:", balance)  # 1500
```
> **Rule of Thumb:** Pass data **in** via parameters, and return data **out** via `return`.

---

## 16. What is Function Composition?

**Function composition** is the design technique of passing the return value of one function directly as the argument to another function:

$$\text{output} = f(g(x))$$

```python
def double(n):
    return n * 2

def add_five(n):
    return n + 5

# Composition: double(10) returns 20; add_five(20) returns 25
result = add_five(double(10))
print(result)
# Output: 25
```

---

## 17. Two Ways to Write Function Composition

### Approach 1: Nested Invocation (Direct Composition)
```python
result = add_five(double(10))
```

### Approach 2: Intermediate Variables (Pipeline Style)
```python
doubled_val = double(10)
result = add_five(doubled_val)
```
> **Tip:** For complex operations or beginners learning to debug, using intermediate variables makes each step easy to inspect and log!

---

## 18. Three-Stage Function Composition

```python
def add(a, b):
    return a + b

def multiply(n):
    return n * 2

def subtract(n):
    return n - 5

# 10 + 20 = 30 -> 30 * 2 = 60 -> 60 - 5 = 55
result = subtract(multiply(add(10, 20)))
print(result)
# Output: 55
```

```text
Inputs (10, 20)
       │
       ▼
  add(10, 20)          ──► returns 30
       │
       ▼
 multiply(30)          ──► returns 60
       │
       ▼
 subtract(60)          ──► returns 55
       │
       ▼
     Result = 55
```

---

## 19. Building Modular Data Pipelines

Instead of one monolithic 50-line function, decomposing tasks into smaller single-responsibility functions creates clean, testable software:

```python
def calculate_total(marks):
    return sum(marks)

def calculate_average(total, count):
    return total / count

def get_result(average):
    return "Pass" if average >= 40 else "Fail"

# The Data Pipeline
subject_marks = [70, 80, 60]

total = calculate_total(subject_marks)
avg = calculate_average(total, len(subject_marks))
status = get_result(avg)

print(f"Total: {total} | Average: {avg:.2f} | Status: {status}")
```
**Output:**
```
Total: 210 | Average: 70.00 | Status: Pass
```

---

## 20. Real-World Architecture: E-Commerce Billing Engine

```python
def calculate_subtotal(price, qty):
    return price * qty

def calculate_discount(subtotal):
    if subtotal >= 1000:
        return subtotal * 0.10
    return 0.0

def calculate_final_payable(subtotal, discount):
    return subtotal - discount

# Orchestrating the pipeline
item_price = 500
item_qty = 3

sub = calculate_subtotal(item_price, item_qty)  # 1500
disc = calculate_discount(sub)                   # 150.0
final_bill = calculate_final_payable(sub, disc)  # 1350.0

print(f"Subtotal: ₹{sub:.2f}")
print(f"Discount: ₹{disc:.2f}")
print(f"Payable Amount: ₹{final_bill:.2f}")
```

---

## 21. Real-World Architecture: Employee Compensation

```python
def calculate_allowance(basic_pay):
    return basic_pay * 0.10

def calculate_gross_salary(basic_pay, allowance):
    return basic_pay + allowance

basic = 30000
da = calculate_allowance(basic)
gross = calculate_gross_salary(basic, da)

print("Allowance: ₹", da)
print("Gross Salary: ₹", gross)
```

---

## 22. Real-World Architecture: Weather Station

```python
def celsius_to_fahrenheit(c):
    return (c * 9 / 5) + 32

def assess_temperature(f):
    return "Heatwave Alert!" if f >= 100 else "Normal Range"

current_c = 40
current_f = celsius_to_fahrenheit(current_c)
warning = assess_temperature(current_f)

print(f"{current_c}°C = {current_f:.1f}°F ({warning})")
```

---

## 23. Common Beginner Mistakes

### Mistake 1: Expecting a local variable to exist globally
```python
def calc():
    val = 50

calc()
print(val)  # NameError: name 'val' is not defined
```

### Mistake 2: Forgetting to capture returned values
```python
def double(n):
    return n * 2

double(10)  # Value calculated, but discarded!
```

### Mistake 3: Overwriting globals accidentally with `global`
Modifying globals indiscriminately makes functions hard to unit test in isolation.

### Mistake 4: Mismatching argument count in pipelines
```python
def calc_avg(total, count):
    return total / count

# Calling with 1 argument instead of 2:
avg = calc_avg(240)  # TypeError: missing 1 required positional argument
```

---

## 24. Quick Student Workout

### Workout 1
```python
def test():
    x = 10
    print(x)

test()
```
*Answer:* `10`

### Workout 2
```python
def double(n):
    return n * 2

def add_five(n):
    return n + 5

print(add_five(double(10)))
```
*Answer:* `25`

### Workout 3
```python
x = 100
def test():
    x = 50
    print(x)

test()
print(x)
```
*Answer:*  
`50`  
`100`

### Workout 4
```python
def add(a, b):
    return a + b

def square(n):
    return n * n

print(square(add(2, 3)))
```
*Answer:* `25`

---

## 25. Unit-II Day 6 Cheat Sheet

| Concept | Rule | Example |
| --- | --- | --- |
| **Local Scope** | Created inside function; inaccessible outside | `def f(): x = 1` |
| **Global Scope** | Declared at module level; readable inside functions | `CONFIG = "PROD"` |
| **Shadowing** | Local variable masks global variable of same name | Local `x = 5` shadows global `x = 10` |
| **`global`** | Grants write permissions to global variable | `global counter; counter += 1` |
| **Composition** | Output of function A is input of function B | `y = g(f(x))` |
| **Modular Pipeline** | Clean chained data flow | `raw -> clean() -> calc() -> report()` |

---

## 26. Day 6 Capstone Challenge

Predict the exact output:

```python
def calculate_total(marks):
    return sum(marks)

def calculate_average(total, count):
    return total / count

def get_grade(average):
    if average >= 90:
        return "A"
    elif average >= 75:
        return "B"
    elif average >= 50:
        return "C"
    elif average >= 40:
        return "D"
    else:
        return "F"

marks = [80, 75, 90]
total = calculate_total(marks)
average = calculate_average(total, len(marks))
grade = get_grade(average)

print("Total:", total)
print("Average:", round(average, 2))
print("Grade:", grade)
```

### Trace
- `total = calculate_total([80, 75, 90])` $\rightarrow 245$
- `average = calculate_average(245, 3)` $\rightarrow 81.6666...$
- `get_grade(81.6666...)` $\rightarrow$ $81.67 \ge 75 \rightarrow$ `"B"`

**Output:**
```
Total: 245
Average: 81.67
Grade: B
```

> **Takeaway:** Scope guarantees data isolation, while function composition provides clean connectivity. Combining them enables robust, scalable, and modular software design!
