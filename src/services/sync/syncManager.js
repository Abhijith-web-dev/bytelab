import { firestoreService } from '../firebase/firestore.js';
import { storage } from '../storage/localStorage.js';

const SYNC_QUEUE_KEY = 'sync_queue';

class SyncManager {
  constructor() {
    this.isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
    this.isSyncing = false;

    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        this.isOnline = true;
        this.flushQueue();
      });
      window.addEventListener('offline', () => {
        this.isOnline = false;
      });
    }
  }

  enqueue(operation) {
    const queue = storage.get(SYNC_QUEUE_KEY, []);
    queue.push({
      ...operation,
      queuedAt: Date.now()
    });
    storage.set(SYNC_QUEUE_KEY, queue);

    if (this.isOnline) {
      this.flushQueue();
    }
  }

  async flushQueue() {
    if (this.isSyncing || !this.isOnline) return;
    this.isSyncing = true;

    try {
      const queue = storage.get(SYNC_QUEUE_KEY, []);
      if (!queue.length) return;

      const remaining = [];
      for (const op of queue) {
        try {
          if (op.type === 'SAVE_PROGRESS') {
            await firestoreService.saveUserProgress(op.userId, op.data);
          } else if (op.type === 'RECORD_TEST') {
            await firestoreService.recordTestAttempt(op.userId, op.data);
          } else if (op.type === 'UPDATE_LEADERBOARD') {
            await firestoreService.updateLeaderboardEntry(op.userId, op.data);
          }
        } catch (err) {
          console.warn('Sync failed for item, keeping in queue:', err);
          remaining.push(op);
        }
      }

      storage.set(SYNC_QUEUE_KEY, remaining);
    } finally {
      this.isSyncing = false;
    }
  }
}

export const syncManager = new SyncManager();
