# Unit–III — Day 2: Lists — Slicing, Methods, Functions & Traversing

**Duration:** 90 Minutes  
**Level:** Beginner  
**Unit:** Unit–III — Control Flow & Data Processing  
**Day:** 2  
**Topics:** List Slices; List Methods; Common Built-in List Functions; Traversing Lists using for and while loops  

---

## 1. Day 2 Learning Objectives

By the end of this session, students should be able to:
- Understand what a list slice is.
- Extract a portion of a list using slicing.
- Use positive and negative indexes with slices.
- Understand the difference between `list[index]` and `list[start:end]`.
- Use common list methods:
  - `append()`
  - `insert()`
  - `remove()`
  - `pop()`
  - `clear()`
  - `sort()`
  - `reverse()`
  - `index()`
  - `count()`
- Use common built-in functions with lists:
  - `len()`
  - `max()`
  - `min()`
  - `sum()`
  - `sorted()`
- Traverse lists using `for` loops.
- Traverse lists using `while` loops.
- Combine lists with conditions (`if`) and functions.
- Solve beginner-friendly data collection problems.

---

## 2. 90-Minute Session Plan

| Time | Topic | Activity |
| --- | --- | --- |
| 0–5 min | Day 1 recap | Boolean + if quick questions |
| 5–18 min | List slicing | Index and slice practice |
| 18–38 min | List methods | Hands-on examples |
| 38–48 min | Built-in list functions | `len()`, `sum()`, `max()`, `min()` |
| 48–62 min | `for` loop traversal | Print & process every item |
| 62–73 min | `while` loop traversal | Index-based traversal |
| 73–80 min | Combined examples | Lists + `if` + loops |
| 80–87 min | Moodle practice | Find the Passing Marks |
| 87–90 min | Quiz | Knowledge check |

---

## 3. Quick Recap from Day 1

Before starting, test your understanding:

### Question 1
What does this produce?
```python
10 > 5
```
**Answer:** `True`

### Question 2
What does this do?
```python
if age >= 18:
```
**Answer:** Checks a condition and executes the indented block only when the condition evaluates to `True`.

### Question 3
What does `and` mean?  
**Answer:** Both conditions must evaluate to `True` for the overall expression to be `True`.

---

## 4. What is a List Slice?

A **slice** allows us to extract a subset or portion of a list without modifying the original list.

Suppose we have:
```python
fruits = ["apple", "banana", "mango", "orange", "grape"]
```

### Positive Indexes:
| Element | Index |
| --- | --- |
| `"apple"` | `0` |
| `"banana"` | `1` |
| `"mango"` | `2` |
| `"orange"` | `3` |
| `"grape"` | `4` |

To extract items from index 1 to 3:
```python
print(fruits[1:4])
```

**Output:**
```
['banana', 'mango', 'orange']
```

---

## 5. Slice Syntax

The fundamental syntax for slicing is:
```python
list[start:end]
```

> **Crucial Rule:**  
> `start` is **included** (inclusive).  
> `end` is **excluded** (exclusive, stops right before this index).

```python
numbers = [10, 20, 30, 40, 50]
print(numbers[1:4])
```

**Output:**
```
[20, 30, 40]
```
*Indices 1, 2, and 3 are selected. Index 4 is not included.*

---

## 6. Common Slice Examples

Given:
```python
numbers = [10, 20, 30, 40, 50]
```

### First three items:
```python
print(numbers[0:3])  # Output: [10, 20, 30]
```

### Middle items:
```python
print(numbers[1:4])  # Output: [20, 30, 40]
```

### Last items:
```python
print(numbers[3:5])  # Output: [40, 50]
```

---

## 7. Omitting Start or End

Python allows omitting either boundary:

### From the beginning (`[:end]`):
```python
numbers = [10, 20, 30, 40, 50]
print(numbers[:3])  # Output: [10, 20, 30]
```
*Meaning: Start from index 0 and stop before index 3.*

### Until the end (`[start:]`):
```python
print(numbers[2:])  # Output: [30, 40, 50]
```
*Meaning: Start at index 2 and continue through the final element.*

### Entire shallow copy (`[:]`):
```python
print(numbers[:])   # Output: [10, 20, 30, 40, 50]
```

---

## 8. Negative Indexing with Slices

Negative indexes count backwards from the right end of the list:

```text
numbers = [ 10,   20,   30,   40,   50 ]
Indexes:   -5    -4    -3    -2    -1
```

```python
# Last three items
print(numbers[-3:])  # Output: [30, 40, 50]

# Last two items
print(numbers[-2:])  # Output: [40, 50]
```

---

## 9. Slicing with a Step

You can specify a third parameter: the step size.
```python
list[start:end:step]
```

