# Unit–II — Day 1: Boolean Values, Operators & Conditional Statements

**Duration:** 90 Minutes  
**Level:** Beginner  
**Unit:** Unit–II — Control Flow  
**Day:** 1  
**Topics:** Boolean Values and Operators; Introduction to Control Flow; Conditional Statements using if  

---

## 1. Day 1 Learning Objectives

By the end of this session, students should be able to:
- Understand `True` and `False` as primitive states.
- Understand and evaluate Boolean expressions.
- Use Boolean (`and`, `or`, `not`) and comparison operators (`==`, `!=`, `>`, `<`, `>=`, `<=`).
- Explain what control flow means and why programs need decisions.
- Write simple and effective `if` statements.
- Use conditions with variables and complex expressions.
- Trace the step-by-step execution of an `if` statement.
- Build simple real-world decision-making programs.

---

## 2. 90-Minute Session Plan

| Time | Topic | Activity |
| --- | --- | --- |
| 0–5 min | Unit-I connection | Quick recap |
| 5–15 min | Boolean values | `True` and `False` |
| 15–28 min | Boolean & comparison operators | Build conditions |
| 28–38 min | Introduction to control flow | How programs make decisions |
| 38–52 min | `if` statement | Syntax and execution |
| 52–63 min | `if` with expressions | Real-world examples |
| 63–73 min | Illustrative programs | Practical coding |
| 73–80 min | Debugging & flow tracing | Find mistakes |
| 80–87 min | Practice problem | Student Eligibility Checker |
| 87–90 min | Quiz | Quick assessment |

---

## 3. What is a Boolean Value?

A Boolean value represents one of two possible states:
- `True`
- `False`

Python uses the Boolean data type: `bool`.

```python
is_logged_in = True
is_blocked = False

print(is_logged_in)
print(is_blocked)
```

**Output:**
```
True
False
```

### Real-World Situations

| Real-world situation | Boolean State |
| --- | --- |
| Student passed | `True` |
| Student failed | `False` |
| Door is open | `True` |
| Door is closed | `False` |
| User is logged in | `True` |
| Payment completed | `True` |

---

## 4. Boolean Expressions

A **Boolean expression** is an expression that produces either `True` or `False`.

```python
age = 20
print(age >= 18)
```

**Output:**
```
True
```

Another example:
```python
age = 15
print(age >= 18)
```

**Output:**
```
False
```

The expression `age >= 18` is a Boolean expression because its result evaluates to a `bool`.

---

## 5. Comparison Operators

Comparison operators are used to construct conditions:

| Operator | Meaning | Example | Result |
| --- | --- | --- | --- |
| `==` | Equal to | `5 == 5` | `True` |
| `!=` | Not equal to | `5 != 3` | `True` |
| `>` | Greater than | `10 > 5` | `True` |
| `<` | Less than | `3 < 8` | `True` |
| `>=` | Greater than or equal to | `18 >= 18` | `True` |
| `<=` | Less than or equal to | `10 <= 20` | `True` |

```python
marks = 75
print(marks >= 40)
```

**Output:**
```
True
```

---

## 6. Important Difference: `=` vs `==`

This is critical for beginners:

- **Assignment (`=`):**
  ```python
  age = 20  # Store 20 in age
  ```
- **Comparison (`==`):**
  ```python
  age == 20  # Check whether age is equal to 20
  ```

| Symbol | Purpose | Usage |
| --- | --- | --- |
| `=` | Assign a value | Variable initialization or update |
| `==` | Compare two values | Conditional statements and logic |

```python
age = 20
print(age == 20)  # Output: True
```

---

## 7. Boolean Operators

Boolean operators allow us to combine or invert conditions:
1. `and`
2. `or`
3. `not`

### 7.1 `and` Operator
Evaluates to `True` **only when both conditions are true**.

```python
age = 20
marks = 75

print(age >= 18 and marks >= 40)
```

**Output:**
```
True
```

*Real-world example:* A student enters an exam hall only when `age >= 18` AND `attendance >= 75`. Both must be satisfied.

### 7.2 `or` Operator
Evaluates to `True` when **at least one condition is true**.

```python
has_card = False
has_cash = True

print(has_card or has_cash)
```

**Output:**
```
True
```

*Real-world example:* A shopper can pay with cash OR a credit card. One method is sufficient.

### 7.3 `not` Operator
Inverts the Boolean value (`True` becomes `False`, `False` becomes `True`).

