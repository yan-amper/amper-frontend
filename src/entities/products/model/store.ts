import { createEvent, createStore, createEffect, sample } from "effector";
import {
  DataValue,
  GetFiltredProductPayload,
  Product,
  ProductsApi,
} from "../api";
import { $api, Query } from "@/shared";

export const setSelectedProduct = createEvent<Product | null>();
export const getCurrentProductData = createEvent<{ params: { id: number } }>();
export const getProductsFx = createEffect<void, Product[]>(
  ProductsApi.getProducts
);

export const getFiltredProductFx = createEffect<
  GetFiltredProductPayload,
  Product | Product[]
>(ProductsApi.getFiltredProduct);

export const editProductFx = createEffect(
  async (payload: { id: number; [key: string]: DataValue }) => {
    const { id, ...rest } = payload;
    const formData = new FormData();
    Object.entries(rest).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    formData.append("_method", "patch");

    const { data } = await $api.post(`/products/${id}`, formData);
    return data.data as Product;
  }
);

export const $selectedProduct = createStore<Product | null>(null)
  .on(setSelectedProduct, (_, data) => data)
  .on(getFiltredProductFx.doneData, (state, value) => {
    if (Array.isArray(value) || !Query.get("product")) return state;
    return value;
  });

export const $products = createStore<Product[]>([])
  .on(getProductsFx.doneData, (_, products) => products)
  .on(getFiltredProductFx.doneData, (_, products) =>
    Array.isArray(products) ? products : [products]
  );

sample({
  clock: getCurrentProductData,
  fn: (params) => ({ ...params, type: "productById" }),
  target: getFiltredProductFx,
});

setSelectedProduct.watch((value) => {
  if (value) {
    Query.set("product", value.id.toString());
  } else {
    Query.remove("product");
  }
});
