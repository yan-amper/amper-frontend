"use client";

import { createImagePath, Query, useScrollReveal } from "@/shared";
import * as S from "./styled";
import { useUnit } from "effector-react";
import { productsModel } from "../model";
import { Product } from "../api";

type ProductCardProps = {
  product: Product;
  index?: number;
};

/** Дальше пятой карточки каскад только тормозит появление сетки. */
const MAX_STAGGER_STEPS = 5;

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const setSelectedProduct = useUnit(productsModel.setSelectedProduct);
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  const onProductClick = () => {
    setSelectedProduct(product);
    Query.set("product", product.id.toString());
  };

  return (
    <S.BatteryCard
      ref={ref}
      $visible={isVisible}
      $delay={Math.min(index, MAX_STAGGER_STEPS)}
    >
      <S.BatteryImageContainer>
        <S.BatteryImage
          width={370}
          height={370}
          sizes="(max-width: 550px) 90vw, (max-width: 1024px) 45vw, 300px"
          src={createImagePath(product.image)}
          alt={product.title}
        />
      </S.BatteryImageContainer>

      <S.BatteryContent>
        <S.BatteryName>{product.title}</S.BatteryName>

        <S.SpecsList>
          <S.SpecItem>
            <S.SpecLabel>Ёмкость</S.SpecLabel>
            <S.SpecValue>{product.capacity} Ач</S.SpecValue>
          </S.SpecItem>
          <S.SpecItem>
            <S.SpecLabel>Пусковой ток</S.SpecLabel>
            <S.SpecValue>{product.current} А</S.SpecValue>
          </S.SpecItem>
          <S.SpecItem>
            <S.SpecLabel>Полярность</S.SpecLabel>
            <S.SpecValue>{product.polarity}</S.SpecValue>
          </S.SpecItem>
          <S.SpecItem>
            <S.SpecLabel>Габариты</S.SpecLabel>
            <S.SpecValue>
              {product.longitude}×{product.width}×{product.height} мм
            </S.SpecValue>
          </S.SpecItem>
          <S.SpecItem>
            <S.SpecLabel>Изготовитель</S.SpecLabel>
            <S.SpecValue>{product.manufacturer}</S.SpecValue>
          </S.SpecItem>
        </S.SpecsList>

        <S.PriceSection>
          <S.PriceContainer>
            <S.PriceInfo>
              <S.OriginalPrice>{product.standardPrice} ₽</S.OriginalPrice>
              <S.CurrentPrice>{product.priceWithChange} ₽</S.CurrentPrice>
              <S.PriceNote>при сдаче АКБ {product.capacity} Ач</S.PriceNote>
            </S.PriceInfo>
            <S.BuyButton
              onClick={onProductClick}
              aria-label={`Подробнее — ${product.title}`}
            >
              Подробнее
            </S.BuyButton>
          </S.PriceContainer>
        </S.PriceSection>
      </S.BatteryContent>
    </S.BatteryCard>
  );
};
