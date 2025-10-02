"use client";

import * as S from "./styled";
import { useEffect, useRef, useState } from "react";

export type Option = { value: string; label: string };

type MultiSelectProps = {
  title: string;
  value?: string;
  options: Option[];
  placeholder: string;
  onChange(value: string): void;
};

export const MultiSelect = ({
  title,
  value,
  options,
  placeholder,
  onChange,
}: MultiSelectProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setOpen(!open);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const el = ref.current;
      if (el && el.contains(event.target as Node)) return;
      setOpen(false);
    };

    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, setOpen]);

  const onOptionClick = (value: string) => {
    onChange(value);
    toggleOpen();
  };

  return (
    <S.FilterGroup ref={ref}>
      <S.FilterLabel>{title}</S.FilterLabel>

      <S.SelectGroup>
        <S.Select onClick={toggleOpen}>
          {value || placeholder}
          <S.ArrowDown $open={open} />
        </S.Select>

        <S.OptionsContainer $open={open} onBlur={toggleOpen}>
          {options.map((option) => (
            <S.Option
              key={option.value}
              onClick={() => onOptionClick(option.value)}
            >
              {option.label}
            </S.Option>
          ))}
        </S.OptionsContainer>
      </S.SelectGroup>
    </S.FilterGroup>
  );
};
