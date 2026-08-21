/**
 * СТРАНИЦА ВРЕМЕННО ОТКЛЮЧЕНА.
 *
 * Папка называется `_privacy` с нижним подчёркиванием — в App Router это
 * «приватная папка»: Next исключает её из роутинга целиком, маршрут /privacy
 * не существует и отдаёт 404. Код при этом не тронут.
 *
 * ЧТОБЫ ВКЛЮЧИТЬ ОБРАТНО, когда клиент пришлёт реквизиты:
 *  1) переименовать папку `src/app/_privacy` -> `src/app/privacy`;
 *  2) заполнить плейсхолдеры <S.Todo> в `src/app-pages/privacy/index.tsx`;
 *  3) раскомментировать ссылку в футере (`src/widgets/footer/index.tsx`);
 *  4) раскомментировать ссылку в чекбоксе согласия
 *     (`src/features/selection-modal/index.tsx`).
 *
 * Сам компонент страницы лежит в `src/app-pages/privacy/` и не удалён.
 */
import { PrivacyPage } from "@/app-pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика обработки персональных данных — АМПЕР",
  description:
    "Как аккумуляторный центр «Ампер» обрабатывает и защищает персональные данные пользователей сайта.",
};

const Page = () => <PrivacyPage />;

export default Page;
