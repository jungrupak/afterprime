# SSR Homepage & Bundle Reduction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert client-side data fetches to server-side ISR fetches and remove unnecessary `"use client"` boundaries on the homepage and shared layout.

**Architecture:** Push `"use client"` as deep as possible — async server components fetch data at build/revalidate time and pass serialisable props to thin client islands. The layout stops wrapping all children in a client provider that only one component needs.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, SCSS modules. No test runner — verification is `npm run lint` + `npm run build` + manual `view-source` check.

---

## File Map

| File | Change |
|------|--------|
| `src/utils/wpFetch.ts` | Remove hardcoded `revalidate: 60`, add optional param |
| `src/app/(site)/layout.tsx` | Remove video block, remove `ReactQueryProvider` wrapper |
| `src/components/blocks/hero-home/HeroHome.tsx` | Add video background div |
| `src/components/blocks/more-value-real-alignment-static/MoreAlignCards.tsx` | Remove `"use client"` |
| `src/components/blocks/data-visualization/DataVisual.tsx` | Remove `"use client"`, delete dead subcomponents |
| `src/lib/rebates.ts` | **Create** — shared `RebateDataType`, `normalizeRebatesPayload` |
| `src/components/blocks/earning-flow-section/EarningFlowSection.tsx` | Convert to async server component, fetch rebates |
| `src/utils/earning-calculator/EarningCalc.tsx` | Accept `initialRebates` prop, remove `useQuery` / `axios` |
| `src/components/blocks/usp-under-hero-home/UspUnderHeroHome.tsx` | Convert to async server component, fetch comparison API |
| `src/components/blocks/index.ts` | Update blockRegistry type for async components |

---

## Task 1: Fix wpFetch revalidate conflict

**Files:**
- Modify: `src/utils/wpFetch.ts`

- [ ] **Step 1: Replace the fetch options to remove hardcoded revalidate**

Replace the entire file content:

```ts
// src/utils/wpFetch.ts

export async function wpFetch<T>(endpoint: string, revalidate?: number): Promise<T | null> {
  const rawBaseUrl =
    process.env.NEXT_PUBLIC_WP_BASE_URL ||
    process.env.WORDPRESS_REST_ENDPOINT;

  if (!rawBaseUrl) {
    console.error("❌ Missing WordPress API base URL.");
    return null;
  }

  const cleanBaseUrl = rawBaseUrl.endsWith("/") ? rawBaseUrl.slice(0, -1) : rawBaseUrl;
  const apiBaseUrl = cleanBaseUrl.includes("/wp-json/")
    ? cleanBaseUrl
    : `${cleanBaseUrl}/wp-json/wp/v2`;
  const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${apiBaseUrl}${normalizedEndpoint}`;

  try {
    const res = await fetch(url, {
      ...(revalidate !== undefined ? { next: { revalidate } } : {}),
      headers: {
        Accept: "application/json",
        "User-Agent": "Next.js Server Fetch",
      },
    });

    if (!res.ok) {
      console.error(`❌ Failed to fetch ${url}:`, res.status, res.statusText);
      return null;
    }

    return (await res.json()) as T;
  } catch (error) {
    console.error("❌ wpFetch error:", error);
    return null;
  }
}
```

- [ ] **Step 2: Lint check**

```bash
cd /Users/bryan/afterprimeWEBPROD && npm run lint 2>&1 | head -30
```

Expected: no errors related to `wpFetch.ts`.

- [ ] **Step 3: Commit**

```bash
git add src/utils/wpFetch.ts
git commit -m "fix: remove hardcoded revalidate from wpFetch, add optional param"
```

---

## Task 2: Move video background from layout to HeroHome

**Files:**
- Modify: `src/app/(site)/layout.tsx`
- Modify: `src/components/blocks/hero-home/HeroHome.tsx`

- [ ] **Step 1: Remove video block from layout**

In `src/app/(site)/layout.tsx`, delete these lines (lines 77–99 of the current file):

```tsx
        {/* Fixed Vid Bg for entire website */}
        <div className="home_banner_video">
          <video
            playsInline
            className="mui-1eodtn4-video"
            controls={false}
            data-automation="VideoPlayer"
            height="100%"
            width="100%"
            style={{ height: "calc(100vh + 42vh)" }}
            loop
            muted
            autoPlay
            poster="/img/hero-video-poster.jpg"
            preload="auto"
            aria-label="video-player"
            controlsList="nodownload"
          >
            <source
              src="https://motion.afterprime.com/web/low-res.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        {/* Fixed Vid Bg for entire website ends */}
