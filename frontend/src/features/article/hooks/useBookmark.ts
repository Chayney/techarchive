import { useState } from "react";

export const useBookmark = (profileId?: number) => {
    const [bookmarkMap, setBookmarkMap] = useState<Record<number, boolean>>({});
    const [loading, setLoading] = useState(false);

    /**
     * Bookmark ON/OFF
     */
    const toggleBookmark = async (articleId: number) => {
        // if (!profileId) return;

        setLoading(true);

        try {
            const isBookmarked = bookmarkMap[articleId] ?? false;

            if (isBookmarked) {
                setBookmarkMap(prev => ({
                    ...prev,
                    [articleId]: false
                }));
            } else {
                setBookmarkMap(prev => ({
                    ...prev,
                    [articleId]: true
                }));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    /**
     * 判定
     */
    const isBookmarked = (articleId: number) => {
        return bookmarkMap[articleId] ?? false;
    };

    return {
        loading,
        bookmarkMap,
        toggleBookmark,
        isBookmarked
    };
};