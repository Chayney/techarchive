import { createClient } from "@supabase/supabase-js";

console.log("[BACKEND] SUPABASE_URL exists:", !!process.env.SUPABASE_URL);
console.log("[BACKEND] SUPABASE_ANON_KEY exists:", !!process.env.SUPABASE_ANON_KEY);

export const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
);