importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

if (workbox) {
  console.log('Workbox is loaded! 🎉');

  // Define a cache name for CineRandom PWA
  workbox.core.setCacheNameDetails({
    prefix: 'cinerandom',
    suffix: 'v1',
    precache: 'precache',
    runtime: 'runtime'
  });

  // 1. Precache assets: Files essential for the app's basic offline functionality.
  // In a build process, `workbox-webpack-plugin` would generate this list automatically.
  // 1. Precache assets: Files essential for the app's basic offline functionality.
  // The precache manifest is injected here by vite-plugin-pwa.
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

  // 2. Runtime Caching Strategies

  // Cache navigation requests (HTML pages) with Network First strategy
  // This ensures fresh content when online, but provides offline fallback.
  workbox.routing.registerRoute(
    ({ request }) => request.mode === 'navigate',
    new workbox.strategies.NetworkFirst({
      cacheName: 'pages',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50, // Keep a reasonable number of pages cached
          maxAgeSeconds: 5 * 24 * 60 * 60, // Cache for 5 days
        }),
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [200], // Only cache successful responses
        }),
      ],
    })
  );

  // Cache images (e.g., movie posters from TMDB) with Stale While Revalidate strategy
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 100, // Limit image cache size
          maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
        }),
      ],
    })
  );

  // Cache external CSS, JS (e.g., Tailwind, Firebase SDKs from CDN) with Stale While Revalidate
  workbox.routing.registerRoute(
    ({ request }) =>
      request.destination === 'style' ||
      request.destination === 'script' ||
      request.destination === 'worker',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'static-resources',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 7 * 24 * 60 * 60, // Cache for 7 days
        }),
      ],
    })
  );

  // Cache Google Fonts (stylesheets and webfonts) with Cache First strategy
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    })
  );

  workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new workbox.strategies.CacheFirst({
      cacheName: 'google-fonts-webfonts',
      plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.ExpirationPlugin({
          maxAgeSeconds: 60 * 60 * 24 * 365, // Cache for 1 year
          maxEntries: 30,
        }),
      ],
    })
  );

  // Cache Font Awesome with Stale While Revalidate
  workbox.routing.registerRoute(
    /^https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'font-awesome',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxAgeSeconds: 60 * 60 * 24 * 7, // 7 Days
          maxEntries: 10,
        }),
      ],
    })
  );

  // Cache TMDB API calls with Network First strategy (for fresh data, but offline support)
  // This will cache responses for discover, trending, movie/tv details, etc.
  workbox.routing.registerRoute(
    /^https:\/\/api\.themoviedb\.org\/3\/(movie|tv|trending|discover|search)\//,
    new workbox.strategies.NetworkFirst({
      cacheName: 'tmdb-api',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 100, // Limit TMDB API cache entries
          maxAgeSeconds: 60 * 60 * 24, // Cache for 24 hours
        }),
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200], // Cache opaque responses too (e.g., for cross-origin fetches)
        }),
      ],
    })
  );

  // Cache Firebase CDN SDKs with Cache First strategy
  workbox.routing.registerRoute(
    /^https:\/\/www\.gstatic\.com\/firebasejs\//,
    new workbox.strategies.CacheFirst({
      cacheName: 'firebase-sdk',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxAgeSeconds: 60 * 60 * 24 * 30, // Cache for 30 Days
          maxEntries: 10,
        }),
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200],
        }),
      ],
    })
  );

  // 3. Offline Fallback: Serve offline.html for navigation requests when network is unavailable
  workbox.routing.setCatchHandler(async ({ event }) => {
    if (event.request.mode === 'navigate') {
      return caches.match('/offline.html');
    }
    // For other types of requests (images, scripts, etc.), simply return an error response
    return Response.error(); 
  });

  // 4. Push Notifications Handling
  self.addEventListener('push', (event) => {
    // Parse the push message payload
    const payload = event.data ? event.data.json() : {
      title: 'CineRandom Update',
      body: 'You have a new recommendation waiting!',
      icon: '/icons/icon-192x192.png',
      url: '/' // Default URL to open
    };

    // Show the notification
    event.waitUntil(
      self.registration.showNotification(payload.title, {
        body: payload.body,
        icon: payload.icon || '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png', // Badge shown on Android app icon
        data: {
          url: payload.url || '/' // Custom data to pass to notificationclick
        }
      })
    );
  });

  // Handle notification clicks
  self.addEventListener('notificationclick', (event) => {
    event.notification.close(); // Close the notification once clicked

    event.waitUntil(
      clients.openWindow(event.notification.data.url) // Open the specified URL
    );
  });

} else {
  console.log('Workbox could not be loaded. Offline support and advanced caching will be limited.');
}