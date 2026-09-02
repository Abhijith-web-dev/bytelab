# Unit–I — Day 6: Flow of Execution, Integration & Revision

**Duration:** 90 Minutes  
**Level:** Beginner  
**Unit:** Unit–I — Python Fundamentals  
**Day:** 6  
**Focus:** Understanding how Python executes a program and combining everything learned in Days 1–5.

---

## 1. Day 6 Learning Objectives

By the end of Day 6, students should be able to:
- Explain the flow of execution of a Python program.
- Understand how Python executes statements from top to bottom.
- Understand how function calls change the flow of execution.
- Trace a program step by step.
- Combine:
  - Variables, Data types, Lists
  - Expressions, Statements, Operators
  - Functions, Parameters and arguments, Return values
  - Modules
- Write small complete Python programs.
- Identify and fix basic programming errors.
- Solve beginner-level problems independently.
- Revise all major concepts from Unit–I.

---

## 2. 90-Minute Session Plan

| Time | Topic | Learning Activity |
| --- | --- | --- |
| 0–5 min | Unit-I recap | Quick oral questions |
| 5–18 min | Flow of Execution | Trace simple programs |
| 18–30 min | Function Flow | Understand function calls |
| 30–42 min | Combining Python Concepts | Build integrated programs |
| 42–55 min | Illustrative Programs | Real-world examples |
| 55–65 min | Error Finding & Debugging | Find and fix errors |
| 65–78 min | Unit-I Revision | Concept-based revision |
| 78–87 min | Practice Problem | Moodle coding task |
| 87–90 min | Quiz | Quick assessment |

---

## 3. What is Flow of Execution?

Flow of execution means the order in which Python executes the instructions in a program.

Normally, Python executes statements:
**From top to bottom, one statement at a time.**

**Example:**
```python
print("Step 1")
print("Step 2")
print("Step 3")
```

**Output:**
```
Step 1
Step 2
Step 3
```

So the execution flow is:
```
Step 1
   ↓
Step 2
   ↓
Step 3
```

---

## 4. Simple Flow of Execution Example

Consider:
```python
a = 10
b = 20
total = a + b

print(total)
```

Python executes it like this:

**Step 1**
```python
a = 10
```
`a` becomes 10.

**Step 2**
```python
b = 20
```
`b` becomes 20.

**Step 3**
```python
total = a + b
```
Python calculates: `10 + 20 = 30`
So: `total = 30`

**Step 4**
```python
print(total)
```

**Output:**
```
30
```

**Execution flow:**
```
a = 10
   ↓
b = 20
   ↓
total = a + b
   ↓
print(total)
```

---

## 5. Flow of Execution with a Function

Functions make the flow slightly different. Consider:

```python
def greet():
    print("Hello")

print("Start")
greet()
print("End")
```

What happens?

**Step 1**
Python reads:
```python
def greet():
```
The function is defined. The function body does not run yet.

**Step 2**
Python executes:
```python
print("Start")
```
**Output:** `Start`

**Step 3**
Python reaches:
```python
greet()
```
Now Python enters the function:
```python
print("Hello")
```
**Output:** `Hello`

**Step 4**
The function finishes. Python returns to where the function was called.

**Step 5**
Python executes:
```python
print("End")
```
**Output:**
```
Start
Hello
End
```

---

## 6. Important Concept: Function Definition vs Function Call

This is one of the most important things students should understand.

**Function definition:**
```python
def greet():
    print("Hello")
```
Means: *Create the function.*

**Function call:**
```python
greet()
```
Means: *Execute the function.*

> **Remember:**
> - **Define** → Store the function
> - **Call** → Execute the function

---

## 7. Flow of Execution with Parameters

**Example:**
```python
def add(a, b):
    result = a + b
    return result

x = 10
y = 20

answer = add(x, y)
print(answer)
```

**Flow:**
```
Start
  ↓
Define add()
  ↓
x = 10
  ↓
y = 20
  ↓
add(x, y)
  ↓
a = 10
b = 20
  ↓
result = 10 + 20
  ↓
return 30
  ↓
answer = 30
  ↓
print(answer)
  ↓
End
```

**Output:**
```
30
```

---

## 8. Combining Data Types, Expressions, Statements and Functions

Now students should start connecting the concepts learned during Unit-I.

Consider a shopping program:
```python
def calculate_total(price, quantity):
    return price * quantity

product = "Notebook"
price = 50
quantity = 3

total = calculate_total(price, quantity)

print("Product:", product)
print("Total:", total)
```

