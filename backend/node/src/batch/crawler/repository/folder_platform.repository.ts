import { AppDataSource } from "../../../config/appDataSource";
import { Feed } from "../../../domain/entity/feeds.entity";
import { Platform } from "../../../domain/entity/platforms.entity";

// Platform/Tagのラジオボタンリストを作る
// プラットフォームとtagで閲覧したい記事のフィルタ
export const getPlatformTags = async () => {
    const db = AppDataSource.getInstance();

    const feedRepo = db.getRepository(Feed);
    const platformRepo = db.getRepository(Platform);

    const feeds = await feedRepo.find();
    const platforms = await platformRepo.find();

    const platformMap = new Map(platforms.map((platform) => [platform.id, platform.name]));

    const result = new Map<
        string,
        {
            platform_id: number;
            platform: string;
            tag: string;
        }
    >();

    feeds.forEach((feed) => {
        if (!feed.tags) return;

        const tags = feed.tags.split(",").map((tag) => tag.trim());

        tags.forEach((tag) => {
            const normalizedTag = tag.toLowerCase();

            const key = `${feed.platform_id}_${normalizedTag}`;

            if (!result.has(key)) {
                result.set(key, {
                    platform_id: feed.platform_id,
                    platform: platformMap.get(feed.platform_id) ?? "",
                    tag,
                });
            }
        });
    });

    return Array.from(result.values());
};
