import { ShieldCheck, CarFront, ClipboardCheck, RefreshCw } from "lucide-react";
import * as S from "./styled";

/**
 * Четыре причины остаться на сайте. Формулировки — от выгоды покупателя,
 * а не от названия услуги: «Бесплатная диагностика» вместо «Гарантия».
 * Режим работы отсюда убран — он теперь в первом экране, рядом с адресом.
 */
const BENEFITS = [
  {
    icon: ShieldCheck,
    title: "Бесплатная диагностика",
    text: "Проверим АКБ и генератор на месте",
  },
  {
    icon: CarFront,
    title: "Подбор под автомобиль",
    text: "Подберём подходящий аккумулятор",
  },
  {
    icon: ClipboardCheck,
    title: "Проверка перед продажей",
    text: "Каждый аккумулятор проверяем перед выдачей",
  },
  {
    icon: RefreshCw,
    title: "Старый АКБ в зачёт",
    text: "Учтём его стоимость при покупке нового",
  },
];

export const Benefits = () => (
  <S.Section>
    <S.Container>
      <S.Grid>
        {BENEFITS.map(({ icon: Icon, title, text }) => (
          <S.Card key={title}>
            <S.CardIcon>
              <Icon size={22} aria-hidden="true" />
            </S.CardIcon>
            <S.CardTitle>{title}</S.CardTitle>
            <S.CardText>{text}</S.CardText>
          </S.Card>
        ))}
      </S.Grid>
    </S.Container>
  </S.Section>
);