**Concepts used:**
| Concept | Example |
| --- | --- |
| String | `"Notebook"` |
| Integer | `50`, `3` |
| Variables | `product`, `price`, `quantity` |
| Expression | `price * quantity` |
| Function | `calculate_total()` |
| Parameters | `price`, `quantity` |
| Arguments | `price`, `quantity` values |
| Return | `return price * quantity` |
| Function call | `calculate_total(price, quantity)` |
| Statements | All executable lines |

**Output:**
```
Product: Notebook
Total: 150
```

---

## 9. Combining Lists and Functions

Lists can also be passed to functions.

```python
def find_total(numbers):
    return sum(numbers)

marks = [80, 75, 90]

total = find_total(marks)
print("Total:", total)
```

**Output:**
```
Total: 245
```

Here:
```
marks
  ↓
[80, 75, 90]
  ↓
find_total()
  ↓
sum()
  ↓
245
```
This is a good example of combining lists + functions + built-in functions + return values.

---

## 10. Combining Operators and Functions

**Example:**
```python
def calculate_discount(price, discount):
    discount_amount = price * discount / 100
    final_price = price - discount_amount
    return final_price

price = 1000
discount = 10

result = calculate_discount(price, discount)
print("Final Price:", result)
```

**Output:**
```
Final Price: 900.0
```

**Concepts combined:** Variables, Integers, Arithmetic operators, Expressions, Function, Parameters, Arguments, return, Assignment, Function call.

---

## 11. Combining Comparison and Logical Operators

**Example:**
```python
def check_eligibility(age, score):
    if age >= 18 and score >= 50:
        return "Eligible"
    else:
        return "Not Eligible"

result = check_eligibility(20, 75)
print(result)
```

**Output:**
```
Eligible
```

**Flow:**
```
age >= 18
     ↓
score >= 50
     ↓
    and
     ↓
Eligible
```
This connects operators + conditions + functions.

---

## 12. Using a Module with a Function

We can also combine modules with functions.

```python
import math

def calculate_square_root(number):
    return math.sqrt(number)

result = calculate_square_root(25)
print(result)
```

**Output:**
```
5.0
```

Here we combine:
```
Module
  ↓
Function
  ↓
Parameter
  ↓
Module function
  ↓
Return
  ↓
Output
```

---

## 13. Illustrative Program — Student Result

This is a good Unit-I integrated program.

```python
def calculate_total(marks):
    return sum(marks)

def calculate_average(total, count):
    return total / count

marks = [80, 75, 90]

total = calculate_total(marks)
average = calculate_average(total, len(marks))

print("Total:", total)
print("Average:", average)
```

**Output:**
```
Total: 245
Average: 81.66666666666667
```

**Concepts used:** List, Function, Parameters, Arguments, Return, Variables, Expressions, Built-in `sum()`, Built-in `len()`, Arithmetic operator `/`.

---

## 14. Illustrative Program — Simple Shopping Bill

```python
def calculate_bill(price, quantity):
    return price * quantity

def calculate_discount(total):
    if total >= 1000:
        return total * 10 / 100
    else:
        return 0

price = 500
quantity = 3

total = calculate_bill(price, quantity)
discount = calculate_discount(total)

final_amount = total - discount

print("Total:", total)
print("Discount:", discount)
print("Final Amount:", final_amount)
```

**Output:**
```
Total: 1500
Discount: 150.0
Final Amount: 1350.0
```

This program combines almost every important beginner concept from Unit-I.

---

## 15. How to Trace a Program

Students should learn to dry run code before executing it.

Consider:
```python
def multiply(a, b):
    return a * b

x = 5
y = 4

result = multiply(x, y)
print(result)
```

Create a simple table:

| Step | Statement | Value |
| --- | --- | --- |
| 1 | `x = 5` | x = 5 |
| 2 | `y = 4` | y = 4 |
| 3 | `multiply(x, y)` | 5 × 4 |
| 4 | `return a * b` | 20 |
| 5 | `result = ...` | result = 20 |
| 6 | `print(result)` | 20 |

**Output:** `20`

> **Student rule:** When tracing code, ask:
> - What line executes first?
> - What variables are created? What values do they contain?
> - Is a function being called? What arguments are passed?
> - What does the function return?
> - What happens next?

---

## 16. Basic Debugging Practice

Students should also revise common mistakes.

### Error 1 — Function not called
```python
def greet():
    print("Hello")
```
There is no output because the function was only defined.
**Correct:**
```python
greet()
```

### Error 2 — Missing parameter
```python
def add(a, b):
    return a + b

print(add(10))
```
The function expects two arguments, but only one is provided.
**Correct:**
```python
print(add(10, 20))
```

