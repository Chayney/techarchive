import { useEffect, useState } from "react";
import { supabase } from "../../../shared/lib/supabaseClient";
import type { Category } from "../types/article";
import { useFavorite } from "./useFavorite";

export const useArticleActions = (profileId?: number) => {
    const { 
        favoriteCategoryMap,
        favoriteArticleMap,
        toggleFavorite
    } = useFavorite();
    const [bookmarkMap, setBookmarkMap] = useState<Record<number, boolean>>({});

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

    // ブックマーク済みか否かの判定
    const toggleBookmark = async (articleId: number) => {
        if (!profileId) return;

        const isBookmark = bookmarkMap[articleId];

        if (isBookmark) {
            const { error } = await supabase
                .from("bookmarks")
                .delete()
                .eq("profile_id", profileId)
                .eq("article_id", articleId);

            if (error) {
                console.error(error);
                return;
            }

            setBookmarkMap((prev) => ({
                ...prev,
                [articleId]: false
            }));

            showTooltip(articleId, "Delete Bookmark");
        } else {
            const { error } = await supabase
                .from("bookmarks")
                .insert({
                    profile_id: profileId,
                    article_id: articleId
                });

            if (error) {
                console.error(error);
                return;
            }

            setBookmarkMap((prev) => ({
                ...prev,
                [articleId]: true
            }));

            showTooltip(articleId, "Add Bookmark");
        }
    };

    // ブックマーク記事の取得
    useEffect(() => {
        if (!profileId) return;

        const fetchBookmarks = async () => {
            const { data, error } = await supabase
                .from("bookmarks")
                .select("article_id")
                .eq("profile_id", profileId);

            if (error) {
                console.error(error);
                return;
            }

            const map: Record<number, boolean> = {};

            data?.forEach((row) => {
                map[row.article_id] = true;
            });

            setBookmarkMap(map);
        };

        fetchBookmarks();
    }, [profileId]);

    // お気に入り記事の取得
    // useEffect(() => {
    //     if (!profileId) return;

    //     const fetchFavorites = async () => {
    //         const { data, error } = await supabase
    //             .from("favorites")
    //             .select("article_id, category_id")
    //             .eq("profile_id", profileId);

    //         if (error) {
    //             console.error(error);
    //             return;
    //         }

    //         const categoryMap: Record<string, boolean> = {};
    //         const articleMap: Record<number, boolean> = {};

    //         data?.forEach((row) => {
    //             const key = `${row.article_id}-${row.category_id}`;
    //             categoryMap[key] = true;
    //             articleMap[row.article_id] = true;
    //         });

    //         setFavoriteCategoryMap(categoryMap);
    //         setFavoriteArticleMap(articleMap);
    //     };

    //     fetchFavorites();
    // }, [profileId]);

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
        bookmarkMap,
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