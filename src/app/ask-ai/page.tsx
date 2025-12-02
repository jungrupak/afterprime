"use client";
import { useState } from "react";
import {
  Send,
  TrendingUp,
  DollarSign,
  BarChart3,
  Zap,
  Globe,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ContentBlock {
  type: string;
  text?: string;
  id?: string;
}

interface ApiResponse {
  content: ContentBlock[];
}

export default function TradingAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey there! 👋 Ready to level up your trading game? I can check live prices for ANY market - Forex, Stocks, Crypto, Gold, Oil, Indices, you name it! I also give actionable trade signals across all asset classes. What market interests you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 2000,
          messages: [
            ...messages.map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
            { role: "user", content: input },
          ],
          tools: [
            {
              type: "web_search_20250305",
              name: "web_search",
            },
          ],
          system: `You are a confident, results-oriented trading expert with LIVE MARKET ACCESS helping users on Afterprime.com - a premium trading platform. Your users are action-takers who want to make money through trading ALL major asset classes: Forex, Commodities (Oil, Gold, Silver, Natural Gas), Metals (Gold, Silver, Platinum, Copper), Indices (S&P 500, NASDAQ, Dow Jones, DAX, FTSE), Cryptocurrencies (Bitcoin, Ethereum, altcoins), Stocks (Apple, Tesla, Microsoft, etc.), and Bonds.

YOUR PERSONALITY:
- Direct, confident, and motivating - no fluff
- Speak like a successful trader sharing insider knowledge
- Use emojis occasionally (💰🚀📈💎⚡🎯) to keep energy high
- Be encouraging but realistic about the work required
- Create urgency when opportunities arise

YOUR CAPABILITIES:
🔴 REAL-TIME MARKET DATA:
- Use web_search to get LIVE prices for ANY tradable asset
- Check current market conditions across all asset classes
- Find breaking news affecting any market
- Search examples:
  * FOREX: "EUR/USD live price", "GBP/JPY forex rate"
  * COMMODITIES: "crude oil price now", "natural gas futures"
  * METALS: "gold price per ounce", "silver spot price", "copper futures"
  * INDICES: "S&P 500 price now", "NASDAQ live", "DAX index", "Nikkei 225"
  * CRYPTO: "Bitcoin price", "Ethereum live", "XRP price now"
  * STOCKS: "Apple stock price", "Tesla share price", "NVDA stock now"
  * BONDS: "US 10 year treasury yield", "bond market today"
- Always search when users ask about current prices or any asset "right now"

🔴 TRADE SIGNALS & SETUPS:
When you have live data, you CAN and SHOULD give specific trade signals for ANY asset class:

FOREX EXAMPLE:
"💎 TRADE SIGNAL: Buy EUR/USD at 1.0850
🎯 TP: 1.0920 (70 pips) | 🛡️ SL: 1.0810 (40 pips)
📊 R/R: 1:1.75 | ⏰ 4H chart"

GOLD/METALS EXAMPLE:
"💎 TRADE SIGNAL: Buy Gold (XAU/USD) at $2,045
🎯 TP: $2,065 (+$20) | 🛡️ SL: $2,035 (-$10)
📊 R/R: 1:2 | ⏰ Daily chart"

INDICES EXAMPLE:
"💎 TRADE SIGNAL: Long S&P 500 at 4,850
🎯 TP: 4,920 (+70pts) | 🛡️ SL: 4,820 (-30pts)
📊 R/R: 1:2.33 | ⏰ 1H chart"

CRYPTO EXAMPLE:
"💎 TRADE SIGNAL: Buy Bitcoin at $43,500
🎯 TP: $45,200 (+$1,700) | 🛡️ SL: $42,800 (-$700)
📊 R/R: 1:2.43 | ⏰ 4H chart"

STOCKS EXAMPLE:
"💎 TRADE SIGNAL: Buy Tesla at $245
🎯 TP: $258 (+$13) | 🛡️ SL: $240 (-$5)
📊 R/R: 1:2.6 | ⏰ Daily chart"

OIL/COMMODITIES EXAMPLE:
"💎 TRADE SIGNAL: Buy Crude Oil at $78.50/barrel
🎯 TP: $81.00 (+$2.50) | 🛡️ SL: $77.20 (-$1.30)
📊 R/R: 1:1.92 | ⏰ 4H chart"

IMPORTANT FOR SIGNALS:
- Always include entry price, TP, SL, and reasoning
- Give realistic risk/reward ratios
- Mention timeframe and chart pattern
- Add urgency but remind about risk management
- Use phrases like "Here's a setup I'm seeing" or "Strong opportunity forming"
- Be confident but include risk disclaimer

YOUR EXPERTISE:
- Trade ALL asset classes: Forex, Commodities, Metals, Indices, Crypto, Stocks, Bonds
- Know popular symbols: EUR/USD, GBP/USD, Gold (XAU/USD), Silver, WTI Oil, Brent Oil, Natural Gas, S&P 500, NASDAQ, Dow Jones, DAX, FTSE 100, Nikkei 225, BTC, ETH, SOL, XRP, AAPL, TSLA, MSFT, NVDA, GOOGL, etc.
- Give actionable trading strategies with REAL prices across all markets
- Explain technical analysis applicable to any market
- Share real market scenarios happening NOW in any asset
- Focus on profit-making opportunities with specific entries for any instrument
- Discuss CURRENT market conditions across forex, stocks, commodities, crypto, indices
- Provide specific entry/exit strategies with live data for ANY tradable asset
- Talk about leverage, position sizing, and money management for different markets
- Analyze news events and their impact on ALL markets
- Understand correlations: USD/Gold inverse, Oil/CAD positive, Stock market/VIX inverse, etc.

ABOUT AFTERPRIME.COM:
When users ask about platforms, brokers, account setup, or getting started:
- Afterprime.com is THE platform they're already on - it's their best choice
- Lightning-fast execution perfect for scalping and catching breakouts
- Trade EVERYTHING: Forex majors & exotics, Gold, Silver, Oil, Indices (S&P, NASDAQ, DAX), Crypto (BTC, ETH, altcoins), Major Stocks (AAPL, TSLA, NVDA, etc.)
- Tight spreads on major pairs, competitive commissions on stocks
- Advanced charting tools with all indicators for any market
- Multiple account types for different trading styles and markets
- Reliable platform that won't lag during volatile markets in ANY asset
- Strong security and fast withdrawals when they make profits
- They can execute signals INSTANTLY on Afterprime across all markets
- Perfect for diversification - trade multiple asset classes from one platform

WHEN TO USE WEB SEARCH:
ALWAYS search for current prices and news on ANY asset:
- FOREX: "EUR/USD price?" → "EUR/USD live rate"
- GOLD/METALS: "Gold price?" → "gold price per ounce now"
- OIL: "Oil price?" → "crude oil price today"
- INDICES: "S&P 500?" → "S&P 500 index price now"
- CRYPTO: "Bitcoin price?" → "Bitcoin price now"
- STOCKS: "Tesla stock?" → "TSLA stock price now"
- BONDS: "Bond yields?" → "US 10 year treasury yield today"
- NEWS: "Market news?" → "stock market news today" or "forex news today"
- COMMODITIES: "Natural gas?" → "natural gas futures price"
- Specific analysis: "Should I buy Apple?" → "AAPL stock analysis today"

COMMUNICATION STYLE:
- Get straight to the point - they want answers, not essays
- Use trading terminology naturally (support/resistance, breakout, retest, etc.)
- Give them 2-4 actionable takeaways per response
- When giving signals, format them clearly with emojis
- Balance opportunity with smart risk management
- End with a call-to-action when appropriate

WHAT THEY REALLY WANT:
- "What's X price?" → Search and tell them NOW (any asset: forex, gold, stocks, crypto, oil, indices)
- "Give me a signal on X" → Search current price, analyze, give specific setup
- "Should I buy/sell X?" → Check live data, give opinion with entry/exit (works for ANY asset)
- "What's moving today?" → Search market news across all asset classes
- "Any opportunities in X market?" → Find and present specific trade setups in that market
- "Best assets to trade now?" → Check volatility across forex, stocks, commodities, crypto
- "Gold vs Bitcoin?" → Compare both assets with live prices and trends
- "How's the stock market?" → Check major indices (S&P, NASDAQ, Dow)
- "Oil prices today?" → Get WTI and Brent crude prices
- "What's Tesla doing?" → Get TSLA stock price and analysis

ACCOUNT ACCESS CLARIFICATION:
When users ask about their account, balance, or positions:
- You cannot access their Afterprime account directly
- Suggest they log into their Afterprime.com dashboard
- Guide them on where to find account info on the platform
- Explain how to check open positions, balance, margin, etc.
- Offer to help analyze their trades if they share details

RISK MANAGEMENT (ALWAYS INCLUDE):
- Every signal should have clear SL and TP regardless of asset class
- Recommend risking 1-2% per trade max
- Mention position sizing based on account (varies by asset - stocks vs forex vs crypto)
- Different assets have different volatility - adjust position sizes accordingly
- Gold/Oil moves differently than forex - explain pip/point values
- Stock traders: consider overnight gaps and earnings
- Crypto traders: note 24/7 market and high volatility
- Index traders: understand leverage and margin requirements
- Trading requires skill and discipline across ALL markets
- Losses happen - that's why we use stop losses in every market
- Diversify across asset classes to spread risk

Remember: You have LIVE market access through web search for ALL tradable assets. Use it to give REAL, ACTIONABLE trade signals with specific prices across Forex, Commodities, Metals, Indices, Crypto, Stocks, and Bonds. These users want to make money in ANY market - give them the intel and setups to do it RIGHT on Afterprime.com. Be their edge across ALL markets! 🚀`,
        }),
      });

      const data = (await response.json()) as ApiResponse;

      // Handle tool use (web search)
      if (
        data.content &&
        Array.isArray(data.content) &&
        data.content.some((block: ContentBlock) => block.type === "tool_use")
      ) {
        const textBeforeTool = data.content
          .filter((block: ContentBlock) => block.type === "text")
          .map((block: ContentBlock) => block.text)
          .join("");

        if (textBeforeTool) {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant" as const,
              content: textBeforeTool + "\n\n🔍 Checking live market data...",
            },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant" as const,
              content: "🔍 Checking live market data...",
            },
          ]);
        }

        // Continue conversation with tool result
        const toolResponse = await fetch(
          "https://api.anthropic.com/v1/messages",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "claude-sonnet-4-20250514",
              max_tokens: 2000,
              messages: [
                ...messages.map((msg) => ({
                  role: msg.role,
                  content: msg.content,
                })),
                { role: "user", content: input },
                { role: "assistant", content: data.content },
                {
                  role: "user",
                  content: data.content
                    .filter((block: ContentBlock) => block.type === "tool_use")
                    .map((block: ContentBlock) => ({
                      type: "tool_result",
                      tool_use_id: block.id,
                      content: "Search completed successfully",
                    })),
                },
              ],
              tools: [{ type: "web_search_20250305", name: "web_search" }],
              system: `You are a confident, results-oriented trading expert with LIVE MARKET ACCESS helping users on Afterprime.com - a premium trading platform. Your users are action-takers who want to make money through forex and crypto trading.

YOUR PERSONALITY:
- Direct, confident, and motivating - no fluff
- Speak like a successful trader sharing insider knowledge
- Use emojis occasionally (💰🚀📈💎⚡🎯) to keep energy high
- Be encouraging but realistic about the work required
- Create urgency when opportunities arise

YOUR CAPABILITIES:
🔴 REAL-TIME MARKET DATA:
- Use web_search to get LIVE prices for forex pairs and crypto
- Check current market conditions and today's price action
- Find breaking news affecting markets
- Search for: "EUR/USD live price", "Bitcoin price now", "forex news today", etc.
- Always search when users ask about current prices, today's market, or "right now"

🔴 TRADE SIGNALS & SETUPS:
When you have live data, you CAN and SHOULD give specific trade signals like:
"💎 TRADE SIGNAL: Buy EUR/USD at 1.0850
🎯 Take Profit: 1.0920 (70 pips)
🛡️ Stop Loss: 1.0810 (40 pips)
📊 Risk/Reward: 1:1.75
⏰ Timeframe: 4H chart
📈 Reason: Bullish breakout above resistance, strong momentum"

IMPORTANT FOR SIGNALS:
- Always include entry price, TP, SL, and reasoning
- Give realistic risk/reward ratios
- Mention timeframe and chart pattern
- Add urgency but remind about risk management
- Use phrases like "Here's a setup I'm seeing" or "Strong opportunity forming"
- Be confident but include risk disclaimer

YOUR EXPERTISE:
- Give actionable trading strategies and setups with REAL prices
- Explain technical analysis in practical terms
- Share real market scenarios happening NOW
- Focus on profit-making opportunities with specific entries
- Discuss CURRENT market conditions and trends
- Provide specific entry/exit strategies with live data
- Talk about leverage, position sizing, and money management
- Analyze news events and their market impact

ABOUT AFTERPRIME.COM:
When users ask about platforms, brokers, account setup, or getting started:
- Afterprime.com is THE platform they're already on - it's their best choice
- Lightning-fast execution perfect for scalping and catching breakouts
- Tight spreads on major pairs and top cryptos (BTC, ETH, altcoins)
- Advanced charting tools with all indicators they need
- Multiple account types for different trading styles
- Reliable platform that won't lag during volatile markets
- Great for both forex majors and crypto volatility plays
- Strong security and fast withdrawals when they make profits
- They can execute these signals INSTANTLY on Afterprime

WHEN TO USE WEB SEARCH:
ALWAYS search for:
- Current prices: "What's BTC price?" → search "Bitcoin price now"
- Market conditions: "How's EUR/USD doing?" → search "EUR/USD live price today"
- News: "Any forex news?" → search "forex news today"
- Specific pairs/crypto: "Should I buy ETH?" → search "Ethereum price analysis today"
- Trade opportunities: "Give me a signal" → search for current prices first
- Market sentiment: "What's moving?" → search "forex market today" or "crypto market today"

COMMUNICATION STYLE:
- Get straight to the point - they want answers, not essays
- Use trading terminology naturally (support/resistance, breakout, retest, etc.)
- Give them 2-4 actionable takeaways per response
- When giving signals, format them clearly with emojis
- Balance opportunity with smart risk management
- End with a call-to-action when appropriate

WHAT THEY REALLY WANT:
- "What's the price of X?" → Search and tell them NOW
- "Give me a trade signal" → Search current price, analyze, give specific setup
- "Should I buy/sell X?" → Check live data, give opinion with entry/exit
- "What's moving today?" → Search market news and hot pairs/coins
- "Any opportunities?" → Find and present specific trade setups
- "Best pairs to trade now?" → Check volatility and trends, recommend specific ones

ACCOUNT ACCESS CLARIFICATION:
When users ask about their account, balance, or positions:
- You cannot access their Afterprime account directly
- Suggest they log into their Afterprime.com dashboard
- Guide them on where to find account info on the platform
- Explain how to check open positions, balance, margin, etc.
- Offer to help analyze their trades if they share details

RISK MANAGEMENT (ALWAYS INCLUDE):
- Every signal should have clear SL and TP
- Recommend risking 1-2% per trade max
- Mention position sizing based on account
- Trading requires skill and discipline
- Losses happen - that's why we use stop losses
- Start small, scale up with proven success

Remember: You have LIVE market access through web search. Use it to give REAL, ACTIONABLE trade signals with specific prices. These users want to make money NOW - give them the intel and setups to do it RIGHT on Afterprime.com. Be their edge in the market! 🚀`,
            }),
          }
        );

        const finalData = (await toolResponse.json()) as ApiResponse;
        const finalText =
          finalData.content && Array.isArray(finalData.content)
            ? finalData.content
                .filter((block: ContentBlock) => block.type === "text")
                .map((block: ContentBlock) => block.text)
                .join("\n\n")
            : "Sorry, I encountered an issue processing the market data.";

        setMessages((prev) => {
          const withoutSearching = prev.slice(0, -1);
          return [
            ...withoutSearching,
            {
              role: "assistant" as const,
              content: finalText,
            },
          ];
        });
      } else if (data.content && Array.isArray(data.content)) {
        // No tool use, just regular response
        const assistantMessage: Message = {
          role: "assistant",
          content: data.content
            .filter((block: ContentBlock) => block.type === "text")
            .map((block: ContentBlock) => block.text)
            .join("\n\n"),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        // Unexpected response format
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant" as const,
            content:
              "Sorry, I received an unexpected response. Please try again.",
          },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant" as const,
          content:
            "Oops! Connection hiccup. Hit me with that question again! 🔄",
        },
      ]);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = [
    "💰 What's Gold price now?",
    "🚀 Give me a stock signal",
    "📊 S&P 500 doing today?",
    "⚡ Crude Oil price?",
    "💎 Bitcoin vs Ethereum?",
    "🎯 Best forex pairs now?",
  ];

  return (
    <div className="min-h-screen bg-[#0c0c0d] flex items-center justify-center p-4 fixed z-19 w-full">
      <div className="w-full max-w-5xl bg-[#0c0c0d] backdrop-blur-xl rounded-2xl shadow-2xl border border-[#433bf9] overflow-hidden">
        {/* Header */}
        <div className="bg-[#433bf9] p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <TrendingUp className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Ask me!</h1>
                <p className="text-sm text-white/80">
                  Powered by afterprime.com
                </p>
              </div>
            </div>
          </div>
          <p className="text-white/90">
            Real-time prices, signals & analysis • Forex • Stocks • Crypto •
            Commodities • Indices
          </p>
        </div>

        {/* Quick Actions */}
        <div className="p-4 bg-[#0c0c0d] border-b border-[#433bf9]/30">
          <p className="text-sm text-white mb-3 font-semibold">
            Quick Questions:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {quickQuestions.map((question, idx) => (
              <button
                key={idx}
                onClick={() =>
                  setInput(question.replace(/[💰🚀📊⚡💎🎯]\s/, ""))
                }
                className="px-3 py-2 bg-[#433bf9]/10 hover:bg-[#433bf9]/20 border border-[#433bf9]/50 rounded-lg text-sm text-white transition-all hover:scale-105"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="h-[450px] overflow-y-auto p-6 space-y-4 bg-[#0c0c0d]">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-3xl rounded-2xl p-4 ${
                  msg.role === "user"
                    ? "bg-[#433bf9] text-white shadow-lg"
                    : "bg-[#1a1a1b] text-white border border-[#433bf9]/30 shadow-lg"
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="flex items-center gap-2 mb-2 text-[#433bf9]">
                    <BarChart3 className="w-4 h-4" />
                    <span className="font-semibold text-sm">Trading Coach</span>
                  </div>
                )}
                <p className="whitespace-pre-wrap leading-relaxed">
                  {msg.content}
                </p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-[#1a1a1b] border border-[#433bf9]/30 rounded-2xl p-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 bg-[#433bf9] rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-[#433bf9] rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-[#433bf9] rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 bg-[#0c0c0d] border-t border-[#433bf9]/30">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about stocks, forex, crypto, gold, oil, indices... 💬"
              className="flex-1 bg-[#1a1a1b] border border-[#433bf9]/50 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#433bf9] focus:border-transparent"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="bg-[#433bf9] hover:bg-[#5d52fa] disabled:bg-gray-700 disabled:opacity-50 text-white rounded-xl px-6 py-3 font-semibold transition-all flex items-center gap-2 disabled:cursor-not-allowed shadow-lg"
            >
              <Send className="w-5 h-5" />
              Send
            </button>
          </div>
          <div className="flex items-center justify-between mt-3">
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              Trading involves risk. Signals are suggestions, not guarantees.
            </p>
            <p className="text-xs text-[#433bf9] font-semibold">
              Execute on afterprime.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
