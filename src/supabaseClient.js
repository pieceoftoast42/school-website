import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hcxfamtbswhczobfhjjf.supabase.co" ;
const supabaseKey = "sb_publishable_jrQ0pDat8B0kor7R2upO4g_mUL06ziy";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
