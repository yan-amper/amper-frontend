"use client";

import styled from "styled-components";
import { media } from "../../styles/breakpoints";

export const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  ${media.sm} {
    margin-bottom: 2rem;
  }
`;

export const Title = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--text-primary);
  margin-bottom: 1rem;

  ${media.sm} {
    font-size: 1.5rem;
  }
`;

export const Subtitle = styled.p`
  color: var(--text-muted);
  font-size: 1rem;
  max-width: 46ch;
  margin: 1rem auto 0;

  ${media.sm} {
    font-size: 0.9375rem;
  }
`;

export const Divider = styled.div`
  width: 5rem;
  height: 0.25rem;
  border-radius: var(--radius-pill);
  background: var(--color-brand);
  margin: 0 auto;
`;
