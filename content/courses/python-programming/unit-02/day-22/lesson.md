# Unit–II — Day 10: Illustrative Programs, Integration & Unit-II Revision

**Duration:** 90 Minutes  
**Level:** Beginner → Intermediate  
**Unit:** Unit–II — Control Flow, Functions, Recursion, Strings & Lists  
**Day:** 10  
**Topics Covered:** Square Root; GCD; Exponentiation; Sum of an Array of Numbers; Integration of Conditional statements, Loops, Functions, Strings, Lists; Problem-solving strategy; Unit-II revision; Integrated practice programs; Moodle coding practice; AI Agent guidance; Revision quiz; Final challenge  

---

## 1. Learning Objectives

By the end of this session, students should be able to:
- Write and optimize numerical algorithms:
  - **Square Root** calculation using both `math.sqrt()` and fractional exponentiation (`x ** 0.5`).
  - **Greatest Common Divisor (GCD)** using Euclidean recursive decomposition.
  - **Exponentiation ($x^n$)** using divide-and-conquer recursive relations.
- Perform robust sequence aggregations: computing the **sum, average, maximum, and minimum** of dynamic numeric arrays.
- Synthesize all Unit-II concepts—**functions, boolean conditions, iterative loops, strings, and mutable lists**—into unified, maintainable software pipelines.
- Apply architectural problem-solving heuristics: decomposing large, monolithic problem specifications into pure, single-responsibility helper functions.
- Implement robust validation against numerical edge cases ($0$, negative numbers, boundary indices, empty lists).
- Build menu-driven command-line interfaces that maintain application state across iterations.

---

## 2. 90-Minute Session Plan

| Time | Topic | Activity |
| --- | --- | --- |
| 0–10 min | Unit-II Recap | Connect concepts from Day 1 through Day 9 |
| 10–20 min | Square Root | Mathematical basis, `math.sqrt()`, and power operator |
| 20–32 min | GCD | Recursive Euclidean formulation and call stack dry run |
| 32–44 min | Exponentiation | Recursive call traces, stack depth, and base cases |
| 44–55 min | Array Summation | List accumulation, iterative reductions, and helper functions |
| 55–68 min | Multi-Paradigm Integration | Combining strings, lists, loops, conditionals, and functions |
| 68–78 min | Integrated Capstone | Developing the Student Performance Analyzer |
| 78–85 min | Unit-II Practice | Four structured integration challenges |
| 85–88 min | Revision Quiz | 10-question comprehensive Unit-II assessment |
| 88–90 min | Synthesis | Master cheat sheet and final architectural challenge |

---

## 3. Unit-II Comprehensive Revision Roadmap

Over the past 9 days, we built a complete foundational programming toolkit in Python:

```text
Day 1: Boolean logic, relational expressions & single-branch if
Day 2: Multi-way branching with if-else, if-elif-else, and nesting
Day 3: Indefinite iteration, loop states, and while loops
Day 4: Definite iteration with for loops, ranges, break, and continue
Day 5: Fruitful functions, parameter passing, return values vs print
Day 6: Scope isolation (local vs global) and function composition
Day 7: Recursive problem solving, base cases, and call stack frames
Day 8: Immutable text processing, indexing, slicing, and string methods
Day 9: The string module, lists as dynamic arrays, and numeric processing
Day 10: Grand Synthesis — Integrated Architecture & Capstone Systems
```

---

## 4. Illustrative Program 1: Square Root

The square root $\sqrt{x}$ of a non-negative real number $x$ is a number $y$ such that $y^2 = x$.

```text
√25 = 5   (since 5 × 5 = 25)
√64 = 8   (since 8 × 8 = 64)
```

### Approach A: Using Python's `math.sqrt()`
```python
import math

def calculate_square_root(number):
    if number < 0:
        return None  # Square roots of negative numbers are imaginary
    return math.sqrt(number)

val = float(input("Enter number: "))
res = calculate_square_root(val)
if res is None:
    print("Square root is not a real number")
else:
    print("Square root =", res)
```

