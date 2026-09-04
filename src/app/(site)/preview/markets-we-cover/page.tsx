import { MarketsWeCover } from "@/components/blocks/markets-we-cover-static/MarketsWeCover";

// Dev-only preview route — not linked from anywhere, safe to delete once
// the block is wired up as a real ACF layout in WP and placed on the
// homepage.
export default function MarketsWeCoverPreviewPage() {
  return <MarketsWeCover />;
}
