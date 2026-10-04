import { AstInspectorTool } from '../tools/AstInspectorTool.js';
import { FuzzGeneratorTool } from '../tools/FuzzGeneratorTool.js';
import { SimulationTool } from '../tools/SimulationTool.js';
import { misconceptionStore } from '../memory/MisconceptionStore.js';
import {
  checkGeminiNanoCapability,
  generateSocraticHint,
  generatePracticeLogicHint,
  sanitizeSocraticHint
} from '../../services/ai/geminiNanoService.js';
import { parsePythonError } from '../../utils/pythonErrorFormatter.js';
import { computeOutputDiff } from '../../utils/outputDiff.js';

/**
 * ByteAgent: 100% Browser-Native Autonomous AI Agent for Computer Science
 * Zero external third-party API keys, zero cloud costs, 100% client-side.
 */
export class ByteAgent {
  constructor() {
    this.status = 'idle'; // 'idle' | 'observing' | 'analyzing' | 'testing_hypothesis' | 'ready'
    this.lastObservation = null;
    this.activeNudge = null;
    this.activePrediction = null;
    this.speechUtterance = null;
  }

  /**
   * Observe current playground context
   */
  observe(context = {}) {
    this.lastObservation = {
      code: context.code || '',
      stdout: context.stdout || '',
      stderr: context.stderr || '',
      runtimeError: context.runtimeError || null,
      testCaseResults: context.testCaseResults || [],
      problemTitle: context.problemTitle || '',
      problemDescription: context.problemDescription || '',
      timestamp: Date.now()
    };
    this.status = 'observing';
    return this.lastObservation;
  }

  /**
   * Autonomous Diagnosis & Socratic Nudge Generation
   */
  async diagnose(level = 1) {
    if (!this.lastObservation) {
      return null;
    }

    this.status = 'analyzing';
    const { code, stderr, runtimeError, testCaseResults, problemTitle, problemDescription } = this.lastObservation;

    // 1. Static AST Structure & Code Smell Inspection
    const ast = AstInspectorTool.inspect(code);

    // 2. Misconception Memory Lookup
    const topWeakness = misconceptionStore.getTopWeakness();

    // Scenario A: Runtime Error or Syntax Error active
    if (stderr || runtimeError) {
      const parsed = stderr ? parsePythonError(stderr, code) : null;
      const errType = parsed?.errorType || runtimeError?.error_type || 'RuntimeError';
      const errMsg = parsed?.errorMessage || runtimeError?.error_msg || '';

      misconceptionStore.recordError(errType, { message: errMsg, line: parsed?.lineNumber });

      try {
        const aiRes = await generateSocraticHint({
          errorType: errType,
          errorMessage: errMsg,
          lineNumber: parsed?.lineNumber || 1,
          codeSnippet: parsed?.codeSnippet || '',
          fullCode: code,
          hintLevel: level
        });

        this.activeNudge = {
          type: 'runtime_error',
          category: errType,
          diagnosis: aiRes.diagnosis || parsed?.humanExplanation || 'Execution halted due to an unexpected state.',
          socraticClue: sanitizeSocraticHint(aiRes.hint || parsed?.suggestedFix || 'Check variable values before this line.'),
          actionIdea: sanitizeSocraticHint(aiRes.fixIdea || 'Review line logic.'),
          level,
          source: aiRes.source || 'symbolic-engine',
          astDetails: { maxDepth: ast.maxNestingDepth, hasRecursion: ast.hasRecursion }
        };
      } catch (e) {
        this.activeNudge = {
          type: 'runtime_error',
          category: errType,
          diagnosis: parsed?.humanExplanation || 'Syntax or runtime condition encountered.',
          socraticClue: 'What value does the variable hold immediately before this line executes?',
          actionIdea: 'Review the line of code and inspect your variables.',
          level,
          source: 'symbolic-engine'
        };
      }

      this.status = 'ready';
      return this.activeNudge;
    }

    // Scenario B: Test Case Failures
    const failingTest = testCaseResults.find(t => !t.passed);
    if (failingTest) {
      misconceptionStore.recordError('AssertionFailure', { message: 'Output mismatch in test cases' });
      this.status = 'testing_hypothesis';

      const diff = computeOutputDiff(failingTest.expectedOutput, failingTest.actualOutput);

      try {
        const logicHint = await generatePracticeLogicHint({
          problemTitle,
          problemDescription,
          code,
          testCase: failingTest,
          expectedOutput: failingTest.expectedOutput,
          actualOutput: failingTest.actualOutput,
          hintLevel: level
        });

        let clue = logicHint.hint;
        if (diff.hasExtraPrefix) {
          clue = 'Your output contains the right answer, but has an extra prompt or prefix text in front. In automated tests, use input() with no prompt.';
        } else if (diff.hasCaseMismatch) {
          clue = 'Notice that the letter casing differs between what was printed and what was expected (e.g. uppercase vs lowercase).';
        }

        this.activeNudge = {
          type: 'logic_failure',
          category: 'Test Assertion',
          diagnosis: logicHint.logicDiagnosis || 'The output does not match the expected specification.',
          socraticClue: sanitizeSocraticHint(clue),
          actionIdea: sanitizeSocraticHint(logicHint.fixIdea || 'Trace through the branch conditions.'),
          level,
          source: logicHint.source || 'symbolic-engine',
          failingInput: failingTest.input
        };
      } catch (err) {
        this.activeNudge = {
          type: 'logic_failure',
          category: 'Test Assertion',
          diagnosis: 'Test case output differs from expectation.',
          socraticClue: 'Walk through the code by hand with the failing test input.',
          actionIdea: 'Check boundary if-conditions.',
          level,
          source: 'symbolic-engine'
        };
      }

      this.status = 'ready';
      return this.activeNudge;
    }

    // Scenario C: Code passed all tests or is idle
    misconceptionStore.recordSuccess();
    this.activeNudge = {
      type: 'success',
      category: 'Code Cleanliness',
      diagnosis: ast.codeSmells.length > 0
        ? 'All tests pass, but ByteAgent detected potential code improvements.'
        : 'All test cases passed cleanly! Excellent problem solving.',
      socraticClue: ast.codeSmells.length > 0
        ? ast.codeSmells[0].message
        : 'Can you optimize the space or time complexity further, or test an extreme edge case?',
      actionIdea: 'Try the Edge-Case Prediction Challenge to test your algorithm against boundary inputs.',
      level: 1,
      source: 'symbolic-engine'
    };

    this.status = 'ready';
    return this.activeNudge;
  }

