"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as S from "./styled";

const SLIDES_COUNT = 5;

export const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES_COUNT);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + SLIDES_COUNT) % SLIDES_COUNT);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES_COUNT);

  return (
    <S.SliderContainer>
      <S.SlideWrapper>
        {Array.from({ length: SLIDES_COUNT }).map((_, i) => (
          <S.Slide key={i} isActive={i === currentSlide}>
            <S.SlideImage
              src={`/slides/${i + 1}.webp`}
              alt={"акция Ампер"}
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
          {Array.from({ length: SLIDES_COUNT }).map((_, i) => (
            <S.Dot
              key={i}
              isActive={i === currentSlide}
              onClick={() => setCurrentSlide(i)}
            />
          ))}
        </S.DotsContainer>
      </S.SlideWrapper>
    </S.SliderContainer>
  );
};
