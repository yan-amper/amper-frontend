import { Request } from "../types";

export const getEngineText = (engine: string) => {
  return engine === "petrol" ? "Бензин" : "Дизель";
};

export const getDeliveryText = (delivery: string) => {
  return delivery === "delivery" ? "С доставкой и установкой" : "Самовывоз";
};

export const getStatusColor = (status: Request["status"]) => {
  switch (status) {
    case "new":
      return "#3b82f6";
    case "in_progress":
      return "#f59e0b";
    case "completed":
      return "#10b981";
    case "cancelled":
      return "#ef4444";
    default:
      return "#6b7280";
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
    case "website":
      return "Сайт";
    default:
      return "Сайт";
  }
};