  /**
   * Generates an Edge-Case Prediction Challenge
   */
  generatePrediction(code = null, problemTitle = null) {
    const targetCode = code || this.lastObservation?.code || '';
    const targetTitle = problemTitle || this.lastObservation?.problemTitle || '';

    const challenges = FuzzGeneratorTool.generateEdgeCases(targetCode, targetTitle);
    this.activePrediction = challenges[0] || null;
    return this.activePrediction;
  }

  /**
   * Submits a student's answer to a prediction challenge
   */
  submitPredictionAnswer(selectedOptionId) {
    if (!this.activePrediction) return null;
    const isCorrect = selectedOptionId === this.activePrediction.correctId;
    const result = misconceptionStore.recordPredictionResult(
      this.activePrediction.id,
      isCorrect,
      this.activePrediction.category
    );

    return {
      isCorrect,
      explanation: this.activePrediction.explanation,
      streak: result.streak,
      highestStreak: result.highestStreak,
      totalCorrect: result.totalCorrect,
      totalAttempted: result.totalAttempted
    };
  }

  /**
   * Native Web Speech API Voice Narrator
   * Reads code explanation aloud line-by-line without any cloud TTS costs
   */
  speakWalkthrough(code, onProgress = null) {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      return { supported: false };
    }

    window.speechSynthesis.cancel();

    const lines = (code || '').split('\n').filter(l => l.trim() && !l.trim().startsWith('#'));
    const narrationText = lines.slice(0, 8).map((line, i) => {
      const clean = line.trim();
      if (clean.startsWith('def ')) return 'Line ' + (i + 1) + ' defines a function: ' + clean.replace(/[:()]/g, ' ') + '.';
      if (clean.startsWith('if ')) return 'Line ' + (i + 1) + ' checks condition: ' + clean.replace(/[:()]/g, ' ') + '.';
      if (clean.startsWith('elif ')) return 'Line ' + (i + 1) + ' checks alternate condition: ' + clean.replace(/[:()]/g, ' ') + '.';
      if (clean.startsWith('else:')) return 'Line ' + (i + 1) + ' is the fallback else branch.';
      if (clean.startsWith('for ')) return 'Line ' + (i + 1) + ' iterates through sequence: ' + clean.replace(/[:()]/g, ' ') + '.';
      if (clean.startsWith('while ')) return 'Line ' + (i + 1) + ' runs a while loop.';
      if (clean.startsWith('return ')) return 'Line ' + (i + 1) + ' returns the calculated result.';
      if (clean.startsWith('print(')) return 'Line ' + (i + 1) + ' prints output to the terminal.';
      return 'Line ' + (i + 1) + ': ' + clean + '.';
    }).join(' ');

    const utterance = new SpeechSynthesisUtterance(narrationText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      if (onProgress) onProgress({ status: 'ended' });
    };

    utterance.onerror = () => {
      if (onProgress) onProgress({ status: 'error' });
    };

    this.speechUtterance = utterance;
    window.speechSynthesis.speak(utterance);
    if (onProgress) onProgress({ status: 'speaking' });

    return { supported: true, status: 'speaking' };
  }

  stopSpeaking() {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }
}

export const byteAgent = new ByteAgent();
