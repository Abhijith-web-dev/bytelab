# Unit–III — Day 3: List Mutability, Aliasing & Cloning

**Duration:** 90 Minutes  
**Level:** Beginner  
**Unit:** Unit–III — Control Flow & Data Processing  
**Day:** 3  
**Topics:** List Mutability; Aliasing; Difference between Aliasing and Cloning; Cloning Lists; Illustrative Programs  

---

## 1. Day 3 Learning Objectives

By the end of this session, students should be able to:
- Explain what **mutable** means in Python.
- Understand why lists are classified as mutable objects.
- Modify existing lists in-place without creating new objects.
- Understand what **aliasing** means and why two variables can refer to the same list.
- Understand the difference between **aliasing** and **cloning**.
- Clone a list using slice notation (`[:]`).
- Clone a list using the `.copy()` method.
- Understand the unintended side effects of modifying an aliased list.
- Explain why cloning creates an independent list in memory.
- Differentiate object identity (`is`) from equality (`==`).
- Trace list-reference programs step-by-step.
- Apply independent copies and functional patterns in real-world programs.

---

## 2. 90-Minute Session Plan

| Time | Topic | Activity |
| --- | --- | --- |
| 0–5 min | Day 2 recap | Lists, slicing, and methods quick check |
| 5–18 min | List mutability | Modifying lists in-place |
| 18–32 min | Understanding references | Variables, names, and objects |
| 32–48 min | Aliasing | Shared reference behavior |
| 48–60 min | Aliasing vs Cloning | Compare behavior with examples |
| 60–70 min | Cloning lists | Using `.copy()` and `[:]` |
| 70–80 min | Illustrative programs | Real-world practical applications |
| 80–87 min | Moodle practice | Create an Independent List problem |
| 87–90 min | Quiz | Check understanding |

---

## 3. Quick Recap from Day 2

In Day 2, we learned how to manipulate lists:
```python
numbers = [10, 20, 30, 40]
```
- **Indexing:** `numbers[0]` $\rightarrow$ `10`
- **Slicing:** `numbers[1:3]` $\rightarrow$ `[20, 30]`
- **Methods:** `append()`, `insert()`, `remove()`, `pop()`, `sort()`, `reverse()`
- **Traversal:** `for x in numbers:` and `while i < len(numbers):`

Today we ask a fundamental question:  
> *What happens under the hood when two variables point to the same list?*

---

## 4. What Does "Mutable" Mean?

In Python, **mutable** means:
> An object whose internal contents or values can be modified in-place **after it has been created**, without changing its memory identity.

Python lists are **mutable**:

```python
numbers = [10, 20, 30]

# Change the element at index 1
numbers[1] = 200

print(numbers)
```

**Output:**
```
[10, 200, 30]
```

- **Before:** `[10, 20, 30]`
- **After:** `[10, 200, 30]`  
*The original list itself was altered in memory.*

---

## 5. Why Are Lists Called Mutable?

Because we can add, remove, rearrange, or update elements without creating a completely new list:

```python
fruits = ["apple", "banana", "mango"]

# Modify an item
fruits[0] = "orange"

# Append an item
fruits.append("grape")

# Remove an item
fruits.remove("banana")

# Sort in-place
fruits.sort()

print(fruits)
```
**Output:**
```
['grape', 'mango', 'orange']
```

All of these operations modify the **existing** list object.

---

## 6. Mutable vs Immutable Data Types

Understanding this distinction is vital in Python:

- **Mutable:** Can be modified in-place after creation (`list`, `dict`, `set`).
- **Immutable:** Cannot be modified once created (`int`, `float`, `str`, `bool`, `tuple`). Any "change" creates an entirely new object in memory.

| Type | Mutable? | Example Operations Allowed |
| --- | --- | --- |
| `list` | **Yes** | `nums[0] = 99`, `nums.append(5)` |
| `dict` | **Yes** | `d['key'] = 'val'` |
| `set` | **Yes** | `s.add(10)` |
| `int` | **No** | Reassignment creates new int |
| `float` | **No** | Reassignment creates new float |
| `str` | **No** | `s[0] = 'X'` raises `TypeError` |
| `bool` | **No** | Fixed singleton values |
| `tuple` | **No** | `t[0] = 99` raises `TypeError` |

---

## 7. Real-World Analogy for Mutability

Think of an online shopping cart:
1. Initially: `cart = ["Shirt", "Shoes"]`
2. User adds an item: `cart.append("Bag")`
3. The shopping cart is updated to: `["Shirt", "Shoes", "Bag"]`

The cart's physical container remains the same; only its contents changed.

---

## 8. Understanding Variables and Object References

In Python, variables do **not** store the list data directly. Instead:
> A variable stores a **reference** (a memory pointer) to the list object.

```text
numbers = [10, 20, 30]

Variable Name               List Object in Memory
[ numbers ] ─────────────>  [ 10, 20, 30 ]
```

---

## 9. What is Aliasing?

**Aliasing** occurs when two or more variable names refer to the exact same object in memory:

```python
numbers = [10, 20, 30]
other = numbers  # Both variables now point to the same list!
```

