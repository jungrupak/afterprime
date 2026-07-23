// TradingHoursWidget is a client component — translations are resolved
// by the parent server component (page.tsx) via getTranslatedStatic and
// passed in as a `content` prop.

export const tradingHoursWidgetContent = {
  // Status pill labels
  statusOpen: "Open now",
  statusBreak: "Daily Break",
  statusClosed: "Market Closed",

  // Countdown labels
  eventBreakEndsIn: "Break ends in",
  eventBreakIn: "Break in",
  eventClosesIn: "Closes in",
  eventWillOpenIn: "Will open in",

  // Session card labels
  sessionAsiaOpen: "Asia open",
  sessionLondonOpen: "London open",
  sessionNyOpen: "New York open",
  sessionPeakLiquidity: "Peak liquidity",

  // UI labels
  timezoneLabel: "Timezone",
  timezoneAriaLabel: "Select timezone",
  tradingHoursByDay: "Trading Hours by Day",
  closed: "Closed",
  dailyBreakLabel: "Daily break",
  tradingSessions: "Trading Sessions",

  // Weekday abbreviations
  weekdays: {
    Mon: "Mon",
    Tue: "Tue",
    Wed: "Wed",
    Thu: "Thu",
    Fri: "Fri",
  } as Record<string, string>,
};

export type TradingHoursWidgetContent = typeof tradingHoursWidgetContent;
