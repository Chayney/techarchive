import { useEffect, useState } from "react";
import type { BookmarkArticle } from "../../types/main";
import { API_URL } from "../../../../shared/api/apiClient";
import { getAccessToken, onAuthChange } from "../../../../shared/api/supabaseClient";

export const useBookmarkTemplate = () => {
    const [bookmarkArticles, setBookmarkArticle] = useState<BookmarkArticle[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            const token = await getAccessToken();

            const res = await fetch(`${API_URL}/bookmarks`, {
                headers: token
                    ? { Authorization: `Bearer ${token}` }
                    : {},
            });

            if (!res.ok) {
                throw new Error("ブックマーク取得失敗");
            }

            const json: BookmarkArticle[] = await res.json();

            setBookmarkArticle(json);
            setLoading(false);
        };

        fetchData();

        const unsubscribe = onAuthChange(() => {
            fetchData();
        });

        return unsubscribe;
    }, []);

    return {
        bookmarkArticles,
        loading
    }
}