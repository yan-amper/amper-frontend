import { AdminPage } from "@/app-pages";
import { ProductsApi, Request } from "@/entities";
import { supabase } from "@/shared";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

// Служебная страница — из поиска её быть не должно.
export const metadata: Metadata = {
  title: "Панель заявок — АМПЕР",
  robots: { index: false, follow: false, nocache: true },
};

export default async function Page() {
  const { data } = await supabase
    .from("battery_requests")
    .select("*")
    .returns<Request[]>();

  const products = await ProductsApi.getProducts();

  const filteredProducts = products.filter((p) => p.relevance);

  return <AdminPage requests={data ?? []} products={filteredProducts} />;
}
