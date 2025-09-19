export type Product = {
  id: number;
  title: string;
  image: string;
  manufacturer: string;
  longitude: number;
  height: number;
  width: number;
  capacity: string;
  current: number;
  polarity: string;
  recommendations: number;
  relevance: number;
  priceWithChange: number;
  popular: number;
  standardPrice: number;
  maintenanceSaving: number;
  created_at: string;
  updated_at: string;
};

export type DataValue = string | number | boolean;

export type GetFiltredProductPayload = {
  params: Record<string, DataValue>;
  type?: string;
};

export type DeleteProductPayload = { id: number };
