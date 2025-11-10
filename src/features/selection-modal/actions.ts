"use server";

import { SubmitFormReturn, supabase } from "@/shared";
import { FormData } from ".";

export const submitForm = async (
  formData: FormData
): Promise<SubmitFormReturn> => {
  const { data, error } = await supabase
    .from("battery_requests")
    .insert([
      {
        ...formData,
        source: "website",
      },
    ])
    .select("id")
    .single();

  if (error) {
    return {
      ok: false,
      message: "Произошла ошибка при отправлении заявки. Попробуйте ещё раз.",
    };
  } else {
    const url =
      process.env.NEXT_PUBLIC_WEBSITE_URL + "/api/notify-about-request";

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requestId: data.id }),
    });

    return {
      ok: true,
    };
  }
};
