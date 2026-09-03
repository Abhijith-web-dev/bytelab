# Unit–III — Day 10: Merge Sort, Histogram & Complete Data-Structure Integration

**Duration:** 90 Minutes  
**Level:** Beginner → Intermediate  
**Unit:** Unit–III — Data Structures, Algorithms & Problem Solving  
**Day:** 10  
**Topics:** Merge Sort; Histogram Program; Integration of Lists, Tuples, Dictionaries, and List Comprehension; Unit–III Revision and Practice  

---

## 1. Day 10 Learning Objectives

By the end of this session, students should be able to:
- Explain the core concept of **Merge Sort** and the **divide-and-conquer** approach.
- Trace how a list is recursively divided into subproblems until base cases (single-element lists) are reached.
- Implement the two-pointer **merge operation** to combine sorted sublists into a single sorted list.
- Compare Merge Sort with Selection Sort and Insertion Sort across time complexity and structural trade-offs.
- Explain what a **histogram** is and use dictionaries to compute frequency distributions.
- Render clean text-based histograms in Python.
- Integrate **Lists, Tuples, Dictionaries, and List Comprehension** into a unified, modular architecture.
- Select the optimal Python data structure based on mutability, access patterns, and domain requirements.
- Review and connect all key concepts covered across the 10 days of Unit–III.

---

## 2. 90-Minute Session Plan

| Time | Topic | Activity |
| --- | --- | --- |
| 0–5 min | Unit–III recap | Quick oral quiz across Days 1–9 |
| 5–20 min | Merge Sort | Divide-and-conquer paradigm & visual tree |
| 20–35 min | Merge Sort implementation | Recursive slicing and pointer merging |
| 35–48 min | Histogram | Frequency counting with dictionaries |
| 48–62 min | Data-structure integration | Combining Lists + Tuples + Dictionaries |
| 62–72 min | List Comprehension integration | Filtering and aggregating complex structures |
| 72–78 min | Unit–III revision | Full architectural concept map |
| 78–87 min | Moodle practice | Student Performance Analyzer problem |
| 87–90 min | Quiz | Final Unit–III knowledge assessment |

---

## 3. The Unit–III Learning Journey

```text
Day 1: Boolean Logic & Conditional Branches (if, else, elif)
   ↓
Day 2: Lists, Indexing, Slicing, Methods & Traversals
   ↓
Day 3: Memory References, Mutability, Aliasing & Cloning
   ↓
Day 4: Functions & Lists (Parameters, Side-effects & Pure Functions)
   ↓
Day 5: Tuples (Immutability, Packing, Unpacking & Variable Swapping)
   ↓
Day 6: Tuples as Return Values & Multi-Output Pipelines
   ↓
Day 7: Dictionaries (Key-Value Modeling, CRUD & get())
   ↓
Day 8: Dictionary Traversal, Iterators & List Comprehensions
   ↓
Day 9: Sorting Algorithms (Selection Sort & Insertion Sort)
   ↓
Day 10: Merge Sort, Histograms & Complete Data-Structure Integration
```

---

## 4. What is Merge Sort?

**Merge Sort** is an efficient, general-purpose, comparison-based sorting algorithm that operates on a fundamental computational strategy: **Divide and Conquer**.

```text
Divide into smaller lists ──► Sort sublists recursively ──► Merge sorted sublists
```

---

## 5. The Divide-and-Conquer Paradigm

1. **Divide:** Break the input problem into smaller subproblems of the same type.
2. **Conquer:** Solve each subproblem recursively. When subproblems are reduced to single elements, they are trivially sorted.
3. **Combine (Merge):** Merge the solutions of the subproblems to produce the final sorted output.

---

## 6. Merge Sort: Step-by-Step Visualization

Tracing `[8, 3, 5, 2]`:

```text
                      [8, 3, 5, 2]
                            │
              ┌─────────────┴─────────────┐
          [8, 3]                        [5, 2]         <── Divide
          ┌──┴──┐                      ┌──┴──┐
         [8]   [3]                    [5]   [2]        <── Base Case (len <= 1)
          └──┬──┘                      └──┬──┘
          [3, 8]                        [2, 5]         <── Merge sorted pairs
              └─────────────┬─────────────┘
                     [2, 3, 5, 8]                      <── Final Merge
```

### Why do we divide until 1 element?
A list with zero or one element is **already sorted by definition**. There is nothing left to reorder!

---

## 7. The Heart of Merge Sort: The Merge Step

Consider two independent sorted lists:
```python
left  = [3, 8]
right = [2, 5]
```

