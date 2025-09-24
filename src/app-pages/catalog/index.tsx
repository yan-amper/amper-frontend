import { Product, ProductsApi } from "@/entities";
import * as S from "./styled";
import { CatalogFilters, CatalogProducts, SelectedFilters } from "./ui";

export type CatalogPageProps = {
  searchParams: SelectedFilters;
};

export const CatalogPage = async ({ searchParams }: CatalogPageProps) => {
  const selectedFilters = await searchParams;

  const products = (await ProductsApi.getFiltredProduct({
    params: selectedFilters,
    type: "filtredList",
  })) as Product[];

  return (
    <S.ContentContainer>
      <S.MainContent>
        <CatalogFilters selectedFilters={selectedFilters} />
        <CatalogProducts products={products} />
      </S.MainContent>
    </S.ContentContainer>
  );
};
