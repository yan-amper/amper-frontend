import { ReactNode } from "react";
import * as S from "./styled";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  /**
   * Ссылка справа от заголовка («Весь каталог →»).
   * С ней заголовок выравнивается по левому краю: по центру ссылка справа
   * выглядит как случайно отлетевший элемент.
   */
  action?: ReactNode;
};

/**
 * Заголовок секции: <h2> + красная черта под ним.
 *
 * Раньше этот блок был скопирован в четыре styled.ts, и копии разъехались:
 * в двух секциях заголовок был <h2> (и получал margin-bottom), а в двух —
 * styled(Link), то есть инлайновый <a>, у которого вертикальные маргины
 * игнорируются — черта прилипала к тексту. Плюс те два заголовка были
 * кликабельными без единого визуального признака ссылки.
 */
export const SectionHeading = ({
  title,
  subtitle,
  action,
}: SectionHeadingProps) => (
  <S.Header $hasAction={Boolean(action)}>
    <S.TitleRow>
      <S.Title>{title}</S.Title>
      {action}
    </S.TitleRow>
    <S.Divider />
    {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
  </S.Header>
);
