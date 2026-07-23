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
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { buildHreflangMap, toOgLocale } from "@/lib/seo/metadata";
import { localizeHref } from "@/lib/locale/localizeHref";
import { getWeglotCode } from "@/config/locales";
import {
  tradingHoursPageContent,
  type TradingHoursPageContent,
} from "./tradingHoursPageContent";
import {
  tradingHoursWidgetContent,
  type TradingHoursWidgetContent,
} from "@/components/trading-hours-widget/tradingHoursWidgetContent";

// Display-only translation for a day-of-week value from the live feed —
// falls back to the raw (English) value if not in the map.
function translateDay(
  day: string | undefined,
  t: TradingHoursPageContent,
): string {
  if (!day) return "";
  return t.dayNames[day] ?? day;
}

function tradingDaysText(
  data: InstrumentData,
  t: TradingHoursPageContent,
): string {
  if (data.is24_7) return t.tradingDays.always;
  if (data.openDay && data.openUtc && data.closeDay && data.closeUtc)
    return `${translateDay(data.openDay, t)} ${data.openUtc} to ${translateDay(data.closeDay, t)} ${data.closeUtc}`;
  if (data.is24_5) return t.tradingDays.fiveDay;
  return t.tradingDays.scheduled;
}

function exchangeRef(data: InstrumentData, t: TradingHoursPageContent): string {
  switch (data.category.toLowerCase()) {
    case "forex":
      return t.exchangeRef.forex;
    case "crypto":
      return t.exchangeRef.crypto;
    case "metals":
      return t.exchangeRef.metals;
    case "commodities":
      return t.exchangeRef.commodities;
    default:
      return t.exchangeRef.default;
  }
}

function dstRegions(data: InstrumentData, t: TradingHoursPageContent): string {
  const cat = data.category.toLowerCase();
  if (["forex", "metals", "crypto"].includes(cat))
    return t.dstRegions.fxMetalsCrypto;
  if (["indices", "stocks"].includes(cat)) return t.dstRegions.indicesStocks;
  if (cat === "commodities") return t.dstRegions.commodities;
  return t.dstRegions.default;
}

function peakContext(data: InstrumentData, t: TradingHoursPageContent, translatedOverlap: string): string {
  if (translatedOverlap) return translatedOverlap;
  const sym = data.symbol.toUpperCase();
  const cat = data.category.toLowerCase();
  if (sym === "XAUUSD") return t.peakContext.gold;
  if (cat === "forex") return t.peakContext.forex;
  if (
    cat === "indices" &&
    ["US500", "NAS100", "US30"].some((s) => sym.includes(s))
  )
    return t.peakContext.usIndices;
  if (cat === "indices") return t.peakContext.indices;
  if (
    cat === "commodities" &&
    (sym.includes("XTIUSD") || sym.includes("XBRUSD"))
  )
    return t.peakContext.crudeOil;
  if (cat === "commodities") return t.peakContext.commodities;
  if (cat === "crypto") return t.peakContext.crypto;
  return t.peakContext.default;
}

function lowVolumePeriod(
  data: InstrumentData,
  t: TradingHoursPageContent,
): string {
  if (data.lowVolumePeriod) return data.lowVolumePeriod;
  const sym = data.symbol.toUpperCase();
  const cat = data.category.toLowerCase();
  if (["XAUUSD", "XAGUSD"].includes(sym)) return t.lowVolumePeriod.metals;
  if (cat === "forex") return t.lowVolumePeriod.forex;
  if (cat === "indices") return t.lowVolumePeriod.indices;
  if (cat === "commodities") return t.lowVolumePeriod.commodities;
  if (cat === "crypto") return t.lowVolumePeriod.crypto;
  return t.lowVolumePeriod.default;
}

function executionStyle(
  data: InstrumentData,
  t: TradingHoursPageContent,
): string {
  if (data.executionStyle) return data.executionStyle;
  const cat = data.category.toLowerCase();
  if (cat === "forex") return t.executionStyle.forex;
  if (cat === "indices") return t.executionStyle.indices;
  if (["commodities", "metals"].includes(cat))
    return t.executionStyle.commoditiesMetals;
  if (cat === "crypto") return t.executionStyle.crypto;
  return t.executionStyle.default;
}

