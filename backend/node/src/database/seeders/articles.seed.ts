import { DataSource } from "typeorm";
import { Article } from "../../domain/entity/articles.entity";

export const ArticleData = async (dataSource: DataSource) => {
    const articleRepository = dataSource.getRepository(Article);

    const articles = [
        {
            platform_id: 1,
            title: "NestJS入門",
            description: "NestJSの基本構成について",
            article_url: "https://qiita.com/a1",
            published_at: new Date(),
            author_name: "Taro",
            tags: "nestjs,nodejs",
            thumbnail_url: "https://example.com/img1.png",
            is_eng: false,
            is_private: false,
        },
        {
            platform_id: 2,
            title: "TypeORM Relations",
            description: "リレーションの使い方",
            article_url: "https://zenn.dev/a2",
            published_at: new Date(),
            author_name: "Hanako",
            tags: "typeorm,db",
            thumbnail_url: "https://example.com/img2.png",
            is_eng: false,
            is_private: false,
        },
        {
            platform_id: 3,
            title: "Scaling Node Apps",
            description: "スケーラブルな設計",
            article_url: "https://medium.com/a3",
            published_at: new Date(),
            author_name: "John",
            tags: "node,scaling",
            thumbnail_url: "https://example.com/img3.png",
            is_eng: true,
            is_private: false,
        },
        {
            platform_id: 4,
            title: "Clean Architecture",
            description: "設計原則まとめ",
            article_url: "https://dev.to/a4",
            published_at: new Date(),
            author_name: "Sara",
            tags: "architecture",
            thumbnail_url: "https://example.com/img4.png",
            is_eng: true,
            is_private: false,
        },
        {
            platform_id: 5,
            title: "AI Trends 2026",
            description: "最新AI動向",
            article_url: "https://news.ycombinator.com/a5",
            published_at: new Date(),
            author_name: "Mike",
            tags: "ai,trends",
            thumbnail_url: "https://example.com/img5.png",
            is_eng: true,
            is_private: false,
        },
    ];

    const entities = articleRepository.create(articles);
    await articleRepository.save(entities);

    console.log("Articles seed complete:", await articleRepository.find());
};