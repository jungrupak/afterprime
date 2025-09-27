//import dynamic from "next/dynamic";
import { Blocks } from "@/types/blocks";

//import all the blocks created in website
import InnerPageIntroBlock from "./InnerPageIntroBlock/InnerPageIntroBlock";
import InnerBanner from "./inner-banner/InnerBanner";
import HighlightBlockQuote from "./highlight-blockquote/HighlightBlockquote";

export const blockRegistry: {
  "inner-page-intro-block": React.ComponentType<
    Blocks["inner-page-intro-block"]
  >;
  "inner-page-hero-banner": React.ComponentType<
    Blocks["inner-page-hero-banner"]
  >;
  "highlight-texts": React.ComponentType<Blocks["highlight-texts"]>;
} = {
  "inner-page-intro-block": InnerPageIntroBlock,
  "inner-page-hero-banner": InnerBanner,
  "highlight-texts": HighlightBlockQuote,
};
