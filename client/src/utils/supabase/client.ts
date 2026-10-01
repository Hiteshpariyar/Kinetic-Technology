import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://gqyavyzgvwuvssnuxseg.supabase.co";

const supabaseKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_Ob7cKuVzJ1-YNgjT8_YV2Q_L_85sFeE";

export const createClient = () => createSupabaseClient(supabaseUrl, supabaseKey);
export const supabase = createClient();
