import { Feed } from "../../../domain/entity/feeds.entity";
import { AppDataSource } from "../../../config/appDataSource";
import { FeedInput } from "../types";

export const saveFeeds = async (articles: FeedInput[]): Promise<Feed[]> => {
    const db = AppDataSource.getInstance();

    const repo = db.getRepository(Feed);

    const feeds = articles.map((article) =>
        repo.create({
            article_id: article.id,
            platform_id: article.platform_id,
            tags: article.tags,
        }),
    );

    return await repo.save(feeds);
};
