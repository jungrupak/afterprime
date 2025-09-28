import { WPPage, CustomBlocks, ACFBlock } from "@/types/blocks";
import { blockRegistry } from "@/components/blocks";
import { acfFieldRegistry } from "@/components/acfFieldGroups";

import { normalizeUSPBlock } from "@/components/blocks/USPblock/normalize";
import USPBlock from "@/components/blocks/USPblock/USPblock";
import { repeatorValueNormalize } from "@/components/blocks/section-featured-cards/repeaterValueNormalize";
import SectionFeaturedCards from "@/components/blocks/section-featured-cards/SectionFeaturedCards";

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params }: PageProps) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_BASE_URL}/wp-json/wp/v2/pages?slug=${params.slug}`,
    { next: { revalidate: 60 } } // ✅ ISR equivalent
  );

  const pages: WPPage[] = await res.json();
  if (!pages?.length) return <p>Page not found</p>;
  const data = pages[0];

  return (
    <>
      {Array.isArray(data?.acf_blocks) &&
        data.acf_blocks.map((block: ACFBlock, index: number) => {
          if (!block?.name) return null;

          if (block.name === "acf/inner-page-usp") {
            const normalized = normalizeUSPBlock(block.fields);
            return <USPBlock key={index} {...normalized} />;
          }

          if (block.name === "acf/section-feature-four-cards") {
            const normalized = repeatorValueNormalize(block.fields);
            return <SectionFeaturedCards key={index} {...normalized} />;
          }

          const blockName = block.name.replace("acf/", "") as CustomBlocks;
          const BlockComponent = blockRegistry[blockName];
          if (!BlockComponent) return null;

          return <BlockComponent key={index} {...block.fields} />;
        })}

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

// ✅ Replacement for getStaticPaths
export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_BASE_URL}/wp-json/wp/v2/pages?_fields=slug`,
    { next: { revalidate: 60 } }
  );

  const pages: { slug: string }[] = await res.json();

  return pages.map((p) => ({
    slug: p.slug,
  }));
}
