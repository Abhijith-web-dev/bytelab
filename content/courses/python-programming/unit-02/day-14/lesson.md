# Unit–II — Day 2: Alternative, Chained & Nested Conditional Statements

**Duration:** 90 Minutes  
**Level:** Beginner  
**Unit:** Unit–II — Control Flow  
**Day:** 2  
**Topics:** Alternative Conditional: `if-else`; Chained Conditional: `if-elif-else`; Nested Conditional Statements; Illustrative Programs  

---

## 1. Day 2 Learning Objectives

By the end of this session, students should be able to:
- Understand why a standalone `if` statement is insufficient for binary or multi-path logic.
- Use `if-else` for mutually exclusive two-way decisions.
- Use `if-elif-else` for multi-way decision pipelines.
- Understand the critical **First-True-Condition** rule in chained conditionals.
- Write and trace **nested conditionals** (`if` within `if` or `else`).
- Contrast the semantic differences and trade-offs between:
  - Simple `if`
  - `if-else`
  - `if-elif-else`
  - Nested `if`
- Decide when to use nested conditions versus combining conditions with logical operators (`and`, `or`).
- Trace execution flow and debug conditional ordering and indentation mistakes.
- Implement robust decision-making logic in real-world scenarios (grading, ATM withdrawals, billing, authentication).

---

## 2. 90-Minute Session Plan

| Time | Topic | Activity |
| --- | --- | --- |
| 0–5 min | Day 1 recap | Review Boolean expressions and simple `if` |
| 5–20 min | `if-else` | Two-way decision branching and syntax |
| 20–38 min | `if-elif-else` | Multi-way classification & order of evaluation |
| 38–52 min | Nested `if` | Hierarchical decisions inside decisions |
| 52–65 min | Comparison of conditionals | Guidelines on selecting the optimal structure |
| 65–75 min | Illustrative programs | ATM, course eligibility, electricity billing, menus |
| 75–80 min | Debugging & flow tracing | Predicting outputs and catching common traps |
| 80–87 min | Moodle practice | Student Grade Calculator coding problem |
| 87–90 min | Quiz | 10-question mastery assessment |

---

## 3. Quick Recap from Day 1

In Day 1, we explored:
- **Boolean Values:** `True` and `False`
- **Comparison Operators:** `==`, `!=`, `<`, `<=`, `>`, `>=`
- **Logical Operators:** `and`, `or`, `not`
- **Simple `if` Statement:**
  ```python
  age = 20
  if age >= 18:
      print("Adult")
  ```

### What happens when the condition is `False`?
Consider:
```python
mark = 35
if mark >= 40:
    print("Pass")
```
When `mark` is 35, the condition evaluates to `False`, and Python does nothing at all. But in practical software, the student needs explicit feedback: `"Fail"`.

We need **two distinct paths**:

```text
               Condition (mark >= 40)
                         │
             ┌───────────┴───────────┐
             ▼                       ▼
           [True]                 [False]
             │                       │
       print("Pass")           print("Fail")
```

This is precisely what the **`if-else` statement** provides.

---

## 4. Why Do We Need `if-else`?

A simple `if` statement either executes code or skips it. An `if-else` statement provides an **alternative** path:

```text
If something is True  ──► Execute Action 1
Otherwise (False)     ──► Execute Action 2
```

---

## 5. The `if-else` Statement

An `if-else` statement guarantees that **exactly one** of the two blocks will execute.

### Syntax
```python
if condition:
    # block executed when condition is True
else:
    # block executed when condition is False
```

### Example
```python
age = 16

if age >= 18:
    print("Adult")
else:
    print("Minor")
```
**Output:**
```
Minor
```

---

## 6. How `if-else` Works

```text
Case 1: age = 20
age >= 18 ──► True ──► Executes print("Adult") ──► else block is SKIPPED

Case 2: age = 15
age >= 18 ──► False ──► if block is SKIPPED ──► Executes print("Minor")
```

---

## 7. Fundamental Rule: Only One Branch Executes

In an `if-else` construct, the two blocks are **mutually exclusive**. Python will never execute both branches in the same pass, nor will it skip both.

```python
temperature = 25

if temperature > 30:
    print("Hot")
else:
    print("Not Hot")
```
**Output:**
```
Not Hot
```

---

## 8. Real-World Example: Pass or Fail

```python
mark = 55

if mark >= 40:
    print("Pass")
else:
    print("Fail")
```
**Output:**
```
Pass
```

---

## 9. Real-World Example: Even or Odd

```python
number = 7

if number % 2 == 0:
    print("Even")
else:
    print("Odd")
```
**Output:**
```
Odd
```
> **Explanation:** The modulus operator `%` returns the remainder of integer division. If `number % 2` equals 0, the number is divisible by 2 (Even). Otherwise, it is Odd.

