"use client";

import Image from "next/image";
import styled, { css } from "styled-components";
import { media } from "@/shared";

export const SliderContainer = styled.section`
  width: 100%;
  max-width: var(--container);
  position: relative;
  overflow: hidden;
  margin: 1.5rem auto 0;
  border-radius: var(--radius-lg);

  ${media.sm} {
    /* На телефоне баннер идёт «в край»: скруглять нечего, полоса белого
       по бокам только съедала бы ширину картинки. */
    margin-top: 0;
    border-radius: 0;
  }
`;

export const SlideWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: var(--surface-dark);
  /* Горизонтальный свайп перехватываем сами, вертикальный скролл страницы
     оставляем браузеру. */
  touch-action: pan-y;
`;

export const Slide = styled.div<{ $isActive: boolean }>`
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.6s ease;
  pointer-events: none;

  ${({ $isActive }) =>
    $isActive &&
    css`
      opacity: 1;
      pointer-events: auto;
    `}
`;

export const SlideImage = styled(Image)`
  object-fit: cover;
`;

export const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  /* 44px — минимальная зона нажатия пальцем. Раньше было 40px. */
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(4px);
  color: var(--text-primary);
  border-radius: var(--radius-pill);
  border: none;
  cursor: pointer;
  box-shadow: var(--shadow-md);
  transition:
    background var(--transition),
    transform var(--transition);
  z-index: 2;

  /* Раньше здесь был transition на background-color без единого hover —
     кнопки вообще никак не реагировали на наведение. */
  &:hover {
    background: var(--surface);
    transform: translateY(-50%) scale(1.06);
  }

  &:active {
    transform: translateY(-50%) scale(0.96);
  }

  ${media.sm} {
    width: 40px;
    height: 40px;
  }
`;

export const PrevButton = styled(NavigationButton)`
  left: 1rem;

  ${media.sm} {
    left: 0.5rem;
  }
`;

export const NextButton = styled(NavigationButton)`
  right: 1rem;

  ${media.sm} {
    right: 0.5rem;
  }
`;

export const DotsContainer = styled.div`
  position: absolute;
  bottom: 0.25rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  z-index: 2;
`;

/* Кнопка занимает 44×44 для пальца, а видимая точка рисуется через ::before —
   раньше точка была 12px и по ней постоянно промахивались. */
export const Dot = styled.button<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;

  &::before {
    content: "";
    display: block;
    height: 0.625rem;
    border-radius: var(--radius-pill);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);
    transition:
      width var(--transition),
      background var(--transition);
    width: ${({ $isActive }) => ($isActive ? "1.75rem" : "0.625rem")};
    background: ${({ $isActive }) =>
      $isActive ? "var(--color-brand)" : "rgba(255, 255, 255, 0.75)"};
  }

  &:hover::before {
    background: ${({ $isActive }) =>
      $isActive ? "var(--color-brand)" : "var(--surface)"};
  }
`;
