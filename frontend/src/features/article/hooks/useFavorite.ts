import { useState } from "react";

export const useFavorite = (profileId?: number) => {
    const [favoriteCategoryMap, setFavoriteCategoryMap] = useState<Record<string, boolean>>({});

    const [favoriteArticleMap, setFavoriteArticleMap] = useState<Record<number, boolean>>({});

    const [loading, setLoading] = useState(false);

    /**
     * Favorite ON/OFF
     */
    const toggleFavorite = async (
        articleId: number,
        categoryId: number
    ) => {
        // if (!profileId) return;

        setLoading(true);

        try {
            const key = `${articleId}-${categoryId}`;
            const isFavorite = favoriteCategoryMap[key] ?? false;

            if (isFavorite) {
                setFavoriteCategoryMap(prev => ({
                    ...prev,
                    [key]: false
                }));

                setFavoriteArticleMap(prev => ({
                    ...prev,
                    [articleId]: false
                }));

            } else {
                setFavoriteCategoryMap(prev => ({
                    ...prev,
                    [key]: true
                }));

                setFavoriteArticleMap(prev => ({
                    ...prev,
                    [articleId]: true
                }));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    /**
     * 判定
     */
    const isFavorited = (articleId: number) => {
        return favoriteArticleMap[articleId] ?? false;
    };

    const isCategoryFavorited = (
        articleId: number,
        categoryId: number
    ) => {
        const key = `${articleId}-${categoryId}`;

        return (favoriteCategoryMap[key] ?? false);
    };

    return {
        loading,
        favoriteCategoryMap,
        favoriteArticleMap,
        toggleFavorite,
        isFavorited,
        isCategoryFavorited
    };
};