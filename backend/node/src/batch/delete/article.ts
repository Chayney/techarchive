import { AppDataSource } from "../../config/appDataSource"
import { Trend } from "../../domain/entity/trends.entity";
import { Article } from "../../domain/entity/articles.entity";

export const deleteArticles = async () => {
    const db = AppDataSource.getInstance();

    const trendRepo = db.getRepository(Trend);
    const articleRepo = db.getRepository(Article);

    console.log("[deleteArticles] start");

    const trends = await trendRepo.find();

    console.log(`[deleteArticles] trends count: ${trends.length}`);

    const articleIds = trends.map(trend => trend.article_id);

    if (trends.length > 0) {
        await trendRepo.clear();
        console.log("[deleteArticles] trends deleted");
    }

    if (articleIds.length > 0) {
        await articleRepo.delete(articleIds);
        console.log(`[deleteArticles] articles deleted: ${articleIds.length}`);
    }

    console.log("[deleteArticles] end");
};