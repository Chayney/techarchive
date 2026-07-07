import { Router } from "express";
import { createFolderHandler, createFolderTagPlatformsHandler, deleteFolderHandler, getFeedOptionsHandler, getFolderArticlesHandler, getFolderHandler, updateFolderHandler } from "../controller/folder.controller";

export const folderRouter = Router();

// グルーピングする親フォルダ
folderRouter.get("/folders", getFolderHandler);
folderRouter.post("/folder", createFolderHandler);
folderRouter.put("/folder/:id", updateFolderHandler);
folderRouter.delete("/folder/:id", deleteFolderHandler);

// 親フォルダにまとめられた各集約フォルダ
// React/QiitaやReact/Zennのようなリストを作る
folderRouter.get("/tags/platforms", getFeedOptionsHandler);
folderRouter.post("/tags/platforms", createFolderTagPlatformsHandler);

// 子フォルダの記事一覧取得
folderRouter.get("/tags/platforms/:tagPlatformId", getFolderArticlesHandler);