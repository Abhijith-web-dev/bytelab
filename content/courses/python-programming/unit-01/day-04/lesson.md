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

# 7. ⚡ Bitwise Operators: Complete Deep Dive

Bitwise operators manipulate data directly at the level of individual binary digits (**bits**). While arithmetic and logical operators treat numbers as whole quantities or booleans, bitwise operators inspect and transform the raw binary `1`s and `0`s in memory.

```text
+-------------------------------------------------------------------------+
|                  THE 6 PYTHON BITWISE OPERATORS                         |
+----------+--------------------+---------------------+-------------------+
| Operator | Name               | Syntax              | Bit-Level Action  |
+----------+--------------------+---------------------+-------------------+
|    &     | Bitwise AND        | a & b               | 1 if BOTH are 1   |
|    |     | Bitwise OR         | a | b               | 1 if EITHER is 1  |
|    ^     | Bitwise XOR        | a ^ b               | 1 if DIFFERENT    |
|    ~     | Bitwise NOT (Inv)  | ~a                  | Inverts all bits  |
|    <<    | Bitwise Left Shift | a << n              | Shift left by n   |
|    >>    | Bitwise Right Shift| a >> n              | Shift right by n  |
+----------+--------------------+---------------------+-------------------+
```

---

### A. How Integers Are Represented in Binary

Computers store integers in base-2 (binary). Each bit position represents a power of $2$:

$$\dots, 2^7=128,\; 2^6=64,\; 2^5=32,\; 2^4=16,\; 2^3=8,\; 2^2=4,\; 2^1=2,\; 2^0=1$$

#### Example: Representing Decimal `13` in 8-bit Binary
$$13 = 8 + 4 + 1 = (0 \times 128) + (0 \times 64) + (0 \times 32) + (0 \times 16) + (1 \times 8) + (1 \times 4) + (0 \times 2) + (1 \times 1)$$

$$\text{Binary: } \mathbf{00001101}_2$$

#### Python Built-in Binary Conversion Tools
Python provides native functions to inspect and convert binary representations:

```python
# 1. Decimal to Binary String (prefixed with '0b')
print(bin(13))       # '0b1101'
print(bin(5))        # '0b101'

# 2. Formatted 8-bit binary representation
print(f"{13:08b}")   # '00001101'
print(f"{5:08b}")    # '00000101'

# 3. Binary String back to Decimal
print(int("1101", 2))   # 13
print(int("0b1101", 2)) # 13
```

---

### B. Master Bitwise Truth Table

The fundamental truth table dictates how two bits $A$ and $B$ produce an output under each operation:

| Bit $A$ | Bit $B$ | AND ($A \ \& \ B$) | OR ($A \ \| \ B$) | XOR ($A \ \text{\textasciicircum} \ B$) | NOT ($\sim A$) |
| :---: | :---: | :---: | :---: | :---: | :---: |
| `0` | `0` | `0` | `0` | `0` | `1` |
| `0` | `1` | `0` | `1` | `1` | `1` |
| `1` | `0` | `0` | `1` | `1` | `0` |
| `1` | `1` | `1` | `1` | `0` | `0` |

---

### C. Detailed Walkthrough of All 6 Bitwise Operators

Let's evaluate $A = 12$ and $B = 10$:
- Binary of $A = 12$: `0000 1100`
- Binary of $B = 10$: `0000 1010`

---

#### 1. Bitwise AND (`&`)
Compares each bit of the first operand to the corresponding bit of the second operand. If **both** bits are `1`, the corresponding result bit is set to `1`. Otherwise, it is `0`.

```text
  Decimal 12:    0 0 0 0 1 1 0 0
& Decimal 10:    0 0 0 0 1 0 1 0
---------------------------------
  Result:        0 0 0 0 1 0 0 0  -->  (8 in decimal)
```

```python
a = 12
b = 10
result = a & b
print(f"{a} & {b} = {result}")  # Output: 12 & 10 = 8
```

---

#### 2. Bitwise OR (`|`)
Compares each bit. If **at least one** of the corresponding bits is `1`, the result bit is set to `1`. It only yields `0` if both bits are `0`.

```text
  Decimal 12:    0 0 0 0 1 1 0 0
| Decimal 10:    0 0 0 0 1 0 1 0
---------------------------------
  Result:        0 0 0 0 1 1 1 0  -->  (8 + 4 + 2 = 14 in decimal)
```

```python
a = 12
b = 10
result = a | b
print(f"{a} | {b} = {result}")  # Output: 12 | 10 = 14
```

---

#### 3. Bitwise XOR (`^`) — Exclusive OR
Compares each bit. If the two bits are **different** (`1` and `0`, or `0` and `1`), the result is `1`. If both bits are identical (`0` and `0`, or `1` and `1`), the result is `0`.

