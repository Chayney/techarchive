import { useEffect, useState } from "react";
import type { FeedArticle } from "../../types/main";

export const useFeedTemplate = () => {
    const [feedArticles, setFeedArticle] = useState<FeedArticle[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await fetch(
                "http://localhost:3000/api/feeds"
            );

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