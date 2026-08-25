export type SubmitFormReturn =
  | {
      ok: true;
    }
  | {
      ok: false;
      message: string;
    };

/**
 * Учётка админа. Используется только на сервере, при разовой сверке
 * логина и пароля: в браузере пароль больше не живёт — доступ
 * подтверждает подписанная кука.
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
