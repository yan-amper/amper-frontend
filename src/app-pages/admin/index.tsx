"use client";

import { useState } from "react";
import RequestsPage from "../requests";
import { LoginPage } from "../login";
import { AdminSession } from "./types";

/**
 * Раньше сюда пропсами приходили все заявки, загруженные на сервере ДО
 * какой-либо проверки, а `show` был просто визуальной шторкой поверх уже
 * отданных данных. Теперь страница стартует пустой, а данные и реквизиты
 * Supabase появляются только как результат успешного логина.
 */
export const AdminPage = () => {
  const [session, setSession] = useState<AdminSession | null>(null);

  return session ? (
    <RequestsPage session={session} />
  ) : (
    <LoginPage onSuccess={setSession} />
  );
};
