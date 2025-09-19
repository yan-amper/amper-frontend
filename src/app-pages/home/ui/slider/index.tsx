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

  const bannersCount = banners.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannersCount);
    }, 4000);

    return () => clearInterval(timer);
  }, [bannersCount]);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + bannersCount) % bannersCount);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % bannersCount);

  return (
    <S.SliderContainer>
      <S.SlideWrapper>
        {banners.map((banner, i) => (
          <S.Slide key={banner.id} $isActive={i === currentSlide}>
            <S.SlideImage
              src={createImagePath(banner.image)}
              alt={"акция Ампер"}
              priority
              fill
            />
            <S.SlideOverlay />
          </S.Slide>
        ))}

        <S.PrevButton onClick={prevSlide}>
          <ChevronLeft size={24} />
        </S.PrevButton>

        <S.NextButton onClick={nextSlide}>
          <ChevronRight size={24} />
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
