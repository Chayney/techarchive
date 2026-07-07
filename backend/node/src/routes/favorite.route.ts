import { Router } from "express";
import { createFavoriteArticlesHandler, deleteFavoriteArticlesHandler, getFavoriteArticlesHandler } from "../controller/favorite.controller";
import { authMiddleware } from "../middleware/auth";

export const favoriteRouter = Router();

favoriteRouter.get("/favorites", getFavoriteArticlesHandler);
favoriteRouter.post("/favorite", authMiddleware, createFavoriteArticlesHandler);
favoriteRouter.delete("/favorite", authMiddleware, deleteFavoriteArticlesHandler);