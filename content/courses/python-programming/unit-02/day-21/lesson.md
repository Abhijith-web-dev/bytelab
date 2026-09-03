# Unit–II — Day 9: String Module, Lists as Arrays & Working with Numeric Arrays

**Duration:** 90 Minutes  
**Level:** Beginner → Intermediate  
**Unit:** Unit–II — Control Flow, Functions & Data Structures  
**Day:** 9  
**Topics Covered:** String Module; `string` module constants; Useful functions from the string module; Lists as Arrays; Creating arrays using lists; List operations; List indexing and slicing; List traversal; Updating list elements; Adding and removing elements; Working with arrays of numbers; Finding sum, maximum, minimum, and average; Practical numeric-array programs  

---

## 1. Learning Objectives

By the end of this session, students should be able to:
- Understand and import the standard Python **`string` module**.
- Utilize built-in string constants: `string.ascii_letters`, `string.digits`, `string.punctuation`, etc.
- Understand how Python **lists function as 1D dynamic arrays**.
- Create and initialize arrays of homogeneous numeric values (integers and floats).
- Access elements using 0-based positive and negative index offsets.
- Update list elements in place, demonstrating **list mutability**.
- Dynamically manipulate arrays: `append()`, `insert()`, `extend()`, `pop()`, `remove()`, and `del`.
- Traverse numeric arrays using `for item in lst`, `for i in range(len(lst))`, and `enumerate()`.
- Calculate statistical aggregates: **sum, average, maximum, and minimum**.
- Implement manual linear scans and extrema search algorithms without relying solely on `max()` and `min()`.
- Filter numeric data into categorical subsets (e.g., evens, odds, positives, negatives).

---

## 2. 90-Minute Session Plan

| Time | Topic | Activity |
| --- | --- | --- |
| 0–10 min | Recap | Review string indexing, slicing, immutability, and string methods |
| 10–20 min | String Module | `import string`, character constants and validation |
| 20–35 min | Lists as Arrays | Representing arrays with lists, memory model, and indexing |
| 35–50 min | List Operations | In-place updates, adding (`append`, `insert`) and deleting (`pop`, `remove`) |
| 50–62 min | List Traversal | Comparing direct traversal, index loops, and `enumerate()` |
| 62–75 min | Numeric Arrays | Calculating sum, average, max, min, and frequency counts |
| 75–83 min | Practical Programs | Manual search, positive/negative partitioning, marks analysis |
| 83–87 min | Student Workout | Interactive code drills and outputs |
| 87–90 min | Quiz + Cheat Sheet | Mastery assessment and summary |

---

## 3. Quick Recap from Day 8

In Day 8, we explored Python's textual sequence type: **strings**.

```python
text = "Python"
print(text[0])       # 'P'
print(text[-1])      # 'n'
print(text[1:4])     # 'yth'
print(text[::-1])    # 'nohtyP'
```

We also discovered that strings are **immutable**—they cannot be modified in place.

Today, we take two critical computational steps:
1. We examine the standard **`string` module** for character classification constants.
2. We transition to **mutable sequences (lists)**, utilizing them as contiguous **numerical arrays**:
   ```python
   marks = [78, 85, 92, 67, 88]
   ```

---

## 4. What is the String Module?

Python includes a standard library module named **`string`**.
A **module** is a pre-packaged collection of functions, classes, and constants.

To use it:
```python
import string
```

---

## 5. String Module Constants

Instead of manually typing long sequences of characters, the `string` module provides pre-defined, standardized character constants:

| Constant | Contained Characters |
| :--- | :--- |
| **`string.ascii_lowercase`** | `'abcdefghijklmnopqrstuvwxyz'` |
| **`string.ascii_uppercase`** | `'ABCDEFGHIJKLMNOPQRSTUVWXYZ'` |
| **`string.ascii_letters`** | All lowercase and uppercase letters |
| **`string.digits`** | `'0123456789'` |
| **`string.hexdigits`** | `'0123456789abcdefABCDEF'` |
| **`string.punctuation`** | `'!"#$%&\'()*+,-./:;<=>?@[\\]^_`{\|}~'` |
| **`string.whitespace`** | Spaces, tabs (`\t`), newlines (`\n`), returns (`\r`) |

---

## 6. Practical Applications of the `string` Module

### Validating Alphabetic Characters
```python
import string

ch = input("Enter a character: ")

if ch in string.ascii_letters:
    print(f"'{ch}' is an English alphabet letter.")
else:
    print(f"'{ch}' is NOT a letter.")
```

### Counting Digits in Text
```python
import string

text = "ByteLab2026Python3"
digit_count = sum(1 for ch in text if ch in string.digits)
print("Digits Found:", digit_count)  # 5 ('2', '0', '2', '6', '3')
```

