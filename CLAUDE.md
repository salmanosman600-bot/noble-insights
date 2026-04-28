# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Noor — Noble Quran**: a Next.js 15 (App Router) + React 18 reading experience for the Quran with translations, tafsir, audio, topics, and articles. Originally scaffolded by Lovable; recently migrated from React Router to Next.js routing (commit `f15a099`). Both `bun` and `npm` work — a `bun.lockb` and `package-lock.json` both exist.

## Commands

| Task | Command |
|------|---------|
| Dev server | `bun run dev` (or `npm run dev`) — Next.js on :3000 |
| Production build | `bun run build` |
| Production start | `bun run start` |
| Lint | `bun run lint` (Next's `next lint`, uses `.eslintrc.json`) |
| Unit tests (Vitest, jsdom) | `bun run test` |
| Watch tests | `bun run test:watch` |
| Single test file | `bunx vitest run src/path/to/file.test.ts` |
| Single test by name | `bunx vitest run -t "test name substring"` |
| E2E (Playwright) | `bunx playwright test` (config delegates to `lovable-agent-playwright-config`) |

Note: `vitest.config.ts` imports `@vitejs/plugin-react-swc`, which is **not** declared in `package.json`. If unit tests fail to start, that's likely why — install it or convert the config to use `@vitejs/plugin-react`.

## Architecture

### The "thin route + page component" pattern (important)

Routes are split across two folders:

- [src/app/](src/app/) — Next.js App Router entries. Each `<route>/page.tsx` is a thin **server** component that exports `metadata` (or `generateMetadata`) and renders a single client component imported from `src/pages/`.
- [src/pages/](src/pages/) — the actual UI, each starting with `'use client'`. Holds all state, hooks, and JSX. These names match the legacy React Router page names.

Example: [src/app/quran/page.tsx](src/app/quran/page.tsx) just exports metadata + `<QuranReader />` from [src/pages/QuranReader.tsx](src/pages/QuranReader.tsx).

When adding a route: create `src/app/<segment>/page.tsx` for SEO/metadata + a client component in `src/pages/<Name>.tsx`. Dynamic segments use the `params: Promise<{ ... }>` shape and must be `await`ed (see [src/app/topics/[topicId]/page.tsx](src/app/topics/%5BtopicId%5D/page.tsx)).

Root layout is [src/app/layout.tsx](src/app/layout.tsx) — loads three Google fonts (`Plus_Jakarta_Sans` → `--font-sans`, `Noto_Naskh_Arabic` → `--font-arabic`, `Amiri` → `--font-amiri`) via `next/font` and wraps everything in [src/components/Providers.tsx](src/components/Providers.tsx) (`QueryClientProvider` + `TooltipProvider` + two toasters).

The visible chrome (Header/Footer) lives in [src/components/layout/Layout.tsx](src/components/layout/Layout.tsx) and is added **inside each `pages/*` component**, not in `app/layout.tsx`. So a new page must wrap its content in `<Layout>...</Layout>` itself.

### UI system

- shadcn/ui components in [src/components/ui/](src/components/ui/) (Radix primitives, ~50 files). Aliases configured in [components.json](components.json) — generate new ones with `bunx shadcn@latest add <name>`.
- Path alias `@/*` → `./src/*` (set in both [tsconfig.json](tsconfig.json) and [vitest.config.ts](vitest.config.ts)).
- Tailwind theme uses HSL CSS variables defined in [src/index.css](src/index.css) (light + `.dark`). Custom tokens beyond shadcn defaults: `surface`, `surface-contrast`, `warm`, `warm-glow`, `olive`, `hover`, `deep-accent`. Use `font-arabic` / `font-amiri` (or the `.arabic-text` utility, which also sets `direction: rtl`) for Arabic copy.
- Animations: Framer Motion for entrance effects; Tailwind keyframes `fade-in`, `fade-in-slow`, `slide-up`, `accordion-down/up`. Use `cn()` from [src/lib/utils.ts](src/lib/utils.ts) for class merging.

### Data

No backend — content is hardcoded TypeScript in [src/data/](src/data/) (`surahs.ts` lists all 114 surahs with metadata; `verses.ts` has sample verses). React Query is wired up via Providers but currently only for client state; treat the data files as the source of truth for now.

### Security headers

[next.config.ts](next.config.ts) sets `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, and `Permissions-Policy` (camera/mic/geo disabled) on every route. Don't strip these without reason.

## Migration leftovers — do not re-introduce

After the React Router → Next.js migration, two files still contain duplicated **dead code from the React Router version below their proper export**:

- [src/components/NavLink.tsx](src/components/NavLink.tsx) — second `const NavLink` block after line 37 references undefined `NavLinkProps`/`RouterNavLink`.
- [src/components/layout/Header.tsx](src/components/layout/Header.tsx) — stray `return (...)` and second `export default Header` after line 114.

If you edit these files, **delete the trailing duplicated block** rather than working around it. Anything imported from `react-router-dom` in `src/` is leftover and should be replaced with `next/link` + `usePathname()` (see how Header's top half does it).

## Conventions

- Two ESLint configs coexist: [.eslintrc.json](.eslintrc.json) (used by `next lint`) and [eslint.config.js](eslint.config.js) (flat config, not currently invoked by any script). Update `.eslintrc.json` if you want lint changes to take effect via `bun run lint`.
- TypeScript `strict: false` — don't rely on the type-checker to catch nullability or unused vars (`@typescript-eslint/no-unused-vars` is also off).
- Client interactivity → top-of-file `'use client'`. Server-only metadata exports must stay in `app/*/page.tsx`, never inside a `'use client'` file.
- Vitest setup at [src/test/setup.ts](src/test/setup.ts) registers `@testing-library/jest-dom` and a `matchMedia` shim. Tests are picked up from `src/**/*.{test,spec}.{ts,tsx}`.
