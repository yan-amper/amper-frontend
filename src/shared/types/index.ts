export type SubmitFormReturn =
  | {
      ok: true;
    }
  | {
      ok: false;
      message: string;
    };
