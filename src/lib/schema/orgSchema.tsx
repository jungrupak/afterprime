import Script from "next/script";

export default function AfterprimeOrgSchema() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": "https://afterprime.com/#organization",
    name: "AfterPrime",
    legalName: "Afterprime Ltd",
    url: "https://afterprime.com",
    logo: "https://afterprime.com/img/logo-main.svg",
    description:
      "AfterPrime is an invite-only forex broker with the lowest total trading costs globally, independently verified by ForexBenchmark. Traders earn money back through Flow Rewards when they trade.",
    foundingDate: "2012",
    slogan: "Lowest Costs. Real Rewards.",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "Customer Support",
        availableLanguage: ["en"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
        telephone: "+61-02-9138-0640",
        email: "support@afterprime.com",
        url: "https://afterprime.com/contact-us",
      },
    ],
    address: [
      {
        "@type": "PostalAddress",
        addressCountry: "SC",
        addressRegion: "Seychelles",
        addressLocality: "Mahe",
        streetAddress: "CT House, Office 9A, Providence",
        postalCode: "SC",
      },
      {
        "@type": "PostalAddress",
        addressCountry: "AU",
        addressRegion: "NSW",
        addressLocality: "Sydney",
        streetAddress: "Level 4, Suite 401, 2 Grosvenor Street, Bondi Junction",
        postalCode: "2022",
      },
    ],
    sameAs: [
      "https://www.linkedin.com/company/afterprime",
      "https://twitter.com/afterprime",
      "https://www.facebook.com/afterprime",
      "https://www.instagram.com/afterprime",
      "https://www.youtube.com/@afterprime",
      "https://discord.gg/afterprime",
      "https://t.me/afterprime",
      "https://www.trustpilot.com/review/afterprime.com",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Trading Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Forex Trading",
            description:
              "Trade 60+ currency pairs with the lowest total trading costs",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "CFD Trading",
            description: "Trade indices, commodities and cryptocurrencies",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Flow Rewards",
            description:
              "Earn cashback on every trade through our pay-to-trade model",
          },
        },
      ],
    },
    makesOffer: [
      {
        "@type": "Offer",
        name: "MetaTrader 4 Platform",
        url: "https://afterprime.com/mt4",
      },
      {
        "@type": "Offer",
        name: "MetaTrader 5 Platform",
        url: "https://afterprime.com/mt5",
      },
      {
        "@type": "Offer",
        name: "TradeRevolution Platform",
        url: "https://afterprime.com/traderevolution",
      },
      {
        "@type": "Offer",
        name: "WebTrader Platform",
        url: "https://afterprime.com/webtrader",
      },
      {
        "@type": "Offer",
        name: "FIX API",
        url: "https://afterprime.com/fix-api",
      },
      {
        "@type": "Offer",
        name: "AfterPrime iOS App",
        url: "https://apps.apple.com/us/app/afterprime/id1672935764",
        description: "Free mobile trading app for iOS",
      },
      {
        "@type": "Offer",
        name: "AfterPrime Android App",
        url: "https://play.google.com/store/apps/details?id=com.traderevolution.afterprime",
        description: "Free mobile trading app for Android",
      },
    ],
    areaServed: {
      "@type": "GeoShape",
      description: "Global (invite-only access)",
    },
    award: "Lowest Total Trading Costs - ForexBenchmark Verified",
    identifier: [
      {
        "@type": "PropertyValue",
        propertyID: "FSA License",
        value: "SD057",
        description:
          "Financial Services Authority (FSA) Seychelles Securities Dealer License",
      },
      {
        "@type": "PropertyValue",
        propertyID: "AFSL",
        value: "404300",
        description: "Australian Financial Services License issued by ASIC",
      },
      {
        "@type": "PropertyValue",
        propertyID: "Company Registration",
        value: "8426189-1",
        description: "Seychelles Company Registration Number",
      },
    ],
    memberOf: {
      "@type": "Organization",
      name: "ForexBenchmark",
      description: "Independent cost verification",
    },
    parentOrganization: {
      "@type": "Organization",
      name: "Argamon Markets Pty Ltd",
      address: {"@type": "PostalAddress", addressCountry: "AU"},
    },
    subOrganization: {
      "@type": "Organization",
      name: "Afterprime Ltd",
      legalName: "Afterprime Ltd",
      identifier: {
        "@type": "PropertyValue",
        propertyID: "Company Registration Number",
        value: "8426189-1",
      },
      address: {"@type": "PostalAddress", addressCountry: "SC"},
    },
    knowsAbout: [
      "Forex Trading",
      "CFD Trading",
      "Crypto CFD Trading",
      "Indices Trading",
      "Commodities Trading",
      "Stock CFD Trading",
      "Algorithmic Trading",
      "High-Frequency Trading",
      "Scalping Strategies",
      "Day Trading",
      "MetaTrader 4",
      "MetaTrader 5",
      "TradeRevolution",
      "WebTrader",
      "FIX API Trading",
      "Trading Cost Analysis",
      "Trade Execution",
      "Low-Latency Trading",
      "Sub-Millisecond Execution",
      "Flow Rewards",
      "Cashback Trading Programs",
      "Trading Spreads",
      "Swap Rates",
      "Forex Margin Requirements",
      "Leverage Trading",
      "Pip Value Calculation",
      "Position Sizing",
      "Risk Management",
      "Expert Advisors (EA)",
      "Automated Trading Systems",
      "Trading Platforms",
      "Forex Market Hours",
      "Currency Pairs Trading",
      "Major Currency Pairs",
      "Minor Currency Pairs",
      "Exotic Currency Pairs",
      "Trading Psychology",
      "Technical Analysis",
      "Price Action Trading",
      "Zero Commission Trading",
      "Transparent Pricing",
      "ForexBenchmark Verification",
      "Institutional Trading",
      "Professional Trading",
      "Semi-Professional Trading",
      "Trading Calculator Tools",
      "Market Analysis",
      "KYC Compliance",
      "AML Compliance",
      "Financial Regulation",
      "Secure Trading",
      "Client Fund Protection",
      "Trading Community",
      "Discord Trading Community",
      "24/7 Trading Support",
      "Multi-Asset Trading",
      "Direct Market Access",
    ],
  };

  if (!orgSchema) return null;

  return (
    <Script
      id="financial-service-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(orgSchema),
      }}
    />
  );
}
