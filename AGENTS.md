# AGENTS.md — amper-frontend

> Прочитай этот файл целиком до первой правки. Здесь то, что нельзя вывести из кода за пять минут: инварианты безопасности, реальные границы слоёв и грабли, на которые уже наступали.

## Что это

**amper-frontend** — Next.js 16 (App Router, Turbopack) фронтенд аккумуляторного центра «АМПЕР» (Таганрог). Каталог товаров, форма подбора АКБ и админка заявок.

Три внешние системы:

| Система | Роль | Доступ |
|---|---|---|
| Laravel-бэкенд (`NEXT_PUBLIC_API_URL`) | каталог товаров, картинки | публичный REST, только чтение |
| Supabase | таблица `battery_requests` — заявки клиентов | anon-ключ, **серверный** |
| Telegram + Max боты | приём заявок и ответы клиентам | токены, **серверные** |

---

## Инварианты безопасности

Это не стиль, а то, что ломает прод или сливает данные. Нарушать нельзя.

### 1. Секрет никогда не получает префикс `NEXT_PUBLIC_`

`NEXT_PUBLIC_` означает «положи в браузерный бандл». Ключи Supabase, токены ботов и учётка админа этого префикса иметь не должны — **однажды они его уже имели**, и anon-ключ Supabase лежал в публичной сборке (исправлено в `4c54a17`).

- Публичные переменные — только в `src/shared/config/variables.ts`.
- Секреты — только в `src/shared/server/`, и этот модуль открывается импортом `server-only`. Если его случайно потянут в компонент с `"use client"`, сборка упадёт с внятной ошибкой вместо тихой утечки. Не убирай `import "server-only"`.

### 2. Каждый server action, трогающий заявки или ботов, начинается с `hasAdminSession()`

Server actions — **публичные HTTP-эндпоинты**. Их дёргают напрямую, минуя интерфейс. Без проверки через `sendProductsAction` можно было бы рассылать сообщения клиентам магазина от имени бота.

```ts
export const someAdminAction = async (...) => {
  if (!(await hasAdminSession())) return { ok: false, message: "Нет доступа" };
  // ...
};
```

Исключение ровно одно и осознанное: `features/selection-modal/actions.ts::submitForm` — это форма для посетителей сайта, она обязана работать без логина. Но у неё **нет ни валидации, ни рейт-лимита**, см. «Известные дыры».

### 3. Аутентификация админки

Пароль уходит на сервер один раз — в `loginAction`. Дальше доступ подтверждает подписанная HMAC-кука.

- `src/shared/server/session-token.ts` — подпись и проверка. **Не импортирует** ни `server-only`, ни `next/headers`: его тянет middleware, а тот живёт в Edge-рантайме, куда это не проходит. Криптография через `crypto.subtle`, не `node:crypto`, по той же причине.
- Ключ подписи = `ADMIN_SESSION_SECRET` + `ADMIN_PASSWORD`. Смена пароля мгновенно обнуляет все выданные куки — кнопки «выйти» в интерфейсе нет, это единственный способ разлогинить всех.
- Срок годности лежит **внутри** подписанного payload, а не только в атрибутах куки: подкрутить дату в браузере и продлить доступ нельзя.
- `middleware.ts` продлевает только уже валидную куку. Выдача — исключительно в `loginAction`, после сверки пароля.

### 4. Страница `/admin` ничего не грузит до проверки куки

`src/app/admin/page.tsx` — пустая обёртка. Любой запрос к Supabase на этом уровне попал бы в HTML **до** проверки пароля. Данные приходят из `loadAdminData()`, которая вызывается только после `hasAdminSession()` в `app-pages/admin/index.tsx`.

Ровно так эта дыра и была: заявки уезжали в разметку `/admin` любому посетителю.

### 5. Данные из чужой базы экранируются перед вставкой в разметку

Названия товаров приходят с Laravel-бэкенда, и в JSON-LD на `src/app/product/[slug]/page.tsx` они попадают через `dangerouslySetInnerHTML`. Замена — на строку из **шести символов** `<`, то есть в исходнике это `"\\u003c"` с двумя слэшами.

С одним слэшем `"<"` — это сам символ `<`, и замена `<` на `<` не экранирует ничего. Такой баг там уже жил.

---

## Структура

```
src/
  app/                    # App Router: тонкие обёртки, логики нет
    admin/                #   /admin — noindex, force-dynamic
    catalog/              #   /catalog
    product/[slug]/       #   /product/<id>-<слаг> + JSON-LD
    _privacy/             #   ОТКЛЮЧЕНА: подчёркивание = приватная папка Next,
                          #   маршрута /privacy не существует (см. шапку файла)
    robots.ts             #   запрещает /admin
    sitemap.ts            #   строится из живого каталога, force-dynamic
    layout.tsx  not-found.tsx  favicon.ico
  app-pages/              # Настоящие компоненты страниц
    home/ catalog/ product/ login/ admin/ requests/ privacy/ not-found/
  entities/               # Домен: products, banners, request, app
  features/               # product-modal, request-modal, selection-modal,
                          # select, top-loader, yandex-metrika,
                          # battery-selection-button
  shared/
    api/                  #   axios-инстанс $api  ← НЕ clients/
    clients/query.ts      #   класс Query: чтение/запись searchParams. Не HTTP!
    config/variables.ts   #   ТОЛЬКО публичные переменные
    server/               #   СЕКРЕТЫ: supabase-клиент, verifyAdmin, сессия
    constants/ hooks/ lib/ styles/ types/ ui/
  widgets/                # header, footer
  middleware.ts
```

