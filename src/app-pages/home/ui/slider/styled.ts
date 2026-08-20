import Image from "next/image";
import styled, { css } from "styled-components";

export const SliderContainer = styled.section`
  width: 100%;
  max-width: 1280px;
  position: relative;
  overflow: hidden;
  margin: 100px auto 0 auto;
  border-radius: 0.75rem;

  @media (max-width: 550px) {
    border-radius: 0;
  }
`;

export const SlideWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #111827;
`;

export const Slide = styled.div<{ $isActive: boolean }>`
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.6s ease;
  pointer-events: none;

  ${({ $isActive }) =>
    $isActive &&
    css`
      opacity: 1;
      pointer-events: auto;
    `}
`;

export const SlideImage = styled(Image)`
  object-fit: cover;
`;

export const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgb(255, 255, 255);
  color: white;
  padding: 0.5rem;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  z-index: 2;
`;

export const PrevButton = styled(NavigationButton)`
  left: 1rem;
`;

export const NextButton = styled(NavigationButton)`
  right: 1rem;
`;

export const DotsContainer = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 2;
`;

export const Dot = styled.button<{ $isActive: boolean }>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  background: ${({ $isActive }) => ($isActive ? "gray" : "white")};
`;
