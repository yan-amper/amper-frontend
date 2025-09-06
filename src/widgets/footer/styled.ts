"use client";

import styled from "styled-components";

export const FooterStyled = styled.footer`
  background: #111827;
  color: white;
  padding: 2rem 0;
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

export const FooterLogoIcon = styled.div`
  width: 2rem;
  height: 2rem;
  background: #dc2626;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FooterLogoText = styled.span`
  font-size: 1.125rem;
  font-weight: bold;
`;

export const FooterCopyright = styled.p`
  text-align: center;
  color: #9ca3af;
  margin: 0;
`;
