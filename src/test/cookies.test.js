import { describe, it, expect, beforeEach } from 'vitest';
import {
  setCookie,
  getCookie,
  removeCookie,
  authCookieManager,
  AUTH_COOKIE_KEYS
} from '../services/storage/cookies.js';

describe('ByteLab Cookie & Authentication Session Engine', () => {
  beforeEach(() => {
    // Clear all test cookies
    authCookieManager.clearAuthCookies();
  });

  describe('Basic Cookie Operations', () => {
    it('sets and retrieves simple string cookies', () => {
      setCookie('test_key', 'hello_world');
      expect(getCookie('test_key')).toBe('hello_world');
    });

    it('sets and parses complex JSON object cookies', () => {
      const payload = { id: 123, role: 'student', active: true };
      setCookie('test_json', payload);
      expect(getCookie('test_json')).toEqual(payload);
    });

    it('removes cookies correctly', () => {
      setCookie('temp_key', 'value_to_remove');
      expect(getCookie('temp_key')).toBe('value_to_remove');
      removeCookie('temp_key');
      expect(getCookie('temp_key')).toBeNull();
    });

    it('returns null for nonexistent cookies', () => {
      expect(getCookie('nonexistent_key_12345')).toBeNull();
    });
  });

  describe('authCookieManager Operations', () => {
    it('persists logged in user session and status', () => {
      const mockUser = {
        uid: 'usr_abc123',
        email: 'abhijith@bytelab.dev',
        displayName: 'Abhijith S',
        photoURL: 'https://example.com/avatar.png',
        isAnonymous: false
      };

      authCookieManager.setAuthCookies(mockUser, 'google_oauth');

      expect(authCookieManager.getAuthStatus()).toBe('logged_in');
      expect(authCookieManager.isLoggedIn()).toBe(true);
      expect(authCookieManager.isGuest()).toBe(false);
      expect(authCookieManager.getUserId()).toBe('usr_abc123');

      const session = authCookieManager.getSession();
      expect(session).toBeDefined();
      expect(session.uid).toBe('usr_abc123');
      expect(session.email).toBe('abhijith@bytelab.dev');
      expect(session.displayName).toBe('Abhijith S');
      expect(session.provider).toBe('google_oauth');
    });

    it('persists guest session with guest status', () => {
      const mockGuest = {
        uid: 'guest_xyz789',
        email: null,
        displayName: 'Guest Student',
        isAnonymous: true
      };

      authCookieManager.setAuthCookies(mockGuest, 'guest_demo');

      expect(authCookieManager.getAuthStatus()).toBe('guest');
      expect(authCookieManager.isLoggedIn()).toBe(false);
      expect(authCookieManager.isGuest()).toBe(true);
      expect(authCookieManager.getUserId()).toBe('guest_xyz789');

      const session = authCookieManager.getSession();
      expect(session.isAnonymous).toBe(true);
    });

    it('clears session cookies and marks status as logged_out on logout', () => {
      const mockUser = {
        uid: 'usr_to_logout',
        email: 'logout@test.com',
        displayName: 'Test',
        isAnonymous: false
      };

      authCookieManager.setAuthCookies(mockUser, 'email');
      expect(authCookieManager.isLoggedIn()).toBe(true);

      authCookieManager.clearAuthCookies();

      expect(authCookieManager.getAuthStatus()).toBe('logged_out');
      expect(authCookieManager.isLoggedIn()).toBe(false);
      expect(authCookieManager.isGuest()).toBe(false);
      expect(authCookieManager.getSession()).toBeNull();
      expect(authCookieManager.getUserId()).toBeNull();
    });

    it('updates last active heartbeat timestamp', () => {
      authCookieManager.updateLastActive();
      const lastActive = getCookie(AUTH_COOKIE_KEYS.LAST_ACTIVE);
      expect(lastActive).toBeDefined();
      expect(Number(lastActive)).toBeGreaterThan(0);
    });
  });
});