```

- [ ] **Step 2: Add video background to HeroHome**

Replace the entire return statement in `src/components/blocks/hero-home/HeroHome.tsx`:

```tsx
  return (
    <>
      <div className="home_banner_video">
        <video
          playsInline
          className="mui-1eodtn4-video"
          controls={false}
          data-automation="VideoPlayer"
          height="100%"
          width="100%"
          style={{ height: "calc(100vh + 42vh)" }}
          loop
          muted
          autoPlay
          poster="/img/hero-video-poster.jpg"
          preload="auto"
          aria-label="video-player"
          controlsList="nodownload"
        >
          <source
            src="https://motion.afterprime.com/web/low-res.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div className={`${styles.hero_home} h-screen max-md:h-[100%] relative`}>
        <div className="flex flex-wrap flex-col justify-center items-center h-[100%] min-h-[400px] lg:min-h-[600px] relative z-2 md:pt-10 max-md:pb-5">
          <div className="w-full max-w-[800] mx-auto max-md:px-5">
            <h1
              className={`${styles.heroHeading} h1-size flex lg:mb-[20px]! gap-20 justify-center text-center font-bold`}
            >
              {hero_banner_home_banner_heading ?? "Afterprime Hero Banner Text"}
            </h1>
          </div>
          <div className={`${styles.heroBannerPara} max-md:px-5`}>
            <div
              className=" max-w-[650px] text-[20px] md:text-[24px] lg:text-[32px]  mx-auto mb-12"
              style={{ fontWeight: "300" }}
              dangerouslySetInnerHTML={{
                __html: hero_banner_home_banner_paragraph || "&nbsp;",
              }}
            />

            <div className="flex max-md:flex-col gap-4 items-center justify-center">
              <div className="flex max-md:flex-col items-center gap-5 mb-5 lg:mb-25 2xl:mb-5">
                {hero_banner_home_is_type_form_cta === "1" ? (
                  <TypeformButton buttonText="Get Invite Code" size="Regular" />
                ) : (
                  <Btn
                    size="regular"
                    varient="primary"
                    isArrowVisible={true}
                    href={hero_banner_home_banner_btn_url ?? "#"}
                  >
                    {hero_banner_home_banner_btn_text ?? "Button"}
                  </Btn>
                )}
                <a href="https://app.afterprime.com/live">
                  Have a code? <u>Signup Now</u>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* ## */}
        <HeroUsp text={hero_banner_home_data_source_note ?? ""} />
      </div>
    </>
  );
```

- [ ] **Step 3: Lint and build check**

```bash
cd /Users/bryan/afterprimeWEBPROD && npm run lint 2>&1 | head -30
```

Expected: no new errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/(site)/layout.tsx src/components/blocks/hero-home/HeroHome.tsx
git commit -m "feat: move video background from shared layout into HeroHome block"
```

---

## Task 3: Remove "use client" from MoreValueRealAlignmentStatic

**Files:**
- Modify: `src/components/blocks/more-value-real-alignment-static/MoreAlignCards.tsx`

- [ ] **Step 1: Remove "use client" directive**

Delete the first line of `src/components/blocks/more-value-real-alignment-static/MoreAlignCards.tsx`:

```
"use client";
```

No other changes — `Link` from `next/link` works in server components.

- [ ] **Step 2: Lint check**

```bash
cd /Users/bryan/afterprimeWEBPROD && npm run lint 2>&1 | head -30
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/blocks/more-value-real-alignment-static/MoreAlignCards.tsx
git commit -m "refactor: remove unnecessary use client from MoreValueRealAlignmentStatic"
```

---

## Task 4: Remove "use client" from DataVisual and delete dead subcomponents

**Files:**
- Modify: `src/components/blocks/data-visualization/DataVisual.tsx`

The file contains three unused subcomponents (`BrokerSelect`, `RangeWithNumber`, `KpiCard`) defined after the exported component. They are not used anywhere and are dead code. Remove them along with `"use client"`.

- [ ] **Step 1: Replace the file**