---

## 10. Real-World Example: Credential Check

```python
password = "python123"

if password == "python123":
    print("Login Successful")
else:
    print("Invalid Password")
```
**Output:**
```
Login Successful
```

---

## 11. What If We Have More Than Two Choices?

Suppose we want to grade an exam:
- **90–100:** Excellent
- **75–89:** Very Good
- **50–74:** Good
- **40–49:** Pass
- **Below 40:** Fail

Handling five distinct categories using only `if` and `else` would result in awkward nesting. We need a clean way to chain multiple mutually exclusive conditions.

This is where the **`if-elif-else`** statement is used.

---

## 12. Chained Conditional: `if-elif-else`

In Python, `elif` stands for **"else if"**. A chained conditional tests a series of conditions sequentially from top to bottom.

### Syntax
```python
if condition1:
    statement_block_1
elif condition2:
    statement_block_2
elif condition3:
    statement_block_3
else:
    fallback_statement_block
```

---

## 13. Simple `if-elif-else` Example

```python
mark = 82

if mark >= 90:
    print("Excellent")
elif mark >= 75:
    print("Very Good")
elif mark >= 50:
    print("Good")
else:
    print("Need Improvement")
```
**Output:**
```
Very Good
```

### Execution Trace
1. `82 >= 90` evaluates to `False`.
2. `82 >= 75` evaluates to `True`.
3. Python executes `print("Very Good")`.
4. Python **exits the entire chain immediately**, bypassing all remaining `elif` and `else` blocks!

---

## 14. Critical Principle: The First True Condition Wins

Python evaluates chained conditions strictly from top to bottom and **stops evaluating as soon as it finds the first `True` condition**.

Observe what happens when conditions are ordered incorrectly:

```python
# INCORRECT ORDER
mark = 95

if mark >= 40:
    print("Pass")
elif mark >= 90:
    print("Excellent")
```
**Output:**
```
Pass
```
Because `95 >= 40` is `True`, Python executes `"Pass"` and exits! The `"Excellent"` branch is completely unreachable for 95.

> **Golden Rule:** Always arrange your conditions from the **most specific / highest threshold** to the **least specific / lowest threshold**.

```python
# CORRECT ORDER
if mark >= 90:
    print("Excellent")
elif mark >= 75:
    print("Very Good")
elif mark >= 50:
    print("Good")
elif mark >= 40:
    print("Pass")
else:
    print("Fail")
```

---

## 15. Flow of `if-elif-else`

```text
                  Start
                    │
           Check condition 1
              /           \
          [True]        [False]
            │              │
        Execute 1    Check condition 2
                        /          \
                    [True]       [False]
                      │             │
                  Execute 2   Check condition 3
                                 /          \
                             [True]       [False]
                               │             │
                           Execute 3    Execute else block
                               │             │
                               └──────┬──────┘
                                      ▼
                                Continue code
```

---

## 16. Real-World Example: Grade Classifier

```python
mark = 86

if mark >= 90:
    grade = "A+"
elif mark >= 80:
    grade = "A"
elif mark >= 70:
    grade = "B"
elif mark >= 60:
    grade = "C"
elif mark >= 40:
    grade = "D"
else:
    grade = "F"

print("Grade:", grade)
```
**Output:**
```
Grade: A
```

---

## 17. Real-World Example: Ticket Pricing System

```python
age = 20

if age < 5:
    price = "Free"
elif age < 18:
    price = "₹50"
elif age < 60:
    price = "₹100"
else:
    price = "₹50"

print("Ticket:", price)
```
**Output:**
```
Ticket: ₹100
```

---

## 18. Comparison: `if` vs `if-else` vs `if-elif-else`

| Statement | Executable Paths | Ideal Use Case | Mental Model |
| --- | --- | --- | --- |
| **`if`** | 0 or 1 | Perform an action only when a condition holds true | *"Do this if condition is met."* |
| **`if-else`** | Exactly 1 (of 2) | Mutually exclusive binary decisions (Yes/No, Pass/Fail) | *"Do this OR do that."* |
| **`if-elif-else`** | Exactly 1 (of many) | Multi-category classification, grade brackets, menus | *"Choose one option from several alternatives."* |

---

## 19. What is a Nested Conditional?

A **nested conditional** is an `if`, `elif`, or `else` statement placed inside another conditional block.

```python
age = 20

if age >= 18:
    print("Adult")
    if age >= 21:
        print("21 or above")
```
**Output:**
```
Adult
```

The inner `if age >= 21:` is only tested if the outer condition `age >= 18:` is `True`.

---

## 20. Why Do We Need Nested `if`?

Real-world decisions are often **hierarchical**: a second question only makes sense depending on the answer to the first question.

