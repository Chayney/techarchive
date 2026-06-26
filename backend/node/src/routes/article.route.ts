import { createFavoriteArticlesHandler, getTrendArticlesHandler } from "../controller/article.controller";
import { Router } from "express";

export const articleRouter = Router();

articleRouter.get("/trend/articles", getTrendArticlesHandler);
articleRouter.post("/favorite", createFavoriteArticlesHandler);