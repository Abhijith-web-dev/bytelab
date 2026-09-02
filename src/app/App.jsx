import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { GlobalNav } from '../components/layout/GlobalNav.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { CommandPalette } from '../components/search/CommandPalette.jsx';
import { useAuthStore } from '../stores/authStore.js';
import { useUIStore } from '../stores/uiStore.js';

export function App() {
  const { initAuth } = useAuthStore();
  const { isFocusMode } = useUIStore();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = initAuth();
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [initAuth]);

  // Hide footer on full IDE practice view, active assessment, or focus mode
  const isPracticeOrTest = location.pathname.startsWith('/practice') || location.pathname.startsWith('/tests');

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1d1d1f] font-sans antialiased">
      {/* 44px Persistent Apple Top Nav */}
      {!isFocusMode && <GlobalNav />}

      {/* Main Routed Page Content */}
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>

      {/* Footer (hidden on IDE, Test views, and Focus Mode) */}
      {!isPracticeOrTest && !isFocusMode && <Footer />}

      {/* Global Cmd+K Search Command Palette */}
      <CommandPalette />

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
