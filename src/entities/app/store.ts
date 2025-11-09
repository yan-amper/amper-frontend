import { createEvent, createStore } from "effector";
import { Form } from "./types";

export const setForm = createEvent<Partial<Form>>();

export const $form = createStore<Form>({
  open: false,
}).on(setForm, (state, data) => ({ ...state, ...data }));
