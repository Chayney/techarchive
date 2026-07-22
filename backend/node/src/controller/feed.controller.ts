import { RequestHandler } from "express";
import { getFeedArticles } from "../service/feed/feed.service";

export const getFeedArticlesHandler: RequestHandler = async (_req, res) => {
    try {
        const result = await getFeedArticles();

        res.json(result);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "failed to get feed articles",
        });
    }
};