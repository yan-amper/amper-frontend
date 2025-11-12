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
    for (const p of products) {
      const text = `${p.title}

Ёмкость: ${p.capacity}
Пусковой ток: ${p.current}
Полярность: ${p.polarity}
Габариты: ${p.longitude}x${p.width}x${p.height}
Изготовитель: ${p.manufacturer}
Обычная цена: ${p.standardPrice} ₽
Цена со сдачей: ${p.priceWithChange} ₽`;

      await bot.telegram.sendPhoto(request.tg_user_id!, createImagePath(p.image), {
        caption: escapeMarkdownV2(text),
        parse_mode: "MarkdownV2",
      });
    }

    await bot.telegram.sendMessage(
      request.tg_user_id!,
      `Подбор завершён! ⚡️
Ян проверил лично — вот аккумуляторы, которые подойдут вашему автомобилю.
    
Если остались вопросы или нужна консультация — 89897228095 📞`
    );

    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      message: "Не удалось отправить аккумуляторы пользователю",
    };
  }
};
