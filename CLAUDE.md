# CLAUDE.md — Afterprime Next.js Project

> This file is read automatically by Claude Code. Follow every instruction here before writing any code, making suggestions, or generating components.

---

## 🧠 Project Identity

**Project:** Afterprime Next.js (`afterprime-next`)
**Brand:** Afterprime — a premium financial services / forex trading platform
**Aesthetic:** Dark, cinematic, premium. No generic fintech defaults.
**Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS

---

## 👤 Developer Context

- **Role:** UXUI Developer + Frontend Engineer + Graphics Designer
- **Workflow:** Design-first thinking. Production-grade output only.
- **Tools in use:** Figma (design source), Cloudflare Pages (deploy), Vercel (alt), Claude Code, n8n (automation)
- **Branch conventions:** Feature branches off `main`. Current working branch: `dhiran`

---

## 🎨 Design System — Afterprime Brand

### Color Tokens

```css
/* Primary Palette */
--ap-electric-blue: #263DEA;
--ap-vermillion: #FF301D;

/* Neutrals / Dark Theme Base */
--ap-black: #0A0A0A;
--ap-dark-surface: #111118;
--ap-dark-elevated: #1A1A24;
--ap-border-subtle: rgba(255, 255, 255, 0.06);
--ap-border-default: rgba(255, 255, 255, 0.12);

/* Text */
--ap-text-primary: #FFFFFF;
--ap-text-secondary: rgba(255, 255, 255, 0.6);
--ap-text-muted: rgba(255, 255, 255, 0.35);

/* Semantic */
--ap-success: #22C55E;
--ap-warning: #F59E0B;
--ap-error: #FF301D;   /* same as Vermillion */
--ap-info: #263DEA;    /* same as Electric Blue */
```

### Typography

```css
/* Display / Headings */
font-family: 'Blinker', sans-serif;
/* Weights: 300, 400, 600, 700, 900 */

/* Body / UI / Labels */
font-family: 'Graphik', sans-serif;
/* Weights: 300, 400, 500, 600 */
```

**Rules:**
- Use `Blinker` for all headings, hero copy, data labels, stat numbers
- Use `Graphik` for body, UI labels, table data, form inputs
- Never use Inter, Roboto, Arial, or system-ui as primary fonts
- Load fonts via `next/font/local` with preload enabled

### Spacing & Layout

- Base unit: `4px` (Tailwind default)
- Section padding: `py-24` minimum on desktop
- Container max-width: `1280px` with `px-6` gutters
- Grid: prefer 12-column CSS Grid for layout, Flexbox for component internals

---

## 🏗️ Architecture & Code Conventions

### File Structure (App Router)

```
src/
├── app/
│   ├── (marketing)/         # Public-facing pages
│   ├── (dashboard)/         # Authenticated dashboard
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                  # Atomic: Button, Input, Badge, Card
│   ├── charts/              # Chart.js / Recharts wrappers
│   ├── sections/            # Page-level sections
│   └── layout/              # Header, Footer, Sidebar, Nav
├── lib/
│   ├── utils.ts
│   ├── api.ts
│   └── types.ts
├── hooks/                   # Custom React hooks
└── styles/
    └── tokens.css           # CSS custom properties
```

### Component Rules

- All components: **TypeScript** with explicit prop types
- Use `'use client'` only when necessary (interactivity, hooks, browser APIs)
- Prefer **Server Components** by default in App Router
- No `any` types — define proper interfaces
- Export named + default where applicable
- Colocate component styles with Tailwind; extract to `tokens.css` for brand tokens

### Tailwind Usage

- Extend `tailwind.config.ts` with Afterprime brand tokens
- Use `cn()` utility (clsx + tailwind-merge) for conditional classes
- Never write inline `style={{}}` for colors — always use CSS variables or Tailwind tokens
- Dark mode: `class` strategy, default to dark

---

## 📊 Chart & Data Visualization Standards

Used in: forex calculators, P&L dashboards, trading analytics

- **Library:** Chart.js (via `react-chartjs-2`) or Recharts
- **Default style:**
  - Background: transparent
  - Grid lines: `rgba(255,255,255,0.06)` — subtle, not distracting
  - Curves: smooth bezier (`tension: 0.4`)
  - Area fills: gradient from brand color → transparent
  - Tooltips: dark card, Graphik font, white text
  - Mini range selector: custom buttons (1D / 1W / 1M / 3M / 1Y)
- **Animations:** ease-in-out, 600ms on mount
- **Responsive:** always use `maintainAspectRatio: false` with explicit container height

---

## ⚡ Motion & Animation

- **Library:** Framer Motion for React component animations
- **Principles:**
  - One orchestrated entrance per page section (staggered children)
  - Hover states: subtle scale `1.02`, opacity shifts
  - Page transitions: fade + slight Y translate (8px)
  - No bounce, no overshoot on financial UI — use `easeOut` only
- **Performance:** use `will-change: transform` sparingly, prefer `transform` over `top/left`

---

## 🔌 Infrastructure

| Service | Purpose | Notes |
|---|---|---|
| Cloudflare Pages | Production deploy | D1 (SQLite), R2 (storage), KV |
| Vercel | Preview / alt deploy | — |
| `wrangler pages dev --remote` | Local dev with live CF bindings | Required for D1/R2 access |
| n8n | Automation workflows | Docker local, email → Slack pipeline |

### Environment Variables

- Local: `.env.local` (gitignored)
- CF Pages: set via Cloudflare dashboard
- Never hardcode secrets; never commit `.env` files
- Use `NEXT_PUBLIC_` prefix only for truly public vars

---

## 🚫 Anti-Patterns — Never Do These

- ❌ Generic purple gradient on white background
- ❌ Light mode as default — Afterprime is dark-first
- ❌ `console.log` left in production code
- ❌ Inline styles overriding brand tokens
- ❌ `any` TypeScript type
- ❌ `<form>` HTML tag — use controlled React form state
- ❌ Inter, Roboto, Arial as primary typefaces
- ❌ Generic card-with-shadow-on-white UI patterns
- ❌ Placeholder copy like "Lorem ipsum" in component files
- ❌ Committing directly to `main`
- ❌ Exposing API keys in client-side code

---

## ✅ Code Quality Checklist

Before finishing any task, verify:

- [ ] TypeScript: no errors, no `any`
- [ ] Fonts: Blinker + Graphik applied correctly
- [ ] Colors: using CSS variables, not hardcoded hex
- [ ] Dark theme: default and tested
- [ ] Responsive: mobile → desktop breakpoints checked
- [ ] Animations: Framer Motion applied where relevant
- [ ] No leftover `console.log`
- [ ] Component is in the correct directory
- [ ] `'use client'` is justified if used

---

## 🗂️ Related Files & Resources

- Design source: Figma (Argamon / Afterprime workspace)
- Brand fonts: Blinker (Google Fonts), Graphik (local woff2)
- Skills reference: `/mnt/skills/user/admin-dashboard/SKILL.md`
- AP Trading Hours automation: `/mnt/skills/user/ap-trading-hours/SKILL.md`
