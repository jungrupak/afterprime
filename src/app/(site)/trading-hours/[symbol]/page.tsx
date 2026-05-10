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

export const revalidate = 1800;

type Props = { params: Promise<{ symbol: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { symbol } = await params;
  const data = await getTradingHoursData(symbol);
  if (!data) return { title: "Trading Hours | Afterprime" };

  return {
    title: `${data.symbol} Trading Hours — When Does ${data.symbol} Open? | Afterprime`,
    description: `${data.description} trading hours. Market opens ${data.openDay} ${data.openUtc}, closes ${data.closeDay} ${data.closeUtc}. ${data.typicalSpreadNote ?? ""}`,
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
      ? `${data.symbol} trades ${data.openDay} ${data.openUtc} to ${data.closeDay} ${data.closeUtc} — ${schedule}.`
      : `${data.description} — ${schedule}.`;

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
            <h1 className="h1-size max-w-[800px]">
              <span className="font-[600]">
                {data.description} trading hours
              </span>
            </h1>
            <div
              className="paragraph max-w-[600px] lg:mt-8 opacity-80"
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
            sessionsTrades={data.sessionsTrades}
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
            <div className="flex flex-wrap gap-4">
              {data.swap3Day && (
                <div
                  className="flex items-start gap-3 rounded-2xl px-5 py-4 text-sm"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    maxWidth: "420px",
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
                    <p className="opacity-55 mb-1 text-xs uppercase tracking-widest">
                      Triple swap day
                    </p>
                    <p className="leading-snug">
                      Swap charges are applied at 3× on{" "}
                      <strong>{data.swap3Day}</strong> to cover the weekend
                      rollover.
                    </p>
                  </div>
                </div>
              )}

              {data.typicalSpreadNote && (
                <div
                  className="flex items-start gap-3 rounded-2xl px-5 py-4 text-sm"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    maxWidth: "420px",
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
                    <p className="opacity-55 mb-1 text-xs uppercase tracking-widest">
                      Spread behaviour
                    </p>
                    <p className="leading-snug">{data.typicalSpreadNote}</p>
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
              <strong style={{ color: "#f59e0b" }}>DST note —</strong>{" "}
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
            <Link
              href={instrumentHref}
              className="rounded-full px-5 py-2 text-sm border transition-opacity hover:opacity-100 opacity-70"
              style={{ borderColor: "rgba(255,255,255,0.15)" }}
            >
              {data.symbol} instrument page →
            </Link>
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

      {/* ── 6. FAQ block ─────────────────────────────────────── */}
      <FaqCalc
        faqSubject={`${data.symbol} Trading Hours — FAQs`}
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
