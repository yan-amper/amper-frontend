import { $api } from "@/shared";
import { GetFiltredProductPayload, Product } from "./types";

export class ProductsApi {
  static async getProducts(): Promise<Product[]> {
    const { data } = await $api.get("/products");
    return data.data.map((item: Product) => ({
      ...item,
      recommendations: item.recommendations !== 0,
      relevance: item.relevance !== 0,
    }));
  }

  static async getRecommendedProducts(): Promise<Product[]> {
    const { data } = await $api.get("/products?recommendations=true");
    return data.data.filter((p: Product) => p.relevance);
  }

  static async getPopularProducts(): Promise<Product[]> {
    const { data } = await $api.get("/products?popular=true");
    return data.data.filter((p: Product) => p.relevance);
  }

  /**
   * Один товар по id — для страницы /product/[slug].
   *
   * Бэкенд на этом маршруте отдаёт объект товара НЕ обёрнутым в { data },
   * в отличие от списочного /products. Проверено на боевом API.
   *
   * Несуществующий id возвращает 200 с пустым телом (не 404), поэтому
   * пустой ответ приходится ловить руками — иначе страница отрендерила бы
   * карточку из undefined вместо честной 404.
   */
  static async getProductById(id: number): Promise<Product | null> {
    const { data } = await $api.get(`/products/${id}`);
    return data && typeof data === "object" && "id" in data
      ? (data as Product)
      : null;
  }

  static async getFiltredProduct({
    params,
    type,
  }: GetFiltredProductPayload): Promise<Product | Product[]> {
    const is = params.capacityRange === "90-110";
    if (is) params.capacityRange = "";

    const { data } = await $api.get("/products", { params });
    if (type === "productById") {
      return data.data.find((p: Product) => p.id === Number(params.id));
    } else {
      let arr = data.data;
      if (is) {
        arr = data.data.filter(
          (i: Product) => Number(i.capacity) >= 90 && Number(i.capacity) <= 110
        );
      }
      return arr.filter((p: Product) => p.relevance);
    }
  }
}
