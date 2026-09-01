import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
  updateProfile,
  signInAnonymously
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from './config.js';
import { storage } from '../storage/localStorage.js';

const DEMO_USER_KEY = 'demo_user';

export const authService = {
  onAuthChange(callback) {
    if (!isFirebaseConfigured || !auth) {
      const demoUser = storage.get(DEMO_USER_KEY, null);
      callback(demoUser);
      return () => {};
    }

    return onAuthStateChanged(auth, (user) => {
      if (user) {
        callback({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email?.split('@')[0] || 'Student',
          isAnonymous: user.isAnonymous
        });
      } else {
        callback(null);
      }
    });
  },

  async login(email, password) {
    if (!isFirebaseConfigured || !auth) {
      const user = {
        uid: 'user_' + btoa(email).replace(/=/g, '').substring(0, 10),
        email,
        displayName: email.split('@')[0],
        isAnonymous: false
      };
      storage.set(DEMO_USER_KEY, user);
      return user;
    }

    const cred = await signInWithEmailAndPassword(auth, email, password);
    return {
      uid: cred.user.uid,
      email: cred.user.email,
      displayName: cred.user.displayName || email.split('@')[0]
    };
  },

  async register(email, password, displayName) {
    if (!isFirebaseConfigured || !auth) {
      const user = {
        uid: 'user_' + btoa(email).replace(/=/g, '').substring(0, 10),
        email,
        displayName: displayName || email.split('@')[0],
        isAnonymous: false
      };
      storage.set(DEMO_USER_KEY, user);
      return user;
    }

    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(cred.user, { displayName });
    }
    return {
      uid: cred.user.uid,
      email: cred.user.email,
      displayName: displayName || email.split('@')[0]
    };
  },

  async loginAsGuest() {
    if (!isFirebaseConfigured || !auth) {
      const user = {
        uid: 'guest_' + Math.random().toString(36).substring(2, 9),
        email: null,
        displayName: 'Guest Student',
        isAnonymous: true
      };
      storage.set(DEMO_USER_KEY, user);
      return user;
    }

    const cred = await signInAnonymously(auth);
    return {
      uid: cred.user.uid,
      email: null,
      displayName: 'Guest Student',
      isAnonymous: true
    };
  },

  async logout() {
    storage.remove(DEMO_USER_KEY);
    if (isFirebaseConfigured && auth) {
      await fbSignOut(auth);
    }
  }
};
