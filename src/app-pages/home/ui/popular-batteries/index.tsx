import { ProductCard, ProductsApi } from "@/entities";
import * as S from "./styled";
import { CatalogLink } from "@/features";

export const PopularBatteries = async () => {
  const popularProducts = await ProductsApi.getPopularProducts();

  return (
    <S.Section>
      <S.Container>
        <S.SectionHeader>
          <S.SectionTitle href={"/catalog?popular=true"}>
            Популярные аккумуляторы
          </S.SectionTitle>
          <S.SectionDivider />
        </S.SectionHeader>

        <S.Products>
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </S.Products>
      </S.Container>

      <CatalogLink />
    </S.Section>
  );
};
