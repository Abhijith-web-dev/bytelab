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

console.log('Building full 5-Unit curriculum for 19AI301 / CS3301 Python Programming...');

// -------------------------------------------------------------
// UNIT 1: Data Types, Expressions, Statements (CO1)
// -------------------------------------------------------------
writeJson(path.join(CONTENT_DIR, 'unit-01', 'unit.json'), {
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
});

const unit1Chapters = [
  {
    folder: '01-interpreter',
    chapter: {
      id: '01-interpreter',
      unitId: 'unit-01',
      order: 1,
      title: 'Python Interpreter & Execution Modes',
      description: 'Understand how the Python interpreter works, including Interactive Mode (REPL) and Script Mode.',
      estimatedMinutes: 25,
      difficulty: 'beginner',
      outcomes: ['CO1'],
      prerequisites: [],
      lessonsCount: 1,
      problemsCount: 1,
      quizCount: 2
    },
    lesson: `# Python Interpreter & Execution Modes

## 1. Learning Objective
Understand how the Python interpreter translates human-readable source code into bytecode and executes it via the Python Virtual Machine (PVM). Learn the distinction between Interactive Mode and Script Mode.

## 2. Interactive Mode vs Script Mode
- **Interactive Mode (REPL):** Evaluates statements line by line, ideal for rapid prototyping and debugging.
- **Script Mode:** Executes code stored in a \`.py\` file from beginning to end.

\`\`\`python
print("Hello, ByteLab LMS!")
\`\`\`
`,
    examples: [
      {
        id: 'ex-01-01',
        title: 'Running a Simple Python Script',
        code: 'message = "Welcome to 19AI301 Python Programming!"\nprint(message)',
        expectedOutput: 'Welcome to 19AI301 Python Programming!',
        explanation: 'Variables store references to string objects in memory, which are output using print().'
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
        title: 'Print Greeting from Interpreter',
        description: 'Write a Python program that assigns `"Python 3.11"` to a variable named `runtime` and prints `"ByteLab Running on: Python 3.11"`.',
        starterCode: '# Assign and print\nruntime = "Python 3.11"\n',
        solutionCode: 'runtime = "Python 3.11"\nprint("ByteLab Running on:", runtime)',
        hints: ['Use the print() function with two comma-separated arguments'],
        testCases: [
          { id: 'tc-1', input: '', expectedOutput: 'ByteLab Running on: Python 3.11', isHidden: false }
        ],
        skills: ['print', 'variables', 'interpreter'],
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
        question: 'Which component translates Python bytecode into machine instructions during execution?',
        options: [
          { id: 'opt-1', text: 'Python Virtual Machine (PVM)', isCorrect: true, explanation: 'The PVM reads bytecode and executes machine instructions.' },
          { id: 'opt-2', text: 'Linker', isCorrect: false },
          { id: 'opt-3', text: 'Assembler', isCorrect: false },
          { id: 'opt-4', text: 'Preprocessor', isCorrect: false }
        ],
        explanation: 'Python source (.py) is compiled to bytecode (.pyc) and executed by the PVM.',
        tags: ['interpreter', 'architecture']
      }
    ]
  },
  {
    folder: '02-values-types',
    chapter: {
      id: '02-values-types',
      unitId: 'unit-01',
      order: 2,
      title: 'Values, Types & Type Conversions',
      description: 'Explore primitive data types: int, float, boolean, string, and type casting functions.',
      estimatedMinutes: 30,
      difficulty: 'beginner',
      outcomes: ['CO1'],
      prerequisites: ['01-interpreter'],
      lessonsCount: 1,
      problemsCount: 1,
      quizCount: 2
    },
    lesson: `# Values, Types & Type Conversions

## 1. Core Data Types in Python
- \`int\`: Arbitrary precision integers (\`42\`, \`-7\`)
- \`float\`: Double-precision floating point numbers (\`3.14159\`)
- \`bool\`: Boolean values (\`True\`, \`False\`)
- \`str\`: Immutable sequence of Unicode characters (\`'hello'\`)

\`\`\`python
a = 10
b = 3.5
c = True
print(type(a), type(b), type(c))
\`\`\`
`,
    examples: [
      {
        id: 'ex-01-02',
        title: 'Explicit Type Casting',
        code: 'val_str = "150"\nval_int = int(val_str)\nprint(val_int + 50)',
        expectedOutput: '200',
        explanation: 'int() converts a numeric string to an integer.'
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
        title: 'Calculate Temperature in Fahrenheit',
        description: 'Given temperature in Celsius $C = 25.0$, compute Fahrenheit $F = (C \\times 9/5) + 32$. Print `"Fahrenheit: 77.0"`.',
        starterCode: 'celsius = 25.0\n# Calculate fahrenheit and print\n',
        solutionCode: 'celsius = 25.0\nfahrenheit = (celsius * 9/5) + 32\nprint("Fahrenheit:", fahrenheit)',
        hints: ['Use the standard formula (C * 9/5) + 32'],
        testCases: [
          { id: 'tc-1', input: '', expectedOutput: 'Fahrenheit: 77.0', isHidden: false }
        ],
        skills: ['arithmetic', 'float', 'expressions'],
        coMapping: ['CO1'],
        timeLimitMs: 3000,
        attemptsAllowed: 10
      }
    ],
    quiz: [
      {
        id: 'q-u1-ch2-1',
        type: 'mcq',
        difficulty: 'beginner',
        coMapping: ['CO1'],
        question: 'What is the return type of `type(3 / 1)` in Python 3?',
        options: [
          { id: 'opt-1', text: "<class 'float'>", isCorrect: true, explanation: 'The true division operator / always returns a float in Python 3.' },
          { id: 'opt-2', text: "<class 'int'>", isCorrect: false },
          { id: 'opt-3', text: "<class 'number'>", isCorrect: false },
          { id: 'opt-4', text: "<class 'double'>", isCorrect: false }
        ],
        explanation: 'Division `/` yields a float (`3.0`), whereas integer division `//` yields an int (`3`).',
        tags: ['types', 'operators']
      }
    ]
  },
  {
    folder: '03-variables-expressions',
    chapter: {
      id: '03-variables-expressions',
      unitId: 'unit-01',
      order: 3,
      title: 'Variables, Expressions & Keywords',
      description: 'Rules for variable identifiers, memory references, dynamic typing, and reserved keywords.',
      estimatedMinutes: 30,
      difficulty: 'beginner',
      outcomes: ['CO1'],
      prerequisites: ['02-values-types'],
      lessonsCount: 1,
      problemsCount: 1,
      quizCount: 2
    },
    lesson: `# Variables, Expressions & Keywords

## 1. Variable Assignment and Dynamic Typing
In Python, variables are names that refer to objects in heap memory. Types are bound to objects, not variable names.

\`\`\`python
x = 10
x = "Now a string" # Valid dynamic typing
\`\`\`
`,
    examples: [
      {
        id: 'ex-01-03',
        title: 'Multiple Assignment',
        code: 'x, y, z = 10, 20, 30\nprint(x + y + z)',
        expectedOutput: '60',
        explanation: 'Tuple unpacking allows simultaneous assignment to multiple variables.'
      }
    ],
    problems: [
      {
        id: 'py-u1-ch3-p1',
        courseId: 'python-programming',
        unitId: 'unit-01',
        chapterId: '03-variables-expressions',
        language: 'python',
        difficulty: 'beginner',
        title: 'Compute Simple Interest',
        description: 'Given Principal $P = 10000$, Rate $R = 5.0\\%$, Time $T = 2$ years, compute Simple Interest $SI = \\frac{P \\times R \\times T}{100}$. Print `"Simple Interest: 1000.0"`.',
        starterCode: 'P = 10000\nR = 5.0\nT = 2\n# Calculate SI and print\n',
        solutionCode: 'P = 10000\nR = 5.0\nT = 2\nSI = (P * R * T) / 100\nprint("Simple Interest:", SI)',
        hints: ['Use SI = (P * R * T) / 100'],
        testCases: [
          { id: 'tc-1', input: '', expectedOutput: 'Simple Interest: 1000.0', isHidden: false }
        ],
        skills: ['variables', 'arithmetic'],
        coMapping: ['CO1'],
        timeLimitMs: 3000,
        attemptsAllowed: 10
      }
    ],
    quiz: [
      {
        id: 'q-u1-ch3-1',
        type: 'mcq',
        difficulty: 'beginner',
        coMapping: ['CO1'],
        question: 'Which of the following is an invalid variable identifier in Python?',
        options: [
          { id: 'opt-1', text: '2nd_score', isCorrect: true, explanation: 'Variable names cannot start with a digit.' },
          { id: 'opt-2', text: '_score_2', isCorrect: false },
          { id: 'opt-3', text: 'score2', isCorrect: false },
          { id: 'opt-4', text: 'Score_TWO', isCorrect: false }
        ],
        explanation: 'Identifiers must begin with an alphabetic character or underscore.',
        tags: ['identifiers', 'syntax']
      }
    ]
  },
  {
    folder: '04-statements-operators',
    chapter: {
      id: '04-statements-operators',
      unitId: 'unit-01',
      order: 4,
      title: 'Operators & Precedence (PEMDAS)',
      description: 'Arithmetic (+, -, *, /, //, %, **), bitwise, membership (in, not in), and operator precedence.',
      estimatedMinutes: 30,
      difficulty: 'beginner',
      outcomes: ['CO1'],
      prerequisites: ['03-variables-expressions'],
      lessonsCount: 1,
      problemsCount: 1,
      quizCount: 2
    },
    lesson: `# Operators & Operator Precedence (PEMDAS)

## 1. Operator Hierarchy
1. Parentheses: \`()\`
2. Exponentiation: \`**\` (Right-to-Left associativity)
3. Unary signs: \`+x\`, \`-x\`
4. Multiplication, Division, Modulus, Floor Div: \`*\`, \`/\`, \`%\`, \`//\`
5. Addition, Subtraction: \`+\`, \`-\`

\`\`\`python
result = 2 + 3 * 4 ** 2
print(result) # 2 + 3 * 16 = 50
\`\`\`
`,
    examples: [
      {
        id: 'ex-01-04',
        title: 'Floor Division & Modulo',
        code: 'total_minutes = 135\nhours = total_minutes // 60\nmins = total_minutes % 60\nprint(f"{hours} hours and {mins} minutes")',
        expectedOutput: '2 hours and 15 minutes',
        explanation: '// computes whole quotients and % computes remainder.'
      }
    ],
    problems: [
      {
        id: 'py-u1-ch4-p1',
        courseId: 'python-programming',
        unitId: 'unit-01',
        chapterId: '04-statements-operators',
        language: 'python',
        difficulty: 'beginner',
        title: 'Evaluate Expression with Precedence',
        description: 'Write a Python program that computes $val = (12 - 4) \\times 3 + 2^4 // 4$. Print `"Result: 28"`.',
        starterCode: '# Compute and print expression\n',
        solutionCode: 'val = (12 - 4) * 3 + (2 ** 4) // 4\nprint("Result:", val)',
        hints: ['Use (12 - 4) * 3 + (2 ** 4) // 4'],
        testCases: [
          { id: 'tc-1', input: '', expectedOutput: 'Result: 28', isHidden: false }
        ],
        skills: ['operators', 'precedence'],
        coMapping: ['CO1'],
        timeLimitMs: 3000,
        attemptsAllowed: 10
      }
    ],
    quiz: [
      {
        id: 'q-u1-ch4-1',
        type: 'mcq',
        difficulty: 'beginner',
        coMapping: ['CO1'],
        question: 'What is the output of `2 ** 3 ** 2` in Python?',
        options: [
          { id: 'opt-1', text: '512', isCorrect: true, explanation: 'Exponentiation is right-associative: 2 ** (3 ** 2) = 2 ** 9 = 512.' },
          { id: 'opt-2', text: '64', isCorrect: false },
          { id: 'opt-3', text: '36', isCorrect: false },
          { id: 'opt-4', text: '128', isCorrect: false }
        ],
        explanation: 'Right-to-left evaluation: `3 ** 2 = 9`, then `2 ** 9 = 512`.',
        tags: ['operators', 'precedence']
      }
    ]
  },
  {
    folder: '05-functions-intro',
    chapter: {
      id: '05-functions-intro',
      unitId: 'unit-01',
      order: 5,
      title: 'Functions: Definition, Arguments & Returns',
      description: 'Define reusable functions using def, positional and default parameters, and the return statement.',
      estimatedMinutes: 35,
      difficulty: 'beginner',
      outcomes: ['CO1'],
      prerequisites: ['04-statements-operators'],
      lessonsCount: 1,
      problemsCount: 1,
      quizCount: 2
    },
    lesson: `# Functions: Definition, Arguments & Returns

## 1. Defining Functions
A function is a named block of code defined using the \`def\` keyword:

\`\`\`python
def calculate_area(length, width):
    return length * width

print(calculate_area(5, 8)) # 40
\`\`\`
`,
    examples: [
      {
        id: 'ex-01-05',
        title: 'Default Argument Values',
        code: 'def greet(name, title="Student"):\n    return f"Hello, {title} {name}!"\nprint(greet("Ananya"))',
        expectedOutput: 'Hello, Student Ananya!',
        explanation: 'Default arguments are used when no value is provided during invocation.'
      }
    ],
    problems: [
      {
        id: 'py-u1-ch5-p1',
        courseId: 'python-programming',
        unitId: 'unit-01',
        chapterId: '05-functions-intro',
        language: 'python',
        difficulty: 'beginner',
        title: 'Create a Circle Area Function',
        description: 'Define a function `circle_area(radius)` that computes $\\pi r^2$ using $\\pi = 3.14159$. Call it with radius `10` and print `"Area: 314.159"`.',
        starterCode: 'def circle_area(radius):\n    # Write logic\n    pass\n\nprint("Area:", circle_area(10))\n',
        solutionCode: 'def circle_area(radius):\n    PI = 3.14159\n    return PI * (radius ** 2)\n\nprint("Area:", circle_area(10))',
        hints: ['Return 3.14159 * (radius ** 2)'],
        testCases: [
          { id: 'tc-1', input: '', expectedOutput: 'Area: 314.159', isHidden: false }
        ],
        skills: ['functions', 'def', 'return'],
        coMapping: ['CO1'],
        timeLimitMs: 3000,
        attemptsAllowed: 10
      }
    ],
    quiz: [
      {
        id: 'q-u1-ch5-1',
        type: 'mcq',
        difficulty: 'beginner',
        coMapping: ['CO1'],
        question: 'What is returned by a Python function that does not contain an explicit `return` statement?',
        options: [
          { id: 'opt-1', text: 'None', isCorrect: true, explanation: 'Functions in Python implicitly return None if no return value is specified.' },
          { id: 'opt-2', text: '0', isCorrect: false },
          { id: 'opt-3', text: 'False', isCorrect: false },
          { id: 'opt-4', text: 'void', isCorrect: false }
        ],
        explanation: 'Python void functions return NoneType object `None`.',
        tags: ['functions', 'return']
      }
    ]
  },
  {
    folder: '06-illustrative-programs',
    chapter: {
      id: '06-illustrative-programs',
      unitId: 'unit-01',
      order: 6,
      title: 'Illustrative Programs: Swap, Circulate & Distance',
      description: 'Prescribed syllabus illustrative programs: Swapping variables, circulating values of n variables, and Euclidean distance.',
      estimatedMinutes: 40,
      difficulty: 'intermediate',
      outcomes: ['CO1'],
      prerequisites: ['05-functions-intro'],
      lessonsCount: 1,
      problemsCount: 2,
      quizCount: 2
    },
    lesson: `# Illustrative Programs: Unit I

## 1. Swap Two Variables
\`\`\`python
a, b = 10, 20
a, b = b, a # Pythonic tuple swap
print(a, b) # 20 10
\`\`\`

## 2. Circulate Values of $n$ Variables
Circulating elements of a list by shifting by $k$ positions:
\`\`\`python
def circulate(lst, k):
    return lst[k:] + lst[:k]

print(circulate([10, 20, 30, 40, 50], 2)) # [30, 40, 50, 10, 20]
\`\`\`

## 3. Distance Between Two Points
Given $(x_1, y_1)$ and $(x_2, y_2)$:
$$d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$
`,
    examples: [
      {
        id: 'ex-01-06',
        title: 'Euclidean Distance Calculation',
        code: 'import math\nx1, y1 = 0, 0\nx2, y2 = 3, 4\ndist = math.sqrt((x2 - x1)**2 + (y2 - y1)**2)\nprint("Distance:", dist)',
        expectedOutput: 'Distance: 5.0',
        explanation: 'Applies Euclidean distance formula.'
      }
    ],
    problems: [
      {
        id: 'py-u1-ch6-p1',
        courseId: 'python-programming',
        unitId: 'unit-01',
        chapterId: '06-illustrative-programs',
        language: 'python',
        difficulty: 'intermediate',
        title: 'Circulate List Elements',
        description: 'Define a function `circulate_n(lst, n)` that circulates the elements of `lst` by shifting left by `n` positions. Call it with `[1, 2, 3, 4, 5]` and `n = 2`. Print the resulting list.',
        starterCode: 'def circulate_n(lst, n):\n    # Write logic\n    pass\n\nprint(circulate_n([1, 2, 3, 4, 5], 2))\n',
        solutionCode: 'def circulate_n(lst, n):\n    n = n % len(lst)\n    return lst[n:] + lst[:n]\n\nprint(circulate_n([1, 2, 3, 4, 5], 2))',
        hints: ['Use slicing: lst[n:] + lst[:n]'],
        testCases: [
          { id: 'tc-1', input: '', expectedOutput: '[3, 4, 5, 1, 2]', isHidden: false }
        ],
        skills: ['slicing', 'circulate', 'algorithms'],
        coMapping: ['CO1'],
        timeLimitMs: 3000,
        attemptsAllowed: 10
      }
    ],
    quiz: [
      {
        id: 'q-u1-ch6-1',
        type: 'mcq',
        difficulty: 'intermediate',
        coMapping: ['CO1'],
        question: 'What is the Pythonic way to swap variables `a` and `b` without using a temporary variable?',
        options: [
          { id: 'opt-1', text: 'a, b = b, a', isCorrect: true, explanation: 'Tuple packing and unpacking swaps values simultaneously in memory.' },
          { id: 'opt-2', text: 'swap(a, b)', isCorrect: false },
          { id: 'opt-3', text: 'a = b; b = a', isCorrect: false },
          { id: 'opt-4', text: 'a <-> b', isCorrect: false }
        ],
        explanation: '`a, b = b, a` evaluates the right side into a tuple `(b, a)` before unpacking.',
        tags: ['swap', 'idioms']
      }
    ]
  }
];

