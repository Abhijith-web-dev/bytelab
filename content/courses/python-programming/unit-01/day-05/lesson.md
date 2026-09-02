# Day 5 — Modules and Functions in Python

**Duration:** 90 minutes  
**Level:** Beginner  
**Main Goal:** Students should understand what functions are, why we use them, how to define and call them, and how parameters/arguments work. They should also understand the major types of Python functions, including different types of user-defined functions.

---

## 1. Day 5 Learning Objectives

By the end of this session, students should be able to:
- Explain what a module is.
- Explain what a function is and why functions are useful.
- Define and call a function.
- Understand parameters vs arguments.
- Pass values to functions.
- Understand return.
- Identify built-in functions, module functions, and user-defined functions.
- Understand the 4 common types of user-defined functions.
- Write simple reusable functions.
- Break a larger program into smaller functions.

---

## 2. 90-Minute Class Plan

| Time | Topic | Activity |
| --- | --- | --- |
| 0–5 min | Previous-day recap | Quick questions |
| 5–12 min | Modules | What is a module? |
| 12–20 min | Functions | Why do we need functions? |
| 20–30 min | Function definition & calling | `def` and function call |
| 30–40 min | Parameters & arguments | Passing data |
| 40–48 min | Return values | Getting results back |
| 48–60 min | Types of functions | Built-in, module, user-defined |
| 60–72 min | User-defined function types | 4 important types |
| 72–80 min | Illustrative programs | Real-world examples |
| 80–87 min | Practice problem | Moodle coding task |
| 87–90 min | Quiz | Quick assessment |

---

## 3. What is a Module?

A **module** is a Python file that contains reusable Python code. Usually, a module contains:
- Functions
- Variables
- Classes
- Other useful code

Instead of writing everything ourselves, we can use code that Python or other developers have already created.

### Real-world example

Imagine a calculator application. Instead of writing every mathematical operation from scratch, Python provides the `math` module.

```python
import math

print(math.sqrt(25))
```

**Output:**
```
5.0
```

Here:
- `math` → module
- `sqrt()` → function inside the module
- `25` → argument

**Simple Idea:**
```
Module
   ↓
Contains useful functions
   ↓
We import the module
   ↓
We use its functions
```

---

## 4. What is a Function?

A **function** is a reusable block of code designed to perform a particular task.

Think about a mobile phone. You don't rebuild the entire phone every time you want to make a call. You simply use:
`Call()`

Similarly, in Python, we create a function once and use it whenever needed.

### Without a Function

Suppose we want to print a welcome message three times.

```python
print("Welcome to Python")
print("Welcome to Python")
print("Welcome to Python")
```

There is repetition.

### With a Function

```python
def welcome():
    print("Welcome to Python")
```

Now we can use it:
```python
welcome()
welcome()
welcome()
```

**Output:**
```
Welcome to Python
Welcome to Python
Welcome to Python
```

**Main advantage:** Write once → Use many times.

---

## 5. Function Definition

A function is created using the `def` keyword.

### Syntax
```python
def function_name():
    # function body
```

### Example:
```python
def greet():
    print("Hello Student")
```

Here:
| Part | Meaning |
| --- | --- |
| `def` | Keyword used to define a function |
| `greet` | Function name |
| `()` | Parameter area |
| `:` | Starts the function body |
| `print()` | Function body |

---

## 6. Calling a Function

Defining a function does not execute it. We have to **call** the function.

```python
def greet():
    print("Hello Student")
```
Nothing is printed yet.

Now:
```python
greet()
```

**Output:**
```
Hello Student
```

> **Important**
> `def greet():` means "Create this function."
> While `greet()` means "Run this function."

---

## 7. Real-Time Example — ATM

Imagine an ATM has different operations:
- Check Balance
- Deposit
- Withdraw
- Change PIN

Each operation can be represented as a function.

```python
def check_balance():
    print("Your balance is ₹5000")

def deposit():
    print("Money deposited")

def withdraw():
    print("Money withdrawn")
```

