import styled, { css } from "styled-components";

export const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  ${({ $isOpen }) =>
    !$isOpen &&
    css`
      display: none;
      pointer-events: none;
    `}
`;

export const ModalContent = styled.div`
  position: relative;
  background: white;
  border-radius: 1rem;
  max-width: 700px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  @media (max-width: 768px) {
    width: 95%;
    max-height: 80vh;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #f3f4f6;
  border: none;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 10;

  &:hover {
    background: #e5e7eb;
    transform: scale(1.1);
  }
`;

export const ModalHeader = styled.div`
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #111827;
  margin: 0;
`;

export const StatusBadge = styled.span<{ $color: string }>`
  background: ${(props) => props.$color};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const ModalBody = styled.div`
  padding: 1.5rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const InfoSection = styled.div`
  h3 {
    font-size: 1.125rem;
    font-weight: bold;
    color: #111827;
    margin: 0 0 1rem 0;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #dc2626;
  }
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const InfoLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const InfoValue = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #111827;
  white-space: pre-line;
`;

export const EditableSection = styled.div`
  background: #f9fafb;
  border-radius: 0.75rem;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const Label = styled.label`
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
`;

export const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: white;
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #dc2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }

  &:hover {
    border-color: #9ca3af;
  }
`;

export const Textarea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #dc2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const SaveButton = styled.button`
  background: #dc2626;
  color: white;
  padding: 0.875rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 1rem;
  align-self: flex-start;

  &:hover {
    background: #b91c1c;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const BatterySelectionSection = styled.div`
  background: #f0f9ff;
  border-radius: 0.75rem;
  padding: 1.5rem;
  border: 1px solid #e0f2fe;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #dc2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const BatteryList = styled.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: white;
  margin-bottom: 1rem;
`;

export const BatteryItem = styled.div<{ $isSelected: boolean }>`
  padding: 0.75rem;
  cursor: pointer;
  border-bottom: 1px solid #f3f4f6;
  background: ${(props) => (props.$isSelected ? "#fef2f2" : "white")};
  color: ${(props) => (props.$isSelected ? "#dc2626" : "#374151")};
  font-weight: ${(props) => (props.$isSelected ? "600" : "400")};
  transition: all 0.2s;

  &:hover {
    background: #f9fafb;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const SelectedBatteriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const SelectedBatteryTag = styled.div`
  background: #dc2626;
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

export const RemoveBatteryButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export const NoBatteriesMessage = styled.div`
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
  padding: 2rem;
  font-style: italic;
`;
