/**
 * Подпись и проверка токена сессии админки.
 *
 * Модуль намеренно НЕ импортирует ни `server-only`, ни `next/headers`:
 * его подключает middleware, который живёт в Edge-рантайме, а туда
 * ни то, ни другое не проходит. Секретов в клиентский бандл это не несёт —
 * Next подставляет переменные без префикса NEXT_PUBLIC_ как undefined,
 * и на клиенте функции просто ничего не подпишут.
 *
 * Криптография — Web Crypto (`crypto.subtle`), а не node:crypto: он
 * одинаково доступен и в Node, и в Edge.
 */

export const ADMIN_COOKIE = "amper_admin";

/** 30 дней. Продлевается при каждом заходе в админку — см. middleware. */
export const ADMIN_SESSION_TTL = 60 * 60 * 24 * 30;

const encoder = new TextEncoder();

const toBase64Url = (bytes: Uint8Array): string => {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

const fromBase64Url = (value: string) => {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded.padEnd(Math.ceil(padded.length / 4) * 4, "="));

  // Через new Uint8Array(length), а не Uint8Array.from: только так тип
  // получается с обычным ArrayBuffer, который принимает crypto.subtle.
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
};

/**
 * Ключ подписи собирается из случайного секрета И текущего пароля админки.
 *
 * Секрет — чтобы токен нельзя было подделать: без него правильную подпись
 * не посчитать, а значит куку не нарисовать руками в девтулсах.
 * Пароль в ключе — чтобы его смена мгновенно убивала все выданные куки.
 * Кнопки «выйти» в интерфейсе нет, и смена пароля в окружении остаётся
 * единственным способом разлогинить всех разом.
 */
const getKey = async (): Promise<CryptoKey | null> => {
  const secret = process.env.ADMIN_SESSION_SECRET;
  const password = process.env.ADMIN_PASSWORD;

  if (!secret || !password) {
    console.error(
      "ADMIN_SESSION_SECRET/ADMIN_PASSWORD не заданы в окружении — сессия админки не работает"
    );
    return null;
  }

  return crypto.subtle.importKey(
    "raw",
    encoder.encode(`${secret}:${password}`),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
};

/** Токен вида `<payload>.<подпись>`. Внутри payload — только срок годности. */
export const createAdminToken = async (): Promise<string | null> => {
  const key = await getKey();
  if (!key) return null;

  const exp = Math.floor(Date.now() / 1000) + ADMIN_SESSION_TTL;
  const payload = toBase64Url(encoder.encode(JSON.stringify({ v: 1, exp })));
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload)
  );

  return `${payload}.${toBase64Url(new Uint8Array(signature))}`;
};

/**
 * Токен считается валидным, только если подпись сошлась И срок не вышел.
 *
 * Срок лежит ВНУТРИ подписанного payload, а не только в атрибутах куки:
 * подкрутить дату у себя в браузере и продлить доступ не выйдет.
 * Сравнение подписи делает `crypto.subtle.verify` — оно не сравнивает
 * байты по одному и не даёт подобрать подпись по времени ответа.
 */
export const isValidAdminToken = async (token?: string): Promise<boolean> => {
  if (!token) return false;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const key = await getKey();
  if (!key) return false;

  try {
    const signatureOk = await crypto.subtle.verify(
      "HMAC",
      key,
      fromBase64Url(signature),
      encoder.encode(payload)
    );
    if (!signatureOk) return false;

    const { exp } = JSON.parse(
      new TextDecoder().decode(fromBase64Url(payload))
    ) as { exp?: number };

    return typeof exp === "number" && exp > Math.floor(Date.now() / 1000);
  } catch {
    // Битая база64, обрезанная кука, посторонний JSON — всё это просто
    // «не наш токен», а не повод ронять запрос.
    return false;
  }
};

/** Атрибуты куки. Одни и те же при выдаче и при продлении. */
export const adminCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/admin",
  maxAge: ADMIN_SESSION_TTL,
} as const;
