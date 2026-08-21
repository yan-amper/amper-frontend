"use client";

import styled from "styled-components";
import { media } from "@/shared";

export const Section = styled.section`
  padding: 4rem 0;
  background: var(--surface-muted);

  ${media.sm} {
    padding: 2.5rem 0;
  }
`;

export const Container = styled.div`
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 var(--container-pad);
`;
