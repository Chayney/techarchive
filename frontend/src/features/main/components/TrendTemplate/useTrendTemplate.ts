import { useEffect, useState } from "react";
import type { TrendArticle } from "../../types/main";

export const useTrendTemplate = () => {
    const [trendArticles, setTrendArticle] = useState<TrendArticle[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(
                "http://localhost:3000/api/trend"
            );

            const json: TrendArticle[] =
                await res.json();

            setTrendArticle(json);
        };

        fetchData();
    }, []);
    return {
        trendArticles
    }
}