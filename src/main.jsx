import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router.jsx';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider 
      router={router} 
      future={{ v7_startTransition: true }}
    />
  </React.StrictMode>
);

// Register Service Worker for 100kbps 2G low-bandwidth acceleration and offline caching
if (typeof window !== 'undefined' && 'serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      console.debug('[ByteLab SW] Registered successfully with scope:', registration.scope);
    }).catch((error) => {
      console.debug('[ByteLab SW] Registration note:', error);
    });
  });
}
