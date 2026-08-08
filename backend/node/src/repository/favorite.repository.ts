import { AppDataSource } from "../config/appDataSource";
import { Favorite } from "../domain/entity/favorites.entity";

export const findFavoriteArticles = async (profile_id: number) => {
    const db = AppDataSource.getInstance();
    const repo = db.getRepository(Favorite);

    try {
        return await repo.find({
            where: {
                category: {
                    profile_id: profile_id,
                },
            },
            relations: {
                article: {
                    platform: true,
                },
                category: true,
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error("Failed to find favorite articles", {
            cause: error,
        });
    }
};

export const findFavoriteArticle = async (category_id: number, article_id: number) => {
    const db = AppDataSource.getInstance();
    const repo = db.getRepository(Favorite);

    return await repo.findOne({
        where: {
            category: {
                id: category_id,
            },
            article: {
                id: article_id,
            },
        },
    });
};

export const saveFavoriteArticle = async (category_id: number, article_id: number) => {
    const db = AppDataSource.getInstance();
    const repo = db.getRepository(Favorite);

    const favorite = repo.create({
        category: {
            id: category_id,
        },
        article: {
            id: article_id,
        },
    });

    return await repo.save(favorite);
};

export const removeFavoriteArticle = async (favorite: Favorite) => {
    const db = AppDataSource.getInstance();
    const repo = db.getRepository(Favorite);

    return await repo.remove(favorite);
};
