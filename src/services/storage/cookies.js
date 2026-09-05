/**
 * ByteLab Cookie & Session Management Engine
 * Provides persistent, secure cookie storage for authentication state,
 * login status tracking, session tokens, and cross-session persistence.
 */

const DEFAULT_COOKIE_DAYS = 30;

/**
 * Standard cookie setter with security best practices
 */
export function setCookie(name, value, days = DEFAULT_COOKIE_DAYS, options = {}) {
  if (typeof document === 'undefined') return;

  try {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

    const isSecure = typeof window !== 'undefined' && window.location.protocol === 'https:';
    const sameSite = options.sameSite || 'Lax';
    const path = options.path || '/';

    const serializedValue = typeof value === 'object' ? encodeURIComponent(JSON.stringify(value)) : encodeURIComponent(String(value));

    let cookieString = `${encodeURIComponent(name)}=${serializedValue}; expires=${expires.toUTCString()}; path=${path}; SameSite=${sameSite}`;

    if (isSecure || options.secure) {
      cookieString += '; Secure';
    }

    if (options.domain) {
      cookieString += `; Domain=${options.domain}`;
    }

    document.cookie = cookieString;
    return true;
  } catch (err) {
    console.warn(`[Cookie] Failed to set cookie "${name}":`, err);
    return false;
  }
}

/**
 * Standard cookie reader
 */
export function getCookie(name) {
  if (typeof document === 'undefined') return null;

  try {
    const nameEQ = encodeURIComponent(name) + '=';
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      let c = cookies[i].trim();
      if (c.indexOf(nameEQ) === 0) {
        const rawValue = decodeURIComponent(c.substring(nameEQ.length));
        try {
          return JSON.parse(rawValue);
        } catch {
          return rawValue;
        }
      }
    }
    return null;
  } catch (err) {
    console.warn(`[Cookie] Failed to read cookie "${name}":`, err);
    return null;
  }
}

/**
 * Standard cookie remover
 */
export function removeCookie(name, options = {}) {
  if (typeof document === 'undefined') return;

  try {
    const path = options.path || '/';
    const isSecure = typeof window !== 'undefined' && window.location.protocol === 'https:';
    let cookieString = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}; SameSite=Lax`;

    if (isSecure || options.secure) {
      cookieString += '; Secure';
    }

    if (options.domain) {
      cookieString += `; Domain=${options.domain}`;
    }

    document.cookie = cookieString;
    return true;
  } catch (err) {
    console.warn(`[Cookie] Failed to remove cookie "${name}":`, err);
    return false;
  }
}

/**
 * ByteLab Authentication Cookie Keys
 */
export const AUTH_COOKIE_KEYS = {
  STATUS: 'bytelab_auth_status', // 'logged_in' | 'guest' | 'logged_out'
  SESSION: 'bytelab_session',     // Encoded user session metadata
  USER_ID: 'bytelab_user_id',     // User UID for quick lookup
  LAST_LOGIN: 'bytelab_last_login', // Timestamp of last successful auth
  LAST_ACTIVE: 'bytelab_last_active' // Timestamp of last user interaction
};

/**
 * High-level Authentication Cookie Manager
 */
export const authCookieManager = {
  /**
   * Set authentication cookies for an active user session
   */
  setAuthCookies(user, provider = 'email') {
    if (!user) {
      this.clearAuthCookies();
      return;
    }

    const isGuest = Boolean(user.isAnonymous);
    const status = isGuest ? 'guest' : 'logged_in';

    const sessionData = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || (isGuest ? 'Guest Student' : user.email?.split('@')[0] || 'Student'),
      photoURL: user.photoURL || null,
      isAnonymous: isGuest,
      provider: provider || 'email',
      loginTimestamp: Date.now()
    };

    // 1. Set status cookie (used by client & edge proxies)
    setCookie(AUTH_COOKIE_KEYS.STATUS, status, DEFAULT_COOKIE_DAYS);

    // 2. Set full session metadata cookie
    setCookie(AUTH_COOKIE_KEYS.SESSION, sessionData, DEFAULT_COOKIE_DAYS);

    // 3. Set plain user ID cookie for fast reference
    setCookie(AUTH_COOKIE_KEYS.USER_ID, user.uid, DEFAULT_COOKIE_DAYS);

    // 4. Set timestamps
    setCookie(AUTH_COOKIE_KEYS.LAST_LOGIN, String(Date.now()), DEFAULT_COOKIE_DAYS);
    setCookie(AUTH_COOKIE_KEYS.LAST_ACTIVE, String(Date.now()), DEFAULT_COOKIE_DAYS);

    return sessionData;
  },

  /**
   * Clear all user authentication and session cookies on logout
   */
  clearAuthCookies() {
    setCookie(AUTH_COOKIE_KEYS.STATUS, 'logged_out', DEFAULT_COOKIE_DAYS);
    removeCookie(AUTH_COOKIE_KEYS.SESSION);
    removeCookie(AUTH_COOKIE_KEYS.USER_ID);
    removeCookie(AUTH_COOKIE_KEYS.LAST_LOGIN);
    setCookie(AUTH_COOKIE_KEYS.LAST_ACTIVE, String(Date.now()), DEFAULT_COOKIE_DAYS);
  },

  /**
   * Get current auth status from cookie: 'logged_in' | 'guest' | 'logged_out'
   */
  getAuthStatus() {
    const status = getCookie(AUTH_COOKIE_KEYS.STATUS);
    return status || 'logged_out';
  },

  /**
   * Check if a verified non-guest user is currently logged in via cookie
   */
  isLoggedIn() {
    return this.getAuthStatus() === 'logged_in';
  },

  /**
   * Check if user is in guest mode via cookie
   */
  isGuest() {
    return this.getAuthStatus() === 'guest';
  },

  /**
   * Get cached session data from cookie
   */
  getSession() {
    const session = getCookie(AUTH_COOKIE_KEYS.SESSION);
    if (session && typeof session === 'object' && session.uid) {
      return session;
    }
    return null;
  },

  /**
   * Get cached user UID from cookie
   */
  getUserId() {
    return getCookie(AUTH_COOKIE_KEYS.USER_ID) || null;
  },

  /**
   * Update heartbeat activity cookie
   */
  updateLastActive() {
    setCookie(AUTH_COOKIE_KEYS.LAST_ACTIVE, String(Date.now()), DEFAULT_COOKIE_DAYS);
  }
};
