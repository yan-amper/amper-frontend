"use client";

import { createImagePath, Query } from "@/shared";
import * as S from "./styled";
import { useUnit } from "effector-react";
import { productsModel } from "../model";
import { Product } from "../api";

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const setSelectedProduct = useUnit(productsModel.setSelectedProduct);

  const onProductClick = () => {
    setSelectedProduct(product);
    Query.set("product", product.id.toString());
  };

  return (
    <S.BatteryCard key={product.id}>
      <S.BatteryImageContainer>
        <S.BatteryImage
          width={370}
          height={370}
          src={createImagePath(product.image)}
          alt={product.title}
        />
      </S.BatteryImageContainer>

      <S.BatteryContent>
        <S.BatteryName>{product.title}</S.BatteryName>

        <S.SpecsList>
          <S.SpecItem>
            <S.SpecLabel>Ёмкость:</S.SpecLabel>
            <S.SpecValue>{product.capacity}</S.SpecValue>
          </S.SpecItem>
          <S.SpecItem>
            <S.SpecLabel>Пусковой ток:</S.SpecLabel>
            <S.SpecValue>{product.current}</S.SpecValue>
          </S.SpecItem>
          <S.SpecItem>
            <S.SpecLabel>Полярность:</S.SpecLabel>
            <S.SpecValue>{product.polarity}</S.SpecValue>
          </S.SpecItem>
          <S.SpecItem>
            <S.SpecLabel>Габариты:</S.SpecLabel>
            <S.SpecValue>
              {product.longitude}x{product.width}x{product.height}
            </S.SpecValue>
          </S.SpecItem>
          <S.SpecItem>
            <S.SpecLabel>Изготовитель:</S.SpecLabel>
            <S.SpecValue>{product.manufacturer}</S.SpecValue>
          </S.SpecItem>
        </S.SpecsList>

        <S.PriceSection>
          <S.PriceContainer>
            <S.PriceInfo>
              <S.OriginalPrice>{product.standardPrice} ₽</S.OriginalPrice>
              <S.CurrentPrice>{product.priceWithChange} ₽</S.CurrentPrice>
              <S.PriceNote>при сдаче АКБ {product.capacity}Ач</S.PriceNote>
            </S.PriceInfo>
            <S.BuyButton onClick={onProductClick}>Подробнее</S.BuyButton>
          </S.PriceContainer>
        </S.PriceSection>
      </S.BatteryContent>
    </S.BatteryCard>
  );
};
