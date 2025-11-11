import { NextRequest, NextResponse } from "next/server";
import { escapeMarkdownV2, supabase } from "@/shared";
import { Telegraf } from "telegraf";
import { getDeliveryText, getEngineText, getSource, Request } from "@/entities";

const BOT_TOKEN = process.env.TG_BOT_TOKEN!;
const ADMIN_CHAT_ID = process.env.TG_ADMIN_ID!;

const bot = new Telegraf(BOT_TOKEN);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { request } = body;

    if (!request) {
      return NextResponse.json(
        { success: false, error: "Missing or invalid requestId" },
        { status: 400 }
      );
    }

    const messageText = `
*Новая заявка #${request.id}*
Марка авто: ${request.car_brand}
Модель авто: ${request.car_model}
Тип двигателя: ${getEngineText(request.engine_type)}
Год выпуска: ${request.production_year}
Способ получения: ${getDeliveryText(request.delivery_method)}
Телефон: ${request.phone}
Откуда: ${getSource(request.source)}
`;

    try {
      await bot.telegram.sendMessage(
        ADMIN_CHAT_ID,
        escapeMarkdownV2(messageText),
        { parse_mode: "MarkdownV2" }
      );
    } catch (err: any) {
      console.error(
        `Failed to send message to admin ${ADMIN_CHAT_ID}:`,
        err.message
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
