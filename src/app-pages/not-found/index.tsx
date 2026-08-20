import { BatteryWarning } from "lucide-react";
import * as S from "./styled";

export const NotFoundPage = () => (
  <S.Section>
    <S.Stripes />
    <S.Content>
      <S.IconBadge>
        <BatteryWarning size={40} />
      </S.IconBadge>
      <S.Code>404</S.Code>
      <S.Title>Эта страница разряжена в ноль</S.Title>
      <S.Text>
        Похоже, ссылка устарела или адрес введён неверно — такой страницы на
        сайте нет. Зато аккумуляторы у нас точно есть в наличии.
      </S.Text>
      <S.Actions>
        <S.PrimaryButton href="/">На главную</S.PrimaryButton>
        <S.SecondaryButton href="/catalog">
          Смотреть каталог
        </S.SecondaryButton>
      </S.Actions>
    </S.Content>
  </S.Section>
);