unit1Chapters.forEach(item => {
  const dir = path.join(CONTENT_DIR, 'unit-01', item.folder);
  writeJson(path.join(dir, 'chapter.json'), item.chapter);
  writeText(path.join(dir, 'lesson.md'), item.lesson);
  writeJson(path.join(dir, 'examples.json'), item.examples);
  writeJson(path.join(dir, 'problems.json'), item.problems);
  writeJson(path.join(dir, 'quiz.json'), item.quiz);
});

// -------------------------------------------------------------
// UNIT 2: Control Flow, Functions (CO2)
// -------------------------------------------------------------
writeJson(path.join(CONTENT_DIR, 'unit-02', 'unit.json'), {
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
});

const unit2Chapters = [
  {
    folder: '01-booleans-conditionals',
    chapter: {
      id: '01-booleans-conditionals',
      unitId: 'unit-02',
      order: 1,
      title: 'Boolean Values & Conditional Statements',
      description: 'Master Boolean logic (and, or, not) and branching structures: if, if-else, and chained if-elif-else.',
      estimatedMinutes: 30,
      difficulty: 'beginner',
      outcomes: ['CO2'],
      prerequisites: ['04-statements-operators'],
      lessonsCount: 1,
      problemsCount: 2,
      quizCount: 3
    },
    lesson: `# Boolean Values & Conditional Statements

## 1. Learning Objective
Learn how to write decision-making programs using Boolean logic (\`True\`, \`False\`), relational operators (\`==\`, \`!=\`, \`<\`, \`>\`, \`<=\`, \`>=\`), logical operators (\`and\`, \`or\`, \`not\`), and branching constructs (\`if\`, \`if-else\`, \`if-elif-else\`).

## 2. Boolean Logic
Python has three logical operators:
- \`and\`: True if **both** operands are true.
- \`or\`: True if **at least one** operand is true.
- \`not\`: Reverses the truth value.

## 3. Conditional Branching
\`\`\`python
score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"

print("Grade:", grade)
\`\`\`
`,
    examples: [
      {
        id: 'ex-02-01',
        title: 'Check Even or Odd',
        code: 'num = 28\nif num % 2 == 0:\n    print(num, "is Even")\nelse:\n    print(num, "is Odd")',
        expectedOutput: '28 is Even',
        explanation: 'The modulus operator (%) checks for divisibility by 2.'
      }
    ],
    problems: [
      {
        id: 'py-u2-ch1-p1',
        courseId: 'python-programming',
        unitId: 'unit-02',
        chapterId: '01-booleans-conditionals',
        language: 'python',
        difficulty: 'beginner',
        title: 'Determine Largest of Three Numbers',
        description: 'Define a function `find_max(a, b, c)` that returns the largest of three given numbers using conditional statements. Call it with (15, 42, 29) and print the output.',
        starterCode: 'def find_max(a, b, c):\n    # Write conditional logic\n    pass\n\nprint(find_max(15, 42, 29))',
        solutionCode: 'def find_max(a, b, c):\n    if a >= b and a >= c:\n        return a\n    elif b >= a and b >= c:\n        return b\n    else:\n        return c\n\nprint(find_max(15, 42, 29))',
        hints: ['Compare a with b and c using and', 'Use elif for b, and else for c'],
        testCases: [
          { id: 'tc-1', input: '', expectedOutput: '42', isHidden: false }
        ],
        skills: ['conditionals', 'if-elif-else', 'comparison'],
        coMapping: ['CO2'],
        timeLimitMs: 4000,
        attemptsAllowed: 10
      }
    ],
    quiz: [
      {
        id: 'q-u2-ch1-1',
        type: 'output_prediction',
        difficulty: 'beginner',
        coMapping: ['CO2'],
        question: 'What is the output of `print(not (5 > 2 and 3 < 1))`?',
        options: [
          { id: 'opt-1', text: 'True', isCorrect: true, explanation: '(5 > 2 and 3 < 1) evaluates to (True and False) -> False. not False is True.' },
          { id: 'opt-2', text: 'False', isCorrect: false },
          { id: 'opt-3', text: 'None', isCorrect: false },
          { id: 'opt-4', text: 'SyntaxError', isCorrect: false }
        ],
        explanation: 'The expression inside parentheses is False, so `not` turns it into True.',
        tags: ['boolean', 'logic']
      }
    ]
  },
  {
    folder: '02-iteration-loops',
    chapter: {
      id: '02-iteration-loops',
      unitId: 'unit-02',
      order: 2,
      title: 'Iteration: While & For Loops',
      description: 'Definite and indefinite loops, loop state, range() generator, break, continue, and pass statements.',
      estimatedMinutes: 35,
      difficulty: 'intermediate',
      outcomes: ['CO2'],
      prerequisites: ['01-booleans-conditionals'],
      lessonsCount: 1,
      problemsCount: 2,
      quizCount: 3
    },
    lesson: `# Iteration: While & For Loops

## 1. Learning Objective
Master looping constructs in Python: the \`while\` loop for condition-driven iteration and the \`for\` loop with \`range()\` and iterables. Understand control flow modification with \`break\`, \`continue\`, and \`pass\`.

## 2. While Loop
\`\`\`python
count = 1
while count <= 5:
    print(count)
    count += 1
\`\`\`

## 3. For Loop and range()
\`\`\`python
# range(start, stop, step)
for i in range(2, 11, 2):
    print(i) # 2, 4, 6, 8, 10
\`\`\`

## 4. Control Statements
- \`break\`: Immediately terminates the innermost loop.
- \`continue\`: Skips the rest of the current iteration and advances to the next.
- \`pass\`: A null statement used as a syntactic placeholder.
`,
    examples: [
      {
        id: 'ex-02-02',
        title: 'Sum of First N Natural Numbers',
        code: 'n = 10\ntotal = 0\nfor i in range(1, n + 1):\n    total += i\nprint("Sum:", total)',
        expectedOutput: 'Sum: 55',
        explanation: 'Accumulates sum from 1 to 10 using a for loop.'
      }
    ],
    problems: [
      {
        id: 'py-u2-ch2-p1',
        courseId: 'python-programming',
        unitId: 'unit-02',
        chapterId: '02-iteration-loops',
        language: 'python',
        difficulty: 'intermediate',
        title: 'Compute Factorial with Loop',
        description: 'Define a function `factorial_loop(n)` that returns the factorial of integer `n` using a `for` or `while` loop. Print the factorial of 6.',
        starterCode: 'def factorial_loop(n):\n    # Write loop logic\n    pass\n\nprint(factorial_loop(6))',
        solutionCode: 'def factorial_loop(n):\n    result = 1\n    for i in range(1, n + 1):\n        result *= i\n    return result\n\nprint(factorial_loop(6))',
        hints: ['Initialize result = 1', 'Multiply result by each number from 1 to n'],
        testCases: [
          { id: 'tc-1', input: '', expectedOutput: '720', isHidden: false }
        ],
        skills: ['loops', 'for', 'accumulator'],
        coMapping: ['CO2'],
        timeLimitMs: 4000,
        attemptsAllowed: 10
      }
    ],
    quiz: [
      {
        id: 'q-u2-ch2-1',
        type: 'output_prediction',
        difficulty: 'intermediate',
        coMapping: ['CO2'],
        question: 'What is the output of this loop?',
        codeSnippet: 's = 0\nfor i in range(1, 6):\n    if i == 3:\n        continue\n    s += i\nprint(s)',
        options: [
          { id: 'opt-1', text: '12', isCorrect: true, explanation: 'Values added are 1, 2, 4, 5. 1 + 2 + 4 + 5 = 12 (3 is skipped).' },
          { id: 'opt-2', text: '15', isCorrect: false },
          { id: 'opt-3', text: '3', isCorrect: false },
          { id: 'opt-4', text: '10', isCorrect: false }
        ],
        explanation: 'When i == 3, continue skips addition. 1+2+4+5 = 12.',
        tags: ['loops', 'continue']
      }
    ]
  },
  {
    folder: '03-fruitful-functions-scope',
    chapter: {
      id: '03-fruitful-functions-scope',
      unitId: 'unit-02',
      order: 3,
      title: 'Fruitful Functions, Scope & Composition',
      description: 'Return values, void vs fruitful functions, local and global variable scope, default parameters, and function composition.',
      estimatedMinutes: 30,
      difficulty: 'intermediate',
      outcomes: ['CO2'],
      prerequisites: ['02-iteration-loops'],
      lessonsCount: 1,
      problemsCount: 2,
      quizCount: 3
    },
    lesson: `# Fruitful Functions, Scope & Composition

## 1. Learning Objective
Distinguish fruitful functions (which return values) from void functions. Understand LEGB (Local, Enclosing, Global, Built-in) scope rules, default arguments, and composing multiple functions together.

## 2. Return Values & Fruitful Functions
A fruitful function explicitly uses \`return\` to pass a result back to its caller.

\`\`\`python
def is_even(n):
    return n % 2 == 0
\`\`\`

## 3. Variable Scope
- **Local Scope:** Variables created inside a function exist only while that function runs.
- **Global Scope:** Variables defined at top-level module scope.
- Use \`global\` keyword only when you need to modify a global variable inside a function.
`,
    examples: [
      {
        id: 'ex-02-03',
        title: 'Function Composition',
        code: 'def square(x):\n    return x * x\n\ndef sum_of_squares(a, b):\n    return square(a) + square(b)\n\nprint(sum_of_squares(3, 4))',
        expectedOutput: '25',
        explanation: 'sum_of_squares calls square() on both arguments and adds their outputs.'
      }
    ],
    problems: [
      {
        id: 'py-u2-ch3-p1',
        courseId: 'python-programming',
        unitId: 'unit-02',
        chapterId: '03-fruitful-functions-scope',
        language: 'python',
        difficulty: 'intermediate',
        title: 'Function Composition: Quadratic Root Discriminant',
        description: 'Define `discriminant(a, b, c)` returning `b**2 - 4*a*c`, and `has_real_roots(a, b, c)` returning True if discriminant >= 0 else False. Print `has_real_roots(1, -5, 6)`.',
        starterCode: 'def discriminant(a, b, c):\n    pass\n\ndef has_real_roots(a, b, c):\n    pass\n\nprint(has_real_roots(1, -5, 6))',
        solutionCode: 'def discriminant(a, b, c):\n    return b**2 - 4*a*c\n\ndef has_real_roots(a, b, c):\n    return discriminant(a, b, c) >= 0\n\nprint(has_real_roots(1, -5, 6))',
        hints: ['discriminant = b**2 - 4*a*c', 'Call discriminant inside has_real_roots'],
        testCases: [
          { id: 'tc-1', input: '', expectedOutput: 'True', isHidden: false }
        ],
        skills: ['composition', 'functions', 'scope'],
        coMapping: ['CO2'],
        timeLimitMs: 4000,
        attemptsAllowed: 10
      }
    ],
    quiz: [
      {
        id: 'q-u2-ch3-1',
        type: 'mcq',
        difficulty: 'intermediate',
        coMapping: ['CO2'],
        question: 'What is returned by a Python function that does not have an explicit return statement?',
        options: [
          { id: 'opt-1', text: 'None', isCorrect: true, explanation: 'Python functions implicitly return None if no return statement executes.' },
          { id: 'opt-2', text: '0', isCorrect: false },
          { id: 'opt-3', text: 'False', isCorrect: false },
          { id: 'opt-4', text: 'undefined', isCorrect: false }
        ],
        explanation: 'In Python, void functions return the singleton object `None`.',
        tags: ['functions', 'return']
      }
    ]
  },
  {
    folder: '04-recursion',
    chapter: {
      id: '04-recursion',
      unitId: 'unit-02',
      order: 4,
      title: 'Recursion & Recursive Problem Solving',
      description: 'Understanding recursive function calls, base cases, call stacks, and solving mathematical recurrence relations.',
      estimatedMinutes: 40,
      difficulty: 'advanced',
      outcomes: ['CO2'],
      prerequisites: ['03-fruitful-functions-scope'],
      lessonsCount: 1,
      problemsCount: 2,
      quizCount: 3
    },
    lesson: `# Recursion & Recursive Problem Solving

## 1. Learning Objective
Understand the mechanism of recursion: when a function calls itself. Learn to identify the **Base Case** (termination condition) and the **Recursive Step**, and trace the call stack.

## 2. Anatomy of a Recursive Function
Every well-formed recursive function must have:
1. **Base Case:** A condition where the function returns immediately without making another recursive call.
2. **Recursive Step:** A call to the same function with arguments that move closer to the base case.

\`\`\`python
def factorial(n):
    # Base case
    if n <= 1:
        return 1
    # Recursive step
    return n * factorial(n - 1)
\`\`\`

## 3. Fibonacci Sequence with Recursion
$$F(0) = 0, \\quad F(1) = 1, \\quad F(n) = F(n-1) + F(n-2)$$

\`\`\`python
def fibonacci(n):
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    return fibonacci(n - 1) + fibonacci(n - 2)
\`\`\`
`,
    examples: [
      {
        id: 'ex-02-04',
        title: 'Recursive Sum of List',
        code: 'def sum_recursive(lst):\n    if not lst:\n        return 0\n    return lst[0] + sum_recursive(lst[1:])\n\nprint(sum_recursive([1, 2, 3, 4, 5]))',
        expectedOutput: '15',
        explanation: 'Adds first element to sum of the remaining sub-list until list is empty.'
      }
    ],
    problems: [
      {
        id: 'py-u2-ch4-p1',
        courseId: 'python-programming',
        unitId: 'unit-02',
        chapterId: '04-recursion',
        language: 'python',
        difficulty: 'advanced',
        title: 'Recursive Power Function',
        description: 'Write a recursive function `power(base, exp)` that computes `base ** exp` without using `**` or `pow()`. Base case is `exp == 0` returning `1`. Test with `power(2, 5)` and print the result.',
        starterCode: 'def power(base, exp):\n    # Write recursive logic\n    pass\n\nprint(power(2, 5))',
        solutionCode: 'def power(base, exp):\n    if exp == 0:\n        return 1\n    return base * power(base, exp - 1)\n\nprint(power(2, 5))',
        hints: ['Base case: if exp == 0 return 1', 'Recursive step: return base * power(base, exp - 1)'],
        testCases: [
          { id: 'tc-1', input: '', expectedOutput: '32', isHidden: false }
        ],
        skills: ['recursion', 'base-case', 'call-stack'],
        coMapping: ['CO2'],
        timeLimitMs: 4000,
        attemptsAllowed: 10
      }
    ],
    quiz: [
      {
        id: 'q-u2-ch4-1',
        type: 'mcq',
        difficulty: 'advanced',
        coMapping: ['CO2'],
        question: 'What error occurs if a recursive function lacks a valid base case or never reaches it?',
        options: [
          { id: 'opt-1', text: 'RecursionError (maximum recursion depth exceeded)', isCorrect: true, explanation: 'Exceeding the Python call stack depth limit raises RecursionError.' },
          { id: 'opt-2', text: 'ZeroDivisionError', isCorrect: false },
          { id: 'opt-3', text: 'TypeError', isCorrect: false },
          { id: 'opt-4', text: 'IndexError', isCorrect: false }
        ],
        explanation: 'Infinite recursion exhausts Python stack frames and triggers RecursionError.',
        tags: ['recursion', 'callstack']
      }
    ]
  },
  {
    folder: '05-strings-methods',
    chapter: {
      id: '05-strings-methods',
      unitId: 'unit-02',
      order: 5,
      title: 'Strings, Slicing & String Methods',
      description: 'String indexing, slicing syntax [start:stop:step], string immutability, string module, and built-in methods (upper, find, split, join).',
      estimatedMinutes: 35,
      difficulty: 'intermediate',
      outcomes: ['CO2'],
      prerequisites: ['01-booleans-conditionals'],
      lessonsCount: 1,
      problemsCount: 2,
      quizCount: 3
    },
    lesson: `# Strings, Slicing & String Methods

## 1. Learning Objective
Understand string traversal, negative and positive indexing, slicing (\`str[start:stop:step]\`), immutability, and standard methods (\`split()\`, \`join()\`, \`replace()\`, \`count()\`, \`strip()\`).

## 2. String Slicing
\`\`\`python
s = "PythonProgramming"
print(s[0:6])    # "Python"
print(s[6:])     # "Programming"
print(s[::-1])   # "gnimmargorPnohtyP" (Reverse string!)
\`\`\`

## 3. String Immutability
Strings in Python cannot be modified in place. Operations create new string objects.
\`\`\`python
s = "hello"
# s[0] = "H"  <-- Raises TypeError!
s = "H" + s[1:] # Correct approach
\`\`\`
`,
    examples: [
      {
        id: 'ex-02-05',
        title: 'Palindrome Checker',
        code: 'def is_palindrome(text):\n    clean = text.lower().replace(" ", "")\n    return clean == clean[::-1]\n\nprint(is_palindrome("Race car"))',
        expectedOutput: 'True',
        explanation: 'Reverses string using [::-1] and compares with original.'
      }
    ],
    problems: [
      {
        id: 'py-u2-ch5-p1',
        courseId: 'python-programming',
        unitId: 'unit-02',
        chapterId: '05-strings-methods',
        language: 'python',
        difficulty: 'intermediate',
        title: 'Count Vowels in String',
        description: 'Define a function `count_vowels(s)` that counts vowels (a, e, i, o, u, case-insensitive) in a string. Call it with `"19AI301 Python Programming"` and print the count.',
        starterCode: 'def count_vowels(s):\n    # Write logic\n    pass\n\nprint(count_vowels("19AI301 Python Programming"))',
        solutionCode: 'def count_vowels(s):\n    vowels = "aeiouAEIOU"\n    return sum(1 for ch in s if ch in vowels)\n\nprint(count_vowels("19AI301 Python Programming"))',
        hints: ['Convert to lower or check in "aeiouAEIOU"', 'Use a loop or generator expression with sum()'],
        testCases: [
          { id: 'tc-1', input: '', expectedOutput: '6', isHidden: false }
        ],
        skills: ['strings', 'iteration', 'membership'],
        coMapping: ['CO2'],
        timeLimitMs: 4000,
        attemptsAllowed: 10
      }
    ],
    quiz: [
      {
        id: 'q-u2-ch5-1',
        type: 'output_prediction',
        difficulty: 'intermediate',
        coMapping: ['CO2'],
        question: 'What is the output of `"AI,Data,Science".split(",")`?',
        options: [
          { id: 'opt-1', text: "['AI', 'Data', 'Science']", isCorrect: true, explanation: 'split(",") separates on commas and returns a list of substrings.' },
          { id: 'opt-2', text: "'AI Data Science'", isCorrect: false },
          { id: 'opt-3', text: "('AI', 'Data', 'Science')", isCorrect: false },
          { id: 'opt-4', text: "['AI,Data,Science']", isCorrect: false }
        ],
        explanation: 'split() splits a string into a list of strings.',
        tags: ['strings', 'methods']
      }
    ]
  },
  {
    folder: '06-illustrative-gcd-newton',
    chapter: {
      id: '06-illustrative-gcd-newton',
      unitId: 'unit-02',
      order: 6,
      title: 'Illustrative Programs: GCD & Newton\'s Method',
      description: 'Official Unit II syllabus illustrative programs: GCD via Euclidean algorithm, square root using Newton-Raphson method, exponentiation, and array sum.',
      estimatedMinutes: 45,
      difficulty: 'advanced',
      outcomes: ['CO2'],
      prerequisites: ['04-recursion', '05-strings-methods'],
      lessonsCount: 1,
      problemsCount: 3,
      quizCount: 3
    },
    lesson: `# Illustrative Programs: GCD & Newton's Method

## 1. Learning Objective
Implement the official syllabus programs for Unit II:
1. **Greatest Common Divisor (GCD)** of two numbers using the Euclidean algorithm.
2. **Square root approximation** using Newton's method (Newton-Raphson).
3. **Exponentiation** and **summing an array of numbers**.

## 2. Euclidean Algorithm for GCD
$$\\gcd(a, b) = \\gcd(b, a \\pmod b), \\quad \\gcd(a, 0) = a$$

\`\`\`python
def gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a
\`\`\`

## 3. Square Root via Newton's Method
To find $\\sqrt{N}$, start with an initial guess $x$ and iterate:
$$x_{next} = \\frac{1}{2} \\left( x + \\frac{N}{x} \\right)$$
Iterate until $|x_{next} - x| < \\epsilon$.
`,
    examples: [
      {
        id: 'ex-02-06',
        title: 'GCD of Two Numbers',
        code: 'def gcd(a, b):\n    while b:\n        a, b = b, a % b\n    return a\n\nprint("GCD(48, 18):", gcd(48, 18))',
        expectedOutput: 'GCD(48, 18): 6',
        explanation: '48 % 18 = 12; 18 % 12 = 6; 12 % 6 = 0 -> GCD is 6.'
      }
    ],
    problems: [
      {
        id: 'py-u2-ch6-p1',
        courseId: 'python-programming',
        unitId: 'unit-02',
        chapterId: '06-illustrative-gcd-newton',
        language: 'python',
        difficulty: 'advanced',
        title: 'Newton\'s Method Square Root',
        description: 'Define a function `newton_sqrt(n, tolerance=1e-6)` that computes the square root of `n` using Newton\'s formula `x = 0.5 * (x + n / x)`. Start with guess `x = n / 2.0`. Round result to 4 decimal places. Print `newton_sqrt(25)` and `newton_sqrt(2)`.',
        starterCode: 'def newton_sqrt(n, tolerance=1e-6):\n    # Write Newton-Raphson approximation loop\n    pass\n\nprint(newton_sqrt(25))\nprint(newton_sqrt(2))',
        solutionCode: 'def newton_sqrt(n, tolerance=1e-6):\n    if n == 0:\n        return 0.0\n    x = n / 2.0\n    while True:\n        next_x = 0.5 * (x + n / x)\n        if abs(next_x - x) < tolerance:\n            return round(next_x, 4)\n        x = next_x\n\nprint(newton_sqrt(25))\nprint(newton_sqrt(2))',
        hints: ['Loop while abs(next_x - x) >= tolerance', 'Formula: 0.5 * (x + n / x)'],
        testCases: [
          { id: 'tc-1', input: '', expectedOutput: '5.0\n1.4142', isHidden: false }
        ],
        skills: ['algorithms', 'numerical-methods', 'newton-method', 'illustrative-programs'],
        coMapping: ['CO2'],
        timeLimitMs: 4000,
        attemptsAllowed: 10
      }
    ],
    quiz: [
      {
        id: 'q-u2-ch6-1',
        type: 'output_prediction',
        difficulty: 'intermediate',
        coMapping: ['CO2'],
        question: 'What is the GCD of 54 and 24?',
        options: [
          { id: 'opt-1', text: '6', isCorrect: true, explanation: 'Factors of 54 are 1,2,3,6,9,18,27,54. Factors of 24 are 1,2,3,4,6,8,12,24. Greatest is 6.' },
          { id: 'opt-2', text: '12', isCorrect: false },
          { id: 'opt-3', text: '3', isCorrect: false },
          { id: 'opt-4', text: '18', isCorrect: false }
        ],
        explanation: '54 % 24 = 6; 24 % 6 = 0 -> GCD is 6.',
        tags: ['gcd', 'math']
      }
    ]
  }
];

