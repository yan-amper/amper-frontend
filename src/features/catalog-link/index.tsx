import Link from "next/link";
import * as S from "./styled";
import { ArrowRight } from "lucide-react";

export const CatalogLink = () => (
  <S.CatalogLinkStyled>
    <Link href="/catalog">
      <S.ViewAllButton>
        Смотреть все аккумуляторы
        <ArrowRight size={20} />
      </S.ViewAllButton>
    </Link>
  </S.CatalogLinkStyled>
);
