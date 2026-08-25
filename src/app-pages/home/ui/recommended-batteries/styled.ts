"use client";

import Link from "next/link";
import styled from "styled-components";
import { media, ProductGrid } from "@/shared";

export const Section = styled.section`
  padding: 4rem 0;
  background: var(--surface);

  ${media.sm} {
    padding: 2.5rem 0;
  }
`;

export const Container = styled.div`
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 var(--container-pad);
`;

export const HeadingLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  flex-shrink: 0;
  color: var(--color-brand);
  font-weight: 600;
  font-size: 0.9375rem;
  text-decoration: none;
  white-space: nowrap;
  transition: gap var(--transition);

  &:hover {
    gap: 0.625rem;
    text-decoration: underline;
  }

  ${media.sm} {
    font-size: 0.875rem;
  }
`;

/**
 * На десктопе — обычная сетка товаров, на планшете и телефоне — лента
 * с прокруткой по две карточки в экран.
 *
 * Слайдер сделан нативным scroll-snap, а не JS-каруселью: свайп, инерция,
 * клавиатура и скринридер работают из коробки, а стрелки и точки на
 * тач-экране всё равно никто не нажимает.
 */
export const Rail = styled(ProductGrid)`
  ${media.md} {
    /* grid-template-columns из ProductGrid перебиваем на дорожки по 50%:
       ровно две карточки в экран, третья выглядывает только при прокрутке. */
    grid-template-columns: none;
    grid-auto-flow: column;
    grid-auto-columns: calc(50% - 0.5rem);
    overflow-x: auto;
    overscroll-behavior-x: contain;
    scroll-snap-type: x mandatory;
    /* Тень и подъём карточки при появлении не должны срезаться
       контейнером с overflow. */
    padding: 0.25rem 0 0.75rem;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    > * {
      scroll-snap-align: start;
    }
  }
`;
