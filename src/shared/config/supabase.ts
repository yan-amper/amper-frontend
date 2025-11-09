import { createClient } from "@supabase/supabase-js";
import { supabaseKey, supabaseUrl } from "./variables";

export const supabase = createClient(supabaseUrl, supabaseKey);
