"use client";

import styled, { css } from "styled-components";
import { media } from "../../styles/breakpoints";

export const TitleRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 1rem;
  /* Отступ до черты живёт здесь, а не на самом <h2>: иначе при появлении
     ссылки справа она съезжает вниз вместе с маргином заголовка. */
  margin-bottom: 1rem;
`;

export const Title = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--text-primary);

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

export const Header = styled.div<{ $hasAction?: boolean }>`
  text-align: center;
  margin-bottom: 3rem;

  ${media.sm} {
    margin-bottom: 2rem;
  }

  ${({ $hasAction }) =>
    $hasAction &&
    css`
      text-align: left;

      ${TitleRow} {
        justify-content: space-between;
      }

      ${Divider} {
        margin-left: 0;
      }

      ${Subtitle} {
        margin-left: 0;
      }
    `}
`;
