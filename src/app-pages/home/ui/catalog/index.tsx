"use client";

import { Bike, Car, CarFront, Caravan, Bus, Truck } from "lucide-react";
import * as S from "./styled";
import { CAPACITY_RANGES, SectionHeading, useScrollReveal } from "@/shared";

const CAPACITY_ICONS: Record<string, typeof Car> = {
  "35-42": Bike,
  "45-50": Car,
  "55-65": CarFront,
  "70-85": Caravan,
  "90-110": Bus,
  "130-230": Truck,
};

const CAPACITY_HINTS: Record<string, string> = {
  "35-42": "мото и мини-авто",
  "45-50": "малолитражки",
  "55-65": "легковые",
  "70-85": "кроссоверы",
  "90-110": "внедорожники, микроавтобусы",
  "130-230": "грузовики и спецтехника",
};

type CapacityTileProps = {
  capacity: string;
  index: number;
};

const CapacityTile = ({ capacity, index }: CapacityTileProps) => {
  const { ref, isVisible } = useScrollReveal<HTMLAnchorElement>();
  const Icon = CAPACITY_ICONS[capacity] ?? Car;

  return (
    <S.CategoryCard
      // Ведущий слэш обязателен: относительный href ломался бы на любой
      // вложенной странице. Плюс sort — чтобы каталог открывался
      // отсортированным, как из остальных точек входа.
      href={`/catalog?sort=ASC&capacity=${capacity}`}
      ref={ref}
      $visible={isVisible}
      $delay={index}
    >
      <S.CategoryContent>
        <S.CategoryIcon>
          <Icon size={24} />
        </S.CategoryIcon>
        <S.CategoryTitle>
          {capacity} Ач
          <S.CategoryHint>{CAPACITY_HINTS[capacity]}</S.CategoryHint>
        </S.CategoryTitle>
      </S.CategoryContent>
    </S.CategoryCard>
  );
};

export const Catalog = () => (
  <S.Section>
    <S.Container>
      <SectionHeading
        title="Каталог по ёмкости"
        subtitle="Не знаете нужную ёмкость — начните с типа машины или воспользуйтесь подбором."
      />

      <S.CatalogGrid>
        {CAPACITY_RANGES.map((capacity, index) => (
          <CapacityTile key={capacity} capacity={capacity} index={index} />
        ))}
      </S.CatalogGrid>
    </S.Container>
  </S.Section>
);
