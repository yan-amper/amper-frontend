"use client";

import Image from "next/image";
import styled, { css } from "styled-components";
import { media } from "@/shared";

export const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(17, 24, 39, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 1000;
  transition:
    opacity var(--transition-slow),
    visibility var(--transition-slow);

  ${({ $isOpen }) =>
    !$isOpen &&
    css`
      opacity: 0;
      /* Раньше здесь было только pointer-events: none. Оно не убирает
         элементы из таб-порядка — пользователь на любой странице
         проваливался табом внутрь невидимой модалки. */
      visibility: hidden;
    `}
`;

export const ModalContent = styled.div<{ $isOpen: boolean }>`
  position: relative;
  background: var(--surface);
  border-radius: var(--radius-xl);
  max-width: 800px;
  width: 100%;
  max-height: 90dvh;
  box-shadow: var(--shadow-xl);
  overflow: hidden;
  transform: scale(0.96) translateY(10px);
  opacity: 0;
  transition:
    opacity var(--transition-slow),
    transform var(--transition-slow);

  &:focus {
    outline: none;
  }

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      opacity: 1;
      transform: scale(1) translateY(0);
    `}

  ${media.md} {
    max-height: 88dvh;
  }
`;

/* Крестик всегда в одном месте — в правом верхнем углу окна.
   Раньше на десктопе он стоял в строке заголовка, а на мобиле
   перепрыгивал в absolute: две разные модели поведения. */
export const CloseButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 2;
  background: var(--surface-sunken);
  border: none;
  border-radius: var(--radius-pill);
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  flex-shrink: 0;
  cursor: pointer;
  transition:
    background var(--transition),
    color var(--transition);

  &:hover {
    background: var(--color-brand-soft);
    color: var(--color-brand);
  }
`;

export const ModalBody = styled.div<{ $isLoading: boolean }>`
  ${({ $isLoading }) =>
    $isLoading
      ? css`
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
        `
      : css`
          display: grid;
          grid-template-columns: 1fr 1fr;
        `}

  gap: 1.5rem;
  padding: 1.75rem;
  max-height: 90dvh;
  overflow-y: auto;
  overflow-x: hidden;
  align-items: start;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--border-strong);
    border-radius: var(--radius-pill);
  }

  ${media.md} {
    grid-template-columns: 1fr;
    gap: 1.25rem;
    padding: 1.25rem;
    max-height: 88dvh;
  }
`;

export const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  /* Оставляем место крестику, чтобы он не лёг поверх картинки */
  padding-top: 1.5rem;

  ${media.md} {
    padding-top: 2rem;
  }
`;

export const ImageFrame = styled.div`
  width: 100%;
  aspect-ratio: 1;
  padding: 1.25rem;
  background: var(--surface-muted);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);

  ${media.md} {
    max-width: 260px;
    margin: 0 auto;
  }
`;

export const BatteryImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const BatteryTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  /* Место под крестик в правом верхнем углу */
  padding-right: 2.5rem;

  ${media.md} {
    font-size: 1.125rem;
    padding-right: 0;
  }
`;

export const SpecsContainer = styled.dl`
  display: flex;
  flex-direction: column;
`;

export const SpecItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.75rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--border-subtle);

  &:last-child {
    border-bottom: none;
  }
`;

export const SpecLabel = styled.dt`
  font-weight: 500;
  color: var(--text-muted);
  font-size: 0.875rem;
`;

export const SpecValue = styled.dd`
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.875rem;
  text-align: end;
`;

export const PriceSection = styled.div`
  background: var(--color-brand-soft);
  padding: 0.875rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-brand-border);
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
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
  font-size: 0.875rem;
`;

export const OriginalPrice = styled.span`
  font-size: 1rem;
  color: var(--text-muted);
  text-decoration: line-through;
`;

export const CurrentPrice = styled.span`
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--color-brand);
`;

export const SavingsAmount = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-success);
`;

export const ContactSection = styled.div`
  background: var(--surface-muted);
  padding: 0.875rem;
  border-radius: var(--radius-lg);
  text-align: center;
  border: 1px solid var(--border-default);
`;

export const ContactText = styled.p`
  color: var(--text-muted);
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
`;

export const PhoneLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--color-brand);
  color: var(--text-on-brand);
  padding: 0.625rem 1.25rem;
  border-radius: var(--radius-md);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition:
    background var(--transition),
    transform var(--transition);

  &:hover {
    background: var(--color-brand-hover);
    transform: translateY(-1px);
  }
`;

export const LoadingTitle = styled.p`
  text-align: center;
  color: var(--text-muted);
`;
