# Python Interpreter, Interactive Mode & Variables

Welcome to Day 1! Today we lay the foundation of Python programming. By the end of this 25-minute lesson, you will understand how Python executes code, what a data type is, and how to create your own variables.

---

## 1. Python Interpreter

**What is an Interpreter?**  
A Python interpreter is a program that understands and executes Python code. 

For example, when you write:
```python
print("Hello World")
```
Python needs something to understand this instruction and execute it. That job is performed by the Python interpreter.

> [!NOTE]
> **Real-life analogy:** Imagine you are talking to a person who understands only Tamil, but you speak English. You say: *"Open the door."* An interpreter translates your instruction into something the other person understands.

Similarly:
**Python Code** ➔ **Python Interpreter** ➔ **Computer executes it**

---

## 2. Interactive Mode (REPL)

Interactive mode allows us to type Python instructions one at a time and immediately see the result. It's like having a direct conversation with Python!

If you type `python` in a terminal, you see:
```text
>>>
```
The `>>>` means Python is ready to accept your instruction.

```python
>>> 10 + 20
30
>>> print("Hello")
Hello
```

### Why is it Called Interactive Mode?
Because you are interacting directly with Python! It uses the **REPL** cycle:
- **R** — Read (Reads your code)
- **E** — Evaluate (Evaluates it)
- **P** — Print (Prints the result)
- **L** — Loop (Waits for the next instruction and repeats)

### Interpreter vs Interactive Mode

This is a common beginner confusion. Let's clear it up:

| Feature | Python Interpreter | Interactive Mode |
| :--- | :--- | :--- |
| **What is it?** | It is the execution system/program. | It is a mode/interface for using Python. |
| **What does it do?** | Executes Python code (e.g., running `.py` files). | Allows you to interact with Python one command at a time. |
| **Best used for:** | Actual program execution. | Learning, testing, and experimentation. |

**Easy way to remember:**
*Interpreter* = **Who** executes the Python code?
*Interactive Mode* = **How** are we interacting with the interpreter?

---

## 3. Values and Data Types

**What is a Value?**  
A value is a piece of data. For example: `10`, `25.5`, `True`, `"Python"`.

**What is a Data Type?**  
A data type tells Python *what kind* of value something is. We will focus on four basic types today:

| Data Type | Meaning | Example |
| :--- | :--- | :--- |
| `int` | Integer / whole number | `10`, `-5`, `0` |
| `float` | Decimal number | `10.5`, `99.99` |
| `bool` | True or False | `True`, `False` |
| `str` | Text (String) | `"Python"`, `"9876543210"` |

> [!WARNING]
> Notice that `True` and `False` must start with capital letters in Python. `true` or `false` (lowercase) will cause an error!

### Strings vs Numbers

Compare these two values:
```python
age = 20
age = "20"
```
They look similar, but they behave very differently! `20` is an integer, while `"20"` is a string.

Look what happens when we use the `+` operator:
```python
# Mathematical Addition
print(20 + 10) 
# Output: 30

# String Joining (Concatenation)
print("20" + "10") 
# Output: 2010
```

---

## 4. Variables

**What is a Variable?**  
A variable is a name used to refer to a value. 
```python
age = 20
```
Here, `age` is the variable name, and `20` is the value. Think of `=` as an assignment operator: it stores the value on the right into the variable on the left.

### Real-World Example
Imagine a student registration form:
```python
student_name = "Arun"
age = 20
percentage = 85.5
is_student = True
```

### Python is Dynamically Typed!
In languages like C or Java, you must declare the type: `int age = 20;`
In Python, you just write `age = 20`. **Python automatically determines the type from the value.**

Because it is dynamically typed, a variable can refer to different types of data at different times:
```python
data = 10         # data is an int
data = "Hello"    # data is now a str
```

---

## 5. Variable Naming Rules

When naming your variables, you must follow these rules:

1. **Start with a letter or underscore (`_`)**
   - ✅ Valid: `name`, `_student`
   - ❌ Invalid: `2name` (Cannot start with a number)
2. **Numbers can be used after the first character**
   - ✅ Valid: `student1`
3. **No spaces allowed**
   - ✅ Valid: `student_name`
   - ❌ Invalid: `student name`
4. **No special characters (`@`, `-`, etc.)**
   - ❌ Invalid: `student-name`, `student@name`
5. **Python is Case-Sensitive**
   - `name`, `Name`, and `NAME` are three entirely different variables!
6. **Don't use Python reserved keywords**
   - ❌ Invalid: `if = 20`, `class = 10`

### Good vs Bad Variable Names
Always use meaningful names!
- **Bad:** `p = 85.5`, `x = True`
- **Good:** `student_percentage = 85.5`, `is_logged_in = True`

---

Ready to practice? Head over to the Sandbox to write your own Student Information Program, and then test your knowledge in the Quick Workout!
