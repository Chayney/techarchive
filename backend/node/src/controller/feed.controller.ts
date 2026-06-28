import { RequestHandler } from "express";
import { AppDataSource } from "../config/appDataSource";
import { Feed } from "../domain/entity/feeds.entity";

export const getFeedArticlesHandler: RequestHandler = async (_req, res) => {
    const db = AppDataSource.getInstance();
    const repo = db.getRepository(Feed);
    try {
        const feedArticles = await repo.find({
            relations: {
                article: true,
                platform: true
            },
            
        });

        res.json(feedArticles);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "failed to get feed articles"
        });
    }
}