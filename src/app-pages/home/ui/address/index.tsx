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
            src="https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg"
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
              <p>Пн-Пт: 9:00 - 20:00</p>
              <p>Сб-Вс: 10:00 - 18:00</p>
            </S.WorkingHours>
          </S.ContactCard>
        </S.InfoContainer>
      </S.ContentGrid>
    </S.Container>
  </S.Section>
);
