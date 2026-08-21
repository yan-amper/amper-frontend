import * as S from "./styled";
import { ArrowRight } from "lucide-react";

type CatalogLinkProps = {
  href?: string;
  label?: string;
};

export const CatalogLink = ({
  href = "/catalog?sort=ASC",
  label = "Смотреть весь каталог",
}: CatalogLinkProps) => (
  <S.CatalogLinkStyled>
    <S.ViewAllButton href={href}>
      {label}
      <ArrowRight size={20} aria-hidden="true" />
    </S.ViewAllButton>
  </S.CatalogLinkStyled>
);