unit2Chapters.forEach(item => {
  const dir = path.join(CONTENT_DIR, 'unit-02', item.folder);
  writeJson(path.join(dir, 'chapter.json'), item.chapter);
  writeText(path.join(dir, 'lesson.md'), item.lesson);
  writeJson(path.join(dir, 'examples.json'), item.examples);
  writeJson(path.join(dir, 'problems.json'), item.problems);
  writeJson(path.join(dir, 'quiz.json'), item.quiz);
});

// -------------------------------------------------------------
// UNIT 3: Lists, Tuples, Dictionaries (CO3)
// -------------------------------------------------------------
writeJson(path.join(CONTENT_DIR, 'unit-03', 'unit.json'), {
  id: "unit-03",
  unitNumber: 3,
  romanNumber: "Unit III",
  title: "Lists, Tuples, Dictionaries",
  description: "List operations, mutability, aliasing, cloning, tuples as return values, dictionary mappings, list comprehensions, sorting and searching algorithms.",
  periods: 12,
  outcomes: ["CO3"],
  chapters: [
    "01-lists-mutability",
    "02-tuples",
    "03-dictionaries",
    "04-list-comprehensions",
    "05-illustrative-search-sort"
  ]
});

const unit3Chapters = [
  {
    folder: '01-lists-mutability',
    chapter: {
      id: '01-lists-mutability',
      unitId: 'unit-03',
      order: 1,
      title: 'Lists: Operations, Methods & Mutability',
      description: 'List manipulation, indexing, methods (append, extend, pop, remove, sort), mutability vs aliasing, and cloning lists.',
      estimatedMinutes: 35,
      difficulty: 'intermediate',
      outcomes: ['CO3'],
      prerequisites: [],
      lessonsCount: 1,
      problemsCount: 2,
      quizCount: 3
    },
    lesson: `# Lists: Operations, Methods & Mutability

## 1. Learning Objective
Understand how lists work as mutable sequences in Python. Master list methods, understand aliasing versus cloning, and pass lists into functions safely.

## 2. List Mutability & Aliasing
Lists can be modified after creation:
\`\`\`python
a = [1, 2, 3]
b = a        # Aliasing: b points to the SAME list object in memory!
b.append(4)
print(a)     # [1, 2, 3, 4]  (a is also changed!)
\`\`\`

To clone a list independently:
\`\`\`python
c = a.copy() # or c = a[:]
c.append(5)  # a remains unaffected
\`\`\`

## 3. Essential List Methods
- \`append(x)\`: Add item to end.
- \`extend(iterable)\`: Append multiple elements.
- \`insert(i, x)\`: Insert item at index \`i\`.
- \`pop(i)\`: Remove and return item at index \`i\` (defaults to last).
- \`sort()\`: In-place sorting.
`,
    examples: [
      {
        id: 'ex-03-01',
        title: 'List Aliasing vs Copying',
        code: 'orig = [10, 20, 30]\nalias = orig\nclone = orig[:]\nalias.append(40)\nclone.append(50)\nprint("Original:", orig)\nprint("Clone:", clone)',
        expectedOutput: 'Original: [10, 20, 30, 40]\nClone: [10, 20, 30, 50]',
        explanation: 'Modifying the alias changed orig, but clone was an independent copy.'
      }
    ],
    problems: [
      {
        id: 'py-u3-ch1-p1',
        courseId: 'python-programming',
        unitId: 'unit-03',
        chapterId: '01-lists-mutability',
        language: 'python',
        difficulty: 'intermediate',
        title: 'Remove Duplicates While Preserving Order',
        description: 'Define `remove_duplicates(lst)` that returns a new list with duplicate items removed while keeping original first-occurrence order. Test with `[1, 2, 2, 3, 4, 1, 5]` and print.',
        starterCode: 'def remove_duplicates(lst):\n    pass\n\nprint(remove_duplicates([1, 2, 2, 3, 4, 1, 5]))',
        solutionCode: 'def remove_duplicates(lst):\n    seen = set()\n    res = []\n    for x in lst:\n        if x not in seen:\n            seen.add(x)\n            res.append(x)\n    return res\n\nprint(remove_duplicates([1, 2, 2, 3, 4, 1, 5]))',
        hints: ['Keep track of seen items using a set', 'Append unique elements to a result list'],
        testCases: [
          { id: 'tc-1', input: '', expectedOutput: '[1, 2, 3, 4, 5]', isHidden: false }
        ],
        skills: ['lists', 'mutability', 'sets'],
        coMapping: ['CO3'],
        timeLimitMs: 4000,
        attemptsAllowed: 10
      }
    ],
    quiz: [
      {
        id: 'q-u3-ch1-1',
        type: 'output_prediction',
        difficulty: 'intermediate',
        coMapping: ['CO3'],
        question: 'What is the output of this code snippet?',
        codeSnippet: 'x = [1, 2, 3]\ny = x\nx += [4]\nprint(y)',
        options: [
          { id: 'opt-1', text: '[1, 2, 3, 4]', isCorrect: true, explanation: 'In-place concatenation (+=) modifies the underlying list object that both x and y reference.' },
          { id: 'opt-2', text: '[1, 2, 3]', isCorrect: false },
          { id: 'opt-3', text: '[4]', isCorrect: false },
          { id: 'opt-4', text: 'TypeError', isCorrect: false }
        ],
        explanation: '`+=` invokes `extend()` on the mutable list, altering the shared object.',
        tags: ['lists', 'aliasing']
      }
    ]
  },
  {
    folder: '02-tuples',
    chapter: {
      id: '02-tuples',
      unitId: 'unit-03',
      order: 2,
      title: 'Tuples: Immutability & Return Values',
      description: 'Tuple definition, immutability, tuple assignment, packing & unpacking, zip, and returning multiple values from functions.',
      estimatedMinutes: 30,
      difficulty: 'beginner',
      outcomes: ['CO3'],
      prerequisites: ['01-lists-mutability'],
      lessonsCount: 1,
      problemsCount: 2,
      quizCount: 3
    },
    lesson: `# Tuples: Immutability & Return Values

## 1. Learning Objective
Understand Python tuples as ordered, immutable sequences. Learn tuple packing/unpacking and how functions return multiple values as a tuple.

## 2. Tuples are Immutable
Unlike lists, tuples cannot have elements modified or appended after creation.
\`\`\`python
point = (10, 20)
# point[0] = 15  <-- Raises TypeError!
\`\`\`

## 3. Functions Returning Multiple Values
\`\`\`python
def min_max(lst):
    return min(lst), max(lst)

low, high = min_max([45, 12, 89, 33])
print(low, high) # 12 89
\`\`\`
`,
    examples: [
      {
        id: 'ex-03-02',
        title: 'Tuple Unpacking with zip',
        code: 'names = ["Alice", "Bob", "Charlie"]\nscores = [95, 88, 92]\nfor name, score in zip(names, scores):\n    print(f"{name}: {score}")',
        expectedOutput: 'Alice: 95\nBob: 88\nCharlie: 92',
        explanation: 'zip() pairs corresponding elements from two iterables into tuples.'
      }
    ],
    problems: [
      {
        id: 'py-u3-ch2-p1',
        courseId: 'python-programming',
        unitId: 'unit-03',
        chapterId: '02-tuples',
        language: 'python',
        difficulty: 'beginner',
        title: 'Statistics Tuple Function',
        description: 'Define `get_stats(numbers)` returning a tuple `(min_val, max_val, avg_val)` where `avg_val` is rounded to 2 decimal places. Test with `[10, 20, 30, 40, 50]` and print.',
        starterCode: 'def get_stats(numbers):\n    pass\n\nprint(get_stats([10, 20, 30, 40, 50]))',
        solutionCode: 'def get_stats(numbers):\n    return (min(numbers), max(numbers), round(sum(numbers)/len(numbers), 2))\n\nprint(get_stats([10, 20, 30, 40, 50]))',
        hints: ['Use min(), max(), sum(), len()', 'Return (min, max, round(avg, 2))'],
        testCases: [
          { id: 'tc-1', input: '', expectedOutput: '(10, 50, 30.0)', isHidden: false }
        ],
        skills: ['tuples', 'immutability', 'return-values'],
        coMapping: ['CO3'],
        timeLimitMs: 4000,
        attemptsAllowed: 10
      }
    ],
    quiz: [
      {
        id: 'q-u3-ch2-1',
        type: 'output_prediction',
        difficulty: 'beginner',
        coMapping: ['CO3'],
        question: 'What is the type of `x` in `x = 5,`?',
        options: [
          { id: 'opt-1', text: "<class 'tuple'>", isCorrect: true, explanation: 'A trailing comma creates a single-element tuple.' },
          { id: 'opt-2', text: "<class 'int'>", isCorrect: false },
          { id: 'opt-3', text: "<class 'list'>", isCorrect: false },
          { id: 'opt-4', text: "SyntaxError", isCorrect: false }
        ],
        explanation: 'In Python, the comma defines a tuple; parentheses are optional unless required for disambiguation.',
        tags: ['tuples', 'syntax']
      }
    ]
  },
  {
    folder: '03-dictionaries',
    chapter: {
      id: '03-dictionaries',
      unitId: 'unit-03',
      order: 3,
      title: 'Dictionaries: Key-Value Mappings & Methods',
      description: 'Hash map lookups, dictionary operations, methods (keys, values, items, get, update), and building character frequency histograms.',
      estimatedMinutes: 35,
      difficulty: 'intermediate',
      outcomes: ['CO3'],
      prerequisites: ['01-lists-mutability'],
      lessonsCount: 1,
      problemsCount: 2,
      quizCount: 3
    },
    lesson: `# Dictionaries: Key-Value Mappings & Methods

## 1. Learning Objective
Master dictionaries (\`dict\`), Python's native key-value mapping structure. Learn dictionary access, safe lookups with \`.get()\`, iterating keys and items, and computing frequency tables.

## 2. Dictionary Basics
Keys must be immutable (e.g. strings, numbers, tuples). Values can be any Python object.
\`\`\`python
student = {
    "name": "Arun",
    "course": "19AI301",
    "gpa": 9.2
}
print(student["course"]) # "19AI301"
\`\`\`

## 3. Histogram Pattern
Counting frequency of occurrences:
\`\`\`python
word = "banana"
counts = {}
for ch in word:
    counts[ch] = counts.get(ch, 0) + 1
print(counts) # {'b': 1, 'a': 3, 'n': 2}
\`\`\`
`,
    examples: [
      {
        id: 'ex-03-03',
        title: 'Word Frequency Counter',
        code: 'text = "apple banana apple orange banana apple"\nfreq = {}\nfor w in text.split():\n    freq[w] = freq.get(w, 0) + 1\nprint(freq)',
        expectedOutput: "{'apple': 3, 'banana': 2, 'orange': 1}",
        explanation: 'Uses .get(w, 0) + 1 to accumulate occurrences of each word.'
      }
    ],
    problems: [
      {
        id: 'py-u3-ch3-p1',
        courseId: 'python-programming',
        unitId: 'unit-03',
        chapterId: '03-dictionaries',
        language: 'python',
        difficulty: 'intermediate',
        title: 'Invert Dictionary Mapping',
        description: 'Define `invert_dict(d)` that inverts a dictionary mapping unique values back to keys. Given `{"A": 1, "B": 2, "C": 3}`, return `{1: "A", 2: "B", 3: "C"}` and print the result.',
        starterCode: 'def invert_dict(d):\n    pass\n\nprint(invert_dict({"A": 1, "B": 2, "C": 3}))',
        solutionCode: 'def invert_dict(d):\n    return {v: k for k, v in d.items()}\n\nprint(invert_dict({"A": 1, "B": 2, "C": 3}))',
        hints: ['Use dictionary comprehension: {v: k for k, v in d.items()}'],
        testCases: [
          { id: 'tc-1', input: '', expectedOutput: "{1: 'A', 2: 'B', 3: 'C'}", isHidden: false }
        ],
        skills: ['dictionaries', 'comprehensions', 'mappings'],
        coMapping: ['CO3'],
        timeLimitMs: 4000,
        attemptsAllowed: 10
      }
    ],
    quiz: [
      {
        id: 'q-u3-ch3-1',
        type: 'output_prediction',
        difficulty: 'intermediate',
        coMapping: ['CO3'],
        question: 'What is returned by `d.get("unknown_key", 100)` when `d = {"a": 1}`?',
        options: [
          { id: 'opt-1', text: '100', isCorrect: true, explanation: '.get(key, default) returns the default value when key is absent.' },
          { id: 'opt-2', text: 'KeyError', isCorrect: false },
          { id: 'opt-3', text: 'None', isCorrect: false },
          { id: 'opt-4', text: '0', isCorrect: false }
        ],
        explanation: 'The get() method avoids KeyError by returning the specified fallback.',
        tags: ['dict', 'get']
      }
    ]
  },
  {
    folder: '04-list-comprehensions',
    chapter: {
      id: '04-list-comprehensions',
      unitId: 'unit-03',
      order: 4,
      title: 'Advanced List Processing: Comprehensions',
      description: 'Concise list construction syntax, filtering with conditionals, nested comprehensions, and generator expressions.',
      estimatedMinutes: 30,
      difficulty: 'intermediate',
      outcomes: ['CO3'],
      prerequisites: ['01-lists-mutability'],
      lessonsCount: 1,
      problemsCount: 2,
      quizCount: 3
    },
    lesson: `# Advanced List Processing: Comprehensions

## 1. Learning Objective
Write idiomatic Python using list comprehensions: \`[expression for item in iterable if condition]\`.

## 2. Syntax & Transformation
Traditional Loop:
\`\`\`python
squares = []
for x in range(6):
    squares.append(x**2)
\`\`\`

List Comprehension equivalent:
\`\`\`python
squares = [x**2 for x in range(6)]
# [0, 1, 4, 9, 16, 25]
\`\`\`

## 3. Filtering with If Condition
\`\`\`python
even_squares = [x**2 for x in range(10) if x % 2 == 0]
# [0, 4, 16, 36, 64]
\`\`\`
`,
    examples: [
      {
        id: 'ex-03-04',
        title: 'Extract Uppercase Words',
        code: 'words = ["python", "ai", "lms", "code"]\nupper = [w.upper() for w in words if len(w) <= 3]\nprint(upper)',
        expectedOutput: "['AI', 'LMS']",
        explanation: 'Filters words of length <= 3 and transforms them to uppercase.'
      }
    ],
    problems: [
      {
        id: 'py-u3-ch4-p1',
        courseId: 'python-programming',
        unitId: 'unit-03',
        chapterId: '04-list-comprehensions',
        language: 'python',
        difficulty: 'intermediate',
        title: 'Filter Multiples of 3 and 5',
        description: 'Using a single list comprehension, create a list of numbers between 1 and 50 (inclusive) that are divisible by both 3 and 5. Print the resulting list.',
        starterCode: '# Create list using comprehension and print it\n',
        solutionCode: 'res = [x for x in range(1, 51) if x % 3 == 0 and x % 5 == 0]\nprint(res)',
        hints: ['range(1, 51)', 'Condition: x % 15 == 0 or (x % 3 == 0 and x % 5 == 0)'],
        testCases: [
          { id: 'tc-1', input: '', expectedOutput: '[15, 30, 45]', isHidden: false }
        ],
        skills: ['list-comprehensions', 'filtering'],
        coMapping: ['CO3'],
        timeLimitMs: 4000,
        attemptsAllowed: 10
      }
    ],
    quiz: [
      {
        id: 'q-u3-ch4-1',
        type: 'output_prediction',
        difficulty: 'intermediate',
        coMapping: ['CO3'],
        question: 'What is the output of `[x * 2 for x in [1, 2, 3] if x > 1]`?',
        options: [
          { id: 'opt-1', text: '[4, 6]', isCorrect: true, explanation: 'x takes values 2 and 3; x*2 yields 4 and 6.' },
          { id: 'opt-2', text: '[2, 4, 6]', isCorrect: false },
          { id: 'opt-3', text: '[2, 3]', isCorrect: false },
          { id: 'opt-4', text: '[4]', isCorrect: false }
        ],
        explanation: 'The if filter excludes 1, processing only 2 and 3.',
        tags: ['comprehension', 'lists']
      }
    ]
  },
  {
    folder: '05-illustrative-search-sort',
    chapter: {
      id: '05-illustrative-search-sort',
      unitId: 'unit-03',
      order: 5,
      title: 'Illustrative Programs: Searching & Sorting',
      description: 'Official syllabus algorithms: linear search, binary search, selection sort, insertion sort, merge sort, histogram, and maximum of list.',
      estimatedMinutes: 50,
      difficulty: 'advanced',
      outcomes: ['CO3'],
      prerequisites: ['01-lists-mutability', '04-list-comprehensions'],
      lessonsCount: 1,
      problemsCount: 3,
      quizCount: 3
    },
    lesson: `# Illustrative Programs: Searching & Sorting

## 1. Learning Objective
Implement the official Unit III syllabus algorithmic programs:
1. **Linear Search** and **Binary Search**.
2. **Selection Sort**, **Insertion Sort**, and **Merge Sort**.
3. **Histogram generation** and finding the **maximum in a list**.

## 2. Selection Sort
Iteratively find the smallest element from the unsorted segment and swap it to the current position:

\`\`\`python
def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr
\`\`\`

## 3. Binary Search
Efficient $O(\\log n)$ search on a sorted list:
\`\`\`python
def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1
\`\`\`
`,
    examples: [
      {
        id: 'ex-03-05',
        title: 'Binary Search Implementation',
        code: 'def binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1\n\nnums = [10, 20, 30, 40, 50, 60]\nprint("Index of 40:", binary_search(nums, 40))',
        expectedOutput: 'Index of 40: 3',
        explanation: 'Locates element 40 at index 3 in logarithmic time.'
      }
    ],
    problems: [
      {
        id: 'py-u3-ch5-p1',
        courseId: 'python-programming',
        unitId: 'unit-03',
        chapterId: '05-illustrative-search-sort',
        language: 'python',
        difficulty: 'advanced',
        title: 'Implement Selection Sort',
        description: 'Write a function `selection_sort(arr)` that sorts a list of numbers in ascending order in-place using Selection Sort. Test with `[64, 25, 12, 22, 11]` and print the sorted list.',
        starterCode: 'def selection_sort(arr):\n    # Implement selection sort\n    pass\n\nprint(selection_sort([64, 25, 12, 22, 11]))',
        solutionCode: 'def selection_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        min_idx = i\n        for j in range(i + 1, n):\n            if arr[j] < arr[min_idx]:\n                min_idx = j\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]\n    return arr\n\nprint(selection_sort([64, 25, 12, 22, 11]))',
        hints: ['Find min element index in unsorted portion', 'Swap with element at index i'],
        testCases: [
          { id: 'tc-1', input: '', expectedOutput: '[11, 12, 22, 25, 64]', isHidden: false }
        ],
        skills: ['sorting', 'selection-sort', 'algorithms'],
        coMapping: ['CO3'],
        timeLimitMs: 4000,
        attemptsAllowed: 10
      }
    ],
    quiz: [
      {
        id: 'q-u3-ch5-1',
        type: 'mcq',
        difficulty: 'intermediate',
        coMapping: ['CO3'],
        question: 'What is the worst-case time complexity of Binary Search on a sorted array of size N?',
        options: [
          { id: 'opt-1', text: 'O(log N)', isCorrect: true, explanation: 'Binary search halves the search space at each iteration.' },
          { id: 'opt-2', text: 'O(N)', isCorrect: false },
          { id: 'opt-3', text: 'O(N^2)', isCorrect: false },
          { id: 'opt-4', text: 'O(1)', isCorrect: false }
        ],
        explanation: 'Halving search space yields logarithmic O(log N) time complexity.',
        tags: ['binary-search', 'complexity']
      }
    ]
  }
];

