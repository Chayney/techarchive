import { RequestHandler } from "express";
import {
    getFeedOptions,
    getFolderArticles,
    createFolder,
    createFolderTagPlatforms,
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

        return res.json(result);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "failed to get feed options",
        });
    }
};

/**
 * getFeedOptionsHandlerで作成した以下を集約する
 * □ React / Zenn
 * □ AI / X
 */
// querybuilderでarticlesを返すようにしたいがsupabase clientと互換性に懸念があるためここまでの返却
export const getFolderArticlesHandler: RequestHandler = async (req, res) => {
    try {
        const result = await getFolderArticles(Number(req.params.tagPlatformId));

        return res.json(result);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "failed to get folder articles",
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
        const result = await createFolder({
            name: req.body.name,
            userId: req.user.id,
        });

        return res.json(result);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "failed to create folder",
        });
    }
};

// フォルダ作成と同時に作成したフォルダに閲覧記事リストを登録
export const createFolderTagPlatformsHandler: RequestHandler = async (req, res) => {
    try {
        const result = await createFolderTagPlatforms(req.body);

        return res.status(201).json(result);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "failed to create folder tag platforms",
        });
    }
};


// グルーピングされたフォルダの一覧を返却
export const getFolderHandler: RequestHandler = async (req, res) => {
    try {
        const result = await getFolders(req.user.profile_id);

        return res.json(result);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "failed to get folders",
        });
    }
};

export const updateFolderHandler: RequestHandler = async (req, res) => {
    try {
        const result = await updateFolder(Number(req.params.id), req.body);

        return res.json(result);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "failed to update folder",
        });
    }
};

export const deleteFolderHandler: RequestHandler = async (req, res) => {
    try {
        await deleteFolder(Number(req.params.id));

        return res.json({
            message: "folder deleted",
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "failed to delete folder",
        });
    }
};
