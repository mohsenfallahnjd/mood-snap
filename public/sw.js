const CACHE_NAME = "moodsnap-cache-v1";
const toCache = [
  "/",
  "/favicon.ico",
  "/manifest.json",
  // add any other static routes or assets here
];

// Install: cache our “app shell”
self.addEventListener("install", (evt) => {
  evt.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(toCache)));
});

// Activate: clean up old caches
self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
});

// Fetch: serve from cache, fallback to network
self.addEventListener("fetch", (evt) => {
  if (evt.request.method !== "GET") {
    return;
  }
  evt.respondWith(
    caches.match(evt.request).then(
      (cached) =>
        cached ||
        fetch(evt.request).then((resp) => {
          // optionally cache new requests here
          return resp;
        })
    )
  );
});
