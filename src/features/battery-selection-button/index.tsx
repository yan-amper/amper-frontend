"use client";

import { useUnit } from "effector-react";
import * as S from "./styled";
import { appState } from "@/entities";

type Props = {
  className?: string;
};

export const BatterySelectionButton = ({ className }: Props) => {
  const setForm = useUnit(appState.setForm);

  const handleSelectionClick = () => {
    setForm({ open: true });
  };

  return (
    <S.SelectionButton onClick={handleSelectionClick} className={className}>
      Подбор аккумулятора
    </S.SelectionButton>
  );
};
