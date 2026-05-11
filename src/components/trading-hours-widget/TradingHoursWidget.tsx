"use client";
import { useState, useEffect, useCallback } from "react";
import styles from "./TradingHoursWidget.module.scss";
import type { SessionTrade } from "@/types/instruments";

const TIMEZONES = [
  { label: "UTC", value: "UTC" },
  { label: "New York (ET)", value: "America/New_York" },
  { label: "Chicago (CT)", value: "America/Chicago" },
  { label: "Denver (MT)", value: "America/Denver" },
  { label: "Los Angeles (PT)", value: "America/Los_Angeles" },
  { label: "São Paulo (BRT)", value: "America/Sao_Paulo" },
  { label: "London (GMT/BST)", value: "Europe/London" },
  { label: "Paris (CET/CEST)", value: "Europe/Paris" },
  { label: "Moscow (MSK)", value: "Europe/Moscow" },
  { label: "Johannesburg (SAST)", value: "Africa/Johannesburg" },
  { label: "Dubai (GST)", value: "Asia/Dubai" },
  { label: "Mumbai (IST)", value: "Asia/Kolkata" },
  { label: "Bangkok (ICT)", value: "Asia/Bangkok" },
  { label: "Singapore (SGT)", value: "Asia/Singapore" },
  { label: "Shanghai (CST)", value: "Asia/Shanghai" },
  { label: "Hong Kong (HKT)", value: "Asia/Hong_Kong" },
  { label: "Seoul (KST)", value: "Asia/Seoul" },
  { label: "Tokyo (JST)", value: "Asia/Tokyo" },
  { label: "Sydney (AEST/AEDT)", value: "Australia/Sydney" },
  { label: "Auckland (NZDT/NZST)", value: "Pacific/Auckland" },
] as const;

const WEEKDAYS = [
  { label: "Mon", apiDay: 1 },
  { label: "Tue", apiDay: 2 },
  { label: "Wed", apiDay: 3 },
  { label: "Thu", apiDay: 4 },
  { label: "Fri", apiDay: 5 },
];

function jsUtcDayToApi(jsDay: number): number {
  return jsDay === 0 ? 7 : jsDay;
}

function parseUtcTimeString(timeStr: string | undefined): number | null {
  if (!timeStr) return null;
  const match = timeStr.match(/(\d+):(\d+)/);
  if (!match) return null;
  return parseInt(match[1]) * 60 + parseInt(match[2]);
}

function utcMinutesToLocalTime(utcMinutes: number, timezone: string): string {
  const now = new Date();
  const d = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      Math.floor(utcMinutes / 60),
      utcMinutes % 60,
    ),
  );
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: timezone,
    hour12: false,
  });
}

function utcStringToLocalTime(
  utcStr: string | undefined,
  timezone: string,
): string {
  const mins = parseUtcTimeString(utcStr);
  if (mins === null) return "--:--";
  return utcMinutesToLocalTime(mins, timezone);
}

