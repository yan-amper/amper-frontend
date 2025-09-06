import { Phone, Battery } from "lucide-react";
import * as S from "./styled";

export const Header = () => (
  <S.HeaderContainer>
    <S.HeaderContent>
      <S.LogoContainer>
        <S.LogoIcon>
          <Battery size={24} color="white" />
        </S.LogoIcon>
        <S.LogoText>Ампер</S.LogoText>
      </S.LogoContainer>

      <S.HeaderActions>
        <S.PhoneContainer>
          <Phone size={16} />
          <S.PhoneText href="tel:79897228095">+7 (989) 722-80-95</S.PhoneText>
        </S.PhoneContainer>
        <S.AddressButton href="#address">Наши адреса</S.AddressButton>
      </S.HeaderActions>
    </S.HeaderContent>
  </S.HeaderContainer>
);
