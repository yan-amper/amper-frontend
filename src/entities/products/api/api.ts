import { $api } from "@/shared";
import {
  DeleteProductPayload,
  GetFiltredProductPayload,
  Product,
} from "./types";

export class ProductsApi {
  static async getProducts(): Promise<Product[]> {
    const { data } = await $api.get("/products");
    return data.data.map((item: Product) => ({
      ...item,
      recommendations: item.recommendations !== 0,
      relevance: item.relevance !== 0,
    }));
  }

  static async createProduct(payload: FormData): Promise<Product> {
    const { data } = await $api.post("/products/create", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data.data as Product;
  }

  static async getRecommendedProducts(): Promise<Product[]> {
    const { data } = await $api.get("/products?recommendations=true");
    return data.data.filter((p: Product) => p.relevance);
  }

  static async getPopularProducts(): Promise<Product[]> {
    const { data } = await $api.get("/products?popular=true");
    return data.data.filter((p: Product) => p.relevance);
  }

  static async getFiltredProduct({
    params,
    type,
  }: GetFiltredProductPayload): Promise<Product[]> {
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

  static async deleteProduct({ id }: DeleteProductPayload): Promise<number> {
    await $api.delete(`/products/${id}`);
    return id;
  }
}
