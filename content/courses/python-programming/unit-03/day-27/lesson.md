# Unit–III — Day 4: Lists as Function Parameters & List-Based Problem Solving

**Duration:** 90 Minutes  
**Level:** Beginner  
**Unit:** Unit–III — Control Flow & Data Processing  
**Day:** 4  
**Topics:** Lists as Function Parameters; Passing Lists to Functions; Modifying Lists Inside Functions; List-Based Problem Solving  

---

## 1. Day 4 Learning Objectives

By the end of this session, students should be able to:
- Pass a list as an argument to a function.
- Use a list as a function parameter.
- Access list elements and slice subsets inside a function.
- Traverse a list inside a function using `for` and `while` loops.
- Calculate values and aggregates from a list using functions.
- Modify a list inside a function and understand why it impacts the original object.
- Use cloning when the caller's original list must remain protected.
- Combine functions, lists, loops, conditions, and operators into clean modular code.
- Apply standard problem-solving patterns (accumulate, filter, count, transform).

---

## 2. 90-Minute Session Plan

| Time | Topic | Activity |
| --- | --- | --- |
| 0–5 min | Day 3 recap | Mutability, aliasing, and cloning recap |
| 5–18 min | Lists as parameters | Passing a list to a function |
| 18–30 min | Accessing list data | Indexing and traversal within functions |
| 30–43 min | List processing in functions | `sum()`, `len()`, `max()`, `min()` |
| 43–57 min | Modifying lists inside functions | In-place mutable behavior |
| 57–68 min | Original list vs cloned list | Practical comparison |
| 68–78 min | List-based problem solving | Real-world modular design |
| 78–87 min | Moodle practice | Calculate and Update Student Marks |
| 87–90 min | Quiz | Quick assessment |

---

## 3. Quick Recap from Day 3

In Day 3, we learned:
- **Lists are mutable:** Elements can be added, updated, or deleted in-place.
- **Aliasing (`b = a`):** Two variable names point to the same list in memory.
- **Cloning (`b = a.copy()` or `b = a[:]`):** An independent duplicate list is allocated in memory.

Today, we apply these concepts to **functions**.

---

## 4. Can a List Be Passed to a Function?

**Yes.** In Python, variables of any type — including collections like lists — can be passed into functions:

```python
def display_items(items):
    print(items)

products = ["Pen", "Pencil", "Book"]
display_items(products)
```

**Output:**
```
['Pen', 'Pencil', 'Book']
```

---

## 5. Parameter vs Argument with Lists

```python
def display_items(items):
    print(items)

products = ["Pen", "Pencil", "Book"]
display_items(products)
```

| Term | In This Program | Meaning |
| --- | --- | --- |
| **Parameter** | `items` | The variable defined in the function signature |
| **Argument** | `products` | The variable passed during the function call |
| **Value** | `["Pen", "Pencil", "Book"]` | The actual list object passed to the function |

---

## 6. Reusability: Passing Different Lists

A single function can process many different lists:

```python
def display_items(items):
    print(items)

fruits = ["Apple", "Mango"]
vegetables = ["Carrot", "Potato"]

display_items(fruits)
display_items(vegetables)
```
**Output:**
```
['Apple', 'Mango']
['Carrot', 'Potato']
```

> **Engineering Principle:** *Write once, reuse everywhere.* The function does not care what data is inside the list, as long as the operations on it are valid.

---

## 7. Accessing List Elements Inside a Function

A function can access individual elements using regular index syntax:

```python
def print_first_item(items):
    print("First item:", items[0])

numbers = [10, 20, 30]
print_first_item(numbers)
```
**Output:**
```
First item: 10
```

---

## 8. Traversing a List Inside a Function

You can use a loop inside a function to visit each item:

```python
def display_numbers(numbers):
    for number in numbers:
        print(number)

values = [10, 20, 30, 40]
display_numbers(values)
```
**Output:**
```
10
20
30
40
```

---

## 9. Calculating List Total Inside a Function

Functions often process collections and return a single aggregated result:

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

