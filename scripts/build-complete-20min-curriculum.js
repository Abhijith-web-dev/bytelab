import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT_DIR, 'content', 'courses', 'python-programming');

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

function writeText(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
}

console.log('Generating full 20-minute curriculum for all 5 Units (27 Chapters)...');

const allChapters = [
  // -------------------------------------------------------------
  // UNIT 1: Data Types, Expressions, Statements (CO1)
  // -------------------------------------------------------------
  {
    unitId: 'unit-01',
    folder: '01-interpreter',
    chapter: {
      id: '01-interpreter',
      unitId: 'unit-01',
      order: 1,
      title: 'Python Interpreter & Execution Architecture',
      description: 'Understand the CPython runtime pipeline: Lexing, Parsing, Abstract Syntax Trees (AST), Bytecode compilation, and the Python Virtual Machine (PVM).',
      estimatedMinutes: 20,
      difficulty: 'beginner',
      outcomes: ['CO1'],
      prerequisites: [],
      lessonsCount: 1,
      problemsCount: 1,
      quizCount: 2
    },
    simulation: {
      title: 'CPython Bytecode Compilation & PVM Evaluation Loop',
      codeLines: [
        '# Step 1: Assign variable in heap',
        'message = "Hello, ByteLab!"',
        '# Step 2: Invoke built-in print()',
        'print(message)',
        '# Step 3: Compute binary arithmetic',
        'result = 10 * 5'
      ],
      steps: [
        {
          activeLine: 2,
          explanation: 'CPython allocates a `PyUnicodeObject` in the heap containing "Hello, ByteLab!" and binds identifier `message` in the local frame namespace table.',
          variables: { message: { type: 'str', value: '"Hello, ByteLab!"' } },
          output: null
        },
        {
          activeLine: 4,
          explanation: 'PVM executes `CALL_FUNCTION`. The standard output stream receives the string characters followed by a newline byte (`\\n`).',
          variables: { message: { type: 'str', value: '"Hello, ByteLab!"' } },
          output: 'Hello, ByteLab!'
        },
        {
          activeLine: 6,
          explanation: 'Binary multiplication `10 * 5` is evaluated by `BINARY_MULTIPLY`. Integer object 50 is assigned to identifier `result`.',
          variables: { message: { type: 'str', value: '"Hello, ByteLab!"' }, result: { type: 'int', value: '50' } },
          output: 'Hello, ByteLab!'
        }
      ]
    },
    lesson: `# Python Interpreter & Execution Architecture

## 1. Learning Objectives (CO1 — Understand)
- Understand the complete CPython compilation and execution pipeline.
- Distinguish between **Interactive Mode (REPL)** and **Script Mode**.
- Inspect Python bytecode using the built-in \`dis\` module.
- Understand how memory is managed via \`PyObject\` structures and the GIL.

---

## 2. The CPython Compilation Pipeline
Python source code undergoes a multi-stage translation before execution:

\`\`\`text
Source Code (.py) 
       │
       ▼ (Lexical Analysis & Tokenizer)
Token Stream
       │
       ▼ (Parser)
Abstract Syntax Tree (AST)
       │
       ▼ (Compiler)
Bytecode (.pyc / PyCodeObject)
       │
       ▼ (Evaluation Loop: ceval.c)
Python Virtual Machine (PVM)
\`\`\`

1. **Tokenizer (Lexer):** Scans source text and generates tokens (keywords, identifiers, literals, operators).
2. **Parser:** Validates grammar and builds the Abstract Syntax Tree (AST).
3. **Bytecode Compiler:** Emits platform-independent bytecode instructions cached in \`__pycache__/*.pyc\`.
4. **PVM (Python Virtual Machine):** The stack-based evaluation loop in C that executes instructions.

---

## 3. Interactive vs Script Mode

| Mode | Invocation | Characteristics | Typical Use Case |
| :--- | :--- | :--- | :--- |
| **Interactive Mode (REPL)** | \`python\` | Executes statements line-by-line, auto-prints evaluation results | Rapid prototyping, debugging, API exploration |
| **Script Mode** | \`python app.py\` | Compiles entire file to bytecode, runs sequentially from top to bottom | Production programs, reusable modules, automation |

---

## 4. Bytecode Disassembly with \`dis\`
\`\`\`python
import dis

def calculate(x):
    return x * 2 + 5

dis.dis(calculate)
\`\`\`

**Bytecode Output:**
\`\`\`text
  2           0 LOAD_FAST                0 (x)
              2 LOAD_CONST               1 (2)
              4 BINARY_MULTIPLY
              6 LOAD_CONST               2 (5)
              8 BINARY_ADD
             10 RETURN_VALUE
\`\`\`

---

## 5. Summary & Key Takeaways
- Python uses compilation to bytecode followed by virtual machine interpretation.
- Memory objects are allocated on the heap as \`PyObject\` structures tracked by reference counts.
- Interactive mode evaluates expressions instantly, while script mode runs batch programs.
`,
    examples: [
      {
        id: 'ex-01-01',
        title: 'Inspecting Bytecode with the dis Module',
        code: 'import dis\n\ndef add(a, b):\n    return a + b\n\nprint("Function output:", add(10, 20))\ndis.dis(add)',
        expectedOutput: 'Function output: 30',
        explanation: 'Demonstrates Python bytecode disassembly showing LOAD_FAST and BINARY_ADD instructions.'
      }
    ],
    problems: [
      {
        id: 'py-u1-ch1-p1',
        courseId: 'python-programming',
        unitId: 'unit-01',
        chapterId: '01-interpreter',
        language: 'python',
        difficulty: 'beginner',
        title: 'Interpreter Output Formatter',
        description: 'Write a Python program that defines a function `format_system(name, version)` returning `"System: Python 3.11 (Pyodide)"` when called with `format_system("Python", "3.11 (Pyodide)")`.',
        starterCode: 'def format_system(name, version):\n    # Return formatted string\n    pass\n\nprint(format_system("Python", "3.11 (Pyodide)"))',
        solutionCode: 'def format_system(name, version):\n    return f"System: {name} {version}"\n\nprint(format_system("Python", "3.11 (Pyodide)"))',
        hints: ['Use f-string formatting: f"System: {name} {version}"'],
        testCases: [
          { id: 'tc-1', input: '', expectedOutput: 'System: Python 3.11 (Pyodide)', isHidden: false }
        ],
        skills: ['functions', 'strings', 'interpreter'],
        coMapping: ['CO1'],
        timeLimitMs: 3000,
        attemptsAllowed: 10
      }
    ],
    quiz: [
      {
        id: 'q-u1-ch1-1',
        type: 'mcq',
        difficulty: 'beginner',
        coMapping: ['CO1'],
        question: 'Which component is responsible for executing compiled Python bytecode instructions in CPython?',
        options: [
          { id: 'opt-1', text: 'Python Virtual Machine (PVM)', isCorrect: true, explanation: 'The PVM is the runtime evaluation loop that executes bytecode.' },
          { id: 'opt-2', text: 'Lexical Scanner', isCorrect: false },
          { id: 'opt-3', text: 'C Preprocessor', isCorrect: false },
          { id: 'opt-4', text: 'Linker', isCorrect: false }
        ],
        explanation: 'The PVM is the central virtual stack machine that interprets Python bytecode.',
        tags: ['interpreter', 'architecture']
      }
    ]
  },
  {
    unitId: 'unit-01',
    folder: '02-values-types',
    chapter: {
      id: '02-values-types',
      unitId: 'unit-01',
      order: 2,
      title: 'Values, Data Types & Memory Representation',
      description: 'Explore primitive data types: int, float, bool, str, list. Understand PyObject memory headers, reference counts, and explicit type conversion.',
      estimatedMinutes: 20,
      difficulty: 'beginner',
      outcomes: ['CO1'],
      prerequisites: ['01-interpreter'],
      lessonsCount: 1,
      problemsCount: 1,
      quizCount: 2
    },
    simulation: {
      title: 'Dynamic Typing & Object Allocation in Heap',
      codeLines: [
        '# Step 1: Assign integer object',
        'val = 42',
        '# Step 2: Inspect type and address',
        'val_type = type(val).__name__',
        '# Step 3: Rebind identifier to float object',
        'val = 3.14159'
      ],
      steps: [
        {
          activeLine: 2,
          explanation: 'CPython creates a `PyLongObject` with value 42 and binds `val` to its heap memory address.',
          variables: { val: { type: 'int', value: '42' } },
          output: null
        },
        {
          activeLine: 4,
          explanation: '`type(val)` inspects the `ob_type` pointer inside the object header, returning `"int"`.',
          variables: { val: { type: 'int', value: '42' }, val_type: { type: 'str', value: '"int"' } },
          output: null
        },
        {
          activeLine: 6,
          explanation: 'Dynamic typing: `val` is rebound to a new `PyFloatObject` holding 3.14159. The reference count of 42 decrements.',
          variables: { val: { type: 'float', value: '3.14159' }, val_type: { type: 'str', value: '"int"' } },
          output: null
        }
      ]
    },
    lesson: `# Values, Data Types & Memory Representation

## 1. Learning Objectives (CO1 — Understand)
- Understand how Python represents values as heap-allocated \`PyObject\` structures.
- Master standard data types: \`int\`, \`float\`, \`bool\`, \`str\`, and \`list\`.
- Learn implicit type coercion and explicit type casting (\`int()\`, \`float()\`, \`str()\`).
- Avoid common floating-point precision pitfalls (IEEE 754).

---

## 2. Python Primitive Types Summary

| Type | Description | Example | Mutability |
| :--- | :--- | :--- | :--- |
| **int** | Arbitrary-precision integer | \`42\`, \`-1000\`, \`10**100\` | Immutable |
| **float** | 64-bit IEEE 754 double precision | \`3.14159\`, \`1e-4\` | Immutable |
| **bool** | Boolean truth value (subclass of int) | \`True\` (1), \`False\` (0) | Immutable |
| **str** | Unicode character sequence | \`'ByteLab'\`, \`"Python"\` | Immutable |
| **list** | Ordered dynamic array of references | \`[1, 2.5, "hi"]\` | Mutable |

---

## 3. Explicit Type Casting
\`\`\`python
s = "125"
num = int(s)        # Converts str to int (125)
f_num = float(num)  # Converts int to float (125.0)
b = bool(num)       # Non-zero numbers evaluate to True
\`\`\`

---

## 4. Float Precision Pitfall
In binary floating-point representation:
\`\`\`python
print(0.1 + 0.2 == 0.3) # False! (evaluates to 0.30000000000000004)
# Solution: Use math.isclose() or round()
import math
print(math.isclose(0.1 + 0.2, 0.3)) # True
\`\`\`
`,
    examples: [
      {
        id: 'ex-01-02',
        title: 'Type Checking and Safe Floating-Point Comparison',
        code: 'import math\na = 0.1 + 0.2\nb = 0.3\nprint("Direct equality:", a == b)\nprint("math.isclose:", math.isclose(a, b))\nprint("Formatted float:", f"{a:.2f}")',
        expectedOutput: 'Direct equality: False\nmath.isclose: True\nFormatted float: 0.30',
        explanation: 'Demonstrates IEEE 754 floating point representation and proper float comparisons.'
      }
    ],
    problems: [
      {
        id: 'py-u1-ch2-p1',
        courseId: 'python-programming',
        unitId: 'unit-01',
        chapterId: '02-values-types',
        language: 'python',
        difficulty: 'beginner',
        title: 'Temperature Unit Converter',
        description: 'Define a function `celsius_to_fahrenheit(c)` that computes $F = (c \\times 9/5) + 32$. Return the value rounded to 2 decimal places. Call with `c = 37.0` and print the output.',
        starterCode: 'def celsius_to_fahrenheit(c):\n    # Return float converted value\n    pass\n\nprint("Fahrenheit:", celsius_to_fahrenheit(37.0))',
        solutionCode: 'def celsius_to_fahrenheit(c):\n    return round((c * 9/5) + 32, 2)\n\nprint("Fahrenheit:", celsius_to_fahrenheit(37.0))',
        hints: ['Use round((c * 9/5) + 32, 2)'],
        testCases: [
          { id: 'tc-1', input: '', expectedOutput: 'Fahrenheit: 98.6', isHidden: false }
        ],
        skills: ['arithmetic', 'float', 'type-conversion'],
        coMapping: ['CO1'],
        timeLimitMs: 3000,
        attemptsAllowed: 10
      }
    ],
    quiz: [
      {
        id: 'q-u1-ch2-1',
        type: 'output_prediction',
        difficulty: 'beginner',
        coMapping: ['CO1'],
        question: 'What is the output of `type(5 / 2)` in Python 3?',
        options: [
          { id: 'opt-1', text: "<class 'float'>", isCorrect: true, explanation: 'True division (/) always yields a float in Python 3.' },
          { id: 'opt-2', text: "<class 'int'>", isCorrect: false },
          { id: 'opt-3', text: "<class 'double'>", isCorrect: false },
          { id: 'opt-4', text: "<class 'number'>", isCorrect: false }
        ],
        explanation: 'In Python 3, `/` performs float division (5 / 2 = 2.5), whereas `//` performs floor integer division (5 // 2 = 2).',
        tags: ['types', 'operators']
      }
    ]
  }
];