```text
Is the user authenticated?
           │
         [Yes]
           │
Is the user an Administrator?
           │
         [Yes]
           │
Show Administration Control Panel
```

---

## 21. Nested `if-else` Example

```python
age = 20

if age >= 18:
    if age >= 21:
        print("Can enter VIP section")
    else:
        print("Adult but below 21")
else:
    print("Minor")
```
**Output:**
```
Adult but below 21
```

---

## 22. Visualizing Nested Conditional Flow

```text
                       age >= 18?
                       /        \
                   [True]      [False]
                     │            │
                 age >= 21?     Minor
                 /        \
             [True]      [False]
               │            │
          Can enter     Below 21
```

---

## 23. Real-World Example: ATM Cash Withdrawal

```python
is_logged_in = True
balance = 5000
amount = 3000

if is_logged_in:
    if amount <= balance:
        print("Withdrawal Successful")
    else:
        print("Insufficient Balance")
else:
    print("Please Login First")
```
**Output:**
```
Withdrawal Successful
```

---

## 24. Real-World Example: University Admission Eligibility

```python
age = 20
mark = 75

if age >= 18:
    if mark >= 50:
        print("Admission Eligible")
    else:
        print("Mark requirement not satisfied")
else:
    print("Age requirement not satisfied")
```
**Output:**
```
Admission Eligible
```

---

## 25. Nested Conditionals vs Logical Operators

We could also write the university admission check using the logical `and` operator:

```python
if age >= 18 and mark >= 50:
    print("Admission Eligible")
else:
    print("Not Eligible")
```

### Which should you choose?
- **Use `and`** when both conditions are simple, independent, and you only care whether both are met without needing specific feedback on which one failed.
- **Use Nested `if`** when you need to give **specific feedback** depending on which exact condition failed (e.g., distinguishing `"Age requirement failed"` from `"Mark requirement failed"`), or when evaluating the second condition would trigger an error if the first were false.

---

## 26. Real-World Example: E-Commerce Delivery & Membership

```python
cart_total = 1500
is_member = True

if cart_total >= 1000:
    if is_member:
        print("Free Delivery + Extra 10% Member Discount")
    else:
        print("Free Delivery")
else:
    print("Delivery Charges Apply")
```
**Output:**
```
Free Delivery + Extra 10% Member Discount
```

---

## 27. `if-elif-else` vs Nested `if`: Structural Differences

```text
Chained (if-elif-else):
Checks multiple alternative conditions on the SAME conceptual plane.
"Is it A? If not, is it B? If not, is it C?"

Nested (if inside if):
Checks conditions at SUBSEQUENT conceptual depths.
"Is it A? If yes, now check if it is ALSO B."
```

---

## 28. Illustrative Program: Electricity Consumption Tier

```python
units = 250

if units <= 100:
    print("Low Usage")
elif units <= 200:
    print("Medium Usage")
elif units <= 300:
    print("High Usage")
else:
    print("Very High Usage")
```
**Output:**
```
High Usage
```

---

## 29. Illustrative Program: Sign of a Number

```python
number = -5

if number > 0:
    print("Positive")
elif number < 0:
    print("Negative")
else:
    print("Zero")
```
**Output:**
```
Negative
```

---

## 30. Illustrative Program: Largest of Two Numbers

```python
a = 25
b = 40

if a > b:
    print("A is larger")
else:
    print("B is larger")
```
**Output:**
```
B is larger
```

---

## 31. Illustrative Program: Largest of Three Numbers (Nested)

```python
a = 25
b = 40
c = 30

if a > b:
    if a > c:
        print("A is largest")
    else:
        print("C is largest")
else:
    if b > c:
        print("B is largest")
    else:
        print("C is largest")
```
**Output:**
```
B is largest
```

---

## 32. Illustrative Program: Command-Line Menu System

```python
choice = 2

if choice == 1:
    print("Action: Add Student Record")
elif choice == 2:
    print("Action: View Student Details")
elif choice == 3:
    print("Action: Delete Student Record")
else:
    print("Action: Invalid Menu Choice")
```
**Output:**
```
Action: View Student Details
```

---

## 33. Combining Conditions with Logical Operators

```python
age = 25
salary = 30000

if age >= 18 and salary >= 25000:
    print("Loan Approved")
else:
    print("Loan Rejected")
```
**Output:**
```
Loan Approved
```

---

## 34. Conditionals Inside Loops

Iterate over a collection and apply branching decisions to each item:

```python
marks = [80, 35, 90]

for mark in marks:
    if mark >= 90:
        print(f"{mark}: Excellent")
    elif mark >= 40:
        print(f"{mark}: Pass")
    else:
        print(f"{mark}: Fail")
```
**Output:**
```
80: Pass
35: Fail
90: Excellent
```

