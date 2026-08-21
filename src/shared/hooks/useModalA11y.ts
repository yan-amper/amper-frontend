"use client";

import { RefObject, useEffect, useRef } from "react";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

/**
 * Базовая доступность модального окна: Escape, ловушка фокуса и возврат
 * фокуса на элемент, с которого модалку открыли.
 *
 * Ни одна из модалок сайта раньше не закрывалась по Escape и не удерживала
 * фокус: с клавиатуры можно было «уйти» за пределы открытого окна
 * на страницу под ним.
 *
 * Важно: контейнер модалки должен скрываться через visibility/display,
 * а не только opacity + pointer-events — иначе элементы внутри закрытого
 * окна остаются в таб-порядке страницы.
 */
export const useModalA11y = (
  isOpen: boolean,
  onClose: () => void,
  containerRef: RefObject<HTMLElement | null>
) => {
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    restoreFocusRef.current = document.activeElement as HTMLElement | null;

    const container = containerRef.current;
    // Фокус на само окно, а не на первую кнопку: иначе скринридер начинает
    // читать с «Закрыть», пропуская заголовок.
    container?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const node = containerRef.current;
      if (!node) return;

      const focusable = Array.from(
        node.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);

      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === node)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      restoreFocusRef.current?.focus?.({ preventScroll: true });
    };
  }, [isOpen, onClose, containerRef]);
};
