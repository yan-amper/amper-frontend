import { MapPin, Phone } from "lucide-react";
import * as S from "./styled";

export const Address = () => (
  <S.Section id="address">
    <S.Container>
      <S.SectionHeader>
        <S.SectionTitle>Наши магазины</S.SectionTitle>
        <S.SectionDivider />
      </S.SectionHeader>

      <S.ContentGrid>
        <S.MapContainer>
          <S.MapFrame
            src="https://yandex.ru/map-widget/v1/?z=12&ol=biz"
            width="100%"
            height="100%"
            frameBorder="0"
          />
        </S.MapContainer>

        <S.InfoContainer>
          <S.StoreImage
            width={550}
            height={255}
            src="/shop.jpg"
            alt="Наш магазин"
          />

          <S.ContactCard>
            <S.ContactItem>
              <S.ContactIcon>
                <MapPin size={20} />
              </S.ContactIcon>
              <S.ContactContent>
                <S.ContactTitle>Главный магазин</S.ContactTitle>
                <S.ContactText>
                  г. Таганрог, Мариупольское шоссе, д. 1
                </S.ContactText>
              </S.ContactContent>
            </S.ContactItem>

            <S.ContactItem>
              <S.ContactIcon>
                <Phone size={20} />
              </S.ContactIcon>
              <S.ContactContent>
                <S.ContactText href="tel:79897228095">
                  +7 (989) 722-80-95
                </S.ContactText>
              </S.ContactContent>
            </S.ContactItem>

            <S.WorkingHours>
              <p>
                <strong>Режим работы:</strong>
              </p>
              <p>Каждый день 8:30 - 18:30</p>
            </S.WorkingHours>
          </S.ContactCard>
        </S.InfoContainer>
      </S.ContentGrid>
    </S.Container>
  </S.Section>
);
