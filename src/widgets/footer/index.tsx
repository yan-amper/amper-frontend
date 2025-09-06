import { Battery } from "lucide-react";
import * as S from "./styled";

export const Footer = () => (
  <S.FooterStyled>
    <S.FooterContent>
      <S.FooterLogo>
        <S.FooterLogoIcon>
          <Battery size={20} color="white" />
        </S.FooterLogoIcon>
        <S.FooterLogoText>Ампер</S.FooterLogoText>
      </S.FooterLogo>
      <S.FooterCopyright>{new Date().getFullYear()} Ампер</S.FooterCopyright>
    </S.FooterContent>
  </S.FooterStyled>
);
