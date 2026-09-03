# Unit–III — Day 7: Dictionaries — Structure, Operations & Key-Value Management

**Duration:** 90 Minutes  
**Level:** Beginner  
**Unit:** Unit–III — Data Types & Control Flow  
**Day:** 7  
**Topics:** Dictionaries: Introduction and Structure; Dictionary Operations; Adding, Updating, and Deleting Key-Value Pairs; Accessing Dictionary Elements  

---

## 1. Day 7 Learning Objectives

By the end of this session, students should be able to:
- Explain what a **dictionary** is in Python.
- Understand the **key-value pair** structure and mechanics.
- Create dictionaries using curly brace `{}` syntax.
- Access dictionary values directly using keys (`d[key]`).
- Safely retrieve values using `.get()` with default fallbacks.
- Add new key-value pairs dynamically.
- Update existing dictionary values in-place.
- Delete key-value pairs using `del`, `.pop()`, and `.clear()`.
- Distinguish between positional list indexing vs named dictionary key access.
- Check whether a key exists using the `in` and `not in` operators.
- Inspect dictionary views using `.keys()`, `.values()`, and `.items()`.
- Model real-world entities (students, products, user accounts) using dictionaries.

---

## 2. 90-Minute Session Plan

| Time | Topic | Activity |
| --- | --- | --- |
| 0–5 min | Day 6 recap | Tuples + functions recap |
| 5–18 min | Introduction to dictionaries | Key-value mapping concept |
| 18–30 min | Dictionary structure | Creating and inspecting dictionaries |
| 30–42 min | Accessing values | Direct keys vs `.get()` safe access |
| 42–55 min | Adding & updating | Dynamic assignment and modification |
| 55–65 min | Deleting data | `del`, `.pop()`, and `.clear()` |
| 65–73 min | Dictionary operations | `in`, `.keys()`, `.values()`, `.items()` |
| 73–80 min | Illustrative programs | Real-world entities and nested structures |
| 80–87 min | Moodle practice | Student Record Manager problem |
| 87–90 min | Quiz | Knowledge check |

---

## 3. Quick Recap from Day 6

In Day 6, we learned that tuples store related values:
```python
student = ("Arun", 20, 85)
```
To read the mark, we must remember:
```python
print(student[2])  # 85
```
*What if the tuple has 15 fields? Remembering index 2, 8, or 13 is error-prone.*

A **dictionary** solves this by letting us assign meaningful names (keys) to data:
```python
student = {
    "name": "Arun",
    "age": 20,
    "mark": 85
}

print(student["mark"])  # Clean and self-explanatory!
```

---

## 4. What is a Dictionary?

A **dictionary** is an unordered/insertion-ordered mutable Python collection that stores data as **key-value pairs**.

```python
student = {
    "name": "Arun",
    "age": 20,
    "mark": 85
}
```

- `"name"` $\rightarrow$ `"Arun"`
- `"age"`  $\rightarrow$ `20`
- `"mark"` $\rightarrow$ `85`

The **left side** is the **key**.  
The **right side** is the **value**.

---

## 5. Understanding Key-Value Pairs

```text
Key           Value
────────────────────
"name"   ──►  "Arun"
"age"    ──►  20
"mark"   ──►  85
```

We look up values by presenting their unique key, just like looking up a word in a real dictionary.

---

## 6. Dictionary Syntax

```python
dictionary_name = {
    key1: value1,
    key2: value2,
    key3: value3
}
```

| Symbol | Purpose | Example |
| --- | --- | --- |
| `{ }` | Container delimiting dictionary | `data = { ... }` |
| `:` | Separates each key from its value | `"age": 20` |
| `,` | Separates distinct key-value pairs | `"age": 20, "mark": 85` |

---

## 7. Creating an Empty Dictionary

You can create an empty dictionary and populate it later:

```python
student = {}

student["name"] = "Arun"
student["age"] = 20

print(student)  # {'name': 'Arun', 'age': 20}
```

---

## 8. Core Characteristics of Dictionaries

