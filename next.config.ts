import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    domains: [
      "wordpress-1264747-4900526.cloudwaysapps.com",
      "cdn.afterprime.com",
    ],
  },
};

export default nextConfig;
