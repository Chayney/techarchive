import { useState, useEffect } from "react"
import { getAccessToken, onAuthChange } from "../../../api/supabaseClient";

export const useHeader = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLogin = async () => {
            const token = await getAccessToken();
            setIsLoggedIn(!!token);
        };

        // 初回判定
        checkLogin();

        // ログイン・ログアウト時に再判定
        const unsubscribe = onAuthChange(() => {
            checkLogin();
        });

        return unsubscribe;
    }, []);

    return {
        isLoggedIn
    }
}