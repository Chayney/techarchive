import { useEffect, useState } from "react";
import type { MyFeedArticle } from "../../types/myfeed";

export const useMyFeedTemplate = (tagPlatformId: number) => {
    const [myFeedArticles, setMyFeedArticles] = useState<MyFeedArticle[]>([]);

    useEffect(() => {
        const fetchFolderArticles = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/tags/platforms/${tagPlatformId}`
                );

                if (!response.ok) {
                    throw new Error("folder記事取得失敗");
                }

                const data = await response.json();
                setMyFeedArticles(data);
            } catch (e) {
                console.error(e);
            }
        };

        fetchFolderArticles();
    }, []);

    return {
        myFeedArticles
    }
}