```text
  Decimal 12:    0 0 0 0 1 1 0 0
^ Decimal 10:    0 0 0 0 1 0 1 0
---------------------------------
  Result:        0 0 0 0 0 1 1 0  -->  (4 + 2 = 6 in decimal)
```

```python
a = 12
b = 10
result = a ^ b
print(f"{a} ^ {b} = {result}")  # Output: 12 ^ 10 = 6
```

> [!NOTE]
> **Key Mathematical Properties of XOR:**
> 1. Identity: $x \oplus 0 = x$
> 2. Self-Inverse: $x \oplus x = 0$
> 3. Commutative & Associative: $A \oplus B \oplus A = (A \oplus A) \oplus B = 0 \oplus B = B$

---

#### 4. Bitwise NOT (`~`) & Two's Complement Inversion
The bitwise NOT operator `~` inverts every bit (changing `1` to `0` and `0` to `1`).

In Python, integers are represented using **Two's Complement** arithmetic with arbitrary precision (no fixed 32-bit overflow limit). In Two's Complement:

$$\sim x = -(x + 1)$$

```text
Let's compute ~5:
  5 in binary (conceptually infinite leading 0s):  ...0000 0101
  Inverting all bits:                             ...1111 1010
  In Two's Complement, ...1111 1010 represents:   -(5 + 1) = -6
```

```python
print(~5)    # Output: -6
print(~0)    # Output: -1
print(~(-1)) # Output: 0
print(~10)   # Output: -11
print(~(-7)) # Output: 6
```

> [!IMPORTANT]
> **The Two's Complement Golden Rule:**
> To calculate `~x` mentally, simply add $1$ to $x$ and negate the sign:
> - $\sim 12 \rightarrow -(12 + 1) = \mathbf{-13}$
> - $\sim(-25) \rightarrow -(-25 + 1) = \mathbf{24}$

---

#### 5. Bitwise Left Shift (`<<`)
The bitwise left shift `x << n` moves all bits of `x` to the left by `n` positions. Zeros are appended to the right.

Each single left shift doubles the number (multiplies by $2$). Therefore, shifting by $n$ bits multiplies by $2^n$:

$$x \ll n = x \times 2^n$$

```text
Decimal 5 in binary:       0 0 0 0 0 1 0 1  (5)
5 << 1 (shift left 1):     0 0 0 0 1 0 1 0  (10  = 5 * 2^1)
5 << 2 (shift left 2):     0 0 0 1 0 1 0 0  (20  = 5 * 2^2)
5 << 3 (shift left 3):     0 0 1 0 1 0 0 0  (40  = 5 * 2^3)
```

```python
num = 5
print(num << 1)  # Output: 10
print(num << 2)  # Output: 20
print(num << 3)  # Output: 40
print(7 << 4)    # Output: 112 (7 * 16)
```

---

#### 6. Bitwise Right Shift (`>>`)
The bitwise right shift `x >> n` moves all bits of `x` to the right by `n` positions. The rightmost bits are discarded.

Each single right shift performs integer division by $2$ (flooring towards $-\infty$). Therefore, shifting by $n$ bits divides by $2^n$:

$$x \gg n = \lfloor x / 2^n \rfloor$$

```text
Decimal 40 in binary:      0 0 1 0 1 0 0 0  (40)
40 >> 1 (shift right 1):   0 0 0 1 0 1 0 0  (20  = 40 // 2^1)
40 >> 2 (shift right 2):   0 0 0 0 1 0 1 0  (10  = 40 // 2^2)
40 >> 3 (shift right 3):   0 0 0 0 0 1 0 1  (5   = 40 // 2^3)
```

```python
val = 40
print(val >> 1)  # Output: 20
print(val >> 2)  # Output: 10
print(val >> 3)  # Output: 5
print(25 >> 1)   # Output: 12 (25 // 2)
```

---

### D. Step-by-Step Bitwise Tracing Matrix

Let's trace a full execution matrix with $A = 29$ (`0001 1101`) and $B = 15$ (`0000 1111`):

