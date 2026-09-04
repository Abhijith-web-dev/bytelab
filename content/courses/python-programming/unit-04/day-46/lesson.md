# Unit–IV — Day 10: Classes and Objects — Introduction to Object-Oriented Programming

**Duration:** 90 Minutes  
**Level:** Beginner → Intermediate  
**Unit:** IV – Files, Exceptions, Modules, Packages & Classes  
**Day:** 10 (Course Day 46)

---

## 1. Learning Objectives

By the end of this session, students should be able to:
1. Explain what a class is and what an object is.
2. Define a class using the `class` keyword.
3. Instantiate multiple independent objects from a single class.
4. Distinguish between attributes (state) and methods (behavior).
5. Use the `__init__()` constructor to initialize object attributes.
6. Understand the purpose and mechanics of the `self` parameter.
7. Pass values while creating objects and validate constructor arguments with `raise`.
8. Write simple class-based programs modeling real-world domain entities.
9. Store and manipulate lists inside objects (such as grades or transactional records).
10. Combine classes with conditionals, loops, functions, file I/O, and exceptions.
11. Organize a class-based application across multiple files and packages.
12. Identify, diagnose, and fix common beginner OOP errors.
13. Synthesize and revise the major concepts covered throughout Unit-IV.

---

## 2. 90-Minute Session Plan

| Time | Topic | Activity |
| :--- | :--- | :--- |
| **0–8 min** | Day 9 Recap | File processing review + first class/object recap |
| **8–18 min** | What is OOP? | Real-world objects, state, and behavior |
| **18–30 min** | Defining Classes | The `class` keyword, attributes, dot operator |
| **30–42 min** | Constructors | `__init__()`, understanding `self`, binding attributes |
| **42–55 min** | Methods | Defining object behavior, returning values, conditions |
| **55–65 min** | Multiple Objects | Independent object memory state and collections |
| **65–73 min** | Real-World Models | The `BankAccount` model, encapsulation vs. direct mutation |
| **73–80 min** | Unit-IV Integration | Classes + Files + Exceptions + Modules pipeline |
| **80–85 min** | Moodle Practice | Coding Challenge: Build a Bank Account Class |
| **85–88 min** | Unit-IV Quiz | Day 10 quiz + Unit-IV master revision quiz |
| **88–90 min** | Final Recap | Unit-IV Concept Map & Course Progression |

---

## 3. Motivating Example: Managing Students

Suppose we are building a student management system. Every student has:
- **State (Data):** Name, Age, Mark
- **Behavior (Actions):** Display details, Check pass/fail status, Calculate result

### 3.1 The Procedural Approach (Without Classes)
```python
name1 = "Arun"
age1 = 20
mark1 = 85

name2 = "Priya"
age2 = 19
mark2 = 92
```
As the number of students expands to hundreds or thousands, loose variables become impossible to maintain. If a list of names and a list of marks get out of sync, grades are assigned to the wrong students!

### 3.2 The Object-Oriented Approach
```text
           Student (Class Blueprint)
                     │
    ┌──────────┬─────┴────┬──────────┐
    ↓          ↓          ↓          ↓
 student1   student2   student3   student4
```
Each object encapsulates its own name, age, and mark in an isolated container.

---

## 4. What is Object-Oriented Programming (OOP)?

**Object-Oriented Programming (OOP)** is a software engineering paradigm where programs are organized around **objects** rather than separate functions and loose data.

### Core OOP Concepts for Beginners
- **Class:** The blueprint or template.
- **Object:** The concrete instance created from the blueprint.
- **Attribute:** Data associated with the object (What it *has*).
- **Method:** A function defined inside a class that operates on the object (What it *does*).
- **Constructor (`__init__`):** A special initialization method that sets up initial state upon creation.

---

## 5. What is a Class?

A **Class** is a user-defined blueprint that specifies what attributes and methods any future object of that type will possess.

