/**
 * Русское склонение существительного по числу.
 *
 * plural(1,  ["товар", "товара", "товаров"]) → "товар"
 * plural(3,  ...) → "товара"
 * plural(12, ...) → "товаров"
 *
 * Раньше в каталоге было жёстко «Найдено: 1 товаров».
 */
export const plural = (
  count: number,
  forms: [one: string, few: string, many: string]
): string => {
  const abs = Math.abs(count) % 100;
  const lastDigit = abs % 10;

  if (abs > 10 && abs < 20) return forms[2];
  if (lastDigit > 1 && lastDigit < 5) return forms[1];
  if (lastDigit === 1) return forms[0];
  return forms[2];
};

/** Как plural, но сразу с числом: «12 товаров». */
export const pluralWithCount = (
  count: number,
  forms: [one: string, few: string, many: string]
): string => `${count} ${plural(count, forms)}`;
