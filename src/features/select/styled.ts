"use client";

import { ChevronDown } from "lucide-react";
import styled, { css } from "styled-components";
import { media } from "@/shared";

export const FilterGroup = styled.div`
  margin-bottom: 1rem;

  &:last-of-type {
    margin-bottom: 1.5rem;
  }

  ${media.tablet} {
    margin-bottom: 1rem;

    &:last-of-type {
      margin-bottom: 1rem;
    }
  }
`;

export const FilterLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 0.4rem;
`;

export const SelectGroup = styled.div`
  position: relative;
`;

export const Trigger = styled.button<{ $active: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  /* 44px по высоте — комфортное попадание пальцем */
  min-height: 44px;
  padding: 0.5rem 0.75rem;
  border: 1px solid
    ${({ $active }) =>
      $active ? "var(--color-brand)" : "var(--border-strong)"};
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-family: inherit;
  text-align: left;
  color: ${({ $active }) => ($active ? "var(--text-primary)" : "var(--text-muted)")};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  background: ${({ $active }) => ($active ? "var(--color-brand-soft)" : "var(--surface)")};
  cursor: pointer;
  transition:
    border-color var(--transition),
    background var(--transition);

  &:hover {
    border-color: var(--color-brand);
  }
`;

export const TriggerText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TriggerIcons = styled.span`
  display: flex;
  align-items: center;
  gap: 0.125rem;
  flex-shrink: 0;
  color: var(--text-muted);
`;

/* Сброс одного фильтра. Раньше единственным способом снять фильтр была
   кнопка «Сбросить фильтры», которая обнуляла заодно и сортировку. */
export const ClearButton = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: var(--radius-pill);
  color: var(--text-muted);
  transition:
    background var(--transition),
    color var(--transition);

  &:hover {
    background: var(--color-brand-border);
    color: var(--color-brand-hover);
  }
`;

export const ArrowDown = styled(ChevronDown)<{ $open: boolean }>`
  flex-shrink: 0;
  transition: transform var(--transition);

  ${({ $open }) =>
    $open &&
    css`
      transform: rotate(180deg);
    `}
`;

export const OptionsContainer = styled.div<{ $open: boolean }>`
  width: 100%;
  max-height: 240px;
  overflow-y: auto;
  background: var(--surface);
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 0.25rem;
  /* Привязка к нижнему краю триггера вместо магических top: 52px —
     раньше между кнопкой и списком висел зазор в 14px, и список
     выглядел оторванным. */
  top: calc(100% + 4px);
  left: 0;
  z-index: 20;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  /* Тень нужна, чтобы список читался как всплывающий слой,
     а не как продолжение карточки. */
  box-shadow: var(--shadow-lg);
  transition:
    opacity var(--transition),
    transform var(--transition),
    visibility var(--transition);

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--border-strong);
    border-radius: var(--radius-pill);
  }

  &:hover::-webkit-scrollbar-thumb {
    background-color: var(--border-muted);
  }

  ${({ $open }) =>
    !$open &&
    css`
      opacity: 0;
      /* visibility, а не только pointer-events: иначе опции остаются
         в таб-порядке и фокус проваливается в закрытый список */
      visibility: hidden;
      transform: translateY(-4px);
    `}
`;

export const Option = styled.div<{ $selected: boolean; $active: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.625rem;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  /* Влево, а не по центру: центрированный список нечем сканировать глазом */
  text-align: left;
  cursor: pointer;
  transition:
    background var(--transition-fast),
    color var(--transition-fast);

  color: ${({ $selected }) =>
    $selected ? "var(--color-brand)" : "var(--text-secondary)"};
  font-weight: ${({ $selected }) => ($selected ? 600 : 400)};
  background: ${({ $active, $selected }) =>
    $active
      ? "var(--color-brand-soft)"
      : $selected
        ? "var(--color-brand-soft)"
        : "transparent"};

  /* Раньше у опций не было вообще никакого :hover — наведение
     не давало никакой обратной связи. */
  &:hover {
    background: var(--color-brand-soft);
    color: var(--color-brand);
  }

  svg {
    flex-shrink: 0;
  }
`;

export const StateMessage = styled.div`
  padding: 0.75rem 0.625rem;
  font-size: 0.8125rem;
  color: var(--text-muted);
  text-align: center;
`;
