import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://gqyavyzgvwuvssnuxseg.supabase.co";

const supabaseKey =
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_Ob7cKuVzJ1-YNgjT8_YV2Q_L_85sFeE";

export const supabase = createClient(supabaseUrl, supabaseKey);
