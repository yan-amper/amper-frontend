import { PrivacyPage } from "@/app-pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика обработки персональных данных — АМПЕР",
  description:
    "Как аккумуляторный центр «Ампер» обрабатывает и защищает персональные данные пользователей сайта.",
};

const Page = () => <PrivacyPage />;

export default Page;
