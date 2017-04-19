/* eslint-disable */

const CACHE_NAME = "vam-cache-v1";

const assets = serviceWorkerObject;

self.addEventListener("install", function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(assets);
    })
  )
});

self.addEventListener("activate", function(event) {
  console.log("Finally active. Ready to start serving content!");
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});