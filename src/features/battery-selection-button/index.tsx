"use client";

import { ReactNode } from "react";
import { useUnit } from "effector-react";
import { ArrowRight } from "lucide-react";
import * as S from "./styled";
import { appState } from "@/entities";

type Props = {
  className?: string;
  /** Текст кнопки. По умолчанию — как в шапке и футере. */
  label?: string;
  /** Стрелка справа: только для крупных CTA страницы, не для шапки. */
  withArrow?: boolean;
  /** Иконка перед текстом. Тоже только для крупных CTA. */
  icon?: ReactNode;
};

export const BatterySelectionButton = ({
  className,
  label = "Подбор аккумулятора",
  withArrow = false,
  icon,
}: Props) => {
  const setForm = useUnit(appState.setForm);

  const handleSelectionClick = () => {
    setForm({ open: true });
  };

  return (
    <S.SelectionButton onClick={handleSelectionClick} className={className}>
      {icon}
      {label}
      {withArrow && <ArrowRight size={20} aria-hidden="true" />}
    </S.SelectionButton>
  );
};
