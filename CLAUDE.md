# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

pnpm monorepo for the Monocode marketing site (single page, pt-BR): `apps/web` (Next.js 16) plus a shared shadcn/ui package (`packages/ui`). No backend, database, auth, or API layer. Deployed to Vercel. Default branch is `main`.

Design source: Figma file `oCXHJvibR4m9o9jwvip5LT`, page "3. Site" (node `118:471`). Copy and brand rules come from `../monocode-brand/docs/` (`monocode-site.md`, `monocode-marca.md`). Copy rules: no em dash, no promises of deadline or result, no emoji.

**Next.js 16 has breaking changes vs. training data.** Before writing Next.js code, read the relevant guide in `apps/web/node_modules/next/dist/docs/` (see `apps/web/AGENTS.md`, which `next dev` regenerates).

## Commands

Run from repo root:

- `pnpm dev` / `pnpm dev:web` — dev server on http://localhost:3001
- `pnpm build` — build all workspaces
- `pnpm check-types` — `tsc --noEmit` in every workspace
- `pnpm check` — Biome lint + format, **writes fixes**
- `pnpm env:generate` — regenerate `apps/web/src/env.ts` after editing `apps/web/.env.schema` (also runs on `postinstall`)
- `pnpm deploy:check` / `pnpm deploy` / `pnpm deploy:prod` — Vercel dry-run / preview / production

No test framework is configured.

## Architecture

- **Page composition** — `apps/web/src/app/page.tsx` stacks one component per section from `components/sections/`. Shared brand pieces live in `components/brand/`, header/footer in `components/layout/`. Contact data (WhatsApp, email, LinkedIn, CNPJ) is centralized in `src/lib/site.ts`; every CTA uses `WhatsAppButton`.
- **Backgrounds** — `components/backgrounds/` holds vendored React Bits components (Topography in the hero via `ogl`/WebGL, DotField in "Como trabalhamos", PixelBlast in the closing block via `three`). Biome linting is disabled for that folder (`biome.json` override); keep upstream code as-is.
- **Static assets** — SVGs exported from Figma live in `apps/web/public/brand/`; isometric illustrations (generated with Codex image generation, converted to WebP) live in `apps/web/public/illustrations/`. Both render via `next/image` (`public/` is excluded from Biome). Section labels are terminal paths (`SectionLabel path='...'`), framed panels use `CornerFrame`.
- **`packages/ui`** (`@monocode-landing/ui`) — shadcn primitives exported as source (no build step): `@monocode-landing/ui/components/<name>`, `/lib/utils`, `/globals.css`. `apps/web/tsconfig.json` maps these paths to `packages/ui/src`. `Button` has extra `pill` / `pill-lg` sizes for the site CTAs.
- **shadcn style is `base-lyra`** — components are built on `@base-ui/react`, not Radix (use `render={<a … />}` + `nativeButton={false}` for link buttons). Add shared primitives with `pnpm dlx shadcn@latest add <name> -c packages/ui`.
- **Styling** — Tailwind v4 (CSS-first). Brand palette tokens (`lime`, `move`, `move-deep`, `soft`, `orange`, `mint`, `peach`, `ice-soft`, `sage`, `line`) and shadcn variables are in `packages/ui/src/styles/globals.css`. Light theme only; `.dark` is never applied. Fonts: Manrope (`font-sans`) and Geist Mono (`font-mono`) via `next/font` in `layout.tsx`.
- **Env vars** — managed by Varlock. Declare in `apps/web/.env.schema`, regenerate, then import `ENV` from `@/env`. `src/env.ts` is generated; never edit it.
- **Dependency versions** — shared deps are pinned in the `catalog:` of `pnpm-workspace.yaml`; use `catalog:` when adding one of them.

## Code Style (Biome)

Tabs, single quotes (including JSX attributes), no semicolons, `as-needed` arrow parens, ES5 trailing commas. Tailwind classes inside `cn`/`cva`/`clsx` are auto-sorted (`useSortedClasses`).
