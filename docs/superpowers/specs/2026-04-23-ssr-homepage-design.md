# SSR & JS Bundle Reduction — Homepage + Shared Layout

**Date:** 2026-04-23  
**Scope:** `(site)` layout + homepage blocks  
**Goals:**
- (A) Real content in initial HTML — no blank holes on first render for crawlers or users
- (B) Reduce client-side JavaScript — eliminate unnecessary `"use client"` boundaries

---

## Problem Summary

The homepage is an async server component and fetches WordPress content server-side. However several blocks within it either:
1. Fetch data on the client via `useEffect`, producing blank loading states in the initial HTML
2. Are marked `"use client"` for no reason, unnecessarily expanding the JS bundle

The shared site layout compounds this by loading a background video on every page and wrapping all children in `ReactQueryProvider` (only one component needs it).

---

## Architecture

### Principle: push `"use client"` as deep as possible

Server components render HTML. Client components ship JS. The boundary should be drawn at the smallest possible unit that actually needs browser APIs or interactivity. Everything above that boundary — layout shells, headings, static text, links — should be a server component.

---

## Section 1: Layout Fixes

### 1a. Video background — move from layout to homepage

**File:** `src/app/(site)/layout.tsx`

Remove the `<div className="home_banner_video"><video ...></video></div>` block from the site layout.

**File:** `src/components/blocks/hero-home/HeroHome.tsx`

Add the video div at the top of `HeroHome`. The component is already a server component (no `"use client"`), and video/source elements are plain HTML — no JS needed. The `home_banner_video` CSS class already positions it as a fixed fullscreen background. Moving it here means it only loads on pages that actually render `HeroHome`.

### 1b. ReactQueryProvider — remove from layout

**File:** `src/app/(site)/layout.tsx`

Remove `<ReactQueryProvider>` wrapper entirely.

`ReactQueryProvider` is currently the only reason `useQuery` can be called anywhere in the site tree. After the changes in Section 2b, `EarningCalc` will no longer use `useQuery` (initial data arrives as a prop). If React Query is not needed by any other component, the provider is dead weight on every page load.

If React Query is needed in future, it should be added at the component level, not the layout level.

### 1c. wpFetch revalidate — remove hardcoded 60s

**File:** `src/utils/wpFetch.ts`

The `fetch()` call inside `wpFetch` passes `next: { revalidate: 60 }`. This overrides the page-level `export const revalidate = 86400` set on the homepage, causing WP content to refresh every 60 seconds instead of every 24 hours.

Fix: remove the hardcoded `next: { revalidate: 60 }`. Add an optional `revalidate` parameter to `wpFetch` so callers can opt in to a specific cadence. Pages that don't pass it inherit Next.js defaults (or their segment-level revalidate).

```ts
// before
export async function wpFetch<T>(endpoint: string): Promise<T | null>

// after
export async function wpFetch<T>(endpoint: string, revalidate?: number): Promise<T | null>
```

---

## Section 2: Homepage Block Fixes

### 2a. UspUnderHeroHome — client fetch → async server component

**File:** `src/components/blocks/usp-under-hero-home/UspUnderHeroHome.tsx`

**Current behaviour:** `"use client"` component. On mount, fires `useEffect → fetch` to the comparison API. Initial HTML is a loading spinner. Crawlers see nothing. LCP is delayed.

**Target behaviour:** Async server component. Data is fetched server-side with ISR. Initial HTML contains real stats. No JS at all for this component.

Changes:
- Remove `"use client"`
- Remove `useState`, `useEffect`, `loading`/`error` state
- Make the function `async`, `await` the comparison API directly
- Add `next: { revalidate: 3600 }` to the fetch (hourly refresh is appropriate for market comparison data)
- On fetch failure, fall back to `null` values and render the static text only (no crash, no blank)
- `GoogleReviewBadge` uses `<Script>` (next/script) so it legitimately needs `"use client"`. It renders as a client island inside the server component — no change needed to `GoogleReviewBadge` itself.

API endpoint: `https://scoreboard.argamon.com:8443/api/costs/comparison?period=7d&symbols=All%20pairs&mode=day&commission=true`
Fields used: `secondBestVsAfterprimePct`, `industryVsAfterprimeAvgPct`

### 2b. EarningFlowSection + EarningCalc — split server wrapper from client form

**Files:**
- `src/components/blocks/earning-flow-section/EarningFlowSection.tsx`
- `src/utils/earning-calculator/EarningCalc.tsx`

