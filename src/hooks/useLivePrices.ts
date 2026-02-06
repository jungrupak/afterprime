"use client";
import { useEffect, useState, useRef, useMemo } from "react";
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

export function useLivePrices() {
  const [prices, setPrices] = useState<PricesObjects[]>([]);
  const [status, setStatus] = useState<ConnectionStatus>("connecting");
  const connectionRef = useRef<HubConnection | null>(null); // persistent connection

  useEffect(() => {
    // Only create connection once
    if (!connectionRef.current) {
      const connection = new HubConnectionBuilder()
        .withUrl("https://marketprice.afterprime.io:5000/marketpricestream", {
          transport: HttpTransportType.WebSockets, //using only websocket##
          //HttpTransportType.ServerSentEvents |
          //HttpTransportType.LongPolling,
        })
        .withAutomaticReconnect()
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

    connection.onclose(() => {
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
    const popular: PricesObjects[] = [];
    const forex: PricesObjects[] = [];
    const forexMajor: PricesObjects[] = [];
    const forexMinor: PricesObjects[] = [];
    const forexExotic: PricesObjects[] = [];
    const crypto: PricesObjects[] = [];
    const metals: PricesObjects[] = [];
    const commodities: PricesObjects[] = [];
    const indices: PricesObjects[] = [];
    const stocks: PricesObjects[] = [];

    for (const item of prices) {
      const groupValueToArray = item.group.split("\\");
      const category = groupValueToArray[0] || "";
      const subCategory = groupValueToArray[1] || "";
      const populrItems = groupValueToArray[2] || groupValueToArray[1] || "";

      // Popular
      if (
        [
          "GBPJPY",
          "EURUSD",
          "BTCUSD",
          "ETHUSD",
          "XAUUSD",
          "XAUAUD",
          "GER30",
          "NAS100",
        ].includes(populrItems)
      ) {
        popular.push(item);
      }

      // Forex
      if (category === "Forex") {
        forex.push(item);
        if (subCategory === "Majors") forexMajor.push(item);
        else if (subCategory === "Minors") forexMinor.push(item);
        else if (subCategory === "Exotics") forexExotic.push(item);
      } else if (item.group.startsWith("Crypto")) crypto.push(item);
      else if (item.group.startsWith("Commodities")) commodities.push(item);
      else if (item.group.startsWith("Metals")) metals.push(item);
      else if (item.group.startsWith("Indices")) indices.push(item);
    }

    //returning categories so that this component would accept these cat values whenever it's been used
    return {
      popular,
      forex,
      forexMajor,
      forexMinor,
      forexExotic,
      crypto,
      metals,
      indices,
      commodities,
    };
  }, [prices]);

  return { prices, categories, status, iconName };
}
