"use client";

import { BatterySelectionButton } from "@/features";
import styled from "styled-components";

export const ButtonContainer = styled.div`
  width: 100%;
  padding: 0 30px;

  @media (max-width: 550px) {
    padding: 0 12px;
  }
`;

export const Button = styled(BatterySelectionButton)<{
  $anotherMargin?: boolean;
}>`
  width: 100%;
  height: 60px;
  margin: 0 auto;
  font-size: 20px;
  margin-top: ${(props) => (props.$anotherMargin ? 20 : 40)}px;

  @media (max-width: 550px) {
    height: 40px;
    font-size: 18px;
    margin-top: 20px;
  }
`;
