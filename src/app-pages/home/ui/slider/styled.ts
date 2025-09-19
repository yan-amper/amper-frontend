import Image from "next/image";
import styled from "styled-components";

export const SliderContainer = styled.section`
  position: relative;
  height: 80vh;
  overflow: hidden;
  margin-top: 5rem;
`;

export const SlideWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Slide = styled.div<{ $isActive: boolean }>`
  position: absolute;
  inset: 0;
  transition: opacity 1s;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
`;

export const SlideImage = styled(Image)`
  object-fit: contain;
`;

export const SlideOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
`;

export const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
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
`;

export const Dot = styled.button<{ $isActive: boolean }>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  background: ${({ $isActive }) =>
    $isActive ? "white" : "rgba(255, 255, 255, 0.5)"};
`;
