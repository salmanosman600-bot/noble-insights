# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Noor — Noble Quran**: a Next.js 15 (App Router) + React 18 reading experience for the Quran with translations, tafsir, audio, topics, and articles. Originally scaffolded by Lovable; recently migrated from React Router to Next.js routing (commit `f15a099`). Both `bun` and `npm` work — a `bun.lockb` and `package-lock.json` both exist.

A separate **target architecture** for when this app outgrows its current shape lives at [docs/architecture.md](docs/architecture.md) — feature-based folders, server services, TanStack Query, Zustand. Reference only; nothing in `src/` follows it yet. Includes a step-by-step migration guide.

## Commands

| Task | Command |
|------|---------|
| Dev server | `bun run dev` (or `npm run dev`) — Next.js on :3000 |
| Production build | `bun run build` |
| Production start | `bun run start` |
| Lint | `bun run lint` (Next's `next lint`, uses `.eslintrc.json`) |
| Unit tests (Vitest, jsdom) | `bun run test` — *requires installing `@vitejs/plugin-react-swc` first* |
| Single test file | `bunx vitest run src/path/to/file.test.ts` |
| Single test by name | `bunx vitest run -t "test name substring"` |
| E2E (Playwright) | `bunx playwright test` — *requires installing `lovable-agent-playwright-config` first* |

`vitest.config.ts`, `playwright.config.ts`, and `playwright-fixture.ts` are excluded from `tsconfig.json` so the production build doesn't fail on their uninstalled plugin imports. Re-run their respective install steps when you actually want to run tests.

## Architecture

### The "thin route + page component" pattern

Routes are split across two folders:

- [src/app/](src/app/) — Next.js App Router entries. Each `<route>/page.tsx` is a thin **server** component that exports `metadata` (or `generateMetadata`) and renders a single client component imported from `src/pages/`.
- [src/pages/](src/pages/) — the actual UI, each starting with `'use client'`. Holds all state, hooks, and JSX. These names match the legacy React Router page names.

Example: [src/app/quran/page.tsx](src/app/quran/page.tsx) exports metadata + `<QuranReader />` from [src/pages/QuranReader.tsx](src/pages/QuranReader.tsx).

When adding a route: create `src/app/<segment>/page.tsx` for SEO/metadata + a client component in `src/pages/<Name>.tsx`. Dynamic segments use the `params: Promise<{ ... }>` shape and must be `await`ed (see [src/app/topics/[topicId]/page.tsx](src/app/topics/%5BtopicId%5D/page.tsx)).

> ⚠️ **Pages Router pollution.** Because `src/pages/` happens to be the Next.js Pages Router convention name, every file there (Articles.tsx, Audio.tsx, Dashboard.tsx, Index.tsx, ...) is *also* auto-exposed as a route at its filename: `/Articles`, `/Audio`, `/Dashboard`, `/Index`, etc. (case-sensitive). The build output's "Route (pages)" section shows them. The proper App Router routes (`/articles`, `/audio`, `/dashboard`) work correctly; the duplicates are a side effect. Recommended cleanup: rename the folder to something like `src/page-components/` or `src/views/`, and update the ~11 imports in `src/app/*/page.tsx`. Adding new files to `src/pages/` will continue to expose them as duplicate routes until this is done.

Root layout is [src/app/layout.tsx](src/app/layout.tsx) — loads three Google fonts (`Plus_Jakarta_Sans` → `--font-sans`, `Noto_Naskh_Arabic` → `--font-arabic`, `Amiri` → `--font-amiri`) via `next/font` and wraps everything in [src/components/Providers.tsx](src/components/Providers.tsx) (`QueryClientProvider` + `TooltipProvider` + two toasters).

The visible chrome (Header/Footer) lives in [src/components/layout/Layout.tsx](src/components/layout/Layout.tsx) and is added **inside each `pages/*` component**, not in `app/layout.tsx`. So a new page must wrap its content in `<Layout>...</Layout>` itself.

### UI system

- shadcn/ui components in [src/components/ui/](src/components/ui/) (Radix primitives, ~50 files). Aliases configured in [components.json](components.json) — generate new ones with `bunx shadcn@latest add <name>`.
- Path alias `@/*` → `./src/*` (set in [tsconfig.json](tsconfig.json)).
- Tailwind theme uses HSL CSS variables defined in [src/index.css](src/index.css) (light + `.dark`). Custom tokens beyond shadcn defaults: `surface`, `surface-contrast`, `warm`, `warm-glow`, `olive`, `hover`, `deep-accent`. Use `font-arabic` / `font-amiri` (or the `.arabic-text` utility, which also sets `direction: rtl`) for Arabic copy.
- Animations: Framer Motion for entrance effects; Tailwind keyframes `fade-in`, `fade-in-slow`, `slide-up`, `accordion-down/up`. Use `cn()` from [src/lib/utils.ts](src/lib/utils.ts) for class merging.

### Data

No backend — content is hardcoded TypeScript in [src/data/](src/data/) (`surahs.ts` lists all 114 surahs with metadata; `verses.ts` has sample verses). React Query is wired up via Providers but currently only for client state; treat the data files as the source of truth for now.

### Security headers

[next.config.ts](next.config.ts) sets `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, and `Permissions-Policy` (camera/mic/geo disabled) on every route. Don't strip these without reason.

## Conventions

- **Use `<Link href="...">` from `next/link`** — never `<Link to="...">`. The migration commit `f15a099` switched from `react-router-dom` to `next/link`; one missed instance in `src/pages/Topics.tsx` was caught by the type-checker. Don't import from `react-router-dom`; don't use `useNavigate`/`useLocation`/`useParams` from it. Use `usePathname()` and `useRouter()` from `next/navigation`.
- **PostCSS config is `.mjs`** ([postcss.config.mjs](postcss.config.mjs)) because the file uses `export default` but `package.json` doesn't set `"type": "module"`. If you ever rename it back to `.js`, switch to `module.exports = { ... }` syntax or you'll break Tailwind processing.
- **TypeScript** is `strict: false` but Next.js auto-added `strictNullChecks: true` to [tsconfig.json](tsconfig.json) on its first build. `target` is `ES2017`. `@typescript-eslint/no-unused-vars` is off.
- **Client interactivity → top-of-file `'use client'`**. Server-only `metadata` exports must stay in `app/*/page.tsx`, never inside a `'use client'` file.
- **Single ESLint config**: only [.eslintrc.json](.eslintrc.json), used by `next lint`. The previous `eslint.config.js` was deleted because it referenced uninstalled packages and was never invoked by any script.
- **Vitest setup** at [src/test/setup.ts](src/test/setup.ts) registers `@testing-library/jest-dom` and a `matchMedia` shim. Tests are picked up from `src/**/*.{test,spec}.{ts,tsx}` — but again, install `@vitejs/plugin-react-swc` first, or rewrite the config to use `@vitejs/plugin-react`.
