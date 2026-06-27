import { Router } from "express";
import { getFavoriteArticlesHandler } from "../controller/favorite.controller";

export const favoriteRouter = Router();

favoriteRouter.get("/favorites", getFavoriteArticlesHandler);