import { RequestHandler } from "express";
import { AppDataSource } from "../config/appDataSource";
import { Favorite } from "../domain/entity/favorites.entity";

export const getFavoriteArticlesHandler: RequestHandler = async (_req, res) => {
    const db = AppDataSource.getInstance();
    const repo = db.getRepository(Favorite);
    try {
        const favoriteArticles = await repo.find({
            relations: {
                article: {
                    platform: true
                },
                category: true
            }
        });

        res.json(favoriteArticles);
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
        const { category_id, article_id } = req.body;

        const exists = await repo.findOne({
            where: {
                category: { id: category_id },
                article: { id: article_id }
            }
        });

        if (exists) {
            return res.status(409).json({
                message: "Already favorited"
            });
        }

        const favorite = repo.create({
            category: { id: category_id },
            article: { id: article_id }
        });

        await repo.save(favorite);

        return res.status(201).json(favorite);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export const deleteFavoriteArticlesHandler: RequestHandler = async (req, res) => {
    const db = AppDataSource.getInstance();
    const repo = db.getRepository(Favorite);
    try {
        const { category_id, article_id } = req.body;

        const favorite = await repo.findOne({
            where: {
                article: { id: article_id },
                category: { id: category_id }
            }
        });

        if (!favorite) {
            return res.status(404).json({
                message: "not found"
            });
        }

        await repo.remove(favorite);

        res.status(204).send();

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}