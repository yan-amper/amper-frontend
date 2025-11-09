"use client";

import { useUnit } from "effector-react";
import * as S from "./styled";
import { appState } from "@/entities";

export const BatterySelectionButton = () => {
  const setForm = useUnit(appState.setForm);

  const handleSelectionClick = () => {
    setForm({ open: true });
  };

  return (
    <S.SelectionButton onClick={handleSelectionClick}>
      Подбор аккумулятора
    </S.SelectionButton>
  );
};
