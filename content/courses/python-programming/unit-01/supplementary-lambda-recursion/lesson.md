# Python Programming — Lambda Functions and Recursion

## Course: 19AI301 – Python Programming (Special Enrichment Masterclass)

> [!NOTE]
> **Supplementary Enrichment Module**: This lesson provides advanced mastery on **Lambda Functions (Anonymous Single-Line Expressions)** and **Recursion (Self-Calling Functions with Call Stack Tracking)**. It directly complements Unit 1 (Functions & Expressions) and bridges concepts into Unit 2 (Control Flow & Functional Decomposition).

### Learning Objectives

By the end of this lesson, you will be able to:

- **Understand** what a lambda function is and why it is used in modern Python.
- **Identify** arguments, expressions, and automatic return values in a lambda function.
- **Write** lambda functions with zero, one, two, or multiple parameters.
- **Differentiate** between a normal `def` function and a `lambda` function.
- **Combine** lambda functions with higher-order functions like `map()`, `filter()`, and `sorted()`.
- **Master** recursion and visualize how a function repeatedly calls itself to solve smaller subproblems.
- **Identify and construct** the **base case** (stopping condition) and the **recursive case** (progress step).
- **Trace** recursive execution step by step on the **call stack**.
- **Write** robust recursive programs for common mathematical and string problems (Factorial, Fibonacci, GCD, Palindromes).
- **Diagnose and fix** common recursive bugs such as missing base cases, `RecursionError`, and infinite recursion loops.

---

# PART A — LAMBDA FUNCTIONS

## 1. What is a Lambda Function?

A **lambda function** is a small, anonymous function written in a single concise line.

It is called **anonymous** because it does not require a named identifier defined with the `def` keyword.

### Normal Function vs Equivalent Lambda

#### Normal Function (`def`)
```python
def square(x):
    return x * x

print(square(5))
```
**Output:**
```text
25
```

#### Equivalent Lambda Function
```python
square = lambda x: x * x

print(square(5))
```
**Output:**
```text
25
```

> [!TIP]
> The lambda function performs the exact same calculation as `def square(x)`, but in a compact, single-line expression without boilerplate!

---

## 2. Basic Syntax of Lambda

The general syntax of a lambda function is:

```python
lambda arguments: expression
```

There are three essential components:

```text
lambda arguments : expression
       ↑           ↑
    inputs      calculation
```

### Example Breakdown

```python
double = lambda x: x * 2
print(double(10))
```

| Component | Meaning in Python |
| :--- | :--- |
| `lambda` | Built-in keyword used to instantiate an anonymous function |
| `x` | Input parameter(s) / argument(s) |
| `:` | Colon separator between arguments and the expression |
| `x * 2` | Single expression evaluated by Python |
| **Return** | The result of `x * 2` is **automatically returned** |

> [!IMPORTANT]
> A lambda function **always automatically returns the evaluated result of its expression**. You do NOT write the `return` keyword inside a lambda expression.

---

## 3. What is an Expression?

An **expression** is any piece of code that Python can evaluate to produce a single concrete value.

### Examples of Valid Python Expressions:
```python
x + 10          # Arithmetic addition
x * y           # Multiplication
x ** 2          # Exponentiation
x > 10          # Boolean comparison
name.upper()    # Method call returning a new string
```

In a lambda function, the expression appears **immediately after the colon (`:`)**:

```python
# One parameter:
lambda x: x + 10

# Two parameters:
lambda a, b: a + b
```

---

## 4. What are Arguments?

Arguments (or parameters) are the input variables that the lambda function receives when called.

```python
# 1 parameter (x)
lambda x: x * x

# 2 parameters (a, b)
lambda a, b: a + b

# 3 parameters (a, b, c)
lambda a, b, c: a + b + c
```

---

## 5. How Many Arguments Can a Lambda Function Have?

A lambda function can accept **any number of arguments** (zero, one, two, or many):

### 1. Zero Arguments
```python
message = lambda: "Hello Python from ByteLab"
print(message())
```
**Output:**
```text
Hello Python from ByteLab
```

