import withPWAInit from 'next-pwa';

const isDev = process.env.NODE_ENV === 'development';

const withPWA = withPWAInit({
  dest: 'public',
  register: false, // Manual registration
  skipWaiting: true,
  disable: false,
  sw: 'sw.js',
  scope: '/',
  // swcMinify: !isDev,
  buildExcludes: [/middleware-manifest\.json$/],
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-cache',
        expiration: { maxEntries: 4, maxAgeSeconds: 365 * 24 * 60 * 60 }
      },
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images-cache',
        expiration: { maxEntries: 64, maxAgeSeconds: 24 * 60 * 60 }
      },
    },
  ],
});

export default withPWA({
  reactStrictMode: true,
  output: 'standalone',
  turbopack: {},
  images: {
    domains: ["ui-avatars.com"],
  },
});

// const withPWA = require("@ducanh2912/next-pwa").default({
//   dest: "public",
//   // disable: process.env.NODE_ENV === "development",
//   // register: true,
//   // scope: "/app",
//   // sw: "service-worker.js",
//   //...
// });

// // Your Next config is automatically typed!
// module.exports = withPWA({
//   turbopack: {},
//   // cacheComponents: true,
//   images: {
//     domains: ["ui-avatars.com"],
//   },
// });

