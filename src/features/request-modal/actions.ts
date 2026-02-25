"use server";

import { Product, Request } from "@/entities";
import {
  createImagePath,
  escapeMarkdownV2,
  SubmitFormReturn,
  supabase,
} from "@/shared";
import { Telegraf } from "telegraf";
import { Bot as MaxBot, ImageAttachment, Keyboard } from "@maxhub/max-bot-api";

const BOT_TOKEN = process.env.TG_BOT_TOKEN!;
const bot = new Telegraf(BOT_TOKEN);

const MAX_BOT_TOKEN = process.env.MAX_BOT_TOKEN!;
const maxBot = new MaxBot(MAX_BOT_TOKEN);

export const sendProductsAction = async (
  request: Request,
  products: Product[]
): Promise<SubmitFormReturn> => {
  console.log("max_user_id", request.max_user_id);
  try {
    if (request.source === "max" && request.max_user_id) {
      const userId = Number(request.max_user_id);

      for (const p of products) {
        const text = `${p.title}

Ёмкость: ${p.capacity}
Пусковой ток: ${p.current}
Полярность: ${p.polarity}
Габариты: ${p.longitude}x${p.width}x${p.height}
Изготовитель: ${p.manufacturer}
Обычная цена: ${p.standardPrice} ₽
Цена со сдачей: ${p.priceWithChange} ₽

Заявка #${request.id}`;

        const image = new ImageAttachment({ url: createImagePath(p.image) });
        await maxBot.api.sendMessageToUser(userId, text, {
          attachments: [image.toJson()],
        });
      }

      const keyboard = Keyboard.inlineKeyboard(
        products.map((p) => [
          Keyboard.button.callback(
            p.title,
            `select-battery-${request.id}-${p.id}`
          ),
        ])
      );

      const summaryText =
        request.delivery_method === "delivery"
          ? `Подбор завершён! ⚙️\nЯн лично проверил — вот аккумуляторы, которые подойдут вашему автомобилю.\n\nМы видим, что у вас выбрана доставка 🚚 — подскажите, какой вариант вам понравился больше всего? Выберите в меню ниже подходящий аккумулятор.\nПосле этого мы уточним адрес и номер для связи, чтобы всё было удобно для вас.\n\nЕсли остались вопросы или нужна консультация — звоните: 8-989-722-80-95`
          : `Подбор завершён! ⚙️\nЯн лично проверил — вот аккумуляторы, которые подойдут вашему автомобилю.\n\nПодскажите, какой вариант вам понравился больше всего? Выберите в меню ниже подходящий аккумулятор.\n\nЕсли остались вопросы или нужна консультация — звоните: 8-989-722-80-95`;

      await maxBot.api.sendMessageToUser(userId, summaryText, {
        attachments: [keyboard],
      });
    } else {
      for (const p of products) {
        const text = `${p.title}

Ёмкость: ${p.capacity}
Пусковой ток: ${p.current}
Полярность: ${p.polarity}
Габариты: ${p.longitude}x${p.width}x${p.height}
Изготовитель: ${p.manufacturer}
Обычная цена: ${p.standardPrice} ₽
Цена со сдачей: ${p.priceWithChange} ₽

Заявка #${request.id}`;

        await bot.telegram.sendPhoto(
          request.tg_user_id!,
          createImagePath(p.image),
          {
            caption: escapeMarkdownV2(text),
            parse_mode: "MarkdownV2",
          }
        );
      }

      const reply_markup = {
        inline_keyboard: products.map((p) => [
          {
            text: p.title,
            callback_data: `select-battery-${request.id}-${p.id}`,
          },
        ]),
      };

      if (request.delivery_method === "delivery") {
        await bot.telegram.sendMessage(
          request.tg_user_id!,
          escapeMarkdownV2(`*Подбор завершён!* ⚙️
Ян лично проверил — вот аккумуляторы, которые подойдут вашему автомобилю.

Мы видим, что у вас выбрана *доставка* 🚚 — подскажите, какой вариант вам понравился больше всего? *Выберите в меню ниже подходящий аккумулятор.*
После этого мы уточним адрес и номер для связи, чтобы всё было удобно для вас.

Если остались вопросы или нужна консультация — звоните: *8-989-722-80-95*`),
          { parse_mode: "MarkdownV2", reply_markup }
        );
      } else {
        await bot.telegram.sendMessage(
          request.tg_user_id!,
          escapeMarkdownV2(`*Подбор завершён!* ⚙️
Ян лично проверил — вот аккумуляторы, которые подойдут вашему автомобилю.

Подскажите, какой вариант вам понравился больше всего? *Выберите в меню ниже подходящий аккумулятор.*

Если остались вопросы или нужна консультация — звоните: *8-989-722-80-95*`),
          {
            parse_mode: "MarkdownV2",
            reply_markup,
          }
        );
      }
    }

    await supabase
      .from("battery_requests")
      .update({ admin_picked: true })
      .eq("id", request.id);

    return { ok: true };
  } catch (err) {
    console.log(err);
    return {
      ok: false,
      message:
        "Не удалось отправить аккумуляторы пользователю или произошла ошибка",
    };
  }
};
