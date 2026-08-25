import type { MetadataRoute } from "next";
import { buildProductSlug, ProductsApi } from "@/entities";
import { siteUrl } from "@/shared";

// Карта сайта строится из живого каталога, поэтому кешировать её на этапе
// сборки нельзя: товары добавляют и снимают с продажи через админку.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      // Без ?sort=ASC: параметр — часть интерфейса, а не адреса страницы.
      // В карте сайта должен стоять канонический URL раздела.
      url: `${siteUrl}/catalog`,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  try {
    const products = await ProductsApi.getProducts();

    const productPages: MetadataRoute.Sitemap = products
      // relevance — флаг «позиция в продаже». Снятые товары в каталоге
      // не показываются, значит и в карте сайта им делать нечего.
      .filter((product) => product.relevance)
      .map((product) => ({
        url: `${siteUrl}/product/${buildProductSlug(product)}`,
        lastModified: new Date(product.updated_at),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));

    return [...staticPages, ...productPages];
  } catch {
    // Бэкенд лежит — отдаём хотя бы статические страницы. Пустая или
    // пятисотящая карта сайта хуже неполной: поисковик может решить,
    // что раздел товаров исчез целиком.
    return staticPages;
  }
}
