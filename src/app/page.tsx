import { WPPage, ACFBlock, CustomBlocks } from "@/types/blocks";
import { blockRegistry } from "@/components/blocks";
import { acfFieldRegistry } from "@/components/acfFieldGroups";
import { wpFetch } from "@/utils/wpFetch";
import { normalizeUSPBlock } from "@/components/blocks/USPblock/normalize";
import USPBlock from "@/components/blocks/USPblock/USPblock";
import { repeatorValueNormalize } from "@/components/blocks/section-featured-cards/repeaterValueNormalize";
import SectionFeaturedCards from "@/components/blocks/section-featured-cards/SectionFeaturedCards";

export default async function HomePage() {
  const frontPageSlug = process.env.NEXT_PUBLIC_FRONT_PAGE_SLUG ?? "home-page";
  const pages = await wpFetch<WPPage[]>(`/pages?slug=${frontPageSlug}`);
  const pageData = pages?.[0];

  if (!pageData) return <p>Home page not found</p>;

  return (
    <>
      {pageData.acf_blocks?.map((block: ACFBlock, idx) => {
        if (!block?.name) return null;

        if (block.name === "acf/inner-page-usp") {
          return <USPBlock key={idx} {...normalizeUSPBlock(block.fields)} />;
        }

        if (block.name === "acf/section-feature-four-cards") {
          return (
            <SectionFeaturedCards
              key={idx}
              {...repeatorValueNormalize(block.fields)}
            />
          );
        }

        const blockName = block.name.replace("acf/", "") as CustomBlocks;
        const BlockComp = blockRegistry[blockName];
        return BlockComp ? <BlockComp key={idx} {...block.fields} /> : null;
      })}

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
