"use client";

import { css } from "styled-components";
import { media } from "./breakpoints";

/**
 * Дизайн-токены сайта. Единственное место, где живут «сырые» значения цветов,
 * радиусов, теней и типографики.
 *
 * Именование — по РОЛИ, а не по цвету: `--color-brand`, а не `--red-600`.
 * Иначе через месяц снова непонятно, какой из четырёх серых «правильный».
 *
 * В компонентах писать `var(--color-brand)`, а не `#dc2626`.
 */
export const tokens = css`
  :root {
    /* ---------- Бренд ---------- */
    --color-brand: #dc2626;
    --color-brand-hover: #b91c1c;
    /* светлая заливка на бренде: подложки карточек, hover-состояния */
    --color-brand-soft: #fef2f2;
    --color-brand-soft-hover: #fee2e2;
    --color-brand-border: #fecaca;
    /* насыщенная плашка под иконку */
    --color-brand-accent: #fca5a5;
    /* бренд поверх тёмного фона (футер) — светлее, иначе не читается */
    --color-brand-on-dark: #f87171;

    /* ---------- Семантика ---------- */
    /* намеренно НЕ красный: раньше ошибка была #ef4444 и визуально
       не отличалась от брендового #dc2626 */
    --color-danger: #b91c1c;
    --color-danger-border: #ef4444;
    --color-danger-soft: #fef2f2;
    --color-success: #059669;
    --color-success-soft: #ecfdf5;
    --color-info: #2563eb;
    --color-info-soft: #f0f9ff;
    --color-info-border: #e0f2fe;

    /* Статусы заявок в админке */
    --status-new: #2563eb;
    --status-progress: #b45309;
    --status-done: #059669;
    --status-cancelled: #b91c1c;
    --status-default: #6b7280;

    /* ---------- Текст ---------- */
    --text-primary: #111827;
    --text-secondary: #374151;
    --text-muted: #6b7280;
    --text-subtle: #9ca3af;
    --text-on-brand: #ffffff;
    --text-on-dark: #ffffff;
    --text-on-dark-muted: #9ca3af;
    --text-on-dark-subtle: #6b7280;

    /* ---------- Поверхности ---------- */
    --surface: #ffffff;
    --surface-muted: #f9fafb;
    --surface-sunken: #f3f4f6;
    --surface-dark: #111827;

    /* ---------- Границы ---------- */
    --border-subtle: #f3f4f6;
    --border-default: #e5e7eb;
    --border-strong: #d1d5db;
    --border-muted: #9ca3af;

    /* ---------- Радиусы ---------- */
    --radius-sm: 0.375rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    --radius-xl: 1rem;
    --radius-pill: 999px;

    /* ---------- Тени ----------
       Единая шкала: чем выше уровень, тем «выше» элемент над страницей.
       Раньше было 19 разных теней, включая случайную rgba(8, 9, 9, 0.2). */
    --shadow-sm: 0 1px 3px rgba(17, 24, 39, 0.08);
    --shadow-md: 0 4px 12px -2px rgba(17, 24, 39, 0.1);
    --shadow-lg: 0 10px 24px -6px rgba(17, 24, 39, 0.16);
    --shadow-xl: 0 24px 48px -12px rgba(17, 24, 39, 0.28);
    /* акцентная тень под главными красными кнопками */
    --shadow-brand: 0 10px 24px -8px rgba(220, 38, 38, 0.5);
    /* кольцо фокуса — одно на весь сайт.
       *-color варианты нужны там, где размер кольца задан на месте. */
    --focus-ring-color: rgba(220, 38, 38, 0.35);
    --focus-ring-danger-color: rgba(239, 68, 68, 0.25);
    --focus-ring: 0 0 0 3px var(--focus-ring-color);
    --focus-ring-danger: 0 0 0 3px var(--focus-ring-danger-color);

    /* ---------- Раскладка ---------- */
    /* Высота фиксированной шапки. От неё зависит отступ <main>,
       scroll-margin якорей и позиция sticky-фильтров.
       Менять ТОЛЬКО здесь. */
    --header-h: 76px;
    --container: 1280px;
    --container-pad: 1rem;

    /* ---------- Движение ---------- */
    --transition-fast: 0.15s ease;
    --transition: 0.2s ease;
    --transition-slow: 0.35s ease;

    ${media.md} {
      --header-h: 64px;
    }
  }
`;
