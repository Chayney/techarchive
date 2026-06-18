import { AppDataSource } from "../config/appDataSource";
import { Trend } from "../domain/entity/trends.entity";

export const upsertTrend = async (
    platformId: number,
    articleId: number,
    likeCount: number
) => {
    const db = AppDataSource.getInstance();
    const repo = db.getRepository(Trend);

    try {
        const existing = await repo.findOne({
            where: { platform_id: platformId, article_id: articleId },
        });

        if (existing) {
            existing.like_count = likeCount;
            return await repo.save(existing);
        }

        return await repo.save({
            platform_id: platformId,
            article_id: articleId,
            like_count: likeCount,
        });
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to upsert trend: ${error}`);
    }
};

export const findTopTrends = async (limit = 20) => {
    const db = AppDataSource.getInstance();
    const repo = db.getRepository(Trend);

    try {
        return await repo.find({
            relations: {
                article: true
            },
            order: { like_count: "DESC" },
            take: limit,
        });
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to get trends: ${error}`);
    }
};