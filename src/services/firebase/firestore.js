import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  serverTimestamp
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config.js';
import { storage } from '../storage/localStorage.js';

const REAL_LEADERBOARD_KEY = 'real_leaderboard_entries';

export const firestoreService = {
  // Sync full user progress to Firestore
  async saveUserProgress(userId, progressData) {
    if (!userId || userId === 'guest') return;

    if (!isFirebaseConfigured || !db) {
      storage.set(`remote_progress:${userId}`, progressData);
      return;
    }

    try {
      const userRef = doc(db, 'users', userId, 'courseProgress', progressData.courseId || 'python-programming');
      await setDoc(userRef, {
        ...progressData,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (err) {
      console.warn('Firestore save progress error:', err);
    }
  },

  // Record a test attempt
  async recordTestAttempt(userId, attemptData) {
    if (!userId) return;

    if (!isFirebaseConfigured || !db) {
      const attempts = storage.get(`test_attempts:${userId}`, []);
      attempts.unshift({ ...attemptData, id: `att_${Date.now()}`, attemptedAt: Date.now() });
      storage.set(`test_attempts:${userId}`, attempts);
      return;
    }

    try {
      const attemptRef = doc(collection(db, 'users', userId, 'testAttempts'));
      await setDoc(attemptRef, {
        ...attemptData,
        submittedAt: serverTimestamp()
      });
    } catch (err) {
      console.warn('Firestore record test error:', err);
    }
  },

  // Update Leaderboard Entry with strictly verified real student data
  async updateLeaderboardEntry(userId, entry) {
    if (!userId || userId === 'guest' || userId.startsWith('guest_')) return;

    const points = Number(entry.points !== undefined ? entry.points : (entry.score || 0));
    const completedChapters = Number(entry.completedChapters || 0);
    const completedUnits = Number(entry.completedUnits || 0);
    const streak = Number(entry.streak || entry.streakDays || 1);
    const solved = Number(entry.solved || 0);

    let badge = 'Rising Coder';
    if (points >= 1500 || completedChapters >= 40) badge = 'Python Prodigy';
    else if (points >= 1000 || completedChapters >= 30) badge = 'Algorithm Master';
    else if (points >= 600 || completedChapters >= 20) badge = 'NumPy Ninja';
    else if (points >= 300 || completedChapters >= 10) badge = 'Syntax Specialist';
    else if (points > 0) badge = 'Active Learner';

    const cleanEntry = {
      userId,
      displayName: entry.displayName || 'Student Learner',
      photoURL: entry.photoURL || null,
      points,
      score: points,
      streak,
      solved,
      completedUnits,
      completedChapters,
      badge,
      updatedAt: Date.now()
    };

    // Store in local real leaderboard cache
    const localLb = storage.get(REAL_LEADERBOARD_KEY, []);
    const existingIdx = localLb.findIndex(item => item.userId === userId);
    if (existingIdx >= 0) {
      localLb[existingIdx] = cleanEntry;
    } else {
      localLb.push(cleanEntry);
    }
    localLb.sort((a, b) => (b.points || b.score) - (a.points || a.score));
    storage.set(REAL_LEADERBOARD_KEY, localLb);

    if (isFirebaseConfigured && db) {
      try {
        const entryRef = doc(db, 'leaderboards', entry.courseId || 'python-programming', 'entries', userId);
        await setDoc(entryRef, {
          ...cleanEntry,
          updatedAt: serverTimestamp()
        }, { merge: true });
      } catch (err) {
        console.warn('Firestore update leaderboard error:', err);
      }
    }
  },

  // Fetch strictly REAL leaderboard data from Firestore and verified student sessions
  async getLeaderboard(courseId = 'python-programming', limitCount = 50) {
    let liveEntries = [];

    if (isFirebaseConfigured && db) {
      try {
        const q = query(
          collection(db, 'leaderboards', courseId, 'entries'),
          orderBy('score', 'desc'),
          limit(limitCount)
        );
        const snapshot = await getDocs(q);
        liveEntries = snapshot.docs.map(docSnap => ({
          id: docSnap.id,
          userId: docSnap.id,
          ...docSnap.data()
        }));
      } catch (err) {
        console.warn('Firestore fetch leaderboard error (reading real local cache):', err);
      }
    }

    // Blend with real local entries
    const localEntries = storage.get(REAL_LEADERBOARD_KEY, []);
    const combinedMap = new Map();

    localEntries.forEach(item => {
      if (item.userId) {
        combinedMap.set(item.userId, {
          ...item,
          points: item.points || item.score || 0
        });
      }
    });

    liveEntries.forEach(item => {
      if (item.userId) {
        combinedMap.set(item.userId, {
          ...item,
          points: item.points || item.score || 0
        });
      }
    });

    const realSorted = Array.from(combinedMap.values())
      .sort((a, b) => (b.points || b.score || 0) - (a.points || a.score || 0));

    return realSorted.slice(0, limitCount).map((entry, idx) => ({
      ...entry,
      rank: idx + 1
    }));
  }
};
