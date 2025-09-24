"use client";

import { useUnit } from "effector-react";
import * as S from "./styled";
import { Product, ProductCard, productsModel } from "@/entities";
import { useEffect } from "react";

type CatalogProductsProps = {
  products: Product[];
};

export const CatalogProducts = ({ products }: CatalogProductsProps) => {
  const getProductsFx = useUnit(productsModel.getProductsFx);

  useEffect(() => {
    getProductsFx();
  }, [getProductsFx]);

  if (products.length === 0) {
    return (
      <S.ProductsContainer>
        <S.ProductsHeader>
          <S.ProductsTitle>Каталог аккумуляторов</S.ProductsTitle>
          <S.ProductsCount>Найдено: 0 товаров</S.ProductsCount>
        </S.ProductsHeader>
        <S.NoResults>
          <S.NoResultsTitle>Товары не найдены</S.NoResultsTitle>
          <S.NoResultsText>
            Попробуйте изменить параметры фильтрации или сбросить фильтры
          </S.NoResultsText>
        </S.NoResults>
      </S.ProductsContainer>
    );
  }

  return (
    <S.ProductsContainer>
      <S.ProductsHeader>
        <S.ProductsTitle>Каталог аккумуляторов</S.ProductsTitle>
        <S.ProductsCount>Найдено: {products.length} товаров</S.ProductsCount>
      </S.ProductsHeader>

      <S.ProductsGrid>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </S.ProductsGrid>
    </S.ProductsContainer>
  );
};
