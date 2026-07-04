import { Router } from "express";
import { createFolderHandler, getFeedOptionsHandler, getFolderArticlesHandler, getFolderHandler } from "../controller/folder.controller";

export const folderRouter = Router();

// グルーピングする親フォルダ
folderRouter.get("/folders", getFolderHandler);
folderRouter.post("/folder", createFolderHandler);

// 親フォルダにまとめられた各集約フォルダ
// React/QiitaやReact/Zennのようなリストを作る
folderRouter.get("/tags/platforms", getFeedOptionsHandler);
folderRouter.get("/folders/:folder_id/articles", getFolderArticlesHandler);