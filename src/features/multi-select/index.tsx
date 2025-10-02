"use client";

import * as S from "./styled";

export type Option = { value: string; label: string };

type MultiSelectProps = {
  title: string;
  value?: string;
  options: Option[];
  placeholder?: string;
  onChange(value: string): void;
};

export const MultiSelect = ({
  title,
  value = "",
  options,
  placeholder,
  onChange,
}: MultiSelectProps) => (
  <S.FilterGroup>
    <S.FilterLabel>{title}</S.FilterLabel>
    <S.SelectGroup>
      <S.Select value={value} onChange={(e) => onChange(e.currentTarget.value)}>
        {!!placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </S.Select>
    </S.SelectGroup>
  </S.FilterGroup>
);
