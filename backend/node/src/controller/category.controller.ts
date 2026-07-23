import { RequestHandler } from "express";
import { getCategories, createCategory } from "../service/category/category.service";

export const getCategoriesHandler: RequestHandler = async (req, res) => {
    try {
        const profileId = req.user?.profile_id ?? 2;

        console.log("category profileId:", profileId);

        const categories = await getCategories(profileId);

        res.json(categories);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "failed to get categories",
        });
    }
};

export const createCategoryHandler: RequestHandler = async (req, res) => {
    try {
        const { profile_id, name } = req.body;

        const category = await createCategory({
            profile_id,
            name,
        });

        res.status(201).json(category);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "failed to create category",
        });
    }
};
