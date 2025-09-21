"use client";

import Image from "next/image";
import styled from "styled-components";

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

export const ContentGrid = styled.div`
  display: grid;
  gap: 2rem;
  align-items: start;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const MapContainer = styled.div`
  aspect-ratio: 16/9;
  background: #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const StoreImage = styled(Image)`
  width: 100%;
  height: 16rem;
  object-fit: cover;
  border-radius: 0.5rem;
`;

export const ContactCard = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

export const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ContactIcon = styled.div`
  color: #dc2626;
  margin-top: 0.25rem;
  flex-shrink: 0;
`;

export const ContactContent = styled.div``;

export const ContactTitle = styled.h3`
  font-weight: bold;
  color: #111827;
  margin-bottom: 0.25rem;
`;

export const ContactText = styled.a`
  color: #6b7280;
  margin: 0;
`;

export const WorkingHours = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 1rem;

  p {
    margin: 0.25rem 0;
  }

  strong {
    color: #111827;
  }
`;
