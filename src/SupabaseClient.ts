import { createClient } from "@supabase/supabase-js";

const supabaseUrl =  import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL or ANON key is missing!");
}
export const supabase = createClient(supabaseUrl, supabaseAnonKey,{
  auth: {
    persistSession: true,
    storageKey: "app-auth-token",
    storage: window.localStorage,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    
  },
});
