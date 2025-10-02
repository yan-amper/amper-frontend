import { $api } from "@/shared";
import { Banner } from "./types";

export class BannersApi {
  static async getBanners(): Promise<Banner[]> {
    const { data } = await $api.get("/banners");
    return data;
  }
}
