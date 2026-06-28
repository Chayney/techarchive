import { Router } from "express";
import { getFeedArticlesHandler } from "../controller/feed.controller";

export const feedRouter = Router();

feedRouter.get("/feeds", getFeedArticlesHandler);