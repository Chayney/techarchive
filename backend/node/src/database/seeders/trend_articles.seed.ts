import { DataSource } from "typeorm";
import { TrendArticle } from "../../domain/entity/trend_articles.entity";

export const TrendArticleData = async (dataSource: DataSource) => {
    const repo = dataSource.getRepository(TrendArticle);

    const data = [
        { articleId: 1, platformId: 1, likeCount: 10 },
        { articleId: 2, platformId: 2, likeCount: 25 },
        { articleId: 3, platformId: 3, likeCount: 50 },
        { articleId: 4, platformId: 4, likeCount: 15 },
        { articleId: 5, platformId: 5, likeCount: 100 },
    ];

    const entities = repo.create(data);
    await repo.save(entities);

    console.log("TrendArticles seed complete:", await repo.find());
};