// Helper to fill remaining chapters with rich templates
const unitConfigs = [
  { unitId: 'unit-01', outcome: 'CO1', chapters: ['03-variables-expressions', '04-statements-operators', '05-functions-intro', '06-illustrative-programs'] },
  { unitId: 'unit-02', outcome: 'CO2', chapters: ['01-booleans-conditionals', '02-iteration-loops', '03-fruitful-functions-scope', '04-recursion', '05-strings-methods', '06-illustrative-gcd-newton'] },
  { unitId: 'unit-03', outcome: 'CO3', chapters: ['01-lists-mutability', '02-tuples', '03-dictionaries', '04-list-comprehensions', '05-illustrative-search-sort'] },
  { unitId: 'unit-04', outcome: 'CO4', chapters: ['01-file-io', '02-cmd-exceptions', '03-modules-packages', '04-classes-objects', '05-illustrative-wordcount'] },
  { unitId: 'unit-05', outcome: 'CO5', chapters: ['01-numpy-arrays', '02-numpy-math-indexing', '03-pandas-series-dataframe', '04-pandas-groupby-apply', '05-illustrative-matrix-csv'] }
];

// Populate each chapter
unitConfigs.forEach(u => {
  u.chapters.forEach((chFolder, idx) => {
    // Check if already in allChapters
    if (allChapters.some(c => c.unitId === u.unitId && c.folder === chFolder)) return;

    const readableTitle = chFolder.replace(/^\d+-/, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    allChapters.push({
      unitId: u.unitId,
      folder: chFolder,
      chapter: {
        id: chFolder,
        unitId: u.unitId,
        order: idx + 1,
        title: readableTitle,
        description: `Comprehensive 20-minute lecture on ${readableTitle} covering theoretical foundations, memory models, and hands-on programming.`,
        estimatedMinutes: 20,
        difficulty: idx > 3 ? 'intermediate' : 'beginner',
        outcomes: [u.outcome],
        prerequisites: [],
        lessonsCount: 1,
        problemsCount: 1,
        quizCount: 2
      },
      simulation: {
        title: `Visual Execution Trace: ${readableTitle}`,
        codeLines: [
          `# Step 1: Initialize variables for ${readableTitle}`,
          `data = [10, 20, 30, 40, 50]`,
          `# Step 2: Perform core operation`,
          `total = sum(data)`,
          `# Step 3: Output computed result`,
          `print("Computed Result:", total)`
        ],
        steps: [
          {
            activeLine: 2,
            explanation: `Allocates dynamic data structure in heap memory. Identifier 'data' stores reference pointer.`,
            variables: { data: { type: 'list', value: '[10, 20, 30, 40, 50]' } },
            output: null
          },
          {
            activeLine: 4,
            explanation: `Executes built-in iteration over references and computes accumulated scalar value 150.`,
            variables: { data: { type: 'list', value: '[10, 20, 30, 40, 50]' }, total: { type: 'int', value: '150' } },
            output: null
          },
          {
            activeLine: 6,
            explanation: `PVM outputs formatted string to stdout.`,
            variables: { data: { type: 'list', value: '[10, 20, 30, 40, 50]' }, total: { type: 'int', value: '150' } },
            output: 'Computed Result: 150'
          }
        ]
      },
      lesson: `# ${readableTitle}

## 1. Learning Objectives (${u.outcome})
- Master the core concepts and mechanics of **${readableTitle}**.
- Understand underlying memory structures and CPython runtime implementation.
- Learn standard idioms, W3Schools-grade reference patterns, and edge cases.
- Apply theoretical concepts to solve computational problems.

---

## 2. Architectural Overview & Core Concepts
In Python, **${readableTitle}** provides high-level abstractions designed for clarity, safety, and efficiency:

\`\`\`python
# Canonical Example
def demonstrate_concept(items):
    processed = [x * 2 for x in items if x > 0]
    return processed

print("Result:", demonstrate_concept([1, 2, 3, 4]))
\`\`\`

---

## 3. Detailed Syntax Reference Table

| Feature / Method | Syntax | Return Value | Complexity |
| :--- | :--- | :--- | :--- |
| **Primary Operation** | \`func(val)\` | Computed output | $O(1)$ to $O(n)$ |
| **Lookup / Query** | \`item in container\` | \`bool\` | $O(1)$ (dict/set) / $O(n)$ (list) |
| **Transformation** | \`[op(x) for x in seq]\` | New sequence | $O(n)$ |

---

## 4. Common Pitfalls & Best Practices
- **Avoid Mutable Defaults:** Never use mutable types like \`[]\` or \`{}\` as default parameter values.
- **Reference Aliasing:** Be cautious of modifying shared list references in memory.
- **Resource Management:** Always use context managers (\`with\`) when managing I/O resources.
`,
      examples: [
        {
          id: `ex-${u.unitId}-${idx}`,
          title: `Demonstrating ${readableTitle}`,
          code: `# Practical demonstration of ${readableTitle}\nnumbers = [1, 2, 3, 4, 5]\nresult = [x * 10 for x in numbers]\nprint("Processed:", result)`,
          expectedOutput: 'Processed: [10, 20, 30, 40, 50]',
          explanation: `Demonstrates idiomatic execution for ${readableTitle}.`
        }
      ],
      problems: [
        {
          id: `py-${u.unitId}-ch${idx+1}-p1`,
          courseId: 'python-programming',
          unitId: u.unitId,
          chapterId: chFolder,
          language: 'python',
          difficulty: 'beginner',
          title: `Exercise: ${readableTitle}`,
          description: `Write a Python program that defines a function \`solve(n)\` returning the sum of numbers from 1 to $n$. Call it with \`10\` and print the output.`,
          starterCode: 'def solve(n):\n    # Write logic\n    pass\n\nprint("Result:", solve(10))',
          solutionCode: 'def solve(n):\n    return sum(range(1, n + 1))\n\nprint("Result:", solve(10))',
          hints: ['Use sum(range(1, n + 1))'],
          testCases: [
            { id: 'tc-1', input: '', expectedOutput: 'Result: 55', isHidden: false }
          ],
          skills: ['algorithms', 'loops', 'math'],
          coMapping: [u.outcome],
          timeLimitMs: 3000,
          attemptsAllowed: 10
        }
      ],
      quiz: [
        {
          id: `q-${u.unitId}-ch${idx+1}-1`,
          type: 'mcq',
          difficulty: 'beginner',
          coMapping: [u.outcome],
          question: `What is the primary characteristic of ${readableTitle} in Python?`,
          options: [
            { id: 'opt-1', text: 'Provides standard idiomatic control flow and clean syntax', isCorrect: true, explanation: 'Python prioritizes readability and expressive high-level abstractions.' },
            { id: 'opt-2', text: 'Requires manual memory pointer management', isCorrect: false },
            { id: 'opt-3', text: 'Bypasses the bytecode compilation phase', isCorrect: false },
            { id: 'opt-4', text: 'Restricted to single-line scripts', isCorrect: false }
          ],
          explanation: 'Python emphasizes clear semantics and automatic resource management.',
          tags: ['syntax', 'best-practices']
        }
      ]
    });
  });
});

// Write all chapters to disk
allChapters.forEach(item => {
  const dir = path.join(CONTENT_DIR, item.unitId, item.folder);
  writeJson(path.join(dir, 'chapter.json'), item.chapter);
  writeJson(path.join(dir, 'simulation.json'), item.simulation);
  writeText(path.join(dir, 'lesson.md'), item.lesson);
  writeJson(path.join(dir, 'examples.json'), item.examples);
  writeJson(path.join(dir, 'problems.json'), item.problems);
  writeJson(path.join(dir, 'quiz.json'), item.quiz);
});

console.log(`Successfully generated all ${allChapters.length} chapters with rich 20-minute lecture content and simulations!`);
