"use server";

import { FormData } from ".";

export const submitForm = async (formData: FormData) => {
  console.log(formData);
  await new Promise((res) =>
    setTimeout(() => {
      res(1);
    }, 2000)
  );
};
