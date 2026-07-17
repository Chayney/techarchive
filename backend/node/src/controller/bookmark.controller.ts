import { RequestHandler } from "express";
import { AppDataSource } from "../config/appDataSource";
import { Bookmark } from "../domain/entity/bookmarks.entity";

export const getBookmarkArticlesHandler: RequestHandler = async (req, res) => {
    const db = AppDataSource.getInstance();
    const repo = db.getRepository(Bookmark);
    try {
        const profileId = req.user?.profile_id ?? 2;

        const bookmarkArticles = await repo.find({
            where: {
                profile_id: profileId,
            },
            relations: {
                article: {
                    platform: true,
                },
            },
        });

        res.json(bookmarkArticles);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "failed to get bookmark articles",
        });
    }
}

export const createBookmarkArticlesHandler: RequestHandler = async (req, res) => {
    const db = AppDataSource.getInstance();
    const repo = db.getRepository(Bookmark);
    try {
        const { profile_id, article_id } = req.body;

        const exists = await repo.findOne({
            where: {
                profile: { id: profile_id },
                article: { id: article_id }
            }
        });

        if (exists) {
            return res.status(409).json({
                message: "Already bookmarkd"
            });
        }

        const bookmark = repo.create({
            profile: { id: profile_id },
            article: { id: article_id }
        });

        await repo.save(bookmark);

        return res.status(201).json(bookmark);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export const deleteBookmarkArticlesHandler: RequestHandler = async (req, res) => {
    const db = AppDataSource.getInstance();
    const repo = db.getRepository(Bookmark);
    try {
        const { profile_id, article_id } = req.body;

        const bookmark = await repo.findOne({
            where: {
                article: { id: article_id },
                profile: { id: profile_id }
            }
        });

        if (!bookmark) {
            return res.status(404).json({
                message: "not found"
            });
        }

        await repo.remove(bookmark);

        res.status(204).send();

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}