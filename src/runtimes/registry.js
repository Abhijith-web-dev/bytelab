import { pythonRuntime } from './python/pythonRuntime.js';
import { jsRuntime } from './javascript/jsRuntime.js';

const RUNTIMES = {
  python: pythonRuntime,
  javascript: jsRuntime
};

export function getRuntime(languageId = 'python') {
  const runtime = RUNTIMES[languageId];
  if (!runtime) {
    console.warn(`Runtime for language '${languageId}' not found. Defaulting to Python.`);
    return pythonRuntime;
  }
  return runtime;
}

export function registerRuntime(languageId, runtimeInstance) {
  RUNTIMES[languageId] = runtimeInstance;
}
