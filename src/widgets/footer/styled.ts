"use client";

import Link from "next/link";
import styled from "styled-components";

export const FooterStyled = styled.footer`
  background: #111827;
  color: #9ca3af;
  padding: 3rem 0 1.5rem;
`;

export const FooterContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 1fr 1.2fr 1fr;
  gap: 2rem;
  padding-bottom: 2.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    row-gap: 2rem;
  }

  @media (max-width: 550px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

export const FooterBrandCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 550px) {
    align-items: center;
  }
`;

export const FooterLogo = styled.div`
  display: flex;
  align-items: center;
`;

export const FooterTagline = styled.p`
  font-size: 0.875rem;
  line-height: 1.6;
  margin: 0;
  max-width: 30ch;
`;

export const FooterColTitle = styled.h3`
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 1.1rem;
`;

export const FooterLinks = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

export const FooterLink = styled(Link)`
  color: #9ca3af;
  font-size: 0.925rem;
  text-decoration: none;
  transition: color 0.2s;
  width: fit-content;

  &:hover {
    color: white;
  }

  @media (max-width: 550px) {
    width: auto;
    margin: 0 auto;
  }
`;

export const FooterButtonLink = styled.div`
  button {
    background: none;
    border: none;
    padding: 0;
    color: #9ca3af;
    font-size: 0.925rem;
    font-weight: 400;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      background: none;
      color: white;
      transform: none;
      box-shadow: none;
    }
  }
`;

export const FooterContacts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  font-size: 0.925rem;
`;

export const FooterContactRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  color: #9ca3af;

  svg {
    flex-shrink: 0;
    margin-top: 0.15rem;
    color: #dc2626;
  }

  @media (max-width: 550px) {
    justify-content: center;
  }
`;

export const FooterPhone = styled.a`
  color: white;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #f87171;
  }
`;

export const FooterMessengers = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const MessengerLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  color: #9ca3af;
  text-decoration: none;
  font-size: 0.925rem;
  transition: color 0.2s;

  img {
    border-radius: 0.375rem;
  }

  &:hover {
    color: white;
  }

  @media (max-width: 550px) {
    justify-content: center;
  }
`;

export const FooterBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid #dc2626;

  @media (max-width: 550px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const FooterCopyright = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: #6b7280;
`;

export const FooterLegalLink = styled.span`
  font-size: 0.85rem;
  color: #6b7280;
`;
