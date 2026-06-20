import { Router } from "express";
import { createCategoryHandler, getCategoriesHandler } from "../controller/category.controller";

export const categoryRouter = Router();

categoryRouter.get("/categories", getCategoriesHandler);
categoryRouter.post("/category", createCategoryHandler);