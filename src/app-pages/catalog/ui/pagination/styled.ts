"use client";

import Link from "next/link";
import styled, { css } from "styled-components";

const buttonBase = css`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2.5rem;
  height: 2.5rem;
  padding: 0 0.5rem;
  border-radius: 0.5rem;
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
  border: 1px solid ${({ $active }) => ($active ? "#dc2626" : "#e5e7eb")};
  background: ${({ $active }) => ($active ? "#dc2626" : "white")};
  color: ${({ $active }) => ($active ? "white" : "#374151")};
  transition: all 0.2s;

  &:hover {
    border-color: #dc2626;
    color: ${({ $active }) => ($active ? "white" : "#dc2626")};
  }
`;

export const PageButtonDisabled = styled.span`
  ${buttonBase}
  border: 1px solid #e5e7eb;
  color: #d1d5db;
  cursor: not-allowed;
`;

export const Ellipsis = styled.span`
  ${buttonBase}
  color: #9ca3af;
  min-width: 1.5rem;
  padding: 0;
`;
