"use client";

import styled from "styled-components";

export const Section = styled.section`
  padding: 4rem 0;
  background: #f9fafb;
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

export const BatteriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const BatteryCard = styled.div`
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
`;

export const BatteryImageContainer = styled.div`
  aspect-ratio: 1;
  overflow: hidden;
`;

export const BatteryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;

  ${BatteryCard}:hover & {
    transform: scale(1.05);
  }
`;

export const BatteryContent = styled.div`
  padding: 1.5rem;
`;

export const BatteryName = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 1rem;
`;

export const SpecsList = styled.div`
  margin-bottom: 1.5rem;
`;

export const SpecItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export const SpecLabel = styled.span`
  color: #6b7280;
`;

export const SpecValue = styled.span`
  font-weight: 500;
`;

export const PriceSection = styled.div`
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
`;

export const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PriceInfo = styled.div``;

export const OriginalPrice = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  text-decoration: line-through;
`;

export const CurrentPrice = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: #dc2626;
`;

export const PriceNote = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

export const BuyButton = styled.button`
  background: #dc2626;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background: #b91c1c;
  }
`;
