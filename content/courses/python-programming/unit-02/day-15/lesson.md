# Unit–II — Day 3: Iteration, Loop State & while Loop

**Duration:** 90 Minutes  
**Level:** Beginner  
**Unit:** Unit–II — Control Flow  
**Day:** 3  
**Topics:** Iteration and Loops; Loop State; `while` Loop; Loop Control; Illustrative Programs  

---

## 1. Day 3 Learning Objectives

By the end of this session, students should be able to:
- Explain what **iteration** means in computer programming and daily life.
- Understand why loops are essential to eliminate redundant code and automate repetitive tasks.
- Identify the three core structural pillars of every loop: **Initialization, Condition, and Update**.
- Track and trace **loop state** changes across iterations using dry-run tracing tables.
- Write robust, correct `while` loops that evaluate conditions dynamically.
- Understand the causes of **infinite loops** and how to rigorously prevent them.
- Apply loop control statements: **`break`** (immediate termination) and **`continue`** (skip to next cycle).
- Implement the **sentinel value pattern** for condition-controlled input streams.
- Traverse and modify list collections using index-based `while` iterations.
- Combine loops with conditional branching (`if`) and running accumulators (`sum`, `count`).

---

## 2. 90-Minute Session Plan

| Time | Topic | Activity |
| --- | --- | --- |
| 0–5 min | Day 2 recap | Review `if`, `if-else`, `if-elif-else`, and nested conditions |
| 5–15 min | Iteration | Why do programs need to repeat instructions? |
| 15–25 min | Loops | Repetition constructs and control flow loops |
| 25–40 min | Loop state | The trinity: Initialization, Condition, Update |
| 40–55 min | `while` loop | Syntax, mechanics, and step-by-step trace |
| 55–65 min | Loop control | Altering iteration flow with `break` and `continue` |
| 65–75 min | Illustrative programs | Real-world loops (ATM menus, countdowns, sentinels) |
| 75–80 min | Debugging | Identifying infinite loops & condition traps |
| 80–87 min | Moodle practice | Number Sum Until Zero coding challenge |
| 87–90 min | Quiz | 10-question mastery assessment |

---

## 3. Quick Recap from Day 2

In Day 2, we learned how programs make decisions using branching:

```python
age = 20

if age >= 18:
    print("Adult")
else:
    print("Minor")
```

The `if` statement selects **which** code path to execute.

Now consider another fundamental computational challenge:
**What if a block of code needs to run 10 times, 1,000 times, or until a specific event happens?**

Without loops, printing `"Hello"` 10 times would require manual duplication:
```python
print("Hello")
print("Hello")
print("Hello")
# ... 7 more lines
```
This approach is tedious, prone to human error, and impossible when the number of repetitions is unknown beforehand (e.g., waiting for a user to enter the correct PIN).

This is why programming languages provide **loops**.

---

## 4. What is Iteration?

**Iteration** is the process of repeatedly executing a set of computational instructions until a specific termination condition is satisfied.

```text
       Start
         │
         ▼
 ┌───────────────┐
 │ Execute Code  │◄────────┐
 └───────┬───────┘         │
         ▼                 │ Repeat
   Check Condition ──[True]┘
         │
      [False]
         │
         ▼
        Stop
```

A **loop** is the programming construct used to implement iteration.

---

## 5. Real-World Examples of Iteration

Iteration is present across software architectures:

- **ATM PIN Verification:** Repeatedly prompts the user for a security PIN until the correct one is entered or maximum attempts are exceeded.
- **Game Engine Main Loop:** Continually captures player inputs, updates physics simulations, evaluates collision states, and renders frames at 60 FPS.
- **Batch Processing / Attendance:** Processes student records one by one until all students in the database are accounted for.
- **Sensor Polling:** Reads temperature data from a hardware sensor every second indefinitely.

---

## 6. What is a Loop?

A loop repeatedly executes a block of code while a boolean condition remains `True`.

Python provides two primary loop constructs:
1. **`for` loop:** Typically used for definite iteration over a known sequence or collection.
2. **`while` loop:** Typically used for indefinite iteration that continues as long as a boolean expression remains `True`.

Today, we focus on the **`while` loop**.

---

## 7. When Do We Use a `while` Loop?

Use a `while` loop whenever an action should repeat **while a condition holds true**.

```python
count = 1

while count <= 5:
    print(count)
    count += 1
```
**Output:**
```
1
2
3
4
5
```

---

## 8. Basic `while` Loop Syntax

```python
while condition:
    # loop body (executed as long as condition evaluates to True)
```

