import { CatalogPage, CatalogPageProps } from "@/app-pages";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Каталог аккумуляторов в Таганроге — АКБ центр АМПЕР",
  description:
    "Каталог автомобильных аккумуляторов в Таганроге: подбор по ёмкости, полярности, пусковому току и производителю. Гарантия, установка и обмен старого АКБ.",
};

const Page = (props: CatalogPageProps) => <CatalogPage {...props} />;

export default Page;
