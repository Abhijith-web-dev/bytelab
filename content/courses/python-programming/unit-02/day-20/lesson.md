# Unit–II — Day 8: Strings, String Slices, Immutability & String Methods

**Duration:** 90 Minutes  
**Level:** Beginner → Intermediate  
**Unit:** Unit–II — Control Flow, Functions & Problem Solving  
**Day:** 8  
**Topics Covered:** Strings; Creating and storing strings; String indexing; Positive and negative indexing; String slices; String immutability; String operators; Built-in string functions; String methods; Practical string programs; Common beginner mistakes; Moodle coding practice; AI Agent guidance; Quiz  

---

## 1. Learning Objectives

By the end of this session, students should be able to:
- Define what a string is in Python and identify its data type (`str`).
- Create strings using single (`'`), double (`"`), and multi-line triple quotes (`'''` or `"""`).
- Access individual characters through **positive** (left-to-right) and **negative** (right-to-left) indexing.
- Extract substrings using Python's slicing syntax: `string[start:stop:step]`.
- Understand and explain why strings are **immutable** in memory.
- Use string operators: Concatenation (`+`), Repetition (`*`), and Membership (`in`, `not in`).
- Utilize built-in Python string functions: `len()`, `str()`, `ord()`, and `chr()`.
- Confidently apply essential string methods:
  - Case transformation: `upper()`, `lower()`, `capitalize()`, `title()`
  - Whitespace cleaning: `strip()`, `lstrip()`, `rstrip()`
  - Searching & counting: `find()`, `count()`, `startswith()`, `endswith()`
  - Restructuring: `replace()`, `split()`, `join()`
  - Validation: `isdigit()`, `isalpha()`, `isalnum()`, `isupper()`, `islower()`
- Write programs that search, filter, reverse, and validate text inputs (e.g., palindrome detection, vowel counting).

---

## 2. 90-Minute Session Plan

| Time | Topic | Activity |
| --- | --- | --- |
| 0–10 min | Recap | Review functions, recursion, base cases, and return values |
| 10–25 min | Introduction to Strings | String representation, quotes, and length |
| 25–40 min | String Indexing | 0-based positive and reverse negative indexing |
| 40–52 min | String Slicing | Substring ranges `[start:stop]`, omitting bounds, step `[::-1]` |
| 52–62 min | String Immutability | Memory immutability, `TypeError`, creating new strings |
| 62–75 min | Functions & Methods | Case conversion, whitespace stripping, searching, splitting |
| 75–83 min | Practical Programs | Counting vowels/digits, palindromes, and clean inputs |
| 83–87 min | Student Workout | Step-by-step interactive exercises |
| 87–90 min | Quiz + Cheat Sheet | Mastery assessment and quick reference |

---

## 3. Quick Recap from Day 7

In Day 7, we explored recursive computational problem solving:

```python
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))  # 120
```

Today, we transition from numerical algorithms to Python's most ubiquitous, universal data type: **Strings (`str`)**.

Strings are present in virtually every piece of software:
- Usernames, passwords, and profile credentials
- Web URLs, REST API payloads, and database queries
- Chat messages, notifications, and logging output
- File paths, document text, and formatted data reports

---

## 4. What is a String?

A **string** is an ordered, contiguous sequence of Unicode characters:
- Letters (`A–Z`, `a–z`)
- Digits (`0–9`)
- Whitespace (spaces, tabs, newlines)
- Punctuation & symbols (`@`, `#`, `$`, `%`, emojis)

```python
name = "Arun"
city = 'Chennai'
message = "Welcome to ByteLab LMS!"
numeric_string = "123"  # String, NOT an integer!
```

| Literal | Data Type | Can perform math directly? |
| --- | --- | --- |
| `123` | `int` | Yes: `123 + 5 = 128` |
| `"123"` | `str` | No: `"123" + "5" = "1235"` (concatenation) |

---

## 5. Creating Strings in Python

### Single Quotes vs Double Quotes
```python
quote1 = 'Python is great'
quote2 = "Python is powerful"
# Mixing quotes allows embedding quotes without escaping:
quote3 = "It's a beautiful day"
quote4 = 'He said, "Welcome!"'
```

### Multi-Line Triple Quotes
Triple quotes (`'''` or `"""`) preserve line breaks and formatting:
```python
banner = """=============================
   ByteLab Learning Center
============================="""
print(banner)
```

---

## 6. Inspecting String Type and Length

```python
tech = "Python"
print(type(tech))  # <class 'str'>
print(len(tech))   # 6 characters
```

Spaces and punctuation are counted as characters:
```python
greeting = "Hello World!"
print(len(greeting))  # 12 (5 letters + 1 space + 5 letters + 1 exclamation mark)
```

---

## 7. String Indexing (0-Based & Negative)

