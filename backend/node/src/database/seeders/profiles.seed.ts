import { DataSource } from "typeorm";
import { Profile } from "../../domain/entity/profiles.entity";

export const ProfileData = async (dataSource: DataSource) => {
    const profileRepository = dataSource.getRepository(Profile);

    const profiles = [
        { name: "Admin", user: { id: 1 } },
        { name: "Test", user: { id: 2 } }
    ];

    const entities = profileRepository.create(profiles);

    await profileRepository.save(entities);

    console.log("Profiles seed complete:", await profileRepository.find());
};