```text
numbers ─────┐
             ↓
       [ 10, 20, 30 ]
             ↑
other ───────┘
```

---

## 10. The Aliasing Effect

Modifying the list through one variable immediately affects the other:

```python
numbers = [10, 20, 30]
other = numbers

# Modify using other
other.append(40)

print("numbers:", numbers)
print("other:  ", other)
```

**Output:**
```
numbers: [10, 20, 30, 40]
other:   [10, 20, 30, 40]
```

### Why did `numbers` also change?
Because `other = numbers` did **not** create a second list! Both names refer to the exact same list object.

---

## 11. The Key Rule of Aliasing

```python
numbers = [10, 20, 30]
other = numbers
```

> **Crucial Concept:**  
> This does **not** mean *"Make another list."*  
> It means *"Give the existing list a second name."*

---

## 12. More Aliasing Examples

### Example 1 — Updating an item:
```python
a = [10, 20, 30]
b = a
b[0] = 100

print(a)  # [100, 20, 30]
print(b)  # [100, 20, 30]
```

### Example 2 — Removing an item:
```python
a = ["A", "B", "C"]
b = a
b.remove("B")

print(a)  # ['A', 'C']
print(b)  # ['A', 'C']
```

### Example 3 — Sorting:
```python
a = [30, 10, 20]
b = a
b.sort()

print(a)  # [10, 20, 30]
```

---

## 13. Why Aliasing Can Cause Serious Bugs

Imagine a teacher writing grade-processing software:

```python
marks = [80, 70, 90]
backup = marks  # Programmer assumes this is a safe backup copy

# Student re-evaluated
backup[0] = 50

# Inspect original record
print(marks)  # [50, 70, 90] -> The original record was corrupted!
```

Because `backup` is an alias, modifying it overwrote the original data.

---

## 14. What is Cloning?

**Cloning** means creating an entirely new, independent list containing copies of the original elements:

```python
numbers = [10, 20, 30]
copy_numbers = numbers.copy()
```

```text
numbers       ─────────>  [ 10, 20, 30 ] (Object 1)

copy_numbers  ─────────>  [ 10, 20, 30 ] (Object 2 - Separate memory!)
```

---

## 15. Cloning Method 1: Using `.copy()`

```python
numbers = [10, 20, 30]
copy_numbers = numbers.copy()

copy_numbers.append(40)

print("Original:", numbers)
print("Clone:   ", copy_numbers)
```

**Output:**
```
Original: [10, 20, 30]
Clone:    [10, 20, 30, 40]
```
*The original list remains completely unchanged!*

---

## 16. Cloning Method 2: Using Slicing `[:]`

Omitting start and end in a slice creates a new shallow copy:

```python
numbers = [10, 20, 30]
copy_numbers = numbers[:]

copy_numbers.append(40)

print("Original:", numbers)
print("Clone:   ", copy_numbers)
```

**Output:**
```
Original: [10, 20, 30]
Clone:    [10, 20, 30, 40]
```

Both `numbers.copy()` and `numbers[:]` produce independent clones.

---

## 17. Aliasing vs Cloning Summary

```python
# Aliasing: 1 list, 2 labels
a = [10, 20, 30]
b = a

# Cloning: 2 distinct lists
a = [10, 20, 30]
b = a.copy()
```

---

## 18. Comparison Table

| Feature | Aliasing (`b = a`) | Cloning (`b = a.copy()`) |
| --- | --- | --- |
| **New list created?** | No | **Yes** |
| **Same memory object?** | Yes | **No** |
| **Same elements initially?** | Yes | Yes |
| **Modifying `b` affects `a`?** | **Yes** | **No** |
| **When to use?** | Intentional shared state | Creating backups or independent mutations |

---

## 19. Memory Mnemonic

> **Aliasing** $\rightarrow$ **Share**  
> **Cloning** $\rightarrow$ **Copy**  

---

## 20. Checking Identity with the `is` Operator

Python provides the `is` keyword to check whether two variables point to the **exact same memory address**:

```python
# Aliasing
a = [10, 20]
b = a
print(a is b)  # True (same object)

# Cloning
a = [10, 20]
b = a.copy()
print(a is b)  # False (different objects)
```

---

## 21. `==` (Equality) vs `is` (Identity)

| Operator | Question Asked | What it Compares |
| --- | --- | --- |
| `==` | *Do they have the same values?* | **Contents** |
| `is` | *Are they the exact same object in memory?* | **Memory Address (ID)** |

```python
a = [10, 20]
b = [10, 20]

print(a == b)  # True  (same elements: 10 and 20)
print(a is b)  # False (two distinct lists in memory)
```

---

## 22. Aliasing with `==` and `is`

```python
a = [10, 20]
b = a

print(a == b)  # True
print(a is b)  # True
```

---

## 23. Cloning with `==` and `is`

```python
a = [10, 20]
b = a.copy()

print(a == b)  # True  (equal contents)
print(a is b)  # False (separate memory objects)
```

---

## 24. Visual Diagram of Memory Allocation

### Aliasing:
```text
        ┌──────────────┐
        │ [10, 20, 30] │  <-- Single memory block
        └──────────────┘
          ▲          ▲
          │          │
          a          b
```

