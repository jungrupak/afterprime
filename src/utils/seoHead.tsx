// utils/seoHead.ts
import { Metadata } from "next";

export function SeoHead({
  getPageID,
  title,
  description,
}: {
  getPageID: number;
  title?: string;
  description?: string;
}): Metadata {
  const fallbackTitle = title?.trim() || `Afterprime | Get Paid to Trade`;
  const fallbackDescription =
    description?.trim() ||
    `#1 Lowest Costs—Verified.
Aligned A-Book+. Flow Rewards Built In.`;

  return {
    title: fallbackTitle,
    description: fallbackDescription,
    openGraph: {
      title: fallbackTitle,
      description: fallbackDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: fallbackTitle,
      description: fallbackDescription,
    },
  };
}
