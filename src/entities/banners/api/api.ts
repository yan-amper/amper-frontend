import { $api } from "@/shared";
import {
  Banner,
  CreateBannerPayload,
  DeleteBannerPayload,
  EditBannerPayload,
} from "./types";

export class BannersApi {
  static async getBanners(): Promise<Banner[]> {
    const { data } = await $api.get("/banners");
    return data;
  }

  static async createBanner({
    title,
    image,
  }: CreateBannerPayload): Promise<Banner> {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);

    const { data } = await $api.post("/banners/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return data.data;
  }

  static async deleteBanner({ id }: DeleteBannerPayload): Promise<number> {
    await $api.delete(`/banners/${id}`);
    return id;
  }

  static async editBanner({
    id,
    title,
    image,
  }: EditBannerPayload): Promise<Banner> {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("_method", "patch");

    const { data } = await $api.post(`/banners/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return data.data;
  }
}
