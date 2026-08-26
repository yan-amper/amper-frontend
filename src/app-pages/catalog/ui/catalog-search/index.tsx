"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import * as S from "./styled";
import { startRouteLoading } from "@/shared";

/**
 * Поиск по названию товара.
 *
 * Появился потому, что бренд в каталоге не фильтруется ничем: «Изготовитель»
 * — это страна и завод («Турция», «Россия, ЕАЗ»), а Mutlu, Davaro и Odin
 * живут только в названии. До поиска найти конкретную марку можно было
 * лишь пролистав все страницы выдачи.
 *
 * Выдача обновляется сама, через паузу после последней набранной буквы.
 * Кнопка и Enter никуда не делись: они отправляют запрос немедленно,
 * не дожидаясь паузы.
 *
 * Запрос живёт в адресе (`?q=`), как и остальные фильтры, — ссылкой можно
 * поделиться. Но пишется он через replace, а не push: иначе набранное
 * слово оставляло бы в истории по записи на каждую паузу, и «назад»
 * пришлось бы жать столько же раз, сколько было пауз.
 */
/** Пауза после последней буквы. Меньше — и запрос уходит посреди слова. */
const DEBOUNCE_MS = 500;

export const CatalogSearch = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const queryParam = searchParams.get("q") ?? "";
  const [value, setValue] = useState(queryParam);

  /**
   * Поле подхватывает адрес, только когда тот сменился помимо поля:
   * крестик на чипсе, «сбросить фильтры», кнопка «назад».
   *
   * Слепая синхронизация на каждый рендер и была тем самым багом
   * с исчезающей буквой: ответ сервера приходил уже после того, как
   * человек набрал следующий символ, и затирал его старым значением
   * из адреса.
   */
  const lastSubmitted = useRef(queryParam);

  useEffect(() => {
    if (queryParam === lastSubmitted.current) return;
    lastSubmitted.current = queryParam;
    setValue(queryParam);
  }, [queryParam]);

  const submit = useCallback(
    (next: string) => {
      const query = next.trim();
      if (query === queryParam) return;

      const params = new URLSearchParams(searchParams.toString());

      if (query) params.set("q", query);
      else params.delete("q");

      // Новый запрос — новая выдача: оставаться на пятой странице,
      // которой в ней может не быть, бессмысленно.
      params.delete("page");

      lastSubmitted.current = query;
      startRouteLoading();
      const search = params.toString();
      router.replace(search ? `${pathname}?${search}` : pathname, {
        scroll: false,
      });
    },
    [pathname, queryParam, router, searchParams]
  );

  // Автоматическая отправка после паузы в наборе.
  useEffect(() => {
    if (value.trim() === queryParam) return;

    const timer = setTimeout(() => submit(value), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [value, queryParam, submit]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Кнопка и Enter не ждут паузу — таймер выше снимется сам,
    // когда запрос уже уедет и значения сравняются.
    submit(value);
  };

  const onClear = () => {
    setValue("");
    // Очистка — действие однозначное, подтверждать его кнопкой незачем.
    submit("");
    inputRef.current?.focus();
  };

  return (
    <S.Form role="search" onSubmit={onSubmit}>
      <S.Field>
        <S.IconSlot aria-hidden="true">
          <Search size={18} />
        </S.IconSlot>

        <S.Input
          ref={inputRef}
          type="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          /* Без примеров вроде «Mutlu, Serie-3»: на телефоне подсказка
              обрезалась на середине и заканчивалась двоеточием в пустоту. */
          placeholder="Поиск по названию"
          aria-label="Поиск по названию аккумулятора"
          $hasValue={!!value}
        />

        {value && (
          <S.Clear type="button" onClick={onClear} aria-label="Очистить поиск">
            <X size={16} aria-hidden="true" />
          </S.Clear>
        )}
      </S.Field>

      <S.Submit type="submit">
        <Search size={18} aria-hidden="true" />
        <S.SubmitLabel>Найти</S.SubmitLabel>
      </S.Submit>
    </S.Form>
  );
};
