import { RequestHandler } from "express";
import { AppDataSource } from "../config/appDataSource";
import { Favorite } from "../domain/entity/favorites.entity";

export const getFavoriteArticlesHandler: RequestHandler = async (_req, res) => {
    const db = AppDataSource.getInstance();
    const repo = db.getRepository(Favorite);
    try {
        const favoriteArticles = await repo.find({
            relations: {
                article: true,
                category: true
            },
            take: 20
        });

        res.json(favoriteArticles);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "failed to get trend articles"
        });
    }
}