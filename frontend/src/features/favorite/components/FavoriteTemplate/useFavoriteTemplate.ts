import { useEffect, useState } from "react";
import type { FavoriteArticle } from "../../types/favorite";
import { API_URL } from "../../../../shared/api/apiClient";
import { getAccessToken, onAuthChange } from "../../../../shared/api/supabaseClient";

export const useFavoriteTemplate = () => {
    const [favoriteArticles, setFavoriteArticle] = useState<FavoriteArticle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            const token = await getAccessToken();

            const res = await fetch(`${API_URL}/favorites`, {
                headers: token
                    ? { Authorization: `Bearer ${token}` }
                    : {},
            });

            if (!res.ok) {
                throw new Error("お気に入り取得失敗");
            }

            const json: FavoriteArticle[] = await res.json();

            setFavoriteArticle(json);
            setLoading(false);
        };

        fetchData();

        const unsubscribe = onAuthChange(() => {
            fetchData();
        });

        return unsubscribe;
    }, []);

    return {
        favoriteArticles,
        loading,
    };
};