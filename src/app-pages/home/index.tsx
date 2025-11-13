import { BannersApi } from "@/entities/banners/api";
import {
  Address,
  Catalog,
  PopularBatteries,
  RecommendedBatteries,
  Slider,
} from "./ui";
import * as S from "./styled";

export const HomePage = async () => {
  const banners = await BannersApi.getBanners();

  return (
    <>
      <Slider banners={banners} />
      <S.ButtonContainer>
        <S.Button />
      </S.ButtonContainer>
      <RecommendedBatteries />
      <S.ButtonContainer>
        <S.Button $anotherMargin />
      </S.ButtonContainer>
      <Catalog />
      <PopularBatteries />
      <Address />
    </>
  );
};
