import {
  Address,
  Catalog,
  PopularBatteries,
  RecommendedBatteries,
  Slider,
} from "./ui";

export const HomePage = () => (
  <>
    <Slider />
    <RecommendedBatteries />
    <Catalog />
    <PopularBatteries />
    <Address />
  </>
);