1. **Key-Value Structure:** Every piece of data has an associated lookup key.
2. **Key-Based Access:** Data is accessed by key name (`d["name"]`), not numeric order.
3. **Unique Keys:** Keys must be unique; duplicate keys overwrite previous values.
4. **Heterogeneous Values:** Values can be any Python data type (integers, strings, floats, lists, or other dictionaries).
5. **Mutable:** Entries can be added, modified, or removed anytime.

---

## 9. List vs Dictionary

| Feature | List | Dictionary |
| --- | --- | --- |
| **Enclosure** | `[]` Square brackets | `{}` Curly braces |
| **Lookup** | Numeric 0-based index | Meaningful key name |
| **Access Example** | `student[0]` | `student["name"]` |
| **Ideal For** | Ordered sequences of items | Structured records with named attributes |
| **Analogy** | Numbered locker slots | Labeled file folders |

> **Memory Rule:**  
> **List** $\rightarrow$ Position  
> **Dictionary** $\rightarrow$ Name  

---

## 10. Accessing Dictionary Elements

```python
student = {
    "name": "Arun",
    "age": 20,
    "mark": 85
}

print(student["name"])  # Arun
print(student["age"])   # 20
print(student["mark"])  # 85
```

---

## 11. Accessing Missing Keys: The `KeyError`

If you request a key that doesn't exist, Python raises a runtime error:

```python
student = {"name": "Arun", "age": 20}

# print(student["mark"])
# KeyError: 'mark'
```

To avoid program crashes, use the **safe access** method: `.get()`.

---

## 12. Safe Access with `.get()`

The `.get()` method returns `None` (or a fallback default) instead of raising `KeyError`:

```python
student = {"name": "Arun", "age": 20}

print(student.get("name"))       # Arun
print(student.get("mark"))       # None
print(student.get("mark", 0))    # 0 (Custom fallback)
```

---

## 13. Adding a New Key-Value Pair

Assigning a value to a non-existent key automatically creates it:

```python
student = {"name": "Arun", "age": 20}

student["mark"] = 85
print(student)
# {'name': 'Arun', 'age': 20, 'mark': 85}
```

---

## 14. Real-World Example — Product Catalog

```python
product = {
    "name": "Laptop",
    "price": 50000
}

# Add brand dynamically
product["brand"] = "Dell"

print(product)
# {'name': 'Laptop', 'price': 50000, 'brand': 'Dell'}
```

---

## 15. Updating an Existing Value

If the key already exists, assignment overwrites the old value:

```python
student = {"name": "Arun", "mark": 70}

student["mark"] = 85  # Overwrites 70 with 85
print(student)        # {'name': 'Arun', 'mark': 85}
```

---

## 16. Add vs Update Rule

```text
               d["key"] = value
                      │
           Does "key" exist in d?
              /            \
           [YES]           [NO]
            /                \
Update existing value     Add new key-value pair
```

---

## 17. Updating Multiple Values

```python
student = {"name": "Arun", "age": 20, "mark": 70}

student["age"] = 21
student["mark"] = 85

print(student)  # {'name': 'Arun', 'age': 21, 'mark': 85}
```

---

## 18. Deleting Using `del`

The `del` keyword permanently removes a key and its value:

```python
student = {"name": "Arun", "age": 20, "mark": 85}

del student["age"]
print(student)  # {'name': 'Arun', 'mark': 85}
```

---

## 19. Deleting Using `.pop()`

`.pop(key)` removes the key and returns its value:

```python
student = {"name": "Arun", "age": 20, "mark": 85}

removed_val = student.pop("age")

print("Removed:", removed_val)  # 20
print("Updated:", student)      # {'name': 'Arun', 'mark': 85}
```

---

## 20. Clearing All Entries with `.clear()`

```python
student = {"name": "Arun", "age": 20, "mark": 85}

student.clear()
print(student)  # {}
```

---

## 21. Deletion Methods Cheat Sheet

| Method | Syntax | Effect |
| --- | --- | --- |
| **`del`** | `del d[key]` | Removes key; raises `KeyError` if key is missing |
| **`.pop()`** | `d.pop(key)` | Removes key and **returns** the removed value |
| **`.clear()`** | `d.clear()` | Empties the entire dictionary to `{}` |

