import Image from "next/image";
import { MapPin, Phone, Clock } from "lucide-react";
import * as S from "./styled";
import { BatterySelectionButton } from "@/features";
import { formattedPhoneNumber, phoneNumber } from "@/shared";

export const Footer = () => (
  <S.FooterStyled>
    <S.FooterContent>
      <S.FooterGrid>
        <S.FooterBrandCol>
          <S.FooterLogo>
            <Image
              width={150}
              height={75}
              src={"/footer-logo.svg"}
              alt="логотип Ампер"
            />
          </S.FooterLogo>
          <S.FooterTagline>
            Аккумуляторный центр в Таганроге — продажа, подбор и обмен
            автомобильных аккумуляторов.
          </S.FooterTagline>
        </S.FooterBrandCol>

        <div>
          <S.FooterColTitle>Навигация</S.FooterColTitle>
          <S.FooterLinks>
            <S.FooterLink href="/">Главная</S.FooterLink>
            <S.FooterLink href="/catalog">Каталог</S.FooterLink>
            <S.FooterLink href="/#address">Наш магазин</S.FooterLink>
            <S.FooterButtonLink>
              <BatterySelectionButton />
            </S.FooterButtonLink>
          </S.FooterLinks>
        </div>

        <div>
          <S.FooterColTitle>Контакты</S.FooterColTitle>
          <S.FooterContacts>
            <S.FooterContactRow>
              <Phone size={16} />
              <S.FooterPhone href={`tel:${phoneNumber}`}>
                {formattedPhoneNumber}
              </S.FooterPhone>
            </S.FooterContactRow>
            <S.FooterContactRow>
              <MapPin size={16} />
              <span>г. Таганрог, Мариупольское шоссе, д. 1</span>
            </S.FooterContactRow>
            <S.FooterContactRow>
              <Clock size={16} />
              <span>Каждый день 8:30&nbsp;–&nbsp;18:30</span>
            </S.FooterContactRow>
          </S.FooterContacts>
        </div>

        <div>
          <S.FooterColTitle>Мы на связи</S.FooterColTitle>
          <S.FooterMessengers>
            <S.MessengerLink
              href="https://t.me/amper_tgn_bot?start=start"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/telegram_logo.webp"
                alt=""
                width={22}
                height={22}
              />
              Telegram
            </S.MessengerLink>
            <S.MessengerLink
              href="https://max.ru/id615426315675_bot"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src="/max_logo.webp" alt="" width={22} height={22} />
              Max
            </S.MessengerLink>
          </S.FooterMessengers>
        </div>
      </S.FooterGrid>

      <S.FooterBottom>
        <S.FooterCopyright>
          © {new Date().getFullYear()} Ампер — аккумуляторный центр
        </S.FooterCopyright>
        <S.FooterLegalLink>г. Таганрог</S.FooterLegalLink>
      </S.FooterBottom>
    </S.FooterContent>
  </S.FooterStyled>
);