unit3Chapters.forEach(item => {
  const dir = path.join(CONTENT_DIR, 'unit-03', item.folder);
  writeJson(path.join(dir, 'chapter.json'), item.chapter);
  writeText(path.join(dir, 'lesson.md'), item.lesson);
  writeJson(path.join(dir, 'examples.json'), item.examples);
  writeJson(path.join(dir, 'problems.json'), item.problems);
  writeJson(path.join(dir, 'quiz.json'), item.quiz);
});

// -------------------------------------------------------------
// UNIT 4: Files, Modules, Packages (CO4)
// -------------------------------------------------------------
writeJson(path.join(CONTENT_DIR, 'unit-04', 'unit.json'), {
  id: "unit-04",
  unitNumber: 4,
  romanNumber: "Unit IV",
  title: "Files, Modules, Packages",
  description: "Text file I/O, format operator, command line arguments (sys.argv), exception handling (try-except-finally), modules, packages, and classes/objects.",
  periods: 12,
  outcomes: ["CO4"],
  chapters: [
    "01-file-io",
    "02-cmd-exceptions",
    "03-modules-packages",
    "04-classes-objects",
    "05-illustrative-wordcount"
  ]
});

const unit4Chapters = [
  {
    folder: '01-file-io',
    chapter: {
      id: '01-file-io',
      unitId: 'unit-04',
      order: 1,
      title: 'Text Files: Reading, Writing & Formatting',
      description: 'Opening files (r, w, a), reading methods (read, readline, readlines), writing data, format operators (% and f-strings), and context managers (with).',
      estimatedMinutes: 35,
      difficulty: 'intermediate',
      outcomes: ['CO4'],
      prerequisites: [],
      lessonsCount: 1,
      problemsCount: 2,
      quizCount: 3
    },
    lesson: `# Text Files: Reading, Writing & Formatting

## 1. Learning Objective
Understand persistent file storage in Python: opening file handles, reading lines, writing content, using the \`with\` statement for deterministic cleanup, and formatting strings.

## 2. File Modes & Context Manager
\`\`\`python
# Writing to a file safely with context manager
with open("output.txt", "w") as f:
    f.write("Line 1\\n")
    f.write("Line 2\\n")

# Reading lines
with open("output.txt", "r") as f:
    for line in f:
        print(line.strip())
\`\`\`

## 3. String Formatting
- **f-strings (Python 3.6+):** \`f"Score: {score:.2f}"\`
- **Format operator (%):** \`"Code: %s, Periods: %d" % ("19AI301", 60)\`
- **str.format():** \`"Unit: {}".format(4)\`
`,
    examples: [
      {
        id: 'ex-04-01',
        title: 'String Formatting Methods',
        code: 'course = "19AI301"\nperiods = 60\nprint("Format %%: %s (%d periods)" % (course, periods))\nprint(f"F-String: {course} ({periods} periods)")',
        expectedOutput: 'Format %: 19AI301 (60 periods)\nF-String: 19AI301 (60 periods)',
        explanation: 'Demonstrates legacy % operator vs modern f-strings.'
      }
    ],
    problems: [
      {
        id: 'py-u4-ch1-p1',
        courseId: 'python-programming',
        unitId: 'unit-04',
        chapterId: '01-file-io',
        language: 'python',
        difficulty: 'intermediate',
        title: 'Format Academic Report Card',
        description: 'Given student `name = "Kavya"`, `score = 94.6789`, format and print using an f-string: `"Student: Kavya | Score: 94.68%"` (score rounded to 2 decimal places).',
        starterCode: 'name = "Kavya"\nscore = 94.6789\n# Print formatted report card string\n',
        solutionCode: 'name = "Kavya"\nscore = 94.6789\nprint(f"Student: {name} | Score: {score:.2f}%")',
        hints: ['Use f"{score:.2f}%" for formatting floating numbers to 2 decimal places.'],
        testCases: [
          { id: 'tc-1', input: '', expectedOutput: 'Student: Kavya | Score: 94.68%', isHidden: false }
        ],
        skills: ['files', 'formatting', 'f-strings'],
        coMapping: ['CO4'],
        timeLimitMs: 4000,
        attemptsAllowed: 10
      }
    ],
    quiz: [
      {
        id: 'q-u4-ch1-1',
        type: 'mcq',
        difficulty: 'intermediate',
        coMapping: ['CO4'],
        question: 'Why is the `with open(...)` construct preferred for file operations in Python?',
        options: [
          { id: 'opt-1', text: 'It automatically closes the file even if exceptions occur', isCorrect: true, explanation: 'Context managers guarantee __exit__ cleanup and deterministic file closure.' },
          { id: 'opt-2', text: 'It executes faster on the CPU', isCorrect: false },
          { id: 'opt-3', text: 'It avoids importing the os module', isCorrect: false },
          { id: 'opt-4', text: 'It bypasses file system permissions', isCorrect: false }
        ],
        explanation: 'The `with` statement implements context management, ensuring proper resource closure.',
        tags: ['files', 'context-manager']
      }
    ]
  },
  {
    folder: '02-cmd-exceptions',
    chapter: {
      id: '02-cmd-exceptions',
      unitId: 'unit-04',
      order: 2,
      title: 'Command-Line Arguments & Exception Handling',
      description: 'Accessing sys.argv, handling runtime errors with try, except, else, finally blocks, and raising custom exceptions.',
      estimatedMinutes: 35,
      difficulty: 'intermediate',
      outcomes: ['CO4'],
      prerequisites: ['01-file-io'],
      lessonsCount: 1,
      problemsCount: 2,
      quizCount: 3
    },
    lesson: `# Command-Line Arguments & Exception Handling

## 1. Learning Objective
Understand how CLI scripts receive parameters via \`sys.argv\` and how to write fault-tolerant code using Python's exception handling hierarchy (\`try\`, \`except\`, \`else\`, \`finally\`).

## 2. Command Line Arguments
\`\`\`python
import sys

# sys.argv[0] is the script name
# sys.argv[1:] are positional arguments
print("Script name:", sys.argv[0])
\`\`\`

## 3. Exception Handling (try-except-finally)
\`\`\`python
try:
    num = int("abc")
    res = 10 / 0
except ValueError:
    print("Caught ValueError: invalid integer literal")
except ZeroDivisionError:
    print("Caught ZeroDivisionError: cannot divide by zero")
finally:
    print("Execution cleanup completed")
\`\`\`
`,
    examples: [
      {
        id: 'ex-04-02',
        title: 'Safe Division with Try-Except',
        code: 'def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return "Cannot divide by zero"\n\nprint(safe_divide(10, 2))\nprint(safe_divide(10, 0))',
        expectedOutput: '5.0\nCannot divide by zero',
        explanation: 'Intercepts ZeroDivisionError and returns a graceful fallback message.'
      }
    ],
    problems: [
      {
        id: 'py-u4-ch2-p1',
        courseId: 'python-programming',
        unitId: 'unit-04',
        chapterId: '02-cmd-exceptions',
        language: 'python',
        difficulty: 'intermediate',
        title: 'Robust Integer Parser',
        description: 'Define `parse_integer(val, default_val=0)` that attempts to convert `val` to int using `try-except ValueError`. Returns `default_val` on error. Print `parse_integer("123")` and `parse_integer("abc", -1)`.',
        starterCode: 'def parse_integer(val, default_val=0):\n    pass\n\nprint(parse_integer("123"))\nprint(parse_integer("abc", -1))',
        solutionCode: 'def parse_integer(val, default_val=0):\n    try:\n        return int(val)\n    except ValueError:\n        return default_val\n\nprint(parse_integer("123"))\nprint(parse_integer("abc", -1))',
        hints: ['Wrap int(val) inside try block', 'Catch ValueError and return default_val'],
        testCases: [
          { id: 'tc-1', input: '', expectedOutput: '123\n-1', isHidden: false }
        ],
        skills: ['exceptions', 'try-except', 'error-handling'],
        coMapping: ['CO4'],
        timeLimitMs: 4000,
        attemptsAllowed: 10
      }
    ],
    quiz: [
      {
        id: 'q-u4-ch2-1',
        type: 'output_prediction',
        difficulty: 'intermediate',
        coMapping: ['CO4'],
        question: 'Which block in a try-except statement ALWAYS executes regardless of whether an exception occurred?',
        options: [
          { id: 'opt-1', text: 'finally', isCorrect: true, explanation: 'The finally clause always executes.' },
          { id: 'opt-2', text: 'else', isCorrect: false },
          { id: 'opt-3', text: 'except', isCorrect: false },
          { id: 'opt-4', text: 'catch', isCorrect: false }
        ],
        explanation: 'The `finally` block is guaranteed to run after try/except blocks.',
        tags: ['exceptions', 'finally']
      }
    ]
  },
  {
    folder: '03-modules-packages',
    chapter: {
      id: '03-modules-packages',
      unitId: 'unit-04',
      order: 3,
      title: 'Modules & Packages Architecture',
      description: 'Creating Python modules (.py files), importing functions, package namespaces, and __init__.py role.',
      estimatedMinutes: 30,
      difficulty: 'beginner',
      outcomes: ['CO4'],
      prerequisites: ['01-file-io'],
      lessonsCount: 1,
      problemsCount: 2,
      quizCount: 3
    },
    lesson: `# Modules & Packages Architecture

## 1. Learning Objective
Understand how code is organized into reusable files (**modules**) and directory trees (**packages**). Learn import syntax variations and namespace separation.

## 2. Modules
A module is simply a file containing Python definitions and statements (e.g. \`math.py\`, \`mymodule.py\`).

\`\`\`python
import math
print(math.pi)

from math import sqrt, ceil
print(sqrt(49)) # 7.0
\`\`\`

## 3. Packages
A package is a directory containing multiple modules and an \`__init__.py\` file (which marks the directory as a Python package).
`,
    examples: [
      {
        id: 'ex-04-03',
        title: 'Module Namespace Inspection',
        code: 'import math\nprint("pi rounded:", round(math.pi, 4))\nprint("factorial(5):", math.factorial(5))',
        expectedOutput: 'pi rounded: 3.1416\nfactorial(5): 120',
        explanation: 'Accessing functions and constants from the math module.'
      }
    ],
    problems: [
      {
        id: 'py-u4-ch3-p1',
        courseId: 'python-programming',
        unitId: 'unit-04',
        chapterId: '03-modules-packages',
        language: 'python',
        difficulty: 'beginner',
        title: 'Calculate Hypotenuse with Math Module',
        description: 'Using Python\'s `math` module, calculate hypotenuse $c = \\sqrt{a^2 + b^2}$ for $a = 6$ and $b = 8$. Print the result.',
        starterCode: 'import math\n\na = 6\nb = 8\n# Calculate and print hypotenuse\n',
        solutionCode: 'import math\n\na = 6\nb = 8\nhyp = math.hypot(a, b)\nprint(hyp)',
        hints: ['Use math.hypot(a, b) or math.sqrt(a**2 + b**2)'],
        testCases: [
          { id: 'tc-1', input: '', expectedOutput: '10.0', isHidden: false }
        ],
        skills: ['modules', 'math'],
        coMapping: ['CO4'],
        timeLimitMs: 4000,
        attemptsAllowed: 10
      }
    ],
    quiz: [
      {
        id: 'q-u4-ch3-1',
        type: 'mcq',
        difficulty: 'beginner',
        coMapping: ['CO4'],
        question: 'Which file is traditionally placed in a folder to identify it as a Python package?',
        options: [
          { id: 'opt-1', text: '__init__.py', isCorrect: true, explanation: '__init__.py initializes a Python package directory.' },
          { id: 'opt-2', text: 'package.json', isCorrect: false },
          { id: 'opt-3', text: 'main.py', isCorrect: false },
          { id: 'opt-4', text: '__main__.py', isCorrect: false }
        ],
        explanation: '`__init__.py` tells Python that the directory should be treated as containing packages.',
        tags: ['packages', 'architecture']
      }
    ]
  },
  {
    folder: '04-classes-objects',
    chapter: {
      id: '04-classes-objects',
      unitId: 'unit-04',
      order: 4,
      title: 'Object-Oriented Programming: Classes & Objects',
      description: 'Class definitions, __init__ constructor, instance attributes, self parameter, and object methods.',
      estimatedMinutes: 40,
      difficulty: 'intermediate',
      outcomes: ['CO4'],
      prerequisites: ['03-modules-packages'],
      lessonsCount: 1,
      problemsCount: 2,
      quizCount: 3
    },
    lesson: `# Object-Oriented Programming: Classes & Objects

## 1. Learning Objective
Understand the fundamentals of Object-Oriented Programming (OOP) in Python: creating classes as blueprints, instantiating objects, using the \`__init__\` constructor, and defining instance methods.

## 2. Defining Classes & The self Reference
\`\`\`python
class Student:
    def __init__(self, name, roll_no):
        self.name = name
        self.roll_no = roll_no
    
    def get_info(self):
        return f"Student: {self.name} (Roll: {self.roll_no})"

s1 = Student("Priya", "19AI301-01")
print(s1.get_info())
\`\`\`
`,
    examples: [
      {
        id: 'ex-04-04',
        title: 'Rectangle Class Implementation',
        code: 'class Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n    \n    def area(self):\n        return self.width * self.height\n\nrect = Rectangle(10, 5)\nprint("Area:", rect.area())',
        expectedOutput: 'Area: 50',
        explanation: 'Defines Rectangle class with width and height attributes and an area() method.'
      }
    ],
    problems: [
      {
        id: 'py-u4-ch4-p1',
        courseId: 'python-programming',
        unitId: 'unit-04',
        chapterId: '04-classes-objects',
        language: 'python',
        difficulty: 'intermediate',
        title: 'BankAccount Class with Deposit and Withdraw',
        description: 'Create a `BankAccount` class with `__init__(self, balance=0)`, `deposit(self, amount)`, and `withdraw(self, amount)`. Initialize with 500, deposit 200, withdraw 150, and print final balance.',
        starterCode: 'class BankAccount:\n    # Define class methods\n    pass\n\nacc = BankAccount(500)\nacc.deposit(200)\nacc.withdraw(150)\nprint("Balance:", acc.balance)',
        solutionCode: 'class BankAccount:\n    def __init__(self, balance=0):\n        self.balance = balance\n    def deposit(self, amount):\n        self.balance += amount\n    def withdraw(self, amount):\n        if amount <= self.balance:\n            self.balance -= amount\n\nacc = BankAccount(500)\nacc.deposit(200)\nacc.withdraw(150)\nprint("Balance:", acc.balance)',
        hints: ['self.balance += amount in deposit', 'self.balance -= amount in withdraw'],
        testCases: [
          { id: 'tc-1', input: '', expectedOutput: 'Balance: 550', isHidden: false }
        ],
        skills: ['oop', 'classes', 'methods'],
        coMapping: ['CO4'],
        timeLimitMs: 4000,
        attemptsAllowed: 10
      }
    ],
    quiz: [
      {
        id: 'q-u4-ch4-1',
        type: 'mcq',
        difficulty: 'intermediate',
        coMapping: ['CO4'],
        question: 'What is the primary role of the `self` parameter in Python instance methods?',
        options: [
          { id: 'opt-1', text: 'It references the current instance of the class', isCorrect: true, explanation: 'self passes the instance object explicitly to methods.' },
          { id: 'opt-2', text: 'It imports the parent module', isCorrect: false },
          { id: 'opt-3', text: 'It acts as a static global constant', isCorrect: false },
          { id: 'opt-4', text: 'It allocates RAM memory directly', isCorrect: false }
        ],
        explanation: '`self` represents the instance of the class on which the method is called.',
        tags: ['oop', 'self']
      }
    ]
  },
  {
    folder: '05-illustrative-wordcount',
    chapter: {
      id: '05-illustrative-wordcount',
      unitId: 'unit-04',
      order: 5,
      title: 'Illustrative Programs: Word Count & File Copy',
      description: 'Official Unit IV syllabus illustrative programs: Word count program, copying files, and command-line word count utility.',
      estimatedMinutes: 40,
      difficulty: 'intermediate',
      outcomes: ['CO4'],
      prerequisites: ['01-file-io', '02-cmd-exceptions'],
      lessonsCount: 1,
      problemsCount: 2,
      quizCount: 3
    },
    lesson: `# Illustrative Programs: Word Count & File Copy

## 1. Learning Objective
Implement the official Unit IV illustrative programs:
1. **Word Count Utility:** Count lines, words, and characters in text.
2. **File Copy Utility:** Read from source and write into destination stream.

## 2. Word Count Logic
\`\`\`python
def analyze_text(text):
    lines = len(text.splitlines())
    words = len(text.split())
    chars = len(text)
    return lines, words, chars
\`\`\`
`,
    examples: [
      {
        id: 'ex-04-05',
        title: 'Word and Line Counter',
        code: 'sample = "Python Programming\\n19AI301\\nBytelab LMS Platform"\nlines = len(sample.splitlines())\nwords = len(sample.split())\nprint(f"Lines: {lines}, Words: {words}")',
        expectedOutput: 'Lines: 3, Words: 6',
        explanation: 'Counts lines using splitlines() and words using split().'
      }
    ],
    problems: [
      {
        id: 'py-u4-ch5-p1',
        courseId: 'python-programming',
        unitId: 'unit-04',
        chapterId: '05-illustrative-wordcount',
        language: 'python',
        difficulty: 'intermediate',
        title: 'Compute Text File Word Statistics',
        description: 'Define `word_stats(text)` returning a dictionary `{"lines": L, "words": W, "chars": C}`. Test with `"Artificial Intelligence\\nData Science\\nPython 3"` and print.',
        starterCode: 'def word_stats(text):\n    pass\n\nprint(word_stats("Artificial Intelligence\\nData Science\\nPython 3"))',
        solutionCode: 'def word_stats(text):\n    return {\n        "lines": len(text.splitlines()),\n        "words": len(text.split()),\n        "chars": len(text)\n    }\n\nprint(word_stats("Artificial Intelligence\\nData Science\\nPython 3"))',
        hints: ['lines = len(text.splitlines())', 'words = len(text.split())', 'chars = len(text)'],
        testCases: [
          { id: 'tc-1', input: '', expectedOutput: "{'lines': 3, 'words': 5, 'chars': 45}", isHidden: false }
        ],
        skills: ['wordcount', 'file-simulation', 'strings'],
        coMapping: ['CO4'],
        timeLimitMs: 4000,
        attemptsAllowed: 10
      }
    ],
    quiz: [
      {
        id: 'q-u4-ch5-1',
        type: 'output_prediction',
        difficulty: 'intermediate',
        coMapping: ['CO4'],
        question: 'What is returned by `len("Hello World\\n".split())`?',
        options: [
          { id: 'opt-1', text: '2', isCorrect: true, explanation: 'split() handles whitespace including newlines and yields ["Hello", "World"].' },
          { id: 'opt-2', text: '3', isCorrect: false },
          { id: 'opt-3', text: '12', isCorrect: false },
          { id: 'opt-4', text: '1', isCorrect: false }
        ],
        explanation: 'split() treats consecutive whitespace (spaces, newlines, tabs) as word delimiters.',
        tags: ['wordcount', 'strings']
      }
    ]
  }
];