---

## 22. Checking Key Existence with `in`

The `in` operator checks whether a **key** exists in the dictionary:

```python
student = {"name": "Arun", "age": 20}

print("name" in student)  # True
print("mark" in student)  # False
```

> **Important:** `x in d` tests keys, **not** values!

---

## 23. Using `not in` for Validation

```python
student = {"name": "Arun", "age": 20}

if "mark" not in student:
    print("Mark is not available")
```

---

## 24. Getting All Keys with `.keys()`

```python
student = {"name": "Arun", "age": 20, "mark": 85}

for key in student.keys():
    print(key)
```
**Output:**
```
name
age
mark
```

---

## 25. Getting All Values with `.values()`

```python
student = {"name": "Arun", "age": 20, "mark": 85}

for value in student.values():
    print(value)
```
**Output:**
```
Arun
20
85
```

---

## 26. Getting Pairs Together with `.items()`

`.items()` returns a sequence of `(key, value)` tuples:

```python
student = {"name": "Arun", "age": 20, "mark": 85}

for key, value in student.items():
    print(key, ":", value)
```
**Output:**
```
name : Arun
age : 20
mark : 85
```

---

## 27. Dictionary Operations Cheat Sheet

| Operation | Syntax | Purpose |
| --- | --- | --- |
| **Access** | `d[k]` | Retrieve value by key |
| **Safe Access** | `d.get(k, default)` | Retrieve safely without KeyError |
| **Add / Update** | `d[k] = v` | Assign or overwrite value |
| **Delete** | `del d[k]` | Remove key-value pair |
| **Pop** | `d.pop(k)` | Remove and return value |
| **Clear** | `d.clear()` | Remove all pairs |
| **Key Check** | `k in d` | Test key existence |
| **Keys View** | `d.keys()` | Get iterable of keys |
| **Values View** | `d.values()` | Get iterable of values |
| **Items View** | `d.items()` | Get `(key, value)` pairs |

---

## 28. Heterogeneous Data Support

```python
student = {
    "name": "Arun",
    "age": 20,
    "mark": 85.5,
    "passed": True
}
```

---

## 29. Nested Data — Dictionaries Containing Lists

```python
student = {
    "name": "Arun",
    "marks": [80, 75, 90]
}

print(student["marks"])     # [80, 75, 90]
print(student["marks"][0])  # 80
```

---

## 30. Nested Data — Dictionaries Inside Dictionaries

```python
student = {
    "name": "Arun",
    "details": {
        "age": 20,
        "city": "Chennai"
    }
}

print(student["details"]["city"])  # Chennai
```

---

## 31. Illustrative Program 1 — Student Record

```python
student = {
    "name": "Arun",
    "age": 20,
    "mark": 85
}

print("Name:", student["name"])
print("Age: ", student["age"])
print("Mark:", student["mark"])
```

---

## 32. Illustrative Program 2 — Add and Update

```python
student = {"name": "Arun", "age": 20}

student["mark"] = 75  # Add
student["age"] = 21   # Update

print(student)  # {'name': 'Arun', 'age': 21, 'mark': 75}
```

---

## 33. Illustrative Program 3 — Inventory Item

```python
product = {
    "name": "Laptop",
    "price": 50000,
    "stock": 10
}

product["price"] = 48000
product["brand"] = "HP"

print("Name: ", product["name"])
print("Price:", product["price"])
print("Stock:", product["stock"])
print("Brand:", product["brand"])
```

---

## 34. Illustrative Program 4 — Stock Availability Check

```python
product = {"name": "Laptop", "stock": 5}

if product["stock"] > 0:
    print("Product Available")
```

---

## 35. Illustrative Program 5 — Pass/Fail Decision

```python
student = {"name": "Arun", "mark": 65}

if student["mark"] >= 40:
    print("Pass")
else:
    print("Fail")
```

---

## 36. Illustrative Program 6 — Iteration with `.items()`

```python
student = {"name": "Arun", "age": 20, "mark": 85}

for key, value in student.items():
    print(f"{key}: {value}")
```

---

