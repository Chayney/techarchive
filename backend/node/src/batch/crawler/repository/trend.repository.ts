import { AppDataSource } from "../../../config/appDataSource";
import { Trend } from "../../../domain/entity/trends.entity";
import { TrendInput } from "../types";

export const saveTrends = async (articles: TrendInput[]) => {
    const db = AppDataSource.getInstance();
    const repo = db.getRepository(Trend);
    const articleIds = articles.map((item) => item.id);
    const existing = await repo
        .createQueryBuilder("trend")
        .where("trend.article_id IN (:...articleIds)", { articleIds })
        .getMany();

    const trendMap = new Map(existing.map((trend) => [trend.article_id, trend]));

    const insertData: Trend[] = [];
    const updateData: Trend[] = [];

    for (const article of articles) {
        const trend = trendMap.get(article.id);
        if (trend) {
            // いいね数の差分チェック
            // 差分があればDB更新処理
            if (trend.likes_count !== article.likes_count) {
                trend.likes_count = article.likes_count;
                updateData.push(trend);
            }
        } else {
            insertData.push(
                repo.create({
                    article_id: article.id,
                    platform_id: article.platform_id,
                    likes_count: article.likes_count,
                    tags: article.tags,
                }),
            );
        }
    }

    if (insertData.length) {
        await repo.insert(insertData);
    }

    if (updateData.length) {
        await repo.save(updateData);
    }
};
