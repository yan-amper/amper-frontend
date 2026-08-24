// Импорт "server-only" — предохранитель. Если кто-нибудь когда-нибудь
// импортирует этот модуль в компонент с "use client", сборка УПАДЁТ
// с внятной ошибкой вместо того, чтобы молча положить ключ Supabase
// в браузерный бандл. Ровно так эта дыра и появилась в прошлый раз.
import "server-only";

import { createClient } from "@supabase/supabase-js";
import { AdminCredentials } from "../types";

/**
 * Переменные БЕЗ префикса NEXT_PUBLIC_ — Next физически не пустит их
 * в клиентскую сборку.
 */
export const supabaseUrl = process.env.SUPABASE_URL!;
export const supabaseKey = process.env.SUPABASE_KEY!;

const adminLogin = process.env.ADMIN_LOGIN;
const adminPassword = process.env.ADMIN_PASSWORD;

/** Серверный клиент Supabase. В браузер никогда не попадает. */
export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Сверка учётки админа с переменными окружения.
 *
 * Сессий и кук нет по решению владельца: продавец вводит логин и пароль
 * каждый раз. Поэтому клиент держит введённые данные в памяти вкладки
 * и прикладывает их к каждому привилегированному server action —
 * по сути то же самое, что делает браузерный Basic Auth.
 *
 * Каждый server action, который трогает заявки или ботов, ОБЯЗАН начинаться
 * с этой проверки: server actions — это публичные HTTP-эндпоинты, их можно
 * дёрнуть напрямую, минуя интерфейс.
 */
export const verifyAdmin = (credentials?: AdminCredentials): boolean => {
  if (!adminLogin || !adminPassword) {
    console.error(
      "ADMIN_LOGIN/ADMIN_PASSWORD не заданы в окружении — вход в админку невозможен"
    );
    return false;
  }

  if (!credentials) return false;

  return (
    credentials.login === adminLogin && credentials.password === adminPassword
  );
};
