// supabaseのaccess_tokenをNode.jsで検証
import { supabase } from "../lib/supabaseClient";

export const getAccessToken = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    return session?.access_token;
}

export const onAuthChange = (callback: () => void) => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
        callback();
    });

    return () => {
        subscription.unsubscribe();
    };
}