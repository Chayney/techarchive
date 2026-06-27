import { createFavoriteArticlesHandler, deleteFavoriteArticlesHandler, getTrendArticlesHandler } from "../controller/article.controller";
import { Router } from "express";

export const articleRouter = Router();

articleRouter.get("/trend", getTrendArticlesHandler);
articleRouter.post("/favorite", createFavoriteArticlesHandler);
articleRouter.delete("/favorite", deleteFavoriteArticlesHandler);