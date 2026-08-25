"use client";

import { useUnit } from "effector-react";
import * as S from "./styled";
import { Product, ProductCard, productsModel } from "@/entities";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { PackageSearch, RotateCcw } from "lucide-react";
import { pluralWithCount, startRouteLoading } from "@/shared";
import { Pagination } from "../pagination";
import { ActiveFilters } from "../active-filters";

type CatalogProductsProps = {
  products: Product[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
};

export const CatalogProducts = ({
  products,
  totalCount,
  currentPage,
  totalPages,
  pageSize,
}: CatalogProductsProps) => {
  const getProductsFx = useUnit(productsModel.getProductsFx);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    getProductsFx();
  }, [getProductsFx]);

  const resetFilters = () => {
    startRouteLoading();
    router.replace(pathname, { scroll: false });
  };

  const from = (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalCount);

  return (
    <S.ProductsContainer>
      <S.ProductsHeader>
        <S.ProductsTitle>Каталог аккумуляторов</S.ProductsTitle>
        <S.ProductsCount>
          {totalCount === 0
            ? "Ничего не найдено"
            : totalPages > 1
              ? `Показано ${from}–${to} из ${pluralWithCount(totalCount, ["товара", "товаров", "товаров"])}`
              : `Найдено ${pluralWithCount(totalCount, ["товар", "товара", "товаров"])}`}
        </S.ProductsCount>
      </S.ProductsHeader>

      <ActiveFilters />

      {products.length === 0 ? (
        <S.NoResults>
          <S.NoResultsIcon>
            <PackageSearch size={28} aria-hidden="true" />
          </S.NoResultsIcon>
          <S.NoResultsTitle>Товары не найдены</S.NoResultsTitle>
          <S.NoResultsText>
            Под выбранные параметры сейчас ничего нет. Попробуйте убрать часть
            фильтров — или позвоните нам, подберём вручную.
          </S.NoResultsText>
          <S.NoResultsAction type="button" onClick={resetFilters}>
            <RotateCcw size={16} aria-hidden="true" />
            Сбросить фильтры
          </S.NoResultsAction>
        </S.NoResults>
      ) : (
        <>
          <S.Grid>
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                compact
              />
            ))}
          </S.Grid>

          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </>
      )}
    </S.ProductsContainer>
  );
};
