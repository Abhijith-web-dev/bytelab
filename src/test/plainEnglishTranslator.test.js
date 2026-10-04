import { describe, it, expect } from 'vitest';
import { translatePythonLine, translatePythonCode, PHYSICAL_METAPHORS } from '../utils/plainEnglishTranslator.js';
import { getBeginnerDoctorDiagnosis, parsePythonError } from '../utils/pythonErrorFormatter.js';

describe('Plain-English Python Translator', () => {
  it('translates int(input()) lines into friendly human explanations', () => {
    const res = translatePythonLine('mark = int(input())');
    expect(res).not.toBeNull();
    expect(res.type).toBe('input_int');
    expect(res.plainEnglish).toContain('Read a whole number');
    expect(res.plainEnglish).toContain('mark');
  });

  it('translates int(input(prompt)) with prompt string', () => {
    const res = translatePythonLine('age = int(input("Enter your age: "))');
    expect(res.type).toBe('input_int');
    expect(res.plainEnglish).toContain('Enter your age:');
    expect(res.plainEnglish).toContain('age');
  });

  it('translates if statements with conditional checks', () => {
    const res = translatePythonLine('if mark >= 90:');
    expect(res.type).toBe('if');
    expect(res.plainEnglish).toContain('Check if (mark >= 90)');
  });

  it('translates for loops with range', () => {
    const res = translatePythonLine('for i in range(5):');
    expect(res.type).toBe('for_loop');
    expect(res.plainEnglish).toContain('5 times');
    expect(res.plainEnglish).toContain('0 up to 4');
  });

  it('translates print statements', () => {
    const res = translatePythonLine('print("Grade:", grade)');
    expect(res.type).toBe('print');
    expect(res.plainEnglish).toContain('Grade:');
  });

  it('translates multi-line Python code correctly', () => {
    const code = "mark = int(input())\nif mark >= 90:\n    grade = 'A'\nprint('Grade:', grade)";
    const translations = translatePythonCode(code);
    expect(translations.length).toBe(4);
    expect(translations[0].translation.type).toBe('input_int');
    expect(translations[1].translation.type).toBe('if');
  });

  it('contains all essential beginner physical metaphors', () => {
    const ids = PHYSICAL_METAPHORS.map(m => m.id);
    expect(ids).toContain('variable');
    expect(ids).toContain('list');
    expect(ids).toContain('conditional');
    expect(ids).toContain('loop');
    expect(ids).toContain('function');
  });
});

describe('Error Doctor Non-CS Friendly Diagnoses', () => {
  it('diagnoses missing colon syntax errors with doorbell analogy and auto-fix line', () => {
    const diag = getBeginnerDoctorDiagnosis('SyntaxError', "expected ':'", 'if mark >= 90');
    expect(diag.plainTitle).toContain('Missing Colon');
    expect(diag.analogy).toContain('doorbell');
    expect(diag.autoFixLine).toBe('if mark >= 90:');
  });

  it('diagnoses indentation errors with marching soldier analogy and 4-space auto-fix', () => {
    const diag = getBeginnerDoctorDiagnosis('IndentationError', 'unexpected indent', 'print(x)');
    expect(diag.plainTitle).toContain('Misaligned Code');
    expect(diag.analogy).toContain('formation');
    expect(diag.autoFixLine).toBe('    print(x)');
  });

  it('diagnoses type errors with metal coin and paper analogy', () => {
    const diag = getBeginnerDoctorDiagnosis('TypeError', 'can only concatenate str (not "int") to str', 'print("Score: " + 85)');
    expect(diag.plainTitle).toContain('Words and Numbers');
    expect(diag.analogy).toContain('coin');
  });

  it('integrates beginnerDoctor into parsePythonError output', () => {
    const stderr = 'Traceback (most recent call last):\n  File "main.py", line 1\n    if mark >= 90\n                 ^\nSyntaxError: expected \':\'';
    const parsed = parsePythonError(stderr, 'if mark >= 90');
    expect(parsed).not.toBeNull();
    expect(parsed.beginnerDoctor).toBeDefined();
    expect(parsed.beginnerDoctor.plainTitle).toContain('Missing Colon');
  });
});
