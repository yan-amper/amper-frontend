"use client";

import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { media } from "@/shared";

export const ContentContainer = styled.div`
  flex: 1;
  padding: 2rem 0;
  background: var(--surface-muted);

  ${media.sm} {
    padding: 1.25rem 0;
  }
`;

export const Breadcrumbs = styled.nav`
  max-width: var(--container);
  margin: 0 auto 1.25rem;
  padding: 0 var(--container-pad);
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  color: var(--text-subtle);

  ${media.sm} {
    margin-bottom: 1rem;
    font-size: 0.8125rem;
  }
`;

export const Crumb = styled(Link)`
  color: var(--text-muted);
  text-decoration: none;
  transition: color var(--transition);

  &:hover {
    color: var(--color-brand);
    text-decoration: underline;
  }
`;

/**
 * Последняя крошка — название товара. На телефоне оно длинное
 * («Аккумулятор Black Batteries 60Ah (L2) (о.п)») и в одну строку с
 * предыдущими крошками не помещается, поэтому обрезаем многоточием,
 * а не переносим: перенос ломал строку крошек пополам.
 */
export const CrumbCurrent = styled.span`
  color: var(--text-primary);
  font-weight: 500;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Card = styled.article`
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 var(--container-pad);
  display: grid;
  grid-template-columns: minmax(0, 420px) minmax(0, 1fr);
  gap: 2.5rem;
  align-items: start;

  ${media.lg} {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: var(--surface);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  box-shadow: var(--shadow-sm);

  ${media.lg} {
    max-width: 420px;
    width: 100%;
    margin: 0 auto;
  }
`;

export const BatteryImage = styled(Image)`
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  object-fit: contain;
`;

/** Та же фирменная планка, что на карточках каталога и в модалке. */
export const BrandBar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: var(--color-brand);
  }
`;

export const BrandLogo = styled(Image)`
  width: auto;
  height: 1.5rem;
`;

export const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  text-wrap: balance;

  ${media.md} {
    font-size: 1.375rem;
  }
`;

export const SpecsContainer = styled.dl`
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: 0.25rem 1rem;
  margin: 0;
`;

export const SpecItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.75rem;
  padding: 0.625rem 0;
  border-bottom: 1px solid var(--border-subtle);

  &:last-child {
    border-bottom: none;
  }
`;

export const SpecLabel = styled.dt`
  font-weight: 500;
  color: var(--text-muted);
  font-size: 0.9375rem;
`;

export const SpecValue = styled.dd`
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.9375rem;
  text-align: end;
  margin: 0;
`;

export const PriceSection = styled.div`
  background: var(--color-brand-soft);
  padding: 1rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-brand-border);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.75rem;
`;

export const PriceLabel = styled.span`
  font-weight: 500;
  color: var(--text-muted);
  font-size: 0.9375rem;
`;

export const OriginalPrice = styled.span`
  font-size: 1.0625rem;
  color: var(--text-muted);
  text-decoration: line-through;
`;

export const CurrentPrice = styled.span`
  font-size: 1.625rem;
  font-weight: 700;
  color: var(--color-brand);
`;

export const SavingsAmount = styled.span`
  font-size: 1.0625rem;
  font-weight: 600;
  color: var(--color-success);
`;

export const PriceNote = styled.p`
  margin: 0;
  font-size: 0.8125rem;
  color: var(--text-muted);
`;

export const ContactSection = styled.div`
  background: var(--surface);
  padding: 1rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-default);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

export const ContactText = styled.p`
  color: var(--text-muted);
  margin: 0;
  font-size: 0.9375rem;
`;

export const PhoneLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--color-brand);
  color: var(--text-on-brand);
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-md);
  text-decoration: none;
  font-weight: 600;
  transition:
    background var(--transition),
    transform var(--transition);

  &:hover {
    background: var(--color-brand-hover);
    transform: translateY(-1px);
  }
`;

export const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.9375rem;
  transition: color var(--transition);

  &:hover {
    color: var(--color-brand);
  }
`;
