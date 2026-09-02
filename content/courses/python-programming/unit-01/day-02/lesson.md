# Day 2 — Lists, Expressions, and Statements

## 1. Quick Recap — Day 1

Before starting Day 2, let's test your memory:

### Question 1
What is the output?
```python
x = 10
y = 20
print(x + y)
```
**Answer:** `30`

### Question 2
What is the data type?
```python
price = 99.50
```
**Answer:** `float`

### Question 3
Which is a valid variable name?
A. `1student`
B. `student_name`
C. `student-name`
D. `student name`

**Answer:** `B. student_name`

**"Yesterday, we learned how to store one value in a variable. Today, we are going to learn how to store multiple values together."**

---

## 2. List Data Type

### What is a List?
A list is used to store multiple values in a single variable.

For example, imagine a student has five marks. Without a list, you might do this:
```python
mark1 = 80
mark2 = 75
mark3 = 90
mark4 = 85
mark5 = 95
```
This works, but it becomes difficult to manage. Instead, we can use a **list**:
```python
marks = [80, 75, 90, 85, 95]
```
Now all five marks are stored inside one variable.

### Real-Time Example — Shopping Cart
Think about an online shopping application. A customer buys:
- Laptop
- Mouse
- Keyboard
- Headphones

We can store them using a list:
```python
cart = ["Laptop", "Mouse", "Keyboard", "Headphones"]
```
**Easy definition:** A list is a collection of multiple values stored together in one variable.

---

## 3. How to Create a List

Lists use square brackets `[ ]`.

**Integer list:**
```python
numbers = [10, 20, 30, 40]
```
**String list:**
```python
names = ["Arun", "Priya", "Kumar"]
```
**Float list:**
```python
prices = [99.5, 120.75, 250.0]
```
**Boolean list:**
```python
attendance = [True, False, True, True]
```

### A List Can Contain Different Data Types
Python lists can contain different types of values.
```python
student = ["Arun", 20, 87.5, True]
```
Here:
- `"Arun"` → string
- `20` → integer
- `87.5` → float
- `True` → boolean

However, when learning programming, encourage yourself to create lists where the values logically belong together.

---

## 4. Accessing Values from a List

Suppose:
```python
fruits = ["Apple", "Banana", "Mango", "Orange"]
```
How do we get `"Apple"`? Python uses **index numbers**.

> [!IMPORTANT]
> **Python starts counting from 0.**

| Value | Index |
| :--- | :--- |
| Apple | `0` |
| Banana | `1` |
| Mango | `2` |
| Orange | `3` |

So:
```python
print(fruits[0])
```
**Output:** `Apple`

```python
print(fruits[2])
```
**Output:** `Mango`

### Changing a List Value
Lists are changeable.
```python
marks = [80, 70, 90]
```
Suppose the second mark was entered incorrectly. We can change it:
```python
marks[1] = 85
print(marks)
```
**Output:** `[80, 85, 90]`

### List vs Variable
* **Normal variable:** `student_name = "Arun"` (Usually stores one value)
* **List:** `student_names = ["Arun", "Priya", "Kumar"]` (Stores multiple values. Values can be accessed using indexes)

---

## 5. Expressions

"We know how to store data. But how do we perform calculations using that data?" That's where expressions come in.

### What is an Expression?
An expression is a combination of values, variables, operators, or function calls that Python can evaluate to produce a value.

Simple examples:
- `10 + 20`
- `price * quantity`
- `age + 1`

### Basic Arithmetic Expressions
```python
a = 10
b = 5

# Addition
print(a + b)  # Output: 15

# Subtraction
print(a - b)  # Output: 5

# Multiplication
print(a * b)  # Output: 50

# Division
print(a / b)  # Output: 2.0
```

### Real-Time Example — Salary
Suppose an employee earns:
- Basic Salary = ₹25,000
- Bonus = ₹5,000

```python
basic_salary = 25000
bonus = 5000

total_salary = basic_salary + bonus
print("Total Salary:", total_salary)
```
**Output:** `Total Salary: 30000`

The expression `basic_salary + bonus` calculates the result.

### Expression vs Value
* **Value:** `10` - This is simply a value.
* **Expression:** `10 + 20` - Python evaluates it and produces `30`.

---

## 6. Statements

### What is a Statement?
A statement is an instruction that tells Python to perform an action.

Example:
```python
age = 20
```
This is an assignment statement.

```python
print(age)
```
This is a statement that tells Python to display the value.

### Expression vs Statement
Students often confuse these two.

* **Expression:** Produces a value. (`10 + 20` → `30`)
* **Statement:** Performs an action. (`x = 10` assigns a value. `print(x)` displays it.)

> [!TIP]
> Simple memory trick:
> **Expression** → produces a value
> **Statement** → gives Python an instruction

---

## 7. Comments

### What is a Comment?
A comment is a note written inside the program for humans. Python does not execute comments.

A single-line comment starts with `#`.
```python
# Store the student's age
age = 20
```

### Why Do We Need Comments?
Imagine this program:
```python
x = 500
y = 3
z = x * y
```
Another programmer may not know what x, y, and z represent. We can write:
```python
# Price of one product
price = 500

# Number of products
quantity = 3

# Calculate total price
total = price * quantity
```
Now the program is much easier to understand!

---

## 8. Basic Programs

Now combine Variables + Values + Lists + Expressions + Statements + Comments!

### Program 1 — Shopping Bill
A customer buys 3 notebooks. Each notebook costs ₹50. Calculate the total price.
```python
# Price of one notebook
price = 50

# Number of notebooks
quantity = 3

# Calculate total price
total = price * quantity

print("Total Price:", total)
```

### Program 2 — Student Marks
```python
# Store student marks
marks = [80, 75, 90, 85, 95]

# Calculate total marks
total = marks[0] + marks[1] + marks[2] + marks[3] + marks[4]

print("Total Marks:", total)
```

### Program 3 — Calculate Age Next Year
```python
# Current age
age = 20

# Calculate next year's age
next_year_age = age + 1

print("Current Age:", age)
print("Next Year Age:", next_year_age)
```

> [!NOTE]
> **Key Takeaway:**
> **Values** → **Variables** → **Lists** → **Expressions** → **Statements** → **Small Real-World Programs**
