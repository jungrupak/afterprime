"use client";
import { useEffect, useState, useMemo } from "react";
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

type PricesListener = (prices: PricesObjects[]) => void;
type StatusListener = (status: ConnectionStatus) => void;

// Singleton — survives route changes
let _connection: HubConnection | null = null;
let _prices: PricesObjects[] = [];
let _status: ConnectionStatus = "connecting";
const _pricesListeners = new Set<PricesListener>();
const _statusListeners = new Set<StatusListener>();

function notifyStatus(s: ConnectionStatus) {
  _status = s;
  _statusListeners.forEach((fn) => fn(s));
}

function getOrCreateConnection(): HubConnection {
  if (_connection) return _connection;

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
    _prices = data;
    _pricesListeners.forEach((fn) => fn(data));
  });

  connection.onreconnecting((err) => {
    console.warn("SignalR reconnecting...", err);
    notifyStatus("connecting");
  });

  connection.onreconnected(() => notifyStatus("connected"));

  connection.onclose((err) => {
    if (err) console.error("SignalR closed with error:", err);
    notifyStatus(err ? "error" : "disconnected");
  });

  _connection = connection;

  if (connection.state === HubConnectionState.Disconnected) {
    connection
      .start()
      .then(() => notifyStatus("connected"))
      .catch((err) => {
        console.error("❌ Connection error:", err);
        notifyStatus("error");
      });
  }

  return connection;
}

export function useLivePrices(initialPrices: PricesObjects[] = []) {
  const [prices, setPrices] = useState<PricesObjects[]>(() =>
    _prices.length > 0 ? _prices : initialPrices,
  );
  const [status, setStatus] = useState<ConnectionStatus>(() =>
    _prices.length > 0 || initialPrices.length > 0 ? _status : "connecting",
  );

  useEffect(() => {
    getOrCreateConnection();

    const onPrices: PricesListener = (data) => setPrices(data);
    const onStatus: StatusListener = (s) => setStatus(s);

    _pricesListeners.add(onPrices);
    _statusListeners.add(onStatus);

    // Sync latest cached state immediately
    if (_prices.length > 0) setPrices(_prices);
    setStatus(_status);

    return () => {
      _pricesListeners.delete(onPrices);
      _statusListeners.delete(onStatus);
      // Connection stays alive — no stop() on unmount
    };
  }, []);

  const categories = useMemo(() => categorizePrices(prices), [prices]);
  const iconName = prices.map((p) => p.symbol.toLocaleLowerCase());

  return { prices, categories, status, iconName };
}