function formatCountdown(totalSeconds: number): string {
  const d = Math.floor(totalSeconds / 86400);
  const h = Math.floor((totalSeconds % 86400) / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  if (d > 0) return `${d}d ${h}h ${m}m`;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m`;
  return `${totalSeconds % 60}s`;
}

type MarketState = "open" | "break" | "closed";

interface MarketStatus {
  state: MarketState;
  nextEventLabel: string;
  nextEventSeconds: number;
}

function computeMarketStatus(
  sessionsTrades: SessionTrade[],
  hasDailyBreak: boolean,
  breakStartMinutes: number | null,
  breakEndMinutes: number | null,
): MarketStatus {
  const now = new Date();
  const apiDay = jsUtcDayToApi(now.getUTCDay());
  const currentUtcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();

  function minutesToAbsDate(utcMinutes: number, daysOffset = 0): Date {
    return new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate() + daysOffset,
        Math.floor(utcMinutes / 60),
        utcMinutes % 60,
        0,
        0,
      ),
    );
  }

  function secsUntil(target: Date): number {
    return Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000));
  }

  const todaySessions = (sessionsTrades ?? []).filter(
    (s) => s.dayOfWeek === apiDay,
  );
  const currentSession = todaySessions.find(
    (s) => currentUtcMinutes >= s.open && currentUtcMinutes < s.close,
  );

  if (currentSession) {
    // Inside daily break window
    if (
      hasDailyBreak &&
      breakStartMinutes !== null &&
      breakEndMinutes !== null &&
      currentUtcMinutes >= breakStartMinutes &&
      currentUtcMinutes < breakEndMinutes
    ) {
      let breakEndDate = minutesToAbsDate(breakEndMinutes);
      if (breakEndDate <= now)
        breakEndDate = minutesToAbsDate(breakEndMinutes, 1);
      return {
        state: "break",
        nextEventLabel: "Break ends in",
        nextEventSeconds: secsUntil(breakEndDate),
      };
    }

    // Next event: break start or session close
    const closeAtMinutes =
      hasDailyBreak &&
      breakStartMinutes !== null &&
      currentUtcMinutes < breakStartMinutes
        ? breakStartMinutes
        : currentSession.close;

    let closeDate = minutesToAbsDate(closeAtMinutes);
    if (closeDate <= now) closeDate = minutesToAbsDate(closeAtMinutes, 1);

    return {
      state: "open",
      nextEventLabel:
        hasDailyBreak && closeAtMinutes === breakStartMinutes
          ? "Break in"
          : "Closes in",
      nextEventSeconds: secsUntil(closeDate),
    };
  }

  // Find next open — up to 7 days ahead
  for (let daysAhead = 0; daysAhead <= 7; daysAhead++) {
    const checkDate = new Date(now);
    checkDate.setUTCDate(checkDate.getUTCDate() + daysAhead);
    const checkApiDay = jsUtcDayToApi(checkDate.getUTCDay());
    const sessions = (sessionsTrades ?? [])
      .filter((s) => s.dayOfWeek === checkApiDay)
      .sort((a, b) => a.open - b.open);

    for (const session of sessions) {
      const openDate = minutesToAbsDate(session.open, daysAhead);
      if (openDate > now) {
        return {
          state: "closed",
          nextEventLabel: "Will open in",
          nextEventSeconds: secsUntil(openDate),
        };
      }
    }
  }

  return {
    state: "closed",
    nextEventLabel: "Will open in",
    nextEventSeconds: 0,
  };
}

interface Props {
  sessionsTrades: SessionTrade[];
  hasDailyBreak: boolean;
  dailyBreakStartUtc?: string;
  dailyBreakEndUtc?: string;
  symbol: string;
  sessionAsiaOpen?: string;
  sessionLondonOpen?: string;
  sessionNyOpen?: string;
  sessionOverlapStart?: string;
  sessionOverlapEnd?: string;
  openDay?: string;
  openUtc?: string;
  closeDay?: string;
  closeUtc?: string;
}

export default function TradingHoursWidget({
  sessionsTrades,
  hasDailyBreak,
  dailyBreakStartUtc,
  dailyBreakEndUtc,
  sessionAsiaOpen,
  sessionLondonOpen,
  sessionNyOpen,
  sessionOverlapStart,
  sessionOverlapEnd,
  openDay,
  openUtc,
  closeDay,
  closeUtc,
}: Props) {
  const breakStartMinutes = parseUtcTimeString(dailyBreakStartUtc);
  const breakEndMinutes = parseUtcTimeString(dailyBreakEndUtc);

  const [timezone, setTimezone] = useState("UTC");
  const [now, setNow] = useState<Date | null>(null);
  const [status, setStatus] = useState<MarketStatus>({
    state: "closed",
    nextEventLabel: "Will open in",
    nextEventSeconds: 0,
  });
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("ap_tz_pref");
    if (saved && TIMEZONES.some((tz) => tz.value === saved)) {
      setTimezone(saved);
    }
    setNow(new Date());
  }, []);

  const tick = useCallback(() => {
    setNow(new Date());
    const s = computeMarketStatus(
      sessionsTrades,
      hasDailyBreak,
      breakStartMinutes,
      breakEndMinutes,
    );
    setStatus(s);
    setCountdown(s.nextEventSeconds);
  }, [sessionsTrades, hasDailyBreak, breakStartMinutes, breakEndMinutes]);

  useEffect(() => {
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tick]);

  const handleTimezoneChange = (value: string) => {
    setTimezone(value);
    localStorage.setItem("ap_tz_pref", value);
  };

  const dateStr = now
    ? now.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        timeZone: timezone,
      })
    : "";

  const timeStr = now
    ? now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: timezone,
        hour12: false,
      })
    : "--:--:--";

  const pillClass =
    status.state === "open"
      ? styles.open
      : status.state === "break"
        ? styles.break
        : styles.closed;

  const pillLabel =
    status.state === "open"
      ? "Open now"
      : status.state === "break"
        ? "Daily Break"
        : "Market Closed";

  const todayApiDay = now ? jsUtcDayToApi(now.getUTCDay()) : -1;
  const sessionMap = new Map(
    (sessionsTrades ?? []).map((s) => [s.dayOfWeek, s]),
  );

  const sessionCards = [
    sessionAsiaOpen && {
      label: "Asia open",
      time: utcStringToLocalTime(sessionAsiaOpen, timezone),
      peak: false,
    },
    sessionLondonOpen && {
      label: "London open",
      time: utcStringToLocalTime(sessionLondonOpen, timezone),
      peak: false,
    },
    sessionNyOpen && {
      label: "New York open",
      time: utcStringToLocalTime(sessionNyOpen, timezone),
      peak: false,
    },
    sessionOverlapStart && {
      label: "Peak liquidity",
      time: `${utcStringToLocalTime(sessionOverlapStart, timezone)} – ${utcStringToLocalTime(sessionOverlapEnd, timezone)}`,
      peak: true,
    },
  ].filter(Boolean) as { label: string; time: string; peak: boolean }[];

  return (
    <>
      {/* Widget card */}
      <div className={styles.widget}>
        {/* Status row */}
        <div className={styles.statusRow}>
          <span className={`${styles.statusPill} ${pillClass}`}>
            <span className={styles.dot} />
            {pillLabel}
          </span>

          {countdown > 0 && (
            <span className={styles.countdown}>
              {status.nextEventLabel}{" "}
              <strong>{formatCountdown(countdown)}</strong>
            </span>
          )}

          {/* Weekly open / close schedule */}
          {/* {openDay ? (
            <>
              {" "}
              {openDay && openUtc && (
                <span className={`md:ml-auto`}>
                  <span className={styles.scheduleLabel}>Opens</span>
                  <span className={`text-[14px]`}>
                    {openDay} {openUtc}
                  </span>
                </span>
              )}
            </>
          ) : (
            <>
              {closeDay && closeUtc && (
                <span className={`md:ml-auto`}>
                  <span className={styles.scheduleLabel}>Closes</span>
                  <span className={`text-[14px]`}>
                    {closeDay} {closeUtc}
                  </span>
                </span>
              )}
            </>
          )} */}
          <span className={`${styles.dateTime} md:ml-auto`}>
            <span className={`opacity-65`}>{dateStr}</span>{" "}
            <span>{timeStr}</span>
          </span>
        </div>

        {/* Timezone row */}
        <div className={styles.tzRow}>
          <span className={styles.tzLabel}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            Timezone
          </span>
          <select
            className={styles.tzSelect}
            value={timezone}
            onChange={(e) => handleTimezoneChange(e.target.value)}
            aria-label="Select timezone"
          >
            {TIMEZONES.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
        </div>

        {/* Day columns */}
        <p className={styles.dayColumnsLabel}>Trading Hours by Day</p>
        <div className={styles.dayColumns}>
          {WEEKDAYS.map(({ label, apiDay }) => {
            const session = sessionMap.get(apiDay);
            const isToday = apiDay === todayApiDay;
            return (
              <div key={apiDay} className={styles.dayCol}>
                <span className={styles.dayName}>{label}</span>
                <div
                  className={`${styles.dayTimeRange} ${isToday ? styles.today : ""}`}
                >
                  {session
                    ? `${utcMinutesToLocalTime(session.open, timezone)} – ${utcMinutesToLocalTime(session.close, timezone)}`
                    : "Closed"}
                </div>
              </div>
            );
          })}
        </div>

        {hasDailyBreak && dailyBreakStartUtc && dailyBreakEndUtc && (
          <div className={`${styles.breakInfoPill} mt-5 max-md:w-full`}>
            <span className={styles.dot} />
            <b>Daily break</b> · {dailyBreakStartUtc} – {dailyBreakEndUtc}
          </div>
        )}
      </div>

      {/* Trading Sessions */}
      {sessionCards.length > 0 && (
        <div className={styles.sessionsSection}>
          <p className={`paragraph mb-3 md:mb-5`}>Trading Sessions</p>
          <div className={styles.sessionCards}>
            {sessionCards.map((card) => (
              <div
                key={card.label}
                className={`${styles.sessionCard} ${card.peak ? styles.peak : ""}`}
              >
                <p className={styles.sessionLabel}>{card.label}</p>
                <p className={styles.sessionTime}>{card.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
