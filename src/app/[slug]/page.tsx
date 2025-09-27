import {
  WPPage,
  ACFBlock,
  PageFieldGroups,
  FieldGroupName,
} from "@/types/blocks";
import { blockRegistry } from "@/components/blocks";
import { acfFieldRegistry } from "@/components/acfFieldGroups";
import { CustomBlocks } from "@/types/blocks";

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params }: PageProps) {
  const res = await fetch(
    `https://wordpress-1264747-4900526.cloudwaysapps.com/wp-json/wp/v2/pages?slug=${params.slug}`
  );
  const pages: WPPage[] = await res.json();

  if (!pages?.length) return <p>Page not found</p>;
  const data = pages[0];

  return (
    <>
      {/* Render blocks dynamically */}
      {data.acf_blocks?.map((block, index) => {
        const blockName = block.name.replace("acf/", "") as CustomBlocks;
        const BlockComponent = blockRegistry[blockName];
        if (!BlockComponent) return null;
        return <BlockComponent key={index} {...block.fields} />;
      })}

      {/* Render page-level ACF fields */}
      {data.acf &&
        (
          Object.entries(data.acf) as [
            FieldGroupName,
            PageFieldGroups[FieldGroupName]
          ][]
        ).map(([fieldKey, fieldValue], index) => {
          if (!fieldValue) return null;
          const FieldComponent = acfFieldRegistry[fieldKey];
          return <FieldComponent key={index} {...fieldValue} />;
        })}
    </>
  );
}
