"use client";
import type { InstrumentSpec } from "@/lib/getInstrumentSpecs";
import { getRelatedPairs } from "@/lib/getRelatedPairs";
import Link from "next/link";
import { useEffect } from "react";
import SpecificationTable from "./SpecificationTable";
import { useLocale } from "@/lib/locale/useLocale";
import { localizeHref } from "@/lib/locale/localizeHref";
import {
  productSpecificationContent,
  type ProductSpecificationContent,
} from "./productSpecificationContent";
import type { SpecificationTableContent } from "./specificationTableContent";

interface Specification {
  instrument?: string;
  content?: ProductSpecificationContent;
  specTableContent?: SpecificationTableContent;
  specData: InstrumentSpec[];
}

export default function ProductSpecification({
  instrument,
  content: c = productSpecificationContent,
  specTableContent,
  specData,
}: Specification) {
  //##
  if (!instrument) return;
  const locale = useLocale();
  const sym = instrument.toUpperCase();

  // Cross-page nav (e.g. /trade/eurusd#sectionSpec from another route) can
  // land here before Next's built-in hash-scroll fires reliably, since this
  // section renders below several async components (live chart, cost
  // comparison query, etc). Those keep shifting layout after mount, which
  // cuts a single scrollIntoView short — so re-correct on every frame until
  // the target position stops moving, then stop.
  useEffect(() => {
    if (window.location.hash !== "#sectionSpec") return;
    let frame = 0;
    let lastTop: number | null = null;
    let stableFrames = 0;
    let elapsedFrames = 0;
    const MAX_FRAMES = 300; // ~5s at 60fps safety cap

    const tick = () => {
      elapsedFrames += 1;
      const el = document.getElementById("sectionSpec");
      if (!el) {
        if (elapsedFrames < MAX_FRAMES) frame = requestAnimationFrame(tick);
        return;
      }
      const top = el.getBoundingClientRect().top;
      if (lastTop !== null && Math.abs(top - lastTop) < 1) {
        stableFrames += 1;
      } else {
        stableFrames = 0;
      }
      lastTop = top;

      if (Math.abs(top) > 2) {
        el.scrollIntoView({ behavior: "auto", block: "start" });
      }

      if (stableFrames < 10 && elapsedFrames < MAX_FRAMES) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const selectedInstrument = specData.find(
    (item) => item.Symbol === instrument.toLowerCase(),
  );

  //Compute Related pairs
  // After finding selectedInstrument
  const relatedPairs = selectedInstrument
    ? getRelatedPairs(specData, selectedInstrument.Symbol, 3)
    : [];
  //####

  return (
    <div
      id="sectionSpec"
      style={{ scrollMarginTop: 120 }}
      className={`my-8 md:my-20 mb-0!`}
    >
      {/* <h2 className={`text-center font-semibold max-md:leading-[1.2]`}>
        {instrument} Trading Specification
      </h2> */}
      <SpecificationTable
        instrument={instrument}
        content={specTableContent}
        specData={specData}
      />

      {instrument === "XAUUSD" ? (
        <div className={`mt-15`}>
          <h3 className={`font-size-heading-md mb-4 md:mb-6 font-semibold`}>
            {c.metals.heading}
          </h3>
          <p className={`reading-text-md mb-8 md:mb-12`}>
            {c.paragraphPart1.replace("{sym}", sym)}
            <Link
              href={localizeHref("/live-spreads", locale)}
              className={`underline`}
            >
              {c.realTimeSpreadLinkText}
            </Link>
            {c.paragraphPart2}
            <Link
              href={localizeHref(
                "/calculators/cost-savings-calculator",
                locale,
              )}
              className={`underline`}
            >
              {c.calculateCostsLinkText}
            </Link>
            {c.paragraphPart3}
            <sup>TM</sup>
            {c.paragraphPart4.replace("{sym}", sym)}
            <Link
              href={localizeHref("/metals", locale)}
              className={`underline`}
            >
              {c.metals.exploreLinkText}
            </Link>
            {c.paragraphPart5}
            <Link
              href={localizeHref(
                "/calculators/position-size-calculator",
                locale,
              )}
              className={`underline`}
            >
              {c.metals.positionSizingLinkText}
            </Link>
            {c.paragraphSuffix}
          </p>

          <div className="flex flex-wrap gap-3 mt-5 md:mt-10">
            <Link
              href={localizeHref(
                `/trading-hours/${instrument.toLowerCase()}`,
                locale,
              )}
              className="rounded-xs px-5 py-2 text-sm border transition-opacity hover:opacity-100 opacity-70"
              style={{ borderColor: "rgba(255,255,255,0.15)" }}
            >
              {c.metals.tradingHoursCta.replace("{sym}", sym)} {""} →
            </Link>
          </div>
        </div>
      ) : (
        <div className={`mt-15`}>
          <h3 className={`font-size-heading-md mb-4 md:mb-6 font-semibold`}>
            {c.forex.heading}
          </h3>
          <p className={`reading-text-md mb-8 md:mb-12`}>
            {c.paragraphPart1.replace("{sym}", sym)}
            <Link
              href={localizeHref("/live-spreads", locale)}
              className={`underline`}
            >
              {c.realTimeSpreadLinkText}
            </Link>
            {c.paragraphPart2}
            <Link
              href={localizeHref(
                "/calculators/cost-savings-calculator",
                locale,
              )}
              className={`underline`}
            >
              {c.calculateCostsLinkText}
            </Link>
            {c.paragraphPart3}
            <sup>TM</sup>
            {c.paragraphPart4.replace("{sym}", sym)}
            <Link href={localizeHref("/trade", locale)} className={`underline`}>
              {c.forex.exploreLinkText}
            </Link>
            {c.paragraphPart5}
            <Link
              href={localizeHref(
                "/calculators/position-size-calculator",
                locale,
              )}
              className={`underline`}
            >
              {c.forex.positionSizingLinkText}
            </Link>
            {c.paragraphSuffix}
          </p>
          <div className={`flex flex-wrap gap-2 mt-4`}>
            {relatedPairs.map((pair) => (
              <Link
                key={pair.Symbol}
                href={localizeHref(
                  `/trade/${pair.Symbol.toLowerCase()}`,
                  locale,
                )}
                className={`underline hover:no-underline`}
              >
                <div className={``}>{pair.Symbol}</div>
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-5 md:mt-10">
            <Link
              href={localizeHref(`/forex/${instrument.toLowerCase()}`, locale)}
              className="rounded-xs px-5 py-2 text-sm border transition-opacity hover:opacity-100 opacity-70"
              style={{ borderColor: "rgba(255,255,255,0.15)" }}
            >
              {c.forex.specificationCta.replace("{sym}", sym)} {""} →
            </Link>

            <Link
              href={localizeHref(
                `/trading-hours/${instrument.toLowerCase()}`,
                locale,
              )}
              className="rounded-xs px-5 py-2 text-sm border transition-opacity hover:opacity-100 opacity-70"
              style={{ borderColor: "rgba(255,255,255,0.15)" }}
            >
              {c.forex.tradingHoursCta.replace("{sym}", sym)} {""} →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
