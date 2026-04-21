# AGENTS.md

Commands:
- `npm run dev` — Start dev server with turbopack on http://localhost:3000
- `npm run build` — Production build with turbopack
- `npm run lint` — Run ESLint

Tech stack: Next.js 16, React 19, TypeScript (strict), Tailwind CSS 4.

Path alias: `@/*` maps to `src/*`.

No test runner configured.

Run `lint` before committing. No separate typecheck step (ESLint covers basic TS errors via eslint-config-next).