### Cloning:
```text
        ┌──────────────┐
        │ [10, 20, 30] │  <-- Memory Block 1 (a)
        └──────────────┘
              ▲
              a

        ┌──────────────┐
        │ [10, 20, 30] │  <-- Memory Block 2 (b)
        └──────────────┘
              ▲
              b
```

---

## 25. Illustrative Program 1 — The Safe Backup

```python
marks = [80, 75, 90]

# Proper independent backup
backup = marks.copy()

# Modify backup
backup[0] = 50

print("Original:", marks)
print("Backup:  ", backup)
```
**Output:**
```
Original: [80, 75, 90]
Backup:   [50, 75, 90]
```

---

## 26. Illustrative Program 2 — Shopping Cart Sandbox

```python
cart = ["Shirt", "Shoes", "Bag"]

# Clone the cart to test promo code or removal
test_cart = cart.copy()
test_cart.remove("Shoes")

print("Original Cart:", cart)
print("Test Cart:    ", test_cart)
```
**Output:**
```
Original Cart: ['Shirt', 'Shoes', 'Bag']
Test Cart:     ['Shirt', 'Bag']
```

---

## 27. Illustrative Program 3 — Functions and Mutability

Because lists are mutable, passing a list into a function passes its **reference**:

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
*The function modified the caller's original list!*

---

## 28. Illustrative Program 4 — Pure Function via Cloning

If a function should **not** modify the original list:

```python
def add_item(items):
    new_items = items.copy()  # Clone first!
    new_items.append("Notebook")
    return new_items

products = ["Pen", "Pencil"]
updated = add_item(products)

print("Original:", products)
print("Updated: ", updated)
```
**Output:**
```
Original: ['Pen', 'Pencil']
Updated:  ['Pen', 'Pencil', 'Notebook']
```

---

## 29. Illustrative Program 5 — Adding Bonus Marks

```python
def add_bonus(marks):
    updated = marks.copy()
    for i in range(len(updated)):
        updated[i] += 5
    return updated

marks = [70, 80, 90]
new_marks = add_bonus(marks)

print("Original:   ", marks)
print("After Bonus:", new_marks)
```
**Output:**
```
Original:    [70, 80, 90]
After Bonus: [75, 85, 95]
```

---

## 30. Common Beginner Mistakes

### Mistake 1 — Assuming assignment copies data
```python
# WRONG MENTAL MODEL: "b is a copy of a"
b = a
# REALITY: b is an alias for a. Changing b changes a.
```

### Mistake 2 — Using `is` to check equality
```python
# WRONG
if list1 is list2:  # Fails even if contents match!

# CORRECT
if list1 == list2:  # Compares values properly
```

### Mistake 3 — Confusing `.copy()` and `.remove()`
- `numbers.copy()` $\rightarrow$ creates a new cloned list.
- `numbers.remove(val)` $\rightarrow$ mutates the current list.

---

## 31. Quick Student Workout

### Workout 1
```python
a = [10, 20, 30]
b = a
b.append(40)
print(a)
```
*Answer:* `[10, 20, 30, 40]`

### Workout 2
```python
a = [10, 20, 30]
b = a.copy()
b.append(40)
print(a)
```
*Answer:* `[10, 20, 30]`

### Workout 3
```python
a = [1, 2]
b = [1, 2]
print(a == b)
print(a is b)
```
*Answer:*
```
True
False
```

### Workout 4
```python
a = [1, 2]
b = a
print(a == b)
print(a is b)
```
*Answer:*
```
True
True
```

---

## 32. Unit–III Day 3 Cheat Sheet

| Concept | Python Code | Key Behavior |
| --- | --- | --- |
| **Mutable** | `list` | Elements can be modified in-place |
| **Aliasing** | `b = a` | Both variables point to same object |
| **Cloning (method)** | `b = a.copy()` | Creates independent duplicate object |
| **Cloning (slice)** | `b = a[:]` | Creates independent duplicate object |
| **Equality** | `a == b` | `True` if contents/values match |
| **Identity** | `a is b` | `True` only if identical memory object |
| **Aliased Mutation** | `b.append(x)` | Changes both `a` and `b` |
| **Cloned Mutation** | `b.append(x)` | Modifies `b` only; `a` remains safe |

---

## 33. Day 3 Final Challenge

Predict the output:
```python
numbers = [10, 20, 30]

a = numbers
b = numbers.copy()

a.append(40)
b.append(50)

print(numbers)
print(a)
print(b)
```

### Explanation:
- `a` is an alias of `numbers`. When `a.append(40)` runs, `numbers` becomes `[10, 20, 30, 40]`.
- `b` is a clone created before 40 was added (`[10, 20, 30]`). When `b.append(50)` runs, `b` becomes `[10, 20, 30, 50]`.

**Output:**
```
[10, 20, 30, 40]
[10, 20, 30, 40]
[10, 20, 30, 50]
```

> **Day 3 Key Takeaway:** Lists are mutable reference types. Aliasing shares the memory reference; cloning creates a completely distinct duplicate. Remember: `==` compares contents, while `is` compares memory identity.
