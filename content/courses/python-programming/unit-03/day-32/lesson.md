# Unit–III — Day 9: Sorting Algorithms — Selection Sort & Insertion Sort

**Duration:** 90 Minutes  
**Level:** Beginner → Intermediate  
**Unit:** Unit–III — Data Structures, Control Flow & Algorithms  
**Day:** 9  
**Topics:** Sorting Algorithms: Selection Sort and Insertion Sort; Implementation using Lists; Algorithm-Based Problem Solving  

---

## 1. Day 9 Learning Objectives

By the end of this session, students should be able to:
- Explain what **sorting** means and why it is foundational to software engineering.
- Understand how algorithms solve problems through systematic, deterministic steps.
- Explain the mechanics of **Selection Sort** (Find minimum $\rightarrow$ Swap into position).
- Implement Selection Sort from scratch in Python using lists and nested loops.
- Explain the mechanics of **Insertion Sort** (Take next value $\rightarrow$ Shift larger values $\rightarrow$ Insert).
- Implement Insertion Sort in Python using `for` and `while` loops.
- Compare Selection Sort and Insertion Sort across swapping, shifting, and behavior on partially-sorted data.
- Perform step-by-step dry runs and traces on unsorted lists.
- Adapt algorithms for both ascending and descending order.
- Identify and handle edge cases (empty lists, single elements, reverse order, duplicates).

---

## 2. 90-Minute Session Plan

| Time | Topic | Activity |
| --- | --- | --- |
| 0–5 min | Day 8 recap | Dictionaries + List Comprehension recap |
| 5–15 min | Introduction to sorting | What is sorting? Real-world use cases |
| 15–30 min | Selection Sort | Step-by-step dry run & visualization |
| 30–43 min | Selection Sort implementation | Python code breakdown & execution |
| 43–58 min | Insertion Sort | Playing card analogy & step-by-step trace |
| 58–70 min | Insertion Sort implementation | Python code with `while` shifting loop |
| 70–77 min | Selection vs Insertion Sort | Side-by-side comparison (Swap vs Shift) |
| 77–80 min | Algorithmic problem solving | Edge cases, debugging, descending order |
| 80–87 min | Moodle practice | Sort Student Marks Using Selection Sort |
| 87–90 min | Quiz | Knowledge check |

---

## 3. What is Sorting?

**Sorting** means arranging a collection of data into a specific meaningful sequence.

```text
Unsorted:        40   10   30   20   50
Ascending:       10   20   30   40   50   (Lowest to Highest)
Descending:      50   40   30   20   10   (Highest to Lowest)
```

### Real-World Applications:
- **Leaderboards & Grading:** Ordering students by exam marks or GPA.
- **E-Commerce:** Sorting products by price or ratings.
- **Search Engines:** Ranking query matches by relevance.
- **Contact Books:** Alphabetical contact names.

---

## 4. Why Learn Manual Sorting When Python Has `.sort()`?

Python already gives us `numbers.sort()` and `sorted(numbers)`. So why study manual algorithms?

> **The Big Takeaway:**  
> The goal is **algorithmic thinking**, not just ordering numbers.  
> Implementing sorting algorithms teaches:
> - Nested loop control and index coordination
> - In-place array transformations
> - Temporary storage and boundary tracking
> - Swapping vs shifting data structures
> - Performance trade-offs and complexity foundations

---

## 5. What is an Algorithm?

An **algorithm** is a well-defined, finite, step-by-step procedure to solve a specific problem.

```text
Input: [40, 10, 30, 20]
         │
         ▼
[ Sorting Algorithm ] ──► Compares, exchanges, or shifts items systematically
         │
         ▼
Output: [10, 20, 30, 40]
```

---

## 6. Selection Sort — The Basic Idea

**Selection Sort** repeatedly finds the smallest (minimum) element from the unsorted part of the list and swaps it into its correct final position at the front.

```text
Find the smallest ──► Put it in front ──► Repeat for remainder
```

---

## 7. Selection Sort: Real-World Demonstration

Suppose students line up with marks: `[70, 40, 90, 30, 60]`

### Pass 1:
- Search entire list: minimum is **30**.
- Swap **30** with the first position (**70**):  
  `[30 | 40, 90, 70, 60]` (Index 0 is now sorted!)

### Pass 2:
- Search remaining unsorted slice `[40, 90, 70, 60]`: minimum is **40**.
- 40 is already at index 1:  
  `[30, 40 | 90, 70, 60]`

### Pass 3:
- Search remaining slice `[90, 70, 60]`: minimum is **60**.
- Swap **60** with **90**:  
  `[30, 40, 60 | 70, 90]`

### Pass 4:
- Search `[70, 90]`: minimum is **70** (already in place).
- Final Sorted List: `[30, 40, 60, 70, 90]`

