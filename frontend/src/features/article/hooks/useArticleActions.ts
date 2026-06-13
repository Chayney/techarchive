import { useEffect, useState } from "react";

export const useArticleActions = () => {
    const [openArticleId, setOpenArticleId] = useState<number | null>(null);

    // カテゴリー一覧の開閉
    const toggleDropdown = (id: number) => {
        setOpenArticleId((prev) => (prev === id ? null : id));
    };

    const closeDropdown = () => setOpenArticleId(null);

    // ブックマークとお気に入りのツールチップ
    const [tooltip, setTooltip] = useState<{
        articleId: number,
        message: string
    } | null>(null);

    const showTooltip = (articleId: number, message: string) => {
        setTooltip({ articleId, message });
        setTimeout(() => {
            setTooltip(null);
        }, 2000);
    }

    // ハートアイコン以外をクリックしてドロップダウンリストを閉じれるようにする
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            // 開いているdropdownがないなら何もしない
            if (openArticleId === null) return;

            const dropdown = document.querySelector(
                `[data-dropdown="${openArticleId}"]`
            );

            if (!dropdown) return;

            if (!dropdown.contains(target)) {
                setOpenArticleId(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openArticleId]);
    
    return {
        openArticleId,
        tooltip,
        showTooltip,
        toggleDropdown,
        closeDropdown
    }
}