/**
 * ByteLab Plain-English Python Translator & Physical Concept Metaphors
 * Translates intimidating Python syntax into clear, conversational human explanations
 * specifically designed for non-CS students (Mechanical, Civil, EEE, Biotech, etc.).
 */

export const PHYSICAL_METAPHORS = [
  {
    id: 'variable',
    concept: 'Variables',
    jargon: 'Memory Address / State Allocation',
    plainTitle: 'The Labelled Storage Box',
    icon: '📦',
    summary: 'A variable is just a cardboard storage box with a name tag written on it. When you assign something, you drop it inside the box.',
    everydayExample: "mark = 85 means: take a box named 'mark', and drop the number 85 inside. If you later write mark = 90, the 85 is replaced with 90.",
    rule: "The name of the box is always on the left, and what goes inside is on the right of the '=' sign."
  },
  {
    id: 'list',
    concept: 'Lists & Arrays',
    jargon: 'Contiguous Indexed Array Buffer',
    plainTitle: 'The Numbered Medicine Pill Organizer',
    icon: '💊',
    summary: 'A list is like a weekly medicine box with numbered slots. In computer science, counting starts at slot 0 (not 1)!',
    everydayExample: 'prices = [50, 20, 100] gives you slot 0 = 50, slot 1 = 20, and slot 2 = 100.',
    rule: 'Always remember: prices[0] is the 1st item, prices[1] is the 2nd item.'
  },
  {
    id: 'conditional',
    concept: 'If / Elif / Else',
    jargon: 'Conditional Branching & Predicate Evaluation',
    plainTitle: 'The Railway Track Switch',
    icon: '🔀',
    summary: 'Like a train arriving at a track switch. If the signal is green (True), the train takes Track A; otherwise, it takes Track B.',
    everydayExample: 'if speed > 80: switch to warning track. else: stay on normal cruising track.',
    rule: 'Python looks at conditions from top to bottom. As soon as ONE condition is True, it runs that block and skips the rest.'
  },
  {
    id: 'loop',
    concept: 'For & While Loops',
    jargon: 'Deterministic & Non-Deterministic Iteration',
    plainTitle: 'The Factory Conveyor Belt',
    icon: '🏭',
    summary: 'Think of an automated assembly line. Each item moves in front of a robotic stamp, the stamp presses it, and the belt moves to the next item.',
    everydayExample: 'for item in carton: inspect each egg one-by-one until the carton is empty.',
    rule: 'Indent all actions that should repeat on the conveyor belt with 4 spaces.'
  },
  {
    id: 'function',
    concept: 'Functions (def)',
    jargon: 'Subroutine Routine & Activation Frame',
    plainTitle: 'The Kitchen Juice Blender',
    icon: '🥤',
    summary: 'A function is a kitchen appliance with a recipe. You put in raw ingredients (arguments), it blends them, and pours out the fresh juice (return value).',
    everydayExample: 'def make_juice(fruit, sugar): blend ingredients, return juice_glass.',
    rule: 'Define the recipe once with def, then use it as many times as you want!'
  },
  {
    id: 'io',
    concept: 'Input & Print',
    jargon: 'Standard Input (stdin) & Standard Output (stdout)',
    plainTitle: 'The Microphone & Projector Screen',
    icon: '🎤',
    summary: "input() is like handing a microphone to the user and waiting for them to speak. print() is like displaying text on a large projector screen.",
    everydayExample: "name = input() listens for the user's voice; print('Hello', name) beams it onto the classroom projector.",
    rule: 'input() always receives text. If you need a number for math, wrap it in int(input()).'
  }
];

