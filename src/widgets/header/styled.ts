"use client";

import Image from "next/image";
import Link from "next/link";
import styled, { css } from "styled-components";
import { media } from "@/shared";

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  /* Высота задаётся токеном, а не суммой паддингов: от неё зависит
     padding-top у <main> и scroll-margin якорей. */
  height: var(--header-h);
  background: var(--surface);
  box-shadow: var(--shadow-sm);
  z-index: 200;
  border-bottom: 1px solid var(--color-brand);
`;

export const HeaderContent = styled.div`
  max-width: var(--container);
  height: 100%;
  margin: 0 auto;
  padding: 0 var(--container-pad);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  /* When a modal locks page scroll, the real scrollbar disappears and this
     fixed-position header's 100%-wide box grows to fill the reclaimed space,
     nudging this centered content sideways. Shift it back by half that width. */
  transform: translateX(calc(var(--scrollbar-width, 0px) / -2));
`;

export const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

export const Logo = styled(Image)`
  /* Пропорции берутся из самого SVG (109.6 × 42.2). Раньше стояло 150×75,
     и логотип болтался в боксе с 9px пустоты сверху и снизу — из-за этого
     шапка была 108px при реальной высоте картинки 58px. */
  width: 114px;
  height: auto;

  ${media.md} {
    width: 96px;
  }
`;

/* ---------- Десктопная навигация ---------- */

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.75rem;
  margin-right: auto;
  margin-left: 2rem;

  ${media.md} {
    display: none;
  }

  ${media.nav} {
    gap: 1.25rem;
    margin-left: 1.25rem;
  }
`;

export const NavLink = styled(Link)`
  position: relative;
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 0.95rem;
  text-decoration: none;
  padding: 0.25rem 0;
  transition: color var(--transition);

  /* Подчёркивание растёт из центра — даёт нужную обратную связь без сдвига
     соседей (border-bottom менял бы высоту строки). */
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -2px;
    height: 2px;
    background: var(--color-brand);
    transform: scaleX(0);
    transition: transform var(--transition);
  }

  &:hover {
    color: var(--color-brand);
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-shrink: 0;

  ${media.md} {
    gap: 0.75rem;
  }
`;

export const PhoneContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-brand);
  flex-shrink: 0;
`;

export const PhoneText = styled.a`
  font-weight: 600;
  color: var(--text-primary);
  text-decoration: none;
  white-space: nowrap;
  transition: color var(--transition);

  &:hover {
    color: var(--color-brand);
  }

  ${media.sm} {
    font-size: 0.875rem;
  }

  /* Только на совсем узких экранах (уже 360px) номер не влезает рядом
     с бургером — там остаётся иконка-ссылка, она всё так же звонит по тапу.
     На 375/390 (iPhone SE/13/14) номер помещается и остаётся видимым:
     это самый ценный элемент шапки. */
  ${media.xxs} {
    display: none;
  }
`;

export const BatterySelectionButtonContainer = styled.div`
  ${media.md} {
    display: none;
  }
`;

/* ---------- Мобильная навигация ---------- */

export const BurgerButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  /* 44px — минимальная комфортная зона нажатия пальцем */
  width: 44px;
  height: 44px;
  margin-right: -0.5rem;
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  color: var(--text-primary);
  cursor: pointer;
  transition: background var(--transition);

  &:hover {
    background: var(--surface-sunken);
  }

  ${media.md} {
    display: flex;
  }
`;

export const MobileOverlay = styled.div<{ $open: boolean }>`
  display: none;

  ${media.md} {
    display: block;
    position: fixed;
    inset: var(--header-h) 0 0 0;
    background: rgba(17, 24, 39, 0.5);
    z-index: 190;
    transition: opacity var(--transition);

    ${({ $open }) =>
      !$open &&
      css`
        opacity: 0;
        /* visibility, а не только pointer-events: иначе ссылки внутри
           остаются в таб-порядке и фокус проваливается в невидимое меню */
        visibility: hidden;
      `}
  }
`;

export const MobileMenu = styled.div<{ $open: boolean }>`
  display: none;

  ${media.md} {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    position: fixed;
    top: var(--header-h);
    left: 0;
    right: 0;
    max-height: calc(100dvh - var(--header-h));
    overflow-y: auto;
    padding: 0.75rem var(--container-pad) 1.25rem;
    background: var(--surface);
    border-bottom: 1px solid var(--border-default);
    box-shadow: var(--shadow-lg);
    z-index: 195;
    transition:
      transform var(--transition),
      opacity var(--transition),
      visibility var(--transition);

    ${({ $open }) =>
      !$open &&
      css`
        opacity: 0;
        visibility: hidden;
        transform: translateY(-0.75rem);
      `}
  }
`;

export const MobileLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 0.5rem;
  color: var(--text-primary);
  font-size: 1.0625rem;
  font-weight: 500;
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: background var(--transition);

  svg {
    color: var(--color-brand);
    flex-shrink: 0;
  }

  &:hover {
    background: var(--color-brand-soft);
  }
`;

export const MobileDivider = styled.div`
  height: 1px;
  margin: 0.5rem 0;
  background: var(--border-default);
`;

export const MobilePhone = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 0.5rem;
  color: var(--text-primary);
  font-size: 1.125rem;
  font-weight: 700;
  text-decoration: none;
  border-radius: var(--radius-md);

  svg {
    color: var(--color-brand);
    flex-shrink: 0;
  }

  &:hover {
    background: var(--color-brand-soft);
  }
`;

export const MobileHours = styled.p`
  padding: 0 0.5rem;
  color: var(--text-muted);
  font-size: 0.875rem;
`;

export const MobileCta = styled.div`
  margin-top: 0.75rem;

  button {
    width: 100%;
    height: 52px;
    font-size: 1rem;
    border-radius: var(--radius-md);
  }
`;
