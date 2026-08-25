# AGENTS.md — amper-frontend

> Read this file first before making any changes. It covers everything an AI agent needs to know about this project.

## What is this?

**amper-frontend** — Next.js 16.1.0 (Turbopack) frontend for Amper, a battery/auto parts e-commerce shop. Includes Supabase backend integration and Telegram/Max messenger bot support.

## Project Structure

```
src/
  app/          # Next.js App Router: thin page wrappers only (no logic here)
  app-pages/    # Real page components: home, catalog, login, admin, requests
  entities/     # Domain: products, banners, request, app (store + types + api)
  features/     # UI feature units: product-modal, request-modal, selection-modal, select, top-loader, catalog-link, battery-selection-button, yandex-metrika
  shared/       # Shared infra:
    api/        #   base API helpers
    clients/    #   Axios instance (query.ts)
    config/     #   supabase.ts, variables.ts (env vars)
    constants/
    hooks/
    lib/        #   utilities + styled-components SSR registry
    styles/     #   global styles
    types/
  widgets/      # Composite blocks: header, footer
  middleware.ts # Next.js middleware
```

**Architecture**: [Feature-Sliced Design (FSD)](https://feature-sliced.design/).  
Import direction: `app-pages` → `entities` → `shared`. Upper layers never import from lower.  
Each slice exposes a public API via its `index.ts` — never deep-import internals.

## Stack

| Tool | Version | Notes |
|------|---------|-------|
| Next.js | 16.1.0 | App Router, Turbopack |
| React | 19.1.0 | |
| TypeScript | ^5 | |
| styled-components | ^6 | SSR via registry, babel plugin |
| Effector | ^23 | State management |
| Supabase | ^2 | DB + auth |
| Axios | ^1 | HTTP client in `shared/clients` |
| lucide-react | ^0 | Icons |
| Telegraf | ^4 | Telegram bot |
| @maxhub/max-bot-api | ^0.2 | Max messenger bot |
| pnpm | — | **Only** package manager |

## Path Alias

`@/` maps to `src/`. Always use `@/` for cross-layer imports.

## Environment Variables

Copy `.env.example` → `.env` and fill in:

```
NEXT_PUBLIC_API_URL=          # Backend base URL (HTTPS)
NEXT_PUBLIC_PHONE_NUMBER=     # Shop phone (digits only, e.g. 79001234567)
NEXT_PUBLIC_YANDEX_ID=        # Yandex.Metrika counter id
SUPABASE_URL=                 # server-only, no NEXT_PUBLIC_ prefix
SUPABASE_KEY=                 # server-only, no NEXT_PUBLIC_ prefix
ADMIN_LOGIN=                  # /admin credentials
ADMIN_PASSWORD=               # long and random: the login form is public
ADMIN_SESSION_SECRET=         # 32 random bytes (hex) — signs the admin cookie
TG_BOT_TOKEN=
MAX_BOT_TOKEN=
MAX_SUPABASE_URL=
MAX_SUPABASE_KEY=
MAX_ADMIN_IDS=                # Comma-separated admin IDs
```

## Dev Commands

```bash
pnpm dev      # Start dev server (port 3000, Turbopack)
pnpm build    # Production build
pnpm lint     # ESLint
pnpm format   # Prettier
```

If `pnpm dev` fails with "unable to acquire lock" — another instance is running. Kill it first.

## Coding Rules

1. **Styles**: `styled.ts` next to component, import as `import * as S from "./styled"`, never inline styles.
2. **State**: Effector stores in `model/store.ts`. Use `useUnit` hook.
3. **HTTP**: Always use Axios client from `@/shared/clients`, never raw `fetch`.
4. **Components**: Functional only. Named exports everywhere except Next.js `app/` pages.
5. **No `any`** without an explanatory comment.
6. **Slice public API**: only import from slice's `index.ts`, never `features/product-modal/styled`.

## Key Files

| File | Purpose |
|------|---------|
| `next.config.ts` | Next.js config (Turbopack root fix, styled-components, image domains) |
| `src/shared/config/variables.ts` | All env var exports |
| `src/shared/clients/query.ts` | Axios instance |
| `src/shared/lib/styled-components-registry.tsx` | SSR fix for styled-components |
| `src/middleware.ts` | Auth/routing middleware |
| `.env.example` | Env vars template |
| `.npmrc` | `node-linker=hoisted` — required for pnpm + Next.js compatibility |

## Common Gotchas

- `node-linker=hoisted` in `.npmrc` is intentional — pnpm's default symlink strategy breaks some Next.js internals.
- `turbopack.root` in `next.config.ts` is a fix for Windows path resolution when running Turbopack from a path with spaces.
- The `app/` layer only re-exports from `app-pages/` — put all real page logic in `app-pages/`.
