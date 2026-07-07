import { useEffect, useState } from "react";
import type { BookmarkArticle } from "../../types/main";
import { API_URL } from "../../../../shared/api/apiClient";

export const useBookmarkTemplate = () => {
    const [bookmarkArticles, setBookmarkArticle] = useState<BookmarkArticle[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await fetch(`${API_URL}/bookmarks`);

            const json: BookmarkArticle[] =
                await res.json();

            setBookmarkArticle(json);
            setLoading(false);
        };

        fetchData();
    }, []);
    return {
        bookmarkArticles,
        loading
    }
}