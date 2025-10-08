import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "images.clerk.dev",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "s2.loli.net",
      },
      {
        protocol: "https",
        hostname: "i.loli.net",
      },
      {
        protocol: "https",
        hostname: "vip1.loli.net",
      },
    ],
  },
};

export default nextConfig;
