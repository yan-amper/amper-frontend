"use client";

import { MultiSelect, Option } from "@/features";
import * as S from "./styled";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useUnit } from "effector-react";
import { productsModel, ProductValues } from "@/entities";

const filterProperties: {
  name: ProductValues;
  label: string;
  placeholder: string;
}[] = [
  {
    name: "capacity",
    label: "Ёмкость",
    placeholder: "Укажите емкость",
  },
  {
    name: "polarity",
    label: "Полярность",
    placeholder: "Укажите полярность",
  },
  {
    name: "manufacturer",
    label: "Изготовитель",
    placeholder: "Укажите изготовителя",
  },
  {
    name: "current",
    label: "Сила тока",
    placeholder: "Укажите силу тока",
  },
];

const sortOptions = [
  { value: "ASC", label: "По возрастанию" },
  { value: "DESC", label: "По убыванию" },
];

export type SelectedFilters = Record<ProductValues | "sort", string>;

export type CatalogFiltersProps = {
  selectedFilters: SelectedFilters;
};

export const CatalogFilters = ({ selectedFilters }: CatalogFiltersProps) => {
  const productsData = useUnit(productsModel.$products).productsData;

  const getPropertyValues = (key: ProductValues): Option[] => {
    const unique = new Map<string, Option>();

    productsData.forEach((product) => {
      const value = String(product[key]);
      if (!unique.has(value)) {
        unique.set(value, { label: value, value });
      }
    });

    return [...unique.values()].sort((a, b) =>
      a.label.localeCompare(b.label, "ru", { numeric: true })
    );
  };

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const removeParams = () => {
    router.replace(pathname, { scroll: false });
  };

  const onSelectChange = (key: string) => (value: string) => {
    setParam(key, value);
  };

  return (
    <S.FiltersContainer>
      <S.FiltersTitle>Фильтры</S.FiltersTitle>

      {filterProperties.map((filter) => (
        <MultiSelect
          key={filter.name}
          title={filter.label}
          value={selectedFilters[filter.name]}
          options={getPropertyValues(filter.name)}
          placeholder={filter.placeholder}
          onChange={onSelectChange(filter.name)}
        />
      ))}

      <MultiSelect
        title="Сортировка"
        value={selectedFilters["sort"]}
        options={sortOptions}
        placeholder="По умолчанию"
        onChange={onSelectChange("sort")}
      />

      <S.ButtonGroup>
        <S.ResetButton onClick={removeParams}>Сбросить фильтры</S.ResetButton>
      </S.ButtonGroup>
    </S.FiltersContainer>
  );
};
