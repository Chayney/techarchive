import { useEffect, useState } from "react";
import type { Article, Category } from "../types/article";

type FavoriteArticle = {
    category: Category;
    likesCount: number;
    article: Article;
    articleId: number;
    category_id: number;
};

type FavoriteResponse = {
    categories: Category[];
    favoriteArticles: FavoriteArticle[];
};

export const useFavorite = () => {
    const [favoriteResponse, setFavoriteResponse] = useState<FavoriteResponse>({
        categories: [],
        favoriteArticles: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    "http://localhost:3000/api/favorites"
                );

                const data: FavoriteResponse = await res.json();
                setFavoriteResponse(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return {
        favoriteResponse,
        loading
    };
};