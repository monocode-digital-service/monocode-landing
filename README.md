# monocode-landing

Site institucional da Monocode (monocode.com.br). Next.js 16, Tailwind v4 e shadcn/ui em monorepo pnpm, com deploy na Vercel.

Layout de referência: [Figma · Monocode, página "3. Site"](https://www.figma.com/design/oCXHJvibR4m9o9jwvip5LT/Monocode?node-id=118-471).

## Desenvolvimento

```bash
pnpm install
pnpm dev          # http://localhost:3001
pnpm check        # Biome (lint + format, aplica correções)
pnpm check-types
pnpm build
```

## Estrutura

```
apps/web/
├── public/brand/            # SVGs exportados do Figma (wordmark, hachuras, figuras, ícones)
└── src/
    ├── app/                 # layout (fontes, metadata) e página única
    ├── lib/site.ts          # WhatsApp, e-mail, links e dados da empresa
    └── components/
        ├── backgrounds/     # animações React Bits (Topography, DotField), vendorizadas
        ├── brand/           # peças de marca reutilizáveis (wordmark, rótulo de seção, tags, botão WhatsApp)
        ├── layout/          # header e footer
        └── sections/        # uma seção da página por arquivo
packages/ui/                 # primitivos shadcn compartilhados + tokens em src/styles/globals.css
```

## UI

- Tokens da paleta Signal Move ficam em `packages/ui/src/styles/globals.css` (`bg-lime`, `text-move`, `bg-soft`, etc.).
- Novos primitivos compartilhados: `pnpm dlx shadcn@latest add <componente> -c packages/ui`.
- Componentes React Bits: `pnpm dlx shadcn@latest add https://reactbits.dev/r/<Nome>-TS-TW` em `apps/web`, depois mover para `components/backgrounds/`.

## Variáveis de ambiente

Cada app declara seu schema em `.env.schema` (Varlock). Depois de alterar o schema, rode `pnpm env:generate` para regenerar `src/env.ts`.

## Deploy (Vercel)

- `pnpm deploy:setup`: vincular o projeto (primeira vez)
- `pnpm env:preview` / `pnpm env:production`: sincronizar `apps/web/.env` com a Vercel
- `pnpm deploy:check`: dry-run
- `pnpm deploy` / `pnpm deploy:prod`: preview / produção
