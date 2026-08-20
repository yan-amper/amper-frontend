"use client";

import { BatterySelectionButton } from "@/features";
import styled from "styled-components";

export const ButtonContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 1rem 0;

  @media (max-width: 550px) {
    padding: 20px 1rem 0;
  }
`;

export const Button = styled(BatterySelectionButton)`
  width: 100%;
  height: 64px;
  margin: 0 auto;
  font-size: 20px;
  border-radius: 0.75rem;
  box-shadow: 0 10px 20px 0px rgba(220, 38, 38, 0.25);

  @media (max-width: 550px) {
    height: 48px;
    font-size: 16px;
  }
`;
