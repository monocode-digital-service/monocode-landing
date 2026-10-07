# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

pnpm monorepo for the Monocode marketing site (one landing page plus two legal pages, pt-BR): `apps/web` (Next.js 16) plus a shared shadcn/ui package (`packages/ui`). No backend, database, auth, or API layer. Deployed to Vercel. Default branch is `main`.

Design source: Figma file `oCXHJvibR4m9o9jwvip5LT`, page "3. Site" (node `118:471`). Copy and brand rules come from `../monocode-brand/docs/` (`monocode-site.md`, `monocode-marca.md`). Copy rules: no em dash, no promises of deadline or result, no emoji, no IoT in public messaging, and "automação" (runs on a rule the team defined) is never mixed with "agente" (reads context and decides). Don't repeat "a Monocode" in every sentence. Site copy and `../monocode-brand/docs/monocode-site.md` change together (that folder is not a git repo).

**Next.js 16 has breaking changes vs. training data.** Before writing Next.js code, read the relevant guide in `apps/web/node_modules/next/dist/docs/` (see `apps/web/AGENTS.md`, which `next dev` regenerates).

## Commands

Run from repo root:

- `pnpm dev` / `pnpm dev:web` — dev server on http://localhost:3001
- `pnpm build` — build all workspaces
- `pnpm check-types` — `tsc --noEmit` in every workspace
- `pnpm check` — Biome lint + format, **writes fixes**
- `pnpm env:generate` — regenerate `apps/web/src/env.ts` after editing `apps/web/.env.schema` (also runs on `postinstall`)
- `pnpm deploy:check` / `pnpm deploy` / `pnpm deploy:prod` — Vercel dry-run / preview / production

- OG image: `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars --window-size=1200,630 --virtual-time-budget=5000 --screenshot=apps/web/src/app/opengraph-image.png "file://$PWD/design/og/og.html"` after editing `design/og/og.html`
- `pnpm --filter web exec next typegen` — regenerate typed routes after adding a route (`typedRoutes` is on; `next dev` and `next build` also do it)

No test framework is configured.

## Architecture

