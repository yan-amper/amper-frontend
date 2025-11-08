import { BannersApi } from "@/entities/banners/api";
import {
  Address,
  Catalog,
  PopularBatteries,
  RecommendedBatteries,
  Slider,
} from "./ui";

export const dynamic = "force-dynamic";

export const HomePage = async () => {
  const banners = await BannersApi.getBanners();

  return (
    <>
      <Slider banners={banners} />
      <RecommendedBatteries />
      <Catalog />
      <PopularBatteries />
      <Address />
    </>
  );
};
