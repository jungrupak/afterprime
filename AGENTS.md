# AGENTS.md

## Commands

```bash
npm run dev      # Next.js dev with Turbopack
npm run build    # Production build with Turbopack
npm run start    # Start production server
npm run lint     # ESLint check
```

## Important Notes

- **No typecheck script** - Run `npx tsc --noEmit` manually if needed
- **No test framework** - Tests would need to be set up (not currently in package.json)
- Uses **Turbopack** for dev/build (`--turbopack` flag)

## Architecture

- **Route groups**: `(site)`, `(trade)`, `(calculators)` - Next.js route groupings for organization
- **Styling**: Tailwind CSS 4 + SCSS modules (`.module.scss` files)
- **Data fetching**: WordPress headless CMS via `src/utils/wpFetch.ts`, plus custom API routes in `src/app/api/`
- **State management**: React Query (`@tanstack/react-query`)
- **Charts**: Chart.js + Recharts

## API Routes

- `src/app/api/compare/` - Broker comparison
- `src/app/api/compare-brokers/[symbol]/` - Symbol-specific comparisons
- `src/app/api/rebates/` - Rebates data

## Build Config

- `next.config.ts` contains many legacy URL redirects (SEO migration) - check here before adding new routes
- Image domains configured: `wordpress-1264747-4900526.cloudwaysapps.com`, `cdn.afterprime.com`
