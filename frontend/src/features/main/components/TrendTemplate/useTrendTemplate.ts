import { useEffect, useState } from "react";
import type { TrendArticle } from "../../types/main";
import { API_URL } from "../../../../shared/api/apiClient";

export const useTrendTemplate = () => {
    const [trendArticles, setTrendArticle] = useState<TrendArticle[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await fetch(`${API_URL}/trends`);

            const json: TrendArticle[] =
                await res.json();

            setTrendArticle(json);
            setLoading(false);
        };

        fetchData();
    }, []);
    return {
        trendArticles,
        loading
    }
}