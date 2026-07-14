import { DataSource } from "typeorm";
import { Category } from "../../domain/entity/categories.entity";
import { Profile } from "../../domain/entity/profiles.entity";

export const CategoryData = async (dataSource: DataSource) => {
    const categoryRepository = dataSource.getRepository(Category);
    const profileRepository = dataSource.getRepository(Profile);

    // ゲスト用プロフィールを取得
    const guestProfile = await profileRepository.findOneBy({
        name: "Test",
    });

    if (!guestProfile) {
        throw new Error("Guest profile not found");
    }

    const categories = [
        {
            name: "React",
            profile_id: guestProfile.id,
        },
        {
            name: "Next.js",
            profile_id: guestProfile.id,
        },
        {
            name: "TypeScript",
            profile_id: guestProfile.id,
        },
        {
            name: "AWS",
            profile_id: guestProfile.id,
        },
        {
            name: "GCP",
            profile_id: guestProfile.id,
        },
    ];

    const entities = categoryRepository.create(categories);

    await categoryRepository.save(entities);

    console.log("Categories seed complete:", await categoryRepository.find());
};