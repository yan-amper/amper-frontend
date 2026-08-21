import { Request } from "../types";

export const getEngineText = (engine: string) => {
  return engine === "petrol" ? "Бензин" : "Дизель";
};

export const getDeliveryText = (delivery: string) => {
  return delivery === "delivery" ? "С доставкой и установкой" : "Самовывоз";
};

// Возвращаем токены, а не хексы: цвета статусов теперь живут
// в одном месте — shared/styles/tokens.ts.
export const getStatusColor = (status: Request["status"]) => {
  switch (status) {
    case "new":
      return "var(--status-new)";
    case "in_progress":
      return "var(--status-progress)";
    case "completed":
      return "var(--status-done)";
    case "cancelled":
      return "var(--status-cancelled)";
    default:
      return "var(--status-default)";
  }
};

export const getStatusText = (status: Request["status"]) => {
  switch (status) {
    case "new":
      return "Новая";
    case "in_progress":
      return "В работе";
    case "completed":
      return "Выполнена";
    case "cancelled":
      return "Отменена";
    default:
      return status;
  }
};

export const getSource = (source: Request["source"]) => {
  switch (source) {
    case "tg":
      return "Телеграм";
    case "max":
      return "Max";
    case "website":
      return "Сайт";
    default:
      return "Сайт";
  }
};
