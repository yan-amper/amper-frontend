import "server-only";

import { cookies } from "next/headers";
import {
  ADMIN_COOKIE,
  adminCookieOptions,
  createAdminToken,
  isValidAdminToken,
} from "./session-token";

/** Выдаётся ровно в одном месте — после успешной сверки логина и пароля. */
export const startAdminSession = async (): Promise<boolean> => {
  const token = await createAdminToken();
  if (!token) return false;

  const store = await cookies();
  store.set(ADMIN_COOKIE, token, adminCookieOptions);
  return true;
};

/**
 * Единственная проверка доступа в админку. Заменяет прежнюю схему, где
 * браузер держал пароль в памяти вкладки и прикладывал его к каждому
 * server action: теперь пароль уходит на сервер один раз, при логине.
 *
 * Каждый server action, который трогает заявки или ботов, ОБЯЗАН
 * начинаться с неё: server actions — публичные HTTP-эндпоинты,
 * их можно дёрнуть напрямую, минуя интерфейс.
 */
export const hasAdminSession = async (): Promise<boolean> => {
  const store = await cookies();
  return isValidAdminToken(store.get(ADMIN_COOKIE)?.value);
};
