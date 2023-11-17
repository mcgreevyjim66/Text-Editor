// Importing various Workbox recipes and strategies for caching.
const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Pre-caching assets listed in the Workbox manifest.
precacheAndRoute(self.__WB_MANIFEST);

// Setting up a cache-first strategy for page caching.
const pageCache = new CacheFirst({
  cacheName: 'page-cache', // Name of the cache storage.
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200], // Cache responses with status 0 (opaque responses) and 200 (OK).
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, // Set cache expiration to 30 days.
    }),
  ],
});

// Warm up the cache for specified URLs using the pageCache strategy.
warmStrategyCache({
  urls: ['/index.html', '/'], // URLs to pre-cache.
  strategy: pageCache, // Caching strategy to use.
});

// Register a route for navigation requests to use pageCache strategy.
registerRoute(
  ({ request }) => request.mode === 'navigate', // Criteria to match navigation requests.
  pageCache // Strategy to use for matching requests.
);

// Register a route to cache assets like styles, scripts, workers, and images.
registerRoute(
  // Function to define the criteria for caching.
  ({ request }) => ["style", "script", "worker", "image"].includes(request.destination),
  // Use a stale-while-revalidate strategy for these requests.
  new StaleWhileRevalidate({
    cacheName: "asset-cache", // Name of the cache storage for assets.
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200], // Cache responses with status 0 and 200.
      }),
    ],
  })
);
