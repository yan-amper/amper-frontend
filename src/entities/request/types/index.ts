export type Request = {
  id: number;
  car_brand: string;
  car_model: string;
  engine_type: "petrol" | "diesel";
  description: string;
  production_year: number;
  delivery_method: "delivery" | "pickup";
  phone: string | null;
  tg_user_id: string | null;
  status: "new" | "in_progress" | "completed" | "cancelled";
  source: "website" | "tg";
  selected_battery: string | null;
  address: string | null;
  created_at: string;
};
