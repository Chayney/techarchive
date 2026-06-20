import { AppDataSource } from "../config/appDataSource";
import { RequestHandler } from "express";
import { Category } from "../domain/entity/categories.entity";

export const getCategoriesHandler: RequestHandler = async (_req, res) => {
    try {
        const db = AppDataSource.getInstance();

        const repo = db.getRepository(Category);

        const categories = await repo.find();

        res.json(categories);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "failed to get trend articles"
        });
    }
}

export const createCategoryHandler: RequestHandler = async (req, res) => {
    try {
        const db = AppDataSource.getInstance();
        const repo = db.getRepository(Category);
        
        const { profile_id, name } = req.body;
        const category = repo.create({ profile_id, name });
        const savedCategory = await repo.save(category);

        res.status(201).json(savedCategory);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "failed to create category"
        });
    }
}