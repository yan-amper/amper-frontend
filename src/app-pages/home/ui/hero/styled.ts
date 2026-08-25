"use client";

import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { BatterySelectionButton } from "@/features";
import { media } from "@/shared";

/**
 * Первый экран: слева текст и кнопки, справа фото магазина, уходящее
 * в правый край окна.
 *
 * isolation: isolate — из-за слогана: он накладывается режимом multiply,
 * и без изолированного контекста смешивался бы не с фоном секции,
 * а со всем, что окажется под ней.
 */
export const Section = styled.section`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  /* Фото выходит за контейнер в правый край секции, но не в край монитора:
     на широких экранах без потолка оно отрывалось от сетки страницы
     и уезжало правее всех остальных секций страницы.
     Потолок — ровно ширина контейнера: правый край фотографии встаёт
     на ту же вертикаль, что и край шапки, плашек и карточек.
     Промежуточные значения (пробовал 1600) на широких мониторах всё
     равно читались как «съехало»: вылет в полторы сотни пикселей
     выглядит не приёмом, а ошибкой вёрстки. */
  /* width обязателен: <main> — флекс-колонка, а auto-поля по бокам
     отменяют растяжку по поперечной оси, и секция схлопывается
     до ширины содержимого. */
  width: 100%;
  max-width: var(--container);
  margin: 0 auto;
  background: linear-gradient(
    120deg,
    var(--surface) 0%,
    var(--surface) 45%,
    var(--surface-muted) 100%
  );

  ${media.lg} {
    /* Порядок задаётся флексом: фото стоит в разметке последним,
       а показывается первым. */
    display: flex;
    flex-direction: column;
    background: var(--surface);
  }
`;

/** Схемные дорожки — тот же мотив, что в логотипе. Чистая декорация. */
export const Traces = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 22rem;
  height: auto;
  z-index: 0;
  stroke: var(--color-brand-border);
  stroke-width: 2;
  stroke-linecap: round;
  fill: none;
  opacity: 0.7;
  pointer-events: none;

  circle {
    fill: var(--surface);
  }

  ${media.lg} {
    display: none;
  }
`;

export const Container = styled.div`
  position: relative;
  z-index: 1;
  max-width: var(--container);
  margin: 0 auto;
  padding: 4.5rem var(--container-pad);

  ${media.lg} {
    padding: 2rem var(--container-pad) 2.5rem;
  }

  ${media.sm} {
    padding: 1.5rem var(--container-pad) 2rem;
  }
`;

export const Content = styled.div`
  /* Текст не должен доезжать до фото: правая колонка занята картинкой,
     которая позиционируется абсолютно и о потоке ничего не знает. */
  max-width: 44%;

  ${media.lg} {
    max-width: none;
  }
`;

export const Title = styled.h1`
  font-size: 3.25rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin-bottom: 1.25rem;

  ${media.lg} {
    font-size: 2.5rem;
  }

  ${media.sm} {
    font-size: 1.75rem;
    margin-bottom: 0.75rem;
  }
`;

export const Accent = styled.span`
  color: var(--color-brand);
`;

export const Lead = styled.p`
  font-size: 1.0625rem;
  color: var(--text-secondary);
  max-width: 40ch;

  ${media.sm} {
    font-size: 0.9375rem;
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  /* Отступ до текста выше жил на слогане, который стоял между ними.
     Слоган убрали — кнопки прилипли к фразе. */
  margin-top: 2rem;

  ${media.sm} {
    margin-top: 1.5rem;
    flex-direction: column;
    align-items: stretch;
    gap: 0.625rem;
  }
`;

export const PrimaryAction = styled(BatterySelectionButton)`
  height: 56px;
  padding: 0 1.75rem;
  font-size: 1rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-brand);

  ${media.sm} {
    /* На телефоне главный CTA занимает всю ширину — по нему проще попасть,
       и он читается как основное действие экрана. */
    width: 100%;
    height: 52px;
  }
`;

export const SecondaryAction = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 56px;
  padding: 0 1.5rem;
  border-radius: var(--radius-lg);
  border: 1.5px solid var(--color-brand);
  background: var(--surface);
  color: var(--color-brand);
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition:
    background var(--transition),
    transform var(--transition);

  &:hover {
    background: var(--color-brand-soft);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  ${media.sm} {
    width: 100%;
    height: 52px;
  }
`;

export const Meta = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem 1.25rem;
  margin-top: 1.75rem;

  ${media.sm} {
    gap: 0.5rem;
    margin-top: 1.25rem;
  }
`;

export const MetaItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  font-size: 0.9375rem;

  svg {
    flex-shrink: 0;
    color: var(--color-brand);
  }

  /* Разделитель между адресом и режимом работы — только когда они
     стоят в одну строку. */
  & + &::before {
    content: "";
    width: 1px;
    height: 1.125rem;
    margin-right: 0.75rem;
    background: var(--border-strong);
  }

  ${media.sm} {
    font-size: 0.875rem;

    & + &::before {
      display: none;
    }
  }
`;

export const Photo = styled.div`
  position: absolute;
  top: 0;
  /* Не 0, а внутреннее поле контейнера: правый край фотографии встаёт
     на ту же вертикаль, что и правый край плашек и карточек ниже.
     С нулём фото выходило за них на 16px — мелочь, но заметная,
     потому что весь остальной контент строго по одной линии. */
  right: var(--container-pad);
  bottom: 0;
  width: 56%;
  z-index: 0;

  /* Мягкая граница вместо жёсткого края: фото растворяется в фоне,
     а не приклеено к тексту прямоугольником. Накладка градиентом,
     а не mask-image: маска на этом блоке молча не применялась. */
  &::before {
    content: "";
    position: absolute;
    inset: 0 auto 0 0;
    width: 42%;
    z-index: 1;
    /* Направление строго по ширине блока (to right), а не под углом:
       у наклонного градиента длина оси больше ширины, прозрачности
       он достигал уже за краем накладки — и на стыке был виден шов. */
    background: linear-gradient(
      to right,
      var(--surface) 0%,
      rgba(255, 255, 255, 0.72) 32%,
      rgba(255, 255, 255, 0) 100%
    );
    pointer-events: none;
  }

  /* На планшете и телефоне фото занимает верх секции во всю ширину,
     но не обрывается прямой линией: низ уходит в белый, и заголовок
     начинается прямо из этой растушёвки. Раскладка «текст слева,
     фото справа» на 390px не живёт — от кадра остаётся огрызок
     шириной 170px, в котором не читается ни вывеска, ни здание. */
  ${media.lg} {
    /* relative, а не static: снизу лежит собственная растушёвка,
       и ей нужен этот блок как система координат. */
    position: relative;
    top: auto;
    right: auto;
    bottom: auto;
    width: auto;
    order: -1;
    margin-bottom: -2.5rem;

    &::before {
      display: none;
    }

    &::after {
      content: "";
      position: absolute;
      inset: auto 0 0 0;
      height: 45%;
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.7) 55%,
        var(--surface) 100%
      );
      pointer-events: none;
    }
  }
`;

export const PhotoImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Кадр смещён к вывеске: при узкой колонке в первую очередь должно быть
     видно название центра, а не соседний павильон справа. */
  object-position: 32% center;

  ${media.lg} {
    height: auto;
    aspect-ratio: 16 / 9;
    max-height: 18rem;
  }

  ${media.sm} {
    max-height: 13rem;
  }
`;
