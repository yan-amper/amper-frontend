import { apiUrl } from "../config";

export const createImagePath = (path: string): string =>
  `${apiUrl}/storage/app/public/${path}`;
