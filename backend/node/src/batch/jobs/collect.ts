import { DataSource } from "typeorm";
import { qiitaArticleCrawler } from "./trend/qiita";
import { rssRepository } from "../infrastructure/rss";
import { qiitaApiRepository } from "../infrastructure/api";
import { Feed } from "../../domain/entity/feeds.entity";
import { Platform } from "../../domain/entity/platforms.entity";

export async function collectJob(dataSource: DataSource): Promise<void> {
    console.log("collect start");

    try {
        const feedRepo = dataSource.getRepository(Feed);
        const platformRepo = dataSource.getRepository(Platform);

        const feeds = await feedRepo.find({
            relations: {
                platform: true,
            },
        });

        for (const feed of feeds) {
            const platform = feed.platform;

            await qiitaArticleCrawler(
                dataSource,
                rssRepository,
                qiitaApiRepository,
                {
                    feed_id: feed.id,
                    platform_id: platform.id,
                    feed_name: feed.name,
                    rss_url: feed.rss_url,
                    is_eng: platform.is_eng ?? false,
                }
            );
        }

        console.log("collect success");
    } catch (err) {
        console.error("collect error", err);
        throw err;
    }
}