export const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const yandexId = process.env.NEXT_PUBLIC_YANDEX_ID;
export const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER;
export const formattedPhoneNumber = phoneNumber
  ? `+${phoneNumber[0]} (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 9)}-${phoneNumber.slice(9)}`
  : "";

// supabase
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
export const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
