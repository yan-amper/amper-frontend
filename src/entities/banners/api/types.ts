export type Banner = {
  id: number;
  title: string;
  image: string;
};

export type CreateBannerPayload = {
  title: string;
  image: File;
};

export type DeleteBannerPayload = { id: number };

export type EditBannerPayload = {
  id: number;
  title: string;
  image: File;
};
