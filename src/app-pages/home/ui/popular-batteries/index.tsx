import { ArrowRight } from "lucide-react";
import { ProductCard, ProductsApi } from "@/entities";
import * as S from "./styled";
import { HOME_SLIDER_LIMIT, SectionHeading } from "@/shared";

export const PopularBatteries = async () => {
  const popularProducts = await ProductsApi.getPopularProducts();

  // Пустой список раньше давал секцию из одного заголовка и красной черты.
  if (popularProducts.length === 0) return null;

  return (
    <S.Section>
      <S.Container>
        <SectionHeading
          title="Популярные аккумуляторы"
          action={
            <S.HeadingLink href="/catalog?sort=ASC">
              Весь каталог
              <ArrowRight size={18} aria-hidden="true" />
            </S.HeadingLink>
          }
        />

        <S.Rail>
          {popularProducts.slice(0, HOME_SLIDER_LIMIT).map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              compact
            />
          ))}
        </S.Rail>
      </S.Container>
    </S.Section>
  );
};
