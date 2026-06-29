import { useEffect, useState } from "react";
import type { Bookmark, Category, Favorite } from "../types/article";
import { useFavorite } from "./useFavorite";
import { useBookmark } from "./useBookmark";

export const useArticleActions = (profileId?: number) => {
    const { 
        favoriteCategoryMap,
        favoriteArticleMap,
        toggleFavorite,
        setFavoriteCategoryMap,
        setFavoriteArticleMap
    } = useFavorite();
    
    const { 
        bookmarkArticleMap,
        setBookmarkArticleMap,
        toggleBookmark
    } = useBookmark();

    const [tooltip, setTooltip] = useState<{
        articleId: number;
        message: string;
    } | null>(null);

    const [openArticleId, setOpenArticleId] = useState<number | null>(null);

    // ブックマークとお気に入りのツールチップ
    const showTooltip = (articleId: number, message: string) => {
        setTooltip({ articleId, message });

        setTimeout(() => {
            setTooltip(null);
        }, 2000);
    };

    // カテゴリー一覧の開閉
    const toggleDropdown = (id: number) => {
        setOpenArticleId((prev) => (prev === id ? null : id));
    };

    // ハートアイコン以外をクリックしてドロップダウンリストを閉じれるようにする
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            // 開いているdropdownがないなら何もしない
            if (openArticleId === null) return;

            const dropdown = document.querySelector(
                `[data-dropdown="${openArticleId}"]`
            );

            const trigger = document.querySelector(
                `[data-dropdown-trigger]`
            );

            if (!dropdown) return;

            if (trigger?.contains(target)) return;

            if (!dropdown.contains(target)) {
                setOpenArticleId(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openArticleId]);

    // ブックマーク記事の取得
    useEffect(() => {
        if (!profileId) return;

        const fetchBookmarks = async () => {
            const res = await fetch("http://localhost:3000/api/bookmarks");

            if (!res.ok) {
                throw new Error("ブックマークの取得に失敗しました");
            }

            const data: Bookmark[] = await res.json();
            
            const articleMap: Record<number, boolean> = {};

            data?.forEach((row) => {
                articleMap[row.article_id] = true;
            });

            setBookmarkArticleMap(articleMap);
        };

        fetchBookmarks();
    }, [profileId]);

    // お気に入り記事の取得
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/favorites");

                if (!res.ok) {
                    throw new Error("お気に入りの取得に失敗しました");
                }

                const data: Favorite[] = await res.json();
                const categoryMap: Record<string, boolean> = {};
                const articleMap: Record<number, boolean> = {};

                data.forEach((row) => {
                    const key = `${row.article_id}-${row.category_id}`;
                    categoryMap[key] = true;
                    articleMap[row.article_id] = true;
                });

                setFavoriteCategoryMap(categoryMap);
                setFavoriteArticleMap(articleMap);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFavorites();
    }, [setFavoriteCategoryMap, setFavoriteArticleMap]);

    // カテゴリー名の追加
    const handleAddCategory = async (
        profileId: number,
        categoryName: string,
    ): Promise<Category> => {
        const res = await fetch(
            "http://localhost:3000/api/category",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    profile_id: profileId,
                    name: categoryName,
                }),
            }
        );

        if (!res.ok) {
            throw new Error("カテゴリ作成失敗");
        }

        return res.json();
    };

    return {
        bookmarkArticleMap,
        favoriteCategoryMap,
        favoriteArticleMap,
        tooltip,
        openArticleId,
        toggleBookmark,
        toggleFavorite,
        toggleDropdown,
        showTooltip,
        setOpenArticleId,
        handleAddCategory
    };
};