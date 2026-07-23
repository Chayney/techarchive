import { AppDataSource } from "../config/appDataSource";
import { Category } from "../domain/entity/categories.entity";

export const findCategories = async (profileId: number) => {
    const db = AppDataSource.getInstance();
    const repo = db.getRepository(Category);

    try {
        return await repo.find({
            where: {
                profile_id: profileId,
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error("Failed to find categories");
    }
};

export const saveCategory = async (profile_id: number, name: string) => {
    const db = AppDataSource.getInstance();
    const repo = db.getRepository(Category);

    try {
        const category = repo.create({
            profile_id,
            name,
        });

        return await repo.save(category);
    } catch (error) {
        console.error(error);
        throw new Error("Failed to create category");
    }
};
