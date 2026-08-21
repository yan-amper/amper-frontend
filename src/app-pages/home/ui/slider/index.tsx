"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as S from "./styled";
import { Banner } from "@/entities";
import { createImagePath } from "@/shared";

type SliderProps = {
  banners: Banner[];
};

const AUTOPLAY_MS = 5000;
/** Минимальный горизонтальный сдвиг пальца, считающийся свайпом. */
const SWIPE_THRESHOLD = 50;

export const Slider = ({ banners }: SliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  // Ручное переключение = осознанное намерение смотреть конкретный слайд.
  // Дальше автопрокрутка не мешает.
  const [isStopped, setIsStopped] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const bannersCount = banners.length;
  const hasControls = bannersCount > 1;

  useEffect(() => {
    if (isPaused || isStopped || !hasControls) return;

    // Пользователи с prefers-reduced-motion не должны получать
    // самопроизвольно движущийся контент.
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannersCount);
    }, AUTOPLAY_MS);

    return () => clearInterval(timer);
  }, [currentSlide, bannersCount, isPaused, isStopped, hasControls]);

  const goTo = (index: number) => {
    setIsStopped(true);
    setCurrentSlide(((index % bannersCount) + bannersCount) % bannersCount);
  };

  const prevSlide = () => goTo(currentSlide - 1);
  const nextSlide = () => goTo(currentSlide + 1);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    if (delta < 0) nextSlide();
    else prevSlide();
  };

  // Пустой список баннеров раньше давал деление по модулю на ноль:
  // currentSlide становился NaN, а на первом экране висел тёмный
  // прямоугольник 16:9 с двумя нерабочими стрелками.
  if (bannersCount === 0) return null;

  return (
    <S.SliderContainer
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      aria-roledescription="карусель"
      aria-label="Акции и предложения"
    >
      <S.SlideWrapper onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {banners.map((banner, i) => (
          <S.Slide
            key={banner.id}
            $isActive={i === currentSlide}
            aria-hidden={i !== currentSlide}
          >
            <S.SlideImage
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              src={createImagePath(banner.image)}
              alt={banner.title || "Акция Ампер"}
              priority={i === 0}
            />
          </S.Slide>
        ))}

        {hasControls && (
          <>
            <S.PrevButton onClick={prevSlide} aria-label="Предыдущий слайд">
              <ChevronLeft size={22} />
            </S.PrevButton>

            <S.NextButton onClick={nextSlide} aria-label="Следующий слайд">
              <ChevronRight size={22} />
            </S.NextButton>

            <S.DotsContainer>
              {banners.map((banner, i) => (
                <S.Dot
                  key={banner.id}
                  $isActive={i === currentSlide}
                  onClick={() => goTo(i)}
                  aria-label={`Слайд ${i + 1} из ${bannersCount}`}
                  aria-current={i === currentSlide}
                />
              ))}
            </S.DotsContainer>
          </>
        )}
      </S.SlideWrapper>
    </S.SliderContainer>
  );
};
