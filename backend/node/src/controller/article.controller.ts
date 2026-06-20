import { Article } from "../domain/entity/articles.entity";
import { AppDataSource } from "../config/appDataSource";
import { RequestHandler } from "express";
import { Trend } from "../domain/entity/trends.entity";

export const getTrendArticlesHandler: RequestHandler = async (_req, res) => {
    try {
        const db = AppDataSource.getInstance();

        const repo = db.getRepository(Trend);

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