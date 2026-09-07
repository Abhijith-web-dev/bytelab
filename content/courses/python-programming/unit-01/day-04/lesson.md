# Day 4 — Python Operators: Assignment, Comparison, Logical, Identity, Membership & Bitwise Deep Dive

## 1. 🔄 Day 3 Quick Recap & Learning Objectives

### Quick Check
**Question 1:** What is the output?
```python
x = 10
y = 5
print(x + y * 2)
```
**Answer:** `20` (Multiplication `*` has higher precedence than addition `+`).

**Question 2:** What does `%` return?
```python
10 % 3
```
**Answer:** `1` (The modulus operator returns the remainder of integer division).

**Question 3:** What Python idiom swaps two variables in-place without a temporary variable?
```python
a, b = b, a
```
**Answer:** Tuple unpacking swaps `a` and `b` simultaneously.

---

### 🎯 Learning Objectives
By the end of this masterclass lesson, you will be able to:
- Understand how variables are manipulated and assigned using basic and compound assignment operators.
- Evaluate expressions using comparison and boolean logical operators with short-circuit evaluation.
- Differentiate between object identity (`is`) and value equality (`==`).
- Test collection membership using `in` and `not in`.
- **Master Bitwise Operations from First Principles**:
  - Understand binary bits, place values, and two's complement representation.
  - Convert between decimal and binary using Python built-ins (`bin()`, `int(..., 2)`).
  - Distinguish strictly between bitwise operators (`&`, `|`, `^`, `~`) and logical operators (`and`, `or`, `not`).
  - Compute and trace all 6 bitwise operators: `&` (AND), `|` (OR), `^` (XOR), `~` (NOT), `<<` (Left Shift), `>>` (Right Shift).
  - Predict outputs of complex bitwise expressions and understand two's complement inversion `~x = -(x + 1)`.
  - Apply bitwise operations to high-performance real-world computing problems: $O(1)$ parity checking, bitmask permissions, and fast $2^k$ scaling.

---

## 2. Assignment Operators

Assignment operators are used to assign a value to a variable or update the value of a variable.

### Basic Assignment `=`
```python
score = 100
```
This means: Store 100 in `score`. We can change it:
```python
score = 150
```

### Compound Assignment Operators
Instead of writing `score = score + 10`, Python allows:
```python
score += 10
```
Both mean: Add 10 to the current value of `score`.

| Operator | Example | Same As |
| :--- | :--- | :--- |
| `=` | `x = 10` | Assign 10 |
| `+=` | `x += 5` | `x = x + 5` |
| `-=` | `x -= 5` | `x = x - 5` |
| `*=` | `x *= 5` | `x = x * 5` |
| `/=` | `x /= 5` | `x = x / 5` |
| `//=` | `x //= 5` | `x = x // 5` |
| `%=` | `x %= 5` | `x = x % 5` |
| `**=` | `x **= 2` | `x = x ** 2` |

### Real-Time Example — Game Score
```python
score = 100

score += 50
score -= 20

print("Final Score:", score) # Output: Final Score: 130
```
> [!TIP]
> Assignment operators are useful when a value needs to be updated repeatedly.

---

## 3. Comparison Operators

Comparison operators are used to compare two values. The result is always a Boolean: `True` or `False`.

| Operator | Meaning | Example | Result |
| :--- | :--- | :--- | :--- |
| `==` | Equal to | `10 == 10` | `True` |
| `!=` | Not equal to | `10 != 5` | `True` |
| `>` | Greater than | `10 > 5` | `True` |
| `<` | Less than | `10 < 5` | `False` |
| `>=` | Greater than or equal to | `10 >= 10` | `True` |
| `<=` | Less than or equal to | `5 <= 10` | `True` |

> [!WARNING]
> Don't confuse `=` (assignment) with `==` (comparison).
> - `=` → Give a value (`age = 20`)
> - `==` → Ask whether values are equal (`age == 20`)

### Real-Time Example — Exam Eligibility
Suppose a student needs at least 40 marks to pass.
```python
mark = 75
print(mark >= 40) # Output: True

mark = 30
print(mark >= 40) # Output: False
```

---

## 4. Logical Operators

Sometimes one condition isn't enough (e.g., to log in to a website: Username must be correct AND password must be correct).

Python has three main logical operators: `and`, `or`, `not`

### `and`
Both conditions must be `True`.
```python
age = 20
has_id = True
print(age >= 18 and has_id == True) # Output: True
```

