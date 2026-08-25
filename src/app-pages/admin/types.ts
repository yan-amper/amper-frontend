import { Product, Request } from "@/entities";
import { SupabaseAccess } from "@/shared";

/**
 * Всё, что сервер отдаёт браузеру ПОСЛЕ успешного логина, и ничего до него.
 *
 * Раньше заявки уезжали в HTML страницы /admin любому посетителю, а ключ
 * Supabase лежал в публичном бандле. Теперь и то и другое отдаётся только
 * при валидной куке админа.
 *
 * Учётки здесь больше нет: пароль уходит на сервер один раз, при логине,
 * и в браузер не возвращается.
 */
export type AdminSession = {
  supabase: SupabaseAccess;
  requests: Request[];
  products: Product[];
};