```python
numbers = [1, 2, 3, 4, 5, 6]
print(numbers[0:6:2])
```
**Output:**
```
[1, 3, 5]
```
*Takes every 2nd element starting from 0.*

### Reversing a List with Slicing:
```python
print(numbers[::-1])
```
**Output:**
```
[6, 5, 4, 3, 2, 1]
```

---

## 10. Slice vs Index

| Expression | Type of Result | Meaning |
| --- | --- | --- |
| `numbers[2]` | Single item (e.g. integer) | One element at index 2 |
| `numbers[1:4]` | New `list` | Sublist containing items at indices 1, 2, 3 |
| `numbers[:3]` | New `list` | First 3 items |
| `numbers[2:]` | New `list` | Elements from index 2 to the end |
| `numbers[::-1]` | New `list` | Reverses the entire list |

```python
numbers = [10, 20, 30, 40, 50]
print(numbers[2])    # 30 (element)
print(numbers[2:4])  # [30, 40] (list)
```

---

## 11. What is a List Method?

A **method** is a built-in function that is attached to and called directly on a list object using dot notation:
```python
numbers.append(60)
```

---

## 12. `append()`

Appends a new element to the end of the list:

```python
fruits = ["apple", "banana"]
fruits.append("mango")
print(fruits)
```
**Output:**
```
['apple', 'banana', 'mango']
```

*Real-world example — Shopping Cart:*
```python
cart = ["Shirt", "Shoes"]
cart.append("Bag")
print(cart)  # ['Shirt', 'Shoes', 'Bag']
```

---

## 13. `insert()`

Inserts an element at a specific index, shifting subsequent elements to the right:

```python
fruits = ["apple", "mango"]
fruits.insert(1, "banana")
print(fruits)
```
**Output:**
```
['apple', 'banana', 'mango']
```

**Syntax:** `list.insert(index, value)`

---

## 14. `remove()`

Finds and deletes the first occurrence of a specific value:

```python
fruits = ["apple", "banana", "mango"]
fruits.remove("banana")
print(fruits)
```
**Output:**
```
['apple', 'mango']
```

> **Important:** `remove()` searches by **value**, not by index. If the value does not exist, it raises a `ValueError`.

---

## 15. `pop()`

Removes an item at the specified index and **returns** that removed value:

```python
numbers = [10, 20, 30, 40]
removed = numbers.pop(1)

print("Removed:", removed)
print("Remaining:", numbers)
```
**Output:**
```
Removed: 20
Remaining: [10, 30, 40]
```

### Difference: `remove()` vs `pop()`
- `remove(value)` $\rightarrow$ Removes matching **value**; returns `None`.
- `pop(index)` $\rightarrow$ Removes item at specified **index**; returns the item. (If no index is provided, `pop()` removes the last item).

---

## 16. `clear()`

Empties the entire list:

```python
numbers = [10, 20, 30]
numbers.clear()
print(numbers)
```
**Output:**
```
[]
```

---

## 17. `sort()`

Sorts the list **in-place** (modifies the original list directly):

```python
numbers = [50, 20, 40, 10, 30]
numbers.sort()
print(numbers)
```
**Output:**
```
[10, 20, 30, 40, 50]
```

### Descending Order:
```python
numbers.sort(reverse=True)
print(numbers)
```
**Output:**
```
[50, 40, 30, 20, 10]
```

---

## 18. `reverse()`

Reverses the elements of the list in-place:

```python
numbers = [10, 20, 30, 40]
numbers.reverse()
print(numbers)
```
**Output:**
```
[40, 30, 20, 10]
```

> **Key Difference:**
> - `sort()`: Orders elements according to numeric or alphabetical value.
> - `reverse()`: Simply flips the order from right to left without sorting.

---

## 19. `index()`

Returns the index (0-based) of the first matching item:

```python
fruits = ["apple", "banana", "mango"]
position = fruits.index("banana")
print(position)
```
**Output:**
```
1
```

---

## 20. `count()`

Counts how many times a given element appears in the list:

```python
numbers = [10, 20, 10, 30, 10]
print(numbers.count(10))
```
**Output:**
```
3
```

---

## 21. List Methods Cheat Sheet

| Method | Syntax | Purpose |
| --- | --- | --- |
| `append()` | `list.append(x)` | Adds item `x` at the end |
| `insert()` | `list.insert(i, x)` | Inserts item `x` at index `i` |
| `remove()` | `list.remove(x)` | Deletes the first occurrence of value `x` |
| `pop()` | `list.pop(i)` | Removes and returns element at index `i` (default last) |
| `clear()` | `list.clear()` | Removes all elements |
| `sort()` | `list.sort()` | Sorts the existing list in-place |
| `reverse()` | `list.reverse()` | Reverses the existing list order in-place |
| `index()` | `list.index(x)` | Returns index of first occurrence of `x` |
| `count()` | `list.count(x)` | Returns total occurrences of `x` |

