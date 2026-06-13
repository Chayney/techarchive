import { DataSource } from "typeorm";
import { Platform } from "../../domain/entity/platforms.entity";

export const PlatformData = async (dataSource: DataSource) => {
    const platformRepository = dataSource.getRepository(Platform);

    const platforms = [
        {
            name: "Qiita",
            site_url: "https://qiita.com",
            platform_site_type: 1,
            favicon_url: "https://qiita.com/favicon.ico",
        },
        {
            name: "Zenn",
            site_url: "https://zenn.dev",
            platform_site_type: 1,
            favicon_url: "https://zenn.dev/favicon.ico",
        },
        {
            name: "Medium",
            site_url: "https://medium.com",
            platform_site_type: 2,
            favicon_url: "https://medium.com/favicon.ico",
        },
        {
            name: "Dev.to",
            site_url: "https://dev.to",
            platform_site_type: 2,
            favicon_url: "https://dev.to/favicon.ico",
        },
        {
            name: "Hacker News",
            site_url: "https://news.ycombinator.com",
            platform_site_type: 3,
            favicon_url: "https://news.ycombinator.com/favicon.ico",
        },
    ];

    const entities = platformRepository.create(platforms);
    await platformRepository.save(entities);

    console.log("Platforms seed complete:", await platformRepository.find());
};

export const seed_platforms = [
    {
        name: "Qiita",
        site_url: "https://qiita.com",
        favicon_url: "...",
        platform_site_type: 1,
    },
    {
        name: "Zenn",
        site_url: "https://zenn.dev",
        favicon_url: "...",
        platform_site_type: 1,
    },
];

export const seed_feeds = [
    {
        platform_name: "Qiita",
        name: "Qiitaトレンド",
        rss_url:
            "https://qiita.com/popular-items/feed.atom",
        trend_platform_type: 1,
    },
    {
        platform_name: "Zenn",
        name: "Zennトレンド",
        rss_url:
            "https://zenn.dev/feed",
        trend_platform_type: 2,
    },
];