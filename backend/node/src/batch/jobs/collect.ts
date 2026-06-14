import { DataSource } from "typeorm";
import { qiitaArticleCrawler } from "./trend/qiita";
import { rssRepository } from "../infrastructure/rss";
import { qiitaApiRepository, zennApiRepository } from "../infrastructure/api";
import { Feed } from "../../domain/entity/feeds.entity";
import { zennArticleCrawler } from "./trend/zenn";

export async function collectJob(dataSource: DataSource): Promise<void> {
    console.log("collect start");

    try {
        const feedRepo = dataSource.getRepository(Feed);
        const feeds = await feedRepo.find({
            relations: {
                platform: true,
            },
        });

        for (const feed of feeds) {
            const platform = feed.platform;

            if (platform.name === "Qiita") {
                await qiitaArticleCrawler(
                    dataSource,
                    rssRepository,
                    qiitaApiRepository,
                    {
                        feed_id: feed.id,
                        platform_id: feed.platform.id,
                        rss_url: feed.rss_url,
                    }
                );
            }

            if (platform.name === "Zenn") {
                await zennArticleCrawler(
                    dataSource,
                    rssRepository,
                    zennApiRepository,
                    {
                        feed_id: feed.id,
                        platform_id: feed.platform.id,
                        rss_url: feed.rss_url,
                    }
                );
            }
        }

        console.log("collect success");
    } catch (err) {
        console.error("collect error", err);
        throw err;
    }
}