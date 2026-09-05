import { create } from 'zustand';
import { authService } from '../services/firebase/auth.js';
import { authCookieManager } from '../services/storage/cookies.js';
import { useProgressStore } from './progressStore.js';

// Pre-hydrate initial auth state from cookies immediately on startup
const initialSession = authCookieManager.getSession();
const initialStatus = authCookieManager.getAuthStatus();
const initialIsAuth = initialStatus === 'logged_in' || (initialStatus === 'guest' && Boolean(initialSession));
const initialIsGuest = initialStatus === 'guest';

export const useAuthStore = create((set, get) => ({
  user: initialSession || null,
  isLoading: !initialSession,
  isAuthenticated: initialIsAuth,
  isGuest: initialIsGuest,
  authError: null,

  initAuth: () => {
    return authService.onAuthChange((user) => {
      set({
        user,
        isLoading: false,
        isAuthenticated: Boolean(user),
        isGuest: Boolean(user?.isAnonymous),
        authError: null
      });

      if (user) {
        useProgressStore.getState().loadUserProgress(user.uid);
      } else {
        useProgressStore.getState().loadUserProgress('guest');
      }
    });
  },

  login: async (email, password) => {
    set({ isLoading: true, authError: null });
    try {
      const user = await authService.login(email, password);
      set({ user, isAuthenticated: true, isGuest: false, isLoading: false, authError: null });
      useProgressStore.getState().loadUserProgress(user.uid);
      return { success: true, user };
    } catch (err) {
      set({ isLoading: false, authError: err.message });
      throw err;
    }
  },

  loginWithEmail: async (email, password) => {
    return get().login(email, password);
  },

  register: async (email, password, displayName) => {
    set({ isLoading: true, authError: null });
    try {
      const user = await authService.register(email, password, displayName);
      set({ user, isAuthenticated: true, isGuest: false, isLoading: false, authError: null });
      useProgressStore.getState().loadUserProgress(user.uid);
      return { success: true, user };
    } catch (err) {
      set({ isLoading: false, authError: err.message });
      throw err;
    }
  },

  registerWithEmail: async (email, password, displayName) => {
    return get().register(email, password, displayName);
  },

  loginWithGoogle: async () => {
    set({ isLoading: true, authError: null });
    try {
      const user = await authService.loginWithGoogle();
      set({ user, isAuthenticated: true, isGuest: false, isLoading: false, authError: null });
      useProgressStore.getState().loadUserProgress(user.uid);
      return { success: true, user };
    } catch (err) {
      set({ isLoading: false, authError: err.message });
      throw err;
    }
  },

  sendPasswordReset: async (email) => {
    set({ isLoading: true, authError: null });
    try {
      const res = await authService.sendPasswordReset(email);
      set({ isLoading: false, authError: null });
      return res;
    } catch (err) {
      set({ isLoading: false, authError: err.message });
      throw err;
    }
  },

  loginAsGuest: async () => {
    set({ isLoading: true, authError: null });
    try {
      const user = await authService.loginAsGuest();
      set({ user, isAuthenticated: true, isGuest: true, isLoading: false, authError: null });
      useProgressStore.getState().loadUserProgress(user.uid);
      return { success: true, user };
    } catch (err) {
      set({ isLoading: false, authError: err.message });
      throw err;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    await authService.logout();
    set({ user: null, isAuthenticated: false, isGuest: false, isLoading: false, authError: null });
    useProgressStore.getState().loadUserProgress('guest');
  },

  clearError: () => set({ authError: null })
}));