function outsideHoursStatement(
  data: InstrumentData,
  t: TradingHoursPageContent,
): string {
  if (data.is24_7)
    return t.outsideHours.always.replace("{desc}", data.description);
  if (data.hasDailyBreak)
    return t.outsideHours.dailyBreak.replace("{desc}", data.description);
  const cat = data.category.toLowerCase();
  if (["indices", "stocks"].includes(cat))
    return t.outsideHours.indicesStocksClosed.replace(
      "{desc}",
      data.description,
    );
  if (data.is24_5)
    return t.outsideHours.fiveDay
      .replace("{desc}", data.description)
      .replace("{openDay}", translateDay(data.openDay, t) || t.dayNames.Sunday)
      .replace("{closeDay}", translateDay(data.closeDay, t) || t.dayNames.Friday);
  return t.outsideHours.default.replace("{desc}", data.description);
}

function alternativeAccessNote(
  data: InstrumentData,
  t: TradingHoursPageContent,
): string {
  if (data.is24_7) return t.alternativeAccess.always;
  const cat = data.category.toLowerCase();
  if (["indices", "stocks"].includes(cat))
    return t.alternativeAccess.indicesStocks;
  return t.alternativeAccess.default;
}

function clean(text: string | undefined | null): string {
  return text?.replace(/�/g, "-") ?? "";
}

function displaySym(sym: string): string {
  return sym.replace(/\.(prem|agg)$/i, "");
}

export const revalidate = 1800;

