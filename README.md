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

Префикс `NEXT_PUBLIC_` означает «положить в браузерный бандл». Всё, что ниже отмечено как серверное, этот префикс получать не должно — иначе ключ уедет в публичную сборку.

**Публичные:**

| Переменная | Описание |
|-----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Канонический домен сайта, без слэша на конце |
| `NEXT_PUBLIC_API_URL` | URL бэкенда (HTTPS) |
| `NEXT_PUBLIC_PHONE_NUMBER` | Телефон магазина (цифры без +, напр. `79001234567`) |
| `NEXT_PUBLIC_YANDEX_ID` | Счётчик Яндекс.Метрики |

**Серверные** (в браузер не попадают):

| Переменная | Описание |
|-----------|---------|
| `SUPABASE_URL` | URL Supabase проекта |
| `SUPABASE_KEY` | Ключ Supabase |
| `ADMIN_LOGIN` | Логин админки `/admin` |
| `ADMIN_PASSWORD` | Пароль админки — длинный и случайный: форма логина публичная |
| `ADMIN_SESSION_SECRET` | 32 случайных байта hex, подписывают куку админки |
| `TG_BOT_TOKEN` | Токен Telegram-бота |
| `MAX_BOT_TOKEN` | Токен Max-бота |
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
- **HTTP** — Axios-инстанс `$api` в `shared/api`. (`shared/clients/query.ts` — это не HTTP, а хелпер для чтения и записи searchParams.)
- **БД** — Supabase. Клиент и вся работа с секретами — в `shared/server/`, модуль закрыт импортом `server-only` и в браузер не попадает.
- **Админка** — вход по `ADMIN_LOGIN`/`ADMIN_PASSWORD`, дальше подписанная HMAC-кука; см. `shared/server/session-token.ts`.
- **Иконки** — lucide-react.
- **Боты** — Telegraf (Telegram) + @maxhub/max-bot-api (Max).

## Нюансы

- `.npmrc` содержит `node-linker=hoisted` — обязательно для корректной работы pnpm с Next.js.
- Алиас `@/` ведёт в `src/`.
- Если `pnpm dev` падает с `unable to acquire lock` — убить предыдущий процесс Node.js на порту 3000.
