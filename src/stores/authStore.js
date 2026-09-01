import { create } from 'zustand';
import { authService } from '../services/firebase/auth.js';
import { useProgressStore } from './progressStore.js';

export const useAuthStore = create((set, get) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  isGuest: false,

  initAuth: () => {
    return authService.onAuthChange((user) => {
      set({
        user,
        isLoading: false,
        isAuthenticated: Boolean(user),
        isGuest: Boolean(user?.isAnonymous)
      });

      if (user) {
        useProgressStore.getState().loadUserProgress(user.uid);
      } else {
        useProgressStore.getState().loadUserProgress('guest');
      }
    });
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const user = await authService.login(email, password);
      set({ user, isAuthenticated: true, isGuest: false, isLoading: false });
      useProgressStore.getState().loadUserProgress(user.uid);
      return { success: true };
    } catch (err) {
      set({ isLoading: false });
      return { success: false, error: err.message };
    }
  },

  register: async (email, password, displayName) => {
    set({ isLoading: true });
    try {
      const user = await authService.register(email, password, displayName);
      set({ user, isAuthenticated: true, isGuest: false, isLoading: false });
      useProgressStore.getState().loadUserProgress(user.uid);
      return { success: true };
    } catch (err) {
      set({ isLoading: false });
      return { success: false, error: err.message };
    }
  },

  loginAsGuest: async () => {
    set({ isLoading: true });
    try {
      const user = await authService.loginAsGuest();
      set({ user, isAuthenticated: true, isGuest: true, isLoading: false });
      useProgressStore.getState().loadUserProgress(user.uid);
      return { success: true };
    } catch (err) {
      set({ isLoading: false });
      return { success: false, error: err.message };
    }
  },

  logout: async () => {
    set({ isLoading: true });
    await authService.logout();
    set({ user: null, isAuthenticated: false, isGuest: false, isLoading: false });
    useProgressStore.getState().loadUserProgress('guest');
  }
}));
