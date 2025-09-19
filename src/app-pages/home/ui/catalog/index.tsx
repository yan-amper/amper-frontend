import { Zap } from "lucide-react";
import * as S from "./styled";

const catalogCategories = [
  "35-42 Ah",
  "45-50 Ah",
  "55-65 Ah",
  "70-85 Ah",
  "90-110 Ah",
  "130-230 Ah",
  "SPS",
  "MOTO",
];

export const Catalog = () => (
  <S.Section>
    <S.Container>
      <S.SectionHeader>
        <S.SectionTitle>Каталог</S.SectionTitle>
        <S.SectionDivider />
      </S.SectionHeader>

      <S.CatalogGrid>
        {catalogCategories.map((category) => (
          <S.CategoryCard key={category} href={`filtred-products/${category}`}>
            <S.CategoryContent>
              <S.CategoryIcon>
                <Zap size={24} color="#dc2626" />
              </S.CategoryIcon>
              <S.CategoryTitle>{category}</S.CategoryTitle>
            </S.CategoryContent>
          </S.CategoryCard>
        ))}
      </S.CatalogGrid>
    </S.Container>
  </S.Section>
);
