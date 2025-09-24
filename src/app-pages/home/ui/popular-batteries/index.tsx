import { ProductCard, ProductsApi } from "@/entities";
import * as S from "./styled";

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

        <S.FirstRow>
          {popularProducts.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </S.FirstRow>

        <S.SecondRow>
          {popularProducts.slice(3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </S.SecondRow>
      </S.Container>
    </S.Section>
  );
};
