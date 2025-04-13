const CACHE_NAME = 'bitcoin-awakening-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/offline.html',
  '/styles.css',
  '/scripts.js',
  '/assets/images/favicon/favicon-32x32.png',
  '/assets/images/favicon/favicon-16x16.png',
  '/assets/images/favicon/apple-touch-icon.png',
  '/assets/images/BitcoinAwakeningLogo.png',
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .catch(error => console.error('Failed to cache assets on install:', error))
  );
  self.skipWaiting();
});

// Activate Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .catch(error => console.error('Failed to delete old caches on activate:', error))
  );
  self.clients.claim();
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cacheResponse => {
        return cacheResponse || fetch(event.request)
          .then(networkResponse => {
            // Optionally cache the new network response
            return caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
          });
      })
      .catch(() => caches.match('/offline.html'))
  );
});

// Handle message event to update the service worker
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});