```tsx
// src/components/blocks/data-visualization/DataVisual.tsx
import styles from "./style.module.scss";
import { Blocks } from "@/types/blocks";
import DollarSavingsCalculator from "@/components/all-calculators/CostSavingCalculator/CostSavingCalculator";

type SectionProps = Blocks["section-datavisualization"];

export default function DataVisual(props: SectionProps) {
  const {
    data_visialization_section_section_title,
    data_visialization_section_paragraph,
  } = props;

  return (
    <section className={`${styles.section_earning_flow} compact-section`}>
      <div className="ap_container_small">
        <div className={`${styles.costAdvantageSection}`}>
          <div
            className="h2-size font-semibold"
            dangerouslySetInnerHTML={{
              __html: data_visialization_section_section_title || "&nbsp;",
            }}
          />
          <div className="flex items-end justify-between mb-5 md:mb-10">
            <p
              className="paragraph max-w-[800px]"
              dangerouslySetInnerHTML={{
                __html: data_visialization_section_paragraph ?? "&nbsp;",
              }}
            />
          </div>
          <DollarSavingsCalculator />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Lint check**

```bash
cd /Users/bryan/afterprimeWEBPROD && npm run lint 2>&1 | head -30
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/blocks/data-visualization/DataVisual.tsx
git commit -m "refactor: remove use client and dead subcomponents from DataVisual"
```

---

## Task 5: Create shared rebates lib

**Files:**
- Create: `src/lib/rebates.ts`

This extracts the `RebateDataType`, `isRebateDataType`, and `normalizeRebatesPayload` utilities from `EarningCalc.tsx` into a server-safe shared module. A server component (`EarningFlowSection`) cannot import from a `"use client"` file, so shared logic must live outside the client boundary.

- [ ] **Step 1: Create the file**

```ts
// src/lib/rebates.ts

export type RebateDataType = {
  symbol: string;
  product: string;
  rebate_usd_per_lot: number;
  effective_from: string;
  effective_to: string;
};

function isRebateDataType(item: unknown): item is RebateDataType {
  if (!item || typeof item !== "object") return false;
  const row = item as Record<string, unknown>;
  return (
    typeof row.symbol === "string" &&
    typeof row.product === "string" &&
    typeof row.rebate_usd_per_lot === "number"
  );
}

