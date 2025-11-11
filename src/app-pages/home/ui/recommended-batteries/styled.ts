"use client";

import Link from "next/link";
import styled from "styled-components";

export const Section = styled.section`
  padding: 4rem 0;
  background: #f9fafb;

  @media (max-width: 550px) {
    padding: 1rem 0;
  }
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

export const SectionTitle = styled(Link)`
  font-size: 1.875rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 1rem;
  text-decoration: none;
`;

export const SectionDivider = styled.div`
  width: 5rem;
  height: 0.25rem;
  background: #dc2626;
  margin: 0 auto;
`;

export const BatteriesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  justify-content: center;

  & > div {
    max-width: 400px;
  }
`;