type Props = { params: Promise<{ symbol: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { symbol } = await params;
  const locale = await getRequestLocale();
  const data = await getTradingHoursData(symbol);

  const t = await getTranslatedStatic(
    "trading-hours-page",
    locale,
    tradingHoursPageContent,
  );

  const sym = data ? displaySym(data.symbol) : "";
  if (!data) return { title: t.metadataFallbackTitle };

  const canonicalPath = `/trading-hours/${symbol}`;
  const canonicalUrl = `https://afterprime.com${localizeHref(canonicalPath, locale)}`;

  return {
    title: t.metadataTitle.replace("{sym}", sym),
    description: t.metadataDescription.replace("{desc}", data.description),
    alternates: {
      canonical: canonicalUrl,
      languages: buildHreflangMap(symbol, canonicalPath),
    },
    openGraph: {
      locale: toOgLocale(locale),
      url: canonicalUrl,
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
  const locale = await getRequestLocale();
  const data = await getTradingHoursData(symbol);
  if (!data) notFound();

  const t = await getTranslatedStatic(
    "trading-hours-page",
    locale,
    tradingHoursPageContent,
  );

  const tw = await getTranslatedStatic(
    "trading-hours-widget",
    locale,
    tradingHoursWidgetContent,
  );

  const schedule = data.is24_7
    ? t.scheduleAlways
    : data.is24_5
      ? t.schedule24x5
      : t.scheduleRange
          .replace("{openDay}", translateDay(data.openDay, t))
          .replace("{closeDay}", translateDay(data.closeDay, t));

  const sym = displaySym(data.symbol);

  const dynamicT = await getTranslatedStatic(
    `trading-hours-dynamic-${sym.toLowerCase()}`,
    locale,
    {
      sessionOverlapContext: data.sessionOverlapContext ?? "",
      dstNote: data.dstNote ?? "",
    },
  );

  const subline =
    data.openDay && data.openUtc && data.closeDay && data.closeUtc
      ? t.sublineWithTimes
          .replace("{sym}", sym)
          .replace("{openDay}", translateDay(data.openDay, t))
          .replace("{openUtc}", data.openUtc)
          .replace("{closeDay}", translateDay(data.closeDay, t))
          .replace("{closeUtc}", data.closeUtc)
          .replace("{schedule}", schedule)
      : t.sublineFallback
          .replace("{desc}", data.description)
          .replace("{schedule}", schedule);

  const faqItemsRaw = [
    {
      question: t.faq.q1.replace("{sym}", sym),
      answer: t.faq.a1
        .replace("{sym}", sym)
        .replace("{openDay}", translateDay(data.openDay, t))
        .replace("{openUtc}", data.openUtc ?? ""),
    },
    {
      question: t.faq.q2.replace("{sym}", sym),
      answer: t.faq.a2
        .replace("{sym}", sym)
        .replace("{closeDay}", translateDay(data.closeDay, t))
        .replace("{closeUtc}", data.closeUtc ?? ""),
    },
    data.swap3Day
      ? {
          question: t.faq.q3.replace("{sym}", sym),
          answer: t.faq.a3
            .replace("{swap3Day}", data.swap3Day)
            .replace("{sym}", sym),
        }
      : null,
    data.hasDailyBreak
      ? {
          question: t.faq.q4.replace("{sym}", sym),
          answer: t.faq.a4
            .replace("{sym}", sym)
            .replace("{start}", data.dailyBreakStartUtc ?? "")
            .replace("{end}", data.dailyBreakEndUtc ?? ""),
        }
      : null,
  ].filter(Boolean) as { question: string; answer: string }[];

  const faqTranslated = await getTranslatedStatic("trading-hours-faq", locale, {
    sectionTitle: t.faqSectionTitle.replace("{sym}", sym),
    items: faqItemsRaw,
  });

  const instrumentHref = getInstrumentHref(sym, data.category);

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
              <Link href={localizeHref("/trading-hours", locale)} className="hover:opacity-100!">
                {t.breadcrumbMarketHours}
              </Link>
              <span aria-hidden="true">›</span>
              <span>{sym}</span>
            </nav>
            <h1 className="h1-size max-w-[1200px]">
              <span className="font-[600]">
                {data.description} {t.h1Suffix}
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
            symbol={sym}
            sessionAsiaOpen={data.sessionAsiaOpen}
            sessionLondonOpen={data.sessionLondonOpen}
            sessionNyOpen={data.sessionNyOpen}
            sessionOverlapStart={data.sessionOverlapStart}
            sessionOverlapEnd={data.sessionOverlapEnd}
            openDay={data.openDay}
            openUtc={data.openUtc}
            closeDay={data.closeDay}
            closeUtc={data.closeUtc}
            content={tw}
            locale={getWeglotCode(locale)}
          />

          {/* ── 4. Two info pills ─────────────────────────────────── */}
          {(data.swap3Day || data.typicalSpreadNote) && (
            <div className="flex flex-wrap gap-4">
              {data.swap3Day && (
                <div
                  className="flex md:flex-1 items-start gap-3 rounded-2xl px-5 py-4 text-sm"
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
                      {t.tripleSwapDayLabel}
                    </p>
                    <p className="leading-snug  text-[clamp(16px_,5vw_,18px)]">
                      {t.tripleSwapText.split("{swap3Day}")[0]}
                      <strong>{data.swap3Day}</strong>
                      {t.tripleSwapText.split("{swap3Day}")[1]}
                    </p>
                  </div>
                </div>
              )}

              {data.typicalSpreadNote && (
                <div
                  className="flex md:flex-1 items-start gap-3 rounded-2xl px-5 py-4 text-sm"
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
                      {t.spreadBehaviourLabel}
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
              <strong style={{ color: "#f59e0b" }}>{t.dstNotePrefix}</strong>{" "}
              {dynamicT.dstNote}
            </div>
          )}

          {/* ── 7. Internal link row ─────────────────────────────── */}
          <div className="flex flex-wrap gap-3 mt-5 md:mt-10">
            <Link
              href={localizeHref(`/swaps/${sym.toLowerCase()}`, locale)}
              className="rounded-full px-5 py-2 text-sm border transition-opacity hover:opacity-100 opacity-70"
              style={{ borderColor: "rgba(255,255,255,0.15)" }}
            >
              {t.swapRatesLinkText.replace("{sym}", sym)} →
            </Link>
            {data.category === "Forex" && (
              <>
                <Link
                  href={localizeHref(instrumentHref, locale)}
                  className="rounded-full px-5 py-2 text-sm border transition-opacity hover:opacity-100 opacity-70"
                  style={{ borderColor: "rgba(255,255,255,0.15)" }}
                >
                  {t.specificationsLinkText.replace("{sym}", sym)} →
                </Link>
              </>
            )}

            <Link
              href={localizeHref("/trading-hours", locale)}
              className="rounded-full px-5 py-2 text-sm border transition-opacity hover:opacity-100 opacity-70"
              style={{ borderColor: "rgba(255,255,255,0.15)" }}
            >
              {t.allTradingHoursLinkText} →
            </Link>
          </div>
        </div>
      </section>

      {/* ── A. What are X trading hours? ────────────────────── */}
      <section className="compact-section">
        <div className="ap_container_small">
          <h2 className="h2-size mb-6">
            {t.whatAreHoursHeading.replace("{desc}", data.description)}
          </h2>
          <p className="paragraph opacity-85">
            {t.tradesPrefix.replace("{desc}", data.description)}
            {tradingDaysText(data, t)}
            {t.tradesSuffix}
            {data.hasDailyBreak &&
            data.dailyBreakStartUtc &&
            data.dailyBreakEndUtc
              ? t.dailyBreakInline
                  .replace("{start}", data.dailyBreakStartUtc)
                  .replace("{end}", data.dailyBreakEndUtc)
              : ""}
            {t.tradingIsLabel}
            {data.weekendTrading || data.is24_7
              ? t.weekendAvailable
              : t.weekendNotAvailable}
            {t.weekendSuffix}
          </p>
          <p className="paragraph opacity-85 mt-4">
            {t.cfdParagraphPart1.replace("{desc}", data.description)}
            {exchangeRef(data, t)}
            {t.cfdParagraphPart2}
            {dstRegions(data, t)}
            {t.cfdParagraphPart3}
          </p>
        </div>
      </section>

      {/* ── B. Best time to trade X ──────────────────────────── */}
      {data.peakLiquiditySession && (
        <section className="compact-section">
          <div className="ap_container_small">
            <h2 className="h2-size mb-6">
              {t.bestTimeHeading.replace("{desc}", data.description)}
            </h2>
            <p className="paragraph opacity-85">
              {t.bestTimeP1Prefix.replace("{desc}", data.description)}
              {clean(data.peakLiquiditySession)}
              {data.sessionOverlapStart && data.sessionOverlapEnd
                ? ` (${data.sessionOverlapStart}–${data.sessionOverlapEnd})`
                : ""}
              {t.bestTimeP1Suffix}
              {peakContext(data, t, dynamicT.sessionOverlapContext)}
              {t.bestTimeP1End}
            </p>
            <p className="paragraph opacity-85 mt-4">
              {t.bestTimeP2Prefix}
              {lowVolumePeriod(data, t)}
              {t.bestTimeP2Middle}
              {executionStyle(data, t)}
              {t.bestTimeP2Middle2}
              {clean(data.peakLiquiditySession)}
              {t.bestTimeP2Suffix}
            </p>
          </div>
        </section>
      )}

      {/* ── C. Outside market hours ──────────────────────────── */}
      <section className="compact-section">
        <div className="ap_container_small">
          <h2 className="h2-size mb-6">
            {t.outsideHeading.replace("{desc}", data.description)}
          </h2>
          <p className="paragraph opacity-85">
            {outsideHoursStatement(data, t)}. {alternativeAccessNote(data, t)}.
          </p>
          {data.swap3Day && (
            <p className="paragraph opacity-85 mt-4">
              {t.pendingPositionText}
              {data.swapLong !== undefined && data.swapShort !== undefined
                ? `${t.swapRatesInlinePrefix.replace("{desc}", data.description)}${data.swapLong}${t.swapRatesInlineMiddle}${data.swapShort}${t.swapRatesInlineSuffix}`
                : ""}
              {`${t.tripleSwapInlinePrefix}${data.swap3Day}${t.tripleSwapInlineSuffix}`}
            </p>
          )}
        </div>
      </section>

      {/* ── 6. FAQ block ─────────────────────────────────────── */}
      <FaqCalc
        faqSubject={faqTranslated.sectionTitle}
        data={faqTranslated.items}
      />

      <BottomCta />

      <BreadcrumbSchema
        items={[
          { name: t.breadcrumbHome, href: "/" },
          { name: t.breadcrumbTradingHours, href: "/trading-hours" },
          { name: sym, href: `/trading-hours/${symbol}` },
        ]}
      />
    </>
  );
}
