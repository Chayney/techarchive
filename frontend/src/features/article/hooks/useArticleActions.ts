import { useEffect, useState } from "react";
import type { Category } from "../types/article";

export const useArticleActions = () => {
    const [openArticleId, setOpenArticleId] = useState<number | null>(null);

    const [tooltip, setTooltip] = useState<{
        articleId: number;
        message: string;
    } | null>(null);

    const toggleDropdown = (id: number) => {
        setOpenArticleId(prev =>
            prev === id ? null : id
        );
    };

    // ハートアイコン以外をクリックしてドロップダウンリストを閉じれるようにする
    // useEffect(() => {
    //     const handleClickOutside = (event: MouseEvent) => {
    //         const target = event.target as Node;

    //         // 開いているdropdownがないなら何もしない
    //         if (openArticleId === null) return;

    //         const dropdown = document.querySelector(
    //             `[data-dropdown="${openArticleId}"]`
    //         );

    //         if (!dropdown) return;

    //         if (!dropdown.contains(target)) {
    //             setOpenArticleId(null);
    //         }
    //     };

    //     document.addEventListener("mousedown", handleClickOutside);

    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, [openArticleId]);

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

    const showTooltip = (
        articleId: number,
        message: string
    ) => {
        setTooltip({
            articleId,
            message
        });

        setTimeout(() => {
            setTooltip(null);
        }, 2000);
    };

    return {
        openArticleId,
        tooltip,
        toggleDropdown,
        showTooltip,
        handleAddCategory
    };
};