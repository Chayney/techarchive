import { AppDataSource } from "../../config/appDataSource";
import { Article } from "../../domain/entity/articles.entity";

type ArticleCreateInput = {
    platform_id: number;
    source_type: number;
    title: string;
    article_url: string;
    tags: string | null;
    thumbnail_url: string | null;
    is_private: boolean;
};

export const saveArticles = async (
    data: ArticleCreateInput[]
): Promise<Article[]> => {

    const db = AppDataSource.getInstance();

    const repo = db.getRepository(Article);

    const urls = data.map(item => item.article_url);

    // 既存記事取得
    const existingArticles = await repo
        .createQueryBuilder("article")
        .where("article.article_url IN (:...urls)", { urls })
        .getMany();

    const existingUrlSet = new Set(
        existingArticles.map(article => article.article_url)
    );

    // 新規記事のみ抽出
    const newArticles = data.filter(
        item => !existingUrlSet.has(item.article_url)
    );

    if (!newArticles.length) {
        return [];
    }

    return await repo.save(newArticles);
};