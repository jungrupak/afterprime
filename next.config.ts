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

  async redirects() {
    return [
        { source: '/id/:path*', destination: '/', permanent: true },
        { source: '/pt/:path*', destination: '/', permanent: true },
        { source: '/es/:path*', destination: '/', permanent: true },
        { source: '/vi/:path*', destination: '/', permanent: true },
        { source: '/sd/:path*', destination: '/', permanent: true },
        { source: '/ar/:path*', destination: '/', permanent: true },
        { source: '/de/:path*', destination: '/', permanent: true },
        { source: '/id/', destination: '/', permanent: true },
        { source: '/pt/', destination: '/', permanent: true },
        { source: '/es/', destination: '/', permanent: true },
        { source: '/vi/', destination: '/', permanent: true },
        { source: '/sd/', destination: '/', permanent: true },
        { source: '/ar/', destination: '/', permanent: true },
        { source: '/de/', destination: '/', permanent: true },
        { source: '/home', destination: '/', permanent: true },
        { source: '/home-page', destination: '/', permanent: true },
        { source: '/about-us', destination: '/', permanent: true },
        { source: '/product-alerts', destination: '/', permanent: true },
        { source: '/lp/forex-benchmark', destination: '/', permanent: true },
        { source: '/fees', destination: '/', permanent: true },
        { source: '/tradingview', destination: '/', permanent: true },
        { source: '/competition', destination: '/', permanent: true },
        { source: '/contact', destination: '/contact-us', permanent: true },
        { source: '/trading-terms', destination: '/', permanent: true },
        { source: '/sitemap', destination: '/sitemap.xml', permanent: true },
        { source: '/trade-receipts', destination: '/', permanent: true },
      ];
  },
};

export default nextConfig;
