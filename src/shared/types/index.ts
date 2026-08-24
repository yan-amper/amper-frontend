export type SubmitFormReturn =
  | {
      ok: true;
    }
  | {
      ok: false;
      message: string;
    };

/**
 * Учётка админа. Лежит в shared/types, а не в shared/server, чтобы
 * клиентские компоненты могли типизировать то, что держат в памяти,
 * не притаскивая server-only модуль.
 */
export type AdminCredentials = {
  login: string;
  password: string;
};

/** Реквизиты Supabase, которые выдаются браузеру ТОЛЬКО после логина. */
export type SupabaseAccess = {
  url: string;
  key: string;
};
