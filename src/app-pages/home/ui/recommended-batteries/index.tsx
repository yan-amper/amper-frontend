import { ProductCard, ProductsApi } from "@/entities";
import * as S from "./styled";

export const RecommendedBatteries = async () => {
  const recProducts = await ProductsApi.getRecommendedProducts();

  return (
    <S.Section>
      <S.Container>
        <S.SectionHeader>
          <S.SectionTitle>Рекомендуемые аккумуляторы</S.SectionTitle>
          <S.SectionDivider />
        </S.SectionHeader>

        <S.BatteriesGrid>
          {recProducts.map((battery) => (
            <ProductCard key={battery.id} product={battery} />
          ))}
        </S.BatteriesGrid>
      </S.Container>
    </S.Section>
  );
};
