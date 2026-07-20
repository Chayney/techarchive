import { useEffect, useState } from "react";
import type { TrendArticle } from "../../types/main";
import { API_URL } from "../../../../shared/api/apiClient";

export const useTrendTemplate = (page: number, keyword: string) => {
    const [trendArticles, setTrendArticles] = useState<TrendArticle[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const res = await fetch(
                    `${API_URL}/trends?page=${page}&limit=10&keyword=${keyword}`
                );

                const json = await res.json();

                setTrendArticles(json.items);
                setTotal(json.total);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page, keyword]);

    return {
        trendArticles,
        total,
        loading,
    };
};