import { ProductCard, ProductsApi } from "@/entities";
import * as S from "./styled";
import { CatalogLink } from "@/features";
import { HOME_SECTION_LIMIT, ProductGrid, SectionHeading } from "@/shared";

export const PopularBatteries = async () => {
  const popularProducts = await ProductsApi.getPopularProducts();

  if (popularProducts.length === 0) return null;

  return (
    <S.Section>
      <S.Container>
        <SectionHeading
          title="Популярные аккумуляторы"
          subtitle="То, что чаще всего забирают в нашем центре на Мариупольском шоссе."
        />

        <ProductGrid>
          {popularProducts.slice(0, HOME_SECTION_LIMIT).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </ProductGrid>

        <CatalogLink
          href="/catalog?sort=ASC&popular=true"
          label="Все популярные"
        />
      </S.Container>
    </S.Section>
  );
};
