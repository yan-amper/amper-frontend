import { Product } from "../api";

/**
 * Транслитерация по ГОСТ-подобной схеме, без диакритики.
 * Порядок ключей важен: многобуквенные («щ» -> «shch») должны попасть
 * в замену раньше односимвольных, иначе «щ» развалится на «sh» + «ch».
 * Поэтому идём посимвольно по строке, а не серией .replace().
 */
const TRANSLIT: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh",
  з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
  п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "c",
  ч: "ch", ш: "sh", щ: "shch", ъ: "", ы: "y", ь: "", э: "e",
  ю: "yu", я: "ya",
};

/**
 * Человекочитаемый хвост адреса товара.
 *
 * Латиница и цифры остаются как есть, кириллица транслитерируется,
 * всё прочее (скобки, точки, знак «×», пробелы) схлопывается в дефис.
 * «Аккумулятор Odin 60Ah (L2) (п.п)» -> «akkumulyator-odin-60ah-l2-p-p».
 */
export const slugifyTitle = (title: string): string => {
  let out = "";

  for (const char of title.toLowerCase()) {
    if (char in TRANSLIT) {
      out += TRANSLIT[char];
    } else if (/[a-z0-9]/.test(char)) {
      out += char;
    } else {
      out += "-";
    }
  }

  return out.replace(/-+/g, "-").replace(/^-|-$/g, "");
};

/**
 * Адрес страницы товара: `<id>-<слаг>`.
 *
 * ID идёт первым и является единственным, что реально resolve'ит страницу.
 * Слаг — декоративный хвост для читаемости ссылки: продавец правит название
 * товара в админке, и без такой схемы каждая правка убивала бы старый URL.
 * ID при правке не меняется — проверено на боевой базе: у записи 110
 * created_at 2023-06, updated_at 2025-11, id прежний.
 */
export const buildProductSlug = (product: Product): string =>
  `${product.id}-${slugifyTitle(product.title)}`;

export const buildProductPath = (product: Product): string =>
  `/product/${buildProductSlug(product)}`;

/**
 * Обратная операция: вытащить id из хвоста адреса.
 * Возвращает null, если в начале сегмента нет числа — тогда страница
 * должна отдать 404, а не молча показать случайный товар.
 */
export const parseProductId = (slug: string): number | null => {
  const match = /^(\d+)/.exec(slug);
  if (!match) return null;

  const id = Number(match[1]);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
};
