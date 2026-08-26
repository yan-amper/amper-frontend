"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import * as S from "./styled";
import { startRouteLoading } from "@/shared";

/** Пауза перед запросом: печатать «аккумулятор» и дёргать роутер
 *  на каждую букву — двенадцать переходов вместо одного. */
const DEBOUNCE_MS = 350;

/**
 * Поиск по названию товара.
 *
 * Появился потому, что бренд в каталоге не фильтруется ничем: «Изготовитель»
 * — это страна и завод («Турция», «Россия, ЕАЗ»), а Mutlu, Davaro и Odin
 * живут только в названии. До поиска найти конкретную марку можно было
 * лишь пролистав все страницы выдачи.
 *
 * Запрос живёт в адресе (`?q=`), как и остальные фильтры: ссылкой можно
 * поделиться, «назад» возвращает предыдущую выдачу.
 */
export const CatalogSearch = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryParam = searchParams.get("q") ?? "";
  const [value, setValue] = useState(queryParam);

  // Параметр может измениться мимо этого поля — «сбросить фильтры»,
  // крестик на чипсе, кнопка «назад». Поле обязано это отражать.
  useEffect(() => setValue(queryParam), [queryParam]);

  useEffect(() => {
    if (value.trim() === queryParam) return;

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (value.trim()) params.set("q", value.trim());
      else params.delete("q");

      // Новый запрос — новая выдача: оставаться на пятой странице,
      // которой в ней может не быть, бессмысленно.
      params.delete("page");

      startRouteLoading();
      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [value, queryParam, pathname, router, searchParams]);

  return (
    <S.Form role="search" onSubmit={(e) => e.preventDefault()}>
      <S.IconSlot aria-hidden="true">
        <Search size={18} />
      </S.IconSlot>

      <S.Input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Поиск по названию: Mutlu, Serie-3, 60Ah"
        aria-label="Поиск по названию аккумулятора"
        $hasValue={!!value}
      />

      {value && (
        <S.Clear
          type="button"
          onClick={() => setValue("")}
          aria-label="Очистить поиск"
        >
          <X size={16} aria-hidden="true" />
        </S.Clear>
      )}
    </S.Form>
  );
};