**Current behaviour:** The entire section — heading, list, button, and calculator — is `"use client"`. On mount, `EarningCalc` calls `useQuery` to fetch the rebates list. Initial HTML shows an empty calculator. `ReactQueryProvider` must be present in the layout.

**Target behaviour:** `EarningFlowSection` becomes an async server component. It fetches the rebates list server-side and passes it as `initialRebates` to `EarningCalc`. The calculator renders immediately with real data. No loading state. No `useQuery`. No `ReactQueryProvider` needed.

Changes to `EarningFlowSection`:
- Remove `"use client"`
- Make the function `async`
- Fetch `https://scoreboard.argamon.com:8443/api/rebates/current` server-side with `next: { revalidate: 3600 }`
- Normalize/validate the response (reuse the existing `normalizeRebatesPayload` function — move it to a shared lib or keep it in `EarningCalc` and import)
- Pass `initialRebates: RebateDataType[]` prop to `EarningCalc`
- On fetch failure, pass empty array — `EarningCalc` already handles that gracefully

Changes to `EarningCalc`:
- Keep `"use client"` — it handles form input and calculation state
- Accept `initialRebates: RebateDataType[]` prop
- Replace `useQuery` with `useState(initialRebates)` — data arrives pre-populated, no async loading
- Remove `axios` import (no longer needed for this component)
- Remove `isFetching` loading guard on the select (data is always present on mount)

### 2c. MoreValueRealAlignmentStatic — remove "use client"

**File:** `src/components/blocks/more-value-real-alignment-static/MoreAlignCards.tsx`

Three static cards with `Link` tags and inline SVGs. No state, no effects, no browser APIs. `Link` works in server components. Remove `"use client"` — no other changes needed.

### 2d. DataVisual outer wrapper — remove "use client"

**File:** `src/components/blocks/data-visualization/DataVisual.tsx`

The outer component is a layout shell (section, div, headings via `dangerouslySetInnerHTML`). It renders `DollarSavingsCalculator` which is interactive and must stay client-side. Remove `"use client"` from `DataVisual`. The server/client boundary moves down to `DollarSavingsCalculator`.

Note: `DollarSavingsCalculator` (`src/components/all-calculators/CostSavingCalculator/CostSavingCalculator.tsx`) is already `"use client"` — no change needed there.

---

## Data Flow After Changes

```
HomePage (server, async)
  └─ wpFetch() → WP REST API (ISR 86400s)
  └─ PageRenderer (server)
       ├─ HeroHome (server)
       │    └─ [video background fixed fullscreen]
       ├─ UspUnderHeroHome (server, async)
       │    └─ fetch comparison API (ISR 3600s)
       ├─ MoreValueRealAlignmentStatic (server)  ← was client
       ├─ EarningFlowSection (server, async)     ← was client
       │    └─ fetch rebates API (ISR 3600s)
       │    └─ EarningCalc (client)              ← receives initialRebates prop
       ├─ DataVisual (server)                    ← was client
       │    └─ DollarSavingsCalculator (client)
       └─ SelectLivePricingTable (server, async)
            └─ LivePricingAll (client)            ← SignalR, legitimately client
```

---

## What Stays Client-Side (and Why)

| Component | Reason |
|-----------|--------|
| `Header` | Scroll state (`useState`), mobile menu toggle |
| `EarningCalc` | Form inputs, calculation state |
| `DollarSavingsCalculator` | Interactive calculator |
| `LivePricingAll` | SignalR WebSocket real-time feed |
| `FooterScripts` / `HeaderScripts` | Next.js `<Script>` requires client |
| `Nav` / `MobileNav` | Menu interaction state |

---

## Out of Scope (not in this iteration)

- Other pages (`/trade`, `/calculators`, `/vs`, `/glossary`)
- Duplicate component folders cleanup
- Semantic HTML / heading hierarchy improvements
- `dangerouslySetInnerHTML` sanitization audit
- `console.log` cleanup in production scripts

---

## Success Criteria

- `view-source:afterprime.com` shows real stat numbers from `UspUnderHeroHome` (not empty)
- `view-source:afterprime.com` shows the earnings calculator section heading and list (not empty)
- Video background not present in HTML of non-homepage pages
- No `ReactQueryProvider` in site layout
- `MoreValueRealAlignmentStatic`, `DataVisual`, `EarningFlowSection` not in the client JS bundle
- `wpFetch` no longer hardcodes 60s revalidate
