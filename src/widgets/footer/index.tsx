import Image from "next/image";
import { MapPin, Phone, Clock } from "lucide-react";
import * as S from "./styled";
import { BatterySelectionButton } from "@/features";
import {
  formattedPhoneNumber,
  phoneNumber,
  SHOP_ADDRESS,
  SHOP_HOURS,
} from "@/shared";

export const Footer = () => (
  <S.FooterStyled>
    <S.FooterContent>
      <S.FooterGrid>
        <S.FooterBrandCol>
          <S.FooterLogo>
            <Image
              width={130}
              height={50}
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
            <S.FooterLink href="/catalog?sort=ASC">Каталог</S.FooterLink>
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
              <span>{SHOP_ADDRESS}</span>
            </S.FooterContactRow>
            <S.FooterContactRow>
              <Clock size={16} />
              <span>{SHOP_HOURS}</span>
            </S.FooterContactRow>
          </S.FooterContacts>
        </div>

        <div>
          <S.FooterColTitle>Мы на связи</S.FooterColTitle>
          <S.FooterMessengers>
            {/* Telegram скрыт, пока вариант «Подбор в Telegram» закомментирован
                в selection-modal: иначе футер ведёт на бота, которого нет
                в основном сценарии. Вернуть — раскомментировать оба места. */}
            {/* <S.MessengerLink
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
            </S.MessengerLink> */}
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
          © {new Date().getFullYear()} Ампер — аккумуляторный центр, г. Таганрог
        </S.FooterCopyright>
        {/* Ссылка скрыта, пока страница /privacy отключена
            (см. src/app/_privacy/page.tsx). Вернуть вместе со страницей. */}
        {/* <S.FooterLegalLink href="/privacy">
          Политика конфиденциальности
        </S.FooterLegalLink> */}
      </S.FooterBottom>
    </S.FooterContent>
  </S.FooterStyled>
);
