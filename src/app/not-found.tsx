import { NotFoundPage } from "@/app-pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Страница не найдена — АМПЕР",
};

export default function NotFound() {
  return <NotFoundPage />;
}
