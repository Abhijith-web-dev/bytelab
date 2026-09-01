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

console.log('Building 20-minute deep lecture modules with interactive simulations for 19AI301/CS3301...');

// Load base course structure
const courseJson = {
  id: "python-programming",
  code: "19AI301 / CS3301",
  title: "Python Programming",
  programme: "B.Tech Artificial Intelligence and Data Science",
  ltpc: "2-0-2-3",
  totalPeriods: 60,
  unitsCount: 5,
  chaptersCount: 27,
  language: "python",
  runtimeVersion: "Python 3.11 (Pyodide WebAssembly)",
  description: "Comprehensive university curriculum covering computational thinking, control flow, functions, dynamic data structures, files & modules, and vectorized numerical computing with NumPy and Pandas.",
  outcomes: [
    { code: "CO1", statement: "Read and write simple Python programs with foundational data types and expressions", bloomLevel: "Understand" },
    { code: "CO2", statement: "Develop Python programs with conditionals, loops, and recursive functions", bloomLevel: "Create" },
    { code: "CO3", statement: "Use Python data structures — lists, tuples, and dictionaries — for data manipulation", bloomLevel: "Apply" },
    { code: "CO4", statement: "Use files, exception handling, modules, packages, and classes for robust software design", bloomLevel: "Apply" },
    { code: "CO5", statement: "Use NumPy and Pandas DataFrames for numerical computation and data analytics", bloomLevel: "Apply" }
  ],
  units: [
    {
      id: "unit-01",
      unitNumber: 1,
      romanNumber: "Unit I",
      title: "Data Types, Expressions, Statements",
      description: "Python interpreter, values, types (int, float, boolean, string, list), variables, expressions, statements, precedence, functions, and illustrative programs.",
      periods: 12,
      outcomes: ["CO1"],
      chapters: [
        "01-interpreter",
        "02-values-types",
        "03-variables-expressions",
        "04-statements-operators",
        "05-functions-intro",
        "06-illustrative-programs"
      ]
    },
    {
      id: "unit-02",
      unitNumber: 2,
      romanNumber: "Unit II",
      title: "Control Flow, Functions",
      description: "Conditionals, iterative statements (while, for, break, continue), fruitful functions, variable scope, recursion, strings, and numerical algorithms.",
      periods: 12,
      outcomes: ["CO2"],
      chapters: [
        "01-booleans-conditionals",
        "02-iteration-loops",
        "03-fruitful-functions-scope",
        "04-recursion",
        "05-strings-methods",
        "06-illustrative-gcd-newton"
      ]
    },
    {
      id: "unit-03",
      unitNumber: 3,
      romanNumber: "Unit III",
      title: "List, Tuples, Dictionaries",
      description: "Lists (mutability, cloning, slicing), list methods, list comprehensions, tuples (assignment, immutability), dictionaries (hash tables, operations), search and sorting algorithms.",
      periods: 12,
      outcomes: ["CO3"],
      chapters: [
        "01-lists-mutability",
        "02-tuples",
        "03-dictionaries",
        "04-list-comprehensions",
        "05-illustrative-search-sort"
      ]
    },
    {
      id: "unit-04",
      unitNumber: 4,
      romanNumber: "Unit IV",
      title: "Files, Modules, Packages",
      description: "File I/O (reading, writing, modes), command-line arguments, exception handling hierarchy, modules, package creation, classes and object-oriented design, word count programs.",
      periods: 12,
      outcomes: ["CO4"],
      chapters: [
        "01-file-io",
        "02-cmd-exceptions",
        "03-modules-packages",
        "04-classes-objects",
        "05-illustrative-wordcount"
      ]
    },
    {
      id: "unit-05",
      unitNumber: 5,
      romanNumber: "Unit V",
      title: "NumPy and Pandas for Data Science",
      description: "NumPy arrays (creation, shapes, indexing, math), matrix multiplication and inversion, Pandas Series and DataFrames, groupby, apply, and CSV data exploration.",
      periods: 12,
      outcomes: ["CO5"],
      chapters: [
        "01-numpy-arrays",
        "02-numpy-math-indexing",
        "03-pandas-series-dataframe",
        "04-pandas-groupby-apply",
        "05-illustrative-matrix-csv"
      ]
    }
  ]
};

writeJson(path.join(CONTENT_DIR, 'course.json'), courseJson);

