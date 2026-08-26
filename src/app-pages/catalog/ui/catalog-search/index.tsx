"use client";

import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import * as S from "./styled";
import { startRouteLoading } from "@/shared";

/**
 * Пауза после последней буквы.
 *
 * 400 — компромисс: беглый набор идёт с интервалом 200–250 мс между
 * нажатиями, так что за слово уходит один запрос, а не по одному на
 * букву. Ниже 300 запросы начнут уходить в середине слова даже у людей
 * со средней скоростью печати, а каждый запрос здесь — рендер каталога
 * на сервере, и бэкенд на поток таких отвечает 429.
 */
const DEBOUNCE_MS = 400;

/**
 * Набранное и отправленное живут ВНЕ компонента, в модуле.
 *
 * Иначе никак: навигация по ?q= перерисовывает каталог с сервера, и в
 * WebKit (весь iOS) React при этом пересоздаёт поддерево — состояние
 * компонента инициализируется заново из адреса, и всё, что человек успел
 * дописать после отправки, пропадает. Именно так «mutlu», набранное
 * с паузами, превращалось в «mulu»: буква исчезала ровно в тот момент,
 * когда возвращался ответ на предыдущую.
 *
 * Модульная переменная переживает пересоздание — она и есть источник
 * правды о том, что в поле, пока адрес догоняет.
 */
let typedQuery: string | null = null;

/**
 * Поиск по названию товара.
 *
 * Появился потому, что бренд в каталоге не фильтруется ничем: «Изготовитель»
 * — это страна и завод («Турция», «Россия, ЕАЗ»), а Mutlu, Davaro и Odin
 * живут только в названии. До поиска найти конкретную марку можно было
 * лишь пролистав все страницы выдачи.
 *
 * Выдача обновляется сама, через паузу после последней набранной буквы.
 * Кнопки «Найти» нет: раз поиск идёт сам, она обещала бы действие,
 * которое уже произошло. Enter при этом отправляет запрос немедленно
 * и обрабатывается здесь же, в keydown, а не отправкой формы: у формы
 * без submit-кнопки поведение по Enter разное от движка к движку.
 *
 * Поле намеренно НЕуправляемое: React не должен переписывать то, что
 * человек набрал. С value={state} в WebKit ловился кадр, где поле на
 * мгновение показывало значение на букву назад — ровно когда приходил
 * ответ на предыдущий запрос.
 *
 * Запрос живёт в адресе (`?q=`), как и остальные фильтры, — ссылкой можно
 * поделиться. Но пишется он через replace, а не push: иначе набранное
 * слово оставляло бы в истории по записи на каждую паузу, и «назад»
 * пришлось бы жать столько же раз, сколько было пауз.
 */
export const CatalogSearch = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const queryParam = searchParams.get("q") ?? "";
  const initialValue = typedQuery ?? queryParam;
  // Единственное, ради чего здесь состояние, — показать крестик очистки.
  const [hasValue, setHasValue] = useState(!!initialValue);

  const submit = useCallback(
    (next: string) => {
      // Обнулять обязательно, а не только гасить: по наличию таймера
      // blur понимает, осталось ли что-то неотправленное.
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      const query = next.trim();
      if (query === queryParam) return;

      const params = new URLSearchParams(searchParams.toString());

      if (query) params.set("q", query);
      else params.delete("q");

      // Новый запрос — новая выдача: оставаться на пятой странице,
      // которой в ней может не быть, бессмысленно.
      params.delete("page");

      startRouteLoading();
      const search = params.toString();
      router.replace(search ? `${pathname}?${search}` : pathname, {
        scroll: false,
      });
    },
    [pathname, queryParam, router, searchParams]
  );

  /**
   * Поле подхватывает адрес — но только пока в нём не стоит курсор.
   *
   * Это и есть развязка всех гонок: пока человек печатает, адрес не имеет
   * права трогать поле, и терять там нечего. А крестик на чипсе, «сбросить
   * фильтры» и «назад» уводят фокус на себя, так что их изменение поле
   * подхватит.
   *
   * Сравнивать с «последним отправленным» оказалось недостаточно: ответ
   * на предыдущий запрос иногда приходит уже после того, как ушёл
   * следующий, и такой поздний рендер выглядел как изменение извне —
   * поле откатывалось на букву назад.
   */
  useEffect(() => {
    const input = inputRef.current;
    if (!input || document.activeElement === input) return;
    if (input.value === queryParam) return;

    typedQuery = null;
    input.value = queryParam;
    setHasValue(!!queryParam);
  }, [queryParam]);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const onChange = (event: { target: { value: string } }) => {
    const next = event.target.value;
    typedQuery = next;
    setHasValue(!!next);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      submit(next);
    }, DEBOUNCE_MS);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    submit(event.currentTarget.value);
  };

  /**
   * Уход из поля — момент, когда его снова можно ровнять по адресу.
   *
   * Если набранное ещё не отправлено, отправляем сразу, не дожидаясь
   * паузы: человек ушёл из поля, ждать нечего. Если отправлять нечего,
   * а адрес разошёлся с полем (так бывает после «назад», нажатого
   * с курсором в поле) — подтягиваем адрес.
   */
  const onBlur = () => {
    const input = inputRef.current;
    if (!input) return;

    if (timerRef.current) {
      submit(input.value);
      return;
    }

    if (input.value.trim() === queryParam) return;

    typedQuery = null;
    input.value = queryParam;
    setHasValue(!!queryParam);
  };

  const onClear = () => {
    typedQuery = "";
    setHasValue(false);

    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }

    // Очистка — действие однозначное, паузы ей не нужно.
    submit("");
  };

  return (
    <S.Form role="search" onSubmit={(event) => event.preventDefault()}>
      <S.IconSlot aria-hidden="true">
        <Search size={18} />
      </S.IconSlot>

      <S.Input
        ref={inputRef}
        type="search"
        defaultValue={initialValue}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        placeholder="Поиск: Mutlu, 60Ah"
        aria-label="Поиск по названию аккумулятора"
        $hasValue={hasValue}
      />

      {hasValue && (
        <S.Clear type="button" onClick={onClear} aria-label="Очистить поиск">
          <X size={16} aria-hidden="true" />
        </S.Clear>
      )}
    </S.Form>
  );
};
