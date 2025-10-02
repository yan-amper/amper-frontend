"use client";

import styled from "styled-components";

export const CatalogLinkStyled = styled.div`
  text-align: center;
`;

export const ViewAllButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #dc2626;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  margin: 2rem auto 0;
  transition: all 0.2s;

  &:hover {
    background: #b91c1c;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
`;
