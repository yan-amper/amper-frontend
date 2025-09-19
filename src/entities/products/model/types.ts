import { Product } from "../api";

export type ProductsState = {
  productsData: Product[];
  recommedationProducts: Product[];
  popularProducts: Product[];
  isLoading: boolean;
  isLoadingRec: boolean;
  isLoadingPopular: boolean;
  currentProduct: Product | null;
  isCreated: boolean;
};
