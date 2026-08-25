// Импорт "server-only" — предохранитель. Если кто-нибудь когда-нибудь
// импортирует этот модуль в компонент с "use client", сборка УПАДЁТ
// с внятной ошибкой вместо того, чтобы молча положить ключ Supabase
// в браузерный бандл. Ровно так эта дыра и появилась в прошлый раз.
import "server-only";

import { createClient } from "@supabase/supabase-js";
import { AdminCredentials } from "../types";

export * from "./session";
export * from "./session-token";

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
 * Вызывается ровно один раз за сессию — при логине. Дальше доступ
 * подтверждает подписанная кука, см. `hasAdminSession`.
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
