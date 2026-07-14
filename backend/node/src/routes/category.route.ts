import { Router } from "express";
import { createCategoryHandler, getCategoriesHandler } from "../controller/category.controller";
import { optionalAuthMiddleware } from "../middleware/auth";

export const categoryRouter = Router();

categoryRouter.get("/categories", optionalAuthMiddleware, getCategoriesHandler);
categoryRouter.post("/category", createCategoryHandler);