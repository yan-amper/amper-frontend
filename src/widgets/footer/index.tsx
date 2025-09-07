import * as S from "./styled";
import Image from "next/image";

export const Footer = () => (
  <S.FooterStyled>
    <S.FooterContent>
      <S.FooterLogo>
        <Image
          width={150}
          height={75}
          src={"/footer-logo.svg"}
          alt="логотип Ампер"
        />
      </S.FooterLogo>
      <S.FooterCopyright>{new Date().getFullYear()} Ампер</S.FooterCopyright>
    </S.FooterContent>
  </S.FooterStyled>
);
