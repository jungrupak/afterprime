import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getTradingHoursData,
  getAllInstrumentSymbols,
} from "@/lib/getTradingHoursData";
import TradingHoursWidget from "@/components/trading-hours-widget/TradingHoursWidget";
import { BottomCta } from "@/components/acfFieldGroups/bottom-cta/BottomCta";
import BreadcrumbSchema from "@/lib/schema/breadcrumbSchema";
import FaqCalc from "@/components/faq-calculators/Faq";
import type { InstrumentData } from "@/types/instruments";

function tradingDaysText(data: InstrumentData): string {
  if (data.is24_7) return "24 hours a day, 7 days a week";
  if (data.openDay && data.openUtc && data.closeDay && data.closeUtc)
    return `${data.openDay} ${data.openUtc} to ${data.closeDay} ${data.closeUtc} UTC`;
  if (data.is24_5) return "24 hours a day, Monday through Friday";
  return "during scheduled market hours";
}

function exchangeRef(data: InstrumentData): string {
  switch (data.category.toLowerCase()) {
    case "forex": return "the global FX interbank market";
    case "crypto": return "the global crypto market";
    case "metals": return "COMEX/LBMA session times";
    case "commodities": return "CME/NYMEX exchange session times";
    default: return "the underlying exchange";
  }
}

function dstRegions(data: InstrumentData): string {
  const cat = data.category.toLowerCase();
  if (["forex", "metals", "crypto"].includes(cat)) return "London, New York, and Sydney";
  if (["indices", "stocks"].includes(cat)) return "the US and Europe";
  if (cat === "commodities") return "the US";
  return "major trading centres";
}

function peakContext(data: InstrumentData): string {
  if (data.sessionOverlapContext) return data.sessionOverlapContext;
  const sym = data.symbol.toUpperCase();
  const cat = data.category.toLowerCase();
  if (sym === "XAUUSD") return "Gold correlates strongly with USD moves, peaking when US and European traders are both active";
  if (cat === "forex") return "This 4-hour window accounts for the majority of daily forex volume";
  if (cat === "indices" && ["US500", "NAS100", "US30"].some((s) => sym.includes(s)))
    return "Volume spikes at the US open (9:30 AM ET) and in the final hour of trade";
  if (cat === "indices") return "Volume is highest when the home exchange regular session is active";
  if (cat === "commodities" && (sym.includes("XTIUSD") || sym.includes("XBRUSD")))
    return "Crude volume aligns with NYMEX pit hours and US inventory data releases (Wednesdays)";
  if (cat === "commodities") return "Liquidity peaks when the relevant commodity exchange pit session is active";
  if (cat === "crypto") return "Crypto CFDs mirror risk-on sentiment; largest moves typically occur during US trading hours";
  return "Liquidity and spreads are tightest during this window";
}

function lowVolumePeriod(data: InstrumentData): string {
  if (data.lowVolumePeriod) return data.lowVolumePeriod;
  const sym = data.symbol.toUpperCase();
  const cat = data.category.toLowerCase();
  if (["XAUUSD", "XAGUSD"].includes(sym)) return "post-NY close";
  if (cat === "forex") return "the Asian session";
  if (cat === "indices") return "pre-market hours";
  if (cat === "commodities") return "the Asian session";
  if (cat === "crypto") return "weekend hours";
  return "off-peak hours";
}

function executionStyle(data: InstrumentData): string {
  if (data.executionStyle) return data.executionStyle;
  const cat = data.category.toLowerCase();
  if (cat === "forex") return "scalping and intraday";
  if (cat === "indices") return "momentum and intraday";
  if (["commodities", "metals"].includes(cat)) return "trend-following and intraday";
  if (cat === "crypto") return "momentum";
  return "active";
}

