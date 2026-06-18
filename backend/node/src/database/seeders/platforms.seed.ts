import { DataSource } from "typeorm";
import { Platform } from "../../domain/entity/platforms.entity";

export const PlatformData = async (dataSource: DataSource) => {
    const platformRepository = dataSource.getRepository(Platform);

    const platforms = [
        {
            name: "Qiita",
            site_url: "https://qiita.com",
            favicon_url: "https://cdn.qiita.com/assets/favicons/public/apple-touch-icon-ec5ba42a24ae923f16825592efdc356f.png",
            platform_site_type: 1,
            is_eng: false
        },
        {
            name: "Zenn",
            site_url: "https://zenn.dev",
            favicon_url: "https://static.zenn.studio/images/logo-transparent.png",
            platform_site_type: 2,
            is_eng: false
        }
    ];

    const entities = platformRepository.create(platforms);
    await platformRepository.save(entities);

    console.log("Platforms seed complete:", await platformRepository.find());
};