import { WPPage, CustomBlocks, ACFBlock } from "@/types/blocks";
import { blockRegistry } from "@/components/blocks";
import { acfFieldRegistry } from "@/components/acfFieldGroups";

//Customized Block for repeator fields used
import { normalizeUSPBlock } from "@/components/blocks/USPblock/normalize";
import USPBlock from "@/components/blocks/USPblock/USPblock";
//section with cards
import { repeatorValueNormalize } from "@/components/blocks/section-featured-cards/repeaterValueNormalize";
import SectionFeaturedCards from "@/components/blocks/section-featured-cards/SectionFeaturedCards";

interface PageProps {
  params: { slug: string };
}

export default async function Page() {
  const res = await fetch(
    `https://wordpress-1264747-4900526.cloudwaysapps.com/wp-json/wp/v2/pages?slug=home-page`
  );
  const pages: WPPage[] = await res.json();

  if (!pages?.length) return <p>Page not found</p>;
  const data = pages[0];

  return (
    <>
      {Array.isArray(data?.acf_blocks) &&
        data.acf_blocks.map((block: ACFBlock, index: number) => {
          if (!block?.name) return null;

          // Special case: USP repeater
          if (block.name === "acf/inner-page-usp") {
            const normalized = normalizeUSPBlock(block.fields);
            return <USPBlock key={index} {...normalized} />;
          }

          // Special case: Section with cards
          if (block.name === "acf/section-feature-four-cards") {
            const normalized = repeatorValueNormalize(block.fields);
            return <SectionFeaturedCards key={index} {...normalized} />;
          }

          // Generic case for other blocks
          const blockName = block.name.replace("acf/", "") as CustomBlocks;
          const BlockComponent = blockRegistry[blockName];
          if (!BlockComponent) return null;

          return <BlockComponent key={index} {...block.fields} />;
        })}

      {/* Render page-level ACF fields */}
      {data.acf &&
        Object.entries(data.acf).map(([fieldKey, fieldValue], index) => {
          if (!fieldValue) return null;
          const FieldComponent =
            acfFieldRegistry[fieldKey as keyof typeof data.acf];
          if (!FieldComponent) return null;
          const props =
            typeof fieldValue === "object" ? fieldValue : { value: fieldValue };
          return <FieldComponent key={index} {...props} />;
        })}
    </>
  );
}
