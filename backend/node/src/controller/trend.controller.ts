import { RequestHandler } from 'express';
import { getTrendArticles } from '../service/trend/trend.service';

export const getTrendArticlesHandler: RequestHandler = async (req, res) => {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);
    const keyword = String(req.query.keyword ?? '');

    try {
        const result = await getTrendArticles({
            page,
            limit,
            keyword,
        });

        console.log({
            page,
            limit,
            keyword,
            total: result.total,
            returned: result.items.length,
        });

        res.json(result);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'failed to get trend articles',
        });
    }
};