import type { MetadataRoute } from "next";

/**
 * Админка и служебные параметры не должны попадать в индекс.
 * Дублируется метатегом robots на самой странице /admin — поисковики
 * уважают оба сигнала, а robots.txt дополнительно экономит краулинговый
 * бюджет.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin"],
    },
  };
}
