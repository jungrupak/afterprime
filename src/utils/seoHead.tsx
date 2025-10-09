import { Metadata } from "next";

export function SeoHead({ getPageID }: { getPageID: number }): Metadata {
  return {
    title: `Page #${getPageID}`,
    description: `SEO description for page ${getPageID}`,
    openGraph: {
      title: `Page #${getPageID}`,
      description: `OG description for page ${getPageID}`,
    },
  };
}
