import { findTrendArticles } from '../../repository/trend.repository';

export type GetTrendArticlesParam = {
    page?: number;
    limit?: number;
    keyword?: string;
};

export const getTrendArticles = async ({
    page = 1,
    limit = 10,
    keyword = '',
}: GetTrendArticlesParam) => {
    const [items, total] = await findTrendArticles(page, limit, keyword);

    return {
        items,
        total,
        page,
        limit,
    };
};