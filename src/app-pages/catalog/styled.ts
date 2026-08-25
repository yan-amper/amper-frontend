"use client";

import Link from "next/link";
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

export const Breadcrumbs = styled.nav`
  max-width: var(--container);
  margin: 0 auto 1.25rem;
  padding: 0 var(--container-pad);
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  color: var(--text-subtle);

  ${media.sm} {
    margin-bottom: 1rem;
    font-size: 0.8125rem;
  }
`;

export const Crumb = styled(Link)`
  color: var(--text-muted);
  text-decoration: none;
  transition: color var(--transition);

  &:hover {
    color: var(--color-brand);
    text-decoration: underline;
  }
`;

export const CrumbCurrent = styled.span`
  color: var(--text-primary);
  font-weight: 500;
`;
