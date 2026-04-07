"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import { categorizePrices } from "@/lib/pricingCategory";
import {
  HubConnectionBuilder,
  LogLevel,
  HubConnection,
  HubConnectionState,
  HttpTransportType,
} from "@microsoft/signalr";

export interface PricesObjects {
  symbol: string;
  bestBid: number;
  bestAsk: number;
  spread: number;
  market: string;
  group: string;
}

export type ConnectionStatus =
  | "connecting"
  | "connected"
  | "disconnected"
  | "error";

export function useLivePrices(initialPrices: PricesObjects[] = []) {
  const [prices, setPrices] = useState<PricesObjects[]>(initialPrices);
  const [status, setStatus] = useState<ConnectionStatus>(
    initialPrices.length > 0 ? "connected" : "connecting",
  );
  const connectionRef = useRef<HubConnection | null>(null); // persistent connection

  useEffect(() => {
    // Only create connection once
    if (!connectionRef.current) {
      const connection = new HubConnectionBuilder()
        .withUrl("https://marketprice.afterprime.io:5000/marketpricestream", {
          // Allow protocol fallback when pure WebSocket is blocked by network/proxy/CDN.
          transport:
            HttpTransportType.WebSockets |
            HttpTransportType.ServerSentEvents |
            HttpTransportType.LongPolling,
        })
        .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
        .configureLogging(LogLevel.Information)
        .build();

      connectionRef.current = connection;
    }

    const connection = connectionRef.current;

    const startConnection = async () => {
      if (connection.state === HubConnectionState.Disconnected) {
        try {
          setStatus("connecting");
          await connection.start();
          setStatus("connected");
          console.log("✅ SignalR connected");

          connection.on("LatestPrice", (data: PricesObjects[]) => {
            setPrices(data);
          });
        } catch (err) {
          console.error("❌ Connection error:", err);
          setStatus("error");
        }
      }
    };

    startConnection();

    connection.onreconnecting((err) => {
      console.warn("SignalR reconnecting...", err);
      setStatus("connecting");
    });

    connection.onreconnected(() => {
      console.log("SignalR reconnected");
      setStatus("connected");
    });

    connection.onclose((err) => {
      if (err) {
        console.error("SignalR closed with error:", err);
      }
      setStatus("disconnected");
    });

    // Cleanup on unmount
    return () => {
      if (connection.state === HubConnectionState.Connected) {
        connection.stop().then(() => console.log("SignalR disconnected"));
      }
    };
  }, []);

  const iconName = prices.map((p) => p.symbol.toLocaleLowerCase());

  const categories = useMemo(() => {
    return categorizePrices(prices);
  }, [prices]);

  return { prices, categories, status, iconName };
}