### Error 3 — Wrong indentation
**Incorrect:**
```python
def greet():
print("Hello")
```
**Correct:**
```python
def greet():
    print("Hello")
```

### Error 4 — Confusing `=` and `==`
Assignment:
`age = 20`

Comparison:
`age == 20`

**Remember:**
- `=` → assign a value
- `==` → compare values

---

## 17. Unit-I Complete Revision

Students have now covered:

**Day 1 — Python Basics**
- Python interpreter
- Interactive mode
- Values and Data types (`int`, `float`, `bool`, `str`)
- Variables

**Day 2 — Basic Data and Statements**
- List
- Expressions and Statements
- Comments
- Basic Python programs

**Day 3 — Operators and Expressions**
- Arithmetic operators
- Operator precedence
- Tuple assignment, Multiple assignment
- Expression evaluation

**Day 4 — Python Operators**
- Assignment, Comparison, Logical, Identity, Membership, and Bitwise operators

**Day 5 — Functions and Modules**
- Modules, Functions
- Function definition and calling
- Parameters, Arguments, Return
- Built-in, Module, and User-defined functions
- Four types of user-defined functions

**Day 6 — Integration**
- Flow of execution
- Function execution flow
- Program tracing
- Combining concepts
- Debugging and Problem solving
- Unit-I revision

---

## 18. Unit-I Concept Map
```
                         PYTHON
                            │
          ┌─────────────────┴─────────────────┐
          ↓                                   ↓
       VALUES                              VARIABLES
          │                                   │
          ↓                                   ↓
     DATA TYPES                         Store Values
          │
    ┌─────┼─────┬─────┐
    ↓     ↓     ↓     ↓
   int  float  str   bool
          │
          ↓
        LISTS
          │
          ↓
     EXPRESSIONS
          │
          ↓
       OPERATORS
          │
          ↓
      STATEMENTS
          │
          ↓
       FUNCTIONS
          │
    ┌─────┼──────────┐
    ↓     ↓          ↓
Parameters Arguments Return
          │
          ↓
       MODULES
          │
          ↓
   COMPLETE PROGRAM
          │
          ↓
   FLOW OF EXECUTION
          │
          ↓
     PROBLEM SOLVING
```

---

## 19. Unit-I Problem-Solving Method

Teach students to follow this process for every programming problem.

- **Step 1 — Understand the problem** (Ask: What does the program need to do?)
- **Step 2 — Identify inputs** (Example: `price`, `quantity`)
- **Step 3 — Identify outputs** (Example: total price)
- **Step 4 — Decide the calculation** (`total = price × quantity`)
- **Step 5 — Decide whether a function is useful** (`def calculate_total(price, quantity):`)
- **Step 6 — Write the code**
- **Step 7 — Test with sample values**
- **Step 8 — Check the output**
- **Step 9 — Fix errors**

This process is more important than simply memorizing Python syntax.

---

## 23. Unit-I Final Cheat Sheet

| Concept | Remember |
| --- | --- |
| **Variable** | Stores a value |
| **int** | Whole number |
| **float** | Decimal number |
| **str** | Text |
| **bool** | `True` or `False` |
| **List** | Stores multiple values |
| **Expression** | Produces a value |
| **Statement** | Instruction executed by Python |
| **=** | Assignment |
| **==** | Equality comparison |
| **and** | Both conditions must be true |
| **or** | At least one condition must be true |
| **not** | Reverses a Boolean result |
| **in** | Checks membership |
| **is** | Checks object identity |
| **def** | Defines a function |
| **Function call** | Executes a function |
| **Parameter** | Variable in function definition |
| **Argument** | Value passed during function call |
| **return** | Sends a value back |
| **Module** | Reusable Python code/file |
| **import** | Brings a module into the program |
| **Built-in function**| Function already provided by Python |
| **User-defined** | Function created by programmer |
| **Flow of execution**| Order in which Python executes code |

---

## 24. Final Day-6 Student Challenge

At the end of the session, ask students to explain this program without running it:

```python
def calculate_total(price, quantity):
    return price * quantity

items = [100, 200, 300]
total = calculate_total(sum(items), 1)

print(total)
```

Students should be able to explain:
1. `items` is a list
2. `sum(items)` gives `600`
3. `calculate_total(600, 1)` is called
4. `price = 600`, `quantity = 1`
5. `600 × 1 = 600`
6. `return 600`
7. `total = 600`
8. `print(total)`  
**Output:** `600`

> **Day 6 Key Message:** Don't just learn how to write Python statements. Learn how the statements work together and how Python moves through the program.

*This completes the Unit-I foundation and prepares students for more advanced Python programming in the next unit.*
