import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    domains: [
      "wordpress-1264747-4900526.cloudwaysapps.com",
      "cdn.afterprime.com",
    ],
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        // Allow calling /api/wp/... inside Next.js
        source: "/api/wp/:path*",
        destination:
          "https://wordpress-1264747-4900526.cloudwaysapps.com/wp-json/:path*",
      },
    ];
  },
};

export default nextConfig;
