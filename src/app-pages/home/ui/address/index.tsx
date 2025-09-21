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
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A0a053060028f1b7f5fc3df72ee7b2e5b3fdcca77247ef4556d26f42228c4eb88&amp;source=constructor"
            width="573"
            height="434"
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
