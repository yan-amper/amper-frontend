"use client";

import Link from "next/link";
import styled from "styled-components";
import { media } from "@/shared";

export const FooterStyled = styled.footer`
  background: var(--surface-dark);
  color: var(--text-on-dark-muted);
  padding: 3rem 0 1.5rem;
`;

export const FooterContent = styled.div`
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 var(--container-pad);
`;

export const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 1fr 1.2fr 1fr;
  gap: 2rem;
  padding-bottom: 2.5rem;

  ${media.lg} {
    grid-template-columns: 1fr 1fr;
    row-gap: 2rem;
  }

  ${media.sm} {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

export const FooterBrandCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${media.sm} {
    align-items: center;
  }
`;

export const FooterLogo = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 130px;
    height: auto;
  }
`;

export const FooterTagline = styled.p`
  font-size: 0.875rem;
  line-height: 1.6;
  margin: 0;
  max-width: 30ch;
`;

export const FooterColTitle = styled.h2`
  color: var(--text-on-dark);
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
  color: var(--text-on-dark-muted);
  font-size: 0.925rem;
  text-decoration: none;
  transition: color var(--transition);
  width: fit-content;

  &:hover {
    color: var(--text-on-dark);
  }

  ${media.sm} {
    width: auto;
    margin: 0 auto;
  }
`;

export const FooterButtonLink = styled.div`
  button {
    background: none;
    border: none;
    padding: 0;
    color: var(--text-on-dark-muted);
    font-size: 0.925rem;
    font-weight: 400;
    cursor: pointer;
    transition: color var(--transition);

    &:hover {
      background: none;
      color: var(--text-on-dark);
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
  color: var(--text-on-dark-muted);

  svg {
    flex-shrink: 0;
    margin-top: 0.15rem;
    color: var(--color-brand-on-dark);
  }

  ${media.sm} {
    justify-content: center;
  }
`;

export const FooterPhone = styled.a`
  color: var(--text-on-dark);
  font-weight: 600;
  text-decoration: none;
  transition: color var(--transition);

  &:hover {
    color: var(--color-brand-on-dark);
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
  color: var(--text-on-dark-muted);
  text-decoration: none;
  font-size: 0.925rem;
  transition: color var(--transition);

  img {
    border-radius: var(--radius-sm);
  }

  &:hover {
    color: var(--text-on-dark);
  }

  ${media.sm} {
    justify-content: center;
  }
`;

export const FooterBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-brand);

  ${media.sm} {
    flex-direction: column;
    text-align: center;
  }
`;

export const FooterCopyright = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: var(--text-on-dark-subtle);
`;

export const FooterLegalLink = styled(Link)`
  font-size: 0.85rem;
  color: var(--text-on-dark-subtle);
  text-decoration: none;
  transition: color var(--transition);

  &:hover {
    color: var(--text-on-dark-muted);
  }
`;
