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

  // Update Leaderboard Entry
  async updateLeaderboardEntry(userId, entry) {
    if (!userId || userId.startsWith('guest_')) return;

    if (!isFirebaseConfigured || !db) {
      const lb = storage.get('mock_leaderboard', []);
      const existingIdx = lb.findIndex(item => item.userId === userId);
      const updatedEntry = {
        userId,
        displayName: entry.displayName || 'Student',
        score: entry.score || 0,
        completedUnits: entry.completedUnits || 0,
        completedChapters: entry.completedChapters || 0,
        updatedAt: Date.now()
      };

      if (existingIdx >= 0) {
        lb[existingIdx] = updatedEntry;
      } else {
        lb.push(updatedEntry);
      }
      lb.sort((a, b) => b.score - a.score);
      storage.set('mock_leaderboard', lb);
      return;
    }

    try {
      const entryRef = doc(db, 'leaderboards', entry.courseId || 'python-programming', 'entries', userId);
      await setDoc(entryRef, {
        userId,
        displayName: entry.displayName || 'Student',
        score: entry.score,
        completedUnits: entry.completedUnits,
        completedChapters: entry.completedChapters,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (err) {
      console.warn('Firestore update leaderboard error:', err);
    }
  },

  // Get Top Leaderboard
  async getLeaderboard(courseId = 'python-programming', limitCount = 20) {
    if (!isFirebaseConfigured || !db) {
      const defaultMock = [
        { userId: 'u-1', displayName: 'Aravind S.', score: 1480, completedUnits: 5, completedChapters: 27, rank: 1 },
        { userId: 'u-2', displayName: 'Deepika R.', score: 1390, completedUnits: 5, completedChapters: 25, rank: 2 },
        { userId: 'u-3', displayName: 'Karthik N.', score: 1250, completedUnits: 4, completedChapters: 22, rank: 3 },
        { userId: 'u-4', displayName: 'Meera V.', score: 1120, completedUnits: 4, completedChapters: 19, rank: 4 },
        { userId: 'u-5', displayName: 'Rahul K.', score: 980, completedUnits: 3, completedChapters: 16, rank: 5 },
        { userId: 'u-6', displayName: 'Sneha M.', score: 840, completedUnits: 3, completedChapters: 13, rank: 6 },
        { userId: 'u-7', displayName: 'Vikram B.', score: 710, completedUnits: 2, completedChapters: 10, rank: 7 },
        { userId: 'u-8', displayName: 'Ananya G.', score: 560, completedUnits: 2, completedChapters: 8, rank: 8 }
      ];
      const customLb = storage.get('mock_leaderboard', []);
      const merged = [...customLb];
      defaultMock.forEach(item => {
        if (!merged.find(m => m.userId === item.userId)) {
          merged.push(item);
        }
      });
      merged.sort((a, b) => b.score - a.score);
      return merged.slice(0, limitCount).map((entry, idx) => ({ ...entry, rank: idx + 1 }));
    }

    try {
      const q = query(
        collection(db, 'leaderboards', courseId, 'entries'),
        orderBy('score', 'desc'),
        limit(limitCount)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((docSnap, index) => ({
        id: docSnap.id,
        rank: index + 1,
        ...docSnap.data()
      }));
    } catch (err) {
      console.warn('Firestore fetch leaderboard error:', err);
      return [];
    }
  }
};
