import { ArrowRight } from "lucide-react";
import { ProductCard, ProductsApi } from "@/entities";
import * as S from "./styled";
import { HOME_SECTION_LIMIT, SectionHeading } from "@/shared";

export const RecommendedBatteries = async () => {
  const recProducts = await ProductsApi.getRecommendedProducts();

  // Пустой список раньше давал секцию из одного заголовка и красной черты.
  if (recProducts.length === 0) return null;

  return (
    <S.Section>
      <S.Container>
        <SectionHeading
          title="Рекомендуемые аккумуляторы"
          action={
            <S.HeadingLink href="/catalog?sort=ASC">
              Весь каталог
              <ArrowRight size={18} aria-hidden="true" />
            </S.HeadingLink>
          }
        />

        <S.Rail>
          {recProducts.slice(0, HOME_SECTION_LIMIT).map((battery, index) => (
            <ProductCard
              key={battery.id}
              product={battery}
              index={index}
              compact
            />
          ))}
        </S.Rail>
      </S.Container>
    </S.Section>
  );
};
