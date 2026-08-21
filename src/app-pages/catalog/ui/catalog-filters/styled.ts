"use client";

import styled, { css } from "styled-components";
import { media } from "@/shared";

export const FiltersContainer = styled.aside`
  background: var(--surface);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  /* position: sticky вернулся: раньше здесь остался только top: 7rem без
     самого sticky — мёртвое свойство, а сайдбар уезжал вверх, и чтобы
     поменять фильтр приходилось скроллить обратно к началу списка. */
  position: sticky;
  top: calc(var(--header-h) + 1.5rem);
  max-height: calc(100dvh - var(--header-h) - 3rem);
  overflow-y: auto;

  ${media.lg} {
    position: static;
    max-height: none;
    overflow: visible;
    padding: 1rem;
  }

  ${media.tablet} {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    align-items: start;
  }

  ${media.md} {
    grid-template-columns: 1fr;
  }
`;

export const FiltersHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--color-brand);

  ${media.tablet} {
    grid-column: 1 / -1;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
  }

  ${media.md} {
    margin-bottom: 0;
    padding-bottom: 0.75rem;
  }
`;

export const FiltersTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
`;

export const ActiveCount = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.5rem;
  height: 1.5rem;
  padding: 0 0.4rem;
  margin-left: 0.5rem;
  border-radius: var(--radius-pill);
  background: var(--color-brand);
  color: var(--text-on-brand);
  font-size: 0.75rem;
  font-weight: 700;
`;

/* На телефоне пять селектов подряд занимали ~450px вертикали до первого
   товара. Теперь панель свёрнута, и до товаров один экран. */
export const ToggleButton = styled.button`
  display: none;
  align-items: center;
  gap: 0.35rem;
  min-height: 44px;
  padding: 0 0.5rem;
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  color: var(--color-brand);
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;

  ${media.md} {
    display: inline-flex;
  }
`;

export const FiltersBody = styled.div<{ $collapsed: boolean }>`
  ${media.tablet} {
    display: contents;
  }

  ${media.md} {
    padding-top: 1rem;

    ${({ $collapsed }) =>
      $collapsed &&
      css`
        display: none;
      `}
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-default);

  ${media.tablet} {
    grid-column: 1 / -1;
    flex-direction: row;
    justify-content: center;
    padding-top: 0.75rem;
    margin-top: 0.5rem;
  }
`;

export const ResetButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  min-height: 44px;
  background: transparent;
  color: var(--text-muted);
  padding: 0.625rem 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-strong);
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition:
    background var(--transition),
    color var(--transition),
    border-color var(--transition);

  &:hover:not(:disabled) {
    background: var(--color-brand-soft);
    color: var(--color-brand);
    border-color: var(--color-brand-border);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${media.tablet} {
    flex: 0 0 auto;
    padding: 0.5rem 1.5rem;
  }
`;
