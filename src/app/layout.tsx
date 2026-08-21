import {
  ProductModal,
  SelectionModal,
  TopLoader,
  YandexMetrika,
} from "@/features";
import { GlobalStyles } from "@/shared";
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
  title: "Аккумулятор автомобильный купить в АКБ центрах АМПЕР, Таганрог",
  description:
    "Купить аккумулятор в Таганроге по низким ценам с гарантией, установкой, обслуживанием и обменом отработанных аккумуляторов на новые в Аккумуляторных центрах 'АМПЕР' г.Таганрог",
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
