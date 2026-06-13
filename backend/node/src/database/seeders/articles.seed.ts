import { DataSource } from "typeorm";
import { Article } from "../../domain/entity/articles.entity";

export const ArticleData = async (dataSource: DataSource) => {
    const articleRepository = dataSource.getRepository(Article);

    const articles = [
        {
            platform_id: 1,
            title: "NestJS入門",
            article_url: "https://qiita.com/a1",
            tags: "nestjs,nodejs",
            thumbnail_url: "https://example.com/img1.png",
            is_private: false,
        },
        {
            platform_id: 2,
            title: "TypeORM Relations",
            article_url: "https://zenn.dev/a2",
            tags: "typeorm,db",
            thumbnail_url: "https://example.com/img2.png",
            is_private: false,
        },
        {
            platform_id: 3,
            title: "Scaling Node Apps",
            article_url: "https://medium.com/a3",
            tags: "node,scaling",
            thumbnail_url: "https://example.com/img3.png",
            is_private: false,
        },
        {
            platform_id: 4,
            title: "Clean Architecture",
            article_url: "https://dev.to/a4",
            tags: "architecture",
            thumbnail_url: "https://example.com/img4.png",
            is_private: false,
        },
        {
            platform_id: 5,
            title: "AI Trends 2026",
            article_url: "https://news.ycombinator.com/a5",
            tags: "ai,trends",
            thumbnail_url: "https://example.com/img5.png",
            is_private: false,
        },
    ];

    const entities = articleRepository.create(articles);
    await articleRepository.save(entities);

    console.log("Articles seed complete:", await articleRepository.find());
};