Every properly designed `while` loop incorporates three vital components:
```text
1. Initialization  ──► Set starting variable before the loop
2. Condition       ──► Evaluated before each cycle; True keeps going
3. Update          ──► Modifies the variable toward loop termination
```

---

## 9. Understanding Loop State

The **loop state** comprises all variables whose values change during the execution of the loop.

For this counter loop:
```python
count = 1

while count <= 5:
    print(count)
    count += 1
```

The loop state is tracked by the variable `count`:
```text
Iteration 1: count = 1 (1 <= 5 is True)  ──► Prints 1 ──► count becomes 2
Iteration 2: count = 2 (2 <= 5 is True)  ──► Prints 2 ──► count becomes 3
Iteration 3: count = 3 (3 <= 5 is True)  ──► Prints 3 ──► count becomes 4
Iteration 4: count = 4 (4 <= 5 is True)  ──► Prints 4 ──► count becomes 5
Iteration 5: count = 5 (5 <= 5 is True)  ──► Prints 5 ──► count becomes 6
Iteration 6: count = 6 (6 <= 5 is False) ──► Loop Terminates!
```

---

## 10. The Three Essential Parts of a `while` Loop

```python
# 1. INITIALIZATION: Give the loop variable a starting value
count = 1

# 2. CONDITION: Boolean check performed BEFORE every iteration
while count <= 5:
    print("Working...")
    
    # 3. UPDATE: Progressively advance state toward termination
    count += 1
```

> **Memory Rule:** **Start** (Init) $\rightarrow$ **Check** (Condition) $\rightarrow$ **Work** (Body) $\rightarrow$ **Update** (Increment/Decrement) $\rightarrow$ **Repeat**.

---

## 11. First `while` Loop Step-by-Step

```python
count = 1

while count <= 3:
    print("Hello")
    count += 1
```
**Output:**
```
Hello
Hello
Hello
```

```text
Cycle 1: count=1; 1 <= 3 is True  ──► Print Hello ──► count=2
Cycle 2: count=2; 2 <= 3 is True  ──► Print Hello ──► count=3
Cycle 3: count=3; 3 <= 3 is True  ──► Print Hello ──► count=4
Cycle 4: count=4; 4 <= 3 is False ──► Exit Loop
```

---

## 12. Why Is the Update Step Critical?

Consider what happens if you omit the update statement:

```python
count = 1

while count <= 5:
    print(count)
    # Missing: count += 1!
```

Because `count` remains permanently fixed at `1`, the condition `1 <= 5` will **always** be `True`. Python will print `1` forever without stopping.

This failure state is called an **Infinite Loop**.

---

## 13. Infinite Loops

An infinite loop is a loop that never satisfies its termination condition.

```python
# Deliberate infinite loop (often paired with break)
while True:
    print("Running...")

# Accidental infinite loop (forgotten update)
i = 10
while i > 0:
    print(i)
    # Forgot: i -= 1
```

---

## 14. How to Prevent Infinite Loops

Before executing any `while` loop, verify these 4 defensive questions:

1. **What variable controls this loop?**
2. **What condition must become `False` to exit?**
3. **Does the loop body modify that variable during every cycle?**
4. **Is the modification progressing *toward* the termination condition, not away from it?**

---

## 15. Loop State Tracing Table

A **dry-run tracing table** helps visualize variable transitions and spot bugs:

```python
count = 1

while count <= 3:
    print(count)
    count += 1
```

| Iteration | `count` (Before) | Condition (`count <= 3`) | Console Output | `count` (After `+= 1`) |
| :---: | :---: | :---: | :---: | :---: |
| **1** | `1` | `1 <= 3` $\rightarrow$ `True` | `1` | `2` |
| **2** | `2` | `2 <= 3` $\rightarrow$ `True` | `2` | `3` |
| **3** | `3` | `3 <= 3` $\rightarrow$ `True` | `3` | `4` |
| **4** | `4` | `4 <= 3` $\rightarrow$ `False` | *(None)* | **Terminated** |

---

## 16. Incrementing and Decrementing

### Counting Up (1 to 5)
```python
number = 1
while number <= 5:
    print(number)
    number += 1
```

### Counting Down (5 to 1)
```python
number = 5
while number >= 1:
    print(number)
    number -= 1
```

---

## 17. Operators: Increment (`+=`) and Decrement (`-=`)

- **Increment:** `count += 1` is shorthand for `count = count + 1`.
- **Decrement:** `count -= 1` is shorthand for `count = count - 1`.

You can also use arbitrary step sizes:
```python
# Count even numbers by step 2
num = 2
while num <= 10:
    print(num)
    num += 2
```