### Approach B: Exponentiation Operator (`** 0.5`)
Because $\sqrt{x} = x^{1/2} = x^{0.5}$, we can compute roots directly without external libraries:
```python
def root_via_power(n):
    if n >= 0:
        return n ** 0.5
    return None
```

---

## 5. Illustrative Program 2: Greatest Common Divisor (GCD)

The **Euclidean algorithm** states that for two integers $a$ and $b$:
$$\gcd(a, b) = \gcd(b, a \bmod b) \quad \text{with base case} \quad \gcd(a, 0) = a$$

```python
def gcd(a, b):
    if b == 0:
        return a  # Base case
    return gcd(b, a % b)  # Recursive step

print("GCD(48, 18) =", gcd(48, 18))  # 6
```

### Execution Trace:
```text
gcd(48, 18) ──► gcd(18, 48 % 18 = 12)
            ──► gcd(12, 18 % 12 = 6)
            ──► gcd(6, 12 % 6 = 0)
            ──► 6 (b is 0, return a)
```

---

## 6. Illustrative Program 3: Recursive Exponentiation

Computing $base^{exponent}$ where $exponent \ge 0$:
$$base^n = base \times base^{n-1} \quad \text{with base case} \quad base^0 = 1$$

```python
def power(base, exponent):
    if exponent == 0:
        return 1
    return base * power(base, exponent - 1)

print("2^5 =", power(2, 5))  # 32
```

### Execution Trace ($2^4$):
```text
power(2, 4) = 2 * power(2, 3)
            = 2 * (2 * power(2, 2))
            = 2 * (2 * (2 * power(2, 1)))
            = 2 * (2 * (2 * (2 * power(2, 0))))
            = 2 * 2 * 2 * 2 * 1 = 16
```

---

## 7. Illustrative Program 4: Array Traversal and Accumulation

Calculating the sum of an array requires initializing an accumulator variable to $0$ and iteratively adding each item:

```python
def calculate_sum(numbers):
    total = 0
    for num in numbers:
        total += num
    return total

scores = [10, 20, 30, 40, 50]
print("Sum =", calculate_sum(scores))  # 150
```

---

## 8. Multi-Paradigm Integration: Why Modularity Matters

Real software systems do not consist of isolated commands. They are constructed by orchestrating multiple constructs together:

```text
User Input ──► Strings ──► Parsing ──► Numeric Lists
                                            │
                                            ▼
Results ◄── Display ◄── Conditions ◄── Functions & Algorithms
```

### Architectural Principles:
1. **Single Responsibility:** Each function performs one clear calculation.
2. **Pure Data Flow:** Pass arguments explicitly through parameters; return results directly rather than modifying global state.
3. **Composability:** Feed the return value of one function directly into another.

---

## 9. Integrated Application: Student Performance Analyzer

```python
def calculate_total(marks):
    total = 0
    for mark in marks:
        total += mark
    return total

def calculate_average(total, count):
    if count == 0:
        return 0.0
    return total / count

def find_highest(marks):
    highest = marks[0]
    for m in marks:
        if m > highest:
            highest = m
    return highest

def find_lowest(marks):
    lowest = marks[0]
    for m in marks:
        if m < lowest:
            lowest = m
    return lowest

def count_passed(marks):
    count = 0
    for m in marks:
        if m >= 40:
            count += 1
    return count

def get_result(marks):
    for m in marks:
        if m < 40:
            return "Fail"
    return "Pass"

# Driver Routine
name = input("Enter student name: ")
n = int(input("Enter number of subjects: "))

marks = []
for _ in range(n):
    marks.append(int(input("Enter mark: ")))

tot = calculate_total(marks)
avg = calculate_average(tot, len(marks))
high = find_highest(marks)
low = find_lowest(marks)
passed_subs = count_passed(marks)
res = get_result(marks)

print("\n===== STUDENT PERFORMANCE =====")
print("Name =", name)
print("Marks =", marks)
print("Total =", tot)
print("Average =", avg)
print("Highest =", high)
print("Lowest =", low)
print("Passed Subjects =", passed_subs)
print("Result =", res)
```

