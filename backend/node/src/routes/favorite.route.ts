import { Router } from "express";
import { createFavoriteArticlesHandler, deleteFavoriteArticlesHandler, getFavoriteArticlesHandler } from "../controller/favorite.controller";
import { authMiddleware, optionalAuthMiddleware } from "../middleware/auth";

export const favoriteRouter = Router();

favoriteRouter.get("/favorites", optionalAuthMiddleware, getFavoriteArticlesHandler);
favoriteRouter.post("/favorite", authMiddleware, createFavoriteArticlesHandler);
favoriteRouter.delete("/favorite", authMiddleware, deleteFavoriteArticlesHandler);