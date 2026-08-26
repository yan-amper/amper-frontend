import { ChevronRight } from "lucide-react";
import { Product, ProductsApi } from "@/entities";
import * as S from "./styled";
import { CatalogFilters, CatalogProducts, SelectedFilters } from "./ui";

export type CatalogPageProps = {
  searchParams: Promise<SelectedFilters & { page?: string; q?: string }>;
};

const PAGE_SIZE = 12;

export const CatalogPage = async ({ searchParams }: CatalogPageProps) => {
  const { capacity, page, q, ...selectedFilters } = await searchParams;

  let products = (await ProductsApi.getFiltredProduct({
    params: selectedFilters,
    type: "filtredList",
  })) as Product[];

  if (capacity) {
    const [min, max] = capacity.split("-").map(Number);
    products = products.filter((product) => {
      const productCapacity = +product.capacity;
      return productCapacity >= min && productCapacity <= max;
    });
  }

  /**
   * Поиск по названию — простое вхождение подстроки, без учёта регистра.
   * Только по названию: если гонять запрос ещё и по габаритам с током,
   * «60» вытащит и 600 А, и 260 мм. В названии и так есть и бренд,
   * и ёмкость, и полярность.
   */
  const query = q?.trim().toLowerCase();

  if (query) {
    products = products.filter((product) =>
      product.title.toLowerCase().includes(query)
    );
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
      {/* Из каталога на главную вела только шапка с логотипом — способ
          рабочий, но неочевидный: по логотипу догадается не каждый.
          Крошки заодно показывают, где человек находится. */}
      <S.Breadcrumbs aria-label="Хлебные крошки">
        <S.Crumb href="/">Главная</S.Crumb>
        <ChevronRight size={14} aria-hidden="true" />
        <S.CrumbCurrent aria-current="page">Каталог</S.CrumbCurrent>
      </S.Breadcrumbs>

      <S.MainContent>
        <CatalogFilters selectedFilters={{ capacity, ...selectedFilters }} />
        <CatalogProducts
          products={pagedProducts}
          totalCount={totalCount}
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={PAGE_SIZE}
        />
      </S.MainContent>
    </S.ContentContainer>
  );
};
