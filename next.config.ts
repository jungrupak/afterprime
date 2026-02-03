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
        { source: '/stocks/:path*', destination: '/', permanent: true },
        { source: '/id/', destination: '/', permanent: true },
        { source: '/pt/', destination: '/', permanent: true },
        { source: '/es/', destination: '/', permanent: true },
        { source: '/vi/', destination: '/', permanent: true },
        { source: '/sd/', destination: '/', permanent: true },
        { source: '/ar/', destination: '/', permanent: true },
        { source: '/de/', destination: '/', permanent: true },
        { source: '/stocks', destination: '/', permanent: true },
        { source: '/home', destination: '/', permanent: true },
        { source: '/home-page', destination: '/', permanent: true },
        { source: '/about-us', destination: '/', permanent: true },
        { source: '/product-alerts', destination: '/', permanent: true },
        { source: '/lp/forex-benchmark', destination: '/', permanent: true },
        { source: '/fees', destination: '/', permanent: true },
        { source: '/tradingview', destination: '/', permanent: true },
        { source: '/competition', destination: '/', permanent: true },
        { source: '/contact', destination: '/contact-us', permanent: true },
        { source: '/contact/about', destination: '/contact-us', permanent: true },
        { source: '/contact/contact', destination: '/contact-us', permanent: true },
        { source: '/trading-terms', destination: '/', permanent: true },
        { source: '/sitemap', destination: '/sitemap.xml', permanent: true },
        { source: '/trade-receipts', destination: '/', permanent: true },
        { source: '/economic-calendar', destination: '/', permanent: true },
        { source: '/boost', destination: '/', permanent: true },
        { source: '/help', destination: 'https://help.afterprime.com', permanent: true },
        { source: '/help/:path*', destination: 'https://help.afterprime.com', permanent: true },
        { source: '/legal', destination: '/legal-documents', permanent: true },
        { source: '/legal/kyc', destination: '/kyc-aml', permanent: true },
        { source: '/trading-terms', destination: '/legal-documents', permanent: true },
        { source: '/legal/aml', destination: '/kyc-aml', permanent: true },
        { source: '/bonds/:path*', destination: '/', permanent: true },
        { source: '/bonds', destination: '/', permanent: true },
        { source: '/deposits', destination: '/deposit-withdrawal', permanent: true },
        { source: '/withdrawal', destination: '/deposit-withdrawal', permanent: true },
        { source: '/discord', destination: '/our-discord', permanent: true },
        { source: '/downloads', destination: '/', permanent: true },
        { source: '/live', destination: '/', permanent: true },
        { source: '/lp', destination: '/', permanent: true },
        { source: '/lp/:path*', destination: '/', permanent: true },
        { source: '/mam-pamm', destination: '/', permanent: true },
        { source: '/product-alerts', destination: '/', permanent: true },
        { source: '/sample-page', destination: '/', permanent: true },
        { source: '/shifter_404.html', destination: '/', permanent: true },
        { source: '/spread-table', destination: '/live-spreads', permanent: true },
        { source: '/fixapi', destination: '/fix-api', permanent: true },
      ];
  },
};

export default nextConfig;
