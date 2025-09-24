"use client";

import styled from "styled-components";

export const ContentContainer = styled.div`
  flex: 1;
  margin-top: 5rem;
  padding: 2rem 0;
  background: #f9fafb;
`;

export const MainContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;
