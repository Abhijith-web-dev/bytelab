import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  checkGeminiNanoCapability,
  sanitizeSocraticHint,
  generateSocraticHint,
  destroyGeminiNanoSession,
  FALLBACK_SOCRATIC_HINTS,
  SOCRATIC_SYSTEM_PROMPT,
  analyzeFullCodeDiagnosis,
  parseNanoStructuredOutput,
  generateTraceStepInsight,
  generatePracticeLogicHint,
  SOCRATIC_HINT_SCHEMA,
  PRACTICE_LOGIC_SCHEMA,
  TRACE_INSIGHT_SCHEMA
} from '../services/ai/geminiNanoService.js';
import aiModelManager from '../services/ai/aiModelManager.js';

describe('Gemini Nano Browser-Builtin AI Service', () => {
  beforeEach(() => {
    destroyGeminiNanoSession();
    delete globalThis.LanguageModel;
    if (globalThis.window) {
      delete globalThis.window.LanguageModel;
      delete globalThis.window.ai;
    }
  });

  afterEach(() => {
    destroyGeminiNanoSession();
    delete globalThis.LanguageModel;
    if (globalThis.window) {
      delete globalThis.window.LanguageModel;
      delete globalThis.window.ai;
    }
    vi.restoreAllMocks();
  });

  describe('1. Anti-Solution Sanitizer (Pedagogical Guardrail)', () => {
    it('strips triple-backtick markdown code blocks completely', () => {
      const dirtyOutput = `The variable is not defined.
\`\`\`python
weights = [10, 20, 30]
print(weights)
\`\`\`
Check where you defined it.`;

      const sanitized = sanitizeSocraticHint(dirtyOutput);
      expect(sanitized).not.toContain('```');
      expect(sanitized).not.toContain('weights = [10, 20, 30]');
      expect(sanitized).toContain('The variable is not defined.');
      expect(sanitized).toContain('Check where you defined it.');
    });

    it('sanitizes statements disguised as inline code', () => {
      const codeSuggestion = 'You should replace line with `print(sum(weights))` to calculate.';
      const sanitized = sanitizeSocraticHint(codeSuggestion);
      expect(sanitized).not.toContain('`print(sum(weights))`');
      expect(sanitized).toContain('[check your code structure]');
    });

    it('permits harmless single identifiers in inline backticks', () => {
      const identifierHint = 'Make sure the variable `total` is assigned before line 3.';
      const sanitized = sanitizeSocraticHint(identifierHint);
      expect(sanitized).toBe('Make sure the variable `total` is assigned before line 3.');
    });

    it('strips "write this instead" and "here is the fixed code" preambles', () => {
      const sneakyOutput = 'Here is the fixed code: Check the variable name.';
      const sanitized = sanitizeSocraticHint(sneakyOutput);
      expect(sanitized).not.toMatch(/here is the fixed code/i);
      expect(sanitized).toContain('Check the variable name.');
    });
  });

  describe('2. Browser Capability Detection', () => {
    it('returns unavailable gracefully when window.ai is not defined', async () => {
      const originalAi = globalThis.window?.ai;
      delete globalThis.window.ai;

      const caps = await checkGeminiNanoCapability();
      expect(caps.status).toBe('unavailable');
      expect(caps.available).toBe('no');

      if (originalAi) globalThis.window.ai = originalAi;
    });

    it('detects available status when window.ai.languageModel.capabilities returns readily', async () => {
      const mockCapabilities = vi.fn().mockResolvedValue({
        available: 'readily',
        defaultTemperature: 0.2,
        maxTopK: 3
      });

      globalThis.window.ai = {
        languageModel: {
          capabilities: mockCapabilities
        }
      };

      const caps = await checkGeminiNanoCapability();
      expect(caps.status).toBe('available');
      expect(caps.available).toBe('readily');
      expect(caps.model).toContain('Gemini Nano');

      delete globalThis.window.ai;
    });

    it('detects downloading status when window.ai reports after-download', async () => {
      globalThis.window.ai = {
        languageModel: {
          capabilities: vi.fn().mockResolvedValue({ available: 'after-download' })
        }
      };

      const caps = await checkGeminiNanoCapability();
      expect(caps.status).toBe('downloading');
      expect(caps.available).toBe('after-download');

      delete globalThis.window.ai;
    });

    it('detects available status via standards-track global LanguageModel.availability()', async () => {
      globalThis.LanguageModel = {
        availability: vi.fn().mockResolvedValue('available')
      };

      const caps = await checkGeminiNanoCapability();
      expect(caps.status).toBe('available');
      expect(caps.available).toBe('readily');
      expect(caps.model).toContain('LanguageModel');
      expect(caps.downloadProgress).toBe(100);

      delete globalThis.LanguageModel;
    });

    it('detects downloadable / downloading status via global LanguageModel', async () => {
      globalThis.LanguageModel = {
        availability: vi.fn().mockResolvedValue('downloadable')
      };

      const caps = await checkGeminiNanoCapability();
      expect(caps.status).toBe('downloadable');
      expect(caps.available).toBe('after-download');
      expect(caps.model).toContain('LanguageModel');

      globalThis.LanguageModel.availability = vi.fn().mockResolvedValue('downloading');
      const caps2 = await checkGeminiNanoCapability();
      expect(caps2.status).toBe('downloading');
      expect(caps2.available).toBe('after-download');

      delete globalThis.LanguageModel;
    });
  });

  describe('3. Socratic Fallback Hint Engine', () => {
    it('returns progressive Level 1, Level 2, and Level 3 hints for NameError', async () => {
      const l1 = await generateSocraticHint({
        errorType: 'NameError',
        errorMessage: "name 'scores' is not defined",
        lineNumber: 4,
        codeSnippet: 'print(scores)',
        hintLevel: 1
      });
      expect(l1.source).toBe('local-heuristic');
      expect(l1.hint).toContain(FALLBACK_SOCRATIC_HINTS.NameError.level1);
      expect(l1.hint).toContain('line 4');

      const l2 = await generateSocraticHint({
        errorType: 'NameError',
        errorMessage: "name 'scores' is not defined",
        lineNumber: 4,
        codeSnippet: 'print(scores)',
        hintLevel: 2
      });
      expect(l2.hint).toContain(FALLBACK_SOCRATIC_HINTS.NameError.level2);

      const l3 = await generateSocraticHint({
        errorType: 'NameError',
        errorMessage: "name 'scores' is not defined",
        lineNumber: 4,
        codeSnippet: 'print(scores)',
        hintLevel: 3
      });
      expect(l3.hint).toContain(FALLBACK_SOCRATIC_HINTS.NameError.level3);
    });

    it('handles streaming callbacks (onToken)', async () => {
      const tokens = [];
      await generateSocraticHint({
        errorType: 'TypeError',
        errorMessage: "unsupported operand type(s) for +: 'int' and 'str'",
        lineNumber: 2,
        codeSnippet: 'total = 5 + "10"',
        onToken: (t) => tokens.push(t)
      });

      expect(tokens.length).toBeGreaterThan(0);
      expect(tokens[tokens.length - 1]).toContain('incompatible');
    });

    it('enforces that system prompt prohibits solutions', () => {
      expect(SOCRATIC_SYSTEM_PROMPT).toContain('NEVER output the corrected Python code');
      expect(SOCRATIC_SYSTEM_PROMPT).toContain('NEVER use markdown triple-backtick code blocks');
    });
  });

  describe('4. Full-Code AST & Contextual Error Diagnosis Engine', () => {
    it('detects typo matching declared symbols in fullCode for NameError', () => {
      const fullCode = `total_score = 100\nbonus = 20\nprint(totla_score + bonus)`;
      const res = analyzeFullCodeDiagnosis({
        errorType: 'NameError',
        errorMessage: "name 'totla_score' is not defined",
        lineNumber: 3,
        codeSnippet: 'print(totla_score + bonus)',
        fullCode,
        hintLevel: 1
      });

      expect(res.diagnosis).toContain("typo for 'total_score'");
      expect(res.fixIdea).toContain("replace 'totla_score' with 'total_score'");
      expect(res.symbolMatch).toBeTruthy();
      expect(res.symbolMatch.name).toBe('total_score');
    });

    it('detects case mismatch in fullCode for NameError', () => {
      const fullCode = `Score = 95\nprint(score)`;
      const res = analyzeFullCodeDiagnosis({
        errorType: 'NameError',
        errorMessage: "name 'score' is not defined",
        lineNumber: 2,
        codeSnippet: 'print(score)',
        fullCode,
        hintLevel: 1
      });

      expect(res.diagnosis).toContain("does not match the capitalization of 'Score'");
      expect(res.fixIdea).toContain("use the exact casing 'Score'");
      expect(res.symbolMatch.reason).toBe('case_mismatch');
    });

    it('detects forward-referencing variables defined later in fullCode', () => {
      const fullCode = `print(result)\nresult = 42`;
      const res = analyzeFullCodeDiagnosis({
        errorType: 'NameError',
        errorMessage: "name 'result' is not defined",
        lineNumber: 1,
        codeSnippet: 'print(result)',
        fullCode,
        hintLevel: 1
      });

      expect(res.diagnosis).toContain("defined on line 2, but you referenced it earlier on line 1");
      expect(res.fixIdea).toContain("Move the definition of 'result' above line 1");
    });

    it('detects built-in keyword typos like prnt', () => {
      const fullCode = `prnt("Welcome to ByteLab")`;
      const res = analyzeFullCodeDiagnosis({
        errorType: 'NameError',
        errorMessage: "name 'prnt' is not defined",
        lineNumber: 1,
        codeSnippet: 'prnt("Welcome to ByteLab")',
        fullCode,
        hintLevel: 1
      });

      expect(res.diagnosis).toContain("typo for Python's built-in 'print'");
      expect(res.fixIdea).toContain("Update 'prnt' to 'print'");
    });

    it('diagnoses uncast input() in fullCode causing TypeError', () => {
      const fullCode = `age = input("Enter age: ")\nnext_year = age + 1`;
      const res = analyzeFullCodeDiagnosis({
        errorType: 'TypeError',
        errorMessage: "can only concatenate str (not 'int') to str",
        lineNumber: 2,
        codeSnippet: 'next_year = age + 1',
        fullCode,
        hintLevel: 1
      });

      expect(res.diagnosis).toContain("'input()' function always returns a string");
      expect(res.fixIdea).toContain("Wrap your 'input()' with 'int()'");
    });

    it('diagnoses missing indentation under control headers in fullCode', () => {
      const fullCode = `def greet(name):\nprint("Hello " + name)`;
      const res = analyzeFullCodeDiagnosis({
        errorType: 'IndentationError',
        errorMessage: 'expected an indented block after function definition on line 1',
        lineNumber: 2,
        codeSnippet: 'print("Hello " + name)',
        fullCode,
        hintLevel: 1
      });

      expect(res.diagnosis).toContain("'def' block started on line 1");
      expect(res.fixIdea).toContain("Add 4 spaces of indentation to line 2");
    });

    it('diagnoses missing colons on compound statement headers', () => {
      const fullCode = `if x > 10\n    print("big")`;
      const res = analyzeFullCodeDiagnosis({
        errorType: 'SyntaxError',
        errorMessage: 'invalid syntax',
        lineNumber: 1,
        codeSnippet: 'if x > 10',
        fullCode,
        hintLevel: 1
      });

      expect(res.diagnosis).toContain("missing a required colon ':'");
      expect(res.fixIdea).toContain("Add a colon ':' to the very end of line 1");
    });

    it('parses structured sections from Gemini Nano output correctly', () => {
      const rawAiText = `[Diagnosis]
You referenced an uninitialized identifier on line 2.
[Hint]
Does the variable exist before line 2?
[Fix Idea]
Initialize total = 0 at the start of your code.`;

      const fallback = { diagnosis: 'fb diag', hint: 'fb hint', fixIdea: 'fb fix' };
      const parsed = parseNanoStructuredOutput(rawAiText, fallback);

      expect(parsed.diagnosis).toBe('You referenced an uninitialized identifier on line 2.');
      expect(parsed.hint).toBe('Does the variable exist before line 2?');
      expect(parsed.fixIdea).toBe('Initialize total = 0 at the start of your code.');
    });

    it('generateSocraticHint returns full diagnosis, hint, and fixIdea payload', async () => {
      const fullCode = `counter = 5\nprint(countr)`;
      const res = await generateSocraticHint({
        errorType: 'NameError',
        errorMessage: "name 'countr' is not defined",
        lineNumber: 2,
        codeSnippet: 'print(countr)',
        fullCode,
        hintLevel: 1
      });

      expect(res).toHaveProperty('diagnosis');
      expect(res).toHaveProperty('hint');
      expect(res).toHaveProperty('fixIdea');
      expect(res.diagnosis).toContain("typo for 'counter'");
      expect(res.fixIdea).toContain("replace 'countr' with 'counter'");
      expect(res.symbolMatch?.name).toBe('counter');
    });
  });

  describe('5. Time-Travel Step Insight Engine (generateTraceStepInsight)', () => {
    it('returns graceful fallback when step is not provided', async () => {
      const res = await generateTraceStepInsight({ step: null });
      expect(res.stepDiagnosis).toBe('No step selected.');
      expect(res.source).toBe('local-heuristic');
    });

    it('diagnoses ZeroDivisionError crash step', async () => {
      const step = {
        step: 4,
        line: 5,
        event: 'exception',
        snippet: 'avg = total / count',
        exception: { type: 'ZeroDivisionError', msg: 'division by zero' },
        locals: { total: { value: '10', type: 'int' }, count: { value: '0', type: 'int' } }
      };

      const res = await generateTraceStepInsight({ step, hintLevel: 1 });
      expect(res.stepDiagnosis).toContain('divide or modulo by zero');
      expect(res.hint).toContain('Which variable or expression evaluated to 0?');
      expect(res.fixIdea).toContain('if denominator != 0:');
      expect(res.source).toBe('local-heuristic');
    });

    it('diagnoses in-place list method returning None', async () => {
      const step = {
        step: 3,
        line: 4,
        event: 'line',
        snippet: 'numbers = numbers.append(10)',
        locals: { numbers: { value: 'None', type: 'NoneType' } }
      };
      const prevStep = {
        step: 2,
        line: 3,
        locals: { numbers: { value: '[1, 2]', type: 'list' } }
      };

      const res = await generateTraceStepInsight({ step, prevStep, hintLevel: 1 });
      expect(res.stepDiagnosis).toContain("Variable 'numbers' became None");
      expect(res.stepDiagnosis).toContain(".append()");
      expect(res.fixIdea).toContain("without assigning it back to 'numbers'");
    });

    it('diagnoses variable mutation and escalates hint with ladder level', async () => {
      const step = {
        step: 5,
        line: 8,
        event: 'line',
        snippet: 'score = score + 50',
        locals: { score: { value: '150', type: 'int' } }
      };
      const prevStep = {
        step: 4,
        line: 7,
        locals: { score: { value: '100', type: 'int' } }
      };

      const lvl1 = await generateTraceStepInsight({ step, prevStep, hintLevel: 1 });
      expect(lvl1.stepDiagnosis).toContain("Variable 'score' mutated from 100 to 150 on line 8.");
      expect(lvl1.hint).toContain("Trace how this mutation influences");

      const lvl3 = await generateTraceStepInsight({ step, prevStep, hintLevel: 3 });
      expect(lvl3.hint).toContain(lvl3.fixIdea);
    });
  });

  describe('6. Socratic Practice Logic Hint Engine (generatePracticeLogicHint)', () => {
    it('diagnoses case mismatch between actual and expected output', async () => {
      const res = await generatePracticeLogicHint({
        expectedOutput: 'True',
        actualOutput: 'true',
        code: 'def is_even(n):\n    return n % 2 == 0'
      });

      expect(res.logicDiagnosis).toContain('letter casing differs');
      expect(res.hint).toContain("Compare the capitalization");
      expect(res.fixIdea).toContain('True');
    });

    it('diagnoses missing return statement when function produces None', async () => {
      const res = await generatePracticeLogicHint({
        expectedOutput: '15',
        actualOutput: 'None',
        code: 'def sum_numbers(a, b):\n    print(a + b)'
      });

      expect(res.logicDiagnosis).toContain("completed without returning a value (it produced 'None')");
      expect(res.hint).toContain("print()' inside the function instead of returning");
      expect(res.fixIdea).toContain("Add a 'return' statement");
    });

    it('diagnoses early return inside loop', async () => {
      const code = `def find_match(items):\n    for item in items:\n        return item`;
      const res = await generatePracticeLogicHint({
        expectedOutput: 'found',
        actualOutput: 'first',
        code
      });

      expect(res.logicDiagnosis).toContain("placed directly inside the loop");
      expect(res.hint).toContain("Look at the indentation of your 'return'");
      expect(res.fixIdea).toContain("Unindent the 'return' statement");
    });

    it('diagnoses numeric off-by-one errors', async () => {
      const res = await generatePracticeLogicHint({
        expectedOutput: '10',
        actualOutput: '9',
        code: 'for i in range(10):\n    pass'
      });

      expect(res.logicDiagnosis).toContain("numeric result (9) is off by 1 from the expected value (10)");
      expect(res.hint).toContain("classic off-by-one condition");
      expect(res.fixIdea).toContain("range(a, b)' stops at 'b - 1'");
    });

    it('diagnoses inverted boolean results', async () => {
      const res = await generatePracticeLogicHint({
        expectedOutput: 'True',
        actualOutput: 'False',
        code: 'return a < b'
      });

      expect(res.logicDiagnosis).toContain("returned the opposite boolean value");
      expect(res.hint).toContain("Check the comparison operators");
    });
  });
  describe('7. Standards-Track AI Model Manager & Structured Constraints', () => {
    it('notifies subscribers of download progress events', () => {
      let reportedProgress = null;
      const unsubscribe = aiModelManager.subscribeDownloadProgress((progress) => {
        reportedProgress = progress;
      });

      aiModelManager._emitDownloadProgress(50, 100);
      expect(reportedProgress).toBe(50);
      expect(aiModelManager.downloadProgress).toBe(50);

      aiModelManager._emitDownloadProgress(75, 100);
      expect(reportedProgress).toBe(75);

      unsubscribe();
      aiModelManager._emitDownloadProgress(90, 100);
      expect(reportedProgress).toBe(75); // Unsubscribed, so not updated
    });

    it('validates structured schemas export integrity', () => {
      expect(SOCRATIC_HINT_SCHEMA.type).toBe('object');
      expect(SOCRATIC_HINT_SCHEMA.required).toContain('diagnosis');
      expect(SOCRATIC_HINT_SCHEMA.required).toContain('hintLevel1Concept');
      expect(SOCRATIC_HINT_SCHEMA.required).toContain('fixIdea');

      expect(PRACTICE_LOGIC_SCHEMA.type).toBe('object');
      expect(PRACTICE_LOGIC_SCHEMA.required).toContain('logicDiagnosis');

      expect(TRACE_INSIGHT_SCHEMA.type).toBe('object');
      expect(TRACE_INSIGHT_SCHEMA.required).toContain('stepDiagnosis');
    });

    it('promptWithConstraint parses valid JSON structured response', async () => {
      const mockSession = {
        prompt: vi.fn().mockResolvedValue(JSON.stringify({
          diagnosis: 'Variable not initialized',
          hintLevel1Concept: 'Check variable lifecycle',
          hintLevel2Clue: 'Look at line 3',
          hintLevel3Rule: 'Assign before read',
          fixIdea: 'Add total = 0'
        }))
      };

      const result = await aiModelManager.promptWithConstraint(mockSession, 'Explain bug', SOCRATIC_HINT_SCHEMA);
      expect(mockSession.prompt).toHaveBeenCalledWith('Explain bug', { responseConstraint: SOCRATIC_HINT_SCHEMA });
      expect(result.parsed).toBeTruthy();
      expect(result.parsed.diagnosis).toBe('Variable not initialized');
      expect(result.parsed.hintLevel1Concept).toBe('Check variable lifecycle');
    });

    it('generateSocraticHint leverages LanguageModel with structured schema ladder', async () => {
      const structuredPayload = {
        diagnosis: 'Line 2 has a typo',
        hintLevel1Concept: 'Concept: names must match exactly',
        hintLevel2Clue: 'Clue: check letters in countr',
        hintLevel3Rule: 'Rule: replace countr with counter',
        fixIdea: 'Change countr to counter'
      };

      const mockSession = {
        prompt: vi.fn().mockResolvedValue(JSON.stringify(structuredPayload))
      };

      globalThis.LanguageModel = {
        availability: vi.fn().mockResolvedValue('available'),
        create: vi.fn().mockResolvedValue(mockSession)
      };

      const lvl1 = await generateSocraticHint({
        errorType: 'NameError',
        errorMessage: "name 'countr' is not defined",
        lineNumber: 2,
        codeSnippet: 'print(countr)',
        fullCode: 'counter = 5\nprint(countr)',
        hintLevel: 1
      });

      expect(lvl1.source).toBe('gemini-nano');
      expect(lvl1.diagnosis).toBe('Line 2 has a typo');
      expect(lvl1.hint).toBe('Concept: names must match exactly');
      expect(lvl1.fixIdea).toBe('Change countr to counter');

      const lvl2 = await generateSocraticHint({
        errorType: 'NameError',
        errorMessage: "name 'countr' is not defined",
        lineNumber: 2,
        codeSnippet: 'print(countr)',
        fullCode: 'counter = 5\nprint(countr)',
        hintLevel: 2
      });

      expect(lvl2.hint).toBe('Clue: check letters in countr');

      delete globalThis.LanguageModel;
    });
  });
});
