import { Router } from "express";
import { createFavoriteArticlesHandler, deleteFavoriteArticlesHandler, getFavoriteArticlesHandler } from "../controller/favorite.controller";

export const favoriteRouter = Router();

favoriteRouter.get("/favorites", getFavoriteArticlesHandler);
favoriteRouter.post("/favorite", createFavoriteArticlesHandler);
favoriteRouter.delete("/favorite", deleteFavoriteArticlesHandler);