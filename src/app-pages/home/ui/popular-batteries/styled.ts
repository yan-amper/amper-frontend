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

export const FirstRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const SecondRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  max-width: 42rem;
  margin: 0 auto;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
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
  padding: 1rem;
`;

export const BatteryName = styled.h3`
  font-size: 1.125rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 0.5rem;
`;

export const BatteryCapacity = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.75rem;
`;

export const BatteryFooter = styled.div`
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
  font-size: 1.125rem;
  font-weight: bold;
  color: #dc2626;
`;
