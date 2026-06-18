import { AppDataSource } from "../config/appDataSource";
import { Article } from "../domain/entity/articles.entity";
import { FindManyOptions } from "typeorm";

export const findArticleByUrl = async (url: string) => {
    const db = AppDataSource.getInstance();
    const repo = db.getRepository(Article);

    try {
        return await repo.findOne({
            where: { article_url: url },
        });
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to find article: ${error}`);
    }
};

export const saveArticle = async (data: Partial<Article>) => {
    const db = AppDataSource.getInstance();
    const repo = db.getRepository(Article);

    try {
        return await repo.save(data);
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to save article: ${error}`);
    }
};

export const findTrendingArticles = async (
    options?: FindManyOptions<Article>
) => {
    const db = AppDataSource.getInstance();
    const repo = db.getRepository(Article);

    try {
        return await repo.find(options);
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to find trending articles: ${error}`);
    }
};