## 10. Using Built-in Functions Inside a Function

You can leverage Python's built-in functions inside custom functions:

```python
def calculate_total(numbers):
    return sum(numbers)

def find_average(numbers):
    return sum(numbers) / len(numbers)

numbers = [10, 20, 30]
print("Total:  ", calculate_total(numbers))
print("Average:", find_average(numbers))
```
**Output:**
```
Total:   60
Average: 20.0
```

---

## 11. Finding Maximum and Minimum

Multiple specialized functions can operate on the same list:

```python
def find_highest(numbers):
    return max(numbers)

def find_lowest(numbers):
    return min(numbers)

marks = [80, 75, 95, 60]
print("Highest:", find_highest(marks))
print("Lowest: ", find_lowest(marks))
```
**Output:**
```
Highest: 95
Lowest:  60
```

---

## 12. Passing a List Along with Other Parameters

Functions can accept a list alongside other primitive values (such as an integer or float):

```python
def add_bonus(marks, bonus):
    for i in range(len(marks)):
        marks[i] += bonus

marks = [70, 80, 90]
add_bonus(marks, 5)
print(marks)
```
**Output:**
```
[75, 85, 95]
```

- `marks` $\rightarrow$ list parameter
- `bonus` $\rightarrow$ integer parameter

---

## 13. Modifying a List Inside a Function

Because lists are **mutable**, modifying a list parameter modifies the caller's original list!

```python
def add_item(items):
    items.append("Notebook")

products = ["Pen", "Pencil"]
add_item(products)
print(products)
```
**Output:**
```
['Pen', 'Pencil', 'Notebook']
```

---

## 14. Visualizing How References Work in Function Calls

When `products` is passed to `add_item(products)`:
```text
Outside Function:
products ───────────┐
                    ↓
Inside Function:  [ "Pen", "Pencil" ]
items    ───────────┘
```

Both `products` and `items` point to the **same object in memory**.  
When `items.append("Notebook")` runs, it updates that single list object:

```text
products ───────────┐
                    ↓
                  [ "Pen", "Pencil", "Notebook" ]
                    ↑
items    ───────────┘
```

---

## 15. Modifying Specific List Elements Inside a Function

```python
def update_first(numbers):
    numbers[0] = 100

values = [10, 20, 30]
update_first(values)
print(values)
```
**Output:**
```
[100, 20, 30]
```

---

## 16. Modifying Every Element Using Index Traversal

```python
def double_numbers(numbers):
    for i in range(len(numbers)):
        numbers[i] *= 2

values = [10, 20, 30]
double_numbers(values)
print(values)
```
**Output:**
```
[20, 40, 60]
```

---

## 17. `for item in list` vs `for i in range(len(list))`

| Goal | Technique | Example |
| --- | --- | --- |
| **Read values only** | `for item in list:` | `for mark in marks: print(mark)` |
| **Modify elements by index** | `for i in range(len(list)):` | `for i in range(len(marks)): marks[i] += 5` |

> **Rule of Thumb:**
> - Only reading or filtering? Use `for item in list`.
> - Reassigning or replacing values? Use `for i in range(len(list))`.

---

## 18. Functions: Reading vs Modifying

Always ask yourself:  
*Should this function modify the list in-place, or should it leave the original untouched?*

```python
# Pure Reader (Non-mutating)
def calculate_total(numbers):
    return sum(numbers)

# In-Place Mutator
def add_bonus(numbers):
    for i in range(len(numbers)):
        numbers[i] += 5
```

---

## 19. Using Cloning for Pure Functions

When the caller's original list must be preserved, **clone** the list inside the function:

```python
def add_bonus(numbers):
    updated = numbers.copy()  # Clone before modifying
    for i in range(len(updated)):
        updated[i] += 5
    return updated

marks = [70, 80, 90]
new_marks = add_bonus(marks)

print("Original:", marks)
print("Updated: ", new_marks)
```
**Output:**
```
Original: [70, 80, 90]
Updated:  [75, 85, 95]
```

