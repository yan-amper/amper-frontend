# amper-frontend

Frontend для Amper — интернет-магазина автозапчастей/аккумуляторов.

**Stack**: Next.js 16 (Turbopack) · React 19 · TypeScript · styled-components · Effector · Supabase

---

## Быстрый старт

```bash
# 1. Установить зависимости
pnpm install

# 2. Настроить переменные окружения
cp .env.example .env
# Заполнить .env (см. раздел ниже)

# 3. Запустить dev-сервер
pnpm dev        # http://localhost:3000
```

## Скрипты

| Команда | Описание |
|---------|---------|
| `pnpm dev` | Dev-сервер с Turbopack |
| `pnpm build` | Продакшн-сборка |
| `pnpm start` | Запуск продакшн-сборки |
| `pnpm lint` | ESLint |
| `pnpm format` | Prettier |

## Переменные окружения

| Переменная | Описание |
|-----------|---------|
| `NEXT_PUBLIC_API_URL` | URL бэкенда (HTTPS) |
| `NEXT_PUBLIC_PHONE_NUMBER` | Телефон магазина (цифры без +, напр. `79001234567`) |
| `NEXT_PUBLIC_SUPABASE_URL` | URL Supabase проекта |
| `NEXT_PUBLIC_SUPABASE_KEY` | Anon key Supabase |
| `TG_BOT_TOKEN` | Токен Telegram-бота |
| `MAX_BOT_TOKEN` | Токен Max-бота |
| `MAX_SUPABASE_URL` | Supabase URL для бота |
| `MAX_SUPABASE_KEY` | Supabase key для бота |
| `MAX_ADMIN_IDS` | ID администраторов через запятую |

## Архитектура

Проект построен по [Feature-Sliced Design (FSD)](https://feature-sliced.design/).

```
src/
  app/          # Next.js App Router — только тонкие обёртки страниц
  app-pages/    # Реальные компоненты страниц (home, catalog, login, admin, requests)
  entities/     # Доменные модели: products, banners, request, app
  features/     # Фичи: product-modal, request-modal, selection-modal, select, top-loader...
  shared/       # Переиспользуемая инфраструктура: api, clients, config, hooks, lib, styles
  widgets/      # Композитные блоки: header, footer
  middleware.ts
```

**Правило импортов**: верхние слои импортируют из нижних, не наоборот.  
`app-pages` → `entities` → `shared`

Каждый слайс экспортирует публичное API через свой `index.ts` — импортировать внутренние файлы напрямую нельзя.

## Стек подробнее

- **Стили** — styled-components с SSR-реестром. Стили живут в `styled.ts` рядом с компонентом, импортируются как `import * as S from "./styled"`.
- **Стейт** — Effector. Сторы в `model/store.ts`, хук `useUnit`.
- **HTTP** — Axios-клиент в `shared/clients/query.ts`. Голый `fetch` не используется.
- **БД** — Supabase (`shared/config/supabase.ts`).
- **Иконки** — lucide-react.
- **Боты** — Telegraf (Telegram) + @maxhub/max-bot-api (Max).

## Нюансы

- `.npmrc` содержит `node-linker=hoisted` — обязательно для корректной работы pnpm с Next.js.
- Алиас `@/` ведёт в `src/`.
- Если `pnpm dev` падает с `unable to acquire lock` — убить предыдущий процесс Node.js на порту 3000.
