import { BannersApi } from "@/entities/banners/api";
import {
  Address,
  Catalog,
  CtaBand,
  Hero,
  PopularBatteries,
  RecommendedBatteries,
  Slider,
} from "./ui";

export const HomePage = async () => {
  const banners = await BannersApi.getBanners();

  return (
    <>
      <Slider banners={banners} />
      <Hero />
      <RecommendedBatteries />
      <Catalog />
      <PopularBatteries />
      <CtaBand />
      <Address />
    </>
  );
};
