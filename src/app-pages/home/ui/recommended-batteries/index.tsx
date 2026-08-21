import { ProductCard, ProductsApi } from "@/entities";
import * as S from "./styled";
import { CatalogLink } from "@/features";
import { HOME_SECTION_LIMIT, ProductGrid, SectionHeading } from "@/shared";

export const RecommendedBatteries = async () => {
  const recProducts = await ProductsApi.getRecommendedProducts();

  // Пустой список раньше давал секцию из одного заголовка и красной черты.
  if (recProducts.length === 0) return null;

  return (
    <S.Section>
      <S.Container>
        <SectionHeading
          title="Рекомендуемые аккумуляторы"
          subtitle="Модели, которые чаще всего подходят по ёмкости и пусковому току большинству легковых машин."
        />

        <ProductGrid>
          {recProducts.slice(0, HOME_SECTION_LIMIT).map((battery, index) => (
            <ProductCard key={battery.id} product={battery} index={index} />
          ))}
        </ProductGrid>

        <CatalogLink
          href="/catalog?sort=ASC&recommended=true"
          label="Все рекомендуемые"
        />
      </S.Container>
    </S.Section>
  );
};
