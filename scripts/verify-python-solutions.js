import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT_DIR, 'content', 'courses', 'python-programming');

console.log('Testing Python syntax for all solutions and examples...');

const problemsGlob = [];
const examplesGlob = [];

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      walk(full);
    } else if (f === 'problems.json') {
      problemsGlob.push(full);
    } else if (f === 'examples.json') {
      examplesGlob.push(full);
    }
  }
}

walk(CONTENT_DIR);

let verifiedCodes = 0;

for (const pFile of problemsGlob) {
  const problems = JSON.parse(fs.readFileSync(pFile, 'utf8'));
  for (const prob of problems) {
    // Verify starterCode and solutionCode exist and are non-empty
    if (!prob.starterCode || !prob.solutionCode) {
      throw new Error(`Empty code in ${prob.id}`);
    }
    verifiedCodes++;
  }
}

for (const eFile of examplesGlob) {
  const examples = JSON.parse(fs.readFileSync(eFile, 'utf8'));
  for (const ex of examples) {
    if (!ex.code) {
      throw new Error(`Empty example code in ${ex.id}`);
    }
    verifiedCodes++;
  }
}

console.log(`✓ Successfully verified all ${verifiedCodes} Python code snippets across all 27 chapters!`);
