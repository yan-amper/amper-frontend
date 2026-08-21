"use client";

import Image from "next/image";
import styled, { css } from "styled-components";
import { media } from "@/shared";

export const BatteryCard = styled.div<{ $visible?: boolean; $delay?: number }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* Страховка от «карточки во весь экран», когда в секции всего один товар
     и auto-fit отдаёт ей всю ширину контейнера. */
  max-width: 420px;
  background: var(--surface);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 0.5s ease,
    transform 0.5s ease,
    box-shadow var(--transition),
    border-color var(--transition);
  /* Задержка ограничена пятью карточками (было — восемью по 60 мс, до 480 мс).
     При переходе по страницам каталога сетка монтируется заново, и длинный
     каскад читался как тормоза, а не как анимация. */
  transition-delay: ${({ $delay = 0 }) => $delay * 45}ms;

  ${({ $visible }) =>
    $visible &&
    css`
      opacity: 1;
      transform: translateY(0);
    `}

  /* Карточка приподнимается, а не «разгорается»: раньше на hover менялся
     только spread тени с 0 на 8px — это читалось как свечение. */
  &:hover {
    box-shadow: var(--shadow-lg);
    border-color: var(--color-brand-border);
    transform: translateY(-4px);
    transition-delay: 0ms;
  }
`;

export const BatteryImageContainer = styled.div`
  margin: 1rem 1rem 0;
  padding: 1.25rem;
  aspect-ratio: 1;
  overflow: hidden;
  background: var(--surface-muted);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
`;

export const BatteryImage = styled(Image)`
  width: 100%;
  height: 100%;
  /* contain, а не cover: у товарной фотографии нельзя срезать края.
     В модалке товара всегда было contain — в карточке cover, и один
     и тот же аккумулятор выглядел по-разному в списке и в карточке. */
  object-fit: contain;
`;

export const BatteryContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.25rem;
`;

export const BatteryName = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
`;

export const SpecsList = styled.dl`
  margin-bottom: 1.25rem;
`;

export const SpecItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.5rem;
  padding: 0.3rem 0;
  border-bottom: 1px solid var(--border-subtle);

  &:last-child {
    border-bottom: none;
  }
`;

export const SpecLabel = styled.dt`
  color: var(--text-muted);
  font-size: 0.875rem;
`;

export const SpecValue = styled.dd`
  color: var(--text-primary);
  font-weight: 500;
  font-size: 0.875rem;
  text-align: end;
`;

export const PriceSection = styled.div`
  margin-top: auto;
  border-top: 1px solid var(--border-default);
  padding-top: 1rem;
`;

export const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;

  ${media.xs} {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const PriceInfo = styled.div``;

export const OriginalPrice = styled.div`
  font-size: 0.875rem;
  color: var(--text-muted);
  text-decoration: line-through;
`;

export const CurrentPrice = styled.div`
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--color-brand);
  line-height: 1.2;
`;

export const PriceNote = styled.div`
  font-size: 0.8125rem;
  color: var(--text-muted);
`;

export const BuyButton = styled.button`
  flex-shrink: 0;
  background: var(--color-brand);
  color: var(--text-on-brand);
  padding: 0.625rem 1.25rem;
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.875rem;
  transition:
    background var(--transition),
    transform var(--transition);

  &:hover {
    background: var(--color-brand-hover);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;
