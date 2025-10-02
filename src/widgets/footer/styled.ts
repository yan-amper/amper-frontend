"use client";

import styled from "styled-components";

export const FooterStyled = styled.footer`
  color: white;
  padding: 2rem 0;
  border-top: 1px solid #dc2626;
`;

export const FooterContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const FooterCopyright = styled.p`
  text-align: center;
  color: black;
  margin: 0;
`;
