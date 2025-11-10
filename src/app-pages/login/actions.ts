"use server";

import { SubmitFormReturn } from "@/shared";

export const loginAction = async (
  login: string,
  password: string
): Promise<SubmitFormReturn> => {
  if (login === "yan-amper" && password === "yan-amper") {
    return { ok: true };
  }
  return { ok: false, message: "Неправильный логин или пароль" };
};
