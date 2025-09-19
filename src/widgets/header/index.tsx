import { Phone } from "lucide-react";
import * as S from "./styled";
import Image from "next/image";
import { formattedPhoneNumber, phoneNumber } from "@/shared";

export const Header = () => (
  <S.HeaderContainer>
    <S.HeaderContent>
      <S.LogoContainer href={"/"}>
        <Image
          width={150}
          height={75}
          src={"/header-logo.svg"}
          alt="логотип Ампер"
        />
      </S.LogoContainer>

      <S.HeaderActions>
        <S.PhoneContainer>
          <Phone size={16} />
          <S.PhoneText href={`tel:${phoneNumber}`}>
            {formattedPhoneNumber}
          </S.PhoneText>
        </S.PhoneContainer>
        <S.AddressButton href="/#address">Наши адреса</S.AddressButton>
      </S.HeaderActions>
    </S.HeaderContent>
  </S.HeaderContainer>
);
