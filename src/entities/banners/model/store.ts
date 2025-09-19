import { createStore, createEffect, sample, createEvent } from "effector";
import {
  Banner,
  BannersApi,
  CreateBannerPayload,
  DeleteBannerPayload,
  EditBannerPayload,
} from "../api";
import { notificationsModel, ToastTypes } from "@/entities";

export const $banners = createStore<Banner[]>([]);
export const $bannersError = createStore<string | null>(null);

export const setBanners = createEvent<Banner[]>();

export const getBannersFx = createEffect<void, Banner[], Error>(
  BannersApi.getBanners
);

export const createBannerFx = createEffect<CreateBannerPayload, Banner, Error>(
  BannersApi.createBanner
);

export const deleteBannerFx = createEffect<DeleteBannerPayload, number, Error>(
  BannersApi.deleteBanner
);

export const editBannerFx = createEffect<EditBannerPayload, Banner, Error>(
  BannersApi.editBanner
);

$banners
  .on(setBanners, (_, banners) => banners)
  .on(getBannersFx.doneData, (_, banners) => banners)
  .on(createBannerFx.doneData, (state, banner) => [...state, banner])
  .on(deleteBannerFx.doneData, (state, id) =>
    state.filter((banner) => banner.id !== id)
  )
  .on(editBannerFx.doneData, (state, updated) =>
    state.map((banner) => (banner.id === updated.id ? updated : banner))
  );

$bannersError
  .on(
    [
      getBannersFx.failData,
      createBannerFx.failData,
      deleteBannerFx.failData,
      editBannerFx.failData,
    ],
    (_, error) => error.message
  )
  .reset([
    getBannersFx.done,
    createBannerFx.done,
    deleteBannerFx.done,
    editBannerFx.done,
  ]);

sample({
  clock: createBannerFx.doneData,
  fn: () => ({ message: "Успешно сохранено", type: ToastTypes.SUCCESS }),
  target: notificationsModel.showNotify,
});

sample({
  clock: deleteBannerFx.doneData,
  fn: () => ({ message: "Успешно удалено", type: ToastTypes.SUCCESS }),
  target: notificationsModel.showNotify,
});

sample({
  clock: editBannerFx.doneData,
  fn: () => ({ message: "Успешно изменено", type: ToastTypes.SUCCESS }),
  target: notificationsModel.showNotify,
});

sample({
  clock: [
    getBannersFx.failData,
    createBannerFx.failData,
    deleteBannerFx.failData,
    editBannerFx.failData,
  ],
  fn: () => ({
    message: "Упс... Запрос не прошел, попробуйте позже",
    type: ToastTypes.ERROR,
  }),
  target: notificationsModel.showNotify,
});
