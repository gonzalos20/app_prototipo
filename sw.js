const CACHE_NAME = 'iWorkflow';
const APP_NAME = 'app_prototipo'
const urlsToCache = ['./', './index.html', './styles.css', './app.js', './manifest.json',   './icons/icon-192.png',
  './icons/icon-512.png', 'https://cdn.jsdelivr.net/npm/daisyui@5', 'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4', 'https://cdnjs.cloudflare.com/ajax/libs/page.js/1.10.2/page.js', './router.js', './pages/home.html', './pages/alta.html', './pages/login.html', './middleware/authMiddleware.js'];

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
