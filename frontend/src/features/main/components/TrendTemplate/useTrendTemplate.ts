import { useEffect, useState } from "react";
import type { TrendArticle } from "../../types/main";

export const useTrendTemplate = () => {
    const [trendArticles, setTrendArticle] = useState<TrendArticle[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await fetch(
                "http://localhost:3000/api/trend"
            );

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