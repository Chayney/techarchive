// supabaseのaccess_tokenをNode.jsで検証
import { supabase } from "../lib/supabaseClient";

export async function getAccessToken() {
    const { data: { session } } = await supabase.auth.getSession();

    return session?.access_token;
}