**Архитектура** — [FSD](https://feature-sliced.design/). Импорты идут сверху вниз: `app` → `app-pages` → `features`/`widgets` → `entities` → `shared`. Обратно — никогда.

Каждый слайс отдаёт публичное API через `index.ts`. Глубокий импорт внутренностей запрещён, **кроме двух осознанных случаев**:

- `middleware.ts` тянет `@/shared/server/session-token` напрямую — бочонок `@/shared/server` потащил бы в Edge клиент Supabase и `next/headers`;
- `next.config.ts` тянет `@/shared/config/variables` — конфиг компилируется отдельным проходом в CJS и не резолвит `.tsx` из `shared/ui`.

Оба места прокомментированы в коде. Не «чини» их.

---

## Стек

| Инструмент | Версия | Заметки |
|---|---|---|
| Next.js | 16.1.0 | App Router, Turbopack |
| React | 19.1.0 | |
| TypeScript | ^5 | |
| styled-components | ^6 | SSR-реестр в `shared/lib/styled-components-registry.tsx` |
| Effector | ^23 | `useUnit`, сторы в `model/store.ts` |
| Supabase | ^2 | только сервер + вебсокет в админке |
| axios | ^1 | `$api` в `shared/api` |
| lucide-react | ^0 | иконки |
| @maxhub/max-bot-api | ^0.2 | бот Max |
| telegraf | ^4 | в зависимостях; Telegram зовётся голым `fetch`, см. ниже |
| pnpm | — | **единственный** пакетный менеджер |

---

## Переменные окружения

`cp .env.example .env` и заполнить. Полный список с пояснениями — в `.env.example`.

```
# публичные (уходят в браузер)
NEXT_PUBLIC_SITE_URL          # канонический домен, без слэша на конце
NEXT_PUBLIC_API_URL           # Laravel-бэкенд, HTTPS
NEXT_PUBLIC_PHONE_NUMBER      # только цифры: 79001234567
NEXT_PUBLIC_YANDEX_ID         # счётчик Яндекс.Метрики

# серверные — префикса NEXT_PUBLIC_ быть не должно
SUPABASE_URL  SUPABASE_KEY
ADMIN_LOGIN  ADMIN_PASSWORD   # форма логина публичная: пароль длинный и случайный
ADMIN_SESSION_SECRET          # 32 случайных байта hex, подписывает куку
TG_BOT_TOKEN  MAX_BOT_TOKEN
MAX_SUPABASE_URL  MAX_SUPABASE_KEY
MAX_ADMIN_IDS                 # id админов через запятую
```

`NEXT_PUBLIC_SUPABASE_URL` и `NEXT_PUBLIC_SUPABASE_KEY` **больше не существуют**. Если встретишь их в коде, документации или чьём-то PR — это возврат утечки, а не забытая переменная.

---

## Команды

```bash
pnpm dev      # dev-сервер, порт 3000, Turbopack
pnpm build    # прод-сборка
pnpm start    # запуск прод-сборки
pnpm lint     # ESLint
pnpm format   # Prettier
```

`pnpm dev` падает с «unable to acquire lock» — не убит прошлый инстанс.

---

## Правила кода

1. **Стили** — `styled.ts` рядом с компонентом, импорт `import * as S from "./styled"`. Инлайновых стилей нет.
2. **Стейт** — Effector, сторы в `model/store.ts`, хук `useUnit`.
3. **HTTP к бэкенду каталога** — только `$api` из `@/shared`. Голый `fetch` к Laravel не пиши.
   Исключение: `features/request-modal/actions.ts` шлёт в Telegram Bot API голым `fetch` сознательно — telegraf на серверных экшенах Next тянул лишнее.
4. **Компоненты** — только функциональные. Именованные экспорты везде, кроме страниц в `app/`.
5. **`any`** — только с комментарием, объясняющим почему.
6. Комментарии в проекте отвечают на «почему», а не «что». Держи ту же планку: не описывай очевидное, но фиксируй причину неочевидного решения.

---

## Известные дыры (не «почини мимоходом», это отдельная работа)

| Что | Где | Суть |
|---|---|---|
| RLS на `battery_requests` открыт | Supabase, не код | anon-ключ читает все заявки клиентов. Ключ когда-то был в публичном бандле. Нужны RLS-политики. |
| `submitForm` без ограничений | `features/selection-modal/actions.ts` | нет рейт-лимита, нет валидации на сервере, и `...formData` льётся в insert как есть — можно проставить любую колонку (`status`, `admin_picked`, `tg_user_id`). |
| Нет security-заголовков | `next.config.ts` | ни CSP, ни X-Frame-Options, ни HSTS. `/admin` кликджекается. |
| Сравнение пароля не константное | `shared/server/index.ts::verifyAdmin` | обычный `===`. |
| Мёртвый код | `entities/products/model/store.ts::editProductFx` | клиентский POST, правящий товар на бэкенде. Нигде не вызывается. Если бэкенд его не закрывает авторизацией — это дыра в бэкенде. |

---

## Грабли

- `node-linker=hoisted` в `.npmrc` обязателен: симлинки pnpm ломают внутренности Next.
- `turbopack.root` в `next.config.ts` — лечит резолв путей на Windows, когда проект лежит в папке с пробелом в имени.
- Шрифт `Inter` подключён с сабсетами `["latin", "cyrillic"]`. Убрать `cyrillic` — русский текст уедет в системный фолбэк, и в одном заголовке окажется два разных шрифта.
- Бэкенд на `/products/<id>` отдаёт объект **без** обёртки `{ data }`, в отличие от списочного `/products`. Несуществующий id возвращает 200 с пустым телом, а не 404 — пустоту ловим руками в `ProductsApi.getProductById`.
- Слой `app/` только реэкспортирует из `app-pages/`. Логика страниц туда не переезжает.
- Мёртвые файлы, которые можно удалить: `shared/lib/route-loader.ts` и `shared/lib/plural.ts` — экспорты нигде не используются.