---

## 7. What is an Array?

An **array** is an ordered data structure that stores multiple values of data sequentially in memory under a single variable name.

Instead of declaring individual variables:
```python
# Unmaintainable approach:
score1 = 80
score2 = 90
score3 = 75
score4 = 88
```
We store them together in a single container:
```python
scores = [80, 90, 75, 88]
```

In Python, the **list** is the standard, built-in dynamic array.

---

## 8. Memory Structure of Lists as Arrays

```text
scores = [80, 90, 75, 88, 95]

             0     1     2     3     4   (Positive Indexes)
          ┌─────┬─────┬─────┬─────┬─────┐
scores ──►│ 80  │ 90  │ 75  │ 88  │ 95  │
          └─────┴─────┴─────┴─────┴─────┘
            -5    -4    -3    -2    -1   (Negative Indexes)
```

- Each cell holds an element accessible in $O(1)$ time via its integer index.
- Lists automatically expand and shrink as elements are added or deleted.

---

## 9. Creating Numeric Lists

```python
# Integer array
temperatures = [28, 32, 30, 35, 29]

# Floating-point array
prices = [19.99, 4.50, 99.00, 12.75]

# Empty array initialized for user input
dynamic_array = []
```

---

## 10. Accessing Elements via Indexing

```python
numbers = [10, 20, 30, 40, 50]

print(numbers[0])   # 10 (First element)
print(numbers[2])   # 30 (Third element)
print(numbers[-1])  # 50 (Last element)
```

---

## 11. Slicing Numeric Arrays

```python
numbers = [10, 20, 30, 40, 50]

# Sub-array from index 1 to 3 (stop index 4 excluded)
print(numbers[1:4])  # [20, 30, 40]

# First three elements
print(numbers[:3])   # [10, 20, 30]

# All elements from index 3 onwards
print(numbers[3:])   # [40, 50]
```

---

## 12. Updating List Elements (Mutability)

Unlike strings, **lists are mutable**. You can reassign elements in place:

```python
numbers = [10, 20, 30]

# Modify the second element in place:
numbers[1] = 200

print(numbers)  # [10, 200, 30]
```

---

## 13. Dynamic Sizing: Adding Elements

### 1. `append(value)`
Appends an element to the end of the list ($O(1)$ amortized):
```python
numbers = [10, 20, 30]
numbers.append(40)
print(numbers)  # [10, 20, 30, 40]
```

### 2. `insert(index, value)`
Inserts an element at a designated index, shifting subsequent items right:
```python
numbers = [10, 20, 30]
numbers.insert(1, 15)
print(numbers)  # [10, 15, 20, 30]
```

### 3. `extend(iterable)`
Unpacks elements from another iterable onto the end:
```python
numbers = [10, 20]
numbers.extend([30, 40, 50])
print(numbers)  # [10, 20, 30, 40, 50]
```

---

## 14. Removing Elements

### 1. `remove(value)`
Removes the first occurrence of a matching value:
```python
numbers = [10, 20, 30, 20]
numbers.remove(20)
print(numbers)  # [10, 30, 20]
```

### 2. `pop([index])`
Removes and returns the item at the given index (defaults to the last item):
```python
numbers = [10, 20, 30]
last_val = numbers.pop()  # Removes and returns 30
print(last_val)           # 30
print(numbers)            # [10, 20]
```

### 3. `del` Statement
Removes an item by index or slices out a range:
```python
numbers = [10, 20, 30]
del numbers[0]
print(numbers)  # [20, 30]
```

---

## 15. Array Traversal Patterns

### Pattern A: Direct Element Traversal
```python
numbers = [10, 20, 30, 40]
for num in numbers:
    print(num)
```

### Pattern B: Index-Based Traversal
```python
for i in range(len(numbers)):
    print(f"Index {i} holds {numbers[i]}")
```

### Pattern C: Index and Value Traversal (`enumerate`)
```python
for idx, val in enumerate(numbers):
    print(f"{idx} -> {val}")
```

---

## 16. Reading Numeric Arrays from User Input

```python
numbers = []
size = int(input("Enter size: "))

for _ in range(size):
    num = int(input("Enter number: "))
    numbers.append(num)

print("Array:", numbers)
```

---

## 17. Fundamental Numeric Calculations

### Calculating Sum and Average
```python
numbers = [10, 20, 30, 40, 50]

total = sum(numbers)
average = total / len(numbers)

print("Sum:", total)        # 150
print("Average:", average)  # 30.0
```

### Built-in Extrema
```python
scores = [45, 92, 18, 77, 85]
print("Maximum:", max(scores))  # 92
print("Minimum:", min(scores))  # 18
```

