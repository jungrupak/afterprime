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
  const connectionRef = useRef<HubConnection | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    if (connectionRef.current) {
      return;
    }

    const connection = new HubConnectionBuilder()
      .withUrl("https://marketprice.afterprime.io:5000/marketpricestream", {
        transport:
          HttpTransportType.WebSockets |
          HttpTransportType.ServerSentEvents |
          HttpTransportType.LongPolling,
      })
      .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
      .configureLogging(LogLevel.Information)
      .build();

    connection.on("LatestPrice", (data: PricesObjects[]) => {
      if (mountedRef.current) {
        setPrices(data);
      }
    });

    connection.onreconnecting((err) => {
      if (mountedRef.current) {
        console.warn("SignalR reconnecting...", err);
        setStatus("connecting");
      }
    });

    connection.onreconnected(() => {
      if (mountedRef.current) {
        setStatus("connected");
      }
    });

    connection.onclose((err) => {
      if (mountedRef.current) {
        if (err) {
          console.error("SignalR closed with error:", err);
        }
        setStatus("disconnected");
      }
    });

    connectionRef.current = connection;

    const startConnection = async () => {
      if (connection.state === HubConnectionState.Disconnected && mountedRef.current) {
        try {
          setStatus("connecting");
          await connection.start();
          if (mountedRef.current) {
            setStatus("connected");
          }
        } catch (err) {
          if (mountedRef.current) {
            console.error("❌ Connection error:", err);
            setStatus("error");
          }
        }
      }
    };

    startConnection();

    return () => {
      mountedRef.current = false;
      if (connection.state === HubConnectionState.Connected) {
        connection.stop();
      }
    };
  }, []);

  const iconName = prices.map((p) => p.symbol.toLocaleLowerCase());

  const categories = useMemo(() => {
    return categorizePrices(prices);
  }, [prices]);

  return { prices, categories, status, iconName };
}
