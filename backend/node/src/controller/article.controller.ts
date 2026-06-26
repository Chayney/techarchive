import { Article } from "../domain/entity/articles.entity";
import { AppDataSource } from "../config/appDataSource";
import { RequestHandler } from "express";
import { Trend } from "../domain/entity/trends.entity";
import { Favorite } from "../domain/entity/favorites.entity";

export const getTrendArticlesHandler: RequestHandler = async (_req, res) => {
    const db = AppDataSource.getInstance();
    const repo = db.getRepository(Trend);
    try {
        const trendArticles = await repo.find({
            relations: {
                article: true,
                platform: true
            },
            order: {
                likes_count: "DESC"
            },
            take: 20
        });

        res.json(trendArticles);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "failed to get trend articles"
        });
    }
}

export const createFavoriteArticlesHandler: RequestHandler = async (req, res) => {
    const db = AppDataSource.getInstance();
    const repo = db.getRepository(Favorite);
    try {
        const favoriteArticle = req.body();
        console.log(favoriteArticle);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "success to add favorite article"
        });
    }
}