import { useMemo, useState } from "react";
import styles from "./style.module.css";
import { Layout } from "../../../../shared/components/layouts/BaseLayout/BaseLayout";
import { useFavorite } from "../../hooks/useFavorite";
import { useParams } from "react-router-dom";
import { useCategory } from "../../hooks/useCategory";
import { ArticleCard } from "../ArticleCard/ArticleCard";

export const FavoriteTemplate = () => {
    const { id } = useParams();
    const categoryId = Number(id);
    const { favoriteResponse } = useFavorite();
    
    const filteredFavorites = useMemo(() => {
        if (!favoriteResponse) return [];
        return favoriteResponse.favoriteArticles.filter(
            (favorite) => favorite.category_id === categoryId
        );
    }, [favoriteResponse, categoryId])
    
    const articleIdWithCategoryId = useMemo(() => {
        return favoriteResponse.favoriteArticles.map((fa) => ({
            categoryId: fa.category_id,
            articleId: fa.articleId,
        }));
    }, [favoriteResponse.favoriteArticles]);
    
    const { categories } = useCategory();

    return (
        <Layout>
            {filteredFavorites.map((favorite) => (
                <div>
                    <ArticleCard
                        article={favorite.article}
                        categories={categories}
                        favorites={articleIdWithCategoryId}
                    />
                </div>
            ))}
        </Layout>
    );
};