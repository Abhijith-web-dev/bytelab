# Python List Methods — Unit 1 Masterclass Notes

> [!NOTE]
> **Unit 1 Focus:** Learn all **11 built-in methods** available on Python lists, understand what each method modifies or returns, examine memory references and time complexity, and master when to use each in real applications.

---

## Lesson Navigation & Table of Contents

- [1.1 List Method Overview & Return Value Matrix](#11-list-method-overview--return-value-matrix)
- [1.2 Adding Items: `append()`, `extend()`, `insert()`](#12-adding-items-append-extend-insert)
  - [`append(item)` — Add One Single Item](#appenditem--add-one-item)
  - [`extend(iterable)` — Unpack & Add Each Item](#extenditerable--add-each-item)
  - [`insert(index, item)` — Insert at Arbitrary Position](#insertindex-item--add-at-a-position)
- [1.3 Removing Items: `remove()`, `pop()`, `clear()`](#13-removing-items-remove-pop-clear)
  - [`remove(value)` — Remove by First Matching Value](#removevalue--remove-the-first-match)
  - [`pop(index=-1)` — Remove & Return by Position](#popindex-1--remove-and-return-an-item)
  - [`clear()` — Empty the Existing List](#clear--empty-the-list)
- [1.4 Searching & Counting: `index()`, `count()`](#14-searching-and-counting-index-count)
  - [`index(value[, start[, stop]])` — Locate Position](#indexvalue-start-stop--find-a-position)
  - [`count(value)` — Count Frequency](#countvalue--count-occurrences)
- [1.5 Reordering & Copying: `sort()`, `reverse()`, `copy()`](#15-reordering-and-copying-sort-reverse-copy)
  - [`sort(key=None, reverse=False)` — In-Place Sort](#sortkeynone-reversefalse--sort-in-place)
  - [`reverse()` — In-Place Order Inversion](#reverse--reverse-in-place)
  - [`copy()` — Shallow Cloning vs Reference Aliasing](#copy--make-a-shallow-copy)
- [1.6 Time Complexity & Algorithmic Performance](#16-time-complexity-at-a-glance)
- [1.7 Internal List Storage Architecture & References](#17-list-storage-and-references)
- [1.8 Common Traps, Bug Patterns & Best Practices](#18-common-mistakes-and-reminders)
- [1.9 Quick Syntax Revision Sheet](#19-quick-revision)
- [1.10 Self-Check & Viva Preparation](#110-self-check)

---

# 1.1 List Method Overview & Return Value Matrix

A Python list is an **ordered, mutable sequence of objects**.
- **Ordered:** Elements maintain their insertion index.
- **Mutable:** Contents, size, and positions can be modified in-place after creation without creating a new list object.

The built-in `list` class provides **11 standard methods**:

| Method | Main Purpose | Mutates Original List? | Return Value |
|---|---|:---:|---|
| `append(item)` | Appends one element to the end | **Yes** | `None` |
| `extend(iterable)` | Unpacks iterable and appends each element | **Yes** | `None` |
| `insert(index, item)` | Inserts an item before the specified index | **Yes** | `None` |
| `remove(value)` | Removes the first matching value from the left | **Yes** | `None` |
| `pop(index=-1)` | Removes and returns the item at `index` | **Yes** | **Removed item** |
| `clear()` | Removes all elements from the list | **Yes** | `None` |
| `index(value[, start[, stop]])` | Returns the index of the first occurrence | **No** | **Integer index** |
| `count(value)` | Returns total occurrences of `value` | **No** | **Integer count** |
| `sort(*, key=None, reverse=False)` | Sorts elements in ascending/descending order | **Yes** | `None` |
| `reverse()` | Reverses the current order of elements | **Yes** | `None` |
| `copy()` | Produces a shallow duplicate of the list | **No** | **New list object** |

> [!CAUTION]
> **The `None` Return Value Trap:**
> Most mutating list methods modify the list in place and return `None`.
> **Never write:**
> ```python
> numbers = numbers.sort()   # BUG: numbers is now None!
> items = items.append(10)   # BUG: items is now None!
> ```
> Instead, call the method directly on the variable:
> ```python
> numbers.sort()
> items.append(10)
> ```

---

# 1.2 Adding Items: `append()`, `extend()`, `insert()`

---

### `append(item)` — Add One Item

Adds `item` as a single element at the end of the list.

```python
numbers = [1, 2, 3]
result = numbers.append(4)

print(numbers)  # [1, 2, 3, 4]
print(result)   # None
```

> [!WARNING]
> **Appending a collection creates a nested list:**
> ```python
> items = [1, 2]
> items.append([3, 4])
> print(items)  # [1, 2, [3, 4]] -> length is 3!
> ```

---

### `extend(iterable)` — Add Each Item

Iterates over any supplied iterable (`list`, `tuple`, `set`, `string`) and appends its items one by one to the end of the list:

```python
numbers = [1, 2]
numbers.extend([3, 4])
print(numbers)  # [1, 2, 3, 4]
```

Accepts tuples, ranges, generators, and strings:

```python
letters = ["a"]
letters.extend(("b", "c"))
print(letters)  # ['a', 'b', 'c']

letters.extend("xyz")
print(letters)  # ['a', 'b', 'c', 'x', 'y', 'z']
```

> [!TIP]
> **`append()` vs `extend()` Summary:**
> - `append(x)` takes `x` as an atomic unit and increases `len(list)` by $1$.
> - `extend(iter)` unpacks `iter` and increases `len(list)` by `len(iter)`.

---

### `insert(index, item)` — Add at a Position

Inserts `item` directly before `index`. All subsequent items shift right by one index:

```python
letters = ["a", "c"]
letters.insert(1, "b")
print(letters)  # ['a', 'b', 'c']
```

- `insert(0, item)` prepends to the front (shifts all $N$ items, $O(N)$ time).
- `insert(len(items), item)` behaves identically to `append(item)`.

---

# 1.3 Removing Items: `remove()`, `pop()`, `clear()`

---

### `remove(value)` — Remove the First Match

Searches from left to right ($index = 0$ upward) and removes the **first** element that equals `value`:

```python
numbers = [10, 20, 10, 30]
numbers.remove(10)
print(numbers)  # [20, 10, 30]
```

> [!IMPORTANT]
> If `value` is not present in the list, Python raises a `ValueError`:
> ```python
> nums = [1, 2, 3]
> nums.remove(99)  # Raises ValueError: list.remove(x): x not in list
> ```
> Always guard with `if value in nums:` if presence is uncertain.

---

### `pop(index=-1)` — Remove and Return an Item

Removes and **returns** the element at `index`. If no index is provided, it defaults to `index=-1` (the last element).

```python
numbers = [5, 10, 15]
last = numbers.pop()    # Removes and returns 15
first = numbers.pop(0)  # Removes and returns 5

print(last)     # 15
print(first)    # 5
print(numbers)  # [10]
```

> [!NOTE]
> - `pop()` at the end is an $O(1)$ stack operation (`LIFO`).
> - Calling `pop()` on an empty list or passing an out-of-bounds index raises an `IndexError`.

---

### `clear()` — Empty the List

Deletes all elements from the list in-place. The list becomes empty (`[]`), but retains its original memory identity (`id(list)`):

```python
items = [1, 2, 3]
alias = items
items.clear()

print(items)  # []
print(alias)  # [] (both variables reference the same emptied list)
```

---

# 1.4 Searching and Counting: `index()`, `count()`

---

### `index(value[, start[, stop]])` — Find a Position

Returns the zero-based index of the first occurrence of `value`. You can optionally restrict the search window with `start` and `stop`:

```python
letters = ["x", "y", "z", "y"]
position = letters.index("y")
print(position)  # 1

# Search starting from index 2 onwards:
position = letters.index("y", 2)
print(position)  # 3
```

> [!WARNING]
> If `value` is not found within the search range, `index()` raises `ValueError`. To test existence safely without raising an exception, use the `in` keyword:
> ```python
> if "y" in letters:
>     idx = letters.index("y")
> ```

---

### `count(value)` — Count Occurrences

Returns the total frequency of `value` inside the list. Never raises an error; returns `0` if the value does not exist:

```python
numbers = [1, 2, 2, 3, 2]
print(numbers.count(2))  # 3
print(numbers.count(9))  # 0
```

---

# 1.5 Reordering and Copying: `sort()`, `reverse()`, `copy()`

---

### `sort(key=None, reverse=False)` — Sort In-Place

Sorts the list items directly in ascending order by default using **Timsort** ($O(N \log N)$).
- Set `reverse=True` for descending order.
- Provide a `key` callable (e.g. `len`, `str.lower`, `abs`) to customize the comparison criteria.

```python
numbers = [3, 1, 4, 2]
result = numbers.sort(reverse=True)

print(numbers)  # [4, 3, 2, 1]
print(result)   # None
```

```python
words = ["pear", "fig", "banana"]
words.sort(key=len)
print(words)  # ['fig', 'pear', 'banana']
```

> [!TIP]
> **`list.sort()` vs `sorted()`:**
> - `list.sort()` mutates the existing list in-place and returns `None`.
> - `sorted(iterable)` returns a **new sorted list**, leaving the original iterable untouched.
> ```python
> original = [3, 1, 2]
> ordered = sorted(original)
> print(ordered)   # [1, 2, 3]
> print(original)  # [3, 1, 2] (unchanged)
> ```

---

### `reverse()` — Reverse In-Place

Inverts the order of elements in-place without sorting them:

```python
numbers = [1, 2, 3]
result = numbers.reverse()

print(numbers)  # [3, 2, 1]
print(result)   # None
```

---

### `copy()` — Make a Shallow Copy

Returns a **new shallow copy** of the list. Mutating the outer structure of the clone will not affect the original list:

```python
original = [1, 2, 3]
clone = original.copy()
clone.append(4)

print(original)  # [1, 2, 3]
print(clone)     # [1, 2, 3, 4]
```

> [!CAUTION]
> **Shallow Copy vs Nested Objects:**
> A shallow copy duplicates the outer list container, but copies the **references** to nested objects. If the list contains inner lists or dictionaries, mutating an inner object modifies it in both copies:
> ```python
> original = [[1], [2]]
> clone = original.copy()
> clone[0].append(99)
> 
> print(original)  # [[1, 99], [2]] (modified!)
> print(clone)     # [[1, 99], [2]]
> ```
> For a completely recursive independent duplicate, use `copy.deepcopy()`.

---

# 1.6 Time Complexity at a Glance

For a list containing $n$ items, and an iterable containing $k$ items, typical CPython time costs are:

| Operation | Method / Syntax | Typical Complexity | Why It Costs This Much |
|---|---|:---:|---|
| **Append** | `list.append(x)` | **$O(1)$ amortized** | Adds pointer at next free array slot; occasional reallocation |
| **Extend** | `list.extend(iter)` | **$O(k)$ amortized** | Copies $k$ pointers into the list |
| **Insert** | `list.insert(i, x)` | **$O(n)$** | Elements from index $i$ to $n-1$ must shift right |
| **Remove** | `list.remove(x)` | **$O(n)$** | Linearly searches for $x$, then shifts subsequent items left |
| **Pop (end)** | `list.pop()` | **$O(1)$** | Decrements length and removes final pointer |
| **Pop (index)** | `list.pop(i)` | **$O(n)$** | Items after index $i$ must shift left |
| **Clear** | `list.clear()` | **$O(n)$** | Decrefs and cleans all $n$ element references |
| **Index** | `list.index(x)` | **$O(n)$** | Linear search comparing elements until match is found |
| **Count** | `list.count(x)` | **$O(n)$** | Linear scan checking all $n$ elements |
| **Sort** | `list.sort()` | **$O(n \log n)$** | Timsort comparison sort ($O(n)$ on sorted data) |
| **Reverse** | `list.reverse()` | **$O(n)$** | Swaps elements in-place from endpoints inward |
| **Shallow Copy** | `list.copy()` | **$O(n)$** | Allocates new array and copies $n$ pointer references |

---

# 1.7 List Storage Architecture & References

In CPython, a list is implemented internally as a **dynamic array of pointers** (`PyObject**`):

```text
Variable `a` ──► [ Pointer 0 | Pointer 1 | Pointer 2 | Capacity Slots... ]
                      │           │           │
                      ▼           ▼           ▼
                   [ 10 ]      [ 20 ]      [ 30 ]
```

1. **Random Access ($O(1)$):** Direct pointer arithmetic `base_address + index * pointer_size`.
2. **Over-allocation Growth Pattern:** To prevent reallocating on every single `append()`, Python allocates extra capacity in batches ($4, 8, 16, 25, 35, 46, \dots$).
3. **Reference Assignment vs Copy:**
   - `b = a` creates another reference pointer to the exact same list array.
   - `b = a.copy()` or `b = a[:]` creates a new distinct array holding copies of the element pointers.

---

# 1.8 Common Mistakes and Reminders

```text
❌ items = items.sort()          ──► items is now None!
✔️ items.sort()                  ──► items is sorted in-place.

❌ items = items.append(4)       ──► items is now None!
✔️ items.append(4)               ──► 4 is appended to items.

❌ items.remove(999) (not found) ──► Raises ValueError!
✔️ if 999 in items: items.remove(999)

❌ items.append([1, 2])          ──► Creates [..., [1, 2]] (nested)
✔️ items.extend([1, 2])          ──► Creates [..., 1, 2] (unpacked)
```

---

# 1.9 Quick Revision

```python
items.append(x)          # Add x as one final item
items.extend(iterable)   # Add each item from iterable
items.insert(i, x)       # Insert x before index i
items.remove(x)          # Remove first matching x (ValueError if missing)
items.pop()              # Remove and return last item (IndexError if empty)
items.pop(i)             # Remove and return item at index i
items.clear()            # Empty list in-place (retains id)
items.index(x)           # Position of first x (ValueError if missing)
items.count(x)           # Number of occurrences of x (returns 0 if missing)
items.sort()             # Sort list in-place (returns None)
items.reverse()          # Reverse list in-place (returns None)
clone = items.copy()     # Create a new shallow copy
```

---

# 1.10 Self-Check & Viva Preparation

<details>
<summary><strong>1. What is the difference between <code>append([3, 4])</code> and <code>extend([3, 4])</code>?</strong></summary>

`append([3, 4])` adds the list `[3, 4]` as a single nested element, increasing the list length by 1. `extend([3, 4])` iterates through the list and appends `3` and `4` as individual elements, increasing the list length by 2.
</details>

<details>
<summary><strong>2. Which method removes an item by its value? Which removes it by index?</strong></summary>

`remove(value)` searches and removes the first matching element by value. `pop(index)` removes the element at the specified numerical index and returns it.
</details>

<details>
<summary><strong>3. What does <code>pop()</code> return when called without an index?</strong></summary>

It removes and returns the last element of the list (`index = -1`).
</details>

<details>
<summary><strong>4. Why does <code>items = items.sort()</code> cause a bug in Python code?</strong></summary>

Because `sort()` is an in-place mutation method that returns `None`. Assigning the result back to `items` overwrites the list reference with `None`.
</details>

<details>
<summary><strong>5. Does <code>copy()</code> create completely independent copies of nested lists?</strong></summary>

No. `copy()` creates a shallow copy. The outer list is a new object, but any nested mutable objects (e.g. inner lists) are shared by reference.
</details>

<details>
<summary><strong>6. What exception does <code>index()</code> raise when the target value is absent from the list?</strong></summary>

It raises a `ValueError: '<value>' is not in list`.
</details>

---

> [!TIP]
> **Summary Checkpoint:** All 11 list methods are essential primitives in Python. Knowing which ones mutate in-place (`None` return) versus which ones return values (`pop`, `index`, `count`, `copy`) prevents 90% of common beginner syntax bugs.