Because strings are ordered sequences, every character is accessible by its integer position (**index**):

```text
String:          P   Y   T   H   O   N
Positive Index:  0   1   2   3   4   5  (Left to Right)
Negative Index: -6  -5  -4  -3  -2  -1  (Right to Left)
```

> **Fundamental Rule:** Positive indexing starts at **0** (not 1). Negative indexing starts at **-1** from the rightmost character.

```python
word = "PYTHON"

print(word[0])   # First character: 'P'
print(word[1])   # Second character: 'Y'
print(word[-1])  # Last character: 'N'
print(word[-2])  # Second to last: 'O'
```

---

## 8. Preventing `IndexError`

Attempting to access an index beyond string boundaries raises an `IndexError`:

```python
word = "Python"
# Valid positive indices: 0 to 5
print(word[10])  # IndexError: string index out of range
```
> **Safety Guard:** Always verify `index < len(string)` before attempting indexed access.

---

## 9. String Slicing: `string[start:stop]`

**Slicing** extracts a contiguous subset from a string:

$$\text{Syntax: } \text{string}[\text{start} : \text{stop}]$$

> **The Inclusion Rule:** **`start` is INCLUDED**, but **`stop` is EXCLUDED**!

```python
word = "PYTHON"

print(word[0:3])  # Indices 0, 1, 2 -> 'PYT'
print(word[1:4])  # Indices 1, 2, 3 -> 'YTH'
print(word[2:6])  # Indices 2, 3, 4, 5 -> 'THON'
```

---

## 10. Omitting Bounds in Slices

Python allows omitting `start` or `stop`:

```python
word = "PYTHON"

# Omit start -> begins at 0
print(word[:3])   # 'PYT'

# Omit stop -> goes to the very end
print(word[3:])   # 'HON'

# Omit both -> complete shallow clone of the string
print(word[:])    # 'PYTHON'
```

---

## 11. Slicing with Step: `string[start:stop:step]`

$$\text{Syntax: } \text{string}[\text{start} : \text{stop} : \text{step}]$$

```python
word = "PYTHON"

# Every second character starting from index 0:
print(word[0:6:2])  # Indices 0, 2, 4 -> 'PTO'
```

---

## 12. Reversing a String via Slicing (`[::-1]`)

Specifying a negative step (`-1`) traverses the string in reverse:

```python
word = "PYTHON"
reversed_word = word[::-1]
print(reversed_word)
# Output: NOHTYP
```

---

## 13. String Immutability (Core Concept)

In Python, **strings are immutable**. Once created in memory, individual characters cannot be modified or reassigned in place.

```python
word = "Python"
word[0] = "J"  # TypeError: 'str' object does not support item assignment
```

### How to Create Modified Strings
To "alter" a string, build a **new string** and reassign:

```python
word = "Python"
word = "J" + word[1:]  # Creates 'J' + 'ython'
print(word)            # 'Jython'
```

---

## 14. Immutability Comparison: String vs List

| Dimension | String (`str`) | List (`list`) |
| :--- | :--- | :--- |
| **Mutability** | **Immutable** (Read-only characters) | **Mutable** (In-place element modification) |
| **In-place Assignment** | `s[0] = 'X'` $\rightarrow$ **TypeError** | `lst[0] = 'X'` $\rightarrow$ **Allowed** |
| **Indexing & Slicing** | Supported | Supported |
| **Storage Type** | Unicode characters only | Any heterogeneous Python objects |

---

## 15. String Operators

### 1. Concatenation (`+`)
Joins strings together:
```python
first = "Byte"
second = "Lab"
full = first + " " + second
print(full)  # 'Byte Lab'
```

### 2. Repetition (`*`)
Repeats strings multiple times:
```python
print("-" * 20)  # '--------------------'
print("Go! " * 3)  # 'Go! Go! Go! '
```

### 3. Membership (`in`, `not in`)
Checks for substring existence:
```python
sentence = "Python Programming Language"
print("Python" in sentence)     # True
print("Java" in sentence)       # False
print("Java" not in sentence)   # True
```

---

## 16. Case Transformation Methods

```python
text = "python programming"

print(text.upper())       # 'PYTHON PROGRAMMING'
print(text.lower())       # 'python programming'
print(text.capitalize())  # 'Python programming'
print(text.title())       # 'Python Programming'
```

> **Remember:** String methods return a **new string**. The original variable remains unchanged unless reassigned:
> ```python
> text = text.upper()
> ```

---

## 17. Whitespace Cleaning Methods

```python
raw = "   ByteLab Student   "

print(raw.strip())   # 'ByteLab Student' (strips both sides)
print(raw.lstrip())  # 'ByteLab Student   ' (left only)
print(raw.rstrip())  # '   ByteLab Student' (right only)
```

---

## 18. Searching & Counting Methods

