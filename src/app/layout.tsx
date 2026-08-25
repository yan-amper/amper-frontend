import {
  ProductModal,
  SelectionModal,
  TopLoader,
  YandexMetrika,
} from "@/features";
import { GlobalStyles, siteUrl } from "@/shared";
import { StyledComponentsRegistry } from "@/shared/lib/styled-components-registry";
import { Footer, Header } from "@/widgets";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";

// cyrillic обязателен: сайт целиком на русском. С одним только "latin"
// кириллица падала в системный фолбэк, и русский текст рендерился НЕ в Inter —
// в одном заголовке соседствовали два разных шрифта («Аккумуляторы Bosch»).
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  /**
   * Базовый адрес для всех относительных URL в метаданных дочерних страниц.
   * Без него Next подставляет в canonical и og:url localhost, а в проде —
   * пустую строку, и ссылка на превью в мессенджере ведёт в никуда.
   */
  metadataBase: new URL(siteUrl),
  title: "Аккумулятор автомобильный купить в АКБ центрах АМПЕР, Таганрог",
  description:
    "Купить аккумулятор в Таганроге по низким ценам с гарантией, установкой, обслуживанием и обменом отработанных аккумуляторов на новые в Аккумуляторных центрах 'АМПЕР' г.Таганрог",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "АМПЕР — аккумуляторный центр",
    title: "Аккумуляторы в Таганроге — АКБ центр АМПЕР",
    description:
      "Подбор, продажа и обмен автомобильных аккумуляторов в Таганроге. Проверка и установка на месте, старый АКБ в зачёт стоимости.",
    url: "/",
    images: [
      {
        url: "/shop-facade.webp",
        width: 1672,
        height: 941,
        alt: "Аккумуляторный центр «Ампер» в Таганроге",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <YandexMetrika />
          <GlobalStyles />
          <Suspense>
            <TopLoader />
          </Suspense>
          <SelectionModal />
          <ProductModal />
          <Header />
          <main>{children}</main>
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