---

## 18. Indefinite Iteration with User Input

When the number of iterations depends entirely on dynamic runtime events (like user input), `while` loops excel:

```python
password = ""

while password != "python123":
    password = input("Enter password: ")

print("Login successful!")
```

```text
Enter password: abc       (Incorrect -> Loop continues)
Enter password: pass1     (Incorrect -> Loop continues)
Enter password: python123 (Correct -> Condition becomes False -> Loop exits)
```

---

## 19. Combining `while` Loops with `if` Statements

You can nest conditional decisions inside loop bodies:

```python
number = 1

while number <= 10:
    if number % 2 == 0:
        print(number, "is Even")
    number += 1
```
**Output:**
```
2 is Even
4 is Even
6 is Even
8 is Even
10 is Even
```

---

## 20. Running Accumulator: Calculating Sums

An **accumulator** is a variable initialized outside the loop that gathers values cycle by cycle:

```python
number = 1
total = 0

while number <= 5:
    total += number
    number += 1

print("Total Sum:", total)
# Total Sum: 15 (1 + 2 + 3 + 4 + 5)
```

---

## 21. Running Counters: Counting Specific Events

A **counter** tallies how many times an event occurs:

```python
count = 0
number = 1

while number <= 10:
    if number % 2 == 0:
        count += 1
    number += 1

print("Total Even Numbers:", count)
# Total Even Numbers: 5
```

---

## 22. Traversing Lists with Indexes

You can traverse list elements using index tracking:

```python
fruits = ["apple", "banana", "cherry", "date"]
i = 0

while i < len(fruits):
    print(f"Index {i}: {fruits[i]}")
    i += 1
```
**Output:**
```
Index 0: apple
Index 1: banana
Index 2: cherry
Index 3: date
```

---

## 23. `while` Loop vs `for` Loop

| Feature | `for` Loop | `while` Loop |
| --- | --- | --- |
| **Typical Use** | Definite iteration over sequences | Indefinite iteration based on conditions |
| **State Management** | Automatic index/element traversal | Manually initialized, checked, and updated |
| **When to use?** | When the collection or range is known | When repetitions depend on external conditions |
| **Syntax Style** | `for item in items:` | `while condition:` |

---

## 24. Loop Control Statements: `break` and `continue`

Python provides two statements to alter the natural iteration flow:
- **`break`**: Immediately terminates the entire loop.
- **`continue`**: Skips the remaining statements in the current iteration and jumps directly to the condition re-check.

---

## 25. The `break` Statement

`break` forces an immediate exit from the innermost enclosing loop:

```python
number = 1

while number <= 10:
    if number == 5:
        print("Encountered 5! Breaking out...")
        break
    print(number)
    number += 1

print("Loop finished.")
```
**Output:**
```
1
2
3
4
Encountered 5! Breaking out...
Loop finished.
```

---

## 26. Visualizing `break`

```text
       Start Cycle
           │
     Condition True?
           │
       Do Tasks
           │
      Break condition?
        /          \
     [Yes]        [No]
       │            │
    TERMINATE    Continue loop
   (Exit Loop)
```

---

## 27. The `continue` Statement

`continue` cancels the rest of the current iteration, skipping any remaining statements and jumping straight to the next condition check:

```python
number = 0

while number < 5:
    number += 1
    if number == 3:
        continue  # Skips print(3)
    print(number)
```
**Output:**
```
1
2
4
5
```

---

## 28. `break` vs `continue` Summary

| Feature | `break` | `continue` |
| --- | --- | --- |
| **Action** | **STOPS** the loop completely | **SKIPS** the rest of the current pass |
| **Next Step** | First statement outside the loop | Loop condition evaluation for next cycle |
| **Analogy** | Pulling an emergency brake | Hitting the skip button on a playlist |

---

## 29. Critical Warning: `continue` and Variable Updates

When using `continue` inside a `while` loop, ensure the loop state is updated **before** the `continue` statement executes. Otherwise, the update will be bypassed, causing an infinite loop:

```python
# DANGEROUS PATTERN (Infinite Loop on 3):
number = 1
while number <= 5:
    if number == 3:
        continue  # number += 1 is never reached; loops forever!
    number += 1

# SAFE PATTERN:
number = 0
while number < 5:
    number += 1
    if number == 3:
        continue
    print(number)
```

---

## 30. Illustrative Program: Rocket Launch Countdown

```python
count = 5

while count > 0:
    print(f"T-minus {count}...")
    count -= 1

print("Blast off! 🚀")
```

---

