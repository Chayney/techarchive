import { useEffect, useState } from "react";
import type { FavoriteArticle } from "../../types/favorite";

export const useFavoriteTemplate = () => {
    const [favoriteArticles, setFavoriteArticle] = useState<FavoriteArticle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await fetch(
                "http://localhost:3000/api/favorites"
            );

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