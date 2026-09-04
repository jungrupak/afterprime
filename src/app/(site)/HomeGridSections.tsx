import { WPPage, ACFBlock } from "@/types/blocks";
import { renderAcfBlock } from "@/components/PageRender";
import { acfFieldRegistry } from "@/components/acfFieldGroups";
import { MarketsWeCover } from "@/components/blocks/markets-we-cover-static/MarketsWeCover";
import styles from "./HomeGridSections.module.scss";

type Props = { pageData: WPPage };

const HERO_BLOCK = "acf/hero-banner-home";
const PLATFORMS_BLOCK = "acf/platform-cards-section-static";
const LIVE_PRICING_BLOCK = "acf/live-pricing-table";
const EARNING_FLOW_BLOCK = "acf/earning-flow-block";
const MARKETS_AREA = "markets-we-cover";

// Home page trade-off: the visual sequence (hero, trust stats, live spreads,
// platform cards, calculator...) is what converts. But that same sequence
// buries the only in-content copy connecting "Afterprime" to each asset
// class and platform deep in the DOM, which is what crawlers and answer
// engines actually read. Named CSS Grid areas let source order (crawlers,
// screen readers) diverge from visual order (users) without touching either
// one — see https://bronson.co.za/the-igaming-homepage-trade-off-few-operators-actually-solve/
export function HomeGridSections({ pageData }: Props) {
  const blocks: ACFBlock[] = pageData.acf_blocks ?? [];

  // One area name per block, derived from its position in the WP array so it
  // stays stable regardless of how we reorder the *source* below. Duplicate
  // block types (e.g. "block-multipurpose" appears twice) get a numbered
  // suffix so they don't collide onto the same grid cell.
  const items = blocks.map((block, index) => {
    const base = (block.name ?? `block-${index}`).replace("acf/", "");
    const occurrence = blocks
      .slice(0, index + 1)
      .filter((b) => b.name === block.name).length;
    const area = occurrence === 1 ? base : `${base}-${occurrence}`;
    return { block, area, key: index };
  });

  const heroItem = items.find((it) => it.block.name === HERO_BLOCK);
  const platformsItem = items.find((it) => it.block.name === PLATFORMS_BLOCK);
  const restItems = items.filter(
    (it) => it !== heroItem && it !== platformsItem,
  );

  // Visual order stays exactly what's live today — one row per existing WP
  // block, in their existing order. The new Markets section is spliced in
  // right after the platform cards row (or at the end if that block is ever
  // removed from the page), so nothing else shifts for sighted users.
  const visualAreas: string[] = [];
  items.forEach((it) => {
    visualAreas.push(it.area);
    if (it === platformsItem) visualAreas.push(MARKETS_AREA);
  });
  if (!platformsItem) visualAreas.push(MARKETS_AREA);

  const gridTemplateAreas = visualAreas.map((a) => `"${a}"`).join(" ");

  return (
    <>
      {/* WCAG 1.3.2: DOM order now leads with Markets/Platforms copy ahead
          of the two interactive widgets (live spreads, Flow Rewards calc),
          so keyboard/screen-reader users would otherwise tab through new
          static copy before reaching them. Skip links restore direct access. */}
      <div className={styles.skipLinks}>
        <a href="#live-spreads" className="sr-only focus:not-sr-only">
          Skip to live spreads
        </a>
        <a href="#flow-calculator" className="sr-only focus:not-sr-only">
          Skip to Flow Rewards calculator
        </a>
      </div>

      <div className={styles.homeGrid} style={{ gridTemplateAreas }}>
        {heroItem && (
          <div style={{ gridArea: heroItem.area }}>
            {renderAcfBlock(heroItem.block, heroItem.key)}
          </div>
        )}

        <div style={{ gridArea: MARKETS_AREA }}>
          <MarketsWeCover />
        </div>

        {platformsItem && (
          <div style={{ gridArea: platformsItem.area }}>
            {renderAcfBlock(platformsItem.block, platformsItem.key)}
          </div>
        )}

        {restItems.map((it) => {
          const anchorId =
            it.block.name === LIVE_PRICING_BLOCK
              ? "live-spreads"
              : it.block.name === EARNING_FLOW_BLOCK
                ? "flow-calculator"
                : undefined;
          return (
            <div key={it.key} id={anchorId} style={{ gridArea: it.area }}>
              {renderAcfBlock(it.block, it.key)}
            </div>
          );
        })}
      </div>

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
