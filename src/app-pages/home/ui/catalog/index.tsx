"use client";

import { Zap } from "lucide-react";
import {
  Section,
  Container,
  SectionHeader,
  SectionTitle,
  SectionDivider,
  CatalogGrid,
  CategoryCard,
  CategoryContent,
  CategoryIcon,
  CategoryTitle,
} from "./styled";

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
  <Section>
    <Container>
      <SectionHeader>
        <SectionTitle>Каталог</SectionTitle>
        <SectionDivider />
      </SectionHeader>

      <CatalogGrid>
        {catalogCategories.map((category) => (
          <CategoryCard key={category}>
            <CategoryContent>
              <CategoryIcon>
                <Zap size={24} color="#dc2626" />
              </CategoryIcon>
              <CategoryTitle>{category}</CategoryTitle>
            </CategoryContent>
          </CategoryCard>
        ))}
      </CatalogGrid>
    </Container>
  </Section>
);