export function translatePythonLine(rawLine = '') {
  const line = String(rawLine || '').trim();
  if (!line) return null;

  // Ignore pure comments
  if (line.startsWith('#')) {
    return {
      type: 'comment',
      plainEnglish: 'Note: ' + line.slice(1).trim(),
      icon: '📝'
    };
  }

  // 1. Variable Assignment with int(input())
  const intInputMatch = line.match(/^([a-zA-Z_]\w*)\s*=\s*int\s*\(\s*input\s*\((.*?)\)\s*\)/);
  if (intInputMatch) {
    const varName = intInputMatch[1];
    const prompt = intInputMatch[2].replace(/['"]/g, '').trim();
    return {
      type: 'input_int',
      icon: '📥',
      plainEnglish: prompt
        ? `Ask the user '${prompt}', convert their response to a whole number, and store it in box '${varName}'.`
        : `Read a whole number from the keyboard and save it in a box named '${varName}'.`
    };
  }

  // 2. Variable Assignment with float(input())
  const floatInputMatch = line.match(/^([a-zA-Z_]\w*)\s*=\s*float\s*\(\s*input\s*\((.*?)\)\s*\)/);
  if (floatInputMatch) {
    const varName = floatInputMatch[1];
    const prompt = floatInputMatch[2].replace(/['"]/g, '').trim();
    return {
      type: 'input_float',
      icon: '📥',
      plainEnglish: prompt
        ? `Ask the user '${prompt}', convert their response to a decimal number, and store it in '${varName}'.`
        : `Read a decimal number from the user and save it in box '${varName}'.`
    };
  }

  // 3. Simple input()
  const strInputMatch = line.match(/^([a-zA-Z_]\w*)\s*=\s*input\s*\((.*?)\)/);
  if (strInputMatch) {
    const varName = strInputMatch[1];
    const prompt = strInputMatch[2].replace(/['"]/g, '').trim();
    return {
      type: 'input_str',
      icon: '⌨️',
      plainEnglish: prompt
        ? `Show prompt '${prompt}', wait for the user to type text, and store it in '${varName}'.`
        : `Wait for the user to type text on the keyboard and store it in '${varName}'.`
    };
  }

  // 4. Print statements
  const printMatch = line.match(/^print\s*\((.*)\)/);
  if (printMatch) {
    const inner = printMatch[1].trim();
    return {
      type: 'print',
      icon: '📢',
      plainEnglish: `Display '${inner}' on the screen output window.`
    };
  }

  // 5. If conditional
  const ifMatch = line.match(/^if\s+(.*?):/);
  if (ifMatch) {
    const condition = ifMatch[1].trim();
    return {
      type: 'if',
      icon: '🔀',
      plainEnglish: `Check if (${condition}). If this is TRUE, step inside and run the indented actions below.`
    };
  }

  // 6. Elif conditional
  const elifMatch = line.match(/^elif\s+(.*?):/);
  if (elifMatch) {
    const condition = elifMatch[1].trim();
    return {
      type: 'elif',
      icon: '🔀',
      plainEnglish: `Otherwise, check if (${condition}). If true, run these indented actions instead.`
    };
  }

  // 7. Else branch
  if (/^else\s*:/.test(line)) {
    return {
      type: 'else',
      icon: '🔀',
      plainEnglish: 'If NONE of the above checks matched, run this default backup block.'
    };
  }

  // 8. For loop with range
  const forRangeMatch = line.match(/^for\s+([a-zA-Z_]\w*)\s+in\s+range\s*\((.*?)\):/);
  if (forRangeMatch) {
    const varName = forRangeMatch[1];
    const args = forRangeMatch[2].split(',').map(s => s.trim());
    let rangeDesc = '';
    if (args.length === 1) {
      rangeDesc = `${args[0]} times, counting '${varName}' from 0 up to ${parseInt(args[0], 10) - 1 || args[0] + ' - 1'}`;
    } else if (args.length === 2) {
      rangeDesc = `from ${args[0]} up to ${parseInt(args[1], 10) - 1 || args[1] + ' - 1'}`;
    } else {
      rangeDesc = `from ${args[0]} up to ${args[1]} stepping by ${args[2]}`;
    }
    return {
      type: 'for_loop',
      icon: '🔁',
      plainEnglish: `Start a loop: repeat the indented steps ${rangeDesc}.`
    };
  }

  // 9. For loop over collection
  const forCollectionMatch = line.match(/^for\s+([a-zA-Z_]\w*)\s+in\s+([a-zA-Z_]\w*):/);
  if (forCollectionMatch) {
    return {
      type: 'for_collection',
      icon: '🔁',
      plainEnglish: `Conveyor belt loop: pick each item from '${forCollectionMatch[2]}' one-by-one as '${forCollectionMatch[1]}' and process it.`
    };
  }

  // 10. While loop
  const whileMatch = line.match(/^while\s+(.*?):/);
  if (whileMatch) {
    return {
      type: 'while_loop',
      icon: '🔄',
      plainEnglish: `Keep repeating the actions below as long as (${whileMatch[1].trim()}) remains TRUE.`
    };
  }

  // 11. Function definition
  const defMatch = line.match(/^def\s+([a-zA-Z_]\w*)\s*\((.*?)\):/);
  if (defMatch) {
    const fnName = defMatch[1];
    const params = defMatch[2].trim();
    return {
      type: 'def',
      icon: '🧩',
      plainEnglish: params
        ? `Define a reusable recipe named '${fnName}' that expects ingredients: [${params}].`
        : `Define a reusable recipe named '${fnName}' with no input ingredients.`
    };
  }

  // 12. Return statement
  const returnMatch = line.match(/^return(\s+.*)?$/);
  if (returnMatch) {
    const val = (returnMatch[1] || '').trim();
    return {
      type: 'return',
      icon: '📤',
      plainEnglish: val
        ? `Finish the recipe and send back the result '${val}' to whoever called it.`
        : 'Exit the function and return back.'
    };
  }

  // 13. Import statement
  const importMatch = line.match(/^import\s+([a-zA-Z_]\w*)/);
  if (importMatch) {
    return {
      type: 'import',
      icon: '📦',
      plainEnglish: `Load Python's built-in '${importMatch[1]}' toolbox to give us extra specialized tools.`
    };
  }

  // 14. Augmented arithmetic (+=, -=, *=, /=)
  const augMatch = line.match(/^([a-zA-Z_]\w*)\s*([\+\-\*\/]=)\s*(.*)/);
  if (augMatch) {
    const opNames = { '+=': 'Add', '-=': 'Subtract', '*=': 'Multiply', '/=': 'Divide' };
    const op = opNames[augMatch[2]] || 'Update';
    return {
      type: 'math_aug',
      icon: '🧮',
      plainEnglish: `${op} ${augMatch[3].trim()} into box '${augMatch[1]}' and update its value.`
    };
  }

  // 15. Standard assignment
  const assignMatch = line.match(/^([a-zA-Z_]\w*)\s*=\s*(.*)/);
  if (assignMatch) {
    return {
      type: 'assignment',
      icon: '🏷️',
      plainEnglish: `Store the value '${assignMatch[2].trim()}' into the box labelled '${assignMatch[1]}'.`
    };
  }

  // Fallback generic line
  return {
    type: 'generic',
    icon: '⚙️',
    plainEnglish: `Execute statement: ${line}`
  };
}

export function translatePythonCode(sourceCode = '') {
  if (!sourceCode || typeof sourceCode !== 'string') return [];

  const rawLines = sourceCode.split('\n');
  const translations = [];

  rawLines.forEach((rawLine, idx) => {
    const lineNum = idx + 1;
    const trimmed = rawLine.trim();
    if (!trimmed) {
      translations.push({
        lineNumber: lineNum,
        rawLine,
        isEmpty: true,
        translation: null
      });
      return;
    }

    const trans = translatePythonLine(trimmed);
    translations.push({
      lineNumber: lineNum,
      rawLine,
      isEmpty: false,
      translation: trans
    });
  });

  return translations;
}
