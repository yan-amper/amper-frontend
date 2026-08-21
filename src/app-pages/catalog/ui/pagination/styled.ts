"use client";

import Link from "next/link";
import styled, { css } from "styled-components";

const buttonBase = css`
  display: flex;
  align-items: center;
  justify-content: center;
  /* 44×44 — комфортная зона нажатия пальцем (было 40px) */
  min-width: 2.75rem;
  height: 2.75rem;
  padding: 0 0.5rem;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
`;

export const PaginationNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  margin-top: 2.5rem;
  flex-wrap: wrap;
`;

export const PageButton = styled(Link)<{ $active?: boolean }>`
  ${buttonBase}
  border: 1px solid
    ${({ $active }) => ($active ? "var(--color-brand)" : "var(--border-default)")};
  background: ${({ $active }) =>
    $active ? "var(--color-brand)" : "var(--surface)"};
  color: ${({ $active }) =>
    $active ? "var(--text-on-brand)" : "var(--text-secondary)"};
  transition:
    border-color var(--transition),
    background var(--transition),
    color var(--transition);

  &:hover {
    border-color: var(--color-brand);
    background: ${({ $active }) =>
      $active ? "var(--color-brand-hover)" : "var(--color-brand-soft)"};
    color: ${({ $active }) => ($active ? "var(--text-on-brand)" : "var(--color-brand)")};
  }
`;

export const PageButtonDisabled = styled.span`
  ${buttonBase}
  border: 1px solid var(--border-default);
  color: var(--border-strong);
  cursor: not-allowed;
`;

export const Ellipsis = styled.span`
  ${buttonBase}
  color: var(--text-subtle);
  min-width: 1.5rem;
  padding: 0;
`;
