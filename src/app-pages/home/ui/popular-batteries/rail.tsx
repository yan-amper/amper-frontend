"use client";

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import * as S from "./styled";

type RailProps = {
  children: ReactNode;
};

/**
 * Лента карточек с полоской прокрутки под ней.
 *
 * Полоска считается по реальным размерам: её длина — какая доля ленты
 * видна, положение — где мы находимся. Поэтому она сама пропадает там,
 * где прокрутки нет (десктоп, планшет), и не требует знать про
 * брейкпоинты. Нативную полосу использовать нельзя: на телефонах она
 * либо скрыта, либо всплывает на секунду во время движения — то есть
 * не сообщает ничего до того, как человек начал листать.
 */
export const Rail = ({ children }: RailProps) => {
  const railRef = useRef<HTMLDivElement>(null);
  /** Доля ленты, помещающаяся в экран. 0 — прокрутки нет, полоски тоже. */
  const [visibleRatio, setVisibleRatio] = useState(0);
  const [progress, setProgress] = useState(0);

  const measure = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;

    const scrollable = rail.scrollWidth - rail.clientWidth;

    // Единица запаса: субпиксельные округления дают лишний пиксель
    // прокрутки даже там, где всё помещается.
    if (scrollable <= 1) {
      setVisibleRatio(0);
      return;
    }

    setVisibleRatio(rail.clientWidth / rail.scrollWidth);
    setProgress(rail.scrollLeft / scrollable);
  }, []);

  useEffect(() => {
    measure();

    const rail = railRef.current;
    if (!rail || typeof ResizeObserver === "undefined") return;

    // Поворот телефона и смена ширины меняют и длину полоски, и сам факт
    // её наличия.
    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    return () => observer.disconnect();
  }, [measure]);

  return (
    <>
      <S.Rail ref={railRef} onScroll={measure}>
        {children}
      </S.Rail>

      {visibleRatio > 0 && (
        <S.ScrollTrack aria-hidden="true">
          <S.ScrollThumb
            style={{
              width: `${visibleRatio * 100}%`,
              // Сдвиг задаётся в процентах от самой полоски: пройти ей
              // нужно ровно ту часть дорожки, которую она не занимает.
              transform: `translateX(${
                (progress * (1 - visibleRatio) * 100) / visibleRatio
              }%)`,
            }}
          />
        </S.ScrollTrack>
      )}
    </>
  );
};
