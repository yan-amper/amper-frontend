"use client";

import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  background: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 50;
  border-bottom: 1px solid #dc2626;
`;

export const HeaderContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 550px) {
    gap: 0.5rem;
  }

  @media (max-width: 450px) {
    flex-direction: column-reverse;
  }
`;

export const PhoneContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #374151;
`;

export const PhoneText = styled.a`
  font-weight: 500;
  color: black;

  @media (max-width: 550px) {
    font-size: 14px;
  }
`;

export const AddressButton = styled(Link)`
  background: #dc2626;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    background: #b91c1c;
  }

  @media (max-width: 550px) {
    padding: 0.4rem 1.2rem;
    font-size: 14px;
  }
`;

export const Logo = styled(Image)`
  @media (max-width: 550px) {
    width: 120px;
    height: 60px;
  }
`;
