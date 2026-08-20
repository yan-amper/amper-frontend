"use client";

import Link from "next/link";
import styled, { css } from "styled-components";

export const Section = styled.section`
  padding: 4rem 0;
  background: white;
`;

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 1rem;
`;

export const SectionDivider = styled.div`
  width: 5rem;
  height: 0.25rem;
  background: #dc2626;
  margin: 0 auto;
`;

export const CatalogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const CategoryCard = styled(Link)<{
  $visible?: boolean;
  $delay?: number;
}>`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0px 10px 20px 0px rgba(8, 9, 9, 0.2);
  text-decoration: none;
  cursor: pointer;
  display: block;
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 0.5s ease,
    transform 0.5s ease,
    box-shadow 0.3s,
    background 0.3s;
  transition-delay: ${({ $delay = 0 }) => $delay * 60}ms;

  ${({ $visible }) =>
    $visible &&
    css`
      opacity: 1;
      transform: translateY(0);
    `}

  &:hover {
    box-shadow: 0px 10px 20px 8px rgba(8, 9, 9, 0.2);
    background: #fef2f2;
  }
`;

export const CategoryContent = styled.div`
  padding: 2rem;
  text-align: center;
`;

export const CategoryIcon = styled.div`
  width: 3rem;
  height: 3rem;
  background: #fecaca;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  transition: background-color 0.3s;

  ${CategoryCard}:hover & {
    background: #fca5a5;
  }
`;

export const CategoryTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: bold;
  color: #111827;
  transition: color 0.3s;

  ${CategoryCard}:hover & {
    color: #dc2626;
  }
`;
