import { AppDataSource } from "../config/appDataSource";
import { RequestHandler } from "express";
import { Trend } from "../domain/entity/trends.entity";

export const getTrendArticlesHandler: RequestHandler = async (req, res) => {
    const db = AppDataSource.getInstance();
    const repo = db.getRepository(Trend);

    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);
    const keyword = String(req.query.keyword ?? "");

    try {
        const query = repo
            .createQueryBuilder("trend")
            .leftJoinAndSelect("trend.article", "article")
            .leftJoinAndSelect("trend.platform", "platform")
            .orderBy("trend.likes_count", "DESC")
            .skip((page - 1) * limit)
            .take(limit);


        if (keyword) {
            query.andWhere(
                "article.title LIKE :keyword",
                {
                    keyword: `%${keyword}%`,
                }
            );
        }


        const [items, total] = await query.getManyAndCount();


        console.log({
            page,
            limit,
            keyword,
            total,
            returned: items.length,
        });


        res.json({
            items,
            total,
            page,
            limit,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "failed to get trend articles",
        });
    }
};
