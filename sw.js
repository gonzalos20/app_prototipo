const CACHE_NAME = 'iWorkflow-v1';
const APP_NAME = 'app_prototipo'
const urlsToCache = ['/'+APP_NAME+'/', '/'+APP_NAME+'/index.html', '/'+APP_NAME+'/styles.css', '/'+APP_NAME+'/app.js', '/'+APP_NAME+'/manifest.json',   '/'+APP_NAME+'/icons/icon-192.png',
  '/'+APP_NAME+'/icons/icon-512.png', 'https://cdn.jsdelivr.net/npm/daisyui@5', 'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4', '/'+APP_NAME+'/router.js'];

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
