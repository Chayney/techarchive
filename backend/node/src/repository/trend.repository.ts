import { AppDataSource } from "../config/appDataSource";
import { Trend } from "../domain/entity/trends.entity";

export const findTrendArticles = async (
    page: number,
    limit: number,
    keyword?: string
) => {
    const db = AppDataSource.getInstance();
    const trendRepository = db.getRepository(Trend);

    try {
        const query = trendRepository
            .createQueryBuilder('trend')
            .leftJoinAndSelect('trend.article', 'article')
            .leftJoinAndSelect('trend.platform', 'platform')
            .orderBy('trend.likes_count', 'DESC')
            .skip((page - 1) * limit)
            .take(limit);

        if (keyword) {
            query.andWhere('article.title LIKE :keyword', {
                keyword: `%${keyword}%`,
            });
        }

        return await query.getManyAndCount();
    } catch (error) {
        console.error(error);
        throw new Error('Failed to find trend articles');
    }
};