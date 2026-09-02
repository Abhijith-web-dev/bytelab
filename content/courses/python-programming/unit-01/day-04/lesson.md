# Day 4 — Python Operators: Assignment, Comparison, Logical, Identity, Membership & Bitwise

## 1. 🔄 Day 3 Quick Recap

**Question 1:** What is the output?
```python
x = 10
y = 5
print(x + y * 2)
```
**Answer:** `20`

**Question 2:** What does `%` return?
```python
10 % 3
```
**Answer:** `1` (It returns the remainder.)

**Question 3:** What does this do?
```python
a, b = b, a
```
**Answer:** It swaps the values of `a` and `b`.

> [!NOTE]
> Yesterday, we learned operators such as `+`, `-`, `*`, `/`, `%`, and `**` to perform calculations. Today, we will learn operators that help Python assign values, compare values, make decisions, check values, and work with collections.

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

Bitwise operators work with the binary bits of integers.
For example: `5` is `101` in binary. `3` is `011`.

| Operator | Name | Example |
| :--- | :--- | :--- |
| `&` | AND | `5 & 3` |
| `\|` | OR | `5 \| 3` |
| `^` | XOR | `5 ^ 3` |
| `~` | NOT | `~5` |
| `<<` | Left Shift | `5 << 1` |
| `>>` | Right Shift | `5 >> 1` |

### Bitwise AND `&`
Both bits must be 1 to produce 1.
```python
#   101 (5)
# & 011 (3)
# -----
#   001 (1)
print(5 & 3) # Output: 1
```

### Bitwise OR `|`
If at least one bit is 1, the result is 1.
```python
#   101 (5)
# | 011 (3)
# -----
#   111 (7)
print(5 | 3) # Output: 7
```

> [!TIP]
> `<<` essentially shifts bits left, `>>` shifts bits right.

---

## 8. Operator Summary & Real-World Programs

Students may confuse similar-looking operators.

| Operator | Purpose | Example |
| :--- | :--- | :--- |
| `=` | Assign a value | `x = 10` |
| `==` | Compare values | `x == 10` |
| `is` | Check object identity | `x is y` |
| `in` | Check membership | `x in numbers` |
| `and` | Both conditions | `x > 5 and x < 20` |

### 🚀 Online Shopping Eligibility Program
A customer gets free delivery if the order amount is ₹500 or more AND they are a member.
```python
order_amount = 750
is_member = True

eligible = order_amount >= 500 and is_member
print("Free Delivery:", eligible) # Output: Free Delivery: True
```

### 🧩 One-Minute Operator Challenge
Can you predict the output of this code?
```python
price = 600
is_member = True
products = ["Laptop", "Mouse", "Keyboard"]

discount = 100
price -= discount

eligible = price >= 500 and is_member
has_mouse = "Mouse" in products

print(price)
print(eligible)
print(has_mouse)
```
*(Think about it! The expected outputs are `500`, `True`, and `True`.)*
