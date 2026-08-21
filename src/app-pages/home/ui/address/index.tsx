import { MapPin, Phone, Navigation } from "lucide-react";
import * as S from "./styled";
import {
  formattedPhoneNumber,
  phoneNumber,
  SectionHeading,
  SHOP_ADDRESS,
  SHOP_HOURS,
  SHOP_MAP_URL,
  yandexId,
} from "@/shared";

export const Address = () => (
  <S.Section id="address">
    <S.Container>
      <SectionHeading
        title="Наш магазин"
        subtitle="Приезжайте — подберём и установим аккумулятор на месте, старый заберём в зачёт стоимости."
      />

      <S.ContentGrid>
        <S.MapContainer>
          <S.Map
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A0a053060028f1b7f5fc3df72ee7b2e5b3fdcca77247ef4556d26f42228c4eb88&amp;source=constructor"
            title="Карта: аккумуляторный центр Ампер в Таганроге"
            // Виджет Яндекс.Карт тяжёлый, а секция находится в самом низу
            // главной — грузим только когда до неё дошли.
            loading="lazy"
            frameBorder="0"
          />

          <S.MapFooter>
            <S.RouteLink
              href={SHOP_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Navigation size={18} aria-hidden="true" />
              Проложить маршрут
            </S.RouteLink>

            {yandexId && (
              <S.RatingBadge
                src={`https://yandex.ru/sprav/widget/rating-badge/${yandexId}?type=rating`}
                title="Рейтинг организации на Яндексе"
                loading="lazy"
                width="150"
                height="50"
                allow="encrypted-media"
                frameBorder="0"
              />
            )}
          </S.MapFooter>
        </S.MapContainer>

        <S.InfoContainer>
          <S.StoreImage
            width={550}
            height={255}
            sizes="(max-width: 1024px) 100vw, 50vw"
            src="/shop.webp"
            alt="Аккумуляторный центр Ампер в Таганроге"
          />

          <S.ContactCard>
            <S.ContactItem>
              <S.ContactIcon>
                <MapPin size={20} aria-hidden="true" />
              </S.ContactIcon>
              <S.ContactContent>
                <S.ContactTitle>Главный магазин</S.ContactTitle>
                <S.ContactText>{SHOP_ADDRESS}</S.ContactText>
              </S.ContactContent>
            </S.ContactItem>

            <S.ContactItem>
              <S.ContactIcon>
                <Phone size={20} aria-hidden="true" />
              </S.ContactIcon>
              <S.ContactContent>
                {/* Номер берётся из переменной окружения, как и везде.
                    Раньше он был вписан руками, и при смене номера в .env
                    на одной странице оказывалось два разных телефона. */}
                <S.ContactPhone href={`tel:${phoneNumber}`}>
                  {formattedPhoneNumber}
                </S.ContactPhone>
              </S.ContactContent>
            </S.ContactItem>

            <S.WorkingHours>
              <p>
                <strong>Режим работы:</strong>
              </p>
              <p>{SHOP_HOURS}</p>
            </S.WorkingHours>
          </S.ContactCard>
        </S.InfoContainer>
      </S.ContentGrid>
    </S.Container>
  </S.Section>
);
