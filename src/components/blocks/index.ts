//import dynamic from "next/dynamic";
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

export const blockRegistry: {
  [K in keyof Blocks]: React.ComponentType<Blocks[K]>;
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
};
