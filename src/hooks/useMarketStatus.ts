"use client";
import { useState, useEffect, useCallback } from "react";
import type { InstrumentData, SessionTrade } from "@/types/instruments";

const API_URL = "https://scoreboard.argamon.com:8443/api/instruments/";
const SERVER_OFFSET_MINUTES = 3 * 60; // MT4/MT5 server time is GMT+3

export type MarketState = "open" | "break" | "closed";

export interface MarketStatusLabels {
  open: string;
  break: string;
  closed: string;
}

export interface MarketStatusResult {
  state: MarketState;
  label: string;
}

function jsUtcDayToApi(jsDay: number): number {
  return jsDay === 0 ? 7 : jsDay;
}

function parseServerTimeString(timeStr: string | undefined): number | null {
  if (!timeStr) return null;
  const match = timeStr.match(/(\d+):(\d+)/);
  if (!match) return null;
  return parseInt(match[1]) * 60 + parseInt(match[2]);
}

export function computeMarketStatus(
  sessionsTrades: SessionTrade[],
  hasDailyBreak: boolean,
  breakStartMinutes: number | null,
  breakEndMinutes: number | null,
): MarketState {
  const now = new Date();
  const serverNow = new Date(now.getTime() + SERVER_OFFSET_MINUTES * 60 * 1000);
  const apiDay = jsUtcDayToApi(serverNow.getUTCDay());
  const currentMinutes = serverNow.getUTCHours() * 60 + serverNow.getUTCMinutes();

  const todaySessions = (sessionsTrades ?? []).filter(
    (s) => s.dayOfWeek === apiDay,
  );
  const currentSession = todaySessions.find(
    (s) => currentMinutes >= s.open && currentMinutes < s.close,
  );

  if (currentSession) {
    // Inside daily break window
    if (
      hasDailyBreak &&
      breakStartMinutes !== null &&
      breakEndMinutes !== null &&
      currentMinutes >= breakStartMinutes &&
      currentMinutes < breakEndMinutes
    ) {
      return "break";
    }
    return "open";
  }

  return "closed";
}

function getMarketStatusForSymbol(
  symbol: string,
  instruments: InstrumentData[],
  labels: MarketStatusLabels,
): MarketStatusResult {
  const data = instruments.find(
    (i) => i.symbol.toLowerCase() === symbol.toLowerCase(),
  );

  if (!data || !data.sessionsTrades || data.sessionsTrades.length === 0) {
    return { state: "closed", label: labels.closed };
  }

  const parsedBreakStart = parseServerTimeString(data.dailyBreakStartUtc);
  const parsedBreakEnd = parseServerTimeString(data.dailyBreakEndUtc);
  const breakStartMinutes =
    parsedBreakStart !== null ? parsedBreakStart + SERVER_OFFSET_MINUTES : null;
  const breakEndMinutes =
    parsedBreakEnd !== null ? parsedBreakEnd + SERVER_OFFSET_MINUTES : null;

  const state = computeMarketStatus(
    data.sessionsTrades,
    data.hasDailyBreak,
    breakStartMinutes,
    breakEndMinutes,
  );

  return { state, label: labels[state] };
}

export function useMarketStatus(
  symbols: string[],
  labels: MarketStatusLabels = {
    open: "Open",
    break: "Break",
    closed: "Closed",
  },
) {
  const [instruments, setInstruments] = useState<InstrumentData[]>([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data: InstrumentData[]) => {
        setInstruments(data);
      })
      .catch(() => {
        // Silently fail - will show all as closed
      });
  }, []);

  const getStatus = useCallback(
    (symbol: string): MarketStatusResult => {
      if (instruments.length === 0) {
        return { state: "closed", label: labels.closed };
      }
      return getMarketStatusForSymbol(symbol, instruments, labels);
    },
    [instruments, labels],
  );

  return { getStatus, instruments };
}
