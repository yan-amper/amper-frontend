// Только ПУБЛИЧНЫЕ переменные. Префикс NEXT_PUBLIC_ означает «положи это
// в браузерный бандл», поэтому ничего секретного здесь быть не должно.
// Ключи Supabase и учётка админа живут в @/shared/server.
export const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const yandexId = process.env.NEXT_PUBLIC_YANDEX_ID;
export const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER;
export const formattedPhoneNumber = phoneNumber
  ? `+${phoneNumber[0]} (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 9)}-${phoneNumber.slice(9)}`
  : "";

/**
 * Канонический адрес сайта. Нужен абсолютным URL в метаданных: canonical,
 * Open Graph и sitemap относительные пути не принимают — поисковик и
 * мессенджер видят их со своего домена, а не с нашего.
 *
 * Фолбэк на прод-домен, а не на localhost: если переменную забудут завести
 * на сервере, лучше выдать правильные canonical, чем разослать в индекс
 * ссылки на http://localhost:3000.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://ampercenter.ru"
).replace(/\/$/, "");
