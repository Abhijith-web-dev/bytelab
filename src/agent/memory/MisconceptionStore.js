import { storage } from '../../services/storage/localStorage.js';

const MEMORY_KEY = 'agent_misconception_memory';
const PREDICTIONS_KEY = 'agent_predictions_memory';

const DEFAULT_PROFILE = {
  totalErrors: 0,
  errorFrequencies: {}, // { TypeError: 4, IndexError: 2, etc. }
  conceptWeaknesses: {}, // { 'indexing': 3, 'recursion_base_case': 2 }
  consecutiveFailures: 0,
  recentErrors: [],
  lastUpdated: null
};

const DEFAULT_PREDICTIONS = {
  totalAttempted: 0,
  totalCorrect: 0,
  streak: 0,
  highestStreak: 0,
  history: []
};

class MisconceptionStore {
  constructor() {
    this._profile = null;
    this._predictions = null;
  }

  getProfile() {
    if (!this._profile) {
      this._profile = storage.get(MEMORY_KEY, { ...DEFAULT_PROFILE });
    }
    return this._profile;
  }

  getPredictions() {
    if (!this._predictions) {
      this._predictions = storage.get(PREDICTIONS_KEY, { ...DEFAULT_PREDICTIONS });
    }
    return this._predictions;
  }

  recordError(errorType, context = {}) {
    if (!errorType) return;
    const profile = this.getProfile();
    profile.totalErrors += 1;
    profile.consecutiveFailures += 1;

    // Increment error type frequency
    profile.errorFrequencies[errorType] = (profile.errorFrequencies[errorType] || 0) + 1;

    // Detect conceptual domain
    const concept = this._inferConceptFromError(errorType, context);
    if (concept) {
      profile.conceptWeaknesses[concept] = (profile.conceptWeaknesses[concept] || 0) + 1;
    }

    // Keep last 10 errors for short-term working context
    profile.recentErrors.unshift({
      errorType,
      concept,
      timestamp: Date.now(),
      line: context.line || null,
      message: context.message || ''
    });
    if (profile.recentErrors.length > 10) {
      profile.recentErrors.pop();
    }

    profile.lastUpdated = Date.now();
    this._profile = profile;
    storage.set(MEMORY_KEY, profile);
    return profile;
  }

  recordSuccess(concept = null) {
    const profile = this.getProfile();
    profile.consecutiveFailures = 0;
    if (concept && profile.conceptWeaknesses[concept] > 0) {
      // Decrease weakness weight as student demonstrates mastery
      profile.conceptWeaknesses[concept] = Math.max(0, profile.conceptWeaknesses[concept] - 1);
    }
    profile.lastUpdated = Date.now();
    this._profile = profile;
    storage.set(MEMORY_KEY, profile);
    return profile;
  }

  recordPredictionResult(predictionId, isCorrect, concept = 'general') {
    const preds = this.getPredictions();
    preds.totalAttempted += 1;
    if (isCorrect) {
      preds.totalCorrect += 1;
      preds.streak += 1;
      if (preds.streak > preds.highestStreak) {
        preds.highestStreak = preds.streak;
      }
    } else {
      preds.streak = 0;
    }

    preds.history.unshift({
      predictionId,
      isCorrect,
      concept,
      timestamp: Date.now()
    });
    if (preds.history.length > 20) {
      preds.history.pop();
    }

    this._predictions = preds;
    storage.set(PREDICTIONS_KEY, preds);
    return preds;
  }

  getTopWeakness() {
    const profile = this.getProfile();
    const entries = Object.entries(profile.conceptWeaknesses);
    if (entries.length === 0) return null;
    entries.sort((a, b) => b[1] - a[1]);
    return entries[0][1] >= 2 ? entries[0][0] : null;
  }

  clear() {
    this._profile = { ...DEFAULT_PROFILE };
    this._predictions = { ...DEFAULT_PREDICTIONS };
    storage.remove(MEMORY_KEY);
    storage.remove(PREDICTIONS_KEY);
  }

  _inferConceptFromError(errorType, context = {}) {
    const msg = (context.message || '').toLowerCase();
    if (errorType === 'IndexError') return 'list_index_bounds';
    if (errorType === 'KeyError') return 'dictionary_lookup';
    if (errorType === 'TypeError') {
      if (msg.includes('concatenate') || msg.includes('unsupported operand')) return 'type_casting';
      if (msg.includes('not callable')) return 'variable_shadowing';
      return 'data_types';
    }
    if (errorType === 'ZeroDivisionError') return 'boundary_conditions';
    if (errorType === 'RecursionError') return 'recursion_base_case';
    if (errorType === 'IndentationError') return 'python_indentation';
    if (errorType === 'SyntaxError') return 'python_syntax';
    if (errorType === 'NameError') return 'variable_scope_or_typo';
    return null;
  }
}

export const misconceptionStore = new MisconceptionStore();
