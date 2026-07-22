// Hardcoded footer copy — extracted here so it can be run through
// getTranslatedStatic (same Weglot pipeline as WordPress content). Hrefs
// stay in Footer.tsx untouched (only their target pages' own content is
// translated once those routes join the pipeline in a later phase).
export const footerContent = {
  logoAlt: "Afterprime Broker Logo",
  social: {
    discord: "Afterprime on Discord",
    facebook: "Afterprime on Facebook",
    twitter: "Afterprime on X (Twitter)",
    instagram: "Afterprime on Instagram",
    linkedin: "Afterprime on LinkedIn",
  },
  appDownload: {
    iosAlt: "MT5 iOS App",
    androidAlt: "MT5 Android App",
  },
  quickLinks: {
    heading: "Quick Links",
    flowRewards: "Flow Rewards",
    lowestCostVerified: "Lowest Cost Verified",
    alignedExecution: "Aligned Execution",
    depositWithdrawal: "Deposit and Withdrawal",
    howToApply: "How to Apply",
    tradeExecution: "Trade Execution",
  },
  markets: {
    heading: "Markets",
    liveSpreads: "Live Spreads",
    forexCfds: "Forex CFDs",
    preciousMetals: "Precious Metals",
    commodities: "Commodities",
    cryptoCfds: "Crypto CFDs",
    indices: "Indices",
    brokerCosts: "Broker Costs",
    compareBrokers: "Compare Brokers",
  },
  platforms: {
    heading: "Trading Platforms",
    mt4: "MT4",
    mt5: "MT5",
    webtrader: "Webtrader",
    fixApi: "FIX API",
    calculators: "Trading Calculators",
    glossary: "Trading Glossary",
  },
  company: {
    heading: "Afterprime",
    ourStory: "Who is Afterprime?",
    whyWeExist: "Why We Exist",
    legalDocuments: "Legal Documents",
    license: "CFD Broker License",
    kycAml: "KYC & AML/CTF",
    privacy: "Privacy Policy",
    aiInstructions: "AI Instructions",
  },
  notice: {
    heading: "Customer Notice",
    disclosurePre:
      "Trading derivatives is high risk. Losses can exceed your initial investment. You should only trade with money you can afford to lose. Any Information or advice contained on this website is general in nature and has been prepared without taking into account your objectives, financial situation or needs. Past performance of any product described on this website is not a reliable indication of future performance. You should consider whether you're part of our target market by reviewing our Target Market Determination, and read our PDS and other",
    disclosureLinkText: "legal documents",
    disclosurePost:
      "to ensure you fully understand the risks before you make any trading decisions.",
    inducement:
      "The information on this website is not intended to be an inducement, offer or solicitation to any person in any country or jurisdiction where such distribution or use would be contrary to local law or regulation.",
    copyrightSuffix:
      "Afterprime Pty Ltd - FSA Seychelles #SD057 | Global Gateway 8, Rue de la Perle, Providence, Mahé, Seychelles.",
  },
};

export type FooterContent = typeof footerContent;
