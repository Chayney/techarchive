import { Router } from "express";
import { getPlatformTagsHandler, saveFolderPlatformsHandler } from "../controller/folder_platform.controller";

export const folderRouter = Router();

folderRouter.get("/folder/platform/tags", getPlatformTagsHandler);
folderRouter.post("/folder/platforms", saveFolderPlatformsHandler);