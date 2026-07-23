import { RequestHandler } from "express";
import {
    getBookmarkArticles,
    createBookmarkArticle,
    deleteBookmarkArticle,
} from "../service/bookmark/bookmark.service";

export const getBookmarkArticlesHandler: RequestHandler = async (req, res) => {
    try {
        const profileId = req.user?.profile_id ?? 2;

        const bookmarks = await getBookmarkArticles(profileId);

        res.json(bookmarks);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "failed to get bookmark articles",
        });
    }
};

export const createBookmarkArticlesHandler: RequestHandler = async (req, res) => {
    try {
        const { profile_id, article_id } = req.body;

        const bookmark = await createBookmarkArticle({
            profile_id,
            article_id,
        });

        if (!bookmark) {
            return res.status(409).json({
                message: "Already bookmarked",
            });
        }

        res.status(201).json(bookmark);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const deleteBookmarkArticlesHandler: RequestHandler = async (req, res) => {
    try {
        const { profile_id, article_id } = req.body;

        const deleted = await deleteBookmarkArticle({
            profile_id,
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
