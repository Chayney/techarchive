import { DataSource } from "typeorm";
import { Platform } from "../../domain/entity/platforms.entity";

export const PlatformData = async (dataSource: DataSource) => {
    const platformRepository = dataSource.getRepository(Platform);

    const platforms = [
        {
            name: "Qiita",
            siteUrl: "https://qiita.com",
            platformSiteType: 1,
            faviconUrl: "https://qiita.com/favicon.ico",
            isEng: false,
        },
        {
            name: "Zenn",
            siteUrl: "https://zenn.dev",
            platformSiteType: 1,
            faviconUrl: "https://zenn.dev/favicon.ico",
            isEng: false,
        },
        {
            name: "Medium",
            siteUrl: "https://medium.com",
            platformSiteType: 2,
            faviconUrl: "https://medium.com/favicon.ico",
            isEng: true,
        },
        {
            name: "Dev.to",
            siteUrl: "https://dev.to",
            platformSiteType: 2,
            faviconUrl: "https://dev.to/favicon.ico",
            isEng: true,
        },
        {
            name: "Hacker News",
            siteUrl: "https://news.ycombinator.com",
            platformSiteType: 3,
            faviconUrl: "https://news.ycombinator.com/favicon.ico",
            isEng: true,
        },
    ];

    const entities = platformRepository.create(platforms);
    await platformRepository.save(entities);

    console.log("Platforms seed complete:", await platformRepository.find());
};