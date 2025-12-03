import * as S from "./styled";
import { ArrowRight } from "lucide-react";

export const CatalogLink = () => (
  <S.CatalogLinkStyled>
    <S.ViewAllButton href="/catalog?sort=ASC">
      Смотреть все аккумуляторы
      <ArrowRight size={20} />
    </S.ViewAllButton>
  </S.CatalogLinkStyled>
);
