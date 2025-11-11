"use client";

import { BatterySelectionButton } from "@/features";
import styled from "styled-components";

export const Button = styled(BatterySelectionButton)`
  display: none;
  width: 90%;
  height: 40px;
  margin: 0 auto;
  font-size: 18px;
  margin-top: 20px;

  @media (max-width: 550px) {
    display: block;
  }
`;
