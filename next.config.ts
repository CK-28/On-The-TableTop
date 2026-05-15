import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    domains: ["ui-avatars.com"],
  },
};

export default nextConfig;
