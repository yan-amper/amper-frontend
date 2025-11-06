import { BannersApi } from "@/entities/banners/api";
import {
  Address,
  Catalog,
  PopularBatteries,
  RecommendedBatteries,
  Slider,
} from "./ui";
import { ProductsApi } from "@/entities";

export const HomePage = async () => {
  const banners = await BannersApi.getBanners();
  const popularProducts = await ProductsApi.getPopularProducts();

  return (
    <>
      <Slider banners={banners} />
      <RecommendedBatteries />
      <Catalog />
      <PopularBatteries products={popularProducts} />
      <Address />
    </>
  );
};
