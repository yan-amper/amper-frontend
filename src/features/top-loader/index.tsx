"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import NProgress from "nprogress";

NProgress.configure({ showSpinner: false, minimum: 0.12, trickleSpeed: 140 });

/** Если навигация почему-то не состоялась — не оставляем полосу висеть. */
const SAFETY_TIMEOUT_MS = 15000;

const paramsWithoutProduct = (params: URLSearchParams) => {
  const copy = new URLSearchParams(params.toString());
  copy.delete("product");
  return copy.toString();
};

/**
 * Полоса прогресса переходов.
 *
 * Раньше она стартовала ПОСЛЕ смены маршрута и всегда гасла через
 * фиксированные 300 мс — то есть показывала не загрузку, а анимацию длиной
 * 300 мс. На каталоге с force-dynamic реальный переход занимает заметно
 * больше, и полоса «доезжала до конца», пока страница ещё грузилась.
 *
 * Теперь: старт по клику на внутреннюю ссылку (или вручную через
 * startRouteLoading), финиш — по фактической смене pathname/searchParams.
 */
export const TopLoader = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prevRef = useRef<{ pathname: string; params: string } | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const clearSafety = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    };

    const onClick = (event: MouseEvent) => {
      // Модификаторы и средняя кнопка открывают новую вкладку — текущая
      // страница остаётся на месте, прогресс не нужен.
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (event.target as HTMLElement | null)?.closest?.("a");
      if (!anchor || anchor.hasAttribute("download")) return;
      if (anchor.target && anchor.target !== "_self") return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      // Внешние ссылки, tel:, mailto: — уходим.
      if (url.origin !== window.location.origin) return;

      // Ссылка на текущий же адрес (например /#address, когда мы уже на
      // главной) навигации не вызывает — гасить будет нечего.
      const target = url.pathname + url.search;
      const current = window.location.pathname + window.location.search;
      if (target === current) return;

      NProgress.start();
      clearSafety();
      timeoutRef.current = setTimeout(() => NProgress.done(), SAFETY_TIMEOUT_MS);
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      clearSafety();
    };
  }, []);

  useEffect(() => {
    const params = paramsWithoutProduct(searchParams);
    const prev = prevRef.current;
    prevRef.current = { pathname, params };

    // Первый рендер: гасить нечего.
    if (prev === null) return;

    // Открытие/закрытие модалки товара меняет только ?product= через
    // history.replaceState — это не переход по маршруту.
    if (prev.pathname === pathname && prev.params === params) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    NProgress.done();
  }, [pathname, searchParams]);

  useEffect(
    () => () => {
      NProgress.done();
    },
    []
  );

  return null;
};
