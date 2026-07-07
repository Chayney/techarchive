import { Router } from "express";
import { createBookmarkArticlesHandler, deleteBookmarkArticlesHandler, getBookmarkArticlesHandler } from "../controller/bookmark.controller";
import { authMiddleware } from "../middleware/auth";

export const bookmarkRouter = Router();

bookmarkRouter.get("/bookmarks", authMiddleware, getBookmarkArticlesHandler);
bookmarkRouter.post("/bookmark", authMiddleware, createBookmarkArticlesHandler);
bookmarkRouter.delete("/bookmark", authMiddleware, deleteBookmarkArticlesHandler);