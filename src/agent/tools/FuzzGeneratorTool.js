/**
 * Edge-Case Fuzz Generator Tool (100% Client-Side)
 * Autonomously synthesizes boundary test inputs and predictive learning challenges.
 */

export class FuzzGeneratorTool {
  /**
   * Generates edge cases tailored to the student's code and problem domain.
   */
  static generateEdgeCases(code = '', problemTitle = '') {
    const codeLower = (code || '').toLowerCase();
    const titleLower = (problemTitle || '').toLowerCase();

    const challenges = [];

    // 1. Division / Average detection: check for 0 boundary
    if (codeLower.includes('/') || codeLower.includes('average') || titleLower.includes('average')) {
      challenges.push({
        id: 'fuzz_zero_divisor',
        category: 'Boundary Math',
        title: 'Zero Divisor Prediction',
        question: 'If the input contains 0 or an empty count, what will happen at the division step?',
        options: [
          { id: 'A', text: 'The program will calculate 0.0 safely' },
          { id: 'B', text: 'Python will raise ZeroDivisionError and crash' },
          { id: 'C', text: 'Python will return float("inf")' }
        ],
        correctId: 'B',
        suggestedInput: '0',
        explanation: 'In Python, dividing by 0 immediately raises ZeroDivisionError unless guarded by an if-check (e.g. if count > 0).'
      });
    }

    // 2. Negative Number / Conditionals boundary
    if (codeLower.includes('>=') || codeLower.includes('<=') || codeLower.includes('mark') || codeLower.includes('score')) {
      challenges.push({
        id: 'fuzz_negative_boundary',
        category: 'Boundary Logic',
        title: 'Negative Input Prediction',
        question: 'What is the predicted output if a negative mark like -5 or an extreme mark like 105 is entered?',
        options: [
          { id: 'A', text: 'It will fall into the lowest grade bracket (e.g. "F")' },
          { id: 'B', text: 'It will raise a ValueError' },
          { id: 'C', text: 'It will output an Invalid Input message' }
        ],
        correctId: 'A',
        suggestedInput: '-5',
        explanation: 'Unless explicit bounds checks (0 <= mark <= 100) are added, negative numbers pass through standard elif ladders into the final else branch.'
      });
    }

    // 3. Empty List / Collection boundary
    if (codeLower.includes('len(') || codeLower.includes('[0]') || codeLower.includes('.append(')) {
      challenges.push({
        id: 'fuzz_empty_collection',
        category: 'Data Structures',
        title: 'Empty Sequence Prediction',
        question: 'What happens if the function receives an empty sequence [] or ""?',
        options: [
          { id: 'A', text: 'The loop finishes immediately without iterating' },
          { id: 'B', text: 'Attempting [0] raises IndexError: list index out of range' },
          { id: 'C', text: 'Python defaults to None' }
        ],
        correctId: codeLower.includes('[0]') ? 'B' : 'A',
        suggestedInput: '[]',
        explanation: codeLower.includes('[0]')
          ? 'Accessing index [0] on an empty list throws IndexError because index 0 does not exist.'
          : 'A for-loop over an empty collection runs 0 iterations and terminates cleanly.'
      });
    }

    // 4. Default General Fallback Challenge
    if (challenges.length === 0) {
      challenges.push({
        id: 'fuzz_string_types',
        category: 'Type Safety',
        title: 'String vs Integer Input Prediction',
        question: 'In Python, what is the type of the value returned directly by input() before any casting?',
        options: [
          { id: 'A', text: 'int if only digits are typed, str otherwise' },
          { id: 'B', text: 'Always a str (string)' },
          { id: 'C', text: 'Dynamic type inference depending on input' }
        ],
        correctId: 'B',
        suggestedInput: '42',
        explanation: 'In Python 3, input() always returns a string (str). It must be explicitly converted using int() or float() to perform arithmetic.'
      });
    }

    return challenges;
  }
}
