/**
 * Ручной запуск полосы загрузки для переходов, которые делает не <Link>,
 * а router.push (смена фильтров и чипсы в каталоге).
 *
 * Гасит полосу не таймер, а реальная смена pathname/searchParams —
 * см. features/top-loader.
 *
 * nprogress подгружается динамически: этот модуль реэкспортируется через
 * @/shared и попадает в серверные компоненты, а библиотека рассчитана
 * только на браузер.
 */
export const startRouteLoading = () => {
  if (typeof window === "undefined") return;
  void import("nprogress").then((mod) => mod.default.start());
};
