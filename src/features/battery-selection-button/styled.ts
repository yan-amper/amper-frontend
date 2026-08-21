"use client";

import styled from "styled-components";

export const SelectionButton = styled.button`
  background: var(--color-brand);
  color: var(--text-on-brand);
  padding: 0.625rem 1.5rem;
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  transition:
    background var(--transition),
    transform var(--transition),
    box-shadow var(--transition);
  font-weight: 600;
  font-size: 0.875rem;
  white-space: nowrap;

  &:hover {
    background: var(--color-brand-hover);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  &:active {
    transform: translateY(0);
  }
`;
