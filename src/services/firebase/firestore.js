import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from './config.js';
import { storage } from '../storage/localStorage.js';

const REAL_LEADERBOARD_KEY = 'real_leaderboard_entries';
let isFirestorePermissionWarningMuted = false;

export const firestoreService = {
  // Sync full user progress to Firestore
  async saveUserProgress(userId, progressData) {
    if (!userId || userId === 'guest' || userId.startsWith('guest_')) return;

    // Always keep offline/local progress updated
    storage.set(`remote_progress:${userId}`, progressData);

    const currentUser = auth?.currentUser;
    // Only attempt Firestore write if user is authenticated and matches userId
    if (!isFirebaseConfigured || !db || !currentUser || currentUser.isAnonymous || currentUser.uid !== userId) {
      return;
    }

    try {
      const userRef = doc(db, 'users', userId, 'courseProgress', progressData.courseId || 'python-programming');
      await setDoc(userRef, {
        ...progressData,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (err) {
      if (err?.code === 'permission-denied' || err?.message?.includes('Missing or insufficient permissions')) {
        if (!isFirestorePermissionWarningMuted) {
          console.info('[ByteLab Firestore] Running in client-side storage mode. Progress saved locally.');
          isFirestorePermissionWarningMuted = true;
        }
      } else {
        console.warn('Firestore save progress note:', err.message || err);
      }
    }
  },

  // Record a test attempt
  async recordTestAttempt(userId, attemptData) {
    if (!userId) return;

    const attempts = storage.get(`test_attempts:${userId}`, []);
    attempts.unshift({ ...attemptData, id: `att_${Date.now()}`, attemptedAt: Date.now() });
    storage.set(`test_attempts:${userId}`, attempts);

    const currentUser = auth?.currentUser;
    if (!isFirebaseConfigured || !db || !currentUser || currentUser.isAnonymous || currentUser.uid !== userId) {
      return;
    }

    try {
      const attemptRef = doc(collection(db, 'users', userId, 'testAttempts'));
      await setDoc(attemptRef, {
        ...attemptData,
        submittedAt: serverTimestamp()
      });
    } catch (err) {
      if (err?.code !== 'permission-denied' && !err?.message?.includes('Missing or insufficient permissions')) {
        console.warn('Firestore record test note:', err.message || err);
      }
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
    const focusMinutes = Number(entry.focusMinutes || 0);
    const concentrationScore = Number(entry.concentrationScore || 0);
    const cleanRunCount = Number(entry.cleanRunCount || 0);

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
      focusMinutes,
      concentrationScore,
      cleanRunCount,
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

    const currentUser = auth?.currentUser;
    if (isFirebaseConfigured && db && currentUser && !currentUser.isAnonymous && currentUser.uid === userId) {
      try {
        const entryRef = doc(db, 'leaderboards', entry.courseId || 'python-programming', 'entries', userId);
        await setDoc(entryRef, {
          ...cleanEntry,
          updatedAt: serverTimestamp()
        }, { merge: true });
      } catch (err) {
        if (err?.code !== 'permission-denied' && !err?.message?.includes('Missing or insufficient permissions')) {
          console.warn('Firestore update leaderboard note:', err.message || err);
        }
      }
    }
  },

  // Fetch strictly verified leaderboard data from Firestore and local cache
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
        if (err?.code !== 'permission-denied' && !err?.message?.includes('Missing or insufficient permissions')) {
          console.info('Firestore leaderboard online sync note (using local cache):', err.message || err);
        }
      }
    }

    // Blend live Firestore entries and real local student sessions only (strictly verified real students)
    const combinedMap = new Map();

    // 1. Real local entries (filter out any legacy fake cohort keys)
    const rawLocalEntries = storage.get(REAL_LEADERBOARD_KEY, []);
    const localEntries = Array.isArray(rawLocalEntries)
      ? rawLocalEntries.filter(item => item?.userId && !item.userId.startsWith('cohort_top_'))
      : [];

    localEntries.forEach(item => {
      if (item.userId) {
        combinedMap.set(item.userId, {
          ...item,
          points: item.points || item.score || 0
        });
      }
    });

    // 2. Live Firestore entries (verified remote students)
    liveEntries.forEach(item => {
      if (item.userId && !item.userId.startsWith('cohort_top_')) {
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
  },

  // Real-time live subscription with strictly verified real student data
  subscribeLeaderboard(courseId = 'python-programming', onUpdate, onError, limitCount = 50) {
    const mergeAndNotify = (liveEntries = []) => {
      const combinedMap = new Map();

      // 1. Real local student entries (filter out any legacy fake cohort keys)
      const rawLocalEntries = storage.get(REAL_LEADERBOARD_KEY, []);
      const localEntries = Array.isArray(rawLocalEntries)
        ? rawLocalEntries.filter(item => item?.userId && !item.userId.startsWith('cohort_top_'))
        : [];

      localEntries.forEach(item => {
        if (item.userId) {
          combinedMap.set(item.userId, {
            ...item,
            points: item.points || item.score || 0
          });
        }
      });

      // 2. Live Firestore entries
      liveEntries.forEach(item => {
        if (item.userId && !item.userId.startsWith('cohort_top_')) {
          combinedMap.set(item.userId, {
            ...item,
            points: item.points || item.score || 0
          });
        }
      });

      const realSorted = Array.from(combinedMap.values())
        .sort((a, b) => (b.points || b.score || 0) - (a.points || a.score || 0));

      const finalRanked = realSorted.slice(0, limitCount).map((entry, idx) => ({
        ...entry,
        rank: idx + 1
      }));

      if (typeof onUpdate === 'function') {
        onUpdate(finalRanked);
      }
    };

    // Immediately push initial cached real data
    mergeAndNotify([]);

    // If Firebase isn't configured, return no-op unsubscriber
    if (!isFirebaseConfigured || !db) {
      return () => {};
    }

    try {
      const q = query(
        collection(db, 'leaderboards', courseId, 'entries'),
        orderBy('score', 'desc'),
        limit(limitCount)
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const liveEntries = snapshot.docs.map(docSnap => ({
            id: docSnap.id,
            userId: docSnap.id,
            ...docSnap.data()
          }));
          mergeAndNotify(liveEntries);
        },
        (err) => {
          if (err?.code !== 'permission-denied' && !err?.message?.includes('Missing or insufficient permissions')) {
            console.warn('Firestore live leaderboard snapshot note:', err.message || err);
          }
          if (typeof onError === 'function') {
            onError(err);
          }
          // On error, still provide current cached state
          mergeAndNotify([]);
        }
      );

      return unsubscribe;
    } catch (err) {
      console.warn('Failed to subscribe to leaderboard:', err);
      return () => {};
    }
  }
};

