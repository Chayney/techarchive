// お気に入り記事の登録と削除
import { useState } from "react";

export const useFavorite = () => {
    const [favoriteCategoryMap, setFavoriteCategoryMap] = useState<Record<string, boolean>>({});
    const [favoriteArticleMap, setFavoriteArticleMap] = useState<Record<number, boolean>>({});

    // POST /favorites
    const addFavorite = async (
        articleId: number,
        categoryId: number
    ) => {
        const response = await fetch(
            "http://localhost:3000/api/favorite", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    article_id: articleId,
                    category_id: categoryId,
                }),
            }
        );

        if (!response.ok) {
            throw new Error("favorite登録失敗");
        }

        const key = `${articleId}-${categoryId}`;

        setFavoriteCategoryMap(prev => ({
            ...prev,
            [key]: true
        }));

        setFavoriteArticleMap(prev => ({
            ...prev,
            [articleId]: true
        }));
    };

    // DELETE /favorites
    const removeFavorite = async (
        articleId: number,
        categoryId: number
    ) => {
        const response = await fetch(
            "http://localhost:3000/api/favorite",
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    article_id: articleId,
                    category_id: categoryId
                })
            }
        );

        if (!response.ok) {
            throw new Error("favorite削除失敗");
        }

        const key = `${articleId}-${categoryId}`;

        setFavoriteCategoryMap(prev => ({
            ...prev,
            [key]: false
        }));

        // 同じ記事に他カテゴリーが残っているか確認
        setFavoriteArticleMap(prev => {
            const hasOtherFavorite =
                Object.entries(favoriteCategoryMap)
                    .some(([k, v]) => {
                        return (
                            k.startsWith(`${articleId}-`)
                            && v
                            && k !== key
                        )
                    });

            return {
                ...prev,
                [articleId]: hasOtherFavorite
            };
        });
    };

    const toggleFavorite = async (
        articleId: number,
        categoryId: number
    ) => {

        const key = `${articleId}-${categoryId}`;

        if (favoriteCategoryMap[key]) {
            await removeFavorite(
                articleId,
                categoryId
            );
        } else {
            await addFavorite(
                articleId,
                categoryId
            );
        }

    };

    return {
        favoriteCategoryMap,
        favoriteArticleMap,
        addFavorite,
        removeFavorite,
        toggleFavorite
    };
};