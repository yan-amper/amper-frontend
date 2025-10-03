import Image from "next/image";
import styled, { css } from "styled-components";

export const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      opacity: 1;
    `}
`;

export const ModalContent = styled.div`
  position: relative;
  background: white;
  border-radius: 1rem;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  height: auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;

  @media (max-width: 768px) {
    width: 95%;
    max-height: 95vh;
  }
`;

export const CloseButton = styled.button`
  background: #f3f4f6;
  border: none;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #e5e7eb;
  }

  @media (max-width: 768px) {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
`;

export const ModalBody = styled.div<{ $isLoading: boolean }>`
  ${({ $isLoading }) =>
    $isLoading
      ? css`
          display: flex;
          justify-content: center;
          align-items: center;
        `
      : css`
          display: grid;
          grid-template-columns: 1fr 1fr;
        `}

  gap: 1rem;
  padding: 1rem;
  max-height: calc(90vh - 2rem);
  overflow-y: auto;
  overflow-x: hidden;
  align-items: start;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #e60000;
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
    padding: 0.75rem;
    max-height: calc(95vh - 1.5rem);
  }
`;

export const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const BatteryImage = styled(Image)`
  object-fit: contain;
  border: 3px solid #dc2626;
  border-radius: 10px;

  @media (max-width: 768px) {
    max-width: 275px;
  }
`;

export const CardLogo = styled(Image)`
  width: 100px;
  height: 50px;
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  padding: 4px;
`;
export const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  height: auto;
  max-height: 100%;
  overflow: hidden;
  justify-content: space-between;
`;

export const BatteryTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
`;

export const BatteryTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  color: #111827;
  margin: 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

export const SpecsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SpecItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.375rem 0;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }
`;

export const SpecLabel = styled.span`
  font-weight: 500;
  color: #6b7280;
  font-size: 0.875rem;
`;

export const SpecValue = styled.span`
  font-weight: 600;
  color: #111827;
  font-size: 0.875rem;
`;

export const PriceSection = styled.div`
  background: #fef2f2;
  padding: 0.75rem;
  border-radius: 0.75rem;
  border: 1px solid #fecaca;
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

export const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PriceLabel = styled.span`
  font-weight: 500;
  color: #6b7280;
`;

export const OriginalPrice = styled.span`
  font-size: 1rem;
  color: #6b7280;
  text-decoration: line-through;
`;

export const CurrentPrice = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  color: #dc2626;
`;

export const SavingsAmount = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: #059669;
`;

export const ContactSection = styled.div`
  background: #f9fafb;
  padding: 0.75rem;
  border-radius: 0.75rem;
  text-align: center;
  border: 1px solid #e5e7eb;
`;

export const ContactText = styled.p`
  color: #6b7280;
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
`;

export const PhoneLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #dc2626;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s;

  &:hover {
    background: #b91c1c;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
`;

export const LoadingTitle = styled.h2`
  text-align: center;
`;
