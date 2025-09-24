import styled from "styled-components";

export const FiltersContainer = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  top: 7rem;

  @media (max-width: 1024px) {
    position: static;
    padding: 1rem;
  }

  @media (max-width: 1024px) and (min-width: 769px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    align-items: start;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FiltersTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #dc2626;

  @media (max-width: 1024px) and (min-width: 769px) {
    grid-column: 1 / -1;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;

  @media (max-width: 1024px) and (min-width: 769px) {
    grid-column: 1 / -1;
    flex-direction: row;
    justify-content: center;
    padding-top: 0.75rem;
    margin-top: 0.5rem;
  }
`;

export const ResetButton = styled.button`
  background: transparent;
  color: #6b7280;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f9fafb;
    color: #374151;
    border-color: #9ca3af;
  }

  @media (max-width: 1024px) and (min-width: 769px) {
    padding: 0.5rem 1.5rem;
    flex: 0 0 auto;
  }
`;
