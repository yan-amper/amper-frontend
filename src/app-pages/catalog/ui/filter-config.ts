import { ProductValues } from "@/entities";

export const filterProperties: {
  name: ProductValues;
  title: string;
  placeholder: string;
}[] = [
  { name: "polarity", title: "Полярность", placeholder: "Любая" },
  { name: "manufacturer", title: "Изготовитель", placeholder: "Любой" },
  { name: "current", title: "Пусковой ток", placeholder: "Любой" },
];

export const sortOptions = [
  { value: "ASC", label: "Сначала дешёвые" },
  { value: "DESC", label: "Сначала дорогие" },
];

/**
 * Ключи, которые показываются чипсами активных фильтров.
 * `sort` сюда намеренно не входит: сортировка задана всегда и снимать её
 * отдельной кнопкой бессмысленно.
 */
export const CHIP_LABELS: Record<string, string> = {
  capacity: "Ёмкость",
  polarity: "Полярность",
  manufacturer: "Изготовитель",
  current: "Пусковой ток",
  recommended: "Подборка",
  popular: "Подборка",
};

export const formatChipValue = (key: string, value: string): string => {
  if (key === "capacity") return `${value} Ач`;
  if (key === "current") return `${value} А`;
  if (key === "recommended") return "Рекомендуемые";
  if (key === "popular") return "Популярные";
  return value;
};
