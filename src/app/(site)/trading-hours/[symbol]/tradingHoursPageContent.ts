// TradingHoursSymbolPage translates this once via getTranslatedStatic
// ("trading-hours-page", locale, tradingHoursPageContent) and passes pieces
// into the helper functions below (tradingDaysText, exchangeRef, etc.) and
// the JSX. `{token}` placeholders are interpolated with .replace() at
// render time, after translation — deliberately not `{instrument}` (Weglot
// translates that real word too, see 12-Weglot-Dashboard-Fixes.md).
//
// NOT included here on purpose: InstrumentData fields (data.description,
// data.openDay, data.closeDay, times, symbols) — those come from the live
// scoreboard.argamon.com feed, not WordPress or hardcoded UI copy, and stay
// as literal interpolated values, same as broker names elsewhere in the
// codebase.
export const tradingHoursPageContent = {
  // Display-only day-name translation for openDay/closeDay values embedded
  // in prose sentences below (e.g. "trades Sunday 22:00 to Friday 22:00").
  // These come from the live scoreboard.argamon.com feed as English day
  // names — translating them here (rather than sending the raw feed value
  // through Weglot per-request) keeps sentences from mixing languages.
  // TradingHoursWidget still receives the raw untranslated data.openDay/
  // closeDay values — day names are never used for comparison/dispatch
  // logic in this file, only display.
  dayNames: {
    Sunday: "Sunday",
    Monday: "Monday",
    Tuesday: "Tuesday",
    Wednesday: "Wednesday",
    Thursday: "Thursday",
    Friday: "Friday",
    Saturday: "Saturday",
  } as Record<string, string>,

  breadcrumbMarketHours: "Market hours",
  h1Suffix: "trading hours",
  sublineWithTimes:
    "{sym} trades {openDay} {openUtc} to {closeDay} {closeUtc}, {schedule}.",
  sublineFallback: "{desc}, {schedule}.",
  scheduleAlways: "24 hours a day, 7 days a week",
  schedule24x5: "24 hours a day, 5 days a week",
  scheduleRange: "{openDay} to {closeDay}",

  tradingDays: {
    always: "24 hours a day, 7 days a week",
    fiveDay: "24 hours a day, Monday through Friday",
    scheduled: "during scheduled market hours",
  },
  exchangeRef: {
    forex: "the global FX interbank market",
    crypto: "the global crypto market",
    metals: "COMEX/LBMA session times",
    commodities: "CME/NYMEX exchange session times",
    default: "the underlying exchange",
  },
  dstRegions: {
    fxMetalsCrypto: "London, New York, and Sydney",
    indicesStocks: "the US and Europe",
    commodities: "the US",
    default: "major trading centres",
  },
  peakContext: {
    gold: "Gold correlates strongly with USD moves, peaking when US and European traders are both active",
    forex: "This 4-hour window accounts for the majority of daily forex volume",
    usIndices:
      "Volume spikes at the US open (9:30 AM ET) and in the final hour of trade",
    indices:
      "Volume is highest when the home exchange regular session is active",
    crudeOil:
      "Crude volume aligns with NYMEX pit hours and US inventory data releases (Wednesdays)",
    commodities:
      "Liquidity peaks when the relevant commodity exchange pit session is active",
    crypto:
      "Crypto CFDs mirror risk-on sentiment; largest moves typically occur during US trading hours",
    default: "Liquidity and spreads are tightest during this window",
  },
  lowVolumePeriod: {
    metals: "post-NY close",
    forex: "the Asian session",
    indices: "pre-market hours",
    commodities: "the Asian session",
    crypto: "weekend hours",
    default: "off-peak hours",
  },
  executionStyle: {
    forex: "scalping and intraday",
    indices: "momentum and intraday",
    commoditiesMetals: "trend-following and intraday",
    crypto: "momentum",
    default: "active",
  },
  outsideHours: {
    always:
      "{desc} is available to trade 24/7 at Afterprime, including weekends",
    dailyBreak:
      "{desc} has a short daily maintenance break but is otherwise available throughout the entire trading week",
    indicesStocksClosed:
      "{desc} cannot be traded outside the hours shown above. The market closes at the end of each regular session",
    fiveDay:
      "{desc} trades continuously 24 hours a day, five days a week. There is no intraday market close between {openDay} and {closeDay}",
    default: "{desc} cannot be traded outside the hours shown above",
  },
  alternativeAccess: {
    always: "There is no gap risk from overnight closures for this instrument",
    indicesStocks:
      "Orders placed while the market is closed are queued and executed at the next available open price",
    default:
      "Orders placed while the market is closed are queued and filled at the next available open price",
  },

  tripleSwapDayLabel: "Triple swap day",
  tripleSwapText:
    "Swap charges are applied at 3× on {swap3Day} to cover the weekend rollover.",
  spreadBehaviourLabel: "Spread behaviour",
  dstNotePrefix: "DST note:",
  swapRatesLinkText: "{sym} swap rates",
  specificationsLinkText: "{sym} specifications",
  allTradingHoursLinkText: "All trading hours",

  whatAreHoursHeading: "What are {desc} trading hours?",
  tradesPrefix: "{desc} trades ",
  tradesSuffix: ".",
  dailyBreakInline: " There is a daily break from {start} to {end}.",
  tradingIsLabel: " Trading is ",
  weekendAvailable: "available",
  weekendNotAvailable: "not available",
  weekendSuffix: " on weekends.",
  cfdParagraphPart1:
    "At Afterprime, {desc} is available as a CFD, meaning you can go long or short within these hours without owning the underlying asset. All times shown follow ",
  cfdParagraphPart2: " and adjust automatically for daylight saving changes in ",
  cfdParagraphPart3: ".",

  bestTimeHeading: "Best time to trade {desc}",
  bestTimeP1Prefix:
    "{desc} typically sees its highest liquidity and tightest spreads during ",
  bestTimeP1Suffix: ". ",
  bestTimeP1End: ".",
  bestTimeP2Prefix: "Lower-volume periods, particularly ",
  bestTimeP2Middle:
    ", may see wider spreads and thinner order books. For traders on ",
  bestTimeP2Middle2: " strategies, timing entries around the ",
  bestTimeP2Suffix: " open tends to offer the most favourable conditions.",

  outsideHeading: "Can you trade {desc} outside market hours?",
  pendingPositionText:
    "If you have a pending position when the market closes, it will be held overnight and a swap rate will apply.",
  swapRatesInlinePrefix: " For {desc}, the current swap rates are ",
  swapRatesInlineMiddle: " points long and ",
  swapRatesInlineSuffix: " points short",
  tripleSwapInlinePrefix: ", with a triple swap applied on ",
  tripleSwapInlineSuffix: ".",

  faqSectionTitle: "{sym} Trading Hours: FAQs",
  faq: {
    q1: "When does {sym} open?",
    a1: "{sym} opens {openDay} at {openUtc}.",
    q2: "When does {sym} close?",
    a2: "{sym} closes {closeDay} at {closeUtc}.",
    q3: "What is the triple swap day for {sym}?",
    a3: "The triple swap is charged on {swap3Day} for {sym} positions held overnight.",
    q4: "Does {sym} have a daily break?",
    a4: "Yes. {sym} has a short daily break from {start} to {end}.",
  },

  // Metadata
  metadataFallbackTitle: "Trading Hours | Afterprime",
  metadataTitle: "{sym} Trading Hours: Open & Close Times | Afterprime",
  metadataDescription:
    "{desc} trading hours at Afterprime - session open/close times, pre-market, extended hours, and weekend status.",

  // Breadcrumbs
  breadcrumbHome: "Home",
  breadcrumbTradingHours: "Trading Hours",
};

export type TradingHoursPageContent = typeof tradingHoursPageContent;
