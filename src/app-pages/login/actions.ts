"use server";

import { startAdminSession, verifyAdmin } from "@/shared/server";
import { SubmitFormReturn } from "@/shared";

/** Небольшая задержка на неверный пароль — форма логина публичная,
 *  без неё её можно перебирать в тысячи попыток в секунду. */
const BRUTE_FORCE_DELAY_MS = 700;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Единственное место, где выдаётся кука админа, и единственное, где вообще
 * проверяется пароль. Данные отсюда больше не возвращаются: их отрисует
 * серверный компонент /admin, когда увидит куку.
 */
export const loginAction = async (
  login: string,
  password: string
): Promise<SubmitFormReturn> => {
  if (!verifyAdmin({ login, password })) {
    await sleep(BRUTE_FORCE_DELAY_MS);
    return { ok: false, message: "Неправильный логин или пароль" };
  }

  const started = await startAdminSession();

  if (!started) {
    return {
      ok: false,
      message: "Вход временно недоступен, сообщите разработчику",
    };
  }

  return { ok: true };
};
