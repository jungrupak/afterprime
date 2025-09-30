import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    domains: [
      "wordpress-1264747-4900526.cloudwaysapps.com",
      "https://cdn.afterprime.com/",
    ],
  },
};

export default nextConfig;