function outsideHoursStatement(data: InstrumentData): string {
  if (data.is24_7)
    return `${data.description} is available to trade 24/7 at Afterprime, including weekends`;
  if (data.hasDailyBreak)
    return `${data.description} has a short daily maintenance break but is otherwise available throughout the entire trading week`;
  const cat = data.category.toLowerCase();
  if (["indices", "stocks"].includes(cat))
    return `${data.description} cannot be traded outside the hours shown above. The market closes at the end of each regular session`;
  if (data.is24_5)
    return `${data.description} trades continuously 24 hours a day, five days a week. There is no intraday market close between ${data.openDay ?? "Sunday"} and ${data.closeDay ?? "Friday"}`;
  return `${data.description} cannot be traded outside the hours shown above`;
}

function alternativeAccessNote(data: InstrumentData): string {
  if (data.is24_7) return "There is no gap risk from overnight closures for this instrument";
  const cat = data.category.toLowerCase();
  if (["indices", "stocks"].includes(cat))
    return "Orders placed while the market is closed are queued and executed at the next available open price";
  return "Orders placed while the market is closed are queued and filled at the next available open price";
}

export const revalidate = 1800;

type Props = { params: Promise<{ symbol: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { symbol } = await params;
  const data = await getTradingHoursData(symbol);
  if (!data) return { title: "Trading Hours | Afterprime" };

  return {
    title: `${data.symbol} Trading Hours: Open & Close Times | Afterprime`,
    description: `${data.description} trading hours at Afterprime - session open/close times, pre-market, extended hours, and weekend status.`,
    alternates: {
      canonical: `https://afterprime.com/trading-hours/${symbol}`,
    },
  };
}

export async function generateStaticParams() {
  const symbols = await getAllInstrumentSymbols();
  return symbols.map((symbol) => ({ symbol }));
}

function getInstrumentHref(symbol: string, category: string): string {
  const cat = category.toLowerCase();
  const sym = symbol.toLowerCase();
  if (cat === "forex") return `/forex/${sym}`;
  if (cat === "crypto") return `/crypto/${sym}`;
  if (cat === "metals") return `/metals/${sym}`;
  if (cat === "commodities") return `/commodities/${sym}`;
  if (cat === "indices") return `/indices/${sym}`;
  return `/forex/${sym}`;
}

export default async function TradingHoursSymbolPage({ params }: Props) {
  const { symbol } = await params;
  const data = await getTradingHoursData(symbol);
  if (!data) notFound();

  const schedule = data.is24_7
    ? "24 hours a day, 7 days a week"
    : data.is24_5
      ? "24 hours a day, 5 days a week"
      : `${data.openDay} to ${data.closeDay}`;

  const subline =
    data.openDay && data.openUtc && data.closeDay && data.closeUtc
      ? `${data.symbol} trades ${data.openDay} ${data.openUtc} to ${data.closeDay} ${data.closeUtc}, ${schedule}.`
      : `${data.description}, ${schedule}.`;

  const faqItems = [
    {
      question: `When does ${data.symbol} open?`,
      answer: `${data.symbol} opens ${data.openDay} at ${data.openUtc}.`,
    },
    {
      question: `When does ${data.symbol} close?`,
      answer: `${data.symbol} closes ${data.closeDay} at ${data.closeUtc}.`,
    },
    data.swap3Day
      ? {
          question: `What is the triple swap day for ${data.symbol}?`,
          answer: `The triple swap is charged on ${data.swap3Day} for ${data.symbol} positions held overnight.`,
        }
      : null,
    data.hasDailyBreak
      ? {
          question: `Does ${data.symbol} have a daily break?`,
          answer: `Yes. ${data.symbol} has a short daily break from ${data.dailyBreakStartUtc} to ${data.dailyBreakEndUtc}.`,
        }
      : null,
  ].filter(Boolean) as { question: string; answer: string }[];

  const instrumentHref = getInstrumentHref(data.symbol, data.category);

  return (
    <>
      {/* ── 1. Breadcrumb + H1 + subhead ─────────────────────── */}
      <section className="innerpage-banner h-auto!">
        <div className="ap_container_small flex items-center h-full">
          <div className={`apBannerContent`}>
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-sm opacity-55 mt-10 lg:mt-15 mb-4"
            >
              <Link href="/trading-hours" className="hover:opacity-100!">
                Market hours
              </Link>
              <span aria-hidden="true">›</span>
              <span>{data.symbol}</span>
            </nav>
            <h1 className="h1-size max-w-[1200px]">
              <span className="font-[600]">
                {data.description} trading hours
              </span>
            </h1>
            <div
              className="paragraph max-w-[1200px] lg:mt-8 opacity-80"
              style={{ fontWeight: 300 }}
            >
              {subline}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Live widget card  +  3. Four-session bar ──────── */}
      <section className="compact-section">
        <div className="ap_container_small">
          <TradingHoursWidget
            sessionsTrades={data.sessionsTrades ?? []}
            hasDailyBreak={data.hasDailyBreak}
            dailyBreakStartUtc={data.dailyBreakStartUtc}
            dailyBreakEndUtc={data.dailyBreakEndUtc}
            symbol={data.symbol}
            sessionAsiaOpen={data.sessionAsiaOpen}
            sessionLondonOpen={data.sessionLondonOpen}
            sessionNyOpen={data.sessionNyOpen}
            sessionOverlapStart={data.sessionOverlapStart}
            sessionOverlapEnd={data.sessionOverlapEnd}
            openDay={data.openDay}
            openUtc={data.openUtc}
            closeDay={data.closeDay}
            closeUtc={data.closeUtc}
          />

          {/* ── 4. Two info pills ─────────────────────────────────── */}
          {(data.swap3Day || data.typicalSpreadNote) && (
            <div className="flex gap-4">
              {data.swap3Day && (
                <div
                  className="flex flex-1 items-start gap-3 rounded-2xl px-5 py-4 text-sm"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.09)",
                  }}
                >
                  {/* calendar icon */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-[2px] shrink-0 opacity-50"
                    aria-hidden="true"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <div>
                    <p className=" mb-2 text-[clamp(14px_,5vw_,16px)] opacity-55 ">
                      Triple swap day
                    </p>
                    <p className="leading-snug  text-[clamp(16px_,5vw_,18px)]">
                      Swap charges are applied at 3× on{" "}
                      <strong>{data.swap3Day}</strong> to cover the weekend
                      rollover.
                    </p>
                  </div>
                </div>
              )}

              {data.typicalSpreadNote && (
                <div
                  className="flex flex-1 items-start gap-3 rounded-2xl px-5 py-4 text-sm"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.09)",
                  }}
                >
                  {/* clock icon */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-[2px] shrink-0 opacity-50"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <div>
                    <p className="mb-2 text-[clamp(14px_,5vw_,16px)] opacity-55">
                      Spread behaviour
                    </p>
                    <p className="leading-snug text-[clamp(16px_,5vw_,18px)]">
                      {data.typicalSpreadNote}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── 5. DST callout ───────────────────────────────────── */}
          {data.dstNote && (
            <div
              className={`mt-5 md:mt-10`}
              style={{
                borderLeft: "3px solid #f59e0b",
                padding: "14px 20px",
                background: "rgba(245,158,11,0.05)",
                borderRadius: "0 8px 8px 0",
                fontSize: "14px",
                lineHeight: 1.65,
              }}
            >
              <strong style={{ color: "#f59e0b" }}>DST note:</strong>{" "}
              {data.dstNote}
            </div>
          )}

          {/* ── 7. Internal link row ─────────────────────────────── */}
          <div className="flex flex-wrap gap-3 mt-5 md:mt-10">
            <Link
              href={`/swaps/${data.symbol.toLowerCase()}`}
              className="rounded-full px-5 py-2 text-sm border transition-opacity hover:opacity-100 opacity-70"
              style={{ borderColor: "rgba(255,255,255,0.15)" }}
            >
              {data.symbol} swap rates →
            </Link>
            {data.category === "Forex" && (
              <>
                <Link
                  href={instrumentHref}
                  className="rounded-full px-5 py-2 text-sm border transition-opacity hover:opacity-100 opacity-70"
                  style={{ borderColor: "rgba(255,255,255,0.15)" }}
                >
                  {data.symbol} instrument page →
                </Link>
              </>
            )}

            <Link
              href="/trading-hours"
              className="rounded-full px-5 py-2 text-sm border transition-opacity hover:opacity-100 opacity-70"
              style={{ borderColor: "rgba(255,255,255,0.15)" }}
            >
              All trading hours →
            </Link>
          </div>
        </div>
      </section>

      {/* ── A. What are X trading hours? ────────────────────── */}
      <section className="compact-section">
        <div className="ap_container_small">
          <h2 className="h2-size mb-6">
            What are {data.description} trading hours?
          </h2>
          <p className="paragraph opacity-85">
            {data.description} trades {tradingDaysText(data)}.
            {data.hasDailyBreak &&
            data.dailyBreakStartUtc &&
            data.dailyBreakEndUtc
              ? ` There is a daily break from ${data.dailyBreakStartUtc} to ${data.dailyBreakEndUtc} UTC.`
              : ""}{" "}
            Trading is{" "}
            {data.weekendTrading || data.is24_7 ? "available" : "not available"}{" "}
            on weekends.
          </p>
          <p className="paragraph opacity-85 mt-4">
            At Afterprime, {data.description} is available as a CFD, meaning
            you can go long or short within these hours without owning the
            underlying asset. All times shown follow {exchangeRef(data)} and
            adjust automatically for daylight saving changes in{" "}
            {dstRegions(data)}.
          </p>
        </div>
      </section>

      {/* ── B. Best time to trade X ──────────────────────────── */}
      {data.peakLiquiditySession && (
        <section className="compact-section">
          <div className="ap_container_small">
            <h2 className="h2-size mb-6">
              Best time to trade {data.description}
            </h2>
            <p className="paragraph opacity-85">
              {data.description} typically sees its highest liquidity and
              tightest spreads during {data.peakLiquiditySession}
              {data.sessionOverlapStart && data.sessionOverlapEnd
                ? ` (${data.sessionOverlapStart}–${data.sessionOverlapEnd} UTC)`
                : ""}
              . {peakContext(data)}.
            </p>
            <p className="paragraph opacity-85 mt-4">
              Lower-volume periods, particularly {lowVolumePeriod(data)},
              may see wider spreads and thinner order books. For traders on{" "}
              {executionStyle(data)} strategies, timing entries around the{" "}
              {data.peakLiquiditySession} open tends to offer the most
              favourable conditions.
            </p>
          </div>
        </section>
      )}

      {/* ── C. Outside market hours ──────────────────────────── */}
      <section className="compact-section">
        <div className="ap_container_small">
          <h2 className="h2-size mb-6">
            Can you trade {data.description} outside market hours?
          </h2>
          <p className="paragraph opacity-85">
            {outsideHoursStatement(data)}. {alternativeAccessNote(data)}.
          </p>
          {data.swap3Day && (
            <p className="paragraph opacity-85 mt-4">
              If you have a pending position when the market closes, it will be
              held overnight and a swap rate will apply.
              {data.swapLong !== undefined && data.swapShort !== undefined
                ? ` For ${data.description}, the current swap rates are ${data.swapLong} points long and ${data.swapShort} points short`
                : ""}
              {`, with a triple swap applied on ${data.swap3Day}`}.
            </p>
          )}
        </div>
      </section>

      {/* ── 6. FAQ block ─────────────────────────────────────── */}
      <FaqCalc
        faqSubject={`${data.symbol} Trading Hours: FAQs`}
        data={faqItems}
      />

      <BottomCta />

      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Trading Hours", href: "/trading-hours" },
          { name: data.symbol, href: `/trading-hours/${symbol}` },
        ]}
      />
    </>
  );
}
