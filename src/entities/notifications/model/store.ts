import { createEvent } from "effector";
import { toast } from "react-toastify";
import { ToastTypes, ToastTypesValues } from "./types";

export const showNotify = createEvent<{
  message: string;
  type: ToastTypesValues;
}>();

showNotify.watch(({ message, type }) => {
  switch (type) {
    case ToastTypes.SUCCESS:
      toast.success(message);
      break;
    case ToastTypes.ERROR:
      toast.error(message);
      break;
    case ToastTypes.WARNING:
      toast.warning(message);
      break;
    case ToastTypes.INFO:
      toast.info(message);
      break;
    default:
      toast(message);
  }
});