- **Page composition** — `apps/web/src/app/page.tsx` stacks one component per section from `components/sections/`. Shared brand pieces live in `components/brand/`, header/footer in `components/layout/`. Contact data (WhatsApp, email, LinkedIn, CNPJ) is centralized in `src/lib/site.ts`; every CTA uses `WhatsAppButton`.
- **Backgrounds** — `components/backgrounds/` holds the vendored React Bits Topography (hero, via `ogl`/WebGL); the closing block uses the static `bg-hatch-lime` utility instead of a canvas. Biome linting is disabled for that folder (`biome.json` override); keep upstream code as-is, except the marked Topography aspect fix.
- **Hairline figures** — the animated isometric illustrations in Soluções and Como trabalhamos. Sources live in `design/hairline/*.js` (format of the `hairline-create` skill: build, validate and look there). `node design/hairline/export.mjs` copies the kernel and figures as ES modules into `apps/web/src/components/hairline/figures/` (generated, excluded from Biome); `HairlineFigure` mounts one with a `light` or `dark` palette set through the `--hairline-*` CSS variables. `node design/hairline/preview.mjs <figs> "<preset>" <out>.html` builds a palette/stroke preview page.
- **Motion** — entrance animations are GSAP (`gsap`, `@gsap/react`; ScrollTrigger, SplitText and DrawSVG are free since 3.13) wired by data attributes, all handled in `components/layout/site-motion.tsx` (mounted once in `layout.tsx`): `data-reveal="lines"` (title lines rise behind a mask), `"up"`, `"scale"`, `"wipe"` (photo), `"draw"` (inline SVG stroke, see `brand/wordmark-outline.tsx`) and `data-parallax`. `globals.css` hides `[data-reveal]` only under `html.js` (set by the inline script in `layout.tsx`) and keeps everything visible under `prefers-reduced-motion`. Animate only opacity, transform and clip-path; every reveal runs once. To animate a new element, add the attribute; sections stay Server Components.
- **Scroll and waves** — Lenis smooth scroll is mounted in `layout.tsx` (`components/layout/smooth-scroll.tsx`; menu anchors use an eased duration). Dark blocks bend their edges with scroll velocity via `components/brand/wave-background.tsx` (`WaveBackground` layer, `WaveBottomEdge` for the hero, size from the `--bend` CSS var). Both are off under `prefers-reduced-motion`.
- **SEO** — `site.url`, `site.title` and `site.description` in `src/lib/site.ts` feed the root `metadata` (canonical, Open Graph), `app/robots.ts`, `app/sitemap.ts` and the JSON-LD graph in `src/lib/json-ld.ts` (Organization, WebSite, founder, projects), rendered by `page.tsx`. The canonical host is `https://www.monocode.com.br`. The primary keyword is "agentes de IA para empresas" with the São Paulo modifier; the H1 stays the brand headline. `app/opengraph-image.png` is a screenshot of `design/og/og.html` (see OG image below). A new route needs an entry in `sitemap.ts` and its own `alternates.canonical`. `public/llms.txt` is a hand-written summary of the site for AI crawlers: update it when services, the project or contact data change.
- **Legal pages** — `/politica-de-privacidade` and `/termos-de-uso` use `components/layout/legal-page.tsx` (header band, prose, footer). Routes are listed in `legalLinks` (`site.ts`), which feeds the footer and the sitemap. Update the `updated` date when the text changes. Menu anchors are `/#section` so they work from these pages.
- **Images** — `images.unoptimized` is on in `next.config.ts`: `/_next/image` returns 404 under the Vercel `services` deploy. Add raster images already sized and in WebP.
- **Projects** — the Projetos section is data-driven from `src/lib/projects.ts` (media: `image`, `video` or `flow`); the gallery arrows and the list of other projects appear only when there is more than one item.
- **Static assets** — SVGs exported from Figma live in `apps/web/public/brand/` and render via `next/image` (`public/` is excluded from Biome). Section labels are terminal paths (`SectionLabel path='...'`), framed panels use `CornerFrame`, light panels can use the `bg-hatch` utility.
- **`packages/ui`** (`@monocode-landing/ui`) — shadcn primitives exported as source (no build step): `@monocode-landing/ui/components/<name>`, `/lib/utils`, `/globals.css`. `apps/web/tsconfig.json` maps these paths to `packages/ui/src`. `Button` has extra `pill` / `pill-lg` sizes for the site CTAs.
- **shadcn style is `base-lyra`** — components are built on `@base-ui/react`, not Radix (use `render={<a … />}` + `nativeButton={false}` for link buttons). Add shared primitives with `pnpm dlx shadcn@latest add <name> -c packages/ui`.
- **Styling** — Tailwind v4 (CSS-first). Brand palette tokens (`lime`, `move`, `move-deep`, `soft`, `orange`, `mint`, `peach`, `ice-soft`, `sage`, `line`) and shadcn variables are in `packages/ui/src/styles/globals.css`. Light theme only; `.dark` is never applied. Fonts: Manrope (`font-sans`) and Geist Mono (`font-mono`) via `next/font` in `layout.tsx`.
- **Env vars** — managed by Varlock. Declare in `apps/web/.env.schema`, regenerate, then import `ENV` from `@/env`. `src/env.ts` is generated; never edit it.
- **Dependency versions** — shared deps are pinned in the `catalog:` of `pnpm-workspace.yaml`; use `catalog:` when adding one of them.

## Code Style (Biome)

Tabs, single quotes (including JSX attributes), no semicolons, `as-needed` arrow parens, ES5 trailing commas. Tailwind classes inside `cn`/`cva`/`clsx` are auto-sorted (`useSortedClasses`).