// Define chapters with rich 20-min deep notes, simulations, and problems
const chaptersData = [
  // ---------------- UNIT 1 ----------------
  {
    unitId: 'unit-01',
    folder: '01-interpreter',
    chapter: {
      id: '01-interpreter',
      unitId: 'unit-01',
      order: 1,
      title: 'Python Interpreter & CPython Architecture',
      description: 'CPython execution lifecycle: Lexing, Parsing, AST, Bytecode compilation, and Python Virtual Machine (PVM). Interactive vs Script mode.',
      estimatedMinutes: 20,
      difficulty: 'beginner',
      outcomes: ['CO1'],
      prerequisites: [],
      lessonsCount: 1,
      problemsCount: 1,
      quizCount: 2
    },
    simulation: {
      title: 'Bytecode Execution & PVM Evaluation Loop',
      codeLines: [
        '# Step 1: Assign message string',
        'message = "Hello, ByteLab!"',
        '# Step 2: Call built-in print function',
        'print(message)',
        '# Step 3: Compute simple expression',
        'result = 10 * 5'
      ],
      steps: [
        {
          activeLine: 2,
          explanation: 'CPython allocates a `PyUnicodeObject` in the heap containing "Hello, ByteLab!" and binds identifier `message` in the local namespace table.',
          variables: {
            message: { type: 'str', value: '"Hello, ByteLab!"' }
          },
          output: null
        },
        {
          activeLine: 4,
          explanation: 'PVM executes `CALL_FUNCTION`. The stdout stream receives the string content, followed by a newline byte (`\\n`).',
          variables: {
            message: { type: 'str', value: '"Hello, ByteLab!"' }
          },
          output: 'Hello, ByteLab!'
        },
        {
          activeLine: 6,
          explanation: 'Binary multiplication `10 * 5` is evaluated by `BINARY_MULTIPLY`. Integer object 50 is assigned to `result`.',
          variables: {
            message: { type: 'str', value: '"Hello, ByteLab!"' },
            result: { type: 'int', value: '50' }
          },
          output: 'Hello, ByteLab!'
        }
      ]
    },
    lesson: `# Python Interpreter & CPython Execution Architecture

## 1. Learning Objectives (CO1 — Understand)
- Understand the complete CPython compilation and execution pipeline.
- Distinguish between **Interactive Mode (REPL)** and **Script Mode**.
- Inspect Python bytecode using the built-in \`dis\` module.
- Understand how memory is managed via \`PyObject\` structures and the GIL.

---

## 2. The CPython Compilation Pipeline

Python is often described as an interpreted language, but in standard **CPython**, source code undergoes a multi-stage compilation before execution:

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

1. **Tokenizer (Lexer):** Scans raw text and converts characters into Python tokens (identifiers, keywords, operators, indentation tokens).
2. **Parser:** Builds a hierarchical Abstract Syntax Tree (AST) verifying syntactic grammar.
3. **Bytecode Compiler:** Generates stack-based bytecode instructions stored in memory or cached in \`__pycache__/*.pyc\`.
4. **PVM (Python Virtual Machine):** A stack-based virtual machine written in C that sequentially executes bytecode instructions.

---

## 3. Interactive Mode vs Script Mode

| Feature | Interactive Mode (REPL) | Script Mode |
| :--- | :--- | :--- |
| **Invocation** | \`python\` | \`python script.py\` |
| **Execution** | Read-Eval-Print Loop line by line | Compiles and runs complete file |
| **Output** | Automatically displays expression results | Explicit \`print()\` required |
| **Best Use** | Experimentation, testing single APIs | Production applications, modules |

---

## 4. Bytecode Disassembly in Practice

You can inspect the exact bytecode instructions generated by Python using the \`dis\` standard library module:

\`\`\`python
import dis

def compute(x):
    return x * 2 + 5

# Disassemble bytecode instructions
dis.dis(compute)
\`\`\`

**Output Breakdown:**
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
- Python code is compiled to bytecode before execution on the PVM.
- Python handles memory dynamically with reference counting and a generational cyclic garbage collector.
- Interactive mode provides immediate feedback, while script mode preserves code in permanent source files.
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
  }
];

// Write out all generated chapters
chaptersData.forEach(item => {
  const dir = path.join(CONTENT_DIR, item.unitId, item.folder);
  writeJson(path.join(dir, 'chapter.json'), item.chapter);
  writeJson(path.join(dir, 'simulation.json'), item.simulation);
  writeText(path.join(dir, 'lesson.md'), item.lesson);
  writeJson(path.join(dir, 'examples.json'), item.examples);
  writeJson(path.join(dir, 'problems.json'), item.problems);
  writeJson(path.join(dir, 'quiz.json'), item.quiz);
});

console.log('Successfully written rich lecture and simulation files!');
