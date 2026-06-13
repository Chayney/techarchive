import { MigrationDataSource } from "../../config/migrationDataSource";
import { Platform } from "../../domain/entity/platforms.entity";
import { Feed } from "../../domain/entity/feeds.entity";
import { Category } from "../../domain/entity/categories.entity";
import { TrendPlatformType } from "../../constant/trendPlatformType";

const seedJob = async () => {
    const dataSource = await MigrationDataSource.initialize();

    console.log("🌱 Seed start...");

    try {
        await dataSource.transaction(async (manager) => {
            const platformRepo = manager.getRepository(Platform);
            const feedRepo = manager.getRepository(Feed);
            const categoryRepo = manager.getRepository(Category);

            const CATEGORIES = [
                { seedCategoryID: 2, name: "React", type: 1 },
            ];

            const PLATFORMS = [
                {
                    name: "Qiita",
                    site_url: "https://qiita.com/",
                    favicon_url: "https://cdn.qiita.com/assets/favicons/public/apple-touch-icon.png",
                    is_eng: false,
                },
                {
                    name: "Zenn",
                    site_url: "https://zenn.dev/",
                    favicon_url: "https://zenn.dev/images/logo-transparent.png",
                    is_eng: false,
                },
            ];

            const FEEDS = [
                {
                    platform_name: "Qiita",
                    name: "Qiitaのトレンド",
                    description: "Qiitaで人気の記事一覧です。",
                    rss_url: "https://qiita.com/popular-items/feed.atom",
                    site_url: "https://qiita.com/trend",
                    thumbnail_url: "https://cdn.qiita.com/assets/qiita-ogp.png",
                    favicon_url: "https://cdn.qiita.com/assets/favicons/public/apple-touch-icon.png",
                    seedCategoryID: 2,
                    trend_platform_type: TrendPlatformType.QIITA,
                },
                {
                    platform_name: "Zenn",
                    name: "Zennトレンド",
                    description: "Zennで人気の記事一覧です。",
                    rss_url: "https://zenn.dev/feed",
                    site_url: "https://zenn.dev/",
                    thumbnail_url: "https://static.zenn.studio/images/logo-only-dark.png",
                    favicon_url: "https://static.zenn.studio/images/logo-transparent.png",
                    seedCategoryID: 2,
                    trend_platform_type: TrendPlatformType.ZENN,
                },
            ];

            for (const c of CATEGORIES) {
                let category = await categoryRepo.findOne({
                    where: { name: c.name },
                });

                if (!category) {
                    category = await categoryRepo.save({
                        name: c.name,
                        type: c.type,
                    });
                }

                for (const p of PLATFORMS) {
                    if (p.name !== FEEDS.find(f => f.platform_name === p.name)?.platform_name) {
                        continue;
                    }

                    let platform = await platformRepo.findOne({
                        where: { site_url: p.site_url },
                    });

                    if (!platform) {
                        platform = await platformRepo.save({
                            name: p.name,
                            site_url: p.site_url,
                            favicon_url: p.favicon_url,
                            platform_site_type: 1,
                            is_eng: p.is_eng,
                        });
                    }

                    for (const f of FEEDS) {
                        if (f.platform_name !== p.name) continue;
                        if (f.seedCategoryID !== c.seedCategoryID) continue;

                        const exists = await feedRepo.findOne({
                            where: {
                                name: f.name,
                            },
                        });

                        if (exists) {
                            continue;
                        }

                        await feedRepo.save({
                            name: f.name,
                            description: f.description,
                            rss_url: f.rss_url,
                            site_url: f.site_url,
                            thumbnail_url: f.thumbnail_url,
                            favicon_url: f.favicon_url,
                            trend_platform_type: f.trend_platform_type,
                            platform: platform,
                            category: category,
                        });
                    }
                }
            }

            console.log("🎉 Seed completed");
        });
    } catch (err) {
        console.error("❌ Seed failed:", err);
        throw err;
    } finally {
        await dataSource.destroy();
    }
};

seedJob().catch(console.error);