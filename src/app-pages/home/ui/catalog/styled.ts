"use client";

import Link from "next/link";
import styled, { css } from "styled-components";
import { media } from "@/shared";

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

export const CatalogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  /* На узких телефонах две колонки оставляли под подпись ~72px:
     «130-230 Ач» переносилось в три строки. */
  ${media.xs} {
    grid-template-columns: 1fr;
  }
`;

export const CategoryCard = styled(Link)<{
  $visible?: boolean;
  $delay?: number;
}>`
  background: var(--surface);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  text-decoration: none;
  cursor: pointer;
  display: block;
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
`;

export const CategoryContent = styled.div`
  padding: 2rem 1rem;
  text-align: center;

  ${media.sm} {
    padding: 1.5rem 0.75rem;
  }
`;

export const CategoryIcon = styled.div`
  width: 3rem;
  height: 3rem;
  background: var(--color-brand-soft);
  border: 1px solid var(--color-brand-border);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-brand);
  margin: 0 auto 1rem;
  transition:
    background var(--transition),
    border-color var(--transition);

  ${CategoryCard}:hover & {
    background: var(--color-brand-accent);
    border-color: var(--color-brand-accent);
  }
`;

export const CategoryTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  transition: color var(--transition);
  white-space: nowrap;

  ${CategoryCard}:hover & {
    color: var(--color-brand);
  }
`;

export const CategoryHint = styled.span`
  display: block;
  margin-top: 0.25rem;
  font-size: 0.8125rem;
  font-weight: 400;
  line-height: 1.35;
  color: var(--text-muted);
  /* Заголовок держим в одну строку, а подпись переносим свободно —
     иначе «внедорожники, микроавтобусы» вылезает за плитку. */
  white-space: normal;
`;
