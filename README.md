# monocode-landing

Site institucional da Monocode ([monocode.com.br](https://www.monocode.com.br)): uma página inicial e duas páginas legais, em pt-BR. Next.js 16, Tailwind v4 e shadcn/ui em monorepo pnpm, com deploy na Vercel.

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
├── public/
│   ├── brand/               # SVGs exportados do Figma (wordmark, ícones)
│   └── team/                # foto do fundador (WebP no tamanho final)
└── src/
    ├── app/
    │   ├── page.tsx                  # página inicial (uma seção por componente) + JSON-LD
    │   ├── layout.tsx                # fontes e metadata (title, description, Open Graph)
    │   ├── politica-de-privacidade/  # página legal
    │   ├── termos-de-uso/            # página legal
    │   ├── robots.ts, sitemap.ts     # arquivos de SEO gerados pelo Next
    │   └── opengraph-image.png       # imagem de compartilhamento (1200x630)
    ├── lib/
    │   ├── site.ts          # URL, título, descrição, WhatsApp, e-mail, links e dados da empresa
    │   ├── projects.ts      # cases da seção Projetos
    │   └── json-ld.ts       # dados estruturados (schema.org)
    └── components/
        ├── backgrounds/     # animações React Bits (Topography, DotField), vendorizadas
        ├── brand/           # peças de marca (wordmark, rótulo de seção, tags, botão WhatsApp, ondas)
        ├── hairline/        # figuras isométricas animadas (geradas a partir de design/hairline)
        ├── layout/          # header, footer, menu do celular, página legal, scroll suave
        └── sections/        # uma seção da página por arquivo
design/
├── hairline/                # fontes das figuras e scripts de exportação
└── og/og.html               # fonte da imagem de compartilhamento
packages/ui/                 # primitivos shadcn compartilhados + tokens em src/styles/globals.css
```

## Conteúdo

O texto do site segue os documentos de marca em `../monocode-brand/docs/` (`monocode-site.md` e `monocode-marca.md`). Ao mudar um texto no site, mude também no documento. Regras: sem travessão, sem promessa de prazo ou resultado, sem emoji.

- Textos das seções: `apps/web/src/components/sections/*.tsx`.
- Case de Projetos: `apps/web/src/lib/projects.ts`.
- Contato, CNPJ e links: `apps/web/src/lib/site.ts`.
- Política de privacidade e termos de uso: `apps/web/src/app/politica-de-privacidade/page.tsx` e `apps/web/src/app/termos-de-uso/page.tsx`. Atualize a data no topo quando mudar o texto.

## SEO

- Título e descrição da página: `site.title` e `site.description` em `apps/web/src/lib/site.ts`. Palavra-chave principal: "agentes de IA para empresas", com São Paulo.
- `robots.txt` e `sitemap.xml` são gerados por `app/robots.ts` e `app/sitemap.ts`. Uma rota nova precisa entrar no sitemap.
- Dados estruturados (empresa, site, fundador, projetos): `apps/web/src/lib/json-ld.ts`. Validar em [Rich Results Test](https://search.google.com/test/rich-results).
- Imagem de compartilhamento: edite `design/og/og.html` e gere de novo o PNG (comando no `CLAUDE.md`).
- Acompanhamento: Google Search Console (consultas e indexação) e PageSpeed Insights (velocidade no celular).

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
