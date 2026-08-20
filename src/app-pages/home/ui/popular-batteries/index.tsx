import { ProductCard, ProductsApi } from "@/entities";
import * as S from "./styled";
import { CatalogLink } from "@/features";

export const PopularBatteries = async () => {
  const popularProducts = await ProductsApi.getPopularProducts();

  return (
    <S.Section>
      <S.Container>
        <S.SectionHeader>
          <S.SectionTitle href={"/catalog?sort=ASC&popular=true"}>
            Популярные аккумуляторы
          </S.SectionTitle>
          <S.SectionDivider />
        </S.SectionHeader>

        <S.Products>
          {popularProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </S.Products>
      </S.Container>

      <CatalogLink />
    </S.Section>
  );
};
