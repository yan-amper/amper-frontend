import { ProductCard, ProductsApi } from "@/entities";
import * as S from "./styled";
import { CatalogLink } from "@/features";

export const RecommendedBatteries = async () => {
  const recProducts = await ProductsApi.getRecommendedProducts();

  return (
    <S.Section>
      <S.Container>
        <S.SectionHeader>
          <S.SectionTitle href={"/catalog?sort=ASC&recommended=true"}>
            Рекомендуемые аккумуляторы
          </S.SectionTitle>
          <S.SectionDivider />
        </S.SectionHeader>

        <S.BatteriesGrid>
          {recProducts.map((battery, index) => (
            <ProductCard key={battery.id} product={battery} index={index} />
          ))}
        </S.BatteriesGrid>

        <CatalogLink />
      </S.Container>
    </S.Section>
  );
};