```python
is_logged_in = True
print(not is_logged_in)  # Output: False

is_blocked = False
print(not is_blocked)    # Output: True
```

**Quick Memory Rule:**
- `True` $\rightarrow$ `not` $\rightarrow$ `False`
- `False` $\rightarrow$ `not` $\rightarrow$ `True`

---

## 8. Boolean Truth Tables

### `and` Truth Table
| A | B | A and B |
| --- | --- | --- |
| `True` | `True` | `True` |
| `True` | `False` | `False` |
| `False` | `True` | `False` |
| `False` | `False` | `False` |

### `or` Truth Table
| A | B | A or B |
| --- | --- | --- |
| `True` | `True` | `True` |
| `True` | `False` | `True` |
| `False` | `True` | `True` |
| `False` | `False` | `False` |

### `not` Truth Table
| A | not A |
| --- | --- |
| `True` | `False` |
| `False` | `True` |

> **Easy way to remember:**  
> - **AND** $\rightarrow$ Everything must be `True`  
> - **OR** $\rightarrow$ At least one must be `True`  
> - **NOT** $\rightarrow$ Reverse the result  

---

## 9. What is Control Flow?

**Control flow** is the order in which the instructions of a program are executed.

Normally, Python runs code sequentially from top to bottom:
```
print("Step 1")
      ↓
print("Step 2")
      ↓
print("Step 3")
```

However, real programs need to make decisions:
```
Is the user logged in?
       ↓
    Yes / No
       ↓
Take appropriate action
```

---

## 10. Why Do We Need Control Flow?

Imagine an e-commerce website:
```
Is product in stock?
    ├── YES ──> Add to cart
    └── NO  ──> Display "Out of Stock"
```

Without control flow, every program would execute the exact same instructions under all circumstances. Decision-making makes programs dynamic and responsive.

---

## 11. Introduction to the `if` Statement

The `if` statement instructs Python to execute a block of code conditionally:

### Basic Syntax
```python
if condition:
    statement
```

```python
age = 20

if age >= 18:
    print("You are eligible")
```

**Output:**
```
You are eligible
```

---

## 12. How `if` Works

### When Condition is `True`:
```python
marks = 80

if marks >= 40:
    print("Pass")
```
`80 >= 40` evaluates to `True`, so Python enters the block and prints `Pass`.

### When Condition is `False`:
```python
marks = 30

if marks >= 40:
    print("Pass")
```
`30 >= 40` evaluates to `False`, so Python skips the indented block entirely.

**Output:**
*(No output)*

---

## 13. Critical Rule: Indentation

Python uses indentation (typically 4 spaces) to identify the body of an `if` statement:

```python
# CORRECT
age = 20
if age >= 18:
    print("Adult")

# INCORRECT (SyntaxError / IndentationError)
age = 20
if age >= 18:
print("Adult")
```

> **Mental Model:** Indentation tells Python: *"This line belongs inside this decision block."*

---

## 14. `if` with Different Conditions

```python
# Example 1 — Age
age = 21
if age >= 18:
    print("Eligible to vote")

# Example 2 — Marks
marks = 80
if marks >= 50:
    print("Good Score")

# Example 3 — Temperature
temperature = 35
if temperature > 30:
    print("It is hot")

# Example 4 — Balance
balance = 5000
if balance > 0:
    print("Account has balance")
```

---

## 15. `if` with `and`

```python
age = 20
marks = 70

if age >= 18 and marks >= 50:
    print("Eligible")
```

Both conditions must be `True` for `"Eligible"` to print.

---

## 16. `if` with `or`

```python
day = "Saturday"

if day == "Saturday" or day == "Sunday":
    print("Weekend")
```

**Output:**
```
Weekend
```

---

## 17. `if` with `not`

```python
is_blocked = False

if not is_blocked:
    print("Account is active")
```

**Output:**
```
Account is active
```

---

## 18. Real-World Program — Login Check

```python
username = "admin"
password = "1234"

if username == "admin" and password == "1234":
    print("Login successful")
```

**Output:**
```
Login successful
```

### Trace:
1. `username == "admin"` $\rightarrow$ `True`
2. `password == "1234"` $\rightarrow$ `True`
3. `True and True` $\rightarrow$ `True`
4. Executes `print("Login successful")`

---

## 19. Real-World Program — Free Delivery