---

## 20. Direct Modification vs Cloning in Functions

| Feature | In-Place Modification | Pure Function (Cloning) |
| --- | --- | --- |
| **Original List** | Mutated | **Unchanged** |
| **Memory** | Reuses existing object | Allocates new list object |
| **Return Value** | Often `None` | Returns new list |
| **When to Use?** | When modifying original is intentional | When caller needs original data intact |

---

## 21. Real-World Example — Direct Modification

```python
def apply_penalty(marks, penalty):
    for i in range(len(marks)):
        marks[i] = max(0, marks[i] - penalty)

scores = [85, 90, 78]
apply_penalty(scores, 5)
print("Penalized scores:", scores)
```
**Output:**
```
Penalized scores: [80, 85, 73]
```

---

## 22. Real-World Example — Safe Simulation

```python
def simulate_curve(marks, boost):
    curved = marks.copy()
    for i in range(len(curved)):
        curved[i] = min(100, curved[i] + boost)
    return curved

original = [65, 85, 92]
simulated = simulate_curve(original, 10)

print("Actual Records:   ", original)
print("Simulated Results:", simulated)
```
**Output:**
```
Actual Records:    [65, 85, 92]
Simulated Results: [75, 95, 100]
```

---

## 23. Real-World Example — Shopping Cart Total

```python
def calculate_cart_total(prices):
    return sum(prices)

cart = [200, 500, 300]
total = calculate_cart_total(cart)
print("Cart Total:", total)
```
**Output:**
```
Cart Total: 1000
```

---

## 24. Real-World Example — Filtering Expensive Products

```python
def show_expensive(prices, threshold=500):
    for price in prices:
        if price >= threshold:
            print(f"High-value item: ${price}")

prices = [200, 750, 300, 900, 450]
show_expensive(prices)
```
**Output:**
```
High-value item: $750
High-value item: $900
```

---

## 25. Real-World Example — Counting Passing Marks

```python
def count_passed(marks, passing_grade=40):
    count = 0
    for mark in marks:
        if mark >= passing_grade:
            count += 1
    return count

marks = [80, 35, 60, 25, 90]
passed = count_passed(marks)
print("Passed Students:", passed)
```
**Output:**
```
Passed Students: 3
```

---

## 26. Real-World Example — Filtering into a New List

```python
def get_even_numbers(numbers):
    result = []
    for number in numbers:
        if number % 2 == 0:
            result.append(number)
    return result

numbers = [10, 15, 22, 33, 40]
evens = get_even_numbers(numbers)
print("Original:", numbers)
print("Evens:   ", evens)
```
**Output:**
```
Original: [10, 15, 22, 33, 40]
Evens:    [10, 22, 40]
```

---

## 27. Real-World Example — Passed Marks List

```python
def get_passed_marks(marks):
    passed = []
    for mark in marks:
        if mark >= 40:
            passed.append(mark)
    return passed

marks = [35, 80, 25, 60, 90]
passed_list = get_passed_marks(marks)
print("Passed Marks:", passed_list)
```
**Output:**
```
Passed Marks: [80, 60, 90]
```

---

## 28. List-Based Problem-Solving Strategy

Follow these 4 questions for any list task:

1. **What is the input?** (e.g., list of marks, list of prices)
2. **What needs to happen to each item?** (e.g., test condition, multiply, accumulate)
3. **Should the original list be modified?**  
   - If YES $\rightarrow$ Modify directly by index.  
   - If NO $\rightarrow$ Clone via `.copy()` or initialize an empty collector list `result = []`.
4. **What should the function return?** (e.g., a total number, a count, or a transformed list)

---

## 29. The 4 Fundamental Patterns for List Functions

### Pattern 1: Accumulate (Sum / Product)
```python
def calculate(items):
    total = 0
    for item in items:
        total += item
    return total
```

### Pattern 2: Count
```python
def count_matching(items):
    count = 0
    for item in items:
        if condition(item):
            count += 1
    return count
```

