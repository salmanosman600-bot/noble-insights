# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Noor — Noble Quran**: a Next.js 15 (App Router) + React 18 reading experience for the Quran with translations, tafsir, audio, topics, and articles. Originally scaffolded by Lovable; migrated from React Router to Next.js routing (commit `f15a099`). Both `bun` and `npm` work — a `bun.lockb` and `package-lock.json` both exist.

The codebase is **mid-migration** from a flat `src/pages/*` shape to the feature-based architecture documented in [docs/architecture.md](docs/architecture.md). The first slice — the **`quran` feature** — is already migrated and integrates the live [quranenc.com API](https://quranenc.com/en/home/api/). Everything else is still legacy. New work in the `quran` feature MUST follow the architecture doc; new work elsewhere should match its surrounding files until that feature gets migrated.

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

The project has **two coexisting shapes** during the migration. Pick the one that matches the file you're touching:

### A. Legacy "thin route + page component" pattern (most of the app)

Everything except `/quran` still uses this:

- [src/app/](src/app/) — Next.js App Router entries. Each `<route>/page.tsx` is a thin server component that exports `metadata` and renders a single client component imported from `src/pages/`.
- [src/pages/](src/pages/) — the actual UI, each starting with `'use client'`. Holds all state, hooks, and JSX. Names match the legacy React Router page names.

Example: [src/app/surahs/page.tsx](src/app/surahs/page.tsx) renders [src/pages/SurahIndex.tsx](src/pages/SurahIndex.tsx). Dynamic segments use `params: Promise<{ ... }>` and must be `await`ed (see [src/app/topics/[topicId]/page.tsx](src/app/topics/%5BtopicId%5D/page.tsx)).

> ⚠️ **Pages Router pollution.** Because `src/pages/` happens to be the Next.js Pages Router convention name, every file there is *also* auto-exposed as a route at its filename: `/Articles`, `/Audio`, `/Dashboard`, `/Index`, `/SurahIndex`, etc. (case-sensitive). See the build output's "Route (pages)" section. The proper App Router routes (`/articles`, `/audio`, `/dashboard`) work correctly; the duplicates are a side effect. Permanent fix: rename `src/pages/` → `src/page-components/` (or migrate each file into a feature, like `quran` already is). Adding new files to `src/pages/` keeps adding to the pollution.

### B. Feature-based pattern (the `quran` slice and any new features)

The `quran` feature lives at [src/features/quran/](src/features/quran/) and is the model for future migrations. It currently owns both reading (`/quran`) and the surah index (`/surahs`):

```
src/features/quran/
├── components/
│   ├── quran-reader.tsx          # 'use client' — /quran reader UI
│   └── surah-index.tsx           # 'use client' — /surahs grid w/ search, filter, sort
├── data/
│   └── surahs.ts                 # canonical 114-surah metadata; old src/data/surahs.ts is a re-export shim
├── hooks/use-sura-translation.ts # TanStack Query wrapper
├── services/quran.service.ts     # API calls via shared apiClient
├── store/script.store.ts         # Zustand store for global Cyrillic↔Latin preference (persisted)
├── utils/transliterate.ts        # Cyrillic → Latin Uzbek
└── types.ts                      # Aya, SuraResponse, Script, DEFAULT_TRANSLATION_KEY
```

Cross-feature primitives live under [src/shared/](src/shared/):

- [src/shared/lib/api-client.ts](src/shared/lib/api-client.ts) — typed `fetch` wrapper. **The only place `fetch` is allowed.** Pass `baseUrl` to override; default is `env.NEXT_PUBLIC_QURANENC_API_URL`.
- [src/shared/lib/query-client.ts](src/shared/lib/query-client.ts) — SSR-safe `getQueryClient()` (per-request on server, singleton in browser).
- [src/shared/lib/cn.ts](src/shared/lib/cn.ts) — re-exports `cn` from `src/lib/utils.ts` (compat shim during migration).
- [src/shared/components/providers.tsx](src/shared/components/providers.tsx) — `QueryClientProvider` + `TooltipProvider` + toasters; mounted at the root layout.
- [src/shared/constants/query-keys.ts](src/shared/constants/query-keys.ts) — every TanStack Query key. **Never inline a query-key string.**

Config / env:

- [src/config/env.ts](src/config/env.ts) — Zod-validated env, throws at boot if invalid.
- [src/config/routes.ts](src/config/routes.ts) — internal routes + external `apiRoutes.quranenc.*`. **Never hardcode a path string.**

### Quran data flow (worth understanding)

`quranenc.com` API has CORS `*`, so the browser hits it directly — there's no server-side proxy:

```
QuranReader (client)
  → useSuraTranslation()        [hooks]
  → quranService.sura()         [features/quran/services]
  → apiClient.get()             [shared/lib]
  → fetch('https://quranenc.com/api/v1/translation/sura/uzbek_moyassar/{n}')
```

Default translation: `uzbek_moyassar` (At-Tafsir Al-Muyassar in Uzbek Cyrillic). Other available Uzbek keys: `uzbek_rwwad`, `uzbek_mansour`. The script toggle in the global Header writes to [src/features/quran/store/script.store.ts](src/features/quran/store/script.store.ts) (Zustand + `persist` to localStorage); the reader subscribes via `useScriptStore((s) => s.script)` and runs Cyrillic→Latin transliteration client-side via [src/features/quran/utils/transliterate.ts](src/features/quran/utils/transliterate.ts) — no second fetch. **Attribution to QuranEnc.com is required** by their terms and is rendered at the bottom of the reader; don't remove it.

**Known minor:** the script toggle's first paint may briefly show "Кир" then snap to "Lot" if a user previously selected Latin. That's Zustand persist hydrating from localStorage after mount. Acceptable for now; if it becomes annoying, gate the button text on a `mounted` flag set in `useEffect`, or use `useScriptStore.persist.hasHydrated()`.

### Root layout & chrome

Root layout is [src/app/layout.tsx](src/app/layout.tsx) — loads three Google fonts (`Plus_Jakarta_Sans` → `--font-sans`, `Noto_Naskh_Arabic` → `--font-arabic`, `Amiri` → `--font-amiri`) via `next/font` and wraps everything in [src/shared/components/providers.tsx](src/shared/components/providers.tsx).

The visible chrome (Header/Footer) lives in [src/components/layout/Layout.tsx](src/components/layout/Layout.tsx) and is added **inside each page component** (whether legacy `src/pages/*` or new feature components like `quran-reader.tsx`), not in `app/layout.tsx`. New pages must wrap their content in `<Layout>...</Layout>` themselves.

### UI system

- shadcn/ui components in [src/components/ui/](src/components/ui/) (Radix primitives, ~50 files). Aliases configured in [components.json](components.json) — generate new ones with `bunx shadcn@latest add <name>`.
- Path alias `@/*` → `./src/*`.
- Tailwind theme uses HSL CSS variables defined in [src/index.css](src/index.css) (light + `.dark`). Custom tokens beyond shadcn defaults: `surface`, `surface-contrast`, `warm`, `warm-glow`, `olive`, `hover`, `deep-accent`. Use `font-arabic` / `font-amiri` (or the `.arabic-text` utility, which sets `direction: rtl`) for Arabic copy.
- Animations: Framer Motion for entrance effects; Tailwind keyframes `fade-in`, `fade-in-slow`, `slide-up`, `accordion-down/up`. Use `cn()` from [src/lib/utils.ts](src/lib/utils.ts) (or the shared re-export) for class merging.

### Security headers

[next.config.ts](next.config.ts) sets `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, and `Permissions-Policy` (camera/mic/geo disabled) on every route. Don't strip these without reason.

## Conventions

- **In the `quran` feature, follow [docs/architecture.md](docs/architecture.md) strictly:** no raw `fetch`, no inline query keys, no hardcoded routes, no business logic in `src/app/*/page.tsx`. Routes that hit the quranenc API need a `<Suspense>` wrapper around the client component if it calls `useSearchParams()` (see [src/app/quran/page.tsx](src/app/quran/page.tsx)) — otherwise prerender fails.
- **Use `<Link href="...">` from `next/link`** — never `<Link to="...">`. Don't import from `react-router-dom`; use `usePathname()` and `useRouter()` from `next/navigation`.
- **PostCSS config is `.mjs`** ([postcss.config.mjs](postcss.config.mjs)) because the file uses `export default` but `package.json` doesn't set `"type": "module"`. If you rename it back to `.js`, switch to `module.exports = { ... }` syntax or Tailwind processing breaks.
- **TypeScript** is `strict: false` but Next.js auto-added `strictNullChecks: true` to [tsconfig.json](tsconfig.json). `target` is `ES2017`. `@typescript-eslint/no-unused-vars` is off.
- **Client interactivity → top-of-file `'use client'`**. Server-only `metadata` exports must stay in `app/*/page.tsx`, never inside a `'use client'` file.
- **Single ESLint config**: only [.eslintrc.json](.eslintrc.json), used by `next lint`. The previous `eslint.config.js` was deleted because it referenced uninstalled packages.
- **Vitest setup** at [src/test/setup.ts](src/test/setup.ts) registers `@testing-library/jest-dom` and a `matchMedia` shim. Tests are picked up from `src/**/*.{test,spec}.{ts,tsx}` — but install `@vitejs/plugin-react-swc` first, or rewrite the config to use `@vitejs/plugin-react`.
