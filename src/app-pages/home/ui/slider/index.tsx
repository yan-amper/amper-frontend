"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as S from "./styled";

const slides = [
  "https://images.pexels.com/photos/159293/car-engine-motor-clean-159293.jpeg",
  "https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg",
  "https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg",
];

export const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <S.SliderContainer>
      <S.SlideWrapper>
        {slides.map((slide, index) => (
          <S.Slide key={index} isActive={index === currentSlide}>
            <S.SlideImage src={slide} alt={`Slide ${index + 1}`} />
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
          {slides.map((_, index) => (
            <S.Dot
              key={index}
              isActive={index === currentSlide}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </S.DotsContainer>
      </S.SlideWrapper>
    </S.SliderContainer>
  );
};