### 2. One Argument
```python
square = lambda x: x * x
print(square(6))
```
**Output:**
```text
36
```

### 3. Two Arguments
```python
add = lambda a, b: a + b
print(add(10, 20))
```
**Output:**
```text
30
```

### 4. Three Arguments
```python
total = lambda a, b, c: a + b + c
print(total(10, 20, 30))
```
**Output:**
```text
60
```

### 5. Multiple Arguments
```python
calculate = lambda a, b, c, d: a + b + c + d
print(calculate(1, 2, 3, 4))
```
**Output:**
```text
10
```

---

## 6. The Cardinal Rule of Lambda

> [!WARNING]
> **Many arguments are allowed, but ONLY ONE expression is allowed.**

A lambda function cannot contain multi-line statements, variable assignments, loops, or `return` keywords:

```python
# ❌ INVALID: SyntaxError!
lambda x:
    y = x * 2
    return y

# ✅ CORRECT: Single expression!
lambda x: x * 2
```

---

## 7. Guided Examples

### Example 1 — Square of a Number
```python
square = lambda x: x * x
number = 5
print("Square of 5:", square(number))
```
**Execution Trace:**
```text
square(5) → 5 * 5 → 25
```

---

### Example 2 — Add Two Numbers
```python
add = lambda a, b: a + b
x, y = 15, 25
print("Sum:", add(x, y))
```
**Output:**
```text
Sum: 40
```

---

### Example 3 — Check Even or Odd (Conditional Expression)
A lambda expression can contain a conditional expression (`value_if_true if condition else value_if_false`):

```python
check_even = lambda x: x % 2 == 0

print("Is 10 even?", check_even(10))
print("Is 7 even?", check_even(7))
```
**Output:**
```text
Is 10 even? True
Is 7 even? False
```

---

### Example 4 — Maximum of Two Numbers (Ternary Operator)
```python
largest = lambda a, b: a if a > b else b

print("Largest of 25 and 10:", largest(25, 10))
print("Largest of 15 and 30:", largest(15, 30))
```
**Output:**
```text
Largest of 25 and 10: 25
Largest of 15 and 30: 30
```

---

### Example 5 — String Transformations
```python
get_length = lambda word: len(word)
shout = lambda s: s.upper() + "!"

print(get_length("Python"))
print(shout("bytelab"))
```
**Output:**
```text
6
BYTELAB!
```

---

## 8. Higher-Order Functions with Lambda

Lambda functions shine when passed as arguments into built-in higher-order functions:

### 1. `map(function, iterable)` — Element-by-Element Transformation
Applies the lambda function to every element in a sequence.

```python
numbers = [1, 2, 3, 4, 5]
squares = list(map(lambda x: x * x, numbers))
print("Squared List:", squares)
```
**Output:**
```text
Squared List: [1, 4, 9, 16, 25]
```

---

### 2. `filter(function, iterable)` — Predicate Selection
Filters elements keeping only those where the lambda returns `True`.

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8]
evens = list(filter(lambda x: x % 2 == 0, numbers))
print("Even Numbers:", evens)
```
**Output:**
```text
Even Numbers: [2, 4, 6, 8]
```

---

### 3. `sorted(iterable, key=lambda)` — Custom Key Sorting
Sorts complex objects (e.g. tuples or dictionaries) by a specific attribute.

```python
students = [
    ("Arun", 85),
    ("Bala", 72),
    ("Charan", 95),
    ("David", 80)
]

# Sort by marks (index 1 of tuple)
sorted_students = sorted(students, key=lambda student: student[1])
print("Sorted by Marks:", sorted_students)
```
**Output:**
```text
Sorted by Marks: [('Bala', 72), ('David', 80), ('Arun', 85), ('Charan', 95)]
```

---

## 9. Comparison: Normal Function vs Lambda

| Feature | Normal Function (`def`) | Lambda Function (`lambda`) |
| :--- | :--- | :--- |
| **Keyword** | `def` | `lambda` |
| **Name** | Has an explicit function name | Anonymous (optional variable binding) |
| **Body Length** | Multiple lines and statements | Exactly **one expression** |
| **Return** | Explicit `return` statement | Implicit / automatic return |
| **Control Flow** | Loops, `if/else` blocks, try/except | Conditional ternary expressions only |
| **Best Used For** | Complex algorithms, reusable modules | Short callback functions in `map`, `filter`, `sorted` |

---

## 10. Common Lambda Mistakes

### Mistake 1: Forgetting the Colon (`:`)
```python
# ❌ SyntaxError:
lambda x x * 2

