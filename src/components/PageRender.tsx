import { WPPage, ACFBlock, CustomBlocks } from "@/types/blocks";
import { blockRegistry } from "@/components/blocks";
import { acfFieldRegistry } from "@/components/acfFieldGroups";
import { normalizeUSPBlock } from "@/components/blocks/USPblock/normalize";
import USPBlock from "@/components/blocks/USPblock/USPblock";
import { repeatorValueNormalize } from "@/components/blocks/section-featured-cards/repeaterValueNormalize";
import SectionFeaturedCards from "@/components/blocks/section-featured-cards/SectionFeaturedCards";

type Props = { pageData: WPPage };

// Shared by PageRenderer and any page-specific layout (e.g. the homepage's
// grid reorder) that needs to resolve a single ACF block to its component
// without re-implementing the special-case normalization below.
export function renderAcfBlock(block: ACFBlock, key: React.Key) {
  if (!block?.name) return null;

  if (block.name === "acf/inner-page-usp") {
    return <USPBlock key={key} {...normalizeUSPBlock(block.fields)} />;
  }

  if (block.name === "acf/section-feature-four-cards") {
    return (
      <SectionFeaturedCards key={key} {...repeatorValueNormalize(block.fields)} />
    );
  }

  const blockName = block.name.replace("acf/", "") as CustomBlocks;
  const BlockComp = blockRegistry[blockName];
  return BlockComp ? <BlockComp key={key} {...block.fields} /> : null;
}

export default function PageRenderer({ pageData }: Props) {
  if (!pageData) return <p>Page not found</p>;

  return (
    <>
      {pageData.acf_blocks?.map((block: ACFBlock, idx) => renderAcfBlock(block, idx))}

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
