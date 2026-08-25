"use client";

import styled from "styled-components";
import { media } from "@/shared";

export const Section = styled.section`
  background: var(--surface-muted);
  padding: 3.5rem 0;

  ${media.sm} {
    padding: 2rem 0;
  }
`;

export const Container = styled.div`
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 var(--container-pad);
`;

export const Grid = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  /* 2×2 — как в макете. В одну колонку не сворачиваем даже на 320px:
     четыре плашки подряд превращают первый экран в простыню. */
  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
`;

export const Card = styled.li`
  background: var(--surface);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: 1.5rem;

  ${media.sm} {
    padding: 1rem;
  }
`;

export const CardIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  margin-bottom: 1rem;
  border-radius: var(--radius-md);
  background: var(--color-brand-soft);
  border: 1px solid var(--color-brand-border);
  color: var(--color-brand);

  ${media.sm} {
    width: 2.25rem;
    height: 2.25rem;
    margin-bottom: 0.75rem;
  }
`;

export const CardTitle = styled.h3`
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.375rem;

  ${media.sm} {
    font-size: 0.9375rem;
  }
`;

export const CardText = styled.p`
  font-size: 0.9375rem;
  line-height: 1.45;
  color: var(--text-muted);

  ${media.sm} {
    font-size: 0.8125rem;
  }
`;