# ✅ Correct:
lambda x: x * 2
```

### Mistake 2: Writing `return` in the Expression
```python
# ❌ SyntaxError:
square = lambda x: return x * x

# ✅ Correct:
square = lambda x: x * x
```

### Mistake 3: Supplying the Wrong Number of Arguments
```python
add = lambda a, b: a + b
print(add(10))  # ❌ TypeError: missing 1 required positional argument: 'b'
print(add(10, 20)) # ✅ Correct: 30
```

---

# PART B — RECURSION

## 11. What is Recursion?

**Recursion** is a programming technique in which a function calls **itself** to solve a smaller subproblem of the exact same type.

> **Definition**: A recursive function solves a complex problem by breaking it down into smaller instances until a trivial **base case** is reached.

```text
Function Call
   ↓
Calls itself with smaller input
   ↓
Calls itself with smaller input
   ↓
Reaches Base Case (Stopping Condition)
   ↓
Returns results back up the chain!
```

---

## 12. Two Essential Pillars of Recursion

Every correctly structured recursive function must contain two essential parts:

1. **The Base Case**: The stopping condition that returns a direct answer without making any further recursive calls.
2. **The Recursive Case**: The branch where the function calls itself with a reduced or smaller input that moves closer to the base case.

```python
def recursive_function(n):
    # 1. Base Case (Stops Recursion)
    if n <= 0:
        return 0
    
    # 2. Recursive Case (Reduces Problem & Calls Self)
    return n + recursive_function(n - 1)
```

> [!CAUTION]
> If a recursive function is missing a base case, or if the input never reaches the base case, Python will exhaust memory and raise a **`RecursionError: maximum recursion depth exceeded`**.

---

## 13. Deep Dive: Factorial with Call Stack Trace

### Mathematical Definition:
```text
n! = n × (n - 1)!
0! = 1  (Base Case)
```

### Python Implementation:
```python
def factorial(n):
    # Base Case
    if n == 0:
        return 1
    
    # Recursive Case
    return n * factorial(n - 1)

print("5! =", factorial(5))
```
**Output:**
```text
5! = 120
```

### Step-by-Step Call Stack Visualization:

```text
--- [PHASE 1: WINDING DOWN THE CALL STACK] ---
factorial(5) calls 5 * factorial(4)
  factorial(4) calls 4 * factorial(3)
    factorial(3) calls 3 * factorial(2)
      factorial(2) calls 2 * factorial(1)
        factorial(1) calls 1 * factorial(0)
          factorial(0) reaches BASE CASE → returns 1

--- [PHASE 2: UNWINDING & RETURNING VALUES] ---
        factorial(1) receives 1 → returns 1 * 1 = 1
      factorial(2) receives 1 → returns 2 * 1 = 2
    factorial(3) receives 2 → returns 3 * 2 = 6
  factorial(4) receives 6 → returns 4 * 6 = 24
factorial(5) receives 24 → returns 5 * 24 = 120
```

---

## 14. Classic Recursive Algorithms

### 1. Sum of Natural Numbers
```python
def sum_natural(n):
    if n == 0:
        return 0
    return n + sum_natural(n - 1)

print("Sum 1 to 5:", sum_natural(5)) # 15
```

---

### 2. Fibonacci Sequence ($F(n) = F(n-1) + F(n-2)$)
```python
def fibonacci(n):
    # Base cases: F(0) = 0, F(1) = 1
    if n == 0:
        return 0
    if n == 1:
        return 1
    return fibonacci(n - 1) + fibonacci(n - 2)