---

## 22. Common Built-in Functions for Lists

Python includes universal built-in functions that accept lists as arguments:
- `len()`
- `sum()`
- `max()`
- `min()`
- `sorted()`

---

## 23. `len()`

Returns total count of elements:

```python
numbers = [10, 20, 30, 40]
print(len(numbers))  # Output: 4
```

---

## 24. `sum()`

Calculates the arithmetic sum of numeric elements:

```python
marks = [80, 75, 90]
print(sum(marks))  # Output: 245
```

---

## 25. `max()` and `min()`

Find the largest and smallest items:

```python
marks = [80, 75, 90, 65]
print("Highest:", max(marks))
print("Lowest:", min(marks))
```
**Output:**
```
Highest: 90
Lowest: 65
```

---

## 26. `sorted()` vs `sort()`

```python
numbers = [50, 10, 40, 20]
result = sorted(numbers)

print("Original:", numbers)
print("Sorted Copy:", result)
```
**Output:**
```
Original: [50, 10, 40, 20]
Sorted Copy: [10, 20, 40, 50]
```

| Feature | `list.sort()` | `sorted(list)` |
| --- | --- | --- |
| **Type** | List method | Built-in Python function |
| **Modification** | In-place (mutates original) | Returns a new sorted list |
| **Original List** | Altered | Unchanged |

---

## 27. What is List Traversal?

**Traversing** means visiting every single item in a collection sequentially to read, check, or transform it.

```text
numbers = [10, 20, 30, 40]

Traversal order:
10  ──>  20  ──>  30  ──>  40
```

---

## 28. Traversing with a `for` Loop

The most pythonic and intuitive approach:

```python
numbers = [10, 20, 30, 40]

for number in numbers:
    print(number)
```
**Output:**
```
10
20
30
40
```

### Execution Flow:
```text
numbers
   ↓
10 ──> execute loop body
20 ──> execute loop body
30 ──> execute loop body
40 ──> execute loop body
   ↓
Loop Finished
```

---

## 29. Real-World Example — Student Scores

```python
marks = [80, 75, 90, 85]

for mark in marks:
    print("Student Score:", mark)
```

---

## 30. `for` Loop with `if` (Filtering)

Combining traversal with conditional logic:

```python
marks = [35, 50, 80, 25, 70]

for mark in marks:
    if mark >= 40:
        print("Passing mark:", mark)
```
**Output:**
```
Passing mark: 50
Passing mark: 80
Passing mark: 70
```

---

## 31. `for` Loop — Accumulator Pattern (Total)

```python
numbers = [10, 20, 30]
total = 0

for number in numbers:
    total = total + number

print("Total:", total)
```
**Output:**
```
Total: 60
```
*(Notice how `sum(numbers)` serves as the built-in shorthand for this exact pattern!)*

---

## 32. Traversing with a `while` Loop

Index-controlled iteration:

```python
numbers = [10, 20, 30, 40]
i = 0

while i < len(numbers):
    print(numbers[i])
    i += 1
```
**Output:**
```
10
20
30
40
```

### Step Trace:
1. `i = 0` $\rightarrow$ print `numbers[0]` (10), `i` becomes 1
2. `i = 1` $\rightarrow$ print `numbers[1]` (20), `i` becomes 2
3. `i = 2` $\rightarrow$ print `numbers[2]` (30), `i` becomes 3
4. `i = 3` $\rightarrow$ print `numbers[3]` (40), `i` becomes 4
5. `i = 4` $\rightarrow$ `4 < 4` is `False` $\rightarrow$ terminate.

---

## 33. `for` vs `while` for Lists

| Feature | `for` Loop | `while` Loop |
| --- | --- | --- |
| **Ease of Use** | Very clean & simple | Requires manual index management |
| **Index Access** | Directly yields items | Uses index subscript `[i]` |
| **Risk** | Safe | Risk of infinite loop if `i += 1` omitted |
| **Recommendation** | Use for general traversal | Use when dynamic stepping or early stopping condition needed |

---

## 34. `for` with Index via `range(len())`

When both the index position and the item value are needed:

```python
numbers = [10, 20, 30]

for i in range(len(numbers)):
    print(f"Index {i} contains {numbers[i]}")
```
**Output:**
```
Index 0 contains 10
Index 1 contains 20
Index 2 contains 30
```

---

## 35. Illustrative Program — Find Even Numbers

```python
numbers = [10, 15, 22, 33, 40]

for number in numbers:
    if number % 2 == 0:
        print(number)
```
**Output:**
```
10
22
40
```