## 37. Illustrative Program 7 — Aggregating Embedded Lists

```python
student = {
    "name": "Arun",
    "marks": [80, 75, 90]
}

total = sum(student["marks"])
print("Name: ", student["name"])
print("Total:", total)
```

---

## 38. Illustrative Program 8 — Incrementing Values In-Place

```python
student = {"name": "Arun", "mark": 70}
student["mark"] += 5
print("Updated mark:", student["mark"])  # 75
```

---

## 39. Illustrative Program 9 — User Authentication Check

```python
user = {
    "username": "admin",
    "password": "secretpassword"
}

if user["username"] == "admin":
    print("Username verified")
```

---

## 40. Illustrative Program 10 — Employee Compensation Update

```python
employee = {
    "name": "Ravi",
    "department": "IT",
    "salary": 30000
}

employee["salary"] = 35000
print(f"{employee['name']} ({employee['department']}): ${employee['salary']}")
```

---

## 41. Complete Comparison: List vs Tuple vs Dictionary

| Feature | List | Tuple | Dictionary |
| --- | --- | --- | --- |
| **Syntax** | `[10, 20]` | `(10, 20)` | `{"age": 20}` |
| **Lookup Mode** | Index `[0]` | Index `[0]` | Key `["age"]` |
| **Mutability** | **Mutable** | **Immutable** | **Mutable** |
| **Duplicates** | Allowed | Allowed | Keys must be unique |
| **Best Used For** | Ordered elements | Fixed sequences | Structured entity records |

---

## 42. Common Beginner Mistakes

### Mistake 1 — Trying to access keys using numeric indexes
```python
student = {"name": "Arun", "age": 20}
# WRONG: print(student[0]) -> KeyError: 0
# CORRECT: print(student["name"])
```

### Mistake 2 — Missing colons between key and value
```python
# WRONG: d = {"name" "Arun"}
# CORRECT: d = {"name": "Arun"}
```

### Mistake 3 — Expecting `in` to check values
```python
student = {"name": "Arun"}
# "Arun" in student -> False! (in only checks keys)
# To check values: "Arun" in student.values() -> True
```

---

## 43. Quick Student Workout

### Workout 1
```python
student = {"name": "Arun", "age": 20}
print(student["name"])
```
*Answer:* `Arun`

### Workout 2
```python
student = {"name": "Arun"}
student["mark"] = 80
print(student)
```
*Answer:* `{'name': 'Arun', 'mark': 80}`

### Workout 3
```python
student = {"name": "Arun", "mark": 70}
student["mark"] = 90
print(student["mark"])
```
*Answer:* `90`

### Workout 4
```python
student = {"name": "Arun", "age": 20}
del student["age"]
print(student)
```
*Answer:* `{'name': 'Arun'}`

### Workout 5
```python
student = {"name": "Arun", "mark": 80}
print("mark" in student)
```
*Answer:* `True`

---

## 44. Unit–III Day 7 Cheat Sheet

| Concept | Code | Meaning |
| --- | --- | --- |
| **Create** | `d = {"k": "v"}` | Key-value dictionary |
| **Access** | `d["k"]` | Access by key |
| **Safe Get** | `d.get("k", def_val)` | Default if not found |
| **Add/Update** | `d["new"] = val` | Assigns or updates |
| **Delete** | `del d["k"]` | Removes key |
| **Key Check** | `'k' in d` | Tests if key exists |
| **Items** | `for k, v in d.items():` | Iterates key & value |

---

## 45. Day 7 Final Challenge

Predict output:

```python
student = {
    "name": "Arun",
    "age": 20,
    "mark": 75
}

student["mark"] = 85
student["course"] = "Python"

result = "Pass" if student["mark"] >= 50 else "Fail"

print("Name:  ", student["name"])
print("Course:", student["course"])
print("Mark:  ", student["mark"])
print("Result:", result)
```

**Expected Output:**
```
Name:   Arun
Course: Python
Mark:   85
Result: Pass
```

> **Day 7 Key Takeaway:** Dictionaries allow you to organize and manipulate real-world data with meaningful keys. They are mutable, fast, and central to modern programming and data processing.
