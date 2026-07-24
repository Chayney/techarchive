import { AppDataSource } from "../../../config/appDataSource";
import { Article } from "../../../domain/entity/articles.entity";
import { ogps } from "../service/articles.service";

export const saveOgps = async (): Promise<Article[]> => {
    const db = AppDataSource.getInstance();

    const repo = db.getRepository(Article);

    const ogpResults = await ogps();

    const urls = ogpResults.map((item) => item.url);

    const articles = await repo
        .createQueryBuilder("article")
        .where("article.article_url IN (:...urls)", {
            urls,
        })
        .getMany();

    const ogpMap = new Map(ogpResults.map((item) => [item.url, item.image]));

    articles.forEach((article) => {
        article.thumbnail_url = ogpMap.get(article.article_url) ?? null;
    });

    const savedArticles = await repo.save(articles);

    console.log("[OGP] updated article count:", savedArticles.length);

    return savedArticles;
};
