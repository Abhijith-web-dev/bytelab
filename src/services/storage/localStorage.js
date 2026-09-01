const STORAGE_PREFIX = 'bytelab:';

export const storage = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
      return item ? JSON.parse(item) : defaultValue;
    } catch (err) {
      console.warn(`LocalStorage read error for ${key}:`, err);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
      return true;
    } catch (err) {
      console.warn(`LocalStorage write error for ${key}:`, err);
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
      return true;
    } catch (err) {
      console.warn(`LocalStorage remove error for ${key}:`, err);
      return false;
    }
  }
};

// Specialized Draft Storage
export const draftStorage = {
  saveDraft(problemId, code) {
    if (!problemId) return;
    storage.set(`draft:${problemId}`, {
      code,
      savedAt: Date.now()
    });
  },

  getDraft(problemId) {
    if (!problemId) return null;
    const draft = storage.get(`draft:${problemId}`);
    return draft?.code || null;
  },

  clearDraft(problemId) {
    if (!problemId) return;
    storage.remove(`draft:${problemId}`);
  }
};

// Specialized Progress Storage Mirror
export const progressStorage = {
  getLocalProgress(userId = 'guest') {
    return storage.get(`progress:${userId}`, {
      completedLessons: [],
      completedChapters: [],
      completedUnits: [],
      solvedProblems: {},
      testScores: {},
      streakDays: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      totalPoints: 0
    });
  },

  saveLocalProgress(userId = 'guest', progressData) {
    return storage.set(`progress:${userId}`, {
      ...progressData,
      updatedAt: Date.now()
    });
  }
};
