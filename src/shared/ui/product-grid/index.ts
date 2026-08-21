"use client";

import styled from "styled-components";
import { media } from "../../styles/breakpoints";

/**
 * Единая сетка карточек товара.
 *
 * Раньше главная раскладывала карточки через flex с `flex: 0 1 340px`
 * (на 1248px влезало три штуки, и по краям оставалось ~180px пустоты),
 * а каталог — через grid auto-fill (четыре во всю ширину).
 * Одни и те же карточки жили в двух разных плотностях.
 *
 * auto-fit, а не auto-fill: пустые дорожки схлопываются, поэтому неполный
 * ряд занимает всю ширину, а не оставляет дыру справа.
 *
 * Внимание: число колонок в repeat(auto-fit, minmax(a, b)) считается по `b`,
 * если `b` — фиксированная длина. Поэтому максимум обязан быть 1fr, иначе
 * при minmax(280px, 400px) на 1248px получается три колонки вместо четырёх.
 * Ширину одиночной карточки ограничиваем на самой карточке (см. ProductCard).
 */
export const ProductGrid = styled.div`
  display: grid;
  /* 260px, а не 280: в каталоге колонка товаров ровно 888px, и при минимуме
     280 три дорожки (280*3 + 48 гэпов = 888) попадали ровно в границу —
     субпиксельное округление роняло сетку до двух колонок. */
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  justify-items: center;
  gap: 1.5rem;
  /* Карточки тянутся на высоту ряда: сама карточка — колоночный flex
     с margin-top: auto у блока цены, поэтому цена и кнопка прижимаются
     к низу и выравниваются между соседями. */
  align-items: stretch;

  ${media.md} {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1rem;
  }

  ${media.xs} {
    grid-template-columns: 1fr;
  }
`;
