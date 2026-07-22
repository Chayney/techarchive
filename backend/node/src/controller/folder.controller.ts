import { RequestHandler } from "express";
import {
    getFeedOptions,
    getFolderArticles,
    createFolder,
    createFolderTags,
    getFolders,
    updateFolder,
    deleteFolder,
} from "../service/folder/folder.service";

/**
 * Feed選択UI用
 * □ React / Zenn
 * □ AI / X
 */
export const getFeedOptionsHandler: RequestHandler = async (_req, res) => {
    try {
        const result = await getFeedOptions();

        res.json(result);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "failed to get feed options",
        });
    }
};

/**
 * getFeedOptionsHandlerで作成した以下を集約する
 * □ React / Zenn
 * □ AI / X
 */
export const getFolderArticlesHandler: RequestHandler = async (req, res) => {
    try {
        const id = Number(req.params.tagPlatformId);

        const result = await getFolderArticles(id);

        res.json(result);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "failed to get tag/platform articles",
        });
    }
};

/**
 * getFolderArticlesHandlerで作成した以下をユーザーが作成したフォルダによりグルーピングされる
 *  React
 * □ React / Zenn
 * □ React / Qiita
 */
export const createFolderHandler: RequestHandler = async (req, res) => {
    try {
        const result = await createFolder(req.body.name, req.user.id);

        res.json(result);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "failed to create folder",
        });
    }
};

// フォルダ作成と同時に作成したフォルダに閲覧記事リストを登録
export const createFolderTagPlatformsHandler: RequestHandler = async (req, res) => {
    try {
        const result = await createFolderTags(req.body.folder_id, req.body.items);

        res.status(201).json(result);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "failed to create folder tag platforms",
        });
    }
};

// グルーピングされたフォルダの一覧を返却
export const getFolderHandler: RequestHandler = async (req, res) => {
    try {
        const profileId = req.user?.profile_id ?? 2;

        const result = await getFolders(profileId);

        res.json(result);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "failed to get folders",
        });
    }
};

export const updateFolderHandler: RequestHandler = async (req, res) => {
    try {
        const result = await updateFolder({
            id: Number(req.params.id),
            name: req.body.name,
            items: req.body.items,
        });

        res.json(result);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "failed to update folder",
        });
    }
};

export const deleteFolderHandler: RequestHandler = async (req, res) => {
    try {
        await deleteFolder(Number(req.params.id));

        res.json({
            message: "folder deleted",
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "failed to delete folder",
        });
    }
};
