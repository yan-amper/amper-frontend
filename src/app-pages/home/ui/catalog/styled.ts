"use client";

import Link from "next/link";
import styled, { css } from "styled-components";
import { media } from "@/shared";

export const Section = styled.section`
  padding: 4rem 0;
  background: var(--surface-muted);

  ${media.sm} {
    padding: 2.5rem 0;
  }
`;

export const Container = styled.div`
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 var(--container-pad);
`;

export const CatalogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  /* Плитка теперь горизонтальная и без подписи, поэтому две колонки
     держатся до самых узких телефонов — в одну колонку список из шести
     ёмкостей растягивался на весь экран. */
  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
`;

export const CategoryCard = styled(Link)<{
  $visible?: boolean;
  $delay?: number;
}>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: var(--surface);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  text-decoration: none;
  cursor: pointer;
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 0.5s ease,
    transform 0.5s ease,
    box-shadow var(--transition),
    border-color var(--transition),
    background var(--transition);
  transition-delay: ${({ $delay = 0 }) => $delay * 45}ms;

  ${({ $visible }) =>
    $visible &&
    css`
      opacity: 1;
      transform: translateY(0);
    `}

  &:hover {
    box-shadow: var(--shadow-lg);
    border-color: var(--color-brand-border);
    background: var(--color-brand-soft);
    transform: translateY(-4px);
    transition-delay: 0ms;
  }

  ${media.sm} {
    gap: 0.75rem;
    padding: 0.875rem;
  }
`;

export const CategoryIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  background: var(--color-brand-soft);
  border: 1px solid var(--color-brand-border);
  border-radius: var(--radius-md);
  color: var(--color-brand);
  transition:
    background var(--transition),
    border-color var(--transition);

  ${CategoryCard}:hover & {
    background: var(--color-brand-accent);
    border-color: var(--color-brand-accent);
  }

  ${media.sm} {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

export const CategoryTitle = styled.span`
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  transition: color var(--transition);
  white-space: nowrap;

  ${CategoryCard}:hover & {
    color: var(--color-brand);
  }

  ${media.sm} {
    font-size: 1rem;
  }
`;

export const CtaPlate = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  margin-top: 1rem;
  padding: 1.25rem 1.5rem;
  text-align: left;
  background: var(--surface);
  border: 1.5px solid var(--color-brand-border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition:
    background var(--transition),
    border-color var(--transition),
    box-shadow var(--transition);

  &:hover {
    background: var(--color-brand-soft);
    border-color: var(--color-brand);
    box-shadow: var(--shadow-md);
  }

  ${media.sm} {
    gap: 0.75rem;
    padding: 0.875rem 1rem;
    margin-top: 0.75rem;
  }
`;

export const CtaIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  border-radius: var(--radius-md);
  background: var(--color-brand-soft);
  border: 1px solid var(--color-brand-border);
  color: var(--color-brand);

  ${media.sm} {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

export const CtaText = styled.span`
  display: block;
  flex: 1;
`;

export const CtaTitle = styled.span`
  display: block;
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--text-primary);

  ${media.sm} {
    font-size: 0.9375rem;
  }
`;

export const CtaSubtitle = styled.span`
  display: block;
  font-size: 0.9375rem;
  line-height: 1.4;
  color: var(--text-muted);

  ${media.sm} {
    font-size: 0.8125rem;
  }
`;

export const CtaArrow = styled.span`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: var(--color-brand);
  transition: transform var(--transition);

  ${CtaPlate}:hover & {
    transform: translateX(4px);
  }
`;
