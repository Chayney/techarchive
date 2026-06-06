import { DataSource } from "typeorm";
import { Profile } from "../../domain/entity/profiles.entity";

export const ProfileData = async (dataSource: DataSource) => {
    const profileRepository = dataSource.getRepository(Profile);

    const profiles = [
        { name: "Taro Yamada", user: { id: 1 } },
        { name: "Hanako Suzuki", user: { id: 2 } },
        { name: "John Smith", user: { id: 3 } },
        { name: "Sara Tanaka", user: { id: 4 } },
        { name: "Mike Brown", user: { id: 5 } },
    ];

    const entities = profileRepository.create(profiles);

    await profileRepository.save(entities);

    console.log("Profiles seed complete:", await profileRepository.find());
};