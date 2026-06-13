import { DataSource } from "typeorm";
import { Trend } from "../../domain/entity/trends.entity";

export const TrendArticleData = async (dataSource: DataSource) => {
    const repo = dataSource.getRepository(Trend);

    const data = [
        { article_id: 1, platform_id: 1, like_count: 10 },
        { article_id: 2, platform_id: 2, like_count: 25 },
        { article_id: 3, platform_id: 3, like_count: 50 },
        { article_id: 4, platform_id: 4, like_count: 15 },
        { article_id: 5, platform_id: 5, like_count: 100 },
    ];

    const entities = repo.create(data);
    await repo.save(entities);

    console.log("TrendArticles seed complete:", await repo.find());
};