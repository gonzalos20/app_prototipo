const CACHE_NAME = 'note-app-cache-v1';
const urlsToCache = ['/pwapp/', '/pwapp/index.html', '/pwapp/styles.css', '/pwapp/app.js', '/pwapp/manifest.json',   '/pwapp/icons/icon-192.png',
  '/pwapp/icons/icon-512.png'];

  self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(urlsToCache);
      }).catch((err) => {
        console.error("Cache addAll failed:", err);
      })
    );
  });

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
