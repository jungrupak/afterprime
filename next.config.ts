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

  async headers() {
    return [
      {
        // Match all images in /public/img/
        source: "/img/:all*(png|jpg|jpeg|svg|gif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, immutable", // 30 days image caches
          },
          // { key: 'Access-Control-Allow-Credentials', value: 'true' },
          // { key: 'Access-Control-Allow-Origin', value: '*' },
          // { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
          // { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ];
  },
};

export default nextConfig;
