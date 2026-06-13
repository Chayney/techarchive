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
            profile: profiles[0],
        },
        {
            name: "Node.js",
            profile: profiles[0],
        },
        {
            name: "TypeORM",
            profile: profiles[1] ?? profiles[0],
        },
        {
            name: "AI",
            profile: profiles[1] ?? profiles[0],
        },
        {
            name: "Architecture",
            profile: profiles[0],
        },
    ];

    const entities = categoryRepository.create(categories);
    await categoryRepository.save(entities);

    // console.log(
    //     "Category seed complete:",
    //     await categoryRepository.find({ relations: { profile: true } })
    // );
};