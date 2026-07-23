// Footer is an async Server Component, so it can call getTranslatedStatic
// directly (no client/server prop plumbing needed). Kept separate from the
// main site's src/components/footer/footerContent.ts — the two footers'
// legal copy differs slightly in wording/entity name, so they're translated
// (and cached) independently rather than forced to share one object.
export const lpFooterContent = {
  customerNoticeHeading: "Customer Notice",
  disclaimerPart1:
    "Trading derivatives is high risk. Losses can exceed your initial investment. You should only trade with money you can afford to lose. Any Information or advice contained on this website is general in nature and has been prepared without taking into account your objectives, financial situation or needs. Past performance of any product described on this website is not a reliable indication of future performance. You should consider whether you’re part of our target market by reviewing our Target Market Determination, and read our ",
  legalDocsLinkText: "PDS and other legal documents",
  disclaimerPart2:
    " to ensure you fully understand the risks before you make any trading decisions.",
  jurisdictionNotice:
    "The information on this website is not intended to be an inducement, offer or solicitation to any person in any country or jurisdiction where such distribution or use would be contrary to local law or regulation.",
  copyright:
    "© Copyright 2018-2026 Afterprime Ltd | Global Gateway 8, Rue de la Perle, Providence, Mahé, Seychelles.",
};

export type LpFooterContent = typeof lpFooterContent;
