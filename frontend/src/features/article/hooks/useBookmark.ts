// ブックマーク記事の登録と削除
import { useState } from "react";

export const useBookmark = () => {
    const [bookmarkArticleMap, setBookmarkArticleMap] = useState<Record<number, boolean>>({});

    const addBookmark = async (
        articleId: number,
        profileId: number
    ) => {
        console.log("addBookmark", articleId, profileId);
        const response = await fetch(
            "http://localhost:3000/api/bookmark", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                article_id: articleId,
                profile_id: profileId,
            }),
        }
        );

        if (!response.ok) {
            throw new Error("favorite登録失敗");
        }

        setBookmarkArticleMap(prev => ({
            ...prev,
            [articleId]: true
        }));
    };

    const removeBookmark = async (
        articleId: number,
        profileId: number
    ) => {
        const response = await fetch(
            "http://localhost:3000/api/bookmark",
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    article_id: articleId,
                    profile_id: profileId,
                }),
            }
        );

        if (!response.ok) {
            throw new Error("favorite削除失敗");
        }

        setBookmarkArticleMap((prev) => ({
            ...prev,
            [articleId]: false,
        }));
    };

    // ブックマーク済みか否かの判定
    const toggleBookmark = async (
        articleId: number,
        profileId: number
    ) => {
        if (bookmarkArticleMap[articleId]) {
            await removeBookmark(
                articleId,
                profileId
            );
        } else {
            await addBookmark(
                articleId,
                profileId
            );
        }

    };

    return {
        bookmarkArticleMap,
        setBookmarkArticleMap,
        toggleBookmark
    };
};