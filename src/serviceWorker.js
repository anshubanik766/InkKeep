// serviceWorker.js

const CACHE_NAME = "notes-app-cache-v1";
const urlsToCache = [
  "/",              // Root
  "/index.html",    // Main HTML
  "/manifest.json", // PWA manifest
  "/favicon.ico",   // Icon
  // Add any static CSS/JS/image assets you want cached
];

// Install Service Worker & Cache Files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Service Worker: Caching files");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate Service Worker & Clean Old Caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log("Service Worker: Clearing old cache", name);
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// Fetch Requests from Cache (Offline Support)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() => {
          // Optional: Offline fallback page
          if (event.request.mode === "navigate") {
            return caches.match("/index.html");
          }
        })
      );
    })
  );
});
