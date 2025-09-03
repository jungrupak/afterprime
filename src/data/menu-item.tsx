export const menuItems = [
  //   { title: "Home", href: "/" },
  {
    title: "Trading",
    href: "#",
    menuCategory: [
      {
        title: "Account",
        href: "/",
        children: [
          { title: "Live Account", href: "/account/live-account" },
          { title: "Trading Hours", href: "/account/trading-hours" },
          { title: "Live Spread", href: "/account/live-spreads" },
        ],
      },
      {
        title: "Markets",
        href: "/",
        children: [
          { title: "Forex", href: "/markets/forex" },
          { title: "Commodities", href: "/markets/commodities" },
          { title: "Crypto", href: "/markets/crypto" },
          { title: "Stocks", href: "/markets/stocks" },
          { title: "Indices", href: "/markets/indices" },
        ],
      },
      {
        title: "Platforms",
        href: "/",
        children: [
          { title: "MT5", href: "/platforms/mt5" },
          { title: "MT4", href: "/platforms/mt4" },
          { title: "TraderEvolution", href: "/platforms/traderevolution" },
          { title: "WebTrader", href: "/platforms/webtrader" },
        ],
      },
    ],
  },
  {
    title: "Explore",
    href: "#",
    menuCategory: [
      {
        title: "Quick Start",
        href: "/",
        children: [
          { title: "How to Deposit", href: "/how-to-deposit" },
          { title: "How to Withdraw", href: "/how-to-withdraw" },
          { title: "Fees & Charges", href: "/fees-and-charges" },
        ],
      },
      {
        title: "Tools",
        href: "/",
        children: [
          { title: "Profit Calculator", href: "/tools/profit-calculator" },
          { title: "VPS Offer", href: "/tools/vps-offer" },
          { title: "WebTrader", href: "/platforms/webtrader" },
        ],
      },
      {
        title: "Promotions",
        href: "/",
        children: [
          { title: "Trading Competition", href: "/trading-competition" },
          { title: "Discord", href: "/discord" },
        ],
      },
    ],
  },
  { title: "Compare", href: "/compare" },
  {
    title: "About",
    href: "#",
    menuCategory: [
      { title: "Who We Are", href: "/who-we-are", children: [] },
      {
        title: "License & Regulations",
        href: "/about/license-and-regulations",
        children: [],
      },
      {
        title: "Legal Documents",
        href: "/about/legal-documents",
        children: [],
      },
      { title: "KYC & AML", href: "/about/kyc-aml", children: [] },
      { title: "Contact", href: "/about/contact", children: [] },
      {
        title: "Help Center",
        href: "https://help.afterprime.com/",
        children: [],
      },
    ],
  },
];
