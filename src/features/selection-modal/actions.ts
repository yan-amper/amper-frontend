"use server";

import { escapeMarkdownV2, SubmitFormReturn, supabase } from "@/shared";
import { FormData } from ".";
import { Telegraf } from "telegraf";
import { getDeliveryText, getEngineText, getSource } from "@/entities";

const BOT_TOKEN = process.env.TG_BOT_TOKEN!;
const ADMIN_CHAT_ID = process.env.TG_ADMIN_ID!;

const bot = new Telegraf(BOT_TOKEN);

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
    .select()
    .single();

  if (error) {
    console.log(error);
    return {
      ok: false,
      message: "Произошла ошибка при отправлении заявки. Попробуйте ещё раз.",
    };
  } else {
    const messageText = `
      *Новая заявка #${data.id}*
Марка авто: ${data.car_brand}
Модель авто: ${data.car_model}
Тип двигателя: ${getEngineText(data.engine_type)}
Объем двигателя: ${data.engine_volume}
Год выпуска: ${data.production_year}
Способ получения: ${getDeliveryText(data.delivery_method)}
Телефон: ${data.phone}
Откуда: ${getSource(data.source)}`;

    try {
      await bot.telegram.sendMessage(
        ADMIN_CHAT_ID,
        escapeMarkdownV2(messageText),
        { parse_mode: "MarkdownV2" }
      );
    } catch (error: unknown) {
      const err = error as Error;
      console.error(
        `Failed to send message to admin ${ADMIN_CHAT_ID}:`,
        err.message
      );
    }

    return {
      ok: true,
    };
  }
};
