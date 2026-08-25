"use client";

import {
  Car,
  CarFront,
  CarTaxiFront,
  Caravan,
  Bus,
  Truck,
  ArrowRight,
} from "lucide-react";
import { useUnit } from "effector-react";
import * as S from "./styled";
import { CAPACITY_RANGES, SectionHeading, useScrollReveal } from "@/shared";
import { appState } from "@/entities";

/**
 * Иконки идут по возрастанию «габарита» машины — подписей под ёмкостями
 * больше нет, и размер силуэта остался единственной подсказкой.
 * Мотоцикла в списке нет специально: мото-аккумуляторами магазин
 * не торгует, а иконка велосипеда обещала обратное.
 */
const CAPACITY_ICONS: Record<string, typeof Car> = {
  "35-42": Car,
  "45-50": CarFront,
  "55-65": CarTaxiFront,
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
      // Ведущий слэш обязателен: относительный href ломался бы на любой
      // вложенной странице. Плюс sort — чтобы каталог открывался
      // отсортированным, как из остальных точек входа.
      href={`/catalog?sort=ASC&capacity=${capacity}`}
      ref={ref}
      $visible={isVisible}
      $delay={index}
    >
      <S.CategoryIcon>
        <Icon size={24} aria-hidden="true" />
      </S.CategoryIcon>
      <S.CategoryTitle>{capacity} Ач</S.CategoryTitle>
    </S.CategoryCard>
  );
};

export const Catalog = () => {
  const setForm = useUnit(appState.setForm);

  return (
    <S.Section>
      <S.Container>
        <SectionHeading title="Аккумуляторы по ёмкости" />

        <S.CatalogGrid>
          {CAPACITY_RANGES.map((capacity, index) => (
            <CapacityTile key={capacity} capacity={capacity} index={index} />
          ))}
        </S.CatalogGrid>

        {/* Подписи «легковые / кроссоверы» из плиток убраны, и тем, кто
            ёмкость не знает, теперь нужен явный выход — вот он.
            Заодно это последняя точка входа в подбор перед адресом. */}
        <S.CtaPlate type="button" onClick={() => setForm({ open: true })}>
          <S.CtaIcon>
            <CarFront size={24} aria-hidden="true" />
          </S.CtaIcon>
          <S.CtaText>
            <S.CtaTitle>Не знаете, какая ёмкость нужна?</S.CtaTitle>
            <S.CtaSubtitle>
              Скажите марку и год машины — подберём АКБ и назовём цену с учётом
              сдачи старого
            </S.CtaSubtitle>
          </S.CtaText>
          <S.CtaArrow>
            <ArrowRight size={22} aria-hidden="true" />
          </S.CtaArrow>
        </S.CtaPlate>
      </S.Container>
    </S.Section>
  );
};