export function normalizeRebatesPayload(payload: unknown): RebateDataType[] {
  const maybeRows = Array.isArray(payload)
    ? payload
    : payload &&
        typeof payload === "object" &&
        Array.isArray((payload as { data?: unknown }).data)
      ? (payload as { data: unknown[] }).data
      : [];
  return maybeRows.filter(isRebateDataType);
}
```

- [ ] **Step 2: Lint check**

```bash
cd /Users/bryan/afterprimeWEBPROD && npm run lint 2>&1 | head -30
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/rebates.ts
git commit -m "feat: extract RebateDataType and normalizeRebatesPayload to shared lib"
```

---

## Task 6: Refactor EarningFlowSection + EarningCalc

**Files:**
- Modify: `src/components/blocks/earning-flow-section/EarningFlowSection.tsx`
- Modify: `src/utils/earning-calculator/EarningCalc.tsx`

`EarningFlowSection` becomes an async server component that fetches rebates and passes them as `initialRebates` to `EarningCalc`. `EarningCalc` stays `"use client"` but receives data immediately — no loading state, no `useQuery`, no `axios`.

- [ ] **Step 1: Rewrite EarningCalc to accept initialRebates prop**

```tsx
// src/utils/earning-calculator/EarningCalc.tsx
"use client";
import { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { RebateDataType } from "@/lib/rebates";

interface Props {
  initialRebates: RebateDataType[];
}

export function EarningCalc({ initialRebates }: Props) {
  const [rebates] = useState<RebateDataType[]>(initialRebates);
  const [selectedSymbol, setSelectedSymbol] = useState<string>("");
  const [lotTradedValue, setLotTradedValue] = useState<number | "">(100);
  const [rebatePerLot, setRebatePerLot] = useState<number | null>(null);
  const [result, setResult] = useState<number>(0);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!rebates || rebates.length === 0) return;
    const defaultSymbol =
      rebates.find((s) => s.symbol === "CADCHF") ?? rebates[0];
    setSelectedSymbol(defaultSymbol.symbol);
    setRebatePerLot(defaultSymbol.rebate_usd_per_lot);
  }, [rebates]);

  const calculateEarning = () => {
    const lot = lotTradedValue === "" ? 0 : lotTradedValue;
    const rebate = rebatePerLot ?? 0;
    return rebate * lot * 60;
  };

  useEffect(() => {
    setResult(calculateEarning());
  }, [lotTradedValue, rebatePerLot, selectedSymbol]);

  const handleOnChangeTradeLot = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const num = Number(value);
    if (value === "") {
      setLotTradedValue("");
      return;
    }
    if (isNaN(num) || num <= 0) {
      setError("Invalid input, supports only positive numbers");
      return;
    }
    setError("");
    setLotTradedValue(num);
  };

  const handleSymbolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sym = e.target.value;
    setSelectedSymbol(sym);
    const found = rebates.find((s) => s.symbol === sym);
    setRebatePerLot(found ? found.rebate_usd_per_lot : null);
  };

  return (
    <>
      <h3 className="text-[20px] font-[700] opacity-80">
        Calculate Flow Earnings :
      </h3>

      <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-8 items-start">
        {/* LOT TRADED */}
        <div>
          <label>Lots Traded per month:</label>
          <input
            type="text"
            placeholder="Lot Traded / month"
            className={`${styles.customInput} w-full mt-5`}
            value={lotTradedValue}
            onChange={handleOnChangeTradeLot}
          />
          {error && (
            <span className="text-red-500 block mt-4 text-[12px]">{error}</span>
          )}
        </div>

        {/* SYMBOL */}
        <div>
          <label>Symbol Traded:</label>
          <select
            className={`${styles.customSelect} block mt-5 w-full`}
            value={selectedSymbol}
            onChange={handleSymbolChange}
          >
            {rebates.map((symbol) => (
              <option key={symbol.symbol} value={symbol.symbol}>
                {symbol.symbol}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* RESULT */}
      <div className="mt-8 text-[18px] font-[600] max-md:text-center">
        Over 5 years, your Flow Earnings:{" "}
        <span
          className="inline-block md:ml-15 text-[24px] font-[700]"
          style={{ color: "var(--secondary-color)" }}
        >
          ${result}
        </span>
      </div>

      <div className="bg-white py-5 px-10 note_box text-center mt-10">
        Afterprime&apos;s{" "}
        <a href="/trade-execution">
          <u>transparent execution model</u>
        </a>{" "}
        captures up to $3 per lot traded, compounding into thousands in
        additional earnings.
      </div>
    </>
  );
}
```

- [ ] **Step 2: Rewrite EarningFlowSection as async server component**

```tsx
// src/components/blocks/earning-flow-section/EarningFlowSection.tsx
import styles from "./EarningFlow.module.scss";
import Lists from "@/components/ui/Lists";
import Btn from "@/components/ui/Button";
import BoxedBlock from "@/components/boxed-block/BoxedBlock";
import { EarningCalc } from "@/utils/earning-calculator/EarningCalc";
import { normalizeRebatesPayload, type RebateDataType } from "@/lib/rebates";
import type { Blocks } from "@/types/blocks";

type EarningFlowBlock = Blocks["earning-flow-block"];

export async function EarningFlowSection(block: EarningFlowBlock) {
  const {
    earning_flow_section_heading = "",
    earning_flow_is_cta_visible,
    earning_flow_button_text,
    earning_flow_button_link,
  } = block;

  const listItems: string[] = Object.entries(block)
    .filter(
      ([key]) =>
        key.startsWith("earning_flow_list_items_") &&
        key.endsWith("_list_point"),
    )
    .sort((a, b) => {
      const numA = Number(a[0].match(/\d+/)?.[0]);
      const numB = Number(b[0].match(/\d+/)?.[0]);
      return (numA || 0) - (numB || 0);
    })
    .map(([_, value]) => (value !== undefined ? String(value) : ""));

  let initialRebates: RebateDataType[] = [];
  try {
    const res = await fetch(
      "https://scoreboard.argamon.com:8443/api/rebates/current",
      { next: { revalidate: 3600 } },
    );
    if (res.ok) {
      initialRebates = normalizeRebatesPayload(await res.json());
    }
  } catch {
    // silently fall back to empty — EarningCalc handles empty array gracefully
  }

  return (
    <section className={`${styles.section_earning_flow} compact-section`}>
      <div className="ap_container_small">
        <BoxedBlock isBoxed={false} vAlign="center">
          {/* Left */}
          <div>
            <h2
              className="h2-size mb-6 text-center md:text-left"
              dangerouslySetInnerHTML={{
                __html: earning_flow_section_heading || "&nbsp;",
              }}
            />
            <div className="mt-12">
              <Lists bulletVarient="arrow-blue" listItems={listItems} />
            </div>
            {earning_flow_is_cta_visible === "1" && (
              <div className="mt-16 text-center md:text-left">
                <Btn
                  href={earning_flow_button_link || ""}
                  size="large"
                  varient="primary-ghost"
                  isArrowVisible={true}
                >
                  {earning_flow_button_text || "Button"}
                </Btn>
              </div>
            )}
          </div>
          {/* Right */}
          <div>
            <EarningCalc initialRebates={initialRebates} />
          </div>
        </BoxedBlock>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Lint check**

```bash
cd /Users/bryan/afterprimeWEBPROD && npm run lint 2>&1 | head -40
```

Expected: no errors. If TypeScript complains about `EarningFlowSection` being async in the blockRegistry, proceed to Task 8 first to fix the registry type, then re-run.

- [ ] **Step 4: Commit**

```bash
git add src/utils/earning-calculator/EarningCalc.tsx src/components/blocks/earning-flow-section/EarningFlowSection.tsx
git commit -m "refactor: EarningFlowSection fetches rebates server-side, passes to EarningCalc as prop"
```

---

## Task 7: Convert UspUnderHeroHome to async server component

**Files:**
- Modify: `src/components/blocks/usp-under-hero-home/UspUnderHeroHome.tsx`

Replaces the `useEffect → fetch` pattern with a direct server-side `await fetch`. `GoogleReviewBadge` stays `"use client"` (it uses `<Script>`) and works fine as a client island inside a server component.

- [ ] **Step 1: Replace the file**

```tsx
// src/components/blocks/usp-under-hero-home/UspUnderHeroHome.tsx
import styles from "./UspHome.module.scss";
import { Blocks } from "@/types/blocks";
import GoogleReviewBadge from "@/components/ui/GoogleReviewBadge";

type USPBlockProps = Blocks["usp-under-home-hero"];

interface ComparisonData {
  secondBestVsAfterprimePct: number;
  industryVsAfterprimeAvgPct: number;
}

async function fetchComparisonData(): Promise<ComparisonData | null> {
  try {
    const res = await fetch(
      "https://scoreboard.argamon.com:8443/api/costs/comparison?period=7d&symbols=All%20pairs&mode=day&commission=true",
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function UspUnderHome(props: USPBlockProps) {
  const { usp_under_home_static_info_text } = props;
  const data = await fetchComparisonData();

  return (
    <section className={`${styles.section_usp}`}>
      <div className="ap_container_small">
        <div className={`${styles.usp_items_wrapper} items-center`}>
          <div>
            <h3>#1</h3>
            <p>
              Verified All-In
              <br /> Costs Globally
            </p>
          </div>
          <div>
            <h3>
              {data ? `${data.secondBestVsAfterprimePct.toFixed(1)}%` : "—"}
            </h3>
            <p>
              Saving vs
              <br /> 2nd best
            </p>
          </div>
          <div>
            <h3>
              {data ? `${data.industryVsAfterprimeAvgPct.toFixed(1)}%` : "—"}
            </h3>
            <p>
              Saving vs <br /> Industry Avg.
            </p>
          </div>
          <div className="max-md:flex items-center flex-col">
            <GoogleReviewBadge />
            <span className="text-[20px] font-[300] mt-6 block">
              <p>{usp_under_home_static_info_text || ""}</p>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Lint check**

```bash
cd /Users/bryan/afterprimeWEBPROD && npm run lint 2>&1 | head -40
```

Expected: no errors (or only the async-component TypeScript note — addressed in Task 8).

- [ ] **Step 3: Commit**

```bash
git add src/components/blocks/usp-under-hero-home/UspUnderHeroHome.tsx
git commit -m "refactor: UspUnderHeroHome fetches comparison data server-side (ISR 1h)"
```

---

## Task 8: Update blockRegistry type for async server components

**Files:**
- Modify: `src/components/blocks/index.ts`

`React.ComponentType<T>` expects a synchronous function. Async server components return `Promise<ReactNode>`. The registry type needs to accommodate both.

- [ ] **Step 1: Update the registry type**

At the top of `src/components/blocks/index.ts`, add a type alias and update the registry signature:

```ts
// src/components/blocks/index.ts
import { Blocks } from "@/types/blocks";
import React from "react";

// Allows both sync React components and async server components in the registry
type AnyBlockComponent<T> =
  | React.ComponentType<T>
  | ((props: T) => Promise<React.JSX.Element | null>);

// ...all existing imports...

export const blockRegistry: {
  [K in keyof Blocks]: AnyBlockComponent<Blocks[K]>;
} = {
  // ...all existing entries unchanged...
};
```

Keep all existing imports and entries exactly as they are — only add the `React` import (if not already present) and change the type annotation on `blockRegistry`.

- [ ] **Step 2: Check PageRenderer still compiles**

In `src/components/PageRender.tsx`, the line `<BlockComp key={idx} {...block.fields} />` may need a cast since `BlockComp` can now be async. If lint reports an error on that line, update it to:

```tsx
const BlockComp = blockRegistry[blockName] as React.ComponentType<Blocks[typeof blockName]>;
return BlockComp ? <BlockComp key={idx} {...block.fields} /> : null;
```

- [ ] **Step 3: Lint check**

```bash
cd /Users/bryan/afterprimeWEBPROD && npm run lint 2>&1 | head -40
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/blocks/index.ts src/components/PageRender.tsx
git commit -m "fix: update blockRegistry type to accept async server components"
```

---

## Task 9: Remove ReactQueryProvider from layout

**Files:**
- Modify: `src/app/(site)/layout.tsx`

At this point `EarningCalc` no longer calls `useQuery`, so `ReactQueryProvider` has no consumers. Remove it from the layout.

- [ ] **Step 1: Remove provider from layout**

In `src/app/(site)/layout.tsx`:

1. Delete the import line:
```tsx
import ReactQueryProvider from "../providers/ReactQueryProvider";
```

2. Remove the `<ReactQueryProvider>` opening and closing tags, keeping all children in place. The layout return should now look like:

```tsx
export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <head>
        <link
          rel="preconnect"
          href="https://motion.afterprime.com"
          crossOrigin=""
        />
      </head>
      {/* Head Scripts */}
      <HeadScripts />
      <AfterprimeOrgSchema />
      {/* Head Scripts Ends */}
      <TypeformLoader />
      <Header />
      {children}
      <Footer />
      {/* Footer Scripts */}
      <FooterScripts />
      {/* Footer Scripts */}
    </>
  );
}
```

- [ ] **Step 2: Full lint and build**

```bash
cd /Users/bryan/afterprimeWEBPROD && npm run lint 2>&1
```

Then:

```bash
cd /Users/bryan/afterprimeWEBPROD && npm run build 2>&1 | tail -30
```

Expected: build succeeds with no errors. TypeScript errors from async components should be resolved by Task 8.

- [ ] **Step 3: Commit**

```bash
git add src/app/(site)/layout.tsx
git commit -m "refactor: remove ReactQueryProvider from site layout — no consumers remain"
```

---

## Task 10: Final verification

- [ ] **Step 1: Start dev server**

```bash
cd /Users/bryan/afterprimeWEBPROD && npm run dev 2>&1 &
```

Wait for `Ready` message, then open `http://localhost:3000` in a browser.

- [ ] **Step 2: Check homepage view-source**

In the browser, go to `view-source:http://localhost:3000`. Confirm:
- The `UspUnderHeroHome` section contains actual percentage numbers (e.g. `28.3%`), not a loading spinner or empty element
- The `EarningFlowSection` heading and list items are present as text in the HTML source
- The `MoreValueRealAlignmentStatic` card text is present in the HTML source

- [ ] **Step 3: Confirm video absent on non-homepage**

Navigate to `http://localhost:3000/trade` (or any inner page). Open DevTools → Network → filter by `low-res.mp4`. Confirm: no video request is made on non-homepage pages.

- [ ] **Step 4: Confirm no JS errors in console**

On the homepage, open DevTools → Console. Confirm: no React hydration errors, no "Cannot read properties of undefined" errors.

- [ ] **Step 5: Final build**

```bash
cd /Users/bryan/afterprimeWEBPROD && npm run build 2>&1 | tail -20
```

Expected: `✓ Compiled successfully`.