---

## 18. Manual Extremum Search Algorithm

Understanding the algorithmic mechanics of finding extrema without built-in shortcuts:

```python
numbers = [10, 50, 20, 80, 30]

# Assume the first element is the largest:
largest = numbers[0]

for val in numbers:
    if val > largest:
        largest = val

print("Largest Found:", largest)  # 80
```

```text
Initialize: largest = 10
Compare 50 > 10 ──► Update: largest = 50
Compare 20 > 50 ──► No change
Compare 80 > 50 ──► Update: largest = 80
Compare 30 > 80 ──► No change
Final: 80
```

---

## 19. Partitioning and Categorizing Numeric Data

```python
numbers = [-10, 15, 0, 22, -4, 30]

positives = [x for x in numbers if x > 0]
negatives = [x for x in numbers if x < 0]
evens = [x for x in numbers if x % 2 == 0]
odds = [x for x in numbers if x % 2 != 0]

print("Positives:", positives)  # [15, 22, 30]
print("Negatives:", negatives)  # [-10, -4]
print("Evens:", evens)          # [-10, 0, 22, -4, 30]
print("Odds:", odds)            # [15]
```
> **Note:** Zero ($0$) is neither positive nor negative, but it is classified mathematically as an even integer ($0 \pmod 2 = 0$).

---

## 20. Practical Program: Student Marks Analyzer

```python
marks = [78, 85, 92, 67, 88]

total = sum(marks)
avg = total / len(marks)
highest = max(marks)
lowest = min(marks)
passed = sum(1 for m in marks if m >= 40)

print(f"Total: {total} | Avg: {avg:.2f}")
print(f"Highest: {highest} | Lowest: {lowest}")
print(f"Students Passed: {passed}/{len(marks)}")
```

---

## 21. Common Beginner Mistakes

### 1. `IndexError` on List Assignment
```python
nums = []
nums[0] = 10  # IndexError: list assignment index out of range!
# Correct:
nums.append(10)
```

### 2. Forgetting `int()` on User Input
```python
val = input("Enter number: ")
# val is a string '10', so adding it causes a TypeError when summing!
```

### 3. Division by Zero on Empty Arrays
```python
nums = []
avg = sum(nums) / len(nums)  # ZeroDivisionError!
# Guard:
if len(nums) > 0:
    avg = sum(nums) / len(nums)
```

---

## 22. Quick Student Workout

### Workout 1
What is `[10, 20, 30][0]`?  
*Answer:* `10`

### Workout 2
What is the result of:
```python
a = [1, 2, 3]
a.append(4)
print(a)
```
*Answer:* `[1, 2, 3, 4]`

### Workout 3
What is `sum([5, 10, 15, 20])`?  
*Answer:* `50`

### Workout 4
What is `len([10, 20, 30, 40, 50])`?  
*Answer:* `5`

---

## 23. Unit-II Day 9 Cheat Sheet

| Operation | Syntax | Effect |
| :--- | :--- | :--- |
| **String Module** | `import string` | Access standard text constants |
| **Digits** | `string.digits` | `'0123456789'` |
| **Create Array** | `nums = [10, 20, 30]` | Initialize a list |
| **Append** | `nums.append(40)` | Add to end |
| **Insert** | `nums.insert(1, 15)` | Insert at index 1 |
| **Remove** | `nums.remove(20)` | Delete first matching item |
| **Pop** | `nums.pop()` | Remove and return last element |
| **Sum** | `sum(nums)` | Add all numeric values |
| **Average** | `sum(nums) / len(nums)` | Calculate mean |
| **Maximum** | `max(nums)` | Return highest value |
| **Minimum** | `min(nums)` | Return lowest value |

---

## 24. Day 9 Capstone Challenge: Numeric Array Analyzer

```python
size = int(input())
numbers = [int(input()) for _ in range(size)]

total = sum(numbers)
avg = total / size

largest = numbers[0]
smallest = numbers[0]
for n in numbers:
    if n > largest:
        largest = n
    if n < smallest:
        smallest = n

even_count = sum(1 for n in numbers if n % 2 == 0)
odd_count = sum(1 for n in numbers if n % 2 != 0)
positive_count = sum(1 for n in numbers if n > 0)
negative_count = sum(1 for n in numbers if n < 0)

print("Array =", numbers)
print("Sum =", total)
print("Average =", avg)
print("Largest =", largest)
print("Smallest =", smallest)
print("Even =", even_count)
print("Odd =", odd_count)
print("Positive =", positive_count)
print("Negative =", negative_count)
```

> **Takeaway:** Lists empower you to handle collections of numeric data as arrays. Combined with loops and conditional checks, you can perform comprehensive statistical processing and analysis!
