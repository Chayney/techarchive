import { AppDataSource } from "../../../config/appDataSource";
import { Article } from "../../../domain/entity/articles.entity";
import { ArticleCreateInput } from "../types";

export const saveArticles = async (data: ArticleCreateInput[]): Promise<Article[]> => {
    const db = AppDataSource.getInstance();

    const repo = db.getRepository(Article);

    const urls = data.map((item) => item.article_url);

    // 既存記事取得
    const existingArticles = await repo
        .createQueryBuilder("article")
        .where("article.article_url IN (:...urls)", { urls })
        .getMany();

    const existingUrlSet = new Set(existingArticles.map((article) => article.article_url));

    // 新規記事のみ抽出
    const newArticles = data.filter((item) => !existingUrlSet.has(item.article_url));

    if (!newArticles.length) {
        return [];
    }

    return await repo.save(newArticles);
};

export const getArticlesFromQiitaApiWithoutThumbnail = async (): Promise<Article[]> => {
    const db = AppDataSource.getInstance();

    const repo = db.getRepository(Article);

    return await repo
        .createQueryBuilder("article")
        .where("article.thumbnail_url IS NULL")
        .andWhere("article.source_type IN (:...sourceTypes)", {
            sourceTypes: [1],
        })
        .getMany();
};

export const getArticlesFromZennApiWithoutThumbnail = async (): Promise<Article[]> => {
    const db = AppDataSource.getInstance();

    const repo = db.getRepository(Article);

    return await repo
        .createQueryBuilder("article")
        .where("article.thumbnail_url IS NULL")
        .andWhere("article.source_type IN (:...sourceTypes)", {
            sourceTypes: [2],
        })
        .getMany();
};

export const getArticlesFromQiitaRssWithoutThumbnail = async (): Promise<Article[]> => {
    const db = AppDataSource.getInstance();

    const repo = db.getRepository(Article);

    return await repo
        .createQueryBuilder("article")
        .where("article.thumbnail_url IS NULL")
        .andWhere("article.source_type IN (:...sourceTypes)", {
            sourceTypes: [3],
        })
        .getMany();
};

export const getArticlesFromZennRssWithoutThumbnail = async (): Promise<Article[]> => {
    const db = AppDataSource.getInstance();

    const repo = db.getRepository(Article);

    return await repo
        .createQueryBuilder("article")
        .where("article.thumbnail_url IS NULL")
        .andWhere("article.source_type IN (:...sourceTypes)", {
            sourceTypes: [4],
        })
        .getMany();
};
