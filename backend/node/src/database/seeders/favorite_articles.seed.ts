import { DataSource } from "typeorm";
import { FavoriteArticle } from "../../domain/entity/favorite_articles.entity";
import { Category } from "../../domain/entity/categories.entity";
import { Article } from "../../domain/entity/articles.entity";

export const FavoriteArticleData = async (dataSource: DataSource) => {
    const favoriteRepository = dataSource.getRepository(FavoriteArticle);
    const categoryRepository = dataSource.getRepository(Category);
    const articleRepository = dataSource.getRepository(Article);

    const categories = await categoryRepository.find();
    const articles = await articleRepository.find();

    if (categories.length === 0 || articles.length === 0) {
        throw new Error("Categories and Articles must be seeded first");
    }

    const favorites = [
        // Reactフォルダ
        {
            category: categories.find((c) => c.name === "React")!,
            article: articles[0], // NestJS入門
        },
        {
            category: categories.find((c) => c.name === "React")!,
            article: articles[1], // TypeORM Relations
        },

        // Node.jsフォルダ
        {
            category: categories.find((c) => c.name === "Node.js")!,
            article: articles[2], // Scaling Node Apps
        },

        // TypeORMフォルダ
        {
            category: categories.find((c) => c.name === "TypeORM")!,
            article: articles[1],
        },

        // AIフォルダ
        {
            category: categories.find((c) => c.name === "AI")!,
            article: articles[4], // AI Trends 2026
        },

        // Architectureフォルダ
        {
            category: categories.find((c) => c.name === "Architecture")!,
            article: articles[3], // Clean Architecture
        },
    ];

    const entities = favoriteRepository.create(favorites);
    await favoriteRepository.save(entities);

    console.log(
        "FavoriteArticle seed complete:",
        await favoriteRepository.find({
            relations: {
                category: true,
                article: true,
            },
        })
    );
};