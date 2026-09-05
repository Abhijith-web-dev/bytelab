import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
  updateProfile,
  signInAnonymously,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from './config.js';
import { storage } from '../storage/localStorage.js';
import { authCookieManager } from '../storage/cookies.js';
import { trackUserLogin, trackUserSignUp, trackUserSignOut } from './analytics.js';

const DEMO_USER_KEY = 'demo_user';

export function getFriendlyAuthErrorMessage(error) {
  if (!error) return 'An unknown error occurred.';
  const code = error.code || '';
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Invalid email or password. Please verify your credentials and try again.';
    case 'auth/email-already-in-use':
      return 'An account with this email address already exists. Please sign in instead.';
    case 'auth/weak-password':
      return 'Password is too weak. Please use at least 6 characters with letters and numbers.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address format.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in window was closed before completion. Please try again.';
    case 'auth/popup-blocked':
      return 'Sign-in popup was blocked by your browser. Please allow popups for this site.';
    case 'auth/network-request-failed':
      return 'Network connection error. Please check your internet and try again.';
    case 'auth/too-many-requests':
      return 'Too many unsuccessful attempts. Access is temporarily disabled; please reset your password or try again later.';
    default:
      return error.message || 'Authentication operation failed.';
  }
}

async function syncUserProfileToFirestore(user) {
  if (!user || !db || !isFirebaseConfigured || user.isAnonymous) return;
  try {
    const userRef = doc(db, 'users', user.uid);
    await setDoc(
      userRef,
      {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || user.email?.split('@')[0] || 'Student',
        photoURL: user.photoURL || '',
        lastLoginAt: serverTimestamp()
      },
      { merge: true }
    );
  } catch (err) {
    console.warn('Firestore profile sync error:', err);
  }
}

export const authService = {
  onAuthChange(callback) {
    if (!isFirebaseConfigured || !auth) {
      const demoUser = storage.get(DEMO_USER_KEY, null);
      if (demoUser) {
        authCookieManager.setAuthCookies(demoUser, 'demo');
      } else {
        const cookieSession = authCookieManager.getSession();
        if (cookieSession && !cookieSession.isAnonymous) {
          callback(cookieSession);
          return () => {};
        }
      }
      callback(demoUser);
      return () => {};
    }

    try {
      setPersistence(auth, browserLocalPersistence).catch(() => {});
    } catch (e) {}

    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email?.split('@')[0] || (user.isAnonymous ? 'Guest Student' : 'Student'),
          photoURL: user.photoURL || null,
          isAnonymous: user.isAnonymous
        };
        // Persist session to cookies
        authCookieManager.setAuthCookies(userData, user.providerData?.[0]?.providerId || 'firebase');
        syncUserProfileToFirestore(user);
        callback(userData);
      } else {
        const demoUser = storage.get(DEMO_USER_KEY, null);
        if (demoUser) {
          authCookieManager.setAuthCookies(demoUser, 'demo');
          callback(demoUser);
        } else {
          authCookieManager.clearAuthCookies();
          callback(null);
        }
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
      authCookieManager.setAuthCookies(user, 'email_demo');
      trackUserLogin('email_demo');
      return user;
    }

    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      const user = {
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: cred.user.displayName || email.split('@')[0],
        photoURL: cred.user.photoURL || null,
        isAnonymous: false
      };
      authCookieManager.setAuthCookies(user, 'email_password');
      await syncUserProfileToFirestore(cred.user);
      trackUserLogin('email_password');
      return user;
    } catch (err) {
      throw new Error(getFriendlyAuthErrorMessage(err));
    }
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
      authCookieManager.setAuthCookies(user, 'email_demo');
      trackUserSignUp('demo_mode');
      return user;
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      if (displayName) {
        await updateProfile(cred.user, { displayName: displayName.trim() });
      }
      const user = {
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: displayName?.trim() || email.split('@')[0],
        photoURL: cred.user.photoURL || null,
        isAnonymous: false
      };
      authCookieManager.setAuthCookies(user, 'email_password');
      await syncUserProfileToFirestore(cred.user);
      trackUserSignUp('email_password');
      return user;
    } catch (err) {
      throw new Error(getFriendlyAuthErrorMessage(err));
    }
  },

  async loginWithGoogle() {
    if (!isFirebaseConfigured || !auth) {
      const user = {
        uid: 'google_user_' + Math.random().toString(36).substring(2, 9),
        email: 'student@gmail.com',
        displayName: 'Google Student',
        isAnonymous: false
      };
      storage.set(DEMO_USER_KEY, user);
      authCookieManager.setAuthCookies(user, 'google_demo');
      trackUserLogin('google_demo');
      return user;
    }

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const cred = await signInWithPopup(auth, provider);
      const user = {
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: cred.user.displayName || cred.user.email?.split('@')[0] || 'Student',
        photoURL: cred.user.photoURL || null,
        isAnonymous: false
      };
      authCookieManager.setAuthCookies(user, 'google_oauth');
      await syncUserProfileToFirestore(cred.user);
      trackUserLogin('google_oauth');
      return user;
    } catch (err) {
      throw new Error(getFriendlyAuthErrorMessage(err));
    }
  },

  async sendPasswordReset(email) {
    if (!isFirebaseConfigured || !auth) {
      return { success: true, message: 'Password reset link sent (Demo Mode).' };
    }

    try {
      await sendPasswordResetEmail(auth, email.trim());
      return { success: true };
    } catch (err) {
      throw new Error(getFriendlyAuthErrorMessage(err));
    }
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
      authCookieManager.setAuthCookies(user, 'guest_demo');
      trackUserLogin('guest_demo');
      return user;
    }

    try {
      const cred = await signInAnonymously(auth);
      const user = {
        uid: cred.user.uid,
        email: null,
        displayName: 'Guest Student',
        isAnonymous: true
      };
      authCookieManager.setAuthCookies(user, 'firebase_anonymous');
      trackUserLogin('firebase_anonymous');
      return user;
    } catch (err) {
      const user = {
        uid: 'guest_' + Math.random().toString(36).substring(2, 9),
        email: null,
        displayName: 'Guest Student',
        isAnonymous: true
      };
      storage.set(DEMO_USER_KEY, user);
      authCookieManager.setAuthCookies(user, 'guest_fallback');
      trackUserLogin('guest_fallback');
      return user;
    }
  },

  async logout() {
    storage.remove(DEMO_USER_KEY);
    authCookieManager.clearAuthCookies();
    trackUserSignOut();
    if (isFirebaseConfigured && auth) {
      try {
        await fbSignOut(auth);
      } catch (err) {
        console.warn('Firebase signout error:', err);
      }
    }
  }
};
