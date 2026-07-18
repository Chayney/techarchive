import { Router } from "express";
import { createFolderHandler, createFolderTagPlatformsHandler, deleteFolderHandler, getFeedOptionsHandler, getFolderArticlesHandler, getFolderHandler, updateFolderHandler } from "../controller/folder.controller";
import { authMiddleware, optionalAuthMiddleware } from "../middleware/auth";

export const folderRouter = Router();

// グルーピングする親フォルダ
folderRouter.get("/folders", optionalAuthMiddleware, getFolderHandler);
folderRouter.post("/folder", authMiddleware, createFolderHandler);
folderRouter.put("/folder/:id", authMiddleware, updateFolderHandler);
folderRouter.delete("/folder/:id", authMiddleware, deleteFolderHandler);

// 親フォルダにまとめられた各集約フォルダ
// React/QiitaやReact/Zennのようなリストを作る
folderRouter.get("/tags/platforms", getFeedOptionsHandler);
folderRouter.post("/tags/platforms", authMiddleware, createFolderTagPlatformsHandler);

// 子フォルダの記事一覧取得
folderRouter.get("/tags/platforms/:tagPlatformId", getFolderArticlesHandler);