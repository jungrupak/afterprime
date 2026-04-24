import dynamic from "next/dynamic";
import React from "react";
import { Blocks } from "@/types/blocks";

//import all the blocks created in website
import InnerPageIntroBlock from "./InnerPageIntroBlock/InnerPageIntroBlock";
import InnerBanner from "./inner-banner/InnerBanner";
import HighlightBlockQuote from "./highlight-blockquote/HighlightBlockquote";
import ContentBlock from "./content-block/ContentBlock";
import USPBlock from "./USPblock/USPblock";
import SectionFeaturedCards from "./section-featured-cards/SectionFeaturedCards";
import { MultipurposeBlock } from "./block-multipurpose/BlockMultipurpose";
import { MoreValueRealAlignment } from "./more-aligned-value-section/MoreAlignCards";
import { SectionCardsBig } from "./section-card-repeater/SectionCardRepeater";
import GoogleReview from "./google-review/GoogleReview";
import FoundersCard from "./founder-card/FounderCard";
import { HeroHome } from "./hero-home/HeroHome";
import { EarningFlowSection } from "./earning-flow-section/EarningFlowSection";
import { UspUnderHome } from "./usp-under-hero-home/UspUnderHeroHome";
import { ProsNConsBlock } from "./pros-and-cons/ProsNConsBlock";
import { MoreValueRealAlignmentStatic } from "./more-value-real-alignment-static/MoreAlignCards";
import { SectionCardsBigStatic } from "./platform-cards-section-static/PlatformCards";
import SectionTableMarginLeverage from "./margin-leverage-table/MarginLeverageTable";
import SectionMarginCallOut from "./margin-call-out-table/MarginCallOutTable";
import { ClientMoneySection } from "./client-money-section/ClientMoney";
import { SectionFundingCards } from "./section-funding-methods/FundingCards";
import {SimpleContentBlock} from "./simple-contents/SimpleContents";

// Heavy blocks — dynamically imported so their JS (chart.js, SignalR, live data)
// is split into separate chunks and not bundled into the initial page load.
const DataVisual = dynamic(() => import("./data-visualization/DataVisual"));
const SelectLivePricingTable = dynamic(() =>
  import("./live-price-feed/LivePriceFeedBlock").then((m) => ({ default: m.SelectLivePricingTable }))
);
const SwapDataTabs = dynamic(() =>
  import("./swap-table/SwapTable").then((m) => ({ default: m.SwapDataTabs }))
);
const TableDataRewardFlow = dynamic(() =>
  import("./table-reward-flow/TableAndData").then((m) => ({ default: m.TableDataRewardFlow }))
);

// Allows both sync React components and async server components in the registry
type AnyBlockComponent<T> =
  | React.ComponentType<T>
  | ((props: T) => Promise<React.JSX.Element | null>);

export const blockRegistry: {
  [K in keyof Blocks]: AnyBlockComponent<Blocks[K]>;
} = {
  "inner-page-intro-block": InnerPageIntroBlock,
  "inner-page-hero-banner": InnerBanner,
  "highlight-texts": HighlightBlockQuote,
  "simple-image-content": ContentBlock,
  "inner-page-usp": USPBlock,
  "section-feature-four-cards": SectionFeaturedCards,
  "block-multipurpose": MultipurposeBlock,
  "section-more-value-real-alignment": MoreValueRealAlignment,
  "section-with-cards": SectionCardsBig,
  "reviews-section": GoogleReview,
  "founder-messages": FoundersCard,
  "hero-banner-home": HeroHome,
  "earning-flow-block": EarningFlowSection,
  "usp-under-home-hero": UspUnderHome,
  "section-datavisualization": DataVisual,
  "live-pricing-table": SelectLivePricingTable,
  "block-pros-and-cons": ProsNConsBlock,
  "section-more-value-real-alignment-static": MoreValueRealAlignmentStatic,
  "platform-cards-section-static": SectionCardsBigStatic,
  "margin-and-leverage-table": SectionTableMarginLeverage,
  "margin-call-and-leverage": SectionMarginCallOut,
  "client-money-section": ClientMoneySection,
  "funding-card-lists": SectionFundingCards,
  "swap-table-section": SwapDataTabs,
  "rebate-table": TableDataRewardFlow,
  "reading-content": SimpleContentBlock,
};
