"use client";
import { AP_FX_PAIRS } from "@/data/ap-fx-pairs-specs";
import { getRelatedPairs } from "@/lib/getRelatedPairs";
import styles from "./ProductSpecification.module.scss";
import Link from "next/link";
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
}

export default function ProductSpecification({
  instrument,
  content: c = productSpecificationContent,
  specTableContent,
}: Specification) {
  //##
  if (!instrument) return;
  const locale = useLocale();
  const sym = instrument.toUpperCase();

  // ####
  const specData = [...AP_FX_PAIRS]; //spreading this since we gonna have other pairs type in future like crypto, indices etc..
  const selectedInstrument = specData.find(
    (item) => item.Symbol === instrument.toLowerCase(),
  );

  //####

  //Compute Related pairs
  // After finding selectedInstrument
  const relatedPairs = selectedInstrument
    ? getRelatedPairs(specData, selectedInstrument.Symbol, 3)
    : [];
  //####

  return (
    <div className={`my-8 md:my-20 mb-0!`}>
      {/* <h2 className={`text-center font-semibold max-md:leading-[1.2]`}>
        {instrument} Trading Specification
      </h2> */}
      <div className={`${styles.costBreakDownTable}`}>
        <SpecificationTable instrument={instrument} content={specTableContent} />
      </div>

      {instrument === "XAUUSD" ? (
        <div className={`mt-15`}>
          <h3 className={`font-bold text-[clamp(18px,5vw,24px)] mb-2`}>
            {c.metals.heading}
          </h3>
          <p className={`opacity-80`}>
            {c.paragraphPart1.replace("{sym}", sym)}
            <Link href={localizeHref("/live-spreads", locale)} className={`underline`}>
              {c.realTimeSpreadLinkText}
            </Link>
            {c.paragraphPart2}
            <Link
              href={localizeHref("/calculators/cost-savings-calculator", locale)}
              className={`underline`}
            >
              {c.calculateCostsLinkText}
            </Link>
            {c.paragraphPart3}
            <sup>TM</sup>
            {c.paragraphPart4.replace("{sym}", sym)}
            <Link href={localizeHref("/metals", locale)} className={`underline`}>
              {c.metals.exploreLinkText}
            </Link>
            {c.paragraphPart5}
            <Link
              href={localizeHref("/calculators/position-size-calculator", locale)}
              className={`underline`}
            >
              {c.metals.positionSizingLinkText}
            </Link>
            {c.paragraphSuffix}
          </p>

          <div className="flex flex-wrap gap-3 mt-5 md:mt-10">
            <Link
              href={localizeHref(`/trading-hours/${instrument.toLowerCase()}`, locale)}
              className="rounded-full px-5 py-2 text-sm border transition-opacity hover:opacity-100 opacity-70"
              style={{ borderColor: "rgba(255,255,255,0.15)" }}
            >
              {c.metals.tradingHoursCta.replace("{sym}", sym)} {""} →
            </Link>
          </div>
        </div>
      ) : (
        <div className={`mt-15`}>
          <h3 className={`font-bold text-[clamp(18px,5vw,24px)] mb-2`}>
            {c.forex.heading}
          </h3>
          <p className={`opacity-80`}>
            {c.paragraphPart1.replace("{sym}", sym)}
            <Link href={localizeHref("/live-spreads", locale)} className={`underline`}>
              {c.realTimeSpreadLinkText}
            </Link>
            {c.paragraphPart2}
            <Link
              href={localizeHref("/calculators/cost-savings-calculator", locale)}
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
              href={localizeHref("/calculators/position-size-calculator", locale)}
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
                href={localizeHref(`/trade/${pair.Symbol.toLowerCase()}`, locale)}
                className={`underline hover:no-underline`}
              >
                <div className={``}>{pair.Symbol}</div>
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-5 md:mt-10">
            <Link
              href={localizeHref(`/forex/${instrument.toLowerCase()}`, locale)}
              className="rounded-full px-5 py-2 text-sm border transition-opacity hover:opacity-100 opacity-70"
              style={{ borderColor: "rgba(255,255,255,0.15)" }}
            >
              {c.forex.specificationCta.replace("{sym}", sym)} {""} →
            </Link>

            <Link
              href={localizeHref(`/trading-hours/${instrument.toLowerCase()}`, locale)}
              className="rounded-full px-5 py-2 text-sm border transition-opacity hover:opacity-100 opacity-70"
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
