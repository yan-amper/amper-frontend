"use server";

import { ProductsApi, Request } from "@/entities";
import {
  supabase,
  supabaseKey,
  supabaseUrl,
  verifyAdmin,
} from "@/shared/server";
import { AdminSession } from "../admin/types";

type LoginResult =
  | { ok: true; session: AdminSession }
  | { ok: false; message: string };

/** Небольшая задержка на неверный пароль — форма логина публичная,
 *  без неё её можно перебирать в тысячи попыток в секунду. */
const BRUTE_FORCE_DELAY_MS = 700;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Единственная точка, где заявки и реквизиты Supabase покидают сервер.
 * Пока пароль не сошёлся — не отдаём ничего, даже названия сервиса.
 */
export const loginAction = async (
  login: string,
  password: string
): Promise<LoginResult> => {
  const credentials = { login, password };

  if (!verifyAdmin(credentials)) {
    await sleep(BRUTE_FORCE_DELAY_MS);
    return { ok: false, message: "Неправильный логин или пароль" };
  }

  const { data, error } = await supabase
    .from("battery_requests")
    .select("*")
    .returns<Request[]>();

  if (error) {
    return { ok: false, message: "Не удалось загрузить заявки" };
  }

  const products = await ProductsApi.getProducts();

  return {
    ok: true,
    session: {
      credentials,
      supabase: { url: supabaseUrl, key: supabaseKey },
      requests: data ?? [],
      products: products.filter((product) => product.relevance),
    },
  };
};