### `or`
At least one condition must be `True`.
```python
has_cash = False
has_card = True
print(has_cash or has_card) # Output: True
```

### `not`
Reverses the Boolean result.
```python
is_raining = False
print(not is_raining) # Output: True
```

### Real-Time Example — Login System
```python
correct_username = True
correct_password = True

login_success = correct_username and correct_password
print("Login Successful:", login_success) # Output: Login Successful: True
```

---

## 5. Identity Operators

Python has two identity operators: `is` and `is not`.
They check whether two references point to the same object.

> [!IMPORTANT]
> `==` → Do they contain equal values?
> `is` → Are they the same object?

```python
a = [1, 2, 3]
b = [1, 2, 3]

print(a == b) # Output: True
print(a is b) # Output: False
```

A very common use is checking `None`:
```python
result = None
print(result is None) # Output: True
```

---

## 6. Membership Operators

Membership operators check whether a value exists inside a collection (such as a list or string).
There are two: `in` and `not in`.

### Lists
```python
fruits = ["Apple", "Banana", "Mango"]
print("Apple" in fruits) # Output: True
print("Orange" not in fruits) # Output: True
```

### Strings
```python
email = "student@gmail.com"
print("@gmail.com" in email) # Output: True
```

---

## 7. Bitwise Operators

Here are practical examples using the numbers **5** (binary `0101`) and **3** (binary `0011`).

**Bitwise AND (`&`)**
Compares each bit. If both are `1`, the result is `1`.

```text
  0101  (5)
& 0011  (3)
  ----
  0001  (Result: 1)
```

**Bitwise OR (`|`)**
Compares each bit. If at least one is `1`, the result is `1`.

```text
  0101  (5)
| 0011  (3)
  ----
  0111  (Result: 7)
```

**Bitwise XOR (`^`)**
Compares each bit. If they are different, the result is `1`.

```text
  0101  (5)
^ 0011  (3)
  ----
  0110  (Result: 6)
```

**Bitwise NOT (`~`)**
Flips every bit of a single number.

```text
~ 0101  (5)
  ----
  1010  (Result: 10 in unsigned 4-bit)
```

*(Note: In most programming languages using 32-bit signed integers, `~5` actually outputs `-6` due to how negative numbers are stored using "Two's Complement".)*

**Left Shift (`<<`)**
Shifts all bits to the left by a specified number of spaces. Let's shift `5` left by `1` space (`5 << 1`).

```text
  0101  (5)
  ---- shift left 1 space, add a 0 to the right
  1010  (Result: 10)
```

**Right Shift (`>>`)**
Shifts all bits to the right. Let's shift `5` right by `1` space (`5 >> 1`).

```text
  0101  (5)
  ---- shift right 1 space, the rightmost 1 drops off
  0010  (Result: 2)
```

---

## 8. Master Summary & Interactive Challenge

### Operator Precedence Quick-Reference (Highest to Lowest)
1. `**` — Exponentiation
2. `~` — Bitwise Inversion
3. `*`, `/`, `//`, `%` — Multiplication, Division, Modulo
4. `+`, `-` — Addition, Subtraction
5. `<<`, `>>` — Bitwise Shift Operators
6. `&` — Bitwise AND
7. `^` — Bitwise XOR
8. `|` — Bitwise OR
9. `==`, `!=`, `<`, `<=`, `>`, `>=`, `is`, `is not`, `in`, `not in` — Comparisons & Membership
10. `not` — Logical NOT
11. `and` — Logical AND
12. `or` — Logical OR
13. `=`, `+=`, `-=`, `*=`, etc. — Assignments

---

### 🧩 Comprehensive Operator Challenge
Predict the console output of this multi-operator program:

```python
# 1. Assignment & Arithmetic
score = 40
score += 10          # score = 50

# 2. Bitwise operations
mask = 7             # binary: 0111
masked_val = (score & mask)  # 50 & 7 = 00110010 & 00000111 = 00000010 (2)
inverted = ~masked_val       # ~2 = -(2 + 1) = -3

# 3. Logical and Comparison
is_eligible = (score >= 50) and (masked_val == 2)

# 4. Bit Shift
shifted = masked_val << 3    # 2 << 3 = 2 * 8 = 16

print("Masked Value:", masked_val)
print("Inverted:", inverted)
print("Is Eligible:", is_eligible)
print("Shifted:", shifted)
```

#### Output Verification:
```text
Masked Value: 2
Inverted: -3
Is Eligible: True
Shifted: 16
```
