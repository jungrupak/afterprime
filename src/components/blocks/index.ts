//import dynamic from "next/dynamic";

import { Blocks, CustomBlocks } from "@/types/blocks";

//import all the blocks created in website
import InnerPageIntroBlock from "./InnerPageIntroBlock/InnerPageIntroBlock";
import InnerBanner from "./inner-banner/InnerBanner";

export const blockRegistry: Partial<{
  [K in CustomBlocks]: React.ComponentType<Blocks[K]>;
}> = {
  "inner-page-intro-block": InnerPageIntroBlock,
};