---

## 8. Selection Sort Step-by-Step Walkthrough

Tracing `[64, 25, 12, 22, 11]`:

```text
Initial:      [ 64,  25,  12,  22,  11 ]

Pass 1: Min is 11 (at index 4) ──► Swap with index 0 (64)
              [ 11 | 25,  12,  22,  64 ]

Pass 2: Min is 12 (at index 2) ──► Swap with index 1 (25)
              [ 11,  12 | 25,  22,  64 ]

Pass 3: Min is 22 (at index 3) ──► Swap with index 2 (25)
              [ 11,  12,  22 | 25,  64 ]

Pass 4: Min is 25 (at index 3) ──► No swap needed
              [ 11,  12,  22,  25,  64 ]
```

---

## 9. Selection Sort Algorithm Steps

```text
1. Set outer loop index i from 0 to n - 1
2. Assume min_index = i
3. Set inner loop index j from i + 1 to n:
      if numbers[j] < numbers[min_index]:
          min_index = j
4. Swap numbers[i] with numbers[min_index]
5. Increment i and repeat
```

---

## 10. Selection Sort Implementation in Python

```python
numbers = [64, 25, 12, 22, 11]
n = len(numbers)

for i in range(n):
    min_index = i

    for j in range(i + 1, n):
        if numbers[j] < numbers[min_index]:
            min_index = j

    # Tuple swap in Python
    numbers[i], numbers[min_index] = numbers[min_index], numbers[i]

print("Sorted:", numbers)
# Sorted: [11, 12, 22, 25, 64]
```

---

## 11. Anatomy of the Selection Sort Loops

- **Outer Loop (`for i in range(n)`):**  
  Selects which position is currently being filled from left to right.
- **Inner Loop (`for j in range(i + 1, n)`):**  
  Scans the remaining unsorted subarray to locate the index of the minimum element.
- **The Swap (`numbers[i], numbers[min_index] = ...`):**  
  Executes exactly **once per outer loop pass**.

---

## 12. Insertion Sort — The Playing Card Metaphor

**Insertion Sort** builds a sorted array one element at a time by picking the next unsorted card and inserting it into its proper relative position among the previously sorted cards.

```text
Hand: [5]
Receive 3 ──► 3 is smaller than 5 ──► Shift 5 right ──► Insert 3: [3, 5]
Receive 4 ──► 4 is smaller than 5, greater than 3 ──► Shift 5 ──► Insert 4: [3, 4, 5]
```

---

## 13. Insertion Sort: Step-by-Step Shifting Trace

Tracing `[5, 3, 4, 1, 2]`:

```text
Initial:   [ 5 ]  3,  4,  1,  2

Pass 1 (Take 3):
- Compare 3 with 5: 5 > 3 ──► Shift 5 right: [ 5, 5, 4, 1, 2 ]
- Insert 3 at index 0:                       [ 3, 5, 4, 1, 2 ]

Pass 2 (Take 4):
- Compare 4 with 5: 5 > 4 ──► Shift 5 right: [ 3, 5, 5, 1, 2 ]
- Compare 4 with 3: 3 <= 4 ──► Stop shifting
- Insert 4 at index 1:                       [ 3, 4, 5, 1, 2 ]

Pass 3 (Take 1):
- 1 is smaller than 5, 4, 3 ──► Shift all right: [ 3, 3, 4, 5, 2 ]
- Insert 1 at index 0:                           [ 1, 3, 4, 5, 2 ]

Pass 4 (Take 2):
- 2 is smaller than 5, 4, 3 ──► Shift them:      [ 1, 3, 3, 4, 5 ]
- Insert 2 at index 1:                           [ 1, 2, 3, 4, 5 ]
```

---

## 14. Insertion Sort Implementation in Python

```python
numbers = [5, 3, 4, 1, 2]

for i in range(1, len(numbers)):
    current = numbers[i]
    j = i - 1

    # Shift elements greater than 'current' one position right
    while j >= 0 and numbers[j] > current:
        numbers[j + 1] = numbers[j]
        j -= 1

    # Place current into its correct spot
    numbers[j + 1] = current

print("Sorted:", numbers)
# Sorted: [1, 2, 3, 4, 5]
```

---

## 15. Dissecting the Insertion Sort `while` Loop

1. `current = numbers[i]`: Temporarily holds the value being placed.
2. `j = i - 1`: Starts checking immediately to the left of `current`.
3. `while j >= 0 and numbers[j] > current`: Checks two conditions:
   - Are we still within the list boundary (`j >= 0`)?
   - Is the element on the left larger than `current`?
