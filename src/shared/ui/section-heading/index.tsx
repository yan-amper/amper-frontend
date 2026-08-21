import * as S from "./styled";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
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
export const SectionHeading = ({ title, subtitle }: SectionHeadingProps) => (
  <S.Header>
    <S.Title>{title}</S.Title>
    <S.Divider />
    {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
  </S.Header>
);
