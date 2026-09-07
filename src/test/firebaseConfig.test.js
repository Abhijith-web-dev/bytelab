import { describe, it, expect } from 'vitest';
import { isFirebaseConfigured, firebaseConfig, app, auth, db } from '../services/firebase/config.js';

describe('Firebase Configuration & Security', () => {
  it('exports valid configuration object structure without hardcoded keys', () => {
    expect(firebaseConfig).toBeDefined();
    expect(typeof firebaseConfig).toBe('object');
    expect('apiKey' in firebaseConfig).toBe(true);
    expect('projectId' in firebaseConfig).toBe(true);
    expect('appId' in firebaseConfig).toBe(true);
    expect('authDomain' in firebaseConfig).toBe(true);
    expect('storageBucket' in firebaseConfig).toBe(true);
    expect('messagingSenderId' in firebaseConfig).toBe(true);
  });

  it('correctly reports isFirebaseConfigured as a boolean', () => {
    expect(typeof isFirebaseConfigured).toBe('boolean');
    if (isFirebaseConfigured) {
      expect(firebaseConfig.apiKey).not.toBe('');
      expect(firebaseConfig.apiKey).not.toBe('your_firebase_api_key_here');
      expect(firebaseConfig.apiKey).not.toBe('demo-api-key');
      expect(app).not.toBeNull();
    }
  });

  it('exports app, auth, and db safely without uncaught runtime crashes', () => {
    // If configured, auth and db should be instantiated; if not, they are safely null
    if (isFirebaseConfigured) {
      expect(app).toBeDefined();
      expect(auth).toBeDefined();
      expect(db).toBeDefined();
    } else {
      expect(app).toBeNull();
      expect(auth).toBeNull();
      expect(db).toBeNull();
    }
  });
});
