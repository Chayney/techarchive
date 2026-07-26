import { useEffect, useState } from "react";
import type { FeedArticle } from "../../types/main";
import { API_URL } from "../../../../shared/api/apiClient";

export const useFeedTemplate = () => {
    const [feedArticles, setFeedArticle] = useState<FeedArticle[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await fetch(`${API_URL}/feeds`);

            const json: FeedArticle[] =
                await res.json();

            setFeedArticle(json);
            setLoading(false);
        };

        fetchData();
    }, []);
    return {
        feedArticles,
        loading
    }
}