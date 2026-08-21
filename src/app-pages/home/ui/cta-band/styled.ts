"use client";

import styled from "styled-components";
import { BatterySelectionButton } from "@/features";
import { media } from "@/shared";

export const Section = styled.section`
  background: var(--surface);
  padding: 4rem 0;

  ${media.sm} {
    padding: 2.5rem 0;
  }
`;

export const Container = styled.div`
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 var(--container-pad);
`;

export const Band = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 2.5rem 3rem;
  border-radius: var(--radius-xl);
  background: var(--surface-dark);

  ${media.md} {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
    gap: 1.5rem;
    padding: 2rem 1.5rem;
  }
`;

/* Диагональная штриховка — та же, что на 404: связывает страницы в одну
   визуальную систему и оживляет тёмную плашку без лишних картинок. */
export const Stripes = styled.div`
  position: absolute;
  inset: -50% -10% -50% auto;
  width: 45%;
  pointer-events: none;
  background: repeating-linear-gradient(
    -35deg,
    rgba(220, 38, 38, 0.18) 0px,
    rgba(220, 38, 38, 0.18) 3px,
    transparent 3px,
    transparent 34px
  );

  ${media.md} {
    inset: -50% -30% -50% auto;
    width: 90%;
  }
`;

export const Text = styled.div`
  position: relative;
  z-index: 1;
`;

export const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-on-dark);
  margin-bottom: 0.5rem;

  ${media.sm} {
    font-size: 1.375rem;
  }
`;

export const Subtitle = styled.p`
  color: var(--text-on-dark-muted);
  font-size: 1rem;
  max-width: 44ch;
  margin: 0;

  ${media.md} {
    margin: 0 auto;
  }

  ${media.sm} {
    font-size: 0.9375rem;
  }
`;

export const Action = styled(BatterySelectionButton)`
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  height: 56px;
  padding: 0 2rem;
  font-size: 1rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-brand);

  ${media.md} {
    width: 100%;
    height: 52px;
  }
`;
