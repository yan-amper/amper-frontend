import { MapPin, Clock, BatteryPlus, BookOpen } from "lucide-react";
import * as S from "./styled";
import { SHOP_HOURS, SHOP_STREET } from "@/shared";

export const Hero = () => (
  <S.Section>
    <S.Traces aria-hidden="true" viewBox="0 0 360 260" fill="none">
      <path d="M0 30h72a14 14 0 0 1 14 14v46a14 14 0 0 0 14 14h118" />
      <path d="M40 214h96a14 14 0 0 0 14-14v-42" />
      <path d="M232 0v34a14 14 0 0 1-14 14h-40" />
      <circle cx="218" cy="104" r="5" />
      <circle cx="150" cy="152" r="5" />
      <path d="M286 74v28M272 88h28" />
      <path d="M96 148v20M86 158h20" />
    </S.Traces>

    <S.Container>
      <S.Content>
        <S.Title>
          Аккумуляторы
          <br />
          <S.Accent>в Таганроге</S.Accent>
        </S.Title>

        <S.Lead>
          Не просто продаём аккумуляторы — отвечаем за то, чтобы машина
          заводилась.
        </S.Lead>

        {/* Слоган — готовая фирменная графика от клиента. Белый фон убираем
            не прозрачностью (по краям букв остались бы ореолы), а режимом
            multiply: белое становится невидимым на светлой подложке. */}
        <S.Slogan
          src="/slogan.webp"
          alt="Ваш запуск — наша работа"
          width={785}
          height={317}
          priority
        />

        <S.Actions>
          <S.PrimaryAction
            label="Подобрать аккумулятор"
            withArrow
            icon={<BatteryPlus size={20} aria-hidden="true" />}
          />
          <S.SecondaryAction href="/catalog?sort=ASC">
            <BookOpen size={20} aria-hidden="true" />
            Смотреть каталог
          </S.SecondaryAction>
        </S.Actions>

        <S.Meta>
          <S.MetaItem>
            <MapPin size={18} aria-hidden="true" />
            {SHOP_STREET}
          </S.MetaItem>
          <S.MetaItem>
            <Clock size={18} aria-hidden="true" />
            {SHOP_HOURS}
          </S.MetaItem>
        </S.Meta>
      </S.Content>
    </S.Container>

    {/* Фото стоит в разметке последним, а на десктопе позиционируется
        абсолютно: так на телефоне оно оказывается под кнопками, а не
        отжимает их за пределы первого экрана. */}
    <S.Photo>
      <S.PhotoImage
        src="/shop-facade.webp"
        alt="Аккумуляторный центр «Ампер» на Мариупольском шоссе в Таганроге"
        width={1672}
        height={941}
        sizes="(max-width: 1024px) 100vw, 56vw"
        priority
      />
    </S.Photo>
  </S.Section>
);
