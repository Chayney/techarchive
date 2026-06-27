import { DataSource } from "typeorm";
import { Category } from "../../domain/entity/categories.entity";
import { Profile } from "../../domain/entity/profiles.entity";

export const CategoryData = async (dataSource: DataSource) => {
    const categoryRepository = dataSource.getRepository(Category);
    const profileRepository = dataSource.getRepository(Profile);

    // 既存Profileを取得（seed前提）
    const profiles = await profileRepository.find();

    if (profiles.length === 0) {
        throw new Error("Profiles must be seeded before Categories");
    }

    const categories = [
        {
            name: "React",
            profile_id: profiles[0].id,
        },
        {
            name: "Next.js",
            profile_id: profiles[0].id,
        },
        {
            name: "TypeScript",
            profile_id: profiles[0].id,
        },
        {
            name: "AWS",
            profile_id: profiles[0].id,
        },
        {
            name: "GCP",
            profile_id: profiles[0].id,
        },
    ];

    const entities = categoryRepository.create(categories);
    await categoryRepository.save(entities);
};