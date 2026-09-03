# Unit–II — Day 7: Recursion and Recursive Problem Solving

**Duration:** 90 Minutes  
**Level:** Beginner → Intermediate  
**Unit:** Unit–II — Control Flow, Functions & Problem Solving  
**Day:** 7  
**Topics Covered:** Recursion; Recursive Function Structure; Base Case and Recursive Case; How Recursion Works; Recursion vs Iteration; Recursive Problem Solving; GCD using Recursion; Exponentiation using Recursion; Common Recursion Mistakes; Practical Programs and Exercises  

---

## 1. Learning Objectives

By the end of this session, students should be able to:
- Explain what **recursion** means in computer science.
- Identify the anatomical structure of any recursive function.
- Explain the purpose and role of the **base case** and **recursive case**.
- Understand how successive recursive calls shrink problem space toward the base case.
- Trace recursive call execution through the Python runtime **call stack**.
- Write simple and elegant recursive functions from scratch.
- Implement the classical **Euclidean algorithm** for finding the Greatest Common Divisor (GCD).
- Implement recursive **exponentiation** (raising a base to an integer power).
- Understand memory and performance tradeoffs between recursion and iteration.
- Spot, diagnose, and fix common recursive bugs such as missing base cases, improper problem reduction, and `RecursionError`.

---

## 2. 90-Minute Session Plan

| Time | Topic | Activity |
| --- | --- | --- |
| 0–10 min | Recap | Functions, parameter binding, and fruitful `return` values |
| 10–25 min | Introduction to Recursion | Core concepts, nesting dolls analogy, and definition |
| 25–40 min | Recursive Function Structure | Base case (STOP) + Recursive case (SHRINK) |
| 40–50 min | Tracing Recursion | Call stack frames, push/pop mechanics, and unwinding |
| 50–60 min | Recursion vs Iteration | Memory consumption, readability, and performance tradeoffs |
| 60–70 min | GCD using Recursion | Euclidean algorithm and mathematical foundation |
| 70–80 min | Exponentiation using Recursion | Power calculation and recursive breakdown |
| 80–87 min | Student Workout | Step-by-step recursive challenges |
| 87–90 min | Quiz + Summary | Quick assessment and key takeaways |

---

## 3. Quick Recap from Day 6

In Day 6, we discovered how multiple functions communicate:

```python
def add(a, b):
    return a + b

result = add(10, 20)
print(result)
```

The fundamental takeaway was:
> **A function can call another function.**

**Recursion** takes this profound computational idea one step further:
> **A function can call itself!**

---

## 4. What is Recursion?

**Recursion** is a programming technique in which a function solves a computational problem by calling itself with progressively smaller inputs until a straightforward stopping point is reached.

### Classic Countdown Example
```python
def countdown(n):
    if n == 0:
        return
    print(n)
    countdown(n - 1)

countdown(5)
```
**Output:**
```
5
4
3
2
1
```

```text
countdown(5) ──► prints 5 ──► calls countdown(4)
countdown(4) ──► prints 4 ──► calls countdown(3)
countdown(3) ──► prints 3 ──► calls countdown(2)
countdown(2) ──► prints 2 ──► calls countdown(1)
countdown(1) ──► prints 1 ──► calls countdown(0)
countdown(0) ──► base case reached! STOP & RETURN
```

---

## 5. Real-World Analogy: Russian Nesting Dolls (Matryoshka)

Imagine opening a set of nested boxes or Russian dolls:
```text
Open Big Doll
     │
     ▼
Is there another doll inside?
     ├── Yes ──► Open the smaller doll (Recursive Case)
     │
     └── No  ──► Take the prize and finish! (Base Case)
```
- **The recursive case** is opening the next smaller doll inside.
- **The base case** is reaching the smallest solid doll with nothing inside.

---

## 6. The Two Vital Pillars of Recursion

Every correctly implemented recursive function must possess:

```text
                  Recursive Function
                         │
        ┌────────────────┴────────────────┐
        ▼                                 ▼
   1. Base Case                    2. Recursive Case
        │                                 │
  Stopping condition             Shrinks problem size
  Prevents infinite loops        Calls the function again
```

---

## 7. Basic Recursive Function Anatomy

```python
def recursive_function(parameters):
    # 1. BASE CASE: The simplest case solved without recursion
    if base_condition:
        return simple_result

    # 2. RECURSIVE CASE: Call itself with smaller input
    return recursive_function(smaller_input)
```

---

## 8. The Base Case (The Emergency Brake)

The **base case** is the non-recursive condition that halts the chain of execution. Without it, function calls would continue until system memory is exhausted.

```python
def count(n):
    if n == 0:  # BASE CASE: Stop when n hits 0
        return
    print(n)
    count(n - 1)
```

---

## 9. The Recursive Case (Moving Toward the Goal)

