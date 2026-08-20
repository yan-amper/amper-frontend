"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as S from "./styled";
import { Banner } from "@/entities";
import { createImagePath } from "@/shared";

type SliderProps = {
  banners: Banner[];
};

export const Slider = ({ banners }: SliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const bannersCount = banners.length;

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannersCount);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide, bannersCount, isPaused]);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + bannersCount) % bannersCount);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % bannersCount);

  return (
    <S.SliderContainer
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <S.SlideWrapper>
        {banners.map((banner, i) => (
          <S.Slide key={banner.id} $isActive={i === currentSlide}>
            <S.SlideImage
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              src={createImagePath(banner.image)}
              alt={"акция Ампер"}
              priority={i === 0}
            />
          </S.Slide>
        ))}

        <S.PrevButton onClick={prevSlide}>
          <ChevronLeft size={24} stroke="gray" />
        </S.PrevButton>

        <S.NextButton onClick={nextSlide}>
          <ChevronRight size={24} stroke="gray" />
        </S.NextButton>

        <S.DotsContainer>
          {banners.map((_, i) => (
            <S.Dot
              key={i}
              $isActive={i === currentSlide}
              onClick={() => setCurrentSlide(i)}
            />
          ))}
        </S.DotsContainer>
      </S.SlideWrapper>
    </S.SliderContainer>
  );
};