4. `numbers[j + 1] = numbers[j]`: Shifts the larger element one slot to the right.
5. `j -= 1`: Steps backwards toward the front of the list.
6. `numbers[j + 1] = current`: Inserts `current` into the gap created.

---

## 16. Selection Sort vs Insertion Sort

| Feature | Selection Sort | Insertion Sort |
| --- | --- | --- |
| **Core Action** | **Find + Swap** | **Take + Shift + Insert** |
| **Primary Movement** | Direct swapping of two elements | Shifting elements rightward |
| **Outer Loop Focus** | Determines index of minimum value | Picks next unsorted element |
| **Partially Sorted Lists** | Always makes $O(n^2)$ comparisons | Can be very fast ($O(n)$ best case) |
| **Mental Model** | Scanning a crowd for the shortest person | Organizing playing cards in hand |

---

## 17. Adapting for Descending Order

### Selection Sort (Descending):
Find the **maximum** instead of the minimum:
```python
if numbers[j] > numbers[max_index]:  # Changed from < to >
    max_index = j
```

### Insertion Sort (Descending):
Shift smaller elements rightward:
```python
while j >= 0 and numbers[j] < current:  # Changed from > to <
    numbers[j + 1] = numbers[j]
    j -= 1
```

---

## 18. Packaging Sorting into Reusable Functions

```python
def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]

def insertion_sort(arr):
    for i in range(1, len(arr)):
        current = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > current:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = current

marks1 = [65, 42, 90, 55, 78]
selection_sort(marks1)
print("Selection Sorted:", marks1)

marks2 = [65, 42, 90, 55, 78]
insertion_sort(marks2)
print("Insertion Sorted:", marks2)
```

---

## 19. Essential Edge Cases

Always test your sorting implementations against:
1. **Empty list:** `[]`
2. **Single element:** `[42]`
3. **Already sorted list:** `[10, 20, 30, 40]`
4. **Reverse sorted list:** `[50, 40, 30, 20]`
5. **List with duplicates:** `[30, 10, 30, 20, 10]`

Both algorithms must handle these inputs without throwing `IndexError` or crashing.

---

## 20. Common Beginner Mistakes

### Mistake 1 — Swapping prematurely in Selection Sort
```python
# WRONG: Swapping inside the inner loop whenever a smaller value is found!
for j in range(i + 1, n):
    if numbers[j] < numbers[i]:
        numbers[i], numbers[j] = numbers[j], numbers[i]  # Causes excessive swaps!

# CORRECT: Find min_index first, then swap once outside the inner loop!
```

### Mistake 2 — Overwriting `current` before shifting in Insertion Sort
```python
# WRONG: Forgetting to store numbers[i] in a variable 'current'
# As soon as numbers[j + 1] = numbers[j] executes, the original value is lost!
```

### Mistake 3 — Forgetting `j -= 1` in Insertion Sort
Omitting `j -= 1` causes an **infinite while loop** because `j` never decreases!

---

## 21. Quick Student Workout

### Workout 1
Given `[5, 2, 4, 1]`, what is the state of the list after the first pass of Selection Sort?  
*Answer:* `[1, 2, 4, 5]`

### Workout 2
Given `[5, 3, 4]`, what is the list after inserting 3 in Insertion Sort?  
*Answer:* `[3, 5, 4]`

### Workout 3
Which keyword pair best summarizes Selection Sort?  
*Answer:* **Find + Swap**

### Workout 4
Which keyword trio best summarizes Insertion Sort?  
*Answer:* **Take + Shift + Insert**

---

## 22. Unit–III Day 9 Cheat Sheet

| Algorithm | Key Loop | Critical Operation |
| --- | --- | --- |
| **Selection Sort** | `for i` + `for j in range(i+1, n)` | `arr[i], arr[min_idx] = arr[min_idx], arr[i]` |
| **Insertion Sort** | `for i in range(1, n)` + `while` | `arr[j + 1] = arr[j]` then `arr[j + 1] = current` |
| **Manual Practice Rule** | Do **not** call `.sort()` or `sorted()` | Implement loops and indexing by hand |

---

## 23. Day 9 Final Challenge

Predict the state of `numbers = [7, 3, 5, 2]` after each outer loop pass in Selection Sort:

```text
Initial: [7, 3, 5, 2]
Pass 1:  Min is 2 ──► Swap with 7: [2, 3, 5, 7]
Pass 2:  Min is 3 ──► No swap:     [2, 3, 5, 7]
Pass 3:  Min is 5 ──► No swap:     [2, 3, 5, 7]
Final:   [2, 3, 5, 7]
```

> **Day 9 Key Takeaway:** Selection Sort and Insertion Sort demonstrate how simple comparison and exchange operations can systematically bring order to unordered collections. Understanding these steps unlocks the core foundations of computer science algorithms.
