import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

/**
 * Firebase Configuration for ByteLab
 * Credentials are securely loaded from Vite environment variables (.env / import.meta.env).
 * Setup instructions:
 * 1. Copy .env.example to .env
 * 2. Populate with your Firebase project configuration
 */
const firebaseConfig = {
  apiKey: import.meta.env?.VITE_FIREBASE_API_KEY?.trim() || '',
  authDomain: import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN?.trim() || '',
  projectId: import.meta.env?.VITE_FIREBASE_PROJECT_ID?.trim() || '',
  storageBucket: import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET?.trim() || '',
  messagingSenderId: import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID?.trim() || '',
  appId: import.meta.env?.VITE_FIREBASE_APP_ID?.trim() || '',
  measurementId: import.meta.env?.VITE_FIREBASE_MEASUREMENT_ID?.trim() || ''
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.appId &&
  firebaseConfig.apiKey !== 'your_firebase_api_key_here' &&
  firebaseConfig.apiKey !== 'demo-api-key' &&
  firebaseConfig.apiKey !== 'dummy' &&
  !firebaseConfig.apiKey.startsWith('demo-')
);

let app = null;
let auth = null;
let db = null;

if (isFirebaseConfigured) {
  try {
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (err) {
    console.warn('Firebase initialization note (using fallback local mode if offline):', err);
  }
} else if (import.meta.env?.DEV) {
  console.info(
    '[ByteLab Firebase] Environment variables not detected. Running in local/guest mode. To enable live Firebase Auth & Firestore sync, configure .env with VITE_FIREBASE_* variables.'
  );
}

export { app, auth, db, firebaseConfig };