---

## 35. Pure Functions with Conditional Returns

Encapsulate decision logic within functions for testability and reusability:

```python
def classify_grade(mark):
    if mark >= 90:
        return "A+"
    elif mark >= 80:
        return "A"
    elif mark >= 70:
        return "B"
    elif mark >= 40:
        return "Pass"
    else:
        return "Fail"

student_result = classify_grade(85)
print("Student Result:", student_result)
```
**Output:**
```
Student Result: A
```

---

## 36. Common Beginner Traps & How to Avoid Them

### Trap 1: Independent `if` statements instead of `elif`
```python
# BUGGY CODE:
mark = 95
if mark >= 40:
    print("Pass")
if mark >= 90:
    print("Excellent")
```
**Output:**
```
Pass
Excellent
```
> **Explanation:** Because both are independent `if` statements, Python evaluates BOTH. If you want mutually exclusive categories, use `if-elif-else`.

### Trap 2: Incorrect Condition Ordering
```python
# BUGGY CODE:
mark = 95
if mark >= 40:
    print("Pass")
elif mark >= 90:
    print("Excellent")
```
`95 >= 40` evaluates to `True`, so `"Pass"` is printed and the chain stops. Always order conditions from highest threshold to lowest!

### Trap 3: Inconsistent Indentation in Nested Blocks
```python
# SYNTAX ERROR / LOGICAL BUG:
if age >= 18:
    if mark >= 50:
    print("Pass")  # IndentationError!
```
Every nested level must be indented with consistent whitespace (typically 4 spaces).

### Trap 4: Putting a Condition on `else`
```python
# SYNTAX ERROR:
else age < 18:  # SyntaxError! else never takes a condition
```
An `else` block serves as the default fallback and **never takes a condition**.

---

## 37. Quick Student Workout

### Workout 1
```python
mark = 35
if mark >= 40:
    print("Pass")
else:
    print("Fail")
```
*Answer:* `Fail`

### Workout 2
```python
number = 0
if number > 0:
    print("Positive")
elif number < 0:
    print("Negative")
else:
    print("Zero")
```
*Answer:* `Zero`

### Workout 3
```python
mark = 95
if mark >= 90:
    print("A")
elif mark >= 75:
    print("B")
else:
    print("C")
```
*Answer:* `A`

### Workout 4
```python
age = 20
if age >= 18:
    if age >= 21:
        print("21+")
    else:
        print("18-20")
else:
    print("Minor")
```
*Answer:* `18-20`

### Workout 5
```python
x = 10
if x > 5:
    print("Alpha")
else:
    print("Beta")
```
*Answer:* `Alpha`

---

## 38. Unit-II Day 2 Cheat Sheet

| Keyword / Pattern | Behavior | Example |
| --- | --- | --- |
| **`if condition:`** | Executes only if condition is `True` | `if x > 0: print("Positive")` |
| **`else:`** | Fallback when preceding conditions are `False` | `else: print("Non-positive")` |
| **`elif condition:`** | Tested only if previous conditions were `False` | `elif x == 0: print("Zero")` |
| **First True Match** | Halts evaluation of subsequent `elif`/`else` branches | Order from specific to general |
| **Nested `if`** | Evaluates secondary condition inside a parent branch | `if logged_in: if is_admin:` |
| **Logical `and`** | Requires both operands to be `True` | `if age >= 18 and score >= 50:` |
| **Logical `or`** | Requires at least one operand to be `True` | `if is_admin or is_moderator:` |

---

## 39. Decision Framework for Conditional Statements

```text
                  How many possible outcomes?
                               │
               ┌───────────────┴───────────────┐
               ▼                               ▼
            [ TWO ]                        [ MANY ]
               │                               │
         Use `if-else`                  Use `if-elif-else`

           Does the second decision depend on the first?
                               │
                             [YES]
                               │
                      Use a Nested `if`
```

---

## 40. Day 2 Capstone Challenge

Predict the output of this code before running it:

```python
age = 22
mark = 85

if age >= 18:
    if mark >= 90:
        print("Excellent")
    elif mark >= 75:
        print("Good")
    else:
        print("Average")
else:
    print("Not Eligible")
```

### Execution Step-by-Step
1. `age = 22` $\rightarrow$ `age >= 18` is `True`. Enters outer `if` block.
2. `mark = 85` $\rightarrow$ `mark >= 90` is `False`. Moves to `elif`.
3. `mark >= 75` $\rightarrow$ `85 >= 75` is `True`.
4. Executes `print("Good")`.
5. Exits conditional construct completely.

**Final Output:**
```
Good
```

> **Takeaway:** Mastering `if-else`, `if-elif-else`, and nested conditions unlocks the power of dynamic decision-making in Python programs!
