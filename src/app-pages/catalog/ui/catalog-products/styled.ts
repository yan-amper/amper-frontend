"use client";

import styled from "styled-components";

export const ProductsContainer = styled.div`
  min-height: 70vh;
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
`;

export const ProductsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #dc2626;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ProductsTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  color: #111827;
  text-align: center;
`;

export const ProductsCount = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
`;

export const NoResults = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #6b7280;
`;

export const NoResultsTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
`;

export const NoResultsText = styled.p`
  font-size: 0.875rem;
  margin: 0;
`;