We maintain two pointers (`i` for `left`, `j` for `right`) and compare their heads:
1. `left[0] (3)` vs `right[0] (2)` $\rightarrow$ 2 is smaller $\rightarrow$ Append 2 (`result = [2]`, advance `j`).
2. `left[0] (3)` vs `right[1] (5)` $\rightarrow$ 3 is smaller $\rightarrow$ Append 3 (`result = [2, 3]`, advance `i`).
3. `left[1] (8)` vs `right[1] (5)` $\rightarrow$ 5 is smaller $\rightarrow$ Append 5 (`result = [2, 3, 5]`, advance `j`).
4. `right` is exhausted. Append remainder of `left`: `[8]`.
5. Final Merged Output: `[2, 3, 5, 8]`.

---

## 8. Merge Sort Python Implementation

```python
def merge_sort(numbers):
    # 1. Base Case: Lists of length 0 or 1 are already sorted
    if len(numbers) <= 1:
        return numbers

    # 2. Divide: Split at the midpoint
    middle = len(numbers) // 2
    left = merge_sort(numbers[:middle])
    right = merge_sort(numbers[middle:])

    # 3. Combine: Two-pointer merge
    result = []
    i = 0
    j = 0

    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    # Append any leftover elements
    result.extend(left[i:])
    result.extend(right[j:])

    return result

numbers = [8, 3, 5, 2]
print("Sorted:", merge_sort(numbers))
# Output: [2, 3, 5, 8]
```

---

## 9. Comparative Breakdown: All Three Sorting Algorithms

| Feature | Selection Sort | Insertion Sort | Merge Sort |
| --- | --- | --- | --- |
| **Technique** | Find minimum + swap | Shift larger items + insert | Divide, conquer & merge |
| **Primary Action** | Swap | Shift | Merge |
| **Best-Case Time** | $O(n^2)$ | $O(n)$ (nearly sorted) | $O(n \log n)$ |
| **Worst-Case Time** | $O(n^2)$ | $O(n^2)$ | $O(n \log n)$ |
| **Space Requirement** | In-place ($O(1)$) | In-place ($O(1)$) | $O(n)$ extra memory |
| **Mental Model** | Pick smallest card | Sort cards in hand | Split deck into halves |

---

## 10. What is a Histogram?

A **histogram** is a graphical or text-based representation of the **frequency distribution** of numeric or categorical data.

```text
Values:     [1, 2, 2, 3, 3, 3]
Frequencies:
1 ──► 1  (*)
2 ──► 2  (**)
3 ──► 3  (***)
```

---

## 11. Frequency Counting with Dictionaries

A Python dictionary is the optimal data structure to map `item ──► frequency`:

```python
numbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
frequency = {}

for num in numbers:
    if num in frequency:
        frequency[num] += 1
    else:
        frequency[num] = 1

print(frequency)
# {1: 1, 2: 2, 3: 3, 4: 4}
```

Or concisely using `.get()`:
```python
for num in numbers:
    frequency[num] = frequency.get(num, 0) + 1
```

---

## 12. Displaying a Text-Based Histogram

Multiply the asterisk `"*"` by the integer count:

```python
for item, count in frequency.items():
    print(f"{item} : {'*' * count}")
```
**Output:**
```
1 : *
2 : **
3 : ***
4 : ****
```

---

## 13. Practical Example: Grade Range Histogram

```python
marks = [45, 52, 67, 72, 85, 91, 76, 88]

bins = {
    "40-49": 0,
    "50-59": 0,
    "60-69": 0,
    "70-79": 0,
    "80-89": 0,
    "90-100": 0
}

for mark in marks:
    if 40 <= mark <= 49:
        bins["40-49"] += 1
    elif 50 <= mark <= 59:
        bins["50-59"] += 1
    elif 60 <= mark <= 69:
        bins["60-69"] += 1
    elif 70 <= mark <= 79:
        bins["70-79"] += 1
    elif 80 <= mark <= 89:
        bins["80-89"] += 1
    elif 90 <= mark <= 100:
        bins["90-100"] += 1

print("--- Grade Distribution Histogram ---")
for grade_range, count in bins.items():
    print(f"{grade_range:6} : {'*' * count}")
```
**Output:**
```
--- Grade Distribution Histogram ---
40-49  : *
50-59  : *
60-69  : *
70-79  : **
80-89  : **
90-100 : *
```

---

## 14. Full Data-Structure Integration

In enterprise and production software, individual data structures are rarely used in isolation. They are nested to model real-world relationships:

```python
# Master Student Record Database
students = {
    "Arun": (20, [80, 75, 90]),
    "Priya": (19, [70, 85, 60]),
    "Rahul": (21, [90, 95, 88])
}
```

```text
Dictionary: Maps student name (str) ──► Record (tuple)
   Tuple:   Fixed personal details (age: int, marks: list)
   List:    Dynamic sequence of subject marks (marks: list of int)
```

---

## 15. Processing Integrated Data

```python
for name, record in students.items():
    age, marks = record  # Tuple unpacking
    total = sum(marks)
    average = total / len(marks)

    print(f"Student: {name} (Age: {age})")
    print(f"  Total:   {total}")
    print(f"  Average: {average:.2f}\n")
```

---

