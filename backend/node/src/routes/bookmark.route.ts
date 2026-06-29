import { Router } from "express";
import { createBookmarkArticlesHandler, deleteBookmarkArticlesHandler, getBookmarkArticlesHandler } from "../controller/bookmark.controller";

export const bookmarkRouter = Router();

bookmarkRouter.get("/bookmarks", getBookmarkArticlesHandler);
bookmarkRouter.post("/bookmark", createBookmarkArticlesHandler);
bookmarkRouter.delete("/bookmark", deleteBookmarkArticlesHandler);