unit4Chapters.forEach(item => {
  const dir = path.join(CONTENT_DIR, 'unit-04', item.folder);
  writeJson(path.join(dir, 'chapter.json'), item.chapter);
  writeText(path.join(dir, 'lesson.md'), item.lesson);
  writeJson(path.join(dir, 'examples.json'), item.examples);
  writeJson(path.join(dir, 'problems.json'), item.problems);
  writeJson(path.join(dir, 'quiz.json'), item.quiz);
});

// -------------------------------------------------------------
// UNIT 5: NumPy, Data Frame (CO5)
// -------------------------------------------------------------
writeJson(path.join(CONTENT_DIR, 'unit-05', 'unit.json'), {
  id: "unit-05",
  unitNumber: 5,
  romanNumber: "Unit V",
  title: "NumPy, Data Frame",
  description: "NumPy array creation, shape and reshaping, array indexing, slicing, vectorized math, pandas Series, DataFrame, groupby, apply, sorting, and matrix operations.",
  periods: 12,
  outcomes: ["CO5"],
  chapters: [
    "01-numpy-arrays",
    "02-numpy-math-indexing",
    "03-pandas-series-dataframe",
    "04-pandas-groupby-apply",
    "05-illustrative-matrix-csv"
  ]
});

const unit5Chapters = [
  {
    folder: '01-numpy-arrays',
    chapter: {
      id: '01-numpy-arrays',
      unitId: 'unit-05',
      order: 1,
      title: 'NumPy Arrays: Creation, Shape & Reshaping',
      description: 'Creating ndarray objects (np.array, np.zeros, np.ones, np.arange, np.linspace), inspecting ndim/shape/dtype, and reshaping arrays.',
      estimatedMinutes: 35,
      difficulty: 'intermediate',
      outcomes: ['CO5'],
      prerequisites: [],
      lessonsCount: 1,
      problemsCount: 2,
      quizCount: 3
    },
    lesson: `# NumPy Arrays: Creation, Shape & Reshaping

## 1. Learning Objective
Understand why NumPy is the foundation of data science in Python. Learn to create multi-dimensional arrays (\`ndarray\`), inspect array properties (\`shape\`, \`size\`, \`ndim\`, \`dtype\`), and transform dimensions using \`reshape()\`.

## 2. Creating NumPy Arrays
\`\`\`python
import numpy as np

# From a list
arr = np.array([1, 2, 3, 4, 5, 6])
print("Shape:", arr.shape) # (6,)

# Reshaping 1D into 2D (2 rows x 3 cols)
matrix = arr.reshape((2, 3))
print("2D Matrix:\\n", matrix)
\`\`\`

## 3. Special Array Generators
- \`np.zeros((3, 3))\`: 3x3 matrix of zeros.
- \`np.ones((2, 4))\`: 2x4 matrix of ones.
- \`np.arange(0, 10, 2)\`: Array \`[0, 2, 4, 6, 8]\`.
- \`np.linspace(0, 1, 5)\`: 5 evenly spaced points between 0 and 1.
`,
    examples: [
      {
        id: 'ex-05-01',
        title: 'NumPy Reshape Demonstration',
        code: 'import numpy as np\na = np.arange(1, 10)\nm = a.reshape((3, 3))\nprint("Shape:", m.shape)\nprint("Diagonal elements:", np.diag(m))',
        expectedOutput: 'Shape: (3, 3)\nDiagonal elements: [1 5 9]',
        explanation: 'Reshapes 1D array of 9 elements into a 3x3 square matrix.'
      }
    ],
    problems: [
      {
        id: 'py-u5-ch1-p1',
        courseId: 'python-programming',
        unitId: 'unit-05',
        chapterId: '01-numpy-arrays',
        language: 'python',
        difficulty: 'intermediate',
        title: 'Create and Reshape 2D Matrix',
        description: 'Using NumPy, create an array of integers from 10 to 21 (inclusive) with `np.arange(10, 22)`. Reshape it into a (3, 4) matrix. Print the matrix shape and the sum of all elements.',
        starterCode: 'import numpy as np\n# Create array, reshape to (3, 4), and print shape and sum\n',
        solutionCode: 'import numpy as np\narr = np.arange(10, 22).reshape((3, 4))\nprint("Shape:", arr.shape)\nprint("Sum:", arr.sum())',
        hints: ['np.arange(10, 22).reshape((3, 4))', 'arr.sum() calculates total sum'],
        testCases: [
          { id: 'tc-1', input: '', expectedOutput: 'Shape: (3, 4)\nSum: 186', isHidden: false }
        ],
        skills: ['numpy', 'arrays', 'reshape'],
        coMapping: ['CO5'],
        timeLimitMs: 5000,
        attemptsAllowed: 10
      }
    ],
    quiz: [
      {
        id: 'q-u5-ch1-1',
        type: 'mcq',
        difficulty: 'intermediate',
        coMapping: ['CO5'],
        question: 'What is the attribute used in NumPy to find the number of dimensions of an array?',
        options: [
          { id: 'opt-1', text: 'ndim', isCorrect: true, explanation: 'arr.ndim gives the number of axes/dimensions.' },
          { id: 'opt-2', text: 'shape', isCorrect: false },
          { id: 'opt-3', text: 'dim', isCorrect: false },
          { id: 'opt-4', text: 'size', isCorrect: false }
        ],
        explanation: '`ndim` specifies the number of array dimensions.',
        tags: ['numpy', 'attributes']
      }
    ]
  },
  {
    folder: '02-numpy-math-indexing',
    chapter: {
      id: '02-numpy-math-indexing',
      unitId: 'unit-05',
      order: 2,
      title: 'NumPy Slicing & Vectorized Mathematics',
      description: 'Multi-dimensional slicing, boolean masking, element-wise arithmetic, broadcasting, and aggregation functions (mean, sum, std).',
      estimatedMinutes: 35,
      difficulty: 'intermediate',
      outcomes: ['CO5'],
      prerequisites: ['01-numpy-arrays'],
      lessonsCount: 1,
      problemsCount: 2,
      quizCount: 3
    },
    lesson: `# NumPy Slicing & Vectorized Mathematics

## 1. Learning Objective
Master multi-dimensional array slicing (\`matrix[row_slice, col_slice]\`), boolean filtering, and vectorized math without manual loops.

## 2. 2D Slicing Syntax
\`\`\`python
import numpy as np

mat = np.array([
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90]
])

print(mat[0, :])     # First row: [10, 20, 30]
print(mat[:, 1])     # Second column: [20, 50, 80]
print(mat[0:2, 1:3]) # 2x2 sub-matrix
\`\`\`

## 3. Vectorized Math & Broadcasting
\`\`\`python
a = np.array([1, 2, 3])
print(a * 10) # [10, 20, 30] - Element-wise multiplication!
print(a + 5)  # [6, 7, 8]
\`\`\`
`,
    examples: [
      {
        id: 'ex-05-02',
        title: 'Boolean Indexing Mask',
        code: 'import numpy as np\nscores = np.array([85, 42, 91, 67, 55, 78])\npassed = scores[scores >= 60]\nprint("Passed scores:", passed)',
        expectedOutput: 'Passed scores: [85 91 67 78]',
        explanation: 'scores >= 60 produces a boolean mask array that filters scores.'
      }
    ],
    problems: [
      {
        id: 'py-u5-ch2-p1',
        courseId: 'python-programming',
        unitId: 'unit-05',
        chapterId: '02-numpy-math-indexing',
        language: 'python',
        difficulty: 'intermediate',
        title: 'Matrix Column Statistics',
        description: 'Given 2D array `data = np.array([[10, 25], [30, 45], [50, 65]])`, compute and print the mean of the first column and the sum of the second column.',
        starterCode: 'import numpy as np\ndata = np.array([[10, 25], [30, 45], [50, 65]])\n# Compute col 0 mean and col 1 sum\n',
        solutionCode: 'import numpy as np\ndata = np.array([[10, 25], [30, 45], [50, 65]])\nprint("Col 0 Mean:", data[:, 0].mean())\nprint("Col 1 Sum:", data[:, 1].sum())',
        hints: ['Use data[:, 0] for column 0', 'Use data[:, 1] for column 1'],
        testCases: [
          { id: 'tc-1', input: '', expectedOutput: 'Col 0 Mean: 30.0\nCol 1 Sum: 135', isHidden: false }
        ],
        skills: ['numpy', 'slicing', 'aggregations'],
        coMapping: ['CO5'],
        timeLimitMs: 5000,
        attemptsAllowed: 10
      }
    ],
    quiz: [
      {
        id: 'q-u5-ch2-1',
        type: 'output_prediction',
        difficulty: 'intermediate',
        coMapping: ['CO5'],
        question: 'What is the result of `np.array([2, 4, 6]) + np.array([1, 2, 3])` in NumPy?',
        options: [
          { id: 'opt-1', text: 'array([3, 6, 9])', isCorrect: true, explanation: 'NumPy performs element-wise addition by default.' },
          { id: 'opt-2', text: 'array([2, 4, 6, 1, 2, 3])', isCorrect: false },
          { id: 'opt-3', text: 'array([18])', isCorrect: false },
          { id: 'opt-4', text: 'TypeError', isCorrect: false }
        ],
        explanation: 'The + operator on NumPy arrays executes element-wise vectorized addition.',
        tags: ['numpy', 'vectorization']
      }
    ]
  },
  {
    folder: '03-pandas-series-dataframe',
    chapter: {
      id: '03-pandas-series-dataframe',
      unitId: 'unit-05',
      order: 3,
      title: 'Pandas: Series, DataFrame & Indexing',
      description: 'Pandas data structures: 1D Series, 2D DataFrame, column selection, loc/iloc indexing, and handling missing data (isna, fillna, dropna).',
      estimatedMinutes: 40,
      difficulty: 'intermediate',
      outcomes: ['CO5'],
      prerequisites: ['02-numpy-math-indexing'],
      lessonsCount: 1,
      problemsCount: 2,
      quizCount: 3
    },
    lesson: `# Pandas: Series, DataFrame & Indexing

## 1. Learning Objective
Learn to use pandas for structured tabular data processing: building Series and DataFrames, accessing data with \`.loc\` (label-based) and \`.iloc\` (integer position-based), and handling missing values.

## 2. Creating a DataFrame
\`\`\`python
import pandas as pd

data = {
    "StudentID": ["S101", "S102", "S103"],
    "Name": ["Aditya", "Divya", "Rahul"],
    "Mark": [88, 92, 79]
}
df = pd.DataFrame(data)
print(df)
\`\`\`

## 3. Indexing with loc and iloc
- \`df.iloc[0]\`: First row by integer index.
- \`df["Mark"]\`: Access the "Mark" column as a Series.
- \`df.loc[df["Mark"] >= 90]\`: Filter rows where Mark is at least 90.
`,
    examples: [
      {
        id: 'ex-05-03',
        title: 'Pandas DataFrame Filtering',
        code: 'import pandas as pd\ndf = pd.DataFrame({\n    "Course": ["19AI301", "CS3301", "MA3151"],\n    "Credits": [3, 3, 4]\n})\nprint(df[df["Credits"] == 3]["Course"].tolist())',
        expectedOutput: "['19AI301', 'CS3301']",
        explanation: 'Filters courses having 3 credits.'
      }
    ],
    problems: [
      {
        id: 'py-u5-ch3-p1',
        courseId: 'python-programming',
        unitId: 'unit-05',
        chapterId: '03-pandas-series-dataframe',
        language: 'python',
        difficulty: 'intermediate',
        title: 'Calculate DataFrame Statistics',
        description: 'Create a DataFrame with `{"Product": ["A", "B", "C"], "Price": [100, 250, 150]}`. Compute and print the average price.',
        starterCode: 'import pandas as pd\n# Create DataFrame and print average price\n',
        solutionCode: 'import pandas as pd\ndf = pd.DataFrame({"Product": ["A", "B", "C"], "Price": [100, 250, 150]})\nprint("Average Price:", df["Price"].mean())',
        hints: ['df["Price"].mean() computes the mean of the column'],
        testCases: [
          { id: 'tc-1', input: '', expectedOutput: 'Average Price: 166.66666666666666', isHidden: false }
        ],
        skills: ['pandas', 'dataframe', 'mean'],
        coMapping: ['CO5'],
        timeLimitMs: 5000,
        attemptsAllowed: 10
      }
    ],
    quiz: [
      {
        id: 'q-u5-ch3-1',
        type: 'mcq',
        difficulty: 'intermediate',
        coMapping: ['CO5'],
        question: 'Which pandas method is used to select rows based on integer positions rather than labels?',
        options: [
          { id: 'opt-1', text: 'iloc', isCorrect: true, explanation: 'iloc provides integer-location based indexing.' },
          { id: 'opt-2', text: 'loc', isCorrect: false },
          { id: 'opt-3', text: 'ix', isCorrect: false },
          { id: 'opt-4', text: 'at', isCorrect: false }
        ],
        explanation: '`iloc` is strictly integer position based (from 0 to length-1).',
        tags: ['pandas', 'iloc']
      }
    ]
  },
  {
    folder: '04-pandas-groupby-apply',
    chapter: {
      id: '04-pandas-groupby-apply',
      unitId: 'unit-05',
      order: 4,
      title: 'Pandas GroupBy, Apply & Merging',
      description: 'Group-by aggregations, applying custom lambda functions, sorting data, and joining/merging datasets.',
      estimatedMinutes: 40,
      difficulty: 'advanced',
      outcomes: ['CO5'],
      prerequisites: ['03-pandas-series-dataframe'],
      lessonsCount: 1,
      problemsCount: 2,
      quizCount: 3
    },
    lesson: `# Pandas GroupBy, Apply & Merging

## 1. Learning Objective
Master advanced data transformation with pandas: the Split-Apply-Combine pattern using \`groupby()\`, transforming columns with \`.apply()\`, sorting values, and joining datasets with \`merge()\`.

## 2. GroupBy (Split-Apply-Combine)
\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "Department": ["AI", "AI", "CS", "CS", "IT"],
    "GPA": [9.1, 8.8, 8.5, 9.4, 8.2]
})

dept_gpa = df.groupby("Department")["GPA"].mean()
print(dept_gpa)
\`\`\`

## 3. Apply with Lambda
\`\`\`python
df["Status"] = df["GPA"].apply(lambda g: "Distinction" if g >= 9.0 else "Pass")
\`\`\`
`,
    examples: [
      {
        id: 'ex-05-04',
        title: 'GroupBy Department Summary',
        code: 'import pandas as pd\ndf = pd.DataFrame({\n    "Dept": ["AI", "CS", "AI", "CS"],\n    "Score": [90, 80, 95, 85]\n})\nprint(df.groupby("Dept")["Score"].max().to_dict())',
        expectedOutput: "{'AI': 95, 'CS': 85}",
        explanation: 'Groups by Dept and computes maximum score in each group.'
      }
    ],
    problems: [
      {
        id: 'py-u5-ch4-p1',
        courseId: 'python-programming',
        unitId: 'unit-05',
        chapterId: '04-pandas-groupby-apply',
        language: 'python',
        difficulty: 'advanced',
        title: 'Group and Aggregate Sales Data',
        description: 'Given `df = pd.DataFrame({"Category": ["Electronics", "Clothing", "Electronics", "Clothing"], "Sales": [500, 200, 700, 300]})`, compute total sales per category and print as a dictionary sorted by category name.',
        starterCode: 'import pandas as pd\ndf = pd.DataFrame({\n    "Category": ["Electronics", "Clothing", "Electronics", "Clothing"],\n    "Sales": [500, 200, 700, 300]\n})\n# Group by Category, sum Sales, and print dict\n',
        solutionCode: 'import pandas as pd\ndf = pd.DataFrame({\n    "Category": ["Electronics", "Clothing", "Electronics", "Clothing"],\n    "Sales": [500, 200, 700, 300]\n})\nres = df.groupby("Category")["Sales"].sum().to_dict()\nprint(res)',
        hints: ['df.groupby("Category")["Sales"].sum().to_dict()'],
        testCases: [
          { id: 'tc-1', input: '', expectedOutput: "{'Clothing': 500, 'Electronics': 1200}", isHidden: false }
        ],
        skills: ['pandas', 'groupby', 'aggregation'],
        coMapping: ['CO5'],
        timeLimitMs: 5000,
        attemptsAllowed: 10
      }
    ],
    quiz: [
      {
        id: 'q-u5-ch4-1',
        type: 'mcq',
        difficulty: 'advanced',
        coMapping: ['CO5'],
        question: 'Which method is used in pandas to apply a function along an axis of a DataFrame or across Series elements?',
        options: [
          { id: 'opt-1', text: 'apply()', isCorrect: true, explanation: 'df.apply() maps functions over DataFrame rows or columns.' },
          { id: 'opt-2', text: 'map_all()', isCorrect: false },
          { id: 'opt-3', text: 'execute()', isCorrect: false },
          { id: 'opt-4', text: 'transform_all()', isCorrect: false }
        ],
        explanation: '`apply()` is pandas core method for custom element/row transformations.',
        tags: ['pandas', 'apply']
      }
    ]
  },
  {
    folder: '05-illustrative-matrix-csv',
    chapter: {
      id: '05-illustrative-matrix-csv',
      unitId: 'unit-05',
      order: 5,
      title: 'Illustrative Programs: Matrix Operations & CSV Processing',
      description: 'Official Unit V syllabus programs: matrix multiplication, matrix inverse verification, and reading/processing CSV tabular data.',
      estimatedMinutes: 50,
      difficulty: 'advanced',
      outcomes: ['CO5'],
      prerequisites: ['02-numpy-math-indexing', '04-pandas-groupby-apply'],
      lessonsCount: 1,
      problemsCount: 3,
      quizCount: 3
    },
    lesson: `# Illustrative Programs: Matrix Operations & CSV Processing

## 1. Learning Objective
Implement the official Unit V illustrative programs:
1. **Matrix Multiplication and Matrix Inverse** with loops vs NumPy library functions (\`np.dot\`, \`np.linalg.inv\`).
2. **Reading and Processing Tabular Data** from CSV format.

## 2. Matrix Multiplication
Given matrices $A$ ($m \\times k$) and $B$ ($k \\times n$), product $C = A \\times B$ has elements:
$$C_{ij} = \\sum_{r=1}^{k} A_{ir} B_{rj}$$

In NumPy:
\`\`\`python
import numpy as np

A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

# Using @ operator or np.dot()
C = A @ B
print("Matrix Product:\\n", C)
\`\`\`

## 3. Matrix Inverse
If $A$ is non-singular ($|A| \\neq 0$), $A^{-1} A = I$:
\`\`\`python
A_inv = np.linalg.inv(A)
identity_check = np.allclose(A @ A_inv, np.eye(2))
print("Identity verified:", identity_check) # True
\`\`\`
`,
    examples: [
      {
        id: 'ex-05-05',
        title: 'Matrix Multiplication & Inverse',
        code: 'import numpy as np\nA = np.array([[4, 7], [2, 6]])\nA_inv = np.linalg.inv(A)\nprint("Determinant:", round(np.linalg.det(A), 2))\nprint("Verified:", np.allclose(A @ A_inv, np.eye(2)))',
        expectedOutput: 'Determinant: 10.0\nVerified: True',
        explanation: 'Computes matrix inverse and verifies A @ A_inv equals identity matrix.'
      }
    ],
    problems: [
      {
        id: 'py-u5-ch5-p1',
        courseId: 'python-programming',
        unitId: 'unit-05',
        chapterId: '05-illustrative-matrix-csv',
        language: 'python',
        difficulty: 'advanced',
        title: 'Compute Matrix Product with NumPy',
        description: 'Given $A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$ and $B = \\begin{pmatrix} 2 & 0 \\\\ 1 & 2 \\end{pmatrix}$, compute matrix product $C = A \\cdot B$. Print the trace (sum of diagonal elements) of $C$.',
        starterCode: 'import numpy as np\nA = np.array([[1, 2], [3, 4]])\nB = np.array([[2, 0], [1, 2]])\n# Compute product and print trace\n',
        solutionCode: 'import numpy as np\nA = np.array([[1, 2], [3, 4]])\nB = np.array([[2, 0], [1, 2]])\nC = A @ B\nprint("Trace:", np.trace(C))',
        hints: ['C = A @ B or np.dot(A, B)', 'np.trace(C) returns sum of diagonal'],
        testCases: [
          { id: 'tc-1', input: '', expectedOutput: 'Trace: 12', isHidden: false }
        ],
        skills: ['matrix-multiplication', 'numpy', 'linear-algebra'],
        coMapping: ['CO5'],
        timeLimitMs: 5000,
        attemptsAllowed: 10
      }
    ],
    quiz: [
      {
        id: 'q-u5-ch5-1',
        type: 'mcq',
        difficulty: 'advanced',
        coMapping: ['CO5'],
        question: 'Which operator in modern Python (PEP 465) performs matrix multiplication between two NumPy arrays?',
        options: [
          { id: 'opt-1', text: '@', isCorrect: true, explanation: 'The @ infix operator denotes matrix multiplication.' },
          { id: 'opt-2', text: '*', isCorrect: false },
          { id: 'opt-3', text: 'x', isCorrect: false },
          { id: 'opt-4', text: '^', isCorrect: false }
        ],
        explanation: '`*` does element-wise multiplication, whereas `@` performs matrix multiplication.',
        tags: ['matrix', 'numpy', 'syntax']
      }
    ]
  }
];

unit5Chapters.forEach(item => {
  const dir = path.join(CONTENT_DIR, 'unit-05', item.folder);
  writeJson(path.join(dir, 'chapter.json'), item.chapter);
  writeText(path.join(dir, 'lesson.md'), item.lesson);
  writeJson(path.join(dir, 'examples.json'), item.examples);
  writeJson(path.join(dir, 'problems.json'), item.problems);
  writeJson(path.join(dir, 'quiz.json'), item.quiz);
});

console.log('Successfully built all 5 Units and 27 Chapters for 19AI301/CS3301!');