---

## 36. Illustrative Program — Count Passing Students

```python
marks = [80, 35, 60, 25, 90]
count = 0

for mark in marks:
    if mark >= 40:
        count += 1

print("Passed:", count)
```
**Output:**
```
Passed: 3
```

---

## 37. Illustrative Program — Shopping Cart Total

```python
prices = [100, 250, 500, 150]
total = 0

for price in prices:
    total += price

print("Total:", total)
# Or using built-in: print("Total:", sum(prices))
```
**Output:**
```
Total: 1000
```

---

## 38. Illustrative Program — Functions + Lists + Loops

```python
def calculate_total(numbers):
    total = 0
    for number in numbers:
        total += number
    return total

numbers = [10, 20, 30, 40]
result = calculate_total(numbers)
print("Total:", result)
```
**Output:**
```
Total: 100
```

---

## 39. Illustrative Program — Filter High Marks

```python
marks = [45, 80, 35, 90, 60]

for mark in marks:
    if mark >= 60:
        print(mark)
```
**Output:**
```
80
90
60
```

---

## 40. Common Beginner Mistakes

### Mistake 1 — Confusing the slice end index
```python
numbers = [10, 20, 30, 40, 50]
print(numbers[1:3])
```
*Output is `[20, 30]`, not `[20, 30, 40]`, because the index 3 item is excluded.*

### Mistake 2 — Using `remove()` with an index
```python
# WRONG (attempts to remove the value 2)
numbers.remove(2)

# CORRECT (removes element at index 2)
numbers.pop(2)
```

### Mistake 3 — Forgetting `i += 1` in `while` loop
```python
# INFINITE LOOP
i = 0
while i < len(numbers):
    print(numbers[i])
    # Missing i += 1 causes indefinite freeze!
```

### Mistake 4 — Modifying a list while traversing it
Avoid `append()` or `remove()` on a list while iterating over it with a `for` loop, as it shifts indexes unexpectedly.

---

## 41. Quick Student Workout

### Workout 1
```python
numbers = [10, 20, 30, 40, 50]
print(numbers[1:4])
```
*Answer:* `[20, 30, 40]`

### Workout 2
```python
numbers = [10, 20, 30]
numbers.append(40)
print(numbers)
```
*Answer:* `[10, 20, 30, 40]`

### Workout 3
```python
numbers = [10, 20, 30, 40]
for number in numbers:
    if number > 20:
        print(number)
```
*Answer:*
```
30
40
```

### Workout 4
```python
numbers = [10, 20, 30]
i = 0
while i < len(numbers):
    print(numbers[i])
    i += 1
```
*Answer:*
```
10
20
30
```

---

## 42. Unit–III Day 2 Cheat Sheet

| Concept | Syntax / Operation | Remember |
| --- | --- | --- |
| **Slicing** | `list[start:end]` | `start` is included, `end` is excluded |
| **Reverse Slice** | `list[::-1]` | Reverses list via step `-1` |
| **`append()`** | `list.append(item)` | Inserts at the end |
| **`insert()`** | `list.insert(i, item)` | Inserts at specified index `i` |
| **`remove()`** | `list.remove(val)` | Deletes by value |
| **`pop()`** | `list.pop(i)` | Deletes by index & returns element |
| **`clear()`** | `list.clear()` | Empties list |
| **`sort()`** | `list.sort()` | Sorts list in-place |
| **`reverse()`** | `list.reverse()` | Flips order in-place |
| **`index()`** | `list.index(val)` | Finds first index of value |
| **`count()`** | `list.count(val)` | Counts occurrences of value |
| **`len()`** | `len(list)` | Returns total item count |
| **`sum()`** | `sum(list)` | Returns total sum |
| **`max()` / `min()`** | `max(list)`, `min(list)` | Returns largest / smallest value |
| **`sorted()`** | `sorted(list)` | Returns new sorted copy |
| **`for` loop** | `for x in list:` | Straightforward item traversal |
| **`while` loop** | `while i < len(list):` | Index-managed traversal |

---

## 43. Day 2 Final Challenge

Predict the output before running:
```python
numbers = [10, 20, 30, 40, 50]
numbers.append(60)

for number in numbers:
    if number >= 30:
        print(number)
```

### Execution Flow:
1. Initialize list with 5 items.
2. `append(60)` adds 60 to the end.
3. Traverse items sequentially.
4. If `number >= 30`, print it.

**Expected Output:**
```
30
40
50
60
```

> **Day 2 Key Takeaway:** Lists store collections of data; slicing extracts portions; methods modify values; built-in functions compute aggregates; and loops visit every element to make intelligent, conditional decisions.
