"use client";

import { Select, Option } from "@/features";
import * as S from "./styled";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useUnit } from "effector-react";
import { productsModel, ProductValues } from "@/entities";
import { CAPACITY_RANGES, startRouteLoading } from "@/shared";
import { ChevronDown, RotateCcw } from "lucide-react";
import { CHIP_LABELS, filterProperties, sortOptions } from "../filter-config";

export type SelectedFilters = Record<ProductValues | "sort", string>;

export type CatalogFiltersProps = {
  selectedFilters: SelectedFilters;
};

export const CatalogFilters = ({ selectedFilters }: CatalogFiltersProps) => {
  const products = useUnit(productsModel.$products);
  // Опции полярности/изготовителя/тока приходят клиентским запросом.
  // Раньше до его завершения выпадающий список был просто пустым
  // белым прямоугольником без объяснения.
  const isLoadingOptions = useUnit(productsModel.getProductsFx.pending);

  const [collapsed, setCollapsed] = useState(true);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // q сюда не входит: поиск живёт над выдачей, а не в этой панели,
  // и счётчик «Фильтры (2)» на нём вводил бы в заблуждение.
  const activeCount = Object.keys(CHIP_LABELS).filter(
    (key) => key !== "q" && searchParams.get(key)
  ).length;

  const pushParams = (params: URLSearchParams) => {
    startRouteLoading();
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    // Смена фильтра меняет и состав выдачи — оставаться на пятой странице
    // бессмысленно.
    params.delete("page");
    pushParams(params);
  };

  const removeParam = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    params.delete("page");
    pushParams(params);
  };

  const removeParams = () => {
    startRouteLoading();
    router.replace(pathname, { scroll: false });
  };

  const onSelectChange = (key: string) => (value: string) => setParam(key, value);
  const onSelectClear = (key: string) => () => removeParam(key);

  const getPropertyValues = (key: ProductValues): Option[] => {
    const unique = new Map<string, Option>();

    products.forEach((product) => {
      const value = String(product[key]);
      if (!unique.has(value)) {
        unique.set(value, { label: value, value });
      }
    });

    return [...unique.values()].sort((a, b) =>
      a.label.localeCompare(b.label, "ru", { numeric: true })
    );
  };

  const capacityRanges = CAPACITY_RANGES.map((range) => ({
    value: range,
    label: `${range} Ач`,
  }));

  return (
    <S.FiltersContainer>
      <S.FiltersHeader>
        <S.FiltersTitle>
          Фильтры
          {activeCount > 0 && <S.ActiveCount>{activeCount}</S.ActiveCount>}
        </S.FiltersTitle>

        <S.ToggleButton
          type="button"
          onClick={() => setCollapsed((prev) => !prev)}
          aria-expanded={!collapsed}
          aria-controls="catalog-filters-body"
        >
          {collapsed ? "Показать" : "Скрыть"}
          <ChevronDown
            size={16}
            aria-hidden="true"
            style={{
              transform: collapsed ? "none" : "rotate(180deg)",
              transition: "transform .2s ease",
            }}
          />
        </S.ToggleButton>
      </S.FiltersHeader>

      <S.FiltersBody id="catalog-filters-body" $collapsed={collapsed}>
        <Select
          title="Ёмкость"
          value={selectedFilters["capacity"]}
          label={
            selectedFilters["capacity"]
              ? `${selectedFilters["capacity"]} Ач`
              : undefined
          }
          options={capacityRanges}
          placeholder="Любая"
          onChange={onSelectChange("capacity")}
          onClear={onSelectClear("capacity")}
        />

        {filterProperties.map((filter) => (
          <Select
            key={filter.name}
            title={filter.title}
            value={selectedFilters[filter.name]}
            options={getPropertyValues(filter.name)}
            placeholder={filter.placeholder}
            loading={isLoadingOptions}
            onChange={onSelectChange(filter.name)}
            onClear={onSelectClear(filter.name)}
          />
        ))}

        <Select
          title="Сортировка"
          value={selectedFilters["sort"]}
          label={
            sortOptions.find((option) => option.value === selectedFilters["sort"])
              ?.label
          }
          options={sortOptions}
          placeholder="По умолчанию"
          onChange={onSelectChange("sort")}
        />

        <S.ButtonGroup>
          <S.ResetButton
            type="button"
            onClick={removeParams}
            disabled={activeCount === 0 && !selectedFilters["sort"]}
          >
            <RotateCcw size={16} aria-hidden="true" />
            Сбросить фильтры
          </S.ResetButton>
        </S.ButtonGroup>
      </S.FiltersBody>
    </S.FiltersContainer>
  );
};
