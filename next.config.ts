const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  // disable: process.env.NODE_ENV === "development",
  // register: true,
  // scope: "/app",
  // sw: "service-worker.js",
  //...
});

// Your Next config is automatically typed!
module.exports = withPWA({
  turbopack: {},
  // cacheComponents: true,
  images: {
    domains: ["ui-avatars.com"],
  },
});

