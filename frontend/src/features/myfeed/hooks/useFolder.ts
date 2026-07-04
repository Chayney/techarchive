import { useEffect, useState } from "react";
import type { TagPlatform } from "../types/myfeed";

export const useFolder = () => {
    const [tagPlatforms, settagPlatform] = useState<TagPlatform[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTagPlatforms = async () => {
            try {
                setLoading(true);

                const response = await fetch(
                    "http://localhost:3000/api/tags/platforms"
                );

                if (!response.ok) {
                    throw new Error("feed取得失敗");
                }

                const raw = await response.json();
                settagPlatform(raw)
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchTagPlatforms();
    }, []);

    const saveFolderFeeds = async (
        folderId: number,
        items: { feed_id: number; tag: string }[]
    ) => {
        const response = await fetch("http://localhost:3000/api/folder/feeds", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                folder_id: folderId,
                items,
            }),
        });

        if (!response.ok) {
            throw new Error("folder feed保存失敗");
        }

        return await response.json();
    };

    const createFolder = async (folderName: string) => {
        const res = await fetch("http://localhost:3000/api/folders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: folderName })
        });
        if (!res.ok) throw new Error("folder作成失敗");
        return await res.json();
    };

    const deleteFolderFeed = async (id: number) => {
        const response = await fetch(`http://localhost:3000/api/folder/feeds/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("folder feed削除失敗");
        }
    };

    const getFolderArticles = async (folderId: number) => {
        const response = await fetch(`http://localhost:3000/api/folders/${folderId}/articles`);
        if (!response.ok) throw new Error("folder記事取得失敗");
        return await response.json();
    };

    return {
        tagPlatforms,
        saveFolderFeeds,
        deleteFolderFeed,
        getFolderArticles,
        createFolder
    };
};