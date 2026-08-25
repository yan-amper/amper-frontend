import "server-only";

import { ProductsApi, Request } from "@/entities";
import { supabase, supabaseKey, supabaseUrl } from "@/shared/server";
import { AdminSession } from "./types";

/**
 * Данные админки. Вызывать только после `hasAdminSession` — здесь нет
 * ни одной проверки доступа, это намеренно: проверка живёт в одном месте,
 * а не размазана по загрузчикам.
 */
export const loadAdminData = async (): Promise<AdminSession | null> => {
  const { data, error } = await supabase
    .from("battery_requests")
    .select("*")
    .returns<Request[]>();

  if (error) return null;

  const products = await ProductsApi.getProducts();

  return {
    supabase: { url: supabaseUrl, key: supabaseKey },
    requests: data ?? [],
    products: products.filter((product) => product.relevance),
  };
};