print("7th Fibonacci Number:", fibonacci(7)) # 13
```

---

### 3. Exponentiation / Power Function ($base^{exp}$)
```python
def power(base, exponent):
    if exponent == 0:
        return 1
    return base * power(base, exponent - 1)

print("2^5 =", power(2, 5)) # 32
```

---

### 4. Recursive String Reversal
```python
def reverse_string(text):
    if text == "":
        return ""
    return reverse_string(text[1:]) + text[0]

print("Reverse of 'ByteLab':", reverse_string("ByteLab")) # baLetyB
```

---

### 5. Greatest Common Divisor (Euclidean Algorithm)
```python
def gcd(a, b):
    # Base Case: When remainder is 0
    if b == 0:
        return a
    # Recursive Case: Euclidean step
    return gcd(b, a % b)

print("GCD(48, 18) =", gcd(48, 18)) # 6
```

---

### 6. Recursive Palindrome Verification
```python
def is_palindrome(s):
    # Base Case: 0 or 1 character is always a palindrome
    if len(s) <= 1:
        return True
    # If edge characters don't match, not a palindrome
    if s[0] != s[-1]:
        return False
    # Check middle substring
    return is_palindrome(s[1:-1])

print("Is 'racecar' a palindrome?", is_palindrome("racecar")) # True
print("Is 'python' a palindrome?", is_palindrome("python"))   # False
```

---

## 15. Recursion vs Iteration

| Aspect | Recursion | Iteration (Loops) |
| :--- | :--- | :--- |
| **Mechanism** | Function repeatedly calls itself | `for` / `while` loop repeatedly executes body |
| **Termination** | Reaches the **Base Case** | Loop condition evaluates to `False` |
| **Memory** | Uses **Call Stack frames** ($O(N)$ stack memory) | Constant auxiliary memory ($O(1)$ stack) |
| **Performance** | Function call overhead | Direct CPU execution |
| **Ideal Scenarios** | Trees, graphs, divide & conquer, nested structures | Counting, linear collection traversal, accumulators |

---

## 16. The 5-Step Recursive Design Framework

When designing any recursive algorithm, systematically ask yourself:

1. **What is the simplest / smallest possible input?** $ightarrow$ Identifies the Base Case condition.
2. **What should the immediate answer be for that base input?** $ightarrow$ Identifies the return value (e.g. `0` for sum, `1` for factorial).
3. **How can the current problem be reduced to a smaller instance?** $ightarrow$ Identifies the recursive relation ($n-1$, $n // 10$, $s[1:]$).
4. **How do we combine the smaller result with the current step?** $ightarrow$ Forms the recursive return statement.
5. **Does every recursive call strictly move closer to the base case?** $ightarrow$ Guarantees termination and prevents `RecursionError`.

---

## 17. Classroom Debugging Exercises

### Debug Challenge 1: Faulty Factorial Base Case
```python
def factorial(n):
    if n == 0:
        return 0  # ❌ Bug: 0 * anything will result in 0!
    return n * factorial(n - 1)
```
**Fix:** Change base case return to `return 1` (because $0! = 1$).

---

### Debug Challenge 2: Infinite Countdown
```python
def countdown(n):
    if n == 0:
        return
    print(n)
    countdown(n + 1) # ❌ Bug: n increments away from 0!
```
**Fix:** Change recursive call to `countdown(n - 1)`.

---

## 18. Viva & Oral Exam Quick-Fire Revision

### Lambda
- **What is lambda?** An anonymous, single-expression function.
- **Why is it called anonymous?** It is created without an identifier binding via `def`.
- **Can lambda contain multiple statements?** No, strictly one expression.
- **Why use lambda with `map` and `filter`?** For clean, readable inline transformations without polluting global namespace.

### Recursion
- **What is a Base Case?** The stopping condition that terminates recursive calls.
- **What happens if the base case is omitted?** Python reaches its recursion limit and raises `RecursionError`.
- **Where are recursive frames stored?** On the Python execution **call stack** in memory.
- **What is the time complexity of naive recursive Fibonacci?** $O(2^n)$ exponential time.
