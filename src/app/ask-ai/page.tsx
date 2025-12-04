"use client";

import { useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function TradingAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "🔥 Hey trader! I'm your AI Trading Coach. Ask me anything about Forex, Crypto, Commodities, Stocks, Gold, Oil, Indices or trading strategies! 🚀",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: `
You are a confident, results-oriented TRADING EXPERT.
You teach Forex, Crypto, Stocks, Gold, Oil, Indices & commodities.
Provide educational analysis, not real-time prices.
Give strategies, setups, risk management & examples.
Always remind users to check live prices on Afterprime.com.
          `,
          messages: [...messages, userMessage],
        }),
      });

      const data = await res.json();

      // Your backend should return: { content: "assistant message text" }
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.content || "⚠️ No response from AI",
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "❌ Network error. Try again!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col p-4 z-9 fixed">
      <div className="max-w-3xl w-full mx-auto flex flex-col gap-4">
        {/* Chat Messages */}
        <div className="flex-1 bg-[#111] p-4 rounded-xl overflow-y-auto h-[70vh] border border-white/10">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 my-2 max-w-[80%] rounded-xl ${
                msg.role === "user" ? "bg-blue-600 ml-auto" : "bg-white/10"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="flex gap-2">
          <input
            className="flex-1 p-3 rounded-xl bg-white/10 border border-white/20"
            value={input}
            placeholder="Ask anything about trading…"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-blue-600 px-5 rounded-xl"
          >
            {loading ? "…" : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
