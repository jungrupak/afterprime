export type LearnGuideFaqItem = { question: string; answer: string };

export type LearnGuideBody = {
  bodyHtml: string;
  faqSectionTitle: string;
  faq: LearnGuideFaqItem[];
};

export const learnGuideBodies: Record<string, LearnGuideBody> = {
  "what-is-cfd-trading": {
    bodyHtml: `<h2>What Is a CFD?</h2>
<p>A CFD (contract for difference) lets you speculate on an asset's price movement without owning the underlying asset. In practice, it's an agreement between you and a broker to exchange the difference in an asset's price between the moment you open a position and the moment you close it.</p>
<h2>Key Mechanics</h2>
<h3>Opening Positions</h3>
<ul>
<li><b>Long positions</b> — you open a buy position because you expect the price to rise.</li>
<li><b>Short positions</b> — you open a sell position because you expect the price to fall.</li>
<li><b>Profit or loss</b> is the price difference multiplied by your position size, in either direction.</li>
</ul>
<h3>The Leverage Factor</h3>
<p>Leverage is the defining characteristic of CFD trading. It lets you put down a relatively small deposit, the margin, to control a much larger position — which magnifies both gains and losses proportionally.</p>
<h2>Tradeable Markets</h2>
<p>CFDs cover most major asset classes, including forex pairs, stock indices, individual shares, and commodities such as gold and oil — all tradeable from a single account.</p>
<h2>Why Traders Use CFDs</h2>
<ul>
<li>Speculating on both rising and falling markets</li>
<li>Capital efficiency through leverage</li>
<li>Multi-asset diversification in one account</li>
<li>Hedging existing positions</li>
<li>No ownership management requirements (no physical delivery, no custody)</li>
</ul>
<h2>Costs &amp; Risks</h2>
<ul>
<li><b>Costs</b> — spreads or commissions, plus overnight financing charges for positions held open past the end of the trading day.</li>
<li><b>Risks</b> — leverage amplifies losses as well as gains, rapid price movements can trigger margin calls, and CFDs are classified as complex instruments unsuitable for all investors.</li>
</ul>
<h2>Suitability</h2>
<p>CFDs suit active traders who are comfortable actively managing leverage and risk. They're poorly suited to a passive, long-term buy-and-hold approach.</p>`,
    faqSectionTitle: "Frequently Asked Questions",
    faq: [
      {
        question: "Do I own the underlying asset when I trade a CFD?",
        answer:
          "No. A CFD is an agreement to exchange the price difference of an asset between opening and closing a position — you never own or take delivery of the underlying asset itself.",
      },
      {
        question: "Can I lose more than my deposit trading CFDs?",
        answer:
          "Leverage means losses can exceed your initial margin in fast-moving markets, which is why risk management (position sizing, stop-losses) is essential when trading CFDs.",
      },
      {
        question: "What does it cost to hold a CFD position?",
        answer:
          "The main costs are the spread or commission on entry and exit, plus an overnight financing charge if you hold the position open past the end of the trading day.",
      },
    ],
  },
  "how-to-open-a-cfd-position": {
    bodyHtml: `<h2>How to Open a CFD Position</h2>
<p>Every CFD trade follows the same basic sequence, regardless of the market you're trading: pick a market, decide on direction, size the position, and place the order.</p>
<h2>Choosing a Market and Direction</h2>
<p>Start by selecting the instrument you want to trade, then decide whether you expect its price to rise or fall. A rising-price view means opening a long (buy) position; a falling-price view means opening a short (sell) position.</p>
<h2>Sizing and Placing the Trade</h2>
<ul>
<li>Decide your position size based on how much capital you're willing to risk.</li>
<li>Set a stop-loss and, optionally, a take-profit level before you enter.</li>
<li>Confirm the order and monitor the position until you're ready to close it.</li>
</ul>
<h2>Closing the Position</h2>
<p>Closing a CFD position is simply the reverse of opening it — a long position is closed with a sell order, a short position with a buy order — realizing the profit or loss at that point.</p>`,
    faqSectionTitle: "Frequently Asked Questions",
    faq: [
      {
        question: "Do I need to manually close a CFD position?",
        answer:
          "Yes, unless you've set an automatic take-profit or stop-loss level, a CFD position stays open until you close it manually or it's closed automatically by your risk settings.",
      },
      {
        question: "What happens if I hold a CFD position overnight?",
        answer:
          "Positions held open past the end of the trading day typically incur an overnight financing charge, in addition to the spread or commission paid when the trade was opened.",
      },
      {
        question: "Can I open a CFD position with a small amount of capital?",
        answer:
          "Yes — leverage means a relatively small deposit (margin) can control a larger position size, though this also increases the risk of loss.",
      },
    ],
  },
  "cfd-scalping-strategy": {
    bodyHtml: `<h2>CFD Scalping Strategy</h2>
<p>Scalping is a short-term trading style built around taking many small profits from minor price movements, often holding a position for just seconds or minutes.</p>
<h2>What Scalping Requires</h2>
<ul>
<li>Fast, reliable trade execution with minimal slippage.</li>
<li>Tight spreads, since profit targets per trade are small.</li>
<li>Strict discipline around entries, exits, and position sizing.</li>
</ul>
<h2>Managing the Risks</h2>
<p>Because scalping relies on a high number of trades, transaction costs and execution speed matter more than in longer-term strategies — a broker's spread and order execution quality can materially affect profitability.</p>`,
    faqSectionTitle: "Frequently Asked Questions",
    faq: [
      {
        question: "How long does a typical scalping trade last?",
        answer:
          "Scalping trades are usually held for seconds to a few minutes, aiming to capture small, frequent price movements rather than a single large move.",
      },
      {
        question: "Why do spreads matter more for scalping than other strategies?",
        answer:
          "Because scalping profit targets are small, a wide spread can consume a large share of the potential profit on every trade, making tight spreads and fast execution essential.",
      },
      {
        question: "Is scalping suitable for beginners?",
        answer:
          "Scalping demands quick decision-making and strict discipline, which makes it more suited to traders who already have experience managing risk and executing trades under time pressure.",
      },
    ],
  },
  "cfd-day-trading": {
    bodyHtml: `<h2>CFD Day Trading</h2>
<p>Day trading means opening and closing all CFD positions within a single trading session, so no position is left open overnight.</p>
<h2>Why Traders Day Trade CFDs</h2>
<ul>
<li>Avoiding overnight financing charges on open positions.</li>
<li>Avoiding the risk of price gaps between one session's close and the next session's open.</li>
<li>Focusing on intraday price action rather than multi-day trends.</li>
</ul>
<h2>What It Takes</h2>
<p>Day trading requires actively watching the market during the session, since every position needs to be managed and closed before the day ends.</p>`,
    faqSectionTitle: "Frequently Asked Questions",
    faq: [
      {
        question: "Why do day traders avoid holding positions overnight?",
        answer:
          "Holding a CFD position overnight typically incurs a financing charge, and exposes the position to price gaps that can occur outside trading hours.",
      },
      {
        question: "Do I need to watch the market constantly to day trade?",
        answer:
          "Day trading generally requires closer, more active monitoring during the session than longer-term strategies, since positions are opened and closed within the same day.",
      },
      {
        question: "Can day trading be combined with other CFD strategies?",
        answer:
          "Yes — day trading describes a holding-period style rather than a specific technique, so it can be combined with approaches like trend following or breakout trading within the same session.",
      },
    ],
  },
  "cfd-swing-trading": {
    bodyHtml: `<h2>CFD Swing Trading</h2>
<p>Swing trading aims to capture medium-term price moves by holding CFD positions for several days to a few weeks, rather than closing them within a single session.</p>
<h2>How Swing Trading Works</h2>
<ul>
<li>Positions are based on multi-day chart setups rather than intraday price action.</li>
<li>Trades are held through normal overnight periods, so financing costs apply.</li>
<li>Wider stop-losses are often used to accommodate normal day-to-day price fluctuation.</li>
</ul>
<h2>Managing an Open Swing Position</h2>
<p>Because positions stay open longer, swing traders need to account for overnight financing charges and monitor for news or events that could move the market between sessions.</p>`,
    faqSectionTitle: "Frequently Asked Questions",
    faq: [
      {
        question: "How long is a typical swing trade held open?",
        answer:
          "Swing trades are typically held from a few days to a few weeks, aiming to capture a single medium-term price move rather than many small ones.",
      },
      {
        question: "Does swing trading cost more than day trading?",
        answer:
          "Swing positions are held overnight, so they accrue financing charges that day trades avoid — this is an ongoing cost to weigh against the strategy's larger profit targets.",
      },
      {
        question: "What kind of stop-loss is typical for swing trading?",
        answer:
          "Swing traders often use wider stop-losses than day traders, since the position needs room to accommodate normal short-term price fluctuation over several days.",
      },
    ],
  },
  "trend-following-with-cfds": {
    bodyHtml: `<h2>Trend Following with CFDs</h2>
<p>Trend following means identifying a market that's moving persistently in one direction and opening a CFD position in that same direction, aiming to stay in the trade for as long as the trend continues.</p>
<h2>Identifying a Trend</h2>
<ul>
<li>Price making a series of higher highs and higher lows (uptrend), or lower highs and lower lows (downtrend).</li>
<li>Trend indicators such as moving averages used to confirm direction.</li>
</ul>
<h2>Managing a Trend-Following Position</h2>
<p>Because the goal is to stay in the trade while the trend lasts, trend followers typically use a trailing stop-loss that moves with the price, protecting profit while leaving room for the trend to continue.</p>`,
    faqSectionTitle: "Frequently Asked Questions",
    faq: [
      {
        question: "How do I know when a trend has ended?",
        answer:
          "Traders typically watch for the price breaking a key support or resistance level, or a trend indicator like a moving average crossing in the opposite direction, as signs a trend may be ending.",
      },
      {
        question: "What's a trailing stop-loss?",
        answer:
          "A trailing stop-loss automatically moves with the price as a trend continues, locking in more profit as the position moves in your favor while still limiting the downside if the trend reverses.",
      },
      {
        question: "Does trend following work in all market conditions?",
        answer:
          "Trend following performs best in markets with sustained directional moves, and tends to underperform in choppy or range-bound conditions where price lacks a clear direction.",
      },
    ],
  },
  "breakout-trading-with-cfds": {
    bodyHtml: `<h2>Breakout Trading with CFDs</h2>
<p>Breakout trading means opening a CFD position when price moves decisively through a key support or resistance level, on the expectation that the move will continue in that direction.</p>
<h2>Spotting a Breakout</h2>
<ul>
<li>Identifying a price level the market has repeatedly failed to move through.</li>
<li>Watching for a decisive close beyond that level, often with increased trading volume.</li>
</ul>
<h2>The False Breakout Risk</h2>
<p>Not every breakout continues — price can push briefly through a level and then reverse, known as a false breakout. Managing this risk with a clear stop-loss is a core part of the strategy.</p>`,
    faqSectionTitle: "Frequently Asked Questions",
    faq: [
      {
        question: "What is a false breakout?",
        answer:
          "A false breakout happens when price moves beyond a support or resistance level but then reverses back, rather than continuing in the breakout direction — a common risk breakout traders manage with stop-losses.",
      },
      {
        question: "What confirms a breakout is genuine?",
        answer:
          "Traders often look for a decisive close beyond the level, sometimes alongside higher trading volume, as more convincing evidence that the breakout will continue rather than reverse.",
      },
      {
        question: "Where do breakout traders typically place a stop-loss?",
        answer:
          "A common approach is placing the stop-loss just back on the other side of the broken support or resistance level, so the position is closed if the breakout turns out to be false.",
      },
    ],
  },
  "mean-reversion-trading-with-cfds": {
    bodyHtml: `<h2>Mean Reversion Trading with CFDs</h2>
<p>Mean reversion trading is based on the idea that price tends to return toward its average after moving too far in one direction, and it opens CFD positions to trade that expected pullback.</p>
<h2>Identifying an Overextended Move</h2>
<ul>
<li>Price moving well beyond its recent average or trading range.</li>
<li>Momentum indicators signaling an "overbought" or "oversold" condition.</li>
</ul>
<h2>Trading the Pullback</h2>
<p>A mean reversion trader opens a position expecting price to move back toward its average — a sell after an overextended rally, or a buy after an overextended decline.</p>`,
    faqSectionTitle: "Frequently Asked Questions",
    faq: [
      {
        question: "How is mean reversion different from trend following?",
        answer:
          "Trend following trades in the direction of an established move, while mean reversion trades against an overextended move, expecting price to pull back toward its average.",
      },
      {
        question: "What indicators are commonly used for mean reversion?",
        answer:
          "Momentum indicators that flag \"overbought\" or \"oversold\" conditions are commonly used to help identify when a price move may be overextended and due for a pullback.",
      },
      {
        question: "Is mean reversion riskier in a strong trend?",
        answer:
          "Yes — trading against a strong, sustained trend on the assumption of a pullback that doesn't arrive is one of the main risks of a mean reversion approach.",
      },
    ],
  },
  "how-to-short-sell-cfds": {
    bodyHtml: `<h2>How to Short Sell CFDs</h2>
<p>Short selling a CFD means opening a sell position because you expect the market's price to fall, profiting from the difference if it does.</p>
<h2>Opening a Short Position</h2>
<ul>
<li>Select the market you expect to decline in price.</li>
<li>Open a sell position rather than a buy position.</li>
<li>Set a stop-loss to limit potential losses if the price rises instead.</li>
</ul>
<h2>The Risk of Shorting</h2>
<p>Because a short position loses money if price rises, and a rising price technically has no upper limit, risk management — particularly a stop-loss — is especially important when short selling.</p>`,
    faqSectionTitle: "Frequently Asked Questions",
    faq: [
      {
        question: "Do I need to borrow the asset to short sell a CFD?",
        answer:
          "No — because a CFD is an agreement on price difference rather than the asset itself, opening a short (sell) position doesn't require borrowing or owning the underlying asset.",
      },
      {
        question: "Why is short selling considered riskier than going long?",
        answer:
          "A long position's potential loss is capped at the price falling to zero, while a short position's potential loss is theoretically unlimited if the price keeps rising, making risk controls especially important.",
      },
      {
        question: "Can I short sell any market with a CFD?",
        answer:
          "Most markets available as CFDs — forex, indices, shares, and commodities — can be shorted the same way they can be bought long, subject to your broker's specific offering.",
      },
    ],
  },
  "risk-management-in-cfd-trading": {
    bodyHtml: `<h2>Risk Management in CFD Trading</h2>
<p>Because leverage magnifies both gains and losses, managing risk is central to trading CFDs sustainably, rather than an optional extra.</p>
<h2>Core Risk Controls</h2>
<ul>
<li><b>Position sizing</b> — risking only a small, defined portion of your capital on any single trade.</li>
<li><b>Stop-losses</b> — setting a level that automatically closes a losing position before losses grow too large.</li>
<li><b>Leverage awareness</b> — using lower leverage, or a smaller position size, to keep potential losses within a comfortable range.</li>
</ul>
<h2>Building a Risk Management Habit</h2>
<p>Consistent risk management applies the same controls to every trade, regardless of how confident you feel about a particular setup — this consistency is what protects capital over the long run.</p>`,
    faqSectionTitle: "Frequently Asked Questions",
    faq: [
      {
        question: "How much of my capital should I risk on a single CFD trade?",
        answer:
          "Many traders limit risk on any single trade to a small percentage of their total capital, so that a string of losing trades doesn't seriously deplete their account.",
      },
      {
        question: "What does a stop-loss actually do?",
        answer:
          "A stop-loss is an order that automatically closes your position once price reaches a specified level, limiting how much you can lose on that trade if the market moves against you.",
      },
      {
        question: "Does lower leverage mean lower risk?",
        answer:
          "Using lower leverage, or a smaller position size for the same capital, reduces how much a given price move affects your account, which lowers the risk of a single trade relative to your overall capital.",
      },
    ],
  },
  "hedging-with-cfds": {
    bodyHtml: `<h2>Hedging with CFDs</h2>
<p>Hedging means opening a CFD position that offsets risk in an existing trade or portfolio, rather than opening a position purely to profit from a new market view.</p>
<h2>How a CFD Hedge Works</h2>
<ul>
<li>Opening an opposite position to an existing holding, so a loss in one is offset by a gain in the other.</li>
<li>Hedging a portfolio's overall market exposure rather than a single position.</li>
</ul>
<h2>When Traders Hedge</h2>
<p>Traders commonly hedge ahead of events they expect to increase volatility, or when they want to reduce risk temporarily without closing an existing long-term position.</p>`,
    faqSectionTitle: "Frequently Asked Questions",
    faq: [
      {
        question: "Does hedging eliminate risk completely?",
        answer:
          "No — hedging offsets risk rather than eliminating it entirely, and the cost of maintaining the hedge (such as financing charges) is itself a factor to weigh against the risk it reduces.",
      },
      {
        question: "Can I hedge a single position or only a whole portfolio?",
        answer:
          "Both are possible — a CFD can be used to offset the risk of a single specific holding, or sized to offset the broader market exposure of an entire portfolio.",
      },
      {
        question: "Why use a CFD to hedge instead of closing the original position?",
        answer:
          "Hedging with a CFD lets you reduce risk temporarily without closing a position you intend to hold long-term, which can avoid triggering other costs or consequences of closing it outright.",
      },
    ],
  },
  "cfd-trading-for-diversification": {
    bodyHtml: `<h2>CFD Trading for Diversification</h2>
<p>CFDs make it possible to gain exposure to a wide range of markets — forex, indices, shares, and commodities — from a single account, without needing to own or hold any of the underlying assets.</p>
<h2>Why CFDs Suit Diversification</h2>
<ul>
<li>Access to multiple asset classes through one trading account.</li>
<li>No need to separately open accounts or hold physical assets for each market.</li>
<li>Ability to take both long and short positions across markets.</li>
</ul>
<h2>A Note of Caution</h2>
<p>Diversifying across markets doesn't remove the leverage and volatility risks inherent to each individual CFD position — every position still needs its own risk management.</p>`,
    faqSectionTitle: "Frequently Asked Questions",
    faq: [
      {
        question: "Does trading CFDs across multiple markets reduce my overall risk?",
        answer:
          "Spreading exposure across uncorrelated markets can reduce concentration in any one asset, but each CFD position still carries its own leverage and volatility risk that needs to be managed individually.",
      },
      {
        question: "Do I need a separate account for each asset class?",
        answer:
          "No — one of the advantages of CFDs is that forex, indices, shares, and commodities can typically all be traded from the same account.",
      },
      {
        question: "Can I diversify with both long and short CFD positions?",
        answer:
          "Yes — CFDs let you take a long or short view on each market independently, which is part of what makes them flexible for building a diversified set of positions.",
      },
    ],
  },
  "cfd-trading-vs-forex-trading": {
    bodyHtml: `<h2>CFD Trading vs Forex Trading</h2>
<p>Trading a currency pair as a CFD and trading it as spot forex both let you speculate on the same underlying exchange rate — the difference is in the product structure wrapped around that exposure.</p>
<h2>Key Differences</h2>
<ul>
<li>A CFD can also give access to indices, shares, and commodities from the same account, while spot forex is limited to currency pairs.</li>
<li>Cost structures (spread, commission, financing) can differ between a broker's CFD and spot forex offerings.</li>
<li>Contract specifications and margin requirements can vary by product and broker.</li>
</ul>
<h2>Choosing Between Them</h2>
<p>For traders who only want currency exposure, the choice often comes down to a specific broker's costs and execution. For traders who want forex alongside other asset classes in one account, CFDs offer that flexibility directly.</p>`,
    faqSectionTitle: "Frequently Asked Questions",
    faq: [
      {
        question: "Is a currency CFD the same as spot forex?",
        answer:
          "They both track the same underlying exchange rate, but they're structured as different products, which can mean differences in cost structure, contract specifications, and what else you can trade from the same account.",
      },
      {
        question: "Can I trade forex and other assets from the same CFD account?",
        answer:
          "Yes — a CFD account typically covers multiple asset classes, including forex, indices, shares, and commodities, whereas a dedicated spot forex account is limited to currency pairs.",
      },
      {
        question: "Which has lower costs, CFDs or spot forex?",
        answer:
          "Cost comparisons depend on the specific broker's spreads, commissions, and financing rates for each product, so it's worth comparing a broker's actual costs rather than assuming one product type is always cheaper.",
      },
    ],
  },
  "cfd-trading-vs-spread-betting": {
    bodyHtml: `<h2>CFD Trading vs Spread Betting</h2>
<p>CFDs and spread betting are both leveraged products that let you speculate on price movements without owning the underlying asset, but they differ in structure, tax treatment, and availability.</p>
<h2>Key Differences</h2>
<ul>
<li>Spread betting is structured as a bet on price movement, while a CFD is structured as a contract for the price difference.</li>
<li>Tax treatment differs by jurisdiction, and spread betting is only available in certain countries.</li>
<li>CFDs are more widely available internationally than spread betting.</li>
</ul>
<h2>Choosing Between Them</h2>
<p>Where both are available, the choice often comes down to tax treatment in your jurisdiction and which product a broker offers with the market access and costs you want.</p>`,
    faqSectionTitle: "Frequently Asked Questions",
    faq: [
      {
        question: "Is spread betting available everywhere CFDs are?",
        answer:
          "No — spread betting is only offered in certain jurisdictions, while CFDs are more widely available internationally, so product availability itself often decides which one you can use.",
      },
      {
        question: "Do CFDs and spread betting have the same tax treatment?",
        answer:
          "Tax treatment varies by jurisdiction and can differ significantly between the two products, so it's worth checking the specific rules that apply to you rather than assuming they're taxed the same way.",
      },
      {
        question: "Which product has more market access?",
        answer:
          "CFDs are generally offered across a broader international market and product range, while spread betting availability tends to be more limited to specific regions.",
      },
    ],
  },
  "gold-cfd-trading": {
    bodyHtml: `<h2>Gold CFD Trading</h2>
<p>A gold CFD lets you speculate on the price of gold rising or falling without buying, storing, or insuring physical gold.</p>
<h2>What Moves the Gold Market</h2>
<ul>
<li>Broader risk sentiment — gold is often bought as a safe-haven asset during uncertainty.</li>
<li>Interest rates and currency strength, particularly the US dollar.</li>
<li>Inflation expectations and central bank buying activity.</li>
</ul>
<h2>Trading Gold as a CFD</h2>
<p>Position sizing and margin requirements for gold CFDs typically follow the same principles as other CFD markets — a relatively small deposit controls a larger position, so risk management applies just as it does elsewhere.</p>`,
    faqSectionTitle: "Frequently Asked Questions",
    faq: [
      {
        question: "Why is gold considered a safe-haven asset?",
        answer:
          "Gold has historically held its value during periods of economic or political uncertainty, which is why demand for it often rises when broader risk sentiment falls.",
      },
      {
        question: "Do I need to store gold to trade a gold CFD?",
        answer:
          "No — a gold CFD tracks the price of gold without requiring you to buy, store, or insure any physical gold.",
      },
      {
        question: "What typically affects the gold price the most?",
        answer:
          "Gold prices are commonly influenced by risk sentiment, interest rates, US dollar strength, and inflation expectations, among other macroeconomic factors.",
      },
    ],
  },
};
