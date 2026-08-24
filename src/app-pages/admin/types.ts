import { Product, Request } from "@/entities";
import { AdminCredentials, SupabaseAccess } from "@/shared";

/**
 * Всё, что сервер отдаёт браузеру ПОСЛЕ успешного логина, и ничего до него.
 *
 * Раньше заявки уезжали в HTML страницы /admin любому посетителю, а ключ
 * Supabase лежал в публичном бандле. Теперь и то и другое приходит
 * единственным способом — как результат проверки пароля.
 */
export type AdminSession = {
  credentials: AdminCredentials;
  supabase: SupabaseAccess;
  requests: Request[];
  products: Product[];
};
