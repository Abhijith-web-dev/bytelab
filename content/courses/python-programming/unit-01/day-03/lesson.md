# Day 3 — Operators, Precedence, and Expressions

## 1. 🔄 Day 2 Quick Recap

**Question 1:** What is the output?
```python
numbers = [10, 20, 30]
print(numbers[1])
```
**Answer:** `20`

**Question 2:** What is an expression?
`price * quantity`
**Answer:** An expression is something Python evaluates to produce a value.

**Question 3:** What does this do?
`# Calculate total price`
**Answer:** It is a comment. Python ignores it during execution.

> [!NOTE]
> Yesterday, we learned how to store values and perform simple calculations. Today, we are going to learn how Python performs those calculations and, most importantly, which calculation happens first.

---

## 2. Operators

### What is an Operator?
An operator is a symbol that tells Python to perform an operation.
```python
10 + 5
```
Here:
- `+` → operator
- `10` → value
- `5` → value

### Arithmetic Operators
These are the most important operators for beginners:

| Operator | Meaning | Example | Result |
| :--- | :--- | :--- | :--- |
| `+` | Addition | `10 + 5` | `15` |
| `-` | Subtraction | `10 - 5` | `5` |
| `*` | Multiplication | `10 * 5` | `50` |
| `/` | Division | `10 / 5` | `2.0` |
| `//` | Floor division | `10 // 3` | `3` |
| `%` | Remainder | `10 % 3` | `1` |
| `**` | Power | `2 ** 3` | `8` |

### Addition `+`
```python
a = 10
b = 20
result = a + b
print(result) # Output: 30
```

### Subtraction `-`
```python
balance = 5000
expense = 1500
remaining = balance - expense
print("Remaining Balance:", remaining) # Output: Remaining Balance: 3500
```

### Multiplication `*`
```python
price = 50
quantity = 5
total = price * quantity
print("Total:", total) # Output: Total: 250
```

### Division `/`
```python
money = 1000
people = 4
share = money / people
print("Each Person:", share) # Output: Each Person: 250.0
```
> [!IMPORTANT]
> Python's `/` operator normally produces a float. `10 / 2` gives `5.0`, not `5`.

### Floor Division `//`
Floor division gives the whole-number quotient.
```python
result = 10 // 3
print(result) # Output: 3
```
Because: 10 ÷ 3 = 3 remainder 1. The whole-number quotient is 3.

### Modulus `%`
The `%` operator gives the remainder.
```python
print(10 % 3) # Output: 1
```
Because: 10 ÷ 3 is 3 with a remainder of 1.

### Power Operator `**`
The `**` operator calculates powers.
```python
print(2 ** 3) # Output: 8
```
Because: 2 × 2 × 2 = 8

---

## 3. ⭐ Precedence of Operators

This is the most important concept of Day 3.

Suppose we write:
```python
result = 10 + 5 * 2
```
What is the answer?
Some beginners may calculate: 10 + 5 = 15, then 15 × 2 = 30.
But Python gives: **20**

### What is Operator Precedence?
Operator precedence tells Python which operation should be performed first when an expression contains multiple operators.

### Beginner Precedence Order
For the operators covered in this course, remember:
1. `( )` — Parentheses
2. `**` — Power
3. `*`, `/`, `//`, `%` — Multiplication, Division, Modulus
4. `+`, `-` — Addition, Subtraction

> [!TIP]
> A simple memory trick: **Brackets → Power → Multiply/Divide → Add/Subtract**

### Parentheses Come First
Example:
```python
result = (10 + 5) * 2
```
Python first calculates: 10 + 5 = 15. Then: 15 × 2 = 30. Output: `30`

Compare:
`10 + 5 * 2` → `20`
`(10 + 5) * 2` → `30`

### Same-Level Operators
What happens here?
```python
result = 20 / 5 * 2
```
`/` and `*` have the same precedence. Python evaluates them from **left to right**:
1. 20 / 5 = 4
2. 4 × 2 = 8

Answer: `8.0`

---

## 4. Tuple Assignment

Suppose:
```python
name = "Arun"
age = 20
```
We normally write two assignment statements. Python allows us to write:
```python
name, age = "Arun", 20
```
This is called multiple assignment or tuple assignment.

### Swapping Two Values
One of the coolest beginner-friendly Python features is swapping values.
Suppose:
```python
a = 10
b = 20
```
We want `a` to become `20` and `b` to become `10`. Python allows:
```python
a, b = b, a
```
Now:
```python
print(a) # Output: 20
print(b) # Output: 10
```

---

## 5. Expression Practice

Calculate these before running the code:

| Expression | Answer |
| :--- | :--- |
| `10 + 5 * 2` | `20` |
| `(10 + 5) * 2` | `30` |
| `20 / 5 + 3` | `7.0` |
| `20 // 3` | `6` |
| `20 % 3` | `2` |
| `2 ** 4` | `16` |
| `10 - 2 * 3` | `4` |
| `(10 - 2) * 3` | `24` |

---

## 6. Illustrative Programs

Combine everything into real-world programs.

### Program 1 — Shopping Bill
```python
# Product prices
price1 = 500
price2 = 250
price3 = 100

# Calculate total
total = price1 + price2 + price3
print("Total Bill:", total) # Output: 850
```

### Program 2 — Calculate Average Mark
```python
mark1 = 80
mark2 = 90
mark3 = 70

total = mark1 + mark2 + mark3
average = total / 3

print("Total:", total)
print("Average:", average)
```

### Program 3 — Calculate Team Distribution
There are 25 students. Each team contains 4 students.
```python
students = 25
team_size = 4

complete_teams = students // team_size
remaining_students = students % team_size

print("Complete Teams:", complete_teams)
print("Remaining Students:", remaining_students)
```
*This is an excellent real-world example for understanding `//` and `%`.*
