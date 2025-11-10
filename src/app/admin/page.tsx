import { AdminPage } from "@/app-pages";
import { Request } from "@/entities";
import { supabase } from "@/shared";

export const dynamic = "force-dynamic";

export default async function Page() {
  const { data } = await supabase
    .from("battery_requests")
    .select("*")
    .returns<Request[]>();

  return <AdminPage requests={data ?? []} />;
}