```python
class Student:
    pass
```

The class `Student` is not one specific student. It is the concept of a student.

---

## 6. What is an Object?

An **Object** is an actual instance created from a class blueprint, allocated in computer memory.

```python
class Student:
    pass

student1 = Student()
```

- `Student` $\rightarrow$ Class (The Blueprint)
- `student1` $\rightarrow$ Object (The Concrete Instance)

---

## 7. The House & Blueprint Analogy

```text
    Architectural Design (Class)
                 │
  ┌──────────────┼──────────────┐
  ↓              ↓              ↓
House 1        House 2        House 3  (Objects)
Owner: Arun    Owner: Priya   Owner: Rahul
Color: Blue    Color: Green   Color: White
```

All houses follow the identical structural blueprint, but each individual house has its own address, paint color, and furnishings.

---

## 8. Defining a Simple Class & Creating Objects

```python
class Student:
    pass

student1 = Student()
student2 = Student()
```
`student1` and `student2` are two distinct objects stored at different memory addresses.

---

## 9. Attributes and the Dot Operator (`.`)

**Attributes** are pieces of data attached to an object. The dot operator (`.`) is used to access an object's attributes and invoke its methods.

```python
class Student:
    pass

student1 = Student()
student1.name = "Arun"
student1.age = 20
student1.mark = 85

print(student1.name)  # Arun
print(student1.age)   # 20
print(student1.mark)  # 85
```

---

## 10. The `__init__()` Constructor

Manually assigning attributes line-by-line is repetitive and error-prone. Python provides the **`__init__()`** constructor method to initialize attributes at the instant an object is created.

```python
class Student:
    def __init__(self, name, age, mark):
        self.name = name
        self.age = age
        self.mark = mark

student1 = Student("Arun", 20, 85)
```

### What Happens During Object Creation?
```text
1. User writes: student1 = Student("Arun", 20, 85)
2. Python allocates a new empty object in memory.
3. Python invokes __init__(new_object, "Arun", 20, 85).
4. self.name = "Arun", self.age = 20, self.mark = 85 binds attributes to the new object.
5. The initialized object is returned and assigned to student1.
```

---

## 11. Demystifying `self`

`self` refers to the **specific instance** currently running the method.

- When `student1 = Student("Arun", 20, 85)` runs: inside `__init__`, `self` is `student1`.
- When `student2 = Student("Priya", 19, 92)` runs: inside `__init__`, `self` is `student2`.

### Why `self.name = name`?
- `name` is the temporary parameter passed into the method.
- `self.name` is the permanent attribute living inside that specific object's memory.

---

## 12. Multiple Objects Have Independent State

```python
class Student:
    def __init__(self, name, mark):
        self.name = name
        self.mark = mark

student1 = Student("Arun", 85)
student2 = Student("Priya", 92)
student3 = Student("Rahul", 75)

print(student1.name, student1.mark)  # Arun 85
print(student2.name, student2.mark)  # Priya 92
print(student3.name, student3.mark)  # Rahul 75
```
Modifying `student1.mark = 90` has zero impact on `student2` or `student3`.

---

## 13. What is a Method?

A **Method** is a function defined inside a class body that operates on the instance's data. Its first parameter is always `self`.

```python
class Student:
    def __init__(self, name, mark):
        self.name = name
        self.mark = mark

    def greet(self):
        print(f"Hello, my name is {self.name}!")

    def is_pass(self):
        return self.mark >= 40

    def display(self):
        status = "Pass" if self.is_pass() else "Fail"
        print(f"Name: {self.name} | Mark: {self.mark} | Result: {status}")
```

```python
s1 = Student("Arun", 85)
s1.greet()    # Hello, my name is Arun!
s1.display()  # Name: Arun | Mark: 85 | Result: Pass
```

---

## 14. Classes with Lists as Attributes

Objects can contain complex data structures such as lists, dictionaries, or other objects.

