import { createEvent, createStore, createEffect, sample } from "effector";
import {
  DataValue,
  DeleteProductPayload,
  GetFiltredProductPayload,
  Product,
  ProductsApi,
} from "../api";
import { $api, Query } from "@/shared";
import { notificationsModel, ToastTypes } from "@/entities/notifications";
import { ProductsState } from "./types";

export const setSelectedProduct = createEvent<Product | null>();
export const getProductsData = createEvent();
export const getPopularProducts = createEvent();
export const createProduct = createEvent<FormData>();
export const getRecommendedProducts = createEvent();
export const getFiltredProduct = createEvent<{
  params: Record<string, DataValue>;
  type?: "productById";
}>();
export const getCurrentProductData = createEvent<{ params: { id: number } }>();
export const deleteProduct = createEvent<{ id: number }>();
export const editProduct = createEvent<{
  id: number;
  [key: string]: DataValue;
}>();

export const getProductsFx = createEffect<void, Product[]>(
  ProductsApi.getProducts
);

export const createProductFx = createEffect<FormData, Product>(
  ProductsApi.createProduct
);

export const getRecommendedProductsFx = createEffect<void, Product[]>(
  ProductsApi.getRecommendedProducts
);

export const getPopularProductsFx = createEffect<void, Product[]>(
  ProductsApi.getPopularProducts
);

export const getFiltredProductFx = createEffect<
  GetFiltredProductPayload,
  Product | Product[]
>(ProductsApi.getFiltredProduct);

export const deleteProductFx = createEffect<DeleteProductPayload, number>(
  ProductsApi.deleteProduct
);

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

const initialState: ProductsState = {
  productsData: [],
  recommedationProducts: [],
  popularProducts: [],
  isLoading: true,
  isLoadingRec: false,
  isLoadingPopular: false,
  currentProduct: null,
  isCreated: false,
};

export const $products = createStore<ProductsState>(initialState)
  .on(getProductsFx.doneData, (state, productsData) => ({
    ...state,
    productsData,
  }))
  .on(createProductFx.doneData, (state, product) => ({
    ...state,
    productsData: [...state.productsData, product],
    isCreated: true,
  }))
  .on(getRecommendedProductsFx.doneData, (state, recommedationProducts) => ({
    ...state,
    recommedationProducts,
    isLoadingRec: false,
  }))
  .on(getPopularProductsFx.doneData, (state, popularProducts) => ({
    ...state,
    popularProducts,
    isLoadingPopular: false,
  }))
  .on(getFiltredProductFx.doneData, (state, result) =>
    Array.isArray(result)
      ? { ...state, productsData: result, isLoading: false }
      : { ...state, currentProduct: result }
  )
  .on(deleteProductFx.doneData, (state, id) => ({
    ...state,
    productsData: state.productsData.filter((p) => p.id !== id),
  }))
  .on(editProductFx.doneData, (state, updated) => ({
    ...state,
    productsData: state.productsData.map((p) =>
      p.id === updated.id ? updated : p
    ),
  }));

sample({
  clock: getProductsData,
  target: getProductsFx,
});

sample({
  clock: createProduct,
  target: createProductFx,
});

sample({
  clock: getRecommendedProducts,
  target: getRecommendedProductsFx,
});

sample({
  clock: getPopularProducts,
  target: getPopularProductsFx,
});

sample({
  clock: getFiltredProduct,
  target: getFiltredProductFx,
});

sample({
  clock: getCurrentProductData,
  fn: (params) => ({ ...params, type: "productById" }),
  target: getFiltredProductFx,
});

sample({
  clock: deleteProduct,
  target: deleteProductFx,
});

sample({
  clock: editProduct,
  target: editProductFx,
});

const handleError = (message: string) =>
  notificationsModel.showNotify({ message, type: ToastTypes.ERROR });

getProductsFx.fail.watch(() =>
  handleError("Упс... Запрос не прошел, попробуйте позже")
);
createProductFx.fail.watch(() =>
  handleError("Проверьте, загружена ли картинка, все поля заполнены")
);
getRecommendedProductsFx.fail.watch(() =>
  handleError("Упс... Запрос не прошел, попробуйте позже")
);
getPopularProductsFx.fail.watch(() =>
  handleError("Упс... Запрос не прошел, попробуйте позже")
);
getFiltredProductFx.fail.watch(() =>
  handleError("Упс... Запрос не прошел, попробуйте позже")
);
deleteProductFx.fail.watch(() =>
  handleError("Упс... Запрос не прошел, попробуйте позже")
);
editProductFx.fail.watch(() =>
  handleError("Упс... Запрос не прошел, попробуйте позже")
);

createProductFx.done.watch(() =>
  notificationsModel.showNotify({
    message: "Успешно сохранено",
    type: ToastTypes.SUCCESS,
  })
);
deleteProductFx.done.watch(() =>
  notificationsModel.showNotify({
    message: "Успешно удалено",
    type: ToastTypes.SUCCESS,
  })
);
editProductFx.done.watch(() =>
  notificationsModel.showNotify({
    message: "Успешно изменено",
    type: ToastTypes.SUCCESS,
  })
);

setSelectedProduct.watch((value) => {
  if (value) {
    Query.set("product", value.id.toString());
  } else {
    Query.remove("product");
  }
});
