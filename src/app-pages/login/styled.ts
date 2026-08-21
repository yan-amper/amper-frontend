import Link from "next/link";
import styled, { keyframes } from "styled-components";
import { media } from "@/shared";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

export const PageContainer = styled.div`
  /* flex: 1, а не min-height: 100vh — страница рендерится внутри <main>,
     у которого уже есть отступ под фиксированную шапку. 100vh поверх
     этого гарантированно добавляли лишний скролл на высоту футера. */
  flex: 1;
  background: linear-gradient(
    135deg,
    var(--color-brand-soft) 0%,
    var(--color-brand-soft-hover) 50%,
    var(--color-brand-border) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

export const LoginCard = styled.div`
  background: var(--surface);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  animation: ${fadeIn} 0.6s ease-out;

  ${media.md} {
    padding: 1.5rem;
    border-radius: var(--radius-lg);
  }
`;

export const LogoSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

export const LogoIcon = styled.div`
  width: 3rem;
  height: 3rem;
  background: var(--color-brand);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-brand);
`;

export const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-primary);
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-primary);
  text-align: center;
  margin: 0;
`;

export const Subtitle = styled.p`
  color: var(--text-muted);
  text-align: center;
  margin: 0;
  font-size: 0.875rem;
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

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const Input = styled.input<{ $hasError?: boolean; $hasIcon?: boolean }>`
  width: 100%;
  padding: 0.875rem;
  padding-right: ${(props) => (props.$hasIcon ? "3rem" : "0.875rem")};
  border: 2px solid ${(props) => (props.$hasError ? "var(--color-danger-border)" : "var(--border-default)")};
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  transition: all var(--transition);
  background: var(--surface);

  &:focus {
    outline: none;
    border-color: ${(props) => (props.$hasError ? "var(--color-danger-border)" : "var(--color-brand)")};
    box-shadow: 0 0 0 3px
      ${(props) =>
        props.$hasError ? "var(--focus-ring-danger-color)" : "var(--focus-ring-color)"};
  }

  &:disabled {
    background: var(--surface-muted);
    color: var(--text-subtle);
    cursor: not-allowed;
  }

  &::placeholder {
    color: var(--text-subtle);
  }

  &:hover:not(:disabled) {
    border-color: ${(props) => (props.$hasError ? "var(--color-danger-border)" : "var(--border-strong)")};
  }
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: var(--radius-sm);
  transition: all var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    color: var(--text-secondary);
    background: var(--surface-sunken);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const ErrorMessage = styled.span`
  color: var(--color-danger-border);
  font-size: 0.75rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const LoginButton = styled.button`
  background: var(--color-brand);
  color: var(--text-on-brand);
  padding: 0.875rem 1.5rem;
  border-radius: var(--radius-md);
  border: none;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all var(--transition);
  margin-top: 0.5rem;

  &:hover:not(:disabled) {
    background: var(--color-brand-hover);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background: var(--text-subtle);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    animation: ${pulse} 1.5s infinite;
  }
`;

export const Footer = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

export const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  transition: all var(--transition);

  &:hover {
    color: var(--color-brand);
    background: var(--color-brand-soft);
  }
`;
