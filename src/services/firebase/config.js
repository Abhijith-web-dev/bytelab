import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Production Firebase Configuration provided for ByteLab
const defaultFirebaseConfig = {
  apiKey: "AIzaSyCnJM2-FqlU75ykngKx1w6ksPkNPvBp63Q",
  authDomain: "bytelab-f1acf.firebaseapp.com",
  projectId: "bytelab-f1acf",
  storageBucket: "bytelab-f1acf.firebasestorage.app",
  messagingSenderId: "548106042001",
  appId: "1:548106042001:web:9f5331478c6da0242edd30",
  measurementId: "G-R6PXKHS4E3"
};

const apiKey = import.meta.env?.VITE_FIREBASE_API_KEY || defaultFirebaseConfig.apiKey;

export const isFirebaseConfigured = Boolean(
  apiKey &&
  apiKey !== 'demo-api-key' &&
  apiKey !== 'dummy' &&
  !apiKey.startsWith('demo-')
);

let app = null;
let auth = null;
let db = null;

if (isFirebaseConfigured) {
  try {
    const firebaseConfig = {
      apiKey: import.meta.env?.VITE_FIREBASE_API_KEY || defaultFirebaseConfig.apiKey,
      authDomain: import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN || defaultFirebaseConfig.authDomain,
      projectId: import.meta.env?.VITE_FIREBASE_PROJECT_ID || defaultFirebaseConfig.projectId,
      storageBucket: import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET || defaultFirebaseConfig.storageBucket,
      messagingSenderId: import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID || defaultFirebaseConfig.messagingSenderId,
      appId: import.meta.env?.VITE_FIREBASE_APP_ID || defaultFirebaseConfig.appId,
      measurementId: import.meta.env?.VITE_FIREBASE_MEASUREMENT_ID || defaultFirebaseConfig.measurementId
    };

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
}

export { app, auth, db };
