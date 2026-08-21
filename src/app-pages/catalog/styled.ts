"use client";

import styled from "styled-components";
import { media } from "@/shared";

export const ContentContainer = styled.div`
  flex: 1;
  /* margin-top: 100px убран: отступ под фиксированную шапку теперь задаёт
     <main> через --header-h. Магическое число было меньше реальной высоты
     шапки и контент подлезал под неё. */
  padding: 2rem 0;
  background: var(--surface-muted);

  ${media.sm} {
    padding: 1.25rem 0;
  }
`;

export const MainContent = styled.div`
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 var(--container-pad);
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
  align-items: start;

  ${media.lg} {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;