| Operation | Expression | Binary Calculation | Binary Result | Decimal Result | Mathematical Meaning |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **AND** | `29 & 15` | `00011101 & 00001111` | `00001101` | `13` | Common active bits ($8+4+1$) |
| **OR** | `29 | 15` | `00011101 \| 00001111` | `00011111` | `31` | Union of active bits ($16+8+4+2+1$) |
| **XOR** | `29 ^ 15` | `00011101 ^ 00001111` | `00010010` | `18` | Bits differing between both ($16+2$) |
| **NOT** | `~29` | `~(...00011101)` | `...11100010` | `-30` | Inverted Two's complement ($-(29+1)$) |
| **Left Shift** | `29 << 2` | `00011101 << 2` | `01110100` | `116` | Multiplied by $2^2 = 4$ ($29 \times 4$) |
| **Right Shift** | `29 >> 2` | `00011101 >> 2` | `00000111` | `7` | Floor division by $2^2 = 4$ ($29 // 4$) |

---

### E. Bitwise vs Logical Operators: Crucial Differences

One of the most frequent errors in technical interviews is conflating bitwise operators (`&`, `|`, `~`) with logical operators (`and`, `or`, `not`):

| Aspect | Bitwise Operators (`&`, `\|`, `^`, `~`) | Logical Operators (`and`, `or`, `not`) |
| :--- | :--- | :--- |
| **Target Data** | Individual bits of integers | Boolean truthiness of expressions |
| **Evaluation Strategy** | **Eager**: Always evaluates all operands | **Short-circuiting**: Halts as early as possible |
| **Return Type** | Integer (computed bit pattern) | Original operand value or boolean |
| **Example with Integers** | `5 & 3` produces `1` (`0101 & 0011 = 0001`) | `5 and 3` produces `3` (truthy operand returned) |
| **Example with Booleans** | `True & False` produces `False` (eager) | `True and False` produces `False` (short-circuit) |

```python
# Illustrating the critical behavioral difference:
print(5 & 3)     # Output: 1  (Bitwise AND: 101 & 011 = 001)
print(5 and 3)   # Output: 3  (Logical AND: 5 is truthy, returns second operand 3)

print(5 | 3)     # Output: 7  (Bitwise OR: 101 | 011 = 111)
print(5 or 3)    # Output: 5  (Logical OR: 5 is truthy, short-circuits and returns 5)
```

---

### F. High-Performance Practical Applications of Bitwise Operators

Bitwise operations execute in a **single clock cycle** on CPU hardware, making them essential for high-performance systems programming, game development, cryptography, and network protocols.

#### 1. Fast Parity Check: Odd or Even in $O(1)$
In binary, any even number ends in `0` ($2^0$ bit is off), and any odd number ends in `1` ($2^0$ bit is on). Testing `n & 1` is significantly faster than calculating `n % 2 == 0`:

```python
def check_parity(n):
    if n & 1 == 0:
        return "Even"
    else:
        return "Odd"

print(check_parity(42))  # Even (42 & 1 == 0)
print(check_parity(79))  # Odd  (79 & 1 == 1)
```

#### 2. Fast Scaling by Powers of 2
```python
x = 25

# Multiply by 8 (2^3)
fast_mult = x << 3      # 200

# Integer divide by 4 (2^2)
fast_div = x >> 2       # 6

print(f"25 * 8 = {fast_mult}, 25 // 4 = {fast_div}")
```

#### 3. In-Place Swap Without Temporary Memory
Using the XOR self-inverse property ($x \oplus x = 0$):
```python
x = 15
y = 27

# Step 1: x holds x ^ y
x = x ^ y

# Step 2: y = (x ^ y) ^ y = x
y = x ^ y

# Step 3: x = (x ^ y) ^ x = y
x = x ^ y

print(f"Swapped: x = {x}, y = {y}")  # Output: x = 27, y = 15
```

#### 4. Permission Flags and Bitmasking
In operating systems (like POSIX/Linux file systems), permissions are managed as individual bit flags:

```python
# Permission Bitmasks (Powers of 2)
PERMISSION_EXECUTE = 1   # Binary: 0001 (1)
PERMISSION_WRITE   = 2   # Binary: 0010 (2)
PERMISSION_READ    = 4   # Binary: 0100 (4)

# 1. Grant Read and Write permissions using Bitwise OR (|)
user_permissions = PERMISSION_READ | PERMISSION_WRITE  # 0100 | 0010 = 0110 (6)

# 2. Check if user has WRITE permission using Bitwise AND (&)
can_write = (user_permissions & PERMISSION_WRITE) != 0
print(f"Can Write? {can_write}")  # True

# 3. Check if user has EXECUTE permission
can_execute = (user_permissions & PERMISSION_EXECUTE) != 0
print(f"Can Execute? {can_execute}")  # False

# 4. Revoke WRITE permission using Bitwise AND with NOT (~):
user_permissions &= ~PERMISSION_WRITE  # 0110 & ~0010 = 0110 & 1101 = 0100 (4)
print(f"Can Write after revoke? {(user_permissions & PERMISSION_WRITE) != 0}")  # False
```

#### 5. Finding the Unique Element (LeetCode 136)
Given an array where every element appears twice except for one unique element, XORing all elements together cancels out all duplicate pairs in $O(n)$ time and $O(1)$ space:

```python
numbers = [4, 1, 2, 1, 2]

unique_element = 0
for num in numbers:
    unique_element ^= num

# Calculation: 0 ^ 4 ^ 1 ^ 2 ^ 1 ^ 2 = (1 ^ 1) ^ (2 ^ 2) ^ (4) = 0 ^ 0 ^ 4 = 4
print(f"Unique unrepeated element: {unique_element}")  # Output: 4
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
