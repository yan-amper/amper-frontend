"use client";

import Link from "next/link";
import styled from "styled-components";
import { HOME_SECTION_LIMIT, media, ProductGrid } from "@/shared";

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
  /* Десктоп — ровно один ряд из четырёх карточек. Всё, что грузится сверх
     этого, живёт только в мобильной ленте: пятая карточка ушла бы во
     второй ряд одна и смотрелась бы как ошибка. */
  ${media.mdUp} {
    > *:nth-child(n + ${HOME_SECTION_LIMIT + 1}) {
      display: none;
    }
  }

  ${media.md} {
    /* grid-template-columns из ProductGrid перебиваем на дорожки по 42%:
       две карточки в экран и край третьей за ними. Этот выглядывающий
       кусок — единственное, что сообщает, что ленту можно листать:
       ровно две карточки в ширину экрана читались как обычная сетка,
       и до прокрутки никто не догадывался. */
    grid-template-columns: none;
    grid-auto-flow: column;
    grid-auto-columns: 42%;
    overflow-x: auto;
    /* hidden обязателен и задан явно.
       В CSS пара «одна ось auto, другая visible» невозможна: visible
       превращается в auto. То есть лента становилась прокручиваемой и
       по вертикали — на пару десятков пикселей, которые давало
       появление карточек (они выезжают снизу вверх). Отсюда два бага
       сразу: ленту можно было дёрнуть вверх-вниз, и, что хуже,
       вертикальный свайп пальцем по секции уходил в неё, а не в
       страницу — пролистать сайт, ведя пальцем по аккумуляторам,
       было невозможно. С hidden вертикальные жесты передаются
       странице, как и должны. */
    overflow-y: hidden;
    overscroll-behavior-x: contain;
    scroll-snap-type: x mandatory;
    /* Запас снизу — под тень и под те самые 18px, с которых карточка
       начинает своё появление: теперь по вертикали ничего не
       прокручивается, и всё, что не влезло, было бы срезано. */
    padding: 0.5rem 0 1.75rem;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    > * {
      scroll-snap-align: start;
    }
  }
`;

export const ScrollTrack = styled.div`
  height: 3px;
  margin-top: 1rem;
  border-radius: var(--radius-pill);
  background: var(--border-default);
  overflow: hidden;
`;

export const ScrollThumb = styled.div`
  height: 100%;
  border-radius: var(--radius-pill);
  background: var(--color-brand);
`;
