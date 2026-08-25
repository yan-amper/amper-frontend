import { hasAdminSession } from "@/shared/server";
import RequestsPage from "../requests";
import { LoginPage } from "../login";
import { loadAdminData } from "./data";

/**
 * Серверный компонент: заявки и реквизиты Supabase попадают в разметку
 * только при валидной куке админа. Без неё страница отдаёт форму логина
 * и ничего больше — ни заявок, ни ключей.
 *
 * После успешного входа форма вызывает router.refresh(), страница
 * перерисовывается уже с кукой и сразу показывает заявки.
 */
export const AdminPage = async () => {
  if (!(await hasAdminSession())) return <LoginPage />;

  const session = await loadAdminData();

  // Кука валидна, но данные не пришли: показываем форму с понятной
  // причиной, а не пустой экран.
  if (!session) {
    return <LoginPage initialError="Не удалось загрузить заявки" />;
  }

  return <RequestsPage session={session} />;
};
