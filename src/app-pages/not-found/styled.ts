"use client";

import Link from "next/link";
import styled, { css, keyframes } from "styled-components";

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Section = styled.section`
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 1rem;
  padding-top: calc(4rem + 100px);
  background: #f9fafb;

  @media (max-width: 550px) {
    padding: 3rem 1rem;
    padding-top: calc(3rem + 100px);
  }
`;

export const Stripes = styled.div`
  position: absolute;
  inset: -20% -10% -20% auto;
  width: 60%;
  pointer-events: none;
  background: repeating-linear-gradient(
    -35deg,
    rgba(220, 38, 38, 0.07) 0px,
    rgba(220, 38, 38, 0.07) 3px,
    transparent 3px,
    transparent 34px
  );

  @media (max-width: 768px) {
    width: 100%;
    inset: -20% -30% -20% auto;
  }
`;

export const Content = styled.div`
  position: relative;
  z-index: 1;
  max-width: 640px;
  text-align: center;
  animation: ${fadeUp} 0.5s ease both;
`;

export const IconBadge = styled.div`
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: #fef2f2;
  border: 1px solid #fecaca;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dc2626;
  margin: 0 auto 1.5rem;
`;

export const Code = styled.p`
  font-size: 6.5rem;
  line-height: 1;
  font-weight: 800;
  color: #dc2626;
  letter-spacing: -0.03em;
  margin-bottom: 0.75rem;

  @media (max-width: 550px) {
    font-size: 4.5rem;
  }
`;

export const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 0.75rem;

  @media (max-width: 550px) {
    font-size: 1.375rem;
  }
`;

export const Text = styled.p`
  color: #6b7280;
  font-size: 1rem;
  line-height: 1.6;
  max-width: 46ch;
  margin: 0 auto 2.25rem;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const buttonBase = css`
  padding: 0.75rem 1.75rem;
  border-radius: 0.5rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
`;

export const PrimaryButton = styled(Link)`
  ${buttonBase}
  background: #dc2626;
  color: white;

  &:hover {
    background: #b91c1c;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
`;

export const SecondaryButton = styled(Link)`
  ${buttonBase}
  background: transparent;
  color: #dc2626;
  border: 1.5px solid #dc2626;

  &:hover {
    background: #fef2f2;
  }
`;
