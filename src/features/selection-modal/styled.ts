"use client";

import styled, { css } from "styled-components";
import { media } from "@/shared";

const disabledStyles = css`
  pointer-events: none;
  opacity: 0.5;
`;

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
      /* visibility обязательна: с одним pointer-events: none поля формы
         оставались в таб-порядке, и с клавиатуры можно было попасть
         в невидимую форму подбора с любой страницы сайта. */
      visibility: hidden;
    `};
`;

export const ModalContent = styled.div<{ $isOpen: boolean }>`
  position: relative;
  background: var(--surface);
  border-radius: var(--radius-xl);
  max-width: 520px;
  width: 100%;
  max-height: 90dvh;
  overflow-y: auto;
  box-shadow: var(--shadow-xl);
  transform: scale(0.96) translateY(10px);
  transition: transform var(--transition-slow);

  &:focus {
    outline: none;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--border-strong);
    border-radius: var(--radius-pill);
  }

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      transform: scale(1) translateY(0);
    `};

  ${media.md} {
    max-height: 88dvh;
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
  color: var(--text-secondary);
  cursor: pointer;
  transition:
    background var(--transition),
    color var(--transition);
  z-index: 10;

  &:hover {
    background: var(--color-brand-soft);
    color: var(--color-brand);
  }
`;

export const ModalHeader = styled.div`
  padding: 2rem 2rem 1rem;
  text-align: center;
  border-bottom: 1px solid var(--border-default);

  ${media.sm} {
    padding: 1.5rem 1.25rem 1rem;
  }
`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
  padding: 0 2rem;

  ${media.sm} {
    font-size: 1.25rem;
  }
`;

export const ModalSubtitle = styled.p`
  color: var(--text-muted);
  margin: 0;
  font-size: 0.875rem;
`;

export const ModalBody = styled.div`
  padding: 1.5rem 2rem 2rem;

  ${media.sm} {
    padding: 1.25rem 1.25rem 1.5rem;
  }
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
  color: var(--text-secondary);
  font-size: 0.875rem;
`;

export const Input = styled.input<{ $hasError?: boolean; $disabled: boolean }>`
  padding: 0.75rem;
  border: 1px solid
    ${({ $hasError }) =>
      $hasError ? "var(--color-danger-border)" : "var(--border-strong)"};
  border-radius: var(--radius-md);
  font-size: 0.9375rem;
  font-family: inherit;
  transition:
    border-color var(--transition),
    box-shadow var(--transition);
  background: var(--surface);

  &:focus {
    outline: none;
    border-color: ${({ $hasError }) =>
      $hasError ? "var(--color-danger-border)" : "var(--color-brand)"};
    box-shadow: ${({ $hasError }) =>
      $hasError ? "var(--focus-ring-danger)" : "var(--focus-ring)"};
  }

  &::placeholder {
    color: var(--text-subtle);
  }

  ${({ $disabled }) => $disabled && disabledStyles}
`;

export const Select = styled.select<{
  $hasError?: boolean;
  $disabled: boolean;
}>`
  padding: 0.75rem;
  border: 1px solid
    ${({ $hasError }) =>
      $hasError ? "var(--color-danger-border)" : "var(--border-strong)"};
  border-radius: var(--radius-md);
  font-size: 0.9375rem;
  font-family: inherit;
  background: var(--surface);
  cursor: pointer;
  transition:
    border-color var(--transition),
    box-shadow var(--transition);

  &:focus {
    outline: none;
    border-color: ${({ $hasError }) =>
      $hasError ? "var(--color-danger-border)" : "var(--color-brand)"};
    box-shadow: ${({ $hasError }) =>
      $hasError ? "var(--focus-ring-danger)" : "var(--focus-ring)"};
  }

  ${({ $disabled }) => $disabled && disabledStyles}
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 0.75rem;
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
  padding: 0.625rem 0.875rem;
  border: 1px solid
    ${({ $hasError }) =>
      $hasError ? "var(--color-danger-border)" : "var(--border-strong)"};
  border-radius: var(--radius-md);
  transition:
    border-color var(--transition),
    background var(--transition),
    color var(--transition);
  background: var(--surface);

  &:hover {
    border-color: var(--color-brand);
    background: var(--color-brand-soft);
  }

  /* Было "input:checked + &" — соседний селектор, хотя input лежит ВНУТРИ
     label. Правило не срабатывало никогда, и выбранный вариант ничем
     не отличался от невыбранного. */
  &:has(input:checked) {
    border-color: var(--color-brand);
    background: var(--color-brand-soft);
    color: var(--color-brand);
    font-weight: 600;
  }

  ${({ $disabled }) => $disabled && disabledStyles}
`;

export const RadioInput = styled.input`
  margin: 0;
  accent-color: var(--color-brand);
  cursor: pointer;
`;

export const RadioLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
`;

/* ---------- Согласие на обработку персональных данных ---------- */

export const ConsentRow = styled.label<{ $hasError?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  padding: 0.75rem;
  border: 1px solid
    ${({ $hasError }) =>
      $hasError ? "var(--color-danger-border)" : "var(--border-default)"};
  border-radius: var(--radius-md);
  background: var(--surface-muted);
  cursor: pointer;
  font-size: 0.8125rem;
  line-height: 1.45;
  color: var(--text-muted);
  transition: border-color var(--transition);

  &:hover {
    border-color: var(--border-muted);
  }

  a {
    color: var(--color-brand);
    text-decoration: underline;
  }
`;

export const ConsentCheckbox = styled.input`
  margin: 0.15rem 0 0;
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  accent-color: var(--color-brand);
  cursor: pointer;
`;

export const ErrorMessage = styled.span`
  color: var(--color-danger);
  font-size: 0.75rem;
  font-weight: 500;
  margin-top: 0.25rem;
`;

export const FormError = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid var(--color-danger-border);
  border-radius: var(--radius-md);
  background: var(--color-danger-soft);
  color: var(--color-danger);
  font-size: 0.875rem;
  margin: 0;
`;

export const SubmitButton = styled.button`
  background: var(--color-brand);
  color: var(--text-on-brand);
  padding: 0.875rem 1.5rem;
  border-radius: var(--radius-md);
  border: none;
  font-weight: 600;
  font-size: 0.9375rem;
  cursor: pointer;
  transition:
    background var(--transition),
    transform var(--transition),
    box-shadow var(--transition);
  margin-top: 0.5rem;

  &:hover:not(:disabled) {
    background: var(--color-brand-hover);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  &:disabled {
    background: var(--text-subtle);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const SuccessMessage = styled.div`
  text-align: center;
  padding: 2.5rem 2rem;

  ${media.sm} {
    padding: 2rem 1.25rem;
  }
`;

export const SuccessIcon = styled.div`
  width: 4rem;
  height: 4rem;
  background: var(--color-success);
  border-radius: var(--radius-pill);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: var(--text-on-brand);
`;

export const SuccessTitle = styled.h2`
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
`;

export const SuccessText = styled.p`
  color: var(--text-muted);
  margin: 0 0 1.25rem 0;
  line-height: 1.5;
`;

export const PhoneNumber = styled.div`
  background: var(--color-brand-soft);
  border: 1px solid var(--color-brand-border);
  border-radius: var(--radius-md);
  padding: 1rem;
  text-align: center;
`;

export const PhoneLabel = styled.div`
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
`;

export const PhoneLink = styled.a`
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-brand);
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    color: var(--color-brand-hover);
  }
`;

export const ChoiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem 0;
`;

/* Кнопка, а не div: вариант выбора должен быть доступен с клавиатуры
   и объявляться скринридером как интерактивный элемент. */
export const ChoiceOption = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  font-family: inherit;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  cursor: pointer;
  transition:
    border-color var(--transition),
    background var(--transition),
    transform var(--transition),
    box-shadow var(--transition);
  background: var(--surface);

  &:hover {
    border-color: var(--color-brand);
    background: var(--color-brand-soft);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ChoiceButton = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-brand);
  color: var(--text-on-brand);
  padding: 0.875rem 1.5rem;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.75rem;
  transition: background var(--transition);

  ${ChoiceOption}:hover & {
    background: var(--color-brand-hover);
  }
`;

export const ChoiceTitle = styled.span`
  display: block;
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.375rem;
  text-align: center;
`;

export const ChoiceDescription = styled.span`
  display: block;
  color: var(--text-muted);
  font-size: 0.875rem;
  line-height: 1.5;
  text-align: center;
`;

export const BackButton = styled.button`
  background: transparent;
  color: var(--text-muted);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-strong);
  font-family: inherit;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition:
    background var(--transition),
    color var(--transition),
    border-color var(--transition);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;

  &:hover {
    background: var(--color-brand-soft);
    color: var(--color-brand);
    border-color: var(--color-brand-border);
  }
`;
