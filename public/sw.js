// ByteLab High-Performance Service Worker for Ultra-Low Bandwidth (100kbps / 2G) & Offline Resilience
const CACHE_NAME = 'bytelab-core-v2-cache';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/robots.txt',
  '/sitemap.xml'
];

// Install Event - Pre-cache core shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.debug('[ByteLab SW] Pre-cache non-fatal note:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Clean up stale cache versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Stale-While-Revalidate with Fast Cache-First on 100kbps networks
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Ignore non-GET, chrome-extension, or Firebase write endpoints
  if (request.method !== 'GET' || !request.url.startsWith('http')) {
    return;
  }

  // Firebase auth & firestore live connections should bypass service worker cache
  if (
    request.url.includes('firestore.googleapis.com') ||
    request.url.includes('identitytoolkit.googleapis.com') ||
    request.url.includes('securetoken.googleapis.com') ||
    request.url.includes('firebaseinstallations.googleapis.com')
  ) {
    return;
  }

  // Handle Static Assets & Chunks: Cache-First with Background Revalidation
  if (
    request.url.includes('/assets/') ||
    request.url.includes('fonts.googleapis.com') ||
    request.url.includes('fonts.gstatic.com') ||
    request.url.includes('cdn.jsdelivr.net')
  ) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
          // Trigger background fetch to revalidate
          fetch(request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
          }).catch(() => {});
          return cachedResponse;
        }

        try {
          const networkResponse = await fetch(request);
          if (networkResponse && networkResponse.status === 200) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch (err) {
          // If offline or timeout, return match if available
          return cachedResponse || new Response('Offline resource unavailable', { status: 503 });
        }
      })
    );
    return;
  }

  // Navigation requests (HTML pages): Network-first with fast fallback to cached index.html
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          const cache = await caches.open(CACHE_NAME);
          const cachedNavigate = await cache.match(request);
          if (cachedNavigate) return cachedNavigate;
          return (await cache.match('/index.html')) || (await cache.match('/'));
        })
    );
  }
});