The **recursive case** divides the problem and invokes the function with an updated parameter.
In `count(n - 1)`, passing `n - 1` guarantees that starting from `5`, the argument systematically moves:
$$5 \rightarrow 4 \rightarrow 3 \rightarrow 2 \rightarrow 1 \rightarrow 0$$
Reaching $0$ triggers the base case and cleanly stops execution.

---

## 10. What Happens Without a Base Case?

Consider a function missing a stopping condition:
```python
def endless(n):
    print(n)
    endless(n - 1)

endless(5)
```

Python will push function call after function call onto memory:
$$5, 4, 3, 2, 1, 0, -1, -2, -3, \dots$$
Until the runtime limit is hit, resulting in:
```text
RecursionError: maximum recursion depth exceeded while calling a Python object
```
> **Golden Rule of Recursion:** Every recursive step **must** make progress toward the base case!

---

## 11. Call Order: Pre-Order vs Post-Order

### Counting Up (1 to 5)
Notice what happens when the print statement is placed **after** the recursive call:

```python
def print_numbers(n):
    if n == 0:
        return
    print_numbers(n - 1)  # Recursive call happens FIRST
    print(n)              # Print executes during call unwinding

print_numbers(5)
```
**Output:**
```
1
2
3
4
5
```

### Execution Trace
- `print_numbers(5)` calls `print_numbers(4)`
- `print_numbers(4)` calls `print_numbers(3)`
- `print_numbers(3)` calls `print_numbers(2)`
- `print_numbers(2)` calls `print_numbers(1)`
- `print_numbers(1)` calls `print_numbers(0)`
- `print_numbers(0)` hits base case and returns!
- Stack unwinds:
  - `print_numbers(1)` prints `1`
  - `print_numbers(2)` prints `2`
  - `print_numbers(3)` prints `3`
  - `print_numbers(4)` prints `4`
  - `print_numbers(5)` prints `5`

---

## 12. Understanding the Runtime Call Stack

When Python executes a function, it pushes an **activation frame** onto its internal **Call Stack**:

```text
┌─────────────────────────────────┐
│ print_numbers(0)  ──► Base Case │  ▲
├─────────────────────────────────┤  │
│ print_numbers(1)                │  │ Calls pushed onto stack
├─────────────────────────────────┤  │
│ print_numbers(2)                │  │
├─────────────────────────────────┤  │
│ print_numbers(3)                │  │
├─────────────────────────────────┤  │
│ print_numbers(4)                │  │
├─────────────────────────────────┤  │
│ print_numbers(5)                │  │
└─────────────────────────────────┘  ▼
```

Once `print_numbers(0)` returns, the frames are popped from top to bottom (LIFO: Last In, First Out).

---

## 13. Mathematical Induction: Factorial ($n!$)

The factorial of a non-negative integer $n$ is the product of all positive integers less than or equal to $n$:
$$5! = 5 \times 4 \times 3 \times 2 \times 1 = 120$$

Notice the recursive relationship:
$$5! = 5 \times 4!$$
$$4! = 4 \times 3!$$
$$3! = 3 \times 2!$$
$$2! = 2 \times 1!$$
$$1! = 1 \quad \text{and} \quad 0! = 1$$

In general:
$$n! = n \times (n - 1)! \quad \text{for } n > 1$$

### Python Implementation
```python
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print("5! =", factorial(5))
# Output: 5! = 120
```

---

## 14. Step-by-Step Unwinding of `factorial(5)`

```text
WINDING PHASE (Going Down):
factorial(5) = 5 * factorial(4)
                   │
                   ▼
             4 * factorial(3)
                   │
                   ▼
             3 * factorial(2)
                   │
                   ▼
             2 * factorial(1)
                   │
                   ▼
                   1 (Base case reached!)

UNWINDING PHASE (Returning Up):
factorial(1) = 1
factorial(2) = 2 * 1   = 2
factorial(3) = 3 * 2   = 6
factorial(4) = 4 * 6   = 24
factorial(5) = 5 * 24  = 120
```

---

## 15. Recursion vs Iteration: Architectural Comparison

| Dimension | Recursion | Iteration |
| :--- | :--- | :--- |
| **Core Mechanism** | Function repeatedly calls itself | Loop construct repeats block (`for`, `while`) |
| **Termination Guard** | Base case (`if condition: return`) | Boolean test evaluates to `False` |
| **Memory Footprint** | $O(N)$ stack memory for call frames | $O(1)$ constant memory overhead |
| **Execution Speed** | Slightly slower (frame overhead) | Faster (direct register/CPU looping) |
| **Best Used For** | Tree traversals, divide & conquer (Merge Sort), nested structures | Simple counting, accumulation, sequence scans |

---

## 16. Greatest Common Divisor (GCD)

The **Greatest Common Divisor** of two integers is the largest positive integer that divides both numbers without a remainder:
$$\text{GCD}(12, 8) = 4$$

### The Classical Euclidean Algorithm
Over 2,300 years ago, Euclid discovered that:
$$\text{GCD}(a, b) = \text{GCD}(b, a \pmod b)$$