---

## 10. Menu-Driven System Architecture

Menu-driven programs allow users to repeatedly interact with a suite of algorithms until explicitly choosing to exit:

```python
while True:
    print("\n===== PYTHON MATHEMATICAL TOOLBOX =====")
    print("1. Square Root")
    print("2. Greatest Common Divisor (GCD)")
    print("3. Power / Exponentiation")
    print("4. Array Sum")
    print("5. Exit")
    
    choice = input("Enter choice (1-5): ")
    
    if choice == "1":
        val = float(input("Enter number: "))
        print("Result =", val ** 0.5 if val >= 0 else "Invalid number")
    elif choice == "2":
        a = int(input("Enter a: "))
        b = int(input("Enter b: "))
        print("GCD =", gcd(a, b))
    elif choice == "3":
        b = int(input("Enter base: "))
        e = int(input("Enter exponent: "))
        print("Power =", power(b, e))
    elif choice == "4":
        arr = [int(x) for x in input("Enter space-separated numbers: ").split()]
        print("Sum =", sum(arr))
    elif choice == "5":
        print("Exiting tool. Goodbye!")
        break
    else:
        print("Invalid choice, please select 1-5.")
```

---

## 11. Unit-II Problem-Solving Formula

When approaching any non-trivial programming problem, follow this structured execution pipeline:

```text
               1. Read & Deconstruct Specification
                                ↓
               2. Map Inputs and Output Types
                                ↓
               3. Partition into Independent Sub-Tasks
                                ↓
               4. Select Appropriate Control Constructs
                 ├── Decisions: if / elif / else
                 ├── Repetitions: for / while / recursion
                 └── Containers: strings (text) / lists (data)
                                ↓
               5. Implement and Unit-Test Each Function
                                ↓
               6. Compose Functions into Main Execution Flow
                                ↓
               7. Validate Edge Cases (0, -ve, empty lists)
```

---

## 12. Unit-II Master Cheat Sheet

### Control Flow
```python
# Multi-branch decisions
if score >= 90:
    grade = 'A'
elif score >= 80:
    grade = 'B'
else:
    grade = 'C'

# Loops & Control
for item in sequence:
    if item == target:
        break     # Terminates loop immediately
    if item < 0:
        continue  # Skips to next iteration
```

### Functions & Recursion
```python
# Fruitful function with parameters and return
def compute_area(length, width):
    return length * width

# Recursive pattern
def recursive_step(n):
    if n <= 0:
        return 0  # Base case
    return n + recursive_step(n - 1)  # Recursive case
```

### Sequences: Strings vs Lists
| Property | String (`str`) | List (`list`) |
| :--- | :--- | :--- |
| **Mutability** | Immutable (Read-only) | Mutable (`nums[0] = 99`) |
| **Indexing** | `s[0]`, `s[-1]` | `lst[0]`, `lst[-1]` |
| **Slicing** | `s[1:4]`, `s[::-1]` | `lst[1:4]`, `lst[::-1]` |
| **Methods** | `upper()`, `split()`, `strip()` | `append()`, `pop()`, `remove()` |
| **Iteration** | `for ch in s:` | `for item in lst:` |

---

## 13. Unit-II Capstone Challenge

Build a modular **Student Grade & Analytics System** that:
1. Prompts for student records (name, ID, marks across 5 subjects).
2. Uses recursive functions to compute GCD and power metrics for weighting algorithms.
3. Cleans string inputs using `.strip()` and `.title()`.
4. Employs array traversals to compute statistical summaries (average, median, range).
5. Returns a structured textual transcript with pass/fail determinations.

> **Takeaway:** By breaking computational problems into modular functions and choosing the right combinations of conditions, loops, and sequences, you can build reliable, industrial-strength Python software!
