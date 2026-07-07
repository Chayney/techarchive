import { useEffect, useState } from "react";
import type { FavoriteArticle } from "../../types/favorite";
import { API_URL } from "../../../../shared/api/apiClient";

export const useFavoriteTemplate = () => {
    const [favoriteArticles, setFavoriteArticle] = useState<FavoriteArticle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await fetch(`${API_URL}/favorites`);

            const json: FavoriteArticle[] =
                await res.json();

            setFavoriteArticle(json);
            setLoading(false);
        };

        fetchData();
    }, []);
    return {
        favoriteArticles,
        loading
    }
}