The stopping point (base case) occurs when the remainder becomes $0$:
$$\text{if } b == 0 \implies \text{GCD} = a$$

### Python Implementation
```python
def gcd(a, b):
    if b == 0:
        return a
    return gcd(b, a % b)

print("GCD of 48 and 18:", gcd(48, 18))
# Output: GCD of 48 and 18: 6
```

### Trace of `gcd(48, 18)`
1. `48 % 18 = 12` $\implies$ `gcd(18, 12)`
2. `18 % 12 = 6` $\implies$ `gcd(12, 6)`
3. `12 % 6 = 0` $\implies$ `gcd(6, 0)`
4. `b == 0` is `True` $\implies$ returns `6`!

---

## 17. Exponentiation using Recursion

Exponentiation computes $a^n$ (base $a$ raised to exponent $n$):
$$2^4 = 2 \times 2 \times 2 \times 2 = 16$$

Mathematically:
$$a^n = a \times a^{n-1}$$
With the universal base case:
$$a^0 = 1 \quad (\text{any non-zero number to power } 0 \text{ is } 1)$$

### Python Implementation
```python
def power(base, exponent):
    if exponent == 0:
        return 1
    return base * power(base, exponent - 1)

print("2^5 =", power(2, 5))
# Output: 2^5 = 32
```

### Trace of `power(2, 4)`
```text
power(2, 4) = 2 * power(2, 3)
            = 2 * (2 * power(2, 2))
            = 2 * (2 * (2 * power(2, 1)))
            = 2 * (2 * (2 * (2 * power(2, 0))))
            = 2 * (2 * (2 * (2 * 1)))
            = 16
```

---

## 18. Comparison: GCD vs Exponentiation

| Feature | Euclidean GCD | Recursive Exponentiation |
| :--- | :--- | :--- |
| **Mathematical Goal** | Find highest common factor | Compute $a^n$ |
| **Base Case** | `if b == 0: return a` | `if exponent == 0: return 1` |
| **Recursive Step** | `return gcd(b, a % b)` | `return base * power(base, exp - 1)` |
| **Example Evaluation** | `gcd(48, 18) -> 6` | `power(2, 5) -> 32` |

---

## 19. Recursive Sum of First $N$ Natural Numbers

```python
def sum_numbers(n):
    if n == 0:
        return 0
    return n + sum_numbers(n - 1)

print("Sum 1..5:", sum_numbers(5))
# 5 + 4 + 3 + 2 + 1 + 0 = 15
```

---

## 20. Common Beginner Recursion Mistakes

### Mistake 1: Omitting the Base Case
```python
# Infinite recursion!
def bad_fac(n):
    return n * bad_fac(n - 1)
```

### Mistake 2: Failing to Shrink the Problem
```python
# Moves away from base case 0:
def bad_count(n):
    if n == 0: return
    bad_count(n + 1)  # 5, 6, 7, 8... never reaches 0!
```

### Mistake 3: Forgetting the `return` Keyword in Recursive Calls
```python
# BUG:
def power(base, exp):
    if exp == 0: return 1
    base * power(base, exp - 1)  # Computed, but returns None!
```

---

## 21. Quick Student Workout

### Workout 1: Countdown
```python
def countdown(n):
    if n == 0: return
    print(n)
    countdown(n - 1)

countdown(3)
```
*Answer:* `3`, `2`, `1`

### Workout 2: Factorial
What is `factorial(4)`?  
*Answer:* $4 \times 3 \times 2 \times 1 = 24$

### Workout 3: Exponentiation
What is `power(3, 3)`?  
*Answer:* $3 \times 3 \times 3 = 27$

### Workout 4: GCD
What is `gcd(12, 8)`?  
*Answer:* `4`

---

## 22. Unit-II Day 7 Cheat Sheet

| Algorithm | Base Case | Recursive Step |
| :--- | :--- | :--- |
| **Factorial** | `if n <= 1: return 1` | `return n * factorial(n - 1)` |
| **Power** | `if exp == 0: return 1` | `return base * power(base, exp - 1)` |
| **GCD** | `if b == 0: return a` | `return gcd(b, a % b)` |
| **Sum** | `if n == 0: return 0` | `return n + sum_numbers(n - 1)` |

---

## 23. Day 7 Final Challenge: Recursive Multi-Calculator

```python
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

def power(base, exp):
    if exp == 0:
        return 1
    return base * power(base, exp - 1)

def gcd(a, b):
    if b == 0:
        return a
    return gcd(b, a % b)

print("5! =", factorial(5))      # 120
print("2^4 =", power(2, 4))      # 16
print("GCD(48, 18) =", gcd(48, 18))  # 6
```

> **Takeaway:** Recursion is not magic—it is simply a function solving an atomic subproblem, trusting identical instances of itself to solve the rest, and combining the results on the return path!
