"use client";

import Link from "next/link";
import styled, { css, keyframes } from "styled-components";
import { media } from "@/shared";

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Section = styled.section`
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Отступ под шапку убран: его теперь даёт <main> через --header-h.
     Раньше здесь было calc(4rem + 100px) — та же магическая константа
     в четвёртом месте проекта. */
  padding: 4rem 1rem;
  background: var(--surface-muted);

  ${media.sm} {
    padding: 3rem 1rem;
  }
`;

export const Stripes = styled.div`
  position: absolute;
  inset: -20% -10% -20% auto;
  width: 60%;
  pointer-events: none;
  background: repeating-linear-gradient(
    -35deg,
    rgba(220, 38, 38, 0.07) 0px,
    rgba(220, 38, 38, 0.07) 3px,
    transparent 3px,
    transparent 34px
  );

  ${media.md} {
    width: 100%;
    inset: -20% -30% -20% auto;
  }
`;

export const Content = styled.div`
  position: relative;
  z-index: 1;
  max-width: 640px;
  text-align: center;
  animation: ${fadeUp} 0.5s ease both;
`;

export const IconBadge = styled.div`
  width: 88px;
  height: 88px;
  border-radius: var(--radius-pill);
  background: var(--color-brand-soft);
  border: 1px solid var(--color-brand-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-brand);
  margin: 0 auto 1.5rem;
`;

export const Code = styled.p`
  font-size: 6.5rem;
  line-height: 1;
  font-weight: 800;
  color: var(--color-brand);
  letter-spacing: -0.03em;
  margin-bottom: 0.75rem;

  ${media.sm} {
    font-size: 4.5rem;
  }
`;

export const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.75rem;

  ${media.sm} {
    font-size: 1.375rem;
  }
`;

export const Text = styled.p`
  color: var(--text-muted);
  font-size: 1rem;
  line-height: 1.6;
  max-width: 46ch;
  margin: 0 auto 2.25rem;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const buttonBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0.75rem 1.75rem;
  border-radius: var(--radius-md);
  font-weight: 600;
  text-decoration: none;
  transition:
    background var(--transition),
    transform var(--transition),
    box-shadow var(--transition);
`;

export const PrimaryButton = styled(Link)`
  ${buttonBase}
  background: var(--color-brand);
  color: var(--text-on-brand);

  &:hover {
    background: var(--color-brand-hover);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }
`;

export const SecondaryButton = styled(Link)`
  ${buttonBase}
  background: transparent;
  color: var(--color-brand);
  border: 1.5px solid var(--color-brand);

  &:hover {
    background: var(--color-brand-soft);
    transform: translateY(-1px);
  }
`;