## 16. List Comprehension Across Integrated Records

Extract students whose average grade is 80 or above:

```python
top_performers = [
    name
    for name, record in students.items()
    if sum(record[1]) / len(record[1]) >= 80
]

print("Top Performers:", top_performers)
# ['Arun', 'Rahul']
```

---

## 17. The Complete Architectural System

```python
def analyze_student(marks):
    total = sum(marks)
    average = total / len(marks)
    status = "Pass" if average >= 40 else "Fail"
    return total, average, status

students = {
    "Arun": (20, [80, 75, 90]),
    "Priya": (19, [30, 45, 35]),
    "Rahul": (21, [90, 95, 88])
}

frequency = {"Pass": 0, "Fail": 0}

for name, (age, marks) in students.items():
    tot, avg, stat = analyze_student(marks)
    frequency[stat] += 1
    print(f"{name} -> Avg: {avg:.1f} | Result: {stat}")

print("\nSummary:", frequency)
```

---

## 18. Decision Framework: Choosing the Right Data Structure

```text
                    Do you need to store data?
                                │
                    Can the data grow or change?
                    /                          \
                 [YES]                        [NO]
                  /                              \
       Are values accessed by name?          Use a TUPLE
           /                  \              (e.g., coordinates, records)
        [YES]                [NO]
         /                      \
Use a DICTIONARY             Use a LIST
(e.g., profiles, stats)      (e.g., shopping cart, grades)
```

---

## 19. Complete Unit–III Concept Map

```text
                             UNIT-II
                                │
        ┌───────────────────────┼───────────────────────┐
        ▼                       ▼                       ▼
   CONTROL FLOW             SEQUENCES              ASSOCIATIVE
  • if / elif / else      • Lists (Mutable)     • Dictionaries
  • while / for           • Slicing / Methods     (Key-Value)
  • Comprehensions        • Tuples (Immutable)  • CRUD & get()
                                │                       │
                                └───────────┬───────────┘
                                            ▼
                                   ALGORITHMIC THINKING
                                • Selection Sort (Swap)
                                • Insertion Sort (Shift)
                                • Merge Sort (Divide & Conquer)
                                • Histograms (Frequency Count)
```

---

## 20. Common Beginner Pitfalls & Traps

### Pitfall 1: Infinite recursion in Merge Sort
```python
# Missing base case!
def merge_sort(arr):
    # Without: if len(arr) <= 1: return arr
    mid = len(arr) // 2
    return merge(merge_sort(arr[:mid]), merge_sort(arr[mid:]))
    # Crashes with RecursionError!
```

### Pitfall 2: Forgetting leftovers in Merge Sort
In `merge_sort`, one list may run out while the other still has elements. Always include:
```python
result.extend(left[i:])
result.extend(right[j:])
```

### Pitfall 3: Initializing histogram counters incorrectly
Always test whether a key exists or use `.get(key, 0)`:
```python
freq[key] = freq.get(key, 0) + 1
```

---

## 21. Quick Student Workout

### Workout 1: Merge Step
Given `left = [2, 5]` and `right = [1, 6]`, what is the merged sorted list?  
*Answer:* `[1, 2, 5, 6]`

### Workout 2: Frequency Count
In `[2, 2, 3, 3, 3]`, what is the frequency of `3`?  
*Answer:* `3`

### Workout 3: Comprehension Output
```python
numbers = [1, 2, 3, 4]
print([n * n for n in numbers if n % 2 == 0])
```
*Answer:* `[4, 16]`

---

## 22. Unit–III Final Cheat Sheet

| Mechanism | Code Example | Purpose |
| --- | --- | --- |
| **Merge Sort** | `mid = len(a)//2; l = sort(a[:mid]); r = sort(a[mid:])` | Divide-and-conquer $O(n \log n)$ sort |
| **Histogram** | `d[x] = d.get(x, 0) + 1` | Frequency mapping |
| **Visual Bar** | `print(k, ":", "*" * count)` | Text-based graph |
| **Tuple Unpack** | `age, marks = student_record` | Destructuring components |
| **List Comp** | `[name for name, data in d.items() if cond]` | Declarative filtering |

---

## 23. Unit–III Final Challenge

Trace the execution of this program:

```python
def get_average(marks):
    return sum(marks) / len(marks)

students = {
    "Arun": (20, [80, 75, 90]),
    "Priya": (19, [30, 35, 40]),
    "Rahul": (21, [90, 95, 85])
}

high_performers = [
    name
    for name, data in students.items()
    if get_average(data[1]) >= 75
]

print("Honors Roll:", high_performers)
```

**Expected Output:**
```
Honors Roll: ['Arun', 'Rahul']
```

> **Unit–III Capstone Message:** You now possess a comprehensive command of Python fundamentals — control flow, sequence mutability, associative key-value mapping, declarative comprehensions, and classical sorting algorithms. You are fully prepared to tackle advanced computational problem-solving!
