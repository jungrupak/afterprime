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
    `${process.env.WORDPRESS_REST_ENDPOINT}/pages?slug=${params.slug}`,
    { next: { revalidate: 60 } }
  );

  const pages: WPPage[] = await res.json();
  const pageData = pages?.[0];
  if (!pageData) return <p>Page not found</p>;

  return (
    <>
      {Array.isArray(pageData?.acf_blocks) &&
        pageData.acf_blocks.map((block: ACFBlock, idx) => {
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

// ✅ Pre-generate dynamic pages
export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.WORDPRESS_REST_ENDPOINT}/pages?_fields=slug`
  );
  const pages: { slug: string }[] = await res.json();

  return pages.map((p) => ({ slug: p.slug }));
}
