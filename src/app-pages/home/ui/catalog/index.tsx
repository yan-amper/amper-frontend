"use client";

import { Bike, Car, CarFront, Caravan, Bus, Truck } from "lucide-react";
import * as S from "./styled";
import { CAPACITY_RANGES, useScrollReveal } from "@/shared";

const CAPACITY_ICONS: Record<string, typeof Car> = {
  "35-42": Bike,
  "45-50": Car,
  "55-65": CarFront,
  "70-85": Caravan,
  "90-110": Bus,
  "130-230": Truck,
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
      href={`catalog?capacity=${capacity}`}
      ref={ref}
      $visible={isVisible}
      $delay={index}
    >
      <S.CategoryContent>
        <S.CategoryIcon>
          <Icon size={24} color="#dc2626" />
        </S.CategoryIcon>
        <S.CategoryTitle>{capacity} Ah</S.CategoryTitle>
      </S.CategoryContent>
    </S.CategoryCard>
  );
};

export const Catalog = () => (
  <S.Section>
    <S.Container>
      <S.SectionHeader>
        <S.SectionTitle>Каталог</S.SectionTitle>
        <S.SectionDivider />
      </S.SectionHeader>

      <S.CatalogGrid>
        {CAPACITY_RANGES.map((capacity, index) => (
          <CapacityTile key={capacity} capacity={capacity} index={index} />
        ))}
      </S.CatalogGrid>
    </S.Container>
  </S.Section>
);