We can call whichever operation we need:
```python
check_balance()
deposit()
withdraw()
```

This makes the program easier to organize.

---

## 8. Parameters and Arguments

This is one of the most important concepts. Suppose we want to greet different students.

```python
def greet(name):
    print("Hello", name)
```

Here, `name` is a **parameter**.

When we call:
```python
greet("Arun")
```

`"Arun"` is an **argument**.

### Difference
| Parameter | Argument |
| --- | --- |
| Variable written when defining a function | Actual value given when calling |
| Receives the value | Provides the value |
| Example: `name` | Example: `"Arun"` |

### Example:

```python
def greet(name):      # name = parameter
    print("Hello", name)

greet("Arun")         # "Arun" = argument
```

**Output:**
```
Hello Arun
```

---

## 9. Multiple Parameters

A function can have multiple parameters.

```python
def add(a, b):
    print(a + b)
```

**Calling:**
```python
add(10, 20)
```

**Output:**
```
30
```

Here:
- `a` → 10
- `b` → 20

### Real-Time Example — Shopping Bill

```python
def calculate_bill(price, quantity):
    total = price * quantity
    print("Total:", total)

calculate_bill(100, 3)
```

**Output:**
```
Total: 300
```

This function can work with different values:
```python
calculate_bill(50, 2)
calculate_bill(250, 4)
calculate_bill(1000, 1)
```

---

## 10. Return Statement

Sometimes we don't want a function to print the result. We want the function to **give the result back** to the program. For this, we use `return`.

```python
def add(a, b):
    return a + b
```

Now:
```python
result = add(10, 20)
print(result)
```

**Output:**
```
30
```

### print() vs return
| `print()` | `return` |
| --- | --- |
| Displays a result | Sends a result back |
| Mainly used for displaying | Used when another part of the program needs the result |
| Cannot directly store the displayed result | Returned value can be stored in a variable |

**Example:**
```python
def add(a, b):
    print(a + b)
```

versus:
```python
def add(a, b):
    return a + b
```
The second version is more reusable.

---

## 11. Function With No Parameter and No Return

```python
def welcome():
    print("Welcome to Python")
```

**Characteristics:**
- No parameter
- No return value

---

## 12. Function With Parameters but No Return

```python
def greet(name):
    print("Hello", name)
```

**Characteristics:**
- Has parameter
- Does not return a value

---

## 13. Function With No Parameter but With Return

```python
def get_number():
    return 100
```

**Use:**
```python
x = get_number()
print(x)
```

**Output:**
```
100
```

---

## 14. Function With Parameters and Return

This is a very common and useful type.

```python
def multiply(a, b):
    return a * b
```

**Use:**
```python
result = multiply(5, 4)
print(result)
```

**Output:**
```
20
```

---

## 15. Types of Functions in Python

For beginners, understand functions in these major categories:

```
Python Functions
│
├── Built-in Functions
│
├── Module Functions
│
└── User-defined Functions
```

### Type 1 — Built-in Functions

These are functions already provided by Python.
**Examples:**
`print()`, `input()`, `len()`, `type()`, `int()`, `float()`, `str()`, `max()`, `min()`, `sum()`

```python
numbers = [10, 20, 30]

print(len(numbers))
print(max(numbers))
```

**Output:**
```
3
30
```
We don't need to define these functions ourselves.

---

## 16. Type 2 — Module Functions

Functions provided inside modules.

```python
import math

print(math.sqrt(16))
print(math.factorial(5))
```

**Output:**
```
4.0
120
```

Here:
- `math` → module
- `sqrt()` → module function
- `factorial()` → module function

Another example:
```python
import random

number = random.randint(1, 10)
print(number)
```

---

## 17. Type 3 — User-Defined Functions

Functions created by the programmer using `def`.

```python
def square(number):
    return number * number
```

**Calling:**
```python
print(square(5))
```

**Output:**
```
25
```
The programmer created `square()`.