## 31. Illustrative Program: Secret Number Guessing

```python
secret = 7
guess = 0

while guess != secret:
    guess = int(input("Guess the secret number (1-10): "))

print("Congratulations! You guessed it!")
```

---

## 32. Illustrative Program: Terminal ATM Menu

```python
choice = 0

while choice != 4:
    print("\n--- ATM Menu ---")
    print("1. Check Balance\n2. Deposit Funds\n3. Withdraw Cash\n4. Exit")
    choice = int(input("Select option (1-4): "))

    if choice == 1:
        print("Current Balance: ₹15,000")
    elif choice == 2:
        print("Deposit processed.")
    elif choice == 3:
        print("Withdrawal processed.")
    elif choice == 4:
        print("Thank you for banking with us!")
    else:
        print("Invalid choice. Please retry.")
```

---

## 33. The Sentinel Value Pattern

A **sentinel value** is a predetermined marker (such as `0`, `-1`, or `"exit"`) used to signal the end of input or data processing:

```python
total = 0
number = int(input("Enter number (negative to stop): "))

while number >= 0:
    total += number
    number = int(input("Enter number (negative to stop): "))

print("Total:", total)
```

---

## 34. In-Place List Mutation with `while`

```python
scores = [10, 20, 30]
i = 0

while i < len(scores):
    scores[i] += 5
    i += 1

print("Updated Scores:", scores)
# [15, 25, 35]
```

---

## 35. Common Beginner Pitfalls

### Pitfall 1: Forgetting initialization
```python
# NameError: name 'count' is not defined
while count <= 5:
    print(count)
    count += 1
```

### Pitfall 2: Off-by-one list bounds error
```python
numbers = [10, 20, 30]
i = 0
# BUG: using <= instead of <
while i <= len(numbers):  # IndexError: list index out of range!
    print(numbers[i])
    i += 1
```
> **Rule:** For a list of length $n$, valid indexes run from $0$ to $n-1$. Always write `while i < len(lst):`.

### Pitfall 3: Inverted termination conditions
```python
count = 1
while count >= 5:  # False on line 1! Loop body never executes.
    print(count)
    count += 1
```

---

## 36. Quick Student Workout

### Workout 1
```python
count = 1
while count <= 3:
    print(count)
    count += 1
```
*Answer:* `1`, `2`, `3`

### Workout 2
```python
count = 5
while count >= 1:
    print(count)
    count -= 1
```
*Answer:* `5`, `4`, `3`, `2`, `1`

### Workout 3
```python
number = 1
while number <= 5:
    if number == 3:
        break
    print(number)
    number += 1
```
*Answer:* `1`, `2`

### Workout 4
```python
number = 0
while number < 5:
    number += 1
    if number == 3:
        continue
    print(number)
```
*Answer:* `1`, `2`, `4`, `5`

---

## 37. Unit-II Day 3 Cheat Sheet

| Concept | Syntax Example | Key Role |
| --- | --- | --- |
| **`while condition:`** | `while i < 10:` | Repeat block as long as condition evaluates to `True` |
| **`break`** | `if done: break` | Prematurely terminate the loop immediately |
| **`continue`** | `if skip: continue` | Bypass remaining statements and start next iteration |
| **Accumulator** | `total += val` | Aggregate data cycle by cycle |
| **Counter** | `count += 1` | Track frequency or passes |
| **Sentinel Value** | `while val != 0:` | Special sentinel marker signaling loop termination |
| **Bounds Guard** | `while i < len(arr):` | Safe index-based sequence traversal |

---

## 38. Day 3 Capstone Challenge

Trace the code and predict the final output:

```python
number = 1
total = 0

while number <= 5:
    if number % 2 == 0:
        total += number
    number += 1

print("Total:", total)
```

### Dry Run
- `number = 1`: Odd $\rightarrow$ skipped $\rightarrow$ `number = 2`
- `number = 2`: Even $\rightarrow$ `total = 2` $\rightarrow$ `number = 3`
- `number = 3`: Odd $\rightarrow$ skipped $\rightarrow$ `number = 4`
- `number = 4`: Even $\rightarrow$ `total = 2 + 4 = 6` $\rightarrow$ `number = 5`
- `number = 5`: Odd $\rightarrow$ skipped $\rightarrow$ `number = 6`
- `number = 6`: `6 <= 5` is `False` $\rightarrow$ Loop exits.

**Output:**
```
Total: 6
```

> **Takeaway:** Loops empower your code to execute millions of operations systematically. By mastering initialization, condition maintenance, and loop state progression, you can safely automate any iterative task!
