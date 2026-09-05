import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { GlobalNav } from '../components/layout/GlobalNav.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { CommandPalette } from '../components/search/CommandPalette.jsx';
import { AuthEngagementModal } from '../components/auth/AuthEngagementModal.jsx';
import { useAuthStore } from '../stores/authStore.js';
import { useUIStore } from '../stores/uiStore.js';
import { trackPageView, setUserMonitoringProfile } from '../services/firebase/analytics.js';
import { authCookieManager } from '../services/storage/cookies.js';

export function App() {
  const { user, initAuth } = useAuthStore();
  const { isFocusMode } = useUIStore();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = initAuth();
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [initAuth]);

  // Track real-time page views and route transitions in Google Firebase Analytics + update active cookie
  useEffect(() => {
    trackPageView(location.pathname + location.search, document.title);
    authCookieManager.updateLastActive();
  }, [location.pathname, location.search]);

  // Sync authenticated user monitoring profile with Firebase Analytics
  useEffect(() => {
    if (user?.uid) {
      setUserMonitoringProfile(user.uid, {
        is_anonymous: String(user.isAnonymous || false),
        sign_in_provider: user.providerData?.[0]?.providerId || 'email'
      });
    }
  }, [user]);

  // Hide footer on full IDE practice view, active assessment, or focus mode
  const isPracticeOrTest = location.pathname.startsWith('/practice') || location.pathname.startsWith('/tests');

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1d1d1f] font-sans antialiased">
      {/* 44px Persistent Apple Top Nav */}
      {!isFocusMode && <GlobalNav />}

      {/* Main Routed Page Content with Landmark */}
      <main id="main-content" className="flex-1 flex flex-col min-h-screen">
        <Outlet />
      </main>

      {/* Footer (hidden on IDE, Test views, and Focus Mode) */}
      {!isPracticeOrTest && !isFocusMode && <Footer />}

      {/* Global Cmd+K Search Command Palette */}
      <CommandPalette />

      {/* Persistent Auth Session & Engagement Modal */}
      <AuthEngagementModal />

      {/* Sonner Toast Notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: '12px',
            background: '#1d1d1f',
            color: '#ffffff',
            border: '1px solid rgba(255,255,255,0.1)'
          }
        }}
      />
    </div>
  );
}