---

## 18. Four Common Types of User-Defined Functions

This is especially important for your students. User-defined functions can commonly be classified based on:
1. Parameters
2. Return value

### The four types
| Type | Parameter | Return |
| --- | --- | --- |
| **Type 1** | No | No |
| **Type 2** | Yes | No |
| **Type 3** | No | Yes |
| **Type 4** | Yes | Yes |

#### Type 1: No Parameter + No Return
```python
def welcome():
    print("Welcome to Python")

welcome()
```

#### Type 2: Parameter + No Return
```python
def greet(name):
    print("Hello", name)

greet("Arun")
```

#### Type 3: No Parameter + Return
```python
def get_bonus():
    return 500

bonus = get_bonus()
print(bonus)
```

#### Type 4: Parameter + Return
```python
def add(a, b):
    return a + b

result = add(10, 20)
print(result)
```

---

## 19. Easy Memory Trick

Students can remember the four types using this table:

```
                RETURN?
              NO       YES
          ---------------------
PARAM NO | Type 1 |  Type 3 |
          ---------------------
PARAM YES| Type 2 |  Type 4 |
          ---------------------
```

**Simple rule:**
Ask two questions:
- Question 1: Does the function receive data? → Parameter
- Question 2: Does the function send data back? → Return

---

## 20. Illustrative Program 1 — Student Marks

```python
def calculate_total(mark1, mark2, mark3):
    return mark1 + mark2 + mark3

total = calculate_total(80, 75, 90)
print("Total Marks:", total)
```

**Output:**
```
Total Marks: 245
```

**Flow:**
```
80, 75, 90
     ↓
calculate_total()
     ↓
80 + 75 + 90
     ↓
245
     ↓
total
```

---

## 21. Illustrative Program 2 — Electricity Bill

```python
def calculate_bill(units):
    return units * 6

units = 100
bill = calculate_bill(units)
print("Electricity Bill:", bill)
```

**Output:**
```
Electricity Bill: 600
```

This is a good example because the same function can be reused:
```python
print(calculate_bill(50))
print(calculate_bill(100))
print(calculate_bill(200))
```

---

## 22. Illustrative Program 3 — Pass or Fail

```python
def check_result(mark):
    if mark >= 40:
        return "Pass"
    else:
        return "Fail"

result = check_result(75)
print(result)
```

**Output:**
```
Pass
```

Another student:
```python
result = check_result(32)
print(result)
```

**Output:**
```
Fail
```

---

## 23. Why Do We Use Functions?

Without functions, large programs can become difficult to manage.

### Without functions
```
1000 lines
↓
Everything mixed together
↓
Difficult to understand
↓
Difficult to debug
↓
Repeated code
```

### With functions
```
Main Program
│
├── login()
├── calculate_bill()
├── check_result()
├── generate_receipt()
└── logout()
```

Much easier to understand.

**Benefits:**
- Code reuse
- Less repetition
- Easy debugging
- Better organization
- Easier maintenance
- Makes large programs simpler

---

## 24. Function vs Module

Students often confuse these two.

| Function | Module |
| --- | --- |
| Performs a particular task | Contains reusable Python code |
| Defined using `def` | Usually a `.py` file |
| Example: `calculate()` | Example: `math` |
| Can exist inside a module | Can contain many functions |
| Usually smaller unit | Larger container |

**Think:**
```
Module
│
├── Function 1
├── Function 2
├── Function 3
└── Variable
```

---

## 25. Important Beginner Rules

### Rule 1
A function must be defined before you normally call it.
```python
def greet():
    print("Hello")

greet()
```

### Rule 2
Function names should describe what the function does.
- **Good:** `calculate_total()`, `check_result()`, `find_average()`
- **Less useful:** `abc()`, `x()`, `fun1()`

### Rule 3
Use indentation inside functions.
**Correct:**
```python
def greet():
    print("Hello")
```
**Incorrect:**
```python
def greet():
print("Hello")
```
