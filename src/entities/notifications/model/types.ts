export enum ToastTypes {
  SUCCESS = "success",
  WARNING = "warning",
  INFO = "info",
  ERROR = "error",
}

export type ToastTypesValues = ToastTypes[keyof ToastTypes];
