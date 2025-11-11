"use server";

import { Product, Request } from "@/entities";
import { createImagePath, escapeMarkdownV2, SubmitFormReturn } from "@/shared";
import { Telegraf } from "telegraf";

const BOT_TOKEN = process.env.TG_BOT_TOKEN!;
const bot = new Telegraf(BOT_TOKEN);

export const sendProductsAction = async (
  request: Request,
  products: Product[]
): Promise<SubmitFormReturn> => {
  try {
    await bot.telegram.sendMessage(
      request.phone,
      escapeMarkdownV2("Вот варианты по вашей заявке"),
      {
        parse_mode: "MarkdownV2",
      }
    );

    for (const p of products) {
      const text = `${p.title}

Ёмкость: ${p.capacity}
Пусковой ток: ${p.current}
Полярность: ${p.polarity}
Габариты: ${p.longitude}x${p.width}x${p.height}
Изготовитель: ${p.manufacturer}
Обычная цена: ${p.standardPrice} ₽
Цена со сдачей: ${p.priceWithChange} ₽`;

      await bot.telegram.sendPhoto(request.phone, createImagePath(p.image), {
        caption: escapeMarkdownV2(text),
        parse_mode: "MarkdownV2",
      });
    }

    return { ok: true };
  } catch (err) {
    console.log(err);
    return {
      ok: false,
      message: "Не удалось отправить аккумуляторы пользователю",
    };
  }
};
