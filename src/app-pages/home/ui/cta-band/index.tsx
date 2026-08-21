import * as S from "./styled";

export const CtaBand = () => (
  <S.Section>
    <S.Container>
      <S.Band>
        <S.Stripes />
        <S.Text>
          <S.Title>Не знаете, какой аккумулятор нужен?</S.Title>
          <S.Subtitle>
            Скажите марку и год машины — подберём подходящий АКБ по ёмкости и
            пусковому току и назовём цену с учётом сдачи старого.
          </S.Subtitle>
        </S.Text>
        <S.Action />
      </S.Band>
    </S.Container>
  </S.Section>
);
