import { ShieldCheck, Wrench, RefreshCw, Clock } from "lucide-react";
import * as S from "./styled";

const TRUST_ITEMS = [
  { icon: ShieldCheck, text: "Гарантия на аккумуляторы" },
  { icon: Wrench, text: "Установка и обслуживание" },
  { icon: RefreshCw, text: "Обмен старого АКБ на новый" },
  { icon: Clock, text: "Каждый день 8:30 – 18:30" },
];

export const Hero = () => (
  <S.Section>
    <S.Container>
      <S.Intro>
        <S.Title>
          Аккумуляторы в Таганроге — <S.Accent>подбор, установка</S.Accent> и
          обмен старого на новый
        </S.Title>
        <S.Subtitle>
          Аккумуляторный центр «Ампер» на Мариупольском шоссе. Подберём АКБ под
          вашу машину, установим и заберём отработанный в зачёт стоимости.
        </S.Subtitle>
        <S.Actions>
          <S.PrimaryAction />
          <S.SecondaryAction href="/catalog?sort=ASC">
            Смотреть каталог
          </S.SecondaryAction>
        </S.Actions>
      </S.Intro>

      <S.TrustStrip>
        {TRUST_ITEMS.map(({ icon: Icon, text }) => (
          <S.TrustItem key={text}>
            <S.TrustIcon>
              <Icon size={20} />
            </S.TrustIcon>
            {text}
          </S.TrustItem>
        ))}
      </S.TrustStrip>
    </S.Container>
  </S.Section>
);
