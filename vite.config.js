// vite.config.js
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      // Use 'injectManifest' strategy to keep your existing service-worker.js
      // and inject the precache manifest into it.
      strategies: 'injectManifest',
      srcDir: '.', // Your service-worker.js is in the project root
      filename: 'service-worker.js', // The name of your service worker file
      injectRegister: 'auto', // Automatically inject the service worker registration code
      manifest: {
        // Ensure this matches your manifest.json content
        name: "CineRandom",
        short_name: "CineRandom",
        description: "Discover Your Next Favorite Movie or Series with CineRandom",
        start_url: "/",
        display: "standalone",
        background_color: "#0f172a",
        theme_color: "#3b82f6",
        icons: [
          {
            src: "/icons/icon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any maskable"
          },
          // You can also define other specific sizes here if your manifest.json
          // doesn't cover them or you want VitePWA to generate them.
          { src: "/icons/icon-72x72.png", sizes: "72x72", type: "image/png" },
          { src: "/icons/icon-96x96.png", sizes: "96x96", type: "image/png" },
          { src: "/icons/icon-128x128.png", sizes: "128x128", type: "image/png" },
          { src: "/icons/icon-144x144.png", sizes: "144x144", type: "image/png" },
          { src: "/icons/icon-152x152.png", sizes: "152x152", type: "image/png" },
          { src: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "/icons/icon-384x384.png", sizes: "384x384", type: "image/png" },
          { src: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" }
        ],
        orientation: "portrait"
      },
      // Configuration for the injectManifest strategy
      injectManifest: {
        // We want to precache the offline.html explicitly if it's not dynamically generated
        // The service worker's setCatchHandler will use this.
        // It's usually fine to let globPatterns catch it, but being explicit can help.
        // globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest,txt}'],
        // Exclude /index.html from the precache list if your root path (/) is already precached.
        // This avoids duplicate entries for the main page.
        // We explicitly include 'offline.html' in the workbox.globPatterns below
        // for it to be part of the generated manifest.
      },
      // Customize Workbox options for injectManifest
      workbox: {
        // Specify the directory where your built files are outputted
        globDirectory: 'dist',
        // Define patterns for files to be precached. Workbox generates revisions for these.
        globPatterns: [
          '**/*.{js,css,html,ico,png,svg,webmanifest,txt}', // Adjust as needed
          // Ensure offline.html is included for precaching
          'offline.html',
          // Explicitly include icon files if they are not directly in `dist` root
          'icons/*.{png,svg}'
        ],
        // You can uncomment and modify this if you want VitePWA to handle navigateFallback
        // directly, instead of your custom setCatchHandler in service-worker.js.
        // navigateFallback: '/offline.html',
      },
      devOptions: {
        enabled: true, // Enable PWA in development
      },
    }),
  ],
});