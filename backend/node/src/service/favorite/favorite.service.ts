import {
    findFavoriteArticles,
    findFavoriteArticle,
    saveFavoriteArticle,
    removeFavoriteArticle,
} from "../../repository/favorite.repository";

type FavoriteParam = {
    category_id: number;
    article_id: number;
};

export const getFavoriteArticles = async () => {
    return await findFavoriteArticles();
};

export const createFavoriteArticle = async ({ category_id, article_id }: FavoriteParam) => {
    const exists = await findFavoriteArticle(category_id, article_id);

    if (exists) {
        return null;
    }

    return await saveFavoriteArticle(category_id, article_id);
};

export const deleteFavoriteArticle = async ({ category_id, article_id }: FavoriteParam) => {
    const favorite = await findFavoriteArticle(category_id, article_id);

    if (!favorite) {
        return false;
    }

    await removeFavoriteArticle(favorite);

    return true;
};
