"use client";

import styled from "styled-components";
import { media } from "@/shared";

export const ProductsContainer = styled.div`
  min-height: 70vh;
  background: var(--surface);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);

  ${media.sm} {
    padding: 1rem;
  }
`;

export const ProductsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  /* gap раньше не было: на телефоне заголовок и счётчик слипались */
  gap: 0.35rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--color-brand);

  ${media.md} {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

export const ProductsTitle = styled.h1`
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--text-primary);
`;

export const ProductsCount = styled.p`
  font-size: 0.875rem;
  color: var(--text-muted);
  white-space: nowrap;
`;

export const NoResults = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 3rem 1rem;
  color: var(--text-muted);
`;

export const NoResultsIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  margin-bottom: 1.25rem;
  border-radius: var(--radius-pill);
  background: var(--color-brand-soft);
  border: 1px solid var(--color-brand-border);
  color: var(--color-brand);
`;

export const NoResultsTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
`;

export const NoResultsText = styled.p`
  font-size: 0.875rem;
  max-width: 44ch;
  margin: 0 0 1.5rem;
`;

export const NoResultsAction = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 44px;
  padding: 0.625rem 1.5rem;
  border: none;
  border-radius: var(--radius-md);
  background: var(--color-brand);
  color: var(--text-on-brand);
  font-family: inherit;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition:
    background var(--transition),
    transform var(--transition);

  &:hover {
    background: var(--color-brand-hover);
    transform: translateY(-1px);
  }
`;
