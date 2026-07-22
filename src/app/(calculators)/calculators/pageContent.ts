// Hardcoded landing-page copy (cards, lists, hero) — not sourced from WP.
// Routed through getTranslatedStatic so it translates the same way as
// everything else. HTML tags embedded in some strings (`<b>`, `<br/>`) are
// left in place and translated as part of the string, same as WP content
// elsewhere in the app that uses dangerouslySetInnerHTML.
export const calculatorsPageContent = {
  heroTitle: "Trading Calculators",
  heroParagraphPre:
    "Free tools to help you trade smarter. Calculate position sizes, potential profits, margin requirements, and more - before you click the button. Professional traders don't guess these numbers; neither should you.",
  heroCompareLinkText: "Compare broker costs",
  heroParagraphPost: "with verified data before you open an account.",
  cards: [
    {
      title: "Forex Trading Cost Savings Calculator",
      paragraph:
        "This tool lets you compare your monthly trading costs against top brokers and industry averages using verified spread and commission data. Compare your estimated savings per month and over 12 months.\n\nPrimary Use: This tool is built for traders who want clarity on pricing.",
      button_url: "/calculators/cost-savings-calculator",
    },
    {
      title: "Position Size Calculator",
      paragraph:
        "Calculate the optimal lot size for any trade based on your account balance, risk percentage, and stop-loss distance.\n\nPrimary Use: Determine how many lots to trade while staying within your risk limits",
      button_url: "/calculators/position-size-calculator",
    },
    {
      title: "Profit/Loss Calculator",
      paragraph:
        "See your potential profit and loss before entering a trade. Enter entry, stop-loss, and take-profit levels with position size.\n\nPrimary Use: Know exactly what you stand to gain or lose before committing capital. ",
      button_url: "/calculators/profit-loss-calculator",
    },
    {
      title: "Margin & Leverage Calculator",
      paragraph:
        "Calculate margin requirements and understand your leverage exposure. See how much capital is tied up and risk of margin call.\n\nPrimary Use: Ensure you have sufficient margin and understand your effective leverage ",
      button_url: "/calculators/margin-calculator",
    },
    {
      title: "Pip Value Calculator",
      paragraph:
        "Find the exact value of a pip for any instrument and position size. Supports forex pairs, commodities, and indices.\n\nPrimary Use: Know the dollar value of price movements before sizing positions.",
      button_url: "/calculators/pip-value-calculator",
    },
    {
      title: "Compound Growth Calculator",
      paragraph:
        "Project your account growth over time based on win rate, risk-reward ratio, and position sizing with compound returns.\n\nPrimary Use: Set realistic expectations and understand the power of consistent trading.",
      button_url: "/calculators/compound-growth-calculator",
    },
    {
      title: "Drawdown & Risk of Ruin Calculator",
      paragraph:
        "Calculate maximum expected drawdown, probability of losing streaks, and risk of ruin for your trading strategy.\n\nPrimary Use: Understand worst-case scenarios and ensure your strategy survives variance.",
      button_url: "/calculators/drawdown-calculator/",
    },
    {
      title: "Currency Converter",
      paragraph:
        "Convert between major currencies, crypto, and precious metals. Useful when your account currency differs from trading instruments.\n\nPrimary Use: Quick currency conversions for international trading and profit calculation.",
      button_url: "/calculators/currency-converter/",
    },
    {
      title: "Swap/Overnight Cost Calculator",
      paragraph:
        "Calculate the cost or credit of holding positions overnight. Estimate financing charges for swing trades and longer holds.\n\nPrimary Use: Factor overnight costs into multi-day trading strategies.",
      button_url: "/calculators/swap-calculator/",
    },
    {
      title: "Trading Calculator",
      paragraph:
        "This trading calculator helps you estimate outcomes before you open a position.\n\nPrimary Use: Make more grounded choices with data you can trust.",
      button_url: "/calculators/trading-calculator",
    },
    {
      title: "Compare Broker Costs",
      paragraph:
        "Compare broker costs with verified data. We track the all-in price: spread + commission + swap, across 10+ brokers, updated daily. Run the numbers before you open an account.\n\nPrimary Use: Compare Trading Costs",
      button_url: "/vs",
    },
  ],
  listItems: [
    `<b>Risk Management</b><br/>
The difference between professional and amateur traders often comes down to risk management. Calculators help you determine exact position sizes, potential losses, and whether a trade fits your risk parameters.
`,
    `<b>Remove Emotion</b></br>
When you calculate position size and potential loss before entering, you've already accepted the risk. This removes the emotional decision-making that causes many traders to move stops or overtrade.
`,
    `<b>Consistency</b></br>
Using the same calculation process for every trade creates consistency. Whether the market is trending or ranging, your risk remains controlled.
`,
    `<b>Efficiency</b></br>
Mental math under pressure leads to errors. Let calculators handle the numbers so you can focus on analysis and execution.
`,
  ],
  listBeforeTrade: [
    `Use the <b>Pip Value Calculator</b> to understand movement value`,
    `Use the <b>Position Size Calculator</b> to determine lot size`,
    `Use the <b>Profit/Loss Calculator</b> to preview outcomes`,
    `Use the <b>Margin Calculator</b> to ensure sufficient capital
`,
  ],
  listStrategyPlanning: [
    `Use the <b>Compound Growth Calculator</b> to set realistic goals`,
    `Use the <b>Drawdown Calculator</b> to stress-test your approach`,
    `Use the <b>Swap Calculator</b> for overnight hold strategies`,
  ],
  imageAlt: "A lone Trader on a Subway",
  whyUseHeading: "Why Use Trading Calculators?",
  beforeTheTradeHeading: "Before the Trade",
  strategyPlanningHeading: "For Strategy Planning",
  accountManagementHeading: "For Account Management",
  unavailable: "Page content unavailable",
};

export type CalculatorsPageContent = typeof calculatorsPageContent;
