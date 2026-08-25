import { NextRequest, NextResponse } from "next/server";
// Прямой импорт мимо public API слайса — сознательно: middleware работает
// в Edge-рантайме, а `@/shared/server` тянет за собой next/headers
// и клиент Supabase, которых там быть не может.
import {
  ADMIN_COOKIE,
  adminCookieOptions,
  createAdminToken,
  isValidAdminToken,
} from "@/shared/server/session-token";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  if (req.nextUrl.pathname.startsWith("/video")) {
    res.headers.set("Permissions-Policy", "encrypted-media=*");
  }

  /**
   * Скользящее продление сессии админки: каждый заход в админку с живой
   * кукой отодвигает её срок ещё на 30 дней. Продавец, который заглядывает
   * туда хотя бы раз в месяц, не перелогинивается никогда; заброшенная
   * сессия протухает сама.
   *
   * Продлеваем только валидную куку — просроченная или поддельная просто
   * игнорируется, новую здесь не выдаёт никто. Выдача живёт в loginAction,
   * и только после сверки пароля.
   */
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const token = req.cookies.get(ADMIN_COOKIE)?.value;

    if (await isValidAdminToken(token)) {
      const renewed = await createAdminToken();
      if (renewed) res.cookies.set(ADMIN_COOKIE, renewed, adminCookieOptions);
    }
  }

  return res;
}
