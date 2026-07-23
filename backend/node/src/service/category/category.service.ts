import { findCategories, saveCategory } from "../../repository/category.repository";

type CreateCategoryParam = {
    profile_id: number;
    name: string;
};

export const getCategories = async (profileId: number) => {
    return await findCategories(profileId);
};

export const createCategory = async ({ profile_id, name }: CreateCategoryParam) => {
    return await saveCategory(profile_id, name);
};