### Pattern 3: Filter (Create New List)
```python
def filter_items(items):
    result = []
    for item in items:
        if condition(item):
            result.append(item)
    return result
```

### Pattern 4: Transform In-Place
```python
def update_items(items):
    for i in range(len(items)):
        items[i] = transform(items[i])
```

---

## 30. Common Beginner Mistakes

### Mistake 1 — Forgetting to pass the list argument
```python
def show_items(items):
    print(items)

# WRONG: show_items() -> TypeError: missing required argument
# CORRECT: show_items(products)
```

### Mistake 2 — Modifying the loop variable instead of the list
```python
numbers = [10, 20, 30]

# WRONG (Only changes the local variable 'number')
for number in numbers:
    number += 5

# CORRECT (Modifies the list at index i)
for i in range(len(numbers)):
    numbers[i] += 5
```

### Mistake 3 — Accidentally aliasing instead of cloning
```python
# WRONG (Alias: original list will also be modified)
new_marks = marks

# CORRECT (Clone: original list is protected)
new_marks = marks.copy()
```

### Mistake 4 — Forgetting `return`
```python
# WRONG (Returns None implicitly)
def calculate_total(numbers):
    total = sum(numbers)

# CORRECT
def calculate_total(numbers):
    return sum(numbers)
```

---

## 31. Quick Student Workout

### Workout 1
```python
def total(numbers):
    return sum(numbers)

values = [10, 20, 30]
print(total(values))
```
*Answer:* `60`

### Workout 2
```python
def add_item(items):
    items.append(40)

numbers = [10, 20, 30]
add_item(numbers)
print(numbers)
```
*Answer:* `[10, 20, 30, 40]`

### Workout 3
```python
def add_item(items):
    new_items = items.copy()
    new_items.append(40)
    return new_items

numbers = [10, 20, 30]
result = add_item(numbers)
print(numbers)
print(result)
```
*Answer:*
```
[10, 20, 30]
[10, 20, 30, 40]
```

### Workout 4
```python
def count_even(numbers):
    count = 0
    for number in numbers:
        if number % 2 == 0:
            count += 1
    return count

numbers = [2, 5, 8, 9, 10]
print(count_even(numbers))
```
*Answer:* `3`

---

## 32. Unit–III Day 4 Cheat Sheet

| Concept | Python Code | Purpose |
| --- | --- | --- |
| **List Parameter** | `def f(items):` | Receives a list reference |
| **List Argument** | `f(my_list)` | Passes a list to a function |
| **Direct Access** | `items[0]` | Accesses an element inside a function |
| **Value Traversal** | `for x in items:` | Read-only inspection |
| **Index Traversal** | `for i in range(len(items)):` | In-place element modification |
| **Cloning** | `items.copy()` | Isolates changes from the caller |
| **Return** | `return result` | Passes calculated data back |

---

## 33. Day 4 Final Challenge

Predict the output before running:

```python
def process(numbers):
    updated = numbers.copy()
    for i in range(len(updated)):
        if updated[i] >= 50:
            updated[i] += 10
    return updated

marks = [40, 60, 75, 30, 90]
result = process(marks)

print("Original:", marks)
print("Result:  ", result)
```

### Trace:
- `marks` has `[40, 60, 75, 30, 90]`.
- Inside `process`: `updated` is cloned.
- 40 is not $\ge 50$ $\rightarrow$ unchanged (40).
- 60 is $\ge 50$ $\rightarrow$ +10 (70).
- 75 is $\ge 50$ $\rightarrow$ +10 (85).
- 30 is not $\ge 50$ $\rightarrow$ unchanged (30).
- 90 is $\ge 50$ $\rightarrow$ +10 (100).
- `marks` is unchanged because `process` mutated a clone.

**Expected Output:**
```
Original: [40, 60, 75, 30, 90]
Result:   [40, 70, 85, 30, 100]
```

> **Day 4 Key Takeaway:** Functions and lists work together seamlessly. Because lists are passed by reference, any mutation affects the caller's object unless you explicitly clone via `.copy()`.
