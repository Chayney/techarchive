import { RequestHandler } from "express";
import {
    getFavoriteArticles,
    createFavoriteArticle,
    deleteFavoriteArticle,
} from "../service/favorite/favorite.service";

export const getFavoriteArticlesHandler: RequestHandler = async (_req, res) => {
    try {
        const favorites = await getFavoriteArticles();

        res.json(favorites);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "failed to get favorite articles",
        });
    }
};

export const createFavoriteArticlesHandler: RequestHandler = async (req, res) => {
    try {
        const { category_id, article_id } = req.body;

        const favorite = await createFavoriteArticle({
            category_id,
            article_id,
        });

        if (!favorite) {
            return res.status(409).json({
                message: "Already favorited",
            });
        }

        res.status(201).json(favorite);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const deleteFavoriteArticlesHandler: RequestHandler = async (req, res) => {
    try {
        const { category_id, article_id } = req.body;

        const deleted = await deleteFavoriteArticle({
            category_id,
            article_id,
        });

        if (!deleted) {
            return res.status(404).json({
                message: "not found",
            });
        }

        res.status(204).send();
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
