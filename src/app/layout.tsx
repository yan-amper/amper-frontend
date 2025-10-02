import { ProductModal, TopLoader, YandexMetrika } from "@/features";
import { GlobalStyles } from "@/shared";
import { Footer, Header } from "@/widgets";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Аккумулятор автомобильный купить в АКБ центрах АМПЕР, Таганрог",
  description:
    "Купить аккумулятор в Таганроге по низким ценам с гарантией, установкой, обслуживанием и обменом отработанных аккумуляторов на новые в Аккумуляторных центрах 'АМПЕР' г.Таганрог",
  keywords:
    "Купить аккумулятор, ампер часы, зарядка аккумулятора, аккумулятор грузовой, зарядное для аккумулятора, аккумуляторы в Таганроге, купить аккумулятор в Таганроге, аккумулятор, аккумуляторов, как зарядить аккумулятор, как заряжать аккумулятор, аккумулятора, зарядное для автомобильного аккумулятора, акб, замена аккумулятора, аккумулятор 12 вольт, аккумулятор, мото , емкость аккумулятора , аккумулятор автомобильный купить , аккумуляторы для автомобиля , лучшие аккумуляторы , заряд аккумулятора , аккумулятор как снять, аккумулятор , садится аккумулятор , сел аккумулятор , аккумулятор ампер , где аккумулятор , напряжение аккумулятора, стоит аккумулятор , можно ли аккумулятор , год аккумулятора , ток аккумулятора, Ah, 60, 75, 190, 65, ампер часов, пусковой ток, аккумуляторный центр, аккумуляторный центр Ампер, аккумуляторный центр Таганрог, магазин аккумуляторов, акб центр, обмен аккумуляторов, сдать аккумулятор, аккумуляторы с доставкой",
};

export default async function RootLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <YandexMetrika />
        <GlobalStyles />
        <Suspense>
          <TopLoader />
        </Suspense>
        <ToastContainer position="top-right" autoClose={3000} />
        <ProductModal />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
