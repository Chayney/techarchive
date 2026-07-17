import { Router } from "express";
import { createBookmarkArticlesHandler, deleteBookmarkArticlesHandler, getBookmarkArticlesHandler } from "../controller/bookmark.controller";
import { authMiddleware, optionalAuthMiddleware } from "../middleware/auth";

export const bookmarkRouter = Router();

bookmarkRouter.get("/bookmarks", optionalAuthMiddleware, getBookmarkArticlesHandler);
bookmarkRouter.post("/bookmark", authMiddleware, createBookmarkArticlesHandler);
bookmarkRouter.delete("/bookmark", authMiddleware, deleteBookmarkArticlesHandler);