import styled from "styled-components";

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
`;

export const Select = styled.select`
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