```python
cart_total = 1200

if cart_total >= 1000:
    print("Free Delivery")
```

**Output:**
```
Free Delivery
```

---

## 20. Real-World Program — Pass Check

```python
mark = 65

if mark >= 40:
    print("Student Passed")
```

**Output:**
```
Student Passed
```

Connects: Variables + Comparison Operators + Boolean Expressions + `if` statement + `print()`.

---

## 21. Combining Unit-I and Unit-II Concepts

Here we combine Functions with Conditional Control Flow:

```python
def check_discount(price):
    if price >= 1000:
        return 10
    return 0

price = 1500
discount = check_discount(price)
print("Discount:", discount)
```

**Output:**
```
Discount: 10
```

---

## 22. Student Eligibility Function

```python
def check_eligibility(age, mark):
    if age >= 18 and mark >= 50:
        return True
    return False

result = check_eligibility(20, 70)
print(result)
```

**Output:**
```
True
```

---

## 23. Flow of an `if` Statement

```text
              Start
                ↓
          Evaluate condition
                ↓
        ┌───────┴───────┐
        ↓               ↓
      True            False
        ↓               ↓
 Execute if body     Skip if body
        ↓               ↓
        └───────┬───────┘
                ↓
            Next Line
```

---

## 24. Program Tracing Practice

Consider:
```python
age = 17

if age >= 18:
    print("Adult")

print("Program End")
```

### Step-by-Step Trace:
1. `age = 17`
2. Evaluate `age >= 18` $\rightarrow$ `17 >= 18` is `False`
3. Skip `print("Adult")`
4. Execute `print("Program End")`

**Output:**
```
Program End
```

> **Takeaway:** An `if` statement does not always run its block. Execution strictly depends on whether the condition evaluates to `True`.

---

## 25. Common Beginner Mistakes

### Mistake 1 — Using `=` instead of `==` inside a condition
```python
# WRONG (SyntaxError)
if age = 18:

# CORRECT
if age == 18:
```

### Mistake 2 — Forgetting the colon `:`
```python
# WRONG
if age >= 18

# CORRECT
if age >= 18:
```

### Mistake 3 — Missing indentation
```python
# WRONG (IndentationError)
if age >= 18:
print("Adult")

# CORRECT
if age >= 18:
    print("Adult")
```

### Mistake 4 — Confusing `and` and `or`
- `if age >= 18 and has_id:` $\rightarrow$ **Both** must be satisfied.
- `if age >= 18 or has_id:` $\rightarrow$ **At least one** must be satisfied.

---

## 26. Quick Student Workout

Predict the output before running:

### Workout 1
```python
x = 10
if x > 5:
    print("A")
```
*Expected:* `A`

### Workout 2
```python
x = 10
if x < 5:
    print("A")
```
*Expected:* *(No output)*

### Workout 3
```python
age = 20
has_id = True
if age >= 18 and has_id:
    print("Allowed")
```
*Expected:* `Allowed`

### Workout 4
```python
is_raining = True
if not is_raining:
    print("Go outside")
```
*Expected:* *(No output)*

---

## 27. Unit-II Day 1 Cheat Sheet

| Concept | Syntax / Symbol | Remember |
| --- | --- | --- |
| **Boolean** | `bool` | `True` or `False` |
| **Comparison** | `==`, `!=`, `>`, `<`, `>=`, `<=` | Compares values, produces Boolean |
| **Assignment** | `=` | Stores a value in a variable |
| **Equality Check** | `==` | Tests whether two values are equal |
| **Logical AND** | `and` | `True` only when BOTH conditions are true |
| **Logical OR** | `or` | `True` when AT LEAST ONE condition is true |
| **Logical NOT** | `not` | Inverts Boolean value |
| **Control Flow** | `if condition:` | Alters sequential top-to-bottom order |
| **Block Starter** | `:` | Required at the end of `if` line |
| **Indentation** | 4 spaces / tab | Defines lines belonging inside the `if` body |

---

## 28. Day 1 Takeaway

The core pattern learned today:
```python
condition = True

if condition:
    # execute this indented code
```

Mental flow:
```text
Variable / Expression
        ↓
    Condition
        ↓
  True or False?
     ↙      ↘
   True     False
    ↓         ↓
 Execute    Skip
```

> **Core Idea for Unit-II:** A Python program can now make intelligent decisions dynamically rather than executing every line unconditionally.
