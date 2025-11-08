import { Product, ProductsApi } from "@/entities";
import * as S from "./styled";
import { CatalogFilters, CatalogProducts, SelectedFilters } from "./ui";

export const dynamic = "force-dynamic";

export type CatalogPageProps = {
  searchParams: SelectedFilters;
};

export const CatalogPage = async ({ searchParams }: CatalogPageProps) => {
  const { capacity, ...selectedFilters } = await searchParams;

  let products = (await ProductsApi.getFiltredProduct({
    params: selectedFilters,
    type: "filtredList",
  })) as Product[];

  if (capacity) {
    const [min, max] = capacity.split("-").map(Number);
    products = products.filter((product) => {
      const capacity = +product.capacity;
      return capacity >= min && capacity <= max;
    });
  }

  return (
    <S.ContentContainer>
      <S.MainContent>
        <CatalogFilters selectedFilters={{ capacity, ...selectedFilters }} />
        <CatalogProducts products={products} />
      </S.MainContent>
    </S.ContentContainer>
  );
};
