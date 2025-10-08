import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wordpress-1264747-4900526.cloudwaysapps.com",
      },
      {
        protocol: "https",
        hostname: "cdn.afterprime.com",
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