```python
class Student:
    def __init__(self, name, marks):
        self.name = name
        self.marks = marks  # List of numeric marks

    def total(self):
        return sum(self.marks)

    def average(self):
        return self.total() / len(self.marks) if self.marks else 0.0

    def is_pass(self):
        for m in self.marks:
            if m < 40:
                return False
        return True

    def display(self):
        print("Name   :", self.name)
        print("Marks  :", self.marks)
        print("Total  :", self.total())
        print("Average: %.2f" % self.average())
        print("Result :", "Pass" if self.is_pass() else "Fail")

student1 = Student("Arun", [80, 75, 90, 85, 70])
student1.display()
```
Output:
```text
Name   : Arun
Marks  : [80, 75, 90, 85, 70]
Total  : 400
Average: 80.00
Result : Pass
```

---

## 15. The Bank Account Model: Encapsulation & Validation

In financial software, balances must never become arbitrarily negative, and transactions must be strictly audited.

```python
class BankAccount:
    def __init__(self, holder, balance):
        if balance < 0:
            raise ValueError("Balance cannot be negative")
        self.holder = holder
        self.balance = balance

    def deposit(self, amount):
        if amount > 0:
            self.balance += amount
            return True
        return False

    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount
            return True
        else:
            print("Insufficient balance")
            return False

    def display(self):
        print(f"Holder: {self.holder}")
        print(f"Balance: {self.balance}")
```

### Why Encapsulated Methods Beat Direct Variable Mutation
If balance were modified directly (`account.balance -= 9000`), a user could accidentally withdraw more than available, creating negative balances. By routing operations through `.withdraw(amount)`, the object enforces its own invariant:
`amount <= self.balance`.

---

## 16. Unit-IV Integration: Classes + Files + Exceptions + Modules

The apex of Unit IV is combining:
- File persistence (`students.txt`)
- Defensive guards (`try...except FileNotFoundError, ValueError`)
- Reusable modules (`file_tools.py`)
- Object modeling (`Student` class)

```text
student_app/
│
├── main.py
├── student.py
├── file_tools.py
└── students.txt
```

### `student.py`:
```python
class Student:
    def __init__(self, name, mark):
        if not (0 <= mark <= 100):
            raise ValueError("Mark must be between 0 and 100")
        self.name = name
        self.mark = mark

    def is_pass(self):
        return self.mark >= 40

    def display(self):
        result = "Pass" if self.is_pass() else "Fail"
        print(f"Name: {self.name:<8} | Mark: {self.mark:>3} | Result: {result}")
```

### `file_tools.py`:
```python
def read_students(filename, StudentClass):
    students = []
    with open(filename, "r") as file:
        for line in file:
            line = line.strip()
            if line:
                name, mark_str = line.split(",")
                students.append(StudentClass(name.strip(), int(mark_str.strip())))
    return students
```

### `main.py`:
```python
from student import Student
import file_tools

try:
    roster = file_tools.read_students("students.txt", Student)
    print("===== STUDENT REPORT =====")
    for s in roster:
        s.display()
except FileNotFoundError:
    print("Student file not found")
except ValueError as err:
    print("Corrupt student record:", err)
```

---

## 17. Class vs. Object vs. Attribute vs. Method

| Concept | What It Is | Analogy | Syntax Example |
| :--- | :--- | :--- | :--- |
| **Class** | Blueprint / Type | Cookie cutter | `class Student:` |
| **Object** | Instance in memory | Freshly baked cookie | `s1 = Student("Arun", 85)` |
| **Attribute** | State / Data | Color, weight of cookie | `s1.name`, `s1.mark` |
| **Method** | Action / Behavior | Bite, bake, decorate | `s1.display()`, `s1.is_pass()` |
| **Constructor** | Setup method | Dough mixer | `def __init__(self, ...):` |
| **`self`** | Current instance | The specific cookie in hand | `self.name = name` |

