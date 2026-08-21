"use client";

import { X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as S from "./styled";
import { startRouteLoading } from "@/shared";
import { CHIP_LABELS, formatChipValue } from "../filter-config";

/**
 * Чипсы применённых фильтров над выдачей.
 *
 * Раньше единственным признаком применённого фильтра было значение внутри
 * селекта — чтобы понять, что именно отфильтровано, приходилось открывать
 * каждый из пяти списков. Особенно это било по переходам вида
 * /catalog?popular=true: подборка применена, но на странице об этом
 * не сказано ни слова.
 */
export const ActiveFilters = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const active = Object.keys(CHIP_LABELS)
    .map((key) => ({ key, value: searchParams.get(key) }))
    .filter((item): item is { key: string; value: string } => !!item.value);

  if (active.length === 0) return null;

  const remove = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    params.delete("page");
    startRouteLoading();
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const resetAll = () => {
    startRouteLoading();
    router.replace(pathname, { scroll: false });
  };

  return (
    <S.Container>
      <S.Caption>Применено:</S.Caption>

      {active.map(({ key, value }) => (
        <S.Chip
          key={key}
          type="button"
          onClick={() => remove(key)}
          aria-label={`Убрать фильтр «${CHIP_LABELS[key]}: ${formatChipValue(key, value)}»`}
        >
          <S.ChipLabel>{CHIP_LABELS[key]}:</S.ChipLabel>
          {formatChipValue(key, value)}
          <X size={14} aria-hidden="true" />
        </S.Chip>
      ))}

      {active.length > 1 && (
        <S.ResetAll type="button" onClick={resetAll}>
          Сбросить всё
        </S.ResetAll>
      )}
    </S.Container>
  );
};
