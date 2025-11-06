"use client";

import { Product, ProductCard } from "@/entities";
import * as S from "./styled";
import { CatalogLink } from "@/features";

type Props = {
  products: Product[];
};

export const PopularBatteries = async ({ products }: Props) => {
  console.log(products);

  return (
    <S.Section>
      <S.Container>
        <S.SectionHeader>
          <S.SectionTitle href={"/catalog?popular=true"}>
            Популярные аккумуляторы
          </S.SectionTitle>
          <S.SectionDivider />
        </S.SectionHeader>

        <S.FirstRow>
          {products.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </S.FirstRow>

        <S.SecondRow>
          {products.slice(3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </S.SecondRow>
      </S.Container>

      <CatalogLink />
    </S.Section>
  );
};
