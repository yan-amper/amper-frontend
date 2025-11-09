"use server";

import { supabase } from "@/shared";
import { FormData } from ".";

type SubmitFormReturn =
  | {
      ok: true;
    }
  | {
      ok: false;
      message: string;
    };

export const submitForm = async (
  formData: FormData
): Promise<SubmitFormReturn> => {
  const { error } = await supabase.from("battery_requests").insert([
    {
      ...formData,
      source: "website",
    },
  ]);

  if (error) {
    return {
      ok: false,
      message: "Произошла ошибка при отправлении заявки. Попробуйте ещё раз.",
    };
  } else {
    return {
      ok: true,
    };
  }
};
