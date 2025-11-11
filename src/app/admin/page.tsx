import { AdminPage } from "@/app-pages";
import { ProductsApi, Request } from "@/entities";
import { supabase } from "@/shared";

export const dynamic = "force-dynamic";

export default async function Page() {
  const { data } = await supabase
    .from("battery_requests")
    .select("*")
    .returns<Request[]>();

  const products = await ProductsApi.getProducts();

  const filteredProducts = products.filter((p) => p.relevance);

  return <AdminPage requests={data ?? []} products={filteredProducts} />;
}
