import { getTrendArticlesHandler } from "../controller/trend.controller";
import { Router } from "express";

export const trendRouter = Router();

trendRouter.get("/trends", getTrendArticlesHandler);