---

## 18. Common Beginner Mistakes & How to Avoid Them

### Mistake 1: Forgetting `self` in Method Header
```python
# INCORRECT
class Student:
    def display():
        print("Hello")

# Calling s.display() raises:
# TypeError: Student.display() takes 0 positional arguments but 1 was given
```
**Fix:** Always include `self` as the first argument of every instance method: `def display(self):`.

---

### Mistake 2: Forgetting `self.` on Attributes
```python
# INCORRECT
class Student:
    def __init__(self, name):
        name = name  # Binds to local variable, not instance attribute!
```
**Fix:** Assign to `self.name = name`.

---

### Mistake 3: Omitting Parentheses During Instantiation
```python
# INCORRECT
s = Student  # Assigns class alias, does not create an object!

# CORRECT
s = Student("Arun", 85)
```

---

### Mistake 4: Calling a Method Without Its Instance
```python
# INCORRECT
display()  # NameError: name 'display' is not defined

# CORRECT
student.display()
```

---

## 19. Moodle Coding Arena Problem: Build a Bank Account Class

### Problem Statement
Create a Python class named `BankAccount` that models a bank account with:
- `holder` (string)
- `balance` (integer)

### Required Methods:
1. `__init__(self, holder, balance)`: Initializes `self.holder` and `self.balance`.
2. `deposit(self, amount)`: Adds `amount` to `self.balance`.
3. `withdraw(self, amount)`:
   - If `amount <= self.balance`, subtract `amount` from `self.balance` and return `True`.
   - If `amount > self.balance`, print `"Insufficient balance"`, do not alter `self.balance`, and return `False`.
4. `display(self)`: Prints:
   ```text
   Holder: <holder>
   Balance: <balance>
   ```

### Execution Flow:
Read four inputs in order:
1. Account holder name (string)
2. Initial starting balance (integer)
3. Deposit amount (integer)
4. Withdrawal amount (integer)

Instantiate `BankAccount`, invoke `.deposit()`, invoke `.withdraw()`, print `"===== ACCOUNT DETAILS =====\n"`, and invoke `.display()`.

---

## 20. Unit-IV Master Concept Map

```text
                            UNIT - IV
                               │
         ┌─────────────────────┼─────────────────────┐
         ↓                     ↓                     ↓
       FILES               EXCEPTIONS              CODE
   (Persistence)          (Reliability)        ORGANIZATION
         │                     │                     │
   ┌─────┼─────┐         ┌─────┼─────┐         ┌─────┴─────┐
   ↓     ↓     ↓         ↓     ↓     ↓         ↓           ↓
 read  write append     try except finally   Modules    Packages
                                                     │
                                                     ↓
                                                  Classes
                                                (Blueprints)
                                                     │
                                                     ↓
                                                  Objects
                                                 (Entities)
```

---

## 21. Unit-IV Master Cheat Sheet

```python
# 1. FILE OPERATIONS
with open("data.txt", "r") as f:
    lines = f.readlines()
with open("out.txt", "w") as f:
    f.write("Line 1\n")

# 2. COMMAND-LINE ARGS
import sys
script = sys.argv[0]
arg1 = sys.argv[1] if len(sys.argv) > 1 else None

# 3. EXCEPTION HANDLING
try:
    val = int("123")
except ValueError as e:
    print(f"Failed: {e}")
else:
    print("Success")
finally:
    print("Always runs")

# 4. MODULES & PACKAGES
from my_package.tools import calculate
import helper

# 5. CLASSES & OBJECTS
class BankAccount:
    def __init__(self, holder, balance):
        self.holder = holder
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount

    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount
            return True
        print("Insufficient balance")
        return False

    def display(self):
        print(f"Holder: {self.holder} | Balance: {self.balance}")

acc = BankAccount("Arun", 5000)
acc.deposit(1000)
acc.withdraw(2500)
acc.display()
```
