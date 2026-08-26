"use client";

import styled, { css } from "styled-components";
import { media } from "@/shared";

export const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;

  ${media.sm} {
    margin-bottom: 1rem;
  }
`;

export const Field = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
`;

export const IconSlot = styled.span`
  position: absolute;
  left: 0.875rem;
  display: flex;
  align-items: center;
  color: var(--text-subtle);
  pointer-events: none;

  /* На узких телефонах лупа съедает те пиксели, из-за которых подсказка
     не помещается. Лупа при этом есть на кнопке рядом. */
  ${media.xs} {
    display: none;
  }
`;

export const Input = styled.input<{ $hasValue?: boolean }>`
  width: 100%;
  /* 44px — минимальная площадь для пальца; на телефоне поле не должно
     быть мельче кнопок фильтров. */
  height: 46px;
  /* Место справа резервируем только под существующий крестик: пустому
     полю оно ни к чему, а подсказке эти 28 пикселей на телефоне
     решают, обрывается она или нет. */
  padding: 0 ${({ $hasValue }) => ($hasValue ? "2.75rem" : "1rem")} 0 2.75rem;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  background: var(--surface);
  color: var(--text-primary);
  font-family: inherit;
  font-size: 0.9375rem;
  transition:
    border-color var(--transition),
    box-shadow var(--transition);

  &::placeholder {
    color: var(--text-subtle);
  }

  /* Родной крестик Safari и Chrome в type="search" — свой у нас уже есть,
     два подряд выглядят как ошибка. Префикс обязателен: без него
     WebKit продолжает рисовать свою кнопку рядом с нашей. */
  &::-webkit-search-cancel-button,
  &::-webkit-search-decoration,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    -webkit-appearance: none;
    appearance: none;
    display: none;
  }

  &:focus {
    outline: none;
    border-color: var(--color-brand);
    box-shadow: var(--focus-ring);
  }

  ${({ $hasValue }) =>
    $hasValue &&
    css`
      border-color: var(--color-brand-border);
    `}

  ${media.sm} {
    height: 44px;
    font-size: 1rem; /* меньше 16px — iOS зумит страницу при фокусе */
  }

  ${media.xs} {
    padding-left: 1rem;
  }
`;

export const Clear = styled.button`
  position: absolute;
  right: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: var(--radius-pill);
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  transition:
    background var(--transition),
    color var(--transition);

  &:hover {
    background: var(--surface-sunken);
    color: var(--text-primary);
  }
`;

export const Submit = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-shrink: 0;
  height: 46px;
  padding: 0 1.25rem;
  border: none;
  border-radius: var(--radius-md);
  background: var(--color-brand);
  color: var(--text-on-brand);
  font-family: inherit;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background var(--transition),
    transform var(--transition);

  &:hover {
    background: var(--color-brand-hover);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  ${media.sm} {
    height: 44px;
    padding: 0 1rem;
  }

  /* На узких телефонах поле важнее подписи: остаётся квадратная кнопка
     с лупой, текст уходит. Порог 400, а не 340: именно подпись «Найти»
     отъедала у поля те 60 пикселей, на которых подсказка обрывалась. */
  ${media.xs} {
    width: 44px;
    padding: 0;
  }
`;

export const SubmitLabel = styled.span`
  ${media.xs} {
    display: none;
  }
`;
