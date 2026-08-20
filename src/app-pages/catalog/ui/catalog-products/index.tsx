"use client";

import { useUnit } from "effector-react";
import * as S from "./styled";
import { Product, ProductCard, productsModel } from "@/entities";
import { useEffect } from "react";
import { Pagination } from "../pagination";

type CatalogProductsProps = {
  products: Product[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
};

export const CatalogProducts = ({
  products,
  totalCount,
  currentPage,
  totalPages,
}: CatalogProductsProps) => {
  const getProductsFx = useUnit(productsModel.getProductsFx);

  useEffect(() => {
    getProductsFx();
  }, [getProductsFx]);

  return (
    <S.ProductsContainer>
      <S.ProductsHeader>
        <S.ProductsTitle>Каталог аккумуляторов</S.ProductsTitle>
        <S.ProductsCount>Найдено: {totalCount} товаров</S.ProductsCount>
      </S.ProductsHeader>

      {products.length === 0 ? (
        <S.NoResults>
          <S.NoResultsTitle>Товары не найдены</S.NoResultsTitle>
          <S.NoResultsText>
            Попробуйте изменить параметры фильтрации или сбросить фильтры
          </S.NoResultsText>
        </S.NoResults>
      ) : (
        <>
          <S.ProductsGrid>
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </S.ProductsGrid>

          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </>
      )}
    </S.ProductsContainer>
  );
};
