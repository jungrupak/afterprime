import InnerBanner from "@/components/blocks/inner-banner/InnerBanner";
import { getWpPagedata } from "@/utils/getWpPagedata";
import { CustomMetadata } from "@/utils/CustomMetadata";
import { Blocks } from "@/types/blocks";
import { Metadata } from "next";
import InnerPageIntroBlock from "@/components/blocks/InnerPageIntroBlock/InnerPageIntroBlock";
import { SectionCardsBig } from "@/components/blocks/section-card-repeater/SectionCardRepeater";
import { MultipurposeBlock } from "@/components/blocks/block-multipurpose/BlockMultipurpose";
import FoundersCard from "@/components/blocks/founder-card/FounderCard";
import GoogleReview from "@/components/blocks/google-review/GoogleReview";
import { acfFieldRegistry } from "@/components/acfFieldGroups";
import { LivePricingTradingHours } from "@/components/live-pricing/LivePricingTradingHours";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  return CustomMetadata("trading-hours");
}

export default async function TradingHoursPage() {
  const pageData = await getWpPagedata("trading-hours");
  const blocks = pageData?.acf_blocks ?? [];

  const bannerFields = blocks.find(
    (b) => b.name === "acf/inner-page-hero-banner",
  )?.fields as Blocks["inner-page-hero-banner"] | undefined;

  const introBlockFields = blocks.find(
    (b) => b.name === "acf/inner-page-intro-block",
  )?.fields as Blocks["inner-page-intro-block"] | undefined;

  const thPdfSection = blocks.find((b) => b.name === "acf/section-with-cards")
    ?.fields as Blocks["section-with-cards"] | undefined;

  const founderMsg = blocks.find((b) => b.name === "acf/founder-messages")
    ?.fields as Blocks["founder-messages"] | undefined;

  const reviewSection = blocks.find((b) => b.name === "acf/reviews-section")
    ?.fields as Blocks["reviews-section"] | undefined;

  const multipurposeBlocks = blocks
    .filter((b) => b.name === "acf/block-multipurpose")
    .map((b) => b.fields as Blocks["block-multipurpose"]);

  return (
    <>
      {bannerFields && <InnerBanner {...bannerFields} />}
      {introBlockFields && <InnerPageIntroBlock {...introBlockFields} />}
      {thPdfSection && <SectionCardsBig {...thPdfSection} />}
      {multipurposeBlocks.map((fields, i) => (
        <MultipurposeBlock key={i} {...fields} />
      ))}
      {/* Pricing Table */}
      <section className={`compact-section`}>
        <div className={`ap_container_small`}>
          <LivePricingTradingHours />
        </div>
      </section>
      {/* Pricing Table Ends */}

      {founderMsg && <FoundersCard {...founderMsg} />}
      {reviewSection && <GoogleReview {...reviewSection} />}

      {pageData.acf &&
        Object.entries(pageData.acf).map(([key, value], idx) => {
          if (!value) return null;
          const FieldComp = acfFieldRegistry[key as keyof typeof pageData.acf];
          if (!FieldComp) return null;
          return (
            <FieldComp
              key={idx}
              {...(typeof value === "object" ? value : { value })}
            />
          );
        })}
    </>
  );
}