### `find(sub)`
Returns the starting index of the first occurrence, or `-1` if not found:
```python
text = "Python Programming"
print(text.find("Programming"))  # 7
print(text.find("Java"))         # -1
```

### `count(sub)`
Counts non-overlapping occurrences:
```python
word = "banana"
print(word.count("a"))  # 3
```

### `startswith(prefix)` & `endswith(suffix)`
```python
file_name = "report_2026.pdf"
print(file_name.startswith("report"))  # True
print(file_name.endswith(".pdf"))      # True
```

---

## 19. Restructuring Methods: `replace()`, `split()`, `join()`

### `replace(old, new)`
```python
text = "I love Java"
print(text.replace("Java", "Python"))  # 'I love Python'
```

### `split(delimiter)`
Breaks a string into a list of words or tokens:
```python
text = "Python is fast and elegant"
words = text.split()  # Splits on whitespace by default
print(words)          # ['Python', 'is', 'fast', 'and', 'elegant']
```

### `join(iterable)`
Glues a collection of strings into a single string:
```python
languages = ["Python", "Rust", "Go"]
joined = ", ".join(languages)
print(joined)  # 'Python, Rust, Go'
```

---

## 20. Character Classification Methods

```python
print("12345".isdigit())      # True
print("123abc".isdigit())     # False

print("Python".isalpha())     # True
print("Python123".isalpha())  # False

print("Python123".isalnum())  # True
print("Python 123".isalnum()) # False (space is neither letter nor digit)
```

---

## 21. Practical Programs

### 1. Vowel Counter
```python
text = "education"
vowels = sum(1 for ch in text if ch.lower() in "aeiou")
print("Vowels:", vowels)  # 5
```

### 2. Palindrome Checker
```python
word = "radar"
is_palindrome = (word == word[::-1])
print("Is Palindrome:", is_palindrome)  # True
```

### 3. Digit Counter
```python
data = "User1234Pass56"
digit_count = sum(1 for ch in data if ch.isdigit())
print("Digits:", digit_count)  # 6
```

---

## 22. Common Beginner Traps

1. **Attempting Mutation:** `text[0] = 'a'` raises `TypeError`. Always construct a new string.
2. **Forgetting Zero Indexing:** First character is `text[0]`, not `text[1]`.
3. **Inclusive Slice Assumption:** `text[0:3]` gives 3 characters (indices 0, 1, 2), not 4.
4. **Method Side-Effect Fallacy:** `text.upper()` does not change `text`. Write `text = text.upper()`.
5. **Treating `input()` as Numerical:** `input()` returns `str`. Use `int(input())` when arithmetic is needed.

---

## 23. Quick Student Workout

### Workout 1
What is `"Programming"[0]`?  
*Answer:* `'P'`

### Workout 2
What is `"Programming"[-1]`?  
*Answer:* `'g'`

### Workout 3
What is `"Computer"[:5]`?  
*Answer:* `'Compu'`

### Workout 4
What is `"Python"[::-1]`?  
*Answer:* `'nohtyP'`

### Workout 5
What is `"banana".count("a")`?  
*Answer:* `3`

---

## 24. Unit-II Day 8 Cheat Sheet

| Operation | Syntax Example | Result |
| :--- | :--- | :--- |
| **Length** | `len("Python")` | `6` |
| **Indexing** | `s[0]`, `s[-1]` | First char, last char |
| **Slicing** | `s[1:4]` | Substring indices 1, 2, 3 |
| **Reversal** | `s[::-1]` | Reversed string |
| **Case Change** | `s.upper()`, `s.lower()` | New transformed string |
| **Trimming** | `s.strip()` | Whitespace removed from ends |
| **Splitting** | `"a b c".split()` | `['a', 'b', 'c']` |
| **Joining** | `"-".join(['a', 'b'])` | `'a-b'` |
| **Check Digits** | `s.isdigit()` | `True` if purely digits |
| **Check Letters** | `s.isalpha()` | `True` if purely letters |

---

## 25. Day 8 Capstone Challenge: String Analyzer Pipeline

```python
text = "madam 123"

length = len(text)
vowels = sum(1 for ch in text if ch.lower() in "aeiou")
digits = sum(1 for ch in text if ch.isdigit())
words = len(text.split())
rev = text[::-1]
palindrome = (text == rev)

print(f"Length = {length}")
print(f"Vowels = {vowels}")
print(f"Digits = {digits}")
print(f"Words = {words}")
print(f"Reverse = {rev}")
print(f"Palindrome = {palindrome}")
```

**Output:**
```
Length = 9
Vowels = 2
Digits = 3
Words = 2
Reverse = 321 madam
Palindrome = False
```

> **Takeaway:** Strings are immutable sequences with a rich ecosystem of slicing syntax, operators, and methods. Mastering them gives you complete control over text processing in Python!
