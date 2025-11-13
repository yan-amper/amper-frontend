import styled, { css } from "styled-components";

const disabledStyles = css`
  pointer-events: none;
  opacity: 0.4;
`;

export const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  transition: opacity 0.3s;
  ${(props) =>
    !props.$isOpen &&
    css`
      opacity: 0;
      pointer-events: none;
    `};
`;

export const ModalContent = styled.div`
  position: relative;
  background: white;
  border-radius: 1rem;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  @media (max-width: 768px) {
    width: 95%;
    max-height: 95vh;
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
  text-align: center;
  border-bottom: 1px solid #e5e7eb;
`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #111827;
  margin: 0 0 0.5rem 0;
`;

export const ModalSubtitle = styled.p`
  color: #6b7280;
  margin: 0;
  font-size: 0.875rem;
`;

export const ModalBody = styled.div`
  padding: 1.5rem 2rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
`;

export const Input = styled.input<{ $hasError?: boolean; $disabled: boolean }>`
  padding: 0.75rem;
  border: 1px solid ${(props) => (props.$hasError ? "#ef4444" : "#d1d5db")};
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.2s;
  background: white;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.$hasError ? "#ef4444" : "#dc2626")};
    box-shadow: 0 0 0 3px
      ${(props) =>
        props.$hasError ? "rgba(239, 68, 68, 0.1)" : "rgba(220, 38, 38, 0.1)"};
  }

  &::placeholder {
    color: #9ca3af;
  }

  ${({ $disabled }) => $disabled && disabledStyles}
`;

export const Select = styled.select<{
  $hasError?: boolean;
  $disabled: boolean;
}>`
  padding: 0.75rem;
  border: 1px solid ${(props) => (props.$hasError ? "#ef4444" : "#d1d5db")};
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: white;
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.$hasError ? "#ef4444" : "#dc2626")};
    box-shadow: 0 0 0 3px
      ${(props) =>
        props.$hasError ? "rgba(239, 68, 68, 0.1)" : "rgba(220, 38, 38, 0.1)"};
  }

  ${({ $disabled }) => $disabled && disabledStyles}
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const RadioOption = styled.label<{
  $hasError?: boolean;
  $disabled: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  border: 1px solid ${(props) => (props.$hasError ? "#ef4444" : "#d1d5db")};
  border-radius: 0.5rem;
  transition: all 0.2s;
  background: white;

  &:hover {
    border-color: #dc2626;
    background: #fef2f2;
  }

  input:checked + & {
    border-color: #dc2626;
    background: #fef2f2;
    color: #dc2626;
  }

  ${({ $disabled }) => $disabled && disabledStyles}
`;

export const RadioInput = styled.input`
  margin: 0;
  accent-color: #dc2626;
`;

export const RadioLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
`;

export const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

export const SubmitButton = styled.button`
  background: #dc2626;
  color: white;
  padding: 0.875rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 0.5rem;

  &:hover {
    background: #b91c1c;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const SuccessMessage = styled.div`
  text-align: center;
  padding: 2rem;
`;

export const SuccessIcon = styled.div`
  width: 4rem;
  height: 4rem;
  background: #10b981;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
`;

export const SuccessTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  color: #111827;
  margin: 0 0 0.5rem 0;
`;

export const SuccessText = styled.p`
  color: #6b7280;
  margin: 0 0 1rem 0;
  line-height: 1.5;
`;

export const PhoneNumber = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;
`;

export const PhoneLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
`;

export const PhoneLink = styled.a`
  font-size: 1.125rem;
  font-weight: bold;
  color: #dc2626;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    color: #b91c1c;
  }
`;

export const ChoiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem 0;
`;

export const ChoiceOption = styled.div`
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s;
  background: white;

  &:hover {
    border-color: #dc2626;
    background: #fef2f2;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
`;

export const ChoiceButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #dc2626;
  color: white;
  padding: 0.875rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.75rem;
  transition: all 0.2s;

  ${ChoiceOption}:hover & {
    background: #b91c1c;
  }
`;

export const ChoiceTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: bold;
  color: #111827;
  margin: 0 0 0.5rem 0;
  text-align: center;
`;

export const ChoiceDescription = styled.p`
  color: #6b7280;
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.5;
  text-align: center;
`;

export const BackButton = styled.button`
  background: transparent;
  color: #6b7280;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;

  &:hover {
    background: #f9fafb;
    color: #374151;
    border-color: #9ca3af;
  }
`;
