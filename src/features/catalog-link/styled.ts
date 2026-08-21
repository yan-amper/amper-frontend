"use client";

import Link from "next/link";
import styled from "styled-components";
import { media } from "@/shared";

export const CatalogLinkStyled = styled.div`
  text-align: center;
  margin-top: 2.5rem;
`;

export const ViewAllButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: var(--color-brand);
  color: var(--text-on-brand);
  padding: 0.875rem 1.75rem;
  border-radius: var(--radius-md);
  text-decoration: none;
  font-weight: 600;
  transition:
    background var(--transition),
    transform var(--transition),
    box-shadow var(--transition);

  &:hover {
    background: var(--color-brand-hover);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  &:active {
    transform: translateY(0);
  }

  ${media.sm} {
    width: 100%;
  }
`;
