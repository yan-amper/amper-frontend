import { Zap } from "lucide-react";
import * as S from "./styled";
import { CAPACITY_RANGES } from "@/shared";

export const Catalog = () => (
  <S.Section>
    <S.Container>
      <S.SectionHeader>
        <S.SectionTitle>Каталог</S.SectionTitle>
        <S.SectionDivider />
      </S.SectionHeader>

      <S.CatalogGrid>
        {CAPACITY_RANGES.map((capacity) => (
          <S.CategoryCard key={capacity} href={`catalog?capacity=${capacity}`}>
            <S.CategoryContent>
              <S.CategoryIcon>
                <Zap size={24} color="#dc2626" />
              </S.CategoryIcon>
              <S.CategoryTitle>{capacity} Ah</S.CategoryTitle>
            </S.CategoryContent>
          </S.CategoryCard>
        ))}
      </S.CatalogGrid>
    </S.Container>
  </S.Section>
);
