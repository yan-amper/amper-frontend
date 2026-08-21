"use client";

import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
`;

export const Caption = styled.span`
  font-size: 0.8125rem;
  color: var(--text-muted);
`;

export const Chip = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.5rem 0.35rem 0.75rem;
  border: 1px solid var(--color-brand-border);
  border-radius: var(--radius-pill);
  background: var(--color-brand-soft);
  color: var(--color-brand);
  font-size: 0.8125rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition:
    background var(--transition),
    border-color var(--transition);

  &:hover {
    background: var(--color-brand-soft-hover);
    border-color: var(--color-brand);
  }

  svg {
    flex-shrink: 0;
    opacity: 0.7;
  }

  &:hover svg {
    opacity: 1;
  }
`;

export const ChipLabel = styled.span`
  color: var(--text-muted);
  font-weight: 400;
`;

export const ResetAll = styled.button`
  padding: 0.35rem 0.5rem;
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 0.8125rem;
  font-family: inherit;
  text-decoration: underline;
  cursor: pointer;
  transition: color var(--transition);

  &:hover {
    color: var(--color-brand);
  }
`;
