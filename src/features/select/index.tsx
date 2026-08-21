"use client";

import * as S from "./styled";
import { Check, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

export type Option = { value: string; label: string };

type SelectProps = {
  title: string;
  value?: string;
  label?: string;
  options: Option[];
  placeholder: string;
  /** Опции ещё грузятся — показываем это вместо пустого белого прямоугольника. */
  loading?: boolean;
  onChange(value: string): void;
  /** Если передан — у выбранного значения появляется крестик сброса. */
  onClear?(): void;
};

export const Select = ({
  title,
  value,
  label,
  options,
  placeholder,
  loading = false,
  onChange,
  onClear,
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  // Подсветка при навигации стрелками — отдельно от выбранного значения.
  const [activeIndex, setActiveIndex] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const hasValue = !!value;
  const selectedIndex = options.findIndex((option) => option.value === value);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      const el = ref.current;
      if (el && el.contains(event.target as Node)) return;
      setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  // Держим подсвеченную опцию в зоне видимости при навигации с клавиатуры.
  useEffect(() => {
    if (!open || activeIndex < 0) return;
    const list = listRef.current;
    const item = list?.children[activeIndex] as HTMLElement | undefined;
    item?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  const openList = () => {
    setOpen(true);
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
  };

  const closeList = () => {
    setOpen(false);
    setActiveIndex(-1);
  };

  const selectOption = (optionValue: string) => {
    onChange(optionValue);
    closeList();
  };

  const handleClear = (event: React.MouseEvent) => {
    // Клик по крестику не должен заодно раскрывать список.
    event.stopPropagation();
    onClear?.();
    closeList();
  };

  /**
   * Раньше селект был набором div'ов: он не получал фокус, не открывался
   * с клавиатуры и не давал выбрать значение без мыши — весь блок фильтров
   * каталога был недоступен с клавиатуры.
   */
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      closeList();
      return;
    }

    if (event.key === "Tab") {
      closeList();
      return;
    }

    if (!open) {
      if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(event.key)) {
        event.preventDefault();
        openList();
      }
      return;
    }

    if (options.length === 0) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((prev) => (prev + 1) % options.length);
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((prev) => (prev - 1 + options.length) % options.length);
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (activeIndex >= 0 && options[activeIndex]) {
          selectOption(options[activeIndex].value);
        }
        break;
    }
  };

  return (
    <S.FilterGroup ref={ref}>
      <S.FilterLabel as="span" id={`${listId}-label`}>
        {title}
      </S.FilterLabel>

      <S.SelectGroup>
        <S.Trigger
          type="button"
          $active={hasValue}
          onClick={() => (open ? closeList() : openList())}
          onKeyDown={onKeyDown}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-labelledby={`${listId}-label`}
        >
          <S.TriggerText>{label || value || placeholder}</S.TriggerText>
          <S.TriggerIcons>
            {/* Не button и не role="button": элемент лежит ВНУТРИ кнопки-
                триггера, а вложенные интерактивные элементы — невалидная
                разметка. Для мыши это удобный сброс; для клавиатуры
                и скринридера тот же сброс доступен через чипсы активных
                фильтров над выдачей. */}
            {hasValue && onClear && (
              <S.ClearButton aria-hidden="true" onClick={handleClear}>
                <X size={16} />
              </S.ClearButton>
            )}
            <S.ArrowDown size={18} $open={open} aria-hidden="true" />
          </S.TriggerIcons>
        </S.Trigger>

        <S.OptionsContainer
          id={listId}
          ref={listRef}
          $open={open}
          role="listbox"
          aria-labelledby={`${listId}-label`}
        >
          {loading ? (
            <S.StateMessage>Загружаем варианты…</S.StateMessage>
          ) : options.length === 0 ? (
            <S.StateMessage>Нет доступных вариантов</S.StateMessage>
          ) : (
            options.map((option, index) => (
              <S.Option
                key={option.value}
                role="option"
                aria-selected={option.value === value}
                $selected={option.value === value}
                $active={index === activeIndex}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => selectOption(option.value)}
              >
                {option.label}
                {option.value === value && <Check size={16} />}
              </S.Option>
            ))
          )}
        </S.OptionsContainer>
      </S.SelectGroup>
    </S.FilterGroup>
  );
};
