import { ChevronDown } from "lucide-react";
import styled, { css } from "styled-components";

export const FilterGroup = styled.div`
  margin-bottom: 1rem;

  &:last-of-type {
    margin-bottom: 2rem;
  }

  @media (max-width: 1024px) and (min-width: 769px) {
    margin-bottom: 1rem;

    &:last-of-type {
      margin-bottom: 1rem;
    }
  }
`;

export const FilterLabel = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
`;

export const SelectGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
`;

export const Select = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: #374151;
  background: white;
  cursor: pointer;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #dc2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }

  &:hover {
    border-color: #9ca3af;
  }
`;

export const ArrowDown = styled(ChevronDown)<{ $open: boolean }>`
  transition: transform 0.2s;

  ${({ $open }) =>
    $open &&
    css`
      transform: rotate(180deg);
    `}
`;

export const OptionsContainer = styled.div<{ $open: boolean }>`
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: white;
  position: absolute;
  display: flex;
  flex-direction: column;
  transition: opacity 0.2s;
  top: 52px;
  z-index: 10;
  border: 1px solid black;
  border-radius: 4px;

  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #e60000;
    border-radius: 5px;
  }

  ${({ $open }) =>
    !$open &&
    css`
      opacity: 0;
      pointer-events: none;
    `}
`;

export const Option = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  font-size: 0.875rem;
  color: #374151;
  cursor: pointer;
  position: relative;
  top: -1px;
`;
