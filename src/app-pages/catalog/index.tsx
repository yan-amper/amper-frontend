import { Product, ProductsApi } from "@/entities";
import * as S from "./styled";
import { CatalogFilters, CatalogProducts, SelectedFilters } from "./ui";

export type CatalogPageProps = {
  searchParams: SelectedFilters & { page?: string };
};

const PAGE_SIZE = 12;

export const CatalogPage = async ({ searchParams }: CatalogPageProps) => {
  const { capacity, page, ...selectedFilters } = await searchParams;

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

  const totalCount = products.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const currentPage = Math.min(Math.max(Number(page) || 1, 1), totalPages);
  const pagedProducts = products.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <S.ContentContainer>
      <S.MainContent>
        <CatalogFilters selectedFilters={{ capacity, ...selectedFilters }} />
        <CatalogProducts
          products={pagedProducts}
          totalCount={totalCount}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </S.MainContent>
    </S.ContentContainer>
  );
};
