import { AdminPage } from "@/app-pages";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

// Служебная страница — из поиска её быть не должно.
export const metadata: Metadata = {
  title: "Панель заявок — АМПЕР",
  robots: { index: false, follow: false, nocache: true },
};

// Страница намеренно ничего не загружает: любой запрос к Supabase здесь
// попал бы в HTML ещё до проверки пароля. Данные приходят из loginAction.
export default function Page() {
  return <AdminPage />;
}
