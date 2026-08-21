import styled, { css } from "styled-components";
import { media } from "@/shared";

export const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(17, 24, 39, 0.7);
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
  background: var(--surface);
  border-radius: var(--radius-xl);
  max-width: 700px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: var(--shadow-xl);

  ${media.md} {
    width: 95%;
    max-height: 80vh;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--surface-sunken);
  border: none;
  border-radius: var(--radius-pill);
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition);
  z-index: 10;

  &:hover {
    background: var(--border-default);
    transform: scale(1.1);
  }
`;

export const ModalHeader = styled.div`
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid var(--border-default);
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-primary);
  margin: 0;
`;

export const StatusBadge = styled.span<{ $color: string }>`
  background: ${(props) => props.$color};
  color: var(--text-on-brand);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-xl);
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
    color: var(--text-primary);
    margin: 0 0 1rem 0;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--color-brand);
  }
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;

  ${media.md} {
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
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const InfoValue = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-primary);
  white-space: pre-line;
`;

export const EditableSection = styled.div`
  background: var(--surface-muted);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  border: 1px solid var(--border-default);
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
  color: var(--text-secondary);
  font-size: 0.875rem;
`;

export const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  background: var(--surface);
  cursor: pointer;
  transition: all var(--transition);

  &:focus {
    outline: none;
    border-color: var(--color-brand);
    box-shadow: 0 0 0 3px var(--focus-ring-color);
  }

  &:hover {
    border-color: var(--text-subtle);
  }
`;

export const Textarea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  transition: all var(--transition);

  &:focus {
    outline: none;
    border-color: var(--color-brand);
    box-shadow: 0 0 0 3px var(--focus-ring-color);
  }

  &::placeholder {
    color: var(--text-subtle);
  }
`;

export const SaveButton = styled.button<{ $disabled: boolean }>`
  background: var(--color-brand);
  color: var(--text-on-brand);
  padding: 0.875rem 1.5rem;
  border-radius: var(--radius-md);
  border: none;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all var(--transition);
  margin-top: 1rem;
  align-self: flex-start;

  &:hover {
    background: var(--color-brand-hover);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  &:active {
    transform: translateY(0);
  }

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}
`;

export const SendMessage = styled.span<{ $isError: boolean }>`
  color: ${({ $isError }) => ($isError ? "var(--color-danger-border)" : "green")};
  font-size: 0.75rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const BatterySelectionSection = styled.div`
  background: var(--color-info-soft);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  border: 1px solid var(--color-info-border);
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  margin-bottom: 1rem;
  transition: all var(--transition);

  &:focus {
    outline: none;
    border-color: var(--color-brand);
    box-shadow: 0 0 0 3px var(--focus-ring-color);
  }

  &::placeholder {
    color: var(--text-subtle);
  }
`;

export const BatteryList = styled.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  background: var(--surface);
  margin-bottom: 1rem;
`;

export const BatteryItem = styled.div<{ $isSelected: boolean }>`
  padding: 0.75rem;
  cursor: pointer;
  border-bottom: 1px solid var(--surface-sunken);
  background: ${(props) => (props.$isSelected ? "var(--color-brand-soft)" : "var(--text-on-brand)")};
  color: ${(props) => (props.$isSelected ? "var(--color-brand)" : "var(--text-secondary)")};
  font-weight: ${(props) => (props.$isSelected ? "600" : "400")};
  transition: all var(--transition);

  &:hover {
    background: var(--surface-muted);
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
  background: var(--color-brand);
  color: var(--text-on-brand);
  padding: 0.375rem 0.75rem;
  border-radius: var(--radius-xl);
  font-size: 0.75rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

export const RemoveBatteryButton = styled.button`
  background: none;
  border: none;
  color: var(--text-on-brand);
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  border-radius: var(--radius-pill);
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export const NoBatteriesMessage = styled.div`
  text-align: center;
  color: var(--text-muted);
  font-size: 0.875rem;
  padding: 2rem;
  font-style: italic;
`;

export const BatteriesAlreadyPicked = styled.h4`
  color: var(--color-brand);
`;
